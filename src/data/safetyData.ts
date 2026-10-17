import { SafetyRule, HazardSymbol } from '../types/chemistry';

export const SAFETY_RULES: SafetyRule[] = [
  {
    id: "sr-1",
    category: "Kiyim va himoya",
    title: "Shaxsiy himoya vositalari (SHV)",
    descriptionUz: "Laboratoriyaga kirishdan oldin har bir o‘quvchi va o‘qituvchi belgilangan himoya kiyimlarini kiyishi shart.",
    severity: "danger",
    icon: "ShieldAlert",
    doList: [
      "Paxtali matodan tikilgan laboratoriya xalatini to‘liq tugmalang",
      "Ko‘zlarni himoyalash uchun yon qoplamali maxsus ko‘zoynak taqing",
      "Reaktivlar bilan ishlaganda nitril yoki rezina qo‘lqop kiying",
      "Sochlarni orqaga yig‘ib bog‘lang va yopiq poyabzal kiying"
    ],
    dontList: [
      "Ochiq sandal yoki baland poshnada kirmang",
      "Kontakt linzalar o‘rniga maxsus optik laboratoriya ko‘zoynagi taqing",
      "Zargarlik buyumlari (uzuk, bilaguzuk) ni laboratoriyaga taqmang"
    ]
  },
  {
    id: "sr-2",
    category: "Reaktivlar bilan ishlash",
    title: "Kislota va ishqorlarni suyultirish 'Oltin qoidasi'",
    descriptionUz: "Sulfat yoki xlorid kislotani suv bilan aralashtirishda o‘ta kuchli issiqlik ajraladi. Noto‘g‘ri ketma-ketlik kislotaning portlab sachrashiga olib keladi!",
    severity: "danger",
    icon: "Flame",
    doList: [
      "DOIMO kislotani suvga ingichka oqimda, stakan devori bo‘ylab va shisha tayoqcha bilan aralashtirib quying!",
      "Reaktiv idishlarining yorliqlarini doimo o‘qing va reaktivni faqat toza spatulada oling",
      "Reaktiv hidini tekshirishda idish og‘zini burniga yaqinlashtirmasdan, qo‘l kafti bilan yengil yelpib hidlang"
    ],
    dontList: [
      "HECH QACHON suvni konsentrlangan kislotaga quymang!",
      "Reaktivlarni og‘iz bilan pipetkaga so‘rmang (faqat rezina nok yoki dozatordan foydalaning)",
      "Ortib qolgan reaktivni umumiy idishga qaytarib to‘kmang"
    ]
  },
  {
    id: "sr-3",
    category: "Favqulodda holatlar",
    title: "Kislota yoki ishqor teriga to‘kilganda birinchi yordam",
    descriptionUz: "Laboratoriya shikastlanishlarida birinchi soniyalar hal qiluvchi ahamiyatga ega.",
    severity: "danger",
    icon: "HeartPulse",
    doList: [
      "Zararlangan joyni darhol ko‘p miqdorda oqar sovuq suv bilan kamida 10-15 daqiqa davomida yuvib tashlang",
      "Kislota ta'sir qilgan bo‘lsa: suvdan keyin 2% li ichimlik sodasi (NaHCO₃) eritmasi bilan kislotani neytrallang",
      "Ishqor ta'sir qilgan bo‘lsa: suvdan keyin 1-2% li sirka yoki borat kislotasi eritmasi bilan yuving",
      "Ko‘zga sachrasa: ko‘z yuvish fontanchasida ko‘zni ochiq tutgan holda 15 daqiqa yuving va darhol shifokorga murojaat qiling"
    ],
    dontList: [
      "Kislota yoki ishqor tekkanda suv bilan yuvmasdan turib malham yoki moy surtmang",
      "Yaralangan joyni quruq latta bilan ishqalamang",
      "Hodisani o‘qituvchidan yashirmang"
    ]
  },
  {
    id: "sr-4",
    category: "Laboratoriya tartibi",
    title: "Ish o‘rni intizomi va tozalik",
    descriptionUz: "Toza stol va tartibli asboblar xavfsiz tajribaning garovidir.",
    severity: "warning",
    icon: "CheckCircle",
    doList: [
      "Tajribani faqat o‘qituvchi ruxsati va yo‘riqnoma bo‘yicha bajaring",
      "Ish stolida faqat zarur laboratoriya idishlari va daftarni qoldiring",
      "Tajriba tugagach barcha idishlarni yuvib shtativga qo‘ying, elektr va gazni o‘chiring"
    ],
    dontList: [
      "Laboratoriya xonasida ovqatlanmang, suv ichmang va saqich chaynamang",
      "Laboratoriya idishlaridan choy yoki ovqat uchun foydalanmang",
      "Ruxsatsiz noma'lum moddalarni bir-biriga aralashtirmang"
    ]
  }
];

