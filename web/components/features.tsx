"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Bookmark, Search, Share2 } from "lucide-react"

export default function Features() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight
      const elementPosition = document.getElementById("features")?.offsetTop || 0

      if (scrollPosition > elementPosition) {
        setIsVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const features = [
    {
      icon: <Bookmark className="h-6 w-6" />,
      title: "One-Click Bookmarking",
      description: "Save any ChatGPT conversation with a single click directly from the chat interface.",
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: "Quick Search",
      description: "Easily find saved conversations with powerful search functionality.",
    },
    {
      icon: <Share2 className="h-6 w-6" />,
      title: "Easy Sharing",
      description: "Share your bookmarked conversations with others via direct links.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="features" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Powerful Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            GPTArchive comes packed with everything you need to efficiently manage your ChatGPT conversations.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center p-6 bg-white rounded-lg border border-gray-100 shadow-sm text-center transition-all duration-200 hover:shadow-md hover:border-primary/20"
            >
              <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center mb-4 text-primary">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}