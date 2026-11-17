"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { getLatestBlogs } from "@/lib/supabase"
import { RiCalendarLine } from "react-icons/ri"
import { useI18n } from "@/lib/i18n"

export interface BlogPostItem {
  id: number;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  image_url: string;
  content?: string;
  blog_categories?: {
    name: string;
    slug: string;
  };
}

export default function Blog() {
  const [latestBlogs, setLatestBlogs] = useState<BlogPostItem[]>([])
  const [loading, setLoading] = useState(true)
  const { locale, t, getHref } = useI18n()

  useEffect(() => {
    async function fetchLatestBlogs() {
      try {
        const blogs = await getLatestBlogs(4)
        setLatestBlogs(blogs)
      } catch (error) {
        console.error("Error fetching latest blogs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLatestBlogs()
  }, [])

  const formatDate = (dateStr: string) => {
    if (!dateStr) return ""
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return dateStr

    if (locale === "en") {
      return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric"
      })
    }

    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ]
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
  }

  // Do not render empty blog section per DESIGN.md
  if (!loading && latestBlogs.length === 0) {
    return null
  }

  return (
    <section 
      id="blog" 
      className="relative isolate py-14 sm:py-18 lg:py-22 bg-[#F4F6F1] border-b border-[#DEE4DC]/80 overflow-hidden"
      aria-labelledby="blog-heading"
    >
      <div id="catatan" className="sr-only" aria-hidden="true" />

      {/* Atmospheric Decorative Graphics: Compact Knowledge Network Accents with Soft Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Soft Ambient Depth Gradients */}
        <div className="absolute -top-16 -right-16 w-72 sm:w-96 h-72 sm:h-96 bg-[#C7E76A]/[0.06] rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 sm:w-96 h-72 sm:h-96 bg-[#E2ECD8]/35 rounded-full blur-3xl" />

        {/* Top-Right Knowledge Mesh & Idea Graph Nodes (Compact Corner Accent) */}
        <svg 
          className="absolute top-4 right-4 sm:top-6 sm:right-8 w-32 sm:w-44 h-20 sm:h-24 text-[#214A40]/12 select-none" 
          viewBox="0 0 180 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Knowledge Connection Arcs */}
          <path d="M20 70 C60 20, 110 30, 160 50" stroke="currentColor" strokeWidth="1.2" />
          <path d="M50 85 C90 40, 140 20, 180 40" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M80 30 C120 60, 150 70, 180 50" stroke="currentColor" strokeWidth="1" />

          {/* Thought Nodes */}
          <circle cx="80" cy="30" r="2.5" fill="currentColor" fillOpacity="0.5" />
          <circle cx="160" cy="50" r="2.5" fill="currentColor" fillOpacity="0.5" />
          <circle cx="120" cy="60" r="2" fill="currentColor" fillOpacity="0.4" />
          <line x1="80" y1="30" x2="120" y2="60" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" strokeOpacity="0.5" />
        </svg>

        {/* Bottom-Left Discourse Flow Arcs (Compact Corner Accent) */}
        <svg 
          className="absolute bottom-4 left-4 sm:bottom-6 sm:left-8 w-28 sm:w-36 h-16 text-[#214A40]/10 select-none hidden lg:block" 
          viewBox="0 0 140 70" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 45 C40 20, 80 60, 140 35" stroke="currentColor" strokeWidth="1.2" />
          <path d="M0 65 C40 40, 90 75, 140 55" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="80" cy="60" r="2" fill="currentColor" fillOpacity="0.4" />
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
              {t("blog.eyebrow")}
            </span>
          </div>

          {/* Headline with Lime Highlight on 'Gagasan' */}
          <h2 
            id="blog-heading"
            className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#1D2925] tracking-[-0.035em] leading-[1.18] font-sans mb-3 sm:mb-4"
          >
            {t("blog.titlePart1")}
            <span 
              className="inline-block px-2.5 sm:px-3 pt-0.5 pb-1 rounded-xl font-bold text-[#1D2925]"
              style={{ backgroundColor: "#DFEBBB" }}
            >
              {t("blog.titleHighlight")}
            </span>
          </h2>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-[#68736D] leading-relaxed font-sans max-w-xl mx-auto">
            {t("blog.subtitle")}
          </p>
        </div>

        {/* Article Cards Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-24" aria-live="polite">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#214A40] border-t-transparent" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {latestBlogs.map((blog, index) => {
              const categoryName = blog.blog_categories?.name || "Teknologi"
              const blogHref = getHref(`/blog/${blog.id}`)

              return (
                <motion.article
                  key={blog.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.03 }}
                  className="flex flex-col justify-between bg-white rounded-[20px] sm:rounded-[24px] border border-[#DEE4DC] overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(33,74,64,0.08)] hover:border-[#214A40]/30 transition-all duration-300 group h-full"
                >
                  <div className="flex flex-col flex-1">
                    {/* Thumbnail Image */}
                    <Link href={blogHref} className="block relative w-full aspect-[16/10] overflow-hidden bg-[#E9EEE8]/40 border-b border-[#DEE4DC]/40">
                      {blog.image_url ? (
                        <Image
                          src={blog.image_url}
                          alt={blog.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#68736D] text-xs font-mono">
                          {t("blog.preview")}
                        </div>
                      )}
                    </Link>

                    {/* Card Content Body */}
                    <div className="p-4 sm:p-5 flex flex-col flex-1 pb-3">
                      {/* Category Badge */}
                      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#EBF5D5] text-[#214A40] text-[11px] font-medium font-sans w-fit mb-2 sm:mb-2.5 border border-[#DEEABF]/80">
                        <span>{categoryName}</span>
                      </div>

                      {/* Article Title */}
                      <h3 className="text-[15px] sm:text-[16px] font-bold text-[#1D2925] font-sans tracking-tight mb-2 group-hover:text-[#214A40] transition-colors leading-snug line-clamp-2 min-h-[2.6rem]">
                        <Link href={blogHref} className="hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#214A40] rounded">
                          {blog.title}
                        </Link>
                      </h3>

                      {/* Excerpt */}
                      <p className="text-xs sm:text-[12.5px] text-[#68736D] leading-relaxed font-sans line-clamp-3 min-h-[3.3rem] mb-2 sm:mb-3">
                        {blog.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="px-4 sm:px-5 py-3 sm:py-3.5 border-t border-[#DEE4DC]/80 flex items-center justify-between text-xs mt-auto">
                    {/* Primary Link: Baca Artikel → */}
                    <Link
                      href={blogHref}
                      className="inline-flex items-center font-bold text-xs text-[#214A40] hover:underline gap-1 group/link truncate"
                      aria-label={`${t("blog.readArticle")} ${blog.title}`}
                    >
                      <span>{t("blog.readArticle")}</span>
                      <span className="transition-transform group-hover/link:translate-x-0.5" aria-hidden="true">→</span>
                    </Link>

                    {/* Publication Date */}
                    <span className="text-[#68736D] font-sans text-[11px] sm:text-xs flex items-center gap-1.5 shrink-0">
                      <RiCalendarLine className="w-3.5 h-3.5 text-[#68736D]" aria-hidden="true" />
                      <span>{formatDate(blog.date)}</span>
                    </span>
                  </div>

                </motion.article>
              )
            })}
          </div>
        )}

        {/* Bottom CTA: Lihat Semua Artikel */}
        <div className="flex justify-center mt-12 sm:mt-14">
          <Link
            href={getHref("/blog")}
            className="inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 rounded-full border border-[#214A40] text-xs sm:text-[13px] font-semibold text-[#1D2925] hover:bg-[#E9EEE8]/70 hover:text-[#214A40] transition-all duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#214A40] group"
          >
            <span>{t("blog.viewAll")}</span>
            <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
          </Link>
        </div>

      </div>
    </section>
  )
}
