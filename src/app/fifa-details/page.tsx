"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import {
  Trophy,
  MapPin,
  Calendar,
  Users,
  ShieldCheck,
  Info,
  ChevronRight,
  Star,
  Zap,
  LayoutDashboard,
  PlayCircle,
  LucideIcon
} from "lucide-react";

const FIFA_DATA = {
  overview: {
    title: "FIFA World Cup 2026",
    description: "The 23rd FIFA World Cup will be the biggest in history, featuring 48 teams across three host nations: Canada, Mexico, and the United States.",
    stats: [
      { label: "Host Cities", value: "16" },
      { label: "Total Matches", value: "104" },
      { label: "Nations", value: "48" },
      { label: "Venues", value: "16" },
    ]
  },
  matches: [
    {
      id: 1,
      stage: "Opening Match",
      date: "June 11, 2026",
      venue: "Stadio Renato Dall'Ara",
      city: "Bologna, Italy",
      teams: ["Italy", "TBD"],
      prediction: { winner: "Italy", probability: "68%", factor: "Home Advantage" }
    },
    {
      id: 2,
      stage: "Group Stage",
      date: "June 12, 2026",
      venue: "SoFi Stadium",
      city: "Los Angeles",
      teams: ["USA", "TBD"],
      prediction: { winner: "USA", probability: "72%", factor: "Squad Depth" }
    },
    {
      id: 3,
      stage: "Group Stage",
      date: "June 12, 2026",
      venue: "Stadium Mordovia",
      city: "Saransk, Russia",
      teams: ["Russia", "TBD"],
      prediction: { winner: "Russia", probability: "55%", factor: "Dynamic Offense" }
    },
    {
      id: 4,
      stage: "Final Match",
      date: "July 19, 2026",
      venue: "Stadium Mordovia",
      city: "Saransk, Russia",
      teams: ["TBD", "TBD"],
      prediction: { winner: "Brazil", probability: "12%", factor: "Historical Form" }
    },
  ],
  rules: [
    { title: "Tournament Format", description: "48 teams divided into 12 groups of four. Top two from each group and the eight best third-placed teams advance to the Round of 32." },
    { title: "Substitution Rules", description: "Teams are allowed up to five substitutions per match, with an additional one in extra time." },
    { title: "VAR & Technology", description: "Semi-automated offside technology and enhanced VAR will be deployed in all 16 venues." },
  ]
};

