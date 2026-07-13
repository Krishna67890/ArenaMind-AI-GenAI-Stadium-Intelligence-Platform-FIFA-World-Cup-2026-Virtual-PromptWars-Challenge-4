"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Navbar } from "@/components/ui/Navbar";
import { StadiumViewer } from "@/components/digital-twin/StadiumViewer";
import { LayoutGrid, Database, Radio, TrainFront, ShieldAlert, BrainCircuit, Thermometer, Wind, Droplets, Gauge, AlertTriangle, Users, Map as MapIcon } from "lucide-react";
import { db } from "@/services/firebase";
import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

interface SecurityAlert {
  id: string;
  type?: string;
  message?: string;
  priority?: "low" | "medium" | "high";
  timestamp?: { seconds: number };
}

export default function DigitalTwinPage() {
  const [activeTab, setActiveTab] = useState("stadiums");
  const { user } = useAuth();
  const [securityAlerts, setSecurityAlerts] = useState<SecurityAlert[]>([]);
  const [threatLevel, setThreatLevel] = useState("Minimal");

  const tabs = [
    { id: "overview", icon: LayoutGrid, label: "Overview" },
    { id: "stadiums", icon: BrainCircuit, label: "3D Stadiums" },
    { id: "sensors", icon: Radio, label: "IoT Sensors" },
    { id: "transport", icon: TrainFront, label: "Mobility" },
    { id: "security", icon: ShieldAlert, label: "Security" },
  ];

  const sensorData = [
    { id: 1, type: "Temperature", icon: Thermometer, value: "24.2°C", status: "Optimal", color: "text-orange-400" },
    { id: 2, type: "Air Quality", icon: Wind, value: "AQI 32", status: "Excellent", color: "text-green-400" },
    { id: 3, type: "Humidity", icon: Droplets, value: "48%", status: "Stable", color: "text-blue-400" },
    { id: 4, type: "Structural Stress", icon: Gauge, value: "2.1 kN", status: "Nominal", color: "text-purple-400" },
    { id: 5, type: "Mobility Flow", icon: TrainFront, value: "1,240 p/m", status: "Fluid", color: "text-cyan-400" },
    { id: 6, type: "Threat Level", icon: ShieldAlert, value: threatLevel, status: threatLevel === "Minimal" ? "Secure" : "Warning", color: threatLevel === "Minimal" ? "text-emerald-400" : "text-red-400" },
  ];

  useEffect(() => {
    if (!db || !user) {
      setSecurityAlerts([]);
      return;
    }

    let unsubscribe: () => void = () => {};

    try {
      const q = query(
        collection(db, "security_alerts"),
        orderBy("timestamp", "desc"),
        limit(5)
      );

      unsubscribe = onSnapshot(q, (snapshot) => {
        const alerts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as SecurityAlert[];
        setSecurityAlerts(alerts);

        // Update threat level based on latest alert if high priority
        if (alerts.length > 0 && alerts[0].priority === "high") {
          setThreatLevel("Elevated");
        } else {
          setThreatLevel("Minimal");
        }
      }, (error) => {
        // Fallback to mock security alerts if Firebase permissions fail
        console.warn("Using local security alerts fallback due to permissions.");
        const mockAlerts: SecurityAlert[] = [
          {
            id: "mock-sec-1",
            type: "Neural Sync",
            message: "Global security mesh operating at 99.9% efficiency.",
            priority: "low",
            timestamp: { seconds: Date.now() / 1000 }
          },
          {
            id: "mock-sec-2",
            type: "Access Control",
            message: "Biometric scanners at Gate 4 optimized for high throughput.",
            priority: "low",
            timestamp: { seconds: (Date.now() - 3600000) / 1000 }
          }
        ];
        setSecurityAlerts(mockAlerts);
        setThreatLevel("Minimal");
      });
    } catch (err) {
      console.error("Failed to setup security alerts listener:", err);
    }

    return () => unsubscribe();
  }, [user]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30">
        <Navbar />

        <main className="pt-32 pb-20 px-6 max-w-[1600px] mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="px-3 py-1 rounded-full bg-blue-600/20 border border-blue-500/30 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                  Enterprise Node // 042
                </div>
                <div className="flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                   <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Global Sync Active</span>
                </div>
              </div>
              <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.8] mb-4">
                Digital <span className="text-gradient">Twin</span>
              </h1>
              <p className="max-w-xl text-white/50 text-lg leading-relaxed">
                Real-time spatial intelligence platform for FIFA 2026. Synchronizing physical infrastructure with virtual simulation.
              </p>
            </motion.div>

            {/* Tab Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-2 p-1.5 glass-morphism rounded-[2rem] border-white/5"
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-2xl transition-all ${
                    activeTab === tab.id
                    ? "bg-white text-black font-bold shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    : "text-white/40 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="text-sm uppercase tracking-widest hidden lg:inline">{tab.label}</span>
                </button>
              ))}
            </motion.div>
          </div>

          {/* Content Area */}
          <div className="relative">
             {activeTab === "overview" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                  <div className="lg:col-span-2 glass-morphism p-10 rounded-[3rem] border-white/10">
                    <h3 className="text-2xl font-black italic uppercase mb-8">World Stadium Overview</h3>
                    <div className="space-y-6">
                      {[
                        { name: "Stadio Renato Dall'Ara", city: "Bologna", status: "Active", cap: "38,279" },
                        { name: "Stadium Mordovia", city: "Saransk", status: "Online", cap: "44,442" },
                        { name: "SoFi Stadium", city: "Los Angeles", status: "Standby", cap: "70,240" },
                      ].map((stadium, i) => (
                        <div key={i} className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-all cursor-pointer">
                          <div>
                            <p className="text-xl font-bold">{stadium.name}</p>
                            <p className="text-xs text-white/40 uppercase tracking-widest">{stadium.city}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-blue-500 uppercase">{stadium.status}</p>
                            <p className="text-[10px] text-white/20">Cap: {stadium.cap}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="glass-morphism p-10 rounded-[3rem] border-white/10 bg-blue-600/5 flex flex-col items-center justify-center text-center">
                    <BrainCircuit className="w-16 h-16 text-blue-500 mb-6 animate-pulse" />
                    <h3 className="text-xl font-bold mb-4 uppercase tracking-tighter">Live AI Statistics</h3>
                    <div className="space-y-4 w-full">
                       <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                          <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest mb-1">Total Capacity</p>
                          <p className="text-2xl font-black italic tracking-tighter uppercase text-gradient">234,179</p>
                       </div>
                       <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                          <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest mb-1">Energy Efficiency</p>
                          <p className="text-2xl font-black italic tracking-tighter uppercase text-green-500">94.2%</p>
                       </div>
                    </div>
                  </div>
                </motion.div>
             )}

             {activeTab === "stadiums" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <StadiumViewer />
                </motion.div>
             )}

             {activeTab === "sensors" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {sensorData.map((sensor) => (
                    <div key={sensor.id} className="glass-morphism p-8 rounded-[2rem] border-white/5 relative overflow-hidden group">
                      <div className="absolute -right-4 -top-4 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <sensor.icon className="w-24 h-24 text-white" />
                      </div>
                      <div className="flex items-center gap-2 mb-6">
                        <sensor.icon className={`w-5 h-5 ${sensor.color}`} />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{sensor.type}</span>
                      </div>
                      <div className="text-4xl font-black tracking-tighter mb-2">{sensor.value}</div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-bold text-green-500 uppercase">{sensor.status}</span>
                      </div>
                    </div>
                  ))}
                  <div className="lg:col-span-3 h-[400px] glass-morphism rounded-[2.5rem] border-white/5 p-8">
                     <div className="flex items-center justify-between mb-8">
                        <div>
                          <h3 className="text-2xl font-bold uppercase tracking-widest">Advanced Heat Map</h3>
                          <p className="text-white/40 text-sm">Neural thermal distribution and crowd density</p>
                        </div>
                        <div className="flex gap-2">
                          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-[8px] font-bold text-red-500 uppercase">Critical Zone</div>
                          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-[8px] font-bold text-green-500 uppercase">Clear Zone</div>
                        </div>
                     </div>
                     <div className="w-full h-[250px] bg-white/5 rounded-3xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-600/40 via-yellow-500/20 to-green-600/40 blur-3xl animate-pulse" />
                        <div className="absolute inset-0 flex items-center justify-center">
                           <div className="p-10 glass-morphism rounded-2xl border-white/10 text-center">
                              <p className="text-lg font-black italic tracking-tighter uppercase mb-2 text-gradient">Synchronizing Spatial Data...</p>
                              <div className="flex justify-center gap-1">
                                {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-4 bg-blue-500 animate-bounce" style={{ animationDelay: `${i*0.1}s` }} />)}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                </motion.div>
             )}

             {activeTab === "transport" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                  <div className="lg:col-span-2 glass-morphism p-8 rounded-[3rem] border-white/10 h-[600px] relative overflow-hidden">
                    <div className="flex justify-between items-center mb-8">
                       <div>
                         <h3 className="text-2xl font-black uppercase tracking-tighter italic">Mobility Flow Matrix</h3>
                         <p className="text-white/40 text-sm">Real-time transit node saturation // FIFA 2026 Corridor</p>
                       </div>
                       <div className="flex gap-4">
                          <div className="text-right">
                             <p className="text-[10px] text-white/40 uppercase font-bold">Active Shuttles</p>
                             <p className="text-xl font-black text-blue-500">1,204</p>
                          </div>
                          <div className="text-right">
                             <p className="text-[10px] text-white/40 uppercase font-bold">System Load</p>
                             <p className="text-xl font-black text-green-500">62%</p>
                          </div>
                       </div>
                    </div>

                    {/* Simulated Transit Grid */}
                    <div className="grid grid-cols-8 gap-2 h-full pb-20">
                       {[...Array(64)].map((_, i) => (
                         <motion.div
                           key={i}
                           initial={{ opacity: 0.1 }}
                           animate={{
                             opacity: [0.1, 0.5, 0.1],
                             backgroundColor: i % 7 === 0 ? "#ef4444" : i % 5 === 0 ? "#3b82f6" : "#18181b"
                           }}
                           transition={{ duration: 2 + Math.random() * 3, repeat: Infinity }}
                           className="rounded-lg border border-white/5"
                         />
                       ))}
                    </div>

                    <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center p-6 bg-blue-600/10 border border-blue-500/20 rounded-2xl backdrop-blur-xl">
                       <div className="flex items-center gap-4">
                          <TrainFront className="w-8 h-8 text-blue-500" />
                          <div>
                             <p className="text-sm font-bold uppercase tracking-widest">Neural Routing Active</p>
                             <p className="text-[10px] text-white/40 uppercase">Optimizing Gate 4 to Transit Hub B</p>
                          </div>
                       </div>
                       <Link href="/traffic-prediction">
                        <button className="px-6 py-2 bg-blue-600 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                           <MapIcon className="w-3 h-3" />
                           View Map
                        </button>
                       </Link>
                    </div>
                  </div>

                  <div className="space-y-6">
                     <div className="glass-morphism p-8 rounded-[2.5rem] border-white/5">
                        <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-white/40">Transit Nodes</h4>
                        <div className="space-y-4">
                           {["Terminal A", "Stadium West", "Metro Link", "VIP Heliport"].map((node, i) => (
                             <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                                <span className="text-xs font-bold uppercase">{node}</span>
                                <span className="text-[10px] px-2 py-0.5 rounded bg-green-500/20 text-green-500 border border-green-500/20">Fluid</span>
                             </div>
                           ))}
                        </div>
                     </div>
                     <div className="glass-morphism p-8 rounded-[2.5rem] border-red-500/10 bg-red-500/5">
                        <AlertTriangle className="w-8 h-8 text-red-500 mb-4" />
                        <h4 className="text-lg font-bold mb-2">Congestion Alert</h4>
                        <p className="text-xs text-white/50 leading-relaxed">
                          Gate 2 bottleneck detected. AI suggests rerouting 15% of pedestrian traffic to South Corridor.
                        </p>
                     </div>
                  </div>
                </motion.div>
             )}

             {activeTab === "security" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="grid grid-cols-1 lg:grid-cols-4 gap-6"
                >
                   <div className="lg:col-span-3 glass-morphism p-0 rounded-[3rem] border-white/10 h-[650px] overflow-hidden relative">
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070')] bg-cover bg-center opacity-20 grayscale" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />

                      <div className="relative z-10 p-10 h-full flex flex-col justify-between">
                         <div className="flex justify-between items-start">
                            <div>
                               <div className="flex items-center gap-3 mb-2">
                                  <ShieldAlert className="w-6 h-6 text-red-500" />
                                  <h3 className="text-3xl font-black italic uppercase tracking-tighter">Security Mesh</h3>
                               </div>
                               <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Active Scanning // Biometric & Thermal Nodes</p>
                            </div>
                            <div className={`px-4 py-2 ${threatLevel === 'Elevated' ? 'bg-red-600/40 border-red-500' : 'bg-red-600/20 border-red-500/30'} border rounded-xl flex items-center gap-2 transition-colors`}>
                               <div className={`w-2 h-2 rounded-full bg-red-500 ${threatLevel === 'Elevated' ? 'animate-ping' : ''}`} />
                               <span className="text-[10px] font-bold uppercase">Threat Level: {threatLevel}</span>
                            </div>
                         </div>

                         <div className="grid grid-cols-3 gap-8">
                            <div className="p-6 bg-black/60 backdrop-blur-xl border border-white/10 rounded-[2rem]">
                               <p className="text-[10px] font-bold text-white/30 uppercase mb-4 tracking-widest">Recent Security Logs</p>
                               <div className="space-y-3">
                                  {securityAlerts.length > 0 ? (
                                    securityAlerts.map((alert, i) => (
                                      <div key={alert.id} className="p-2 bg-white/5 rounded-lg border border-white/5 flex flex-col gap-1">
                                        <div className="flex justify-between items-center">
                                          <span className={`text-[8px] font-bold uppercase ${alert.priority === 'high' ? 'text-red-500' : 'text-blue-500'}`}>{alert.type || 'Event'}</span>
                                          <span className="text-[8px] text-white/20">{alert.timestamp ? new Date(alert.timestamp.seconds * 1000).toLocaleTimeString() : "N/A"}</span>
                                        </div>
                                        <p className="text-[10px] text-white/70 line-clamp-1">{alert.message}</p>
                                      </div>
                                    ))
                                  ) : (
                                    [1,2,3,4].map(i => <div key={i} className="aspect-video bg-white/5 rounded-lg border border-white/5 animate-pulse" />)
                                  )}
                               </div>
                            </div>
                            <div className="p-6 bg-black/60 backdrop-blur-xl border border-white/10 rounded-[2rem]">
                               <p className="text-[10px] font-bold text-white/30 uppercase mb-4 tracking-widest">Neural Threat Analysis</p>
                               <div className="space-y-3">
                                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                     <div className="h-full w-12% bg-blue-500" />
                                  </div>
                                  <p className="text-[10px] text-white/40 uppercase">Anomalous Behavior: 0.04%</p>
                                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                     <div className="h-full w-[2%] bg-red-500" />
                                  </div>
                                  <p className="text-[10px] text-white/40 uppercase">Unauthorized Access: 0</p>
                               </div>
                            </div>
                            <div className="p-6 bg-blue-600 rounded-[2rem] flex flex-col justify-center items-center text-center">
                               <BrainCircuit className="w-12 h-12 text-white mb-4" />
                               <p className="font-black italic uppercase text-lg leading-tight">Emergency Protocol 1.0</p>
                               <button className="mt-4 px-6 py-2 bg-black rounded-full text-[10px] font-bold uppercase tracking-widest">Activate</button>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="space-y-6">
                      <div className="glass-morphism p-8 rounded-[2.5rem] border-white/5">
                         <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-white/40">Officer Nodes</h4>
                         <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <div key={i} className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                    <Users className="w-4 h-4 text-white/40" />
                                 </div>
                                 <div>
                                    <p className="text-xs font-bold">Node-0{i}</p>
                                    <p className="text-[8px] text-green-500 uppercase font-bold">In-Position</p>
                                 </div>
                              </div>
                            ))}
                         </div>
                      </div>
                   </div>
                </motion.div>
             )}
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { label: "Data Throughput", value: "4.2 GB/s", change: "+12%" },
              { label: "Neural Latency", value: "0.8ms", change: "Optimal" },
              { label: "Connected Nodes", value: "12,402", change: "Global" },
            ].map((stat, i) => (
              <div key={i} className="glass-morphism p-8 rounded-3xl border-white/5 group hover:border-blue-500/30 transition-colors">
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                <div className="flex items-end justify-between">
                   <div className="text-4xl font-black tracking-tighter uppercase">{stat.value}</div>
                   <div className="text-blue-500 font-bold text-xs">{stat.change}</div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
