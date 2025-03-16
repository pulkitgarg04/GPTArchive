import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Nav from "@/components/nav"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GPTArchive - Bookmark Your ChatGPT Conversations",
  description:
    "GPTArchive helps you bookmark, organize, and revisit your most valuable ChatGPT conversations with just one click."
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Nav />
          <div className="pt-16 md:pt-20">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}