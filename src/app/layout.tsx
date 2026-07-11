import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { CursorSpotlight } from "@/components/ui/CursorSpotlight";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import { VoiceAssistant } from "@/components/voice/VoiceAssistant";
import { PaymentModal } from "@/components/payment/PaymentModal";
import { AIAgentChat } from "@/components/ai-agent/AIAgentChat";
import { NotificationToast } from "@/components/ui/NotificationToast";
import { NotificationProvider } from "@/context/NotificationContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://arenamind.ai"),
  title: {
    default: "ArenaMind AI | Intelligent Stadium OS",
    template: "%s | ArenaMind AI"
  },
  description: "Advanced AI-powered Smart Stadium Operating System for global sporting events. Experience the future of crowd management, accessibility, and real-time operations.",
  keywords: ["AI Stadium", "Smart Stadium", "Stadium OS", "ArenaMind AI", "Crowd Management AI", "Sports Technology", "Virtual PromptWars"],
  authors: [{ name: "Krishna Patil Rajput" }],
  creator: "Krishna Patil Rajput",
  publisher: "ArenaMind AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "ArenaMind AI | The Future of Stadium Operations",
    description: "Experience the next generation of smart stadium management with ArenaMind AI.",
    url: "https://arenamind.ai",
    siteName: "ArenaMind AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ArenaMind AI Dashboard Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArenaMind AI | Intelligent Stadium OS",
    description: "The Future of Intelligent Stadium Operations for Global Sporting Events.",
    creator: "@krishnapatil",
    images: ["/og-image.png"],
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // Allow zooming for accessibility
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} antialiased selection:bg-blue-500/30 bg-black text-white`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-6 focus:py-3 focus:bg-blue-600 focus:text-white focus:rounded-full focus:font-bold focus:shadow-2xl transition-all"
        >
          Skip to content
        </a>
        <LanguageProvider>
          <AuthProvider>
            <NotificationProvider>
              <NotificationToast />
              <CursorSpotlight />
              <CommandPalette />
              {children}
              <VoiceAssistant />
              <PaymentModal />
              <AIAgentChat />
            </NotificationProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
