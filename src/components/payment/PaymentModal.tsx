"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, ShieldCheck, CheckCircle2, QrCode, Smartphone, ArrowRight, Loader2 } from "lucide-react";

export const PaymentModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [plan, setPlan] = useState<any>(null);
  const [step, setStep] = useState(1); // 1: Method, 2: QR, 3: Processing, 4: Success
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleOpen = (e: any) => {
      setPlan(e.detail);
      setIsOpen(true);
      setStep(1);
    };
    window.addEventListener("open-payment-modal", handleOpen);
    return () => window.removeEventListener("open-payment-modal", handleOpen);
  }, []);

  const handlePayment = () => {
    setLoading(true);
    setStep(3);
    setTimeout(() => {
      setLoading(false);
      setStep(4);
      // Trigger success notification
      window.dispatchEvent(new CustomEvent("show-notification", {
        detail: {
          title: "Order Confirmed",
          message: `Thanks for purchase: ${plan?.name || "Premium Item"}`,
          type: "success"
        }
      }));
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg glass-morphism rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl"
        >
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-2xl font-black italic uppercase tracking-tighter">Secure <span className="text-gradient">Purchase</span></h3>
                <p className="text-[10px] text-white/40 uppercase tracking-widest">Transaction ID: AM-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all">
                <X className="w-5 h-5 text-white/40" />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1">{plan?.name} Plan</p>
                      <p className="text-2xl font-black italic tracking-tighter">${plan?.price}<span className="text-sm font-medium text-white/20">/YR</span></p>
                    </div>
                    <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
                       <ShieldCheck className="w-6 h-6 text-blue-500" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest ml-4">Select Payment Protocol</p>
                    <button onClick={() => setStep(2)} className="w-full p-6 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 flex items-center gap-6 transition-all group">
                      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-all">
                         <QrCode className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                         <p className="font-bold">UPI / QR Payment</p>
                         <p className="text-xs text-white/40">Scan to pay instantly</p>
                      </div>
                      <ArrowRight className="w-5 h-5 ml-auto text-white/20" />
                    </button>
                    <button onClick={() => setStep(2)} className="w-full p-6 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 flex items-center gap-6 transition-all group opacity-50">
                      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                         <CreditCard className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                         <p className="font-bold">Credit / Debit Card</p>
                         <p className="text-xs text-white/40">Secure encryption (Disabled)</p>
                      </div>
                      <ArrowRight className="w-5 h-5 ml-auto text-white/20" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="text-center space-y-8"
                >
                  <div className="relative inline-block p-4 bg-white rounded-[2rem] shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                     {/* Fake QR Code */}
                     <div className="w-48 h-48 bg-black rounded-xl flex items-center justify-center p-2">
                        <img
                          src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=arenamind-purchase-8080690631@upi"
                          alt="Payment QR"
                          className="w-full h-full invert"
                        />
                     </div>
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
                        <Smartphone className="w-6 h-6 text-black" />
                     </div>
                  </div>

                  <div>
                     <p className="font-bold mb-1">Scan with any UPI App</p>
                     <p className="text-xs text-white/40">Google Pay, PhonePe, or Paytm</p>
                  </div>

                  <button
                    onClick={handlePayment}
                    className="w-full py-5 bg-blue-600 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-600/20 hover:bg-blue-500 transition-all"
                  >
                    I Have Completed Payment
                  </button>

                  <button onClick={() => setStep(1)} className="text-xs font-bold text-white/20 uppercase tracking-widest hover:text-white transition-colors">
                    Go Back
                  </button>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-20 text-center space-y-8"
                >
                   <div className="relative flex items-center justify-center">
                      <Loader2 className="w-24 h-24 text-blue-600 animate-spin" />
                      <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
                   </div>
                   <div>
                      <h4 className="text-xl font-bold mb-2 uppercase tracking-tighter">Validating Transaction</h4>
                      <p className="text-xs text-white/40">Synchronizing with node 8080690631...</p>
                   </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-8"
                >
                   <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(34,197,94,0.4)]">
                      <CheckCircle2 className="w-12 h-12 text-white" />
                   </div>
                   <div>
                      <h2 className="text-3xl font-black italic uppercase mb-2">Payment Done Successfully</h2>
                      <p className="text-white/40 text-sm">Welcome to ArenaVerse Premium. Your deployment is now live.</p>
                   </div>
                   <button
                    onClick={() => setIsOpen(false)}
                    className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/90 transition-all"
                   >
                     Access Premium HUD
                   </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
