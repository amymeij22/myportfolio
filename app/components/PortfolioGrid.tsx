"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { getProjects } from "@/lib/supabase"
import { useI18n } from "@/lib/i18n"
import {
  Monitor,
  Wrench,
  LayoutGrid,
  Radio,
  Cpu,
  FileText,
  ExternalLink
} from "lucide-react"
import { RiGithubLine } from "react-icons/ri"

export interface ProjectItem {
  id: number;
  title: string;
  caption?: string;
  description: string;
  problem?: string;
  contribution?: string;
  outcome?: string;
  image_url: string;
  category: string;
  demo_url?: string;
  github_url?: string;
  featured?: boolean;
  tags?: string[];
  created_at?: string;
}

interface FilterCategory {
  id: string;
  labelKey: string;
  icon?: React.ComponentType<{ className?: string }>;
  matchValues: string[];
}

const FILTER_CATEGORIES: FilterCategory[] = [
  { id: "all", labelKey: "portfolio.filters.all", matchValues: ["All", "Semua"] },
  { id: "website", labelKey: "portfolio.filters.website", icon: Monitor, matchValues: ["Website", "Sistem Web", "WebGIS & Otomasi"] },
  { id: "tools", labelKey: "portfolio.filters.tools", icon: Wrench, matchValues: ["Tools", "Applied AI"] },
  { id: "other", labelKey: "portfolio.filters.other", icon: LayoutGrid, matchValues: ["Other", "Lainnya", "Sistem Operasional"] },
  { id: "iot", labelKey: "portfolio.filters.iot", icon: Radio, matchValues: ["IoT", "Instrumentasi & IoT"] },
  { id: "microcontroller", labelKey: "portfolio.filters.microcontroller", icon: Cpu, matchValues: ["Microcontroller", "Mikrokontroler"] },
]

