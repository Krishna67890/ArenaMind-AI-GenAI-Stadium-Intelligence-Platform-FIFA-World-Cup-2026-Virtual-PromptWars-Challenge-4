"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Volume2, VolumeX, Sparkles, X } from "lucide-react";
import { generateOSResponse } from "@/services/gemini";
import { useRouter } from "next/navigation";

interface SpeechRecognitionEvent extends Event {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface ISpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  onresult: (event: SpeechRecognitionEvent) => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
}

export const VoiceAssistant = ({ onCommand }: { onCommand?: (command: string) => void }) => {
  const router = useRouter();
  const [isListening, setIsListening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);

  const introText = "Welcome to ArenaMind AI, the official next-generation command and control center for the FIFA World Cup 2026. I am your specialized AI agent, designed to orchestrate stadium operations across all sixteen host cities. My core functions include real-time spatial intelligence, neural crowd management, and zero-latency accessibility support. How can I assist you in navigating the future of tournament logistics today?";

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      if (!hasInitialized) {
        handleInitialGreeting();
      }
    };
    window.addEventListener("open-voice-assistant", handleOpen);
    return () => window.removeEventListener("open-voice-assistant", handleOpen);
  }, [hasInitialized]);

  const handleInitialGreeting = () => {
    setHasInitialized(true);
    setResponse(introText);
    speak(introText);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).WebKitSpeechRecognition || (window as any).SpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new (SpeechRecognition as any)() as ISpeechRecognition;
        if (recognitionRef.current) {
          recognitionRef.current.continuous = false;
          recognitionRef.current.interimResults = false;

          recognitionRef.current.onresult = async (event: SpeechRecognitionEvent) => {
            const text = event.results[0][0].transcript;
            setTranscript(text);
            handleAIQuery(text);
          };

          recognitionRef.current.onend = () => {
            if (isListening) {
              recognitionRef.current?.start();
            }
          };
        }
      }
    }
  }, [isListening]);

  const handleAIQuery = async (query: string) => {
    setIsProcessing(true);
    try {
      const aiResponse = await generateOSResponse(query);

      if (aiResponse.includes("|")) {
        const [command, text] = aiResponse.split("|");
        setResponse(text);
        speak(text);

        // Navigation Logic
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

        if (onCommand) onCommand(command);
        window.dispatchEvent(new CustomEvent("arena-command", { detail: command }));
      } else {
        setResponse(aiResponse);
        speak(aiResponse);
      }
    } catch (error) {
      setResponse("I'm sorry, I'm having trouble connecting to the ArenaMind core.");
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setTranscript("");
      setResponse("");

      if (!hasInitialized) {
        handleInitialGreeting();
      }

      recognitionRef.current?.start();
      setIsListening(true);
      setIsOpen(true);
    }
  };

  const speak = (text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => (v.name.includes("Google") || v.name.includes("Natural")) && v.lang.includes("en")) || voices[0];
    if (preferredVoice) utterance.voice = preferredVoice as SpeechSynthesisVoice;

    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    window.speechSynthesis.speak(utterance);
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[100] w-16 h-16 rounded-full bg-blue-600 shadow-[0_0_30px_rgba(37,99,235,0.5)] flex items-center justify-center border border-blue-400/50 group"
        aria-label="Open AI Voice Assistant"
      >
        <div className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-20 group-hover:opacity-40" />
        <Sparkles className="w-8 h-8 text-white relative z-10" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-28 right-8 z-[100] w-[350px] glass-morphism rounded-[2.5rem] p-6 cyber-border shadow-2xl overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none opacity-20">
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent animate-scanline" />
            </div>

            <div className="flex justify-between items-center mb-6 relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-white/60">ArenaMind AI Agent</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/20 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="min-h-[160px] mb-6 flex flex-col justify-center text-center relative z-10">
              {isListening ? (
                <div className="space-y-6">
                  <div className="flex justify-center items-end gap-1.5 h-12">
                    {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                      <motion.div
                        key={i}
                        animate={{
                          height: [15, Math.random() * 40 + 20, 15],
                          backgroundColor: ["#3b82f6", "#8b5cf6", "#3b82f6"]
                        }}
                        transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.05 }}
                        className="w-1.5 rounded-full"
                      />
                    ))}
                  </div>
                  <p className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em] animate-pulse">Capturing Audio Stream...</p>
                </div>
              ) : transcript ? (
                <div className="space-y-4 text-left">
                  <div className="p-3 bg-white/5 rounded-2xl border border-white/5 hologram-effect">
                    <p className="text-[10px] text-white/30 mb-1 uppercase font-bold tracking-tighter">Voice Input</p>
                    <p className="text-sm text-white/80 italic">"{transcript}"</p>
                  </div>
                  {isProcessing ? (
                    <div className="flex items-center gap-3 p-3 bg-blue-600/5 rounded-2xl border border-blue-500/10">
                      <Sparkles className="w-4 h-4 text-blue-500 animate-spin" />
                      <span className="text-[10px] font-bold uppercase text-blue-500 tracking-widest">Synthesizing Response...</span>
                    </div>
                  ) : response && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 bg-blue-600/10 rounded-2xl border border-blue-500/20 shadow-[0_0_20px_rgba(37,99,235,0.1)]"
                    >
                      <p className="text-[10px] text-blue-500 mb-2 uppercase font-black tracking-widest">Neural Link Active</p>
                      <p className="text-sm text-white/90 leading-relaxed font-medium">{response}</p>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="py-8">
                   <p className="text-white/60 text-sm font-medium leading-relaxed px-4">
                    "I am synchronized with the stadium grid. Tap the button to initiate voice command."
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={toggleListening}
              className={`w-full py-4 rounded-3xl flex items-center justify-center gap-3 transition-all duration-500 relative group overflow-hidden ${
                isListening
                ? "bg-red-500/10 text-red-500 border border-red-500/20"
                : "bg-blue-600 text-white shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_50px_rgba(37,99,235,0.6)]"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              {isListening ? (
                <><MicOff className="w-5 h-5 animate-bounce" /> <span className="font-bold uppercase tracking-wider">Abort Link</span></>
              ) : (
                <><Mic className="w-5 h-5" /> <span className="font-bold uppercase tracking-wider">Initialize Uplink</span></>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
