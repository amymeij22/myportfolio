"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeftIcon, ArrowRightIcon, Share2Icon, CalendarIcon, UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import React from "react"
import { getBlogById, getLatestBlogs, getAllBlogs } from "@/lib/supabase"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { FaWhatsapp, FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Separator } from "@/components/ui/separator"

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

interface BlogParams {
  id: string;
}

export default function BlogDetail({ params }: { params: Promise<BlogParams> }) {
  const router = useRouter()
  const [blog, setBlog] = useState<BlogPost | null>(null)
  const [latestBlogs, setLatestBlogs] = useState<BlogPost[]>([])
  const [navigation, setNavigation] = useState<{ prev: BlogPost | null, next: BlogPost | null }>({ prev: null, next: null })
  const [loading, setLoading] = useState(true)
  
  // Menggunakan React.use() untuk unwrap params
  const unwrappedParams = React.use(params)
  const blogId = parseInt(unwrappedParams.id)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        
        // Ambil blog berdasarkan ID
        const blogData = await getBlogById(blogId)
        
        if (blogData) {
          setBlog(blogData)
          
          // Ambil blog terbaru kecuali blog yang sedang dibaca
          const latestBlogsData = await getLatestBlogs(10)
          const filteredLatestBlogs = latestBlogsData.filter(b => b.id !== blogId)
          setLatestBlogs(filteredLatestBlogs)
          
          // Mengatur navigasi (prev dan next)
          const allBlogsData = await getAllBlogs()
          // Urutkan blog berdasarkan tanggal (terbaru ke terlama)
          allBlogsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          
          const currentIndex = allBlogsData.findIndex(b => b.id === blogId)
          const prevBlog = currentIndex < allBlogsData.length - 1 ? allBlogsData[currentIndex + 1] : null
          const nextBlog = currentIndex > 0 ? allBlogsData[currentIndex - 1] : null
          
          setNavigation({ prev: prevBlog, next: nextBlog })
        } else {
          // Redirect ke halaman blog jika tidak ditemukan
          router.push('/blog')
        }
      } catch (error) {
        console.error("Error fetching blog data:", error)
        router.push('/blog')
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [blogId, router])

  // Format tanggal ke format yang diinginkan
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleShare = (platform: string) => {
    if (!blog) return
    
    const url = window.location.href
    const title = encodeURIComponent(blog.title)
    const text = encodeURIComponent(`Read article "${blog.title}" by ${blog.author}`)
    
    let shareUrl = ''
    
    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${text} ${url}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
        break
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`
        break
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!blog) {
    return null
  }

  return (
    <div className="relative isolate overflow-hidden bg-background pt-28 pb-16 min-h-screen flex flex-col items-center px-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between mb-6">
          <Link href="/blog">
            <Button variant="ghost" size="sm" className="group hover:text-gray-500">
              <ArrowLeftIcon className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Kembali ke Blog
            </Button>
          </Link>
          
          {/* Tombol Berbagi */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Share2Icon className="h-4 w-4" />
                <span className="hidden sm:inline">Share</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleShare('whatsapp')} className="cursor-pointer">
                <FaWhatsapp className="mr-2 text-green-500" />
                <span>WhatsApp</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare('linkedin')} className="cursor-pointer">
                <FaLinkedin className="mr-2 text-blue-600" />
                <span>LinkedIn</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare('facebook')} className="cursor-pointer">
                <FaFacebook className="mr-2 text-blue-800" />
                <span>Facebook</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare('twitter')} className="cursor-pointer">
                <FaTwitter className="mr-2 text-blue-400" />
                <span>Twitter</span>
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
                  {blog.blog_categories?.name || 'Uncategorized'}
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
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-foreground">
                {blog.title}
              </h1>
            </div>
            
            <article className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none mb-12 text-justify">
              <div dangerouslySetInnerHTML={{ __html: blog.content || '' }} />
            </article>
          </div>
          
          {/* Sidebar Column - Hanya tampil di desktop */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-32">
              <div className="rounded-2xl border border-border p-6 bg-card shadow-sm">
                <h3 className="text-xl font-bold mb-4">Latest Articles</h3>
                <div className="space-y-1">
                  {latestBlogs.length > 0 ? (
                    latestBlogs.map((blog, index) => (
                      <React.Fragment key={blog.id}>
                        <Link 
                          href={`/blog/${blog.id}`} 
                          className="block group py-3"
                        >
                          <div className="flex flex-col">
                            <h4 className="font-medium text-base leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-2">
                              {blog.title}
                            </h4>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span className="flex items-center">
                                <UserIcon className="h-3 w-3 mr-1" />
                                {blog.author}
                              </span>
                              <span className="flex items-center">
                                <CalendarIcon className="h-3 w-3 mr-1" />
                                {formatDate(blog.date)}
                              </span>
                            </div>
                          </div>
                        </Link>
                        {index < latestBlogs.length - 1 && <Separator />}
                      </React.Fragment>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm">No recent articles.</p>
                  )}
                </div>
              </div>
              
              <div className="rounded-2xl border border-border p-6 bg-card shadow-sm mt-6">
                <h3 className="text-xl font-bold mb-4">Category</h3>
                <div className="flex flex-wrap gap-2">
                  <Link href="/blog">
                    <Badge variant="secondary" className="px-3 py-1 cursor-pointer hover:bg-secondary/80">
                      All
                    </Badge>
                  </Link>
                  {blog.blog_categories && (
                    <Link href={`/blog?category=${encodeURIComponent(blog.blog_categories.name)}`}>
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
        
        {/* Navigasi dan Share Full Width */}
        <div className="w-full mt-16">
          {/* Navigasi Artikel Sebelumnya/Selanjutnya */}
          <div className="border-t border-border pt-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {navigation.prev && (
                <Link href={`/blog/${navigation.prev.id}`} className="group">
                  <div className="flex flex-col space-y-2 border border-border rounded-lg p-4 hover:border-primary/50 transition-all duration-300">
                    <div className="text-sm text-muted-foreground flex items-center">
                      <ArrowLeftIcon className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 
                      Previous Article
                    </div>
                    <h4 className="font-semibold group-hover:text-primary transition-colors line-clamp-1">{navigation.prev.title}</h4>
                  </div>
                </Link>
              )}
              
              {navigation.next && (
                <Link href={`/blog/${navigation.next.id}`} className="group md:ml-auto">
                  <div className="flex flex-col space-y-2 border border-border rounded-lg p-4 hover:border-primary/50 transition-all duration-300">
                    <div className="text-sm text-muted-foreground flex items-center justify-end">
                      Next Article
                      <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <h4 className="font-semibold text-right group-hover:text-primary transition-colors line-clamp-1">{navigation.next.title}</h4>
                  </div>
                </Link>
              )}
            </div>
          </div>
          
          {/* Artikel Terbaru (Mobile) */}
          <div className="lg:hidden rounded-2xl border border-border p-6 bg-card shadow-sm">
            <h3 className="text-xl font-bold mb-4">Latest Articles</h3>
            <div className="space-y-1">
              {latestBlogs.length > 0 ? (
                latestBlogs.slice(0, 3).map((blog, index) => (
                  <React.Fragment key={blog.id}>
                    <Link 
                      href={`/blog/${blog.id}`} 
                      className="block group py-3"
                    >
                      <div className="flex flex-col">
                        <h4 className="font-medium text-base leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-2">
                          {blog.title}
                        </h4>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="flex items-center">
                            <UserIcon className="h-3 w-3 mr-1" />
                            {blog.author}
                          </span>
                          <span className="flex items-center">
                            <CalendarIcon className="h-3 w-3 mr-1" />
                            {formatDate(blog.date)}
                          </span>
                        </div>
                      </div>
                    </Link>
                    {index < Math.min(latestBlogs.length, 3) - 1 && <Separator />}
                  </React.Fragment>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">No recent articles.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 