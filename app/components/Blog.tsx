"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { getLatestBlogs } from "@/lib/supabase"

// Blog post type definition
interface BlogPost {
  id: number;
  title: string;
  author: string;
  category_id: number;
  date: string;
  excerpt: string;
  image_url: string;
  content?: string;
  created_at: string;
  updated_at: string;
  blog_categories: {
    name: string;
    slug: string;
  };
}

export default function Blog() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [latestBlogs, setLatestBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
    
    // Mengambil blog dari Supabase
    async function fetchLatestBlogs() {
      try {
        const blogs = await getLatestBlogs(6);
        setLatestBlogs(blogs);
      } catch (error) {
        console.error("Error fetching latest blogs:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchLatestBlogs();
  }, [])

  // Format tanggal ke format yang diinginkan
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (!mounted) {
    return null
  }

  return (
    <section className="relative isolate overflow-hidden bg-background min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Latest Articles</h2>
          <p className="mt-4 text-lg text-muted-foreground">Thoughts, ideas, and knowledge sharing on technology</p>
        </motion.div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center mb-12">
          <AnimatePresence>
            {latestBlogs.map((blog) => (
              <motion.div
                key={blog.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-card rounded-3xl shadow-lg overflow-hidden hover-lift transition-all duration-300 ease-in-out border border-primary/20 hover:border-primary/50 elegant-glow flex flex-col h-full"
              >
                <div className="relative h-64 overflow-hidden cursor-pointer">
                  <img 
                    src={blog.image_url} 
                    alt={blog.title} 
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-sm font-medium text-primary mb-1">{blog.blog_categories?.name || 'Uncategorized'}</div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-3 line-clamp-3">{blog.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm line-clamp-3 text-justify">{blog.excerpt}</p>
                  <div className="flex justify-between items-center mt-auto pt-3 border-t border-border">
                    <Link
                      href={`/blog/${blog.id}`}
                      target="_blank"
                      className="text-primary hover:underline inline-flex items-center font-medium"
                    >
                      Read Article
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                    <span className="text-xs text-muted-foreground">{formatDate(blog.date)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        )}
        
        <div className="flex justify-center">
          <Link href="/blog">
            <Button
              variant="outline"
              className="group border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              View All Articles
              <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
} 