"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getPublications } from "@/lib/supabase"

// Publication type definition
interface Publication {
  id: number;
  title: string;
  authors: string[];
  journal: string;
  publication_date: string;
  doi?: string;
  abstract: string;
  link: string;
  image_url?: string;
  created_at: string;
}

export default function Publications() {
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null)
  const [publications, setPublications] = useState<Publication[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch publications from Supabase
  useEffect(() => {
    async function fetchPublications() {
      try {
        const publicationsData = await getPublications();
        setPublications(publicationsData);
      } catch (error) {
        console.error("Error fetching publications:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchPublications();
  }, []);

  // Format date to year
  const formatYear = (dateString: string) => {
    return new Date(dateString).getFullYear().toString();
  };

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

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
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
                    <Badge variant="outline" className="mb-2">{formatYear(publication.publication_date)}</Badge>
                  </div>
                  <CardTitle className="line-clamp-2 text-lg">{publication.title}</CardTitle>
                  <CardDescription>{publication.journal}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground line-clamp-4 text-justify">{publication.abstract}</p>
                </CardContent>
                <CardFooter className="flex sm:justify-between pt-4 flex-col sm:flex-row gap-3 sm:gap-0">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedPublication(publication)}
                    className="w-full sm:w-auto"
                    aria-label="Read More"
                  >
                    Read More
                  </Button>
                  <Button 
                    variant="default"
                    onClick={() => window.open(publication.link, '_blank')}
                    className="w-full sm:w-auto"
                    aria-label="View Publication"
                  >
                    View Publication
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        )}
      </div>

      <Dialog open={!!selectedPublication} onOpenChange={() => setSelectedPublication(null)}>
        {selectedPublication && (
          <DialogContent className="dialog-content overflow-hidden">
            <DialogHeader className="pb-2 border-b border-border/30">
              <DialogTitle className="text-xl font-bold">{selectedPublication.title}</DialogTitle>
              <div className="flex justify-between items-center mt-2">
                <DialogDescription className="text-sm">{selectedPublication.journal}</DialogDescription>
                <Badge variant="outline" className="ml-2 shrink-0">{formatYear(selectedPublication.publication_date)}</Badge>
              </div>
            </DialogHeader>
            <div className="mt-4 flex flex-col space-y-4 overflow-y-auto max-h-[50vh] pr-1">
              <div>
                <h4 className="text-sm font-medium mb-2">Authors</h4>
                <p className="text-sm text-muted-foreground">{selectedPublication.authors.join(', ')}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Abstract</h4>
                <p className="text-sm text-muted-foreground text-justify">{selectedPublication.abstract}</p>
              </div>
              {selectedPublication.doi && (
                <div>
                  <h4 className="text-sm font-medium mb-2">DOI</h4>
                  <p className="text-sm text-primary">{selectedPublication.doi}</p>
                </div>
              )}
            </div>
            <div className="mt-6 pt-4 border-t border-border/30 flex justify-end">
              <Button 
                onClick={() => window.open(selectedPublication.link, '_blank')}
                className="transition-all hover:scale-105"
                aria-label="View Full Publication"
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