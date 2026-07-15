"use client";

import React, { useState, Suspense, useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  ContactShadows,
  Loader,
  BakeShadows,
  Preload,
  Html
} from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Shield,
  Zap,
  Activity,
  Map as MapIcon,
  Maximize2,
  Camera,
  Volume2,
  VolumeX,
  Mic,
  Moon,
  Sun,
  Wind,
  CloudRain,
  LucideIcon
} from "lucide-react";
import { WorldGlobe } from "@/components/arena-verse/WorldGlobe";
import { AdvancedStadium } from "@/components/arena-verse/AdvancedStadium";
import { Stadium3D } from "@/components/digital-twin/Stadium3D";
import { useLanguage } from "@/context/LanguageContext";
import { collection, onSnapshot, query, limit } from "firebase/firestore";
import { getFirebaseDb } from "@/services/firebase";
import { ProtectedRoute as AuthGuard } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { WebGLErrorBoundary } from "@/components/ui/WebGLErrorBoundary";
import * as THREE from "three";

// Enhanced WebGL detection hook
const useWebGLStatus = () => {
  const [isSupported, setIsSupported] = useState<boolean | null>(null);

  useEffect(() => {
    const checkWebGL = () => {
      try {
        const canvas = document.createElement("canvas");
        // Use a more explicit type cast to resolve the Vercel build error
        const gl = (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;

        if (!gl || typeof gl.getExtension !== 'function') return false;

        const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
        if (debugInfo) {
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          if (typeof renderer === 'string' && (renderer.toLowerCase().includes('disabled') || renderer === '')) {
            return false;
          }
        }
        return true;
      } catch (e) {
        return false;
      }
    };

    setIsSupported(checkWebGL());
  }, []);

  return isSupported;
};

interface CameraHandlerProps {
  view: "globe" | "stadium";
  cameraPosition: [number, number, number] | null;
  walkMode: boolean;
  tourInProgress: boolean;
}

function CameraHandler({ view, cameraPosition, walkMode, tourInProgress }: CameraHandlerProps) {
  useFrame((state) => {
    if (cameraPosition && !walkMode) {
      state.camera.position.lerp(new THREE.Vector3(...cameraPosition), tourInProgress ? 0.03 : 0.08);
      if (view === "globe") {
        state.camera.lookAt(0, 0, 0);
      }
    }
  });

  return (
    <PerspectiveCamera
      makeDefault
      position={view === "globe" ? [0, 0, 15] : [20, 15, 20]}
      fov={50}
    />
  );
}

export default function ArenaVersePage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const webglSupported = useWebGLStatus();
  const [view, setView] = useState<"globe" | "stadium">("globe");
  const [isMuted, setIsMuted] = useState(true);
  const [mode, setMode] = useState<"day" | "night">("night");
  const [weather, setWeather] = useState<"clear" | "rain">("clear");
  const [celebration, setCelebration] = useState(false);
  const [walkMode, setWalkMode] = useState(false);
  const [showHUD, setShowHUD] = useState(true);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [cameraPosition, setCameraPosition] = useState<[number, number, number] | null>(null);
  const [liveAlerts, setLiveAlerts] = useState<Array<{ id: string; message: string }>>([]);
  const [activeRoute, setActiveRoute] = useState<string[] | undefined>(undefined);
  const [selectedCity, setSelectedCity] = useState<{ name: string; stadium: string; pos: [number, number, number]; embedId?: string } | null>(null);
  const [tourInProgress, setTourInProgress] = useState(false);
  const [currentTourIndex, setCurrentTourIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const tourSequence = [
    { pos: [15, 5, 15], view: "globe", label: "Global Network Nodes", mode: "night" },
    { pos: [0, 18, 5], view: "globe", label: "Satellite Connectivity Grid", mode: "night" },
    { pos: [20, 12, 20], view: "stadium", label: "Digital Twin Synchronization", mode: "day" },
    { pos: [0, 5, 11], view: "stadium", label: "VIP Executive Analytics", mode: "night" },
    { pos: [0, 2, 0], view: "stadium", label: "Pitch-Level Neural Mapping", mode: "night" }
  ];

  const startAITour = () => {
    setTourInProgress(true);
    setCurrentTourIndex(0);
    runTourStep(0);
  };

  const runTourStep = (index: number) => {
    if (index >= tourSequence.length) {
      setTourInProgress(false);
      setMode("night");
      window.dispatchEvent(new CustomEvent("show-notification", {
        detail: {
          title: "AI Tour Complete",
          message: "Full stadium ecosystem scan finalized. All systems operational.",
          type: "success"
        }
      }));
      if (!isMuted && typeof window !== "undefined") {
        window.speechSynthesis.cancel();
        const endUtterance = new SpeechSynthesisUtterance("AI Tour complete. Full stadium ecosystem scan finalized.");
        window.speechSynthesis.speak(endUtterance);
      }
      return;
    }

    const step = tourSequence[index];
    setView(step.view as "globe" | "stadium");
    setCameraPosition(step.pos as [number, number, number]);
    if (step.mode) setMode(step.mode as "day" | "night");

    window.dispatchEvent(new CustomEvent("show-notification", {
      detail: {
        title: "AI Tour Guide",
        message: `Phase ${index + 1}: ${step.label}`,
        type: "info"
      }
    }));

    if (!isMuted && typeof window !== "undefined") {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(`Arena Verse phase ${index + 1}: ${step.label}`);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }

    setTimeout(() => {
      setCurrentTourIndex(index + 1);
      runTourStep(index + 1);
    }, 5500);
  };

  const handleCitySelect = (city: { name: string; stadium: string; pos: [number, number, number]; embedId?: string }) => {
    setSelectedCity(city);
    setView("stadium");
    setCameraPosition([15, 10, 15]);
    window.dispatchEvent(new CustomEvent("show-notification", {
      detail: {
        title: "Venue Synchronized",
        message: `Connected to ${city.stadium} Neural Twin in ${city.name}.`,
        type: "info"
      }
    }));
  };

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/sounds/stadium-ambience.mp3");
      audioRef.current.loop = true;
    }

    if (!isMuted) {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    } else {
      audioRef.current.pause();
    }
  }, [isMuted]);

  const takeScreenshot = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `ArenaVerse-${new Date().toISOString()}.png`;
      link.href = dataURL;
      link.click();

      window.dispatchEvent(new CustomEvent("show-notification", {
        detail: {
          title: "Screenshot Captured",
          message: "Neural snapshot saved to your local terminal.",
          type: "info"
        }
      }));
    }
  };

  const simulateRouteDetection = () => {
    const routes = [
      ["Bologna", "Saransk", "Los Angeles"],
      ["Saransk", "Dallas", "Bologna"],
      ["Vancouver", "Toronto", "Miami"],
      ["Los Angeles", "Dallas", "Saransk"]
    ];
    const randomRoute = routes[Math.floor(Math.random() * routes.length)];
    setActiveRoute(randomRoute);
    window.dispatchEvent(new CustomEvent("show-notification", {
      detail: {
        title: "Route Detected",
        message: `Neural synchronization active between ${randomRoute.join(" and ")}.`,
        type: "info"
      }
    }));
    setTimeout(() => setActiveRoute(undefined), 8000);
  };

  useEffect(() => {
    const db = getFirebaseDb();
    if (!db || !user) {
      setLiveAlerts([]);
      return;
    }

    let unsubscribe: () => void = () => {};

    try {
      const q = query(collection(db!, "stadium_alerts"), limit(3));
      unsubscribe = onSnapshot(q,
        (snapshot) => {
          const alerts = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as { id: string; message: string }[];
          setLiveAlerts(alerts);
        },
        (error) => {
          // Fallback to mock alerts if Firebase fails (permissions/connectivity)
          console.log("Auth sync: using local neural alerts fallback.");
          setLiveAlerts([
            { id: "mock-1", message: "Global travel corridors for FIFA 2026 are operating at optimal efficiency." },
            { id: "mock-2", message: "Stadium entry flow is currently 12% above seasonal average." }
          ]);
        }
      );
    } catch (err) {
      console.error("Failed to setup stadium alerts listener:", err);
    }

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    const handleCommand = (e: CustomEvent<string>) => handleVoiceCommand(e.detail);
    window.addEventListener("arena-command", handleCommand as EventListener);
    return () => window.removeEventListener("arena-command", handleCommand as EventListener);
  }, []);

  const handleVoiceCommand = (command: string) => {
    switch (command) {
      case "COMMAND_VIEW_GLOBE":
        setView("globe");
        setWalkMode(false);
        setCameraPosition(null);
        break;
      case "COMMAND_VIEW_STADIUM":
        setView("stadium");
        setWalkMode(false);
        setCameraPosition([15, 10, 15]);
        break;
      case "COMMAND_VIEW_VIP":
        setView("stadium");
        setWalkMode(false);
        setCameraPosition([0, 5, 11]);
        break;
      case "COMMAND_VIEW_PITCH":
        setView("stadium");
        setWalkMode(false);
        setCameraPosition([0, 2, 0]);
        break;
      case "COMMAND_MODE_NIGHT":
        setMode("night");
        break;
      case "COMMAND_MODE_DAY":
        setMode("day");
        break;
      case "COMMAND_CELEBRATE":
        setCelebration(true);
        setTimeout(() => setCelebration(false), 10000);
        break;
      case "COMMAND_WALK_MODE":
        setView("stadium");
        setWalkMode(true);
        setCameraPosition([0, 1.7, 5]);
        break;
      case "COMMAND_AI_TOUR":
        startAITour();
        break;
      case "COMMAND_DETECT_ROUTE":
        simulateRouteDetection();
        break;
      default:
        console.log("Unknown command:", command);
    }
  };

  const startDemo = () => {
    setView("globe");
    setTimeout(() => {
      handleVoiceCommand("COMMAND_VIEW_STADIUM");
      setTimeout(() => {
        handleVoiceCommand("COMMAND_VIEW_VIP");
        setTimeout(() => {
          handleVoiceCommand("COMMAND_CELEBRATE");
          setTimeout(() => {
            handleVoiceCommand("COMMAND_WALK_MODE");
          }, 4000);
        }, 4000);
      }, 4000);
    }, 3000);
  };

  // Prevent rendering anything while checking
  if (webglSupported === null) return <div className="h-screen w-full bg-black" />;

  // Performance optimization: only render what's visible
  return (
    <AuthGuard>
      <div className="relative w-full h-screen bg-black overflow-hidden font-sans text-white">
        {/* 3D Engine */}
        <div className="absolute inset-0 z-0">
          {webglSupported === false ? (
            <div className="flex flex-col items-center justify-center h-full p-12 text-center bg-zinc-950">
              <div className="w-24 h-24 mb-6 rounded-3xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                <Zap className="w-12 h-12 text-red-500" />
              </div>
              <h2 className="text-4xl font-black mb-4 uppercase italic tracking-tighter">Hardware Acceleration Required</h2>
              <p className="max-w-md text-white/60 mb-8 leading-relaxed">
                ArenaVerse 3D requires WebGL and hardware acceleration. Please enable hardware acceleration in your browser settings or try a different device for the full cinematic experience.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-white/80 transition-colors uppercase tracking-widest text-sm"
              >
                Retry Connection
              </button>
            </div>
          ) : (
            <WebGLErrorBoundary>
              <Canvas
                shadows
              gl={{
                antialias: false, // Turn off antialiasing for performance
                alpha: false, // Faster rendering without alpha transparency if possible
                powerPreference: "high-performance",
                preserveDrawingBuffer: false,
                failIfMajorPerformanceCaveat: true,
                stencil: false,
                depth: true
              }}
              dpr={typeof window !== "undefined" && window.devicePixelRatio > 2 ? [1, 1.5] : [1, 2]} // Lower DPR for high-density mobile screens
              onError={(e) => console.error("Three.js Canvas Error:", e)}
            >
              <Suspense fallback={null}>
                <CameraHandler
                  view={view}
                  cameraPosition={cameraPosition}
                  walkMode={walkMode}
                  tourInProgress={tourInProgress}
                />
                {!walkMode && !tourInProgress && (
                  <OrbitControls
                    enablePan={false}
                    enableRotate={view !== "globe"}
                    minDistance={view === "globe" ? 12 : 10}
                    maxDistance={view === "globe" ? 20 : 40}
                    autoRotate={view === "stadium" && !isMuted}
                    autoRotateSpeed={0.5}
                  />
                )}

                <ambientLight intensity={mode === "night" ? 0.5 : 1.2} />
                <pointLight position={[20, 20, 20]} intensity={mode === "night" ? 1 : 2} />
                <spotLight position={[-20, 20, -20]} intensity={1.5} angle={0.3} penumbra={1} castShadow />

                {view === "globe" ? (
                  <group>
                    <Html center transform distanceFactor={10}>
                      <div className="flex flex-col items-center gap-12">
                        <motion.div
                          initial={{ opacity: 0, y: 40 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="relative group"
                        >
                          {/* Animated Border Glow */}
                          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-purple-600 rounded-[3rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000" />

                          <div className="relative w-[90vw] max-w-[1100px] h-[50vh] lg:h-[650px] bg-black/60 backdrop-blur-3xl rounded-[2rem] lg:rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col">
                            {/* Pro Browser Header */}
                            <div className="p-3 lg:p-5 bg-white/5 border-b border-white/10 flex items-center justify-between pointer-events-auto">
                              <div className="flex items-center gap-3 lg:gap-6">
                                <div className="flex gap-2">
                                  <div className="w-2 h-2 lg:w-3.5 lg:h-3.5 rounded-full bg-red-500/40 border border-red-500/20" />
                                  <div className="w-2 h-2 lg:w-3.5 lg:h-3.5 rounded-full bg-yellow-500/40 border border-yellow-500/20" />
                                  <div className="w-2 h-2 lg:w-3.5 lg:h-3.5 rounded-full bg-green-500/40 border border-green-500/20" />
                                </div>

                                {/* Site Tab with Logo */}
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg border border-white/10 shadow-lg">
                                  <img src="/website.png" alt="Logo" className="w-3 h-3 lg:w-5 lg:h-5 object-contain" />
                                  <span className="text-[8px] lg:text-[10px] font-black uppercase tracking-wider text-white/70">Arena Intelligence</span>
                                </div>
                              </div>

                              <div className="flex-grow max-w-xl mx-4 lg:mx-8 hidden sm:block">
                                <div className="w-full px-4 py-1.5 rounded-xl bg-black/40 border border-white/5 text-[9px] lg:text-[11px] font-bold text-white/30 flex items-center gap-2 italic tracking-wider">
                                  <Globe className="w-3 h-3 lg:w-4 lg:h-4 text-blue-500/50" />
                                  https://ion.cesium.com/stories/viewer/fifa...
                                </div>
                              </div>

                              <div className="flex items-center gap-3 lg:gap-4 text-white/20">
                                <Activity className="w-3 h-3 lg:w-4 lg:h-4" />
                                <Shield className="w-3 h-3 lg:w-4 lg:h-4" />
                              </div>
                            </div>

                            {/* Cesium Iframe Container */}
                            <div className="flex-grow relative pointer-events-auto bg-zinc-950">
                              <iframe
                                src="https://ion.cesium.com/stories/viewer/?id=5ec12de5-8f5a-489d-aedb-9850c89962f2"
                                className="absolute inset-0 w-full h-full border-0 grayscale-[0.2] contrast-[1.1]"
                                allowFullScreen
                                title="FIFA 2026 Global Host Cities Explorer"
                              />

                              {/* Visit Now CTA Overlay */}
                              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 pointer-events-auto">
                                 <motion.a
                                   whileHover={{ scale: 1.05, y: -5 }}
                                   whileTap={{ scale: 0.95 }}
                                   href="https://ion.cesium.com/stories/viewer/?id=5ec12de5-8f5a-489d-aedb-9850c89962f2"
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="px-12 py-5 bg-blue-600 text-white font-black uppercase tracking-[0.2em] rounded-full shadow-[0_0_50px_rgba(37,99,235,0.8)] hover:bg-blue-500 transition-all flex items-center gap-4 border border-blue-400/50 group/btn"
                                 >
                                   <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover/btn:bg-white/20 transition-colors">
                                      <Maximize2 className="w-4 h-4" />
                                   </div>
                                   Visit Full Experience
                                 </motion.a>
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        <div className="text-center space-y-2 lg:space-y-3">
                           <h2 className="text-3xl lg:text-6xl font-black italic tracking-tighter uppercase text-gradient">Explore Global Host Cities</h2>
                           <div className="flex items-center justify-center gap-2 lg:gap-4">
                             <div className="h-[1px] w-8 lg:w-12 bg-gradient-to-r from-transparent to-blue-500/50" />
                             <p className="text-white/40 text-[8px] lg:text-xs font-bold uppercase tracking-[0.3em] lg:tracking-[0.5em] animate-pulse">Neural Geospatial Intelligence Grid</p>
                             <div className="h-[1px] w-8 lg:w-12 bg-gradient-to-l from-transparent to-blue-500/50" />
                           </div>
                        </div>
                      </div>
                    </Html>
                  </group>
                ) : (
                  <group>
                    <AdvancedStadium mode={mode} celebration={celebration} weather={weather} />
                    <Html position={[0, 10, -15]} center transform distanceFactor={10}>
                      <div className="w-[90vw] max-w-[800px] h-[30vh] lg:h-[450px] bg-black/20 backdrop-blur-md rounded-2xl lg:rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
                        <Stadium3D
                          title={selectedCity ? selectedCity.stadium : "Stadio Renato Dall'Ara"}
                          embedId={selectedCity?.embedId}
                        />
                      </div>
                    </Html>
                  </group>
                )}

                <Environment preset={mode === "night" ? "city" : "park"} />
                <ContactShadows opacity={0.4} scale={20} blur={2.4} far={4.5} />
                <BakeShadows />
                <Preload all />
              </Suspense>
            </Canvas>
          </WebGLErrorBoundary>
          )}
        </div>

        {/* Loading Overlay */}
        <Loader />

        {/* Cinematic HUD - Top Bar */}
        <AnimatePresence>
          {showHUD && (
            <motion.header
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              className="absolute top-0 left-0 right-0 z-50 p-6 flex justify-between items-start pointer-events-none"
            >
              <div className="pointer-events-auto">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.5)]">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-black tracking-tighter uppercase italic">{t("arenaVerse")}</h1>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[10px] font-bold text-white/50 tracking-widest uppercase">System Operational // FIFA 2026</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pointer-events-auto lg:flex overflow-x-auto no-scrollbar max-w-[60vw] pb-2 lg:pb-0">
                <button
                  onClick={startAITour}
                  className="glass-card px-4 lg:px-6 py-2 lg:py-3 rounded-full flex items-center gap-3 hover:bg-white/10 transition-all border-white/10 group bg-purple-600/20 flex-shrink-0"
                  aria-label="Start AI Guided Tour"
                >
                  <Activity className="w-4 h-4 lg:w-5 lg:h-5 text-purple-400 animate-pulse" />
                  <span className="text-[10px] lg:text-sm font-bold uppercase tracking-widest whitespace-nowrap">AI Tour Guide</span>
                </button>
                <button
                  onClick={simulateRouteDetection}
                  className="glass-card px-4 lg:px-6 py-2 lg:py-3 rounded-full flex items-center gap-3 hover:bg-white/10 transition-all border-white/10 group bg-red-600/20 flex-shrink-0"
                  aria-label="Simulate Neural Route Detection"
                >
                  <Zap className="w-4 h-4 lg:w-5 lg:h-5 text-red-400 animate-pulse" />
                  <span className="text-[10px] lg:text-sm font-bold uppercase tracking-widest whitespace-nowrap">Detect Route</span>
                </button>
                <button
                  onClick={startDemo}
                  className="glass-card px-4 lg:px-6 py-2 lg:py-3 rounded-full flex items-center gap-3 hover:bg-white/10 transition-all border-white/10 group bg-blue-600/20 flex-shrink-0"
                  aria-label="Start Automated Judge Demo"
                >
                  <Zap className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-400 animate-pulse" />
                  <span className="text-[10px] lg:text-sm font-bold uppercase tracking-widest whitespace-nowrap">Judge Demo</span>
                </button>
                <button
                  onClick={() => setView(view === "globe" ? "stadium" : "globe")}
                  className="glass-card px-4 lg:px-6 py-2 lg:py-3 rounded-full flex items-center gap-3 hover:bg-white/10 transition-all border-white/10 group flex-shrink-0"
                  aria-label={view === "globe" ? "Switch to Stadium Simulation" : "Switch to Global Explorer"}
                >
                  {view === "globe" ? <MapIcon className="w-4 h-4 lg:w-5 lg:h-5 text-blue-400" /> : <Globe className="w-4 h-4 lg:w-5 lg:h-5 text-blue-400" />}
                  <span className="text-[10px] lg:text-sm font-bold uppercase tracking-widest whitespace-nowrap">
                    {view === "globe" ? "Stadium Simulation" : "Global Explorer"}
                  </span>
                </button>
              </div>
            </motion.header>
          )}
        </AnimatePresence>

        {/* Cinematic HUD - Left Side Operational Intel */}
        <AnimatePresence>
          {showHUD && (
            <motion.aside
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-50 space-y-4 hidden sm:block"
            >
              {[
                { icon: Activity, label: "Live Sensors", value: "12,402", color: "blue" },
                { icon: Zap, label: "Energy Load", value: "95%", color: "yellow" },
                { icon: Shield, label: "Security", value: "Optimal", color: "green" },
              ].map((stat, i) => (
                <div key={i} className="glass-card p-4 rounded-2xl border-white/5 w-48 group hover:border-blue-500/50 transition-colors">
                  <div className="flex items-center gap-3 mb-1">
                    <stat.icon className={`w-4 h-4 text-${stat.color}-400`} />
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{stat.label}</span>
                  </div>
                  <div className="text-xl font-black tracking-tight">{stat.value}</div>
                  <div className="w-full h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "70%" }}
                      className={`h-full bg-${stat.color}-500`}
                    />
                  </div>
                </div>
              ))}
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Cinematic HUD - Right Side Controls */}
        <AnimatePresence>
          {showHUD && (
            <motion.aside
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3"
            >
               <ControlButton
                icon={mode === "night" ? Moon : Sun}
                active={mode === "night"}
                onClick={() => setMode(mode === "night" ? "day" : "night")}
                label="Lighting"
              />
               <ControlButton
                icon={weather === "rain" ? CloudRain : Wind}
                active={weather === "rain"}
                onClick={() => setWeather(weather === "rain" ? "clear" : "rain")}
                label="Weather"
              />
               <ControlButton
                icon={isMuted ? VolumeX : Volume2}
                active={!isMuted}
                onClick={() => setIsMuted(!isMuted)}
                label="Audio"
              />
               <ControlButton
                icon={Mic}
                active={isVoiceOpen}
                onClick={() => {
                  setIsVoiceOpen(!isVoiceOpen);
                  window.dispatchEvent(new CustomEvent("open-voice-assistant"));
                }}
                label="Voice"
              />
               <ControlButton icon={Camera} onClick={takeScreenshot} label="Photo" />
               <ControlButton icon={Maximize2} onClick={() => setShowHUD(!showHUD)} label="Immersive" />
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Bottom Information Panel */}
        <AnimatePresence>
          {showHUD && (
            <motion.footer
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="absolute bottom-0 left-0 right-0 z-50 p-4 md:p-8 flex flex-col md:flex-row justify-between items-center md:items-end gap-6 pointer-events-none"
            >
              <div className="max-w-md w-full pointer-events-auto">
                <div className="glass-card p-4 md:p-6 rounded-3xl border-white/10 bg-black/60 backdrop-blur-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="px-2 py-0.5 rounded bg-blue-500 text-[10px] font-bold uppercase tracking-tighter">AI Analysis</div>
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Incident Prediction // {new Date().toLocaleTimeString()}</span>
                  </div>
                  <p className="text-sm md:text-lg font-medium leading-tight mb-4 text-white/90">
                    {liveAlerts.length > 0
                      ? liveAlerts[0].message
                      : (view === "globe"
                          ? "Global travel corridors for FIFA 2026 are operating at optimal efficiency. High density predicted at NY/NJ airport in 48h."
                          : "Stadium entry flow is currently 12% above seasonal average. Recommending activation of additional Gate 4 scanners.")
                    }
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => window.location.href = '/dashboard'}
                      className="px-4 py-2 rounded-xl bg-blue-600 text-xs font-bold uppercase hover:bg-blue-500 transition-colors"
                    >
                      {t("viewAll")}
                    </button>
                    <button
                      onClick={startAITour}
                      className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold uppercase hover:bg-white/10 transition-colors"
                    >
                      {t("tourGuide")}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center md:items-end gap-4 pointer-events-auto">
                <div className="text-center md:text-right">
                  <div className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em] mb-1">Current Venue</div>
                  <div className="text-2xl md:text-4xl font-black tracking-tighter italic">
                    {selectedCity ? selectedCity.stadium.toUpperCase() : "STADIO RENATO DALL'ARA"}
                  </div>
                  <div className="text-blue-400 font-bold tracking-widest text-[10px] md:text-sm uppercase">
                    {selectedCity ? `${selectedCity.name}` : "Bologna, Italy"}
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="glass-card px-4 py-2 rounded-xl bg-black/40">
                    <div className="text-[8px] font-bold text-white/40 uppercase mb-1">Capacity</div>
                    <div className="text-xs md:text-sm font-bold">{selectedCity ? "75,000+" : "38,279"}</div>
                  </div>
                  <div className="glass-card px-4 py-2 rounded-xl bg-black/40">
                    <div className="text-[8px] font-bold text-white/40 uppercase mb-1">Status</div>
                    <div className="text-xs md:text-sm font-bold text-green-400">OPERATIONAL</div>
                  </div>
                </div>
              </div>
            </motion.footer>
          )}
        </AnimatePresence>

        {/* Mini-map / Grid Background Effect */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        {!showHUD && (
          <button
            onClick={() => setShowHUD(true)}
            className="absolute top-6 right-6 z-50 glass-card p-3 rounded-full hover:bg-white/10 transition-all border-white/10"
            aria-label="Show HUD"
          >
            <Maximize2 className="w-5 h-5 text-white" />
          </button>
        )}
      </div>
    </AuthGuard>
  );
}

interface ControlButtonProps {
  icon: LucideIcon;
  active?: boolean;
  onClick: () => void;
  label: string;
}

function ControlButton({ icon: Icon, active, onClick, label }: ControlButtonProps) {
  return (
    <div className="flex items-center justify-end gap-3 group">
      <span className="text-[10px] font-bold uppercase tracking-widest text-white/0 group-hover:text-white/60 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0" aria-hidden="true">
        {label}
      </span>
      <button
        onClick={onClick}
        aria-label={label}
        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all border ${
          active
          ? "bg-blue-600 border-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
          : "bg-black/40 border-white/10 hover:border-white/30"
        }`}
      >
        <Icon className={`w-5 h-5 ${active ? "text-white" : "text-white/60"}`} />
      </button>
    </div>
  );
}
