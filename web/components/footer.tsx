import Link from "next/link"
import { Bookmark, Github, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-12 px-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Bookmark className="h-6 w-6 text-emerald-600" />
              <span className="font-bold text-xl text-emerald-600">GPTArchive</span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              GPTArchive helps you bookmark, organize, and revisit your most valuable ChatGPT conversations with just
              one click.
            </p>
            <div className="flex space-x-4 mt-4">
              <Link href="https://x.com/pulkitgarg04" className="text-muted-foreground hover:text-emerald-600 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">X</span>
              </Link>
              <Link href="https://github.com/pulkitgarg04" className="text-muted-foreground hover:text-emerald-600 transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-emerald-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#features" className="text-muted-foreground hover:text-emerald-600 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="text-muted-foreground hover:text-emerald-600 transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-muted-foreground hover:text-emerald-600 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/install" className="text-muted-foreground hover:text-emerald-600 transition-colors">
                  Installation Guide
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-emerald-600 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-emerald-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-emerald-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-6 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} GPTArchive. All rights reserved. Made with ❤️ by {" "}
            <a
              href="https://github.com/pulkitgarg04"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:underline"
            >
              Pulkit Garg
            </a></p>
        </div>
      </div>
    </footer>
  )
}

