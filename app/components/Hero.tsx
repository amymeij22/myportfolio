"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Mail } from "lucide-react"
import Image from "next/image"
import { useI18n } from "@/lib/i18n"

export default function Hero() {
  const { t } = useI18n()

  const handleExploreClick = () => {
    const karyaSection = document.getElementById("karya") || document.getElementById("projects")
    if (karyaSection) {
      karyaSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleContactClick = () => {
    const kontakSection = document.getElementById("kontak") || document.getElementById("contact")
    if (kontakSection) {
      const headerOffset = 64
      const elementPosition = kontakSection.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
      if (window.location.hash !== "#kontak") {
        window.history.pushState(null, "", "#kontak")
      }
    }
  }

  return (
    <section
      id="hero"
      className="relative isolate bg-[#F7F7F2] min-h-[calc(100svh-4rem)] flex flex-col justify-center pt-20 pb-10 sm:pt-24 sm:pb-12 lg:pt-20 lg:pb-14 overflow-hidden transition-colors"
      aria-labelledby="hero-headline"
    >
      {/* Atmospheric Decorative Graphics: Subtle & Compact Technical Watermarks with Soft Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Soft Ambient Depth Gradients */}
        <div className="absolute -top-16 -left-16 w-72 sm:w-96 h-72 sm:h-96 bg-[#C7E76A]/[0.06] rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-72 sm:w-96 h-72 sm:h-96 bg-[#E2ECD8]/35 rounded-full blur-3xl" />

        {/* 1. Top-Left Meteorological Streamlines (Compact Corner Accent) */}
        <svg
          className="absolute top-4 left-4 sm:top-6 sm:left-8 w-44 sm:w-56 h-24 sm:h-28 text-[#214A40]/12 select-none"
          viewBox="0 0 240 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 25 C60 10, 130 50, 240 20" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M0 55 C70 30, 150 75, 240 45" stroke="currentColor" strokeWidth="1.2" />
          <path d="M0 85 C80 60, 170 100, 240 70" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" />
          <circle cx="160" cy="74" r="2" fill="currentColor" fillOpacity="0.4" />
        </svg>

        {/* 2. Bottom-Right Isobaric Flow Arc (Compact Corner Accent) */}
        <svg
          className="absolute bottom-3 right-4 sm:bottom-4 sm:right-8 w-44 sm:w-56 h-24 text-[#214A40]/10 select-none"
          viewBox="0 0 240 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M240 90 C160 95, 100 65, 0 95" stroke="currentColor" strokeWidth="1.2" />
          <path d="M240 60 C170 65, 110 35, 0 65" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M240 30 C180 35, 120 10, 0 35" stroke="currentColor" strokeWidth="0.8" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Editorial Split Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column: Copy & CTAs (7 cols on lg) */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-start text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Eyebrow with Lime Bar */}
            <div className="flex items-center gap-3 mb-3.5 sm:mb-4">
              <span
                className="w-7 sm:w-8 h-[2.5px] rounded-full inline-block"
                style={{ backgroundColor: "var(--brand-accent, #C7E76A)" }}
                aria-hidden="true"
              />
              <span className="text-xs sm:text-[13px] font-mono font-semibold tracking-[0.16em] text-foreground uppercase">
                {t("hero.badge")}
              </span>
            </div>

            {/* Dominant Editorial Headline with Exact Line Breaks & Highlights */}
            <h1
              id="hero-headline"
              className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-bold text-foreground tracking-[-0.035em] leading-[1.15] mb-4 sm:mb-5 font-sans"
            >
              <span className="block relative z-30">
                {t("hero.headlinePrefix")}
              </span>
              <span className="block relative z-20">
                <span className="inline-block bg-secondary text-foreground px-2 sm:px-2.5 pt-0.5 pb-1 rounded-md sm:rounded-lg font-bold">
                  {t("hero.headlineWord1")}
                </span>{" "}
                {t("hero.headlineWord2")}
              </span>
              <span className="block relative z-10">
                <span className="inline-block relative z-20">{t("hero.headlineWord3")}</span>{" "}
                <span
                  className="inline-block relative z-10 text-[#1D2925] px-2 sm:px-2.5 pt-0.5 pb-1 rounded-md sm:rounded-lg font-bold"
                  style={{ backgroundColor: "var(--brand-accent, #C7E76A)" }}
                >
                  {t("hero.headlineHighlight")}
                </span>
              </span>
            </h1>

            {/* Controlled Measure Supporting Paragraph */}
            <p className="text-sm sm:text-base lg:text-[16px] text-muted-foreground leading-relaxed max-w-[480px] mb-6 sm:mb-7 font-sans">
              {t("hero.subtitle")}
            </p>

            {/* Two Action Buttons: Lihat Karya & Mari Terhubung */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              <Button
                onClick={handleExploreClick}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 h-auto rounded-lg font-medium text-sm sm:text-base flex items-center gap-2 shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
                aria-label={t("hero.ctaProjects")}
              >
                <span>{t("hero.ctaProjects")}</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </Button>

              <Button
                onClick={handleContactClick}
                variant="outline"
                size="lg"
                className="border border-border bg-transparent hover:bg-secondary/60 text-foreground px-6 py-3 h-auto rounded-lg font-medium text-sm sm:text-base flex items-center gap-2 transition-all focus-visible:ring-2 focus-visible:ring-primary cursor-pointer group"
                aria-label={t("hero.ctaConnect")}
              >
                <Mail className="w-4 h-4 text-foreground/80 group-hover:text-foreground transition-colors" aria-hidden="true" />
                <span>{t("hero.ctaConnect")}</span>
              </Button>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Card (5 cols on lg) */}
          <motion.div
            className="lg:col-span-5 flex justify-center lg:justify-end mt-4 lg:mt-0"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-full max-w-[320px] sm:max-w-[370px] lg:max-w-[390px] xl:max-w-[410px] aspect-[417/407] rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-sm border border-border/40 bg-secondary/30">
              <Image
                src="/images/hero-meteorological-sensor.webp"
                alt={t("hero.imgAlt")}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 410px"
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}
