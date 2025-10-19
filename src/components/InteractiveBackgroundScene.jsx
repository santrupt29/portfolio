// components/InteractiveBackgroundScene.jsx
import * as THREE from "three";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Bloom, EffectComposer, ChromaticAberration } from "@react-three/postprocessing";

// Create circle texture
function createCircleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.5, 'rgba(255,255,255,0.5)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = false;
  texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
  
  return texture;
}

// Interactive Icosphere as MESH (more visible)
function InteractiveIcoSphere({ index, position }) {
  const meshRef = useRef();
  const materialRef = useRef();
  const { mouse, viewport } = useThree();
  const offset = index * 0.01;
  let elapsedTime = 0;

  // Base color for this sphere
  const baseColor = useMemo(() => {
    const hue = (index / 35) * 0.8 + 0.1;
    return new THREE.Color().setHSL(hue, 0.8, 0.5);
  }, [index]);

  useFrame((state, deltaTime) => {
    elapsedTime += deltaTime * 0.3;
    
    if (meshRef.current && materialRef.current) {
      // 1. CURSOR TRACKING - Make objects look at cursor
      const cursorX = (mouse.x * viewport.width) / 2;
      const cursorY = (mouse.y * viewport.height) / 2;
      const cursorZ = 5;
      
      // Smooth rotation towards cursor
      const targetRotationX = Math.atan2(cursorY - position[1], cursorZ) * 0.2;
      const targetRotationY = Math.atan2(cursorX - position, cursorZ) * 0.2;
      
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x, 
        targetRotationX + elapsedTime + offset, 
        0.05
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y, 
        targetRotationY + elapsedTime + offset, 
        0.05
      );

      // 2. DYNAMIC SCALING - Zoom based on cursor proximity
      const distance = Math.sqrt(
        Math.pow(cursorX - position[0], 2) + 
        Math.pow(cursorY - position[1], 2)
      );
      const maxDistance = Math.sqrt(Math.pow(viewport.width/2, 2) + Math.pow(viewport.height/2, 2));
      const normalizedDistance = Math.min(distance / maxDistance, 1);
      
      // Closer to cursor = bigger scale (more pronounced)
      const targetScale = 0.8 + (1 - normalizedDistance) * 1.5;
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1));

      // 3. COLOR CHANGES - Based on cursor position
      const hue = (mouse.x + 1) * 0.5 * 0.6 + (index / 35) * 0.3; 
      const saturation = 0.7 + (mouse.y + 1) * 0.15;
      const lightness = 0.4 + (1 - normalizedDistance) * 0.4;
      
      const newColor = new THREE.Color().setHSL(hue, saturation, lightness);
      materialRef.current.color.lerp(newColor, 0.05);

      // 4. EMISSIVE GLOW - Makes them more visible
      const emissiveIntensity = (1 - normalizedDistance) * 0.3;
      materialRef.current.emissive.copy(newColor).multiplyScalar(emissiveIntensity);
    }
  });

  // Create icosphere geometry
  const radius = 0.5 + (index / 35) * 0.8;
  const detail = Math.min(3, 1 + Math.floor(index / 12));

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[radius, detail]} />
      <meshStandardMaterial 
        ref={materialRef}
        color={baseColor}
        emissive={new THREE.Color(0x000000)}
        roughness={0.4}
        metalness={0.6}
        transparent={false} // Make them opaque
      />
    </mesh>
  );
}

