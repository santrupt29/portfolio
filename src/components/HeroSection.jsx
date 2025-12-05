// components/HeroSection.jsx
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ChevronDown } from 'lucide-react'

export default function HeroSection() {
  const heroRef = useRef()
  const titleRef = useRef()
  const subtitleRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      
      tl.from(titleRef.current.children, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out"
      })
      .from(subtitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.5")
      .from('.hero-cta', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.3")
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const scrollToNext = () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section 
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      id="hero"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 opacity-50" />
      
      {/* Content */}
      <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h2
    className="text-3xl md:text-4xl lg:text-4xl font-extrabold text-white mb-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
  >
    SANTRUPT POTPHODE
  </motion.h2>
        <motion.div 
          ref={titleRef}
          className="mb-6"
        >
          <div className="overflow-hidden">
            <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-violet-500 bg-clip-text text-transparent leading-tight">
              FULL STACK
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-violet-500 via-violet-300 to-white bg-clip-text text-transparent leading-tight">
              DEVELOPER
            </h1>
          </div>
        </motion.div>

        <motion.p 
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Hi, I’m Santrupt, a full-stack developer passionate about building interactive, high-performance web applications.

        </motion.p>

        <motion.div 
          className="hero-cta flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px #9333EA" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-violet-400 to-violet-600 text-black font-semibold rounded-full hover:shadow-xl transition-all duration-300"
            onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
          >
            View My Work
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-violet-400 text-violet-400 font-semibold rounded-full hover:bg-violet-400 hover:text-black transition-all duration-300"
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
          >
            Get In Touch
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 hover:text-white transition-colors"
      >
        <ChevronDown size={32} className="text-violet-300" />
      </motion.button>
    </section>
  )
}
