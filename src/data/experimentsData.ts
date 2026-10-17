import { Experiment } from '../types/chemistry';

export const EXPERIMENTS_DATA: Experiment[] = [
  {
    id: "exp-neutralization",
    title: "Kislota va ishqorning neytrallanish reaksiyasi",
    grade: 8,
    topic: "Kislotalar va asoslar, Indikatorlar",
    objectiveUz: "Neytrallanish reaksiyasi mohiyatini, fenolftalein indikatori rangining o‘zgarishini va tuz hamda suv hosil bo‘lishini amalda kuzatish.",
    durationMinutes: 15,
    difficulty: "Oson",
    apparatus: ["Kimyoviy stakan (250 ml)", "Byuretka yoki tomizg‘ich", "Shisha tayoqcha", "Termometr"],
    reagents: [
      {
        id: "naoh",
        name: "Natriy gidroksid (NaOH) eritmasi",
        formula: "NaOH",
        color: "#ffffff",
        state: "liquid",
        hazardLevel: "warning",
        hazardNoteUz: "Kuchli o‘yuvchi ishqor. Ko‘z va teriga tekkizmaslik kerak!"
      },
      {
        id: "phenolphthalein",
        name: "Fenolftalein indikatori",
        formula: "C20H14O4",
        color: "#e2e8f0",
        state: "liquid",
        hazardLevel: "safe",
        hazardNoteUz: "Spirtli indikator eritmasi."
      },
      {
        id: "hcl",
        name: "Xlorid kislota (HCl) eritmasi",
        formula: "HCl",
        color: "#ffffff",
        state: "liquid",
        hazardLevel: "danger",
        hazardNoteUz: "O‘yuvchi kislota, bug‘idan nafas olmang!"
      }
    ],
    safetyWarnings: [
      "Himoya ko‘zoynagi va laboratoriya xalatini kiying.",
      "Kislota va ishqor bilan ehtiyotkorlik bilan ishlang, teriga tegsa ko‘p miqdorda sovuq suv bilan yuving."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Ishqor quyish",
        instructionUz: "Stakanga 20 ml rangsiz NaOH eritmasini quying.",
        requiredAction: "add_reagent",
        targetReagentId: "naoh",
        observationUz: "Stakanda shaffof, rangsiz suyuqlik hosil bo‘ldi.",
        visualEffect: { liquidColor: "rgba(224, 242, 254, 0.5)", temperatureChange: 0 }
      },
      {
        stepNumber: 2,
        title: "Indikator tomizish",
        instructionUz: "Stakandagi NaOH eritmasiga 2-3 tomchi fenolftalein tomizing.",
        requiredAction: "add_reagent",
        targetReagentId: "phenolphthalein",
        observationUz: "Eritma zumda yorqin malina (pushti-binafsha) rangiga kirdi! Bu ishqoriy muhit (pH > 8.2) mavjudligini bildiradi.",
        visualEffect: { liquidColor: "rgba(244, 63, 94, 0.8)", temperatureChange: 1 }
      },
      {
        stepNumber: 3,
        title: "Kislota qo‘shib neytrallash",
        instructionUz: "Eritmaga tomchilab HCl kislotasi qo‘shing va shisha tayoqcha bilan aralashtiring.",
        requiredAction: "add_reagent",
        targetReagentId: "hcl",
        observationUz: "Kislota ionlari H⁺ ishqor OH⁻ ionlarini bog‘lab suv hosil qildi. Malina rangi to‘liq yo‘qolib, eritma yana rangsiz holga keldi va biroz qizidi (ekzotermik jarayon).",
        visualEffect: { liquidColor: "rgba(241, 245, 249, 0.4)", temperatureChange: 4, bubbling: false }
      }
    ],
    chemicalEquation: "NaOH + HCl → NaCl + H₂O + Q",
    equationType: "Neytrallanish (Almashinish)",
    scientificExplanationUz: "Neytrallanish reaksiyasi — asos va kislota o‘rtasidagi ta’sirlashuv bo‘lib, natijada neytral tuz (osh tuzi NaCl) va suv hosil bo‘ladi. Qisqa ionli tenglama: H⁺ + OH⁻ → H₂O. Fenolftalein neytral va kislotali muhitda rangsiz, ishqorda esa malina rang beradi.",
    conclusionUz: "Tajriba davomida ishqor kislota bilan to‘liq neytrallandi, pH muhit neytrallashgani sababli indikator rangsizlandi va issiqlik ajraldi.",
    quizQuestions: [
      {
        question: "Fenolftalein indikatori qanday muhitda malina (pushti) rang beradi?",
        options: ["Kislotali muhitda", "Ishqoriy muhitda", "Neytral muhitda", "Faqat distillangan suvda"],
        correctIndex: 1,
        explanation: "Fenolftalein faqat ishqoriy muhitda (pH > 8.2) yorqin malina rangini namoyon qiladi."
      },
      {
        question: "Neytrallanish reaksiyasining qisqa ionli tenglamasi qaysi?",
        options: ["Na⁺ + Cl⁻ → NaCl", "H⁺ + OH⁻ → H₂O", "H₂ + O₂ → H₂O", "Na + H₂O → NaOH"],
        correctIndex: 1,
        explanation: "Barcha kuchli kislota va ishqorlar neytrallanishining asosi: vodorod ioni bilan gidroksid ionining birlashib suv hosil qilishidir."
      },
      {
        question: "Ushbu reaksiyada issiqlik ajralishi (ekzotermik) nimani ko‘rsatadi?",
        options: ["Reaksiya issiqlik yutadi", "Bog‘lar hosil bo‘lishida energiya ajraladi (+Q)", "Eritma muzlaydi", "Reaksiya tugamadi"],
        correctIndex: 1,
        explanation: "Neytrallanish reaksiyasi ekzotermik bo‘lib, eritmada harorat ko‘tariladi."
      }
    ]
  },
  {
    id: "exp-oxygen-prep",
    title: "Vodorod peroksiddan kislorod (O₂) olish va tekshirish",
    grade: 7,
    topic: "Oddiy moddalar. Kislorod. Katalizatorlar",
    objectiveUz: "Laboratoriyada vodorod peroksidning MnO₂ katalizatori ishtirokida parchalanishi orqali kislorod gazi hosil bo‘lishini va uning cho‘g‘langan cho‘pni alanga oldirishini isbotlash.",
    durationMinutes: 12,
    difficulty: "Oson",
    apparatus: ["Probirka", "Probirka shtativi", "Tomizg‘ich", "Yog‘och cho‘p (luchinka)", "Spirt lampasi"],
    reagents: [
      {
        id: "h2o2",
        name: "Vodorod peroksid eritmasi (H₂O₂ 10-15%)",
        formula: "H2O2",
        color: "#ffffff",
        state: "liquid",
        hazardLevel: "warning",
        hazardNoteUz: "Terini oqartirishi va achitishi mumkin."
      },
      {
        id: "mno2",
        name: "Marganets (IV) oksid (MnO₂) kukuni",
        formula: "MnO2",
        color: "#1e293b",
        state: "powder",
        hazardLevel: "safe",
        hazardNoteUz: "Qora rangli qattiq katalizator kukuni."
      }
    ],
    safetyWarnings: [
      "Peroksid bilan ishlaganda qo‘lqopdan foydalaning.",
      "Cho‘pni yoqishda yonuvchi moddalardan uzoq turing."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Peroksid quyish",
        instructionUz: "Probirkaga 5-10 ml vodorod peroksid quying.",
        requiredAction: "add_reagent",
        targetReagentId: "h2o2",
        observationUz: "Probirkada rangsiz suyuqlik. Xona haroratida u juda sekin parchalanadi, ko‘zga ko‘rinmas darajada.",
        visualEffect: { liquidColor: "rgba(224, 242, 254, 0.4)", bubbling: false }
      },
      {
        stepNumber: 2,
        title: "Katalizator qo‘shish",
        instructionUz: "Probirkaga pichoq uchida qora MnO₂ kukunidan soling.",
        requiredAction: "add_reagent",
        targetReagentId: "mno2",
        observationUz: "Shiddatli qaynash boshlandi! Juda ko‘p miqdorda mayda gaz pufakchalari otilib chiqa boshladi va probirka qizidi.",
        visualEffect: { liquidColor: "rgba(71, 85, 105, 0.7)", bubbling: true, smokeOrGas: "Kislorod (O₂) gazi shiddat bilan ajralmoqda" }
      },
      {
        stepNumber: 3,
        title: "Kislorodni cho‘g‘ bilan sinash",
        instructionUz: "Cho‘g‘langan (olovsiz tutab turgan) yog‘och cho‘pni probirka og‘ziga yaqinlashtiring.",
        requiredAction: "observe",
        observationUz: "Cho‘g‘langan cho‘p probirka og‘zida bir zumda YORQIN ALANGA BILAN YONIB KETDI! Bu probirkadagi gaz sof kislorod (O₂) ekanligining qat’iy isbotidir.",
        visualEffect: { liquidColor: "rgba(71, 85, 105, 0.7)", bubbling: true, flameColor: "#f59e0b" }
      }
    ],
    chemicalEquation: "2H₂O₂ —(MnO₂)→ 2H₂O + O₂↑",
    equationType: "Ajralish reaksiyasi (Katalitik)",
    scientificExplanationUz: "Marganets (IV) oksid (MnO₂) ushbu reaksiyada geterogen katalizator vazifasini bajaradi. U reaksiyaning faollanish energiyasini pasaytiradi va reaksiyani millionlab marta tezlashtiradi, lekin o‘zi reaksiyada sarflanmaydi. Ajralgan O₂ gazi yonishni kuchli qo‘llab-quvvatlaydi.",
    conclusionUz: "Vodorod peroksid katalizator ishtirokida suv va kislorodga parchalandi. Kislorod yonishni qo‘llab-quvvatlashi amalda isbotlandi.",
    quizQuestions: [
      {
        question: "Ushbu tajribada MnO₂ qanday vazifani bajardi?",
        options: ["Reagent sifatida sarflandi", "Katalizator (reaksiyani tezlashtiruvchi)", "Indikator", "Erituvchi"],
        correctIndex: 1,
        explanation: "Katalizator — reaksiyani tezlashtiruvchi, lekin jarayon oxirida kimyoviy o‘zgarmay qoluvchi moddadir."
      },
      {
        question: "Gazning kislorod (O₂) ekanligini qanday usulda aniqlash mumkin?",
        options: ["Ohakli suvni loyqalash orqali", "Cho‘g‘langan cho‘pni alanga oldirish orqali", "Hidi orqali", "Rangining ko‘kligidan"],
        correctIndex: 1,
        explanation: "Kislorod gazida cho‘g‘langan cho‘p ravshan yonib ketadi."
      }
    ]
  },
  {
    id: "exp-iron-copper-sulfate",
    title: "Temir va mis kuporosi o‘rtasidagi o‘rin olish reaksiyasi",
    grade: 8,
    topic: "Metallar faollik qatori. Tuzlar",
    objectiveUz: "Metallar faollik qatorida temir misdan faolroq ekanligini, temir mix ustida qizil mis qatlami cho‘kishini va eritma rangi o‘zgarishini ko‘rish.",
    durationMinutes: 15,
    difficulty: "Oson",
    apparatus: ["Kimyoviy stakan", "Temir mix (yaltiroq tozalangan)", "Pintset", "Filtr qog‘oz"],
    reagents: [
      {
        id: "cuso4",
        name: "Mis (II) sulfat (CuSO₄) eritmasi",
        formula: "CuSO4",
        color: "#0284c7",
        state: "liquid",
        hazardLevel: "warning",
        hazardNoteUz: "Moviy rangli zaharli tuz eritmasi."
      },
      {
        id: "fe_nail",
        name: "Temir mix (Fe)",
        formula: "Fe",
        color: "#94a3b8",
        state: "solid",
        hazardLevel: "safe",
        hazardNoteUz: "Tozalangan kulrang metall temir."
      }
    ],
    safetyWarnings: [
      "Mis kuporosi zaharli, qo‘lni toza tuting.",
      "Metall mixning o‘tkir uchidan ehtiyot bo‘ling."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Mis sulfat eritmasini tayyorlash",
        instructionUz: "Stakanga 50 ml moviy rangli CuSO₄ eritmasini quying.",
        requiredAction: "add_reagent",
        targetReagentId: "cuso4",
        observationUz: "Stakanda Cu²⁺ ionlari sababli tiniq moviy rangli eritma hosil bo‘ldi.",
        visualEffect: { liquidColor: "rgba(2, 132, 199, 0.75)" }
      },
      {
        stepNumber: 2,
        title: "Temir mixni eritmaga botirish",
        instructionUz: "Yaltiroq tozalangan temir mixni mis sulfat eritmasiga tushiring va bir necha daqiqa kuting.",
        requiredAction: "add_reagent",
        targetReagentId: "fe_nail",
        observationUz: "Biroz vaqt o‘tgach, kulrang temir mix sirti QIZG‘ISH-JIGARRANG sof metall mis qatlami bilan qoplandi! Eritmaning to‘q ko‘k rangi esa och yashil rangga (FeSO₄) aylana boshladi.",
        visualEffect: { liquidColor: "rgba(16, 185, 129, 0.5)", precipitateColor: "#b45309" }
      }
    ],
    chemicalEquation: "Fe + CuSO₄ → FeSO₄ + Cu↓",
    equationType: "O‘rin olish reaksiyasi",
    scientificExplanationUz: "Metallar faollik qatorida temir (Fe) misdan (Cu) chapda joylashgan, ya’ni faolroq. Shu sababli temir o‘zidan elektron berib Fe²⁺ ioniga aylanadi va eritmaga o‘tadi, mis Cu²⁺ ionlari esa 2 elektron olib neytral metall Cu ga aylanadi va mix sirtiga cho‘kadi: Fe + Cu²⁺ → Fe²⁺ + Cu↓.",
    conclusionUz: "Faolroq metall (Fe) kamroq faol metallni (Cu) uning tuzi eritmasidan siqib chiqardi.",
    quizQuestions: [
      {
        question: "Temir mix sirtida qanday modda cho‘kadi?",
        options: ["Zang (Fe₂O₃)", "Sof mis metalli (Cu)", "Oltingugurt (S)", "Ko‘mir"],
        correctIndex: 1,
        explanation: "Cu²⁺ ionlari qaytarilib, qizg‘ish rangli sof mis (Cu) sifatida mix yuzasiga o‘tiradi."
      },
      {
        question: "Ushbu reaksiya qaysi turdagi reaksiyalarga kiradi?",
        options: ["Birikish", "Ajralish", "O‘rin olish", "Neytrallanish"],
        correctIndex: 2,
        explanation: "Oddiy modda atomlari murakkab modda tarkibidagi atomlar o‘rnini olishi — o‘rin olish reaksiyasidir."
      }
    ]
  },
  {
    id: "exp-barium-sulfate-precipitate",
    title: "Cho‘kma hosil bo‘lishi: Bariy sulfat (BaSO₄)",
    grade: 8,
    topic: "Tuzlarning xossalari, Eruvchanlik jadvali",
    objectiveUz: "Eriydigan ikkita tuz ta’sirlashganda kislota va suvda mutlaqo erimaydigan oppoq og‘ir BaSO₄ cho‘kmasi hosil bo‘lishini kuzatish.",
    durationMinutes: 10,
    difficulty: "Oson",
    apparatus: ["Probirka", "Tomizg‘ich", "Probirka ushlagich"],
    reagents: [
      {
        id: "bacl2",
        name: "Bariy xlorid (BaCl₂) eritmasi",
        formula: "BaCl2",
        color: "#ffffff",
        state: "liquid",
        hazardLevel: "warning",
        hazardNoteUz: "Bariy birikmalari zaharli, ehtiyot bo‘ling!"
      },
      {
        id: "na2so4",
        name: "Natriy sulfat (Na₂SO₄) eritmasi",
        formula: "Na2SO4",
        color: "#ffffff",
        state: "liquid",
        hazardLevel: "safe",
        hazardNoteUz: "Rangsiz zararsiz tuz eritmasi."
      }
    ],
    safetyWarnings: [
      "Bariy tuzlari og‘izga yoki shilliq qavatga tushmasin."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Bariy xlorid quyish",
        instructionUz: "Probirkaga 5 ml BaCl₂ eritmasini quying.",
        requiredAction: "add_reagent",
        targetReagentId: "bacl2",
        observationUz: "Shaffof rangsiz eritma.",
        visualEffect: { liquidColor: "rgba(248, 250, 252, 0.4)" }
      },
      {
        stepNumber: 2,
        title: "Natriy sulfat qo‘shish",
        instructionUz: "Eritmaga bir necha tomchi Na₂SO₄ qo‘shing.",
        requiredAction: "add_reagent",
        targetReagentId: "na2so4",
        observationUz: "Bir zumda sutdek quyuq qor-oppoq cho‘kma (BaSO₄↓) hosil bo‘ldi! Bu cho‘kma hatto kuchli kislotalarda ham erimaydi.",
        visualEffect: { liquidColor: "rgba(255, 255, 255, 0.95)", precipitateColor: "#ffffff" }
      }
    ],
    chemicalEquation: "BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl",
    equationType: "Almashinish reaksiyasi (Cho‘kma hosil bo‘lishi)",
    scientificExplanationUz: "Ba²⁺ va SO₄²⁻ ionlari uchrashganda birikib, eruvchanligi o‘ta past bo‘lgan BaSO₄ birikmasini hosil qiladi. Qisqa ionli tenglama: Ba²⁺ + SO₄²⁻ → BaSO₄↓. Bu reaksiya sulfat ionlarini (SO₄²⁻) aniqlash uchun sifat reaksiyasi hisoblanadi.",
    conclusionUz: "Sulfat ioni Ba²⁺ kationi bilan o‘ziga xos oq cho‘kma hosil qildi.",
    quizQuestions: [
      {
        question: "BaSO₄ oq cho‘kmasi kislotalarda eriydimi?",
        options: ["Ha, oson eriydi", "Yo‘q, kislotalarda mutlaqo erimaydi", "Faqat qizdirilganda eriydi", "Spirtda eriydi"],
        correctIndex: 1,
        explanation: "Bariy sulfat kislotalarda (hatto HNO₃ va HCl da) ham mutlaqo erimaydi."
      }
    ]
  },
  {
    id: "exp-magnesium-burning",
    title: "Magniy lentasining havoda yonishi",
    grade: 7,
    topic: "Kimyoviy hodisalar. Oksidlanish",
    objectiveUz: "Magniy metallining havoda o‘ta yorqin oq shu’la bilan yonishini va magniy oksid oq kukuni hosil bo‘lishini ko‘rish.",
    durationMinutes: 10,
    difficulty: "O‘rtacha",
    apparatus: ["Tigel qisqichlari", "Spirt lampasi", "Chini kosacha"],
    reagents: [
      {
        id: "mg_ribbon",
        name: "Magniy lentasi (Mg)",
        formula: "Mg",
        color: "#cbd5e1",
        state: "solid",
        hazardLevel: "warning",
        hazardNoteUz: "Yonganida o‘ta yorqin nurlanish hosil qiladi. To‘g‘ridan-to‘g‘ri qaramang!"
      }
    ],
    safetyWarnings: [
      "Magniy alangasiga to‘g‘ridan-to‘g‘ri yaqindan qaramang (ko‘zni qamashtiradi).",
      "Yongan qoldiqni qo‘l bilan ushlamang."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Magniy lentasini qisqichda ushlash",
        instructionUz: "5 sm uzunlikdagi yaltiroq magniy lentasini tigel qisqichi bilan ushlang.",
        requiredAction: "observe",
        observationUz: "Kumushsimon kulrang egiluvchan metall lenta.",
        visualEffect: { liquidColor: "transparent" }
      },
      {
        stepNumber: 2,
        title: "Alangada qizdirish",
        instructionUz: "Magniy lentasining uchini spirt lampasi alangasiga tuting.",
        requiredAction: "heat",
        observationUz: "Magniy alanga oldi! Ko‘zni qamashtiruvchi quyoshdek o‘ta yorqin ko‘zni oluvchi oq olov bilan yonib, oppoq kukun (MgO) ga aylandi.",
        visualEffect: { flameColor: "#ffffff", smokeOrGas: "Oq tutun (MgO zarralari)" }
      }
    ],
    chemicalEquation: "2Mg + O₂ → 2MgO + Q",
    equationType: "Birikish reaksiyasi (Ekzotermik)",
    scientificExplanationUz: "Magniy kislorod bilan o‘ta kuchli ekzotermik reaksiyaga kirishadi. Ko‘p miqdorda issiqlik va yorug‘lik fotonlari ajraladi. Hosil bo‘lgan oq kukun — magniy oksid (MgO) dir.",
    conclusionUz: "Metall kislorod bilan birikib asosli oksid hosil qildi.",
    quizQuestions: [
      {
        question: "Ushbu yonish reaksiyasida qanday mahsulot hosil bo‘ldi?",
        options: ["Magniy gidroksid", "Magniy oksid (MgO)", "Magniy xlorid", "Sof uglerod"],
        correctIndex: 1,
        explanation: "Magniy kislorod bilan birikib magniy oksid (MgO) oq kukunini hosil qiladi."
      }
    ]
  },
  {
    id: "exp-limewater-co2",
    title: "Karbonat angidrid (CO₂) olish va ohakli suvni loyqalatish",
    grade: 8,
    topic: "Uglerod birikmalari. Sifat reaksiyalari",
    objectiveUz: "Bo‘r yoki marmar bo‘lagiga kislota ta’sir ettirib CO₂ gazi hosil qilish hamda uning ohakli suvni sutdek loyqalashini isbotlash.",
    durationMinutes: 15,
    difficulty: "O‘rtacha",
    apparatus: ["Vurits kolbasi yoki probirka", "Gaz o‘tkazgich nay", "Probirka"],
    reagents: [
      {
        id: "caco3",
        name: "Kalsiy karbonat (marmar yoki bo‘r)",
        formula: "CaCO3",
        color: "#f8fafc",
        state: "solid",
        hazardLevel: "safe",
        hazardNoteUz: "Tabiiy ohaktosh yoki bo‘r donalari."
      },
      {
        id: "hcl_sol",
        name: "Xlorid kislota (HCl)",
        formula: "HCl",
        color: "#ffffff",
        state: "liquid",
        hazardLevel: "warning",
        hazardNoteUz: "O‘yuvchi kislota."
      },
      {
        id: "limewater",
        name: "Ohakli suv (Ca(OH)₂ ning tiniq eritmasi)",
        formula: "Ca(OH)2",
        color: "#ffffff",
        state: "liquid",
        hazardLevel: "safe",
        hazardNoteUz: "Filtrlangan shaffof ohakli suv."
      }
    ],
    safetyWarnings: [
      "Kislotani to‘kib yubormang.",
      "Gaz naychasini ohakli suvdan chiqarishda teskari so‘rilishdan ehtiyot bo‘ling."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Reaksiya idishiga marmar solish",
        instructionUz: "Probirkaga bir necha bo‘lak CaCO₃ soling va ustiga HCl quying.",
        requiredAction: "add_reagent",
        targetReagentId: "hcl_sol",
        observationUz: "Shiddatli qaynash sodir bo‘ldi: karbonat angidrid gazi (CO₂↑) shiddat bilan ajralib chiqmoqda.",
        visualEffect: { liquidColor: "rgba(224, 242, 254, 0.4)", bubbling: true }
      },
      {
        stepNumber: 2,
        title: "Gazni ohakli suvdan o‘tkazish",
        instructionUz: "Ajralayotgan gazni gaz o‘tkazgich nay orqali ikkinchi probirkadagi tiniq ohakli suv Ca(OH)₂ ga yo‘naltiring.",
        requiredAction: "observe",
        observationUz: "Shaffof ohakli suv bir zumda SUTDEK LOYQALANDI! Bu erimaydigan CaCO₃ mayda zarralari cho‘kayotganini bildiradi. Bu CO₂ uchun o‘ziga xos sifat reaksiyasidir.",
        visualEffect: { liquidColor: "rgba(248, 250, 252, 0.9)", precipitateColor: "#f1f5f9" }
      }
    ],
    chemicalEquation: "CaCO₃ + 2HCl → CaCl₂ + CO₂↑ + H₂O;   Ca(OH)₂ + CO₂ → CaCO₃↓ + H₂O",
    equationType: "Almashinish va sifat reaksiyasi",
    scientificExplanationUz: "Kuchli kislota (HCl) kuchsiz karbonat kislotani (H₂CO₃) uning tuzidan siqib chiqaradi, u esa beqaror bo‘lgani uchun darhol CO₂ va H₂O ga parchalanadi. Ajralgan CO₂ ohakli suv bilan ta’sirlashib suvda erimaydigan oq kalsiy karbonat (CaCO₃↓) loyqasini beradi.",
    conclusionUz: "Ohakli suvning loyqalanishi CO₂ gazini sifat jihatdan ishonchli aniqlaydi.",
    quizQuestions: [
      {
        question: "Ohakli suv nima sababdan loyqalanadi?",
        options: ["Erimaydigan CaCO₃ hosil bo‘lgani uchun", "Suv bug‘langani uchun", "Kislota ko‘paygani uchun", "Eritma muzlagani uchun"],
        correctIndex: 0,
        explanation: "CO₂ gazi kalsiy gidroksid bilan reaksiyaga kirishib suvda erimaydigan oq kalsiy karbonat (CaCO₃↓) hosil qiladi."
      }
    ]
  },
  {
    id: "exp-electrolysis-water",
    title: "Suvning elektrolizi (Vodorod va Kislorod olish)",
    grade: 7,
    topic: "Suv. Murakkab moddalarning parchalanishi",
    objectiveUz: "Doimiy elektr toki ta’sirida suvning vodorod (katodda) va kislorod (anodda) gazlariga 2:1 hajm nisbatida ajralishini ko‘rsatish.",
    durationMinutes: 15,
    difficulty: "O‘rtacha",
    apparatus: ["Gofman apparati yoki elektrolizyor", "Doimiy tok manbai (12V)", "Grafit elektrodlar", "Ikki probirka"],
    reagents: [
      {
        id: "acidified_water",
        name: "Elektr o‘tkazuvchan suv (ozgina H₂SO₄ qo‘shilgan)",
        formula: "H2O (+ H2SO4)",
        color: "#e0f2fe",
        state: "liquid",
        hazardLevel: "safe",
        hazardNoteUz: "Toza suv tokni yomon o‘tkazgani sababli ozgina sulfat kislota qo‘shiladi."
      }
    ],
    safetyWarnings: [
      "Elektr toki manbai bilan ehtiyotkor bo‘ling.",
      "Ajralayotgan vodorod gazi havoda portlovchi aralashma hosil qilishi mumkin."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Elektroliz idishini to‘ldirish",
        instructionUz: "Elektrolizyorga eritmali suvni quying va elektrodlarni botiring.",
        requiredAction: "add_reagent",
        targetReagentId: "acidified_water",
        observationUz: "Probirkalar suv bilan to‘la.",
        visualEffect: { liquidColor: "rgba(186, 230, 253, 0.5)" }
      },
      {
        stepNumber: 2,
        title: "Elektr tokini ulash",
        instructionUz: "Doimiy tok manbaini (12V) yoqing.",
        requiredAction: "observe",
        observationUz: "Har ikki elektrodda gaz pufakchalari qaynay boshladi! Katodda (manfiy) ajralgan vodorod hajmi anodda (musbat) ajralgan kislorod hajmidan roppa-rosa 2 barobar ko‘proq to‘plandi!",
        visualEffect: { liquidColor: "rgba(186, 230, 253, 0.5)", bubbling: true, smokeOrGas: "Katodda H₂ (2 qism), Anodda O₂ (1 qism)" }
      }
    ],
    chemicalEquation: "2H₂O —(elektr toki)→ 2H₂↑ (katod) + O₂↑ (anod)",
    equationType: "Elektrokimyoviy ajralish",
    scientificExplanationUz: "Suv molekulasi 2 atom vodorod va 1 atom kisloroddan iborat (H₂O). Elektr toki ta’sirida suv molekulalari parchalanadi va gazlarning hajm nisbati aynan formuladagi nisbatga (V(H₂) : V(O₂) = 2 : 1) to‘liq mos keladi.",
    conclusionUz: "Suv vodorod va kisloroddan tashkil topgan murakkab modda ekanligi uning sintezi va tahlili orqali isbotlandi.",
    quizQuestions: [
      {
        question: "Suv elektrolizida katodda qaysi gaz ajraladi?",
        options: ["Vodorod (H₂)", "Kislorod (O₂)", "Ozon (O₃)", "Azot (N₂)"],
        correctIndex: 0,
        explanation: "Katod (manfiy qutb) da H⁺ ionlari qaytarilib, vodorod gazi H₂ ajraladi."
      },
      {
        question: "Ajralgan vodorod va kislorod hajmlari nisbati qanday?",
        options: ["1 : 1", "2 : 1", "1 : 2", "3 : 1"],
        correctIndex: 1,
        explanation: "H₂O formulasiga ko‘ra, 2 hajm H₂ ga 1 hajm O₂ to‘g‘ri keladi."
      }
    ]
  },
  {
    id: "exp-silver-mirror",
    title: "Kumush ko‘zgu reaksiyasi (Aldegidlar uchun sifat reaksiyasi)",
    grade: 10,
    topic: "Organik kimyo. Aldegidlar va Uglevodlar",
    objectiveUz: "Formaldegid yoki glyukozaning ammiakdagi kumush oksid eritmasi bilan ta’sirlashuvida probirka devorida yaltiroq kumush ko‘zgu hosil bo‘lishini ko‘rish.",
    durationMinutes: 20,
    difficulty: "Murakkab",
    apparatus: ["Toza yuvilgan silliq probirka", "Suv hammomi", "Spirt lampasi", "Termometr"],
    reagents: [
      {
        id: "tollens",
        name: "Tollens reaktivi ([Ag(NH₃)₂]OH eritmasi)",
        formula: "[Ag(NH3)2]OH",
        color: "#ffffff",
        state: "liquid",
        hazardLevel: "warning",
        hazardNoteUz: "Yangi tayyorlangan ammiakli kumush oksidi."
      },
      {
        id: "glucose",
        name: "Glyukoza (yoki formaldegid) eritmasi",
        formula: "C6H12O6",
        color: "#ffffff",
        state: "liquid",
        hazardLevel: "safe",
        hazardNoteUz: "Qaytaruvchi xususiyatga ega aldegid shakli."
      }
    ],
    safetyWarnings: [
      "Tollens reaktivini uzoq saqlab bo‘lmaydi (portlovchi kumush fulminati hosil bo‘lishi xavfi).",
      "Probirka oldindan o‘ta toza yuvilgan bo‘lishi kerak."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Tollens reaktivini probirkaga quyish",
        instructionUz: "Probirkaning ichki devorlarini spirt va ishqor bilan tozalab, 3 ml Tollens reaktivi quying.",
        requiredAction: "add_reagent",
        targetReagentId: "tollens",
        observationUz: "Shaffof rangsiz eritma.",
        visualEffect: { liquidColor: "rgba(241, 245, 249, 0.4)" }
      },
      {
        stepNumber: 2,
        title: "Qaytaruvchi qo‘shish va qizdirish",
        instructionUz: "Probirka ichiga glyukoza eritmasi soling va 60-70°C li iliq suv hammomida qizdiring.",
        requiredAction: "heat",
        observationUz: "Eritma avval qoraydi, so‘ngra probirkaning butun ichki shisha devori YALTIRAB TURUVCHI HAQIQIY KUMUSH KO‘ZGU BILAN QOPLANDI!",
        visualEffect: { liquidColor: "rgba(203, 213, 225, 0.9)", precipitateColor: "#94a3b8" }
      }
    ],
    chemicalEquation: "R-CHO + 2[Ag(NH₃)₂]OH —(t°)→ R-COONH₄ + 2Ag↓ (ko‘zgu) + 3NH₃ + H₂O",
    equationType: "Oksidlanish-qaytarilish (Aldegidlar sifat reaksiyasi)",
    scientificExplanationUz: "Aldegid guruhi (-CHO) juda oson oksidlanadi va kumush ionlarini Ag⁺ sof kumush metalli Ag⁰ ga qadar qaytaradi. Probirka devori toza bo‘lsa, qaytarilgan kumush atomlari bir tekis o‘tirib ko‘zgu hosil qiladi.",
    conclusionUz: "Kumush ko‘zgu reaksiyasi aldegidlar va aldegid guruhiga ega uglevodlar (glyukoza) ni ishonchli aniqlaydi.",
    quizQuestions: [
      {
        question: "Ushbu reaksiya qaysi funksional guruhni aniqlash uchun ishlatiladi?",
        options: ["Spirt guruhi (-OH)", "Aldegid guruhi (-CHO)", "Karboksil guruhi (-COOH)", "Amin guruhi (-NH₂)"],
        correctIndex: 1,
        explanation: "Aldegid guruhi (-CHO) Tollens reaktivini kumush metalligacha qaytaradi."
      }
    ]
  },
  {
    id: "exp-flame-test",
    title: "Metall kationlarini alanga rangiga qarab aniqlash",
    grade: 8,
    topic: "Ishqoriy va ishqoriy-yer metallar tahlili",
    objectiveUz: "Har xil metall tuzlarining rangsiz alangaga kiritilganda o‘ziga xos xarakterli rang berishini (Li-qizil, Na-sariq, K-binafsha, Cu-yashil) kuzatish.",
    durationMinutes: 10,
    difficulty: "Oson",
    apparatus: ["Nixrom yoki platina sirti", "Spirt lampasi yoki gaz gorelkasi", "HCl eritmasi (simni tozalash uchun)"],
    reagents: [
      {
        id: "nacl_salt",
        name: "Natriy xlorid (NaCl)",
        formula: "NaCl",
        color: "#ffffff",
        state: "powder",
        hazardLevel: "safe",
        hazardNoteUz: "Oddiy osh tuzi."
      },
      {
        id: "cu_salt",
        name: "Mis (II) xlorid (CuCl₂)",
        formula: "CuCl2",
        color: "#059669",
        state: "powder",
        hazardLevel: "warning",
        hazardNoteUz: "Yashil kristall tuz."
      }
    ],
    safetyWarnings: [
      "Ochiq olov bilan ehtiyotkor bo‘ling.",
      "Kukunlarni hidlamang."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Natriy tuzini alangaga kiritish",
        instructionUz: "Nixrom sim uchiga ozgina NaCl kukunini olib, olovga tuting.",
        requiredAction: "heat",
        observationUz: "Alanga bir zumda YORQIN TO‘Q SARIQ rangga bo‘yaldi (Natriyning xos nurlanishi).",
        visualEffect: { flameColor: "#facc15" }
      },
      {
        stepNumber: 2,
        title: "Mis tuzini alangaga kiritish",
        instructionUz: "Simni kislotada tozalab, CuCl₂ tuzini olovga tuting.",
        requiredAction: "heat",
        observationUz: "Alanga go‘zal YASHIL-ZUMRAD rangga kirdi!",
        visualEffect: { flameColor: "#10b981" }
      }
    ],
    chemicalEquation: "Termik qo‘zg‘alish: M⁺ + e⁻ (qo‘zg‘alish) → M* → M + hν (xos yorug‘lik kvanti)",
    equationType: "Atom-emission tahlil",
    scientificExplanationUz: "Yuqori haroratda metall atomlarining tashqi elektronlari yuqori energetik sathlarga sakraydi. Asosiy sathga qaytishida energiyani ma’lum to‘lqin uzunligidagi ko‘rinuvchi yorug‘lik nuri sifatida sochadi.",
    conclusionUz: "Alanga sinovi pirotexnika va kimyoviy sifat tahlilida metallarni aniqlashning eng tezkor usulidir.",
    quizQuestions: [
      {
        question: "Natriy birikmalari alangani qaysi rangga bo‘yaydi?",
        options: ["Yashil", "Qizil", "Yorqin sariq", "Ko‘k"],
        correctIndex: 2,
        explanation: "Natriyning 589 nm to‘lqin uzunlikdagi D-chiziqlari alangaga o‘ziga xos sariq rang beradi."
      }
    ]
  },
  {
    id: "exp-ammonia-fountain",
    title: "Ammiak favvorasi (Gazlarning eruvchanligi)",
    grade: 9,
    topic: "Azot guruhchasi. Ammiak",
    objectiveUz: "Ammiak gazining (NH₃) suvda g‘oyatda yuqori eruvchanligini (1 litr suvda 700 litr gaz) va hosil bo‘lgan eritmaning ishqoriyligini favvora orqali namoyish qilish.",
    durationMinutes: 15,
    difficulty: "Murakkab",
    apparatus: ["Ammiak gazi bilan to‘ldirilgan dumaloq tubli quruq kolba", "Gaz nayli tiqin", "Kristallizator", "Fenolftaleinli suv"],
    reagents: [
      {
        id: "nh3_gas",
        name: "Quruq ammiak gazi (NH₃)",
        formula: "NH3",
        color: "#ffffff",
        state: "gas",
        hazardLevel: "danger",
        hazardNoteUz: "O‘tkir hidli zaharli gaz."
      },
      {
        id: "water_phen",
        name: "Fenolftalein qo‘shilgan suv",
        formula: "H2O + Fenolftalein",
        color: "#e0f2fe",
        state: "liquid",
        hazardLevel: "safe",
        hazardNoteUz: "Rangsiz neytral suv."
      }
    ],
    safetyWarnings: [
      "Ammiak bug‘idan tortgich shkafsiz nafas olmang.",
      "Kolba quruq va germetik bo‘lishi shart."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Kolbaga bir tomchi suv kiritish",
        instructionUz: "Quruq ammiakli kolbaning naychasi orqali bir necha tomchi suv yuborib biroz silkiting.",
        requiredAction: "add_reagent",
        targetReagentId: "water_phen",
        observationUz: "Ammiak tezda suvda eriydi va kolba ichida kuchli manfiy bosim (vakuum) vujudga keladi.",
        visualEffect: { liquidColor: "rgba(224, 242, 254, 0.4)" }
      },
      {
        stepNumber: 2,
        title: "Naychani fenolftaleinli suvga tushirish",
        instructionUz: "Naychaning uchini stakandagi suvga botirib kranni oching.",
        requiredAction: "observe",
        observationUz: "Atmosfera bosimi suvni yuqoriga haydadi va kolba ichida SHIDDATLI MALINA RANGLI FAVVORA otilib chiqdi!",
        visualEffect: { liquidColor: "rgba(244, 63, 94, 0.85)", bubbling: true }
      }
    ],
    chemicalEquation: "NH₃ + H₂O ⇄ NH₄⁺ + OH⁻",
    equationType: "Eruvchanlik va gidroliz",
    scientificExplanationUz: "1 hajm suvda 700 hajm NH₃ eriydi. Gaz erishi bilan kolba ichida vakuum hosil bo‘lib tashqi atmosfera bosimi suvni otib chiqaradi. Suvda erigan ammiak ishqoriy muhit (OH⁻ ionlari) hosil qilgani sababli fenolftalein malina rangiga bo‘yaladi.",
    conclusionUz: "Ammiakning suvda favqulodda kuchli erishi va ishqoriy tabiati isbotlandi.",
    quizQuestions: [
      {
        question: "Kolba ichida suv favvora bo‘lib otilishining fizik sababi nima?",
        options: ["Harorat ko‘tarilishi", "Gaz erishi natijasida kuchli vakuum (past bosim) hosil bo‘lishi", "Gaz kengayishi", "Suvning zichligi oshishi"],
        correctIndex: 1,
        explanation: "Ammiak gazining tez erishi natijasida kolba ichidagi bosim keskin tushib ketadi."
      }
    ]
  }
];
