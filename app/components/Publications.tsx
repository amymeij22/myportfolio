"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { getPublications } from "@/lib/supabase"
import { RiExternalLinkLine } from "react-icons/ri"
import { useI18n } from "@/lib/i18n"

export interface PublicationItem {
  id: number;
  title: string;
  authors: string[];
  journal: string;
  type?: "Jurnal" | "Konferensi" | string;
  publication_date: string;
  doi?: string;
  abstract: string;
  link: string;
  created_at?: string;
}

export default function Publications() {
  const [selectedPublication, setSelectedPublication] = useState<PublicationItem | null>(null)
  const [publications, setPublications] = useState<PublicationItem[]>([])
  const [loading, setLoading] = useState(true)
  const { t } = useI18n()

  useEffect(() => {
    async function fetchPublications() {
      try {
        const publicationsData = await getPublications()
        setPublications(publicationsData)
      } catch (error) {
        console.error("Error fetching publications:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPublications()
  }, [])

  const formatYear = (dateString: string) => {
    try {
      return new Date(dateString).getFullYear().toString()
    } catch {
      return "2025"
    }
  }

  return (
    <section
      id="riset"
      className="relative isolate py-14 sm:py-18 lg:py-22 bg-[#F4F6F1] border-b border-[#DEE4DC]/80 overflow-hidden"
      aria-labelledby="publications-heading"
    >
      <div id="publications" className="sr-only" aria-hidden="true" />

      {/* Atmospheric Decorative Graphics: Compact Harmonic Spectral Accents with Soft Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Soft Ambient Depth Gradients */}
        <div className="absolute -top-16 -right-16 w-72 sm:w-96 h-72 sm:h-96 bg-[#C7E76A]/[0.06] rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 sm:w-96 h-72 sm:h-96 bg-[#E2ECD8]/35 rounded-full blur-3xl" />

        {/* Top-Right Harmonic Wave Packets (Compact Corner Accent) */}
        <svg
          className="absolute top-4 right-4 sm:top-6 sm:right-8 w-36 sm:w-48 h-20 sm:h-24 text-[#214A40]/12 select-none"
          viewBox="0 0 200 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 25 C40 10, 80 45, 130 20 C165 5, 185 30, 200 15" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M0 50 C45 35, 90 70, 140 45 C170 30, 190 55, 200 40" stroke="currentColor" strokeWidth="1.2" />
          <path d="M0 75 C50 60, 100 95, 150 70 C175 55, 190 80, 200 65" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" />
          <circle cx="130" cy="20" r="2.5" fill="currentColor" fillOpacity="0.4" />
          <circle cx="140" cy="45" r="2" fill="currentColor" fillOpacity="0.3" />
        </svg>

        {/* Bottom-Left Wave Reflection (Compact Corner Accent) */}
        <svg
          className="absolute bottom-4 left-4 sm:bottom-6 sm:left-8 w-32 sm:w-40 h-16 text-[#214A40]/10 select-none hidden lg:block"
          viewBox="0 0 160 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 35 C40 20, 80 60, 160 30" stroke="currentColor" strokeWidth="1.2" />
          <path d="M0 60 C40 45, 80 85, 160 55" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">

        {/* Section Header: Centered Editorial Style */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          {/* Eyebrow */}
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <span
              className="w-7 sm:w-8 h-[2.5px] rounded-full inline-block"
              style={{ backgroundColor: "var(--brand-accent, #C7E76A)" }}
              aria-hidden="true"
            />
            <span className="text-xs sm:text-[13px] font-mono font-semibold tracking-[0.16em] text-[#1D2925] uppercase">
              {t("publications.eyebrow")}
            </span>
          </div>

          {/* Headline with Lime Highlight on 'Riset' */}
          <h2
            id="publications-heading"
            className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#1D2925] tracking-[-0.035em] leading-[1.18] font-sans mb-3 sm:mb-4"
          >
            {t("publications.titlePart1")}
            <span
              className="inline-block px-2.5 sm:px-3 pt-0.5 pb-1 rounded-xl font-bold text-[#1D2925]"
              style={{ backgroundColor: "#DFEBBB" }}
            >
              {t("publications.titleHighlight")}
            </span>
          </h2>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-[#68736D] leading-relaxed font-sans max-w-xl mx-auto">
            {t("publications.subtitle")}
          </p>
        </div>

        {/* Publication Cards Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-24" aria-live="polite">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#214A40] border-t-transparent" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {publications.map((pub, index) => {
              const year = formatYear(pub.publication_date)
              const pubUrl = pub.link || (pub.doi ? `https://doi.org/${pub.doi}` : null)

              return (
                <motion.article
                  key={pub.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.03 }}
                  className="flex flex-col justify-between bg-white rounded-[22px] sm:rounded-[24px] border border-[#DEE4DC] p-5 sm:p-5.5 lg:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(33,74,64,0.06)] hover:border-[#214A40]/30 transition-all duration-300 group"
                >
                  <div>
                    {/* Top Row: Year Pill & Type */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#EBF3DD] text-[#214A40] text-[11px] font-mono font-semibold border border-[#DEEABF]">
                        {year}
                      </span>
                      {pub.type && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#E9EEE8]/80 text-[#1D2925] text-[10.5px] font-mono border border-[#DEE4DC]">
                          {pub.type}
                        </span>
                      )}
                    </div>

                    {/* Publication Title */}
                    <h3 className="text-[15px] sm:text-[16px] font-bold text-[#1D2925] font-sans tracking-tight leading-snug mb-1.5 group-hover:text-[#214A40] transition-colors line-clamp-2 min-h-[2.7rem]">
                      {pub.title}
                    </h3>

                    {/* Publisher / Journal */}
                    <p className="text-xs text-[#68736D] font-sans mb-2.5 line-clamp-1">
                      {pub.journal}
                    </p>

                    {/* Abstract / Summary */}
                    <p className="text-xs text-[#68736D] leading-[1.6] font-sans line-clamp-3 min-h-[3.6rem]">
                      {pub.abstract}
                    </p>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="pt-3.5 border-t border-[#DEE4DC]/80 flex items-center justify-between mt-5 gap-2 text-xs">
                    {/* Primary Action: Baca Detail → */}
                    <button
                      type="button"
                      onClick={() => setSelectedPublication(pub)}
                      className="inline-flex items-center text-xs font-bold text-[#214A40] hover:underline gap-1 group/btn cursor-pointer py-1 truncate"
                      aria-label={`${t("publications.readDetail")} ${pub.title}`}
                    >
                      <span>{t("publications.readDetail")}</span>
                      <span className="transition-transform group-hover/btn:translate-x-0.5" aria-hidden="true">→</span>
                    </button>

                    {/* Secondary Action: Buka / Lihat Publikasi */}
                    {pubUrl ? (
                      <a
                        href={pubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-[#DEE4DC] text-[11px] font-semibold text-[#1D2925] hover:bg-[#E9EEE8]/60 transition-colors inline-flex items-center gap-1 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#214A40]"
                        aria-label={`${t("publications.publication")} ${pub.title}`}
                      >
                        <span>{t("publications.publication")}</span>
                        <RiExternalLinkLine className="w-3 h-3 text-[#1D2925]" aria-hidden="true" />
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setSelectedPublication(pub)}
                        className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-[#DEE4DC] text-[11px] font-semibold text-[#1D2925] hover:bg-[#E9EEE8]/60 transition-colors inline-flex items-center gap-1 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#214A40]"
                        aria-label={`${t("publications.details")} ${pub.title}`}
                      >
                        <span>{t("publications.details")}</span>
                        <RiExternalLinkLine className="w-3 h-3 text-[#1D2925]" aria-hidden="true" />
                      </button>
                    )}
                  </div>

                </motion.article>
              )
            })}
          </div>
        )}

      </div>

      {/* Publication Abstract & Details Modal */}
      <Dialog open={!!selectedPublication} onOpenChange={() => setSelectedPublication(null)}>
        {selectedPublication && (
          <DialogContent className="dialog-content max-w-2xl w-[calc(100%-2rem)] max-h-[90svh] overflow-y-auto scrollbar-none bg-white border border-[#DEE4DC] p-6 sm:p-8 rounded-[24px] shadow-2xl">
            <DialogHeader className="border-b border-[#DEE4DC]/80 pb-4 text-left">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#EBF5D5] text-[#214A40] text-xs font-mono font-semibold border border-[#DEEABF]">
                  {formatYear(selectedPublication.publication_date)}
                </span>
                {selectedPublication.type && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#E9EEE8] text-[#1D2925] text-xs font-mono border border-[#DEE4DC]">
                    {selectedPublication.type}
                  </span>
                )}
              </div>
              <DialogTitle className="text-lg sm:text-xl font-bold text-[#1D2925] font-sans leading-snug">
                {selectedPublication.title}
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm text-[#68736D] pt-1 font-sans">
                {selectedPublication.journal}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto scrollbar-none pr-1 text-sm pt-2">
              <div>
                <h4 className="text-xs font-mono font-semibold uppercase text-[#1D2925] mb-1 tracking-wider">
                  {t("publications.dialog.authors")}
                </h4>
                <p className="text-xs sm:text-sm font-medium text-[#1D2925]/90">
                  {Array.isArray(selectedPublication.authors)
                    ? selectedPublication.authors.join(", ")
                    : selectedPublication.authors}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono font-semibold uppercase text-[#1D2925] mb-1 tracking-wider">
                  {t("publications.dialog.abstract")}
                </h4>
                <p className="text-xs sm:text-sm text-[#68736D] leading-relaxed text-justify">
                  {selectedPublication.abstract}
                </p>
              </div>

              {selectedPublication.doi && (
                <div className="p-3.5 rounded-xl bg-[#E9EEE8]/50 border border-[#DEE4DC]">
                  <h4 className="text-xs font-mono font-semibold uppercase text-[#1D2925] mb-1 tracking-wider">
                    {t("publications.dialog.doi")}
                  </h4>
                  <a
                    href={`https://doi.org/${selectedPublication.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-[#214A40] font-medium hover:underline break-all inline-flex items-center gap-1.5"
                  >
                    <span>https://doi.org/{selectedPublication.doi}</span>
                    <RiExternalLinkLine className="w-3 h-3 shrink-0" />
                  </a>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#DEE4DC]/80 flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedPublication(null)}
                className="text-xs font-medium rounded-lg border-[#DEE4DC] text-[#1D2925] hover:bg-[#E9EEE8]/60"
              >
                {t("publications.dialog.close")}
              </Button>
              {(selectedPublication.link || selectedPublication.doi) && (
                <Button
                  size="sm"
                  onClick={() => window.open(selectedPublication.link || `https://doi.org/${selectedPublication.doi}`, "_blank")}
                  className="text-xs font-medium bg-[#214A40] text-white hover:bg-[#214A40]/90 rounded-lg flex items-center gap-1.5"
                >
                  <span>{t("publications.dialog.openDoc")}</span>
                  <RiExternalLinkLine className="w-3.5 h-3.5" />
                </Button>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  )
}
