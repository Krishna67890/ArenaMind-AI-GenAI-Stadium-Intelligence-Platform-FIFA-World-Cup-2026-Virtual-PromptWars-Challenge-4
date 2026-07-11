"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, Map, Users, Shield, Terminal, Zap, X, Globe } from "lucide-react";
import { useRouter } from "next/navigation";

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const items = [
    { name: "Live Dashboard", icon: Terminal, href: "/dashboard", category: "General" },
    { name: "Digital Twin", icon: Map, href: "/digital-twin", category: "General" },
    { name: "ArenaVerse 3D", icon: Globe, href: "/arena-verse", category: "General" },
    { name: "AI Tour Guide", icon: Zap, href: "/arena-verse", category: "Intelligence" },
    { name: "Route Detection", icon: Map, href: "/arena-verse", category: "Intelligence" },
    { name: "AI Agents", icon: Zap, href: "/agents", category: "General" },
    { name: "Food & Beverage", icon: Users, href: "/food-menu", category: "Experience" },
    { name: "Match Schedule", icon: Zap, href: "/schedule-demo", category: "Experience" },
    { name: "Security Protocols", icon: Shield, href: "/dashboard", category: "Operations" },
  ];

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[150] flex items-start justify-center pt-[15vh] px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="relative w-full max-w-xl bg-[#111111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
              role="combobox"
              aria-expanded="true"
              aria-haspopup="listbox"
              aria-controls="command-palette-options"
            >
              <div className="flex items-center px-4 border-b border-white/5">
                <Search className="w-5 h-5 text-white/40" aria-hidden="true" />
                <input
                  autoFocus
                  className="flex-1 px-4 py-5 bg-transparent border-none outline-none text-white placeholder-white/20 text-sm"
                  placeholder="Search commands (e.g. 'crowd', 'gate b', 'agents')..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Search commands"
                  aria-autocomplete="list"
                  aria-controls="command-palette-options"
                />
                <div className="flex items-center gap-1 px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-white/40" aria-hidden="true">
                  <Command className="w-3 h-3" />
                  <span>K</span>
                </div>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-hide" id="command-palette-options" role="listbox">
                {filteredItems.length > 0 ? (
                  <div className="flex flex-col gap-1">
                    {filteredItems.map((item, i) => (
                      <button
                        key={item.name}
                        role="option"
                        onClick={() => {
                          if (item.name === "AI Tour Guide") {
                            router.push(item.href);
                            setTimeout(() => {
                              window.dispatchEvent(new CustomEvent("arena-command", { detail: "COMMAND_AI_TOUR" }));
                            }, 1000);
                          } else if (item.name === "Route Detection") {
                            router.push(item.href);
                            setTimeout(() => {
                              window.dispatchEvent(new CustomEvent("arena-command", { detail: "COMMAND_DETECT_ROUTE" }));
                            }, 1000);
                          } else {
                            router.push(item.href);
                          }
                          setIsOpen(false);
                        }}
                        className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 text-white/60 hover:text-white transition-all group"
                      >
                        <item.icon className="w-4 h-4 text-white/20 group-hover:text-blue-500 transition-colors" aria-hidden="true" />
                        <span className="text-sm font-medium">{item.name}</span>
                        <span className="ml-auto text-[10px] uppercase tracking-widest text-white/10 group-hover:text-white/30">
                          {item.category}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-sm text-white/20 italic">No results found for "{search}"</p>
                  </div>
                )}
              </div>

              <div className="px-4 py-3 bg-white/[0.02] border-t border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-4">
                   <div className="flex items-center gap-1 text-[10px] text-white/20 uppercase font-bold">
                      <span className="p-1 rounded bg-white/5 border border-white/5">↑↓</span>
                      <span>Navigate</span>
                   </div>
                   <div className="flex items-center gap-1 text-[10px] text-white/20 uppercase font-bold">
                      <span className="p-1 rounded bg-white/5 border border-white/5">↵</span>
                      <span>Select</span>
                   </div>
                </div>
                <div className="text-[10px] text-white/20 font-bold uppercase">
                  ArenaMind AI · v1.0.4
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Shortcut Hint */}
      <div className="fixed bottom-8 left-8 hidden md:block">
         <button
           onClick={() => setIsOpen(true)}
           className="px-4 py-2 glass-card flex items-center gap-2 hover:border-blue-500/50 transition-all group"
         >
            <Command className="w-3 h-3 text-white/40 group-hover:text-blue-500" />
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest group-hover:text-white">Press ⌘K to search</span>
         </button>
      </div>
    </>
  );
};
