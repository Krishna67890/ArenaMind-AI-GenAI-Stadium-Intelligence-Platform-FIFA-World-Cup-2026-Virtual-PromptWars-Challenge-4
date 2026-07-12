"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Float, Text, MeshDistortMaterial, Html } from "@react-three/drei";
import * as THREE from "three";
import { AlertTriangle, Users, Thermometer, Wind } from "lucide-react";
import { motion } from "framer-motion";

interface InfoTagProps {
  position: [number, number, number];
  title: string;
  value: string;
  icon: any;
  color: string;
}

const InfoTag = ({ position, title, value, icon: Icon, color }: InfoTagProps) => {
  return (
    <Html position={position} center distanceFactor={10}>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-2 rounded-lg flex items-center gap-2 border-white/20 min-w-[100px] whitespace-nowrap bg-black/60 backdrop-blur-md"
      >
        <div className={`p-1 rounded bg-${color}-500/20`}>
          <Icon className={`w-3 h-3 text-${color}-500`} />
        </div>
        <div>
          <div className="text-[8px] text-white/40 font-bold uppercase">{title}</div>
          <div className="text-[10px] font-bold text-white">{value}</div>
        </div>
      </motion.div>
    </Html>
  );
};

const StadiumModel = () => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const tempObject = useMemo(() => new THREE.Object3D(), []);

  // Generate some "data points" for crowd density
  const dots = useMemo(() => {
    const d = [];
    for (let i = 0; i < 300; i++) {
      const angle = (i / 300) * Math.PI * 2;
      const radius = 3 + Math.random() * 0.7;
      d.push({
        position: [Math.cos(angle) * radius, Math.random() * 0.4, Math.sin(angle) * radius],
        color: Math.random() > 0.85 ? "#ef4444" : "#3b82f6",
        scale: 0.5 + Math.random()
      });
    }
    return d;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0005;
    }

    if (meshRef.current) {
      dots.forEach((dot, i) => {
        tempObject.position.set(dot.position[0], dot.position[1], dot.position[2]);
        const s = 0.02 * dot.scale;
        tempObject.scale.set(s, s, s);
        tempObject.updateMatrix();
        meshRef.current!.setMatrixAt(i, tempObject.matrix);
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Pitch */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[4, 6]} />
        <meshStandardMaterial color="#064e3b" roughness={0.8} />
      </mesh>

      {/* Pitch Lines */}
      <gridHelper args={[6, 12, 0x444444, 0x222222]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} />

      {/* Stadium Structure (Outer Ring) */}
      <mesh position={[0, 0.3, 0]}>
        <torusGeometry args={[3.6, 0.4, 16, 100]} />
        <meshStandardMaterial color="#18181b" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Floating UI Elements */}
      <InfoTag position={[-4, 1, 0]} title="North Entry" value="High Flow" icon={Users} color="red" />
      <InfoTag position={[4, 1, 2]} title="Temp" value="24°C" icon={Thermometer} color="orange" />
      <InfoTag position={[0, 1, -4]} title="Wind Speed" value="12km/h" icon={Wind} color="blue" />
      <InfoTag position={[2, 2, -2]} title="System Status" value="Optimal" icon={AlertTriangle} color="green" />

      {/* Crowd Dots (Instanced for performance) */}
      <instancedMesh ref={meshRef} args={[undefined, undefined, dots.length]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial vertexColors={false} color="#3b82f6" />
      </instancedMesh>

      {/* Scanning Rings */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
        <ringGeometry args={[3.8, 3.85, 64]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.3} />
      </mesh>

      <Float speed={3} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.5, 0]}>
          <ringGeometry args={[4.2, 4.22, 64]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.1} />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Text
          position={[0, 2.5, 0]}
          fontSize={0.25}
          color="white"
          maxWidth={2}
          textAlign="center"
        >
          METLIFE STADIUM
          FIFA WORLD CUP 2026
        </Text>
      </Float>

      {/* Ground Glow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <circleGeometry args={[6, 64]} />
        <meshBasicMaterial color="#1d4ed8" transparent opacity={0.05} />
      </mesh>
    </group>
  );
};

export const Stadium3D = () => {
  const [webglError, setWebglError] = useState(false);

  // Check WebGL on mount
  React.useEffect(() => {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) {
      setWebglError(true);
    }
  }, []);

  if (webglError) {
    return (
      <div className="w-full h-full min-h-[500px] bg-zinc-950/50 rounded-3xl flex flex-col items-center justify-center p-8 text-center border border-red-500/20">
        <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tighter">WebGL Unavailable</h3>
        <p className="text-sm text-white/50 max-w-xs leading-relaxed">
          Your browser or hardware has disabled WebGL. Please enable "Hardware Acceleration" in settings to view the 3D Digital Twin.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-xs font-bold uppercase transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[500px] bg-zinc-950/50 rounded-3xl overflow-hidden border border-white/10 relative cursor-grab active:cursor-grabbing">
      <div className="absolute top-6 left-6 z-10 space-y-2">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="glass-card py-2 px-4 rounded-full flex items-center gap-2"
        >
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-white">Live Digital Twin</span>
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card py-2 px-4 rounded-xl border-white/5 bg-black/40"
        >
          <div className="text-[8px] text-white/40 font-bold uppercase mb-1">Active Sensors</div>
          <div className="text-xs font-bold text-white">12,402 Units</div>
        </motion.div>
      </div>

      <div className="absolute top-6 right-6 z-10 flex flex-col gap-2">
         <button className="glass-card p-2 rounded-lg hover:bg-white/10 transition-all border-white/10">
            <Users className="w-4 h-4 text-blue-500" />
         </button>
         <button className="glass-card p-2 rounded-lg hover:bg-white/10 transition-all border-white/10">
            <Thermometer className="w-4 h-4 text-orange-500" />
         </button>
         <button className="glass-card p-2 rounded-lg hover:bg-white/10 transition-all border-white/10">
            <Wind className="w-4 h-4 text-cyan-500" />
         </button>
      </div>

      <Canvas shadows gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[10, 10, 10]} fov={45} />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          maxPolarAngle={Math.PI / 2.2}
          minDistance={6}
          maxDistance={18}
          autoRotate={false}
        />

        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} castShadow />
        <spotLight position={[-10, 20, 10]} angle={0.2} penumbra={1} intensity={2} castShadow />

        <StadiumModel />

        <fog attach="fog" args={["#000", 12, 30]} />
      </Canvas>

      <div className="absolute bottom-6 left-6 right-6 z-10 flex justify-between items-end">
         <div className="glass-card p-4 rounded-2xl max-w-[200px] border-blue-500/20 bg-black/60 backdrop-blur-md">
            <div className="text-[10px] text-blue-400 font-bold uppercase mb-1">AI Recommendation</div>
            <p className="text-[10px] text-white/60 leading-tight">
               Optimize North Stand gates. Traffic inflow is 15% above predicted peak.
            </p>
         </div>

         <div className="flex gap-2">
            <div className="glass-card p-3 rounded-2xl bg-black/60">
               <div className="text-[10px] text-white/40 font-bold uppercase mb-1">Model Fidelity</div>
               <div className="text-xs font-bold text-blue-500">ULTRA HIGH</div>
            </div>
         </div>
      </div>
    </div>
  );
};
