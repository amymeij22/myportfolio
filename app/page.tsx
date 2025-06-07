import Hero from "./components/Hero"
import AboutUs from "./components/AboutUs"
import Skills from "./components/Services"
import PortfolioGrid from "./components/PortfolioGrid"
import Timeline from "./components/Timeline"
import ContactForm from "./components/ContactForm"
import FloatingActionButton from "./components/FloatingActionButton"
import CustomCursor from "./components/CustomCursor"
import Marquee from "./components/Marquee"
import Publications from "./components/Publications"
import Blog from "./components/Blog"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home | Personal Portfolio",
  description: "Welcome to Ahmad Meijlan Yasir's personal portfolio. Explore my projects, skills, publications, and professional journey in technology and instrumentation.",
  keywords: ["home", "portfolio", "Ahmad Meijlan Yasir", "projects", "skills", "publications", "contact"],
  alternates: {
    canonical: 'https://amymeij.web.id',
  },
}

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Hero />
      <section id="about">
        <AboutUs />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="projects">
        <PortfolioGrid />
      </section>
      <section id="publications">
        <Publications />
      </section>
      <section id="blog">
        <Blog />
      </section>
      <section id="marquee">
        <Marquee />
      </section>
      <section id="timeline">
        <Timeline />
      </section>
      <section id="contact">
        <ContactForm />
      </section>

      <FloatingActionButton />
    </>
  )
}

