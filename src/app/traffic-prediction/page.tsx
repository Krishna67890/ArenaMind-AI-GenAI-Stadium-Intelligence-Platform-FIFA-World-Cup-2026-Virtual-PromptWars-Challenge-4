"use client";

import React, { useState, Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  ContactShadows,
  Float,
  Text,
  Html,
} from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Car,
  Globe,
  Info,
  Layers,
  Map,
  Navigation,
  Shield,
  TrendingUp,
  Wind,
  Clock,
  Zap,
} from "lucide-react";
import * as THREE from "three";
import { Navbar } from "@/components/ui/Navbar";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

interface HostCity {
  name: string;
  lat: number;
  lng: number;
  stadium: string;
  congestion: number;
  status: string;
}

// Mock Traffic Data for FIFA 2026 Host Cities
const HOST_CITIES: HostCity[] = [
  { name: "Mexico City", lat: 19.4326, lng: -99.1332, stadium: "Azteca", congestion: 88, status: "Critical" },
  { name: "New York/New Jersey", lat: 40.7128, lng: -74.006, stadium: "MetLife", congestion: 65, status: "High" },
  { name: "Los Angeles", lat: 34.0522, lng: -118.2437, stadium: "SoFi", congestion: 72, status: "High" },
  { name: "Kansas City", lat: 39.0997, lng: -94.5786, stadium: "Arrowhead", congestion: 42, status: "Stable" },
  { name: "Dallas", lat: 32.7767, lng: -96.797, stadium: "AT&T", congestion: 58, status: "Moderate" },
  { name: "Vancouver", lat: 49.2827, lng: -123.1207, stadium: "BC Place", congestion: 35, status: "Stable" },
];

interface GlobalTrafficGlobeProps {
  selectedCity: HostCity | null;
  onCityClick: (city: HostCity) => void;
}

