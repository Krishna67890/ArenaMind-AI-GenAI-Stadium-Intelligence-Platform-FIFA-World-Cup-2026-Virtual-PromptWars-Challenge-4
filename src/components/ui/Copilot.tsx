"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import {
  Ticket, MapPin, Languages, Clock,
  Bus, Accessibility, Utensils, ArrowRight,
  Download, Sparkles, ChevronRight, X,
  CheckCircle2, Info, LucideIcon
} from "lucide-react";
import { askGemini } from "@/services/gemini";
import { sanitizeInput } from "@/services/utils";

interface ItineraryItem {
  time: string;
  task: string;
  icon: LucideIcon;
}

interface Itinerary {
  schedule: ItineraryItem[];
  recommendations: string[];
}

import { useCopilot } from "@/hooks/useCopilot";

export const Copilot = () => {
  const { t } = useLanguage();
  const {
    step,
    setStep,
    formData,
    setFormData,
    isGenerating,
    itinerary,
    handleGenerate
  } = useCopilot();

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await askGemini("Generate a matchday itinerary for seat " + formData.seat + " arriving at " + formData.arrivalTime + " via " + formData.transport);

      if (response.startsWith("COMMAND_GENERATE_ITINERARY|")) {
        const content = response.split("|")[1];
        const lines = content.split("\n");
        const schedule = lines.slice(1).map(line => {
          const parts = line.split(" - ");
          let icon = Info;
          if (line.toLowerCase().includes("shuttle") || line.toLowerCase().includes("metro")) icon = Bus;
          if (line.toLowerCase().includes("lounge") || line.toLowerCase().includes("link")) icon = Sparkles;
          if (line.toLowerCase().includes("pitch") || line.toLowerCase().includes("briefing")) icon = MapPin;
          if (line.toLowerCase().includes("kick-off") || line.toLowerCase().includes("monitoring")) icon = Ticket;
          if (line.toLowerCase().includes("crowd") || line.toLowerCase().includes("analysis")) icon = Clock;

          return {
            time: parts[0].replace(/^\d+\.\s/, ""),
            task: parts[1],
            icon
          };
        });

        setItinerary({
          schedule: schedule,
          recommendations: [
            "Use the North Ramp for a smoother walking route.",
            "Restrooms in Sector 3 are currently less crowded.",
            "Post-match: Special shuttle to Downtown leaves every 5 mins from Gate 2."
          ]
        });
      }
    } catch (error) {
      console.error("AI Generation error:", error);
    } finally {
      setIsGenerating(false);
      setStep(3);
    }
  };

  return (
    <section id="copilot" className="py-24 bg-black relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t("copilotBadge")}</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">{t("copilotTitle")} <span className="text-gradient">{t("copilotTitleHighlight")}</span></h2>
            <p className="text-white/40 text-lg">
              {t("copilotSubtitle")}
            </p>
          </div>

          <div className="glass-morphism rounded-[3rem] p-8 md:p-12 border-white/10 relative overflow-hidden">
            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-4 mb-12">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    step >= s ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]" : "bg-white/5 text-white/40 border border-white/10"
                  }`}>
                    {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
                  </div>
                  {s < 3 && <div className={`w-12 h-0.5 rounded-full ${step > s ? "bg-blue-600" : "bg-white/5"}`} />}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/40 uppercase tracking-widest px-2">{t("ticketID")}</label>
                      <div className="relative">
                        <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                        <input
                          type="text"
                          placeholder="e.g. FIFA-2026-NY-992"
                          value={formData.ticket}
                          onChange={(e) => setFormData({...formData, ticket: sanitizeInput(e.target.value)})}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500/50"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/40 uppercase tracking-widest px-2">{t("seatNumber")}</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                        <input
                          type="text"
                          placeholder="e.g. A-102"
                          value={formData.seat}
                          onChange={(e) => setFormData({...formData, seat: sanitizeInput(e.target.value)})}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500/50"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-blue-600/5 border border-blue-500/10 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                      <Info className="w-6 h-6 text-blue-400" />
                    </div>
                    <p className="text-sm text-white/60">
                      {t("ticketInfo")}
                    </p>
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    className="w-full btn-primary py-4 flex items-center justify-center gap-2 group"
                  >
                    {t("continueToPreferences")}
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/40 uppercase tracking-widest px-2">{t("preferredLanguage")}</label>
                      <div className="relative">
                        <Languages className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                        <select
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white appearance-none focus:outline-none focus:border-blue-500/50"
                          value={formData.language}
                          onChange={(e) => setFormData({...formData, language: e.target.value})}
                        >
                          <option className="bg-zinc-900">English</option>
                          <option className="bg-zinc-900">Spanish</option>
                          <option className="bg-zinc-900">Hindi</option>
                          <option className="bg-zinc-900">French</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/40 uppercase tracking-widest px-2">{t("arrivalTime")}</label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                        <input
                          type="time"
                          value={formData.arrivalTime}
                          onChange={(e) => setFormData({...formData, arrivalTime: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500/50"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/40 uppercase tracking-widest px-2">{t("transportMethod")}</label>
                      <div className="relative">
                        <Bus className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                        <select
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white appearance-none focus:outline-none focus:border-blue-500/50"
                          value={formData.transport}
                          onChange={(e) => setFormData({...formData, transport: e.target.value})}
                        >
                          <option className="bg-zinc-900" value="Metro">{t("metro")}</option>
                          <option className="bg-zinc-900" value="Car / Parking">{t("carParking")}</option>
                          <option className="bg-zinc-900" value="Ride Share">{t("rideShare")}</option>
                          <option className="bg-zinc-900" value="Walking">{t("walking")}</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/40 uppercase tracking-widest px-2">{t("foodPreferences")}</label>
                      <div className="relative">
                        <Utensils className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                        <select
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white appearance-none focus:outline-none focus:border-blue-500/50"
                          value={formData.food}
                          onChange={(e) => setFormData({...formData, food: e.target.value})}
                        >
                          <option className="bg-zinc-900" value="No Preference">{t("noPreference")}</option>
                          <option className="bg-zinc-900" value="Vegetarian">{t("vegetarian")}</option>
                          <option className="bg-zinc-900" value="Halal">{t("halal")}</option>
                          <option className="bg-zinc-900" value="Gluten Free">{t("glutenFree")}</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all"
                      aria-label="Go back to step 1"
                    >
                      {t("back")}
                    </button>
                    <button
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="flex-[2] btn-primary py-4 flex items-center justify-center gap-2"
                    >
                      {isGenerating ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          {t("generatingItinerary")}
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          {t("initializeCopilot")}
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && itinerary && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-8"
                >
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Itinerary Timeline */}
                    <div className="flex-1 space-y-6">
                      <h3 className="text-xl font-bold flex items-center gap-2">
                        <Clock className="w-5 h-5 text-blue-500" />
                        {t("matchdaySchedule")}
                      </h3>
                      <div className="space-y-4 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-px before:bg-white/10">
                        {itinerary.schedule.map((item: ItineraryItem, i: number) => {
                          const IconComponent = item.icon;
                          return (
                            <div key={i} className="flex gap-4 relative">
                              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center shrink-0 z-10">
                                <IconComponent className="w-4 h-4 text-blue-400" />
                              </div>
                              <div className="py-1">
                                <span className="text-[10px] font-bold text-white/40 uppercase">{item.time}</span>
                                <p className="text-sm font-medium text-white/80">{item.task}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* AI Recommendations */}
                    <div className="flex-1 space-y-6">
                      <h3 className="text-xl font-bold flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-500" />
                        {t("aiInsights")}
                      </h3>
                      <div className="space-y-3">
                        {itinerary.recommendations.map((rec: string, i: number) => (
                          <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex gap-3">
                            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                            <p className="text-sm text-white/60 leading-relaxed">{rec}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-white/10">
                    <button
                      className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
                      aria-label="Download itinerary as PDF"
                    >
                      <Download className="w-4 h-4" aria-hidden="true" /> {t("downloadPDF")}
                    </button>
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 py-4 bg-blue-600 rounded-2xl font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all"
                      aria-label="Start over and plan another match"
                    >
                      {t("planAnotherMatch")}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
