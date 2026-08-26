import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const WALL_DARK = '#28332c';
const WALL_MID = '#3f5744';
const WALL_LIGHT = '#5c7a63';
const EDGE_COLOR = '#a9c4ad';
const ROOF_COLOR = '#20281f';
const TIMBER_ROOF_COLOR = '#4a352a';
const WINDOW_DIM = '#2f3b33';
const WINDOW_LIT = '#cfe6d4';
const PORCH_DIM = '#4a3a26';
const PORCH_LIT = '#f2c98a';

/** A flat-shaded box with a bright edge outline — the basic wall unit every
 * building below is assembled from. */
function EdgedBox({
  size,
  position,
  rotation,
  color,
  opacity = 0.55,
}: {
  size: [number, number, number];
  position: [number, number, number];
  rotation?: [number, number, number];
  color: string;
  opacity?: number;
}) {
  const geometry = useMemo(() => new THREE.BoxGeometry(...size), size);
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  return (
    <group position={position} rotation={rotation ?? [0, 0, 0]}>
      <mesh geometry={geometry}>
        <meshBasicMaterial color={color} transparent opacity={opacity} depthWrite={false} />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={EDGE_COLOR} transparent opacity={0.5} />
      </lineSegments>
    </group>
  );
}

/** A 4-sided cone standing in for a simple pitched/hip roof. */
function EdgedRoof({
  radius,
  height,
  position,
  color = ROOF_COLOR,
  opacity = 0.6,
}: {
  radius: number;
  height: number;
  position: [number, number, number];
  color?: string;
  opacity?: number;
}) {
  const geometry = useMemo(() => new THREE.ConeGeometry(radius, height, 4), [radius, height]);
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  return (
    <group position={position} rotation={[0, Math.PI / 4, 0]}>
      <mesh geometry={geometry}>
        <meshBasicMaterial color={color} transparent opacity={opacity} depthWrite={false} />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={EDGE_COLOR} transparent opacity={0.35} />
      </lineSegments>
    </group>
  );
}

/** A thin cylinder — a veranda post, stump, or chimney. */
function Post({
  radius,
  height,
  position,
  color = ROOF_COLOR,
  opacity = 0.55,
}: {
  radius: number;
  height: number;
  position: [number, number, number];
  color?: string;
  opacity?: number;
}) {
  const geometry = useMemo(() => new THREE.CylinderGeometry(radius, radius, height, 8), [radius, height]);
  return (
    <mesh geometry={geometry} position={position}>
      <meshBasicMaterial color={color} transparent opacity={opacity} depthWrite={false} />
    </mesh>
  );
}

/** An evenly spaced grid of window positions on a building's front face. */
function windowGrid(
  cols: number,
  rows: number,
  width: number,
  height: number,
  centerX: number,
  baseY: number,
  z: number,
): Float32Array {
  const positions = new Float32Array(cols * rows * 3);
  const marginX = width * 0.14;
  const marginY = height * 0.12;
  const usableW = width - marginX * 2;
  const usableH = height - marginY * 2;
  let idx = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      positions[idx++] = centerX - usableW / 2 + (c + 0.5) * (usableW / cols);
      positions[idx++] = baseY + marginY + (r + 0.5) * (usableH / rows);
      positions[idx++] = z;
    }
  }
  return positions;
}

/** Window "lights" — a points cloud that independently twinkles between a
 * dim and lit color per window, like people coming and going at dusk. */
function WindowLights({ positions, warm = false, size = 0.055 }: { positions: Float32Array; warm?: boolean; size?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = positions.length / 3;

  const colors = useMemo(() => new Float32Array(count * 3), [count]);
  const speeds = useMemo(() => Array.from({ length: count }, () => 0.35 + Math.random() * 1.0), [count]);
  const phases = useMemo(() => Array.from({ length: count }, () => Math.random() * Math.PI * 2), [count]);
  const dim = useMemo(() => new THREE.Color(warm ? PORCH_DIM : WINDOW_DIM), [warm]);
  const lit = useMemo(() => new THREE.Color(warm ? PORCH_LIT : WINDOW_LIT), [warm]);
  const tmp = useMemo(() => new THREE.Color(), []);

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points) return;
    const colorAttr = points.geometry.attributes.color as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      const brightness = 0.5 + 0.5 * Math.sin(state.clock.elapsedTime * speeds[i] + phases[i]);
      tmp.copy(dim).lerp(lit, brightness);
      colorAttr.setXYZ(i, tmp.r, tmp.g, tmp.b);
    }
    colorAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={size} vertexColors sizeAttenuation transparent opacity={0.95} depthWrite={false} />
    </points>
  );
}

/** A modern glass high-rise apartment tower, slowly orbiting — the flagship
 * Home hero's background. */
