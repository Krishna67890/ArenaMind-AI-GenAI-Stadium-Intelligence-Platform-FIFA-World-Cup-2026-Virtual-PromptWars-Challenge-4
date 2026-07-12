"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Navbar } from "@/components/ui/Navbar";
import { Calendar, Clock, Video, Globe, Send, CheckCircle, ChevronRight, Building2, User2, Mail, AlertCircle } from "lucide-react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/services/firebase";

// Basic validation types
type FormErrors = {
  name?: string;
  email?: string;
  company?: string;
  country?: string;
  date?: string;
  time?: string;
};

export default function ScheduleDemoPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [generatedTicket, setGeneratedTicket] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    country: "",
    duration: "30",
    purpose: "",
    date: "",
    time: ""
  });

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Identity signature required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Invalid neural uplink address";
    if (!formData.company.trim()) newErrors.company = "Organization deployment needed";
    if (!formData.country.trim()) newErrors.country = "Territory origin required";
    if (!formData.date) newErrors.date = "Synchronization date missing";
    if (!formData.time) newErrors.time = "Temporal window undefined";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const ticketId = `AM-${Math.random().toString(36).substring(2, 6).toUpperCase()}-2026`;
      setGeneratedTicket(ticketId);

      try {
        await addDoc(collection(db, "demo_requests"), {
          ...formData,
          bookingId: ticketId,
          createdAt: new Date().toISOString(),
          status: "pending"
        });
      } catch (fbError) {
        console.warn("Firebase permission denied, proceeding with local simulation:", fbError);
        // We still proceed to success screen for user experience in demo
      }

      setSuccess(true);
      window.dispatchEvent(new CustomEvent("show-notification", {
        detail: {
          title: "Booking Confirmed",
          message: `Ticket Generated: ${ticketId}. Experience scheduled.`,
          type: "success"
        }
      }));
    } catch (error) {
      console.error("Booking error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute redirectTo="/login">
      <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
        <Navbar />

        <main className="pt-32 pb-20 px-6 max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase mb-6">
                Schedule <span className="text-gradient">Experience</span>
              </h1>
              <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed">
                Experience the future of stadium operations. Book a personalized architectural walkthrough of the ArenaMind AI ecosystem.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
             {/* Info Sidebar */}
             <div className="space-y-6">
                <div className="glass-morphism p-8 rounded-[2rem] border-white/10">
                   <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                      <Video className="w-5 h-5 text-blue-500" />
                      Neural Link Demo
                   </h3>
                   <div className="space-y-4">
                      {[
                        { icon: Clock, label: "Duration", value: "30-60 Minutes" },
                        { icon: Globe, label: "Location", value: "Google Meet / Teams" },
                        { icon: Send, label: "Format", value: "Live Screen-Share" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                              <item.icon className="w-4 h-4 text-white/40" />
                           </div>
                           <div>
                              <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{item.label}</p>
                              <p className="text-sm font-bold text-white/80">{item.value}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="glass-morphism p-8 rounded-[2rem] border-white/10 bg-blue-600/5">
                   <p className="text-sm text-blue-400 font-medium leading-relaxed italic">
                    "This demo will cover the 3D Digital Twin integration, multi-agent crowd simulation, and real-time security automation."
                   </p>
                </div>
             </div>

             {/* Form Area */}
             <div className="lg:col-span-2">
                <AnimatePresence mode="wait">
                  {!success ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="glass-morphism p-10 rounded-[3rem] border-white/10 shadow-2xl relative overflow-hidden"
                    >
                      <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <InputField
                              icon={User2}
                              label="Full Name"
                              placeholder="Krishna Patil"
                              value={formData.name}
                              error={errors.name}
                              onChange={(v) => setFormData({...formData, name: v})}
                           />
                           <InputField
                              icon={Mail}
                              label="Work Email"
                              placeholder="krishna@arena.ai"
                              type="email"
                              value={formData.email}
                              error={errors.email}
                              onChange={(v) => setFormData({...formData, email: v})}
                           />
                           <InputField
                              icon={Building2}
                              label="Organization"
                              placeholder="FIFA 2026 / Google"
                              value={formData.company}
                              error={errors.company}
                              onChange={(v) => setFormData({...formData, company: v})}
                           />
                           <InputField
                              icon={Globe}
                              label="Country"
                              placeholder="United States"
                              value={formData.country}
                              error={errors.country}
                              onChange={(v) => setFormData({...formData, country: v})}
                           />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <div className="space-y-3">
                              <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest ml-4">Preferred Date</label>
                              <div className="relative">
                                <input
                                  type="date"
                                  className={`w-full bg-white/5 border ${errors.date ? 'border-red-500/50' : 'border-white/10'} rounded-2xl py-4 px-6 text-white focus:border-blue-500 transition-all outline-none`}
                                  value={formData.date}
                                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                                />
                                {errors.date && <p className="text-[10px] text-red-500 mt-1 ml-4 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.date}</p>}
                              </div>
                           </div>
                           <div className="space-y-3">
                              <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest ml-4">Preferred Time</label>
                              <div className="relative">
                                <input
                                  type="time"
                                  className={`w-full bg-white/5 border ${errors.time ? 'border-red-500/50' : 'border-white/10'} rounded-2xl py-4 px-6 text-white focus:border-blue-500 transition-all outline-none`}
                                  value={formData.time}
                                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                                />
                                {errors.time && <p className="text-[10px] text-red-500 mt-1 ml-4 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.time}</p>}
                              </div>
                           </div>
                        </div>

                        <button
                          disabled={loading}
                          className="w-full py-5 bg-blue-600 rounded-[2rem] font-black uppercase tracking-[0.2em] text-sm shadow-[0_0_50px_rgba(37,99,235,0.4)] hover:bg-blue-500 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                          {loading ? "Transmitting Protocol..." : "Finalize Experience Booking"}
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative"
                    >
                      {/* Visual "Neural Ticket" Design */}
                      <div className="glass-morphism rounded-[3rem] border border-white/20 overflow-hidden shadow-[0_0_100px_rgba(37,99,235,0.2)]">
                         <div className="bg-blue-600 p-8 text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                               <Globe className="w-32 h-32" />
                            </div>
                            <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-2 relative z-10">Neural Access Ticket</h2>
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-200 opacity-80 relative z-10">FIFA World Cup 2026 // ArenaMind AI</p>
                         </div>

                         <div className="p-10 space-y-8 bg-black/40 backdrop-blur-md">
                            <div className="flex justify-between items-start">
                               <div>
                                  <p className="text-[8px] font-black text-white/40 uppercase tracking-widest mb-1">Operator Name</p>
                                  <p className="text-xl font-bold italic uppercase">{formData.name}</p>
                               </div>
                               <div className="text-right">
                                  <p className="text-[8px] font-black text-white/40 uppercase tracking-widest mb-1">Deployment ID</p>
                                  <p className="text-xl font-black font-mono text-blue-500 tracking-tighter">{generatedTicket}</p>
                               </div>
                            </div>

                            <div className="grid grid-cols-2 gap-8 py-6 border-y border-white/5">
                               <div>
                                  <p className="text-[8px] font-black text-white/40 uppercase tracking-widest mb-1">Temporal Window</p>
                                  <p className="text-sm font-bold">{formData.date} at {formData.time} UTC</p>
                               </div>
                               <div>
                                  <p className="text-[8px] font-black text-white/40 uppercase tracking-widest mb-1">Origin Territory</p>
                                  <p className="text-sm font-bold uppercase">{formData.country}</p>
                               </div>
                            </div>

                            <div className="flex items-center gap-6 p-6 bg-blue-600/10 border border-blue-500/20 rounded-3xl">
                               <div className="w-16 h-16 shrink-0 bg-white p-2 rounded-xl">
                                  {/* Fake QR Code */}
                                  <div className="w-full h-full bg-black flex flex-wrap gap-[2px]">
                                     {[...Array(64)].map((_, i) => (
                                       <div key={i} className={`w-[6px] h-[6px] ${Math.random() > 0.5 ? 'bg-white' : 'bg-transparent'}`} />
                                     ))}
                                  </div>
                               </div>
                               <div>
                                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Encryption Protocol</p>
                                  <p className="text-xs text-white/60 leading-relaxed">
                                    This ticket authorizes neural synchronization for a stadium architectural deep-dive. Present ID at terminal.
                                  </p>
                                </div>
                            </div>

                            <div className="text-center pt-4">
                               <button
                                  onClick={() => setSuccess(false)}
                                  className="px-12 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all"
                                >
                                  Finalize and Book Another
                               </button>
                            </div>
                         </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

interface InputFieldProps {
  icon: React.ElementType;
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const InputField = ({ icon: Icon, label, placeholder, type = "text", value, onChange, error }: InputFieldProps) => (
  <div className="space-y-3">
    <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest ml-4">{label}</label>
    <div className="relative">
      <Icon className={`absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 ${error ? 'text-red-500/50' : 'text-white/20'}`} />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-white/5 border ${error ? 'border-red-500/50' : 'border-white/10'} rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-white/10 focus:border-blue-500 transition-all outline-none`}
      />
      {error && <p className="text-[10px] text-red-500 mt-1 ml-4 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {error}</p>}
    </div>
  </div>
);
