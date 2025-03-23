import Hero from "./components/Hero"
import AboutUs from "./components/AboutUs"
import Skills from "./components/Services"
import PortfolioGrid from "./components/PortfolioGrid"
import Timeline from "./components/Timeline"
import ContactForm from "./components/ContactForm"
import FloatingActionButton from "./components/FloatingActionButton"
import CustomCursor from "./components/CustomCursor"
import Marquee from "./components/Marquee"

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
      <section id="journey">
        <Timeline />
      </section>
      <section id="marquee">
        <Marquee />
      </section>
      <section id="contact">
        <ContactForm />
      </section>
      <FloatingActionButton />
    </>
  )
}

