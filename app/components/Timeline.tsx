"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { RiBookOpenLine } from "react-icons/ri"

const timelineEvents = [
  {
    year: 2019,
    title: "Started College",
    description: "Began my journey at STMKG Indonesia, majoring in Instrumentation.",
    details:
      "Enrolled in the State College of Meteorology, Climatology, and Geophysics (STMKG) Indonesia to pursue my passion for meteorological instrumentation and technology.",
  },
  {
    year: 2020,
    title: "First Research Project",
    description: "Completed my first research project on weather monitoring systems.",
    details:
      "Designed and implemented a small-scale IoT weather monitoring system that could collect and analyze basic meteorological data in real-time.",
  },
  {
    year: 2021,
    title: "Web Development",
    description: "Started learning web development and built my first website.",
    details:
      "Taught myself HTML, CSS, and JavaScript, and created my first portfolio website to showcase my academic projects and research interests.",
  },
  {
    year: 2022,
    title: "Internship Experience",
    description: "Completed an internship at a meteorological research institute.",
    details:
      "Gained valuable hands-on experience working with professional meteorological instruments and data analysis techniques during a 3-month internship.",
  },
  {
    year: 2023,
    title: "Advanced Programming",
    description: "Expanded my programming skills to include Python and data analysis.",
    details:
      "Learned Python for data analysis and visualization, focusing on applications in meteorology and climate science. Started working with libraries like Pandas, NumPy, and Matplotlib.",
  },
  {
    year: 2024,
    title: "Current Projects",
    description: "Working on IoT systems and continuing my education.",
    details:
      "Currently developing advanced IoT systems for environmental monitoring while completing my studies at STMKG. Also exploring AI applications in meteorological forecasting.",
  },
]

const BookIcon = ({ progress }: { progress: number }) => (
  <RiBookOpenLine className="w-6 h-6" style={{ transform: `scale(${progress})` }} />
)

export default function Timeline() {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center py-20 bg-background overflow-hidden elegant-section elegant-gradient"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">My Journey</h2>
          <p className="mt-4 text-lg text-muted-foreground">The path of my academic and professional development</p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-primary/20"
            style={{ scaleY: scaleX }}
          />

          {/* Book icon */}
          <motion.div
            className="sticky top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-primary"
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
          >
            <BookIcon progress={useTransform(scrollYProgress, [0, 1], [0.5, 1]) as any} />
          </motion.div>

          {timelineEvents.map((event, index) => (
            <TimelineEvent
              key={event.year}
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
    <motion.div
      ref={ref}
      className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? "flex-row-reverse" : ""}`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <div className="w-5/12" />
      <div className="z-20">
        <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full">
          <div className="w-3 h-3 bg-background rounded-full" />
        </div>
      </div>
      <motion.div
        className="w-5/12 cursor-pointer elegant-glow"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggle}
      >
        <div className="p-4 bg-card rounded-lg shadow-md border border-primary/20">
          <span className="font-bold text-primary">{event.year}</span>
          <h3 className="text-lg font-semibold mb-1 text-card-foreground">{event.title}</h3>
          <p className="text-muted-foreground">{event.description}</p>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="mt-2 text-sm text-muted-foreground">{event.details}</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

