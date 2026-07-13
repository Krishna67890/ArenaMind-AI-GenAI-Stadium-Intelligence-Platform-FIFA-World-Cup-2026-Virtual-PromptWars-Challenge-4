"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { Stadium3D } from "@/components/digital-twin/Stadium3D";
import {
  BarChart3, Users, ShieldAlert,
  MapPin, Clock, TrendingUp,
  AlertCircle, CheckCircle2,
  MoreVertical, Search, Filter, X, Lock,
  Zap, Activity, Target, Shield, Globe,
  LucideIcon
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';

const data = [
  { time: '18:00', fans: 12000, alerts: 2 },
  { time: '18:15', fans: 18000, alerts: 5 },
  { time: '18:30', fans: 25000, alerts: 3 },
  { time: '18:45', fans: 35000, alerts: 8 },
  { time: '19:00', fans: 48000, alerts: 4 },
  { time: '19:15', fans: 52000, alerts: 2 },
  { time: '19:30', fans: 54000, alerts: 1 },
];

// Generate 100 incidents
const GENERATED_INCIDENTS = Array.from({ length: 100 }).map((_, i) => {
  const types = ["Security", "Medical", "Crowd", "System", "Traffic", "Weather", "Sustainability"];
  const statuses = ["Critical", "In Progress", "Resolved", "Warning", "Info"];
  const colors = {
    Critical: "bg-red-500",
    "In Progress": "bg-orange-500",
    Resolved: "bg-green-500",
    Warning: "bg-yellow-500",
    Info: "bg-blue-500"
  };
  const type = types[Math.floor(Math.random() * types.length)];
  const status = statuses[Math.floor(Math.random() * statuses.length)];

  return {
    id: i + 1,
    type,
    msg: `Incident ${i + 1}: ${type} report at Sector ${Math.floor(Math.random() * 20) + 1} - ${["Anomaly detected", "Standard check", "Rapid response initiated", "Resource optimization"][Math.floor(Math.random() * 4)]}`,
    time: `${Math.floor(Math.random() * 60)}m ago`,
    status,
    color: colors[status as keyof typeof colors]
  };
});

export default function DashboardPage() {
  const { t } = useLanguage();
  const { role } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllIncidents, setShowAllIncidents] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const filteredIncidents = useMemo(() => {
    return GENERATED_INCIDENTS.filter(incident =>
      incident.msg.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[#050505] text-white pt-24">
        <Navbar />

        <div className="container mx-auto px-6 py-8">
          {/* Dashboard Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6">
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl lg:text-4xl font-black italic tracking-tighter uppercase"
              >
                Command <span className="text-blue-600">Center</span>
              </motion.h1>
              <p className="text-white/40 text-[10px] lg:text-sm font-medium uppercase tracking-[0.2em]">Operational Intelligence // FIFA 2026</p>
            </div>

            <div className="flex items-center gap-2 lg:gap-4 bg-white/5 p-1.5 lg:p-2 rounded-2xl border border-white/10 overflow-x-auto no-scrollbar max-w-full">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-4 lg:px-6 py-2 rounded-xl text-[10px] lg:text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === "overview" ? "bg-blue-600 shadow-lg shadow-blue-600/20" : "hover:bg-white/5"}`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("incidents")}
                className={`px-4 lg:px-6 py-2 rounded-xl text-[10px] lg:text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === "incidents" ? "bg-blue-600 shadow-lg shadow-blue-600/20" : "hover:bg-white/5"}`}
              >
                Incidents ({filteredIncidents.length})
              </button>
              <button
                onClick={() => setActiveTab("stadiums")}
                className={`px-4 lg:px-6 py-2 rounded-xl text-[10px] lg:text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === "stadiums" ? "bg-blue-600 shadow-lg shadow-blue-600/20" : "hover:bg-white/5"}`}
              >
                3D Twins
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Real-time Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard icon={Users} label="Total Attendance" value="54,201" change="+12%" color="text-blue-500" />
                  <StatCard icon={ShieldAlert} label="Active Incidents" value={GENERATED_INCIDENTS.filter(i => i.status === "Critical").length.toString()} change="-2" color="text-red-500" />
                  <StatCard icon={Zap} label="Energy Usage" value="84%" change="Optimal" color="text-yellow-500" />
                  <StatCard icon={Activity} label="Sensor Network" value="14.2k" change="Active" color="text-green-500" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Interactive Stadium Preview */}
                  <div className="lg:col-span-2 glass-morphism rounded-[2rem] lg:rounded-[2.5rem] border-white/10 overflow-hidden h-[300px] lg:h-[500px] relative group">
                    <Stadium3D />
                    <div className="absolute bottom-4 left-4 lg:bottom-8 lg:left-8 z-20">
                      <div className="glass-morphism p-4 lg:p-6 rounded-2xl lg:rounded-3xl border-white/10 backdrop-blur-md">
                        <h3 className="text-lg lg:text-2xl font-black italic uppercase tracking-tighter">MetLife Twin</h3>
                        <p className="text-[8px] lg:text-xs text-white/40 font-bold uppercase tracking-widest mt-1">Live Spatial Mapping Active</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Incident Feed */}
                  <div className="glass-morphism rounded-[2rem] lg:rounded-[2.5rem] border-white/10 p-6 lg:p-8 flex flex-col h-[400px] lg:h-[500px]">
                    <div className="flex justify-between items-center mb-6 lg:mb-8">
                      <h3 className="text-lg lg:text-xl font-bold italic uppercase tracking-tighter">Live Intel</h3>
                      <button onClick={() => setActiveTab("incidents")} className="text-[10px] font-black uppercase text-blue-500 tracking-widest hover:underline">View All</button>
                    </div>
                    <div className="space-y-4 overflow-y-auto flex-1 pr-2 custom-scrollbar">
                      {GENERATED_INCIDENTS.slice(0, 10).map((incident) => (
                        <div key={incident.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                          <div className="flex justify-between items-start mb-2">
                            <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase ${incident.color} text-white`}>{incident.type}</span>
                            <span className="text-[8px] text-white/20 font-bold">{incident.time}</span>
                          </div>
                          <p className="text-xs text-white/70 line-clamp-2">{incident.msg}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Performance Analytics */}
                <div className="glass-morphism rounded-[2rem] lg:rounded-[2.5rem] border-white/10 p-6 lg:p-10">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 lg:mb-10 gap-4">
                    <h3 className="text-xl lg:text-2xl font-black italic uppercase tracking-tighter">Crowd Dynamics</h3>
                    <div className="flex gap-4 lg:gap-6">
                      <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500" /><span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Inflow</span></div>
                      <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500" /><span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Alerts</span></div>
                    </div>
                  </div>
                  <div className="h-[200px] lg:h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data}>
                        <defs>
                          <linearGradient id="colorFans" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="time" hide />
                        <Tooltip contentStyle={{ background: '#0a0a0a', border: '1px solid #ffffff10', borderRadius: '12px' }} />
                        <Area type="monotone" dataKey="fans" stroke="#3b82f6" fill="url(#colorFans)" strokeWidth={4} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "incidents" && (
              <motion.div
                key="incidents"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex flex-col md:flex-row gap-6 items-center mb-8">
                  <div className="flex-1 relative w-full">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                    <input
                      type="text"
                      placeholder="SEARCH 100+ LIVE INCIDENTS BY TYPE, STATUS OR SECTOR..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-6 text-sm font-bold tracking-widest uppercase focus:border-blue-500 transition-all outline-none"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-4">
                    <button className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all"><Filter className="w-5 h-5" /></button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredIncidents.map((incident) => (
                    <motion.div
                      layout
                      key={incident.id}
                      className="glass-morphism p-6 rounded-3xl border-white/10 hover:border-white/20 transition-all group"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className={`p-2 rounded-lg bg-white/5`}>
                          <Shield className="w-4 h-4 text-blue-400" />
                        </div>
                        <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${incident.color} text-white shadow-lg`}>
                          {incident.status}
                        </span>
                      </div>
                      <h4 className="text-sm font-black uppercase tracking-widest mb-2 text-white/40">{incident.type} // LOG-{incident.id}</h4>
                      <p className="text-sm font-bold text-white/80 leading-relaxed mb-4">{incident.msg}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">{incident.time}</span>
                        <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all">
                          <MoreVertical className="w-4 h-4 text-white/40" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "stadiums" && (
              <motion.div
                key="stadiums"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                <StadiumTwinCard
                  title="Estadio Azteca"
                  location="Mexico City"
                  embed="https://sketchfab.com/models/83ca580566054b1b9d780289f4372d68/embed"
                />
                <StadiumTwinCard
                  title="MetLife Stadium"
                  location="New Jersey"
                  embed="https://sketchfab.com/models/996924376c9945038c35e3b624508493/embed"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <Footer />
      </main>
    </ProtectedRoute>
  );
}

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  change: string;
  color: string;
}

const StatCard = ({ icon: Icon, label, value, change, color }: StatCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass-morphism p-6 lg:p-8 rounded-[1.5rem] lg:rounded-[2rem] border-white/10"
    >
      <div className="flex justify-between items-start mb-4 lg:mb-6">
        <div className="p-2 lg:p-3 rounded-xl lg:rounded-2xl bg-white/5">
          <Icon className={`w-5 h-5 lg:w-6 lg:h-6 ${color}`} />
        </div>
        <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">{change}</span>
      </div>
      <div className="text-3xl lg:text-4xl font-black italic tracking-tighter uppercase mb-1 lg:mb-2">{value}</div>
      <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">{label}</div>
    </motion.div>
  );
};

interface StadiumTwinCardProps {
  title: string;
  location: string;
  embed: string;
}

const StadiumTwinCard = ({ title, location, embed }: StadiumTwinCardProps) => (
  <div className="glass-morphism rounded-[2rem] lg:rounded-[3rem] border-white/10 overflow-hidden h-[400px] lg:h-[600px] flex flex-col relative">
    <div className="p-6 lg:p-8 border-b border-white/5 flex justify-between items-center z-10">
      <div>
        <h3 className="text-xl lg:text-2xl font-black italic uppercase tracking-tighter">{title}</h3>
        <p className="text-[10px] lg:text-xs text-blue-400 font-bold uppercase tracking-widest mt-1">{location}</p>
      </div>
      <div className="flex gap-2 lg:gap-3">
        <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-green-500/10 flex items-center justify-center"><Activity className="w-4 h-4 lg:w-5 lg:h-5 text-green-500" /></div>
        <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-blue-500/10 flex items-center justify-center"><Globe className="w-4 h-4 lg:w-5 lg:h-5 text-blue-400" /></div>
      </div>
    </div>
    <div className="flex-1 bg-black relative">
       <Stadium3D />
    </div>
  </div>
);
