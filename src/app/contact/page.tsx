"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import {
  Mail,
  MessageSquare,
  MapPin,
  Phone,
  Send,
  Globe,
  Twitter,
  Linkedin,
  Github,
  ChevronRight,
  ShieldCheck
} from "lucide-react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-[1200px] mx-auto">
        <header className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase mb-6 leading-[0.8]">
              Connect with <span className="text-gradient">Ops</span>
            </h1>
            <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed">
              Establishing a secure communication link with ArenaMind Strategic Operations. Choose your uplink protocol below.
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           {/* Contact Info */}
           <div className="space-y-8">
              <div className="glass-morphism p-10 rounded-[3rem] border-white/10">
                 <h3 className="text-xl font-black italic uppercase mb-8 flex items-center gap-3">
                    <Globe className="w-5 h-5 text-blue-500" />
                    Global Hubs
                 </h3>
                 <div className="space-y-8">
                    <ContactDetail
                      icon={MapPin}
                      label="HQ Address"
                      value="Neural Plaza, Silicon Valley, CA"
                    />
                    <ContactDetail
                      icon={Mail}
                      label="Neural Uplink"
                      value="ops@arenamind.ai"
                    />
                    <ContactDetail
                      icon={Phone}
                      label="Direct Link"
                      value="+1 (555) ARENA-AI"
                    />
                 </div>

                 <div className="mt-12 pt-12 border-t border-white/5">
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-6">Social Encryption</p>
                    <div className="flex gap-4">
                       {[Twitter, Linkedin, Github].map((Icon, i) => (
                         <button key={i} className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 transition-all group">
                            <Icon className="w-5 h-5 text-white/40 group-hover:text-white" />
                         </button>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="glass-morphism p-8 rounded-[2.5rem] border-blue-500/20 bg-blue-600/5">
                 <div className="flex gap-4">
                    <ShieldCheck className="w-6 h-6 text-blue-500 shrink-0" />
                    <div>
                       <p className="text-sm font-bold mb-1">Secure Protocol</p>
                       <p className="text-xs text-white/40 leading-relaxed">
                          All communications are encrypted using post-quantum neural protocols to ensure stakeholder privacy.
                       </p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Contact Form */}
           <div className="lg:col-span-2">
              <div className="glass-morphism p-10 md:p-16 rounded-[4rem] border-white/10 relative overflow-hidden">
                {!sent ? (
                  <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                       <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">Identity</label>
                          <input
                            type="text"
                            placeholder="Commander Name"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white focus:border-blue-500 outline-none transition-all placeholder:text-white/10"
                            required
                          />
                       </div>
                       <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">Secure Email</label>
                          <input
                            type="email"
                            placeholder="name@organization.com"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white focus:border-blue-500 outline-none transition-all placeholder:text-white/10"
                            required
                          />
                       </div>
                    </div>

                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">Operational Department</label>
                       <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer">
                          <option className="bg-black">Stadium Security & Safety</option>
                          <option className="bg-black">AI Infrastructure & Integration</option>
                          <option className="bg-black">FIFA 2026 Strategic Partnership</option>
                          <option className="bg-black">Media & Communications</option>
                       </select>
                    </div>

                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">Message Payload</label>
                       <textarea
                         rows={5}
                         placeholder="Describe your operational requirements..."
                         className="w-full bg-white/5 border border-white/10 rounded-3xl py-6 px-8 text-white focus:border-blue-500 outline-none transition-all placeholder:text-white/10 resize-none"
                         required
                       ></textarea>
                    </div>

                    <a
                      href="https://wa.me/918080690631"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-6 bg-green-600 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-sm shadow-2xl hover:bg-green-500 transition-all flex items-center justify-center gap-4 group"
                    >
                      WhatsApp Developer
                      <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </a>

                    <button
                      disabled={loading}
                      className="w-full py-6 bg-blue-600 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-sm shadow-2xl hover:bg-blue-500 transition-all flex items-center justify-center gap-4 disabled:opacity-50"
                    >
                      {loading ? "Transmitting..." : "Establish Communication Link"}
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20"
                  >
                     <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(37,99,235,0.4)]">
                        <ShieldCheck className="w-12 h-12 text-white" />
                     </div>
                     <h2 className="text-4xl font-black italic uppercase mb-6">Link Established</h2>
                     <p className="text-white/40 text-lg max-w-sm mx-auto mb-12 leading-relaxed">
                        Your message payload has been securely transmitted. Strategic Ops will respond within one operational cycle.
                     </p>
                     <button
                       onClick={() => setSent(false)}
                       className="px-12 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all"
                     >
                       Send New Message
                     </button>
                  </motion.div>
                )}
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}

const ContactDetail = ({ icon: Icon, label, value }: any) => (
  <div className="flex gap-6 items-start">
     <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-white/30" />
     </div>
     <div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mb-1">{label}</p>
        <p className="font-bold text-white/80">{value}</p>
     </div>
  </div>
);