function TowerField() {
  const groupRef = useRef<THREE.Group>(null);
  const windows = useMemo(() => windowGrid(5, 13, 1.3, 5.3, 0, -3.35, 0.58), []);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (group) group.rotation.y += delta * 0.03;
  });

  return (
    <group ref={groupRef}>
      <EdgedBox size={[1.6, 6.2, 1.1]} position={[0, -0.25, 0]} color={WALL_LIGHT} opacity={0.68} />
      <EdgedBox size={[0.7, 0.5, 0.5]} position={[0, 3.1, 0]} color={WALL_DARK} opacity={0.7} />
      <WindowLights positions={windows} />
    </group>
  );
}

/** A symmetrical stepped Art Deco apartment block, evoking the heritage
 * blocks common across inner Sydney/Melbourne — the Contact hero. */
function HeritageField() {
  const groupRef = useRef<THREE.Group>(null);
  const windows = useMemo(() => {
    const tier1 = windowGrid(8, 3, 3.0, 1.9, 0, -2.55, 0.62);
    const tier2 = windowGrid(6, 2, 2.1, 1.3, 0, -0.65, 0.52);
    const tier3 = windowGrid(4, 1, 1.2, 0.6, 0, 0.95, 0.42);
    const merged = new Float32Array(tier1.length + tier2.length + tier3.length);
    merged.set(tier1, 0);
    merged.set(tier2, tier1.length);
    merged.set(tier3, tier1.length + tier2.length);
    return merged;
  }, []);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (group) group.rotation.y += delta * 0.018;
  });

  return (
    <group ref={groupRef}>
      <EdgedBox size={[3.4, 2.4, 1.2]} position={[0, -2.0, 0]} color={WALL_MID} />
      <EdgedBox size={[2.4, 1.6, 1.0]} position={[0, 0.0, 0]} color={WALL_LIGHT} opacity={0.5} />
      <EdgedBox size={[1.5, 1.0, 0.8]} position={[0, 1.3, 0]} color={WALL_MID} />
      <EdgedBox size={[0.3, 0.5, 0.3]} position={[0, 2.05, 0]} color={WALL_DARK} />
      <WindowLights positions={windows} />
    </group>
  );
}

const TERRACE_X = [-2.3, 0, 2.3];

/** A row of attached Victorian-style terrace houses — pitched roofs,
 * chimneys, and veranda posts — the Explore/Locations hero. */
function TerraceField() {
  const groupRef = useRef<THREE.Group>(null);
  const windows = useMemo(() => {
    const grids = TERRACE_X.map((x) => windowGrid(2, 2, 1.1, 1.3, x, -2.55, 0.68));
    const total = grids.reduce((sum, g) => sum + g.length, 0);
    const merged = new Float32Array(total);
    let offset = 0;
    grids.forEach((g) => {
      merged.set(g, offset);
      offset += g.length;
    });
    return merged;
  }, []);

  useFrame((state) => {
    const group = groupRef.current;
    if (group) group.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.12;
  });

  return (
    <group ref={groupRef}>
      {TERRACE_X.map((x) => (
        <group key={x}>
          <EdgedBox size={[1.8, 2.2, 1.3]} position={[x, -2.2, 0]} color={WALL_MID} />
          <EdgedRoof radius={1.3} height={0.9} position={[x, -0.65, 0]} />
          <Post radius={0.05} height={0.5} position={[x + 0.55, -0.2, 0.35]} />
          <EdgedBox size={[1.9, 0.06, 0.6]} position={[x, -3.05, 0.75]} color={WALL_DARK} opacity={0.5} />
          <Post radius={0.03} height={0.85} position={[x - 0.75, -2.62, 0.95]} />
          <Post radius={0.03} height={0.85} position={[x + 0.75, -2.62, 0.95]} />
        </group>
      ))}
      <WindowLights positions={windows} />
    </group>
  );
}

const TOWER_CLUSTER = [
  { x: -3.2, height: 3.0, z: -0.3 },
  { x: -1.6, height: 4.6, z: 0.2 },
  { x: 0, height: 5.8, z: -0.1 },
  { x: 1.6, height: 3.8, z: 0.3 },
  { x: 3.2, height: 4.9, z: -0.2 },
];

/** A small cluster of apartment towers at varying heights, like a CBD
 * short-stay skyline — the Stays/Apartments hero. */
function SkylineTowersField() {
  const groupRef = useRef<THREE.Group>(null);
  const windows = useMemo(() => {
    const grids = TOWER_CLUSTER.map(({ x, height, z }) => {
      const rows = Math.max(4, Math.round(height * 2.2));
      const baseY = -3.6;
      return windowGrid(3, rows, 0.8, height - 0.4, x, baseY + 0.2, z + 0.46);
    });
    const total = grids.reduce((sum, g) => sum + g.length, 0);
    const merged = new Float32Array(total);
    let offset = 0;
    grids.forEach((g) => {
      merged.set(g, offset);
      offset += g.length;
    });
    return merged;
  }, []);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (group) group.rotation.y += delta * 0.015;
  });

  return (
    <group ref={groupRef}>
      {TOWER_CLUSTER.map(({ x, height, z }) => (
        <EdgedBox
          key={x}
          size={[1.0, height, 0.9]}
          position={[x, -3.6 + height / 2, z]}
          color={WALL_MID}
          opacity={0.5}
        />
      ))}
      <WindowLights positions={windows} />
    </group>
  );
}

