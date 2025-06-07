"use client"
import { motion } from "framer-motion"
import Link from "next/link"

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  pathname: string;
}

export default function FullScreenMenu({ isOpen, onClose, activeSection, pathname }: FullScreenMenuProps) {
  const isActive = (section: string) => activeSection === section

  // Fungsi untuk menentukan URL yang tepat berdasarkan pathname
  const getNavHref = (href: string) => {
    // Jika di halaman selain homepage, kembalikan ke homepage dengan anchor ke section
    if (pathname !== "/") {
      return `/${href}`
    }
    // Jika sudah di homepage, gunakan anchor biasa
    return href
  }

  return (
    <motion.div
      className={`fixed inset-0 z-40 bg-background/90 backdrop-blur-md ${isOpen ? "block" : "hidden"}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center justify-center h-full">
        {[
          { name: "About", href: "#about", id: "about" },
          { name: "Skills", href: "#skills", id: "skills" },
          { name: "Projects", href: "#projects", id: "projects" },
          { name: "Publications", href: "#publications", id: "publications" },
          { name: "Blog", href: "#blog", id: "blog" },
          { name: "Journey", href: "#timeline", id: "timeline" },
          { name: "Contact", href: "#contact", id: "contact" }
        ].map((item) => (
          <Link 
            key={item.name}
            href={getNavHref(item.href)} 
            className={`text-2xl font-semibold mb-6 relative ${isActive(item.id) ? "text-primary" : "text-foreground"}`}
            onClick={onClose}
          >
            {item.name}
            {isActive(item.id) && (
              <motion.span
                className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-primary rounded-full"
                layoutId="activeMobileSection"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </Link>
        ))}
      </div>
    </motion.div>
  )
}
