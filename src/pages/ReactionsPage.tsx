import React, { useState } from 'react';
import { REACTIONS_DATA } from '../data/reactionsData';
import { ChemicalReaction } from '../types/chemistry';
import { Scale, CheckCircle2, AlertCircle, Sparkles, HelpCircle, ArrowRight, RotateCcw, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { storageService } from '../services/storageService';

export const ReactionsPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [activeTrainerReaction, setActiveTrainerReaction] = useState<ChemicalReaction>(REACTIONS_DATA[0]);

  // Trainer state: coefficients mapping
  const [reactantCoefs, setReactantCoefs] = useState<number[]>(
    () => activeTrainerReaction.balancedEquationChallenge?.reactants.map(() => 1) || [1]
  );
  const [productCoefs, setProductCoefs] = useState<number[]>(
    () => activeTrainerReaction.balancedEquationChallenge?.products.map(() => 1) || [1]
  );
  const [trainerSolved, setTrainerSolved] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const reactionTypes = [
    { id: 'all', label: 'Barchasi' },
    { id: 'Birikish', label: 'Birikish' },
    { id: 'Ajralish', label: 'Ajralish' },
    { id: 'O‘rin olish', label: 'O‘rin olish' },
    { id: 'Almashinish', label: 'Almashinish' },
    { id: 'Neytrallanish', label: 'Neytrallanish' },
    { id: 'Oksidlanish-qaytarilish', label: 'Redoks' },
    { id: 'Cho‘kma', label: 'Cho‘kma' },
    { id: 'Gaz ajralishi', label: 'Gaz ajralishi' },
  ];

  const filteredReactions = REACTIONS_DATA.filter((r) => {
    if (selectedType === 'all') return true;
    return r.type === selectedType;
  });

  const selectReactionForTrainer = (rx: ChemicalReaction) => {
    if (!rx.balancedEquationChallenge) return;
    setActiveTrainerReaction(rx);
    setReactantCoefs(rx.balancedEquationChallenge.reactants.map(() => 1));
    setProductCoefs(rx.balancedEquationChallenge.products.map(() => 1));
    setTrainerSolved(false);
    setShowHint(false);
  };

  const handleAdjustReactant = (idx: number, delta: number) => {
    setReactantCoefs((prev) => {
      const copy = [...prev];
      copy[idx] = Math.max(1, Math.min(10, copy[idx] + delta));
      return copy;
    });
  };

  const handleAdjustProduct = (idx: number, delta: number) => {
    setProductCoefs((prev) => {
      const copy = [...prev];
      copy[idx] = Math.max(1, Math.min(10, copy[idx] + delta));
      return copy;
    });
  };

  const checkBalance = () => {
    const challenge = activeTrainerReaction.balancedEquationChallenge;
    if (!challenge) return;

    let isCorrect = true;
    challenge.reactants.forEach((r, idx) => {
      if (reactantCoefs[idx] !== r.correctCoef) isCorrect = false;
    });
    challenge.products.forEach((p, idx) => {
      if (productCoefs[idx] !== p.correctCoef) isCorrect = false;
    });

    if (isCorrect) {
      setTrainerSolved(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
      const user = storageService.getCurrentUser();
      user.xp += 30;
      if (!user.badges.includes('b3')) user.badges.push('b3');
      storageService.updateUser(user);
    } else {
      setTrainerSolved(false);
      alert('Koeffitsiyentlar hali teng emas. Atomlar sonini diqqat bilan tekshiring yoki maslahatni oching.');
    }
  };

  const challenge = activeTrainerReaction.balancedEquationChallenge;

  return (
    <div className="space-y-12">
      {/* Top Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1 rounded-lg bg-amber-500/10 text-amber-400">
            <Scale className="w-5 h-5" />
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Kimyoviy Reaksiyalar va Tenglamalar
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          Reaksiyalar turlari, sharoitlar va interaktiv koeffitsiyentlarni tenglashtirish trenajyori
        </p>
      </div>

      {/* INTERACTIVE EQUATION BALANCING TRAINER SECTION */}
      {challenge && (
        <section className="bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/30 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                Interaktiv Trenajyor
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Tenglamani tenglashtirish: {activeTrainerReaction.name}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowHint(!showHint)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1.5"
              >
                <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                {showHint ? 'Maslahatni yopish' : 'Maslahat olish'}
              </button>
            </div>
          </div>

          {/* Interactive balancing equation equation row */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-lg sm:text-2xl font-mono font-bold">
            
            {/* Reactants controls */}
            {challenge.reactants.map((r, idx) => (
              <React.Fragment key={`r-${idx}`}>
                {idx > 0 && <span className="text-slate-500 font-sans">+</span>}
                <div className="flex items-center gap-2 bg-slate-900 px-3 py-2 rounded-xl border border-slate-800 shadow-inner">
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => handleAdjustReactant(idx, 1)}
                      className="text-xs px-2 py-0.5 rounded bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-300"
                    >
                      ▲
                    </button>
                    <span className="text-cyan-400 font-black text-xl py-0.5">
                      {reactantCoefs[idx]}
                    </span>
                    <button
                      onClick={() => handleAdjustReactant(idx, -1)}
                      className="text-xs px-2 py-0.5 rounded bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-300"
                    >
                      ▼
                    </button>
                  </div>
                  <span className="text-white text-xl sm:text-2xl">{r.formula}</span>
                </div>
              </React.Fragment>
            ))}

            {/* Reaction Arrow */}
            <span className="text-cyan-400 font-sans px-2 text-2xl font-black">→</span>

            {/* Products controls */}
            {challenge.products.map((p, idx) => (
              <React.Fragment key={`p-${idx}`}>
                {idx > 0 && <span className="text-slate-500 font-sans">+</span>}
                <div className="flex items-center gap-2 bg-slate-900 px-3 py-2 rounded-xl border border-slate-800 shadow-inner">
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => handleAdjustProduct(idx, 1)}
                      className="text-xs px-2 py-0.5 rounded bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-300"
                    >
                      ▲
                    </button>
                    <span className="text-emerald-400 font-black text-xl py-0.5">
                      {productCoefs[idx]}
                    </span>
                    <button
                      onClick={() => handleAdjustProduct(idx, -1)}
                      className="text-xs px-2 py-0.5 rounded bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-300"
                    >
                      ▼
                    </button>
                  </div>
                  <span className="text-white text-xl sm:text-2xl">{p.formula}</span>
                </div>
              </React.Fragment>
            ))}
          </div>

          {/* Hint Dropdown */}
          {showHint && (
            <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-200">
              💡 <strong>Maslahat:</strong> {challenge.hint}
            </div>
          )}

          {/* Check and Status */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div>
              {trainerSolved ? (
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  Barakalla! Tenglama to‘g‘ri tenglashtirildi (+30 XP)!
                </div>
              ) : (
                <span className="text-xs text-slate-400">
                  Koeffitsiyentlarni o‘zgartiring va tekshiring.
                </span>
              )}
            </div>

            <button
              onClick={checkBalance}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all shadow-lg shadow-cyan-500/25 active:scale-95"
            >
              Tenglamani tekshirish
            </button>
          </div>
        </section>
      )}

      {/* REACTIONS LIBRARY SECTION */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-white">Reaksiyalar Kutubxonasi</h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Maktab kimyosining barcha asosiy reaksiyalari turlari bo‘yicha
            </p>
          </div>

          {/* Reaction Type Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1">
            {reactionTypes.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-semibold transition-colors ${
                  selectedType === t.id
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Reactions Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredReactions.map((rx) => (
            <div
              key={rx.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between hover:border-slate-700 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    {rx.type}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {rx.grade}-sinf
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white">{rx.name}</h3>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-sm sm:text-base font-bold text-cyan-300">
                  {rx.equation}
                </div>

                <div className="text-xs space-y-1.5 text-slate-300">
                  <p>
                    <strong className="text-slate-400">Sharoit:</strong> {rx.conditions}
                  </p>
                  <p>
                    <strong className="text-slate-400">Kuzatuv:</strong> {rx.observation}
                  </p>
                  <p className="text-slate-400 leading-relaxed text-[11px] pt-1">
                    {rx.explanation}
                  </p>
                </div>
              </div>

              {rx.balancedEquationChallenge && (
                <button
                  onClick={() => {
                    selectReactionForTrainer(rx);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="mt-4 w-full py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 transition-all flex items-center justify-center gap-1.5"
                >
                  Trenajyorda tenglashtirish
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
