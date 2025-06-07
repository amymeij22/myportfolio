"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { RiMoonFill, RiSunFill, RiMenuLine, RiCloseLine } from "react-icons/ri"
import FullScreenMenu from "./FullScreenMenu"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import ThemeToggle from "@/components/theme-toggle"

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  useEffect(() => setMounted(true), [])

  // Mendeteksi section yang aktif berdasarkan scroll
  useEffect(() => {
    if (pathname !== "/") {
      // Jika bukan di halaman utama, set section berdasarkan pathname
      if (pathname.startsWith("/blog")) {
        setActiveSection("blog")
      }
      return
    }

    const handleScroll = () => {
      const sections = [
        "about",
        "skills",
        "projects",
        "publications",
        "blog",
        "timeline",
        "contact"
      ]

      const sectionElements = sections.map(section => {
        const element = document.getElementById(section)
        if (!element) return { id: section, top: 0, bottom: 0 }
        const rect = element.getBoundingClientRect()
        return {
          id: section,
          top: rect.top,
          bottom: rect.bottom
        }
      })

      // Gunakan jendela viewport untuk menentukan section yang terlihat
      const viewportHeight = window.innerHeight
      const currentSection = sectionElements.find(section => {
        return section.top < viewportHeight / 2 && section.bottom > viewportHeight / 2
      })

      if (currentSection) {
        setActiveSection(currentSection.id)
      } else if (window.scrollY < 100) {
        setActiveSection("")
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Panggil sekali untuk set initial state

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [pathname])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const isActive = (section: string) => {
    if (section === "blog" && pathname.startsWith("/blog")) return true
    return activeSection === section
  }

  // Fungsi untuk menentukan URL yang tepat berdasarkan pathname
  const getNavHref = (href: string) => {
    // Jika di halaman selain homepage, kembalikan ke homepage dengan anchor ke section
    if (pathname !== "/") {
      return `/${href}`
    }
    // Jika sudah di homepage, gunakan anchor biasa
    return href
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
          <div className="hidden md:flex gap-x-10">
            {[
              { name: "About", href: "#about", id: "about" },
              { name: "Skills", href: "#skills", id: "skills" },
              { name: "Projects", href: "#projects", id: "projects" },
              { name: "Publications", href: "#publications", id: "publications" },
              { name: "Blog", href: "#blog", id: "blog" },
              { name: "Journey", href: "#timeline", id: "timeline" },
              { name: "Contact", href: "#contact", id: "contact" }
            ].map((item) => (
              <Link
                key={item.name}
                href={getNavHref(item.href)}
                className="text-sm font-semibold leading-6 relative group"
              >
                <span className={`${isActive(item.id) ? "text-primary" : "text-foreground"} transition-colors duration-300 group-hover:text-primary`}>
                  {item.name}
                </span>
                {isActive(item.id) && (
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    layoutId="activeSection"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
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
      <FullScreenMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        activeSection={activeSection} 
        pathname={pathname}
      />
    </>
  )
}