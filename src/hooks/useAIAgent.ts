"use client";

import { useState, useEffect, useRef } from "react";
import { askGemini } from "@/services/gemini";
import { useRouter } from "next/navigation";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export const useAIAgent = () => {
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

  return {
    isOpen,
    setIsOpen,
    isMinimized,
    setIsMinimized,
    input,
    setInput,
    messages,
    isLoading,
    isListening,
    toggleListening,
    messagesEndRef,
    suggestions,
    handleSend
  };
};
