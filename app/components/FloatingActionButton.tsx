"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp } from "lucide-react"

export default function FloatingActionButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)

    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 text-[#214A40] hover:bg-[#214A40] hover:text-white border border-[#DEE4DC] shadow-md hover:shadow-xl flex items-center justify-center transition-all duration-300 backdrop-blur-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#214A40] cursor-pointer"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.7, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 15 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          aria-label="Kembali ke atas"
          title="Kembali ke atas"
        >
          <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:-translate-y-0.5" strokeWidth={2.2} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
