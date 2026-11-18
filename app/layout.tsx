import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import Header from "./components/Header"
import Footer from "./components/Footer"
import type React from "react"
import ChatbotWrapper from "@/components/ChatbotWrapper"
import { ThemeProvider } from "@/components/theme-provider"
import SkipLink from "@/components/SkipLink"
import { I18nProvider } from "@/lib/i18n"

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const fontMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F7F2" },
    { media: "(prefers-color-scheme: dark)", color: "#214A40" },
  ],
  colorScheme: "light dark",
}

export const metadata: Metadata = {
  metadataBase: new URL("https://amymeij.web.id"),
  title: {
    default: "Ahmad Meijlan Yasir — System Engineer | Instrumentasi, IoT & Riset",
    template: "%s | Ahmad Meijlan Yasir",
  },
  description:
    "Ahmad Meijlan Yasir, System Engineer yang fokus di instrumentasi, IoT, dan pengembangan web. Lihat karya, publikasi ilmiah, dan catatan teknis di sini.",
  keywords: [
    "Ahmad Meijlan Yasir",
    "Meijlan Yasir",
    "AMY",
    "System Engineer",
    "Taruna STMKG",
    "BMKG",
    "Instrumentasi Meteorologi",
    "Sistem Digital & Otomasi",
    "Physiological Equivalent Temperature",
    "PET Bali WebGIS",
    "JEJAK BBMKG",
    "Hak Cipta Komputer",
    "Web Developer Indonesia",
    "IoT Developer",
    "ESP32 LoRa Radiosonde",
    "Next.js Developer",
    "IEEE Publications",
    "Riset BMKG",
  ],
  authors: [{ name: "Ahmad Meijlan Yasir", url: "https://amymeij.web.id" }],
  creator: "Ahmad Meijlan Yasir",
  publisher: "Ahmad Meijlan Yasir",
  applicationName: "Ahmad Meijlan Yasir Portfolio",
  category: "technology",
  classification: "Engineering & Scientific Research Portfolio",
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "id_ID",
    alternateLocale: "en_US",
    url: "https://amymeij.web.id",
    title: "Ahmad Meijlan Yasir — System Engineer | Portfolio & Research",
    description:
      "Ahmad Meijlan Yasir, System Engineer yang fokus di instrumentasi, IoT, dan pengembangan web. Temukan karya, publikasi riset, dan catatan teknis di sini.",
    siteName: "Ahmad Meijlan Yasir",
    images: [
      {
        url: "https://amymeij.web.id/images/og-image.jpg",
        secureUrl: "https://amymeij.web.id/images/og-image.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Ahmad Meijlan Yasir — System Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmad Meijlan Yasir — System Engineer",
    description:
      "Ahmad Meijlan Yasir, System Engineer di bidang instrumentasi, IoT, dan pengembangan web. Simak karya, riset, dan tulisan terbaru.",
    images: [
      {
        url: "https://amymeij.web.id/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ahmad Meijlan Yasir — System Engineer Portfolio",
      },
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
    languages: {
      "id-ID": "https://amymeij.web.id",
      "en-US": "https://amymeij.web.id/en",
      "x-default": "https://amymeij.web.id",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-touch-icon-precomposed.png",
      },
    ],
  },
  other: {
    "msapplication-TileColor": "#214A40",
    "msapplication-TileImage": "/mstile-150x150.png",
    "msapplication-config": "/browserconfig.xml",
    "geo.region": "ID-BT",
    "geo.placename": "Tangerang Selatan, Banten, Indonesia",
    "geo.position": "-6.2738;106.7454",
    "ICBM": "-6.2738, 106.7454",
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
        "Ahmad Meijlan Yasir, System Engineer yang fokus di instrumentasi, IoT, dan pengembangan web. Temukan karya, publikasi riset, dan catatan teknis di sini.",
      "inLanguage": ["id-ID", "en-US"],
      "publisher": {
        "@id": "https://amymeij.web.id/#person",
      },
    },
    {
      "@type": "ProfilePage",
      "@id": "https://amymeij.web.id/#profilepage",
      "url": "https://amymeij.web.id",
      "name": "Ahmad Meijlan Yasir | Personal Portfolio & Research Hub",
      "isPartOf": { "@id": "https://amymeij.web.id/#website" },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://amymeij.web.id/images/og-image.jpg",
        "width": 1200,
        "height": 630,
      },
      "mainEntity": {
        "@type": "Person",
        "@id": "https://amymeij.web.id/#person",
        "name": "Ahmad Meijlan Yasir",
        "alternateName": ["Meijlan Yasir", "AMY", "Ahmad Meijlan"],
        "givenName": "Ahmad Meijlan",
        "familyName": "Yasir",
        "jobTitle": "System Engineer",
        "url": "https://amymeij.web.id",
        "image": "https://amymeij.web.id/images/yasir-non-formal.webp",
        "email": "mailto:yasirahmad220504@gmail.com",
        "sameAs": [
          "https://github.com/amymeij22",
          "https://www.linkedin.com/in/ahmad-meijlan-yasir/",
          "https://www.instagram.com/amymeij_22/",
          "https://orcid.org/0009-0002-3929-3995",
          "https://scholar.google.com/citations?user=amymeij",
        ],
        "worksFor": {
          "@type": "GovernmentOrganization",
          "name": "Badan Meteorologi, Klimatologi, dan Geofisika",
          "alternateName": "BMKG",
          "url": "https://www.bmkg.go.id",
        },
        "alumniOf": {
          "@type": "CollegeOrUniversity",
          "name": "Sekolah Tinggi Meteorologi Klimatologi dan Geofisika",
          "alternateName": "STMKG",
          "url": "https://stmkg.ac.id",
        },
        "knowsAbout": [
          "System Engineering",
          "Meteorological Instrumentation",
          "Atmospheric Sounding & Observations",
          "Internet of Things (IoT)",
          "Physiological Equivalent Temperature (PET)",
          "Biometeorology & WebGIS",
          "Full-Stack Web Development",
          "Next.js & React",
          "Python",
          "PostgreSQL & Supabase",
          "Wireless Telemetry LoRa & ESP32",
          "Machine Learning & AI Engineering",
          "JEJAK Calibration Management System",
        ],
        "award": [
          "Lulusan Cum Laude Sarjana Terapan Instrumentasi MKG STMKG",
          "Penerima Karya Cipta Madya Bidang Hak Cipta Komputer",
          "Pemegang 5+ Hak Cipta Perangkat Lunak Resmi DJKI Kemenkumham RI",
          "Top Graduate AI Engineer Cohort Coding Camp powered by DBS Foundation",
        ],
        "hasCredential": [
          {
            "@type": "EducationalOccupationalCredential",
            "name": "Sarjana Terapan Instrumentasi Meteorologi Klimatologi dan Geofisika (S.Tr.Instr.)",
            "credentialCategory": "degree",
            "recognizedBy": {
              "@type": "CollegeOrUniversity",
              "name": "Sekolah Tinggi Meteorologi Klimatologi dan Geofisika",
            },
          },
        ],
      },
    },
    {
      "@type": "ItemList",
      "@id": "https://amymeij.web.id/#sitenavigation",
      "name": "Navigasi Situs",
      "itemListElement": [
        {
          "@type": "SiteNavigationElement",
          "position": 1,
          "name": "Beranda",
          "description": "Pengenalan Ahmad Meijlan Yasir, System Engineer",
          "url": "https://amymeij.web.id/#hero",
        },
        {
          "@type": "SiteNavigationElement",
          "position": 2,
          "name": "Fokus",
          "description": "Tiga domain keahlian terhubung: Instrumentasi, Sistem Digital, Data & Riset",
          "url": "https://amymeij.web.id/#fokus",
        },
        {
          "@type": "SiteNavigationElement",
          "position": 3,
          "name": "Karya",
          "description": "Karya pilihan: PET WebGIS Bali, JEJAK Kalibrasi, Inventro STMKG",
          "url": "https://amymeij.web.id/#karya",
        },
        {
          "@type": "SiteNavigationElement",
          "position": 4,
          "name": "Riset",
          "description": "Publikasi ilmiah peer-reviewed di jurnal terindeks dan konferensi internasional",
          "url": "https://amymeij.web.id/#riset",
        },
        {
          "@type": "SiteNavigationElement",
          "position": 5,
          "name": "Tentang",
          "description": "Latar belakang, rekam jejak, dan linimasa pengalaman",
          "url": "https://amymeij.web.id/#tentang",
        },
        {
          "@type": "SiteNavigationElement",
          "position": 6,
          "name": "Catatan",
          "description": "Artikel teknis dan catatan riset",
          "url": "https://amymeij.web.id/blog",
        },
        {
          "@type": "SiteNavigationElement",
          "position": 7,
          "name": "Kontak",
          "description": "Saluran komunikasi dan kolaborasi langsung",
          "url": "https://amymeij.web.id/#kontak",
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
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans min-h-screen bg-background text-foreground antialiased selection:bg-[#C7E76A]/40 selection:text-[#1D2925]`}>
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false}>
          <I18nProvider>
            <SkipLink />
            <Header />
            <main id="main-content" className="pt-0">{children}</main>
            <Footer />
            <Toaster />
            <ChatbotWrapper />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
