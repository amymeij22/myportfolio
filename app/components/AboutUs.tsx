"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Radio, Code, Layers } from "lucide-react"
import { useI18n } from "@/lib/i18n"

export default function AboutUs() {
  const { t } = useI18n()

  return (
    <section
      id="tentang"
      className="relative isolate py-14 sm:py-18 lg:py-22 bg-[#F4F6F1] border-b border-[#DEE4DC]/80 overflow-hidden"
      aria-labelledby="about-heading"
    >
      <div id="about" className="sr-only" aria-hidden="true" />

      {/* Atmospheric Decorative Graphics: Compact Technical Calibration Accents with Soft Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Soft Ambient Depth Gradients */}
        <div className="absolute -top-16 -right-16 w-72 sm:w-96 h-72 sm:h-96 bg-[#C7E76A]/[0.06] rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 sm:w-96 h-72 sm:h-96 bg-[#E2ECD8]/35 rounded-full blur-3xl" />

        {/* 1. Top-Right Sensor Calibration Quadrant (Compact Corner Accent) */}
        <svg
          className="absolute top-4 right-4 sm:top-6 sm:right-8 w-28 sm:w-36 h-28 sm:h-36 text-[#214A40]/12 select-none"
          viewBox="0 0 160 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M160 15 A145 145 0 0 0 15 160" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M160 55 A105 105 0 0 0 55 160" stroke="currentColor" strokeWidth="1.2" />
          <path d="M160 95 A65 65 0 0 0 95 160" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="150" cy="150" r="3" fill="currentColor" fillOpacity="0.4" />
          <line x1="160" y1="150" x2="140" y2="150" stroke="currentColor" strokeWidth="1" />
          <line x1="150" y1="160" x2="150" y2="140" stroke="currentColor" strokeWidth="1" />
        </svg>

        {/* 2. Bottom-Left Engineering Dimension Axis (Compact Corner Accent) */}
        <svg
          className="absolute bottom-4 left-4 sm:bottom-6 sm:left-8 w-32 sm:w-40 h-20 text-[#214A40]/12 select-none hidden lg:block"
          viewBox="0 0 160 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 70 H150" stroke="currentColor" strokeWidth="1" />
          <path d="M10 10 V70" stroke="currentColor" strokeWidth="1" />
          <circle cx="10" cy="70" r="2.5" fill="currentColor" fillOpacity="0.5" />
          <path d="M40 66 V74 M70 66 V74 M100 66 V74 M130 66 V74" stroke="currentColor" strokeWidth="0.8" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Two-Column Centered Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">

          {/* Left Column: Introduction (~48% width / 6 cols on lg) */}
          <motion.div
            className="lg:col-span-6 flex flex-col justify-center text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Eyebrow with Lime Bar */}
            <div className="flex items-center gap-3 mb-6">
              <span
                className="w-7 sm:w-8 h-[2.5px] rounded-full inline-block"
                style={{ backgroundColor: "var(--brand-accent, #C7E76A)" }}
                aria-hidden="true"
              />
              <span className="text-xs sm:text-[13px] font-mono font-semibold tracking-[0.16em] text-foreground uppercase">
                {t("about.eyebrow")}
              </span>
            </div>

            {/* Dominant Headline with Exact Line Breaks & Tint Highlight */}
            <h2
              id="about-heading"
              className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-foreground tracking-[-0.035em] leading-[1.18] mb-6 font-sans"
            >
              <span className="block">
                {t("about.greeting")}
              </span>
              <span className="block mt-1 sm:mt-1.5">
                <span
                  className="inline-block text-[#1D2925] px-2.5 sm:px-3 pt-0.5 pb-1 rounded-lg font-bold"
                  style={{ backgroundColor: "#DFEBBB" }}
                >
                  {t("about.name")}
                </span>
              </span>
            </h2>

            {/* Supporting Content: Two Exact Paragraphs */}
            <div className="space-y-4 text-base sm:text-[16px] text-muted-foreground leading-[1.68] font-sans max-w-[530px] mb-8 sm:mb-10">
              <p>
                {t("about.p1")}
              </p>
              <p>
                {t("about.p2")}
              </p>
            </div>

            {/* Expertise Focus Strip (Desktop: In-column) */}
            <div className="hidden lg:block pt-6 border-t border-border/70 max-w-[540px]">
              <div className="grid grid-cols-3 gap-3 items-center">

                {/* Block 01: Instrumentasi & Pengukuran */}
                <div className="flex items-center gap-3 pr-2">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-primary shrink-0 border border-border/60 shadow-sm">
                    <Radio className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-foreground leading-tight tracking-tight">
                    {t("about.focus1")}<br />{t("about.focus1b")}
                  </div>
                </div>

                {/* Block 02: Sistem Digital & Otomasi */}
                <div className="flex items-center gap-3 px-3 border-x border-border/70">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-primary shrink-0 border border-border/60 shadow-sm">
                    <Code className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-foreground leading-tight tracking-tight">
                    {t("about.focus2")}<br />{t("about.focus2b")}
                  </div>
                </div>

                {/* Block 03: Data & Riset */}
                <div className="flex items-center gap-3 pl-2">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-primary shrink-0 border border-border/60 shadow-sm">
                    <Layers className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-foreground leading-tight tracking-tight">
                    {t("about.focus3")}<br />{t("about.focus3b")}
                  </div>
                </div>

              </div>
            </div>

          </motion.div>

          {/* Right Column: Layered Visual Composition (~48% width / 6 cols on lg) */}
          <motion.div
            className="lg:col-span-6 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Visual Frame Wrapper */}
            <div className="relative w-full max-w-[480px] sm:max-w-[500px] aspect-[480/460]">

              {/* LAYER 1: Base Background Sage Organic Backdrop */}
              <div
                className="absolute inset-0 bg-[#E2E6DF] rounded-[40px] sm:rounded-[48px]"
                aria-hidden="true"
              />

              {/* LAYER 3A: Minimal Crosshair + at Top-Left */}
              <div className="absolute top-5 left-5 sm:top-6 sm:left-6 w-4 h-4 z-10 pointer-events-none" aria-hidden="true">
                <span className="absolute top-[7px] left-0 w-4 h-[1.5px] bg-[#8E9892]" />
                <span className="absolute top-0 left-[7px] w-[1.5px] h-4 bg-[#8E9892]" />
              </div>

              {/* LAYER 3B: Lime Corner Accent Bracket at Bottom-Right */}
              <div
                className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6 w-7 h-7 sm:w-8 sm:h-8 border-r-4 border-b-4 rounded-br-xl z-10 pointer-events-none"
                style={{ borderColor: "var(--brand-accent, #C7E76A)" }}
                aria-hidden="true"
              />

              {/* Inner Photographic Card */}
              <div className="absolute top-3.5 right-3.5 bottom-6 left-7 sm:top-4 sm:right-4 sm:bottom-7 sm:left-9 rounded-[32px] sm:rounded-[36px] overflow-hidden shadow-sm border border-border/50 bg-[#D9DFD7]">

                {/* LAYER 2: Generated Atmospheric Background Image */}
                <Image
                  src="/images/about-atmosphere.webp"
                  alt={t("about.imgAlt")}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 480px"
                  className="object-cover object-[80%_20%]"
                  priority
                />

                {/* LAYER 3C: Atmospheric Topographic Contour Lines (Vector SVG) */}
                <svg
                  className="absolute top-0 right-0 w-[55%] h-[55%] pointer-events-none z-[2]"
                  viewBox="0 0 240 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M40 0 C90 30, 160 20, 240 70" stroke="white" strokeWidth="1.25" strokeOpacity="0.65" />
                  <path d="M10 0 C70 50, 140 40, 240 100" stroke="white" strokeWidth="1.25" strokeOpacity="0.6" />
                  <path d="M0 30 C60 80, 130 60, 240 130" stroke="white" strokeWidth="1.25" strokeOpacity="0.55" />
                  <path d="M0 70 C70 110, 140 90, 240 160" stroke="white" strokeWidth="1.25" strokeOpacity="0.5" />
                  <path d="M0 115 C80 145, 150 120, 240 190" stroke="white" strokeWidth="1.25" strokeOpacity="0.45" />
                </svg>

                {/* LAYER 4: Foreground Portrait */}
                <div className="absolute inset-0 z-[3] pointer-events-none flex items-end justify-center sm:justify-end">
                  <div className="relative w-[88%] sm:w-[86%] h-[92%] sm:h-[90%] translate-x-1 sm:translate-x-2">
                    <Image
                      src="/images/yasir-non-formal.webp"
                      alt="Ahmad Meijlan Yasir — System Engineer"
                      fill
                      sizes="(max-width: 768px) 90vw, 480px"
                      className="object-contain object-bottom"
                      priority
                    />
                  </div>
                </div>

                {/* LAYER 5: Floating Identity Label / Nameplate */}
                <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6 z-10 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 shadow-md border border-border/80 flex flex-col gap-1 max-w-[240px] sm:max-w-[260px]">
                  <span className="text-sm sm:text-[15px] font-bold text-foreground font-sans tracking-tight leading-snug">
                    Ahmad Meijlan Yasir
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-4 sm:w-5 h-[2px] rounded-full inline-block shrink-0"
                      style={{ backgroundColor: "var(--brand-accent, #C7E76A)" }}
                      aria-hidden="true"
                    />
                    <span className="text-[11px] sm:text-xs text-muted-foreground font-medium font-sans truncate">
                      {t("about.role")}
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>

          {/* Mobile/Tablet Fallback Focus Strip: Displayed below visual on < lg screens */}
          <div className="lg:hidden col-span-1 pt-4 border-t border-border/70 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-2 items-center">

              {/* Block 01 */}
              <div className="flex items-center gap-3 p-2">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-primary shrink-0 border border-border/60 shadow-sm">
                  <Radio className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div className="text-xs sm:text-sm font-semibold text-foreground leading-tight tracking-tight">
                  {t("about.focus1")}<br />{t("about.focus1b")}
                </div>
              </div>

              {/* Block 02 */}
              <div className="flex items-center gap-3 p-2 sm:border-x sm:border-border/70">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-primary shrink-0 border border-border/60 shadow-sm">
                  <Code className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div className="text-xs sm:text-sm font-semibold text-foreground leading-tight tracking-tight">
                  {t("about.focus2")}<br />{t("about.focus2b")}
                </div>
              </div>

              {/* Block 03 */}
              <div className="flex items-center gap-3 p-2">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-primary shrink-0 border border-border/60 shadow-sm">
                  <Layers className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div className="text-xs sm:text-sm font-semibold text-foreground leading-tight tracking-tight">
                  {t("about.focus3")}<br />{t("about.focus3b")}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
