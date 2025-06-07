"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAllBlogs, getBlogCategories } from "@/lib/supabase"

interface BlogPost {
  id: number;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  image_url: string;
  content?: string;
  blog_categories: {
    name: string;
    slug: string;
  };
}

export default function BlogPage() {
  // State untuk kategori yang aktif dan blogs
  const [activeCategory, setActiveCategory] = useState("All")
  const [allBlogs, setAllBlogs] = useState<BlogPost[]>([])
  const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<string[]>(["All"])
  const [loading, setLoading] = useState(true)
  
  // Mengambil data blog dan kategori dari Supabase
  useEffect(() => {
    async function fetchData() {
      try {
        // Ambil semua blog
        const blogs = await getAllBlogs()
        setAllBlogs(blogs)
        
        // Extract kategori unik dari blog
        const uniqueCategories = ["All", ...Array.from(new Set(blogs.map(blog => blog.blog_categories?.name || 'Uncategorized')))]
        setCategories(uniqueCategories)
        
        // Set blog yang difilter (awalnya semua)
        setFilteredBlogs(blogs)
      } catch (error) {
        console.error("Error fetching blogs:", error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])
  
  // Filter blog berdasarkan kategori yang dipilih
  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredBlogs(allBlogs)
    } else {
      setFilteredBlogs(allBlogs.filter(blog => blog.blog_categories?.name === activeCategory))
    }
  }, [activeCategory, allBlogs])

  // Format tanggal ke format yang diinginkan
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="relative isolate overflow-hidden bg-background min-h-screen flex flex-col items-center pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12">
          <div>
            <Link href="/">
              <Button variant="ghost" size="sm" className="group mb-4 hover:text-gray-500">
                <ArrowLeftIcon className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Button>
            </Link>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Blog & Articles</h2>
            <p className="mt-4 text-lg text-muted-foreground">Sharing knowledge and experience in the technology world</p>
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
        
        {/* Loading state */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* Grid Blog */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center mb-12">
              <AnimatePresence mode="wait">
                {filteredBlogs.map((blog) => (
                  <motion.div
                    key={blog.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="bg-card rounded-3xl shadow-lg overflow-hidden hover-lift transition-all duration-300 ease-in-out border border-primary/20 hover:border-primary/50 elegant-glow flex flex-col h-full"
                  >
                    <div className="relative h-64 overflow-hidden cursor-pointer">
                      <img 
                        src={blog.image_url} 
                        alt={blog.title} 
                        className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="text-sm font-medium text-primary mb-1">{blog.blog_categories?.name || 'Uncategorized'}</div>
                      <h3 className="text-xl font-semibold text-card-foreground mb-3 line-clamp-3">{blog.title}</h3>
                      <p className="text-muted-foreground mb-4 text-sm line-clamp-3 text-justify">{blog.excerpt}</p>
                      <div className="flex justify-between items-center mt-auto pt-3 border-t border-border">
                        <Link
                          href={`/blog/${blog.id}`}
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
            
            {filteredBlogs.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No articles found in this category.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
} 