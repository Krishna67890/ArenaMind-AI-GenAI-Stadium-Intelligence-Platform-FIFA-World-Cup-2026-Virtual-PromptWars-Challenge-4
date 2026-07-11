"use client";

import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Cpu, Globe, BarChart } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import { RatingSystem } from "@/components/ui/RatingSystem";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-black">
        <Navbar />

      <div className="pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Developer Card */}
            <div className="lg:col-span-1">
              <div className="glass-morphism p-8 rounded-[2.5rem] border-blue-500/20 sticky top-32 overflow-hidden">
                <div className="relative w-full aspect-square rounded-3xl mb-6 overflow-hidden border-2 border-blue-500/20 shadow-2xl">
                  <img
                    src="/Devloper.jpg"
                    alt="Krishna Patil Rajput"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Krishna+Patil+Rajput&background=2563eb&color=fff&size=512';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                </div>
                <h1 className="text-3xl font-bold mb-2">Krishna Patil Rajput</h1>
                <p className="text-blue-400 font-medium mb-6">{t("developer")}</p>

                <div className="space-y-4 mb-8">
                  <p className="text-white/60 text-sm leading-relaxed">
                    Passionate about building intelligent systems that bridge the gap between digital reasoning and physical operations.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Next.js", "React", "Generative AI", "Three.js", "Android"].map(skill => (
                      <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 border-t border-white/10 pt-8">
                  <a href="https://github.com/Krishna67890" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all"><Github className="w-5 h-5" /></a>
                  <a href="https://www.linkedin.com/in/krishna-patil-rajput-b66b03340" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all"><Linkedin className="w-5 h-5" /></a>
                  <a href="mailto:krishna.coders12@gmail.com" className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all"><Mail className="w-5 h-5" /></a>
                </div>

                <div className="mt-8">
                  <RatingSystem />
                </div>
              </div>
            </div>

            {/* Project Content */}
            <div className="lg:col-span-2 space-y-16">
              <section>
                <h2 className="text-4xl font-bold mb-8">{t("about")} <span className="text-gradient">{t("vision")}</span></h2>
                <div className="prose prose-invert max-w-none">
                  <div className="mb-12 p-8 bg-blue-600/5 border border-blue-500/20 rounded-[2rem]">
                    <h3 className="text-blue-500 font-black uppercase tracking-[0.2em] text-xs mb-4">Problem Statement</h3>
                    <p className="text-white font-medium text-lg leading-relaxed">
                      Build a GenAI-enabled solution that enhances stadium operations and the overall tournament experience for fans, organizers, volunteers, or venue staff. The solution must leverage Generative AI to improve navigation, crowd management, accessibility, transportation, sustainability, multilingual assistance, operational intelligence, or real-time decision support during the FIFA World Cup 2026.
                    </p>
                  </div>
                  <p className="text-xl text-white/60 leading-relaxed mb-6">
                    ArenaMind AI was conceived for the Virtual PromptWars Challenge 4 as a production-grade solution for the complexities of modern stadium management during global events like the FIFA World Cup 2026.
                  </p>
                  <p className="text-white/40 leading-relaxed">
                    Unlike traditional siloed management systems, ArenaMind AI leverages a decentralized Multi-Agent Architecture where specialized AI agents (Navigation, Security, Medical, Sustainability) collaborate in real-time to optimize safety, efficiency, and fan experience.
                  </p>
                </div>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-8">
                  <Cpu className="w-8 h-8 text-blue-500 mb-6" />
                  <h3 className="text-xl font-bold mb-4">AI Reasoning</h3>
                  <p className="text-sm text-white/40 leading-relaxed">
                    Powered by Gemini 1.5 Flash, the system synthesizes data from thousands of IoT sensors to provide actionable insights and autonomous decision-making.
                  </p>
                </div>
                <div className="glass-card p-8">
                  <Globe className="w-8 h-8 text-purple-500 mb-6" />
                  <h3 className="text-xl font-bold mb-4">Inclusion First</h3>
                  <p className="text-sm text-white/40 leading-relaxed">
                    100% WCAG compliance with real-time translation in 24 languages and specialized agents for accessibility and wheelchair navigation.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-8 uppercase tracking-widest text-white/40">{t("architecture")}</h2>
                <div className="space-y-4">
                  {[
                    { title: "Frontend", tech: "Next.js 15 (App Router), React 19, Tailwind CSS" },
                    { title: "Visuals", tech: "Three.js, Framer Motion, GSAP for fluid animations" },
                    { title: "Intelligence", tech: "Gemini API, Custom Multi-Agent Orchestration" },
                    { title: "Real-time", tech: "Firebase, Web Speech API for Voice AI" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-2xl">
                      <span className="font-bold text-white/60">{item.title}</span>
                      <span className="text-sm font-medium text-blue-400">{item.tech}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="p-12 rounded-[3rem] bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/20">
                <h2 className="text-3xl font-bold mb-6">{t("challenge")}</h2>
                <p className="text-white/70 leading-relaxed mb-8">
                  "How can we use AI to manage a stadium with 80,000+ fans during a World Cup final?"
                  ArenaMind AI answers this by transforming every data point into a safety protocol or an efficiency gain.
                </p>
                <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-white/40">
                   <span>Virtual PromptWars</span>
                   <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                   <span>Challenge 4</span>
                </div>
              </section>
            </div>

          </div>
        </div>
      </div>
      <Footer />
      </main>
    </ProtectedRoute>
  );
}

