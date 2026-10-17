export interface FreeReagent {
  id: string;
  name: string;
  formula: string;
  category: 'Kislotalar' | 'Ishqorlar va Asoslar' | 'Tuzlar' | 'Metallar' | 'Indikatorlar' | 'Boshqa moddalar';
  color: string;
  liquidColor: string;
  state: 'suyuq' | 'qattiq' | 'kukun';
  hazard: 'Xavfsiz' | 'Ehtiyot bo‘ling' | 'Xavfli';
  description: string;
}

export const FREE_REAGENTS: FreeReagent[] = [
  // Kislotalar
  {
    id: 'hcl',
    name: 'Xlorid kislota',
    formula: 'HCl',
    category: 'Kislotalar',
    color: '#38bdf8',
    liquidColor: 'rgba(224, 242, 254, 0.4)',
    state: 'suyuq',
    hazard: 'Xavfli',
    description: 'O‘yuvchi xlorid kislotasi eritmasi.'
  },
  {
    id: 'h2so4',
    name: 'Sulfat kislota',
    formula: 'H₂SO₄',
    category: 'Kislotalar',
    color: '#0284c7',
    liquidColor: 'rgba(207, 250, 254, 0.5)',
    state: 'suyuq',
    hazard: 'Xavfli',
    description: 'Kuchli ikki negizli sulfat kislota eritmasi.'
  },
  {
    id: 'hno3',
    name: 'Nitrat kislota',
    formula: 'HNO₃',
    category: 'Kislotalar',
    color: '#f59e0b',
    liquidColor: 'rgba(254, 240, 138, 0.4)',
    state: 'suyuq',
    hazard: 'Xavfli',
    description: 'Kuchli oksidlovchi kislota.'
  },
  {
    id: 'ch3cooh',
    name: 'Sirka kislota',
    formula: 'CH₃COOH',
    category: 'Kislotalar',
    color: '#94a3b8',
    liquidColor: 'rgba(241, 245, 249, 0.4)',
    state: 'suyuq',
    hazard: 'Ehtiyot bo‘ling',
    description: 'O‘tkir hidli organik zaif kislota.'
  },

  // Ishqorlar va Asoslar
  {
    id: 'naoh',
    name: 'Natriy gidroksid',
    formula: 'NaOH',
    category: 'Ishqorlar va Asoslar',
    color: '#06b6d4',
    liquidColor: 'rgba(224, 242, 254, 0.4)',
    state: 'suyuq',
    hazard: 'Xavfli',
    description: 'Kuchli o‘yuvchi ishqor (kaustik soda).'
  },
  {
    id: 'koh',
    name: 'Kaliy gidroksid',
    formula: 'KOH',
    category: 'Ishqorlar va Asoslar',
    color: '#14b8a6',
    liquidColor: 'rgba(204, 251, 241, 0.4)',
    state: 'suyuq',
    hazard: 'Xavfli',
    description: 'Kuchli ishqoriy eritma.'
  },
  {
    id: 'ca_oh_2',
    name: 'Ohakli suv',
    formula: 'Ca(OH)₂',
    category: 'Ishqorlar va Asoslar',
    color: '#e2e8f0',
    liquidColor: 'rgba(248, 250, 252, 0.5)',
    state: 'suyuq',
    hazard: 'Ehtiyot bo‘ling',
    description: 'Kalsiy gidroksidning tiniq to‘yingan eritmasi.'
  },
  {
    id: 'nh4oh',
    name: 'Ammiakli suv',
    formula: 'NH₄OH',
    category: 'Ishqorlar va Asoslar',
    color: '#a7f3d0',
    liquidColor: 'rgba(209, 250, 229, 0.4)',
    state: 'suyuq',
    hazard: 'Ehtiyot bo‘ling',
    description: 'O‘tkir hidli ammiak eritmasi.'
  },

  // Tuzlar
  {
    id: 'nacl',
    name: 'Osh tuzi (Natriy xlorid)',
    formula: 'NaCl',
    category: 'Tuzlar',
    color: '#f8fafc',
    liquidColor: 'rgba(248, 250, 252, 0.3)',
    state: 'kukun',
    hazard: 'Xavfsiz',
    description: 'Oddiy oq osh tuzi kristallari.'
  },
  {
    id: 'cuso4',
    name: 'Mis kuporosi',
    formula: 'CuSO₄',
    category: 'Tuzlar',
    color: '#0284c7',
    liquidColor: 'rgba(2, 132, 199, 0.75)',
    state: 'suyuq',
    hazard: 'Ehtiyot bo‘ling',
    description: 'Yorqin moviy rangli mis (II) sulfat eritmasi.'
  },
  {
    id: 'bacl2',
    name: 'Bariy xlorid',
    formula: 'BaCl₂',
    category: 'Tuzlar',
    color: '#cbd5e1',
    liquidColor: 'rgba(241, 245, 249, 0.4)',
    state: 'suyuq',
    hazard: 'Xavfli',
    description: 'Sulfat ionlari uchun sezgir reaktiv.'
  },
  {
    id: 'na2so4',
    name: 'Natriy sulfat',
    formula: 'Na₂SO₄',
    category: 'Tuzlar',
    color: '#e2e8f0',
    liquidColor: 'rgba(241, 245, 249, 0.3)',
    state: 'suyuq',
    hazard: 'Xavfsiz',
    description: 'Rangsiz sulfat tuzi eritmasi.'
  },
  {
    id: 'agno3',
    name: 'Kumush nitrat',
    formula: 'AgNO₃',
    category: 'Tuzlar',
    color: '#94a3b8',
    liquidColor: 'rgba(241, 245, 249, 0.4)',
    state: 'suyuq',
    hazard: 'Xavfli',
    description: 'Lyapis — xlorid ionlarini aniqlovchi qimmatbaho reaktiv.'
  },
  {
    id: 'fecl3',
    name: 'Temir (III) xlorid',
    formula: 'FeCl₃',
    category: 'Tuzlar',
    color: '#b45309',
    liquidColor: 'rgba(180, 83, 9, 0.7)',
    state: 'suyuq',
    hazard: 'Ehtiyot bo‘ling',
    description: 'Sarg‘ish-jigarrang temir tuzi eritmasi.'
  },
  {
    id: 'ki',
    name: 'Kaliy yodid',
    formula: 'KI',
    category: 'Tuzlar',
    color: '#fef08a',
    liquidColor: 'rgba(254, 240, 138, 0.3)',
    state: 'suyuq',
    hazard: 'Xavfsiz',
    description: 'Yod tuzining rangsiz eritmasi.'
  },
  {
    id: 'pb_no3_2',
    name: 'Qo‘rg‘oshin nitrat',
    formula: 'Pb(NO₃)₂',
    category: 'Tuzlar',
    color: '#cbd5e1',
    liquidColor: 'rgba(241, 245, 249, 0.4)',
    state: 'suyuq',
    hazard: 'Xavfli',
    description: 'Og‘ir metall tuzi eritmasi.'
  },
  {
    id: 'caco3',
    name: 'Bo‘r / Marmar',
    formula: 'CaCO₃',
    category: 'Tuzlar',
    color: '#f8fafc',
    liquidColor: 'rgba(248, 250, 252, 0.8)',
    state: 'qattiq',
    hazard: 'Xavfsiz',
    description: 'Suvda erimaydigan tabiiy kalsiy karbonat bo‘lagi.'
  },
  {
    id: 'na2co3',
    name: 'Soda (Natriy karbonat)',
    formula: 'Na₂CO₃',
    category: 'Tuzlar',
    color: '#f1f5f9',
    liquidColor: 'rgba(241, 245, 249, 0.4)',
    state: 'suyuq',
    hazard: 'Xavfsiz',
    description: 'Kalsinirlangan soda eritmasi.'
  },

  // Metallar
  {
    id: 'zn',
    name: 'Rux donalari',
    formula: 'Zn',
    category: 'Metallar',
    color: '#94a3b8',
    liquidColor: 'transparent',
    state: 'qattiq',
    hazard: 'Xavfsiz',
    description: 'Kumushsimon kulrang faol metall granulalari.'
  },
  {
    id: 'fe',
    name: 'Temir qipiqlari / Mix',
    formula: 'Fe',
    category: 'Metallar',
    color: '#64748b',
    liquidColor: 'transparent',
    state: 'qattiq',
    hazard: 'Xavfsiz',
    description: 'Tozalangan toza metall temir.'
  },
  {
    id: 'mg',
    name: 'Magniy tasmasi',
    formula: 'Mg',
    category: 'Metallar',
    color: '#cbd5e1',
    liquidColor: 'transparent',
    state: 'qattiq',
    hazard: 'Ehtiyot bo‘ling',
    description: 'O‘ta faol yengil metall tasmachalari.'
  },
  {
    id: 'cu',
    name: 'Mis qirindisi',
    formula: 'Cu',
    category: 'Metallar',
    color: '#b45309',
    liquidColor: 'transparent',
    state: 'qattiq',
    hazard: 'Xavfsiz',
    description: 'Qizg‘ish rangli metall mis.'
  },
  {
    id: 'al',
    name: 'Alyuminiy folgasi',
    formula: 'Al',
    category: 'Metallar',
    color: '#e2e8f0',
    liquidColor: 'transparent',
    state: 'qattiq',
    hazard: 'Xavfsiz',
    description: 'Yaltiroq yupqa alyuminiy metalli.'
  },

  // Indikatorlar
  {
    id: 'phenolphthalein',
    name: 'Fenolftalein',
    formula: 'Fenolftalein',
    category: 'Indikatorlar',
    color: '#f43f5e',
    liquidColor: 'rgba(244, 63, 94, 0.3)',
    state: 'suyuq',
    hazard: 'Xavfsiz',
    description: 'Ishqoriy muhitda yorqin malina rangiga kiruvchi indikator.'
  },
  {
    id: 'litmus',
    name: 'Lakmus eritmasi',
    formula: 'Lakmus',
    category: 'Indikatorlar',
    color: '#a855f7',
    liquidColor: 'rgba(168, 85, 247, 0.4)',
    state: 'suyuq',
    hazard: 'Xavfsiz',
    description: 'Kislotada qizaruvchi, ishqorda ko‘karuvchi universal indikator.'
  },

  // Boshqa moddalar
  {
    id: 'h2o2',
    name: 'Vodorod peroksid',
    formula: 'H₂O₂',
    category: 'Boshqa moddalar',
    color: '#38bdf8',
    liquidColor: 'rgba(224, 242, 254, 0.4)',
    state: 'suyuq',
    hazard: 'Ehtiyot bo‘ling',
    description: '15% li vodorod peroksidi eritmasi.'
  },
  {
    id: 'mno2',
    name: 'Marganets (IV) oksid',
    formula: 'MnO₂',
    category: 'Boshqa moddalar',
    color: '#1e293b',
    liquidColor: 'rgba(30, 41, 59, 0.8)',
    state: 'kukun',
    hazard: 'Xavfsiz',
    description: 'Qora rangli mustahkam katalizator kukuni.'
  },
  {
    id: 'kmno4',
    name: 'Kaliy permanganat',
    formula: 'KMnO₄',
    category: 'Boshqa moddalar',
    color: '#701a75',
    liquidColor: 'rgba(112, 26, 117, 0.85)',
    state: 'suyuq',
    hazard: 'Ehtiyot bo‘ling',
    description: 'To‘q to‘tiqush-binafsharang kuchli oksidlovchi eritma.'
  },
  {
    id: 'h2o',
    name: 'Distillangan suv',
    formula: 'H₂O',
    category: 'Boshqa moddalar',
    color: '#bae6fd',
    liquidColor: 'rgba(186, 230, 253, 0.35)',
    state: 'suyuq',
    hazard: 'Xavfsiz',
    description: 'Toza kimyoviy erituvchi.'
  }
];

