import React, { useState } from 'react';
import { storageService } from '../services/storageService';
import { SchoolClass, LabReport, Announcement } from '../types/chemistry';
import { EXPERIMENTS_DATA } from '../data/experimentsData';
import { 
  LayoutDashboard, Users, BookMarked, Bell, Plus, CheckCircle2, 
  Calendar, FileSpreadsheet, Star, Edit3, X, Save 
} from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  const [classes, setClasses] = useState<SchoolClass[]>(() => storageService.getClasses());
  const [reports, setReports] = useState<LabReport[]>(() => storageService.getLabReports());
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => storageService.getAnnouncements());

  const [activeTab, setActiveTab] = useState<'classes' | 'grading' | 'announcements'>('classes');

  // Grading modal state
  const [gradingReport, setGradingReport] = useState<LabReport | null>(null);
  const [gradeInput, setGradeInput] = useState<number>(5);
  const [feedbackInput, setFeedbackInput] = useState('');

  // New Class Modal
  const [showNewClassModal, setShowNewClassModal] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [newClassGrade, setNewClassGrade] = useState(8);
  const [newClassDeadline, setNewClassDeadline] = useState('2026-11-15');

  // New Announcement Modal
  const [showNewAnnouncementModal, setShowNewAnnouncementModal] = useState(false);
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnContent, setNewAnnContent] = useState('');
  const [newAnnImportant, setNewAnnImportant] = useState(false);

  const currentUser = storageService.getCurrentUser();

  const handleOpenGrading = (rep: LabReport) => {
    setGradingReport(rep);
    setGradeInput(rep.teacherGrade || 5);
    setFeedbackInput(rep.teacherFeedback || 'Juda yaxshi bajarilgan.');
  };

  const handleSaveGrade = () => {
    if (!gradingReport) return;
    const updated: LabReport = {
      ...gradingReport,
      teacherGrade: gradeInput,
      teacherFeedback: feedbackInput,
      status: 'graded',
    };
    storageService.saveLabReport(updated);
    setReports(storageService.getLabReports());
    setGradingReport(null);
  };

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim()) return;
    const newCls: SchoolClass = {
      id: `cls-${Date.now()}`,
      name: newClassName.trim(),
      grade: newClassGrade,
      teacherId: currentUser.id,
      teacherName: currentUser.name,
      studentCount: 25,
      averageScore: 85,
      assignedExperiments: [EXPERIMENTS_DATA[0].id],
      deadlineDate: newClassDeadline,
    };
    storageService.saveClass(newCls);
    setClasses(storageService.getClasses());
    setShowNewClassModal(false);
    setNewClassName('');
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnTitle.trim() || !newAnnContent.trim()) return;
    const newAnn: Announcement = {
      id: `ann-${Date.now()}`,
      title: newAnnTitle.trim(),
      content: newAnnContent.trim(),
      authorName: currentUser.name,
      authorRole: 'O‘qituvchi',
      date: new Date().toISOString().split('T')[0],
      isImportant: newAnnImportant,
    };
    storageService.saveAnnouncement(newAnn);
    setAnnouncements(storageService.getAnnouncements());
    setShowNewAnnouncementModal(false);
    setNewAnnTitle('');
    setNewAnnContent('');
  };

  const exportGradesCSV = () => {
    const rows = [
      ['O‘quvchi', 'Sinf', 'Tajriba', 'Sana', 'Baho', 'Taqriz'],
      ...reports.map((r) => [
        `"${r.studentName}"`,
        `"${r.studentGrade}"`,
        `"${r.experimentTitle}"`,
        r.date,
        r.teacherGrade ? r.teacherGrade.toString() : 'Tekshirilmagan',
        `"${r.teacherFeedback || ''}"`,
      ]),
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'kimyo_baholar_hisoboti.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-lg bg-emerald-500/10 text-emerald-400">
              <LayoutDashboard className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              O‘qituvchi Boshqaruv Paneli
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Sinflar, topshiriqlar, o‘quvchilar laboratoriya daftarlarini baholash va sinf tahlili
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportGradesCSV}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1.5"
            title="CSV formatida baholarni eksport qilish"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            CSV Eksport
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-xs">
        <button
          onClick={() => setActiveTab('classes')}
          className={`px-4 py-2 rounded-xl font-bold transition-colors flex items-center gap-2 ${
            activeTab === 'classes'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          Sinflar va Topshiriqlar ({classes.length})
        </button>
        <button
          onClick={() => setActiveTab('grading')}
          className={`px-4 py-2 rounded-xl font-bold transition-colors flex items-center gap-2 ${
            activeTab === 'grading'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <BookMarked className="w-4 h-4" />
          Hisobotlarni Baholash ({reports.length})
        </button>
        <button
          onClick={() => setActiveTab('announcements')}
          className={`px-4 py-2 rounded-xl font-bold transition-colors flex items-center gap-2 ${
            activeTab === 'announcements'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Bell className="w-4 h-4" />
          E’lonlar ({announcements.length})
        </button>
      </div>

      {/* TAB 1: CLASSES MANAGEMENT */}
      {activeTab === 'classes' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Biriktirilgan Sinflar</h3>
            <button
              onClick={() => setShowNewClassModal(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
            >
              <Plus className="w-4 h-4" />
              Yangi sinf ochish
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {classes.map((cls) => (
              <div
                key={cls.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {cls.grade}-sinf
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {cls.studentCount} o‘quvchi
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-white">{cls.name}</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Rahbar: <strong className="text-slate-200">{cls.teacherName}</strong>
                  </p>
                  <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">O‘rtacha ko‘rsatkich:</span>
                      <strong className="text-emerald-400 font-mono">{cls.averageScore}%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Topshiriq muddati:</span>
                      <span className="text-slate-300 font-mono">{cls.deadlineDate}</span>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400">
                  Biriktirilgan tajribalar: <strong className="text-cyan-400">{cls.assignedExperiments.length} ta</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: GRADING STUDENT LAB REPORTS */}
      {activeTab === 'grading' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Topshirilgan Laboratoriya Ishlari</h3>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-4">O‘quvchi</th>
                  <th className="p-4">Sinf</th>
                  <th className="p-4">Tajriba nomi</th>
                  <th className="p-4">Sana</th>
                  <th className="p-4">Baho</th>
                  <th className="p-4 text-right">Amal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {reports.map((rep) => (
                  <tr key={rep.id} className="hover:bg-slate-950/40">
                    <td className="p-4 font-bold text-white">{rep.studentName}</td>
                    <td className="p-4 font-mono text-cyan-400">{rep.studentGrade}</td>
                    <td className="p-4">{rep.experimentTitle}</td>
                    <td className="p-4 font-mono text-slate-400">{rep.date}</td>
                    <td className="p-4">
                      {rep.teacherGrade ? (
                        <span className="px-2.5 py-1 rounded-full font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                          {rep.teacherGrade} baho
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                          Baholanmagan
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleOpenGrading(rep)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 transition-colors"
                      >
                        Baholash / Taqriz
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ANNOUNCEMENTS */}
      {activeTab === 'announcements' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Sinf E’lonlari</h3>
            <button
              onClick={() => setShowNewAnnouncementModal(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
            >
              <Plus className="w-4 h-4" />
              Yangi e’lon berish
            </button>
          </div>

          <div className="space-y-4">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-white">{ann.title}</h4>
                    {ann.isImportant && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                        Muhim
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono text-slate-400">{ann.date}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{ann.content}</p>
                <div className="text-[11px] text-slate-500 pt-1">
                  Muallif: <strong className="text-slate-400">{ann.authorName}</strong> ({ann.authorRole})
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* GRADING MODAL */}
      {gradingReport && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          onClick={() => setGradingReport(null)}
        >
          <div
            className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">Hisobotni Baholash</h3>
              <button onClick={() => setGradingReport(null)} className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-slate-300 space-y-1">
              <div>O‘quvchi: <strong className="text-white">{gradingReport.studentName}</strong> ({gradingReport.studentGrade})</div>
              <div>Mavzu: <strong className="text-cyan-400">{gradingReport.experimentTitle}</strong></div>
              <div>Reaksiya: <span className="font-mono text-slate-300">{gradingReport.reactionEquation}</span></div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 max-h-36 overflow-y-auto whitespace-pre-line font-mono">
              <strong>O‘quvchi xulosasi:</strong>
              <br />
              {gradingReport.conclusion || 'Xulosa yo‘q'}
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1 font-semibold">Baho (1 dan 5 gacha):</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setGradeInput(b)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                      gradeInput === b
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg'
                        : 'bg-slate-950 text-slate-300 border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1 font-semibold">O‘qituvchi taqrizi va maslahati:</label>
              <textarea
                rows={3}
                value={feedbackInput}
                onChange={(e) => setFeedbackInput(e.target.value)}
                placeholder="O‘quvchiga yo‘l-yo‘riq yoki maqtov..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setGradingReport(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleSaveGrade}
                className="px-6 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25"
              >
                Bahoni tasdiqlash
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NEW CLASS MODAL */}
      {showNewClassModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          onClick={() => setShowNewClassModal(false)}
        >
          <form
            onSubmit={handleCreateClass}
            className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-6 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Yangi Sinf Yaratish</h3>
              <button type="button" onClick={() => setShowNewClassModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Sinf nomi (masalan: 9-B sinf):</label>
              <input
                type="text"
                required
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Sinf bosqichi:</label>
              <select
                value={newClassGrade}
                onChange={(e) => setNewClassGrade(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
              >
                {[7, 8, 9, 10, 11].map((g) => (
                  <option key={g} value={g}>{g}-sinf</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Topshiriq muddati:</label>
              <input
                type="date"
                required
                value={newClassDeadline}
                onChange={(e) => setNewClassDeadline(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setShowNewClassModal(false)} className="px-4 py-2 rounded-xl text-xs text-slate-400">
                Bekor qilish
              </button>
              <button type="submit" className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950">
                Sinfni yaratish
              </button>
            </div>
          </form>
        </div>
      )}

      {/* NEW ANNOUNCEMENT MODAL */}
      {showNewAnnouncementModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          onClick={() => setShowNewAnnouncementModal(false)}
        >
          <form
            onSubmit={handleCreateAnnouncement}
            className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-6 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Yangi E’lon Berish</h3>
              <button type="button" onClick={() => setShowNewAnnouncementModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">E’lon sarlavhasi:</label>
              <input
                type="text"
                required
                value={newAnnTitle}
                onChange={(e) => setNewAnnTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">E’lon matni:</label>
              <textarea
                rows={3}
                required
                value={newAnnContent}
                onChange={(e) => setNewAnnContent(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="importantChk"
                checked={newAnnImportant}
                onChange={(e) => setNewAnnImportant(e.target.checked)}
                className="rounded border-slate-700"
              />
              <label htmlFor="importantChk" className="text-xs text-slate-300">
                Muhim e’lon sifatida belgilash
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setShowNewAnnouncementModal(false)} className="px-4 py-2 rounded-xl text-xs text-slate-400">
                Bekor qilish
              </button>
              <button type="submit" className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950">
                E’lonni chop etish
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
