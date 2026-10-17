import React from 'react';
import { 
  Bot, Sparkles, BookOpen, Scale, Atom, FlaskConical, 
  HelpCircle, Zap, ShieldAlert, CheckCircle2, ArrowRight 
} from 'lucide-react';
import { ChemistryAiAssistant } from '../components/ChemistryAiAssistant';

interface Props {
  onNavigate: (page: string, param?: string) => void;
}

export const AiAssistantPage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold">
              <Bot className="w-3.5 h-3.5" />
              <span>Sun’iy Intellekt Laboratoriyasi • Gemini 3.8 Flash</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Al-Kimyogar AI — <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Kimyo Yordamchisi</span>
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Kimyo fani bo‘yicha istalgan savol, reaksiya tenglamalarini tenglashtirish, murakkab masalalarni yechish va laboratoriya xavfsizligi bo‘yicha 24/7 ilmiy maslahatchi.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('calculator')}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-700 text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <Scale className="w-4 h-4 text-cyan-400" />
              <span>Kalkulyator</span>
            </button>
            <button
              onClick={() => onNavigate('periodic-table')}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-700 text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <Atom className="w-4 h-4 text-emerald-400" />
              <span>Mendeleyev jadvali</span>
            </button>
            <button
              onClick={() => onNavigate('virtual-lab')}
              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20"
            >
              <FlaskConical className="w-4 h-4" />
              <span>Virtual Laboratoriya</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main AI Interactive Workstation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: The Full-Feature AI Assistant Chat Container (8 Cols) */}
        <div className="lg:col-span-8">
          <ChemistryAiAssistant
            isOpen={true}
            onNavigate={onNavigate}
          />
        </div>

        {/* Right Column: Knowledge Quick Guide & Chemistry Cheatsheets (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Scientific Capabilities Card */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
            <h3 className="font-extrabold text-white text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              AI Nimalarni Bajaradi?
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Reaksiya tenglashtirish:</strong> Elektron balans va ionli usulda tenglashtirish.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Masalalar yechimi:</strong> Mol, hajm (22.4 l), eritma foizi (w%) va unum (η%).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Atom tuzilishi:</strong> Elektron formulalar (1s² 2s² 2p⁶...) va valentlik.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Organik kimyo:</strong> Alkanlar, alkenlar, aromatik birikmalar va nomlanish (IUPAC).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Laboratoriya xavfsizligi:</strong> Reaktivlar bilan ishlash va birinchi yordam.</span>
              </li>
            </ul>
          </div>

          {/* Quick Examples to Ask */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-500/20 space-y-3 shadow-xl">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider text-cyan-400">
              Qanday so‘rash mumkin? Misollar:
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:border-cyan-500/40 transition-colors">
                💬 <em>"Aluminiyning xlorid kislota bilan reaksiyasini yoz va tenglashtir"</em>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:border-cyan-500/40 transition-colors">
                💬 <em>"100 g 20% li eritma tayyorlash uchun qancha tuz kerak?"</em>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:border-cyan-500/40 transition-colors">
                💬 <em>"Temir (III) oksididagi temirning massa ulushini toping"</em>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:border-cyan-500/40 transition-colors">
                💬 <em>"Shohona eritma (Aqua Regia) nima va oltinni qanday eritadi?"</em>
              </div>
            </div>
          </div>

          {/* Safety Reminder */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-amber-300 font-bold mb-1">Eslatma:</strong>
              Haqiqiy laboratoriyada har qanday reaksiyani faqat o‘qituvchi nazorati ostida va shaxsiy himoya vositalari bilan bajaring!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
