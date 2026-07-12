"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, Shield, Cloud, Trophy, Info, MapPin, CheckCircle } from "lucide-react";
import { Notification } from "@/context/NotificationContext";

export const NotificationToast = () => {
  const [activeNotification, setActiveNotification] = useState<Notification | null>(null);

  useEffect(() => {
    const handleNewNotif = (e: CustomEvent<Notification>) => {
      setActiveNotification(e.detail);
      // Auto-hide after 5 seconds
      setTimeout(() => {
        setActiveNotification(null);
      }, 5000);
    };

    window.addEventListener("new-notification", handleNewNotif as EventListener);
    window.addEventListener("show-notification", handleNewNotif as EventListener);
    return () => {
      window.removeEventListener("new-notification", handleNewNotif as EventListener);
      window.removeEventListener("show-notification", handleNewNotif as EventListener);
    };
  }, []);

  if (!activeNotification) return null;

  const getIcon = () => {
    switch (activeNotification.type) {
      case "security": return <Shield className="w-5 h-5 text-red-500" />;
      case "weather": return <Cloud className="w-5 h-5 text-blue-400" />;
      case "match": return <Trophy className="w-5 h-5 text-yellow-500" />;
      case "traffic": return <MapPin className="w-5 h-5 text-orange-500" />;
      case "success": return <CheckCircle className="w-5 h-5 text-green-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 100, y: 0 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        exit={{ opacity: 0, x: 100 }}
        className="fixed top-8 right-8 z-[200] w-80 glass-morphism p-5 rounded-[2rem] border border-white/10 shadow-2xl flex gap-4 items-start"
      >
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
          {getIcon()}
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-1">
             <h4 className="text-xs font-black uppercase tracking-tighter text-white/90">{activeNotification.title}</h4>
             <button onClick={() => setActiveNotification(null)}>
                <X className="w-3 h-3 text-white/20 hover:text-white transition-colors" />
             </button>
          </div>
          <p className="text-[10px] text-white/40 leading-relaxed font-medium">
            {activeNotification.message}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 h-1 bg-blue-600 rounded-full animate-toast-progress" style={{ width: '100%' }} />
      </motion.div>
    </AnimatePresence>
  );
};
