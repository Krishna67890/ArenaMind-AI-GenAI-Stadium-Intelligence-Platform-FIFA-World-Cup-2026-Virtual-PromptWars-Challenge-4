"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy, Users, Clock } from "lucide-react";

export const LiveTicker = () => {
  return (
    <div className="w-full bg-blue-600/10 border-y border-white/5 py-3 overflow-hidden whitespace-nowrap relative data-stream">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10" />

      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="inline-flex gap-12 items-center"
      >
        {[...Array(2)].map((_, idx) => (
          <React.Fragment key={idx}>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/60 hover:text-white transition-colors cursor-default">
              <Trophy className="w-4 h-4 text-yellow-500 animate-pulse" />
              <span className="hover:animate-glitch">World Finals 2026: Match 64 · Final Countdown: 14 Days</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/60 hover:text-white transition-colors cursor-default">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="hover:animate-glitch">Current Venue Occupancy: 84% · High Density in North Sector</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/60 hover:text-white transition-colors cursor-default">
              <Clock className="w-4 h-4 text-green-500" />
              <span className="hover:animate-glitch">Transport Alert: Metro Line 1 Arriving every 3 mins</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/60 hover:text-white transition-colors cursor-default">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="hover:animate-glitch">AI Operations: All 15 Agents Online & Synchronized</span>
            </div>
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
