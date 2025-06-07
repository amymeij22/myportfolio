"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useMobile } from "@/hooks/use-mobile"
import { getProjects } from "@/lib/supabase"

// Project type definition
interface Project {
	id: number;
	title: string;
	caption: string;
	description: string;
	image_url: string;
	category: string;
	demo_url?: string;
	github_url?: string;
	featured: boolean;
	created_at: string;
}

export default function PortfolioGrid() {
	const [filter, setFilter] = useState("All")
	const [selectedProject, setSelectedProject] = useState<number | null>(null)
	const [modalOpen, setModalOpen] = useState(false)
	const [currentProject, setCurrentProject] = useState<Project | null>(null)
	const [projects, setProjects] = useState<Project[]>([])
	const [categories, setCategories] = useState<string[]>(["All"])
	const [loading, setLoading] = useState(true)
	const isMobile = useMobile()

	// Fetch projects from Supabase
	useEffect(() => {
		async function fetchProjects() {
			try {
				const projectsData = await getProjects();
				setProjects(projectsData);
				
				// Extract unique categories
				const uniqueCategories = ["All", ...Array.from(new Set(projectsData.map((project: Project) => project.category)))];
				setCategories(uniqueCategories);
			} catch (error) {
				console.error("Error fetching projects:", error);
			} finally {
				setLoading(false);
			}
		}
		
		fetchProjects();
	}, []);

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

	const openProjectModal = (project: Project) => {
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

				{loading ? (
					<div className="flex justify-center items-center py-20">
						<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
					</div>
				) : (
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
										src={project.image_url || "/placeholder.svg"}
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
									<h3 className="text-lg font-semibold text-card-foreground mb-2 line-clamp-2">{project.title}</h3>
									{project.caption && (
										<p className="text-muted-foreground mb-3 text-sm line-clamp-2 text-justify">{project.caption}</p>
									)}
									<div className="flex justify-between items-center">
										<a
											href={project.demo_url || "#"}
											className="text-primary hover:underline inline-flex items-center font-medium"
											target="_blank"
											rel="noopener noreferrer"
											aria-label="View Project"
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
											aria-label="Details"
										>
											Details
										</Button>
									</div>
								</div>
							</motion.div>
						))}
					</AnimatePresence>
				</motion.div>
				)}
			</div>

			{/* Project Details Modal */}
			<Dialog open={modalOpen} onOpenChange={setModalOpen}>
				<DialogContent className="dialog-content overflow-hidden">
					{currentProject && (
						<>
							<DialogHeader className="pb-2 border-b border-border/30">
								<DialogTitle className="text-xl font-bold">{currentProject.title}</DialogTitle>
								<div className="flex justify-between items-center mt-2">
									<DialogDescription className="text-sm">{currentProject.caption}</DialogDescription>
									<Badge variant="outline" className="ml-2 shrink-0">{currentProject.category}</Badge>
								</div>
							</DialogHeader>
							<div className="mt-4 flex flex-col space-y-4 overflow-y-auto max-h-[50vh] pr-1">
								<div className="relative w-full h-56 mb-2 overflow-hidden rounded-lg">
									<Image
										src={currentProject.image_url || "/placeholder.svg"}
										alt={currentProject.title}
										layout="fill"
										objectFit="cover"
									/>
								</div>
								<div>
									<h4 className="text-sm font-medium mb-2">Description</h4>
									<p className="text-sm text-muted-foreground text-justify">{currentProject.description}</p>
								</div>
								{currentProject.github_url && (
									<div>
										<h4 className="text-sm font-medium mb-2">GitHub Repository</h4>
										<p className="text-sm text-primary">
											<a 
												href={currentProject.github_url} 
												target="_blank" 
												rel="noopener noreferrer"
												className="hover:underline inline-flex items-center"
												aria-label="GitHub Repository"
											>
												{currentProject.github_url}
												<svg
													className="w-4 h-4 ml-1"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
													/>
												</svg>
											</a>
										</p>
									</div>
								)}
							</div>
							<div className="mt-6 pt-4 border-t border-border/30 flex justify-end">
								<Button 
									onClick={() => window.open(currentProject.demo_url || "#", "_blank")}
									className="transition-all hover:scale-105"
									aria-label="View Project"
								>
									View Project
								</Button>
							</div>
						</>
					)}
				</DialogContent>
			</Dialog>
		</section>
	)
}