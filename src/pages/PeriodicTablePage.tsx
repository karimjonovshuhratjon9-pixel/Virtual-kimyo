import React, { useState, useMemo, useEffect } from 'react';
import { getAllElements, CATEGORY_COLORS } from '../data/elementsData';
import { ChemicalElement } from '../types/chemistry';
import { Search, X, Atom, Sparkles, Filter, Info, ChevronRight, Zap } from 'lucide-react';

interface Props {
  initialElementSymbol?: string;
}

export const PeriodicTablePage: React.FC<Props> = ({ initialElementSymbol }) => {
  const elements = useMemo(() => getAllElements(), []);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPhase, setSelectedPhase] = useState<string>('all');
  const [activeElement, setActiveElement] = useState<ChemicalElement | null>(null);

  useEffect(() => {
    if (initialElementSymbol) {
      const match = elements.find(
        (el) => el.symbol.toLowerCase() === initialElementSymbol.toLowerCase()
      );
      if (match) setActiveElement(match);
    }
  }, [initialElementSymbol, elements]);

  // Fast map by (period, group) for grid placing
  const elementsGridMap = useMemo(() => {
    const map = new Map<string, ChemicalElement>();
    elements.forEach((el) => {
      // lanthanides (57-71) and actinides (89-103) placed separately
      if (el.number >= 57 && el.number <= 71) {
        map.set(`lanthanide-${el.number}`, el);
      } else if (el.number >= 89 && el.number <= 103) {
        map.set(`actinide-${el.number}`, el);
      } else {
        map.set(`${el.period}-${el.group}`, el);
      }
    });
    return map;
  }, [elements]);

  const isElementHighlighted = (el: ChemicalElement) => {
    if (selectedCategory !== 'all' && el.category !== selectedCategory) return false;
    if (selectedPhase !== 'all' && el.phase !== selectedPhase) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.trim().toLowerCase();
      return (
        el.name.toLowerCase().includes(q) ||
        el.symbol.toLowerCase().includes(q) ||
        el.latinName.toLowerCase().includes(q) ||
        el.number.toString() === q
      );
    }
    return true;
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Search Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Atom className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Mendeleyev Davriy Jadvali
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            118 ta kimyoviy elementning to‘liq xossalari, elektron konfiguratsiyasi va ilmiy ma’lumotlari
          </p>
        </div>

        {/* Search & Phase Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative w-full sm:w-60">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Nom, belgi yoki raqam..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-cyan-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <select
            value={selectedPhase}
            onChange={(e) => setSelectedPhase(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none focus:border-cyan-500"
          >
            <option value="all">Barcha agregat holatlar</option>
            <option value="Qattiq">Qattiq</option>
            <option value="Suyuq">Suyuq</option>
            <option value="Gaz">Gaz</option>
          </select>
        </div>
      </div>

      {/* Category Filter Pills (Legend) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-[11px] scrollbar-thin">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors ${
            selectedCategory === 'all'
              ? 'bg-slate-200 text-slate-950'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
          }`}
        >
          Barchasi (118)
        </button>

        {Object.entries(CATEGORY_COLORS).map(([key, style]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(selectedCategory === key ? 'all' : key)}
            className={`px-2.5 py-1.5 rounded-xl whitespace-nowrap border flex items-center gap-1.5 transition-all ${
              selectedCategory === key
                ? `${style.bg} ${style.border} ${style.text} ring-1 ring-cyan-400 font-bold`
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${style.bg} border ${style.border}`} />
            {style.label}
          </button>
        ))}
      </div>

      {/* Interactive Periodic Table Grid Container */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl overflow-x-auto scrollbar-thin">
        <div className="min-w-[960px]">
          
          {/* Main 7 Periods x 18 Groups Grid */}
          <div className="grid grid-cols-18 gap-1.5 sm:gap-2">
            {Array.from({ length: 7 }).map((_, pIdx) => {
              const period = pIdx + 1;
              return Array.from({ length: 18 }).map((_, gIdx) => {
                const group = gIdx + 1;
                const element = elementsGridMap.get(`${period}-${group}`);

                if (!element) {
                  // Special placeholders for lanthanides/actinides indicators in period 6 & 7, group 3
                  if (period === 6 && group === 3) {
                    return (
                      <div
                        key={`lanth-holder`}
                        className="h-16 sm:h-20 rounded-xl border border-dashed border-indigo-500/40 bg-indigo-950/20 flex flex-col items-center justify-center text-[10px] text-indigo-300 font-mono"
                      >
                        57-71
                        <span className="text-[8px]">La-Lu</span>
                      </div>
                    );
                  }
                  if (period === 7 && group === 3) {
                    return (
                      <div
                        key={`act-holder`}
                        className="h-16 sm:h-20 rounded-xl border border-dashed border-pink-500/40 bg-pink-950/20 flex flex-col items-center justify-center text-[10px] text-pink-300 font-mono"
                      >
                        89-103
                        <span className="text-[8px]">Ac-Lr</span>
                      </div>
                    );
                  }
                  return <div key={`empty-${period}-${group}`} className="h-16 sm:h-20" />;
                }

                const style = CATEGORY_COLORS[element.category] || CATEGORY_COLORS['unknown'];
                const highlighted = isElementHighlighted(element);

                return (
                  <button
                    key={element.number}
                    onClick={() => setActiveElement(element)}
                    className={`h-16 sm:h-20 rounded-xl border p-1 sm:p-1.5 flex flex-col justify-between text-left transition-all ${
                      highlighted
                        ? `${style.bg} ${style.border} hover:scale-105 hover:z-20 hover:shadow-lg hover:border-cyan-400 cursor-pointer`
                        : 'opacity-20 grayscale border-slate-800 bg-slate-950/40'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono leading-none">
                      <span className="font-bold text-slate-300">{element.number}</span>
                      <span className="text-slate-400 hidden sm:inline">
                        {element.atomicMass ? Math.round(element.atomicMass) : ''}
                      </span>
                    </div>

                    <div className="text-center font-black text-sm sm:text-lg text-white font-mono leading-tight">
                      {element.symbol}
                    </div>

                    <div className="text-[8px] sm:text-[9px] text-slate-300 truncate text-center font-medium">
                      {element.name}
                    </div>
                  </button>
                );
              });
            })}
          </div>

          {/* Spacer between main grid and f-block */}
          <div className="my-6 border-t border-slate-800/80 relative">
            <span className="absolute left-1/2 -translate-x-1/2 -top-2.5 px-3 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[10px] text-slate-500 font-mono">
              f-blok (Lantanoidlar va Aktinoidlar)
            </span>
          </div>

          {/* Lanthanides & Actinides Rows (15 cols each) */}
          <div className="space-y-2 pl-[11.11%]">
            {/* Lanthanides 57 to 71 */}
            <div className="grid grid-cols-15 gap-1.5 sm:gap-2">
              {Array.from({ length: 15 }).map((_, idx) => {
                const num = 57 + idx;
                const element = elementsGridMap.get(`lanthanide-${num}`);
                if (!element) return <div key={num} className="h-14 sm:h-16" />;
                const style = CATEGORY_COLORS['lanthanide'];
                const highlighted = isElementHighlighted(element);

                return (
                  <button
                    key={num}
                    onClick={() => setActiveElement(element)}
                    className={`h-14 sm:h-16 rounded-xl border p-1 sm:p-1.5 flex flex-col justify-between text-left transition-all ${
                      highlighted
                        ? `${style.bg} ${style.border} hover:scale-105 hover:z-20 hover:shadow-lg cursor-pointer`
                        : 'opacity-20 grayscale border-slate-800'
                    }`}
                  >
                    <div className="text-[9px] font-mono text-slate-300">{element.number}</div>
                    <div className="text-center font-black text-sm sm:text-base text-white font-mono leading-tight">{element.symbol}</div>
                    <div className="text-[8px] text-slate-300 truncate text-center">{element.name}</div>
                  </button>
                );
              })}
            </div>

            {/* Actinides 89 to 103 */}
            <div className="grid grid-cols-15 gap-1.5 sm:gap-2">
              {Array.from({ length: 15 }).map((_, idx) => {
                const num = 89 + idx;
                const element = elementsGridMap.get(`actinide-${num}`);
                if (!element) return <div key={num} className="h-14 sm:h-16" />;
                const style = CATEGORY_COLORS['actinide'];
                const highlighted = isElementHighlighted(element);

                return (
                  <button
                    key={num}
                    onClick={() => setActiveElement(element)}
                    className={`h-14 sm:h-16 rounded-xl border p-1 sm:p-1.5 flex flex-col justify-between text-left transition-all ${
                      highlighted
                        ? `${style.bg} ${style.border} hover:scale-105 hover:z-20 hover:shadow-lg cursor-pointer`
                        : 'opacity-20 grayscale border-slate-800'
                    }`}
                  >
                    <div className="text-[9px] font-mono text-slate-300">{element.number}</div>
                    <div className="text-center font-black text-sm sm:text-base text-white font-mono leading-tight">{element.symbol}</div>
                    <div className="text-[8px] text-slate-300 truncate text-center">{element.name}</div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* ELEMENT DETAILS MODAL */}
      {activeElement && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          onClick={() => setActiveElement(null)}
        >
          <div 
            className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-16 h-20 rounded-2xl bg-slate-950 border-2 border-cyan-500/50 p-2 flex flex-col justify-between shadow-lg">
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span className="font-bold text-cyan-400">{activeElement.number}</span>
                    <span>{activeElement.period}p</span>
                  </div>
                  <div className="text-center font-black text-2xl text-white font-mono">
                    {activeElement.symbol}
                  </div>
                  <div className="text-center text-[9px] font-mono text-slate-400">
                    {activeElement.atomicMass}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-extrabold text-white">{activeElement.name}</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                      {activeElement.latinName}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {activeElement.categoryNameUz} | Agregat holati: <strong className="text-slate-200">{activeElement.phase}</strong>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveElement(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Properties Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Atom massasi:</span>
                <span className="font-mono font-bold text-slate-200 text-sm">{activeElement.atomicMass} m.a.b.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Guruh va Davr:</span>
                <span className="font-mono font-bold text-slate-200 text-sm">{activeElement.period}-davr, {activeElement.group}-guruh</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Valentlik:</span>
                <span className="font-mono font-bold text-slate-200 text-sm">{activeElement.valence}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Elektron qobiq:</span>
                <span className="font-mono font-bold text-cyan-300 text-xs truncate block">{activeElement.electronConfig}</span>
              </div>
            </div>

            {/* Physical-Chemical details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Elektrmanfiylik (Pauling):</span>
                <span className="font-mono text-slate-300 font-semibold">{activeElement.electronegativity ?? '—'}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Erish harorati:</span>
                <span className="font-mono text-slate-300 font-semibold">{activeElement.meltingPoint ? `${activeElement.meltingPoint}°C` : '—'}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Qaynash harorati:</span>
                <span className="font-mono text-slate-300 font-semibold">{activeElement.boilingPoint ? `${activeElement.boilingPoint}°C` : '—'}</span>
              </div>
            </div>

            {/* Summary & History */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-slate-200 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-cyan-400" />
                Umumiy Tavsif va Ahamiyati
              </h4>
              <p className="text-slate-300 leading-relaxed bg-slate-950/50 p-3.5 rounded-xl border border-slate-800">
                {activeElement.summaryUz}
              </p>
              {activeElement.discoveredBy && (
                <p className="text-[11px] text-slate-400 pt-1">
                  Kashf etilgan: <strong className="text-slate-200">{activeElement.discoveredBy}</strong> ({activeElement.discoveryYear})
                </p>
              )}
            </div>

            {/* Practical Uses */}
            {activeElement.usesUz && activeElement.usesUz.length > 0 && (
              <div className="space-y-2 text-xs">
                <h4 className="font-bold text-slate-200 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  Amaliyotda Qo‘llanilishi
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeElement.usesUz.map((use, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 font-medium border border-slate-700">
                      {use}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
