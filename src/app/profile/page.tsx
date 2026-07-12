"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth, UserRole } from "@/context/AuthContext";
import { User, Mail, Phone, MapPin, Globe, Building2, FileText, Camera, Save, X, RotateCcw, Loader2 } from "lucide-react";
import { useNotifications } from "@/context/NotificationContext";
import { auth, db } from "@/services/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

export default function ProfilePage() {
  const { userData, updateUserData } = useAuth();
  const { addNotification } = useNotifications();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<{
    name: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    organization: string;
    bio: string;
    role: UserRole;
  }>({
    name: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    organization: "",
    bio: "",
    role: "fan"
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        phone: userData.phone || "",
        address: userData.address || "",
        city: userData.city || "",
        country: userData.country || "",
        organization: userData.organization || "",
        bio: userData.bio || "",
        role: userData.role || "fan"
      });
    }
  }, [userData]);

  const handleSave = async () => {
    if (!userData?.uid) return;
    setLoading(true);
    try {
      // 1. Update Firestore
      await updateUserData(formData);

      // 2. Update Auth Profile (Display Name)
      if (auth.currentUser && formData.name !== auth.currentUser.displayName) {
        await updateProfile(auth.currentUser, {
          displayName: formData.name
        });
      }

      addNotification({
        title: "Profile Synchronized",
        message: "Your neural identity has been updated across the ArenaVerse grid.",
        type: "info"
      });
    } catch (error) {
      console.error("Profile update error:", error);
      addNotification({
        title: "Sync Failed",
        message: "Unable to reach the ArenaMind core. Please check your uplink.",
        type: "security"
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userData?.uid) return;

    addNotification({
      title: "Uploading Data",
      message: "Processing neural biometric data...",
      type: "info"
    });

    // Since we don't have Firebase Storage set up in rules or service yet,
    // we'll simulate the upload but update the profile with a placeholder or base64
    // For a real app, use: const storageRef = ref(storage, `profiles/${userData.uid}`);

    try {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // We'll just use a random Unsplash avatar for demo purposes if we don't have storage
      const mockPhotoURL = `https://i.pravatar.cc/150?u=${userData.uid}`;

      await updateUserData({ photo: mockPhotoURL });

      addNotification({
        title: "Biometrics Updated",
        message: "Neural signature photo has been successfully uploaded.",
        type: "success"
      });
    } catch (error) {
       addNotification({
        title: "Upload Failed",
        message: "Neural uplink interrupted during transmission.",
        type: "security"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        phone: userData.phone || "",
        address: userData.address || "",
        city: userData.city || "",
        country: userData.country || "",
        organization: userData.organization || "",
        bio: userData.bio || "",
        role: userData.role || "fan"
      } as typeof formData);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black text-white">
        <Navbar />

        <main className="pt-32 pb-20 px-6 max-w-[1000px] mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-2">User <span className="text-gradient">Profile</span></h1>
            <p className="text-white/40 text-sm uppercase tracking-widest">Manage your neural identity and credentials.</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar / Photo */}
            <div className="lg:col-span-1 space-y-6">
              <div className="glass-morphism p-8 rounded-[2.5rem] border-white/10 text-center">
                <div className="relative w-32 h-32 mx-auto mb-6">
                  {userData?.photo ? (
                    <img
                      src={userData.photo}
                      alt={formData.name}
                      key={userData.photo}
                      className="w-full h-full rounded-3xl object-cover border-4 border-black shadow-2xl"
                    />
                  ) : (
                    <div className="w-full h-full rounded-3xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-4xl font-black border-4 border-black shadow-2xl">
                      {formData.name?.charAt(0) || "U"}
                    </div>
                  )}
                  <label className="absolute -bottom-2 -right-2 p-3 bg-blue-600 rounded-xl border-4 border-black hover:bg-blue-500 transition-all cursor-pointer">
                    <Camera className="w-4 h-4 text-white" />
                    <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                  </label>
                </div>
                <h2 className="text-xl font-bold mb-1">{formData.name}</h2>
                <p className="text-xs text-white/40 uppercase tracking-[0.2em] mb-6">{formData.role}</p>

                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-left space-y-3">
                  <div className="flex items-center gap-3 text-white/40">
                    <Mail className="w-3 h-3" />
                    <span className="text-[10px] font-medium truncate">{userData?.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/40">
                    <Globe className="w-3 h-3" />
                    <span className="text-[10px] font-medium">{formData.country || "Not specified"}</span>
                  </div>
                </div>
              </div>

              <div className="glass-morphism p-6 rounded-[2rem] border-white/10">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-white/30">Account Stats</h3>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center">
                       <span className="text-xs text-white/60">Permissions</span>
                       <span className="text-[10px] px-2 py-0.5 bg-green-500/10 text-green-500 rounded-full font-bold uppercase tracking-tighter">Verified</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-xs text-white/60">Joined</span>
                       <span className="text-[10px] text-white font-bold">{new Date(userData?.joinedDate).toLocaleDateString()}</span>
                    </div>
                 </div>
              </div>
            </div>

            {/* Main Form */}
            <div className="lg:col-span-2 space-y-8">
              <div className="glass-morphism p-10 rounded-[3rem] border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-4">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-sm focus:border-blue-500/50 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-4">Phone Uplink</label>
                    <div className="relative">
                      <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-sm focus:border-blue-500/50 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-4">Organization</label>
                    <div className="relative">
                      <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <input
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData({...formData, organization: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-sm focus:border-blue-500/50 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-4">HQ Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-sm focus:border-blue-500/50 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-4">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:border-blue-500/50 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-4">Country</label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:border-blue-500/50 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-4">Bio / Neural Signature</label>
                    <div className="relative">
                      <FileText className="absolute left-5 top-5 w-4 h-4 text-white/20" />
                      <textarea
                        rows={4}
                        value={formData.bio}
                        onChange={(e) => setFormData({...formData, bio: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-sm focus:border-blue-500/50 outline-none transition-all resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex flex-wrap gap-4">
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl flex items-center gap-3 font-black uppercase tracking-widest text-xs shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    {loading ? "Synchronizing..." : "Save Profile"}
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-8 py-4 bg-white/5 hover:bg-white/10 rounded-2xl flex items-center gap-3 font-black uppercase tracking-widest text-xs transition-all border border-white/10"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
