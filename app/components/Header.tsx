"use client"

import { useState, useEffect, useRef, useSyncExternalStore } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { RiMenuLine, RiCloseLine } from "react-icons/ri"
import FullScreenMenu from "./FullScreenMenu"
import { usePathname } from "next/navigation"
import { useI18n } from "@/lib/i18n"

const emptySubscribe = () => () => {}

export default function Header() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const pathname = usePathname()
  const isManualScrollRef = useRef(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { locale, t, switchLocale, getHref } = useI18n()

  const isHomePage = pathname === "/" || pathname === "/en"

  // Track active section on scroll
  useEffect(() => {
    if (pathname.startsWith("/blog") || pathname.startsWith("/en/blog")) {
      setActiveSection("blog")
      return
    }
    if (!isHomePage) return

    const aliasMap: Record<string, string> = {
      journey: "perjalanan",
      timeline: "perjalanan",
      perjalanan: "perjalanan",
      about: "tentang",
      tentang: "tentang",
      projects: "karya",
      karya: "karya",
      publications: "riset",
      riset: "riset",
      catatan: "blog",
      blog: "blog",
      contact: "kontak",
      kontak: "kontak",
      beranda: "hero",
      hero: "hero"
    }

    // On initial mount, sync with hash if present
    if (window.location.hash) {
      const hashId = window.location.hash.replace("#", "")
      setActiveSection(aliasMap[hashId] || hashId)
    }

    const primarySectionIds = [
      "hero",
      "tentang",
      "karya",
      "riset",
      "perjalanan",
      "blog",
      "kontak"
    ]

    const handleScroll = () => {
      // Do not override active section during programmatic smooth scroll
      if (isManualScrollRef.current) return

      // Very top of page -> Hero
      if (window.scrollY < 80) {
        setActiveSection("hero")
        return
      }

      // Very bottom of page -> Kontak
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        setActiveSection("kontak")
        return
      }

      // Focal reading line: 35% down the viewport (comfortably below fixed header)
      const readingLine = Math.max(120, window.innerHeight * 0.35)
      let matchedId = ""

      // 1. Direct span check: does readingLine fall inside [rect.top, rect.bottom]?
      for (const id of primarySectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= readingLine && rect.bottom > readingLine) {
          matchedId = id
          break
        }
      }

      // 2. Fallback for gaps (e.g. marquee): select section with largest visible area
      if (!matchedId) {
        let maxVisibleHeight = 0
        for (const id of primarySectionIds) {
          const el = document.getElementById(id)
          if (!el) continue
          const rect = el.getBoundingClientRect()
          const visibleTop = Math.max(0, rect.top)
          const visibleBottom = Math.min(window.innerHeight, rect.bottom)
          const visibleHeight = Math.max(0, visibleBottom - visibleTop)

          if (visibleHeight > maxVisibleHeight) {
            maxVisibleHeight = visibleHeight
            matchedId = id
          }
        }
      }

      if (matchedId && matchedId !== activeSection) {
        setActiveSection(matchedId)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    }
  }, [pathname, isHomePage, activeSection])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const isActive = (section: string) => {
    if (pathname.startsWith("/blog") || pathname.startsWith("/en/blog")) {
      return section === "blog"
    }
    return activeSection === section
  }

  const getNavHref = (href: string) => {
    if (!isHomePage) {
      return getHref(href)
    }
    return href
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isHomePage && href.startsWith("#")) {
      e.preventDefault()
      const targetId = href.replace("#", "")

      const aliasMap: Record<string, string> = {
        hero: "hero",
        beranda: "hero",
        tentang: "tentang",
        about: "tentang",
        karya: "karya",
        projects: "karya",
        riset: "riset",
        publications: "riset",
        perjalanan: "perjalanan",
        timeline: "perjalanan",
        journey: "perjalanan",
        blog: "blog",
        catatan: "blog",
        kontak: "kontak",
        contact: "kontak"
      }

      // Instant UI active feedback
      const targetActiveId = aliasMap[targetId] || targetId
      setActiveSection(targetActiveId)

      // Lock scrollspy during smooth scroll transition
      isManualScrollRef.current = true
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
      scrollTimeoutRef.current = setTimeout(() => {
        isManualScrollRef.current = false
      }, 950)

      const idFallbacks: Record<string, string[]> = {
        hero: ["hero", "beranda"],
        tentang: ["tentang", "about"],
        karya: ["karya", "projects"],
        riset: ["riset", "publications"],
        perjalanan: ["perjalanan", "timeline", "journey"],
        blog: ["blog", "catatan"],
        kontak: ["kontak", "contact"]
      }

      const candidates = idFallbacks[targetId] || [targetId]
      let targetElement: HTMLElement | null = null
      for (const id of candidates) {
        const el = document.getElementById(id)
        if (el) {
          targetElement = el
          break
        }
      }

      if (targetElement) {
        const headerOffset = 64
        const elementPosition = targetElement.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: targetId === "hero" ? 0 : Math.max(0, offsetPosition),
          behavior: "smooth"
        })

        if (window.location.hash !== href) {
          window.history.pushState(null, "", href)
        }
      }
    }
  }

  const navItems = [
    { name: t("nav.hero"), href: "#hero", id: "hero" },
    { name: t("nav.tentang"), href: "#tentang", id: "tentang" },
    { name: t("nav.karya"), href: "#karya", id: "karya" },
    { name: t("nav.riset"), href: "#riset", id: "riset" },
    { name: t("nav.perjalanan"), href: "#perjalanan", id: "perjalanan" },
    { name: t("nav.blog"), href: "#blog", id: "blog" },
    { name: t("nav.kontak"), href: "#kontak", id: "kontak" }
  ]

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-md border-b border-border/50 transition-colors shadow-[0_1px_3px_0_rgb(0_0_0/0.02)]">
        <nav 
          className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-14 sm:h-15 lg:h-16" 
          aria-label={t("nav.hero")}
        >
          {/* Left: Wordmark AMY. + Tagline */}
          <div className="flex items-center">
            <Link 
              href={getHref("/")} 
              className="group flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md p-1 transition-opacity hover:opacity-90"
              aria-label="AMY — Ahmad Meijlan Yasir"
            >
              <span className="text-xl sm:text-[22px] font-extrabold tracking-[-0.035em] text-foreground font-sans select-none">
                AMY
              </span>
              <span 
                className="text-xl sm:text-[22px] font-extrabold ml-0.5 inline-block leading-none select-none"
                style={{ color: "var(--brand-accent, #C7E76A)" }}
              >
                .
              </span>
            </Link>

            {/* Subtle Divider */}
            <span 
              className="hidden lg:inline-block h-3.5 w-[1px] bg-border mx-3.5" 
              aria-hidden="true" 
            />

            {/* Domain Tagline */}
            <span className="hidden lg:inline-block text-[10.5px] font-mono tracking-[0.14em] text-muted-foreground uppercase font-medium">
              AHMAD MEIJLAN YASIR
            </span>
          </div>

          {/* Right: Navigation Links, Language Switcher & Mobile Menu Button */}
          <div className="flex items-center gap-4 sm:gap-5 lg:gap-7">
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-5 lg:gap-7">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={getNavHref(item.href)}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-[13px] lg:text-sm font-medium leading-none relative group py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
                >
                  <span className={`${
                    isActive(item.id) 
                      ? "text-foreground font-semibold" 
                      : "text-muted-foreground hover:text-foreground"
                  } transition-colors duration-200`}>
                    {item.name}
                  </span>
                  
                  {isActive(item.id) && (
                    <motion.span
                      className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                      style={{ backgroundColor: "var(--brand-accent, #C7E76A)" }}
                      layoutId="activeNavUnderline"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.25 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Language Selector: High-Craft Segmented Toggle */}
            <div 
              className="inline-flex items-center p-0.5 rounded-lg border border-border/80 bg-secondary/40 text-[11px] font-mono font-medium shadow-2xs select-none"
              role="group"
              aria-label={t("nav.switchLang")}
            >
              <button
                type="button"
                onClick={() => switchLocale("id")}
                className={`px-2 py-0.5 rounded-[5px] transition-all cursor-pointer ${
                  locale === "id"
                    ? "bg-white text-[#214A40] font-bold shadow-2xs border border-border/40"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                aria-pressed={locale === "id"}
                aria-label="Bahasa Indonesia"
              >
                ID
              </button>
              <span className="text-border/60 mx-0.5 select-none" aria-hidden="true">|</span>
              <button
                type="button"
                onClick={() => switchLocale("en")}
                className={`px-2 py-0.5 rounded-[5px] transition-all cursor-pointer ${
                  locale === "en"
                    ? "bg-white text-[#214A40] font-bold shadow-2xs border border-border/40"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                aria-pressed={locale === "en"}
                aria-label="English"
              >
                EN
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button 
              className="md:hidden p-1.5 text-foreground rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? t("nav.menuClose") : t("nav.menuOpen")}
            >
              {isMenuOpen ? <RiCloseLine className="w-5 h-5" /> : <RiMenuLine className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Accessible Full Screen Menu for Mobile */}
      <FullScreenMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        activeSection={activeSection} 
        pathname={pathname}
        onSelectSection={(id) => {
          setActiveSection(id)
          isManualScrollRef.current = true
          if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
          scrollTimeoutRef.current = setTimeout(() => {
            isManualScrollRef.current = false
          }, 950)
        }}
      />
    </>
  )
}
