"use client";

import { useState } from "react";
import {
  Ticket, MapPin, Bus, Clock, Sparkles, Info, LucideIcon
} from "lucide-react";
import { askGemini } from "@/services/gemini";

interface ItineraryItem {
  time: string;
  task: string;
  icon: LucideIcon;
}

interface Itinerary {
  schedule: ItineraryItem[];
  recommendations: string[];
}

export const useCopilot = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    ticket: "",
    seat: "",
    language: "English",
    arrivalTime: "18:30",
    transport: "Metro",
    accessibility: "None",
    food: "Vegetarian"
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await askGemini("Generate a matchday itinerary for seat " + formData.seat + " arriving at " + formData.arrivalTime + " via " + formData.transport);

      if (response.startsWith("COMMAND_GENERATE_ITINERARY|")) {
        const content = response.split("|")[1];
        const lines = content.split("\n");
        const schedule = lines.slice(1).map(line => {
          const parts = line.split(" - ");
          let icon: LucideIcon = Info;
          if (line.toLowerCase().includes("shuttle") || line.toLowerCase().includes("metro")) icon = Bus;
          if (line.toLowerCase().includes("lounge") || line.toLowerCase().includes("link")) icon = Sparkles;
          if (line.toLowerCase().includes("pitch") || line.toLowerCase().includes("briefing")) icon = MapPin;
          if (line.toLowerCase().includes("kick-off") || line.toLowerCase().includes("monitoring")) icon = Ticket;
          if (line.toLowerCase().includes("crowd") || line.toLowerCase().includes("analysis")) icon = Clock;

          return {
            time: parts[0]?.replace(/^\d+\.\s/, "") || "",
            task: parts[1] || "",
            icon
          };
        });

        setItinerary({
          schedule: schedule,
          recommendations: [
            "Use the North Ramp for a smoother walking route.",
            "Restrooms in Sector 3 are currently less crowded.",
            "Post-match: Special shuttle to Downtown leaves every 5 mins from Gate 2."
          ]
        });
      }
    } catch (error) {
      console.error("AI Generation error:", error);
    } finally {
      setIsGenerating(false);
      setStep(3);
    }
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);
  const reset = () => setStep(1);

  return {
    step,
    setStep,
    formData,
    setFormData,
    isGenerating,
    itinerary,
    handleGenerate,
    nextStep,
    prevStep,
    reset
  };
};
