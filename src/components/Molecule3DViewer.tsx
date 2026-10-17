import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Molecule3DData } from '../types/chemistry';
import { RotateCw, ZoomIn, ZoomOut, Eye, Layers, Compass, Sparkles, Check, Atom, Info, FlaskConical } from 'lucide-react';

interface Props {
  molecule: Molecule3DData;
}

export const Molecule3DViewer: React.FC<Props> = ({ molecule }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [show2DFallback, setShow2DFallback] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [webglSupported, setWebglSupported] = useState(true);
  const [isDisassembled, setIsDisassembled] = useState(false);

  const isDisassembledRef = useRef(isDisassembled);
  isDisassembledRef.current = isDisassembled;

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const moleculeGroupRef = useRef<THREE.Group | null>(null);
  const reqAnimIdRef = useRef<number | null>(null);
  const baseCameraZRef = useRef<number>(7);

  // Automatically reset disassembly state when molecule changes
  useEffect(() => {
    setIsDisassembled(false);
    isDisassembledRef.current = false;
  }, [molecule.id]);

  useEffect(() => {
    if (show2DFallback || !containerRef.current) return;

    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        setShow2DFallback(true);
        return;
      }
    } catch {
      setWebglSupported(false);
      setShow2DFallback(true);
      return;
    }

    const container = containerRef.current;
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 400;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Calculate max bounding radius of the molecule to dynamically position camera
    let maxDist = 3.5;
    molecule.atoms.forEach((a) => {
      const d = Math.sqrt(a.position[0] ** 2 + a.position[1] ** 2 + a.position[2] ** 2);
      if (d > maxDist) maxDist = d;
    });
    // For large alkanes (Hexane .. Decane), expand camera distance so exploded view also fits comfortably
    const baseZ = Math.max(7, maxDist * 1.85);
    baseCameraZRef.current = baseZ;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, baseZ);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.25);
    dirLight1.position.set(6, 12, 8);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x06b6d4, 0.7); // cyan rim light
    dirLight2.position.set(-6, -6, -6);
    scene.add(dirLight2);

    const dirLight3 = new THREE.DirectionalLight(0x38bdf8, 0.45); // soft top accent
    dirLight3.position.set(0, 8, -4);
    scene.add(dirLight3);

    // Build Molecule Model
    const molGroup = new THREE.Group();
    moleculeGroupRef.current = molGroup;

    // Compute Centroid
    const centroid = new THREE.Vector3();
    molecule.atoms.forEach((a) => {
      centroid.add(new THREE.Vector3(...a.position));
    });
    centroid.divideScalar(molecule.atoms.length);

    // Prepare Original and Separated (Exploded) Target Positions
    const origPositions: THREE.Vector3[] = [];
    const separatedPositions: THREE.Vector3[] = [];
    const isRing = molecule.id === 'benzene';
    const isAlkane = molecule.atoms.length >= 5 && molecule.atoms.some((a) => a.element === 'C') && !isRing;

    molecule.atoms.forEach((atom, idx) => {
      const orig = new THREE.Vector3(...atom.position);
      origPositions.push(orig);

      if (isRing) {
        // Benzene ring: expand radially outward from center
        const dir = orig.clone().sub(centroid);
        if (dir.length() < 0.01) dir.set(1, 0, 0);
        dir.normalize();
        const sepRing = orig.clone().add(dir.multiplyScalar(atom.element === 'C' ? 1.4 : 2.5));
        separatedPositions.push(sepRing);
      } else if (atom.element === 'C') {
        // Carbons in linear chains: spread along X chain and maintain centered spine
        const sepC = orig.clone();
        if (isAlkane) {
          sepC.x *= 1.38;
          sepC.y *= 0.6;
        } else {
          const dir = orig.clone().sub(centroid);
          if (dir.length() > 0.01) {
            sepC.add(dir.normalize().multiplyScalar(1.6));
          }
        }
        separatedPositions.push(sepC);
      } else if (atom.element === 'H') {
        // Find which heavy atom this hydrogen is bonded to
        const bond = molecule.bonds.find(([i1, i2]) => i1 === idx || i2 === idx);
        if (bond) {
          const otherIdx = bond[0] === idx ? bond[1] : bond[0];
          const bondedHeavyAtom = molecule.atoms[otherIdx];
          const centerPos = new THREE.Vector3(...bondedHeavyAtom.position);
          const dir = new THREE.Vector3().subVectors(orig, centerPos);
          if (dir.length() < 0.001) dir.set(0, 1, 0);
          dir.normalize();

          // Calculate exploded position relative to the spread heavy atom
          const sepBase = new THREE.Vector3(...bondedHeavyAtom.position);
          if (isAlkane) {
            sepBase.x *= 1.38;
            sepBase.y *= 0.6;
          }

          const sepH = sepBase.clone().add(dir.multiplyScalar(2.65));
          if (isAlkane) {
            if (orig.z > 0.1) sepH.z += 0.85;
            else if (orig.z < -0.1) sepH.z -= 0.85;
            if (orig.y > 0.1) sepH.y += 0.55;
            else if (orig.y < -0.1) sepH.y -= 0.55;
          }
          separatedPositions.push(sepH);
        } else {
          const dir = new THREE.Vector3().subVectors(orig, centroid).normalize();
          separatedPositions.push(orig.clone().add(dir.multiplyScalar(2.5)));
        }
      } else {
        // Heteroatoms (O, N, Cl)
        const dir = new THREE.Vector3().subVectors(orig, centroid);
        if (dir.length() < 0.001) dir.set(1, 0, 0);
        dir.normalize();
        separatedPositions.push(orig.clone().add(dir.multiplyScalar(2.4)));
      }
    });

    // Create Atom Meshes
    const atomSpheres: THREE.Mesh[] = [];
    molecule.atoms.forEach((atom, idx) => {
      const geom = new THREE.SphereGeometry(atom.radius * 0.9, 32, 32);
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(atom.color),
        roughness: 0.22,
        metalness: 0.2,
        emissive: new THREE.Color(atom.color).multiplyScalar(0.12),
      });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.copy(origPositions[idx]);
      molGroup.add(mesh);
      atomSpheres.push(mesh);
    });

    // Create Bond Cylinders
    interface BondItem {
      mesh: THREE.Mesh;
      idx1: number;
      idx2: number;
      initialLen: number;
    }
    const bondCylinders: BondItem[] = [];

    molecule.bonds.forEach(([idx1, idx2]) => {
      const atom1 = molecule.atoms[idx1];
      const atom2 = molecule.atoms[idx2];
      if (!atom1 || !atom2) return;

      const p1 = origPositions[idx1];
      const p2 = origPositions[idx2];
      const distance = p1.distanceTo(p2);
      const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);

      const cylinderGeom = new THREE.CylinderGeometry(0.09, 0.09, distance, 16);
      const cylinderMat = new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        roughness: 0.25,
        metalness: 0.35,
        transparent: true,
        opacity: 1.0,
      });
      const cylinder = new THREE.Mesh(cylinderGeom, cylinderMat);
      cylinder.position.copy(mid);
      cylinder.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3().subVectors(p2, p1).normalize()
      );

      molGroup.add(cylinder);
      bondCylinders.push({
        mesh: cylinder,
        idx1,
        idx2,
        initialLen: distance,
      });
    });

    scene.add(molGroup);

    // Mouse drag interaction
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !moleculeGroupRef.current) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      moleculeGroupRef.current.rotation.y += deltaX * 0.01;
      moleculeGroupRef.current.rotation.x += deltaY * 0.01;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || !moleculeGroupRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;

      moleculeGroupRef.current.rotation.y += deltaX * 0.01;
      moleculeGroupRef.current.rotation.x += deltaY * 0.01;
    };

    dom.addEventListener('touchstart', onTouchStart, { passive: true });
    dom.addEventListener('touchmove', onTouchMove, { passive: true });
    dom.addEventListener('touchend', onMouseUp);

    // Animation loop state
    let explosionProgress = 0;

    const animate = () => {
      reqAnimIdRef.current = requestAnimationFrame(animate);

      // Auto rotation when not dragging
      if (moleculeGroupRef.current && autoRotate && !isDragging) {
        moleculeGroupRef.current.rotation.y += 0.007;
      }

      // Smooth 3D Disassembly (Separation) Interpolation
      const targetExplosion = isDisassembledRef.current ? 1.0 : 0.0;
      explosionProgress += (targetExplosion - explosionProgress) * 0.07;

      // Cubic hermite smoothstep easing
      const easedT = explosionProgress * explosionProgress * (3 - 2 * explosionProgress);

      const time = performance.now() * 0.002;

      // Update atom positions
      for (let i = 0; i < atomSpheres.length; i++) {
        const mesh = atomSpheres[i];
        const orig = origPositions[i];
        const sep = separatedPositions[i];

        mesh.position.lerpVectors(orig, sep, easedT);

        // Gentle organic zero-g floating when separated
        if (easedT > 0.02) {
          mesh.position.y += Math.sin(time + i * 0.7) * 0.05 * easedT;
          mesh.position.x += Math.cos(time * 0.8 + i * 0.5) * 0.03 * easedT;
          mesh.position.z += Math.sin(time * 0.9 + i * 1.1) * 0.03 * easedT;
        }
      }

      // Update bond cylinders (stretching & thinning into energy threads, or snapping back)
      for (let j = 0; j < bondCylinders.length; j++) {
        const item = bondCylinders[j];
        const p1 = atomSpheres[item.idx1].position;
        const p2 = atomSpheres[item.idx2].position;
        const currDist = p1.distanceTo(p2);
        const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);

        item.mesh.position.copy(mid);
        item.mesh.quaternion.setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          new THREE.Vector3().subVectors(p2, p1).normalize()
        );

        // Thinning and fading as atoms separate
        const thicknessScale = Math.max(0.04, 1 - easedT * 0.85);
        item.mesh.scale.set(thicknessScale, currDist / item.initialLen, thicknessScale);

        const mat = item.mesh.material as THREE.MeshStandardMaterial;
        mat.opacity = Math.max(0.12, 1 - easedT * 0.88);
      }

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (reqAnimIdRef.current) cancelAnimationFrame(reqAnimIdRef.current);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('touchstart', onTouchStart);
      dom.removeEventListener('touchmove', onTouchMove);
      dom.removeEventListener('touchend', onMouseUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(dom)) container.removeChild(dom);
    };
  }, [molecule, show2DFallback, autoRotate]);

  const handleZoom = (delta: number) => {
    if (!cameraRef.current) return;
    const baseZ = baseCameraZRef.current;
    const newZ = Math.max(3, Math.min(22, cameraRef.current.position.z + delta));
    cameraRef.current.position.z = newZ;
    setZoomLevel(Number((baseZ / newZ).toFixed(1)));
  };

  const handleReset = () => {
    if (cameraRef.current && moleculeGroupRef.current) {
      const baseZ = baseCameraZRef.current;
      cameraRef.current.position.set(0, 0, baseZ);
      moleculeGroupRef.current.rotation.set(0, 0, 0);
      setZoomLevel(1);
    }
  };

  const carbonCount = molecule.atoms.filter((a) => a.element === 'C').length;
  const hydrogenCount = molecule.atoms.filter((a) => a.element === 'H').length;

  const uniqueElements = Array.from(new Set(molecule.atoms.map((a) => a.element)));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
      {/* Molecule Header Info */}
      <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-slate-900/80 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl sm:text-2xl font-bold text-white">{molecule.name}</h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              {molecule.formula}
            </span>
            {molecule.substanceClassUz && (
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700/60">
                {molecule.substanceClassUz}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Geometriya: <span className="text-slate-200 font-medium">{molecule.geometry}</span> | 
            Bog‘ burchagi: <span className="text-cyan-300 font-mono">{molecule.bondAngle}</span> | 
            M: <span className="text-slate-200 font-mono">{molecule.molarMass} g/mol</span>
          </p>
        </div>

        {/* View Mode & Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Disassembly / Separate 3D toggle button (Requested by user) */}
          {!show2DFallback && webglSupported && (
            <button
              onClick={() => setIsDisassembled((prev) => !prev)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md ${
                isDisassembled
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-orange-500/25 ring-2 ring-amber-400 animate-pulse'
                  : 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 hover:border-cyan-400'
              }`}
              title={
                isDisassembled
                  ? "Molekulani butun 3D holatiga qayta yig‘ish"
                  : "Atomlarni fazoda qismlarga ajratib ko‘rsatish"
              }
            >
              {isDisassembled ? (
                <>
                  <Layers className="w-3.5 h-3.5" />
                  <span>Butun Holat (Yig‘ish)</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                  <span>Atomlarni Ajratish (3D)</span>
                </>
              )}
            </button>
          )}

          {webglSupported && (
            <button
              onClick={() => setShow2DFallback(!show2DFallback)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1.5"
              title="2D / 3D rejimni almashtirish"
            >
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              {show2DFallback ? '3D Rejim' : '2D Sxema'}
            </button>
          )}

          {!show2DFallback && (
            <>
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  autoRotate ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' : 'bg-slate-800 text-slate-400'
                }`}
                title={autoRotate ? 'Avtomatik aylanishni to‘xtatish' : 'Avtomatik aylanishni yoqish'}
              >
                <RotateCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleZoom(-1)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Kattalashtirish"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleZoom(1)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Kichraytirish"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={handleReset}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Holatni qayta tiklash"
              >
                <Compass className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main 3D Viewport or 2D fallback */}
      <div className="relative w-full h-[380px] sm:h-[460px] bg-radial from-slate-900 via-slate-950 to-black overflow-hidden flex items-center justify-center">
        {show2DFallback ? (
          /* 2D Chemical Schema fallback */
          <div className="p-6 text-center max-w-xl space-y-4">
            <div className="w-24 h-24 mx-auto rounded-full bg-slate-800/80 border border-cyan-500/30 flex items-center justify-center shadow-inner">
              <span className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono tracking-wider">
                {molecule.formula}
              </span>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-1">{molecule.name} — Strukturaviy Formulaviy Ko‘rinishi</h4>
              <p className="text-xs text-slate-400">
                Atomlar soni: <strong className="text-cyan-300">{molecule.atoms.length} ta</strong> | 
                Bog‘lar soni: <strong className="text-cyan-300">{molecule.bonds.length} ta</strong> | 
                Gibridlanish: <strong className="text-amber-300">{molecule.hybridization || '—'}</strong>
              </p>
            </div>

            {/* Handwritten-style 2D structural diagram if available */}
            {molecule.structuralFormula2D && (
              <div className="p-3 bg-slate-950/90 rounded-xl border border-cyan-500/30 text-left overflow-x-auto shadow-xl">
                <span className="text-[10px] font-mono uppercase text-cyan-400 block mb-1">
                  Strukturaviy formula (Daftardagi chizma):
                </span>
                <pre className="font-mono text-cyan-200 text-xs sm:text-sm leading-tight select-all">
                  {molecule.structuralFormula2D}
                </pre>
              </div>
            )}
          </div>
        ) : (
          <>
            <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

            {/* Active Disassembled State Banner (HUD - Top Left) */}
            {isDisassembled && (
              <div className="absolute top-3 left-3 max-w-[calc(100%-1.5rem)] bg-slate-950/90 backdrop-blur-md border border-amber-500/50 rounded-xl px-3 py-2 text-xs shadow-2xl flex items-center gap-2.5 z-10 animate-fade-in">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping shrink-0" />
                <div className="min-w-0">
                  <div className="font-bold text-white flex items-center gap-1.5 flex-wrap">
                    <span>Ajratilgan holat (Exploded 3D):</span>
                    <span className="text-amber-300 font-mono font-extrabold">
                      {molecule.atoms.length} ta atom
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-300 mt-0.5 flex items-center gap-1.5 flex-wrap">
                    {carbonCount > 0 && (
                      <span className="font-semibold text-cyan-300">
                        Uglerod (C): {carbonCount} ta
                      </span>
                    )}
                    {carbonCount > 0 && hydrogenCount > 0 && <span>•</span>}
                    {hydrogenCount > 0 && (
                      <span className="font-semibold text-slate-100">
                        Vodorod (H): {hydrogenCount} ta
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Floating Banner Centered at Bottom of 3D Viewport when Disassembled */}
            {isDisassembled && (
              <div className="absolute bottom-11 inset-x-2 sm:inset-x-4 max-w-xl mx-auto bg-slate-950/95 backdrop-blur-md border border-cyan-500/50 rounded-xl px-3 py-2 text-xs shadow-2xl z-10 transition-all pointer-events-none">
                <div className="flex items-center justify-center gap-2 flex-wrap text-center">
                  <div className="inline-flex items-center gap-1.5 font-bold text-white bg-slate-900/90 px-2 py-0.5 rounded-md border border-cyan-500/30 shrink-0">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
                    <span className="text-cyan-300">Modda:</span>
                    <span>{molecule.name}</span>
                    <span className="text-cyan-400 font-mono">({molecule.formula})</span>
                  </div>
                  <span className="text-amber-300 font-semibold px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-[11px]">
                    {molecule.substanceClassUz || 'Kimyoviy modda'}
                  </span>
                  <span className="text-slate-300 text-[10px] font-mono bg-slate-900/80 px-2 py-0.5 rounded-md border border-slate-700/60">
                    {molecule.separatedElementsSummaryUz}
                  </span>
                </div>
              </div>
            )}

            {/* Overlay hint */}
            <div className="absolute bottom-2.5 left-3 bg-slate-950/70 backdrop-blur-md border border-slate-800/80 rounded-lg px-2.5 py-1 text-[11px] text-slate-400 flex items-center gap-1.5 pointer-events-none">
              <Eye className="w-3 h-3 text-cyan-400" />
              <span className="hidden xs:inline">360° aylantiring</span>
            </div>

            {/* Scale badge */}
            <div className="absolute bottom-2.5 right-3 bg-slate-950/70 backdrop-blur-md border border-slate-800/80 rounded-lg px-2 py-1 text-[11px] font-mono text-cyan-300 pointer-events-none">
              Zoom: {zoomLevel}x
            </div>
          </>
        )}
      </div>

      {/* SPECIAL SUBSTANCE BANNER UNDERNEATH VIEWPORT WHEN DISASSEMBLED (Requested by User) */}
      {isDisassembled && (
        <div className="w-full p-4 sm:p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-t border-cyan-500/30 transition-all duration-300 animate-fade-in">
          <div className="w-full space-y-3">
            {/* Header row */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-slate-800/80">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5 shadow-sm">
                  <FlaskConical className="w-3.5 h-3.5 text-amber-400" />
                  Ajralgan Modda Tavsifi
                </span>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-base font-bold text-white">{molecule.name}</h4>
                  <span className="font-mono text-xs font-bold text-cyan-400 bg-slate-950 px-2 py-0.5 rounded-md border border-cyan-500/30">
                    {molecule.formula}
                  </span>
                </div>
              </div>

              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                {molecule.substanceClassUz || molecule.geometry}
              </span>
            </div>

            {/* Description details: clean responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-0.5">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Tarkibiy Atomlar:
                </span>
                <p className="text-xs font-medium text-amber-200">
                  {molecule.separatedElementsSummaryUz || `${molecule.atoms.length} ta atom`}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Agregat Holati & Xossasi:
                </span>
                <p className="text-xs font-medium text-slate-200">
                  {molecule.physicalStateUz || 'Oddiy sharoitdagi kimyoviy modda'}
                </p>
              </div>
            </div>

            {/* Atom breakdown chips - fully visible & wrapped */}
            <div className="pt-1 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-400 mr-1">
                Ajralgan elementlar:
              </span>
              {uniqueElements.map((elem) => {
                const atomObj = molecule.atoms.find((a) => a.element === elem);
                const count = molecule.atoms.filter((a) => a.element === elem).length;
                const elemName =
                  elem === 'C' ? 'Uglerod' :
                  elem === 'H' ? 'Vodorod' :
                  elem === 'O' ? 'Kislorod' :
                  elem === 'N' ? 'Azot' :
                  elem === 'Cl' ? 'Xlor' : elem;
                return (
                  <div
                    key={elem}
                    className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 shadow-sm text-xs"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-black/40 shadow-sm"
                      style={{ backgroundColor: atomObj?.color || '#94a3b8' }}
                    />
                    <span className="font-bold text-white font-mono">{elem}</span>
                    <span className="text-slate-400 text-[11px]">{elemName}</span>
                    <span className="text-cyan-300 font-bold font-mono text-[11px]">({count} ta)</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Description & Atom Legend */}
      <div className="p-4 sm:p-5 bg-slate-900/60 border-t border-slate-800/80 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between text-xs">
        <div className="space-y-1 flex-1">
          <p className="text-slate-300 leading-relaxed">
            {molecule.descriptionUz}
          </p>
          {isDisassembled && (
            <p className="text-amber-300 text-[11px] font-medium flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-amber-400" />
              Tugmani qayta bosish orqali barcha atomlarni silliq uchirib, molekulani yana butun 3D ko‘rinishiga qaytarishingiz mumkin.
            </p>
          )}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <span className="text-slate-400 font-medium">Elementlar:</span>
          {Array.from(new Set(molecule.atoms.map((a) => a.symbol.replace(/[0-9]/g, '')))).map((sym) => {
            const atom = molecule.atoms.find((a) => a.element === sym)!;
            const count = molecule.atoms.filter((a) => a.element === sym).length;
            return (
              <div
                key={sym}
                className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/50"
              >
                <span
                  className="w-3 h-3 rounded-full border border-black/30"
                  style={{ backgroundColor: atom?.color || '#94a3b8' }}
                />
                <span className="font-mono font-bold text-slate-200">{sym}</span>
                <span className="text-[10px] text-slate-400">({count} ta)</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
