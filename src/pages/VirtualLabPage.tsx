import React, { useState, useEffect } from 'react';
import { EXPERIMENTS_DATA } from '../data/experimentsData';
import { LabSimulationWorkbench } from '../components/LabSimulationWorkbench';
import { FreeLabSandbox } from '../components/FreeLabSandbox';
import { FlaskConical, Search, Sparkles, Beaker, CheckCircle2 } from 'lucide-react';

interface Props {
  initialExperimentId?: string;
  onNavigateToNotebook?: () => void;
}

export const VirtualLabPage: React.FC<Props> = ({ initialExperimentId, onNavigateToNotebook }) => {
  const [labMode, setLabMode] = useState<'sandbox' | 'guided'>('sandbox');
  const [selectedExperimentId, setSelectedExperimentId] = useState<string>(
    initialExperimentId || EXPERIMENTS_DATA[0].id
  );
  const [gradeFilter, setGradeFilter] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (initialExperimentId) {
      setSelectedExperimentId(initialExperimentId);
      setLabMode('guided');
    }
  }, [initialExperimentId]);

  const filteredExperiments = EXPERIMENTS_DATA.filter((exp) => {
    const matchesGrade = gradeFilter === 'all' || exp.grade === gradeFilter;
    const matchesQuery = 
      exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.chemicalEquation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGrade && matchesQuery;
  });

  const selectedExperiment = EXPERIMENTS_DATA.find((e) => e.id === selectedExperimentId) || EXPERIMENTS_DATA[0];

  return (
    <div className="space-y-8">
      {/* Top Header & Lab Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-xl bg-cyan-500/10 text-cyan-400">
              <FlaskConical className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Virtual Kimyo Laboratoriyasi
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Moddalarni erkin aralashtiring, yangi reaksiyalarni kashf eting yoki darslik tajribalarini bajaring
          </p>
        </div>

        {/* Big Lab Mode Switcher */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-2xl">
          <button
            onClick={() => setLabMode('sandbox')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              labMode === 'sandbox'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Erkin Laboratoriya (Moddalarni Aralashtirish)
          </button>

          <button
            onClick={() => setLabMode('guided')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              labMode === 'guided'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Beaker className="w-4 h-4" />
            Tayyor Tajribalar (10+ ta yo‘riqnoma)
          </button>
        </div>
      </div>

      {/* MODE 1: FREE LAB SANDBOX */}
      {labMode === 'sandbox' && (
        <FreeLabSandbox />
      )}

      {/* MODE 2: GUIDED PRESET EXPERIMENTS */}
      {labMode === 'guided' && (
        <div className="space-y-6">
          {/* Experiment Carousel / Selector Bar */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                <button
                  onClick={() => setGradeFilter('all')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
                    gradeFilter === 'all'
                      ? 'bg-cyan-500 text-slate-950'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  Barchasi ({EXPERIMENTS_DATA.length})
                </button>
                {[7, 8, 9, 10].map((grade) => (
                  <button
                    key={grade}
                    onClick={() => setGradeFilter(grade)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
                      gradeFilter === grade
                        ? 'bg-cyan-500 text-slate-950'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    {grade}-sinf
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-56">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Mavzuni qidirish..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Horizontal scrollable cards */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
              {filteredExperiments.map((exp) => {
                const isSelected = exp.id === selectedExperiment.id;
                return (
                  <button
                    key={exp.id}
                    onClick={() => setSelectedExperimentId(exp.id)}
                    className={`min-w-[260px] max-w-[280px] p-3.5 rounded-2xl text-left border transition-all shrink-0 ${
                      isSelected
                        ? 'bg-cyan-950/40 border-cyan-500 ring-1 ring-cyan-500/40 shadow-lg shadow-cyan-500/10'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-cyan-400'
                      }`}>
                        {exp.grade}-sinf
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        ⏱ {exp.durationMinutes} daq
                      </span>
                    </div>
                    <h4 className={`text-xs font-bold line-clamp-1 ${
                      isSelected ? 'text-white' : 'text-slate-200'
                    }`}>
                      {exp.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-1 font-mono">
                      {exp.chemicalEquation}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Workbench */}
          <LabSimulationWorkbench
            key={selectedExperiment.id}
            experiment={selectedExperiment}
            onViewNotebook={onNavigateToNotebook}
          />
        </div>
      )}
    </div>
  );
};
