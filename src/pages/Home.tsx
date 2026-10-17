import React from 'react';
import { 
  FlaskConical, Atom, Sparkles, BookOpen, Scale, Box, 
  Calculator, Award, ShieldAlert, ArrowRight, CheckCircle2, 
  Flame, Zap, Compass, ChevronRight, Bot 
} from 'lucide-react';
import { User } from '../types/chemistry';
import { EXPERIMENTS_DATA } from '../data/experimentsData';
import { LESSONS_DATA } from '../data/lessonsData';
import { getAllElements } from '../data/elementsData';

interface Props {
  currentUser?: User;
  onNavigate: (page: string, param?: string) => void;
}

export const Home: React.FC<Props> = ({ onNavigate }) => {
  const elements = getAllElements();
  // Element of the day (based on current date)
  const todayElement = elements[10] || elements[0]; // Natriy (Na) or Hydrogen

  return (
    <div className="space-y-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-radial from-slate-900 via-slate-950 to-black border border-slate-800/80 p-6 sm:p-10 lg:p-14 shadow-2xl">
        {/* Glow ambient background circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text & Call to Action (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>O‘zbekistondagi 1-raqamli virtual kimyo platformasi</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Kimyoni <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">tajriba orqali</span> kashf et!
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              7–11-sinf o‘quvchilari uchun xavfsiz virtual reaksiyalar, 118 ta elementli interaktiv Mendeleyev jadvali, 3D fazoviy molekulalar va haqiqiy elektron laboratoriya daftari.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('virtual-lab')}
                className="px-6 py-3.5 rounded-2xl text-sm font-bold bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 transition-all shadow-xl shadow-cyan-500/25 flex items-center gap-2.5 active:scale-95"
              >
                <FlaskConical className="w-4 h-4 fill-slate-950" />
                Laboratoriyani boshlash
              </button>

              <button
                onClick={() => onNavigate('ai-assistant')}
                className="px-6 py-3.5 rounded-2xl text-sm font-bold bg-gradient-to-r from-cyan-950 to-teal-950 hover:from-cyan-900 hover:to-teal-900 text-cyan-300 border border-cyan-500/40 transition-all shadow-lg shadow-cyan-500/10 flex items-center gap-2 active:scale-95"
              >
                <Bot className="w-4 h-4 text-cyan-400" />
                AI Yordamchi bilan suhbat
              </button>

              <button
                onClick={() => onNavigate('lessons')}
                className="px-5 py-3.5 rounded-2xl text-sm font-bold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-all flex items-center gap-2 active:scale-95"
              >
                <BookOpen className="w-4 h-4 text-cyan-400" />
                Kimyoni o‘rganish
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>10+ Real Maktab Tajribalari</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>118 ta IUPAC Elementlar</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% Xavfsiz Simulyatsiya</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Stage (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="w-full h-80 sm:h-96 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-cyan-500/30 p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden lab-glow">
              
              {/* Glass background shimmer */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-[11px] font-mono text-cyan-300">
                <Flame className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                Faol Reaksiya Muhiti
              </div>

              {/* Visual simulated reaction glassware */}
              <div className="my-auto flex flex-col items-center">
                <div className="relative w-36 h-48 border-4 border-cyan-400/50 rounded-b-3xl bg-cyan-950/20 backdrop-blur-sm flex flex-col justify-end p-2 overflow-hidden shadow-2xl">
                  {/* Glowing fluid */}
                  <div className="w-full h-28 rounded-b-2xl bg-gradient-to-t from-cyan-500/80 to-teal-400/50 relative overflow-hidden">
                    <div className="bubble absolute bottom-2 left-4 w-3 h-3 rounded-full bg-white/70" />
                    <div className="bubble absolute bottom-4 right-5 w-2 h-2 rounded-full bg-white/60 [animation-delay:0.5s]" />
                  </div>
                </div>
                {/* Burner */}
                <div className="w-20 h-3 bg-slate-700 rounded-t mt-1" />
                <div className="w-32 h-2 bg-slate-800 rounded mt-0.5" />
              </div>

              {/* Floating equation pill */}
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-center font-mono text-xs font-bold text-cyan-300">
                2H₂O₂ —(MnO₂)→ 2H₂O + O₂↑
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* 3. ELEMENT OF THE DAY (Kun kimyoviy elementi) */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          <div className="md:col-span-3 flex justify-center">
            <div className="w-32 h-36 rounded-2xl bg-slate-950 border-2 border-cyan-500/40 p-3 flex flex-col justify-between shadow-2xl relative">
              <div className="flex justify-between items-start text-xs font-mono">
                <span className="font-bold text-cyan-400">{todayElement.number}</span>
                <span className="text-slate-400">{todayElement.atomicMass}</span>
              </div>
              <div className="text-center font-black text-4xl text-white font-mono">
                {todayElement.symbol}
              </div>
              <div className="text-center text-xs font-bold text-slate-300">
                {todayElement.name}
              </div>
            </div>
          </div>

          <div className="md:col-span-9 space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                Kun Elementi
              </span>
              <span className="text-xs text-slate-400">
                {todayElement.categoryNameUz} ({todayElement.phase})
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white">
              {todayElement.name} ({todayElement.latinName})
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              {todayElement.summaryUz}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="text-xs text-slate-400 font-medium">Qo‘llanilishi:</span>
              {todayElement.usesUz.map((use, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs">
                  {use}
                </span>
              ))}
              <button
                onClick={() => onNavigate('periodic-table', todayElement.symbol)}
                className="ml-auto text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                Jadvalda to‘liq ko‘rish
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MAIN SECTIONS GRID */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Asosiy Bo‘limlar
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Platformaning barcha interaktiv o‘quv va amaliy modullari
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              id: 'ai-assistant',
              title: 'Al-Kimyogar AI',
              desc: 'Hamma kimyo savollari, reaksiya tenglashtirish va masalalar bo‘yicha aqlli yordamchi',
              icon: Bot,
              color: 'text-cyan-300 bg-cyan-500/15 border-cyan-500/40 ring-1 ring-cyan-500/30',
              badge: 'Gemini 3.8 AI'
            },
            {
              id: 'virtual-lab',
              title: 'Virtual Laboratoriya',
              desc: 'Erkin moddalarni aralashtirish (portlash effekti bilan) va 10+ ta tayyor tajriba',
              icon: FlaskConical,
              color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
              badge: 'Erkin & Tayyor'
            },
            {
              id: 'periodic-table',
              title: 'Mendeleyev Jadvali',
              desc: '118 ta kimyoviy element, elektron konfiguratsiya va xossalar',
              icon: Atom,
              color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
              badge: '118 Element'
            },
            {
              id: 'molecules',
              title: '3D Molekulalar',
              desc: 'Fazoviy atomlar, bog‘ burchaklari va interaktiv aylantirish',
              icon: Box,
              color: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
              badge: 'WebGL 3D'
            },
            {
              id: 'reactions',
              title: 'Reaksiyalar & Balans',
              desc: 'Reaksiya turlari va tenglamalarni tenglashtirish trenajyori',
              icon: Scale,
              color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
              badge: 'Trenajyor'
            },
            {
              id: 'lessons',
              title: 'Kimyo Darsligi',
              desc: '7–11-sinf mavzulari, formulalar, misollar va tushuntirishlar',
              icon: BookOpen,
              color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
              badge: '7–11 Sinf'
            },
            {
              id: 'calculator',
              title: 'Kimyoviy Kalkulyator',
              desc: 'Molyar massa, modda miqdori, konsentratsiya va massa ulushi',
              icon: Calculator,
              color: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
              badge: 'Formula tahlili'
            },
            {
              id: 'lab-notebook',
              title: 'Laboratoriya Daftari',
              desc: 'Tajriba hisobotlarini saqlash, tahrirlash va chop etish',
              icon: Compass,
              color: 'text-teal-400 bg-teal-500/10 border-teal-500/30',
              badge: 'Elektron hisobot'
            },
            {
              id: 'safety',
              title: 'Xavfsizlik Qoidalari',
              desc: 'GHS xavflilik piktogrammalari, SHV va birinchi yordam',
              icon: ShieldAlert,
              color: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
              badge: 'GHS & SHV'
            },
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${item.color}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {item.badge}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed mt-1.5">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-cyan-400">
                <span>Ochish</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. POPULAR EXPERIMENTS QUICK ACCESS */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ommabop Virtual Tajribalar
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Maktab kimyosida eng ko‘p o‘rganiladigan reaksiyalar
            </p>
          </div>
          <button
            onClick={() => onNavigate('virtual-lab')}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            Barchasini ko‘rish
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {EXPERIMENTS_DATA.slice(0, 3).map((exp) => (
            <div
              key={exp.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-cyan-500/40 transition-all hover:shadow-xl group"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    {exp.grade}-sinf
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    ⏱ {exp.durationMinutes} daq
                  </span>
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {exp.title}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                  {exp.objectiveUz}
                </p>
                <div className="mt-3 p-2 rounded-lg bg-slate-950 font-mono text-[11px] text-cyan-300 border border-slate-800 truncate">
                  {exp.chemicalEquation}
                </div>
              </div>

              <button
                onClick={() => onNavigate('virtual-lab', exp.id)}
                className="mt-4 w-full py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 transition-all flex items-center justify-center gap-1.5"
              >
                Tajribani boshlash
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 6. DID YOU KNOW / INTERESTING FACTS */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-amber-400" />
          Bilasizmi? Qiziqarli Kimyoviy Faktlar
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <strong className="text-cyan-400 block mb-1">Eng og‘ir suyuqlik:</strong>
            Simob (Hg) shu qadar zichki (13.5 g/sm³), uning ustida hatto og‘ir po‘lat mix ham cho‘kmasdan suzib yuradi.
          </div>
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <strong className="text-emerald-400 block mb-1">Koinotdagi vodorod:</strong>
            Koinotdagi barcha atomlarning qariyb 75% qismini eng oddiy kimyoviy element — Vodorod (H) tashkil etadi.
          </div>
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <strong className="text-rose-400 block mb-1">Zar suvi (Aqua Regia):</strong>
            Oltin va platina hatto eng kuchli yakka kislotalarda erimaydi, faqat 1 hajm HNO₃ va 3 hajm HCl aralashmasida eriydi.
          </div>
        </div>
      </section>

    </div>
  );
};
