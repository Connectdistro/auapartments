import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COUNT = 700;

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const colorA = new THREE.Color('#c8a15a');
    const colorB = new THREE.Color('#3e6b96');

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;

      const mixed = colorA.clone().lerp(colorB, Math.random());
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    return { positions, colors };
  }, []);

  useFrame((state, delta) => {
    const points = pointsRef.current;
    if (!points) return;
    points.rotation.y += delta * 0.025;
    points.rotation.x = Math.sin(state.clock.elapsedTime * 0.06) * 0.12;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors sizeAttenuation transparent opacity={0.85} depthWrite={false} />
    </points>
  );
}

function canRunLiveBackground(): boolean {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

/**
 * A lightweight WebGL particle field behind the hero. Skipped in favour of
 * a static CSS gradient on touch devices (battery/perf) and whenever the
 * visitor prefers reduced motion.
 */
export default function WebGLBackground() {
  const live = useMemo(() => canRunLiveBackground(), []);

  if (!live) {
    return <div className="hero-bg hero-bg-static" aria-hidden="true" />;
  }

  return (
    <Canvas className="hero-bg" camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]} aria-hidden="true">
      <ParticleField />
    </Canvas>
  );
}
