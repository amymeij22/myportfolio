"use client"

import Link from "next/link"
import { SiGithub, SiLinkedin, SiInstagram, SiFacebook } from "react-icons/si"
import { MdEmail } from "react-icons/md"
import { FaWhatsapp } from "react-icons/fa"

export default function Footer() {
  const handleScrollToTop = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-background border-t border-border elegant-section elegant-gradient">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-16 lg:px-8">
        <nav
          className="flex flex-col sm:flex-row justify-center items-center sm:space-x-12 space-y-4 sm:space-y-0 mb-6"
          aria-label="Footer"
        >
          {["About", "Skills", "Project", "Contact"].map((item) => (
            <div key={item} className="text-center">
              <Link
                href={`#${item.toLowerCase()}`}
                className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors"
              >
                {item}
              </Link>
            </div>
          ))}
          <div className="text-center sm:hidden">
            <a
              href="#"
              className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors"
              onClick={handleScrollToTop}
            >
              Scroll to Top
            </a>
          </div>
        </nav>
        <div className="flex justify-center space-x-10">
          <a href="https://github.com/amymeij22/" className="text-muted-foreground hover:text-foreground transition-colors">
            <span className="sr-only">GitHub</span>
            <SiGithub className="h-6 w-6" />
          </a>
          <a href="https://id.linkedin.com/in/ahmad-meijlan-yasir-1b950a351" className="text-muted-foreground hover:text-foreground transition-colors">
            <span className="sr-only">LinkedIn</span>
            <SiLinkedin className="h-6 w-6" />
          </a>
          <a href="https://www.instagram.com/amymeij_22/" className="text-muted-foreground hover:text-foreground transition-colors">
            <span className="sr-only">Instagram</span>
            <SiInstagram className="h-6 w-6" />
          </a>
          <a href="https://facebook.com/amymeij22" className="text-muted-foreground hover:text-foreground transition-colors">
            <span className="sr-only">Facebook</span>
            <SiFacebook className="h-6 w-6" />
          </a>
          <a href="http://wa.me/6282283475043" className="text-muted-foreground hover:text-foreground transition-colors">
            <span className="sr-only">WhatsApp</span>
            <FaWhatsapp className="h-6 w-6" />
          </a>
          <a href="mailto:yasirahmad220504@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors">
            <span className="sr-only">Email</span>
            <MdEmail className="h-6 w-6" />
          </a>
        </div>
        <p className="mt-10 text-center text-sm leading-5 text-muted-foreground">
          Portfolio by <a target="_blank" href="https://github.com/amymeij22" className="hover:text-foreground transition-colors">Ahmad Meijlan Yasir</a>
        </p>
      </div>
    </footer>
  )
}