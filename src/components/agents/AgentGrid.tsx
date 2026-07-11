import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import {
  Navigation, Users, ShieldAlert, HeartPulse,
  Bus, Accessibility, Languages, Leaf,
  CloudSun, Settings, Brain, ChevronRight,
  Activity, ListTodo, History, Zap
} from "lucide-react";

export const AgentGrid = () => {
  const { t } = useLanguage();

  const agents = [
    {
      id: "nav",
      name: t("smartMobility"),
      icon: Navigation,
      status: "Optimal",
      confidence: 98,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      reasoning: "Analyzing real-time pedestrian flow and gate occupancy to calculate the fastest routes."
    },
    {
      id: "crowd",
      name: t("crowdDensity"),
      icon: Users,
      status: "Monitoring",
      confidence: 95,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      reasoning: "Predicting density clusters in the North Stand. Recommend opening Gate C early."
    },
    {
      id: "emergency",
      name: t("emergency"),
      icon: ShieldAlert,
      status: "Standby",
      confidence: 99,
      color: "text-red-500",
      bg: "bg-red-500/10",
      reasoning: "Scanning for irregular movement patterns and high-decibel anomalies across 400 sensors."
    },
    {
      id: "medical",
      name: t("medical"),
      icon: HeartPulse,
      status: "Ready",
      confidence: 96,
      color: "text-green-500",
      bg: "bg-green-500/10",
      reasoning: "Dispatching volunteer #402 to Sector 4 for minor heat exhaustion support."
    },
    {
      id: "transport",
      name: t("transport"),
      icon: Bus,
      status: "Heavy Traffic",
      confidence: 92,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      reasoning: "Synchronizing metro departures with match-end prediction for zero-wait boarding."
    },
    {
      id: "accessibility",
      name: "Accessibility AI",
      icon: Accessibility,
      status: "Active",
      confidence: 97,
      color: "text-cyan-500",
      bg: "bg-cyan-500/10",
      reasoning: "Verifying wheelchair elevator functionality and providing sign-language video guides."
    },
    {
      id: "translation",
      name: "Translation AI",
      icon: Languages,
      status: "Active",
      confidence: 99,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
      reasoning: "Translating stadium announcements into 24 languages in real-time for visiting fans."
    },
    {
      id: "sustainability",
      name: t("sustainability"),
      icon: Leaf,
      status: "Eco-Mode",
      confidence: 94,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      reasoning: "Optimizing stadium lighting based on natural sunlight levels and seating occupancy."
    },
    {
      id: "food",
      name: t("foodAI"),
      icon: Zap,
      status: "Efficient",
      confidence: 93,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
      reasoning: "Predicting peak demand at Concourse B kiosks. Suggesting dynamic menu rotation."
    },
    {
      id: "weather",
      name: "Weather Intelligence",
      icon: CloudSun,
      status: "Clear",
      confidence: 98,
      color: "text-sky-500",
      bg: "bg-sky-500/10",
      reasoning: "Analyzing micro-climate data. Retractable roof scheduled to remain open for the duration."
    },
    {
      id: "volunteer",
      name: "Volunteer Orchestrator",
      icon: ListTodo,
      status: "Balanced",
      confidence: 96,
      color: "text-pink-500",
      bg: "bg-pink-500/10",
      reasoning: "Reassigning 5 volunteers from VIP to General Admission for crowd flow support."
    },
    {
      id: "security",
      name: "Security Sentinel",
      icon: ShieldAlert,
      status: "Alert",
      confidence: 99,
      color: "text-rose-600",
      bg: "bg-rose-600/10",
      reasoning: "Autonomous drone patrol reporting zero perimeter breaches. Facial recognition enabled at Gate 4."
    },
    {
      id: "energy",
      name: "Energy Grid AI",
      icon: Settings,
      status: "Optimized",
      confidence: 97,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      reasoning: "Balancing solar storage with grid draw. Peak shave mode active for second half."
    },
    {
      id: "fan",
      name: "Fan Engagement AI",
      icon: Activity,
      status: "High",
      confidence: 94,
      color: "text-violet-500",
      bg: "bg-violet-500/10",
      reasoning: "Analyzing crowd sentiment via decibel levels. Triggering light show for goal celebration."
    },
    {
      id: "regulations",
      name: "Logistics & Regulations",
      icon: ListTodo,
      status: "Verified",
      confidence: 100,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
      reasoning: "Monitoring compliance with FIFA 2026 SAOT and VAR protocols. All stadium security clearances verified."
    },
    {
      id: "executive",
      name: "Executive AI",
      icon: Brain,
      status: "Syncing",
      confidence: 100,
      color: "text-slate-200",
      bg: "bg-white/10",
      reasoning: "Synthesizing data from all 14 agents to provide strategic overview for venue directors.",
      advanced: true
    }
  ];

  const [selectedAgent, setSelectedAgent] = useState(agents[0]);

  return (
    <section id="agents" className="py-24 bg-black/50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            {t("agentEcosystemTitle")} <span className="text-gradient">{t("agentEcosystemHighlight")}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/40 max-w-2xl"
          >
            {t("agentEcosystemSubtitle")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Agent Selection List */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            {agents.map((agent, index) => (
              <motion.button
                key={agent.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedAgent(agent)}
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all cyber-border hologram-effect ${
                  selectedAgent.id === agent.id
                  ? "bg-white/10 border-white/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                  : "bg-transparent border-white/5 hover:bg-white/[0.02]"
                }`}
                aria-label={`Select ${agent.name}`}
                aria-pressed={selectedAgent.id === agent.id}
              >
                <div className={`w-10 h-10 rounded-xl ${agent.bg} flex items-center justify-center`} aria-hidden="true">
                  <agent.icon className={`w-5 h-5 ${agent.color}`} />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-bold">{agent.name}</div>
                  <div className="text-xs text-white/40">{agent.status}</div>
                </div>
                {selectedAgent.id === agent.id && <ChevronRight className="w-4 h-4 text-white/40" aria-hidden="true" />}
              </motion.button>
            ))}
          </div>

          {/* Agent Detail Panel */}
          <motion.div
            key={selectedAgent.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2 glass-morphism rounded-3xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <selectedAgent.icon className="w-64 h-64 text-white" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-16 h-16 rounded-2xl ${selectedAgent.bg} flex items-center justify-center relative`}>
                  <selectedAgent.icon className={`w-8 h-8 ${selectedAgent.color} relative z-10`} />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`absolute inset-0 rounded-2xl ${selectedAgent.bg} blur-xl`}
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold group-hover:animate-glitch">{selectedAgent.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></span>
                    <span className="text-xs text-green-500 font-black uppercase tracking-widest">{t("activeReasoning")}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="glass-card relative overflow-hidden group/reason">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover/reason:opacity-100 transition-opacity" />
                  <div className="flex items-center gap-2 text-white/40 mb-4">
                    <Brain className="w-4 h-4 text-blue-400" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t("neuralOutput")}</span>
                  </div>
                  <motion.p
                    key={selectedAgent.reasoning}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-white/80 leading-relaxed italic font-medium relative z-10"
                  >
                    "{selectedAgent.reasoning}"
                  </motion.p>
                </div>
                <div className="glass-card">
                  <div className="flex items-center gap-2 text-white/40 mb-2">
                    <Activity className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">{t("confidenceLevel")}</span>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-gradient">{selectedAgent.confidence}%</span>
                    <span className="text-sm text-white/20 pb-1">{t("certaintyIndex")}</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full mt-4">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedAgent.confidence}%` }}
                      className={`h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500`}
                    />
                  </div>
                </div>
              </div>

              {selectedAgent.advanced && (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="glass-card border-blue-500/30">
                     <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">{t("neuralSynergy")}</div>
                     <div className="text-xl font-bold">99.8%</div>
                     <div className="text-[10px] text-white/40 mt-1">{t("crossAgentSync")}</div>
                  </div>
                  <div className="glass-card border-purple-500/30">
                     <div className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-2">{t("latency")}</div>
                     <div className="text-xl font-bold">1.2ms</div>
                     <div className="text-[10px] text-white/40 mt-1">{t("realTimeProcessing")}</div>
                  </div>
                  <div className="glass-card border-green-500/30">
                     <div className="text-[10px] font-bold text-green-400 uppercase tracking-widest mb-2">{t("activeNodes")}</div>
                     <div className="text-xl font-bold">14,204</div>
                     <div className="text-[10px] text-white/40 mt-1">{t("sensorNetwork")}</div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-white/40">
                  <History className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">{t("recentTaskLogs")}</span>
                </div>
                <div className="space-y-2">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                        <span className="text-sm text-white/60">Executing sub-task protocol AX-{100 + i}</span>
                      </div>
                      <span className="text-[10px] text-white/20">2m ago</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
