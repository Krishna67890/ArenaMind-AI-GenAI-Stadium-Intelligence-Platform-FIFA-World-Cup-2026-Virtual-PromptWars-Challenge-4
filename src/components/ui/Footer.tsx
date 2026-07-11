"use client";

import React from "react";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-12 border-t border-white/5 text-center bg-black" role="contentinfo">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8 text-left">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-tr from-blue-600 to-purple-600 rounded flex items-center justify-center">
                <span className="font-bold text-white text-sm">A</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-white">ArenaMind AI</span>
            </Link>
            <p className="text-white/40 text-xs leading-relaxed">
              The intelligent stadium operating system for the FIFA World Cup 2026. Leveraging GenAI for real-time venue intelligence, crowd safety, and inclusive fan experiences.
            </p>
          </div>

          <div className="flex flex-wrap gap-12">
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">{t("developer")}</h4>
              <p className="text-white/60 text-sm mb-1 font-medium">Krishna Patil Rajput</p>
              <a href="mailto:krishna.coders12@gmail.com" className="text-blue-500 text-xs hover:underline block">krishna.coders12@gmail.com</a>
            </div>
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Connect</h4>

              <div className="flex gap-4">
                <a
                  href="https://github.com/Krishna67890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-white/40 hover:text-white"
                  title="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/krishna-patil-rajput-b66b03340"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-white/40 hover:text-white"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="mailto:krishna.coders12@gmail.com"
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-white/40 hover:text-white"
                  title="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-xs">© 2026 ArenaMind AI. Built for the FIFA World Cup Virtual PromptWars Challenge 4.</p>
          <div className="flex gap-6">
            <Link href="/accessibility" className="text-xs text-white/40 hover:text-white transition-colors">Accessibility</Link>
            <Link href="/privacy" className="text-xs text-white/40 hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="text-xs text-white/40 hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
