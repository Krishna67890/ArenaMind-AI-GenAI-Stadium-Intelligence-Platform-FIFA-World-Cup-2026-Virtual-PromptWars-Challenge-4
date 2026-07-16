"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import {
  BarChart3,
  Truck,
  Package,
  TrendingUp,
  Clock,
  AlertTriangle,
  Download,
  Share2,
  FileText,
  MapPin,
  Users
} from "lucide-react";

export default function LogisticsReportPage() {
  const metrics = [
    { label: "Transit Efficiency", value: "94.2%", trend: "+2.4%", icon: BarChart3, color: "blue" },
    { label: "Active Deliveries", value: "1,284", trend: "On Time", icon: Truck, color: "green" },
    { label: "Inventory Level", value: "89.1%", trend: "Stable", icon: Package, color: "purple" },
    { label: "Resource Load", value: "72%", trend: "Optimal", icon: TrendingUp, color: "yellow" }
  ];

  const recentIncidents = [
    { id: 1, time: "10:24 AM", location: "Gate A", issue: "Crowd Density High", severity: "Medium" },
    { id: 2, time: "09:45 AM", location: "Sector 3", issue: "Supply Delay", severity: "Low" },
    { id: 3, time: "08:12 AM", location: "North Ramp", issue: "Maintenance Required", severity: "High" }
  ];

  return (
    <ProtectedRoute redirectTo="/register">
      <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
        <Navbar />

        <main className="pt-32 pb-20 px-6 max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase mb-2">
                Logistics <span className="text-gradient">Report</span>
              </h1>
              <p className="text-white/40 font-medium uppercase tracking-[0.2em] text-xs">
                FIFA 2026 World Cup • Operational Intelligence
              </p>
            </motion.div>

            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                <Download className="w-4 h-4" /> Export PDF
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20">
                <Share2 className="w-4 h-4" /> Share Access
              </button>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {metrics.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-morphism p-8 rounded-[2rem] border-white/5"
              >
                <div className={`w-12 h-12 rounded-2xl mb-6 flex items-center justify-center bg-${m.color}-500/10`}>
                  <m.icon className={`w-6 h-6 text-${m.color}-500`} />
                </div>
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">{m.label}</p>
                <p className="text-2xl font-black italic">{m.value}</p>
                <span className="text-[10px] font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full mt-2 inline-block">
                  {m.trend}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Live Feed */}
            <div className="lg:col-span-2 space-y-6">
              <div className="glass-morphism p-8 rounded-[2.5rem] border-white/5">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-black italic uppercase tracking-tighter">Operational Timeline</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Live Updates</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {recentIncidents.map((incident) => (
                    <div key={incident.id} className="flex gap-6 p-6 bg-white/5 rounded-2xl border border-white/5 group hover:border-blue-500/30 transition-all">
                      <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center shrink-0">
                        {incident.severity === "High" ? (
                          <AlertTriangle className="w-6 h-6 text-red-500" />
                        ) : (
                          <FileText className="w-6 h-6 text-blue-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-white/90">{incident.issue}</h4>
                          <span className="text-[10px] font-mono text-white/40">{incident.time}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3 h-3 text-white/20" />
                            <span className="text-xs text-white/40">{incident.location}</span>
                          </div>
                          <div className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                            incident.severity === "High" ? "bg-red-500/10 text-red-500" :
                            incident.severity === "Medium" ? "bg-yellow-500/10 text-yellow-500" :
                            "bg-blue-500/10 text-blue-500"
                          }`}>
                            {incident.severity} Priority
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-6">
              <div className="glass-morphism p-8 rounded-[2.5rem] border-white/5">
                <h3 className="text-xl font-black italic uppercase tracking-tighter mb-8">Resource Allocation</h3>
                <div className="space-y-6">
                   {[
                     { label: "Logistics Personnel", value: 85, color: "blue" },
                     { label: "Automated Units", value: 92, color: "purple" },
                     { label: "Emergency Response", value: 64, color: "red" }
                   ].map((item, i) => (
                     <div key={i} className="space-y-2">
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                           <span className="text-white/40">{item.label}</span>
                           <span className="text-white/90">{item.value}%</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                           <motion.div
                             initial={{ width: 0 }}
                             animate={{ width: `${item.value}%` }}
                             className={`h-full bg-${item.color}-500`}
                           />
                        </div>
                     </div>
                   ))}
                </div>
              </div>

              <div className="glass-morphism p-8 rounded-[2.5rem] border-white/5 bg-blue-600/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                  <Users className="w-12 h-12 text-blue-500/20" />
                </div>
                <h4 className="font-bold text-white/90 mb-2">Crowd Optimization</h4>
                <p className="text-xs text-white/40 leading-relaxed mb-4">
                  Real-time neural analysis suggests redistributing flow to Gate 4 to maintain 95% efficiency.
                </p>
                <button className="text-[10px] font-bold text-blue-400 uppercase tracking-widest hover:text-blue-300 transition-colors">
                  Authorize Redistribution →
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
