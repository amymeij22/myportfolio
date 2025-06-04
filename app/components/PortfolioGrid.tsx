"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useMobile } from "@/hooks/use-mobile"

const projects = [
	{
		id: 1,
		title: "ACWS",
		caption: "Automatic Chains-D Weather Station",
		description:
			"The Automatic Chains-D Weather Station is a prototype that uses ESP32 and LoRa technology for real-time environmental monitoring. Data is transmitted wirelessly and displayed on a web dashboard, enabling easy access to current weather conditions for remote monitoring and analysis.",
		imageUrl:
			"https://1h1v9ndzh4okzjrr.public.blob.vercel-storage.com/ACWS-XsKb5VAh1tjk5SeZhURMAmgJbMJ28p",
		category: "Microcontroller",
		viewProjectUrl: "https://acws.vercel.app",
	},
	{
		id: 2,
		title: "STMKG Website",
		caption: "A Professional Website for STMKG",
		description:
			"This is a WordPress-based website aimed at enhancing the university's online presence. This responsive and user-friendly website features an intuitive design, showcasing academic programs, faculty profiles, and student resources. It provides essential information for prospective students and the community, ensuring easy navigation and access to university services.",
		imageUrl:
			"https://1h1v9ndzh4okzjrr.public.blob.vercel-storage.com/stmkg-VVbpmxqJj3kueyPNmGD2CX3bjgGAvM",
		category: "Website",
		viewProjectUrl: "https://stmkg.ac.id",
	},
	{
		id: 3,
		title: "INA-FOREWS",
		caption: "Indonesia Forest Fires Early Warning System",
		description:
			"Indonesia Forest Fires Early Warning System is a project designed to monitor and prevent forest fires in Indonesia. Utilizing multisite sensors, this system collects real-time data on environmental conditions. The information is displayed on a user-friendly web dashboard, providing timely alerts and insights to help authorities and communities respond effectively to potential fire threats. This proactive approach aims to protect Indonesia's forests and promote sustainable management practices.",
		imageUrl:
			"https://1h1v9ndzh4okzjrr.public.blob.vercel-storage.com/INA-FOREWS-QY1fnIEW6brXH0JkAuacJ8N7u6Pqi4",
		category: "IoT",
		viewProjectUrl: "https://forest-fires-ews.web.app/",
	},
	{
		id: 4,
		title: "Election App",
		caption: "STMKG Regiment Commander Voting Application",
		description: "I am made this application for the election of the STMKG Regiment Commander. This application is built using CodeIgniter.",
		imageUrl:
			"https://1h1v9ndzh4okzjrr.public.blob.vercel-storage.com/pemira-VKjP5dddhc6J2HCpAejAcepNZRa7Pc",
		category: "Website",
		viewProjectUrl: "https://stmkg.ac.id",
	},
	{
		id: 5,
		title: "Kabagas Keren",
		caption: "A Professional Startup Kabagas Keren",
		description:
			"KABAGAS KEREN is an innovative startup in the education and research sector, focused on assisting both school and professional projects. By providing a platform for collaboration, resources, and guidance, KABAGAS KEREN empowers students and professionals to achieve their goals, enhancing the quality of education and research in Indonesia.",
		imageUrl:
			"https://1h1v9ndzh4okzjrr.public.blob.vercel-storage.com/kabagas-X0fbqYnaRdoFcViApE1In1E1fM4nLv",
		category: "Other",
		viewProjectUrl: "https://kabagaskeren.web.id",
	},
	{
		id: 6,
		title: "Library Attendance System",
		caption: "A RFID Based Library Attendance System",
		description: "A RFID Based Library Attendance System for Educational Institutions.",
		imageUrl:
			"https://1h1v9ndzh4okzjrr.public.blob.vercel-storage.com/Perpustakaan-djzLBPYjeHHv56jImGxwFoDFlIWrNW",
		category: "Website",
		viewProjectUrl: "https://perpus.stmkg.ac.id",
	},
	{
		id: 7,
		title: "Chatbot Assistant",
		caption: "STMKG Chatbot Assistant",
		description:
			"It is a chatbot assistant that can help you find information about STMKG. This chatbot is built using Vue.js, integrated with Gemini API and BMKG Weather - Earthquake API.",
		imageUrl:
			"https://1h1v9ndzh4okzjrr.public.blob.vercel-storage.com/chatbot-kTxbEz42OoOIHfYHxNZJm7WiRylMRD",
		category: "Website",
		viewProjectUrl: "https://stmkg-chatbot.amymeij.web.id",
	},
	{
		id: 8,
		title: "Research",
		caption: "Explore my research paper!",
		description:
			"I am also an active novice researcher, having published several papers in various academic fields. My research interests focus on meteorology and climatology instruments, and I am committed to contributing to the advancement of knowledge through rigorous study and analysis. Engaging in research allows me to explore new ideas and collaborate with fellow scholars, further enriching my academic journey.",
		imageUrl:
			"https://1h1v9ndzh4okzjrr.public.blob.vercel-storage.com/research-d2P1GMjI6VbFhCNx1IgtP9EGrapVkS",
		category: "Other",
		viewProjectUrl: "https://orcid.org/0009-0004-4498-2082",
	},
	{
		id: 9,
		title: "COMING SOON",
		caption: "Life is about creating; every step adds meaning.",
		description:
			"Coming Soon – Exciting new developments are on the horizon! As I prepare to launch, remember: 'Life is about creating; every step adds meaning.' Stay tuned for my journey, where each moment brings me closer to making a meaningful impact.",
		imageUrl:
			"https://1h1v9ndzh4okzjrr.public.blob.vercel-storage.com/ONGOING-54KphNzUwqow2jVwZyMwnxUIGRpdxx",
		category: "Other",
		viewProjectUrl: "#",
	},
]

