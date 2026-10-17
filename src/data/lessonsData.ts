import { LessonSection } from '../types/chemistry';

export const LESSONS_DATA: LessonSection[] = [
  {
    id: "lesson-7-1",
    title: "Moddalar va ularning xossalari. Sof moddalar va aralashmalar",
    grade: 7,
    chapter: "1-bob. Boshlang‘ich kimyoviy tushunchalar",
    summary: "Fizikaviy va kimyoviy hodisalar, moddalarning agregat holatlari hamda aralashmalarni ajratish usullari.",
    content: `Kimyo — moddalar, ularning tarkibi, tuzilishi, xossalari va bir-biriga aylanish qonuniyatlarini o‘rganuvchi fan.

1. Fizikaviy xossalar: Rang, hid, ta'm, zichlik, qaynash va erish haroratlari, elektr va issiqlik o‘tkazuvchanlik.
2. Kimyoviy xossalar: Moddaning boshqa moddalar bilan ta'sirlashib, yangi moddalar hosil qilish qobiliyati.
3. Aralashmalar turlari:
   - Bir jinsli (gomogen): tuz yoki shakarning suvdagi eritmasi, havo;
   - Har xil jinsli (geterogen): loyqa suv, yog' bilan suv aralashmasi.
4. Ajratish usullari: Tindirish, filtrlash, bug‘latish, kristallash, haydash (distillash) va magnit yordamida ajratish.`,
    keyFormulas: [
      "Zichlik: ρ = m / V (g/sm³ yoki kg/m³)",
      "Aralashmadagi moddaning massa ulushi: w = m(modda) / m(aralashma)"
    ],
    examples: [
      {
        problem: "Hajmi 50 sm³ bo‘lgan metall bo‘lagining massasi 135 g ga teng. Metallning zichligini aniqlang va u qaysi metall bo‘lishi mumkinligini toping.",
        solution: "ρ = m / V = 135 g / 50 sm³ = 2.7 g/sm³. Zichliklar jadvaliga ko‘ra, bu qiymat Alyuminiy (Al) metaliga to‘g‘ri keladi."
      }
    ],
    relatedExperimentId: "exp-electrolysis-water",
    checkpointQuestions: [
      {
        question: "Quyidagilardan qaysi biri kimyoviy hodisaga misol bo‘ladi?",
        options: ["Muzning erishi", "Temirning zanglashi", "Shakarning suvda erishi", "Shishaning sinishi"],
        correctAnswer: 1,
        explanation: "Temir zanglaganda yangi modda (Fe₂O₃·nH₂O) hosil bo‘ladi, bu kimyoviy hodisadir. Qolganlari esa fizikaviy o‘zgarishlardir."
      },
      {
        question: "Qum va temir qipiqlari aralashmasini eng oson qaysi usulda ajratish mumkin?",
        options: ["Filtrlash", "Bug‘latish", "Magnit ta’sirida", "Haydash"],
        correctAnswer: 2,
        explanation: "Temir magnit xususiyatiga ega bo‘lgani uchun magnit yordamida qumdan bir zumda ajratib olinadi."
      }
    ]
  },
  {
    id: "lesson-7-2",
    title: "Atom tuzilishi, Kimyoviy elementlar va Valentlik",
    grade: 7,
    chapter: "2-bob. Atom-molekulyar ta'limot",
    summary: "Atom yadrosi, proton, neytron, elektronlar hamda kimyoviy formulalarni valentlikka asosan tuzish qoidalari.",
    content: `Atom — moddaning kimyoviy jihatdan bo‘linmas eng kichik zarrasidir.

- Atom markazida musbat zaryadlangan yadro joylashgan bo‘lib, unda protonlar (p⁺) va neytronlar (n⁰) mavjud.
- Yadro atrofida manfiy zaryadlangan elektronlar (e⁻) aylanadi.
- Massaviy son (A) = Z (protonlar soni) + N (neytronlar soni).

Valentlik — kimyoviy element atomining boshqa element atomlarining ma'lum sonini o‘ziga biriktirib olish yoki o‘rnini bosish xususiyatidir.
- Vodorod doimo I valentli.
- Kislorod doimo II valentli.
- Formula tuzishda elementlarning valentliklari ko‘paytmasi teng bo‘lishi shart (eng kichik umumiy karrali qoidasi).`,
    keyFormulas: [
      "A = Z + N",
      "Element valentligi × Atomlar soni = doimiy tenglik"
    ],
    examples: [
      {
        problem: "Alyuminiy (III valentli) va kislorod (II valentli) birikmasining kimyoviy formulasini tuzing.",
        solution: "Valentliklar: Al(III) va O(II). Umumiy karrali: 3 × 2 = 6. Alyuminiy indeksi: 6 / 3 = 2. Kislorod indeksi: 6 / 2 = 3. Natijaviy formula: Al₂O₃."
      }
    ],
    relatedExperimentId: "exp-magnesium-burning",
    checkpointQuestions: [
      {
        question: "Uglerod (IV) oksidi formulasida uglerod va kislorod atomlari indeksi qanday bo‘ladi?",
        options: ["CO", "CO₂", "C₂O", "C₂O₄"],
        correctAnswer: 1,
        explanation: "C valentligi IV, O valentligi II. EKUK = 4. Indekslar: 4/4 = 1 va 4/2 = 2. Demak, CO₂."
      }
    ]
  },
  {
    id: "lesson-8-1",
    title: "Mendeleyev davriy qonuni va atom tuzilishi",
    grade: 8,
    chapter: "1-bob. Davriy qonun va kimyoviy bog‘lanish",
    summary: "D.I. Mendeleyev tomonidan kashf etilgan elementlar davriy qonuniyati, davrlar, guruhlar va elektron qobiqlar.",
    content: `D.I. Mendeleyev 1869-yilda kashf etgan davriy qonunning zamonaviy ta'rifi:
"Kimyoviy elementlar va ular hosil qilgan oddiy hamda murakkab moddalarning xossalari atom yadrosi zaryadiga davriy ravishda bog‘liqdir."

- Tartib raqami = Yadro zaryadi = Protonlar soni = Elektronlar soni.
- Davr raqami = Atomdagi elektron qobiqlari soni.
- Asosiy guruhcha raqami = Tashqi elektron qavatidagi valent elektronlar soni.

Davr bo‘ylab chapdan o‘ngga borgan sari:
- Yadro zaryadi ortadi;
- Atom radiusi kichrayadi;
- Elektrmanfiylik va metallmaslik xossalari ortadi;
- Metallik xossalari susayadi.`,
    keyFormulas: [
      "Maksimal elektronlar sig‘imi: N = 2n² (bu yerda n — pog‘ona raqami)",
      "1-qavat: 2e⁻, 2-qavat: 8e⁻, 3-qavat: 18e⁻"
    ],
    examples: [
      {
        problem: "11-tartib raqamli natriy (Na) atomining elektron formulasini yozing.",
        solution: "11 ta elektron: 1s² 2s² 2p⁶ 3s¹. 3-davr, I guruh asosiy guruhchasida joylashgan, tashqi qavatida 1 ta elektron bor."
      }
    ],
    relatedExperimentId: "exp-flame-test",
    checkpointQuestions: [
      {
        question: "Davr bo‘ylab chapdan o‘ngga o‘tganda metallik xossalari qanday o‘zgaradi?",
        options: ["Ortadi", "Susayadi", "O‘zgarmaydi", "Avval susayib so‘ng ortadi"],
        correctAnswer: 1,
        explanation: "Yadro zaryadi oshishi va atom radiusi kichrayishi sababli elektron berish qiyinlashadi, ya'ni metallik susayadi."
      }
    ]
  },
  {
    id: "lesson-8-2",
    title: "Anorganik birikmalarning asosiy sinflari (Oksidlar, Asoslar, Kislotalar, Tuzlar)",
    grade: 8,
    chapter: "2-bob. Murakkab anorganik moddalar",
    summary: "Anorganik moddalarning genetik bog‘lanishi, ularning sinflanishi va o‘zaro reaksiyalari.",
    content: `Anorganik moddalar 4 ta asosiy sinfga bo‘linadi:

1. Oksidlar: Ikki elementdan iborat bo‘lib, birortasi kislorod (-2) bo‘lgan murakkab moddalar (Asosli: Na₂O, CaO; Kislotali: SO₃, CO₂; Amfoter: Al₂O₃, ZnO).
2. Asoslar: Metall atomi va bir yoki bir nechta gidroksid guruhlaridan (OH⁻) iborat moddalar. Suvda eriydigan asoslar — ishqorlar (NaOH, KOH, Ca(OH)₂).
3. Kislotalar: Metall atomiga o‘rnini bera oladigan vodorod atomi va kislota qoldig‘idan iborat moddalar (HCl, HNO₃, H₂SO₄, H₃PO₄).
4. Tuzlar: Metall atomi va kislota qoldig‘idan tashkil topgan moddalar (NaCl, CuSO₄, CaCO₃).

Genetik qator:
Metall → Asosli oksid → Asos → Tuz
Metallmas → Kislotali oksid → Kislota → Tuz`,
    keyFormulas: [
      "Oksid: Me₂Oₓ yoki NMe₂Oₓ",
      "Asos: Me(OH)ₙ",
      "Kislota: HₙAc",
      "Tuz: MeₘAcₙ"
    ],
    examples: [
      {
        problem: "Kalsiy oksidiga suv qo‘shilganda qanday modda hosil bo‘ladi va bu reaksiya qanday nomlanadi?",
        solution: "CaO + H₂O → Ca(OH)₂. Hosil bo‘lgan modda — kalsiy gidroksid (so‘ndirilgan ohak). Jarayon ohakni so‘ndirish deb ataladi."
      }
    ],
    relatedExperimentId: "exp-neutralization",
    checkpointQuestions: [
      {
        question: "Quyidagilardan qaysi biri ishqor hisoblanadi?",
        options: ["Cu(OH)₂", "Fe(OH)₃", "NaOH", "Al(OH)₃"],
        correctAnswer: 2,
        explanation: "NaOH (o‘yuvchi natriy) suvda yaxshi eriydi va kuchli ishqordir. Qolgan gidroksidlar suvda erimaydi."
      }
    ]
  },
  {
    id: "lesson-9-1",
    title: "Elektrolitik dissotsiatsiya nazariyasi va Ion almashinish reaksiyalari",
    grade: 9,
    chapter: "1-bob. Eritmalar nazariyasi",
    summary: "Moddalarning suvda ionlarga ajralishi, kuchli va kuchsiz elektrolitlar hamda ionli tenglamalar.",
    content: `Moddalarning suvda eriganda yoki suyuqlanganda ionlarga ajralish jarayoni elektrolitik dissotsiatsiya deyiladi (Svante Arrenius, 1887).

- Elektrolitlar: Erigan yoki suyuqlangan holatda elektr tokini o‘tkazuvchi moddalar (tuzlar, kislotalar, ishqorlar).
- Noelektrolitlar: Tok o‘tkazmaydigan moddalar (distillangan suv, shakar, spirt, kislorod).

Ion almashinish reaksiyalari oxirigacha borish shartlari:
1. Cho‘kma hosil bo‘lishi (↓) — masalan, BaSO₄, AgCl;
2. Gaz ajralishi (↑) — masalan, CO₂, H₂S;
3. Kam dissotsiyalanuvchi modda (suv H₂O) hosil bo‘lishi.`,
    keyFormulas: [
      "Dissotsiatsiya darajasi: α = (ionlarga ajralgan molekulalar) / (umumiy molekulalar soni)",
      "Qisqa ionli tenglama: H⁺ + OH⁻ → H₂O"
    ],
    examples: [
      {
        problem: "AgNO₃ + NaCl reaksiyasining to‘liq va qisqa ionli tenglamasini yozing.",
        solution: "To‘liq: Ag⁺ + NO₃⁻ + Na⁺ + Cl⁻ → AgCl↓ + Na⁺ + NO₃⁻. Qisqa: Ag⁺ + Cl⁻ → AgCl↓."
      }
    ],
    relatedExperimentId: "exp-barium-sulfate-precipitate",
    checkpointQuestions: [
      {
        question: "Ion almashinish reaksiyasi qachon oxirigacha boradi?",
        options: ["Faqat rang o‘zgarganda", "Cho‘kma, gaz yoki suv hosil bo‘lganda", "Har doim boradi", "Faqat sovitilganda"],
        correctAnswer: 1,
        explanation: "Ionlar eritmada bog‘lanib cho‘kma, gaz yoki kam dissotsiyalanuvchi modda (suv) hosil qilsagina reaksiya oxirigacha boradi."
      }
    ]
  },
  {
    id: "lesson-10-1",
    title: "Organik kimyoga kirish. Alkanlar (To‘yingan uglevodorodlar)",
    grade: 10,
    chapter: "1-bob. Uglevodorodlar",
    summary: "A.M. Butlerovning tuzilish nazariyasi, gomologik qator, izomeriya va metanning xossalari.",
    content: `Organik kimyo — uglerod birikmalarini va ularning hosilalarini o‘rganuvchi kimyo sohasidir.

Butlerov tuzilish nazariyasining asosiy qoidalari:
1. Organik moddalarda uglerod atomi doimo IV valentli bo‘ladi va o‘zaro zanjir hosil qila oladi.
2. Moddalarning xossalari nafaqat tarkibiga, balki ularning kimyoviy tuzilishiga (atomlarning birikish tartibiga) bog‘liq.

Alkanlar (To‘yingan uglevodorodlar):
Umumiy formulasi: CₙH₂ₙ₊₂
Gomologik qator: Metan (CH₄), Etan (C₂H₆), Propan (C₃H₈), Butan (C₄H₁₀), Pentan (C₅H₁₂)...
- Barcha bog‘lar bir karrali (σ-bog‘lar).
- Uglerod atomlari sp³ gibridlangan (bog‘ burchagi 109°28').
- Asosiy reaksiyalari: o‘rin olish (galogenlash) va yonish.`,
    keyFormulas: [
      "Alkanlar formulasi: CₙH₂ₙ₊₂",
      "Yonish tenglamasi: CₙH₂ₙ₊₂ + (3n+1)/2 O₂ → nCO₂ + (n+1)H₂O"
    ],
    examples: [
      {
        problem: "Tarkibida 6 ta uglerod atomi bo‘lgan alkanning molekulyar formulasini va molyar massasini toping.",
        solution: "n = 6 bo‘lsa, H atomlari soni: 2×6 + 2 = 14. Formula: C₆H₁₄ (Geksan). Molyar massa M = 6×12 + 14×1 = 86 g/mol."
      }
    ],
    relatedExperimentId: "exp-silver-mirror",
    checkpointQuestions: [
      {
        question: "Alkanlarda uglerod atomlarining gibridlanish turi qanday?",
        options: ["sp", "sp²", "sp³", "dsp²"],
        correctAnswer: 2,
        explanation: "To‘yingan uglevodorodlarda barcha 4 ta valent elektron jufti tetraedr bo‘ylab yo‘nalgan, ya’ni sp³ gibridlangan."
      }
    ]
  }
];
