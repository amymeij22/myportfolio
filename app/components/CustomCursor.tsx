"use client"

import { useState, useEffect, useSyncExternalStore } from "react"
import { motion } from "framer-motion"

function subscribeCursorMotion(callback: () => void) {
  if (typeof window === "undefined") return () => { }
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
  mq.addEventListener("change", callback)
  return () => mq.removeEventListener("change", callback)
}

function getCursorSnapshot() {
  if (typeof window === "undefined") return true
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(pointer: coarse)").matches
}

function getServerSnapshot() {
  return true
}

export default function CustomCursor() {
  const isReducedMotion = useSyncExternalStore(subscribeCursorMotion, getCursorSnapshot, getServerSnapshot)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isReducedMotion) return

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener("mousemove", updateMousePosition, { passive: true })
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [isReducedMotion])

  if (isReducedMotion) return null

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-30 hidden md:block"
      animate={{ x: mousePosition.x - 12, y: mousePosition.y - 12 }}
      transition={{ type: "spring", stiffness: 450, damping: 28, mass: 0.2 }}
      style={{ opacity: isVisible ? 1 : 0 }}
      aria-hidden="true"
    >
      <div className="w-6 h-6 rounded-full border border-primary/40 bg-accent/15 backdrop-blur-[0.5px]" />
    </motion.div>
  )
}