// Also add Point Cloud version for more particles
function InteractivePointCloud({ index, position }) {
  const ref = useRef();
  const { mouse, viewport } = useThree();

  useFrame((state, deltaTime) => {
    if (ref.current) {
      const cursorX = (mouse.x * viewport.width) / 4;
      const cursorY = (mouse.y * viewport.height) / 4;
      
      ref.current.rotation.x += deltaTime * 0.2 + mouse.y * 0.01;
      ref.current.rotation.y += deltaTime * 0.15 + mouse.x * 0.01;
      
      // Position response to cursor
      ref.current.position.x = position[0] + Math.sin(state.clock.elapsedTime + index) * 0.5;
      ref.current.position.y = position[1] + Math.cos(state.clock.elapsedTime + index * 0.5) * 0.3;
    }
  });

  const { geometry, colors, sprite } = useMemo(() => {
    const icoGeo = new THREE.IcosahedronGeometry(1.5, 2);
    const colors = [];
    const col = new THREE.Color();
    const icoVerts = icoGeo.attributes.position;
    const p = new THREE.Vector3();

    for (let i = 0; i < icoVerts.count; i += 1) {
      p.fromBufferAttribute(icoVerts, i);
      
      let hue = 0.6 + p.x * 0.2 + (index / 20) * 0.3;
      let lightness = 0.5 + index * 0.02;
      let saturation = 0.8;
      
      const { r, g, b } = col.setHSL(hue, saturation, lightness);
      colors.push(r, g, b);
    }

    return {
      geometry: icoGeo,
      colors: new Float32Array(colors),
      sprite: createCircleTexture()
    };
  }, [index]);

  return (
    <points ref={ref} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={geometry.attributes.position.count}
          array={geometry.attributes.position.array}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={geometry.attributes.position.count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={3} // Made bigger
        map={sprite}
        alphaTest={0.1}
        transparent={true}
        sizeAttenuation={true}
        opacity={0.8} // More opaque
      />
    </points>
  );
}

// Dynamic lighting
function InteractiveLighting() {
  const lightRef = useRef();
  const { mouse } = useThree();

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.x = mouse.x * 10;
      lightRef.current.position.y = mouse.y * 8 + 5;
      
      const hue = (mouse.x + 1) * 0.5;
      lightRef.current.color.setHSL(hue, 0.8, 0.8);
    }
  });

  return (
    <pointLight 
      ref={lightRef}
      intensity={3}
      distance={25}
      decay={2}
    />
  );
}

// Camera controller
function InteractiveCamera() {
  const { camera, mouse } = useThree();

  useFrame(() => {
    const targetX = mouse.x * 3;
    const targetY = mouse.y * 2 + 5;
    
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.02);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// Main scene content
function InteractiveSceneContent() {
  const groupRef = useRef();
  const { mouse } = useThree();

  // Generate visible icospheres in a spiral pattern
  const icospheres = useMemo(() => {
    const spheres = [];
    
    // Main mesh icospheres (most visible)
    for (let i = 0; i < 15; i++) {
      const angle = (i / 15) * Math.PI * 4;
      const radius = (i / 15) * 8 + 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.sin(i * 0.8) * 2;

      spheres.push(
        <InteractiveIcoSphere 
          key={`mesh-${i}`}
          index={i}
          position={[x, y, z]}
        />
      );
    }
    
    // Point cloud icospheres for more particles
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 6;
      const radius = (i / 20) * 12 + 5;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.sin(i * 1.2) * 3;

      spheres.push(
        <InteractivePointCloud 
          key={`points-${i}`}
          index={i}
          position={[x, y, z]}
        />
      );
    }
    
    return spheres;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05 + mouse.x * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1 + mouse.y * 0.05;
    }
  });

  return (
    <>
      <InteractiveCamera />
      <InteractiveLighting />
      
      <group ref={groupRef}>
        {icospheres}
      </group>
    </>
  );
}

// Main component
export default function InteractiveBackgroundScene() {
  return (
    <Canvas
      camera={{ position: [0, 5, 15], fov: 60 }}
      gl={{ 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance"
      }}
      style={{ background: 'transparent' }}
    >
      {/* Strong lighting to make icospheres visible */}
      <ambientLight intensity={0.6} />
      <hemisphereLight args={[0x4080ff, 0xff8040, 1.0]} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1.2} 
        color={0xffffff}
      />
      
      <InteractiveSceneContent />
      
      <Environment preset="sunset" />

      <EffectComposer>
        <Bloom 
          luminanceThreshold={0.1} 
          luminanceSmoothing={0.9} 
          height={400}
          opacity={0.8}
        />
        <ChromaticAberration 
          offset={new THREE.Vector2(0.002, 0.002)} 
        />
      </EffectComposer>
    </Canvas>
  );
}
