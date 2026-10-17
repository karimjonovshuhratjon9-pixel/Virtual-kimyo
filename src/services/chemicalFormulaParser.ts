// Accurate atomic weights for key chemical elements based on IUPAC standard
export const ATOMIC_WEIGHTS: Record<string, { weight: number; nameUz: string }> = {
  H: { weight: 1.008, nameUz: 'Vodorod' },
  He: { weight: 4.0026, nameUz: 'Geliy' },
  Li: { weight: 6.94, nameUz: 'Litiy' },
  Be: { weight: 9.0122, nameUz: 'Berilliy' },
  B: { weight: 10.81, nameUz: 'Bor' },
  C: { weight: 12.011, nameUz: 'Uglerod' },
  N: { weight: 14.007, nameUz: 'Azot' },
  O: { weight: 15.999, nameUz: 'Kislorod' },
  F: { weight: 18.998, nameUz: 'Ftor' },
  Ne: { weight: 20.180, nameUz: 'Neon' },
  Na: { weight: 22.990, nameUz: 'Natriy' },
  Mg: { weight: 24.305, nameUz: 'Magniy' },
  Al: { weight: 26.982, nameUz: 'Alyuminiy' },
  Si: { weight: 28.085, nameUz: 'Kremniy' },
  P: { weight: 30.974, nameUz: 'Fosfor' },
  S: { weight: 32.06, nameUz: 'Oltingugurt' },
  Cl: { weight: 35.45, nameUz: 'Xlor' },
  Ar: { weight: 39.948, nameUz: 'Argon' },
  K: { weight: 39.098, nameUz: 'Kaliy' },
  Ca: { weight: 40.078, nameUz: 'Kalsiy' },
  Sc: { weight: 44.956, nameUz: 'Skandiy' },
  Ti: { weight: 47.867, nameUz: 'Titan' },
  V: { weight: 50.942, nameUz: 'Vanadiy' },
  Cr: { weight: 51.996, nameUz: 'Xrom' },
  Mn: { weight: 54.938, nameUz: 'Marganets' },
  Fe: { weight: 55.845, nameUz: 'Temir' },
  Co: { weight: 58.933, nameUz: 'Kobalt' },
  Ni: { weight: 58.693, nameUz: 'Nikel' },
  Cu: { weight: 63.546, nameUz: 'Mis' },
  Zn: { weight: 65.38, nameUz: 'Rux' },
  Ga: { weight: 69.723, nameUz: 'Galliy' },
  Ge: { weight: 72.630, nameUz: 'Germaniy' },
  As: { weight: 74.922, nameUz: 'Mishyak' },
  Se: { weight: 78.971, nameUz: 'Selen' },
  Br: { weight: 79.904, nameUz: 'Brom' },
  Kr: { weight: 83.798, nameUz: 'Kripton' },
  Rb: { weight: 85.468, nameUz: 'Rubidiy' },
  Sr: { weight: 87.62, nameUz: 'Stronsiy' },
  Ag: { weight: 107.868, nameUz: 'Kumush' },
  Sn: { weight: 118.71, nameUz: 'Qalay' },
  I: { weight: 126.904, nameUz: 'Yod' },
  Xe: { weight: 131.293, nameUz: 'Ksenon' },
  Cs: { weight: 132.905, nameUz: 'Seziy' },
  Ba: { weight: 137.327, nameUz: 'Bariy' },
  Au: { weight: 196.967, nameUz: 'Oltin' },
  Hg: { weight: 200.592, nameUz: 'Simob' },
  Pb: { weight: 207.2, nameUz: 'Qo‘rg‘oshin' },
  U: { weight: 238.029, nameUz: 'Uran' },
};

export interface ParsedElementCount {
  symbol: string;
  count: number;
  atomicMass: number;
  totalMass: number;
  nameUz: string;
  massPercentage: number;
}

export interface MolarMassResult {
  molarMass: number;
  elements: ParsedElementCount[];
  steps: string[];
  formula: string;
  formattedFormula: string;
}

/**
 * Parses formula string with support for parentheses e.g. Ca(OH)2, Al2(SO4)3, CuSO4*5H2O
 */
