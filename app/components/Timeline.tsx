"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  GraduationCap,
  Users,
  Microscope,
  Code2,
  Laptop,
  Layers,
  Settings,
  Cpu,
  ChevronDown,
  ChevronUp,
  Tag
} from "lucide-react"
import { getVerifiedJourney, JourneyEntry } from "@/lib/timeline-data"
import { useI18n } from "@/lib/i18n"

export default function Timeline() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const { locale, t } = useI18n()

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id))
  }

  const items = getVerifiedJourney(locale)

  // Reverse chronological order of years: 2026 -> 2022
  const years = ["2026", "2025", "2024", "2023", "2022"]
  const itemsByYear = years.map(year => ({
    year,
    items: items.filter(item => item.year === year)
  }))

  const getIcon = (type: JourneyEntry["iconType"]) => {
    const iconClass = "w-5 h-5 text-[#214A40]"
    switch (type) {
      case "education":
        return <GraduationCap className={iconClass} />
      case "team":
        return <Users className={iconClass} />
      case "lab":
        return <Microscope className={iconClass} />
      case "web":
        return <Code2 className={iconClass} />
      case "finance":
        return <Laptop className={iconClass} />
      case "leadership":
        return <Layers className={iconClass} />
      case "intern":
        return <Settings className={iconClass} />
      case "ai":
        return <Cpu className={iconClass} />
      default:
        return <Code2 className={iconClass} />
    }
  }

  return (
    <section
      id="perjalanan"
      className="relative isolate py-14 sm:py-18 lg:py-22 bg-[#F7F7F2] border-b border-[#DEE4DC]/80 overflow-hidden"
    >
      {/* Hidden anchor targets for navigation compatibility */}
      <div id="timeline" className="sr-only" aria-hidden="true" />
      <div id="journey" className="sr-only" aria-hidden="true" />

      {/* Atmospheric Decorative Graphics: Compact Telemetry & Navigation Accents with Soft Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Soft Ambient Depth Gradients */}
        <div className="absolute -top-16 -left-16 w-72 sm:w-96 h-72 sm:h-96 bg-[#E2ECD8]/35 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-72 sm:w-96 h-72 sm:h-96 bg-[#C7E76A]/[0.06] rounded-full blur-3xl" />

        {/* Atmospheric Top-Right Contour Lines (Compact Corner Accent) */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-8 w-36 sm:w-44 h-24 sm:h-28 select-none">
          <svg
            viewBox="0 0 180 110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-[#214A40]/12"
          >
            <path
              d="M180 20 C130 25, 90 5, 40 35"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <path
              d="M180 50 C135 55, 95 30, 45 60"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path
              d="M180 80 C140 85, 100 55, 50 85"
              stroke="currentColor"
              strokeWidth="1"
            />
            <circle cx="100" cy="45" r="2" fill="currentColor" fillOpacity="0.4" />
          </svg>
        </div>

        {/* Atmospheric Bottom-Left Contour Lines (Compact Corner Accent) */}
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-8 w-32 sm:w-40 h-20 select-none hidden lg:block">
          <svg
            viewBox="0 0 160 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-[#214A40]/10"
          >
            <path
              d="M0 30 C50 15, 90 50, 160 30"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path
              d="M0 55 C50 40, 90 75, 160 55"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          </svg>
        </div>

        {/* Subtle Decorative Crosshair (+) */}
        <div className="absolute top-8 right-12 hidden lg:block text-[#214A40]/15 font-mono text-base select-none">
          +
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Section Header (Left-aligned) */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-5 h-1 rounded-full bg-[#C7E76A]" />
            <span className="font-mono text-xs font-semibold tracking-[0.16em] uppercase text-[#1D2925]">
              {t("timeline.eyebrow")}
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#1D2925] tracking-tight leading-tight sm:leading-[1.24] mb-4">
            {t("timeline.headingPart1")} <br className="hidden sm:inline" />
            {t("timeline.headingPart2")}
            <span className="inline-block bg-[#DFEBBB] text-[#1D2925] px-2.5 py-0.5 rounded-lg align-baseline">
              {t("timeline.headingHighlight")}
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-[#68736D] leading-relaxed">
            {t("timeline.subtitle")}
          </p>
        </div>

        {/* ============================================================== */}
        {/* DESKTOP VIEW (>= 1024px, lg) Perfectly Aligned Multi-Column    */}
        {/* ============================================================== */}
        <div className="hidden lg:block relative">
          {/* Continuous vertical timeline spine: starts at Row 1 node, ends at Row 8 node */}
          <div 
            className="absolute left-[96px] w-[1.5px] bg-[#68855C]/35 top-[36px] bottom-[36px] -translate-x-1/2 pointer-events-none"
            aria-hidden="true"
          />

          <div className="space-y-0">
            {itemsByYear.map((group) => (
              <div key={group.year} className="relative">
                {group.items.map((item, itemIdx) => {
                  const isFirstInYear = itemIdx === 0
                  const isExpanded = expandedId === item.id

                  return (
                    <div 
                      key={item.id}
                      className="group border-b border-[#DEE4DC]/80 transition-colors hover:bg-[#E9EEE8]/25"
                    >
                      <div 
                        onClick={() => toggleExpand(item.id)}
                        className="flex items-center py-4 lg:py-5 min-h-[72px] cursor-pointer select-none"
                        role="button"
                        tabIndex={0}
                        aria-expanded={isExpanded}
                        aria-label={`Rincian untuk ${item.title}`}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault()
                            toggleExpand(item.id)
                          }
                        }}
                      >
                        {/* 1. Year Column (Fixed width: 80px) */}
                        <div className="w-[80px] flex-shrink-0 text-left">
                          {isFirstInYear ? (
                            <span className="font-bold text-2xl text-[#1D2925] font-sans tracking-tight">
                              {group.year}
                            </span>
                          ) : (
                            <span className="sr-only">{group.year}</span>
                          )}
                        </div>

                        {/* 2. Timeline Node Column (Fixed width: 32px, centered) */}
                        <div className="w-[32px] flex-shrink-0 flex items-center justify-center relative">
                          <span 
                            className="w-3 h-3 rounded-full bg-[#A3D139] ring-4 ring-[#F7F7F2] group-hover:scale-125 transition-transform duration-200"
                            aria-hidden="true"
                          />
                        </div>

                        {/* 3. Icon Box (Fixed width: 44px + 20px gap) */}
                        <div className="ml-5 w-[44px] flex-shrink-0 flex items-center justify-center">
                          <div className="w-11 h-11 rounded-xl bg-[#E9EFE7] flex items-center justify-center shadow-xs group-hover:bg-[#DFEBBB] transition-colors">
                            {getIcon(item.iconType)}
                          </div>
                        </div>

                        {/* 4. Period Pill Column (Fixed width: 160px for consistent divider alignment) */}
                        <div className="ml-5 w-[160px] flex-shrink-0">
                          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#F4F6F2] border border-[#DEE4DC] font-mono text-xs text-[#214A40] font-medium whitespace-nowrap">
                            {item.period}
                          </span>
                        </div>

                        {/* 5. First Vertical Divider (Fixed position) */}
                        <div className="ml-4 h-5 w-[1px] bg-[#DEE4DC] flex-shrink-0" aria-hidden="true" />

                        {/* 6. Title & Organization Column (Fixed width: 280px xl:320px) */}
                        <div className="ml-5 w-[280px] xl:w-[320px] flex-shrink-0">
                          <h3 className="text-sm lg:text-[15px] font-bold text-[#1D2925] leading-snug group-hover:text-[#214A40] transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-xs lg:text-[13px] text-[#68736D] mt-0.5 truncate">
                            {item.organization}
                          </p>
                        </div>

                        {/* 7. Second Vertical Divider (Fixed position) */}
                        <div className="ml-5 h-6 w-[1px] bg-[#DEE4DC] flex-shrink-0" aria-hidden="true" />

                        {/* 8. Description / Summary Column (Takes remaining flexible width, strictly equal left margin) */}
                        <div className="ml-5 flex-1 min-w-0 pr-4">
                          <p className="text-xs lg:text-[13px] text-[#68736D] leading-relaxed">
                            {item.summary}
                          </p>
                        </div>

                        {/* 9. Subtle Expand Indicator (Fixed width: 32px) */}
                        <div className="w-[32px] flex-shrink-0 flex items-center justify-end pr-2 opacity-50 group-hover:opacity-100 transition-opacity">
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-[#214A40]" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-[#68736D]" />
                          )}
                        </div>
                      </div>

                      {/* Expandable Content Panel */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="pb-5 pt-1 pl-[136px] pr-4">
                              <div className="p-4 sm:p-5 bg-[#F4F6F2] rounded-xl border border-[#DEE4DC] shadow-xs">
                                <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#214A40] mb-2.5 flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-[#C7E76A]" />
                                  <span>{t("timeline.verifiedPanel")}</span>
                                </div>

                                <ul className="space-y-1.5 mb-4">
                                  {item.details.points.map((pt, idx) => (
                                    <li 
                                      key={idx}
                                      className="text-xs lg:text-[13px] text-[#1D2925] leading-relaxed flex items-start gap-2"
                                    >
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#214A40] mt-1.5 flex-shrink-0" />
                                      <span>{pt}</span>
                                    </li>
                                  ))}
                                </ul>

                                {item.details.tags && item.details.tags.length > 0 && (
                                  <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#DEE4DC]/80">
                                    <Tag className="w-3.5 h-3.5 text-[#68736D] mr-1" />
                                    {item.details.tags.map((tag) => (
                                      <span
                                        key={tag}
                                        className="px-2 py-0.5 rounded-md bg-[#E9EEE8] text-[#1D2925] font-mono text-[11px]"
                                      >
                                        #{tag}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* TABLET VIEW (768px - 1023px, md) Uniform Column Alignment      */}
        {/* ============================================================== */}
        <div className="hidden md:block lg:hidden relative">
          {/* Continuous vertical timeline spine: from node 1 down to node 8 */}
          <div 
            className="absolute left-[76px] w-[1.5px] bg-[#68855C]/35 top-[28px] bottom-[28px] -translate-x-1/2 pointer-events-none"
            aria-hidden="true"
          />

          <div className="space-y-0">
            {itemsByYear.map((group) => (
              <div key={group.year} className="relative">
                {group.items.map((item, itemIdx) => {
                  const isFirstInYear = itemIdx === 0
                  const isExpanded = expandedId === item.id

                  return (
                    <div 
                      key={item.id}
                      className="group border-b border-[#DEE4DC]/80 transition-colors hover:bg-[#E9EEE8]/20"
                    >
                      <div 
                        onClick={() => toggleExpand(item.id)}
                        className="py-4 cursor-pointer select-none"
                        role="button"
                        tabIndex={0}
                        aria-expanded={isExpanded}
                      >
                        <div className="flex items-center">
                          {/* Year (Fixed width: 60px) */}
                          <div className="w-[60px] flex-shrink-0 text-left">
                            {isFirstInYear ? (
                              <span className="font-bold text-xl text-[#1D2925] font-sans tracking-tight">
                                {group.year}
                              </span>
                            ) : null}
                          </div>

                          {/* Node (Fixed width: 32px) */}
                          <div className="w-[32px] flex-shrink-0 flex items-center justify-center">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#A3D139] ring-3 ring-[#F7F7F2]" />
                          </div>

                          {/* Icon (Fixed width: 40px) */}
                          <div className="ml-3 w-[40px] flex-shrink-0 flex items-center justify-center">
                            <div className="w-9 h-9 rounded-lg bg-[#E9EFE7] flex items-center justify-center">
                              {getIcon(item.iconType)}
                            </div>
                          </div>

                          {/* Period (Fixed width: 140px) */}
                          <div className="ml-3 w-[140px] flex-shrink-0">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#F4F6F2] border border-[#DEE4DC] font-mono text-[11px] text-[#214A40] font-medium whitespace-nowrap">
                              {item.period}
                            </span>
                          </div>

                          {/* Title & Organization (Flexible width) */}
                          <div className="ml-3 flex-1 min-w-0 pr-3">
                            <h3 className="text-sm font-bold text-[#1D2925] truncate">
                              {item.title}
                            </h3>
                            <p className="text-xs text-[#68736D] truncate">
                              {item.organization}
                            </p>
                          </div>

                          {/* Expand Icon */}
                          <div className="w-[28px] flex-shrink-0 flex items-center justify-end pr-1 opacity-60">
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-[#214A40]" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-[#68736D]" />
                            )}
                          </div>
                        </div>

                        {/* Summary below */}
                        <div className="pl-[148px] pr-8 mt-1.5">
                          <p className="text-xs text-[#68736D] leading-relaxed line-clamp-2">
                            {item.summary}
                          </p>
                        </div>
                      </div>

                      {/* Expandable Content for Tablet */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="pb-4 pl-[148px] pr-4">
                              <div className="p-4 bg-[#F4F6F2] rounded-xl border border-[#DEE4DC]">
                                <div className="text-xs font-mono font-semibold uppercase text-[#214A40] mb-2 flex items-center gap-1.5">
                                  <span className="w-2 h-2 rounded-full bg-[#C7E76A]" />
                                  <span>{t("timeline.verifiedPanel")}</span>
                                </div>
                                <ul className="space-y-1.5 mb-3">
                                  {item.details.points.map((pt, idx) => (
                                    <li key={idx} className="text-xs text-[#1D2925] flex items-start gap-2">
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#214A40] mt-1.5 flex-shrink-0" />
                                      <span>{pt}</span>
                                    </li>
                                  ))}
                                </ul>
                                {item.details.tags && (
                                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#DEE4DC]/80">
                                    {item.details.tags.map(tag => (
                                      <span key={tag} className="px-2 py-0.5 rounded bg-[#E9EEE8] text-[#1D2925] font-mono text-[10px]">
                                        #{tag}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* MOBILE VIEW (< 768px) Clean Compact Card Layout                */}
        {/* ============================================================== */}
        <div className="md:hidden relative">
          {/* Continuous vertical timeline spine: starts at Node 1, ends at Node 8 */}
          <div 
            className="absolute left-[16px] w-[1.5px] bg-[#68855C]/35 top-[24px] bottom-[24px] pointer-events-none"
            aria-hidden="true"
          />

          <div className="space-y-6">
            {itemsByYear.map((group) => (
              <div key={group.year} className="relative">
                {/* Year Marker */}
                <div className="flex items-center gap-3 mb-3 pl-1">
                  <div className="w-7 h-7 rounded-full bg-[#214A40] text-[#C7E76A] flex items-center justify-center font-bold text-xs font-mono shadow-xs z-10">
                    {group.year.slice(2)}
                  </div>
                  <span className="font-bold text-lg text-[#1D2925] font-sans">
                    {group.year}
                  </span>
                </div>

                {/* Items in this year */}
                <div className="space-y-3.5 pl-8">
                  {group.items.map((item) => {
                    const isExpanded = expandedId === item.id

                    return (
                      <div
                        key={item.id}
                        className="bg-white rounded-2xl border border-[#DEE4DC] p-4 shadow-xs transition-all"
                      >
                        {/* Period & Category Header */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#F4F6F2] border border-[#DEE4DC] font-mono text-[11px] text-[#214A40] font-medium">
                            {item.period}
                          </span>
                          <span className="text-[10.5px] font-mono text-[#68736D]">
                            {item.category}
                          </span>
                        </div>

                        {/* Title & Organization with Icon */}
                        <div className="flex items-start gap-3 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-[#E9EFE7] flex items-center justify-center shrink-0 mt-0.5">
                            {getIcon(item.iconType)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-sm font-bold text-[#1D2925] leading-snug">
                              {item.title}
                            </h3>
                            <p className="text-xs text-[#68736D] mt-0.5">
                              {item.organization}
                            </p>
                          </div>
                        </div>

                        {/* Summary */}
                        <p className="text-xs text-[#68736D] leading-relaxed mb-3">
                          {item.summary}
                        </p>

                        {/* Mobile Expand Toggle Button */}
                        <button
                          type="button"
                          onClick={() => toggleExpand(item.id)}
                          className="w-full pt-2 border-t border-[#DEE4DC]/70 flex items-center justify-between text-xs font-medium text-[#214A40] cursor-pointer"
                        >
                          <span>{isExpanded ? "Tutup Rincian" : "Lihat Rincian"}</span>
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {/* Expandable Content for Mobile */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="pt-3 space-y-2.5">
                                <ul className="space-y-1.5">
                                  {item.details.points.map((pt, idx) => (
                                    <li key={idx} className="text-xs text-[#1D2925] flex items-start gap-2">
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#214A40] mt-1.5 shrink-0" />
                                      <span>{pt}</span>
                                    </li>
                                  ))}
                                </ul>
                                {item.details.tags && (
                                  <div className="flex flex-wrap gap-1 pt-2 border-t border-[#DEE4DC]/60">
                                    {item.details.tags.map(tag => (
                                      <span key={tag} className="px-1.5 py-0.5 rounded bg-[#E9EEE8] text-[#1D2925] font-mono text-[10px]">
                                        #{tag}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
