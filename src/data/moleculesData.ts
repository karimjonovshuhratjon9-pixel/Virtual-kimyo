import { Molecule3DData } from '../types/chemistry';

function createLinearAlkane(
  id: string,
  name: string,
  formula: string,
  n: number,
  descriptionUz: string,
  physicalStateUz: string,
  extraDetailsUz?: string
): Molecule3DData {
  const atoms: Molecule3DData['atoms'] = [];
  const bonds: [number, number][] = [];

  const stepX = 0.95;
  const startX = -((n - 1) / 2) * stepX;

  // 1. Generate Carbon backbone (indices 0 .. n-1)
  for (let i = 0; i < n; i++) {
    const x = Number((startX + i * stepX).toFixed(3));
    // Tetrahedral zigzag alternating in Y
    const isPeak = i % 2 !== 0;
    const y = isPeak ? 0.35 : -0.35;

    atoms.push({
      element: "C",
      symbol: `C${i + 1}`,
      position: [x, y, 0],
      color: "#334155",
      radius: 0.46,
    });

    if (i > 0) {
      bonds.push([i - 1, i]);
    }
  }

  // 2. Generate Hydrogens
  for (let i = 0; i < n; i++) {
    const cX = atoms[i].position[0];
    const cY = atoms[i].position[1];
    const isPeak = i % 2 !== 0;
    const yDir = isPeak ? 0.65 : -0.65;

    // Side hydrogen 1 (+Z)
    const h1Idx = atoms.length;
    atoms.push({
      element: "H",
      symbol: "H",
      position: [cX, Number((cY + yDir).toFixed(3)), 0.75],
      color: "#f8fafc",
      radius: 0.3,
    });
    bonds.push([i, h1Idx]);

    // Side hydrogen 2 (-Z)
    const h2Idx = atoms.length;
    atoms.push({
      element: "H",
      symbol: "H",
      position: [cX, Number((cY + yDir).toFixed(3)), -0.75],
      color: "#f8fafc",
      radius: 0.3,
    });
    bonds.push([i, h2Idx]);

    // Terminal extra hydrogens
    if (i === 0) {
      const hTerminalStartIdx = atoms.length;
      atoms.push({
        element: "H",
        symbol: "H",
        position: [Number((cX - 0.75).toFixed(3)), cY, 0],
        color: "#f8fafc",
        radius: 0.3,
      });
      bonds.push([i, hTerminalStartIdx]);
    } else if (i === n - 1) {
      const hTerminalEndIdx = atoms.length;
      atoms.push({
        element: "H",
        symbol: "H",
        position: [Number((cX + 0.75).toFixed(3)), cY, 0],
        color: "#f8fafc",
        radius: 0.3,
      });
      bonds.push([i, hTerminalEndIdx]);
    }
  }

  const molarMass = Number((n * 12.011 + (2 * n + 2) * 1.008).toFixed(2));
  const hCount = 2 * n + 2;

  // Auto-generate handwritten 2D structural diagram
  const topLine = "    " + "H   ".repeat(n);
  const midLine = "H - " + "C - ".repeat(n - 1) + "C - H";
  const botLine = "    " + "H   ".repeat(n);
  const structuralFormula2D = `${topLine}\n${midLine}\n${botLine}`;

  return {
    id,
    name,
    formula,
    geometry: "Fazoviy zigzag zanjir",
    bondAngle: "109.5°",
    hybridization: "sp³",
    molarMass,
    descriptionUz: `${descriptionUz} ${extraDetailsUz || ''}`.trim(),
    structuralFormula2D,
    substanceClassUz: `Alkanlar (To‘yingan uglevodorodlar) — ${n}-vakili`,
    substanceTypeUz: "Organik to‘yingan modda",
    physicalStateUz,
    separatedElementsSummaryUz: `${n} ta Uglerod (C) va ${hCount} ta Vodorod (H) atomi (Jami ${n + hCount} ta atom)`,
    atoms,
    bonds,
  };
}

