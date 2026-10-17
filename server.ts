import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '10mb' }));

// Shared Gemini client setup
let geminiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  geminiClient = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const SYSTEM_INSTRUCTION = `Siz "LABORATORYA" platformasining rasmiy, do'stona va chaqqon Kimyo AI yordamchisisiz (nomingiz: "Al-Kimyogar AI").
Siz o'quvchi va o'qituvchilarning ODDIY hamda MURAKKAB barcha savollariga tez, aniq va tushunarli javob berasiz.

MUHIM QOIDALAR:
1. ODDIY SAVOLLAR VA SALOMLASHISH (Juda muhim!):
   - Salomlashish ("salom", "assalomu alaykum", "qalaysan", "sen kimsan?"): Do'stona, samimiy va qisqa javob bering! Masalan: "Assalomu alaykum! Men Al-Kimyogar AI yordamchisiman. Yaxshiman, rahmat! Qanday kimyo savolingiz bor, qanday yordam bera olaman?"
   - Oddiy tushunchalar ("tuz nima?", "suv nima?", "osh tuzi formulasi", "kimyo nima?", "havo nima?"): Cho'zib o'tirmasdan, qisqa, lo'nda va sodda 2-4 jumlada tushuntiring.
   - Oddiy savollarga keraksiz uzun ma'ruzalar o'qimang.

2. MURAKKAB SAVOLLAR VA MASALALAR:
   - Reaksiya tenglamalari: Formulalarni indekslar bilan (H₂O, H₂SO₄, CaCO₃) va tenglashtirilgan koeffitsiyentlar bilan yozing (masalan: 2NaOH + H₂SO₄ → Na₂SO₄ + 2H₂O).
   - Masalalar: "Berilgan:", "Formula:", "Yechim:" va "Javob:" ketma-ketligida aniq va tez yechib bering.
   - Laboratoriya xavfsizligi: Xavfli moddalar so'ralganda xavfsizlik qoidalarini do'stona eslatib o'ting.

3. TEZLIK VA USLUB:
   - Har doim ravon o'zbek tilida (lotin yozuvida) yozing.
   - Javoblarni cho'zmasdan, to'g'ridan-to'g'ri savolga javob berishdan boshlang.`;

// Intelligent offline/local chemistry knowledge base fallback
function getIntelligentChemistryFallback(prompt: string): string {
  const q = prompt.toLowerCase().trim();
  
  // Greetings and everyday questions
  if (q.includes('salom') || q.includes('assalom') || q.includes('privet') || q.includes('hello')) {
    return `Assalomu alaykum! Men **Al-Kimyogar AI** — kimyo bo‘yicha aqlli yordamchingizman. 

Sizga qanday yordam bera olaman? Istalgan kimyoviy reaksiya, formula, masala yoki oddiy tushuncha haqida so‘rashingiz mumkin!`;
  }

  if (q.includes('qale') || q.includes('qalaysiz') || q.includes('ishlar') || q.includes('ahvol')) {
    return `Rahmat, ajoyib! Siz bilan kimyo olamini kashf qilishga doim tayyorman. Sizda qanday savol bor?`;
  }

  if (q.includes('kimsan') || q.includes('kim san') || q.includes('o\'zing haqinda') || q.includes('ozing haqinda')) {
    return `Men **Al-Kimyogar AI** — LABORATORYA platformasining rasmiy sun’iy intellekt yordamchisiman. 

Men 7–11-sinf maktab kimyosi, reaksiyalarni tenglashtirish, masalalar yechish va laboratoriya tajribalari bo‘yicha barcha savollaringizga javob bera olaman.`;
  }

  if (q.includes('rahmat') || q.includes('tashakkur') || q.includes('minnatdor')) {
    return `Arzimaydi! Yana qanday savolingiz bo‘lsa, bemalol so‘rang. O‘qish va izlanishlaringizda omad tilayman! ✨`;
  }

  if (q === 'tuz nima' || q.includes('osh tuzi') || q === 'nacl') {
    return `**Osh tuzi (Natriy xlorid — NaCl)** — oshxonamizda har kuni ishlatiladigan eng mashhur mineral tuz.
- **Formulasi:** NaCl (natriy va xlor ionlaridan iborat)
- **Xossasi:** Oq rangli kristall modda, suvda yaxshi eriydi.
- **Tarkibi:** Taxminan 39% natriy (Na) va 61% xlor (Cl) dan iborat.`;
  }

  if (q === 'suv nima' || q.includes('suv') || q.includes('h2o')) {
    return `**Suv (H₂O)** — vodorod va kisloroddan tashkil topgan, hayot uchun eng muhim modda.
- **Formulasi:** H₂O (2 ta vodorod va 1 ta kislorod atomi)
- **Molyar massasi:** 18 g/mol
- **Xossalari:** Oddiy sharoitda rangsiz, hidsiz suyuqlik. 0°C da muzlaydi, 100°C da qaynaydi.
- **Sintez reaksiyasi:** 2H₂ + O₂ → 2H₂O`;
  }

  if (q.includes('havo nima') || q === 'havo') {
    return `**Havo** — yer atmosferasini tashkil etuvchi tabiiy gazlar aralashmasi.
- **Tarkibi:**
  - Azot (N₂) — ~78%
  - Kislorod (O₂) — ~21%
  - Argon (Ar) — ~0.9%
  - Karbonat angidrid (CO₂) — ~0.04% va suv bug‘lari.`;
  }

  if (q.includes('kimyo nima') || q.includes('kimyo o\'zi nima')) {
    return `**Kimyo** — moddalar, ularning tarkibi, tuzilishi, xossalari va bir-biriga aylanish qonuniyatlarini o‘rganuvchi tabiatshunoslik fanidir. 

Kimyo atrofimizdagi barcha narsalarni — suv, havo, metallar, minerallar va organizmlardagi jarayonlarni tushunishga yordam beradi!`;
  }
  
  if (q.includes('mendeleyev') || q.includes('davriy') || q.includes('jadval')) {
    return `### Mendeleyev Davriy Jadvali
- 1869-yilda D.I. Mendeleyev tomonidan kashf etilgan.
- Hozirda 118 ta kimyoviy element mavjud.
- Elementlar atom yadrosi zaryadi (tartib raqami) ortib borishi tartibida joylashgan.
- 7 ta davr va 18 ta guruhdan iborat.`;
  }
  
  if (q.includes('neytrallanish') || (q.includes('kislota') && q.includes('ishqor'))) {
    return `### Neytrallanish Reaksiyasi
Kislota va ishqor o‘rtasida boradigan, tuz va suv hosil bo‘ladigan reaksiya:
**Kislota + Asos → Tuz + Suv**
*Misol:* HCl + NaOH → NaCl + H₂O
*Ionli mohiyati:* H⁺ + OH⁻ → H₂O`;
  }

  if (q.includes('molyar massa') || q.includes('massa')) {
    return `### Molyar Massa (M, g/mol)
Moddadagi barcha elementlarning nisbiy atom massalari yig‘indisi:
- M(H₂O) = 1×2 + 16 = 18 g/mol
- M(NaCl) = 23 + 35.5 = 58.5 g/mol
- M(H₂SO₄) = 2×1 + 32 + 16×4 = 98 g/mol
- **Asosiy formula:** n = m / M (mol)`;
  }

  return `Savolingiz: **"${prompt}"**

Bu mavzu bo‘yicha:
- Barcha kimyoviy jarayonlar atomlar va molekulalarning o‘zaro ta’siriga asoslanadi.
- Aniqroq formula, reaksiya yoki masala kiritishingiz mumkin, men darhol tushuntirib beraman!`;
}

