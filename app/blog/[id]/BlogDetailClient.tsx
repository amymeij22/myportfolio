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
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

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
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return isNaN(date.getTime())
      ? dateString
      : date.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
  }

  const handleShare = (platform: string) => {
    if (typeof window === "undefined") return
    const url = window.location.href
    const title = encodeURIComponent(blog.title)
    const text = encodeURIComponent(`Read article "${blog.title}" by ${blog.author}`)

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
    <div className="relative isolate overflow-hidden bg-background pt-28 pb-16 min-h-screen flex flex-col items-center px-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/blog">
            <Button variant="ghost" size="sm" className="group hover:text-gray-500">
              <ArrowLeftIcon className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Kembali ke Blog
            </Button>
          </Link>

          {/* Share Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Share2Icon className="h-4 w-4" />
                <span className="hidden sm:inline">Bagikan</span>
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
              <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-3xl mb-8">
                <img
                  src={blog.image_url}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Badge variant="secondary" className="px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20">
                  {blog.blog_categories?.name || "General"}
                </Badge>
                <span className="text-sm text-muted-foreground flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  {formatDate(blog.date)}
                </span>
                <span className="text-sm text-muted-foreground flex items-center">
                  <UserIcon className="h-4 w-4 mr-1" />
                  {blog.author}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-foreground leading-tight">
                {blog.title}
              </h1>
            </div>

            <article className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none mb-12 text-justify">
              <div dangerouslySetInnerHTML={{ __html: blog.content || "" }} />
            </article>
          </div>

          {/* Sidebar Column - Desktop */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-32">
              <div className="rounded-2xl border border-border p-6 bg-card shadow-sm">
                <h3 className="text-xl font-bold mb-4">Artikel Terbaru</h3>
                <div className="space-y-1">
                  {latestBlogs.length > 0 ? (
                    latestBlogs.map((item, index) => (
                      <React.Fragment key={item.id}>
                        <Link href={`/blog/${item.id}`} className="block group py-3">
                          <div className="flex flex-col">
                            <h4 className="font-medium text-base leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-2">
                              {item.title}
                            </h4>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
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
                        {index < latestBlogs.length - 1 && <Separator />}
                      </React.Fragment>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm">Tidak ada artikel terbaru.</p>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-border p-6 bg-card shadow-sm mt-6">
                <h3 className="text-xl font-bold mb-4">Kategori</h3>
                <div className="flex flex-wrap gap-2">
                  <Link href="/blog">
                    <Badge variant="secondary" className="px-3 py-1 cursor-pointer hover:bg-secondary/80">
                      Semua
                    </Badge>
                  </Link>
                  {blog.blog_categories && (
                    <Link href={`/blog`}>
                      <Badge variant="secondary" className="px-3 py-1 cursor-pointer bg-primary/10 text-primary hover:bg-primary/20">
                        {blog.blog_categories.name}
                      </Badge>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Prev & Next */}
        <div className="w-full mt-16 border-t border-border pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prevBlog ? (
              <Link href={`/blog/${prevBlog.id}`} className="group">
                <div className="flex flex-col space-y-2 border border-border rounded-lg p-4 hover:border-primary/50 transition-all duration-300">
                  <div className="text-sm text-muted-foreground flex items-center">
                    <ArrowLeftIcon className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 
                    Artikel Sebelumnya
                  </div>
                  <h4 className="font-semibold group-hover:text-primary transition-colors line-clamp-1">
                    {prevBlog.title}
                  </h4>
                </div>
              </Link>
            ) : <div />}

            {nextBlog && (
              <Link href={`/blog/${nextBlog.id}`} className="group md:ml-auto w-full md:w-auto">
                <div className="flex flex-col space-y-2 border border-border rounded-lg p-4 hover:border-primary/50 transition-all duration-300">
                  <div className="text-sm text-muted-foreground flex items-center justify-end">
                    Artikel Selanjutnya
                    <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h4 className="font-semibold text-right group-hover:text-primary transition-colors line-clamp-1">
                    {nextBlog.title}
                  </h4>
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Latest Articles for Mobile */}
        <div className="lg:hidden w-full rounded-2xl border border-border p-6 bg-card shadow-sm mt-4">
          <h3 className="text-xl font-bold mb-4">Artikel Lainnya</h3>
          <div className="space-y-1">
            {latestBlogs.slice(0, 3).map((item, index) => (
              <React.Fragment key={item.id}>
                <Link href={`/blog/${item.id}`} className="block group py-3">
                  <div className="flex flex-col">
                    <h4 className="font-medium text-base leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </h4>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
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
                {index < Math.min(latestBlogs.length, 3) - 1 && <Separator />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

