'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Server, Brain, Code, Database } from "lucide-react"
import Layout from "../components/layout"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function SkillsPage() {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    setIsVisible(true)
  }, [])

  const skillCategories = [
    {
      title: "Programming Languages",
      icon: Code,
      skills: ["Python", "Java", "C/C++", "JavaScript"],
    },
    {
      title: "Databases",
      icon: Database,
      skills: ["MySQL", "SQL Plus","MongoDB","Firebase"],
    },
    {
      title: "Machine Learning & Data Science",
      icon: Brain,
      skills: ["TensorFlow", "Scikit-learn", "Keras","Pandas", "NumPy", "Matplotlib", "Jupyter"],
    },
    {
      title: "Tools & Frameworks",
      icon: Server,
      skills: ["HTML/CSS","ReactJS","Next.js","React Native","BeautifulSoup","Puppeteer","TailwindCSS"],
    },
   
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8
      }
    }
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-8">
        {" "}
        <motion.h1 className="text-3xl font-bold mb-6 md:mb-6" initial="hidden" animate={isVisible ? "visible" : "hidden"} variants={titleVariants}>
          My Skills
        </motion.h1>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {" "}
          {skillCategories.map((category, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <category.icon className="h-6 w-6 mr-2 text-primary" />
                  <CardTitle className="text-xl font-bold md:text-xl">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="bg-secondary text-secondary-foreground text-sm md:text-sm md:px-3 px-3 py-1 rounded-full"
                      >
                        {" "}
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Layout>
  )
}