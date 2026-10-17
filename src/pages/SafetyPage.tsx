import React, { useState } from 'react';
import { SAFETY_RULES, HAZARD_SYMBOLS } from '../data/safetyData';
import { 
  ShieldAlert, AlertTriangle, Flame, HeartPulse, CheckCircle2, 
  XCircle, Bomb, Skull, Sparkles, Check, HelpCircle 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { storageService } from '../services/storageService';

export const SafetyPage: React.FC = () => {
  // Safety Quiz state
  const safetyQuestions = [
    {
      q: "Konsentrlangan kislotani suv bilan suyultirishda qaysi harakat TO‘G‘RI hisoblanadi?",
      opts: [
        "Suvni kislota idishiga tezda quyish",
        "Kislotani suvga ingichka oqimda va aralashtirib quyish",
        "Ikkalasini birdaniga aralashtirish",
        "Kislotani avval qizdirib keyin suv qo‘shish"
      ],
      correct: 1,
      exp: "Suvni kislotaga quyganda kislota portlab yuzga sachraydi! Oltin qoida: kislota suvga ingichka oqimda quyiladi."
    },
    {
      q: "Teriga kuchli kislota sachrab tushganda birinchi yordam nimadan iborat?",
      opts: [
        "Ko‘p miqdorda oqar suv bilan yuvish, so‘ng 2% li soda eritmasi bilan zararsizlantirish",
        "Spirt bilan artish",
        "Darhol yog‘ surtish",
        "Quruq sochiq bilan qattiq ishqalash"
      ],
      correct: 0,
      exp: "Zararlangan joy kamida 10-15 daqiqa sovuq suvda yuviladi va kislota qoldig‘i 2% li ichimlik sodasi (NaHCO₃) eritmasida neytrallanadi."
    },
    {
      q: "GHS qora bosh suyagi va suyaklar (GHS06) belgisi qanday xavfni bildiradi?",
      opts: [
        "Tez yonuvchan modda",
        "O‘tkir zaharli modda",
        "Atrof-muhit uchun zararsiz",
        "Radioaktiv modda"
      ],
      correct: 1,
      exp: "Ushbu xalqaro belgi o‘ta o‘tkir zaharli, kam miqdorda ham inson hayotiga xavf tug‘diruvchi reaktivlarni bildiradi."
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleCheckQuiz = () => {
    setQuizSubmitted(true);
    let correct = 0;
    safetyQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) correct++;
    });

    if (correct === safetyQuestions.length) {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      const user = storageService.getCurrentUser();
      user.xp += 40;
      storageService.updateUser(user);
    }
  };

  return (
    <div className="space-y-12">
      {/* Top Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1 rounded-lg bg-rose-500/10 text-rose-400">
            <ShieldAlert className="w-5 h-5" />
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Kimyo Laboratoriyasi Xavfsizlik Qoidalari
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          Shaxsiy himoya vositalari, xalqaro GHS xavflilik belgilari va favqulodda holatlarda birinchi yordam
        </p>
      </div>

      {/* Golden Chemical Rule Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-rose-950/60 via-slate-900 to-amber-950/40 border border-rose-500/40 shadow-2xl flex flex-col sm:flex-row items-center gap-6">
        <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
            Laboratoriyaning Bosh Oltin Qoidasi!
          </span>
          <h3 className="text-lg sm:text-xl font-black text-white">
            “HECH QACHON SUVNI KISLOTAGA QUYMANG! DOIMO KISLOTA SUVGA QUYILADI!”
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Kislota suv bilan aralashganda kuchli issiqlik ajraladi. Agar suv kislotaga quyilsa, suv zumda qaynaydi va kislota sachrab kuyish hosil qiladi.
          </p>
        </div>
      </div>

      {/* Safety Rules Accordion / Cards */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-white">Asosiy Xavfsizlik Yo‘riqnomalari</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SAFETY_RULES.map((rule) => (
            <div
              key={rule.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                    {rule.category}
                  </span>
                  <h3 className="text-base font-bold text-white">{rule.title}</h3>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {rule.descriptionUz}
              </p>

              {/* Do List */}
              <div className="space-y-1.5 text-xs">
                <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Bajaring:
                </span>
                <ul className="space-y-1 text-slate-300">
                  {rule.doList.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-slate-950/60 p-2 rounded-xl border border-slate-800/80">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Don't List */}
              <div className="space-y-1.5 text-xs">
                <span className="text-[11px] font-bold text-rose-400 flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" /> Qat’iyan man etiladi:
                </span>
                <ul className="space-y-1 text-slate-300">
                  {rule.dontList.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-rose-950/20 p-2 rounded-xl border border-rose-500/20">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GHS Hazard Pictograms */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white">
            GHS — Xalqaro Kimyoviy Xavflilik Belgilari
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Har bir laboratoriya idishi va reagent yorlig‘ida bo‘lishi shart bo‘lgan belgilar
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {HAZARD_SYMBOLS.map((sym) => (
            <div
              key={sym.code}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold border ${sym.color}`}>
                    {sym.code}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {sym.hazardType}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">{sym.nameUz}</h4>
                <p className="text-xs text-slate-300 leading-relaxed mt-2">
                  {sym.descriptionUz}
                </p>
              </div>

              <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 text-[11px] text-amber-200">
                <strong className="block text-amber-400 mb-0.5">Ehtiyot choralari:</strong>
                {sym.precautionsUz}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Safety Quiz */}
      <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-cyan-400" />
              Xavfsizlik Bo‘yicha Tezkor Sinov
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Laboratoriya ruxsatnomasini olish uchun savollarga to‘g‘ri javob bering
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {safetyQuestions.map((q, idx) => {
            const userChoice = selectedAnswers[idx];
            return (
              <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-3">
                <p className="font-semibold text-slate-100 text-sm">
                  {idx + 1}. {q.q}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.opts.map((opt, optIdx) => {
                    const isChosen = userChoice === optIdx;
                    const isCorrect = q.correct === optIdx;
                    let style = 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800';

                    if (quizSubmitted) {
                      if (isCorrect) style = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50';
                      else if (isChosen && !isCorrect) style = 'bg-rose-500/20 text-rose-300 border-rose-500/50';
                    } else if (isChosen) {
                      style = 'bg-cyan-500/20 text-cyan-300 border-cyan-500';
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={quizSubmitted}
                        onClick={() => setSelectedAnswers(prev => ({ ...prev, [idx]: optIdx }))}
                        className={`p-3 rounded-xl border text-left transition-all ${style}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {quizSubmitted && (
                  <p className="text-[11px] text-slate-400 italic pt-1">
                    Izoh: {q.exp}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {!quizSubmitted && Object.keys(selectedAnswers).length === safetyQuestions.length && (
          <button
            onClick={handleCheckQuiz}
            className="w-full py-3 rounded-2xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all shadow-xl shadow-cyan-500/25"
          >
            Javoblarni tekshirish va xavfsizlik sertifikatini olish (+40 XP)
          </button>
        )}
      </section>
    </div>
  );
};
