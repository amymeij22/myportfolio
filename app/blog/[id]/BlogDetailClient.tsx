"use client"

import React from "react"
import Link from "next/link"
import { ArrowLeftIcon, ArrowRightIcon, Share2Icon, CalendarIcon, UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { FaWhatsapp, FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa"
import { Separator } from "@/components/ui/separator"
import { useI18n } from "@/lib/i18n"

export interface BlogPostDetail {
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

interface BlogDetailClientProps {
  blog: BlogPostDetail;
  latestBlogs: BlogPostDetail[];
  prevBlog: BlogPostDetail | null;
  nextBlog: BlogPostDetail | null;
}

export default function BlogDetailClient({
  blog,
  latestBlogs,
  prevBlog,
  nextBlog,
}: BlogDetailClientProps) {
  const { locale, t, getHref } = useI18n()

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

  const handleShare = (platform: string) => {
    if (typeof window === "undefined") return
    const url = window.location.href
    const text = encodeURIComponent(
      locale === "en"
        ? `Read article "${blog.title}" by ${blog.author}`
        : `Baca artikel "${blog.title}" oleh ${blog.author}`
    )

    let shareUrl = ""
    switch (platform) {
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
        break
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`
        break
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <div className="relative isolate overflow-hidden bg-[#F7F7F2] pt-24 pb-16 sm:pt-28 sm:pb-20 min-h-screen flex flex-col items-center px-4">
      {/* Atmospheric Decorative Graphics: Subtle Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-16 -right-16 w-72 sm:w-96 h-72 sm:h-96 bg-[#C7E76A]/[0.06] rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 sm:w-96 h-72 sm:h-96 bg-[#E2ECD8]/35 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href={getHref("/blog")}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium text-[#1D2925] border border-[#DEE4DC] bg-white hover:bg-[#214A40] hover:text-white hover:border-[#214A40] transition-all duration-200 shadow-2xs group cursor-pointer w-fit"
            aria-label={t("blog.backBlog")}
          >
            <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>{t("blog.backBlog")}</span>
          </Link>

          {/* Share Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-xl border-[#DEE4DC] bg-white text-[#1D2925] hover:bg-[#214A40] hover:text-white hover:border-[#214A40] transition-all duration-200 flex items-center gap-2 shadow-2xs cursor-pointer"
              >
                <Share2Icon className="h-4 w-4" />
                <span className="hidden sm:inline text-xs font-medium">{t("blog.share")}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleShare("whatsapp")} className="cursor-pointer">
                <FaWhatsapp className="mr-2 text-green-500" />
                <span>WhatsApp</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare("linkedin")} className="cursor-pointer">
                <FaLinkedin className="mr-2 text-blue-600" />
                <span>LinkedIn</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare("facebook")} className="cursor-pointer">
                <FaFacebook className="mr-2 text-blue-800" />
                <span>Facebook</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare("twitter")} className="cursor-pointer">
                <FaTwitter className="mr-2 text-blue-400" />
                <span>Twitter / X</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Layout Grid: Content & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-8">
            <div className="mb-8">
              <div className="relative w-full h-[280px] sm:h-[360px] md:h-[420px] overflow-hidden rounded-[24px] sm:rounded-[28px] border border-[#DEE4DC] shadow-sm mb-6 bg-[#E9EEE8]/40">
                <img
                  src={blog.image_url}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#EBF5D5] text-[#214A40] text-xs font-mono font-semibold border border-[#DEEABF]">
                  {blog.blog_categories?.name || "Teknologi"}
                </span>
                <span className="text-xs sm:text-sm text-[#68736D] flex items-center font-sans">
                  <CalendarIcon className="h-3.5 w-3.5 mr-1 text-[#68736D]" />
                  {formatDate(blog.date)}
                </span>
                <span className="text-xs sm:text-sm text-[#68736D] flex items-center font-sans">
                  <UserIcon className="h-3.5 w-3.5 mr-1 text-[#68736D]" />
                  {blog.author}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold mb-6 text-[#1D2925] leading-tight font-sans tracking-tight">
                {blog.title}
              </h1>
            </div>

            <article className="prose prose-sm sm:prose lg:prose-lg max-w-none mb-12 text-justify text-[#1D2925] leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: blog.content || "" }} />
            </article>
          </div>

          {/* Sidebar Column - Desktop */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-24">
              <div className="rounded-[22px] border border-[#DEE4DC] p-6 bg-white shadow-2xs">
                <h3 className="text-lg font-bold text-[#1D2925] mb-4 font-sans tracking-tight">{t("blog.latestArticles")}</h3>
                <div className="space-y-1">
                  {latestBlogs.length > 0 ? (
                    latestBlogs.map((item, index) => (
                      <React.Fragment key={item.id}>
                        <Link href={getHref(`/blog/${item.id}`)} className="block group py-3">
                          <div className="flex flex-col">
                            <h4 className="font-semibold text-sm leading-snug mb-1 group-hover:text-[#214A40] transition-colors line-clamp-2 text-[#1D2925]">
                              {item.title}
                            </h4>
                            <div className="flex items-center justify-between text-xs text-[#68736D]">
                              <span className="flex items-center">
                                <UserIcon className="h-3 w-3 mr-1" />
                                {item.author}
                              </span>
                              <span className="flex items-center">
                                <CalendarIcon className="h-3 w-3 mr-1" />
                                {formatDate(item.date)}
                              </span>
                            </div>
                          </div>
                        </Link>
                        {index < latestBlogs.length - 1 && <Separator className="bg-[#DEE4DC]/80" />}
                      </React.Fragment>
                    ))
                  ) : (
                    <p className="text-[#68736D] text-xs">{t("blog.noLatest")}</p>
                  )}
                </div>
              </div>

              <div className="rounded-[22px] border border-[#DEE4DC] p-6 bg-white shadow-2xs mt-6">
                <h3 className="text-lg font-bold text-[#1D2925] mb-3 font-sans tracking-tight">{t("blog.categories")}</h3>
                <div className="flex flex-wrap gap-2">
                  <Link href={getHref("/blog")}>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border border-[#DEE4DC] bg-white text-[#1D2925] hover:bg-[#E9EEE8] transition-colors cursor-pointer">
                      {t("blog.allCategories")}
                    </span>
                  </Link>
                  {blog.blog_categories && (
                    <Link href={getHref("/blog")}>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border border-[#DEEABF] bg-[#EBF5D5] text-[#214A40] hover:bg-[#DFEBBB] transition-colors cursor-pointer">
                        {blog.blog_categories.name}
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Prev & Next */}
        <div className="w-full mt-12 border-t border-[#DEE4DC]/80 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prevBlog ? (
              <Link href={getHref(`/blog/${prevBlog.id}`)} className="group">
                <div className="flex flex-col space-y-2 border border-[#DEE4DC] rounded-xl p-4 bg-white hover:border-[#214A40]/40 transition-all duration-300 shadow-2xs">
                  <div className="text-xs text-[#68736D] flex items-center font-mono">
                    <ArrowLeftIcon className="h-3.5 w-3.5 mr-1.5 group-hover:-translate-x-1 transition-transform text-[#214A40]" /> 
                    {t("blog.prevArticle")}
                  </div>
                  <h4 className="font-semibold text-sm group-hover:text-[#214A40] transition-colors line-clamp-1 text-[#1D2925]">
                    {prevBlog.title}
                  </h4>
                </div>
              </Link>
            ) : <div />}

            {nextBlog && (
              <Link href={getHref(`/blog/${nextBlog.id}`)} className="group md:ml-auto w-full md:w-auto">
                <div className="flex flex-col space-y-2 border border-[#DEE4DC] rounded-xl p-4 bg-white hover:border-[#214A40]/40 transition-all duration-300 shadow-2xs">
                  <div className="text-xs text-[#68736D] flex items-center justify-end font-mono">
                    {t("blog.nextArticle")}
                    <ArrowRightIcon className="h-3.5 w-3.5 ml-1.5 group-hover:translate-x-1 transition-transform text-[#214A40]" />
                  </div>
                  <h4 className="font-semibold text-sm text-right group-hover:text-[#214A40] transition-colors line-clamp-1 text-[#1D2925]">
                    {nextBlog.title}
                  </h4>
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Latest Articles for Mobile */}
        <div className="lg:hidden w-full rounded-[22px] border border-[#DEE4DC] p-6 bg-white shadow-2xs mt-4">
          <h3 className="text-lg font-bold text-[#1D2925] mb-4 font-sans tracking-tight">{t("blog.otherArticles")}</h3>
          <div className="space-y-1">
            {latestBlogs.slice(0, 3).map((item, index) => (
              <React.Fragment key={item.id}>
                <Link href={getHref(`/blog/${item.id}`)} className="block group py-3">
                  <div className="flex flex-col">
                    <h4 className="font-medium text-sm leading-snug mb-1 group-hover:text-[#214A40] transition-colors line-clamp-2 text-[#1D2925]">
                      {item.title}
                    </h4>
                    <div className="flex items-center justify-between text-xs text-[#68736D]">
                      <span className="flex items-center">
                        <UserIcon className="h-3 w-3 mr-1" />
                        {item.author}
                      </span>
                      <span className="flex items-center">
                        <CalendarIcon className="h-3 w-3 mr-1" />
                        {formatDate(item.date)}
                      </span>
                    </div>
                  </div>
                </Link>
                {index < Math.min(latestBlogs.length, 3) - 1 && <Separator className="bg-[#DEE4DC]/80" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
