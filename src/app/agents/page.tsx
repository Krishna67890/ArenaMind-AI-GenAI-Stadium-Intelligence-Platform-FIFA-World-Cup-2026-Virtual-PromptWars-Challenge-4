"use client";

import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { AgentGrid } from "@/components/agents/AgentGrid";
import { VoiceAssistant } from "@/components/voice/VoiceAssistant";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function AgentsPage() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-black">
        <Navbar />
        <div className="pt-20">
          <AgentGrid />
        </div>
        <Footer />
        <VoiceAssistant />
      </main>
    </ProtectedRoute>
  );
}
