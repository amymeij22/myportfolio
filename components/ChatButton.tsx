"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { useTheme } from 'next-themes';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [chatContext, setChatContext] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Untuk memastikan komponen dimount sebelum mengakses theme
  useEffect(() => setMounted(true), []);

  // Auto scroll to bottom when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load messages from local storage when component mounts
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        // Convert string dates back to Date objects
        const messagesWithDates = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(messagesWithDates);
        
        // Extract chat context from the messages
        const contexts = parsedMessages
          .map((msg: any) => `${msg.sender === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
          .slice(-5); // Keep only the last 5 messages for context
        setChatContext(contexts);
      } catch (error) {
        console.error('Error parsing saved messages:', error);
      }
    }
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

  // Toggle chat window
  const toggleChat = () => {
    setIsOpen(!isOpen);
    
    // Menambahkan pesan pembuka dari bot jika ini pertama kali chat dibuka dan belum ada pesan
    if (!isOpen && messages.length === 0) {
      setMessages([
        {
          id: Date.now().toString(),
          content: 'Halo! Saya asisten virtual Yasir. Ada yang bisa saya bantu tentang Yasir atau portofolionya?',
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
      id: Date.now().toString(),
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

      // Mengirim permintaan ke API endpoint dengan context
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: newMessage,
          context: updatedContext 
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal mendapatkan respons');
      }

      const data = await response.json();

      // Format teks untuk membuat ** menjadi bold
      const formattedResponse = formatBoldText(data.response);

      // Menambahkan respons bot ke state
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: formattedResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      // Update context with bot response
      setChatContext([...updatedContext, `Assistant: ${data.response}`].slice(-5));
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error saat mengirim pesan:', error);
      
      // Pesan error
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Maaf, terjadi kesalahan. Silakan coba lagi nanti.',
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
        id: Date.now().toString(),
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

  // URL logo berdasarkan tema
  const logoUrl = mounted && theme === "dark" 
    ? "https://1h1v9ndzh4okzjrr.public.blob.vercel-storage.com/dark-icon-L4NkA4vRax43syY662ZzUSbJJl0hXE.png" 
    : "https://1h1v9ndzh4okzjrr.public.blob.vercel-storage.com/light-icon-lXlcWDU3iByqVcjnoHVSUaZAOt8jZK.png";

  return (
    <>
      {/* Tombol chat yang mengambang - vertikal minimalis dengan panjang lebih */}
      <AnimatePresence>
        {isButtonVisible && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50"
          >
            <Button
              onClick={toggleChat}
              className={`bg-primary hover:bg-primary/90 text-primary-foreground rounded-l-lg rounded-r-none px-2 py-12 shadow-lg group flex flex-col items-center ${!isOpen ? 'chat-pulse' : ''}`}
            >
              {isOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <>
                  <div className="vertical-text font-medium group-hover:translate-y-1 transition-transform">
                    KNOW ME!
                  </div>
                </>
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Window chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 25 }}
            className="fixed right-4 sm:right-6 bottom-4 sm:bottom-6 w-[90vw] sm:w-[400px] h-[500px] bg-card rounded-xl shadow-2xl border border-border/30 backdrop-blur-sm z-50 flex flex-col overflow-hidden"
          >
            {/* Header chat */}
            <div className="bg-primary p-4 text-primary-foreground flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-8 w-8 mr-3 border-2 border-primary-foreground overflow-hidden rounded-full flex-shrink-0 flex items-center justify-center">
                  {mounted && (
                    <Image 
                      src={logoUrl}
                      alt="Yasir"
                      width={32}
                      height={32}
                      className="w-full h-auto object-contain"
                    />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">Yasir&apos;s Assistant</h3>
                  <p className="text-xs opacity-80">Siap membantu menjawab pertanyaan Kamu</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={refreshConversation}
                  title="Refresh percakapan"
                  className="text-primary-foreground hover:bg-primary/90 rounded-full h-8 w-8"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleChat}
                  className="text-primary-foreground hover:bg-primary/90 rounded-full h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Body chat - pesan */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-card/50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground rounded-tr-none message-bubble-in'
                        : 'bg-muted rounded-tl-none message-bubble-out'
                    } break-words`}
                  >
                    {message.sender === 'bot' 
                      ? renderFormattedContent(message.content)
                      : <p className="text-sm overflow-hidden break-words">{message.content}</p>
                    }
                    <span className="text-[10px] opacity-70 block text-right mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-muted rounded-tl-none flex items-center message-bubble-out">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    <p className="text-sm">Mengetik...</p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Footer chat - input pesan dengan tombol sejajar */}
            <form onSubmit={handleSubmit} className="p-3 border-t bg-background">
              <div className="flex items-center gap-2">
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Tanya sesuatu tentang Yasir..."
                  className="min-h-[40px] max-h-32 resize-none bg-muted py-2"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={isLoading || !newMessage.trim()}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-10 w-10 p-0 flex-shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 