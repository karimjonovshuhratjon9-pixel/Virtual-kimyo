import React, { useState } from 'react';
import { Experiment, LabReport } from '../types/chemistry';
import { storageService } from '../services/storageService';
import { 
  Play, RotateCcw, ChevronRight, CheckCircle2, Flame, 
  FlaskConical, Sparkles, BookOpen, AlertTriangle, HelpCircle, 
  Thermometer, Check, FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  experiment: Experiment;
  onViewNotebook?: () => void;
}

export const LabSimulationWorkbench: React.FC<Props> = ({ experiment, onViewNotebook }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isHeating, setIsHeating] = useState(false);
  const [isStirring, setIsStirring] = useState(false);
  const [observationsHistory, setObservationsHistory] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [reportSaved, setReportSaved] = useState(false);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const currentStep = experiment.steps[currentStepIndex];
  const maxStep = experiment.steps.length;

  // Compute current visual state from steps performed
  const liquidColor = currentStep?.visualEffect?.liquidColor || 'rgba(224, 242, 254, 0.4)';
  const isBubbling = currentStep?.visualEffect?.bubbling || false;
  const precipitateColor = currentStep?.visualEffect?.precipitateColor;
  const flameColor = isHeating ? (currentStep?.visualEffect?.flameColor || '#f59e0b') : null;
  const gasSmoke = currentStep?.visualEffect?.smokeOrGas;
  const currentTemp = 20 + (currentStep?.visualEffect?.temperatureChange || 0) + (isHeating ? 45 : 0);

  const handleNextStep = () => {
    if (currentStep && !observationsHistory.includes(currentStep.observationUz)) {
      setObservationsHistory(prev => [...prev, currentStep.observationUz]);
    }

    if (currentStepIndex + 1 < maxStep) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setIsHeating(false);
    setIsStirring(false);
    setObservationsHistory([]);
    setIsFinished(false);
    setReportSaved(false);
    setSelectedAnswers({});
    setQuizSubmitted(false);
  };

  const handleSaveToNotebook = () => {
    const user = storageService.getCurrentUser();
    const newReport: LabReport = {
      id: `rep-${Date.now()}`,
      userId: user.id,
      studentName: user.name,
      studentGrade: user.schoolClass || `${experiment.grade}-sinf`,
      experimentId: experiment.id,
      experimentTitle: experiment.title,
      date: new Date().toISOString().split('T')[0],
      objective: experiment.objectiveUz,
      apparatusUsed: experiment.apparatus,
      observations: observationsHistory.join('\n\n'),
      reactionEquation: experiment.chemicalEquation,
      conclusion: experiment.conclusionUz,
      status: 'submitted'
    };

    storageService.saveLabReport(newReport);
    setReportSaved(true);
  };

  const handleSelectQuizAnswer = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleCheckQuiz = () => {
    setQuizSubmitted(true);
    let correctCount = 0;
    experiment.quizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) correctCount++;
    });

    // Update user stats
    const user = storageService.getCurrentUser();
    const pct = Math.round((correctCount / experiment.quizQuestions.length) * 100);
    user.quizScores[experiment.id] = Math.max(user.quizScores[experiment.id] || 0, pct);
    user.xp += correctCount * 25;
    if (pct >= 80 && !user.badges.includes("b4")) {
      user.badges.push("b4");
    }
    storageService.updateUser(user);
  };

  return (
    <div className="space-y-6">
      {/* Experiment Header & Safety Warning */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-sm">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                {experiment.grade}-sinf
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300">
                {experiment.difficulty}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                ⏱ {experiment.durationMinutes} daqiqa
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {experiment.title}
            </h2>
            <p className="text-sm text-cyan-200/80 mt-1">
              Mavzu: <span className="text-slate-200">{experiment.topic}</span>
            </p>
          </div>

          <button
            onClick={handleReset}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all flex items-center gap-2 border border-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Tajribani qayta boshlash
          </button>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/50 p-3.5 rounded-xl border border-slate-800/60">
          <strong className="text-cyan-400">Maqsad:</strong> {experiment.objectiveUz}
        </p>

        {/* Safety Warning Pill */}
        {experiment.safetyWarnings.length > 0 && (
          <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-3 text-xs text-amber-200/90">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-300 block mb-0.5">Xavfsizlik ogohlantirishi:</span>
              <ul className="list-disc list-inside space-y-0.5">
                {experiment.safetyWarnings.map((w, idx) => (
                  <li key={idx}>{w}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Main Interactive Lab Area: Reagents Shelf + Visual Workbench + Step-by-Step Guidance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Reagents Shelf (3 Cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-cyan-400" />
                Laboratoriya Reaktivlari
              </h3>
              <span className="text-[11px] font-mono text-cyan-400 font-semibold">
                {experiment.reagents.length} ta
              </span>
            </div>

            <div className="space-y-2.5">
              {experiment.reagents.map((reagent) => (
                <div
                  key={reagent.id}
                  className={`p-3 rounded-xl border transition-all text-xs ${
                    currentStep?.targetReagentId === reagent.id
                      ? 'bg-cyan-950/40 border-cyan-500 shadow-md shadow-cyan-500/10 ring-1 ring-cyan-500/40'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-100">{reagent.name}</span>
                    <span className="font-mono font-bold text-cyan-400 px-1.5 py-0.5 bg-slate-900 rounded border border-slate-800">
                      {reagent.formula}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span className={`w-2 h-2 rounded-full ${
                      reagent.hazardLevel === 'danger' ? 'bg-red-400' :
                      reagent.hazardLevel === 'warning' ? 'bg-amber-400' : 'bg-emerald-400'
                    }`} />
                    <span>{reagent.hazardNoteUz}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Apparatus Used */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg text-xs">
            <h4 className="font-bold text-slate-300 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Kerakli Jihozlar
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              {experiment.apparatus.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Center: Visual Workbench Canvas (6 Cols) */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-slate-200">Interaktiv Tajriba Stoli</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 font-mono text-cyan-300">
                <Thermometer className="w-4 h-4 text-rose-400" />
                {currentTemp}°C
              </div>
            </div>
          </div>

          {/* Visual Glassware Simulation Stage */}
          <div className="relative my-6 h-[340px] sm:h-[380px] bg-slate-950/80 rounded-2xl border border-slate-800/80 flex flex-col items-center justify-end p-6 overflow-hidden">
            {/* Background Measurement Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20 pointer-events-none" />

            {/* Rising Gas / Smoke Effect */}
            {(isBubbling || gasSmoke) && (
              <div className="absolute top-12 z-20 flex flex-col items-center pointer-events-none">
                <div className="steam w-16 h-16 rounded-full bg-cyan-400/20 blur-xl mb-1" />
                <span className="text-[11px] font-semibold text-cyan-300 bg-slate-950/80 px-2 py-0.5 rounded-full border border-cyan-500/30">
                  {gasSmoke || "Gaz ajralmoqda (↑)"}
                </span>
              </div>
            )}

            {/* Main Chemical Glass Beaker / Flask */}
            <div className="relative z-10 w-44 sm:w-52 h-64 sm:h-72 border-4 border-slate-600/60 rounded-b-3xl border-t-0 bg-white/5 backdrop-blur-xs flex flex-col justify-end p-3 shadow-inner overflow-hidden">
              
              {/* Measurement ticks on glassware */}
              <div className="absolute top-6 left-2 space-y-6 text-[9px] font-mono text-slate-400 select-none">
                <div className="flex items-center gap-1"><span className="w-3 h-0.5 bg-slate-500" /> 150ml</div>
                <div className="flex items-center gap-1"><span className="w-3 h-0.5 bg-slate-500" /> 100ml</div>
                <div className="flex items-center gap-1"><span className="w-3 h-0.5 bg-slate-500" /> 50ml</div>
              </div>

              {/* Chemical Liquid */}
              <div
                className="w-full rounded-b-2xl relative transition-all duration-700 ease-in-out flex flex-col justify-end overflow-hidden"
                style={{
                  height: currentStepIndex === 0 ? '40%' : '65%',
                  backgroundColor: liquidColor,
                  boxShadow: `0 0 25px ${liquidColor}`
                }}
              >
                {/* Surface Meniscus Ripple */}
                <div className="absolute top-0 inset-x-0 h-2 bg-white/20 rounded-full" />

                {/* Bubbles Simulation */}
                {isBubbling && (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="bubble absolute bottom-2 left-6 w-3 h-3 rounded-full bg-white/70" />
                    <div className="bubble absolute bottom-3 left-14 w-2 h-2 rounded-full bg-white/60 [animation-delay:0.3s]" />
                    <div className="bubble absolute bottom-1 right-8 w-3.5 h-3.5 rounded-full bg-white/80 [animation-delay:0.7s]" />
                    <div className="bubble absolute bottom-4 right-16 w-2 h-2 rounded-full bg-white/60 [animation-delay:1.1s]" />
                  </div>
                )}

                {/* Precipitate layer at bottom */}
                {precipitateColor && (
                  <div
                    className="w-full h-7 rounded-b-2xl transition-all duration-1000"
                    style={{ backgroundColor: precipitateColor }}
                  >
                    <span className="block text-center text-[10px] font-bold text-slate-800">
                      Cho‘kma (↓)
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Spirit Burner / Heater below glassware */}
            <div className="relative z-10 mt-2 flex flex-col items-center">
              {/* Flame */}
              {flameColor && (
                <div className="w-8 h-10 rounded-full bg-amber-400 blur-[2px] animate-pulse flex items-center justify-center -mb-2">
                  <div className="w-4 h-6 rounded-full bg-blue-400 blur-[1px]" />
                </div>
              )}
              {/* Burner Base */}
              <div className="w-28 h-5 bg-slate-800 rounded-t-lg border-t border-slate-700 flex items-center justify-center">
                <span className="text-[9px] font-mono text-slate-400">Gorelka</span>
              </div>
            </div>

            {/* Stand Base */}
            <div className="w-60 h-3 bg-slate-700 rounded-md mt-1 border-t border-slate-600 shadow-lg" />
          </div>

          {/* Workbench Quick Action Controls */}
          <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
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
                onClick={() => setIsStirring(!isStirring)}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all flex items-center gap-1.5 ${
                  isStirring
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Aralashtirish
              </button>
            </div>

            <div className="text-[11px] text-slate-400">
              Bosqich: <strong className="text-cyan-400">{currentStepIndex + 1}</strong> / {maxStep}
            </div>
          </div>
        </div>

        {/* Right Side: Step Instructions & Observation Log (3 Cols) */}
        <div className="lg:col-span-3 space-y-4">
          {/* Active Step Card */}
          <div className="bg-slate-900 border border-cyan-500/40 rounded-2xl p-4 shadow-xl ring-1 ring-cyan-500/20">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 fill-cyan-400" />
                {currentStepIndex + 1}-qadam
              </span>
              <span className="text-[11px] text-slate-400">
                {currentStep?.title}
              </span>
            </div>

            <p className="text-sm font-medium text-slate-100 leading-relaxed mb-4">
              {currentStep?.instructionUz}
            </p>

            <button
              onClick={handleNextStep}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 active:scale-95"
            >
              {currentStepIndex + 1 >= maxStep ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Tajribani yakunlash
                </>
              ) : (
                <>
                  Keyingi qadam
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Observations Panel */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg text-xs">
            <h4 className="font-bold text-slate-300 mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              Kuzatuvlar Daftari
            </h4>

            {observationsHistory.length === 0 ? (
              <p className="text-slate-500 italic py-2">
                Hozircha kuzatuvlar yo‘q. Qadamlarni bajaring.
              </p>
            ) : (
              <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                {observationsHistory.map((obs, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-slate-300 leading-relaxed">
                    <span className="text-[10px] font-bold text-cyan-400 block mb-0.5">
                      {idx + 1}-kuzatuv:
                    </span>
                    {obs}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Completion & Scientific Explanation Card (Visible when finished) */}
      {isFinished && (
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 border border-cyan-500/40 rounded-2xl p-6 shadow-2xl space-y-6 animate-in fade-in duration-500">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Tajriba muvaffaqiyatli yakunlandi!</h3>
                <p className="text-xs text-cyan-300">Ilmiy hisobot va xulosalar tayyorlandi.</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSaveToNotebook}
                disabled={reportSaved}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg ${
                  reportSaved
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/25'
                }`}
              >
                {reportSaved ? (
                  <>
                    <FileCheck className="w-4 h-4" />
                    Laboratoriya daftariga saqlandi!
                  </>
                ) : (
                  <>
                    <BookOpen className="w-4 h-4" />
                    Daftarga hisobot sifatida saqlash (+60 XP)
                  </>
                )}
              </button>

              {onViewNotebook && (
                <button
                  onClick={onViewNotebook}
                  className="px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  Daftarni ochish
                </button>
              )}
            </div>
          </div>

          {/* Chemical Equation & Scientific Explanation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                Reaksiya tenglamasi ({experiment.equationType})
              </span>
              <div className="text-lg sm:text-xl font-bold font-mono text-white py-2">
                {experiment.chemicalEquation}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mt-1">
                {experiment.scientificExplanationUz}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                Yakuniy Ilmiy Xulosa
              </span>
              <p className="text-xs text-slate-300 leading-relaxed py-2">
                {experiment.conclusionUz}
              </p>
            </div>
          </div>

          {/* Post-Lab Checkpoint Quiz */}
          <div className="p-5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                Mavzuni mustahkamlash savollari ({experiment.quizQuestions.length} ta)
              </h4>
              {quizSubmitted && (
                <span className="text-xs font-bold text-emerald-400">
                  Natija baholandi!
                </span>
              )}
            </div>

            <div className="space-y-4">
              {experiment.quizQuestions.map((q, qIdx) => {
                const userChoice = selectedAnswers[qIdx];
                return (
                  <div key={qIdx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
                    <p className="font-semibold text-slate-200">
                      {qIdx + 1}. {q.question}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = userChoice === optIdx;
                        const isCorrect = q.correctIndex === optIdx;
                        let btnStyle = 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700';

                        if (quizSubmitted) {
                          if (isCorrect) btnStyle = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50';
                          else if (isChosen && !isCorrect) btnStyle = 'bg-rose-500/20 text-rose-300 border-rose-500/50';
                        } else if (isChosen) {
                          btnStyle = 'bg-cyan-500/20 text-cyan-300 border-cyan-500';
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={quizSubmitted}
                            onClick={() => handleSelectQuizAnswer(qIdx, optIdx)}
                            className={`p-2.5 rounded-lg border text-left transition-all flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {quizSubmitted && isCorrect && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                          </button>
                        );
                      })}
                    </div>
                    {quizSubmitted && (
                      <p className="text-[11px] text-slate-400 italic pt-1">
                        Izoh: {q.explanation}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {!quizSubmitted && Object.keys(selectedAnswers).length === experiment.quizQuestions.length && (
              <button
                onClick={handleCheckQuiz}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-lg shadow-emerald-500/20"
              >
                Javoblarni tekshirish va ball olish
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
