import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Head from "next/head"
import type React from "react"
import ChatbotWrapper from "@/components/ChatbotWrapper"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL('https://amymeij.web.id'),
  title: {
    default: "Ahmad Meijlan Yasir | Personal Portfolio",
    template: "%s | Ahmad Meijlan Yasir"
  },
  description: "Personal portfolio of Ahmad Meijlan Yasir, Instrumentation Student & Tech Enthusiast showcasing projects, skills, and achievements in the field of technology and instrumentation.",
  keywords: ["Ahmad Meijlan Yasir", "portfolio", "instrumentation", "tech enthusiast", "STMKG", "developer", "projects", "publications", "technology"],
  authors: [{ name: "Ahmad Meijlan Yasir" }],
  creator: "Ahmad Meijlan Yasir",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://amymeij.web.id",
    title: "Ahmad Meijlan Yasir | Personal Portfolio",
    description: "Personal portfolio of Ahmad Meijlan Yasir, Instrumentation Student & Tech Enthusiast showcasing projects, skills, and achievements.",
    siteName: "Ahmad Meijlan Yasir Portfolio",
    images: [{
      url: "https://1h1v9ndzh4okzjrr.public.blob.vercel-storage.com/amymeij-LB69SQ3DTpLlezoXEDVbOpdg9hG5Ud",
      width: 1200,
      height: 630,
      alt: "Ahmad Meijlan Yasir Portfolio"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmad Meijlan Yasir | Personal Portfolio",
    description: "Personal portfolio of Ahmad Meijlan Yasir, Instrumentation Student & Tech Enthusiast",
    images: ["https://1h1v9ndzh4okzjrr.public.blob.vercel-storage.com/amymeij-LB69SQ3DTpLlezoXEDVbOpdg9hG5Ud"],
    creator: "@amymeij"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://amymeij.web.id',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: 'google-site-verification-code',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
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