export const MOLECULES_DATA: Molecule3DData[] = [
  // 1. Water
  {
    id: "h2o",
    name: "Suv",
    formula: "H₂O",
    geometry: "Burchakli (V-simon)",
    bondAngle: "104.5°",
    hybridization: "sp³",
    molarMass: 18.015,
    descriptionUz: "Yer yuzidagi hayot asosi bo‘lgan qutbli molekula. Kislorod atomidagi 2 ta bo‘linmagan elektron jufti sababli burchak 104.5° ni tashkil qiladi va vodorod bog‘lanishlarini hosil qiladi.",
    structuralFormula2D: "  H\n / \nO\n \\\n  H",
    substanceClassUz: "Murakkab anorganik birikma (Vodorod oksidi)",
    substanceTypeUz: "Anorganik qutbli modda",
    physicalStateUz: "Rangsiz, ta'msiz, hidsiz shaffof suyuqlik",
    separatedElementsSummaryUz: "1 ta Kislorod (O) va 2 ta Vodorod (H) atomi (Jami 3 ta atom)",
    atoms: [
      { element: "O", symbol: "O", position: [0, 0, 0], color: "#ef4444", radius: 0.55 },
      { element: "H", symbol: "H", position: [-0.85, 0.65, 0], color: "#f8fafc", radius: 0.35 },
      { element: "H", symbol: "H", position: [0.85, 0.65, 0], color: "#f8fafc", radius: 0.35 },
    ],
    bonds: [
      [0, 1],
      [0, 2]
    ]
  },

  // 2. Carbon Dioxide
  {
    id: "co2",
    name: "Karbonat angidrid",
    formula: "CO₂",
    geometry: "Chiziqli",
    bondAngle: "180°",
    hybridization: "sp",
    molarMass: 44.009,
    descriptionUz: "Ikki qo‘shbog‘li chiziqli simmetrik noqutbiy molekula. O‘simliklar fotosintezi uchun xomashyo va issiqxona gazi.",
    structuralFormula2D: "O = C = O",
    substanceClassUz: "Kislotali oksid (Uglerod (IV)-oksidi)",
    substanceTypeUz: "Anorganik modda (Gaz)",
    physicalStateUz: "Rangsiz, hidsiz, havodan 1.5 baravar og‘ir gaz",
    separatedElementsSummaryUz: "1 ta Uglerod (C) va 2 ta Kislorod (O) atomi (Jami 3 ta atom)",
    atoms: [
      { element: "C", symbol: "C", position: [0, 0, 0], color: "#334155", radius: 0.5 },
      { element: "O", symbol: "O", position: [-1.4, 0, 0], color: "#ef4444", radius: 0.45 },
      { element: "O", symbol: "O", position: [1.4, 0, 0], color: "#ef4444", radius: 0.45 },
    ],
    bonds: [
      [0, 1],
      [0, 2]
    ]
  },

  // 3. Methane (Alkane 1)
  {
    id: "ch4",
    name: "Metan",
    formula: "CH₄",
    geometry: "Tetraedrik",
    bondAngle: "109.5°",
    hybridization: "sp³",
    molarMass: 16.043,
    descriptionUz: "Alkanlar (to‘yingan uglevodorodlar) gomologik qatorining eng birinchi vakili (tabiiy gazning 95% qismi). Markaziy uglerod atomi to‘rtta vodorod bilan fazoda muntazam tetraedr hosil qiladi.",
    structuralFormula2D: "    H\n    |\nH - C - H\n    |\n    H",
    substanceClassUz: "Alkanlar (To‘yingan uglevodorodlar) — 1-vakili",
    substanceTypeUz: "Organik to‘yingan uglevodorod",
    physicalStateUz: "Rangsiz, hidsiz, havodan yengil yonuvchan gaz",
    separatedElementsSummaryUz: "1 ta Uglerod (C) va 4 ta Vodorod (H) atomi (Jami 5 ta atom)",
    atoms: [
      { element: "C", symbol: "C", position: [0, 0, 0], color: "#334155", radius: 0.5 },
      { element: "H", symbol: "H", position: [0, 1.1, 0], color: "#f8fafc", radius: 0.32 },
      { element: "H", symbol: "H", position: [1.02, -0.37, 0], color: "#f8fafc", radius: 0.32 },
      { element: "H", symbol: "H", position: [-0.51, -0.37, 0.89], color: "#f8fafc", radius: 0.32 },
      { element: "H", symbol: "H", position: [-0.51, -0.37, -0.89], color: "#f8fafc", radius: 0.32 },
    ],
    bonds: [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4]
    ]
  },

  // 4. Ethane (Alkane 2)
  createLinearAlkane(
    "ethane",
    "Etan",
    "C₂H₆",
    2,
    "Alkanlar gomologik qatorining 2-vakili. 2 ta uglerod va 6 ta vodorod atomidan iborat.",
    "Rangsiz, hidsiz gaz (Neftga yo‘ldosh gazlarda uchraydi)",
    "Kimyo sanoatida etilen (polietilen) olish uchun asosiy xomashyo hisoblanadi."
  ),

  // 5. Propane (Alkane 3)
  createLinearAlkane(
    "propane",
    "Propan",
    "C₃H₈",
    3,
    "Alkanlar gomologik qatorining 3-vakili. 3 ta uglerod va 8 ta vodorod atomidan iborat.",
    "Oson suyuluvchi rangsiz yonuvchan gaz (Suyultirilgan maishiy gaz)",
    "Avtomobillar uchun gaz yoqilg‘isi va maishiy isitishda keng qo‘llaniladi."
  ),

  // 6. Butane (Alkane 4)
  createLinearAlkane(
    "butane",
    "Butan",
    "C₄H₁₀",
    4,
    "Alkanlar gomologik qatorining 4-vakili. 4 ta uglerod va 10 ta vodorod atomidan iborat.",
    "Oddiy sharoitda gaz, bosim ostida oson suyuqlanadi (Zajigalka va aerozollarda)",
    "Sintetik kauchuk va yoqilg‘i aralashmalarining muhim qismi."
  ),

  // 7. Pentane (Alkane 5)
  createLinearAlkane(
    "pentane",
    "Pentan",
    "C₅H₁₂",
    5,
    "Alkanlar gomologik qatorining 5-vakili. 5 ta uglerod va 12 ta vodorod atomidan tashkil topgan.",
    "Yengil, uchuvchan rangsiz suyuqlik (Qaynash harorati 36.1 °C)",
    "Laboratoriyada toza erituvchi va ko‘pikli plastmassa (penoplast) ishlab chiqarishda ishlatiladi."
  ),

  // 8. Hexane (Alkane 6)
  createLinearAlkane(
    "hexane",
    "Geksan",
    "C₆H₁₄",
    6,
    "Alkanlar gomologik qatorining 6-vakili. 6 ta uglerod va 14 ta vodorod atomidan iborat.",
    "O‘ziga xos hidli, yengil uchuvchan rangsiz suyuqlik",
    "O‘simlik yog‘larini ajratib olishda va organik sintezda asosiy qutbsiz erituvchi."
  ),

  // 9. Heptane (Alkane 7)
  createLinearAlkane(
    "heptane",
    "Geptan",
    "C₇H₁₆",
    7,
    "Alkanlar gomologik qatorining 7-vakili. 7 ta uglerod va 16 ta vodorod atomidan iborat.",
    "Yonuvchi shaffof suyuqlik (Oktan soni etaloni 0 ga teng)",
    "Motor yoqilg‘ilarining detonatsion xususiyatlarini aniqlashda etalon modda."
  ),

  // 10. Octane (Alkane 8)
  createLinearAlkane(
    "octane",
    "Oktan",
    "C₈H₁₈",
    8,
    "Alkanlar gomologik qatorining 8-vakili. 8 ta uglerod va 18 ta vodorod atomidan iborat.",
    "Benzinning xarakterli hidiga ega shaffof suyuqlik (Oktan soni 100 etaloni)",
    "Ichki yonuv dvigatellari yoqilg‘isi (benzin) sifatining xalqaro ko‘rsatkichi."
  ),

  // 11. Nonane (Alkane 9)
  createLinearAlkane(
    "nonane",
    "Nonan",
    "C₉H₂₀",
    9,
    "Alkanlar (to‘yingan uglevodorodlar) sinfining 9-vakili (Nonan). 9 ta uglerod va 20 ta vodorod atomidan iborat.",
    "Rangsiz yonuvchi suyuqlik (Kerosin va reaktiv yoqilg‘ilar tarkibida)",
    "Barcha uglerod atomlari sp³ gibridlangan bo‘lib, 109.5° valent burchakka ega zigzag zanjir hosil qiladi."
  ),

  // 12. Decane (Alkane 10)
  createLinearAlkane(
    "decane",
    "Dekan",
    "C₁₀H₂₂",
    10,
    "Alkanlar gomologik qatorining 10-vakili (Dekan). 10 ta uglerod va 22 ta vodorod atomidan tashkil topgan.",
    "Qovushqoqroq organik suyuqlik (Kerosin va dizel fraksiyasining muhim qismi)",
    "Neftni haydash natijasida ajratib olinadigan yuqori alkanlarning vakili."
  ),

  // 13. Benzene
  {
    id: "benzene",
    name: "Benzol",
    formula: "C₆H₆",
    geometry: "Yassi muntazam oltiburchak",
    bondAngle: "120°",
    hybridization: "sp²",
    molarMass: 78.114,
    descriptionUz: "Aromatik uglevodorodlarning (arenlarning) eng sodda va muhim vakili. Halqadagi 6 ta uglerod atomi yagona yopiq π-elektron bulutini hosil qiladi.",
    structuralFormula2D: "    CH\n   /  \\\n CH    CH\n ||    |\n CH    CH\n   \\  /\n    CH",
    substanceClassUz: "Aromatik uglevodorodlar (Arenlar)",
    substanceTypeUz: "Organik aromatik modda",
    physicalStateUz: "O‘ziga xos hidli, yaltiroq alanga bilan yonuvchi rangsiz suyuqlik",
    separatedElementsSummaryUz: "6 ta Uglerod (C) va 6 ta Vodorod (H) atomi (Jami 12 ta atom)",
    atoms: [
      // 6 Carbons in planar hexagon (R = 1.4)
      ...[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i * 60 * Math.PI) / 180;
        return {
          element: "C",
          symbol: `C${i + 1}`,
          position: [Number((1.4 * Math.cos(angle)).toFixed(3)), Number((1.4 * Math.sin(angle)).toFixed(3)), 0] as [number, number, number],
          color: "#334155",
          radius: 0.46,
        };
      }),
      // 6 Hydrogens attached radially (R = 2.45)
      ...[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i * 60 * Math.PI) / 180;
        return {
          element: "H",
          symbol: "H",
          position: [Number((2.45 * Math.cos(angle)).toFixed(3)), Number((2.45 * Math.sin(angle)).toFixed(3)), 0] as [number, number, number],
          color: "#f8fafc",
          radius: 0.3,
        };
      }),
    ],
    bonds: [
      // C-C ring
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
      // C-H bonds
      [0, 6], [1, 7], [2, 8], [3, 9], [4, 10], [5, 11]
    ]
  },

  // 14. Ammonia
  {
    id: "nh3",
    name: "Ammiak",
    formula: "NH₃",
    geometry: "Trigonal piramida",
    bondAngle: "107.3°",
    hybridization: "sp³",
    molarMass: 17.031,
    descriptionUz: "Kuchli o‘tkir hidli, suvda o‘ta yaxshi eriydigan gaz. Azot atomidagi bir juft bo‘linmagan elektron bog‘ burchagini 107.3° ga siqadi.",
    structuralFormula2D: "  :N:\n / | \\\nH  H  H",
    substanceClassUz: "Uchuvchan vodorodli birikma (Gidrid / Ishqoriy asosli gaz)",
    substanceTypeUz: "Anorganik modda",
    physicalStateUz: "O‘tkir hidli, ko‘zni yoshlantiruvchi rangsiz gaz",
    separatedElementsSummaryUz: "1 ta Azot (N) va 3 ta Vodorod (H) atomi (Jami 4 ta atom)",
    atoms: [
      { element: "N", symbol: "N", position: [0, 0.3, 0], color: "#3b82f6", radius: 0.5 },
      { element: "H", symbol: "H", position: [0.95, -0.2, 0], color: "#f8fafc", radius: 0.32 },
      { element: "H", symbol: "H", position: [-0.47, -0.2, 0.82], color: "#f8fafc", radius: 0.32 },
      { element: "H", symbol: "H", position: [-0.47, -0.2, -0.82], color: "#f8fafc", radius: 0.32 },
    ],
    bonds: [
      [0, 1],
      [0, 2],
      [0, 3]
    ]
  },

  // 15. Oxygen Gas
  {
    id: "o2",
    name: "Kislorod gazi",
    formula: "O₂",
    geometry: "Chiziqli",
    bondAngle: "180°",
    hybridization: "—",
    molarMass: 31.998,
    descriptionUz: "Ikki atomli oddiy modda. Atomlar o‘zaro qo‘sh kovalent bog‘ (O=O) orqali bog‘langan.",
    structuralFormula2D: "O = O",
    substanceClassUz: "Oddiy modda (Ikki atomli gaz, metallmas)",
    substanceTypeUz: "Oddiy modda (Gaz)",
    physicalStateUz: "Rangsiz, ta'msiz, tirik mavjudotlar nafas olishi uchun shart bo‘lgan gaz",
    separatedElementsSummaryUz: "2 ta Kislorod (O) atomi (Jami 2 ta atom)",
    atoms: [
      { element: "O", symbol: "O", position: [-0.7, 0, 0], color: "#ef4444", radius: 0.48 },
      { element: "O", symbol: "O", position: [0.7, 0, 0], color: "#ef4444", radius: 0.48 },
    ],
    bonds: [
      [0, 1]
    ]
  },

  // 16. Nitrogen Gas
  {
    id: "n2",
    name: "Azot gazi",
    formula: "N₂",
    geometry: "Chiziqli",
    bondAngle: "180°",
    hybridization: "—",
    molarMass: 28.014,
    descriptionUz: "O‘ta mustahkam uch karrali kovalent bog‘ga (N≡N) ega gaz. Shu sababli xona haroratida kimyoviy jihatdan juda sust.",
    structuralFormula2D: "N ≡ N",
    substanceClassUz: "Oddiy modda (Ikki atomli gaz, metallmas)",
    substanceTypeUz: "Oddiy modda (Gaz)",
    physicalStateUz: "Atmosfera havosining 78% qismini tashkil qiluvchi inert gaz",
    separatedElementsSummaryUz: "2 ta Azot (N) atomi (Jami 2 ta atom)",
    atoms: [
      { element: "N", symbol: "N", position: [-0.65, 0, 0], color: "#3b82f6", radius: 0.48 },
      { element: "N", symbol: "N", position: [0.65, 0, 0], color: "#3b82f6", radius: 0.48 },
    ],
    bonds: [
      [0, 1]
    ]
  },

  // 17. Hydrochloric Acid
  {
    id: "hcl",
    name: "Xlorid kislota (Xlorvodorod)",
    formula: "HCl",
    geometry: "Chiziqli",
    bondAngle: "180°",
    hybridization: "—",
    molarMass: 36.46,
    descriptionUz: "Qutbli kovalent bog‘ga ega ikki atomli molekula. Elektron jufti kuchli elektrmanfiy xlor atomi tomonga siljigan.",
    structuralFormula2D: "H - Cl",
    substanceClassUz: "Kuchli bir asosli anorganik kislota",
    substanceTypeUz: "Anorganik kislota",
    physicalStateUz: "O‘tkir bo‘g‘uvchi hidli rangsiz gaz (suvdagi eritmasi kislota)",
    separatedElementsSummaryUz: "1 ta Vodorod (H) va 1 ta Xlor (Cl) atomi (Jami 2 ta atom)",
    atoms: [
      { element: "H", symbol: "H", position: [-0.85, 0, 0], color: "#f8fafc", radius: 0.33 },
      { element: "Cl", symbol: "Cl", position: [0.65, 0, 0], color: "#10b981", radius: 0.58 },
    ],
    bonds: [
      [0, 1]
    ]
  },

  // 18. Ethanol
  {
    id: "c2h5oh",
    name: "Etanol (Etil spirti)",
    formula: "C₂H₅OH",
    geometry: "Fazoviy zanjir",
    bondAngle: "~109°",
    hybridization: "sp³",
    molarMass: 46.069,
    descriptionUz: "Bir atomli to‘yingan spirt. Gidroksil (-OH) guruhi molekulaga suvda cheksiz erish va vodorod bog‘lanish qobiliyatini beradi.",
    structuralFormula2D: "  H   H\n  |   |\nH-C - C - O - H\n  |   |\n  H   H",
    substanceClassUz: "Bir atomli to‘yingan spirtlar (Alkogollar)",
    substanceTypeUz: "Organik kislorodli birikma",
    physicalStateUz: "O‘ziga xos hidli, yengil alangalanuvchi rangsiz suyuqlik",
    separatedElementsSummaryUz: "2 ta Uglerod (C), 6 ta Vodorod (H) va 1 ta Kislorod (O) atomi (Jami 9 ta atom)",
    atoms: [
      { element: "C", symbol: "C1", position: [-0.8, 0, 0], color: "#334155", radius: 0.45 },
      { element: "C", symbol: "C2", position: [0.5, 0.4, 0], color: "#334155", radius: 0.45 },
      { element: "O", symbol: "O", position: [1.5, -0.4, 0], color: "#ef4444", radius: 0.45 },
      { element: "H", symbol: "H", position: [2.3, -0.1, 0], color: "#f8fafc", radius: 0.3 },
      { element: "H", symbol: "H", position: [-1.4, -0.5, 0.6], color: "#f8fafc", radius: 0.3 },
      { element: "H", symbol: "H", position: [-1.4, -0.5, -0.6], color: "#f8fafc", radius: 0.3 },
      { element: "H", symbol: "H", position: [-0.8, 1.0, 0], color: "#f8fafc", radius: 0.3 },
      { element: "H", symbol: "H", position: [0.5, 1.1, 0.6], color: "#f8fafc", radius: 0.3 },
      { element: "H", symbol: "H", position: [0.5, 1.1, -0.6], color: "#f8fafc", radius: 0.3 },
    ],
    bonds: [
      [0, 1],
      [1, 2],
      [2, 3],
      [0, 4],
      [0, 5],
      [0, 6],
      [1, 7],
      [1, 8]
    ]
  }
];
