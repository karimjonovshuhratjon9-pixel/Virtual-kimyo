import { QuizItem } from '../types/chemistry';

export const QUIZ_ITEMS: QuizItem[] = [
  {
    id: "q-1",
    type: "multiple-choice",
    question: "Kimyoviy elementning nisbiy atom massasi qaysi birlik orqali o‘lchanadi?",
    options: ["Gramm", "Atom massa birligi (m.a.b.)", "Kilogramm", "Litrr"],
    correctAnswer: 1,
    explanation: "Atom massa birligi — uglerod ¹²C izotopi massasining 1/12 qismiga teng standart o‘lchov birligidir.",
    difficulty: "Oson",
    grade: 7,
    category: "Boshlang‘ich tushunchalar"
  },
  {
    id: "q-2",
    type: "identify-element",
    question: "Ushbu xususiyatlarga ega elementni aniqlang: Tartib raqami 11, suv bilan shiddatli reaksiyaga kirishadi, pichoq bilan oson kesiladi va osh tuzi tarkibida bo‘ladi.",
    options: ["Kaliy (K)", "Natriy (Na)", "Kalsiy (Ca)", "Litiy (Li)"],
    correctAnswer: 1,
    explanation: "Natriy (Na) — 11-tartib raqamli ishqoriy metall, NaCl tarkibiy qismi.",
    difficulty: "Oson",
    grade: 7,
    category: "Elementlar"
  },
  {
    id: "q-3",
    type: "multiple-choice",
    question: "Sulfat kislotaning molekulyar formulasi qaysi?",
    options: ["H₂SO₃", "H₂SO₄", "HNO₃", "H₃PO₄"],
    correctAnswer: 1,
    explanation: "H₂SO₄ — sulfat kislota. H₂SO₃ esa sulfit kislotadir.",
    difficulty: "Oson",
    grade: 8,
    category: "Formulalar"
  },
  {
    id: "q-4",
    type: "true-false",
    question: "Inert gazlar tashqi elektron qavatida 8 ta (geliyda 2 ta) elektronga ega bo‘lib, odatdagi sharoitda kimyoviy birikmalar hosil qilmaydi.",
    options: ["To‘g‘ri", "Noto‘g‘ri"],
    correctAnswer: 0,
    explanation: "To‘g‘ri. Inert gazlarning tashqi elektron qobig‘i to‘liq tugallangan (oktet qoidasi), shuning uchun ular o‘ta barqaror.",
    difficulty: "Oson",
    grade: 8,
    category: "Davriy qonun"
  },
  {
    id: "q-5",
    type: "multiple-choice",
    question: "Avogadro doimiysining (N_A) son qiymati qanchaga teng?",
    options: ["6.02 × 10²³ mol⁻¹", "1.66 × 10⁻²⁴ g", "22.4 l/mol", "3.14 × 10²³"],
    correctAnswer: 0,
    explanation: "1 mol har qanday moddada aynan 6.022 × 10²³ dona zarracha mavjud.",
    difficulty: "Oson",
    grade: 8,
    category: "Miqdoriy hisoblar"
  },
  {
    id: "q-6",
    type: "multiple-choice",
    question: "Oddiy sharoitda 1 mol har qanday gaz egallagan hajm qanchaga teng?",
    options: ["10.5 litr", "22.4 litr", "44.8 litr", "1.0 litr"],
    correctAnswer: 1,
    explanation: "Normal sharoitda (0°C va 1 atm) 1 mol gaz 22.4 litr hajmni egallaydi (Molyar hajm V_m).",
    difficulty: "Oson",
    grade: 8,
    category: "Gaz qonunlari"
  },
  {
    id: "q-7",
    type: "multiple-choice",
    question: "Oshqozon shirasidagi asosiy kislota qaysi?",
    options: ["Sulfat kislota (H₂SO₄)", "Xlorid kislota (HCl)", "Sirka kislota (CH₃COOH)", "Nitrat kislota (HNO₃)"],
    correctAnswer: 1,
    explanation: "Inson oshqozonida oqsillarni parchalash va mikroblarni o‘ldirish uchun taxminan 0.5% li xlorid kislota (HCl) ajraladi.",
    difficulty: "O‘rtacha",
    grade: 8,
    category: "Tirik tabiat kimyosi"
  },
  {
    id: "q-8",
    type: "identify-element",
    question: "Qaysi metall xona haroratida (20°C) suyuq holatda bo‘ladi?",
    options: ["Galliy", "Simob (Hg)", "Qo‘rg‘oshin", "Seziy"],
    correctAnswer: 1,
    explanation: "Simob (Hg) -38.8°C da suyuqlanadi, shuning uchun xona haroratida suyuq yagona metalldir.",
    difficulty: "Oson",
    grade: 8,
    category: "Metallar"
  },
  {
    id: "q-9",
    type: "multiple-choice",
    question: "Eritmada lakmus qog‘ozi qizil rangga aylansa, bu muhit qanday ekanligini ko‘rsatadi?",
    options: ["Ishqoriy", "Neytral", "Kislotali", "Spirtli"],
    correctAnswer: 2,
    explanation: "Lakmus kislotali muhitda qizaradi, ishqoriy muhitda esa ko‘karadi.",
    difficulty: "Oson",
    grade: 8,
    category: "Indikatorlar"
  },
  {
    id: "q-10",
    type: "true-false",
    question: "Kislotani suv bilan suyultirganda, SUVI KISLOTAGA QUYILISHI KERAK.",
    options: ["To‘g‘ri", "Noto‘g‘ri"],
    correctAnswer: 1,
    explanation: "NOTO‘G‘RI! Bu o‘ta xavfli qoida buzilishidir. Oltin qoida: DOIMO KISLOTA SUVGA INGICHKA OQIMDA QUYILADI! Aks holda suv bir zumda qaynaydi va kislota yuzga sachraydi.",
    difficulty: "Oson",
    grade: 7,
    category: "Xavfsizlik"
  },
  {
    id: "q-11",
    type: "multiple-choice",
    question: "Suv molekulasida vodorod va kislorod atomlari orasidagi bog‘lanish burchagi qanchaga teng?",
    options: ["180°", "120°", "104.5°", "90°"],
    correctAnswer: 2,
    explanation: "Kisloroddagi bo‘linmagan elektron juftlari bog‘lovchi juftlarni siqishi natijasida burchak 104.5° ga teng bo‘ladi.",
    difficulty: "Murakkab",
    grade: 9,
    category: "Molekula tuzilishi"
  },
  {
    id: "q-12",
    type: "multiple-choice",
    question: "Metan (CH₄) gazida uglerod atomining gibridlanish holati qanday?",
    options: ["sp", "sp²", "sp³", "dsp"],
    correctAnswer: 2,
    explanation: "Metan muntazam tetraedr shaklida bo‘lib, markaziy C atomi sp³ gibridlangan.",
    difficulty: "O‘rtacha",
    grade: 10,
    category: "Organik kimyo"
  }
];

export interface BadgeDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  requiredXp: number;
}

export const BADGES: BadgeDefinition[] = [
  { id: "b1", name: "Boshlang‘ich kimyogar", description: "Birinchi virtual tajribani muvaffaqiyatli bajardi", icon: "FlaskConical", requiredXp: 50 },
  { id: "b2", name: "Elementlar bilimdoni", description: "Mendeleyev jadvali bo‘yicha 5 ta element xossasini o‘rgandi", icon: "Sparkles", requiredXp: 150 },
  { id: "b3", name: "Tenglama ustasi", description: "Kimyoviy reaksiyalar tenglamasini to‘g‘ri tenglashtirdi", icon: "Scale", requiredXp: 300 },
  { id: "b4", name: "Viktorina chempioni", description: "Testda 90% dan yuqori ball to‘pladi", icon: "Trophy", requiredXp: 500 },
  { id: "b5", name: "Laboratoriya professori", description: "Barcha 10 ta tajribani yakunlab hisobot topshirdi", icon: "Award", requiredXp: 1000 },
];
