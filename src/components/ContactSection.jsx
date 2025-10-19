// components/ContactSection.jsx
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Linkedin, Github, Twitter } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXTwitter } from '@fortawesome/free-brands-svg-icons/faXTwitter'

export default function ContactSection() {
  const sectionRef = useRef()
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
const socials = [
  {
    label: "LinkedIn",
    link: "https://www.linkedin.com/in/santrupt29",
    type: "lucide",
    icon: Linkedin
  },
  {
    label: "GitHub",
    link: "https://github.com/santrupt29",
    type: "lucide",
    icon: Github
  },
  {
    label: "X",
    link: "https://x.com/SantruptP70660",
    type: "fa",
    icon: faXTwitter
  }
]


  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('Form submitted:', formData)
    setIsSubmitting(false)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "santrupt.potphode29@gmail.com",
      link: "mailto:santrupt.potphode29@gmail.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91-9823541475",
      link: "tel:+91-9823541475"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Mumbai, India",
      link: "#"
    }
  ]

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="min-h-screen py-20 relative"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mb-6" />
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Let's collaborate on your next project. I'm always excited to work on innovative ideas.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">Let's Talk</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                I'm currently available for summer internship opportunities. 
                Whether you have a project in mind or just want to chat about the latest in web development, 
                I'd love to hear from you.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="flex items-center gap-4 p-4 bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-lg hover:border-amber-500/50 transition-all duration-300 group"
                >
                  <div className="p-3 bg-amber-500/20 rounded-lg group-hover:bg-amber-500/30 transition-colors">
                    <info.icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">{info.label}</div>
                    <div className="text-white font-medium">{info.value}</div>
                  </div>
                </motion.a>
              ))}
<div className="flex items-center gap-6 mt-8">
  {socials.map((social, index) => (
    <motion.a
      key={index}
      href={social.link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.2 }}
      className="text-gray-300 hover:text-amber-400 transition-colors"
    >
      {social.type === "lucide" ? (
        <social.icon className="w-6 h-6" />
      ) : (
        <FontAwesomeIcon icon={social.icon} className="w-6 h-6" />
      )}
    </motion.a>
  ))}
</div>


            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-colors"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-colors"
                  placeholder="Project Inquiry"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Message</label>
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black" />
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
