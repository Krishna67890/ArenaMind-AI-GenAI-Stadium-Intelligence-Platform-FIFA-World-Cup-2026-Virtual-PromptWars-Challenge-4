"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import { Utensils, Clock, Star, Zap, ChevronRight, ShoppingBag, Plus, Minus, Search, Filter } from "lucide-react";
import { useNotifications } from "@/context/NotificationContext";

interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  cals: number;
  icon: string;
  tags: string[];
}

const MENU_ITEMS: MenuItem[] = [
  { id: 1, name: "Neural Burger", category: "Non-Veg", price: 18, cals: 650, icon: "🍔", tags: ["Popular", "High Protein"] },
  { id: 2, name: "Bologna Bruschetta", category: "Veg", price: 14, cals: 420, icon: "🥖", tags: ["Veg", "Gluten-Free"] },
  { id: 3, name: "Cyber Dogs", category: "Non-Veg", price: 12, cals: 380, icon: "🌭", tags: ["Quick"] },
  { id: 4, name: "Stadium Fries", category: "Veg", price: 8, cals: 310, icon: "🍟", tags: ["Classic"] },
  { id: 5, name: "Nitro Cold Brew", category: "Drinks", price: 6, cals: 5, icon: "☕", tags: ["Energy"] },
  { id: 6, name: "Margherita Pizza", category: "Veg", price: 22, cals: 850, icon: "🍕", tags: ["Veg"] },
  { id: 7, name: "Quinoa Salad", category: "Veg", price: 16, cals: 280, icon: "🥗", tags: ["Vegan", "Healthy"] },
  { id: 8, name: "Sparkling Water", category: "Drinks", price: 4, cals: 0, icon: "💧", tags: ["Hydration"] },
  { id: 9, name: "Chicken Tikka Wrap", category: "Non-Veg", price: 15, cals: 450, icon: "🌯", tags: ["Spicy"] },
  { id: 10, name: "Paneer Power Bowl", category: "Veg", price: 17, cals: 520, icon: "🍲", tags: ["Protein", "Veg"] },
  { id: 11, name: "BBQ Brisket Sandwich", category: "Non-Veg", price: 20, cals: 720, icon: "🥪", tags: ["Hearty"] },
  { id: 12, name: "Garden Fresh Sushi", category: "Veg", price: 19, cals: 320, icon: "🍣", tags: ["Premium", "Veg"] },
];

export default function FoodMenuPage() {
  const { addNotification } = useNotifications();
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<MenuItem[]>([]);
  const categories = ["All", "Veg", "Non-Veg", "Drinks"];

  const filteredItems = activeCategory === "All"
    ? MENU_ITEMS
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  const addToCart = (item: MenuItem) => {
    setCart(prev => [...prev, item]);
    addNotification({
      title: "Order Updated",
      message: `${item.name} has been added to your stadium order hub.`,
      type: "info"
    });
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    // Trigger Payment Modal
    window.dispatchEvent(new CustomEvent("open-payment-modal", {
      detail: {
        name: cart.length === 1 ? cart[0].name : "Stadium Feast",
        price: total
      }
    }));

    // Clear cart after a delay or on success
    // For now we keep it to show the order
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Menu */}
          <div className="flex-1">
            <header className="mb-12">
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-4">Neural <span className="text-gradient">Cuisine</span></h1>
              <p className="text-white/40 text-lg">AI-optimized nutrition for the ultimate matchday experience.</p>
            </header>

            {/* Category Filter */}
            <div className="flex gap-4 mb-12 overflow-x-auto pb-4 no-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
                    activeCategory === cat ? "bg-blue-600 border-blue-400 shadow-lg shadow-blue-600/20" : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, i) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={item.id}
                  className="glass-morphism p-8 rounded-[2.5rem] border-white/5 group hover:border-blue-500/30 transition-all"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div className="text-right">
                       <p className="text-2xl font-black italic tracking-tighter">${item.price}</p>
                       <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest">{item.cals} Cals</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {item.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-[8px] font-bold uppercase text-white/40 tracking-tighter">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => addToCart(item)}
                    className="w-full py-4 bg-white/5 hover:bg-blue-600 rounded-2xl flex items-center justify-center gap-2 font-black uppercase tracking-widest text-[10px] transition-all group/btn"
                  >
                    Add to Order <Plus className="w-3 h-3 group-hover/btn:scale-125 transition-transform" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="w-full lg:w-[400px]">
            <div className="glass-morphism p-8 rounded-[3rem] border-white/10 sticky top-32">
              <div className="flex items-center gap-3 mb-8">
                <ShoppingBag className="w-5 h-5 text-blue-500" />
                <h3 className="text-xl font-black italic uppercase tracking-tighter">Your Order</h3>
              </div>

              <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.length === 0 ? (
                  <div className="py-20 text-center opacity-20">
                     <p className="text-xs font-bold uppercase tracking-[0.2em]">Order Empty</p>
                  </div>
                ) : (
                  cart.map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                           <p className="text-sm font-bold">{item.name}</p>
                           <p className="text-[10px] text-white/40 font-bold">${item.price}</p>
                        </div>
                      </div>
                      <button onClick={() => setCart(cart.filter((_, idx) => idx !== i))} className="text-white/20 hover:text-red-500 transition-colors">
                        <Minus className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-white/10 pt-8 space-y-4">
                <div className="flex justify-between items-center">
                   <span className="text-white/40 font-bold text-xs uppercase tracking-widest">Subtotal</span>
                   <span className="text-lg font-bold">${total}</span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-white/40 font-bold text-xs uppercase tracking-widest">Delivery Fee</span>
                   <span className="text-lg font-bold text-green-500">Free</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                   <span className="text-lg font-black italic uppercase tracking-tighter">Total Cost</span>
                   <span className="text-3xl font-black italic tracking-tighter text-gradient">${total}</span>
                </div>

                <button
                  disabled={cart.length === 0}
                  onClick={handleCheckout}
                  className="w-full py-5 bg-blue-600 hover:bg-blue-500 rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-600/20 transition-all disabled:opacity-50 mt-4"
                >
                  Initiate Checkout
                </button>
              </div>

              <div className="mt-8 flex items-center gap-3 p-4 bg-yellow-500/10 rounded-2xl border border-yellow-500/20">
                 <Zap className="w-4 h-4 text-yellow-500 animate-pulse" />
                 <p className="text-[9px] font-bold text-yellow-500 uppercase tracking-widest leading-relaxed">
                   AI Hint: Based on your activity, we recommend adding a Nitro Cold Brew for energy.
                 </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
