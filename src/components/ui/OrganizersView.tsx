"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import {
  Activity, Shield, Users,
  MapPin, AlertCircle, TrendingUp,
  BarChart3, Zap, Droplets
} from "lucide-react";

export const OrganizersView = () => {
  const { t } = useLanguage();

  return (
    <section id="organizers" className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-6"
          >
            <Shield className="w-4 h-4" />
            <span>EXECUTIVE COMMAND CENTER</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Real-Time <span className="text-gradient">Operational Score</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/40 max-w-2xl"
          >
            A high-level overview for tournament organizers and venue directors to monitor
            safety, efficiency, and sustainability at a glance.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Score */}
          <div className="lg:col-span-1 glass-morphism rounded-[2.5rem] p-8 border-white/10 flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-2">Overall Efficiency</div>
              <div className="text-8xl font-bold text-gradient mb-4">94</div>
              <div className="flex items-center gap-2 text-green-500 text-sm font-bold">
                <TrendingUp className="w-4 h-4" />
                <span>+2.4% from last hour</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full mt-12">
               <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="text-xl font-bold">98%</div>
                  <div className="text-[10px] text-white/40 uppercase font-bold">{t("security")}</div>
               </div>
               <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="text-xl font-bold">89%</div>
                  <div className="text-[10px] text-white/40 uppercase font-bold">{t("sustainability")}</div>
               </div>
            </div>
          </div>


          {/* Live Alerts & Metrics */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card">
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold flex items-center gap-2">
                       <Users className="w-4 h-4 text-purple-500" />
                       Crowd Flow
                    </h3>
                    <span className="text-[10px] font-bold text-green-500 px-2 py-0.5 bg-green-500/10 rounded uppercase">Stable</span>
                 </div>
                 <div className="space-y-4">
                    {[
                      { label: "Gate A Inflow", value: "124/min", load: 65 },
                      { label: "Gate B Inflow", value: "82/min", load: 42 },
                      { label: "Gate C Inflow", value: "210/min", load: 88 },
                    ].map((gate) => (
                      <div key={gate.label}>
                         <div className="flex justify-between text-xs mb-1.5">
                            <span className="text-white/40">{gate.label}</span>
                            <span className="font-bold">{gate.value}</span>
                         </div>
                         <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${gate.load}%` }}
                              className={`h-full ${gate.load > 80 ? 'bg-red-500' : 'bg-blue-500'}`}
                            />
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="glass-card">
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold flex items-center gap-2">
                       <Zap className="w-4 h-4 text-yellow-500" />
                       Resource Usage
                    </h3>
                    <span className="text-[10px] font-bold text-blue-500 px-2 py-0.5 bg-blue-500/10 rounded uppercase">Optimized</span>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/5">
                       <Zap className="w-5 h-5 text-yellow-500 mb-2" />
                       <div className="text-lg font-bold">42 MW</div>
                       <div className="text-[10px] text-white/40 uppercase">Power Draw</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5">
                       <Droplets className="w-5 h-5 text-blue-500 mb-2" />
                       <div className="text-lg font-bold">12k L/h</div>
                       <div className="text-[10px] text-white/40 uppercase">Water Flow</div>
                    </div>
                 </div>
              </div>
            </div>

            {/* AI Insights Ticker */}
            <div className="glass-card bg-blue-600/5 border-blue-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                 <Activity className="w-4 h-4 text-blue-500 animate-pulse" />
              </div>
              <h4 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-4">AI Predictive Insights</h4>
              <div className="space-y-3">
                 <div className="flex gap-3 text-sm">
                    <AlertCircle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                    <p className="text-white/60">Predicted bottleneck at <span className="text-white font-bold">South Concourse</span> in 15 mins. Suggest redirecting staff.</p>
                 </div>
                 <div className="flex gap-3 text-sm">
                    <BarChart3 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <p className="text-white/60">Energy optimization saved <span className="text-white font-bold">4.2 tons of CO2</span> today through smart lighting.</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