// Helper to build contents array from history & current message
function buildContents(message: string, history?: any[]): any[] {
  const contents: any[] = [];
  if (Array.isArray(history) && history.length > 0) {
    const recentHistory = history.slice(-6);
    for (const item of recentHistory) {
      if (item.content && (item.role === 'user' || item.role === 'model')) {
        contents.push({
          role: item.role,
          parts: [{ text: item.content }],
        });
      }
    }
  }
  contents.push({
    role: 'user',
    parts: [{ text: message.trim() }],
  });
  return contents;
}

// POST /api/ai/chat (Supports both fast SSE streaming & instant JSON response)
app.post('/api/ai/chat', async (req, res) => {
  const isStream = req.query.stream === 'true' || req.headers.accept === 'text/event-stream';
  const { message, history } = req.body;

  if (!message || typeof message !== 'string' || !message.trim()) {
    res.status(400).json({ error: 'Savol matni kiritilmagan.' });
    return;
  }

  const trimmedMessage = message.trim();

  // If streaming is requested
  if (isStream) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    if (typeof (res as any).flushHeaders === 'function') {
      (res as any).flushHeaders();
    }

    if (geminiClient && process.env.GEMINI_API_KEY) {
      try {
        const contents = buildContents(trimmedMessage, history);
        const streamResult = await geminiClient.models.generateContentStream({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
            temperature: 0.7,
            topP: 0.95,
          },
        });

        for await (const chunk of streamResult) {
          const text = chunk.text;
          if (text) {
            res.write(`data: ${JSON.stringify({ text })}\n\n`);
          }
        }
        res.write('data: [DONE]\n\n');
        res.end();
        return;
      } catch (err: any) {
        console.warn('Gemini stream error, falling back to local engine:', err?.message);
      }
    }

    // Fallback stream
    const fallbackText = getIntelligentChemistryFallback(trimmedMessage);
    // Send in chunks for smooth feel
    const words = fallbackText.split(' ');
    for (let i = 0; i < words.length; i += 3) {
      const slice = words.slice(i, i + 3).join(' ') + ' ';
      res.write(`data: ${JSON.stringify({ text: slice })}\n\n`);
    }
    res.write('data: [DONE]\n\n');
    res.end();
    return;
  }

  // Non-streaming fast response
  if (geminiClient && process.env.GEMINI_API_KEY) {
    try {
      const contents = buildContents(trimmedMessage, history);
      const response = await geminiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          temperature: 0.7,
          topP: 0.95,
        },
      });

      const reply = response.text || '';
      if (reply) {
        res.json({ reply, source: 'gemini' });
        return;
      }
    } catch (geminiError: any) {
      console.warn('Gemini generateContent error, falling back to local engine:', geminiError?.message);
    }
  }

  // Fallback response
  const fallbackReply = getIntelligentChemistryFallback(trimmedMessage);
  res.json({
    reply: fallbackReply,
    source: 'offline-engine',
  });
});

// Configure Vite or Static files
async function startServer() {
  // Always serve public assets (like /favicon.svg)
  app.use(express.static(path.resolve(__dirname, 'public')));
  app.get('/favicon.ico', (_req, res) => {
    res.setHeader('Content-Type', 'image/svg+xml');
    res.sendFile(path.resolve(__dirname, 'public/favicon.svg'));
  });

  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🧪 LABORATORYA Chemistry Platform running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
