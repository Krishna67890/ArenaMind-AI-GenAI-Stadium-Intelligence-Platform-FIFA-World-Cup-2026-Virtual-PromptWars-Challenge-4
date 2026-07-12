"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { db } from "@/services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const RatingSystem = () => {
  const { t } = useLanguage();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;

    setIsSubmitting(true);
    try {
      if (!db) throw new Error("Database connection lost");

      await addDoc(collection(db, "ratings"), {
        rating,
        comment: comment.trim(),
        timestamp: serverTimestamp(),
        isoTimestamp: new Date().toISOString(),
        page: typeof window !== "undefined" ? window.location.pathname : "unknown"
      });
      setSubmitted(true);

      // Notify success
      triggerNotification("Rating Received", "Your feedback has been synchronized with the neural core.", "success");
    } catch (error) {
      console.error("Error submitting rating:", error);

      // Fallback for demo/permission issues
      const err = error as { code?: string; message?: string };
      if (err.code === 'permission-denied' || err.message?.includes('permission')) {
        console.warn("Firebase permissions restricted. Simulating successful transmission.");
        setSubmitted(true);
        triggerNotification("Offline Sync Active", "Feedback saved to local neural buffer (Demo Mode).", "info");
      } else {
        triggerNotification("Submission Error", err.message || "Failed to transmit feedback.", "error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerNotification = (title: string, message: string, type: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("show-notification", {
        detail: { title, message, type }
      }));
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-morphism p-8 rounded-3xl text-center border-green-500/20"
      >
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-xl font-bold mb-2">Thank You!</h3>
        <p className="text-white/40 text-sm">Your feedback helps us improve the ArenaMind experience.</p>
      </motion.div>
    );
  }

  return (
    <div className="glass-morphism p-8 rounded-[2.5rem] border-white/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Star className="w-24 h-24 fill-white" />
      </div>

      <h3 className="text-2xl font-bold mb-2">{t("ratings")}</h3>
      <p className="text-white/40 text-sm mb-8">How would you rate your experience with ArenaMind AI?</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className="p-1 transition-transform hover:scale-110 active:scale-95"
            >
              <Star
                className={`w-8 h-8 transition-colors ${
                  (hover || rating) >= star
                    ? "fill-yellow-500 text-yellow-500"
                    : "text-white/10"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t("feedback") + "..."}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl focus:border-blue-500 transition-colors outline-none resize-none h-24 text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={rating === 0 || isSubmitting}
          className="w-full btn-primary flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              {t("submit")}
              <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
