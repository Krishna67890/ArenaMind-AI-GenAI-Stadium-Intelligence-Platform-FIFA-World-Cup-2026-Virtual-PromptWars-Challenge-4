"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const LoadingScreen = ({ duration = 2000, isLoading }: { duration?: number, isLoading?: boolean }) => {
  const [internalLoading, setInternalLoading] = useState(true);
  const [logIndex, setLogIndex] = useState(0);

  const logs = [
    "Initializing Spatial OS...",
    "Connecting to World Cup Grid...",
    "Syncing 15 Multi-Agent Nodes...",
    "Calibrating Crowd Sensors...",
    "Establishing Secure FIFA Protocol...",
    "Neural Network Online."
  ];

  useEffect(() => {
    const timer = setTimeout(() => setInternalLoading(false), duration);
    const logInterval = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % logs.length);
    }, 600);

    return () => {
      clearTimeout(timer);
      clearInterval(logInterval);
    };
  }, [duration]);

  const active = isLoading !== undefined ? isLoading : internalLoading;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Matrix-like background effect */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent animate-pulse" />
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-8 relative z-10"
          >
            <div className="relative">
              <motion.div
                animate={{
                  rotate: 360,
                  borderRadius: ["20%", "50%", "20%"],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 bg-gradient-to-tr from-blue-600 via-purple-600 to-blue-400 shadow-[0_0_50px_rgba(37,99,235,0.3)]"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-black text-white italic">A</span>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <motion.h2
                className="text-3xl font-bold tracking-[0.2em] text-white uppercase"
              >
                ArenaMind <span className="text-gradient">AI</span>
              </motion.h2>

              {/* Terminal Log */}
              <div className="h-6 mt-4 overflow-hidden">
                <motion.p
                  key={logIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className="text-[10px] font-mono text-blue-400 uppercase tracking-widest"
                >
                  {logs[logIndex]}
                </motion.p>
              </div>

              <div className="w-48 h-[2px] bg-white/10 mt-6 relative overflow-hidden rounded-full">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3.5, ease: "easeInOut" }}
                  className="h-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"
                />
              </div>
            </div>
          </motion.div>

          <div className="absolute bottom-8 left-8 flex gap-4 opacity-20">
            <div className="w-1 h-8 bg-blue-500 animate-pulse" />
            <div className="w-1 h-8 bg-blue-500 animate-pulse [animation-delay:0.2s]" />
            <div className="w-1 h-8 bg-blue-500 animate-pulse [animation-delay:0.4s]" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