const categories = ["All", ...new Set(projects.map((project) => project.category))]

export default function PortfolioGrid() {
	const [filter, setFilter] = useState("All")
	const [selectedProject, setSelectedProject] = useState<number | null>(null)
	const [modalOpen, setModalOpen] = useState(false)
	const [currentProject, setCurrentProject] = useState<(typeof projects)[0] | null>(null)
	const isMobile = useMobile()

	const filteredProjects = filter === "All" ? projects : projects.filter((project) => project.category === filter)

	const handleProjectClick = (projectId: number) => {
		if (isMobile) {
			if (selectedProject === projectId) {
				setSelectedProject(null)
			} else {
				setSelectedProject(projectId)
			}
		}
	}

	const openProjectModal = (project: (typeof projects)[0]) => {
		setCurrentProject(project)
		setModalOpen(true)
	}

	return (
		<section className="relative isolate overflow-hidden bg-background min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
				<motion.div
					className="text-center mb-12"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					<h2 className="text-3xl font-bold text-foreground sm:text-4xl">My Projects</h2>
					<p className="mt-4 text-lg text-muted-foreground">A showcase of my research and development work</p>
				</motion.div>

				<div className="flex flex-wrap justify-center gap-2 mb-8">
					{categories.map((category) => (
						<button
							key={category}
							onClick={() => setFilter(category)}
							className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
								filter === category
									? "bg-primary text-primary-foreground"
									: "bg-secondary text-secondary-foreground hover:bg-secondary/80"
							}`}
						>
							{category}
						</button>
					))}
				</div>

				<motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
					<AnimatePresence>
						{filteredProjects.map((project) => (
							<motion.div
								key={project.id}
								layout
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.5 }}
								className="bg-card rounded-3xl shadow-lg overflow-hidden hover-lift transition-all duration-300 ease-in-out border border-primary/20 hover:border-primary/50 elegant-glow"
							>
								<div
									className="relative h-64 overflow-hidden cursor-pointer"
									onClick={() => handleProjectClick(project.id)}
								>
									<Image
										src={project.imageUrl || "/placeholder.svg"}
										alt={project.title}
										layout="fill"
										objectFit="cover"
										className="transition-transform duration-300 ease-in-out group-hover:scale-105"
									/>
									<motion.div
										className={`absolute inset-0 flex flex-col items-center justify-center p-6 transition-opacity duration-300 ${
											isMobile
												? selectedProject === project.id
													? "opacity-100 bg-white/50 text-black dark:bg-black/50 dark:text-white"
													: "opacity-0"
												: "opacity-0 hover:opacity-100 bg-white/50 text-black dark:bg-black/50 dark:text-white"
										}`}
									>
										<p className="text-center px-4 font-medium mb-4">{project.caption}</p>
									</motion.div>
								</div>
								<div className="p-6">
									<div className="text-sm font-medium text-primary mb-1">{project.category}</div>
									<h3 className="text-xl font-semibold text-card-foreground mb-2">{project.title}</h3>
									<div className="flex justify-between items-center">
										<a
											href={project.viewProjectUrl}
											className="text-primary hover:underline inline-flex items-center font-medium"
										>
											View Project
											<svg
												className="w-4 h-4 ml-2"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M14 5l7 7m0 0l-7 7m7-7H3"
												/>
											</svg>
										</a>
										<Button
											variant="ghost"
											size="sm"
											className="text-primary hover:text-primary/80 hover:bg-primary/10"
											onClick={() => openProjectModal(project)}
										>
											Details
										</Button>
									</div>
								</div>
							</motion.div>
						))}
					</AnimatePresence>
				</motion.div>
			</div>

			{/* Project Details Modal */}
			<Dialog open={modalOpen} onOpenChange={setModalOpen}>
				<DialogContent className="dialog-content overflow-hidden">
					{currentProject && (
						<>
							<DialogHeader className="pb-2 border-b border-border/30">
								<DialogTitle className="text-2xl font-bold text-center">
									{currentProject.title}
								</DialogTitle>
								<div className="text-sm font-medium text-primary mt-2 text-center">
									{currentProject.category}
								</div>
							</DialogHeader>
							<div className="mt-4 overflow-y-auto max-h-[60vh] pr-1">
								<div
									className="relative w-full mb-4 overflow-hidden rounded-lg shadow-md mx-auto"
									style={{ paddingTop: "56.25%" }}
								>
									<Image
										src={currentProject.imageUrl || "/placeholder.svg"}
										alt={currentProject.title}
										layout="fill"
										objectFit="cover"
										className="absolute inset-0 w-full h-full rounded-lg"
									/>
								</div>
								<DialogDescription className="text-foreground text-base text-justify mt-4">
									{currentProject.description}
								</DialogDescription>
							</div>
							<div className="mt-6 pt-4 border-t border-border/30 flex justify-center">
								<a
									className="bg-primary hover:bg-primary/90 text-black dark:text-black px-6 py-2 rounded-md inline-block transition-all hover:scale-105 font-medium"
									href={currentProject.viewProjectUrl}
									target="_blank"
								>
									View Full Project
								</a>
							</div>
						</>
					)}
				</DialogContent>
			</Dialog>
		</section>
	)
}