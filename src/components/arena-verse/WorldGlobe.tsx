"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Trail, Float, Line, Text, Html } from "@react-three/drei";
import * as THREE from "three";

interface HostCity {
  name: string;
  pos: [number, number];
  color: string;
  stadium: string;
  traffic: string;
  altitude: number;
  vector: THREE.Vector3;
  embedId?: string;
}

const hostCities: Omit<HostCity, "vector">[] = [
  { name: "Bologna", pos: [44.4949, 11.3426], color: "#3b82f6", stadium: "Stadio Renato Dall'Ara", traffic: "Optimal", altitude: 0.2, embedId: "292c41506f32403a943836c78d357d1b" },
  { name: "Saransk", pos: [54.1838, 45.1749], color: "#ef4444", stadium: "Stadium Mordovia", traffic: "Moderate", altitude: 0.15, embedId: "54a73d5582c947d1b4942fc38ed1d7c9" },
  { name: "London", pos: [51.5074, -0.1278], color: "#10b981", stadium: "Euro Arena", traffic: "High", altitude: 0.2, embedId: "282713cea55a4289a946ada0dd3d0cd9" },
  { name: "Doha", pos: [25.2854, 51.5310], color: "#fbbf24", stadium: "Khalifa Intl", traffic: "Low", altitude: 0.25, embedId: "1944f9b033f24ea68b90e82e173e0c66" },
  { name: "Los Angeles", pos: [34.0522, -118.2437], color: "#8b5cf6", stadium: "SoFi", traffic: "High", altitude: 0.25 },
  { name: "Toronto", pos: [43.6532, -79.3832], color: "#10b981", stadium: "BMO Field", traffic: "Low", altitude: 0.2 },
  { name: "Vancouver", pos: [49.2827, -123.1207], color: "#f59e0b", stadium: "BC Place", traffic: "Moderate", altitude: 0.1 },
];

const latLongToVector3 = (lat: number, lon: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
};

const CityLabel = ({ vector, name, stadium }: { vector: THREE.Vector3, name: string, stadium?: string }) => {
  const labelPos = useMemo(() => vector.clone().multiplyScalar(1.1), [vector]);
  return (
    <group position={labelPos}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Text
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {name}
        </Text>
        {stadium && (
          <Text
            position={[0, -0.2, 0]}
            fontSize={0.08}
            color="#3b82f6"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Inter-Bold.ttf"
          >
            {stadium}
          </Text>
        )}
      </Float>
    </group>
  );
};

