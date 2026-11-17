"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { SiGithub, SiInstagram } from "react-icons/si"
import { FaLinkedin } from "react-icons/fa6"
import { MdEmail } from "react-icons/md"
import { motion } from "framer-motion"
import { useI18n } from "@/lib/i18n"

export default function Footer() {
  const [currentTime, setCurrentTime] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const { locale, t, getHref } = useI18n()
  
  const handleScrollToTop = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const currentYear = new Date().getFullYear()
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      
      const day = String(now.getDate()).padStart(2, '0')
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const year = now.getFullYear()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      const seconds = String(now.getSeconds()).padStart(2, '0')
      
      const formattedTime = locale === "en" 
        ? `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`
        : `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
      
      setCurrentTime(formattedTime)
      setIsLoading(false)
    }
    
    // Update immediately
    updateTime()
    
    // Then update every second
    const intervalId = setInterval(updateTime, 1000)
    
    return () => clearInterval(intervalId)
  }, [locale])

  return (
    <footer className="bg-background border-t border-border/30 py-6">
      <div className="container mx-auto px-4">
        {/* Mobile View */}
        <div className="flex flex-col items-center space-y-4 md:hidden">
          <Link 
            href={getHref("/")} 
            className="group inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md p-1"
            aria-label="AMY — Ahmad Meijlan Yasir"
          >
            <span className="text-xl font-extrabold tracking-[-0.035em] text-foreground font-sans">
              AMY
            </span>
            <span 
              className="text-xl font-extrabold ml-0.5 inline-block leading-none"
              style={{ color: "var(--brand-accent, #C7E76A)" }}
            >
              .
            </span>
          </Link>

          <motion.a
            href="#"
            onClick={handleScrollToTop}
            className="px-4 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t("footer.backToTop")}
          </motion.a>
          
          <div className="flex space-x-6">
            <motion.a 
              href="https://github.com/amymeij22/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ scale: 1.2 }}
              aria-label="GitHub Ahmad Meijlan Yasir"
            >
              <span className="sr-only">GitHub</span>
              <SiGithub className="h-5 w-5" />
            </motion.a>
            <motion.a 
              href="https://id.linkedin.com/in/ahmad-meijlan-yasir-1b950a351" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ scale: 1.2 }}
              aria-label="LinkedIn Ahmad Meijlan Yasir"
            >
              <span className="sr-only">LinkedIn</span>
              <FaLinkedin className="h-5 w-5" />
            </motion.a>
            <motion.a 
              href="https://www.instagram.com/amymeij_22/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ scale: 1.2 }}
              aria-label="Instagram Ahmad Meijlan Yasir"
            >
              <span className="sr-only">Instagram</span>
              <SiInstagram className="h-5 w-5" />
            </motion.a>
            <motion.a 
              href="mailto:yasirahmad220504@gmail.com" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ scale: 1.2 }}
              aria-label="Email Ahmad Meijlan Yasir"
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
            <Link 
              href={getHref("/")} 
              className="group inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md mb-2 w-fit transition-opacity hover:opacity-90"
              aria-label="AMY — Ahmad Meijlan Yasir"
            >
              <span className="text-xl font-extrabold tracking-[-0.035em] text-foreground font-sans select-none">
                AMY
              </span>
              <span 
                className="text-xl font-extrabold ml-0.5 inline-block leading-none select-none"
                style={{ color: "var(--brand-accent, #C7E76A)" }}
              >
                .
              </span>
            </Link>
            <p className="text-xs text-muted-foreground mb-0.5">{isLoading ? "--/--/---- --:--:--" : currentTime}</p>
            <p className="text-xs text-muted-foreground">© {currentYear} Ahmad Meijlan Yasir</p>
          </div>
          
          <div className="flex space-x-8">
            <motion.a 
              href="https://github.com/amymeij22/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ scale: 1.2 }}
              aria-label="GitHub Ahmad Meijlan Yasir"
            >
              <span className="sr-only">GitHub</span>
              <SiGithub className="h-5 w-5" />
            </motion.a>
            <motion.a 
              href="https://id.linkedin.com/in/ahmad-meijlan-yasir-1b950a351" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ scale: 1.2 }}
              aria-label="LinkedIn Ahmad Meijlan Yasir"
            >
              <span className="sr-only">LinkedIn</span>
              <FaLinkedin className="h-5 w-5" />
            </motion.a>
            <motion.a 
              href="https://www.instagram.com/amymeij_22/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ scale: 1.2 }}
              aria-label="Instagram Ahmad Meijlan Yasir"
            >
              <span className="sr-only">Instagram</span>
              <SiInstagram className="h-5 w-5" />
            </motion.a>
            <motion.a 
              href="mailto:yasirahmad220504@gmail.com" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ scale: 1.2 }}
              aria-label="Email Ahmad Meijlan Yasir"
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
