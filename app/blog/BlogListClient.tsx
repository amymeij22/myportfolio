"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

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
  const [activeCategory, setActiveCategory] = useState("All")
  const [allBlogs] = useState<BlogPostItem[]>(initialBlogs)

  // Extract unique categories
  const categories = [
    "All",
    ...Array.from(new Set(allBlogs.map((b) => b.blog_categories?.name || "General"))),
  ]

  // Filter blog based on activeCategory
  const filteredBlogs = useMemo(() => {
    if (activeCategory === "All") {
      return allBlogs
    }
    return allBlogs.filter((blog) => (blog.blog_categories?.name || "General") === activeCategory)
  }, [activeCategory, allBlogs])

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

  return (
    <div className="relative isolate overflow-hidden bg-background min-h-screen flex flex-col items-center pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12">
          <div>
            <Link href="/">
              <Button variant="ghost" size="sm" className="group mb-4 hover:text-gray-500">
                <ArrowLeftIcon className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Kembali ke Beranda
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Blog & Articles</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Berbagi wawasan, riset, dan pengalaman seputar teknologi, instrumentasi, dan IoT
            </p>
          </div>
        </div>

        {/* Filter Kategori */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid Blog */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center mb-12">
          <AnimatePresence mode="popLayout">
            {filteredBlogs.map((blog) => (
              <motion.article
                key={blog.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-card rounded-3xl shadow-lg overflow-hidden hover-lift transition-all duration-300 ease-in-out border border-primary/20 hover:border-primary/50 elegant-glow flex flex-col h-full"
              >
                <div className="relative h-64 overflow-hidden cursor-pointer">
                  <img
                    src={blog.image_url}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-sm font-medium text-primary mb-1">
                    {blog.blog_categories?.name || "General"}
                  </div>
                  <h2 className="text-xl font-semibold text-card-foreground mb-3 line-clamp-3">
                    {blog.title}
                  </h2>
                  <p className="text-muted-foreground mb-4 text-sm line-clamp-3 text-justify">
                    {blog.excerpt}
                  </p>
                  <div className="flex justify-between items-center mt-auto pt-3 border-t border-border">
                    <Link
                      href={`/blog/${blog.id}`}
                      className="text-primary hover:underline inline-flex items-center font-medium"
                    >
                      Baca Artikel
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                    <span className="text-xs text-muted-foreground">{formatDate(blog.date)}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">Tidak ada artikel di kategori ini.</p>
          </div>
        )}
      </div>
    </div>
  )
}