function GlobalTrafficGlobe({ selectedCity, onCityClick }: GlobalTrafficGlobeProps) {
  const globeRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (globeRef.current && !selectedCity) {
      globeRef.current.rotation.y += 0.002;
    }
  });

  // Convert lat/lng to 3D coordinates
  const getCoords = (lat: number, lng: number, radius: number = 5) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    return [
      -radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta),
    ] as [number, number, number];
  };

  return (
    <group ref={globeRef}>
      {/* Main Globe Sphere */}
      <mesh>
        <sphereGeometry args={[5, 64, 64]} />
        <meshStandardMaterial
          color="#0a0a1a"
          emissive="#1a1a3a"
          emissiveIntensity={0.5}
          wireframe={false}
        />
      </mesh>

      {/* Wireframe Grid */}
      <mesh>
        <sphereGeometry args={[5.05, 40, 40]} />
        <meshStandardMaterial
          color="#3b82f6"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Host City Markers */}
      {HOST_CITIES.map((city, idx) => {
        const pos = getCoords(city.lat, city.lng);
        const isSelected = selectedCity?.name === city.name;

        return (
          <group key={city.name} position={pos}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
              <mesh onClick={() => onCityClick(city)}>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial
                  color={city.congestion > 70 ? "#ef4444" : city.congestion > 50 ? "#eab308" : "#22c55e"}
                  emissive={city.congestion > 70 ? "#ef4444" : "#22c55e"}
                  emissiveIntensity={isSelected ? 5 : 2}
                />
              </mesh>
            </Float>

            {/* Connection Arcs (Visual only for now) */}
            {idx > 0 && (
              <line>
                {/* Simplified arc visualization */}
              </line>
            )}

            {isSelected && (
              <Html distanceFactor={10}>
                <div className="bg-black/80 backdrop-blur-md p-3 rounded-xl border border-blue-500/50 w-48 shadow-2xl pointer-events-none">
                  <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">{city.stadium}</div>
                  <div className="text-sm font-bold text-white mb-2">{city.name}</div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-white/60 uppercase">Load</span>
                    <span className="text-xs font-bold text-red-400">{city.congestion}%</span>
                  </div>
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}

export default function TrafficPredictionPage() {
  const [selectedCity, setSelectedCity] = useState<HostCity | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
        <Navbar />

        <div className="relative h-[calc(100vh-80px)] overflow-hidden">
          {/* 3D Visualizer */}
          <div className="absolute inset-0 z-0">
            <Canvas shadows dpr={[1, 2]}>
              <Suspense fallback={null}>
                <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={45} />
                <OrbitControls
                  enablePan={false}
                  minDistance={8}
                  maxDistance={25}
                  autoRotate={!selectedCity}
                  autoRotateSpeed={0.5}
                />

                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#3b82f6" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ef4444" />

                <GlobalTrafficGlobe
                  selectedCity={selectedCity}
                  onCityClick={setSelectedCity}
                />

                <Environment preset="night" />
                <ContactShadows opacity={0.4} scale={20} blur={2.4} far={4.5} />
              </Suspense>
            </Canvas>
          </div>

          {/* HUD Overlay */}
          <div className="absolute inset-0 z-10 pointer-events-none p-8 flex flex-col justify-between">
            {/* Top HUD */}
            <div className="flex justify-between items-start">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="pointer-events-auto"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.4)]">
                    <Navigation className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-black italic tracking-tighter uppercase">Traffic AI</h1>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase">Global Logistics Feed</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="flex gap-4 pointer-events-auto"
              >
                <div className="glass-card px-6 py-4 rounded-2xl border-white/5 backdrop-blur-xl">
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Global Load</div>
                      <div className="text-xl font-black">62.4%</div>
                    </div>
                    <div className="w-px h-8 bg-white/10" />
                    <div className="text-right">
                      <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Active Hubs</div>
                      <div className="text-xl font-black">16</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom HUD */}
            <div className="flex justify-between items-end">
              {/* Left Panel - Insights */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="w-[450px] pointer-events-auto"
              >
                <div className="glass-card p-6 rounded-[2.5rem] border-white/10 bg-black/60 backdrop-blur-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-4">
                      {["overview", "forecast", "alerts"].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                            activeTab === tab ? "text-blue-500" : "text-white/40 hover:text-white"
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                    <Activity className="w-4 h-4 text-blue-500 animate-pulse" />
                  </div>

                  <AnimatePresence mode="wait">
                    {activeTab === "overview" && (
                      <motion.div
                        key="overview"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <h2 className="text-2xl font-bold mb-2">
                          {selectedCity ? `${selectedCity.name} Analysis` : "Multi-Regional Forecast"}
                        </h2>
                        <p className="text-white/60 text-sm leading-relaxed mb-6">
                          {selectedCity
                            ? `Real-time satellite telemetry indicates ${selectedCity.congestion}% saturation near ${selectedCity.stadium}. Recommending adaptive lane reversal on primary arteries.`
                            : "AI modeling predicts a 24% increase in transit demand across all North American corridors. Integrating real-time airline and rail data for crowd density mapping."}
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                            <div className="flex items-center gap-2 mb-2">
                              <Car className="w-4 h-4 text-blue-400" />
                              <span className="text-[10px] font-bold uppercase text-white/40">Road Load</span>
                            </div>
                            <div className="text-lg font-bold">{selectedCity ? `${selectedCity.congestion}%` : "58%"}</div>
                          </div>
                          <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                            <div className="flex items-center gap-2 mb-2">
                              <TrendingUp className="w-4 h-4 text-green-400" />
                              <span className="text-[10px] font-bold uppercase text-white/40">Efficiency</span>
                            </div>
                            <div className="text-lg font-bold">{selectedCity ? "Optimal" : "92%"}</div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button className="w-full mt-6 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 group">
                    View Full Logistics Report
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>

              {/* Right Panel - City Selector */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="w-72 pointer-events-auto"
              >
                <div className="glass-card p-4 rounded-[2rem] border-white/10 bg-black/40 backdrop-blur-xl">
                  <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4 px-2">Host City Monitor</div>
                  <div className="space-y-2">
                    {HOST_CITIES.map((city) => (
                      <button
                        key={city.name}
                        onClick={() => setSelectedCity(city)}
                        className={`w-full p-3 rounded-xl flex items-center justify-between transition-all border ${
                          selectedCity?.name === city.name
                          ? "bg-blue-600/20 border-blue-500/50"
                          : "bg-white/5 border-transparent hover:border-white/10"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${
                            city.congestion > 70 ? "bg-red-500" : city.congestion > 50 ? "bg-yellow-500" : "bg-green-500"
                          }`} />
                          <span className="text-xs font-bold uppercase tracking-wider">{city.name}</span>
                        </div>
                        <span className="text-[10px] font-mono opacity-60">{city.congestion}%</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Background Grid Decoration */}
          <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
            <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
