"use client"

import { motion } from "framer-motion"
import { useI18n } from "@/lib/i18n"

export default function Marquee() {
  const { tRaw } = useI18n()
  const metrics = tRaw<string[]>("marquee", [
    "15+ Publikasi Ilmiah",
    "S. Tr. Instrumentasi MKG",
    "System Engineer",
    "JEJAK",
    "Cum Laude",
    "STMKG",
    "PET",
    "Karya Cipta Madya",
    "5+ Hak Cipta",
    "BMKG"
  ])

  return (
    <div 
      className="relative w-full overflow-hidden bg-[#E9EEE8]/50 border-y border-[#DEE4DC]/80 py-4 select-none"
      role="region"
      aria-label="Key Metrics and Highlights"
    >
      <div className="flex whitespace-nowrap overflow-hidden">
        <motion.div
          className="flex items-center gap-8 shrink-0 text-xs sm:text-sm font-mono tracking-wide text-foreground"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 32 }}
        >
          {/* Double list for continuous seamless loop */}
          {[...metrics, ...metrics].map((item, index) => (
            <div key={index} className="flex items-center gap-8">
              <span className="font-medium text-foreground/90">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
