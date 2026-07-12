"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, Minimize2, Info, Camera, MapPin, Users, Zap, Shield, Activity, LucideIcon } from "lucide-react";

interface Stadium {
  id: string;
  title: string;
  embed: string;
  capacity: string;
  location: string;
  year: string;
  match: string;
  weather: string;
  density: string;
  security: string;
}

const stadiums: Stadium[] = [
  {
    id: "azteca",
    title: "Azteca Stadium",
    embed: "https://sketchfab.com/models/83ca580566054b1b9d780289f4372d68/embed?autostart=1&internal=1&tracking=0&ui_ar=0&ui_infos=0&ui_snapshots=1&ui_stop=0&ui_theatre=1&ui_watermark=0",
    capacity: "87,523",
    location: "Mexico City, Mexico",
    year: "1966",
    match: "Opening Match // June 11",
    weather: "24°C Clear",
    density: "88%",
    security: "Level 4 - High",
  },
  {
    id: "arrowhead",
    title: "Arrowhead NFL Stadium",
    embed: "https://sketchfab.com/models/8a4343ba53c74078808cadc937cdb20e/embed?autostart=1&internal=1&tracking=0&ui_ar=0&ui_infos=0&ui_snapshots=1&ui_stop=0&ui_theatre=1&ui_watermark=0",
    capacity: "76,416",
    location: "Kansas City, MO",
    year: "1972",
    match: "Quarter Final // July 04",
    weather: "28°C Humid",
    density: "92%",
    security: "Level 3 - Optimal",
  }
];

export const StadiumViewer = () => {
  const [activeStadium, setActiveStadium] = useState<Stadium>(stadiums[0]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInfo, setShowInfo] = useState(true);

  return (
    <div className={`relative w-full transition-all duration-500 ${isFullscreen ? "fixed inset-0 z-[100] bg-black" : "h-[700px] rounded-[2.5rem] overflow-hidden border border-white/10"}`}>
      {/* 3D Embed */}
      <div className="absolute inset-0 z-0">
        <iframe
          title={activeStadium.title}
          className="w-full h-full border-0"
          allowFullScreen
          allow="autoplay; fullscreen; xr-spatial-tracking"
          src={activeStadium.embed}
        />
      </div>

      {/* Overlay UI */}
      <div className="absolute inset-0 pointer-events-none z-10 p-8 flex flex-col justify-between">
        {/* Top Header */}
        <div className="flex justify-between items-start pointer-events-auto">
          <div className="glass-morphism p-6 rounded-3xl border-white/10">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Live Digital Twin Uplink</span>
            </div>
            <h2 className="text-3xl font-black italic tracking-tighter uppercase">{activeStadium.title}</h2>
            <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-widest mt-1">
              <MapPin className="w-3 h-3" />
              {activeStadium.location}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="glass-morphism p-4 rounded-2xl border-white/10 text-white/60 hover:text-white transition-colors"
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Stadium Selector & Info */}
        <div className="flex justify-between items-end pointer-events-auto">
          <div className="space-y-4">
             <div className="flex gap-2 p-1.5 glass-morphism rounded-2xl border-white/5">
                {stadiums.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveStadium(s)}
                    className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                      activeStadium.id === s.id ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-white/40 hover:bg-white/5"
                    }`}
                  >
                    {s.title.split(" ")[0]}
                  </button>
                ))}
             </div>

             <AnimatePresence>
              {showInfo && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="glass-morphism p-6 rounded-[2rem] border-white/10 w-[400px] space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <StatItem icon={Users} label="Capacity" value={activeStadium.capacity} />
                    <StatItem icon={Zap} label="Energy" value="84%" />
                    <StatItem icon={Activity} label="Density" value={activeStadium.density} />
                    <StatItem icon={Shield} label="Security" value={activeStadium.security} />
                  </div>
                  <div className="pt-4 border-t border-white/5">
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-1">Upcoming Event</p>
                    <p className="text-sm font-bold">{activeStadium.match}</p>
                  </div>
                </motion.div>
              )}
             </AnimatePresence>
          </div>

          <div className="flex flex-col gap-3">
             <button className="glass-morphism p-4 rounded-2xl border-white/10 text-white/60 hover:text-white transition-colors">
                <Camera className="w-5 h-5" />
             </button>
             <button
                onClick={() => setShowInfo(!showInfo)}
                className={`glass-morphism p-4 rounded-2xl border-white/10 transition-colors ${showInfo ? "text-blue-400" : "text-white/60"}`}
              >
                <Info className="w-5 h-5" />
             </button>
          </div>
        </div>
      </div>

      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>
    </div>
  );
};

interface StatItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

const StatItem = ({ icon: Icon, label, value }: StatItemProps) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-3 h-3 text-blue-400" />
        <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest">{label}</span>
      </div>
      <div className="text-lg font-black tracking-tighter uppercase">{value}</div>
    </div>
  );
};
