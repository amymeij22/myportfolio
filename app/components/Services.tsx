"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { 
  SiHtml5, SiCss3, SiJavascript, SiReact, SiTypescript, SiNextdotjs, SiTailwindcss, SiWordpress, 
  SiMysql, SiGit, SiPython, SiNodedotjs, SiMongodb, SiDocker, SiAmazon, SiLinux, SiGithub
} from "react-icons/si"
import { 
  RiEnglishInput, RiTeamFill, RiLightbulbFlashLine, RiComputerLine, 
  RiFileTextLine, RiRobot2Line, RiUserStarLine, RiBarChart2Line, RiMoneyDollarCircleLine,
  RiMicrosoftFill, RiCustomerService2Line, RiPresentationLine, RiTimeLine, RiGroupLine, RiEmpathizeLine
} from "react-icons/ri"
import { IoLanguage, IoHardwareChip } from "react-icons/io5"
import { useTheme } from "next-themes"

const hardSkills = [
  { icon: <SiHtml5 className="w-8 h-8" />, name: "HTML" },
  { icon: <SiCss3 className="w-8 h-8" />, name: "CSS" },
  { icon: <SiJavascript className="w-8 h-8" />, name: "JavaScript" },
  { icon: <SiReact className="w-8 h-8" />, name: "React.js" },
  { icon: <SiTypescript className="w-8 h-8" />, name: "TypeScript" },
  { icon: <SiNextdotjs className="w-8 h-8" />, name: "Next.js" },
  { icon: <SiTailwindcss className="w-8 h-8" />, name: "Tailwind CSS" },
  { icon: <SiWordpress className="w-8 h-8" />, name: "WordPress" },
  { icon: <SiMysql className="w-8 h-8" />, name: "SQL" },
  { icon: <SiPython className="w-8 h-8" />, name: "Python" },
  { icon: <SiNodedotjs className="w-8 h-8" />, name: "Node.js" },
  { icon: <SiMongodb className="w-8 h-8" />, name: "MongoDB" },
  { icon: <IoHardwareChip className="w-8 h-8" />, name: "IoT" },
  { icon: <SiGit className="w-8 h-8" />, name: "Git" },
  { icon: <SiGithub className="w-8 h-8" />, name: "GitHub" },
  { icon: <SiDocker className="w-8 h-8" />, name: "Docker" },
  { icon: <SiAmazon className="w-8 h-8" />, name: "AWS" },
  { icon: <SiLinux className="w-8 h-8" />, name: "Linux" },
  { icon: <RiMicrosoftFill className="w-8 h-8" />, name: "Microsoft Office" },
  { icon: <RiComputerLine className="w-8 h-8" />, name: "Web Development" },
  { icon: <RiBarChart2Line className="w-8 h-8" />, name: "SEO" },
  { icon: <RiFileTextLine className="w-8 h-8" />, name: "Web Content Writing" },
  { icon: <RiRobot2Line className="w-8 h-8" />, name: "AI Fundamentals" },
]

// Duplicate array for infinite scroll effect
const duplicatedHardSkills = [...hardSkills, ...hardSkills, ...hardSkills]

const softSkills = [
  { icon: <RiUserStarLine className="w-8 h-8" />, name: "Project Management" },
  { icon: <RiMoneyDollarCircleLine className="w-8 h-8" />, name: "Financial Reporting" },
  { icon: <RiTeamFill className="w-8 h-8" />, name: "Team Coordination" },
  { icon: <RiLightbulbFlashLine className="w-8 h-8" />, name: "Leadership" },
  { icon: <IoLanguage className="w-8 h-8" />, name: "Indonesia (Native)" },
  { icon: <RiEnglishInput className="w-8 h-8" />, name: "English (Limited Working)" },
  { icon: <RiCustomerService2Line className="w-8 h-8" />, name: "Communication" },
  { icon: <RiPresentationLine className="w-8 h-8" />, name: "Presentation" },
  { icon: <RiTimeLine className="w-8 h-8" />, name: "Time Management" },
  { icon: <RiGroupLine className="w-8 h-8" />, name: "Collaboration" },
  { icon: <RiEmpathizeLine className="w-8 h-8" />, name: "Empathy" },
  { icon: <RiLightbulbFlashLine className="w-8 h-8" />, name: "Problem Solving" },
]

