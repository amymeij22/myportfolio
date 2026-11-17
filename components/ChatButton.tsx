"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, RefreshCw, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

type StoredMessage = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: string | number;
};

const emptySubscribe = () => () => { };

export default function ChatButton() {
  const { locale, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [chatContext, setChatContext] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const idCounterRef = useRef(0);
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const isDesktop = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("resize", onStoreChange);
      return () => window.removeEventListener("resize", onStoreChange);
    },
    () => (typeof window !== "undefined" ? window.innerWidth >= 1024 : false),
    () => false
  );

  const nextMessageId = () => {
    idCounterRef.current += 1;
    return `msg-${idCounterRef.current}`;
  };

  // Auto scroll to bottom when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load messages from local storage when component mounts
  useEffect(() => {
    queueMicrotask(() => {
      const savedMessages = localStorage.getItem('chatMessages');
      if (!savedMessages) return;
      try {
        const parsedMessages = JSON.parse(savedMessages) as StoredMessage[];
        const messagesWithDates = parsedMessages.map((msg) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
        setMessages(messagesWithDates);

        const contexts = parsedMessages
          .map((msg) => `${msg.sender === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
          .slice(-5);
        setChatContext(contexts);
      } catch (error) {
        console.error('Error parsing saved messages:', error);
      }
    });
  }, []);

  // Save messages to local storage when they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  // Efek untuk menampilkan button setelah scroll tertentu
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsButtonVisible(true);
      } else {
        setIsButtonVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Muncul setelah 3 detik meskipun belum scroll
    const timer = setTimeout(() => {
      setIsButtonVisible(true);
    }, 3000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Toggle chat window
  const toggleChat = () => {
    setIsOpen(!isOpen);

    // Menambahkan pesan pembuka dari bot jika ini pertama kali chat dibuka dan belum ada pesan
    if (!isOpen && messages.length === 0) {
      setMessages([
        {
          id: nextMessageId(),
          content: 'Halo! Saya asisten virtual Yasir. Ada yang bisa saya bantu tentang latar belakang, riset instrumentasi, proyek rekayasa, atau portofolio Yasir?',
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    }
  };

  // Mengirim pesan
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    // Menambahkan pesan pengguna ke state
    const userMessage: Message = {
      id: nextMessageId(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setNewMessage('');
    setIsLoading(true);

    try {
      // Update context with the new user message
      const updatedContext = [...chatContext, `User: ${newMessage}`].slice(-5);
      setChatContext(updatedContext);

      // Mengirim permintaan ke API endpoint dengan context & locale
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: newMessage,
          context: updatedContext,
          locale: locale
        }),
      });

      const contentType = response.headers.get('content-type') || '';

      // Tangani error HTTP (termasuk HTML 502/504 dari proxy) maupun respons JSON non-stream
      if (!response.ok || contentType.includes('application/json') || !response.body) {
        const data = contentType.includes('application/json')
          ? await response.json().catch(() => null)
          : null;

        if (!response.ok) {
          const friendlyNotice =
            (data && (data.error || data.response)) ||
            (locale === 'en'
              ? 'Sorry, the assistant needs a brief moment due to server traffic 😊 Please wait a few seconds and send again.'
              : 'Maaf ya, asisten lagi butuh jeda sebentar karena antrean server 😊 Silakan tunggu beberapa saat lalu kirim ulang ya.');

          const noticeMessage: Message = {
            id: nextMessageId(),
            content: formatBoldText(friendlyNotice),
            sender: 'bot',
            timestamp: new Date(),
          };

          setMessages(prevMessages => [...prevMessages, noticeMessage]);
          return;
        }

        const rawBotText =
          data?.response ||
          (locale === 'en'
            ? 'Sorry, the assistant needs a brief moment 😊 Please try sending your question again.'
            : 'Maaf ya, asisten lagi butuh jeda sebentar 😊 Silakan coba kirim ulang pertanyaanmu ya.');

        const botMessage: Message = {
          id: nextMessageId(),
          content: formatBoldText(rawBotText),
          sender: 'bot',
          timestamp: new Date(),
        };

        setChatContext([...updatedContext, `Assistant: ${rawBotText}`].slice(-5));
        setMessages(prevMessages => [...prevMessages, botMessage]);
        return;
      }

      // Streaming mode: tampilkan teks asisten secara real-time saat chunk pertama tiba
      const botMessageId = nextMessageId();
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = '';
      let hasStartedBubble = false;

      const upsertStreamingBubble = (formatted: string) => {
        if (!hasStartedBubble) {
          hasStartedBubble = true;
          setIsLoading(false);
          setMessages(prevMessages => [
            ...prevMessages,
            {
              id: botMessageId,
              content: formatted,
              sender: 'bot',
              timestamp: new Date(),
            },
          ]);
        } else {
          setMessages(prevMessages =>
            prevMessages.map(msg =>
              msg.id === botMessageId ? { ...msg, content: formatted } : msg
            )
          );
        }
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        if (!chunk) continue;

        accumulatedText += chunk;
        upsertStreamingBubble(formatBoldText(accumulatedText));
      }

      const finalChunk = decoder.decode();
      if (finalChunk) {
        accumulatedText += finalChunk;
      }

      if (!accumulatedText.trim()) {
        accumulatedText =
          'Maaf ya, asisten sedang butuh waktu memproses pertanyaan tersebut 😊 Silakan coba kirim ulang ya.';
      }

      upsertStreamingBubble(formatBoldText(accumulatedText));
      setChatContext([...updatedContext, `Assistant: ${accumulatedText}`].slice(-5));
    } catch {
      // Pesan error jaringan yang ramah tanpa membocorkan detail teknis
      const errorMessage: Message = {
        id: nextMessageId(),
        content:
          'Ups, koneksi internet ke asisten lagi kurang stabil nih 😅 Coba kirim ulang pertanyaanmu sebentar lagi ya, atau hubungi Yasir langsung lewat formulir kontak.',
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh percakapan
  const refreshConversation = () => {
    setMessages([
      {
        id: nextMessageId(),
        content: 'Halo! Saya asisten virtual Yasir. Ada yang bisa saya bantu tentang Yasir atau portofolionya?',
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
    setChatContext([]);
    localStorage.removeItem('chatMessages');
  };

  // Format teks untuk mengubah **text** menjadi <b>text</b> dan URL menjadi link
  const formatBoldText = (text: string): string => {
    let formattedText = text;

    // Format bold text
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

    // Pola untuk "*Instagram: [URL](URL)" - menggunakan fungsi replacer khusus
    const socialMediaPattern = /\*\s+([\w\s]+):\s+\[(https?:\/\/[^\]]+)\]\((https?:\/\/[^)]+)\)/g;
    formattedText = formattedText.replace(socialMediaPattern, (match, platform, displayUrl, actualUrl) => {
      return `• <b>${platform}:</b> <a href="${actualUrl}" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">${platform}</a>`;
    });

    // Pola untuk "*Instagram: URL" - list sosial media biasa
    formattedText = formattedText.replace(/\*\s+([\w\s]+):\s+(https?:\/\/[^\s]+)/g, (match, platform, url) => {
      return `• <b>${platform}:</b> <a href="${url}" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">${platform}</a>`;
    });

    // Format URL dalam format markdown [label](url)
    formattedText = formattedText.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, label, url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">${label}</a>`;
    });

    // Ubah URL standalone menjadi tautan
    const urlRegex = /https?:\/\/[^\s<>)"']+/g;
    formattedText = formattedText.replace(urlRegex, (match) => {
      // Periksa apakah URL ini berada dalam tag HTML <a>
      // Jika kita mendapati 'href="' sebelum URL, kemungkinan URL sudah ada di anchor tag
      const beforeMatch = formattedText.substring(Math.max(0, formattedText.indexOf(match) - 20), formattedText.indexOf(match));
      if (beforeMatch.includes('href="')) {
        return match; // Biarkan URL ini karena sudah dalam tag anchor
      }
      return `<a href="${match}" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">${match}</a>`;
    });

    return formattedText;
  };

  // Render konten dengan format HTML untuk bold text
  const renderFormattedContent = (content: string) => {
    return <p className="text-sm" dangerouslySetInnerHTML={{ __html: content }} />;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  // Handle key press (Enter untuk kirim)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // URL logo chatbot (tema tunggal)
  const logoUrl = "/icon-192x192.png";

  return (
    <>
      {/* Floating Trigger Tab at the Right Screen Edge (Old Portfolio Style) */}
      <AnimatePresence>
        {isButtonVisible && !isOpen && (
          <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 60 }}
              transition={{ duration: 0.3 }}
              className="pointer-events-auto"
            >
              <button
                onClick={toggleChat}
                className="chat-pulse bg-[#214A40] hover:bg-[#1a3c34] text-white rounded-l-xl rounded-r-none px-1.5 sm:px-2.5 py-4 sm:py-7 shadow-xl border-l border-t border-b border-[#DEE4DC]/30 group flex flex-col items-center gap-1.5 sm:gap-2 cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary select-none"
                aria-label={t("chat.openAria")}
              >
                {/* Subtle Glowing Lime Dot Indicator */}
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#C7E76A] group-hover:scale-125 transition-transform shadow-[0_0_8px_#C7E76A]"
                  aria-hidden="true"
                />
                <span className="vertical-text font-mono text-[10px] sm:text-xs font-semibold tracking-[0.14em] sm:tracking-[0.16em] text-white/95 group-hover:text-white transition-colors">
                  {t("chat.trigger")}
                </span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Dimmed Backdrop overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`fixed inset-0 z-50 ${isDesktop ? 'bg-black/15 backdrop-blur-[1px]' : 'bg-black/40 backdrop-blur-xs'}`}
            onClick={toggleChat}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* AI Assistant Modal (Desktop: Right-Edge Slider | Non-Desktop: Pas di Tengah Layar) */}
      <AnimatePresence>
        {isOpen && (
          <div
            className={`fixed z-50 pointer-events-none ${
              isDesktop
                ? "right-0 lg:right-3 top-1/2 -translate-y-1/2 flex justify-end items-center"
                : "inset-0 flex items-center justify-center p-3 sm:p-5"
            }`}
          >
            <motion.div
              initial={isDesktop ? { opacity: 0, x: "110%" } : { opacity: 0, scale: 0.93, y: 15 }}
              animate={isDesktop ? { opacity: 1, x: 0 } : { opacity: 1, scale: 1, y: 0 }}
              exit={isDesktop ? { opacity: 0, x: "110%" } : { opacity: 0, scale: 0.93, y: 15 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={`pointer-events-auto bg-[#F7F7F2] shadow-2xl border border-[#DEE4DC] flex flex-col overflow-hidden ${
                isDesktop
                  ? "w-[420px] max-w-[calc(100vw-12px)] h-[min(620px,calc(100dvh-28px))] rounded-l-2xl lg:rounded-2xl"
                  : "w-full max-w-[420px] h-[min(600px,calc(100dvh-32px))] rounded-2xl mx-auto"
              }`}
              role="dialog"
              aria-label={t("chat.assistantTitle")}
              aria-modal="true"
            >
            {/* Header chat */}
            <div className="bg-[#214A40] px-4 py-3.5 sm:px-5 sm:py-4 text-white flex items-center justify-between shrink-0 shadow-sm border-b border-[#DEE4DC]/20">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-9 w-9 rounded-lg overflow-hidden shrink-0 border-[1.5px] border-white shadow-xs">
                  {mounted && (
                    <Image
                      src={logoUrl}
                      alt="Yasir"
                      width={36}
                      height={36}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-sans font-bold text-sm sm:text-[15px] text-white tracking-tight truncate">
                      {t("chat.assistantTitle")}
                    </h3>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C7E76A] shrink-0" aria-hidden="true" />
                  </div>
                  <p className="text-[11px] sm:text-xs text-white/80 font-sans truncate">
                    {t("chat.assistantSubtitle")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={refreshConversation}
                  title={t("chat.refreshTitle")}
                  aria-label={t("chat.refreshTitle")}
                  className="text-white/80 hover:text-white hover:bg-white/10 rounded-full h-8 w-8 transition-colors"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleChat}
                  title={t("chat.closeTitle")}
                  aria-label={t("chat.closeTitle")}
                  className="text-white/80 hover:text-white hover:bg-white/10 rounded-full h-8 w-8 transition-colors"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Body chat - pesan */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-[#F7F7F2]">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[84%] rounded-2xl px-4 py-2.5 shadow-xs ${
                      message.sender === 'user'
                        ? 'bg-[#214A40] text-white rounded-tr-sm message-bubble-in'
                        : 'bg-white text-[#1D2925] border border-[#DEE4DC] rounded-tl-sm message-bubble-out'
                    } break-words`}
                  >
                    {message.sender === 'bot' ? (
                      <div className="text-sm font-sans leading-relaxed text-[#1D2925]">
                        {renderFormattedContent(message.content)}
                      </div>
                    ) : (
                      <p className="text-sm font-sans leading-relaxed text-white">
                        {message.content}
                      </p>
                    )}
                    <span
                      className={`text-[10px] font-mono block text-right mt-1.5 ${
                        message.sender === 'user' ? 'text-[#C7E76A]/85' : 'text-[#68736D]'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[84%] rounded-2xl rounded-tl-sm px-4 py-3 bg-white border border-[#DEE4DC] flex items-center gap-2 shadow-xs message-bubble-out">
                    <Loader2 className="h-4 w-4 animate-spin text-[#214A40]" />
                    <p className="text-xs font-sans text-[#68736D]">{t("chat.typing")}</p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Footer chat - input pesan */}
            <form onSubmit={handleSubmit} className="p-3 sm:p-3.5 border-t border-[#DEE4DC] bg-white shrink-0">
              <div className="flex items-end gap-2">
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder={t("chat.placeholder")}
                  className="min-h-[44px] max-h-28 resize-none bg-[#F7F7F2] text-[#1D2925] placeholder:text-[#68736D] border-[#DEE4DC] focus-visible:ring-1 focus-visible:ring-[#214A40] text-sm py-2.5 px-3 rounded-xl"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={isLoading || !newMessage.trim()}
                  aria-label="Kirim pesan"
                  className="bg-[#214A40] hover:bg-[#1a3c34] text-white rounded-xl h-[44px] w-[44px] p-0 shrink-0 transition-colors disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-[#68736D] px-1">
                <span>{t("chat.poweredBy")}</span>
                <span>{t("chat.pressEnter")}</span>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
    </>
  );
} 