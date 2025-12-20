import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/Navigation"
import { ProgressProvider } from "@/contexts/ProgressContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "English Vocabulary",
  description: "Learn English words through English - no translations",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased min-h-screen`}>
        <ProgressProvider>
          {/* Header */}
          <header className="bg-blue-600 text-white py-4 px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-xl font-bold">English Vocabulary</h1>
              <p className="text-sm text-blue-100">Learn words through English</p>
            </div>
          </header>

          {/* Desktop Navigation */}
          <div className="hidden md:block bg-white dark:bg-gray-800 shadow-sm">
            <Navigation />
          </div>

          {/* Main Content */}
          <main className="max-w-4xl mx-auto px-4 py-6 pb-24 md:pb-6">
            {children}
          </main>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Navigation />
          </div>
        </ProgressProvider>
      </body>
    </html>
  )
}
