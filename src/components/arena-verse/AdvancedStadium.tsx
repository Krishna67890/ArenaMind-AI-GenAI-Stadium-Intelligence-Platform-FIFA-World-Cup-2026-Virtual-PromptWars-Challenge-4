"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Box } from "@react-three/drei";
import * as THREE from "three";

export const AdvancedStadium = ({ mode = "day", celebration = false, weather = "clear" }: { mode?: string, celebration?: boolean, weather?: string }) => {
  const groupRef = useRef<THREE.Group>(null);

  const colors = {
    grass: mode === "night" ? "#064e3b" : "#16a34a",
    seats: "#18181b",
    led: celebration ? "#3b82f6" : "#2563eb",
    lines: "#ffffff",
  };

  return (
    <group ref={groupRef}>
      {/* Pitch */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0.01, 0]}>
        <planeGeometry args={[10, 15]} />
        <meshStandardMaterial
          color={colors.grass}
          roughness={0.8}
          metalness={0.1}
          emissive={mode === "night" ? "#064e3b" : "#000"}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Pitch Markings */}
      <group position={[0, 0.02, 0]}>
         <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[10, 0.05]} />
            <meshBasicMaterial color={colors.lines} />
         </mesh>
         <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.5, 1.55, 64]} />
            <meshBasicMaterial color={colors.lines} />
         </mesh>
         <PenaltyArea position={[0, 0, 6.5]} />
         <PenaltyArea position={[0, 0, -6.5]} rotation={[0, Math.PI, 0]} />
      </group>

      {/* LED Ribbon Board (Lower Stand) */}
      <mesh position={[0, 1, 7.4]}>
        <boxGeometry args={[12, 0.2, 0.1]} />
        <meshStandardMaterial
          color={colors.led}
          emissive={colors.led}
          emissiveIntensity={celebration ? 5 : 2}
        />
      </mesh>

      {/* VIP Executive Lounge */}
      <mesh position={[0, 4.5, 9.5]}>
        <boxGeometry args={[12, 2, 1]} />
        <meshStandardMaterial color="#111" transparent opacity={0.6} metalness={1} roughness={0} />
      </mesh>
      <Text position={[0, 5, 10.1]} fontSize={0.3} color="#fff">
        EXECUTIVE VIP SUITE
      </Text>

      {/* Goal Posts & Lines */}
      <GoalPost position={[0, 0, 7.5]} />
      <GoalPost position={[0, 0, -7.5]} rotation={[0, Math.PI, 0]} />

      {/* Stands */}
      <Stands position={[0, 0, 8.5]} rotation={[0, 0, 0]} />
      <Stands position={[0, 0, -8.5]} rotation={[0, Math.PI, 0]} />
      <Stands position={[6.5, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
      <Stands position={[-6.5, 0, 0]} rotation={[0, Math.PI / 2, 0]} />

      {/* Floodlights */}
      <Floodlight position={[7, 8, 10]} intensity={mode === "night" ? 5 : 0.5} color={celebration ? "#3b82f6" : "#fff"} />
      <Floodlight position={[-7, 8, 10]} intensity={mode === "night" ? 5 : 0.5} color={celebration ? "#ef4444" : "#fff"} />
      <Floodlight position={[7, 8, -10]} intensity={mode === "night" ? 5 : 0.5} color={celebration ? "#3b82f6" : "#fff"} />
      <Floodlight position={[-7, 8, -10]} intensity={mode === "night" ? 5 : 0.5} color={celebration ? "#ef4444" : "#fff"} />

      <Crowd count={2000} heatLevel={celebration ? 1 : 0.4} />
      <Scoreboard position={[0, 6, -11]} celebration={celebration} />

      {celebration && <Fireworks />}
      {weather === "rain" && <RainEffect />}
      {mode === "night" && !celebration && <fog attach="fog" args={["#000", 15, 35]} />}
    </group>
  );
};

const RainEffect = () => {
  const points = useMemo(() => {
    const p = [];
    for (let i = 0; i < 1000; i++) {
      p.push(new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        Math.random() * 15,
        (Math.random() - 0.5) * 25
      ));
    }
    return p;
  }, []);

  const meshRef = useRef<THREE.Points>(null);

  useFrame(() => {
    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] -= 0.2;
        if (positions[i + 1] < 0) positions[i + 1] = 15;
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#60a5fa" size={0.05} transparent opacity={0.4} />
    </points>
  );
};


interface PenaltyAreaProps {
  position: [number, number, number];
  rotation?: [number, number, number];
}

