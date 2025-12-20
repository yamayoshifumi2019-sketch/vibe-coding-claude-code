'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Words', icon: '📚' },
  { href: '/add', label: 'Add', icon: '➕' },
  { href: '/flashcards', label: 'Flashcards', icon: '🗂️' },
  { href: '/quiz', label: 'Quiz', icon: '✏️' },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 md:relative md:border-t-0 md:border-b">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-around md:justify-start md:gap-8">
          {navItems.map(item => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 py-3 md:py-4 px-3
                  ${isActive
                    ? 'text-blue-600 dark:text-blue-400 font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
              >
                <span className="text-xl md:text-base">{item.icon}</span>
                <span className="text-xs md:text-base">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
