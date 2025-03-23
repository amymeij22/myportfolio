"use client"

import { motion } from "framer-motion"
import { SiHtml5, SiCss3, SiJavascript, SiPhp, SiPython, SiQgis } from "react-icons/si"
import { RiMicrosoftFill, RiEnglishInput, RiTeamFill, RiLightbulbFlashLine, RiDatabase2Fill } from "react-icons/ri"
import { IoHardwareChip } from "react-icons/io5"
import { useTheme } from "next-themes"

const skills = [
  {
    icon: <RiMicrosoftFill className="w-10 h-10 mb-3" />,
    title: "Microsoft Office",
  },
  {
    icon: <SiHtml5 className="w-10 h-10 mb-3" />,
    title: "HTML",
  },
  {
    icon: <SiCss3 className="w-10 h-10 mb-3" />,
    title: "CSS",
  },
  {
    icon: <SiJavascript className="w-10 h-10 mb-3" />,
    title: "JavaScript",
  },
  {
    icon: <SiPhp className="w-10 h-10 mb-3" />,
    title: "PHP",
  },
  {
    icon: <SiPython className="w-10 h-10 mb-3" />,
    title: "Python",
  },
  {
    icon: <IoHardwareChip className="w-10 h-10 mb-3" />,
    title: "IoT",
  },
  {
    icon: <RiEnglishInput className="w-10 h-10 mb-3" />,
    title: "English & Indonesia",
  },
  {
    icon: <SiQgis className="w-10 h-10 mb-3" />,
    title: "QGIS",
  },
  {
    icon: <RiDatabase2Fill className="w-10 h-10 mb-3" />,
    title: "Data Analysis",
  },
  {
    icon: <RiLightbulbFlashLine className="w-10 h-10 mb-3" />,
    title: "Problem Solving",
  },
  {
    icon: <RiTeamFill className="w-10 h-10 mb-3" />,
    title: "Teamwork",
  },
]

export default function Skills() {
  const { theme } = useTheme()

  return (
    <section className="min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 bg-background elegant-section elegant-dots">
      <div className="container mx-auto">
        <motion.h2
          className="text-5xl font-black mb-16 text-center text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          My Skills
        </motion.h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              className="skill-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.05 }}
            >
              <div className={`${theme === "dark" ? "text-white" : "text-black"}`}>
                {skill.icon}
              </div>
              <h3 className="text-base font-medium text-card-foreground">{skill.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}