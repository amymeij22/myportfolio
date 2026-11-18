import Hero from "./components/Hero"
import AboutUs from "./components/AboutUs"
import PortfolioGrid from "./components/PortfolioGrid"
import Timeline from "./components/Timeline"
import ContactForm from "./components/ContactForm"
import FloatingActionButton from "./components/FloatingActionButton"
import Marquee from "./components/Marquee"
import Publications from "./components/Publications"
import Blog from "./components/Blog"
import type { Metadata } from "next"
import { getHomepageFaqSchema, getFeaturedWorksSchema } from "@/lib/seo-schema"

export const metadata: Metadata = {
  title: {
    absolute: "Ahmad Meijlan Yasir — System Engineer | Instrumentasi, IoT & Riset BMKG",
  },
  description:
    "Ahmad Meijlan Yasir, System Engineer yang fokus di instrumentasi, IoT, dan pengembangan web. Lihat karya, publikasi ilmiah, dan catatan teknis di sini.",
  keywords: [
    "Ahmad Meijlan Yasir",
    "System Engineer",
    "Meijlan Yasir",
    "AMY",
    "Taruna STMKG",
    "Instrumentasi Meteorologi",
    "BMKG",
    "Web Developer Indonesia",
    "IoT Developer",
    "Next.js",
    "PET Thermal Comfort Bali",
    "JEJAK BBMKG",
    "Research Publications",
    "IEEE ICITCOM",
  ],
  alternates: {
    canonical: "https://amymeij.web.id",
    languages: {
      "id-ID": "https://amymeij.web.id",
      "en-US": "https://amymeij.web.id/en",
      "x-default": "https://amymeij.web.id",
    },
  },
}

export default function Home() {
  const faqSchema = getHomepageFaqSchema()
  const worksSchema = getFeaturedWorksSchema()

  return (
    <>
      {/* Princeton GEO FAQ & Structured Works Schema for Generative AI & Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(worksSchema) }}
      />

      {/* 1. Beranda / Hero */}
      <Hero />
      
      {/* Metrics & Highlights Ribbon (Running Text) */}
      <Marquee />
      
      {/* 2. Tentang & Pendekatan */}
      <AboutUs />
      
      {/* 3. Karya Pilihan (Evidence-based Case Studies) */}
      <PortfolioGrid />
      
      {/* 4. Riset & Publikasi (Peer-Reviewed Academic Output) */}
      <Publications />
      
      {/* 5. Perjalanan & Pengalaman */}
      <Timeline />
      
      {/* 6. Catatan Teknis & Artikel */}
      <Blog />
      
      {/* 7. Kontak & Kolaborasi */}
      <ContactForm />

      {/* Floating Action Button (Kembali ke Atas) */}
      <FloatingActionButton />
    </>
  )
}
