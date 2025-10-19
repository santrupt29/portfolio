// components/ProjectsSection.jsx
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Github, Eye } from 'lucide-react'

export default function ProjectsSection() {
  const sectionRef = useRef()
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [activeProject, setActiveProject] = useState(0)

  const projects = [
    {
      title: "PC Forge- Custom PC Builder",
      description: "A full stack web app for custom PC building with compatibility checking of all parts.",
      image: "/api/placeholder/600/400",
      tech: ["React", "Express.js", "MongoDB", "Gemini API"],
      github: "https://github.com/santrupt29/pc_forge",
      live: "the-pc-forge.vercel.app",
      featured: true
    },
        {
      title: "Zync- Real-time team collaboration platform",
      description: "a full-stack real-time communication platform inspired by Slack, enabling seamless team collaboration.",
      image: "/api/placeholder/600/400",
      tech: ["React", "Express.js", "MongoDB", "Stream Chat", "Clerk Auth", "Inngest"],
      github: "https://github.com/santrupt29/zync",
      live: "https://zync-frontend.vercel.app/",
      featured: true
    },
    {
      title: "3D Portfolio Website",
      description: "Interactive 3D portfolio built with React Three Fiber featuring immersive animations.",
      image: "/api/placeholder/600/400",
      tech: ["React", "Three.js", "R3F", "GSAP"],
      github: "https://github.com/santrupt29/portfolio",
      live: "#",
      featured: true
    },

  ]

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="min-h-screen py-20 relative"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`group relative ${project.featured ? 'lg:col-span-2' : ''}`}
              onMouseEnter={() => setActiveProject(index)}
            >
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all duration-500">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                  
                  {/* Project Actions */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={project.live}
                      className="p-2 bg-amber-500 text-black rounded-full hover:bg-amber-400 transition-colors"
                    >
                      <Eye size={18} />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={project.github}
                      className="p-2 bg-slate-700 text-white rounded-full hover:bg-slate-600 transition-colors"
                    >
                      <Github size={18} />
                    </motion.a>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm border border-amber-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      href={project.live}
                      className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      href={project.github}
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Github size={16} />
                      Source Code
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
