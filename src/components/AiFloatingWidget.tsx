import React, { useState } from 'react';
import { Bot, Sparkles, X, MessageSquare, ChevronUp } from 'lucide-react';
import { ChemistryAiAssistant } from './ChemistryAiAssistant';

interface Props {
  onNavigate: (page: string, param?: string) => void;
  isOpenExternal?: boolean;
  onToggleExternal?: () => void;
}

export const AiFloatingWidget: React.FC<Props> = ({
  onNavigate,
  isOpenExternal,
  onToggleExternal,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);

  const isOpen = isOpenExternal !== undefined ? isOpenExternal : internalOpen;
  const setIsOpen = (val: boolean) => {
    if (onToggleExternal) {
      onToggleExternal();
    } else {
      setInternalOpen(val);
    }
  };

  return (
    <>
      {/* Floating Action Button (FAB) at bottom-right */}
      <aside aria-label="Kimyo AI Maslahatchi" className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        {!isOpen && (
          <div className="relative group">
            {/* Glowing orbital ring animation */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-500 rounded-full blur-md opacity-70 group-hover:opacity-100 animate-pulse transition duration-500" />

            <button
              onClick={() => setIsOpen(true)}
              className="relative flex items-center gap-2.5 px-4 py-3 bg-slate-950 text-white rounded-full border border-cyan-400/50 shadow-2xl hover:scale-105 active:scale-95 transition-all group"
              title="Kimyo AI Yordamchisini ochish"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center text-slate-950 shadow-md">
                <Bot className="w-4 h-4 fill-slate-950" />
              </div>

              <div className="text-left hidden sm:block">
                <div className="text-xs font-black tracking-tight text-white flex items-center gap-1.5">
                  <span>AI Yordamchi</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div className="text-[10px] text-cyan-300 font-medium -mt-0.5">
                  Kimyo savolingiz bormi?
                </div>
              </div>

              <Sparkles className="w-4 h-4 text-cyan-400 animate-spin hidden sm:block [animation-duration:4s]" />
            </button>
          </div>
        )}
      </aside>

      {/* Floating Modal Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Kimyo AI Maslahatchi oynasi"
          className="fixed bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-[480px] md:w-[540px] max-w-[96vw] animate-in slide-in-from-bottom-5 fade-in duration-200"
        >
          <div className="relative">
            <ChemistryAiAssistant
              isOpen={true}
              onClose={() => setIsOpen(false)}
              isFloating={true}
              onNavigate={onNavigate}
            />
          </div>
        </div>
      )}
    </>
  );
};