export default function PortfolioGrid() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [modalOpen, setModalOpen] = useState(false)
  const [currentProject, setCurrentProject] = useState<ProjectItem | null>(null)
  const [projects, setProjects] = useState<ProjectItem[]>([])
  const [loading, setLoading] = useState(true)
  const { t } = useI18n()

  useEffect(() => {
    async function fetchProjects() {
      try {
        const projectsData = await getProjects()
        setProjects(projectsData)
      } catch (error) {
        console.error("Error fetching projects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Filter projects by matching category values
  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter((project) => {
      const activeCategory = FILTER_CATEGORIES.find((cat) => cat.id === activeFilter)
      if (!activeCategory) return true
      return activeCategory.matchValues.some(
        (val) => val.toLowerCase() === (project.category || "").toLowerCase()
      )
    })

  const openProjectModal = (project: ProjectItem) => {
    setCurrentProject(project)
    setModalOpen(true)
  }

  // Get icon for card category badge
  const getCategoryIcon = (category: string) => {
    const catLower = (category || "").toLowerCase()
    if (catLower.includes("website") || catLower.includes("web")) return Monitor
    if (catLower.includes("tool") || catLower.includes("ai")) return Wrench
    if (catLower.includes("iot") || catLower.includes("radio")) return Radio
    if (catLower.includes("micro") || catLower.includes("mikro")) return Cpu
    return LayoutGrid
  }

  return (
    <section
      id="karya"
      className="relative isolate py-14 sm:py-18 lg:py-22 bg-[#F7F7F2] border-b border-[#DEE4DC]/80 overflow-hidden"
      aria-labelledby="projects-heading"
    >
      <div id="projects" className="sr-only" aria-hidden="true" />

      {/* Decorative Topographic & Geodetic Vector Mesh: Compact with Soft Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Soft Ambient Depth Gradients */}
        <div className="absolute -top-16 -left-16 w-72 sm:w-96 h-72 sm:h-96 bg-[#E2ECD8]/35 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-72 sm:w-96 h-72 sm:h-96 bg-[#C7E76A]/[0.06] rounded-full blur-3xl" />

        {/* Top-Right Topographic Elevation Contours (Compact Corner Watermark) */}
        <svg
          className="absolute top-4 right-4 sm:top-6 sm:right-8 w-36 sm:w-48 h-24 sm:h-28 text-[#214A40]/12 select-none"
          viewBox="0 0 200 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 20 C70 10, 130 50, 200 25" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M0 45 C80 25, 140 75, 200 50" stroke="currentColor" strokeWidth="1.2" />
          <path d="M10 75 C90 55, 150 100, 200 75" stroke="currentColor" strokeWidth="1" />
          <path d="M30 105 C110 85, 160 115, 200 100" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 3" />
          <circle cx="120" cy="40" r="2.5" fill="currentColor" fillOpacity="0.4" />
          <line x1="115" y1="40" x2="125" y2="40" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.5" />
          <line x1="120" y1="35" x2="120" y2="45" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.5" />
        </svg>

        {/* Bottom-Left Contour Sweep (Compact Corner Accent) */}
        <svg
          className="absolute bottom-4 left-4 sm:bottom-6 sm:left-8 w-32 sm:w-40 h-20 text-[#214A40]/10 select-none hidden lg:block"
          viewBox="0 0 160 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 35 C50 15, 100 65, 160 35" stroke="currentColor" strokeWidth="1.2" />
          <path d="M0 65 C60 45, 110 85, 160 65" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">

        {/* Section Header: Centered Editorial Style */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          {/* Eyebrow */}
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <span
              className="w-7 sm:w-8 h-[2.5px] rounded-full inline-block"
              style={{ backgroundColor: "var(--brand-accent, #C7E76A)" }}
              aria-hidden="true"
            />
            <span className="text-xs sm:text-[13px] font-mono font-semibold tracking-[0.16em] text-[#1D2925] uppercase">
              {t("portfolio.eyebrow")}
            </span>
          </div>

          {/* Headline with Lime Highlight on 'Proyek' */}
          <h2
            id="projects-heading"
            className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#1D2925] tracking-[-0.035em] leading-[1.18] font-sans mb-3 sm:mb-4"
          >
            {t("portfolio.titlePart1")}
            <span
              className="inline-block px-2.5 sm:px-3 pt-0.5 pb-1 rounded-xl font-bold text-[#1D2925]"
              style={{ backgroundColor: "#DFEBBB" }}
            >
              {t("portfolio.titleHighlight")}
            </span>
          </h2>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-[#68736D] leading-relaxed font-sans max-w-xl mx-auto">
            {t("portfolio.subtitle")}
          </p>
        </div>

        {/* Category Filters (Wrapping Pill Buttons, Elegant Flow) */}
        <div
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10 sm:mb-12"
          role="tablist"
          aria-label={t("portfolio.eyebrow")}
        >
          {FILTER_CATEGORIES.map((category) => {
            const Icon = category.icon
            const isActive = activeFilter === category.id

            return (
              <button
                key={category.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(category.id)}
                className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#214A40] ${isActive
                  ? "bg-[#214A40] text-white border-[#214A40] shadow-2xs font-semibold"
                  : "bg-white text-[#1D2925] border-[#DEE4DC] hover:bg-[#E9EEE8] hover:border-[#CBD8C7]"
                  }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" aria-hidden="true" />}
                <span>{t(category.labelKey)}</span>
              </button>
            )
          })}
        </div>

        {/* Grid or Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center py-24" aria-live="polite">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#214A40] border-t-transparent" />
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-5.5 lg:gap-5 xl:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => {
                const CategoryIcon = getCategoryIcon(project.category)
                const hasValidDemo = Boolean(project.demo_url && project.demo_url !== "#")

                return (
                  <motion.article
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.32, delay: index * 0.03 }}
                    className="flex flex-col justify-between bg-white rounded-[20px] sm:rounded-[22px] border border-[#DEE4DC] overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(33,74,64,0.08)] hover:border-[#214A40]/30 transition-all duration-300 group"
                  >
                    <div>
                      {/* Project Thumbnail with elegant 16:10 ratio */}
                      <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#E9EEE8]/40">
                        {project.image_url ? (
                          <Image
                            src={project.image_url}
                            alt={project.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#68736D] text-xs font-mono">
                            {t("portfolio.preview")}
                          </div>
                        )}
                      </div>

                      {/* Card Content Body */}
                      <div className="p-4 sm:p-5 lg:p-5 pb-2">
                        {/* Category Badge with Icon */}
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EBF5D5] text-[#214A40] text-[11px] font-medium font-sans w-fit mb-2.5 border border-[#DEEABF]/80">
                          <CategoryIcon className="w-3 h-3 shrink-0 text-[#214A40]" aria-hidden="true" />
                          <span>{project.category}</span>
                        </div>

                        {/* Project Title */}
                        <h3 className="text-[15px] sm:text-[16px] lg:text-[16.5px] font-bold text-[#1D2925] font-sans tracking-tight mb-1.5 group-hover:text-[#214A40] transition-colors leading-snug line-clamp-1">
                          {project.title}
                        </h3>

                        {/* Project Description with uniform 2-line height */}
                        <p className="text-xs lg:text-[12.5px] text-[#68736D] leading-relaxed font-sans line-clamp-2 min-h-[2.4rem]">
                          {project.caption || project.description}
                        </p>
                      </div>
                    </div>

                    {/* Card Actions Footer */}
                    <div className="px-4 sm:px-5 py-3 sm:py-3.5 border-t border-[#DEE4DC]/80 flex items-center justify-between text-xs mt-auto">
                      {/* Primary Link: Lihat Proyek → */}
                      {hasValidDemo ? (
                        <a
                          href={project.demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center font-semibold text-[#214A40] hover:underline gap-1 group/link"
                          aria-label={`${t("portfolio.viewProject")} ${project.title}`}
                        >
                          <span>{t("portfolio.viewProject")}</span>
                          <span className="transition-transform group-hover/link:translate-x-0.5" aria-hidden="true">→</span>
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => openProjectModal(project)}
                          className="inline-flex items-center font-semibold text-[#214A40] hover:underline gap-1 group/link cursor-pointer"
                          aria-label={`${t("portfolio.viewProject")} ${project.title}`}
                        >
                          <span>{t("portfolio.viewProject")}</span>
                          <span className="transition-transform group-hover/link:translate-x-0.5" aria-hidden="true">→</span>
                        </button>
                      )}

                      {/* Secondary Link: Detail */}
                      <button
                        type="button"
                        onClick={() => openProjectModal(project)}
                        className="inline-flex items-center gap-1.5 text-[#68736D] hover:text-[#1D2925] font-medium transition-colors py-1 px-1.5 sm:px-2 rounded-lg hover:bg-[#E9EEE8]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#214A40]"
                        aria-label={`${t("portfolio.details")} ${project.title}`}
                      >
                        <span>{t("portfolio.details")}</span>
                        <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>

                  </motion.article>
                )
              })}
            </AnimatePresence>
          </motion.div>
        )}

      </div>

      {/* Project Details Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="dialog-content max-w-2xl w-[calc(100%-2rem)] max-h-[90svh] overflow-y-auto scrollbar-none bg-white border border-[#DEE4DC] p-6 sm:p-8 rounded-[24px] shadow-xl">
          {currentProject && (
            <div className="space-y-6">

              <DialogHeader className="border-b border-[#DEE4DC]/80 pb-4 text-left">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="font-mono text-xs border-[#DEE4DC] text-[#1D2925] bg-[#E9EEE8]/60">
                    {currentProject.category}
                  </Badge>
                  {currentProject.featured && (
                    <span className="text-xs font-mono text-[#1D2925] bg-[#EBF5D5] px-2.5 py-0.5 rounded-full font-medium border border-[#DEEABF]">
                      {t("portfolio.dialog.featured")}
                    </span>
                  )}
                </div>
                <DialogTitle className="text-xl sm:text-2xl font-bold text-[#1D2925] font-sans">
                  {currentProject.title}
                </DialogTitle>
                {currentProject.caption && (
                  <DialogDescription className="text-sm text-[#68736D] pt-1 font-sans text-justify">
                    {currentProject.caption}
                  </DialogDescription>
                )}
              </DialogHeader>

              {/* Large Modal Image */}
              {currentProject.image_url && (
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-[#DEE4DC]/80 bg-[#E9EEE8]/30 shadow-sm">
                  <Image
                    src={currentProject.image_url}
                    alt={currentProject.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 640px"
                    className="object-cover object-top"
                  />
                </div>
              )}

              {/* Problem, Contribution, Outcome if available */}
              {(currentProject.problem || currentProject.outcome || currentProject.contribution) && (
                <div className="p-4 rounded-xl bg-[#E9EEE8]/50 border border-[#DEE4DC] text-xs sm:text-sm space-y-2.5 font-sans">
                  {currentProject.problem && (
                    <p className="text-[#1D2925] text-justify leading-relaxed">
                      <span className="font-bold font-mono text-[#214A40]">{t("portfolio.dialog.challenge")} </span>
                      {currentProject.problem}
                    </p>
                  )}
                  {currentProject.contribution && (
                    <p className="text-[#1D2925] text-justify leading-relaxed">
                      <span className="font-bold font-mono text-[#214A40]">{t("portfolio.dialog.contribution")} </span>
                      {currentProject.contribution}
                    </p>
                  )}
                  {currentProject.outcome && (
                    <p className="text-[#1D2925] text-justify leading-relaxed">
                      <span className="font-bold font-mono text-[#214A40]">{t("portfolio.dialog.outcome")} </span>
                      {currentProject.outcome}
                    </p>
                  )}
                </div>
              )}

              {/* Description */}
              <div className="text-xs sm:text-sm text-[#68736D] leading-relaxed font-sans space-y-2">
                <h4 className="text-xs font-mono font-semibold text-[#1D2925] uppercase tracking-wider">
                  {t("portfolio.dialog.description")}
                </h4>
                <p className="text-[#1D2925]/90 leading-relaxed text-justify">
                  {currentProject.description}
                </p>
              </div>

              {/* GitHub Link if available */}
              {currentProject.github_url && (
                <div className="flex items-center gap-2 pt-2 border-t border-[#DEE4DC]/60 text-xs font-mono">
                  <span className="text-[#68736D]">{t("portfolio.dialog.repository")}</span>
                  <a
                    href={currentProject.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#214A40] font-medium hover:underline inline-flex items-center gap-1.5"
                  >
                    <RiGithubLine className="w-4 h-4 text-[#214A40]" />
                    <span>{t("portfolio.dialog.github")}</span>
                    <ExternalLink className="w-3 h-3 text-[#214A40]" />
                  </a>
                </div>
              )}

              {/* Modal Footer Actions */}
              <div className="pt-4 border-t border-[#DEE4DC]/80 flex items-center justify-end gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setModalOpen(false)}
                  className="rounded-lg text-xs border-[#DEE4DC] text-[#1D2925] hover:bg-[#E9EEE8]/60"
                >
                  {t("portfolio.dialog.close")}
                </Button>

                {currentProject.demo_url && currentProject.demo_url !== "#" && (
                  <Button
                    size="sm"
                    onClick={() => window.open(currentProject.demo_url, "_blank")}
                    className="bg-[#214A40] text-white hover:bg-[#214A40]/90 rounded-lg text-xs flex items-center gap-1.5"
                  >
                    <span>{t("portfolio.dialog.openProject")}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                )}
              </div>

            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
