"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Star } from "lucide-react"

export default function Testimonials() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight
      const elementPosition = document.getElementById("testimonials")?.offsetTop || 0

      if (scrollPosition > elementPosition) {
        setIsVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const testimonials = [
    {
      name: "Pulkit Garg",
      role: "GPTArchive's Developer",
      content:
        "GPTArchive has completely transformed how I save and reference my ChatGPT conversations. It's an essential tool for my research work.",
      avatar: "https://avatars.githubusercontent.com/u/87312278?v=4",
    },
    {
      name: "Anmol Tuetja",
      role: "Software Developer",
      content:
        "I use ChatGPT daily for content ideas, and GPTArchive helps me keep track of all my best conversations. Couldn't work without it!",
      avatar: "https://avatars.githubusercontent.com/u/139005713?v=4",
    },
    {
      name: "Kavya Goel",
      role: "Community Manager",
      content:
        "The ability to quickly bookmark and categorize ChatGPT conversations has been a game-changer for my workflow. Highly recommended.",
      avatar: "https://avatars.githubusercontent.com/u/147709304?v=4",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">What Our Users Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied users who use GPTArchive to enhance their ChatGPT experience
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants} className="flex flex-col p-6 bg-white rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 flex-grow">{testimonial.content}</p>
              <div className="flex items-center mt-auto">
              <Image
                  src={testimonial.avatar || "https://avatar.iran.liara.run/public/42"}
                  alt={testimonial.name}
                  width={40}
                  height={40}
                  className="rounded-full mr-3"
                />
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

