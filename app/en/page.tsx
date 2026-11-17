import Hero from "../components/Hero"
import AboutUs from "../components/AboutUs"
import PortfolioGrid from "../components/PortfolioGrid"
import Timeline from "../components/Timeline"
import ContactForm from "../components/ContactForm"
import FloatingActionButton from "../components/FloatingActionButton"
import Marquee from "../components/Marquee"
import Publications from "../components/Publications"
import Blog from "../components/Blog"
import type { Metadata } from "next"
import { getHomepageFaqSchema, getFeaturedWorksSchema } from "@/lib/seo-schema"

export const metadata: Metadata = {
  title: {
    absolute: "Ahmad Meijlan Yasir — System Engineer | Instrumentation, IoT & BMKG Research",
  },
  description:
    "Official portfolio of Ahmad Meijlan Yasir: System Engineer and Cum Laude STMKG (BMKG) graduate with 15+ indexed scientific publications and 5+ registered copyrights, bridging observation instrumentation, IoT telemetry, PET thermal comfort, and web systems engineering.",
  keywords: [
    "Ahmad Meijlan Yasir",
    "System Engineer",
    "Meijlan Yasir",
    "AMY",
    "STMKG Cadet",
    "Meteorological Instrumentation",
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
    canonical: "https://amymeij.web.id/en",
    languages: {
      "id-ID": "https://amymeij.web.id",
      "en-US": "https://amymeij.web.id/en",
      "x-default": "https://amymeij.web.id",
    },
  },
}

export default function HomeEn() {
  const faqSchema = getHomepageFaqSchema("en")
  const worksSchema = getFeaturedWorksSchema("en")

  return (
    <>
      {/* Princeton GEO FAQ & Structured Works Schema for AI Search Engines (English) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(worksSchema) }}
      />

      {/* 1. Home / Hero */}
      <Hero />
      
      {/* Metrics & Highlights Ribbon */}
      <Marquee />
      
      {/* 2. About & Engineering Approach */}
      <AboutUs />
      
      {/* 3. Selected Works (Evidence-based Case Studies) */}
      <PortfolioGrid />
      
      {/* 4. Research & Publications */}
      <Publications />
      
      {/* 5. Professional Journey */}
      <Timeline />
      
      {/* 6. Technical Insights & Blog */}
      <Blog />
      
      {/* 7. Contact & Collaboration */}
      <ContactForm />

      {/* Floating Action Button */}
      <FloatingActionButton />
    </>
  )
}
