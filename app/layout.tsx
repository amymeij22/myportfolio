import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { Toaster } from "@/components/ui/toaster"
import Head from "next/head"
import type React from "react"
import ChatbotWrapper from "@/components/ChatbotWrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Ahmad Meijlan Yasir | Personal Portfolio",
  description: "Personal portfolio of Ahmad Meijlan Yasir, Instrumentation Student & Tech Enthusiast",
  keywords: "Ahmad Meijlan Yasir, portfolio, instrumentation, tech enthusiast, STMKG",
  author: "Ahmad Meijlan Yasir",
  url: "https://amymeij.web.id",
  image: "https://1h1v9ndzh4okzjrr.public.blob.vercel-storage.com/amymeij-LB69SQ3DTpLlezoXEDVbOpdg9hG5Ud",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={metadata.url} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:url" content={metadata.url} />
        <meta property="og:image" content={metadata.image} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.image} />
      </Head>
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Header />
          <main className="pt-0">{children}</main>
          <Footer />
          <Toaster />
          <ChatbotWrapper />
        </ThemeProvider>
      </body>
    </html>
  )
}