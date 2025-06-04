"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { SiGithub, SiLinkedin, SiInstagram } from "react-icons/si"
import { MdEmail } from "react-icons/md"
import { motion } from "framer-motion"

export default function Footer() {
  const [currentTime, setCurrentTime] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  
  const handleScrollToTop = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const currentYear = new Date().getFullYear()
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      
      // Format: dd/mm/yyyy hh:mm:ss
      const day = String(now.getDate()).padStart(2, '0')
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const year = now.getFullYear()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      const seconds = String(now.getSeconds()).padStart(2, '0')
      
      const formattedTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
      
      setCurrentTime(formattedTime)
      setIsLoading(false)
    }
    
    // Update immediately
    updateTime()
    
    // Then update every second
    const intervalId = setInterval(updateTime, 1000)
    
    return () => clearInterval(intervalId)
  }, [])

  return (
    <footer className="bg-background border-t border-border/30 py-6">
      <div className="container mx-auto px-4">
        {/* Mobile View */}
        <div className="flex flex-col items-center space-y-5 md:hidden">
          <motion.a
            href="#"
            onClick={handleScrollToTop}
            className="px-4 py-2 font-small text-xs text-muted-foreground"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ↑ Back to top ↑
          </motion.a>
          
          <div className="flex space-x-6">
            <motion.a 
              href="https://github.com/amymeij22/" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ scale: 1.2 }}
            >
              <span className="sr-only">GitHub</span>
              <SiGithub className="h-5 w-5" />
            </motion.a>
            <motion.a 
              href="https://id.linkedin.com/in/ahmad-meijlan-yasir-1b950a351" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ scale: 1.2 }}
            >
              <span className="sr-only">LinkedIn</span>
              <SiLinkedin className="h-5 w-5" />
            </motion.a>
            <motion.a 
              href="https://www.instagram.com/amymeij_22/" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ scale: 1.2 }}
            >
              <span className="sr-only">Instagram</span>
              <SiInstagram className="h-5 w-5" />
            </motion.a>
            <motion.a 
              href="mailto:yasirahmad220504@gmail.com" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ scale: 1.2 }}
            >
              <span className="sr-only">Email</span>
              <MdEmail className="h-5 w-5" />
            </motion.a>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">{isLoading ? "--/--/---- --:--:--" : currentTime}</p>
            <p className="text-xs text-muted-foreground">© {currentYear} Ahmad Meijlan Yasir</p>
          </div>
        </div>
        
        {/* Desktop View */}
        <div className="hidden md:flex justify-between items-center">
          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground">{isLoading ? "--/--/---- --:--:--" : currentTime}</p>
            <p className="text-sm text-muted-foreground">© {currentYear} Ahmad Meijlan Yasir</p>
          </div>
          
          <div className="flex space-x-8">
            <motion.a 
              href="https://github.com/amymeij22/" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ scale: 1.2 }}
            >
              <span className="sr-only">GitHub</span>
              <SiGithub className="h-5 w-5" />
            </motion.a>
            <motion.a 
              href="https://id.linkedin.com/in/ahmad-meijlan-yasir-1b950a351" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ scale: 1.2 }}
            >
              <span className="sr-only">LinkedIn</span>
              <SiLinkedin className="h-5 w-5" />
            </motion.a>
            <motion.a 
              href="https://www.instagram.com/amymeij_22/" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ scale: 1.2 }}
            >
              <span className="sr-only">Instagram</span>
              <SiInstagram className="h-5 w-5" />
            </motion.a>
            <motion.a 
              href="mailto:yasirahmad220504@gmail.com" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ scale: 1.2 }}
            >
              <span className="sr-only">Email</span>
              <MdEmail className="h-5 w-5" />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  )
}