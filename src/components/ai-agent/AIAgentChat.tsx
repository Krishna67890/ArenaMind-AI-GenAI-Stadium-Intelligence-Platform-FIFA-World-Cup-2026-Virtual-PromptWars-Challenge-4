"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, X, Maximize2, Minimize2, Sparkles, Loader2, MessageSquare, Mic } from "lucide-react";
import { askGemini } from "@/services/gemini";
import { useRouter } from "next/navigation";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export const AIAgentChat = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Welcome to the ArenaMind Command Center. I am your FIFA 2026 tactical assistant. How can I help you optimize the stadium experience today?",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { isListening, toggleListening } = useSpeechRecognition((text) => setInput(text));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "How to play football?",
    "Show me Renato Dall'Ara twin",
    "What are the FIFA 2026 host cities?",
    "Check crowd density at Gate B",
    "Generate a matchday itinerary",
    "What is SAOT technology?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await askGemini(input);
      const textContent = response.includes("|") ? response.split("|")[1] : response;

      const assistantMessage: Message = {
        role: "assistant",
        content: textContent,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);

      // Advanced TTS Integration
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(textContent);
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => (v.name.includes("Google") || v.name.includes("Natural")) && v.lang.includes("en"));
        if (preferredVoice) utterance.voice = preferredVoice as SpeechSynthesisVoice;

        utterance.rate = 0.95;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
      }

      if (response.includes("|")) {
          const command = response.split("|")[0];
          window.dispatchEvent(new CustomEvent("arena-command", { detail: command }));

          if (command.startsWith("NAVIGATE_")) {
            const route = command.replace("NAVIGATE_", "").toLowerCase();
            switch(route) {
              case "home": router.push("/"); break;
              case "arena_verse": router.push("/arena-verse"); break;
              case "digital_twin": router.push("/digital-twin"); break;
              case "agents": router.push("/agents"); break;
              case "launch": router.push("/launch-platform"); break;
              case "demo": router.push("/schedule-demo"); break;
              case "menu": router.push("/food-menu"); break;
              case "about": router.push("/about"); break;
              case "profile": router.push("/profile"); break;
              case "dashboard": router.push("/dashboard"); break;
              case "pricing": router.push("/pricing"); break;
              case "features": router.push("/features"); break;
              case "contact": router.push("/contact"); break;
              case "fifa_details": router.push("/fifa-details"); break;
              case "accessibility": router.push("/accessibility"); break;
              case "traffic": router.push("/traffic-prediction"); break;
            }
          }
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Operational Error: Connection to Neural Core lost. Please retry.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-32 right-8 z-[100] w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center group shadow-2xl"
        >
          <div className="absolute inset-0 bg-blue-600/20 rounded-2xl animate-pulse group-hover:bg-blue-600/40 transition-colors" />
          <MessageSquare className="w-6 h-6 text-white relative z-10" aria-hidden="true" />
          <span className="sr-only">Open AI Chat</span>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-black animate-bounce" />
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? "80px" : "600px"
            }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-8 right-8 z-[150] w-[400px] glass-morphism rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-tighter">ArenaMind AI Agent</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Neural Link Active</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                  aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4 text-white/40" /> : <Minimize2 className="w-4 h-4 text-white/40" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/40 hover:text-white"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Suggestions Dropdown */}
                <div className="px-6 py-4 overflow-y-auto max-h-[140px] custom-scrollbar border-b border-white/5 bg-white/5">
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setInput(suggestion);
                          setTimeout(() => {
                             const form = document.getElementById('chat-form') as HTMLFormElement;
                             form?.requestSubmit();
                          }, 100);
                        }}
                        className="flex-grow text-left px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-white/60 hover:text-white hover:border-blue-500/50 transition-all hover:bg-blue-600/5"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Messages */}
                <div
                  className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-hide"
                  aria-live="polite"
                  aria-atomic="false"
                >
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[80%] flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          msg.role === "user" ? "bg-white/10" : "bg-blue-600/20"
                        }`}>
                          {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-blue-500" />}
                        </div>
                        <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "bg-white/5 rounded-tr-none border border-white/10"
                            : "bg-blue-600/10 rounded-tl-none border border-blue-500/20"
                        }`}>
                          {msg.content}
                          <div className="mt-2 text-[8px] font-bold text-white/20 uppercase tracking-widest">
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-blue-600/10 p-4 rounded-2xl rounded-tl-none border border-blue-500/20">
                        <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form id="chat-form" onSubmit={handleSend} className="p-6 bg-white/5 border-t border-white/5">
                  <div className="relative">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about FIFA regulations, crowd flow..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-24 text-sm focus:outline-none focus:border-blue-500/50 transition-all"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={toggleListening}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                          isListening ? "bg-red-500 animate-pulse" : "bg-white/5 hover:bg-white/10"
                        }`}
                        aria-label={isListening ? "Stop listening" : "Start voice input"}
                      >
                        <Mic className={`w-4 h-4 ${isListening ? "text-white" : "text-white/40"}`} aria-hidden="true" />
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-500 transition-all disabled:opacity-50"
                        aria-label="Send message"
                      >
                        <Send className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2 px-2">
                    <Sparkles className="w-3 h-3 text-blue-500" />
                    <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Powered by Gemini-1.5-Flash</p>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
