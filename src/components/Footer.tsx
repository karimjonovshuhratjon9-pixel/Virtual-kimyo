import React from 'react';
import { FlaskConical, ShieldCheck, Heart, Sparkles } from 'lucide-react';

interface Props {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<Props> = ({ onNavigate }) => {
  return (
    <footer className="mt-20 border-t border-slate-800 bg-slate-950/80 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand & Slogan */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <FlaskConical className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base text-white tracking-tight">
                LABORATORYA
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              7–11-sinf o‘quvchilari va o‘qituvchilar uchun interaktiv virtual kimyo laboratoriyasi va ta’lim platformasi.
            </p>
            <p className="text-cyan-400 font-medium italic text-xs">
              “Kimyoni tajriba orqali kashf et!”
            </p>
          </div>

          {/* Quick Sections */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3 text-xs">
              Asosiy Bo‘limlar
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('ai-assistant')} className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                  <span>✨ Al-Kimyogar AI Yordamchi</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('virtual-lab')} className="hover:text-cyan-400 transition-colors">
                  Virtual Laboratoriya
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('periodic-table')} className="hover:text-cyan-400 transition-colors">
                  Mendeleyev jadvali (118 element)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('reactions')} className="hover:text-cyan-400 transition-colors">
                  Kimyoviy Reaksiyalar
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('molecules')} className="hover:text-cyan-400 transition-colors">
                  3D Fazoviy Molekulalar
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('calculator')} className="hover:text-cyan-400 transition-colors">
                  Kimyoviy Kalkulyator
                </button>
              </li>
            </ul>
          </div>

          {/* Education & Notebook */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3 text-xs">
              O‘quv va Nazorat
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('lessons')} className="hover:text-cyan-400 transition-colors">
                  Kimyo Darsligi (7–11 sinf)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('quiz')} className="hover:text-cyan-400 transition-colors">
                  Test va Viktorinalar
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('lab-notebook')} className="hover:text-cyan-400 transition-colors">
                  Elektron Laboratoriya Daftari
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('safety')} className="hover:text-cyan-400 transition-colors">
                  Xavfsizlik Qoidalari va GHS
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('results')} className="hover:text-cyan-400 transition-colors">
                  Mening Natijalarim va Nishonlar
                </button>
              </li>
            </ul>
          </div>

          {/* Standards & Safety Notice */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider mb-3 text-xs">
              Ilmiy Standartlar
            </h4>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-[11px]">
              <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                IUPAC va Davlat Ta’lim Standarti
              </div>
              <p className="text-slate-400 leading-relaxed">
                Barcha reaksiyalar atomlar balansi bo‘yicha tekshirilgan va maktab kimyo o‘quv dasturiga to‘liq mos keladi.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 pb-16 sm:pb-8">
          <div className="order-2 md:order-1 text-center md:text-left">
            © 2026 LABORATORYA platformasi. Barcha huquqlar himoyalangan.
          </div>
          
          {/* Loyiha yaratuvchisi - Markazda va yaqqol ko'rinadigan qilib */}
          <div className="order-1 md:order-2 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 font-medium shadow-md shadow-slate-950/40">
            <span className="text-slate-400">Loyiha yaratuvchisi:</span>
            <span className="font-bold text-cyan-400 text-sm tracking-wide">Karimjonov Shuhratjon</span>
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>

          <div className="order-3 hidden md:block w-48 text-right text-[11px] text-slate-600">
            O‘zbekiston ta’limi uchun
          </div>
        </div>
      </div>
    </footer>
  );
};
