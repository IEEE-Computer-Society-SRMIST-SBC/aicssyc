import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FloatingParticles({
  mousePosition,
  isVisible,
}: {
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
  isVisible: boolean;
}) {
  const count = 45;
  const maxLines = 40;
  const meshRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Generate initial random positions, velocity vector
  const { positions, velocities, linePositions } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;

      // Anti-gravity upward drift velocities
      vel[i * 3] = (Math.random() - 0.5) * 0.004;
      vel[i * 3 + 1] = Math.random() * 0.008 + 0.003;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.004;
    }

    const linePos = new Float32Array(maxLines * 6);
    return { positions: pos, velocities: vel, linePositions: linePos };
  }, [count, maxLines]);

  useFrame((_, delta) => {
    if (!isVisible || !meshRef.current) return;

    // Cap delta to prevent large jumps on tab switch
    const clampedDelta = Math.min(delta, 0.033);

    const positionAttr = meshRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const posArray = positionAttr.array as Float32Array;

    const mouseX = mousePosition.current.x * 10;
    const mouseY = mousePosition.current.y * 7;
    const mouseThresholdSq = 4.5 * 4.5;
    const connectThresholdSq = 3.0 * 3.0;

    let lineIndex = 0;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      // Upward float defying gravity
      posArray[iy] += velocities[iy] * clampedDelta * 60;
      posArray[ix] += velocities[ix] * clampedDelta * 60;
      posArray[iz] += velocities[iz] * clampedDelta * 60;

      // Reset when floating out of upper boundary
      if (posArray[iy] > 8) {
        posArray[iy] = -8;
        posArray[ix] = (Math.random() - 0.5) * 20;
      }

      // Mouse Parallax & Repel effect (squared distance check)
      const dx = posArray[ix] - mouseX;
      const dy = posArray[iy] - mouseY;
      const distSq = dx * dx + dy * dy;

      if (distSq < mouseThresholdSq && distSq > 0.01) {
        const dist = Math.sqrt(distSq);
        const force = (4.5 - dist) * 0.02;
        posArray[ix] += (dx / dist) * force;
        posArray[iy] += (dy / dist) * force;
      }

      // Connect nearby particles for constellation effect
      if (lineIndex < maxLines) {
        for (let j = i + 1; j < count; j++) {
          const jx = j * 3;
          const jy = j * 3 + 1;
          const jz = j * 3 + 2;

          const pdx = posArray[ix] - posArray[jx];
          const pdy = posArray[iy] - posArray[jy];
          const pdz = posArray[iz] - posArray[jz];
          const pDistSq = pdx * pdx + pdy * pdy + pdz * pdz;

          if (pDistSq < connectThresholdSq) {
            const offset = lineIndex * 6;
            linePositions[offset] = posArray[ix];
            linePositions[offset + 1] = posArray[iy];
            linePositions[offset + 2] = posArray[iz];

            linePositions[offset + 3] = posArray[jx];
            linePositions[offset + 4] = posArray[jy];
            linePositions[offset + 5] = posArray[jz];

            lineIndex++;
            if (lineIndex >= maxLines) break;
          }
        }
      }
    }

    positionAttr.needsUpdate = true;

    if (linesRef.current) {
      linesRef.current.geometry.setDrawRange(0, lineIndex * 2);
      const lineAttr = linesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      lineAttr.needsUpdate = true;
    }

    // Slow atmospheric rotation
    meshRef.current.rotation.y += clampedDelta * 0.015;
    if (linesRef.current) {
      linesRef.current.rotation.y += clampedDelta * 0.015;
    }
  });

  return (
    <group>
      {/* Particle Constellation Points */}
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.13}
          color="#E2B767"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Constellation Connecting Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color="#10b981"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

function FloatingNodes({ isVisible }: { isVisible: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!isVisible || !groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.04;
    groupRef.current.position.y = Math.sin(t * 0.4) * 0.3;
  });

  return (
    <group ref={groupRef}>
      {/* Central Anti-Gravity Core Sphere */}
      <mesh position={[4, 1.5, -2]}>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshStandardMaterial
          color="#eab308"
          wireframe
          transparent
          opacity={0.25}
          emissive="#eab308"
          emissiveIntensity={0.25}
        />
      </mesh>

      <mesh position={[-3.2, -1.8, -4]}>
        <octahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial
          color="#10b981"
          wireframe
          transparent
          opacity={0.16}
          emissive="#10b981"
          emissiveIntensity={0.12}
        />
      </mesh>
    </group>
  );
}

export function HeroCanvas3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Only animate when Hero is visible in the viewport
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          mousePosition.current = {
            x: (e.clientX / window.innerWidth) * 2 - 1,
            y: -(e.clientY / window.innerHeight) * 2 + 1,
          };
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 60 }}
        dpr={[1, 1.25]}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "high-performance",
          depth: true,
          stencil: false,
        }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#eab308" />
        <pointLight position={[-10, -10, -10]} intensity={0.6} color="#10b981" />

        <FloatingParticles mousePosition={mousePosition} isVisible={isVisible} />
        <FloatingNodes isVisible={isVisible} />
      </Canvas>
    </div>
  );
}
