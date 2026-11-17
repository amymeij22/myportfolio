"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useI18n } from "@/lib/i18n"

interface FullScreenMenuProps {
  isOpen: boolean
  onClose: () => void
  activeSection: string
  pathname: string
  onSelectSection?: (id: string) => void
}

export default function FullScreenMenu({
  isOpen,
  onClose,
  activeSection,
  pathname,
  onSelectSection,
}: FullScreenMenuProps) {
  const { locale, t, switchLocale, getHref } = useI18n()
  const isHomePage = pathname === "/" || pathname === "/en"

  const isActive = (section: string) => {
    if (pathname.startsWith("/blog") || pathname.startsWith("/en/blog")) {
      return section === "blog"
    }
    return activeSection === section
  }

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  const getNavHref = (href: string) => {
    if (!isHomePage) {
      return getHref(href)
    }
    return href
  }

  const mobileNavItems = [
    { name: t("nav.hero"), href: "#hero", id: "hero" },
    { name: t("nav.tentang"), href: "#tentang", id: "tentang" },
    { name: t("nav.karya"), href: "#karya", id: "karya" },
    { name: t("nav.riset"), href: "#riset", id: "riset" },
    { name: t("nav.perjalanan"), href: "#perjalanan", id: "perjalanan" },
    { name: t("nav.blog"), href: "#blog", id: "blog" },
    { name: t("nav.kontak"), href: "#kontak", id: "kontak" },
  ]

  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    onClose()

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
        contact: "kontak",
      }

      const targetActiveId = aliasMap[targetId] || targetId
      if (onSelectSection) {
        onSelectSection(targetActiveId)
      }

      const idFallbacks: Record<string, string[]> = {
        hero: ["hero", "beranda"],
        tentang: ["tentang", "about"],
        karya: ["karya", "projects"],
        riset: ["riset", "publications"],
        perjalanan: ["perjalanan", "timeline", "journey"],
        blog: ["blog", "catatan"],
        kontak: ["kontak", "contact"],
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
          behavior: "smooth",
        })

        if (window.location.hash !== href) {
          window.history.pushState(null, "", href)
        }
      }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg flex flex-col justify-between items-center px-6 overflow-y-auto py-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label={t("nav.hero")}
        >
          {/* Top Spacing / Close Indicator */}
          <div className="w-full flex justify-end max-w-xs" />

          {/* Navigation Links */}
          <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-5 w-full max-w-xs my-auto">
            {mobileNavItems.map((item) => (
              <Link
                key={item.id}
                href={getNavHref(item.href)}
                className={`text-2xl font-bold relative py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md ${
                  isActive(item.id)
                    ? "text-foreground font-extrabold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={(e) => handleMobileNavClick(e, item.href)}
              >
                {item.name}
                {isActive(item.id) && (
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-1 rounded-full"
                    style={{ backgroundColor: "var(--brand-accent, #C7E76A)" }}
                    layoutId="activeMobileSection"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Language Switcher Pill */}
          <div className="pt-8 pb-4 flex flex-col items-center gap-2">
            <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
              {t("nav.language")}
            </span>
            <div
              className="inline-flex items-center p-1 rounded-xl border border-border/80 bg-secondary/50 text-xs font-mono font-semibold select-none shadow-2xs"
              role="group"
              aria-label={t("nav.switchLang")}
            >
              <button
                type="button"
                onClick={() => {
                  switchLocale("id")
                  onClose()
                }}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  locale === "id"
                    ? "bg-white text-[#214A40] font-bold shadow-2xs border border-border/40"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                aria-pressed={locale === "id"}
              >
                Bahasa (ID)
              </button>
              <span className="text-border/60 mx-1 select-none" aria-hidden="true">|</span>
              <button
                type="button"
                onClick={() => {
                  switchLocale("en")
                  onClose()
                }}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  locale === "en"
                    ? "bg-white text-[#214A40] font-bold shadow-2xs border border-border/40"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                aria-pressed={locale === "en"}
              >
                English (EN)
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
