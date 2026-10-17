import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Send, Trash2, Copy, Check, Volume2, VolumeX, 
  RotateCcw, Bot, User, Maximize2, Minimize2, X, FlaskConical,
  Atom, Zap, BookOpen, AlertCircle, ChevronDown, CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { aiService, ChatMessage } from '../services/aiService';

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
  isFloating?: boolean;
  onNavigate?: (page: string, param?: string) => void;
}

const PRESET_PROMPTS = [
  {
    category: 'Oddiy',
    icon: '👋',
    label: 'Salom!',
    prompt: 'Salom! O‘zingiz haqingizda qisqacha aytib bering va qanday yordam bera olasiz?',
  },
  {
    category: 'Oddiy',
    icon: '🧂',
    label: 'Osh tuzi nima?',
    prompt: 'Osh tuzi nima, uning formulasi va kundalik hayotdagi ahamiyati qanday?',
  },
  {
    category: 'Oddiy',
    icon: '💧',
    label: 'Suv haqida',
    prompt: 'Suvning kimyoviy formulasi, tuzilishi va qiziqarli xossalari nimalardan iborat?',
  },
  {
    category: 'Oddiy',
    icon: '💨',
    label: 'Havo tarkibi',
    prompt: 'Atmosfera havosi qanday gazlardan tashkil topgan?',
  },
  {
    category: 'Reaksiyalar',
    icon: '⚡',
    label: 'KMnO₄ + HCl tenglashtirish',
    prompt: 'Kaly permanganat (KMnO₄) va xlorid kislota (HCl) reaksiyasini elektron balans usulida tenglashtirib, har bir bosqichini tushuntirib bering.',
  },
  {
    category: 'Masalalar',
    icon: '⚖️',
    label: '10% li eritma tayyorlash',
    prompt: '250 g 10% li osh tuzi (NaCl) eritmasini tayyorlash uchun qancha gramm tuz va necha ml suv kerak bo‘ladi? Qadamma-qadam yechimini ko‘rsating.',
  },
  {
    category: 'Nazariya',
    icon: '⚛️',
    label: 'Mendeleyev davriy qonuni',
    prompt: 'Mendeleyev davriy qonuni va uning kimyodagi ahamiyati nima?',
  },
  {
    category: 'Laboratoriya',
    icon: '🧫',
    label: 'Kislota bilan xavfsizlik',
    prompt: 'Konsentrlangan sulfat kislota (H₂SO₄) bilan ishlashda qanday xavfsizlik qoidalariga rioya qilish kerak? Nega suvga kislota quyiladi, aksincha emas?',
  },
];

const CHEMISTRY_SYMBOLS = ['→', '⇌', '↑', '↓', 'Δ', '₂', '₃', '₄', '₅', '⁺', '⁻', '°C'];

