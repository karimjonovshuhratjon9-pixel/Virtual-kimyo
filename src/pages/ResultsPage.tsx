import React, { useState } from 'react';
import { storageService } from '../services/storageService';
import { BADGES } from '../data/quizData';
import { EXPERIMENTS_DATA } from '../data/experimentsData';
import { LESSONS_DATA } from '../data/lessonsData';
import { 
  Award, Trophy, Zap, CheckCircle2, FlaskConical, BookOpen, 
  Sparkles, Download, Printer, ShieldCheck 
} from 'lucide-react';

export const ResultsPage: React.FC = () => {
  const currentUser = storageService.getCurrentUser();
  const reports = storageService.getLabReports().filter(r => r.userId === currentUser.id);

  const completedLabsCount = currentUser.completedExperiments.length;
  const totalLabs = EXPERIMENTS_DATA.length;
  const completedLessonsCount = currentUser.completedLessons.length;
  const totalLessons = LESSONS_DATA.length;
  const overallPercent = Math.round(((completedLabsCount + completedLessonsCount) / (totalLabs + totalLessons)) * 100);

  const [showCertificate, setShowCertificate] = useState(false);
  const [certificateName, setCertificateName] = useState(currentUser.name || 'Yosh Kimyogar');

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-lg bg-amber-500/10 text-amber-400">
              <Award className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Mening Natijalarim va Yutuqlarim
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Shaxsiy o‘zlashtirish statistikasi, nishonlar va ta’lim sertifikati
          </p>
        </div>

        <button
          onClick={() => setShowCertificate(!showCertificate)}
          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/25 active:scale-95"
        >
          <Sparkles className="w-4 h-4" />
          {showCertificate ? 'Sertifikatni yopish' : 'Sertifikatni ko‘rish'}
        </button>
      </div>

      {/* CERTIFICATE MODAL/PREVIEW */}
      {showCertificate && (
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border-4 border-cyan-500/40 shadow-2xl relative overflow-hidden space-y-6 text-center animate-in zoom-in-95 print:bg-white print:text-black">
          <div className="flex justify-center mb-2">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center text-cyan-400">
              <Trophy className="w-8 h-8" />
            </div>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              LABORATORYA — Virtual Ta’lim Platformasi
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
              MALAKA SERTIFIKATI
            </h2>
          </div>

          <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            Ushbu sertifikat tasdiqlaydiki, umumiy o‘rta ta’lim maktabi o‘quvchisi
          </p>

          <div className="max-w-md mx-auto">
            <input
              type="text"
              value={certificateName}
              onChange={(e) => setCertificateName(e.target.value)}
              placeholder="Ism va Familiyangizni yozing..."
              className="w-full text-center text-2xl sm:text-3xl font-black text-cyan-400 bg-slate-950/80 border border-slate-700 rounded-2xl py-2 px-4 outline-none focus:border-cyan-500 font-serif print:border-none print:bg-transparent print:text-black"
            />
          </div>

          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            Kimyo fani bo‘yicha virtual laboratoriya tajribalarini muvaffaqiyatli bajardi va yuqori ilmiy natijaga erishdi.
          </p>

          <div className="flex justify-center items-center gap-8 pt-4 text-xs font-mono text-slate-400 border-t border-slate-800">
            <div>XP: <strong className="text-cyan-400">{currentUser.xp}</strong></div>
            <div>O‘zlashtirish: <strong className="text-emerald-400">{overallPercent}%</strong></div>
            <div>Sana: <strong>{new Date().toLocaleDateString('uz-UZ')}</strong></div>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-2"
            >
              <Printer className="w-4 h-4 text-cyan-400" />
              Sertifikatni chop etish
            </button>
          </div>
        </div>
      )}

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>To‘plangan Tajriba (XP)</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-400 font-mono">
            {currentUser.xp} <span className="text-sm font-normal text-slate-500">XP</span>
          </div>
          <span className="text-[11px] text-slate-500 block">Har bir tajriba va test uchun ball</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Virtual Tajribalar</span>
            <FlaskConical className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-cyan-400 font-mono">
            {completedLabsCount} <span className="text-sm font-normal text-slate-500">/ {totalLabs}</span>
          </div>
          <span className="text-[11px] text-slate-500 block">Amalda bajarilgan reaksiyalar</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>O‘qilgan Darslar</span>
            <BookOpen className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400 font-mono">
            {completedLessonsCount} <span className="text-sm font-normal text-slate-500">/ {totalLessons}</span>
          </div>
          <span className="text-[11px] text-slate-500 block">O‘zlashtirilgan nazariy mavzular</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Umumiy O‘zlashtirish</span>
            <ShieldCheck className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-black text-purple-400 font-mono">
            {overallPercent}%
          </div>
          <span className="text-[11px] text-slate-500 block">Dastur bo‘yicha to‘liq progress</span>
        </div>
      </div>

      {/* Badges / Yutuq Nishonlari */}
      <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            Yutuqlar va Nishonlar (Badges)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Tajriba, dars va viktorinalarni topshirib maxsus unvonlarga ega bo‘ling
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {BADGES.map((b) => {
            const isUnlocked = currentUser.badges.includes(b.id) || currentUser.xp >= b.requiredXp;
            return (
              <div
                key={b.id}
                className={`p-4 rounded-2xl border transition-all flex items-start gap-4 ${
                  isUnlocked
                    ? 'bg-cyan-950/30 border-cyan-500/40 shadow-lg'
                    : 'bg-slate-950/40 border-slate-800/80 opacity-50 grayscale'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                  isUnlocked ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40' : 'bg-slate-800 text-slate-600 border-slate-700'
                }`}>
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    {b.name}
                    {isUnlocked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {b.description}
                  </p>
                  <span className="text-[10px] font-mono text-cyan-400 block mt-2">
                    Talab: {b.requiredXp} XP
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Completed Experiments & Submitted Reports Table */}
      <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <h3 className="text-lg font-bold text-white">
          Taqdim etilgan Laboratoriya Hisobotlari ({reports.length})
        </h3>

        {reports.length === 0 ? (
          <p className="text-xs text-slate-500 py-4 italic">
            Hali hisobot topshirilmagan. Virtual laboratoriyada tajribani bajaring.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-3">Sana</th>
                  <th className="p-3">Tajriba nomi</th>
                  <th className="p-3">Kimyoviy tenglama</th>
                  <th className="p-3">Holat</th>
                  <th className="p-3">Baho</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {reports.map((rep) => (
                  <tr key={rep.id} className="hover:bg-slate-950/40">
                    <td className="p-3 font-mono text-slate-400">{rep.date}</td>
                    <td className="p-3 font-bold text-white">{rep.experimentTitle}</td>
                    <td className="p-3 font-mono text-cyan-300">{rep.reactionEquation}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                        {rep.status === 'graded' ? 'Baholangan' : 'Topshirilgan'}
                      </span>
                    </td>
                    <td className="p-3 font-mono font-bold text-emerald-400">
                      {rep.teacherGrade ? `${rep.teacherGrade} / 5` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};
