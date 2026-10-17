import React, { useState } from 'react';
import { storageService } from '../services/storageService';
import { LabReport } from '../types/chemistry';
import { EXPERIMENTS_DATA } from '../data/experimentsData';
import { 
  BookMarked, Plus, Trash2, Edit3, Printer, CheckCircle2, 
  Clock, FileText, ChevronRight, X, Sparkles, Filter 
} from 'lucide-react';

export const LabNotebookPage: React.FC = () => {
  const [reports, setReports] = useState<LabReport[]>(() => storageService.getLabReports());
  const [activeReport, setActiveReport] = useState<LabReport | null>(reports[0] || null);
  const [isEditing, setIsEditing] = useState(false);
  const [filterExpId, setFilterExpId] = useState<string>('all');

  // Form edit fields
  const [formExperimentId, setFormExperimentId] = useState(EXPERIMENTS_DATA[0].id);
  const [formObjective, setFormObjective] = useState('');
  const [formApparatus, setFormApparatus] = useState('');
  const [formObservations, setFormObservations] = useState('');
  const [formEquation, setFormEquation] = useState('');
  const [formConclusion, setFormConclusion] = useState('');

  const currentUser = storageService.getCurrentUser();

  const handleOpenCreateNew = () => {
    const exp = EXPERIMENTS_DATA[0];
    setFormExperimentId(exp.id);
    setFormObjective(exp.objectiveUz);
    setFormApparatus(exp.apparatus.join(', '));
    setFormObservations('');
    setFormEquation(exp.chemicalEquation);
    setFormConclusion('');
    setIsEditing(true);
  };

  const handleSaveReport = () => {
    const exp = EXPERIMENTS_DATA.find((e) => e.id === formExperimentId) || EXPERIMENTS_DATA[0];
    const newReport: LabReport = {
      id: activeReport && isEditing && reports.some(r => r.id === activeReport.id) ? activeReport.id : `rep-${Date.now()}`,
      userId: currentUser.id,
      studentName: currentUser.name,
      studentGrade: currentUser.schoolClass || `${exp.grade}-sinf`,
      experimentId: exp.id,
      experimentTitle: exp.title,
      date: new Date().toISOString().split('T')[0],
      objective: formObjective,
      apparatusUsed: formApparatus.split(',').map((s) => s.trim()).filter(Boolean),
      observations: formObservations,
      reactionEquation: formEquation,
      conclusion: formConclusion,
      status: 'submitted',
    };

    storageService.saveLabReport(newReport);
    const updated = storageService.getLabReports();
    setReports(updated);
    setActiveReport(newReport);
    setIsEditing(false);
  };

  const handleDeleteReport = (id: string) => {
    if (confirm('Rostdan ham ushbu hisobotni o‘chirmoqchimisiz?')) {
      storageService.deleteLabReport(id);
      const updated = storageService.getLabReports();
      setReports(updated);
      setActiveReport(updated[0] || null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredReports = reports.filter((r) => {
    if (filterExpId === 'all') return true;
    return r.experimentId === filterExpId;
  });

  return (
    <div className="space-y-8 print:m-0 print:p-0">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 print:hidden">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-lg bg-teal-500/10 text-teal-400">
              <BookMarked className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Elektron Laboratoriya Daftari
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Bajarilgan barcha tajribalarning rasmiy protokollari, hisobotlari va o‘qituvchi baholari
          </p>
        </div>

        <button
          onClick={handleOpenCreateNew}
          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/25 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Yangi hisobot yozish
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Saved Reports List (4 Cols) */}
        <div className="lg:col-span-4 space-y-3 print:hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span className="font-bold uppercase tracking-wider text-slate-300">
              Mening Hisobotlarim ({filteredReports.length})
            </span>
          </div>

          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {filteredReports.length === 0 ? (
              <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-2xl text-xs text-slate-500">
                Hozircha saqlangan hisobotlar yo‘q. Virtual tajribani bajaring yoki yangi hisobot qo‘shing.
              </div>
            ) : (
              filteredReports.map((rep) => {
                const isSelected = activeReport?.id === rep.id;
                return (
                  <div
                    key={rep.id}
                    onClick={() => {
                      setActiveReport(rep);
                      setIsEditing(false);
                    }}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-cyan-950/40 border-cyan-500 ring-1 ring-cyan-500/30 shadow-lg'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono text-slate-400">
                        {rep.date}
                      </span>
                      {rep.teacherGrade ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                          Baho: {rep.teacherGrade}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-800 text-slate-400">
                          Tekshirilmoqda
                        </span>
                      )}
                    </div>

                    <h4 className={`text-sm font-bold line-clamp-1 ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                      {rep.experimentTitle}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-1 font-mono">
                      {rep.reactionEquation}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Active Report Detailed Printable Document or Editor (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {isEditing ? (
            /* CREATE / EDIT REPORT FORM */
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-lg font-bold text-white">Laboratoriya Hisobotini Tahrirlash</h3>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1 font-semibold">Tajriba mavzusi:</label>
                <select
                  value={formExperimentId}
                  onChange={(e) => {
                    const id = e.target.value;
                    setFormExperimentId(id);
                    const found = EXPERIMENTS_DATA.find((ex) => ex.id === id);
                    if (found) {
                      setFormObjective(found.objectiveUz);
                      setFormApparatus(found.apparatus.join(', '));
                      setFormEquation(found.chemicalEquation);
                    }
                  }}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-cyan-500"
                >
                  {EXPERIMENTS_DATA.map((exp) => (
                    <option key={exp.id} value={exp.id}>
                      {exp.grade}-sinf: {exp.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1 font-semibold">Tajriba maqsadi:</label>
                <textarea
                  rows={2}
                  value={formObjective}
                  onChange={(e) => setFormObjective(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1 font-semibold">Kerakli jihozlar (vergul bilan):</label>
                <input
                  type="text"
                  value={formApparatus}
                  onChange={(e) => setFormApparatus(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1 font-semibold">Kuzatuvlar va jarayon:</label>
                <textarea
                  rows={3}
                  value={formObservations}
                  onChange={(e) => setFormObservations(e.target.value)}
                  placeholder="Tajribada nimalar sodir bo‘ldi? Rang o‘zgarishi, gaz yoki cho‘kma..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1 font-semibold">Kimyoviy reaksiya tenglamasi:</label>
                <input
                  type="text"
                  value={formEquation}
                  onChange={(e) => setFormEquation(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-cyan-300 outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1 font-semibold">Yakuniy ilmiy xulosa:</label>
                <textarea
                  rows={2}
                  value={formConclusion}
                  onChange={(e) => setFormConclusion(e.target.value)}
                  placeholder="Xulosa qiling..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  Bekor qilish
                </button>
                <button
                  onClick={handleSaveReport}
                  className="px-6 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/25"
                >
                  Hisobotni saqlash
                </button>
              </div>
            </div>
          ) : activeReport ? (
            /* PRINTABLE LAB NOTEBOOK REPORT PREVIEW */
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 print:bg-white print:text-black print:border-none print:shadow-none print:p-0">
              
              {/* Document Header Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 print:hidden">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    ID: {activeReport.id}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Sana: {activeReport.date}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrint}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1.5"
                    title="Chop etish yoki PDF sifatida saqlash"
                  >
                    <Printer className="w-3.5 h-3.5 text-cyan-400" />
                    Chop etish / PDF
                  </button>
                  <button
                    onClick={() => {
                      setFormExperimentId(activeReport.experimentId);
                      setFormObjective(activeReport.objective);
                      setFormApparatus(activeReport.apparatusUsed.join(', '));
                      setFormObservations(activeReport.observations);
                      setFormEquation(activeReport.reactionEquation);
                      setFormConclusion(activeReport.conclusion);
                      setIsEditing(true);
                    }}
                    className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
                    title="Tahrirlash"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteReport(activeReport.id)}
                    className="p-1.5 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400"
                    title="O‘chirish"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Official Lab Report Formal Layout */}
              <div className="text-center space-y-2 pb-4 border-b border-slate-800">
                <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 print:text-slate-600">
                  Umumta’lim Maktabi — Kimyo Fani Bo‘yicha
                </h2>
                <h3 className="text-2xl font-black text-white print:text-black">
                  LABORATORIYA ISHI HISOBOTI
                </h3>
                <p className="text-base font-bold text-cyan-300 print:text-black">
                  “{activeReport.experimentTitle}”
                </p>
                <div className="text-xs text-slate-400 print:text-slate-600 flex justify-center gap-6 pt-1">
                  <span>Bajaruvchi: <strong className="text-white print:text-black">{activeReport.studentName}</strong></span>
                  <span>Sinf: <strong className="text-white print:text-black">{activeReport.studentGrade}</strong></span>
                  <span>Sana: <strong className="text-white print:text-black">{activeReport.date}</strong></span>
                </div>
              </div>

              {/* Sections */}
              <div className="space-y-4 text-xs leading-relaxed text-slate-300 print:text-black">
                <div>
                  <h4 className="font-bold text-white print:text-black uppercase tracking-wider text-[11px] mb-1">
                    1. Ishning Maqsadi:
                  </h4>
                  <p className="bg-slate-950/60 print:bg-slate-100 p-3 rounded-xl border border-slate-800 print:border-slate-300">
                    {activeReport.objective}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-white print:text-black uppercase tracking-wider text-[11px] mb-1">
                    2. Kerakli Jihozlar va Reaktivlar:
                  </h4>
                  <p className="bg-slate-950/60 print:bg-slate-100 p-3 rounded-xl border border-slate-800 print:border-slate-300">
                    {activeReport.apparatusUsed.join(', ')}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-white print:text-black uppercase tracking-wider text-[11px] mb-1">
                    3. Bajarilgan Bosqichlar va Kuzatishlar:
                  </h4>
                  <div className="bg-slate-950/60 print:bg-slate-100 p-3.5 rounded-xl border border-slate-800 print:border-slate-300 whitespace-pre-line font-mono text-[11px]">
                    {activeReport.observations || 'Kuzatishlar qayd etilmagan.'}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-white print:text-black uppercase tracking-wider text-[11px] mb-1">
                    4. Kimyoviy Reaksiya Tenglamasi:
                  </h4>
                  <div className="p-3 bg-slate-950 print:bg-slate-100 rounded-xl border border-slate-800 print:border-slate-300 font-mono text-sm font-bold text-cyan-300 print:text-black">
                    {activeReport.reactionEquation}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-white print:text-black uppercase tracking-wider text-[11px] mb-1">
                    5. Yakuniy Ilmiy Xulosa:
                  </h4>
                  <p className="bg-slate-950/60 print:bg-slate-100 p-3 rounded-xl border border-slate-800 print:border-slate-300">
                    {activeReport.conclusion || 'Xulosa yozilmagan.'}
                  </p>
                </div>

                {/* Teacher Grade and Evaluation */}
                {activeReport.teacherGrade && (
                  <div className="mt-6 p-4 rounded-2xl bg-emerald-950/30 print:bg-slate-50 border border-emerald-500/40 print:border-slate-300 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 print:text-slate-700 block">
                        O‘qituvchi Bahosi va Taqrizi:
                      </span>
                      <p className="text-xs text-slate-200 print:text-black italic mt-1">
                        "{activeReport.teacherFeedback || 'Taqriz berilmagan'}"
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-black text-emerald-400 print:text-black font-mono">
                        {activeReport.teacherGrade}
                      </span>
                      <span className="text-[10px] text-slate-400 block">Baho</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-16 text-center bg-slate-900 border border-slate-800 rounded-3xl text-slate-500 text-sm">
              Chap tarafdan hisobotni tanlang yoki yangi hisobot yarating.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