export const ChemistryAiAssistant: React.FC<Props> = ({
  isOpen = true,
  onClose,
  isFloating = false,
  onNavigate,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => aiService.getStoredHistory());
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('Barchasi');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    aiService.saveHistory(messages);
  }, [messages]);

  // Handle Speech Synthesis
  const handleToggleSpeak = (msgId: string, text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Kechirasiz, brauzeringiz ovozli o‘qishni qo‘llab-quvvatlamaydi.');
      return;
    }

    if (isSpeaking && speakingId === msgId) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Clean text from markdown symbols for speech
    const cleanText = text
      .replace(/[#*_`]/g, '')
      .replace(/→/g, 'hosil bo‘ladi')
      .replace(/↑/g, 'gaz ajraladi')
      .replace(/↓/g, 'cho‘kma tushadi');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setIsSpeaking(false);
      setSpeakingId(null);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setSpeakingId(null);
    };

    setIsSpeaking(true);
    setSpeakingId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    if (confirm('Barcha muloqot tarixini tozalashni xohlaysizmi?')) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      aiService.clearHistory();
      setMessages([
        {
          id: 'welcome-msg-reset',
          role: 'model',
          content: 'Muloqot tarixi tozalandi. Qanday kimyoviy savolingiz bor? Marhamat, so‘rang!',
          timestamp: Date.now(),
        },
      ]);
    }
  };

  const handleInsertSymbol = (sym: string) => {
    if (!inputRef.current) return;
    const start = inputRef.current.selectionStart || inputValue.length;
    const end = inputRef.current.selectionEnd || inputValue.length;
    const nextVal = inputValue.substring(0, start) + sym + inputValue.substring(end);
    setInputValue(nextVal);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.selectionStart = start + sym.length;
        inputRef.current.selectionEnd = start + sym.length;
        inputRef.current.focus();
      }
    }, 10);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || loading) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    const tempBotId = `bot-${Date.now()}`;
    const initialBotMessage: ChatMessage = {
      id: tempBotId,
      role: 'model',
      content: '',
      timestamp: Date.now(),
    };

    const updatedWithUser = [...messages, userMessage];
    setMessages([...updatedWithUser, initialBotMessage]);
    setInputValue('');
    setLoading(true);

    try {
      const finalReply = await aiService.streamQuestion(
        text,
        updatedWithUser,
        (accumulatedText) => {
          setMessages((prev) =>
            prev.map((m) => (m.id === tempBotId ? { ...m, content: accumulatedText } : m))
          );
        }
      );

      setMessages((prev) =>
        prev.map((m) => (m.id === tempBotId ? { ...m, content: finalReply } : m))
      );
    } catch (err: any) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === tempBotId
            ? {
                ...m,
                content: `⚠️ Kechirasiz, javob olishda xatolik yuz berdi: ${err.message || 'Tarmoq xatosi'}. Iltimos, qaytadan urinib ko‘ring.`,
              }
            : m
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Render markdown-like elements simply and beautifully
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');

    return (
      <div className="space-y-2.5 text-sm leading-relaxed">
        {lines.map((line, idx) => {
          const trimmed = line.trim();

          // Heading 3 ###
          if (trimmed.startsWith('### ')) {
            return (
              <h4 key={idx} className="text-base font-bold text-cyan-300 mt-4 mb-2 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-cyan-400 rounded-full" />
                {trimmed.replace('### ', '')}
              </h4>
            );
          }

          // Heading 2 ##
          if (trimmed.startsWith('## ')) {
            return (
              <h3 key={idx} className="text-lg font-extrabold text-white mt-4 mb-2 border-b border-cyan-500/30 pb-1">
                {trimmed.replace('## ', '')}
              </h3>
            );
          }

          // Bullet points
          if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            const bulletText = trimmed.replace(/^[-*]\s+/, '');
            return (
              <div key={idx} className="flex items-start gap-2 text-slate-200 pl-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                <span>{renderInlineText(bulletText)}</span>
              </div>
            );
          }

          // Numbered list
          if (/^\d+\.\s+/.test(trimmed)) {
            const numMatch = trimmed.match(/^(\d+\.)\s+(.*)/);
            if (numMatch) {
              return (
                <div key={idx} className="flex items-start gap-2 text-slate-200 pl-1">
                  <span className="text-cyan-400 font-bold font-mono text-xs mt-0.5 shrink-0">{numMatch[1]}</span>
                  <span>{renderInlineText(numMatch[2])}</span>
                </div>
              );
            }
          }

          // Chemical Equation or Code block line (contains arrows -> or centered)
          if ((trimmed.includes('→') || trimmed.includes('⇌')) && !trimmed.startsWith('###')) {
            return (
              <div 
                key={idx} 
                className="my-2 p-2.5 rounded-xl bg-slate-900/90 border border-cyan-500/40 text-cyan-200 font-mono text-xs sm:text-sm tracking-wide shadow-inner overflow-x-auto flex items-center justify-between gap-3"
              >
                <span>{trimmed}</span>
                {onNavigate && (
                  <button
                    onClick={() => onNavigate('reactions')}
                    className="shrink-0 text-[10px] text-cyan-400 hover:text-cyan-300 font-sans flex items-center gap-1 bg-cyan-950/60 hover:bg-cyan-900/80 px-2 py-1 rounded-lg border border-cyan-700/50 transition-colors"
                    title="Reaksiyalar bo'limida ko'rish"
                  >
                    <span>Reaksiyalarda</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </button>
                )}
              </div>
            );
          }

          // Blank line
          if (!trimmed) {
            return <div key={idx} className="h-1" />;
          }

          // Standard paragraph
          return (
            <p key={idx} className="text-slate-200">
              {renderInlineText(trimmed)}
            </p>
          );
        })}
      </div>
    );
  };

  // Helper for bold and italic
  const renderInlineText = (text: string) => {
    // Basic regex parser for **bold** and *italic*
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-bold text-white text-cyan-100">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <em key={i} className="italic text-cyan-300">
            {part.slice(1, -1)}
          </em>
        );
      }
      return part;
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className={`flex flex-col bg-slate-950 border border-cyan-500/30 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 ${
        isFullscreen
          ? 'fixed inset-4 z-50 max-w-none h-[calc(100vh-2rem)]'
          : isFloating
          ? 'w-full h-full max-h-[85vh]'
          : 'w-full h-[760px] max-h-[85vh]'
      }`}
    >
      {/* 1. TOP HEADER */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 border-b border-slate-800 p-4 sm:px-6 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          {/* Animated AI Orbital Avatar */}
          <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-600 to-emerald-500 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center relative overflow-hidden">
              <Bot className="w-5 h-5 text-cyan-400 z-10" />
              <div className="absolute inset-0 bg-cyan-400/10 animate-pulse" />
            </div>
            {/* Online status indicator */}
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-950 shadow-sm" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-white text-base tracking-tight flex items-center gap-1.5">
                Al-Kimyogar AI
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold border border-cyan-500/40">
                  Kimyo Eksperti
                </span>
              </h3>
            </div>
            <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-cyan-400 animate-spin" />
              <span>Har qanday kimyoviy savol, masala va reaksiyaga javob beradi</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Clear history */}
          <button
            onClick={handleClearHistory}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 transition-colors"
            title="Muloqot tarixini tozalash"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          {/* Fullscreen toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors hidden sm:block"
            title={isFullscreen ? 'Kichraytirish' : 'Kengaytirish'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Close button if popup */}
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
              title="Yopish"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 2. PRESET TOPICS QUICK CAROUSEL */}
      <div className="bg-slate-900/60 border-b border-slate-800/80 px-4 py-2.5 overflow-x-auto scrollbar-none flex items-center gap-2 shrink-0">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 shrink-0 mr-1 flex items-center gap-1">
          <Zap className="w-3 h-3 text-amber-400" />
          Mavzular:
        </span>
        {PRESET_PROMPTS.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(preset.prompt)}
            disabled={loading}
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-cyan-950/60 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 text-xs transition-all active:scale-95 disabled:opacity-50"
          >
            <span>{preset.icon}</span>
            <span className="font-medium">{preset.label}</span>
          </button>
        ))}
      </div>

      {/* 3. MESSAGES SCROLL AREA */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-900/40">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
                  isUser
                    ? 'bg-gradient-to-tr from-cyan-600 to-teal-500 text-slate-950'
                    : 'bg-slate-900 border border-cyan-500/40 text-cyan-400'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-4 sm:p-5 relative group ${
                  isUser
                    ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-tr-sm shadow-lg shadow-cyan-600/20'
                    : 'bg-slate-900/90 border border-slate-800 hover:border-cyan-500/30 text-slate-100 rounded-tl-sm shadow-xl'
                }`}
              >
                {/* Text Content */}
                {isUser ? (
                  <p className="text-sm font-medium whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                ) : !msg.content ? (
                  <div className="flex items-center gap-2.5 text-cyan-300 py-1">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse [animation-delay:0.2s]" />
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse [animation-delay:0.4s]" />
                    </div>
                    <span className="text-xs text-slate-400 font-medium">Javob tayyorlanmoqda...</span>
                  </div>
                ) : (
                  <div>{renderFormattedContent(msg.content)}</div>
                )}

                {/* Footer Toolbar for Assistant Messages */}
                {!isUser && msg.content && (
                  <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1 text-[10px] text-slate-500">
                      <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                      Kimyoviy ma’lumotlar tekshirilgan
                    </span>

                    <div className="flex items-center gap-2">
                      {/* Read Aloud button */}
                      <button
                        onClick={() => handleToggleSpeak(msg.id, msg.content)}
                        className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                          speakingId === msg.id && isSpeaking
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                            : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                        title={speakingId === msg.id && isSpeaking ? 'To‘xtatish' : 'Ovozli eshitish'}
                      >
                        {speakingId === msg.id && isSpeaking ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5" />
                            <span className="text-[10px]">To‘xtatish</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5" />
                            <span className="text-[10px]">O‘qish</span>
                          </>
                        )}
                      </button>

                      {/* Copy message button */}
                      <button
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1"
                        title="Nusxa olish"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-[10px] text-emerald-400">Nusxalandi</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span className="text-[10px]">Nusxa</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      {/* 4. CHEMICAL SYMBOLS QUICK INSERT BAR */}
      <div className="bg-slate-900/75 border-t border-slate-800/80 px-4 py-2 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider shrink-0 mr-1">
          Belgilar:
        </span>
        {CHEMISTRY_SYMBOLS.map((sym, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleInsertSymbol(sym)}
            className="px-2 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold transition-all active:scale-95"
            title={`'${sym}' belgisini kiritish`}
          >
            {sym}
          </button>
        ))}
        {onNavigate && (
          <div className="ml-auto flex items-center gap-2 pl-2 border-l border-slate-800 shrink-0">
            <button
              onClick={() => onNavigate('calculator')}
              className="text-[11px] text-slate-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
            >
              <FlaskConical className="w-3 h-3 text-cyan-400" />
              <span>Kalkulyator</span>
            </button>
            <button
              onClick={() => onNavigate('periodic-table')}
              className="text-[11px] text-slate-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
            >
              <Atom className="w-3 h-3 text-teal-400" />
              <span>Jadval</span>
            </button>
          </div>
        )}
      </div>

      {/* 5. PROMPT INPUT FORM */}
      <div className="bg-slate-950 p-4 border-t border-slate-800 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="relative flex items-end gap-2"
        >
          <div className="relative flex-1">
            <textarea
              ref={inputRef}
              rows={2}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Kimyo bo‘yicha istalgan savol, reaksiya yoki masalani yozing (masalan: '2NaOH + H₂SO₄ reaksiyasi' yoki '50 g kalsiy karbonat massasi')..."
              className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500/60 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/40 resize-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={!inputValue.trim() || loading}
            className="h-12 px-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold transition-all shadow-lg shadow-cyan-500/20 active:scale-95 flex items-center justify-center gap-2 shrink-0"
          >
            <Send className="w-4 h-4 fill-slate-950" />
            <span className="hidden sm:inline text-xs">Yuborish</span>
          </button>
        </form>
        <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 px-1">
          <span>Yuborish uchun <strong>Enter</strong>, yangi qator uchun <strong>Shift+Enter</strong></span>
          <span className="flex items-center gap-1 text-cyan-400">
            <Sparkles className="w-3 h-3" />
            Laboratoriya AI • 24/7 Ilmiy Maslahatchi
          </span>
        </div>
      </div>
    </div>
  );
};
