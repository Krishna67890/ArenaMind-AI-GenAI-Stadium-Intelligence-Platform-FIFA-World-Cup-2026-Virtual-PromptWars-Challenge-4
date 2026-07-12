"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Globe, ShieldCheck, Eye, EyeOff, Building2 } from "lucide-react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/services/firebase";
import { setDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface InputFieldProps {
  icon: any;
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
}

const InputField = ({ icon: Icon, label, placeholder, type = "text", value, onChange }: InputFieldProps) => {
  const IconComponent = Icon as any;
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-4">{label}</label>
      <div className="relative">
        <IconComponent className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-12 text-white focus:border-blue-500 outline-none transition-all placeholder:text-white/10"
        />
      </div>
    </div>
  );

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
    role: "fan"
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await updateProfile(userCredential.user, { displayName: formData.name });

      // Save extra user info to Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name: formData.name,
        email: formData.email,
        country: formData.country,
        role: formData.role,
        createdAt: new Date().toISOString()
      });

      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 overflow-hidden relative">
      {/* Background Cinematic Elements */}
      <div className="absolute inset-0 z-0">
         <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
         <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-lg"
      >
        <div className="glass-morphism p-10 rounded-[3rem] border border-white/10 shadow-2xl">
          <div className="text-center mb-10">
            <Link href="/" className="inline-flex items-center gap-2 mb-8">
               <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-black italic text-xl">A</span>
               </div>
               <span className="text-xl font-bold tracking-tighter uppercase">ArenaMind AI</span>
            </Link>
            <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2">Request Access</h1>
            <p className="text-white/40 text-sm font-medium">Initialize your profile in the FIFA 2026 Smart Stadium network.</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-4 rounded-2xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                icon={User}
                label="Identity"
                placeholder="Full Name"
                value={formData.name}
                onChange={(v: string) => setFormData({...formData, name: v})}
              />
              <InputField
                icon={Mail}
                label="Uplink ID"
                placeholder="Email Address"
                type="email"
                value={formData.email}
                onChange={(v: string) => setFormData({...formData, email: v})}
              />
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-4">Access Key</label>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-14 text-white focus:border-blue-500/50 transition-all outline-none"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <InputField
                icon={Globe}
                label="Territory"
                placeholder="Country"
                value={formData.country}
                onChange={(v: string) => setFormData({...formData, country: v})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-4">Strategic Role</label>
              <div className="grid grid-cols-3 gap-3">
                 {["fan", "organizer", "volunteer"].map((role) => (
                   <button
                    key={role}
                    type="button"
                    onClick={() => setFormData({...formData, role})}
                    className={`py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all ${
                      formData.role === role ? "bg-blue-600 border-blue-400 text-white" : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10"
                    }`}
                   >
                     {role}
                   </button>
                 ))}
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full py-5 bg-blue-600 rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:bg-blue-500 transition-all flex items-center justify-center gap-3 disabled:opacity-50 group"
            >
              {loading ? "Initializing..." : "Register Neural Uplink"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="mt-10 text-center text-[10px] font-bold uppercase tracking-widest text-white/30">
            Already registered? <Link href="/login" className="text-blue-500 hover:underline">Establish Link</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

