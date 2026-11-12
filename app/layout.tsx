import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import Header from "./components/Header"
import Footer from "./components/Footer"
import type React from "react"
import ChatbotWrapper from "@/components/ChatbotWrapper"
import { ThemeProvider } from "@/components/theme-provider"
import SkipLink from "@/components/SkipLink"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL("https://amymeij.web.id"),
  title: {
    default: "Ahmad Meijlan Yasir - Personal Portfolio & Tech Projects",
    template: "%s | Ahmad Meijlan Yasir",
  },
  description:
    "Official personal portfolio of Ahmad Meijlan Yasir, Taruna Instrumentasi STMKG & Web Developer. Showcasing engineering projects, research publications, IoT developments, and tech articles.",
  keywords: [
    "Ahmad Meijlan Yasir",
    "Meijlan Yasir",
    "AMY",
    "Portfolio",
    "Taruna STMKG",
    "Instrumentasi Meteorologi",
    "BMKG",
    "Web Developer Indonesia",
    "IoT Developer",
    "Next.js Developer",
    "Research Publications",
  ],
  authors: [{ name: "Ahmad Meijlan Yasir", url: "https://amymeij.web.id" }],
  creator: "Ahmad Meijlan Yasir",
  publisher: "Ahmad Meijlan Yasir",
  applicationName: "Ahmad Meijlan Yasir Portfolio",
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "id_ID",
    alternateLocale: "en_US",
    url: "https://amymeij.web.id",
    title: "Ahmad Meijlan Yasir - Personal Portfolio & Tech Projects",
    description:
      "Official portfolio of Ahmad Meijlan Yasir: Projects, research publications, IoT systems, and technology articles.",
    siteName: "Ahmad Meijlan Yasir",
    images: [
      {
        url: "https://1h1v9ndzh4okzjrr.public.blob.vercel-storage.com/amymeij-LB69SQ3DTpLlezoXEDVbOpdg9hG5Ud",
        width: 1200,
        height: 630,
        alt: "Ahmad Meijlan Yasir Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmad Meijlan Yasir - Personal Portfolio",
    description:
      "Taruna Instrumentasi STMKG, Web Developer, and IoT Enthusiast.",
    images: [
      "https://1h1v9ndzh4okzjrr.public.blob.vercel-storage.com/amymeij-LB69SQ3DTpLlezoXEDVbOpdg9hG5Ud",
    ],
    creator: "@amymeij",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://amymeij.web.id",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://amymeij.web.id/#website",
      "url": "https://amymeij.web.id",
      "name": "Ahmad Meijlan Yasir",
      "alternateName": [
        "Meijlan Yasir",
        "AMY",
        "Ahmad Meijlan Yasir Portfolio",
        "amymeij.web.id",
      ],
      "description":
        "Personal portfolio of Ahmad Meijlan Yasir, Taruna Instrumentasi STMKG, Web Developer & Tech Enthusiast.",
      "inLanguage": ["id", "en"],
    },
    {
      "@type": "ProfilePage",
      "@id": "https://amymeij.web.id/#profilepage",
      "url": "https://amymeij.web.id",
      "name": "Ahmad Meijlan Yasir | Personal Portfolio",
      "isPartOf": { "@id": "https://amymeij.web.id/#website" },
      "mainEntity": {
        "@type": "Person",
        "@id": "https://amymeij.web.id/#person",
        "name": "Ahmad Meijlan Yasir",
        "alternateName": "Meijlan",
        "jobTitle": "Taruna Instrumentasi & Web Developer",
        "url": "https://amymeij.web.id",
        "image":
          "https://1h1v9ndzh4okzjrr.public.blob.vercel-storage.com/amymeij-LB69SQ3DTpLlezoXEDVbOpdg9hG5Ud",
        "sameAs": [
          "https://github.com/amymeij22/",
          "https://id.linkedin.com/in/ahmad-meijlan-yasir-1b950a351",
          "https://www.instagram.com/amymeij_22/",
        ],
        "worksFor": {
          "@type": "Organization",
          "name": "Badan Meteorologi, Klimatologi, dan Geofisika (BMKG)",
        },
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "Sekolah Tinggi Meteorologi Klimatologi dan Geofisika (STMKG)",
        },
        "knowsAbout": [
          "Meteorological Instrumentation",
          "Internet of Things",
          "Web Development",
          "Next.js",
          "React",
          "Machine Learning",
        ],
      },
    },
    {
      "@type": "ItemList",
      "@id": "https://amymeij.web.id/#sitenavigation",
      "name": "Site Navigation",
      "itemListElement": [
        {
          "@type": "SiteNavigationElement",
          "position": 1,
          "name": "About",
          "description": "About Ahmad Meijlan Yasir, background and education",
          "url": "https://amymeij.web.id/#about",
        },
        {
          "@type": "SiteNavigationElement",
          "position": 2,
          "name": "Skills",
          "description": "Technical hard skills and soft skills",
          "url": "https://amymeij.web.id/#skills",
        },
        {
          "@type": "SiteNavigationElement",
          "position": 3,
          "name": "Projects",
          "description": "Showcase of engineering, IoT, and web projects",
          "url": "https://amymeij.web.id/#projects",
        },
        {
          "@type": "SiteNavigationElement",
          "position": 4,
          "name": "Publications",
          "description": "Academic papers and research publications",
          "url": "https://amymeij.web.id/#publications",
        },
        {
          "@type": "SiteNavigationElement",
          "position": 5,
          "name": "Blog & Articles",
          "description": "Articles and knowledge sharing on tech and instrumentation",
          "url": "https://amymeij.web.id/blog",
        },
        {
          "@type": "SiteNavigationElement",
          "position": 6,
          "name": "Journey",
          "description": "Professional journey and career timeline",
          "url": "https://amymeij.web.id/#timeline",
        },
        {
          "@type": "SiteNavigationElement",
          "position": 7,
          "name": "Contact",
          "description": "Direct contact and collaboration channel",
          "url": "https://amymeij.web.id/#contact",
        },
      ],
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <SkipLink />
          <Header />
          <main id="main-content" className="pt-0">{children}</main>
          <Footer />
          <Toaster />
          <ChatbotWrapper />
        </ThemeProvider>
      </body>
    </html>
  )
}
