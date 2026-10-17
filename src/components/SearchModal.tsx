import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, FlaskConical, Atom, BookOpen, Scale, ArrowRight, Bot, Sparkles } from 'lucide-react';
import { getAllElements } from '../data/elementsData';
import { EXPERIMENTS_DATA } from '../data/experimentsData';
import { LESSONS_DATA } from '../data/lessonsData';
import { REACTIONS_DATA } from '../data/reactionsData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (pageId: string, param?: string) => void;
}

export const SearchModal: React.FC<Props> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'elements' | 'experiments' | 'lessons' | 'reactions'>('all');

  const elements = useMemo(() => getAllElements(), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const results: {
      type: 'element' | 'experiment' | 'lesson' | 'reaction';
      title: string;
      subtitle: string;
      badge: string;
      actionPage: string;
      actionParam?: string;
    }[] = [];

    // Search Elements
    if (selectedFilter === 'all' || selectedFilter === 'elements') {
      elements.forEach(el => {
        if (
          el.name.toLowerCase().includes(q) ||
          el.symbol.toLowerCase().includes(q) ||
          el.latinName.toLowerCase().includes(q) ||
          el.number.toString() === q
        ) {
          results.push({
            type: 'element',
            title: `${el.name} (${el.symbol})`,
            subtitle: `#${el.number} | Massa: ${el.atomicMass} | ${el.categoryNameUz}`,
            badge: 'Element',
            actionPage: 'periodic-table',
            actionParam: el.symbol
          });
        }
      });
    }

    // Search Experiments
    if (selectedFilter === 'all' || selectedFilter === 'experiments') {
      EXPERIMENTS_DATA.forEach(exp => {
        if (
          exp.title.toLowerCase().includes(q) ||
          exp.topic.toLowerCase().includes(q) ||
          exp.chemicalEquation.toLowerCase().includes(q)
        ) {
          results.push({
            type: 'experiment',
            title: exp.title,
            subtitle: `${exp.grade}-sinf | ${exp.topic}`,
            badge: 'Virtual Tajriba',
            actionPage: 'virtual-lab',
            actionParam: exp.id
          });
        }
      });
    }

    // Search Lessons
    if (selectedFilter === 'all' || selectedFilter === 'lessons') {
      LESSONS_DATA.forEach(les => {
        if (
          les.title.toLowerCase().includes(q) ||
          les.chapter.toLowerCase().includes(q) ||
          les.content.toLowerCase().includes(q)
        ) {
          results.push({
            type: 'lesson',
            title: les.title,
            subtitle: `${les.grade}-sinf | ${les.chapter}`,
            badge: 'Darslik',
            actionPage: 'lessons',
            actionParam: les.id
          });
        }
      });
    }

    // Search Reactions
    if (selectedFilter === 'all' || selectedFilter === 'reactions') {
      REACTIONS_DATA.forEach(rx => {
        if (
          rx.name.toLowerCase().includes(q) ||
          rx.equation.toLowerCase().includes(q) ||
          rx.type.toLowerCase().includes(q)
        ) {
          results.push({
            type: 'reaction',
            title: rx.name,
            subtitle: `${rx.equation} (${rx.type})`,
            badge: 'Reaksiya',
            actionPage: 'reactions',
            actionParam: rx.id
          });
        }
      });
    }

    return results;
  }, [query, selectedFilter, elements]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-md">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Element, tajriba, dars yoki formulani qidiring..."
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm sm:text-base outline-none font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 rounded text-xs font-mono bg-slate-800 text-slate-400 hover:text-white"
          >
            ESC
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-2.5 bg-slate-950/50 border-b border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
          {[
            { id: 'all', label: 'Barchasi' },
            { id: 'elements', label: 'Elementlar' },
            { id: 'experiments', label: 'Tajribalar' },
            { id: 'lessons', label: 'Darslar' },
            { id: 'reactions', label: 'Reaksiyalar' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id as any)}
              className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-colors ${
                selectedFilter === f.id
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {f.label}
            </button>
          ))}
          <span className="ml-auto text-[11px] text-slate-500 font-mono">
            {searchResults.length} ta natija
          </span>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-3 space-y-2 flex-1">
          {query.trim() !== '' && (
            <div
              onClick={() => {
                onNavigate('ai-assistant');
                onClose();
              }}
              className="p-3 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/40 cursor-pointer transition-all flex items-center justify-between group shadow-sm mb-2"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs sm:text-sm font-bold text-cyan-200 group-hover:text-cyan-100 flex items-center gap-1.5">
                    <span>Al-Kimyogar AI dan so‘rash:</span>
                    <span className="italic font-normal text-white">"{query}"</span>
                  </h5>
                  <p className="text-[11px] text-cyan-400/80">
                    Sun’iy intellekt orqali formula, reaksiya va to‘liq tushuntirish olish
                  </p>
                </div>
              </div>
              <Sparkles className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
            </div>
          )}

          {query.trim() === '' ? (
            <div className="py-12 text-center text-slate-500 text-xs">
              <Search className="w-8 h-8 mx-auto mb-2 text-slate-600" />
              Qidirish uchun kimyoviy element, formula yoki mavzu nomini yozing.
            </div>
          ) : searchResults.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs space-y-2">
              <p>"{query}" bo‘yicha katalogda ma’lumot topilmadi.</p>
              <p className="text-cyan-400">Yuqoridagi <strong>Al-Kimyogar AI</strong> tugmasi orqali to‘liq ilmiy javob olishingiz mumkin!</p>
            </div>
          ) : (
            searchResults.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onNavigate(item.actionPage, item.actionParam);
                  onClose();
                }}
                className="p-3 rounded-xl bg-slate-950/60 hover:bg-cyan-950/30 border border-slate-800/80 hover:border-cyan-500/40 cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 text-cyan-400 group-hover:bg-cyan-500/20">
                    {item.type === 'element' && <Atom className="w-4 h-4" />}
                    {item.type === 'experiment' && <FlaskConical className="w-4 h-4" />}
                    {item.type === 'lesson' && <BookOpen className="w-4 h-4" />}
                    {item.type === 'reaction' && <Scale className="w-4 h-4" />}
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-slate-100 group-hover:text-cyan-300">
                      {item.title}
                    </h5>
                    <p className="text-[11px] text-slate-400">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
                    {item.badge}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
