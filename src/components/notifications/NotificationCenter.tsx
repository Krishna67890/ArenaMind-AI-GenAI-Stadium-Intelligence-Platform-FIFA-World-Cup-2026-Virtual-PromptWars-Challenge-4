"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, Trash2, Calendar, ShieldAlert, CloudRain, Info, Car } from "lucide-react";
import { useNotifications, Notification } from "@/context/NotificationContext";

export const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, deleteNotification } = useNotifications();

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "match": return <Calendar className="w-4 h-4 text-blue-500" />;
      case "security": return <ShieldAlert className="w-4 h-4 text-red-500" />;
      case "weather": return <CloudRain className="w-4 h-4 text-cyan-500" />;
      case "traffic": return <Car className="w-4 h-4 text-yellow-500" />;
      default: return <Info className="w-4 h-4 text-white/40" />;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-white/10 rounded-full transition-colors relative"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5 text-white/70" aria-hidden="true" />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 w-4 h-4 bg-red-500 rounded-full border-2 border-black text-[8px] font-black flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-full right-0 mt-4 w-[400px] glass-morphism rounded-[2.5rem] border border-white/10 shadow-2xl z-[110] overflow-hidden"
            >
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h3 className="text-sm font-black italic uppercase tracking-widest">Neural Notifications</h3>
                <button onClick={() => setIsOpen(false)} className="text-white/20 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="max-h-[500px] overflow-y-auto custom-scrollbar p-4 space-y-4">
                {notifications.length === 0 ? (
                  <div className="py-12 text-center">
                    <Bell className="w-8 h-8 text-white/5 mx-auto mb-4" />
                    <p className="text-xs font-bold text-white/20 uppercase tracking-[0.2em]">System Clear</p>
                  </div>
                ) : (
                  notifications.map((n) => (
                    <motion.div
                      layout
                      key={n.id}
                      onClick={() => markAsRead(n.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer relative group ${
                        n.read ? "bg-white/2 border-white/5 opacity-60" : "bg-white/5 border-blue-500/20"
                      }`}
                    >
                      <div className="flex gap-4">
                         <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                            {getIcon(n.type)}
                         </div>
                         <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-1">
                               <p className="text-[10px] font-black uppercase tracking-widest text-white/90 truncate mr-2">{n.title}</p>
                               <span className="text-[8px] text-white/20 whitespace-nowrap uppercase">{new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            <p className="text-[11px] text-white/50 leading-relaxed font-medium">{n.message}</p>
                         </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(n.id);
                        }}
                        className="absolute top-2 right-2 p-1.5 opacity-0 group-hover:opacity-100 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-all"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </motion.div>
                  ))
                )}
              </div>

              {notifications.length > 0 && (
                <div className="p-4 bg-white/5 text-center">
                  <p className="text-[8px] font-bold text-white/20 uppercase tracking-[0.3em]">ArenaMind OS v1.0.4</p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
