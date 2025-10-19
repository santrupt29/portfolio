// components/IcoSphereScene.jsx
import * as THREE from "three";
import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, Text3D, Center } from "@react-three/drei";
import { Bloom, EffectComposer, ChromaticAberration } from "@react-three/postprocessing";

// Create circle texture (keeping original)
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

// Meaningful shapes for a creative developer
function CreativeShape({ index, position, shapeType = 'icosphere' }) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const { mouse, viewport } = useThree();
  const offset = index * 0.01;
  let elapsedTime = 0;

  // Store original position for spreading effect
  const originalPosition = useMemo(() => new THREE.Vector3(...position), [position]);

  useFrame((state, deltaTime) => {
    elapsedTime += deltaTime * 0.2;
    
    if (ref.current) {
      // Calculate cursor influence for spreading effect
      const cursorWorld = new THREE.Vector3(
        (mouse.x * viewport.width) / 2,
        (mouse.y * viewport.height) / 2,
        0
      );
      
      const distance = ref.current.position.distanceTo(cursorWorld);
      const influenceRadius = 8;
      const influence = Math.max(0, 1 - distance / influenceRadius);
      
      // SPREADING EFFECT - push away from cursor
      let targetPosition = originalPosition.clone();
      if (influence > 0 || hovered) {
        const pushDirection = ref.current.position.clone().sub(cursorWorld).normalize();
        const pushStrength = (influence * 2) + (hovered ? 3 : 0);
        targetPosition.add(pushDirection.multiplyScalar(pushStrength));
      }
      
      // Smooth movement
      ref.current.position.lerp(targetPosition, 0.1);
      
      // Original rotation (keeping it beautiful)
      ref.current.rotation.x = elapsedTime + offset;
      ref.current.rotation.y = elapsedTime + offset;
      ref.current.rotation.z = elapsedTime * 0.5 + offset;
      
      // HOVER SCALING - grow when hovered
      const targetScale = hovered ? 1.8 : 1 + influence * 0.5;
      ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);
    }
  });

  const { geometry, colors, sprite } = useMemo(() => {
    let geo;
    
    switch (shapeType) {
      case 'code_bracket':
        // Create a bracket-like shape using extrude geometry
        const bracketShape = new THREE.Shape();
        bracketShape.moveTo(0, -1);
        bracketShape.lineTo(-0.3, -1);
        bracketShape.lineTo(-0.3, -0.8);
        bracketShape.lineTo(-0.1, -0.8);
        bracketShape.lineTo(-0.1, 0.8);
        bracketShape.lineTo(-0.3, 0.8);
        bracketShape.lineTo(-0.3, 1);
        bracketShape.lineTo(0, 1);
        geo = new THREE.ExtrudeGeometry(bracketShape, { depth: 0.2, bevelEnabled: false });
        break;
        
      case 'lightbulb':
        // Creative lightbulb shape using sphere and cylinder
        geo = new THREE.SphereGeometry(1, 16, 16);
        break;
        
      case 'laptop':
        // Simple laptop representation
        geo = new THREE.BoxGeometry(2, 0.1, 1.5);
        break;
        
      case 'diamond':
        // Diamond/crystal shape
        geo = new THREE.OctahedronGeometry(1, 0);
        break;
        
      case 'star':
        // Create a star shape
        const starShape = new THREE.Shape();
        const outerRadius = 1;
        const innerRadius = 0.5;
        const spikes = 5;
        for (let i = 0; i < spikes * 2; i++) {
          const angle = (i * Math.PI) / spikes;
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          if (i === 0) starShape.moveTo(x, y);
          else starShape.lineTo(x, y);
        }
        starShape.closePath();
        geo = new THREE.ExtrudeGeometry(starShape, { depth: 0.2, bevelEnabled: true, bevelSize: 0.1 });
        break;
        
      default:
        // Original icosphere (keeping it beautiful)
        geo = new THREE.IcosahedronGeometry(2, 4);
    }

    // Original color generation (keeping the beautiful colors)
    const colors = [];
    const col = new THREE.Color();
    const verts = geo.attributes.position;
    const p = new THREE.Vector3();

    for (let i = 0; i < verts.count; i += 1) {
      p.fromBufferAttribute(verts, i);
      let hue = 0.3 + p.x * 0.15;
      let lightness = Math.max(0.1, index * 0.015);
      let saturation = 0.8 + Math.sin(p.y * 2) * 0.2;
      
      const { r, g, b } = col.setHSL(hue, saturation, lightness);
      colors.push(r, g, b);
    }

    return {
      geometry: geo,
      colors: new Float32Array(colors),
      sprite: createCircleTexture()
    };
  }, [index, shapeType]);

  const pointSize = Math.max(0.1, index * 0.0015);

  return (
    <points 
      ref={ref}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'default';
      }}
    >
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
        size={hovered ? pointSize * 3 : pointSize} // GLOW EFFECT - bigger points when hovered
        map={sprite}
        alphaTest={0.5}
        transparent={true}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
        opacity={hovered ? 1.0 : 0.8} // Brighter when hovered
      />
    </points>
  );
}