/** A classic elevated Queenslander — timber house on stumps, wraparound
 * veranda, a warm pulsing porch light — the Become-a-Host hero (this is
 * your own home, ready to welcome guests). */
function QueenslanderField() {
  const groupRef = useRef<THREE.Group>(null);
  const porchRef = useRef<THREE.Points>(null);
  const windows = useMemo(() => windowGrid(4, 1, 2.4, 0.8, 0, -1.85, 0.83), []);
  const porchPosition = useMemo(() => new Float32Array([0.95, -1.75, 0.86]), []);
  const porchDim = useMemo(() => new THREE.Color(PORCH_DIM), []);
  const porchLit = useMemo(() => new THREE.Color(PORCH_LIT), []);
  const porchTmp = useMemo(() => new THREE.Color(), []);

  useFrame((state) => {
    const group = groupRef.current;
    if (group) group.rotation.y = Math.sin(state.clock.elapsedTime * 0.06) * 0.1;

    const porch = porchRef.current;
    if (porch) {
      const glow = 0.55 + 0.45 * Math.sin(state.clock.elapsedTime * 0.9);
      const colorAttr = porch.geometry.attributes.color as THREE.BufferAttribute;
      porchTmp.copy(porchDim).lerp(porchLit, glow);
      colorAttr.setXYZ(0, porchTmp.r, porchTmp.g, porchTmp.b);
      colorAttr.needsUpdate = true;
      const material = porch.material as THREE.PointsMaterial;
      material.size = 0.09 + glow * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <Post radius={0.06} height={0.8} position={[-1.3, -3.2, -0.6]} />
      <Post radius={0.06} height={0.8} position={[1.3, -3.2, -0.6]} />
      <Post radius={0.06} height={0.8} position={[-1.3, -3.2, 0.6]} />
      <Post radius={0.06} height={0.8} position={[1.3, -3.2, 0.6]} />

      <EdgedBox size={[3.0, 1.4, 1.6]} position={[0, -2.05, 0]} color={WALL_LIGHT} opacity={0.55} />
      <EdgedRoof radius={2.0} height={1.0} position={[0, -0.85, 0]} color={TIMBER_ROOF_COLOR} />

      <EdgedBox size={[3.2, 0.08, 0.8]} position={[0, -2.65, 1.0]} color={WALL_DARK} opacity={0.5} />
      <Post radius={0.035} height={1.1} position={[-1.4, -2.05, 1.35]} />
      <Post radius={0.035} height={1.1} position={[0, -2.05, 1.35]} />
      <Post radius={0.035} height={1.1} position={[1.4, -2.05, 1.35]} />
      <EdgedBox size={[3.2, 0.06, 0.9]} position={[0, -1.5, 1.0]} color={TIMBER_ROOF_COLOR} opacity={0.55} />

      <WindowLights positions={windows} />
      <points ref={porchRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[porchPosition, 3]} />
          <bufferAttribute attach="attributes-color" args={[new Float32Array(3), 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.1} vertexColors transparent opacity={0.95} depthWrite={false} />
      </points>
    </group>
  );
}

function canRunLiveBackground(): boolean {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

interface WebGLBackgroundProps {
  /** Each variant is a different animated, Australian-style apartment
   * building behind the hero: 'particles' (default, Home) is a modern glass
   * tower. 'network' (Contact) is a stepped Art Deco heritage block.
   * 'routes' (Explore) is a row of Victorian terraces. 'skyline' (Stays) is
   * a cluster of short-stay towers. 'bloom' (Become a Host) is an elevated
   * Queenslander with a pulsing porch light. */
  variant?: 'particles' | 'network' | 'routes' | 'skyline' | 'bloom';
}

/**
 * A lightweight WebGL scene behind the hero. Skipped in favour of a static
 * CSS gradient on touch devices (battery/perf) and whenever the visitor
 * prefers reduced motion.
 */
export default function WebGLBackground({ variant = 'particles' }: WebGLBackgroundProps) {
  const live = useMemo(() => canRunLiveBackground(), []);

  if (!live) {
    return <div className="hero-bg hero-bg-static" aria-hidden="true" />;
  }

  return (
    <Canvas className="hero-bg" camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]} aria-hidden="true">
      {variant === 'network' ? <HeritageField /> : null}
      {variant === 'routes' ? <TerraceField /> : null}
      {variant === 'skyline' ? <SkylineTowersField /> : null}
      {variant === 'bloom' ? <QueenslanderField /> : null}
      {variant === 'particles' ? <TowerField /> : null}
    </Canvas>
  );
}
