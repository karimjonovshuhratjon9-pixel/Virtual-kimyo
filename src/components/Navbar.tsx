import React, { useState } from 'react';
import { 
  FlaskConical, Search, Menu, X, BookOpen, Atom, Scale, 
  Box, Calculator, BookMarked, Award, ShieldAlert, Sparkles, Bot 
} from 'lucide-react';

interface Props {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<Props> = ({
  currentPage,
  onNavigate,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Bosh sahifa' },
    { id: 'ai-assistant', label: 'AI Yordamchi' },
    { id: 'virtual-lab', label: 'Virtual Laboratoriya' },
    { id: 'periodic-table', label: 'Mendeleyev jadvali' },
    { id: 'reactions', label: 'Reaksiyalar' },
    { id: 'molecules', label: '3D Molekulalar' },
    { id: 'lessons', label: 'Darslik' },
    { id: 'quiz', label: 'Testlar' },
    { id: 'calculator', label: 'Kalkulyator' },
    { id: 'lab-notebook', label: 'Daftar' },
    { id: 'safety', label: 'Xavfsizlik' },
    { id: 'results', label: 'Natijalar' },
  ];

  const handleLinkClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Logo and Brand */}
        <div 
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-emerald-500 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <FlaskConical className="w-5 h-5 text-cyan-400 group-hover:rotate-6 transition-transform" />
            </div>
          </div>
          <div>
            <span className="text-lg font-black tracking-tight text-white flex items-center gap-1">
              LABORATORYA
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </span>
            <span className="hidden sm:block text-[10px] text-slate-400 font-medium -mt-1">
              Kimyoni tajriba orqali kashf et!
            </span>
          </div>
        </div>

        {/* Center: Desktop Navigation Bar */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-slate-300">
          {navLinks.slice(0, 8).map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                currentPage === link.id
                  ? 'bg-cyan-500/15 text-cyan-400 font-bold border border-cyan-500/30'
                  : 'hover:text-white hover:bg-slate-900'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Side: Search Trigger + Quick Lab Button */}
        <div className="flex items-center gap-2.5">
          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 text-xs transition-colors"
            title="Qidirish (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Qidirish</span>
            <kbd className="hidden sm:inline text-[10px] font-mono px-1.5 py-0.5 bg-slate-950 rounded border border-slate-800 text-slate-500">
              Ctrl+K
            </kbd>
          </button>

          {/* AI Assistant Quick CTA */}
          <button
            onClick={() => handleLinkClick('ai-assistant')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-950 to-teal-950 hover:from-cyan-900 hover:to-teal-900 border border-cyan-500/40 text-cyan-300 transition-all shadow-md shadow-cyan-500/10 active:scale-95"
            title="Kimyo AI Maslahatchisi"
          >
            <Bot className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI Yordamchi</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </button>

          {/* Quick Lab CTA */}
          <button
            onClick={() => handleLinkClick('virtual-lab')}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all shadow-md shadow-cyan-500/20 active:scale-95"
          >
            <FlaskConical className="w-3.5 h-3.5 fill-slate-950" />
            Laboratoriya
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-1 text-sm animate-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`p-2.5 rounded-xl text-left text-xs font-semibold transition-all ${
                  currentPage === link.id
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 font-bold'
                    : 'bg-slate-900/60 text-slate-300 hover:bg-slate-900'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
