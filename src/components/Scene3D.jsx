// components/Scene3D.jsx
import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial, OrbitControls, Environment } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import * as random from 'maath/random/dist/maath-random.esm'

function ParticleField({ count = 5000 }) {
  const points = useRef()
  const particlesPosition = useMemo(() => random.inSphere(new Float32Array(count * 3), { radius: 50 }), [count])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.elapsedTime * 0.05
      points.current.rotation.y = state.clock.elapsedTime * 0.075
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#f59e0b"
          size={0.15}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

function FloatingGeometry() {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.5
    }
  })

  return (
    <mesh ref={meshRef} position={[4, 0, -5]}>
      <torusKnotGeometry args={[1, 0.3, 128, 32]} />
      <meshStandardMaterial 
        color="#f59e0b" 
        wireframe 
        transparent 
        opacity={0.3} 
      />
    </mesh>
  )
}

export default function Scene3D() {
  const { viewport } = useThree()

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} color="#f59e0b" />
      <pointLight position={[-10, -10, -10]} color="#8b5cf6" intensity={0.3} />
      
      <ParticleField count={viewport.width > 1024 ? 5000 : 2000} />
      <FloatingGeometry />
      
      <Environment preset="night" />
      
      <EffectComposer>
        <Bloom 
          luminanceThreshold={0.3} 
          luminanceSmoothing={0.9} 
          height={300} 
          opacity={0.5}
        />
        <ChromaticAberration offset={[0.001, 0.001]} />
      </EffectComposer>
    </>
  )
}
