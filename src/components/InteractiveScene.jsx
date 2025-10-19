// components/InteractiveScene.jsx
import { useState } from 'react'
import IcoSphereScene from './IcoSphereScene'

function InteractiveScene() {
  const [sphereCount, setSphereCount] = useState(40)
  const [autoRotate, setAutoRotate] = useState(true)

  return (
    <div className="relative w-full h-screen">
      {/* Controls */}
      <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white">
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium">Sphere Count: {sphereCount}</span>
            <input 
              type="range" 
              min={10} 
              max={80} 
              value={sphereCount}
              onChange={(e) => setSphereCount(Number(e.target.value))}
              className="w-full mt-1"
            />
          </label>
          
          <label className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              checked={autoRotate}
              onChange={(e) => setAutoRotate(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Auto Rotate</span>
          </label>
        </div>
      </div>

      {/* Scene */}
      <IcoSphereScene 
        sphereCount={sphereCount}
        enableOrbitControls={autoRotate}
        backgroundColor="linear-gradient(to bottom, #0a0a0a, #1a1a2e)"
      />
    </div>
  )
}

export default InteractiveScene
