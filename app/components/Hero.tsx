"use client"

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { RiDownload2Line, RiArrowDownLine } from "react-icons/ri"

gsap.registerPlugin(TextPlugin)

const skills = ['a Web Developer', 'an IoT Enthusiast', 'a Lifelong Learner', 'a Tech Enthusiast', 'a Novice Researcher', 'an AI Enthusiast']

export default function Hero() {
  const nameRef = useRef(null)
  const skillsRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 })

    gsap.from(nameRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out'
    })

    skills.forEach((skill, index) => {
      tl.to(skillsRef.current, {
        duration: 1,
        text: skill,
        ease: 'none'
      })
      .to(skillsRef.current, {
        duration: 1.5,
        text: skill,
        ease: 'none'
      })
      if (index !== skills.length - 1) {
        tl.to(skillsRef.current, {
          duration: 0.5,
          text: '',
          ease: 'none'
        })
      }
    })

    return () => {
      tl.kill()
    }
  }, [])

  const handleExploreClick = () => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleDownloadCV = () => {
    // Replace with your actual CV file URL
    const cvUrl = 'https://drive.google.com/file/d/1PkEWx8Y2jHupY3J9Bdu4kPZiSzdlFq-u/view?usp=sharing'
    
    // Create a temporary link element
    const link = document.createElement('a')
    link.href = cvUrl
    link.download = 'Ahmad_Meijlan_Yasir_CV.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <header className="relative isolate overflow-hidden bg-background min-h-screen flex items-center justify-center py-2">
      <div
        className="absolute inset-x-0 top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary/20 to-primary/40 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary/30 to-primary/50 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <section className="h-screen flex flex-col justify-center items-center transition-colors duration-200">
        <motion.h1
          ref={nameRef}
          className="text-3xl md:text-7xl font-bold mb-2 md:mb-4 text-center text-current"
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gradient">Ahmad Meijlan Yasir</span>
        </motion.h1>
        <div className="h-3 md:h-0"></div>
        <motion.h2
          className="text-xl md:text-4xl mt-2 md:mt-1 mb-8"
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          I am <span ref={skillsRef} className="font-semibold"></span>
        </motion.h2>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button 
            onClick={handleExploreClick}
            className="group"
            size="lg"
            aria-label="Explore Portfolio"
          >
            Explore Portfolio
            <RiArrowDownLine className="ml-2 h-4 w-4 group-hover:animate-bounce" aria-hidden="true" />
          </Button>
          <Button 
            onClick={handleDownloadCV}
            variant="outline"
            className="group"
            size="lg"
            aria-label="Download CV"
          >
            Download CV
            <RiDownload2Line className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" aria-hidden="true" />
          </Button>
        </motion.div>
      </section>
    </header>
  )
}