"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, PerspectiveCamera, Stars } from "@react-three/drei";
import * as THREE from "three";
import { WebGLErrorBoundary } from "./WebGLErrorBoundary";

const AnimatedSphere = () => {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 100, 100]} scale={2.4}>
        <MeshDistortMaterial
          color="#2563eb"
          attach="material"
          distort={0.4}
          speed={4}
          roughness={0}
          metalness={1}
        />
      </Sphere>
    </Float>
  );
};

const Scene = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />

      <AnimatedSphere />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      <fog attach="fog" args={["#000", 5, 15]} />
    </>
  );
};

export const HeroVisual = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-60">
      <WebGLErrorBoundary>
        <Canvas dpr={[1, 2]}>
          <Scene />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
};

export default HeroVisual;
