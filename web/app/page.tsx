import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Hero from "@/components/hero"
import Features from "@/components/features"
import Testimonials from "@/components/testimonials"
import FAQ from "@/components/faq"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <Features />

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              GPTArchive makes it incredibly simple to save and organize your ChatGPT conversations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm transition-all duration-200 hover:shadow-md">
              <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Install the Extension</h3>
              <p className="text-muted-foreground">Add GPTArchive to your browser with just a few clicks</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm transition-all duration-200 hover:shadow-md">
              <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Save with Context</h3>
              <p className="text-muted-foreground">Bookmark chats with custom titles, tags, and notes for better organization</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm transition-all duration-200 hover:shadow-md">
              <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Manage Your Archive</h3>
              <p className="text-muted-foreground">Use the dashboard to search, filter by tags, and manage your saved conversations</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/install" className="bg-emerald-600 p-4 rounded-2xl text-white">
              <Button size="lg" className="group">
                Install Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Testimonials />
      <FAQ />

      <section className="py-20 bg-gray-800 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Never Lose a Valuable ChatGPT Conversation Again</h2>
            <p className="mb-8 text-primary-foreground/90">
              Join thousands of users who use GPTArchive to save and organize their ChatGPT history
            </p>
            <Link href="/install">
              <Button size="lg" variant="secondary" className="group bg-emerald-600 p-4 rounded-2xl">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}