export function parseFormula(rawFormula: string): { counts: Record<string, number>; hydrateMultiplier: number } | null {
  const formula = rawFormula.trim().replace(/\s+/g, '');
  if (!formula) return null;

  // Check for hydrate e.g., CuSO4*5H2O or CuSO4.5H2O
  const parts = formula.split(/[*·•]/);
  const mainPart = parts[0];
  const hydratePart = parts[1];

  const mainCounts = parseSubFormula(mainPart);
  if (!mainCounts) return null;

  if (hydratePart) {
    // e.g. 5H2O or H2O
    const hydrateMatch = hydratePart.match(/^(\d*)([A-Za-z0-9()]+)$/);
    if (!hydrateMatch) return null;
    const mult = hydrateMatch[1] ? parseInt(hydrateMatch[1], 10) : 1;
    const hydCounts = parseSubFormula(hydrateMatch[2]);
    if (!hydCounts) return null;

    for (const [sym, count] of Object.entries(hydCounts)) {
      mainCounts[sym] = (mainCounts[sym] || 0) + count * mult;
    }
  }

  return { counts: mainCounts, hydrateMultiplier: 1 };
}

function parseSubFormula(sub: string): Record<string, number> | null {
  const stack: Record<string, number>[] = [{}];
  let i = 0;

  while (i < sub.length) {
    const ch = sub[i];

    if (ch === '(' || ch === '[' || ch === '{') {
      stack.push({});
      i++;
    } else if (ch === ')' || ch === ']' || ch === '}') {
      if (stack.length <= 1) return null; // unmatched parenthesis
      i++;
      // check multiplier after parenthesis
      let numStr = '';
      while (i < sub.length && /\d/.test(sub[i])) {
        numStr += sub[i];
        i++;
      }
      const mult = numStr ? parseInt(numStr, 10) : 1;
      const top = stack.pop()!;
      const current = stack[stack.length - 1];
      for (const [sym, count] of Object.entries(top)) {
        current[sym] = (current[sym] || 0) + count * mult;
      }
    } else if (/[A-Z]/.test(ch)) {
      // Element symbol
      let sym = ch;
      i++;
      if (i < sub.length && /[a-z]/.test(sub[i])) {
        sym += sub[i];
        i++;
      }
      // Check number
      let numStr = '';
      while (i < sub.length && /\d/.test(sub[i])) {
        numStr += sub[i];
        i++;
      }
      const count = numStr ? parseInt(numStr, 10) : 1;
      const current = stack[stack.length - 1];
      current[sym] = (current[sym] || 0) + count;
    } else {
      return null; // invalid character
    }
  }

  if (stack.length !== 1) return null; // unclosed parenthesis
  return stack[0];
}

export function calculateMolarMass(rawFormula: string): MolarMassResult | { error: string } {
  try {
    const parsed = parseFormula(rawFormula);
    if (!parsed) {
      return { error: `Formula noto‘g‘ri yozilgan. Masalan: H2O, Ca(OH)2, Al2(SO4)3, CuSO4*5H2O` };
    }

    const { counts } = parsed;
    const elements: ParsedElementCount[] = [];
    let totalMolarMass = 0;
    const steps: string[] = [];

    for (const [symbol, count] of Object.entries(counts)) {
      const elInfo = ATOMIC_WEIGHTS[symbol];
      if (!elInfo) {
        return { error: `Element belgisi topilmadi: '${symbol}'. Iltimos, Mendeleyev jadvalidagi to‘g‘ri belgini kiriting.` };
      }
      const totalMass = count * elInfo.weight;
      totalMolarMass += totalMass;
      elements.push({
        symbol,
        count,
        atomicMass: elInfo.weight,
        totalMass,
        nameUz: elInfo.nameUz,
        massPercentage: 0,
      });
    }

    // Calculate percentages
    for (const el of elements) {
      el.massPercentage = (el.totalMass / totalMolarMass) * 100;
      steps.push(`${el.symbol} (${el.nameUz}): ${el.count} × ${el.atomicMass.toFixed(3)} = ${el.totalMass.toFixed(3)} g/mol (${el.massPercentage.toFixed(2)}%)`);
    }

    return {
      molarMass: Number(totalMolarMass.toFixed(3)),
      elements,
      steps,
      formula: rawFormula,
      formattedFormula: formatChemicalFormula(rawFormula),
    };
  } catch {
    return { error: 'Formulani hisoblashda kutilmagan xatolik yuz berdi.' };
  }
}

export function formatChemicalFormula(formula: string): string {
  // Convert standard numbers following letters to subscripts for display
  return formula.replace(/(\d+)/g, '<sub>$1</sub>');
}
