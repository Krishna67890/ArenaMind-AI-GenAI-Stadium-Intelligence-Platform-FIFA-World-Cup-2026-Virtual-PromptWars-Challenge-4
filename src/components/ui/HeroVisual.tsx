"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { WebGLErrorBoundary } from "./WebGLErrorBoundary";

const AnimatedSphere = () => {
  return (
    <Sphere args={[1, 64, 64]} scale={2.4}>
      <MeshDistortMaterial
        color="#3b82f6"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0}
      />
    </Sphere>
  );
};

export default function HeroVisual() {
  const [mounted, setMounted] = useState(false);
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setMounted(true);
    const checkWebGL = () => {
      try {
        const canvas = document.createElement("canvas");
        return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
      } catch (e) {
        return false;
      }
    };
    setWebglSupported(checkWebGL());
  }, []);

  if (!mounted || webglSupported === false) {
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[100px] animate-bounce" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      <Suspense fallback={null}>
        <WebGLErrorBoundary>
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ powerPreference: "high-performance" }}>
            <ambientLight intensity={1.5} />
            <pointLight position={[10, 10, 10]} />
            <directionalLight position={[2, 1, 1]} intensity={2} />
            <AnimatedSphere />
            <OrbitControls enableZoom={false} />
          </Canvas>
        </WebGLErrorBoundary>
      </Suspense>
    </div>
  );
}
