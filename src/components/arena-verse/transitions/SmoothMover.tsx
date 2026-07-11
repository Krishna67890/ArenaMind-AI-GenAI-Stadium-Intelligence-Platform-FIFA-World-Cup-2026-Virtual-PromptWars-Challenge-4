"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SmoothMoverProps {
  points: [number, number, number][];
  active: boolean;
  onComplete?: () => void;
  speed?: number;
}

export const SmoothMover: React.FC<SmoothMoverProps> = ({
  points,
  active,
  onComplete,
  speed = 0.005
}) => {
  const curve = useMemo(() => {
    if (points.length < 2) return null;
    const vectors = points.map(p => new THREE.Vector3(...p));
    return new THREE.CatmullRomCurve3(vectors);
  }, [points]);

  const progress = useRef(0);

  useFrame((state) => {
    if (!active || !curve) return;

    progress.current += speed;

    if (progress.current >= 1) {
      progress.current = 1;
      if (onComplete) onComplete();
    }

    const point = curve.getPointAt(progress.current);
    const tangent = curve.getTangentAt(progress.current);

    state.camera.position.lerp(point, 0.1);

    const lookAtPos = point.clone().add(tangent);
    state.camera.lookAt(lookAtPos);
  });

  useEffect(() => {
    if (!active) progress.current = 0;
  }, [active]);

  return null;
};
