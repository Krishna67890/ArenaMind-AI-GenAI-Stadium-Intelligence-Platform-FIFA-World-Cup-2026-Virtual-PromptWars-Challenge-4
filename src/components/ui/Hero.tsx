"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Cpu, Users, ShieldAlert, Globe } from "lucide-react";
import dynamic from "next/dynamic";
import Magnetic from "./Magnetic";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

// Dynamically import the 3D visual with SSR disabled to prevent React 19 reconciler conflicts
const HeroVisual = dynamic(() => import("./HeroVisual"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
    </div>
  )
});

export const Hero = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="scanline" />
      </div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-8"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-blue-400 text-sm font-medium w-fit"
          >
            <Cpu className="w-4 h-4" aria-hidden="true" />
            <span>Next-Gen Stadium OS</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl font-bold leading-tight"
          >
            {t("heroTitle").split(" ")[0]} <span className="text-gradient">{t("heroTitle").split(" ")[1]}</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-white/60 max-w-xl leading-relaxed"
          >
            {t("heroSubtitle")} The official AI-driven Command & Control center for the <span className="text-white font-bold">FIFA World Cup 2026</span>. Orchestrating 16 host cities with real-time spatial intelligence, neural crowd management, and zero-latency fan accessibility across North America.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4"
          >
            <Magnetic>
              <Link href={user ? "/launch-platform" : "/login"}>
                <button
                  className="btn-primary flex items-center gap-2"
                >
                  {t("launchPlatform")} <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </Magnetic>
            <Magnetic>
              <button
                onClick={() => window.open('https://youtu.be/HRLPRi5-Se4?si=pUUADbEAuBb2EwM8', '_blank')}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full font-medium transition-all flex items-center gap-2 border border-white/10"
              >
                <Play className="w-4 h-4" /> {t("watchOverview")}
              </button>
            </Magnetic>
          </motion.div>


          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-8 mt-12 border-t border-white/10 pt-8"
          >
            <div>
              <div className="text-2xl font-bold text-white">500k+</div>
              <div className="text-sm text-white/40">{t("visitorsAssisted")}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">12k+</div>
              <div className="text-sm text-white/40">{t("aiDecisions")}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">99.9%</div>
              <div className="text-sm text-white/40">{t("safetyRating")}</div>
            </div>
          </motion.div>
        </motion.div>

        <div className="relative h-[500px] w-full hidden lg:block">
          {mounted && <HeroVisual />}

          {/* Floating AI Cards */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 right-0 glass-card p-4 flex items-center gap-4"
          >
            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <div className="text-xs text-white/40">{t("crowdDensity")}</div>
              <div className="text-sm font-bold">Optimal (42%)</div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-10 left-0 glass-card p-4 flex items-center gap-4"
          >
            <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <div className="text-xs text-white/40">{t("securityAlert")}</div>
              <div className="text-sm font-bold">None Detected</div>
            </div>
          </motion.div>

          <motion.div
            animate={{ x: [0, 15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/2 -right-10 glass-card p-4 flex items-center gap-4"
          >
            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
              <Globe className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <div className="text-xs text-white/40">{t("activeLanguages")}</div>
              <div className="text-sm font-bold">24 Supported</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