const PenaltyArea = ({ position, rotation }: PenaltyAreaProps) => (
  <group position={position} rotation={rotation}>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[4, 0.05]} />
      <meshBasicMaterial color="white" />
    </mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2, 0, -0.5]}>
      <planeGeometry args={[0.05, 1]} />
      <meshBasicMaterial color="white" />
    </mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-2, 0, -0.5]}>
      <planeGeometry args={[0.05, 1]} />
      <meshBasicMaterial color="white" />
    </mesh>
  </group>
);

interface GoalPostProps {
  position: [number, number, number];
  rotation?: [number, number, number];
}

const GoalPost = ({ position, rotation }: GoalPostProps) => (
  <group position={position} rotation={rotation}>
    <mesh position={[0.8, 0.4, 0]}>
      <cylinderGeometry args={[0.02, 0.02, 0.8]} />
      <meshStandardMaterial color="white" />
    </mesh>
    <mesh position={[-0.8, 0.4, 0]}>
      <cylinderGeometry args={[0.02, 0.02, 0.8]} />
      <meshStandardMaterial color="white" />
    </mesh>
    <mesh position={[0, 0.8, 0]} rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[0.02, 0.02, 1.6]} />
      <meshStandardMaterial color="white" />
    </mesh>
  </group>
);

interface StandsProps {
  position: [number, number, number];
  rotation?: [number, number, number];
}

const Stands = ({ position, rotation }: StandsProps) => (
  <group position={position} rotation={rotation}>
    <mesh position={[0, 0.5, 0]}>
      <boxGeometry args={[12, 1, 2]} />
      <meshStandardMaterial color="#27272a" />
    </mesh>
    <mesh position={[0, 1.5, 1]}>
      <boxGeometry args={[12, 1.5, 2]} />
      <meshStandardMaterial color="#18181b" />
    </mesh>
    <mesh position={[0, 3.5, 2]} rotation={[0.2, 0, 0]}>
      <boxGeometry args={[14, 0.2, 4]} />
      <meshStandardMaterial color="#3f3f46" metalness={0.8} roughness={0.2} />
    </mesh>
  </group>
);

interface FloodlightProps {
  position: [number, number, number];
  color: string;
  intensity: number;
}

const Floodlight = ({ position, color, intensity }: FloodlightProps) => (
  <group position={position}>
    <mesh>
      <cylinderGeometry args={[0.1, 0.15, 12]} />
      <meshStandardMaterial color="#18181b" />
    </mesh>
    <mesh position={[0, 6, 0]}>
      <boxGeometry args={[1.5, 0.8, 0.5]} />
      <meshStandardMaterial color="#3f3f46" />
    </mesh>
    <spotLight
      position={[0, 6, 0]}
      intensity={intensity}
      color={color}
      angle={0.6}
      penumbra={0.5}
      castShadow
    />
  </group>
);

const Crowd = ({ count, heatLevel }: { count: number, heatLevel: number }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const tempObject = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    let i = 0;
    for (let x = 0; x < 50; x++) {
      for (let z = 0; z < 40; z++) {
        if (i >= count) break;
        const id = i++;
        const jump = Math.sin(time * 4 + id) * (0.05 * heatLevel * 2);
        tempObject.position.set(x * 0.25 - 6.25, 0.8 + jump, z * 0.3 + 7.5);
        tempObject.updateMatrix();
        meshRef.current.setMatrixAt(id, tempObject.matrix);

        // Heatmap Logic
        if (z > 30) color.setHex(0xef4444); // High density area
        else color.setHex(0x3b82f6);
        meshRef.current.setColorAt(id, color);
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[0.1, 0.2, 0.1]} />
      <meshStandardMaterial />
    </instancedMesh>
  );
};

interface ScoreboardProps {
  position: [number, number, number];
  celebration: boolean;
}

const Scoreboard = ({ position, celebration }: ScoreboardProps) => (
  <group position={position}>
    <Box args={[5, 2.5, 0.2]}>
      <meshStandardMaterial color="#000" emissive={celebration ? "#3b82f6" : "#111"} />
    </Box>
    <Text position={[0, 0.2, 0.11]} fontSize={0.5} color={celebration ? "#fff" : "#fbbf24"}>
      {celebration ? "GOAL!!!" : "USA 2 - 1 BRA"}
    </Text>
    <Text position={[0, -0.5, 0.11]} fontSize={0.25} color="#fff">
      84:22
    </Text>
  </group>
);

const Fireworks = () => {
  const points = useMemo(() => {
    const p = [];
    for (let i = 0; i < 20; i++) {
      p.push(new THREE.Vector3(
        (Math.random() - 0.5) * 15,
        5 + Math.random() * 5,
        (Math.random() - 0.5) * 15
      ));
    }
    return p;
  }, []);

  return (
    <group>
      {points.map((pos, i) => (
        <pointLight key={i} position={pos} color={i % 2 === 0 ? "#3b82f6" : "#ef4444"} intensity={10} distance={10} />
      ))}
    </group>
  );
};
