"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener("mousemove", updateMousePosition)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-40"
      animate={{ x: mousePosition.x - 40, y: mousePosition.y - 40 }}
      transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.8 }}
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div className="w-20 h-20 bg-primary/40 dark:bg-primary/30 rounded-full blur-xl animate-glow-pulse" />
    </motion.div>
  )
}

