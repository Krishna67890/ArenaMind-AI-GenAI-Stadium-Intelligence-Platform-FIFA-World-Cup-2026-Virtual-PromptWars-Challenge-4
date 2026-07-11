"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import {
  Accessibility, Eye, Ear,
  Map as MapIcon, Mic, Volume2,
  Navigation, CheckCircle2, ShieldCheck,
  Smartphone
} from "lucide-react";
import { VoiceAssistant } from "@/components/voice/VoiceAssistant";

const AccessibilityPage = () => {
  return (
    <main className="min-h-screen bg-black text-white pt-24" id="main-content">
      <Navbar />

      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold mb-6">
              <Accessibility className="w-4 h-4" />
              <span>INCLUSIVE BY DESIGN</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8">Stadiums for <span className="text-gradient">Everyone.</span></h1>
            <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
              ArenaMind AI is committed to creating an inclusive environment. Our AI-driven
              accessibility features ensure that every fan, regardless of ability, can enjoy
              the tournament with independence and dignity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
             {[
               {
                 title: "Wheelchair Navigation",
                 desc: "AI-optimized routes that prioritize elevators, ramps, and wider corridors with real-time gradient analysis.",
                 icon: Navigation,
                 color: "text-blue-500",
                 bg: "bg-blue-500/10"
               },
               {
                 title: "Visual Assistance",
                 desc: "High-contrast modes, screen reader optimization, and AI-powered audio descriptions of stadium surroundings.",
                 icon: Eye,
                 color: "text-purple-500",
                 bg: "bg-purple-500/10"
               },
               {
                 title: "Hearing Support",
                 desc: "Real-time speech-to-text transcription of all public announcements and dedicated sign-language video assistance.",
                 icon: Ear,
                 color: "text-emerald-500",
                 bg: "bg-emerald-500/10"
               },
               {
                 title: "Voice Control",
                 desc: "Complete hands-free operation of the platform using natural language voice commands via our AI assistant.",
                 icon: Mic,
                 color: "text-red-500",
                 bg: "bg-red-500/10"
               },
               {
                 title: "Haptic Feedback",
                 desc: "Smart device vibrations to alert users of upcoming turns or proximity to key locations like gates and restrooms.",
                 icon: Smartphone,
                 color: "text-orange-500",
                 bg: "bg-orange-500/10"
               },
               {
                 title: "Emergency Priority",
                 desc: "Specific evacuation protocols for individuals requiring assistance, with direct links to medical and security teams.",
                 icon: ShieldCheck,
                 color: "text-cyan-500",
                 bg: "bg-cyan-500/10"
               }
             ].map((feature, i) => (
               <motion.div
                 key={feature.title}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className="glass-card group hover:border-blue-500/30 transition-all"
               >
                 <div className={`w-12 h-12 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                 </div>
                 <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                 <p className="text-sm text-white/40 leading-relaxed">{feature.desc}</p>
               </motion.div>
             ))}
          </div>

          {/* Interactive Accessibility Map Preview */}
          <div className="glass-morphism rounded-[3rem] p-12 border-blue-500/20 relative overflow-hidden">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                   <h2 className="text-3xl font-bold mb-6">Request Assistance</h2>
                   <p className="text-white/60 mb-8">
                      Need a wheelchair, sighted guide, or medical escort? Request it instantly through the app.
                      Our nearest volunteer will be dispatched to your precise GPS location.
                   </p>
                   <div className="space-y-4 mb-8">
                      {[
                        "Dedicated Accessible Parking Spots",
                        "Sensory-Friendly Quiet Rooms",
                        "Elevator Priority Access Keys",
                        "Multilingual Sign Language Support"
                      ].map(item => (
                        <div key={item} className="flex items-center gap-3">
                           <CheckCircle2 className="w-5 h-5 text-blue-500" />
                           <span className="text-sm font-medium">{item}</span>
                        </div>
                      ))}
                   </div>
                   <button className="btn-primary">Book Assistance Now</button>
                </div>
                <div className="relative aspect-square rounded-3xl bg-zinc-900 border border-white/10 overflow-hidden" role="img" aria-label="Interactive map showing volunteer location">
                   <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80')] bg-cover bg-center" aria-hidden="true" />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                         <div className="w-24 h-24 rounded-full bg-blue-500/20 animate-pulse flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center shadow-2xl">
                               <Accessibility className="w-6 h-6 text-white" aria-hidden="true" />
                            </div>
                         </div>
                         <div className="absolute -top-12 -right-12 glass-card p-3 rounded-2xl text-[10px] font-bold uppercase">
                            Volunteer En Route (2m)
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      <Footer />

      <VoiceAssistant />
    </main>
  );
};

export default AccessibilityPage;