export interface ReactionOutcome {
  isSuccess: boolean;
  isExplosion: boolean;
  name: string;
  equation: string;
  description: string;
  visual: {
    liquidColor: string;
    bubbling: boolean;
    precipitateColor?: string;
    smokeText?: string;
    flameColor?: string;
    temperatureDelta: number;
  };
}

/**
 * Checks a combination of reagent IDs and returns reaction outcome.
 * If invalid combination or dangerous mismatch, returns a mini explosion!
 */
export function evaluateMixedReagents(reagentIds: string[]): ReactionOutcome {
  const set = new Set(reagentIds);

  // 1. NaOH + HCl (Neytrallanish)
  if (set.has('naoh') && set.has('hcl')) {
    const hasPhen = set.has('phenolphthalein');
    return {
      isSuccess: true,
      isExplosion: false,
      name: "Kislota va ishqorning neytrallanish reaksiyasi",
      equation: "NaOH + HCl → NaCl + H₂O + Q",
      description: hasPhen 
        ? "Fenolftalein indikatori qo‘shilgan ishqorga kislota quyilganda malina rangi bir zumda rangsizlandi va issiqlik ajraldi!"
        : "Neytrallanish sodir bo‘ldi: osh tuzi eritmasi va suv hosil bo‘lib, stakan sezilarli qizidi.",
      visual: {
        liquidColor: 'rgba(241, 245, 249, 0.3)',
        bubbling: false,
        temperatureDelta: 8
      }
    };
  }

  // 2. NaOH + Fenolftalein
  if (set.has('naoh') && set.has('phenolphthalein') && !set.has('hcl')) {
    return {
      isSuccess: true,
      isExplosion: false,
      name: "Ishqoriy muhitda indikator rangining o‘zgarishi",
      equation: "NaOH + Fenolftalein → Malina rangli birikma (pH > 8.2)",
      description: "Ishqor ta’sirida fenolftalein bir zumda go‘zal to‘q malina (pushti-binafsha) rangiga kirdi!",
      visual: {
        liquidColor: 'rgba(244, 63, 94, 0.85)',
        bubbling: false,
        temperatureDelta: 1
      }
    };
  }

  // 3. HCl + Lakmus
  if (set.has('hcl') && set.has('litmus')) {
    return {
      isSuccess: true,
      isExplosion: false,
      name: "Kislotali muhitda lakmus indikatori",
      equation: "HCl (H⁺ ionlari) + Lakmus → Qizil rang (pH < 7)",
      description: "Xlorid kislotasidagi erkin H⁺ ionlari lakmusni yorqin qizil rangga aylantirdi.",
      visual: {
        liquidColor: 'rgba(239, 68, 68, 0.8)',
        bubbling: false,
        temperatureDelta: 1
      }
    };
  }

  // 4. NaOH + Lakmus
  if (set.has('naoh') && set.has('litmus')) {
    return {
      isSuccess: true,
      isExplosion: false,
      name: "Ishqoriy muhitda lakmus indikatori",
      equation: "NaOH (OH⁻ ionlari) + Lakmus → To‘q ko‘k rang (pH > 7)",
      description: "Ishqordagi gidroksid OH⁻ ionlari lakmus indikatorini to‘q ko‘k rangga bo‘yadi.",
      visual: {
        liquidColor: 'rgba(37, 99, 235, 0.85)',
        bubbling: false,
        temperatureDelta: 1
      }
    };
  }

  // 5. NaOH + CuSO4 (Ko‘k cho‘kma)
  if (set.has('naoh') && set.has('cuso4')) {
    return {
      isSuccess: true,
      isExplosion: false,
      name: "Mis (II) gidroksid ko‘k cho‘kmasi hosil bo‘lishi",
      equation: "CuSO₄ + 2NaOH → Cu(OH)₂↓ + Na₂SO₄",
      description: "Eritmada bir zumda yorqin moviy-ko‘k jelatinli mis (II) gidroksid cho‘kmasi (Cu(OH)₂↓) hosil bo‘ldi!",
      visual: {
        liquidColor: 'rgba(14, 165, 233, 0.5)',
        precipitateColor: '#0284c7',
        bubbling: false,
        temperatureDelta: 3
      }
    };
  }

  // 6. FeCl3 + NaOH (Qo‘ng‘ir-qizil cho‘kma)
  if (set.has('fecl3') && set.has('naoh')) {
    return {
      isSuccess: true,
      isExplosion: false,
      name: "Temir (III) gidroksid qizg‘ish-qo‘ng‘ir cho‘kmasi",
      equation: "FeCl₃ + 3NaOH → Fe(OH)₃↓ + 3NaCl",
      description: "Stakanda zang rangidagi to‘q qizg‘ish-qo‘ng‘ir temir (III) gidroksid (Fe(OH)₃↓) cho‘kmasi to‘plandi.",
      visual: {
        liquidColor: 'rgba(217, 119, 6, 0.4)',
        precipitateColor: '#9a3412',
        bubbling: false,
        temperatureDelta: 4
      }
    };
  }

  // 7. BaCl2 + Na2SO4 yoki BaCl2 + H2SO4 (Oq cho‘kma BaSO4)
  if (set.has('bacl2') && (set.has('na2so4') || set.has('h2so4'))) {
    return {
      isSuccess: true,
      isExplosion: false,
      name: "Bariy sulfat oq cho‘kmasining hosil bo‘lishi",
      equation: set.has('h2so4') ? "BaCl₂ + H₂SO₄ → BaSO₄↓ + 2HCl" : "BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl",
      description: "Kislotada ham erimaydigan sutdek qor-oppoq og‘ir bariy sulfat (BaSO₄↓) cho‘kmasi hosil bo‘ldi!",
      visual: {
        liquidColor: 'rgba(248, 250, 252, 0.95)',
        precipitateColor: '#ffffff',
        bubbling: false,
        temperatureDelta: 2
      }
    };
  }

  // 8. AgNO3 + NaCl yoki AgNO3 + HCl (Tvorogsimon oq cho‘kma)
  if (set.has('agno3') && (set.has('nacl') || set.has('hcl'))) {
    return {
      isSuccess: true,
      isExplosion: false,
      name: "Kumush xlorid oq cho‘kmasi (Xloridlar sifat reaksiyasi)",
      equation: "AgNO₃ + NaCl → AgCl↓ + NaNO₃",
      description: "Ag⁺ va Cl⁻ ionlari birikib kislotalarda erimaydigan tvorogsimon oppoq AgCl↓ cho‘kmasini hosil qildi.",
      visual: {
        liquidColor: 'rgba(241, 245, 249, 0.9)',
        precipitateColor: '#f8fafc',
        bubbling: false,
        temperatureDelta: 2
      }
    };
  }

  // 9. AgNO3 + KI (Sariq cho‘kma)
  if (set.has('agno3') && set.has('ki')) {
    return {
      isSuccess: true,
      isExplosion: false,
      name: "Kumush yodid och sariq cho‘kmasi",
      equation: "AgNO₃ + KI → AgI↓ + KNO₃",
      description: "Eritmada yorug‘likka sezgir bo‘lgan och sariq rangli AgI↓ cho‘kmasi hosil bo‘ldi.",
      visual: {
        liquidColor: 'rgba(254, 240, 138, 0.6)',
        precipitateColor: '#facc15',
        bubbling: false,
        temperatureDelta: 2
      }
    };
  }

  // 10. Pb(NO3)2 + KI (Oltin yomg‘ir sariq cho‘kma)
  if (set.has('pb_no3_2') && set.has('ki')) {
    return {
      isSuccess: true,
      isExplosion: false,
      name: "Qo‘rg‘oshin yodid 'Oltin yomg‘ir' reaksiyasi",
      equation: "Pb(NO₃)₂ + 2KI → PbI₂↓ (yorqin tilla rang) + 2KNO₃",
      description: "Yorqin tilla rangli PbI₂ kristallari paydo bo‘ldi. Qizdirib sovitilganda ular oltindek yaltiraydi!",
      visual: {
        liquidColor: 'rgba(250, 204, 21, 0.7)',
        precipitateColor: '#eab308',
        bubbling: false,
        temperatureDelta: 3
      }
    };
  }

  // 11. Zn + HCl yoki Zn + H2SO4 (Vodorod gazi ajralishi)
  if (set.has('zn') && (set.has('hcl') || set.has('h2so4'))) {
    return {
      isSuccess: true,
      isExplosion: false,
      name: "Rux metallining kislotada erishi va Vodorod (H₂) ajralishi",
      equation: "Zn + 2HCl → ZnCl₂ + H₂↑",
      description: "Rux donalari sirtida qaynash boshlandi: havoga ko‘p miqdorda mayda vodorod gazi pufakchalari otilib chiqmoqda!",
      visual: {
        liquidColor: 'rgba(224, 242, 254, 0.5)',
        bubbling: true,
        smokeText: 'Vodorod (H₂↑) gazi shiddat bilan ajralmoqda',
        temperatureDelta: 7
      }
    };
  }

  // 12. Mg + HCl (Shiddatli yonish/qaynash)
  if (set.has('mg') && set.has('hcl')) {
    return {
      isSuccess: true,
      isExplosion: false,
      name: "Magniy va xlorid kislotaning o‘ta shiddatli reaksiyasi",
      equation: "Mg + 2HCl → MgCl₂ + H₂↑ + Q",
      description: "Shiddatli ekzotermik reaksiya! Magniy ko‘z oldida erib ketdi, qaynagan holda vodorod H₂ ajraldi va probirka qizib ketdi.",
      visual: {
        liquidColor: 'rgba(224, 242, 254, 0.6)',
        bubbling: true,
        smokeText: 'Shiddatli H₂ gaz oqimi!',
        temperatureDelta: 16
      }
    };
  }

  // 13. CaCO3 + HCl (CO2 qaynashi)
  if (set.has('caco3') && set.has('hcl')) {
    return {
      isSuccess: true,
      isExplosion: false,
      name: "Bo‘rning erishi va Karbonat angidrid (CO₂) ajralishi",
      equation: "CaCO₃ + 2HCl → CaCl₂ + CO₂↑ + H₂O",
      description: "Ko‘pikli gaz hosil bo‘lib shiddatli qaynadi. Karbonat angidrid gazi (CO₂↑) havoga ko‘tarildi.",
      visual: {
        liquidColor: 'rgba(241, 245, 249, 0.6)',
        bubbling: true,
        smokeText: 'Karbonat angidrid (CO₂↑) gazi',
        temperatureDelta: 4
      }
    };
  }

  // 14. Na2CO3 + HCl (Kuchsiz kislotani siqib chiqarish)
  if (set.has('na2co3') && set.has('hcl')) {
    return {
      isSuccess: true,
      isExplosion: false,
      name: "Sodaning kislota bilan reaksiyasi",
      equation: "Na₂CO₃ + 2HCl → 2NaCl + CO₂↑ + H₂O",
      description: "Ko‘pik otilib CO₂ gazi havoga chiqdi va osh tuzi NaCl eritmasi qoldi.",
      visual: {
        liquidColor: 'rgba(241, 245, 249, 0.4)',
        bubbling: true,
        smokeText: 'CO₂↑ gazi ajralmoqda',
        temperatureDelta: 3
      }
    };
  }

  // 15. H2O2 + MnO2 (Katalitik kislorod)
  if (set.has('h2o2') && set.has('mno2')) {
    return {
      isSuccess: true,
      isExplosion: false,
      name: "Vodorod peroksidning MnO₂ katalizatori bilan parchalanishi",
      equation: "2H₂O₂ —(MnO₂)→ 2H₂O + O₂↑ + Q",
      description: "Qora kukun tushishi bilanoq stakanda shiddatli qaynash boshlandi va sof Kislorod (O₂) gazi otilib chiqdi!",
      visual: {
        liquidColor: 'rgba(71, 85, 105, 0.75)',
        bubbling: true,
        smokeText: 'Kislorod (O₂↑) gazi shiddat bilan chiqmoqda',
        temperatureDelta: 12
      }
    };
  }

  // 16. CuSO4 + Fe (Mis cho‘kishi)
  if (set.has('cuso4') && set.has('fe')) {
    return {
      isSuccess: true,
      isExplosion: false,
      name: "Temir va mis kuporosi o‘rin olishi",
      equation: "Fe + CuSO₄ → FeSO₄ + Cu↓",
      description: "Temir yuzasi qizg‘ish mis (Cu) qatlami bilan qoplandi, eritma esa moviydan och yashilga (FeSO₄) o‘zgardi.",
      visual: {
        liquidColor: 'rgba(16, 185, 129, 0.5)',
        precipitateColor: '#b45309',
        bubbling: false,
        temperatureDelta: 3
      }
    };
  }

  // 17. Ca(OH)2 + CO2 (Ohakli suv loyqalanishi)
  if (set.has('ca_oh_2') && (set.has('caco3') || set.has('na2co3')) && set.has('hcl')) {
    return {
      isSuccess: true,
      isExplosion: false,
      name: "Ohakli suvning karbonat angidrid ta’sirida loyqalanishi",
      equation: "Ca(OH)₂ + CO₂ → CaCO₃↓ (oq loyqa) + H₂O",
      description: "Shaffof ohakli suv bir zumda sutdek oq loyqaga aylandi!",
      visual: {
        liquidColor: 'rgba(255, 255, 255, 0.9)',
        precipitateColor: '#f8fafc',
        bubbling: false,
        temperatureDelta: 2
      }
    };
  }

  // 18. KMnO4 + H2O2 (Oksidlanish-qaytarilish)
  if (set.has('kmno4') && set.has('h2o2')) {
    return {
      isSuccess: true,
      isExplosion: false,
      name: "KMnO₄ ning vodorod peroksid bilan shiddatli qaytarilishi",
      equation: "2KMnO₄ + 5H₂O₂ + 3H₂SO₄ → 2MnSO₄ + 5O₂↑ + K₂SO₄ + 8H₂O",
      description: "To‘q binafsha rangli eritma bir zumda rangsizlandi va ko‘p miqdorda kislorod O₂ gazi qaynadi!",
      visual: {
        liquidColor: 'rgba(241, 245, 249, 0.3)',
        bubbling: true,
        smokeText: 'Kislorod (O₂↑) gazi',
        temperatureDelta: 9
      }
    };
  }

  // 19. Suvda erish / neytral aralashma (e.g. NaCl + H2O)
  if ((set.has('nacl') && set.has('h2o')) && set.size === 2) {
    return {
      isSuccess: true,
      isExplosion: false,
      name: "Osh tuzining suvda fizikaviy erishi",
      equation: "NaCl (qattiq) + H₂O → Na⁺(aq) + Cl⁻(aq)",
      description: "Osh tuzi suvda to‘liq erib shaffof sho‘r eritma hosil qildi. Kimyoviy reaksiya yo‘q, fizikaviy erish jarayoni.",
      visual: {
        liquidColor: 'rgba(224, 242, 254, 0.35)',
        bubbling: false,
        temperatureDelta: 0
      }
    };
  }

  // ----------------------------------------------------
  // DANGEROUS OR INCOMPATIBLE MIXTURES -> MINI EXPLOSION! 💥
  // ----------------------------------------------------
  // If user mixes 2 or more active reagents that don't match, or incompatible acids/metals/bases
  // triggers an entertaining mini-explosion!
  const hasStrongAcid = set.has('h2so4') || set.has('hno3');
  const hasOxidizer = set.has('kmno4') || set.has('h2o2');
  const hasReactiveMetal = set.has('mg') || set.has('al') || set.has('zn');

  let explosionReason = "Ushbu moddalar bir-biriga mos kelmaydi yoki nazoratsiz aralashtirilganda xavfli portlash / sachrashni keltirib chiqaradi!";

  if (set.has('h2so4') && set.has('kmno4')) {
    explosionReason = "Konsentrlangan H₂SO₄ va KMnO₄ aralashmasi Mn₂O₇ (o‘ta portlovchi marganets yetti oksid) hosil qiladi va portlaydi!";
  } else if (hasStrongAcid && hasReactiveMetal && hasOxidizer) {
    explosionReason = "Kuchli kislota, oksidlovchi va faol metall birikmasi shiddatli ekzotermik portlashga sabab bo‘ldi!";
  } else if (set.has('hno3') && hasReactiveMetal) {
    explosionReason = "Nitrat kislota va metall reaksiyasi zaharli NO₂ qo‘ng‘ir gazi va kuchli portlash xavfini keltirib chiqardi!";
  }

  return {
    isSuccess: false,
    isExplosion: true,
    name: "💥 KICHIK PORTLASH YUZ BERDI!",
    equation: "Xavfli reaktivlar aralashmasi → 💥 PORTLASH (Eksploziv parchalanish)",
    description: explosionReason,
    visual: {
      liquidColor: 'rgba(239, 68, 68, 0.85)',
      bubbling: true,
      smokeText: '💥 Olov va tutun otilib chiqdi!',
      flameColor: '#ef4444',
      temperatureDelta: 45
    }
  };
}
