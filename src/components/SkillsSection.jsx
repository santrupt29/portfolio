// components/SkillsSection.jsx
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function SkillsSection() {
  const sectionRef = useRef()
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

const skills = [
  {
    category: "Frontend",
    technologies: [
      { name: "React", level: 90, label: "Expert", color: "from-blue-400 to-blue-600" },
      { name: "Tailwind CSS", level: 85, label: "Advanced", color: "from-blue-500 to-blue-700" },
      { name: "React Three Fiber", level: 80, label: "Intermediate", color: "from-green-400 to-green-600" },
      { name: "GSAP", level: 75, label: "Intermediate", color: "from-purple-400 to-purple-600" },
      { name: "Framer Motion", level: 70, label: "Intermediate", color: "from-gray-400 to-gray-600" }
    ]
  },
  {
    category: "Backend",
    technologies: [
      { name: "Node.js", level: 90, label: "Expert", color: "from-green-500 to-green-700" },
      { name: "MongoDB", level: 85, label: "Advanced", color: "from-green-600 to-green-800" },
      { name: "Supabase", level: 85, label: "Advanced", color: "from-yellow-400 to-yellow-600" },
      { name: "PostgreSQL", level: 80, label: "Advanced", color: "from-blue-600 to-blue-800" },
    ]
  },
  {
    category: "Deployment and Tools",
    technologies: [
      { name: "Vercel", level: 90, label: "Expert", color: "from-purple-500 to-purple-700" },
      { name: "Git", level: 90, label: "Expert", color: "from-blue-500 to-blue-700" },
      { name: "Figma", level: 80, label: "Advanced", color: "from-orange-400 to-orange-600" },
      // { name: "Git", level: 5, label: "Expert", color: "from-red-400 to-red-600" },
      // { name: "Blender", level: 3, label: "Intermediate", color: "from-orange-500 to-orange-700" }
    ]
  }
]

  // const skills = [
  //   {
  //     category: "Frontend",
  //     technologies: [
  //       { name: "React", level: 95, color: "from-blue-400 to-blue-600" },
  //       { name: "Vue.js", level: 90, color: "from-green-400 to-green-600" },
  //       { name: "TypeScript", level: 90, color: "from-blue-500 to-blue-700" },
  //       { name: "Three.js", level: 85, color: "from-purple-400 to-purple-600" },
  //       { name: "Next.js", level: 88, color: "from-gray-400 to-gray-600" }
  //     ]
  //   },
  //   {
  //     category: "Backend",
  //     technologies: [
  //       { name: "Node.js", level: 92, color: "from-green-500 to-green-700" },
  //       { name: "Python", level: 88, color: "from-yellow-400 to-yellow-600" },
  //       { name: "PostgreSQL", level: 85, color: "from-blue-600 to-blue-800" },
  //       { name: "MongoDB", level: 83, color: "from-green-600 to-green-800" },
  //       { name: "GraphQL", level: 80, color: "from-pink-400 to-pink-600" }
  //     ]
  //   },
  //   {
  //     category: "Tools & Design",
  //     technologies: [
  //       { name: "Figma", level: 90, color: "from-purple-500 to-purple-700" },
  //       { name: "Docker", level: 85, color: "from-blue-500 to-blue-700" },
  //       { name: "AWS", level: 82, color: "from-orange-400 to-orange-600" },
  //       { name: "Git", level: 95, color: "from-red-400 to-red-600" },
  //       { name: "Blender", level: 75, color: "from-orange-500 to-orange-700" }
  //     ]
  //   }
  // ]

  return (
    <section 
      ref={sectionRef}
      id="skills" 
      className="min-h-screen py-20 relative"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/30 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skills.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-amber-500/50 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-amber-400 mb-6 text-center">
                {category.category}
              </h3>
              
              <div className="space-y-4">
                {category.technologies.map((tech, techIndex) => (
                  <div key={techIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">{tech.name}</span>
                      <span className="text-gray-400 text-sm">{tech.level}%</span>
                    </div>
                    
                    <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${tech.level}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: categoryIndex * 0.2 + techIndex * 0.1 }}
                        className={`h-full bg-gradient-to-r ${tech.color} rounded-full relative`}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
