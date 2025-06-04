"use client"

import { useState, useRef } from "react"
import { motion, useInView, useScroll, useSpring } from "framer-motion"
import { RiBookOpenLine, RiBriefcaseLine } from "react-icons/ri"

const timelineEvents = [
  {
    startDate: "Mar 2025",
    endDate: "Present",
    position: "Engineer Intern",
    company: "Indonesian Agency for Meteorology, Climatology, and Geophysics",
    location: "Medan, North Sumatra",
    description: "Calibration of meteorological instruments and developing tracking applications.",
    details:
      "Participated in the calibration of meteorological, climatological, and geophysical instruments. Gained hands-on experience in interpreting calibration data and maintaining national measurement standards. Developed a real-time, website-based application to track the calibration status of field instruments, improving data transparency and internal coordination for calibration schedules across departments.",
  },
  {
    startDate: "Aug 2024",
    endDate: "Present",
    position: "Web Developer",
    company: "State College of Meteorology, Climatology, and Geophysics",
    location: "Tangerang, Banten",
    description: "Managing institutional website using WordPress and Elementor.",
    details:
      "Developed and maintained institutional website using WordPress and Elementor. Managed academic content updates and student service portals. Applied skills in WordPress, Elementor, Project Management, and Web Content Writing.",
  },
  {
    startDate: "Jun 2024",
    endDate: "Present",
    position: "Chief Financial Officer",
    company: "Kabagas Keren",
    location: "Tangerang, Banten",
    description: "Managing budgeting, financial reports, and funding allocations for tech projects.",
    details:
      "Managed budgeting, financial reports, and funding allocations for ongoing tech and IoT projects. Oversaw project timelines and resource planning from a financial perspective. Collaborated closely with technical leads to align project costs with development goals. Applied skills in Financial Reporting, Budget Management, and Project Coordination.",
  },
  {
    startDate: "Jun 2024",
    endDate: "Present",
    position: "Web Developer",
    company: "Kabagas Keren",
    location: "Tangerang, Banten",
    description: "Designing and developing websites for technology and IoT clients.",
    details:
      "Designed and deployed websites for client projects focused on technology, IoT, and education. Implemented SEO strategies to improve search visibility and performance. Collaborated on UI/UX planning and frontend execution. Applied skills in Web Development, SEO, and Responsive Design.",
  },
  {
    startDate: "Nov 2023",
    endDate: "Present",
    position: "Electronics Lab Assistant",
    company: "State College of Meteorology, Climatology, and Geophysics",
    location: "Tangerang, Banten",
    description: "Managing lab inventory and supporting students in practical sessions.",
    details:
      "Managed inventory of lab instruments and electronic components. Assisted in writing and revising practical modules for students. Supervised and guided students during hands-on lab sessions. Developed a web-based platform for inventory management, equipment borrowing, and scheduling practical sessions using Next.js, React.js, Tailwind CSS, and TypeScript.",
  },
  {
    startDate: "Jan 2023",
    endDate: "Jan 2025",
    position: "Team Manager",
    company: "AURORA STMKG – Aircraft Division (Megadirga)",
    location: "Tangerang, Banten",
    description: "Leading student research group focused on unmanned systems and remote sensing.",
    details:
      "Led a student research group focused on unmanned systems and remote sensing. Coordinated team deliverables and ensured technical milestones were met. Assisted in managing field testing and prototyping activities.",
  },
]

const BriefcaseIcon = ({ progress }: { progress: number }) => (
  <RiBriefcaseLine className="w-6 h-6" style={{ transform: `scale(${progress})` }} />
)

export default function Timeline() {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })
  
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center py-8 md:py-20 bg-background overflow-hidden elegant-section elegant-gradient"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full">
        <motion.div
          className="text-center mb-6 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-xl md:text-3xl font-bold text-foreground sm:text-4xl">Professional Journey</h2>
          <p className="mt-2 md:mt-4 text-sm md:text-lg text-muted-foreground">My career path and professional development in technology and meteorology</p>
        </motion.div>

        <div className="relative">
          {/* Vertical line - positioned differently on mobile vs desktop - grows/shrinks with scroll */}
          <motion.div
            className="absolute left-3.5 md:left-1/2 transform md:-translate-x-1/2 w-0.5 bg-primary/20 origin-top"
            style={{ 
              top: "8px", /* Position at first icon top */
              height: "calc(100% - 8px)", /* Full height */
              scaleY: scaleY /* This animates the height based on scroll progress */
            }}
          />

          {timelineEvents.map((event, index) => (
            <TimelineEvent
              key={`${event.company}-${event.position}-${event.startDate}`}
              event={event}
              index={index}
              isExpanded={expandedEvent === index}
              onToggle={() => setExpandedEvent(expandedEvent === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function TimelineEvent({
  event,
  index,
  isExpanded,
  onToggle,
}: {
  event: (typeof timelineEvents)[0]
  index: number
  isExpanded: boolean
  onToggle: () => void
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <div ref={ref} className="mb-8 w-full relative">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
        className={`flex items-start ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"} w-full`}
      >
        {/* Mobile timeline node (only visible on mobile) */}
        <div className="z-20 flex-shrink-0 mr-3 flex md:hidden self-start mt-3">
          <div className="flex items-center justify-center w-7 h-7 bg-primary rounded-full shadow-md">
            <RiBriefcaseLine className="w-3.5 h-3.5 text-background" />
          </div>
        </div>
        
        {/* Desktop timeline node - positioned at the top of each card (only visible on desktop) */}
        <div className="z-20 hidden md:flex md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:top-0 md:mt-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-full shadow-md">
            <RiBriefcaseLine className="w-5 h-5 text-background" />
          </div>
        </div>
        
        {/* Card */}
        <motion.div
          className={`flex-1 max-w-[calc(100%-40px)] md:max-w-none md:w-[45%] ${
            index % 2 === 0 ? "md:mr-[calc(50%+24px)]" : "md:ml-[calc(50%+24px)]"
          } elegant-glow`}
          whileHover={{ scale: 1.02 }}
        >
          <div className={`p-3 md:p-5 bg-card rounded-lg shadow-md border border-primary/20 flex flex-col justify-between transition-all duration-300 ${isExpanded ? 'min-h-[auto]' : 'min-h-[auto]'}`}>
            <div>
              <div className="flex justify-between items-start mb-1.5">
                <span className="px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs font-medium bg-primary/10 text-primary rounded-full">
                  {event.startDate} - {event.endDate}
                </span>
              </div>
              <h3 className="text-sm md:text-lg font-semibold mb-0.5 md:mb-1 text-card-foreground">{event.position}</h3>
              <h4 className="text-[10px] md:text-sm font-medium text-primary mb-0.5 md:mb-1">{event.company}</h4>
              <div className="flex items-center mb-1.5 md:mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-3.5 md:w-3.5 text-muted-foreground mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-[9px] md:text-xs text-muted-foreground">{event.location}</span>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3 text-justify">{event.description}</p>
            </div>
            
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="border-t border-primary/10 pt-1.5 md:pt-2 mt-1 md:mt-1.5">
                <p className="text-[10px] md:text-sm text-muted-foreground leading-relaxed text-justify">{event.details}</p>
              </div>
            </motion.div>
            
            <div className="mt-auto pt-2 md:pt-3">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle();
                }}
                className="text-[10px] md:text-sm font-medium px-2 md:px-4 py-1 md:py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-full flex items-center gap-1 md:gap-1.5 transition-colors"
              >
                {isExpanded ? "See less" : "See more"}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`w-2.5 h-2.5 md:w-4 md:h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

