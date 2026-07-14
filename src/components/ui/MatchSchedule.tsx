"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Trophy, Users } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const MatchSchedule = () => {
  const { t } = useLanguage();
  const matches = [
    {
      id: 1,
      teamA: "USA",
      teamB: "England",
      venue: "SoFi Stadium, Los Angeles",
      date: "June 12, 2026",
      status: "Tickets Available",
      type: "Group Stage"
    },
    {
      id: 2,
      teamA: "Italy",
      teamB: "France",
      venue: "Stadio Renato Dall'Ara, Bologna",
      date: "June 15, 2026",
      status: "High Demand",
      type: "Group Stage"
    },
    {
      id: 3,
      teamA: "Canada",
      teamB: "France",
      venue: "BC Place, Vancouver",
      date: "June 18, 2026",
      status: "Sold Out",
      type: "Group Stage"
    },
    {
      id: 4,
      teamA: "Brazil",
      teamB: "Japan",
      venue: "Hard Rock Stadium, Miami",
      date: "June 20, 2026",
      status: "Tickets Available",
      type: "Group Stage"
    },
    {
      id: 5,
      teamA: "Russia",
      teamB: "Serbia",
      venue: "Stadium Mordovia, Saransk",
      date: "June 22, 2026",
      status: "High Demand",
      type: "Group Stage"
    },
    {
      id: 6,
      teamA: "Argentina",
      teamB: "Portugal",
      venue: "AT&T Stadium, Dallas",
      date: "June 25, 2026",
      status: "Selling Fast",
      type: "Group Stage"
    },
    {
      id: 7,
      teamA: "Germany",
      teamB: "Spain",
      venue: "Euro Arena, London",
      date: "June 28, 2026",
      status: "Tickets Available",
      type: "Group Stage"
    },
    {
      id: 8,
      teamA: "Qatar",
      teamB: "Netherlands",
      venue: "Khalifa International Stadium, Doha",
      date: "June 30, 2026",
      status: "High Demand",
      type: "Group Stage"
    }
  ];

  return (
    <section className="py-24 bg-black relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-blue-500 font-bold tracking-widest text-xs uppercase mb-4"
            >
              <Trophy className="w-4 h-4" />
              <span>FIFA World Cup 2026 Schedule</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold">Upcoming <span className="text-gradient">Matches.</span></h2>
          </div>

          <p className="text-white/40 max-w-md text-sm md:text-right">
            Real-time synchronization with the FIFA match engine. Get directions and stadium details for every host city.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {matches.map((match, i) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4">
                 <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase border ${
                   match.status === "Sold Out" ? "border-red-500/50 text-red-500 bg-red-500/10" : "border-blue-500/50 text-blue-500 bg-blue-500/10"
                 }`}>
                   {match.status}
                 </span>
              </div>

              <div className="flex items-center justify-between mb-8 pt-4">
                <div className="text-center flex-1">
                   <div className="w-12 h-12 bg-white/5 rounded-full mx-auto mb-2 flex items-center justify-center border border-white/10 group-hover:border-blue-500/50 transition-colors">
                      <span className="text-lg font-bold">{match.teamA.charAt(0)}</span>
                   </div>
                   <span className="text-sm font-bold text-white/80">{match.teamA}</span>
                </div>
                <div className="px-4 text-white/20 font-black text-2xl italic">VS</div>
                <div className="text-center flex-1">
                   <div className="w-12 h-12 bg-white/5 rounded-full mx-auto mb-2 flex items-center justify-center border border-white/10 group-hover:border-blue-500/50 transition-colors">
                      <span className="text-lg font-bold">{match.teamB.charAt(0)}</span>
                   </div>
                   <span className="text-sm font-bold text-white/80">{match.teamB}</span>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-white/5">
                <div className="flex items-center gap-3 text-xs text-white/60">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  {match.date} • {match.type}
                </div>
                <div className="flex items-center gap-3 text-xs text-white/60">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  {match.venue}
                </div>
              </div>

              <button
                onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(match.venue)}`, '_blank')}
                className="w-full mt-6 py-3 bg-white/5 hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition-all border border-white/10 hover:border-blue-500"
              >
                View Stadium Logistics
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
