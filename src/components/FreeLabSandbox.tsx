import React, { useState } from 'react';
import { FREE_REAGENTS, FreeReagent, evaluateMixedReagents, ReactionOutcome } from '../data/freeReactionsEngine';
import { storageService } from '../services/storageService';
import { 
  FlaskConical, Flame, RotateCcw, Sparkles, AlertTriangle, 
  CheckCircle2, Plus, X, Thermometer, Bomb, Info, ShieldAlert 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const FreeLabSandbox: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [beakerReagents, setBeakerReagents] = useState<FreeReagent[]>([]);
  const [outcome, setOutcome] = useState<ReactionOutcome | null>(null);
  const [isHeating, setIsHeating] = useState(false);
  const [isExploding, setIsExploding] = useState(false);

  const categories = [
    { id: 'all', label: 'Barchasi (30)' },
    { id: 'Kislotalar', label: 'Kislotalar' },
    { id: 'Ishqorlar va Asoslar', label: 'Ishqorlar va Asoslar' },
    { id: 'Tuzlar', label: 'Tuzlar' },
    { id: 'Metallar', label: 'Metallar' },
    { id: 'Indikatorlar', label: 'Indikatorlar' },
    { id: 'Boshqa moddalar', label: 'Boshqa moddalar' },
  ];

  const filteredReagents = FREE_REAGENTS.filter((r) => {
    if (selectedCategory === 'all') return true;
    return r.category === selectedCategory;
  });

  const handleAddReagent = (reagent: FreeReagent) => {
    if (beakerReagents.length >= 4) {
      alert('Stakanga bir vaqtning o‘zida ko‘pi bilan 4 ta modda qo‘shish mumkin!');
      return;
    }
    if (beakerReagents.some((r) => r.id === reagent.id)) {
      alert(`"${reagent.name}" stakanga allaqachon solingan!`);
      return;
    }
    setBeakerReagents((prev) => [...prev, reagent]);
    setOutcome(null);
    setIsExploding(false);
  };

  const handleRemoveReagent = (id: string) => {
    setBeakerReagents((prev) => prev.filter((r) => r.id !== id));
    setOutcome(null);
    setIsExploding(false);
  };

  const handleClearBeaker = () => {
    setBeakerReagents([]);
    setOutcome(null);
    setIsHeating(false);
    setIsExploding(false);
  };

  const handleMixAndReact = () => {
    if (beakerReagents.length < 2) {
      alert('Reaksiyani tekshirish uchun stakanga kamida 2 ta modda qo‘shing!');
      return;
    }

    const result = evaluateMixedReagents(beakerReagents.map((r) => r.id));
    setOutcome(result);

    if (result.isExplosion) {
      setIsExploding(true);
      // Trigger explosion audio/visual vibration effect
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 200]);
      }
    } else if (result.isSuccess) {
      setIsExploding(false);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      const user = storageService.getCurrentUser();
      user.xp += 50;
      storageService.updateUser(user);
    }
  };

  // Determine current visual state in beaker
  const liquidColor = outcome 
    ? outcome.visual.liquidColor 
    : beakerReagents.length > 0 
      ? beakerReagents[beakerReagents.length - 1].liquidColor 
      : 'rgba(224, 242, 254, 0.2)';

  const isBubbling = outcome?.visual.bubbling || false;
  const precipitateColor = outcome?.visual.precipitateColor;
  const flameColor = isHeating ? '#f59e0b' : outcome?.visual.flameColor;
  const currentTemp = 20 + (outcome?.visual.temperatureDelta || 0) + (isHeating ? 40 : 0);

  return (
    <div className={`space-y-6 transition-all ${isExploding ? 'animate-shake' : ''}`}>
      
      {/* Sandbox Sub-Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Erkin Kimyoviy Laboratoriya (Sandbox)
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Moddalarni Erkin Aralashtirish
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Javondan xohlagan moddalarni tanlang va stakanga soling. To‘g‘ri reaksiya bo‘lsa natija hosil bo‘ladi, noto‘g‘ri moddalar aralashtirilsa — <strong>kichik portlash sodir bo‘ladi!</strong>
          </p>
        </div>

        <button
          onClick={handleClearBeaker}
          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all flex items-center gap-2 border border-slate-700 shrink-0"
        >
          <RotateCcw className="w-4 h-4" />
          Stakanni tozalash
        </button>
      </div>

      {/* EXPLOSION ALERT BANNER IF EXPLODED */}
      {isExploding && outcome && (
        <div className="p-5 rounded-2xl bg-rose-950/80 border-2 border-rose-500 shadow-2xl flex flex-col sm:flex-row items-center gap-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0 text-3xl animate-bounce">
            💥
          </div>
          <div className="space-y-1 text-center sm:text-left flex-1">
            <h3 className="text-lg font-black text-white flex items-center justify-center sm:justify-start gap-2">
              <span>{outcome.name}</span>
            </h3>
            <p className="text-xs text-rose-200 font-medium">
              {outcome.description}
            </p>
            <div className="text-[11px] font-mono text-rose-300 pt-1">
              {outcome.equation}
            </div>
          </div>
          <button
            onClick={handleClearBeaker}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-500 hover:bg-rose-400 text-white shadow-lg shrink-0"
          >
            Stakanni tozalab, qayta urinish
          </button>
        </div>
      )}

      {/* Main Sandbox Layout: Reagents Shelf (Left) + Chemical Workbench & Beaker (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT: REAGENTS SHELF (7 COLS) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-cyan-400" />
                Laboratoriya Reaktivlar Javoni
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                {filteredReagents.length} ta modda
              </span>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-thin">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-semibold transition-colors ${
                    selectedCategory === c.id
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Reagents Grid (Click to add to beaker) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[520px] overflow-y-auto pr-1">
              {filteredReagents.map((r) => {
                const inBeaker = beakerReagents.some((b) => b.id === r.id);
                return (
                  <button
                    key={r.id}
                    onClick={() => handleAddReagent(r)}
                    className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between group ${
                      inBeaker
                        ? 'bg-cyan-950/40 border-cyan-500 ring-1 ring-cyan-500/40 shadow-sm'
                        : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700 hover:bg-slate-950'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono font-bold text-xs text-cyan-400 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                          {r.formula}
                        </span>
                        <span className={`w-2 h-2 rounded-full ${
                          r.hazard === 'Xavfli' ? 'bg-rose-500' :
                          r.hazard === 'Ehtiyot bo‘ling' ? 'bg-amber-500' : 'bg-emerald-500'
                        }`} />
                      </div>
                      <h4 className="text-xs font-bold text-slate-100 group-hover:text-cyan-300 line-clamp-1">
                        {r.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                        {r.state} • {r.category}
                      </p>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-semibold text-cyan-400">
                      <span>{inBeaker ? 'Stakanda ✓' : '+ Solish'}</span>
                      <Plus className="w-3 h-3 group-hover:scale-125 transition-transform" />
                    </div>
                  </button>
                );
              })}
            </div>

          </div>
        </div>

        {/* RIGHT: INTERACTIVE BEAKER WORKBENCH (5 COLS) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl flex flex-col justify-between space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-bold text-slate-200">Tajriba Stoli & Kolba</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-cyan-300">
                <Thermometer className="w-4 h-4 text-rose-400" />
                {currentTemp}°C
              </div>
            </div>

            {/* Currently Selected Reagents in Beaker */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Stakandagi Moddalar ({beakerReagents.length}/4):
              </span>
              
              {beakerReagents.length === 0 ? (
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-dashed border-slate-800 text-center text-xs text-slate-500">
                  Chap tarafdagi javondan moddalarni bosing va stakanga quying.
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {beakerReagents.map((r) => (
                    <div
                      key={r.id}
                      className="px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-700 text-xs font-semibold text-white flex items-center gap-1.5 shadow-sm"
                    >
                      <span className="font-mono text-cyan-400">{r.formula}</span>
                      <button
                        onClick={() => handleRemoveReagent(r.id)}
                        className="text-slate-400 hover:text-rose-400 p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Visual Glassware Simulation Stage */}
            <div className="relative h-[290px] sm:h-[320px] bg-slate-950/90 rounded-2xl border border-slate-800/80 flex flex-col items-center justify-end p-4 overflow-hidden">
              
              {/* Measurement grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-20 pointer-events-none" />

              {/* Rising Gas / Smoke or EXPLOSION PUFF */}
              {isExploding && (
                <div className="absolute top-6 z-30 flex flex-col items-center animate-bounce">
                  <div className="w-24 h-24 rounded-full bg-rose-500/40 blur-2xl animate-ping" />
                  <span className="text-xs font-black text-rose-300 bg-rose-950 px-3 py-1 rounded-full border border-rose-500">
                    💥 BOOM! PORTLASH!
                  </span>
                </div>
              )}

              {isBubbling && !isExploding && (
                <div className="absolute top-10 z-20 flex flex-col items-center">
                  <div className="steam w-14 h-14 rounded-full bg-cyan-400/20 blur-xl mb-1" />
                  <span className="text-[10px] font-semibold text-cyan-300 bg-slate-950/80 px-2 py-0.5 rounded-full border border-cyan-500/30">
                    {outcome?.visual.smokeText || "Gaz ajralmoqda (↑)"}
                  </span>
                </div>
              )}

              {/* Main Chemical Glass Beaker */}
              <div className={`relative z-10 w-40 sm:w-48 h-56 sm:h-64 border-4 ${
                isExploding ? 'border-rose-500 shadow-rose-500/50' : 'border-slate-500/60'
              } rounded-b-3xl border-t-0 bg-white/5 backdrop-blur-xs flex flex-col justify-end p-2.5 shadow-inner overflow-hidden transition-all`}>
                
                {/* Measurement ticks */}
                <div className="absolute top-4 left-2 space-y-4 text-[9px] font-mono text-slate-400 select-none">
                  <div>150ml</div>
                  <div>100ml</div>
                  <div>50ml</div>
                </div>

                {/* Liquid */}
                <div
                  className="w-full rounded-b-2xl relative transition-all duration-700 ease-in-out flex flex-col justify-end overflow-hidden"
                  style={{
                    height: beakerReagents.length === 0 ? '10%' : `${Math.min(80, 25 + beakerReagents.length * 18)}%`,
                    backgroundColor: liquidColor,
                    boxShadow: `0 0 20px ${liquidColor}`
                  }}
                >
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-white/20 rounded-full" />

                  {/* Bubbles Simulation */}
                  {isBubbling && (
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <div className="bubble absolute bottom-1 left-4 w-2.5 h-2.5 rounded-full bg-white/70" />
                      <div className="bubble absolute bottom-2 left-12 w-2 h-2 rounded-full bg-white/60 [animation-delay:0.3s]" />
                      <div className="bubble absolute bottom-3 right-6 w-3 h-3 rounded-full bg-white/80 [animation-delay:0.6s]" />
                    </div>
                  )}

                  {/* Precipitate layer */}
                  {precipitateColor && (
                    <div
                      className="w-full h-6 rounded-b-2xl transition-all duration-700"
                      style={{ backgroundColor: precipitateColor }}
                    >
                      <span className="block text-center text-[9px] font-bold text-slate-900">
                        Cho‘kma (↓)
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Burner */}
              <div className="relative z-10 mt-1 flex flex-col items-center">
                {flameColor && (
                  <div className="w-8 h-8 rounded-full bg-amber-400 blur-[2px] animate-pulse flex items-center justify-center -mb-2">
                    <div className="w-4 h-5 rounded-full bg-blue-400 blur-[1px]" />
                  </div>
                )}
                <div className="w-24 h-4 bg-slate-800 rounded-t-lg border-t border-slate-700 flex items-center justify-center">
                  <span className="text-[8px] font-mono text-slate-400">Gorelka</span>
                </div>
              </div>

              <div className="w-52 h-2.5 bg-slate-700 rounded-md mt-0.5 border-t border-slate-600" />
            </div>

            {/* Quick Workbench Controls & Mix Button */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <button
                  onClick={() => setIsHeating(!isHeating)}
                  className={`px-3 py-1.5 rounded-xl font-medium transition-all flex items-center gap-1.5 ${
                    isHeating
                      ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5" />
                  {isHeating ? "Gorelkani o‘chirish" : "Qizdirish (Olov)"}
                </button>

                <button
                  onClick={handleClearBeaker}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
                >
                  Tozalash
                </button>
              </div>

              <button
                onClick={handleMixAndReact}
                disabled={beakerReagents.length < 2}
                className="w-full py-3 rounded-2xl text-xs sm:text-sm font-black bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 transition-all shadow-xl shadow-cyan-500/25 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 fill-slate-950" />
                Aralashtirish (Reaksiyani boshlash)
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* REACTION OUTCOME CARD (SUCCESS REACTION) */}
      {outcome && outcome.isSuccess && (
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                To‘g‘ri Kimyoviy Reaksiya Amalga Oshdi (+50 XP)!
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {outcome.name}
              </h3>
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-base sm:text-lg font-bold text-cyan-300">
            {outcome.equation}
          </div>

          <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            {outcome.description}
          </p>
        </div>
      )}
    </div>
  );
};
