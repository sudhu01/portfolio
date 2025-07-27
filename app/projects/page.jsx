'use client'
import { Card } from "@/components/ui/card"
import { GitBranch, ExternalLink } from "lucide-react"
import Layout from "../components/layout"
import Link from "next/link"
import { motion } from "framer-motion"

export default function ProjectsPage() {
  const projects = [
    {
      title: "Fashion For Everyone",
      description: "A deep learning project that uses a GAN model to provide fashion recommendations (overlays) for users.",
      tech: ["Python", "TensorFlow", "Keras"],
      link: "https://github.com/sudhu01/fashion-for-everyone"
    },
    {
      title: "Premier League Match Predictor",
      description: "A maching learning tool that predicts the winner of a premier league match, given certain parameters. Feature collection in the dataset has been fully automated using BeautifulSoup",
      tech: ["Python", "Scikit-learn", "BeautifulSoup"],
      link: "https://github.com/sudhu01/premier-league-match-predictor"
    },
    {
      title: "VTRACK",
      description: "A mobile application to track faculty attendance based on geolocation",
      tech: ["React Native", "Firebase", "Geolocation API"],
      link: "https://github.com/sudhu01/vtrack"
    },
    {
      title: "Astitva (Work in progress)",
      description: "A web application for Self-Help Groups in India to manage members, financial records and events",
      tech: ["Javascript", "Next.js","TailwindCSS"],
      link: "",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  return (
    <Layout>
      <motion.div 
        className="container mx-auto px-4 py-6 md:py-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {" "}
        <motion.h1 
          className="text-2xl md:text-3xl font-bold mb-4 md:mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 0.5,
              ease: "easeOut"
            }
          }}
        >
          My Projects
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {" "}
          {projects.map((project, index) => (
            <motion.div 
              key={index} 
              className="h-64 perspective-1000"
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.5,
                  ease: "easeOut",
                  delay: 0.1 * index
                }
              }}
            >
              <div className="relative w-full h-full transform-style-preserve-3d transition-transform duration-500 hover:rotate-y-180">
                <div className="absolute w-full h-full backface-hidden">
                  <Card className="w-full h-full">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <Link href={project.link} target="_blank"><h3 className="text-lg md:text-xl font-bold">{project.title}</h3></Link>
                        <GitBranch className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-4 md:text-base">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <span key={techIndex} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
                
                <div className="absolute w-full h-full backface-hidden rotate-y-180">
                  <Card className="w-full h-full flex items-center justify-center">
                    <div className="text-center p-6">
                      <h3 className="text-xl font-bold mb-4">{project.title}</h3>
                      <p className="mb-6">View source code:</p>
                      {project.link ? (
                        <Link 
                          href={project.link} 
                          target="_blank" 
                          className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md"
                        >
                          GitHub Repository <ExternalLink className="h-4 w-4" />
                        </Link>
                      ) : (
                        <span className="text-muted-foreground">Coming soon</span>
                      )}
                    </div>
                  </Card>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Layout>
  )
}