"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Chrome, Github, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/services/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 overflow-hidden relative">
      {/* Background Cinematic Elements */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-700" />
         <div className="w-full h-full opacity-30" style={{ backgroundImage: 'radial-gradient(circle, #1d4ed8 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-morphism p-10 rounded-[3rem] border border-white/10 shadow-2xl">
          <div className="text-center mb-10">
            <Link href="/" className="inline-flex items-center gap-2 mb-8">
               <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/40">
                  <span className="text-white font-black italic text-xl">A</span>
               </div>
               <span className="text-xl font-bold tracking-tighter uppercase">ArenaMind AI</span>
            </Link>
            <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2">Neural Login</h1>
            <p className="text-white/40 text-sm font-medium tracking-wide">Enter your credentials to synchronize with the stadium grid.</p>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-4 rounded-2xl mb-6">
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-4">Protocol ID (Email)</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input
                  type="email"
                  placeholder="name@organization.ai"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white focus:border-blue-500/50 transition-all outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-4 mr-2">
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Security Key</label>
                <button type="button" className="text-[10px] font-bold text-blue-500 uppercase tracking-widest hover:underline">Forgot Key?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-14 text-white focus:border-blue-500/50 transition-all outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full py-5 bg-blue-600 rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:bg-blue-500 transition-all flex items-center justify-center gap-3 disabled:opacity-50 group"
            >
              {loading ? "Authenticating..." : "Establish Neural Link"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="my-10 flex items-center gap-4">
             <div className="h-px flex-1 bg-white/5" />
             <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.3em]">Third-Party Uplink</span>
             <div className="h-px flex-1 bg-white/5" />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <button onClick={handleGoogleSignIn} className="flex items-center justify-center gap-2 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                <Chrome className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Google</span>
             </button>
             <button className="flex items-center justify-center gap-2 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                <Github className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Github</span>
             </button>
          </div>

          <p className="mt-10 text-center text-[10px] font-bold uppercase tracking-widest text-white/30">
            No access granted? <Link href="/register" className="text-blue-500 hover:underline">Request Initialization</Link>
          </p>
        </div>

        <div className="mt-8 flex justify-center items-center gap-2 text-white/20">
           <ShieldCheck className="w-4 h-4" />
           <span className="text-[8px] font-bold uppercase tracking-[0.4em]">AES-256 Encrypted Connection</span>
        </div>
      </motion.div>
    </div>
  );
}
