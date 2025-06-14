"use client"

import { motion } from "framer-motion"
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiGreensock,
  SiYoutube,
  SiRadixui,
} from "react-icons/si"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { FaBoxes } from "react-icons/fa" // Icon alternatif untuk ShadCN

export default function AboutUs() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const technologies = [
    { name: "Next.js", icon: <SiNextdotjs /> },
    { name: "React", icon: <SiReact /> },
    { name: "TypeScript", icon: <SiTypescript /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss /> },
    {
      name: "Supabase",
      icon: (
        <img
          src="https://cdn.prod.website-files.com/66842e04d18971242a294872/669e87d174d190a8ba60b861_supabase-TAiY.png"
          alt="Supabase"
          className={`w-8 h-8 transition-all duration-300 filter brightness-0 saturate-100 ${
            theme === "dark" ? "invert" : ""
          }`}
        />
      ),
    },
    {
      name: "GSAP",
      icon: (
        <img
          src="https://www.wappalyzer.com/images/icons/GSAP.svg"
          alt="GSAP"
          className={`w-8 h-8 transition-all duration-300 filter brightness-0 saturate-100 ${
            theme === "dark" ? "invert" : ""
          }`}
        />
      ),
    },
    
    {
      name: "ShadCN UI",
      icon: (
        <img
          src="https://erfanevis.ir/wp-content/uploads/2024/08/shadcn-ui-logo.png"
          alt="ShadCN UI"
          className={`w-8 h-8 transition-all duration-300 filter brightness-0 saturate-100 ${
            theme === "dark" ? "invert" : ""
          }`}
        />
      ),
    },
    { name: "Radix UI", icon: <SiRadixui /> },
    { name: "YouTube Embed", icon: <SiYoutube /> },
    { name: "Vercel", icon: <SiVercel /> },
  ]
  

  return (
    <section className="min-h-screen flex items-center py-10 sm:py-20 sm:px-6 lg:px-8 bg-background elegant-section elegant-gradient">
      <div className="container mx-auto">
        <motion.h2
          className="text-5xl font-black mb-8 text-center text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About Me
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="order-2 md:order-1 px-0 sm:px-2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-foreground mb-6 text-justify md:text-justify">
              Hi, I'm Ahmad Meijlan Yasir, but feel free to call me "Mei" or "Yasir." I'm a tech enthusiast who loves
              exploring new things and keeping up with the latest trends in technology. Right now, I'm studying at the
              State College of Meteorology, Climatology, and Geophysics (STMKG) Indonesia, majoring in Instrumentation,
              which has made me even more interested in the technologies related to this field.
            </p>
            <p className="text-foreground mb-6 text-justify md:text-justify">
              I'm also a novice researcher with a focus on web development, AI, and IoT. I enjoy learning, creating, and
              solving new challenges, whether it's building web applications, working on AI projects, or designing IoT
              systems. I'm always excited to collaborate and bring fresh ideas to life.
            </p>
            <p className="text-foreground font-medium">
              Btw, this portfolio web is made using a combination of modern web technologies, including:
            </p>
            <div className="grid grid-cols-5 md:grid-cols-5 gap-4 mt-6">
              {technologies.map((tech) => (
                <div key={tech.name} className="flex flex-col items-center group">
                  <div className={`${theme === "dark" ? "text-white" : "text-black"} text-4xl`}>
                    {tech.icon}
                  </div>
                  <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            className="relative h-96 order-1 md:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/40 dark:from-primary/30 dark:to-primary/50 rounded-lg transform rotate-3"></div>
            <div className="absolute inset-0 bg-card rounded-lg transform -rotate-3 flex items-center justify-center p-6">
              <div className="text-center">
                <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/30">
                  <img
                    src="https://1h1v9ndzh4okzjrr.public.blob.vercel-storage.com/foto-yasir-fMN26cOwR7dO8L4F1ykhZrp2sZngl8.png"
                    alt="Ahmad Meijlan Yasir"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-card-foreground mb-2">Ahmad Meijlan Yasir</h3>
                <p className="text-muted-foreground">Instrumentation Student & Tech Enthusiast</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
