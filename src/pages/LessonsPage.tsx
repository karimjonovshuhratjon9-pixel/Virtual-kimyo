import React, { useState } from 'react';
import { LESSONS_DATA } from '../data/lessonsData';
import { LessonSection } from '../types/chemistry';
import { storageService } from '../services/storageService';
import { 
  BookOpen, CheckCircle2, ChevronRight, Sparkles, 
  FlaskConical, ArrowRight, HelpCircle, Check, Award 
} from 'lucide-react';

interface Props {
  initialLessonId?: string;
  onNavigateToLab?: (expId: string) => void;
}

export const LessonsPage: React.FC<Props> = ({ initialLessonId, onNavigateToLab }) => {
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>('all');
  const [selectedLessonId, setSelectedLessonId] = useState<string>(
    initialLessonId || LESSONS_DATA[0].id
  );
  const [activeQuizAnswers, setActiveQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const filteredLessons = LESSONS_DATA.filter((l) => {
    if (selectedGrade === 'all') return true;
    return l.grade === selectedGrade;
  });

  const activeLesson = LESSONS_DATA.find((l) => l.id === selectedLessonId) || LESSONS_DATA[0];

  const handleSelectLesson = (lesson: LessonSection) => {
    setSelectedLessonId(lesson.id);
    setActiveQuizAnswers({});
    setQuizSubmitted(false);
  };

  const handleMarkCompleted = () => {
    const user = storageService.getCurrentUser();
    if (!user.completedLessons.includes(activeLesson.id)) {
      user.completedLessons.push(activeLesson.id);
      user.xp += 40;
      storageService.updateUser(user);
    }
  };

  const currentUser = storageService.getCurrentUser();
  const isCompleted = currentUser.completedLessons.includes(activeLesson.id);

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-lg bg-indigo-500/10 text-indigo-400">
              <BookOpen className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Kimyo Darsligi (7–11-sinflar)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Davlat ta’lim standarti asosida nazariy bilimlar, formulalar, amaliy misollar va tekshiruv savollari
          </p>
        </div>

        {/* Grade Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          <button
            onClick={() => setSelectedGrade('all')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
              selectedGrade === 'all'
                ? 'bg-cyan-500 text-slate-950'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300'
            }`}
          >
            Barchasi
          </button>
          {[7, 8, 9, 10].map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGrade(g)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
                selectedGrade === g
                  ? 'bg-cyan-500 text-slate-950'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300'
              }`}
            >
              {g}-sinf
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Lessons List Catalog (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Mavzular Katalogi ({filteredLessons.length})
          </h3>

          <div className="space-y-2.5 max-h-[620px] overflow-y-auto pr-1">
            {filteredLessons.map((les) => {
              const isSelected = les.id === activeLesson.id;
              const isDone = currentUser.completedLessons.includes(les.id);
              return (
                <button
                  key={les.id}
                  onClick={() => handleSelectLesson(les)}
                  className={`w-full p-4 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-500 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/30'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-cyan-400">
                      {les.grade}-sinf
                    </span>
                    {isDone && (
                      <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        O‘qilgan
                      </span>
                    )}
                  </div>

                  <h4 className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                    {les.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-1">
                    {les.chapter}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Active Lesson Reader & Checkpoint (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* Header info */}
            <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                  {activeLesson.grade}-sinf | {activeLesson.chapter}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {activeLesson.title}
                </h2>
              </div>

              <button
                onClick={handleMarkCompleted}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  isCompleted
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/25'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                {isCompleted ? 'Mavzu o‘zlashtirildi' : 'O‘qildi deb belgilash (+40 XP)'}
              </button>
            </div>

            {/* Theory Text */}
            <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed whitespace-pre-line bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80">
              {activeLesson.content}
            </div>

            {/* Key Formulas */}
            {activeLesson.keyFormulas.length > 0 && (
              <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Muhim Formulalar
                </h4>
                <div className="space-y-1">
                  {activeLesson.keyFormulas.map((f, idx) => (
                    <div key={idx} className="font-mono text-sm font-bold text-white">
                      • {f}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Practical Examples */}
            {activeLesson.examples.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-200">
                  Misol va Yechim
                </h4>
                {activeLesson.examples.map((ex, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                    <p className="font-semibold text-slate-200">
                      <strong>Masala:</strong> {ex.problem}
                    </p>
                    <p className="text-cyan-300 bg-slate-900/80 p-3 rounded-xl border border-slate-800/80 leading-relaxed font-mono">
                      <strong>Yechish:</strong> {ex.solution}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Related Virtual Experiment Callout */}
            {activeLesson.relatedExperimentId && onNavigateToLab && (
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                    <FlaskConical className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">Ushbu mavzuga oid virtual tajriba mavjud!</h5>
                    <p className="text-[11px] text-slate-400">Laboratoriyada reaksiyani bevosita amalda bajaring.</p>
                  </div>
                </div>

                <button
                  onClick={() => onNavigateToLab(activeLesson.relatedExperimentId!)}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all flex items-center gap-1.5 shrink-0"
                >
                  Tajribaga o‘tish
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Mini-Quiz Checkpoint */}
            {activeLesson.checkpointQuestions.length > 0 && (
              <div className="pt-4 border-t border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-cyan-400" />
                  Mavzu bo‘yicha mini-test
                </h4>

                <div className="space-y-4">
                  {activeLesson.checkpointQuestions.map((q, qIdx) => {
                    const chosen = activeQuizAnswers[qIdx];
                    return (
                      <div key={qIdx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2.5">
                        <p className="font-semibold text-slate-100">
                          {qIdx + 1}. {q.question}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {q.options.map((opt, optIdx) => {
                            const isChosen = chosen === optIdx;
                            const isCorrect = q.correctAnswer === optIdx;
                            let btnStyle = 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800';

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
                                onClick={() => setActiveQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }))}
                                className={`p-2.5 rounded-xl border text-left transition-all ${btnStyle}`}
                              >
                                {opt}
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

                {!quizSubmitted && Object.keys(activeQuizAnswers).length === activeLesson.checkpointQuestions.length && (
                  <button
                    onClick={() => setQuizSubmitted(true)}
                    className="w-full py-2.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all"
                  >
                    Javoblarni tekshirish
                  </button>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};
