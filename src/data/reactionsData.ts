import { ChemicalReaction } from '../types/chemistry';

export const REACTIONS_DATA: ChemicalReaction[] = [
  {
    id: "rx-1",
    name: "Vodorod va kislorodning birikishi (Suv sintezi)",
    type: "Birikish",
    equation: "2H₂ + O₂ → 2H₂O",
    reactants: ["H₂", "O₂"],
    products: ["H₂O"],
    conditions: "Uchqun yoki t° = 500°C",
    observation: "Gursillagan ovoz (portlash) va suv bug‘lari hosil bo‘ladi.",
    explanation: "Ikki oddiy modda o‘zaro birikib bitta murakkab modda (suv) hosil qiladi.",
    grade: 7,
    balancedEquationChallenge: {
      unbalancedEquation: "H₂ + O₂ → H₂O",
      reactants: [
        { formula: "H₂", correctCoef: 2 },
        { formula: "O₂", correctCoef: 1 }
      ],
      products: [
        { formula: "H₂O", correctCoef: 2 }
      ],
      hint: "Kislorod atomlarini tenglashtirish uchun o‘ng tomonga 2 koeffitsiyent qo‘ying, keyin vodorodni tenglashtiring."
    }
  },
  {
    id: "rx-2",
    name: "Kalsiy karbonatning termik parchalanishi (Ohak kuydirish)",
    type: "Ajralish",
    equation: "CaCO₃ —(1000°C)→ CaO + CO₂↑",
    reactants: ["CaCO₃"],
    products: ["CaO", "CO₂"],
    conditions: "t° = 900–1000°C",
    observation: "Oq tosh so‘nmagan ohakka aylanadi va rangsiz gaz ajraladi.",
    explanation: "Murakkab modda qizdirilganda ikki soddaroq oksidga parchalanadi.",
    grade: 8,
    balancedEquationChallenge: {
      unbalancedEquation: "CaCO₃ → CaO + CO₂",
      reactants: [
        { formula: "CaCO₃", correctCoef: 1 }
      ],
      products: [
        { formula: "CaO", correctCoef: 1 },
        { formula: "CO₂", correctCoef: 1 }
      ],
      hint: "Barcha atomlar (1 Ca, 1 C, 3 O) ikkala tomonda allaqachon teng."
    }
  },
  {
    id: "rx-3",
    name: "Rux va xlorid kislotaning ta’sirlashuvi (Vodorod olish)",
    type: "O‘rin olish",
    equation: "Zn + 2HCl → ZnCl₂ + H₂↑",
    reactants: ["Zn", "HCl"],
    products: ["ZnCl₂", "H₂"],
    conditions: "Xona harorati",
    observation: "Rux donasi eriydi, juda ko‘p mayda gaz pufakchalari otilib chiqadi.",
    explanation: "Faol metall kislotadan vodorodni siqib chiqaradi.",
    grade: 8,
    balancedEquationChallenge: {
      unbalancedEquation: "Zn + HCl → ZnCl₂ + H₂",
      reactants: [
        { formula: "Zn", correctCoef: 1 },
        { formula: "HCl", correctCoef: 2 }
      ],
      products: [
        { formula: "ZnCl₂", correctCoef: 1 },
        { formula: "H₂", correctCoef: 1 }
      ],
      hint: "O‘ng tomonda 2 ta Cl va 2 ta H bor, chapdagi HCl oldiga 2 qo‘ying."
    }
  },
  {
    id: "rx-4",
    name: "Natriy gidroksid va sulfat kislota neytrallanishi",
    type: "Neytrallanish",
    equation: "2NaOH + H₂SO₄ → Na₂SO₄ + 2H₂O",
    reactants: ["NaOH", "H₂SO₄"],
    products: ["Na₂SO₄", "H₂O"],
    conditions: "Xona harorati",
    observation: "Eritma qiziydi, fenolftalein indikatorining malina rangi yo‘qoladi.",
    explanation: "Kuchli asos va kuchli ikki negizli kislota neytrallanib o‘rta tuz beradi.",
    grade: 8,
    balancedEquationChallenge: {
      unbalancedEquation: "NaOH + H₂SO₄ → Na₂SO₄ + H₂O",
      reactants: [
        { formula: "NaOH", correctCoef: 2 },
        { formula: "H₂SO₄", correctCoef: 1 }
      ],
      products: [
        { formula: "Na₂SO₄", correctCoef: 1 },
        { formula: "H₂O", correctCoef: 2 }
      ],
      hint: "O‘ngdagi Na₂SO₄ tarkibida 2 ta Na bor, shuning uchun NaOH oldiga 2 qo‘ying."
    }
  },
  {
    id: "rx-5",
    name: "Kumush nitrat va natriy xlorid (Oq cho‘kma)",
    type: "Cho‘kma",
    equation: "AgNO₃ + NaCl → AgCl↓ + NaNO₃",
    reactants: ["AgNO₃", "NaCl"],
    products: ["AgCl", "NaNO₃"],
    conditions: "Suvli eritma",
    observation: "Qor-oppoq tvorogsimon AgCl cho‘kmasi bir zumda paydo bo‘ladi.",
    explanation: "Ag⁺ ionlari Cl⁻ ionlari bilan uchrashganda suvda erimaydigan kumush xlorid hosil bo‘ladi (Xloridlar sifat reaksiyasi).",
    grade: 8,
    balancedEquationChallenge: {
      unbalancedEquation: "AgNO₃ + NaCl → AgCl + NaNO₃",
      reactants: [
        { formula: "AgNO₃", correctCoef: 1 },
        { formula: "NaCl", correctCoef: 1 }
      ],
      products: [
        { formula: "AgCl", correctCoef: 1 },
        { formula: "NaNO₃", correctCoef: 1 }
      ],
      hint: "Barcha atomlar birga-bir nisbatda."
    }
  },
  {
    id: "rx-6",
    name: "Temir (III) oksidning uglerod (II) oksid bilan qaytarilishi (Po‘lat ishlab chiqarish)",
    type: "Oksidlanish-qaytarilish",
    equation: "Fe₂O₃ + 3CO → 2Fe + 3CO₂",
    reactants: ["Fe₂O₃", "CO"],
    products: ["Fe", "CO₂"],
    conditions: "t° = 700–900°C (Domen pechi)",
    observation: "Qizg‘ish-qo‘ng‘ir ruda qora metall temirga aylanadi.",
    explanation: "Uglerod (II) oksid temirni rudasidan qaytarib metall hosil qiladi.",
    grade: 9,
    balancedEquationChallenge: {
      unbalancedEquation: "Fe₂O₃ + CO → Fe + CO₂",
      reactants: [
        { formula: "Fe₂O₃", correctCoef: 1 },
        { formula: "CO", correctCoef: 3 }
      ],
      products: [
        { formula: "Fe", correctCoef: 2 },
        { formula: "CO₂", correctCoef: 3 }
      ],
      hint: "Fe₂O₃ dagi 3 ta kislorodni bog‘lash uchun 3 ta CO molekulasi kerak."
    }
  },
  {
    id: "rx-7",
    name: "Metanning yonishi (Tabiiy gaz energiyasi)",
    type: "Gaz ajralishi",
    equation: "CH₄ + 2O₂ → CO₂ + 2H₂O + Q",
    reactants: ["CH₄", "O₂"],
    products: ["CO₂", "H₂O"],
    conditions: "Alandirish (uchqun)",
    observation: "Moviy alanga bilan yonadi, katta miqdorda issiqlik ajraladi.",
    explanation: "Uglevodorodlarning to‘liq yonishi natijasida karbonat angidrid va suv hosil bo‘ladi.",
    grade: 9,
    balancedEquationChallenge: {
      unbalancedEquation: "CH₄ + O₂ → CO₂ + H₂O",
      reactants: [
        { formula: "CH₄", correctCoef: 1 },
        { formula: "O₂", correctCoef: 2 }
      ],
      products: [
        { formula: "CO₂", correctCoef: 1 },
        { formula: "H₂O", correctCoef: 2 }
      ],
      hint: "Chap tomonda 4 ta Vodorod bor, suv oldiga 2 qo‘ying; keyin kislorodlarni sanang."
    }
  },
  {
    id: "rx-8",
    name: "Alyuminiy va kislorod birikishi (Alumotermiya)",
    type: "Birikish",
    equation: "4Al + 3O₂ → 2Al₂O₃",
    reactants: ["Al", "O₂"],
    products: ["Al₂O₃"],
    conditions: "Yuqori harorat",
    observation: "Yorqin chaqnash va oq qattiq qatlam hosil bo‘ladi.",
    explanation: "Alyuminiy atomlari 3 ta elektron berib kuchli oksidlanadi.",
    grade: 8,
    balancedEquationChallenge: {
      unbalancedEquation: "Al + O₂ → Al₂O₃",
      reactants: [
        { formula: "Al", correctCoef: 4 },
        { formula: "O₂", correctCoef: 3 }
      ],
      products: [
        { formula: "Al₂O₃", correctCoef: 2 }
      ],
      hint: "Kislorodlar sonini tenglashtirish uchun umumiy karrali 6 ni oling (3O₂ va 2Al₂O₃)."
    }
  }
];