// Points Group with meaningful shapes
function PointsGroup({ 
  count = 40, 
  spread = 10,
  ...pointsProps 
}) {
  const groupRef = useRef();

  // Gentle group rotation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.05) * 0.05;
    }
  });

  const shapes = useMemo(() => {
    const shapeTypes = [
      'icosphere',      // Beautiful original
      'code_bracket',   // Represents coding
      'lightbulb',      // Represents creativity/ideas
      'diamond',        // Represents quality/precision
      'star',          // Represents excellence/achievement
      'laptop'         // Represents technology
    ];

    return Array.from({ length: count }, (_, i) => {
      // Create varied positioning
      const angle = (i / count) * Math.PI * 2;
      const radius = (i / count) * spread;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.sin(i * 0.5) * 2;

      // Assign shape types in a pattern
      const shapeType = shapeTypes[i % shapeTypes.length];

      return (
        <CreativeShape 
          key={i}
          index={i}
          position={[x, y, z]}
          shapeType={shapeType}
          {...pointsProps}
        />
      );
    });
  }, [count, spread, pointsProps]);

  return <group ref={groupRef}>{shapes}</group>;
}

// Camera Controller (keeping original)
function CameraController() {
  useFrame((state) => {
    const { camera, mouse } = state;
    camera.position.x += (mouse.x * 2 - camera.position.x) * 0.01;
    camera.position.y += (-mouse.y * 2 - camera.position.y) * 0.01;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// Main Scene Component (keeping original beautiful setup)
function IcoSphereScene({ 
  enableOrbitControls = true,
  enablePostProcessing = true,
  backgroundColor = "#000010",
  sphereCount = 40,
  ...sceneProps 
}) {
  return (
    <Canvas
      gl={{ 
        toneMapping: THREE.NoToneMapping,
        antialias: true,
        alpha: true
      }}
      camera={{ 
        position: [0, 5, 15], 
        fov: 60,
        near: 0.1,
        far: 100
      }}
      style={{ background: backgroundColor }}
      {...sceneProps}
    >
      {/* Original lighting setup (keeping it beautiful) */}
      <ambientLight intensity={0.2} />
      <hemisphereLight args={[0x4040ff, 0xff4040, 0.6]} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={0.3}
        color={0x88ccff}
      />

      {/* Main Scene Content */}
      <PointsGroup 
        count={sphereCount}
        spread={8}
        rotationSpeed={0.15}
        baseHue={0.6}
        hueVariation={0.2}
      />

      {/* Environment */}
      <Environment preset="night" />

      {/* Camera Controls */}
      {enableOrbitControls ? (
        <OrbitControls 
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
          maxDistance={30}
          minDistance={5}
        />
      ) : (
        <CameraController />
      )}

      {/* Post Processing */}
      {enablePostProcessing && (
        <EffectComposer>
          <Bloom 
            luminanceThreshold={0.1} 
            luminanceSmoothing={0.9} 
            height={300}
            opacity={0.8}
          />
          <ChromaticAberration offset={[0.002, 0.002]} />
        </EffectComposer>
      )}
    </Canvas>
  );
}

export default IcoSphereScene;
