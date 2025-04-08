'use client'
import { GitBranch, GitCommit, BookCopy, Dumbbell, RailSymbol } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import ContributionGraph from "./components/contribution-graph"
import Layout from "./components/layout"
import mypic from './components/images/My pic.jpg'
import Link from "next/link"
import { motion } from "framer-motion"

export default function Portfolio() {
  // Animation variants
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
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const MotionCard = motion(Card);
  
  // Define activity items directly to avoid component reference issues
  const activityItems = [
    { text: "Working on Astitva...", IconComponent: GitCommit },
    { text: "New Bench Press PR - 80 kg!!", IconComponent: Dumbbell },
    { text: "Travelled to Salem 😊", IconComponent: RailSymbol },
    { text: "Gave my CAT-2 exams. It could have been better 😅", IconComponent: BookCopy }
  ];

  return (
    <Layout>
      <motion.div
        className="container mx-auto px-4 py-8 md:py-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {" "}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {" "}
          {/* Sidebar */}
          <motion.div className="lg:col-span-1" variants={itemVariants}>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <Image
                    src={mypic}
                    alt="Profile picture"
                    width={260}
                    height={260}
                    className="rounded-full mb-4 md:w-48 md:h-48 lg:w-full lg:h-auto"
                  />
                  <h1 className="text-2xl font-bold mb-2 md:text-2xl">Sudharsan Balajee</h1>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-center">I love building things!</p>
                  <Link href='/contact'><Button className="w-40 mb-4">Get in Touch</Button></Link>
                  
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p>🏫 VIT Chennai</p>
                    <p>🎓 B.Tech CSE - AI & ML</p>
                    <p>🚀 2nd Year Student</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main content */}
          <div className="lg:col-span-3">
            {/* Pinned Projects */}
            <motion.div variants={itemVariants}>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Pinned Projects</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {" "}
                  {["Fashion For Everyone", "Premier League Match Predictor", "VTRACK", "Astitva"].map((project, index) => (
                    <motion.div
                      key={project}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: {
                          duration: 0.3,
                          delay: 0.1 * index
                        }
                      }}
                    >
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">{project}</CardTitle>
                          <Link href="/projects"><GitBranch className="h-4 w-4 text-muted-foreground" /></Link>
                        </CardHeader>
                        <CardContent>
                          <Link href="/projects" className="hover:underline"><CardDescription>View More ➡️</CardDescription></Link>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Contribution graph */}
            <motion.div variants={itemVariants}>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Contributions</CardTitle>
                </CardHeader>
                <CardContent className="overflow-x-auto py-2">
                  <div className="min-w-[650px]">
                  {" "}
                  <ContributionGraph />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Activity Feed */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>What I have been upto</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {activityItems.map((activity, index) => {
                      const { IconComponent, text } = activity;
                      return (
                        <motion.li 
                          key={index} 
                          className="flex items-center space-x-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ 
                            opacity: 1, 
                            x: 0,
                            transition: {
                              duration: 0.3,
                              delay: 0.05 * index
                            }
                          }}
                        >
                          <IconComponent className="h-5 w-5 text-muted-foreground" />
                          <span>{text}</span>
                        </motion.li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Layout>
  )
}