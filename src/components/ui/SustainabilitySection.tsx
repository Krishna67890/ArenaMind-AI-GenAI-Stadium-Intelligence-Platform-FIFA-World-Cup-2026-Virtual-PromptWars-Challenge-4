"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import {
  Leaf, Zap, Droplets, Trash2,
  Wind, Sun, BarChart, Globe,
  ArrowUpRight
} from "lucide-react";

export const SustainabilitySection = () => {
  const { t } = useLanguage();

  const metrics = [
    {
      title: "Carbon Offset",
      value: "142 Tons",
      change: "+12%",
      icon: Leaf,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      title: "Renewable Energy",
      value: "96%",
      change: "+7.2%",
      icon: Sun,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10"
    },
    {
      title: "Water Recycled",
      value: "15,800 L",
      change: "+22%",
      icon: Droplets,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      title: "Waste Diverted",
      value: "98%",
      change: "+4.5%",
      icon: Trash2,
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    }
  ];

  return (
    <section id="sustainability" className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-6"
            >
              <Leaf className="w-4 h-4" />
              <span>{t("ecoIntelligence").toUpperCase()}</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-8"
            >
              The First <span className="text-gradient-green">Carbon-Neutral</span> World Cup Final.
            </motion.h2>

            <p className="text-white/40 text-lg mb-12 leading-relaxed">
              ArenaMind AI manages the stadium's environmental footprint in real-time.
              From autonomous energy balancing to smart waste sorting, we ensure
              operational excellence doesn't come at the cost of the planet.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {metrics.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card group hover:border-emerald-500/30 transition-all"
                >
                  <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center mb-4`}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div className="text-2xl font-bold mb-1">{item.value}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40 uppercase font-bold">{item.title}</span>
                    <span className="text-[10px] text-emerald-500 font-bold">{item.change}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-[3rem] bg-zinc-900 border border-white/10 overflow-hidden relative group">
              {/* Mock Sustainability Visual */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-64 h-64 rounded-full border border-dashed border-emerald-500/20"
                    />
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-4 rounded-full border border-dashed border-blue-500/20"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <Globe className="w-20 h-20 text-emerald-500/50" />
                    </div>
                 </div>
              </div>

              {/* Data Overlays */}
              <div className="absolute top-8 left-8 glass-card p-4 backdrop-blur-xl">
                 <div className="text-[10px] font-bold text-white/40 mb-2 uppercase">Live Grid Mix</div>
                 <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                       <span className="text-sm font-bold">Solar</span>
                       <span className="text-xs text-emerald-500">62%</span>
                    </div>
                    <div className="w-px h-8 bg-white/10" />
                    <div className="flex flex-col">
                       <span className="text-sm font-bold">Wind</span>
                       <span className="text-xs text-blue-500">22%</span>
                    </div>
                 </div>
              </div>

              <div className="absolute bottom-8 right-8 glass-card p-4 backdrop-blur-xl">
                 <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase">Eco Score: 98/100</span>
                 </div>
                 <p className="text-[10px] text-white/40 leading-tight">Optimizing HVAC load in Sector 4 based on current occupancy.</p>
              </div>
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-emerald-600/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};
