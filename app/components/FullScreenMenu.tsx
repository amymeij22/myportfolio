"use client"
import { motion } from "framer-motion"
import Link from "next/link"

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FullScreenMenu({ isOpen, onClose }: FullScreenMenuProps) {
  return (
    <motion.div
      className={`fixed inset-0 z-40 bg-background/90 backdrop-blur-md ${isOpen ? "block" : "hidden"}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <Link href="#about" className="text-2xl font-semibold text-foreground mb-4" onClick={onClose}>
          About
        </Link>
        <Link href="#skills" className="text-2xl font-semibold text-foreground mb-4" onClick={onClose}>
          Skills
        </Link>
        <Link href="#projects" className="text-2xl font-semibold text-foreground mb-4" onClick={onClose}>
          Projects
        </Link>
        <Link href="#publications" className="text-2xl font-semibold text-foreground mb-4" onClick={onClose}>
          Publications
        </Link>
        <Link href="#timeline" className="text-2xl font-semibold text-foreground mb-4" onClick={onClose}>
          Journey
        </Link>
        <Link href="#contact" className="text-2xl font-semibold text-foreground mb-4" onClick={onClose}>
          Contact
        </Link>
      </div>
    </motion.div>
  )
}
