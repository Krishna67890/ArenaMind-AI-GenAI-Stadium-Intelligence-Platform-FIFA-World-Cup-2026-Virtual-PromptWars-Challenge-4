"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Bus, Car, Train, Navigation,
  Clock, Map as MapIcon, ChevronRight,
  Zap, ParkingCircle, Route
} from "lucide-react";

export const TransportationSection = () => {
  return (
    <section id="transportation" className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-6"
          >
            <Route className="w-4 h-4" />
            <span>SMART MOBILITY</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Seamless <span className="text-gradient">Transit Sync.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/40 max-w-2xl"
          >
            ArenaMind AI synchronizes stadium exit flows with local metro, bus, and ride-share
            networks to ensure you get home safely and quickly.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Metro Express",
              status: "On Time",
              eta: "4 mins",
              icon: Train,
              color: "text-blue-500",
              load: "Low"
            },
            {
              title: "Fan Shuttle",
              status: "Active",
              eta: "2 mins",
              icon: Bus,
              color: "text-purple-500",
              load: "Moderate"
            },
            {
              title: "Smart Parking",
              status: "Available",
              eta: "842 spots",
              icon: ParkingCircle,
              color: "text-emerald-500",
              load: "Optimal"
            },
            {
              title: "EV Charging",
              status: "Occupied",
              eta: "12 mins",
              icon: Zap,
              color: "text-yellow-500",
              load: "High"
            }
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card hover:bg-white/5 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-2xl bg-white/5 group-hover:bg-white/10 transition-colors`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{item.status}</div>
              </div>
              <h3 className="text-lg font-bold mb-1">{item.title}</h3>
              <div className="flex items-end justify-between">
                <div>
                   <div className="text-2xl font-bold text-white/90">{item.eta}</div>
                   <div className="text-[10px] text-white/40 uppercase font-medium">Next Departure / Space</div>
                </div>
                <div className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  item.load === 'High' ? 'bg-red-500/10 text-red-500' :
                  item.load === 'Moderate' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-green-500/10 text-green-500'
                }`}>
                  {item.load} Load
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 glass-morphism rounded-[2.5rem] p-8 md:p-12 border-white/10 flex flex-col lg:flex-row items-center gap-12">
           <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4">Traffic Prediction AI</h3>
              <p className="text-white/40 mb-8 leading-relaxed">
                 Our neural network analyzes historical match data and real-time city traffic to predict
                 congestion 2 hours before the final whistle.
              </p>
              <div className="space-y-4">
                 <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <span className="text-sm">Estimated wait time: <span className="text-white font-bold">12 minutes</span></span>
                 </div>
                 <div className="flex items-center gap-3">
                    <Navigation className="w-5 h-5 text-blue-500" />
                    <span className="text-sm">Recommended route: <span className="text-white font-bold">Lincoln Hwy via Exit 4</span></span>
                 </div>
              </div>
              <button className="mt-8 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-bold transition-all flex items-center gap-2">
                 Open Live Transit Map <ChevronRight className="w-4 h-4" />
              </button>
           </div>
           <div className="flex-1 w-full max-w-md aspect-video rounded-3xl bg-zinc-900 border border-white/10 overflow-hidden relative">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1545147986-a9d6f210df77?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-full px-8">
                    <div className="h-1 w-full bg-white/10 rounded-full mb-4 relative">
                       <motion.div
                         animate={{ x: ["0%", "100%", "0%"] }}
                         transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                         className="absolute top-0 h-full w-12 bg-blue-500 shadow-[0_0_15px_#3b82f6] rounded-full"
                       />
                    </div>
                    <div className="h-1 w-2/3 bg-white/10 rounded-full relative">
                       <motion.div
                         animate={{ x: ["0%", "100%", "0%"] }}
                         transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 1 }}
                         className="absolute top-0 h-full w-16 bg-purple-500 shadow-[0_0_15px_#a855f7] rounded-full"
                       />
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};
