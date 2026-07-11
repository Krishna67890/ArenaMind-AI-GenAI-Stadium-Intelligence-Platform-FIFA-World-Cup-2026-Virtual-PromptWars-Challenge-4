"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import { Check, Zap, Shield, Crown, Globe, Cpu } from "lucide-react";

const PLANS = [
  {
    name: "Base Camp",
    price: "49,999",
    desc: "Essential AI monitoring for regional venues and qualifying stadiums.",
    icon: Shield,
    features: [
      "3D Digital Twin (Standard)",
      "Multi-agent Crowd Simulation",
      "Incident Management System",
      "Real-time Heatmapping",
      "24/7 Neural Support"
    ]
  },
  {
    name: "Apex Arena",
    price: "199,999",
    desc: "Full-scale OS for major FIFA 2026 venues and high-occupancy arenas.",
    icon: Zap,
    popular: true,
    features: [
      "Everything in Base Camp",
      "Gemini Command Copilot",
      "Biometric Flow Analytics",
      "Predictive Security AI",
      "Neural Wayfinding API",
      "Hardware Acceleration"
    ]
  },
  {
    name: "Nexus Global",
    price: "Custom",
    desc: "Interconnected multi-stadium network for nation-wide tournament ops.",
    icon: Crown,
    features: [
      "Everything in Apex Arena",
      "Cross-Stadium Intelligence",
      "National Security Uplink",
      "Custom Agent Training",
      "White-label HUD Experience",
      "On-site Neural Engineers"
    ]
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-[1200px] mx-auto">
        <header className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase mb-6 leading-[0.8]">
              Scale your <span className="text-gradient">Intelligence</span>
            </h1>
            <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed">
              Transparent, performance-based investment models for the next generation of stadium operations.
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PLANS.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`glass-morphism p-10 rounded-[3.5rem] border-white/10 relative flex flex-col ${
                plan.popular ? "border-blue-500/50 shadow-[0_0_80px_rgba(37,99,235,0.15)] bg-blue-600/5" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-blue-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">
                  Recommended for FIFA 2026
                </div>
              )}

              <div className="flex justify-between items-start mb-10">
                 <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center">
                    <plan.icon className={`w-8 h-8 ${plan.popular ? "text-blue-500" : "text-white/30"}`} />
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1">{plan.name}</p>
                    <div className="flex items-end gap-1">
                       <span className="text-sm font-bold text-white/40 mb-2">$</span>
                       <span className="text-5xl font-black italic uppercase tracking-tighter">{plan.price}</span>
                       {plan.price !== "Custom" && <span className="text-xs font-bold text-white/20 mb-2">/YR</span>}
                    </div>
                 </div>
              </div>

              <p className="text-white/40 text-sm leading-relaxed mb-10">
                {plan.desc}
              </p>

              <div className="space-y-4 mb-12 flex-grow">
                 {plan.features.map((feature, j) => (
                   <div key={j} className="flex items-center gap-4">
                      <div className="w-5 h-5 rounded-full bg-blue-600/20 flex items-center justify-center shrink-0">
                         <Check className="w-3 h-3 text-blue-500" />
                      </div>
                      <span className="text-sm font-medium text-white/70">{feature}</span>
                   </div>
                 ))}
              </div>

              <button
                onClick={() => {
                   if (plan.price === "Custom") {
                     window.location.href = "https://wa.me/918080690631";
                   } else {
                     window.dispatchEvent(new CustomEvent("open-payment-modal", { detail: plan }));
                   }
                }}
                className={`w-full py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs transition-all ${
                plan.popular
                ? "bg-blue-600 hover:bg-blue-500 shadow-lg"
                : "bg-white/5 border border-white/10 hover:bg-white/10"
              }`}>
                {plan.price === "Custom" ? "Contact Strategic Ops" : "Purchase"}
              </button>
            </motion.div>
          ))}
        </div>

        <section className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
           <div className="glass-morphism p-12 rounded-[3rem] border-white/10">
              <h3 className="text-2xl font-black italic uppercase mb-6">Volume Deployment</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-8">
                Operating multiple venues for a tournament? Our bulk deployment protocol offers significant efficiency gains and consolidated intelligence dashboards.
              </p>
              <div className="flex items-center gap-6">
                 <div className="flex -space-x-4">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full bg-white/10 border-2 border-black flex items-center justify-center">
                         <Globe className="w-4 h-4 text-white/30" />
                      </div>
                    ))}
                 </div>
                 <span className="text-xs font-bold text-blue-500 uppercase tracking-widest underline cursor-pointer">View Multi-Venue Tiers</span>
              </div>
           </div>

           <div className="space-y-6">
              <h3 className="text-2xl font-black italic uppercase">The Neural Advantage</h3>
              <div className="space-y-4">
                 {[
                   { t: "99.99% Uptime", d: "Military-grade redundancy for critical matchday operations." },
                   { t: "Scalable AI", d: "Compute scales dynamically based on crowd density." },
                 ].map((item, i) => (
                   <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center shrink-0">
                         <Cpu className="w-4 h-4 text-blue-500" />
                      </div>
                      <div>
                         <p className="font-bold text-sm">{item.t}</p>
                         <p className="text-xs text-white/30">{item.d}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </section>
      </main>
    </div>
  );
}
