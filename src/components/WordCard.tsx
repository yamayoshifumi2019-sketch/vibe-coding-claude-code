'use client'

import Link from 'next/link'
import { useProgress } from '@/contexts/ProgressContext'

interface WordCardProps {
  id: number
  word: string
  pronunciation: string
  definition: string
  partOfSpeech: string
  difficulty: number
}

export default function WordCard({
  id,
  word,
  pronunciation,
  definition,
  partOfSpeech,
  difficulty
}: WordCardProps) {
  const { toggleFavorite, isFavorite } = useProgress()
  const favorite = isFavorite(id)

  // Difficulty indicator dots
  const difficultyDots = Array.from({ length: 5 }, (_, i) => (
    <span
      key={i}
      className={`w-2 h-2 rounded-full ${
        i < difficulty ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-600'
      }`}
    />
  ))

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <Link href={`/words/${id}`} className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
            {word}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {pronunciation}
          </p>
        </Link>
        <button
          onClick={(e) => {
            e.preventDefault()
            toggleFavorite(id)
          }}
          className="text-2xl hover:scale-110 transition-transform"
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {favorite ? '⭐' : '☆'}
        </button>
      </div>

      <span className="inline-block text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded mb-2">
        {partOfSpeech}
      </span>

      <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2 mb-3">
        {definition}
      </p>

      <div className="flex items-center gap-1">
        <span className="text-xs text-gray-400 mr-2">Level:</span>
        {difficultyDots}
      </div>
    </div>
  )
}
