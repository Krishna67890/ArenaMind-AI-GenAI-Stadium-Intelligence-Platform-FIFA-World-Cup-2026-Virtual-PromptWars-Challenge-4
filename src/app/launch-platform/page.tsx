"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Rocket, Server, ShieldCheck, Cpu, Globe2, Zap, CheckCircle2, Cloud, Terminal, LucideIcon } from "lucide-react";

export default function LaunchPlatformPage() {
  const [logs, setLogs] = React.useState<string[]>([
    "INITIALIZING ARENA-MIND CORE V1.0...",
    "ESTABLISHING SECURE HANDSHAKE... SUCCESS",
    "LOADING SPATIAL GEOMETRY... 4.2GB LOADED",
    "BOOTING GEMINI-FLASH-1.5... ONLINE",
  ]);

  React.useEffect(() => {
    const newLogs = [
      "SYNCHRONIZING MULTI-AGENT NODES...",
      "CALIBRATING EDGE COMPUTING NODES...",
      "VERIFYING FIREBASE PERSISTENCE...",
      "OPTIMIZING STADIUM MESH RENDERING...",
      "SCANNING TRAFFIC PREDICTION MODELS...",
      "NEURAL LINK ESTABLISHED WITH DALL'ARA",
      "ACTIVE MONITORING: ENABLED"
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < newLogs.length) {
        setLogs(prev => [...prev.slice(-8), newLogs[i]]);
        i++;
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const stats: { icon: LucideIcon; label: string; value: string; color: string; trend: string }[] = [
    { icon: Server, label: "Cloud Status", value: "Operational", color: "green", trend: "+12.4ms" },
    { icon: Zap, label: "Gemini AI", value: "Neural Link: Active", color: "blue", trend: "98.2% Accuracy" },
    { icon: ShieldCheck, label: "Security", value: "Protocols: Encrypted", color: "purple", trend: "0 Breaches" },
    { icon: Globe2, label: "CDN", value: "Edge Nodes: 142", color: "yellow", trend: "Global Sync" },
  ];

  const deploymentSteps = [
    "Initialize Neural Core Architecture",
    "Establish Secure FIFA Data Pipeline",
    "Calibrate Spatial Intelligence Nodes",
    "Synchronize 3D Digital Twin Assets",
    "Deploy Multi-Agent Communication Bus",
    "Finalize Edge Computing Infrastructure"
  ];

  return (
    <ProtectedRoute redirectTo="/register">
      <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
        <Navbar />

        <main className="pt-32 pb-20 px-6 max-w-[1400px] mx-auto">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.4)]">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold uppercase tracking-[0.3em] text-blue-500">ArenaLaunch 1.0</h2>
              </div>
              <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter uppercase leading-[0.8] mb-8">
                The <span className="text-gradient">Core</span> <br /> Platform
              </h1>
              <p className="text-white/50 text-xl leading-relaxed max-w-lg mb-12">
                Enterprise-grade deployment architecture for the FIFA 2026 World Cup. Launch, monitor, and scale AI-driven stadium ecosystems from a single unified command interface.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("open-payment-modal", { detail: { name: "Deployment License", price: "Purchase" } }))}
                  className="px-10 py-5 bg-blue-600 rounded-2xl font-black uppercase tracking-widest text-sm shadow-[0_0_40px_rgba(37,99,235,0.3)] hover:bg-blue-500 transition-all group"
                >
                  Purchase
                  <Rocket className="w-4 h-4 inline-block ml-3 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all">
                  Documentation
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative"
            >
               {/* Terminal UI */}
               <div className="glass-morphism rounded-[2.5rem] border-white/10 p-8 shadow-2xl overflow-hidden relative group">
                  <div className="flex items-center gap-2 mb-6">
                     <div className="w-3 h-3 rounded-full bg-red-500" />
                     <div className="w-3 h-3 rounded-full bg-yellow-500" />
                     <div className="w-3 h-3 rounded-full bg-green-500" />
                     <span className="ml-4 text-[10px] font-mono text-white/30 uppercase tracking-widest">arena-os-deploy.sh</span>
                  </div>

                  <div className="space-y-3 font-mono text-sm h-[200px] overflow-hidden">
                    {logs.map((log, i) => (
                      <p key={i} className={i === logs.length - 1 ? "text-blue-400 animate-pulse" : "text-white/60"}>
                        {i === logs.length - 1 ? "> " : "> "}{log}
                      </p>
                    ))}
                    <div className="pt-4 flex items-center gap-4">
                       <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "94%" }}
                            transition={{ duration: 10, repeat: Infinity }}
                            className="h-full bg-blue-500 shadow-[0_0_15px_#3b82f6]"
                          />
                       </div>
                       <span className="text-blue-400 text-xs">94% SYSTEM STABILITY</span>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
               </div>

               {/* Floating elements */}
               <div className="absolute -top-10 -right-10 glass-morphism p-6 rounded-3xl border-white/10 animate-bounce-slow">
                  <Cloud className="w-10 h-10 text-blue-500" />
               </div>
               <div className="absolute -bottom-10 -left-10 glass-morphism p-6 rounded-3xl border-white/10 animate-pulse">
                  <Terminal className="w-10 h-10 text-purple-500" />
               </div>
            </motion.div>
          </div>

          {/* Infrastructure Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-morphism p-8 rounded-[2rem] border-white/5 hover:border-blue-500/20 transition-all group"
                >
                  <div className={`w-12 h-12 rounded-2xl mb-6 flex items-center justify-center bg-${stat.color}-500/10 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-500`} />
                  </div>
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-lg font-bold text-white/90">{stat.value}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className={`text-[10px] font-bold text-${stat.color}-400 bg-${stat.color}-500/10 px-2 py-0.5 rounded-full`}>
                      {stat.trend}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Deployment Checklist */}
          <div className="glass-morphism rounded-[3rem] border-white/5 p-12 overflow-hidden relative">
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="relative z-10 flex flex-col md:flex-row justify-between gap-12">
               <div className="max-w-md">
                  <h2 className="text-4xl font-black italic tracking-tighter uppercase mb-6">Launch Protocol</h2>
                  <p className="text-white/50 mb-8 leading-relaxed">
                    Our multi-stage deployment sequence ensures maximum reliability and security for high-density stadium environments.
                  </p>
                  <button className="flex items-center gap-3 text-blue-400 font-bold uppercase tracking-widest text-sm group">
                    View Full Checklist
                    <CheckCircle2 className="w-5 h-5 group-hover:scale-125 transition-transform" />
                  </button>
               </div>

               <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {deploymentSteps.map((step, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-[10px] font-bold text-blue-400">
                        {i + 1}
                      </div>
                      <span className="text-xs font-medium text-white/70">{step}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
