"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeftIcon } from "lucide-react"
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

interface BlogListClientProps {
  initialBlogs: BlogPostItem[];
}

export default function BlogListClient({ initialBlogs }: BlogListClientProps) {
  const { locale, t, getHref } = useI18n()
  const allCategoryLabel = t("blog.allCategories")
  const [activeCategory, setActiveCategory] = useState(allCategoryLabel)
  const [allBlogs] = useState<BlogPostItem[]>(initialBlogs)

  // Extract unique categories
  const categories = useMemo(() => {
    return [
      allCategoryLabel,
      ...Array.from(new Set(allBlogs.map((b) => b.blog_categories?.name || "Teknologi"))),
    ]
  }, [allBlogs, allCategoryLabel])

  // Filter blog based on activeCategory
  const filteredBlogs = useMemo(() => {
    if (activeCategory === allCategoryLabel || activeCategory === "Semua" || activeCategory === "All") {
      return allBlogs
    }
    return allBlogs.filter(
      (blog) => (blog.blog_categories?.name || "Teknologi") === activeCategory
    )
  }, [activeCategory, allBlogs, allCategoryLabel])

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return dateString

    if (locale === "en") {
      return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    }

    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <div className="relative isolate overflow-hidden bg-[#F7F7F2] min-h-screen flex flex-col pt-24 pb-16 sm:pt-28 sm:pb-20">
      {/* Atmospheric Decorative Graphics: Subtle Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-16 -right-16 w-72 sm:w-96 h-72 sm:h-96 bg-[#C7E76A]/[0.06] rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 sm:w-96 h-72 sm:h-96 bg-[#E2ECD8]/35 rounded-full blur-3xl" />

        {/* Top-Right Technical Corner Watermark */}
        <svg 
          className="absolute top-6 right-6 sm:top-8 sm:right-10 w-36 sm:w-44 h-24 text-[#214A40]/10 select-none" 
          viewBox="0 0 180 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 70 C60 20, 110 30, 160 50" stroke="currentColor" strokeWidth="1.2" />
          <path d="M50 85 C90 40, 140 20, 180 40" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="80" cy="30" r="2.5" fill="currentColor" fillOpacity="0.5" />
          <circle cx="160" cy="50" r="2.5" fill="currentColor" fillOpacity="0.5" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Back to Home Button */}
        <div className="mb-6">
          <Link
            href={getHref("/")}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium text-[#1D2925] border border-[#DEE4DC] bg-white hover:bg-[#214A40] hover:text-white hover:border-[#214A40] transition-all duration-200 shadow-2xs group cursor-pointer w-fit"
            aria-label={t("blog.backHome")}
          >
            <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>{t("blog.backHome")}</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 mb-3">
            <span className="w-6 h-1 rounded-full bg-[#C7E76A]" />
            <span className="font-mono text-xs font-semibold tracking-[0.16em] uppercase text-[#1D2925]">
              {t("blog.eyebrow")}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1D2925] tracking-tight leading-tight mb-3 font-sans">
            {t("blog.allArticles")}
            <span 
              className="inline-block px-2.5 sm:px-3 pt-0.5 pb-1 rounded-xl font-bold text-[#1D2925]"
              style={{ backgroundColor: "#DFEBBB" }}
            >
              {t("blog.titleHighlight")}
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-base lg:text-[17px] text-[#68736D] leading-relaxed">
            {t("blog.allArticlesSubtitle")}
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-10 sm:mb-12">
          {categories.map((category) => {
            const isSelected = activeCategory === category
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-[#214A40] text-white border border-[#214A40] shadow-2xs font-semibold"
                    : "bg-white text-[#1D2925] border border-[#DEE4DC] hover:bg-[#E9EEE8] hover:border-[#CBD8C7]"
                }`}
              >
                {category}
              </button>
            )
          })}
        </div>

        {/* 4-Column Article Cards Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-12">
          <AnimatePresence mode="popLayout">
            {filteredBlogs.map((blog, index) => {
              const categoryName = blog.blog_categories?.name || "Teknologi"
              const blogHref = getHref(`/blog/${blog.id}`)

              return (
                <motion.article
                  key={blog.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  className="flex flex-col justify-between bg-white rounded-[20px] sm:rounded-[24px] border border-[#DEE4DC] overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(33,74,64,0.08)] hover:border-[#214A40]/30 transition-all duration-300 group h-full"
                >
                  <div className="flex flex-col flex-1">
                    {/* Thumbnail Image with Consistent 16:10 Aspect Ratio */}
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
                      <h2 className="text-[15px] sm:text-[16px] font-bold text-[#1D2925] font-sans tracking-tight mb-2 group-hover:text-[#214A40] transition-colors leading-snug line-clamp-2 min-h-[2.6rem]">
                        <Link href={blogHref} className="hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#214A40] rounded">
                          {blog.title}
                        </Link>
                      </h2>

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
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#DEE4DC] p-8 max-w-md mx-auto shadow-xs">
            <p className="text-base font-semibold text-[#1D2925] mb-1">{t("blog.emptyTitle")}</p>
            <p className="text-sm text-[#68736D]">{t("blog.emptySubtitle")}</p>
          </div>
        )}
      </div>
    </div>
  )
}
