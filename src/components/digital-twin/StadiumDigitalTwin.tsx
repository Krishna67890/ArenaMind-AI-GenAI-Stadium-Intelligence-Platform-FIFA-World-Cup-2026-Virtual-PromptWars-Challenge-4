"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Map as MapIcon, Layers, Info,
  Thermometer, Wind, Users,
  Zap, Droplets, Trash2,
  Accessibility, AlertTriangle,
  Navigation
} from "lucide-react";

const stadiumZones = [
  { id: "north", name: "North Stand", density: 85, status: "High", color: "bg-red-500" },
  { id: "south", name: "South Stand", density: 42, status: "Optimal", color: "bg-green-500" },
  { id: "east", name: "East Stand", density: 65, status: "Moderate", color: "bg-yellow-500" },
  { id: "west", name: "West Stand", density: 30, status: "Optimal", color: "bg-green-500" },
  { id: "vip", name: "VIP Lounge", density: 15, status: "Optimal", color: "bg-green-500" },
  { id: "media", name: "Media Center", density: 90, status: "Critical", color: "bg-red-600" },
];

import { Stadium3D } from "./Stadium3D";

export const StadiumDigitalTwin = () => {
  const [activeZone, setActiveZone] = useState(stadiumZones[0]);
  const [viewMode, setViewMode] = useState("3d-model"); // Changed default to 3d-model
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section id="digital-twin" className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-4"
            >
              MetLife Stadium <span className="text-gradient">Digital Twin</span>
            </motion.h2>
            <p className="text-white/40 max-w-xl">
              Official simulation for the 2026 FIFA World Cup Final venue. Monitor real-time spatial intelligence, gate flow, and environmental sustainability.
            </p>
          </div>

          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10" role="tablist" aria-label="View Modes">
            {["3D Model", "Heat Map", "Occupancy"].map((mode) => (
              <button
                key={mode}
                role="tab"
                aria-selected={viewMode === mode.toLowerCase().replace(" ", "-")}
                onClick={() => setViewMode(mode.toLowerCase().replace(" ", "-"))}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  viewMode === mode.toLowerCase().replace(" ", "-")
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-white/40 hover:text-white"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Simulation Visualizer */}
          <div className="lg:col-span-3 aspect-video bg-black/40 rounded-3xl border border-white/10 relative overflow-hidden group">
            {viewMode === "3d-model" ? (
              <Stadium3D />
            ) : (
              /* Mock Stadium Representation */
              <div className="absolute inset-0 flex items-center justify-center p-12">
                <div className="relative w-full h-full border-[10px] border-white/5 rounded-[100px] flex items-center justify-center overflow-hidden">
                  {/* Zones */}
                  <div className="absolute inset-0 grid grid-cols-2 grid-rows-3 gap-2 p-4">
                    {stadiumZones.map((zone) => (
                      <motion.div
                        key={zone.id}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setActiveZone(zone)}
                        className={`relative rounded-xl border transition-all cursor-pointer overflow-hidden group/zone cyber-border hologram-effect ${
                          activeZone.id === zone.id ? "ring-2 ring-blue-500 bg-white/5" : "border-white/10"
                        }`}
                      >
                        {/* Heatmap overlay */}
                        <div
                          className={`absolute inset-0 opacity-20 transition-opacity group-hover/zone:opacity-40 ${zone.color}`}
                        />
                        <div className="absolute top-4 left-4">
                          <span className="text-[10px] font-bold uppercase text-white/40">{zone.name}</span>
                          <div className="text-sm font-bold text-white">{zone.density}% Density</div>
                        </div>

                        {/* Animated particles for "crowd" - Only render on client to avoid hydration mismatch */}
                        {isMounted && (
                          <div className="absolute inset-0 pointer-events-none">
                             {[...Array(5)].map((_, i) => (
                               <motion.div
                                 key={i}
                                 animate={{
                                   x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                                   y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                                 }}
                                 transition={{ duration: 10 + Math.random() * 5, repeat: Infinity, ease: "linear" }}
                                 className={`absolute w-1 h-1 rounded-full bg-white/20`}
                               />
                             ))}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Pitch */}
                  <div className="w-1/2 h-2/3 bg-green-900/20 border-2 border-white/20 rounded-lg flex items-center justify-center relative">
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 border-2 border-white/20 rounded-full" />
                        <div className="absolute w-full h-[2px] bg-white/20" />
                     </div>
                     <span className="text-white/20 font-bold tracking-[1em] rotate-90 text-sm">FIELD OF PLAY</span>
                  </div>
                </div>
              </div>
            )}

            {/* AI HUD Overlay */}
            <div className="absolute top-6 left-6 flex flex-col gap-2">
              <div className="glass-card py-2 px-4 rounded-full flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                <span className="text-[10px] font-bold uppercase">Live Sensor Feed</span>
              </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end pointer-events-none">
              <div className="flex gap-4">
                <div className="glass-card p-3 rounded-2xl pointer-events-auto">
                   <Thermometer className="w-4 h-4 text-orange-500 mb-1" />
                   <div className="text-xs font-bold">24°C</div>
                </div>
                <div className="glass-card p-3 rounded-2xl pointer-events-auto">
                   <Wind className="w-4 h-4 text-blue-400 mb-1" />
                   <div className="text-xs font-bold">12km/h</div>
                </div>
              </div>

              <div className="flex gap-2 pointer-events-auto">
                <button
                  onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=MetLife+Stadium', '_blank')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-full flex items-center gap-2 hover:bg-blue-500 transition-all text-xs font-bold shadow-lg"
                >
                  <Navigation className="w-4 h-4" />
                  Get Directions
                </button>
                <button className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all">
                  <Layers className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Zone Stats Panel */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-card">
              <h3 className="text-lg font-bold mb-6">Zone Intelligence</h3>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-white/60">Current Occupancy</span>
                    <span className="text-sm font-bold">{activeZone.density}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${activeZone.density}%` }}
                      className={`h-full ${activeZone.color}`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <Users className="w-4 h-4 text-white/40 mb-2" />
                    <div className="text-xs text-white/40">Est. Crowd</div>
                    <div className="text-sm font-bold">12,402</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <AlertTriangle className="w-4 h-4 text-yellow-500 mb-2" />
                    <div className="text-xs text-white/40">Risk Level</div>
                    <div className="text-sm font-bold">Low</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-xs font-bold text-white/40 uppercase">Resource Status</div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Zap className="w-3 h-3 text-yellow-500" />
                      <span>Power Load</span>
                    </div>
                    <span className="text-green-500 font-medium">Stable</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Droplets className="w-3 h-3 text-blue-500" />
                      <span>Water Usage</span>
                    </div>
                    <span className="text-blue-500 font-medium">Optimal</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Trash2 className="w-3 h-3 text-purple-500" />
                      <span>Waste Bin</span>
                    </div>
                    <span className="text-red-500 font-medium">85% Full</span>
                  </div>
                </div>

                <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition-all">
                  Open Advanced Analytics
                </button>
              </div>
            </div>

            <div className="glass-card bg-blue-600/10 border-blue-500/20">
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-blue-500 shrink-0" />
                <div>
                  <div className="text-sm font-bold mb-1">AI Suggestion</div>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Detected bottlenecks at West Entry Gate 4. Suggest redirecting upcoming fans to North Stand entrances.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
