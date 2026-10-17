import React, { useState, useMemo } from 'react';
import { MOLECULES_DATA } from '../data/moleculesData';
import { Molecule3DViewer } from '../components/Molecule3DViewer';
import { Molecule3DData } from '../types/chemistry';
import { Box, Sparkles, Layers, Info, Check, Filter } from 'lucide-react';

type FilterType = 'all' | 'alkanes' | 'inorganic' | 'aromatic';

export const MoleculesPage: React.FC = () => {
  const [selectedMolecule, setSelectedMolecule] = useState<Molecule3DData>(MOLECULES_DATA[0]);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredMolecules = useMemo(() => {
    if (activeFilter === 'alkanes') {
      return MOLECULES_DATA.filter((m) => m.substanceClassUz?.includes('Alkanlar'));
    }
    if (activeFilter === 'inorganic') {
      return MOLECULES_DATA.filter((m) => 
        !m.substanceClassUz?.includes('Alkanlar') && 
        m.id !== 'benzene' && 
        m.id !== 'c2h5oh'
      );
    }
    if (activeFilter === 'aromatic') {
      return MOLECULES_DATA.filter((m) => m.id === 'benzene' || m.id === 'c2h5oh');
    }
    return MOLECULES_DATA;
  }, [activeFilter]);

  const newMoleculeIds = new Set([
    'ethane', 'propane', 'butane', 'pentane', 'hexane', 'heptane', 'octane', 'nonane', 'decane', 'benzene'
  ]);

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="pb-4 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-lg bg-sky-500/10 text-sky-400">
              <Box className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              3D Fazoviy Molekulalar
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Atomlarning fazoviy tuzilishi, valent burchaklari, 3D ajralish animatsiyasi va modda tavsiflari
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeFilter === 'all'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Barchasi ({MOLECULES_DATA.length})
          </button>
          <button
            onClick={() => setActiveFilter('alkanes')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeFilter === 'alkanes'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Alkanlar C₁–C₁₀ (10)
          </button>
          <button
            onClick={() => setActiveFilter('inorganic')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeFilter === 'inorganic'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Oddiy & Gazlar
          </button>
          <button
            onClick={() => setActiveFilter('aromatic')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeFilter === 'aromatic'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Aromatik & Spirt
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Molecule Selector list (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Molekulalar Ro‘yxati ({filteredMolecules.length})
            </h3>
            <span className="text-[11px] text-cyan-400 font-mono">
              3D & Exploded View
            </span>
          </div>

          <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
            {filteredMolecules.map((mol) => {
              const isSelected = mol.id === selectedMolecule.id;
              const isNew = newMoleculeIds.has(mol.id);
              const isAlkane = mol.substanceClassUz?.includes('Alkanlar');

              return (
                <button
                  key={mol.id}
                  onClick={() => setSelectedMolecule(mol)}
                  className={`w-full p-3.5 rounded-2xl text-left border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-500 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/30'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex-1 pr-2">
                    <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                      <h4 className="text-sm font-bold text-white">{mol.name}</h4>
                      <span className="font-mono text-xs font-bold text-cyan-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        {mol.formula}
                      </span>
                      {isAlkane && (
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-sky-500/10 text-sky-300 border border-sky-500/30">
                          Alkan
                        </span>
                      )}
                      {isNew && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          Yangi
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">
                      {mol.substanceClassUz || `${mol.geometry} • ${mol.bondAngle}`}
                    </p>
                  </div>

                  {isSelected ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400 animate-pulse shrink-0" />
                  ) : (
                    <span className="text-[11px] font-mono text-slate-500 shrink-0">
                      {mol.atoms.length} atom
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick info card */}
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl text-xs text-slate-400 space-y-2">
            <span className="font-bold text-slate-200 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-cyan-400" />
              CPK Xalqaro Rang Standarti:
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-white border border-slate-400" />
                <span>Vodorod (H) — Oq</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-slate-700" />
                <span>Uglerod (C) — Qora</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span>Kislorod (O) — Qizil</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                <span>Azot (N) — Ko‘k</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span>Xlor (Cl) — Yashil</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive 3D Viewer (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          <Molecule3DViewer
            key={selectedMolecule.id}
            molecule={selectedMolecule}
          />
        </div>
      </div>
    </div>
  );
};
