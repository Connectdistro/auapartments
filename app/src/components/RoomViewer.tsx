import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Bounds, useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';

type LightMode = 'day' | 'night';

interface RoomOption {
  id: string;
  label: string;
  url: string;
}

const ROOMS: RoomOption[] = [
  { id: 'mini-loft', label: 'Mini Loft', url: '/models/mini-loft.glb' },
  { id: 'living-room', label: 'Living Room', url: '/models/living-room-loft.glb' },
];

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

function LoadingFallback() {
  return (
    <Html center>
      <div className="room-viewer-loading-pill">Loading room…</div>
    </Html>
  );
}

export default function RoomViewer() {
  const [mode, setMode] = useState<LightMode>('day');
  const [roomId, setRoomId] = useState(ROOMS[0].id);
  const room = ROOMS.find((r) => r.id === roomId) ?? ROOMS[0];

  return (
    <div className="room-viewer">
      <Canvas className="room-viewer-canvas" dpr={[1, 1.5]} shadows={false}>
        <PerspectiveCamera makeDefault position={[4, 3, 5]} fov={45} />
        <color attach="background" args={[mode === 'day' ? '#f5f3ee' : '#141a1f']} />
        <ambientLight intensity={mode === 'day' ? 0.9 : 0.25} color={mode === 'day' ? '#ffffff' : '#4a5a6a'} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={mode === 'day' ? 1.4 : 0.3}
          color={mode === 'day' ? '#fff6e6' : '#5a7fa8'}
        />
        {mode === 'night' ? (
          <pointLight position={[0, 2.2, 0]} intensity={1.2} color="#ffb870" distance={7} />
        ) : null}

        <Suspense fallback={<LoadingFallback />}>
          <Bounds key={room.id} fit clip observe margin={1.3}>
            <Model url={room.url} />
          </Bounds>
        </Suspense>

        <OrbitControls
          makeDefault
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          minDistance={1}
          maxDistance={25}
        />
      </Canvas>

      <div className="room-viewer-hint" aria-hidden="true">
        ← Drag to look around
      </div>

      <div className="room-viewer-controls">
        <button
          type="button"
          className={`room-mode-btn${mode === 'day' ? ' is-active' : ''}`}
          onClick={() => setMode('day')}
        >
          Day
        </button>
        <button
          type="button"
          className={`room-mode-btn${mode === 'night' ? ' is-active' : ''}`}
          onClick={() => setMode('night')}
        >
          Night
        </button>
      </div>

      <div className="room-viewer-rooms">
        {ROOMS.map((r) => (
          <button
            key={r.id}
            type="button"
            className={`room-select-btn${roomId === r.id ? ' is-active' : ''}`}
            onClick={() => setRoomId(r.id)}
          >
            {r.label}
          </button>
        ))}
      </div>
    </div>
  );
}

ROOMS.forEach((r) => useGLTF.preload(r.url));

// Keep three's color-management defaults explicit for consistent renders across browsers.
THREE.ColorManagement.enabled = true;