// Duplicate array for infinite scroll effect
const duplicatedSoftSkills = [...softSkills, ...softSkills, ...softSkills]

export default function Skills() {
  const { theme } = useTheme()
  const hardSkillsRef = useRef<HTMLDivElement>(null)
  const softSkillsRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [isManualScrolling, setIsManualScrolling] = useState(false)
  const [hardSkillsPosition, setHardSkillsPosition] = useState(0)
  const [softSkillsPosition, setSoftSkillsPosition] = useState(0)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  // Handle manual scrolling with wheel event
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault() // Prevent default scrolling behavior
    
    // Get the current target and handle the scrolling manually
    const container = e.currentTarget as HTMLDivElement
    container.scrollLeft += e.deltaY * 2 // Increase scroll speed
    
    setIsManualScrolling(true)
    
    // Clear any existing timeouts
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }
    
    // Set a timeout to resume automatic scrolling after user stops scrolling
    scrollTimeoutRef.current = setTimeout(() => {
      // Update positions to current scroll positions to prevent jumping
      if (hardSkillsRef.current) {
        setHardSkillsPosition(hardSkillsRef.current.scrollLeft)
      }
      
      if (softSkillsRef.current && softSkillsRef.current.scrollWidth) {
        const width = softSkillsRef.current.scrollWidth / 3
        setSoftSkillsPosition(width - softSkillsRef.current.scrollLeft)
      }
      
      setIsManualScrolling(false)
    }, 3000) // 3 second delay before auto-scrolling resumes
  }
  
  // Add mouse drag scrolling functionality
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  
  const handleMouseDown = (e: React.MouseEvent, containerRef: React.RefObject<HTMLDivElement>) => {
    if (!containerRef.current) return
    
    setIsDragging(true)
    setIsManualScrolling(true)
    setStartX(e.pageX - containerRef.current.offsetLeft)
    setScrollLeft(containerRef.current.scrollLeft)
  }
  
  const handleMouseUp = () => {
    setIsDragging(false)
    
    // Clear any existing timeouts
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }
    
    // Set a timeout to resume automatic scrolling after user stops dragging
    scrollTimeoutRef.current = setTimeout(() => {
      // Update positions to current scroll positions to prevent jumping
      if (hardSkillsRef.current) {
        setHardSkillsPosition(hardSkillsRef.current.scrollLeft)
      }
      
      if (softSkillsRef.current && softSkillsRef.current.scrollWidth) {
        const width = softSkillsRef.current.scrollWidth / 3
        setSoftSkillsPosition(width - softSkillsRef.current.scrollLeft)
      }
      
      setIsManualScrolling(false)
    }, 3000) // 3 second delay before auto-scrolling resumes
  }
  
  const handleMouseMove = (e: React.MouseEvent, containerRef: React.RefObject<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return
    
    e.preventDefault()
    const x = e.pageX - containerRef.current.offsetLeft
    const walk = (x - startX) * 2 // Scroll speed multiplier
    containerRef.current.scrollLeft = scrollLeft - walk
  }
  
  // Handle mouse leave to prevent stuck dragging state
  const handleMouseLeave = () => {
    setIsDragging(false)
  }
  
  useEffect(() => {
    // Calculate total width for hard skills
    const hardSkillsWidth = hardSkillsRef.current ? hardSkillsRef.current.scrollWidth / 3 : 0
    const softSkillsWidth = softSkillsRef.current ? softSkillsRef.current.scrollWidth / 3 : 0
    
    let hardSkillsAnimationId: number
    let softSkillsAnimationId: number
    
    // Cek apakah layar mobile
    const isMobile = window.innerWidth < 768
    
    // Jika mobile, tidak perlu menjalankan animasi otomatis
    if (isMobile) {
      setIsManualScrolling(true)
    }
    
    const animateHardSkills = () => {
      // Tidak menjalankan animasi jika mobile
      if (isMobile) return
      
      if (hardSkillsRef.current && !isPaused && !isManualScrolling) {
        setHardSkillsPosition(prev => {
          const newPosition = prev + 1.2
          // Reset position when we've scrolled through the first set of items
          if (newPosition >= hardSkillsWidth) {
            return 0
          }
          return newPosition
        })
        
        if (hardSkillsRef.current) {
          hardSkillsRef.current.scrollLeft = hardSkillsPosition
        }
      }
      hardSkillsAnimationId = requestAnimationFrame(animateHardSkills)
    }
    
    const animateSoftSkills = () => {
      // Tidak menjalankan animasi jika mobile
      if (isMobile) return
      
      if (softSkillsRef.current && !isPaused && !isManualScrolling) {
        setSoftSkillsPosition(prev => {
          const newPosition = prev + 1.2
          // Reset position when we've scrolled through the first set of items
          if (newPosition >= softSkillsWidth) {
            return 0
          }
          return newPosition
        })
        
        if (softSkillsRef.current) {
          softSkillsRef.current.scrollLeft = softSkillsWidth - softSkillsPosition
        }
      }
      softSkillsAnimationId = requestAnimationFrame(animateSoftSkills)
    }
    
    // Hanya memulai animasi jika bukan mobile
    if (!isMobile) {
      hardSkillsAnimationId = requestAnimationFrame(animateHardSkills)
      softSkillsAnimationId = requestAnimationFrame(animateSoftSkills)
    }
    
    // Listener untuk window resize
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768
      
      // Jika berubah dari desktop ke mobile, hentikan animasi
      if (newIsMobile && !isMobile) {
        if (hardSkillsAnimationId) cancelAnimationFrame(hardSkillsAnimationId)
        if (softSkillsAnimationId) cancelAnimationFrame(softSkillsAnimationId)
        setIsManualScrolling(true)
      }
      
      // Jika berubah dari mobile ke desktop, mulai animasi
      if (!newIsMobile && isMobile) {
        setIsManualScrolling(false)
        hardSkillsAnimationId = requestAnimationFrame(animateHardSkills)
        softSkillsAnimationId = requestAnimationFrame(animateSoftSkills)
      }
    }
    
    // Tambahkan event listener
    window.addEventListener('resize', handleResize)
    
    return () => {
      // Bersihkan semua animasi dan listener
      if (hardSkillsAnimationId) cancelAnimationFrame(hardSkillsAnimationId)
      if (softSkillsAnimationId) cancelAnimationFrame(softSkillsAnimationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [isPaused, isManualScrolling, isDragging, hardSkillsPosition, softSkillsPosition])

  return (
    <section className="min-h-screen flex flex-col justify-center py-20 px-0 bg-background">
      <div className="container mx-auto px-4 mb-4">
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-5xl font-black mb-4 text-center text-foreground">My Skills</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and personal capabilities.
          </p>
        </motion.div>
      </div>

      <div className="space-y-12 w-full">
        {/* Technical Skills */}
        <div>
          <motion.h3
            className="text-3xl font-bold mb-4 text-foreground text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1 }}
          >
            Hard Skills
          </motion.h3>
          
          <div className="relative w-full mb-2 overflow-hidden">
            <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-primary/10 to-primary/50"></div>
          </div>
          
          <div 
            ref={hardSkillsRef} 
            className={`skills-scroll-container ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => {
              setIsPaused(false)
              handleMouseLeave()
            }}
            onTouchStart={() => {
              setIsPaused(true)
              setIsManualScrolling(true)
            }}
            onTouchEnd={() => {
              // Meningkatkan delay sebelum memulai ulang animasi otomatis
              // untuk mencegah gerakan yang tidak diinginkan setelah touch event
              setTimeout(() => {
                if (hardSkillsRef.current) {
                  setHardSkillsPosition(hardSkillsRef.current.scrollLeft)
                }
                setIsPaused(false)
                // Berikan waktu lebih lama sebelum melanjutkan animasi otomatis
                setTimeout(() => setIsManualScrolling(false), 5000)
              }, 300)
            }}
            onWheel={handleWheel}
            onMouseDown={(e) => handleMouseDown(e, hardSkillsRef)}
            onMouseUp={handleMouseUp}
            onMouseMove={(e) => handleMouseMove(e, hardSkillsRef)}
          >
            <div className="flex space-x-4 min-w-max">
              {duplicatedHardSkills.map((skill, index) => (
                <motion.div
                  key={`${skill.name}-${index}`}
                  className="flex flex-col items-center justify-center w-36 h-36 shrink-0 rounded-lg border border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-200"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.1, delay: Math.min(index % hardSkills.length, 20) * 0.01 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={`${theme === "dark" ? "text-primary" : "text-primary"} mb-3`}>
                    {skill.icon}
                  </div>
                  <p className="text-sm font-medium text-center px-2">{skill.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Soft Skills */}
        <div>
          <motion.h3
            className="text-3xl font-bold mb-4 text-foreground text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1 }}
          >
            Soft Skills
          </motion.h3>
          
          <div className="relative w-full mb-2 overflow-hidden">
            <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-primary/50 to-primary/10"></div>
          </div>
          
          <div 
            ref={softSkillsRef} 
            className={`skills-scroll-container ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => {
              setIsPaused(false)
              handleMouseLeave()
            }}
            onTouchStart={() => {
              setIsPaused(true)
              setIsManualScrolling(true)
            }}
            onTouchEnd={() => {
              // Meningkatkan delay sebelum memulai ulang animasi otomatis
              // untuk mencegah gerakan yang tidak diinginkan setelah touch event
              setTimeout(() => {
                if (softSkillsRef.current && softSkillsRef.current.scrollWidth) {
                  const width = softSkillsRef.current.scrollWidth / 3
                  setSoftSkillsPosition(width - softSkillsRef.current.scrollLeft)
                }
                setIsPaused(false)
                // Berikan waktu lebih lama sebelum melanjutkan animasi otomatis
                setTimeout(() => setIsManualScrolling(false), 5000)
              }, 300)
            }}
            onWheel={handleWheel}
            onMouseDown={(e) => handleMouseDown(e, softSkillsRef)}
            onMouseUp={handleMouseUp}
            onMouseMove={(e) => handleMouseMove(e, softSkillsRef)}
          >
            <div className="flex space-x-4 min-w-max">
              {duplicatedSoftSkills.map((skill, index) => (
                <motion.div
                  key={`${skill.name}-${index}`}
                  className="flex flex-col items-center justify-center w-36 h-36 shrink-0 rounded-lg border border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-200"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.1, delay: Math.min(index % softSkills.length, 20) * 0.01 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={`${theme === "dark" ? "text-primary" : "text-primary"} mb-3`}>
                    {skill.icon}
                  </div>
                  <p className="text-sm font-medium text-center px-2">{skill.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .skills-scroll-container {
          overflow-x: scroll;
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
          padding: 1rem 0;
          width: 100%;
          user-select: none; /* Prevent text selection during drag */
          touch-action: pan-x; /* Optimize for horizontal touch actions */
          -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
          overscroll-behavior-x: contain; /* Prevent scroll chaining */
        }
        
        .skills-scroll-container::-webkit-scrollbar {
          display: none;
        }
        
        .cursor-grab {
          cursor: grab;
        }
        
        .cursor-grabbing {
          cursor: grabbing !important;
        }
        
        @media (max-width: 768px) {
          .skills-scroll-container > div {
            padding-left: 5%;
            padding-right: 5%;
          }
          
          /* Mobile: konten scrollable tetapi tidak otomatis */
          .skills-scroll-container {
            scroll-snap-type: x mandatory;
          }
          
          .skills-scroll-container > div > div {
            scroll-snap-align: center;
          }
        }
      `}</style>
    </section>
  )
}