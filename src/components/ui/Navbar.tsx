"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Menu, User, Languages, ChevronDown, Search } from "lucide-react";
import { NotificationCenter } from "../notifications/NotificationCenter";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { AuthModal } from "../auth/AuthModal";
import Magnetic from "./Magnetic";

export const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const { user, role, logout } = useAuth();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "hi", name: "हिन्दी" },
    { code: "ar", name: "العربية" },
    { code: "ja", name: "日本語" },
    { code: "pt", name: "Português" },
  ];

  const navLinks = user
    ? [
        { href: "/", label: "home" },
        { href: "/arena-verse", label: "arenaVerse" },
        { href: "/digital-twin", label: "digitalTwin" },
        { href: "/agents", label: "agents" },
        { href: "/launch-platform", label: "launch" },
        { href: "/schedule-demo", label: "demo" },
        { href: "/food-menu", label: "menu" },
        { href: "/about", label: "about" },
        { href: "/profile", label: "profile" },
      ]
    : [
        { href: "/", label: "home" },
        { href: "/features", label: "features" },
        { href: "/pricing", label: "pricing" },
        { href: "/contact", label: "contact" },
      ];

  const handleAuthAction = () => {
    setIsAuthOpen(true);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-black/20 border-b border-white/10">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2" aria-label="ArenaMind AI Home">
            <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-lg flex items-center justify-center" aria-hidden="true">
              <span className="font-bold text-white text-xl">A</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">ArenaMind AI</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Magnetic key={link.href}>
                <Link href={link.href} className="nav-link">{t(link.label)}</Link>
              </Magnetic>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <div className="relative">
            <Magnetic>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 rounded-xl transition-colors text-white/70 hover:text-white"
                aria-label="Change Language"
                aria-expanded={isLangOpen}
                aria-haspopup="true"
              >
                <Languages className="w-4 h-4" />
                <span className="text-xs font-bold uppercase">{language}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isLangOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
            </Magnetic>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full right-0 mt-2 w-48 glass-morphism rounded-xl border-white/10 p-1 overflow-hidden shadow-2xl z-[100]"
                >
                  <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as any);
                          setIsLangOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-xs font-medium transition-colors ${
                          language === lang.code ? "bg-blue-600 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        {lang.name}
                        {language === lang.code && <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]"></div>}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Magnetic>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors hidden sm:block" aria-label="Search">
              <Search className="w-5 h-5 text-white/70" aria-hidden="true" />
            </button>
          </Magnetic>
          <Magnetic>
            <NotificationCenter />
          </Magnetic>

          <Magnetic>
            {user ? (
              <div className="flex items-center gap-3 pl-2">
                <div className="hidden lg:block text-right">
                  <p className="text-[10px] font-bold text-white uppercase tracking-tighter leading-none">{user.displayName || "User"}</p>
                  <p className="text-[8px] text-white/40 uppercase tracking-widest">{role}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center border border-white/20 shadow-lg shadow-blue-500/20">
                  <span className="text-xs font-bold text-white">{user.displayName?.charAt(0) || user.email?.charAt(0)}</span>
                </div>
                <button
                  onClick={() => logout()}
                  className="px-4 py-2 bg-white/5 hover:bg-red-500/10 hover:text-red-500 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all border border-white/5 hover:border-red-500/20"
                >
                  {t("logout")}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="px-6 py-2.5 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all text-sm font-bold uppercase tracking-widest"
                >
                  {t("login")}
                </button>
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-full text-sm font-bold uppercase tracking-widest shadow-lg shadow-blue-600/20 transition-all"
                >
                  {t("register")}
                </button>
              </div>
            )}
          </Magnetic>

          <button
            className="md:hidden p-2 text-white/70 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-zinc-950 flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="font-bold text-white text-xl">A</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-white/40 hover:text-white"
              >
                {t("closeMenu")}
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-4xl font-bold text-white hover:text-blue-500 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t(link.label)}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto pt-8 border-t border-white/10">
              <div className="flex items-center gap-4">
                 <button className="flex-1 py-4 bg-white/5 rounded-2xl text-sm font-bold border border-white/10">
                    {t("helpCenter")}
                 </button>
                 <button className="flex-1 py-4 bg-blue-600 rounded-2xl text-sm font-bold shadow-lg shadow-blue-600/20">
                    {t("emergency")}
                 </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};
