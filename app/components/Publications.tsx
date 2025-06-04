"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Publications data
const publications = [
  {
    id: 1,
    title: "Radiosonde System Using ESP32 and LoRa Ra-02 Web-Based for Upper-Air Profile Observation",
    year: 2024,
    publisher: "Institute of Electrical and Electronics Engineers (IEEE)",
    abstract: "This study explores upper air profile observation using a radiosonde system based on ESP32 and LoRa Ra-02 technology. The system measures atmospheric parameters like temperature, humidity, pressure, and wind speed at various heights above the earth's surface. The developed web-based system provides a cost-effective alternative to traditional expensive radiosonde solutions, transmitting observation data from balloon-carried sensors to ground stations for weather forecasting and atmospheric analysis.",
    url: "https://ieeexplore.ieee.org/abstract/document/10762300/",
  },
  {
    id: 2,
    title: "IoT-Based Air Quality Monitoring System Design and Development Using ESP32",
    year: 2024,
    publisher: "Institute of Electrical and Electronics Engineers (IEEE)",
    abstract: "This study develops an ESP32-based Internet of Things (IoT) air quality monitoring system that detects air contaminants and transmits real-time data to a web platform. The system reliably monitors air quality and calculates Air Pollution Index (API) values. Testing revealed strong correlations with standard equipment, with the DFRobot Air Quality sensor showing R² values of 0.9402 and 0.9175 for measured parameters, while the MiCS-4514 sensor achieved an R² value of 0.8315 for CO measurement.",
    url: "https://ieeexplore.ieee.org/abstract/document/10956737/",
  },
  {
    id: 3,
    title: "Redesign of User Interface and Experience with Brand Identity Enhancement for the STMKG Website through WordPress Implementation",
    year: 2025,
    publisher: "Journal of Computation Physics and Earth Science (JoCPES)",
    abstract: "This paper presents the redesign of the STMKG website using WordPress and Elementor. The project modernized the institution's digital presence by enhancing layout consistency, mobile responsiveness, and brand identity. Key improvements included structured program sections, modern news layout, and standardized footer. The project, completed by a sixth-semester cadet, demonstrates the application of accessible web technologies to deliver scalable, branded, and user-centered digital solutions in educational settings.",
    url: "https://journal.physan.org/index.php/jocpes/article/view/63",
  },
  {
    id: 4,
    title: "PM2.5 Concentration Prediction Model in Jakarta Area Using Random Forest Algorithm",
    year: 2025,
    publisher: "Journal of Computation Physics and Earth Science (JoCPES)",
    abstract: "This study predicts PM2.5 concentrations in Jakarta using the Random Forest algorithm with data from 2015-2024. The model achieved a Mean Absolute Error of 14.44, Root Mean Square Error of 18.75, and R² Score of 0.61. Analysis showed average PM2.5 concentration of 94.46 µg/m³, with peaks up to 209 µg/m³, exceeding healthy thresholds. The model can support real-time monitoring systems and data-driven policies, with potential for enhancement through incorporation of meteorological variables.",
    url: "https://journal.physan.org/index.php/jocpes/article/view/52",
  },
  {
    id: 5,
    title: "The Carbon Dioxide Filtration System Using Chlorella Pyrenoidosa Microalgae IoT-based for Air Quality Improvement",
    year: 2024,
    publisher: "Institute of Electrical and Electronics Engineers (IEEE)",
    abstract: "This project aims to lower CO2 levels using green microalgae (Chlorella pyrenoidosa) and IoT monitoring. The system combines an MG-811 CO2 sensor with an ESP32 microcontroller, with data processed on the ThingSpeak platform. During observation, average CO2 concentration decreased from 707.07 ppm to 677.90 ppm. Statistical analysis revealed a significant trend of decreasing CO2 levels, though data showed inconsistency with a standard deviation of 81.44 ppm.",
    url: "https://ieeexplore.ieee.org/abstract/document/10957176/",
  },
  {
    id: 6,
    title: "Model of Lightning Strike Risk to Humans Based on Spatial Analysis and Environmental Factors",
    year: 2023,
    publisher: "Journal of Computation Physics and Earth Science (JoCPES)",
    abstract: "This study develops a predictive model of lightning strike risk to humans using spatial analysis and environmental data. The model utilizes lightning distribution, land use, population density, and meteorological parameters to identify key risk factors. Results show densely populated areas in Java and Sumatra are particularly vulnerable. The generated risk maps provide insights for disaster mitigation planning and infrastructure protection, highlighting the correlation between lightning density, land use, and population exposure.",
    url: "https://journal.physan.org/index.php/jocpes/article/view/23",
  },
]

export default function Publications() {
  const [selectedPublication, setSelectedPublication] = useState<typeof publications[0] | null>(null)

  return (
    <section className="relative isolate overflow-hidden bg-background min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Publications</h2>
          <p className="mt-4 text-lg text-muted-foreground">My research and academic contributions</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publications.map((publication, index) => (
            <motion.div
              key={publication.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <Card className="h-full flex flex-col hover-lift transition-all duration-300 ease-in-out border border-primary/20 hover:border-primary/50 elegant-glow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="mb-2">{publication.year}</Badge>
                  </div>
                  <CardTitle className="line-clamp-2 text-lg">{publication.title}</CardTitle>
                  <CardDescription>{publication.publisher}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground line-clamp-4 text-justify">{publication.abstract}</p>
                </CardContent>
                <CardFooter className="flex sm:justify-between pt-4 flex-col sm:flex-row gap-3 sm:gap-0">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedPublication(publication)}
                    className="w-full sm:w-auto"
                  >
                    Read More
                  </Button>
                  <Button 
                    variant="default"
                    onClick={() => window.open(publication.url, '_blank')}
                    className="w-full sm:w-auto"
                  >
                    View Publication
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedPublication} onOpenChange={() => setSelectedPublication(null)}>
        {selectedPublication && (
          <DialogContent className="dialog-content overflow-hidden">
            <DialogHeader className="pb-2 border-b border-border/30">
              <DialogTitle className="text-xl font-bold">{selectedPublication.title}</DialogTitle>
              <div className="flex justify-between items-center mt-2">
                <DialogDescription className="text-sm">{selectedPublication.publisher}</DialogDescription>
                <Badge variant="outline" className="ml-2 shrink-0">{selectedPublication.year}</Badge>
              </div>
            </DialogHeader>
            <div className="mt-4 flex flex-col space-y-4 overflow-y-auto max-h-[50vh] pr-1">
              <div>
                <h4 className="text-sm font-medium mb-2">Abstract</h4>
                <p className="text-sm text-muted-foreground text-justify">{selectedPublication.abstract}</p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-border/30 flex justify-end">
              <Button 
                onClick={() => window.open(selectedPublication.url, '_blank')}
                className="transition-all hover:scale-105"
              >
                View Full Publication
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  )
} 