"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Utensils, Clock, Star, Info, ChevronRight, Zap } from "lucide-react";

import { useAuth } from "@/context/AuthContext";

const restaurants = [
  {
    name: "Global Bites Concourse",
    cuisine: "International",
    wait: "5-8 mins",
    rating: 4.8,
    popular: "AI-Personalized Bowls",
    load: 45,
    tags: ["Veg", "Halal", "Gluten-Free"]
  },
  {
    name: "Goal Line Grill",
    cuisine: "American / BBQ",
    wait: "15-20 mins",
    rating: 4.5,
    popular: "Champion Burgers",
    load: 85,
    tags: ["High Energy"]
  },
  {
    name: "Swift Snacks Kiosk 4",
    cuisine: "Fast Food",
    wait: "2 mins",
    rating: 4.2,
    popular: "Nitro Coffee",
    load: 20,
    tags: ["Quick Pickup"]
  }
];

export const FoodSection = () => {
  const { user } = useAuth();
  return (
    <section id="food-beverage" className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-bold mb-6"
            >
              <Utensils className="w-3 h-3" />
              <span>SMART DINING</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Fuel Your <span className="text-gradient">Passion.</span></h2>
            <p className="text-white/40 max-w-xl">
              AI-driven nutrition and queue management. Get personalized recommendations based on your preferences and real-time wait times at every concourse.
            </p>
          </div>

          <div className="flex gap-4">
             <div className="glass-card py-2 px-4 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-xs font-bold text-white/60">Avg. Wait: 6m</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {restaurants.map((shop, i) => (
            <motion.div
              key={shop.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card group hover:border-yellow-500/30 transition-all"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform">
                  <Utensils className="w-6 h-6 text-yellow-500" />
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-yellow-500 mb-1">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-sm font-bold">{shop.rating}</span>
                  </div>
                  <div className="text-[10px] text-white/40 uppercase font-bold">Rating</div>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-1">{shop.name}</h3>
              <p className="text-xs text-white/40 mb-6">{shop.cuisine}</p>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2 text-white/60">
                    <Clock className="w-4 h-4" />
                    <span>Est. Wait</span>
                  </div>
                  <span className={`font-bold ${shop.load > 70 ? 'text-red-500' : 'text-green-500'}`}>{shop.wait}</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${shop.load}%` }}
                    className={`h-full ${shop.load > 70 ? 'bg-red-500' : 'bg-green-500'}`}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {shop.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-medium text-white/60">
                    {tag}
                  </span>
                ))}
              </div>

              <Link href={user ? "/food-menu" : "/login"} className="w-full">
                <button className="w-full py-4 bg-white/5 hover:bg-yellow-500 hover:text-black rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2">
                  View Menu <ChevronRight className="w-4 h-4" />
                </button>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 glass-card bg-yellow-500/10 border-yellow-500/20 flex flex-col md:flex-row items-center justify-between gap-6 p-8">
           <div className="flex gap-6 items-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center shrink-0">
                 <Zap className="w-8 h-8 text-black" />
              </div>
              <div>
                 <h4 className="text-xl font-bold mb-2">AI Nutrition Assistant</h4>
                 <p className="text-sm text-white/60 max-w-lg">
                    Connect your health profile to receive meal recommendations that match your dietary needs and match-day energy requirements.
                 </p>
              </div>
           </div>
           <button className="btn-primary bg-yellow-500 text-black hover:bg-yellow-400 whitespace-nowrap">Sync Health Data</button>
        </div>
      </div>
    </section>
  );
};