export const WorldGlobe = ({ activeRoute, onCitySelect }: { activeRoute?: string[], onCitySelect?: (city: HostCity) => void }) => {
  const globeRef = useRef<THREE.Group>(null);
  const [hoveredCity, setHoveredCity] = React.useState<string | null>(null);
  const radius = 5;

  useFrame((state) => {
    if (globeRef.current && !activeRoute) {
      globeRef.current.rotation.y += 0.001;
    }
  });

  const cityPoints = useMemo<HostCity[]>(() =>
    hostCities.map(city => ({
      ...city,
      pos: [city.pos[0], city.pos[1]] as [number, number],
      vector: latLongToVector3(city.pos[0], city.pos[1], radius)
    }))
  , [radius]);

  const routePoints = useMemo(() => {
    if (!activeRoute || activeRoute.length < 2) return [];
    const points: THREE.Vector3[] = [];
    activeRoute.forEach(cityName => {
      const city = cityPoints.find(c => c.name === cityName);
      if (city) points.push(city.vector);
    });
    return points;
  }, [activeRoute, cityPoints]);

  return (
    <group ref={globeRef}>
      {/* Photorealistic Cloud/Atmosphere Layer */}
      <Sphere args={[radius * 1.05, 64, 64]}>
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.05}
          depthWrite={false}
        />
      </Sphere>

      {/* Earth Surface - High Fidelity Dark Mode / Holographic Grid */}
      <Sphere args={[radius, 64, 64]}>
        <meshStandardMaterial
          color="#0a0a0a"
          emissive="#1e3a8a"
          emissiveIntensity={4}
          roughness={0.1}
          metalness={1}
          wireframe={false}
        />
      </Sphere>

      {/* Grid Overlay for visibility */}
      <Sphere args={[radius * 1.01, 32, 32]}>
        <meshBasicMaterial
          color="#60a5fa"
          wireframe
          transparent
          opacity={0.2}
        />
      </Sphere>

      {/* Host Cities */}
      {cityPoints.map((city, i) => (
        <group key={i}>
          <mesh
            position={city.vector}
            onPointerOver={() => setHoveredCity(city.name)}
            onPointerOut={() => setHoveredCity(null)}
            onClick={() => onCitySelect && onCitySelect(city)}
            role="button"
            aria-label={`Select ${city.name} stadium`}
          >
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color={hoveredCity === city.name ? "#ffffff" : city.color} />
          </mesh>
          <pointLight position={city.vector} color={city.color} intensity={hoveredCity === city.name ? 2 : 1} distance={3} />

          <CityLabel vector={city.vector} name={city.name} stadium={city.stadium} />

          {hoveredCity === city.name && (
            <Html position={city.vector.clone().multiplyScalar(1.2)}>
              <div className="bg-black/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl w-48 shadow-2xl pointer-events-none">
                 <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">City Node 3D</p>
                 <h4 className="text-sm font-black italic uppercase mb-2">{city.name}</h4>
                 <div className="space-y-1">
                    <div className="flex justify-between text-[8px] uppercase font-bold text-white/40">
                       <span>Traffic</span>
                       <span className={city.traffic === 'Critical' ? 'text-red-500' : 'text-green-500'}>{city.traffic}</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-blue-500" style={{ width: city.traffic === 'High' ? '80%' : '40%' }} />
                    </div>
                    <div className="text-[8px] text-white/60 mt-2 font-medium">Click to synchronize stadium view.</div>
                 </div>
              </div>
            </Html>
          )}

          {/* Neural Connection Lines */}
          {i < cityPoints.length - 1 && !activeRoute && (
            <Line
              points={[city.vector, cityPoints[i+1].vector]}
              color="#3b82f6"
              lineWidth={0.2}
              transparent
              opacity={0.15}
            />
          )}
        </group>
      ))}

      {/* Active Detected Route */}
      {routePoints.length > 1 && (
        <group>
          {/* Main Neural Path */}
          <Line
            points={routePoints}
            color="#ef4444"
            lineWidth={3}
            transparent
            opacity={0.8}
          />
          {/* Secondary Glow Path */}
          <Line
            points={routePoints}
            color="#ef4444"
            lineWidth={8}
            transparent
            opacity={0.2}
          />
          {routePoints.map((p, i) => (
            <mesh key={i} position={p}>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshBasicMaterial color="#ef4444" />
              <pointLight color="#ef4444" intensity={2} distance={2} />
            </mesh>
          ))}
          <Trail width={3} length={12} color="#ef4444" attenuation={(t) => t * t}>
             <RoutePulse points={routePoints} />
          </Trail>
        </group>
      )}

      {/* Satellites */}
      {[...Array(12)].map((_, i) => (
        <Satellite key={i} index={i} radius={radius} />
      ))}
    </group>
  );
};


const RoutePulse = ({ points }: { points: THREE.Vector3[] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);

  useFrame((state) => {
    if (meshRef.current) {
      const t = (state.clock.getElapsedTime() * 0.2) % 1;
      const pos = curve.getPoint(t);
      meshRef.current.position.copy(pos);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color="#ff0000" />
    </mesh>
  );
};

const Satellite = ({ index, radius }: { index: number, radius: number }) => {
  const satRef = useRef<THREE.Mesh>(null);
  const orbitRadius = radius * (1.2 + Math.random() * 0.3);
  const speed = 0.5 + Math.random() * 0.5;
  const offset = index * (Math.PI / 4);

  useFrame((state) => {
    if (satRef.current) {
      const time = state.clock.getElapsedTime() * speed + offset;
      satRef.current.position.set(
        Math.cos(time) * orbitRadius,
        Math.sin(time * 0.5) * orbitRadius * 0.5,
        Math.sin(time) * orbitRadius
      );
    }
  });

  return (
    <Trail width={0.5} length={5} color="#60a5fa" attenuation={(t) => t * t}>
      <mesh ref={satRef}>
        <boxGeometry args={[0.05, 0.05, 0.05]} />
        <meshBasicMaterial color="#60a5fa" />
      </mesh>
    </Trail>
  );
};
