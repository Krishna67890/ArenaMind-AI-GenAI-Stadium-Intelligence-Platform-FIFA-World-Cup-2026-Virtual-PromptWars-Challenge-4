"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import {
  Zap,
  Shield,
  Cpu,
  Globe,
  Eye,
  Layers,
  Activity,
  Lock,
  MessageSquare,
  Navigation,
  Smartphone,
  BarChart3
} from "lucide-react";

const FEATURES = [
  {
    icon: Eye,
    title: "ArenaVerse Digital Twin",
    desc: "A high-fidelity 3D replica of the stadium ecosystem, allowing real-time monitoring of every seat, exit, and infrastructure node.",
    category: "Visualization"
  },
  {
    icon: Shield,
    title: "Multi-Agent Security",
    desc: "Autonomous AI agents that coordinate crowd control, detect anomalies, and predict potential security breaches before they occur.",
    category: "Safety"
  },
  {
    icon: Cpu,
    title: "Gemini Copilot",
    desc: "Strategic command-and-control AI that provides instant operational insights, matchday itineraries, and emergency protocols.",
    category: "AI"
  },
  {
    icon: Activity,
    title: "Real-time Biometrics",
    desc: "Privacy-first facial recognition and heat-mapping to monitor crowd density and flow across all stadium sectors.",
    category: "Monitoring"
  },
  {
    icon: Navigation,
    title: "Neural Wayfinding",
    desc: "Augmented reality guidance for fans, optimizing stadium entry/exit and reducing congestion in high-traffic corridors.",
    category: "Fan Experience"
  },
  {
    icon: Lock,
    title: "Cyber-Physical Defense",
    desc: "Hardened security for stadium IoT networks, protecting critical infrastructure from digital and physical threats.",
    category: "Infrastructure"
  }
];

export default function FeaturesPage() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-[1200px] mx-auto">
        <header className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full mb-8">
              <Zap className="w-4 h-4 text-blue-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">System Capabilities</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase mb-6 leading-[0.8]">
              Technological <span className="text-gradient">Superiority</span>
            </h1>
            <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed">
              ArenaMind AI is the world's first multi-agent spatial intelligence platform designed specifically for the scale and complexity of FIFA 2026.
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-morphism p-10 rounded-[3rem] border-white/10 hover:border-blue-500/50 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] group-hover:scale-150 transition-all duration-700">
                <feature.icon className="w-32 h-32" />
              </div>

              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-blue-600 transition-colors">
                <feature.icon className="w-7 h-7 text-white/40 group-hover:text-white" />
              </div>

              <p className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.3em] mb-3">
                {feature.category}
              </p>
              <h3 className="text-2xl font-black italic uppercase mb-4 tracking-tighter">
                {feature.title}
              </h3>
              <p className="text-white/40 leading-relaxed text-sm">
                {feature.desc}
              </p>

              <div className="mt-8 pt-8 border-t border-white/5">
                 <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 group-hover:text-white transition-colors">
                    Technical Specs <Layers className="w-3 h-3" />
                 </button>
              </div>
            </motion.div>
          ))}
        </div>

        <section className="mt-32">
           <div className="glass-morphism p-12 md:p-20 rounded-[4rem] border-white/10 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10 text-center relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-8">
                  Ready for <span className="text-gradient">Deployment</span>
                </h2>
                <p className="text-white/50 text-lg max-w-xl mx-auto mb-12">
                  Integrated with existing stadium infrastructure via our Neural Bridge API. Zero-downtime implementation for FIFA venues.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                   <Link href={user ? "/schedule-demo" : "/login"}>
                    <button className="px-12 py-5 bg-blue-600 rounded-[2rem] font-black uppercase tracking-widest text-sm shadow-2xl hover:bg-blue-500 transition-all">
                        Schedule Demo
                    </button>
                   </Link>
                   <button className="px-12 py-5 bg-white/5 border border-white/10 rounded-[2rem] font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all">
                      Developer Docs
                   </button>
                </div>
              </div>
           </div>
        </section>
      </main>
    </div>
  );
}
