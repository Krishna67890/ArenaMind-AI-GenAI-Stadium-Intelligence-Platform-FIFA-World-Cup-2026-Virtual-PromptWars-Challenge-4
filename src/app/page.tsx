"use client";

import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Hero } from "@/components/ui/Hero";
import { Copilot } from "@/components/ui/Copilot";
import { AgentGrid } from "@/components/agents/AgentGrid";
import { StadiumDigitalTwin } from "@/components/digital-twin/StadiumDigitalTwin";
import { SustainabilitySection } from "@/components/ui/SustainabilitySection";
import { TransportationSection } from "@/components/ui/TransportationSection";
import { MatchSchedule } from "@/components/ui/MatchSchedule";
import { OrganizersView } from "@/components/ui/OrganizersView";
import { FoodSection } from "@/components/ui/FoodSection";
import { VoiceAssistant } from "@/components/voice/VoiceAssistant";
import { LiveTicker } from "@/components/ui/LiveTicker";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Home() {
  const { t } = useLanguage();

  const { user } = useAuth();

  return (
    <main className="min-h-screen bg-black relative" id="main-content">
      {/* Global Neural Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 neural-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <LiveTicker />
        <Hero />
        <Copilot />
        <MatchSchedule />
        <AgentGrid />
        <StadiumDigitalTwin />
        <OrganizersView />
        <FoodSection />
        <TransportationSection />
        <SustainabilitySection />
      </div>

      {/* CTA Section */}
      <section id="get-started" className="py-24 px-6 bg-gradient-to-b from-zinc-950 to-black">
        <div className="container mx-auto max-w-4xl text-center glass-morphism p-12 rounded-[3rem] border-blue-500/20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your <span className="text-gradient">Venue?</span></h2>
          <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
            Join the elite stadiums using ArenaMind AI to deliver unforgettable, safe, and efficient experiences for the FIFA World Cup 2026.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={user ? "/launch-platform" : "/login"}>
              <button className="btn-primary" aria-label="Get Started with ArenaMind AI">{t("launchPlatform")}</button>
            </Link>
            <Link href={user ? "/schedule-demo" : "/login"}>
              <button className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full font-medium transition-all border border-white/10" aria-label="Schedule a Demo">
                Schedule Demo
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

