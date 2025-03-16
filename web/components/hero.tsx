"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="py-16 md:py-28 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-6 text-center md:text-left"
          >
            <div className="inline-flex px-3 py-1 rounded-full bg-gray-200 text-black text-sm font-medium md:mx-0 w-fit">
              <Bookmark className="h-4 w-4 mr-1" />
              <span>ChatGPT Bookmarking Made Simple</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Save Your <span className="text-emerald-600">ChatGPT</span> Conversations
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground">
              GPTArchive helps you bookmark, organize, and revisit your most valuable ChatGPT conversations with just
              one click.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center items-center md:justify-start">
              <Link href="/install" className="bg-emerald-600 rounded-lg text-white max-w-60">
                <Button size="lg" className="group">
                  Install Extension
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative mx-auto md:mx-0"
          >
            <div className="relative rounded-lg overflow-hidden shadow-2xl aspect-video w-full md:w-auto max-w-md sm:max-w-lg lg:max-w-xl">
              <Image
                src="/hero.png"
                alt="GPTArchive Extension Demo"
                width={640}
                height={480}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute bottom-4 right-4 bg-black/80 text-white px-4 py-2 rounded-full text-sm font-medium">
                One-Click Bookmarking
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 h-16 w-16 md:h-24 md:w-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -top-6 -left-6 h-16 w-16 md:h-24 md:w-24 bg-primary/10 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}