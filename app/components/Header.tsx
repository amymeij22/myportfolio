"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { RiMoonFill, RiSunFill, RiMenuLine, RiCloseLine } from "react-icons/ri"
import FullScreenMenu from "./FullScreenMenu"
import Image from "next/image"

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-md border-b border-border/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Ahmad Meijlan Yasir</span>
              {mounted && (
                <Image
                  src={theme === "dark" ? "https://1h1v9ndzh4okzjrr.public.blob.vercel-storage.com/dark-icon-L4NkA4vRax43syY662ZzUSbJJl0hXE.png" : "https://1h1v9ndzh4okzjrr.public.blob.vercel-storage.com/light-icon-lXlcWDU3iByqVcjnoHVSUaZAOt8jZK.png"}
                  alt="Ahmad Meijlan Yasir"
                  width={40}
                  height={40}
                />
              )}
            </Link>
          </div>
          <div className="hidden md:flex gap-x-12">
            <Link
              href="#about"
              className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="#skills"
              className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors"
            >
              Skills
            </Link>
            <Link
              href="#projects"
              className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors"
            >
              Projects
            </Link>
            <Link
              href="#publications"
              className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors"
            >
              Publications
            </Link>
            <Link
              href="#timeline"
              className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors"
            >
              Journey
            </Link>
            <Link
              href="#contact"
              className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </div>
          <div className="flex flex-1 justify-end items-center gap-4">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="rounded-full p-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? <RiSunFill className="h-5 w-5" /> : <RiMoonFill className="h-5 w-5" />}
              </button>
            )}
            <button className="md:hidden text-foreground" onClick={toggleMenu}>
              {isMenuOpen ? <RiCloseLine className="w-6 h-6" /> : <RiMenuLine className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </motion.header>
      <FullScreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}