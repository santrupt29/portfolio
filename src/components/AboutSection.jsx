// components/AboutSection.jsx
import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const sectionRef = useRef()
  const titleRef = useRef()
  const contentRef = useRef()
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const stats = [
    { number: "5+", label: "Projects Completed" },
    { number: "2+", label: "Years Experience" },
    { number: "10+", label: "Tech Stacks Used" },
    // { number: "100%", label: "Satisfaction Rate" }
    { number: "15+", label: "Frameworks & Libraries Learned" }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-stat', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="min-h-screen py-20 relative"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-semibold text-white mb-4">
              Passionate Full-Stack Developer
            </h3>
            
            <p className="text-gray-300 text-lg leading-relaxed">
              I specialize in React.js, Node.js, Express, and modern web technologies, with strong experience in backend architecture, RESTful APIs, and database design (PostgreSQL, MongoDB). I also have a flair for 3D web experiences using React Three Fiber, creating projects that are not just functional, but visually engaging and innovative.
            </p>
            
            <p className="text-gray-300 text-lg leading-relaxed">
              From designing smooth user interfaces to implementing robust backend logic, scalable databases, and end-to-end solutions, I focus on building applications that make an impact.
              Currently, I’m exploring AI integrations, interactive web visualizations, and advanced full-stack techniques, pushing my projects beyond conventional web design.
            </p>

            <a href="/resume.pdf" download>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-6 py-3 border border-amber-500 text-amber-500 rounded-lg hover:bg-amber-500 hover:text-black transition-all duration-300 mt-10"
            >
              Download Resume
            </motion.button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <div key={index} className="about-stat">
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center hover:border-amber-500/50 transition-all duration-300">
                  <div className="text-3xl font-bold text-amber-500 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-sm">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