export default function FifaDetailsPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-[1200px] mx-auto">
        <header className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="px-3 py-1 bg-blue-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                  Official Tournament Guide
                </div>
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              </div>
              <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.8]">
                FIFA <span className="text-gradient">2026</span>
              </h1>
            </div>

            <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-xl">
              {["overview", "matches", "rules"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                    activeTab === tab ? "bg-blue-600 text-white shadow-lg" : "text-white/40 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </motion.div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2 space-y-8">
                <div className="glass-morphism p-10 rounded-[3rem] border-white/10">
                  <h2 className="text-3xl font-black italic uppercase mb-6 flex items-center gap-4">
                    <Trophy className="w-8 h-8 text-blue-500" />
                    Tournament Vision
                  </h2>
                  <p className="text-xl text-white/60 leading-relaxed mb-8">
                    {FIFA_DATA.overview.description}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {FIFA_DATA.overview.stats.map((stat, i) => (
                      <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/5">
                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                        <p className="text-3xl font-black italic text-blue-500">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <FeatureCard
                    icon={MapPin}
                    title="Three Host Nations"
                    desc="Canada, Mexico, and USA unite to host the first-ever 48-team tournament."
                   />
                   <FeatureCard
                    icon={Users}
                    title="Global Impact"
                    desc="Expected to be the most-watched sporting event in human history."
                   />
                </div>
              </div>

              <div className="space-y-8">
                 <div className="glass-morphism p-8 rounded-[2rem] border-blue-500/20 bg-blue-600/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                      <Zap className="w-32 h-32 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 relative z-10">ArenaMind Integration</h3>
                    <p className="text-sm text-white/50 leading-relaxed mb-6 relative z-10">
                      Our AI Smart Stadium OS is being optimized for all 16 venues to ensure seamless operations and security.
                    </p>
                    <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-500 hover:text-blue-400 transition-colors">
                      Learn More <ChevronRight className="w-4 h-4" />
                    </button>
                 </div>

                 <div className="glass-morphism p-8 rounded-[2rem] border-white/10">
                    <h3 className="text-lg font-bold mb-6">Tournament Timeline</h3>
                    <div className="space-y-6">
                       {[
                         { date: "June 11", event: "Opening Ceremony", status: "Stadio Renato Dall'Ara" },
                         { date: "June 25", event: "Group Stage Ends", status: "All Venues" },
                         { date: "July 19", event: "World Cup Final", status: "Stadium Mordovia" },
                       ].map((item, i) => (
                         <div key={i} className="flex gap-4">
                            <div className="flex flex-col items-center">
                               <div className="w-2 h-2 rounded-full bg-blue-500" />
                               {i !== 2 && <div className="w-[1px] h-full bg-white/10 my-1" />}
                            </div>
                            <div>
                               <p className="text-[10px] font-bold text-blue-500 uppercase">{item.date}</p>
                               <p className="text-sm font-bold">{item.event}</p>
                               <p className="text-[10px] text-white/30 uppercase tracking-tighter">{item.status}</p>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            </motion.div>
          )}

          {activeTab === "matches" && (
            <motion.div
              key="matches"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {FIFA_DATA.matches.map((match) => (
                <div key={match.id} className="glass-morphism p-8 rounded-[2.5rem] border-white/10 hover:border-blue-500/50 transition-all group relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4">
                      <div className="flex flex-col items-end">
                        <span className="text-[8px] font-bold text-blue-400 uppercase tracking-widest">AI Prediction</span>
                        <span className="text-sm font-black text-white italic">{match.prediction.winner} Win</span>
                      </div>
                   </div>

                   <div className="flex justify-between items-start mb-6">
                      <div>
                        <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3">
                           {match.stage}
                        </div>
                        <h3 className="text-2xl font-black italic uppercase group-hover:text-blue-500 transition-colors">
                           {match.venue}
                        </h3>
                      </div>
                      <div className="text-right mt-12 md:mt-0">
                         <p className="text-xs font-bold text-white/40 uppercase tracking-widest">{match.city}</p>
                         <p className="text-lg font-black italic text-blue-500">{match.date}</p>
                      </div>
                   </div>

                   <div className="flex items-center gap-6 mb-8">
                      <div className="flex-1 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                           <span className="text-xs font-bold">{match.teams[0]}</span>
                        </div>
                        <span className="text-[10px] font-bold uppercase text-white/40">Home</span>
                      </div>
                      <div className="text-2xl font-black italic text-white/20">VS</div>
                      <div className="flex-1 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                           <span className="text-xs font-bold">{match.teams[1]}</span>
                        </div>
                        <span className="text-[10px] font-bold uppercase text-white/40">Away</span>
                      </div>
                   </div>

                   <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-4 mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Win Probability</span>
                        <span className="text-xs font-black text-blue-500">{match.prediction.probability}</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: match.prediction.probability }}
                          className="h-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"
                        />
                      </div>
                      <p className="text-[10px] text-white/40 mt-2 uppercase italic tracking-tighter">
                        Key Factor: {match.prediction.factor}
                      </p>
                   </div>

                   <div className="flex items-center justify-between pt-6 border-t border-white/5">
                      <div className="flex -space-x-3">
                         {[1, 2, 3].map((i) => (
                           <div key={i} className="w-8 h-8 rounded-full bg-white/10 border-2 border-black flex items-center justify-center">
                              <Star className="w-3 h-3 text-yellow-400" />
                           </div>
                         ))}
                      </div>
                      <button className="px-6 py-2 bg-white/5 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center gap-2">
                        View ArenaVerse <PlayCircle className="w-4 h-4" />
                      </button>
                   </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "rules" && (
            <motion.div
              key="rules"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {FIFA_DATA.rules.map((rule, i) => (
                <div key={i} className="glass-morphism p-10 rounded-[3rem] border-white/10 flex flex-col md:flex-row gap-8 items-center">
                   <div className="w-20 h-20 rounded-[1.5rem] bg-blue-600/10 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-10 h-10 text-blue-500" />
                   </div>
                   <div>
                      <h3 className="text-2xl font-black italic uppercase mb-3">{rule.title}</h3>
                      <p className="text-white/50 text-lg leading-relaxed">{rule.description}</p>
                   </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const FeatureCard = ({ icon: Icon, title, desc }: FeatureCardProps) => {
  return (
    <div className="glass-morphism p-8 rounded-[2.5rem] border-white/10 hover:border-blue-500/30 transition-all">
      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
        <Icon className="w-6 h-6 text-blue-500" />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-sm text-white/40 leading-relaxed">{desc}</p>
    </div>
  );
};
