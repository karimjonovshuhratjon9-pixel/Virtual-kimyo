import React, { useState, useEffect } from 'react';
import { QUIZ_ITEMS, BADGES } from '../data/quizData';
import { QuizItem } from '../types/chemistry';
import { storageService } from '../services/storageService';
import { 
  Trophy, CheckCircle2, XCircle, RotateCcw, Timer, 
  HelpCircle, Sparkles, Award, ArrowRight, Check 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const QuizPage: React.FC = () => {
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isTimedMode, setIsTimedMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);

  // Quiz execution state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, any>>({});
  const [isFinished, setIsFinished] = useState(false);

  const filteredQuestions = QUIZ_ITEMS.filter((q) => {
    const matchGrade = selectedGrade === 'all' || q.grade === selectedGrade;
    const matchType = selectedType === 'all' || q.type === selectedType;
    return matchGrade && matchType;
  });

  const currentQuestion: QuizItem | undefined = filteredQuestions[currentIndex];

  useEffect(() => {
    let interval: any = null;
    if (timerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerRunning) {
      setTimerRunning(false);
      handleFinishQuiz();
    }
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft]);

  const handleStartTimedQuiz = () => {
    setIsTimedMode(true);
    setTimeLeft(60);
    setTimerRunning(true);
    setCurrentIndex(0);
    setUserAnswers({});
    setIsFinished(false);
  };

  const handleSelectOption = (optIndex: number) => {
    setUserAnswers((prev) => ({ ...prev, [currentIndex]: optIndex }));
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < filteredQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = () => {
    setTimerRunning(false);
    setIsFinished(true);

    // Calculate score
    let correct = 0;
    filteredQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswer) {
        correct++;
      }
    });

    const scorePct = Math.round((correct / filteredQuestions.length) * 100);
    const user = storageService.getCurrentUser();
    user.xp += correct * 20;

    if (scorePct >= 80) {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      if (!user.badges.includes('b4')) user.badges.push('b4');
    }
    storageService.updateUser(user);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setUserAnswers({});
    setIsFinished(false);
    setTimeLeft(60);
    setTimerRunning(isTimedMode);
  };

  // Calculate stats for finished state
  let totalCorrect = 0;
  if (isFinished) {
    filteredQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswer) totalCorrect++;
    });
  }
  const scorePercent = Math.round((totalCorrect / Math.max(1, filteredQuestions.length)) * 100);

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-lg bg-amber-500/10 text-amber-400">
              <Trophy className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Kimyoviy Test va Viktorinalar
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Bilimingizni sinang, natijalarni tahlil qiling va nishonlar (badges) yutib oling
          </p>
        </div>

        {/* Timed Mode Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (!timerRunning) handleStartTimedQuiz();
              else {
                setTimerRunning(false);
                setIsTimedMode(false);
              }
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
              isTimedMode
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-lg shadow-rose-500/20'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
            }`}
          >
            <Timer className="w-4 h-4 text-rose-400" />
            {isTimedMode ? `Vaqt: ${timeLeft}s` : 'Vaqtli Viktorina (60s)'}
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      {!isFinished && (
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-slate-400 font-medium">Sinf:</span>
            {['all', 7, 8, 9, 10].map((g) => (
              <button
                key={g}
                onClick={() => {
                  setSelectedGrade(g as any);
                  handleRestart();
                }}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                  selectedGrade === g
                    ? 'bg-cyan-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {g === 'all' ? 'Barchasi' : `${g}-sinf`}
              </button>
            ))}
          </div>

          <div className="text-slate-400 font-mono">
            Savol: <strong className="text-cyan-400">{currentIndex + 1}</strong> / {filteredQuestions.length}
          </div>
        </div>
      )}

      {/* Main Quiz Card */}
      {!isFinished ? (
        currentQuestion ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
                {currentQuestion.category}
              </span>
              <span className="text-slate-400 font-mono">
                {currentQuestion.grade}-sinf | {currentQuestion.difficulty}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
              {currentQuestion.question}
            </h3>

            {/* Options list */}
            <div className="space-y-3">
              {currentQuestion.options?.map((opt, optIdx) => {
                const isSelected = userAnswers[currentIndex] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full p-4 rounded-2xl text-left text-sm font-semibold border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-200 ring-1 ring-cyan-500/40 shadow-lg'
                        : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700 text-slate-200 hover:bg-slate-950'
                    }`}
                  >
                    <span>{opt}</span>
                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs ${
                      isSelected ? 'border-cyan-400 bg-cyan-500 text-slate-950 font-bold' : 'border-slate-700 text-slate-500'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={handleRestart}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                Qayta boshlash
              </button>

              <button
                onClick={handleNextQuestion}
                disabled={userAnswers[currentIndex] === undefined}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-cyan-500/25 active:scale-95"
              >
                {currentIndex + 1 >= filteredQuestions.length ? 'Yakunlash' : 'Keyingi savol'}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 text-slate-400 text-sm">
            Tanlangan mezon bo‘yicha testlar topilmadi.
          </div>
        )
      ) : (
        /* FINISHED RESULTS & EXPLANATION REPORT */
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8 max-w-3xl mx-auto animate-in fade-in">
          
          <div className="text-center space-y-3 pb-6 border-b border-slate-800">
            <div className="w-16 h-16 rounded-3xl bg-cyan-500/20 border border-cyan-500/40 mx-auto flex items-center justify-center text-cyan-400">
              <Trophy className="w-8 h-8" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Viktorina Yakunlandi!
            </h2>
            <div className="text-4xl font-black text-cyan-400 font-mono">
              {scorePercent}%
            </div>
            <p className="text-xs text-slate-400">
              Siz {filteredQuestions.length} ta savoldan {totalCorrect} tasiga to‘g‘ri javob berdingiz.
            </p>
          </div>

          {/* Question-by-Question Review with Explanations */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              Barcha Javoblar va Izohlar:
            </h3>

            <div className="space-y-3">
              {filteredQuestions.map((q, idx) => {
                const userChoice = userAnswers[idx];
                const isCorrect = userChoice === q.correctAnswer;

                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border text-xs space-y-2 ${
                      isCorrect
                        ? 'bg-emerald-950/20 border-emerald-500/40'
                        : 'bg-rose-950/20 border-rose-500/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-slate-200">
                        {idx + 1}. {q.question}
                      </p>
                      {isCorrect ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1 shrink-0">
                          <CheckCircle2 className="w-4 h-4" /> To‘g‘ri
                        </span>
                      ) : (
                        <span className="text-rose-400 font-bold flex items-center gap-1 shrink-0">
                          <XCircle className="w-4 h-4" /> Noto‘g‘ri
                        </span>
                      )}
                    </div>

                    <div className="pt-1 text-[11px] text-slate-400">
                      Sizning javobingiz: <strong className={isCorrect ? 'text-emerald-300' : 'text-rose-300'}>
                        {userChoice !== undefined && q.options ? q.options[userChoice] : 'Tanlanmadi'}
                      </strong>
                    </div>

                    <p className="p-2.5 rounded-xl bg-slate-950/80 text-slate-300 italic text-[11px] leading-relaxed">
                      💡 <strong>Ilmiy izoh:</strong> {q.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <button
              onClick={handleRestart}
              className="px-6 py-3 rounded-2xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all flex items-center gap-2 shadow-xl shadow-cyan-500/25"
            >
              <RotateCcw className="w-4 h-4" />
              Yana sinab ko‘rish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
