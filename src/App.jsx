// App.jsx
import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'
import Lenis from 'lenis'
import { Menu, X } from 'lucide-react'
import LoadingScreen from './components/LoadingScreen'
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ProjectsSection from './components/ProjectsSection'
import SkillsSection from './components/SkillsSection'
import ContactSection from './components/ContactSection'
import InteractiveScene from './components/InteractiveScene'
import IcoSphereScene from './components/IcoSphereScene'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('portfolio') // 'portfolio' or 'interactive'

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <>
      <Leva hidden />
      <LoadingScreen />
      
      {/* View Toggle Button */}
      <button
        onClick={() => setCurrentView(currentView === 'portfolio' ? 'interactive' : 'portfolio')}
        className="fixed top-4 right-4 z-50 px-4 py-2 bg-amber-500 text-black rounded-lg hover:bg-amber-400 transition-colors font-semibold"
      >
        {currentView === 'portfolio' ? '3D Demo' : 'Portfolio'}
      </button>

      {currentView === 'portfolio' ? (
        // Portfolio View
        <>
          <div className="fixed inset-0 -z-10">
            <IcoSphereScene 
              enableOrbitControls={false}
              sphereCount={25}
              backgroundColor="transparent"
            />
          </div>
          <div className="relative z-10">
            <Navigation />
            <main>
              <HeroSection />
              <AboutSection />
              <ProjectsSection />
              <SkillsSection />
              <ContactSection />
            </main>
          </div>
        </>
      ) : (
        // Interactive Scene View
        <InteractiveScene />
      )}
    </>
  )
}

export default App