export const HAZARD_SYMBOLS: HazardSymbol[] = [
  {
    code: "GHS01",
    nameUz: "Portlovchi moddalar",
    descriptionUz: "Kuchli zarba, ishqalanish, uchqun yoki qizdirish ta'sirida o‘z-o‘zidan tez portlash xavfi mavjud moddalar.",
    hazardType: "Portlash",
    precautionsUz: "Ochiq olov, issiqlik manbalari va mexanik zarbalardan mutlaqo uzoq saqlansin.",
    iconName: "Bomb",
    color: "text-amber-400 bg-amber-500/10 border-amber-500/30"
  },
  {
    code: "GHS02",
    nameUz: "Tez alanga oluvchi (Yonuvchan)",
    descriptionUz: "Uchqun, qizdirish yoki past haroratda ham tez yonib ketuvchi suyuqlik, gaz va kukunlar (masalan, efir, spirt, aseton).",
    hazardType: "Yong‘in",
    precautionsUz: "Spirt lampasi va ochiq olovdan uzoqda, yaxshi ventilyatsiya qilinadigan shkafda saqlansin.",
    iconName: "Flame",
    color: "text-red-400 bg-red-500/10 border-red-500/30"
  },
  {
    code: "GHS03",
    nameUz: "Oksidlovchi moddalar",
    descriptionUz: "Boshqa yonuvchi moddalar bilan aralashganda yong‘in va portlashni keltirib chiqaruvchi kislorod manbalari (KMnO₄, H₂O₂ 30%, NaNO₃).",
    hazardType: "Yonishni kuchaytiruvchi",
    precautionsUz: "Organik moddalar, qog‘oz va yog‘lardan alohida maxsus idishlarda saqlansin.",
    iconName: "FlameKindling",
    color: "text-orange-400 bg-orange-500/10 border-orange-500/30"
  },
  {
    code: "GHS05",
    nameUz: "Korroziyali / O‘yuvchi",
    descriptionUz: "Tirik to‘qimalarga chuqur kimyoviy kuyish yetkazuvchi, metall va kiyimlarni yemiruvchi kuchli kislota va ishqorlar (H₂SO₄, HNO₃, NaOH).",
    hazardType: "Korroziya va kuyish",
    precautionsUz: "Faqat rezina qo‘lqop va himoya ko‘zoynagi bilan tortgich shkafda ishlatilsin.",
    iconName: "AlertTriangle",
    color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30"
  },
  {
    code: "GHS06",
    nameUz: "O‘tkir zaharli moddalar",
    descriptionUz: "Kam miqdorda nafas yo‘llari yoki teri orqali organizmga tushganda ham og‘ir zaharlanish yoki o‘limga olib keluvchi moddalar.",
    hazardType: "O‘tkir zaharlilik",
    precautionsUz: "Faqat tortgich shkafda, germetik idishlarda va o‘qituvchi nazorati ostida saqlansin.",
    iconName: "Skull",
    color: "text-purple-400 bg-purple-500/10 border-purple-500/30"
  },
  {
    code: "GHS09",
    nameUz: "Atrof-muhit uchun xavfli",
    descriptionUz: "Suv havzalari, o‘simlik va hayvonot olamiga uzoq muddatli halokatli zarar yetkazuvchi moddalar (og‘ir metall tuzlari Cu, Hg, Pb).",
    hazardType: "Ekotizim zahari",
    precautionsUz: "Kanalizatsiyaga oqizilmasin! Maxsus utilizatsiya idishlariga to‘plab zararsizlantirilsin.",
    iconName: "TreePine",
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
  }
];
