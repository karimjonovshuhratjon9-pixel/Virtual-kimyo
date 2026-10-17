export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

const STORAGE_KEY = 'laboratorya_ai_chat_history_v1';

export const aiService = {
  getStoredHistory(): ChatMessage[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to load chat history', e);
    }
    return [
      {
        id: 'welcome-msg',
        role: 'model',
        content: `Assalomu alaykum! Men **Al-Kimyogar AI** — kimyo bo‘yicha aqlli va chaqqon yordamchingizman.

Menga istalgan oddiy yoki murakkab savolingizni berishingiz mumkin:
- 💬 **Oddiy savollar:** *"Salom"*, *"Tuz nima?"*, *"Suv formulasi"*, *"Havo tarkibi"*
- 🧪 **Reaksiyalar:** Tenglashtirish, sharoitlar, cho‘kma va gazlar
- ⚖️ **Masalalar:** Molyar massa, foiz konsentratsiyasi, gazlar hajmi va unum
- ⚛️ **Atom tuzilishi & Darslar:** 7–11-sinf kimyo mavzulari

Qanday savolingiz bor? Marhamat, so‘rang!`,
        timestamp: Date.now(),
      },
    ];
  },

  saveHistory(history: ChatMessage[]) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(-30)));
    } catch (e) {
      console.error('Failed to save chat history', e);
    }
  },

  clearHistory() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear chat history', e);
    }
  },

  async askQuestion(message: string, history: ChatMessage[]): Promise<string> {
    const formattedHistory = history
      .filter((m) => m.id !== 'welcome-msg')
      .map((m) => ({
        role: m.role,
        content: m.content,
      }));

    const response = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        history: formattedHistory,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Server bilan bog‘lanishda xatolik yuz berdi.');
    }

    const data = await response.json();
    return data.reply || 'Javob shakllantirilmadi.';
  },

  async streamQuestion(
    message: string,
    history: ChatMessage[],
    onChunk: (accumulatedText: string) => void
  ): Promise<string> {
    const formattedHistory = history
      .filter((m) => m.id !== 'welcome-msg')
      .map((m) => ({
        role: m.role,
        content: m.content,
      }));

    const response = await fetch('/api/ai/chat?stream=true', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream',
      },
      body: JSON.stringify({
        message,
        history: formattedHistory,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Server bilan bog‘lanishda xatolik yuz berdi.');
    }

    if (!response.body) {
      return this.askQuestion(message, history);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let accumulatedText = '';
    let buffer = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine || !trimmedLine.startsWith('data:')) continue;

          const dataStr = trimmedLine.replace(/^data:\s*/, '');
          if (dataStr === '[DONE]') {
            return accumulatedText;
          }

          try {
            const parsed = JSON.parse(dataStr);
            if (parsed.text) {
              accumulatedText += parsed.text;
              onChunk(accumulatedText);
            }
          } catch {
            // Partial JSON chunk, continue
          }
        }
      }
    } catch (streamErr) {
      console.warn('Stream reading interrupted, returning collected text:', streamErr);
    }

    return accumulatedText || this.askQuestion(message, history);
  },
};
