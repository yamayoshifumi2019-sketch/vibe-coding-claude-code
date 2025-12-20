'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useProgress } from '@/contexts/ProgressContext'

interface Example {
  id: number
  text: string
}

interface Word {
  id: number
  word: string
  pronunciation: string
  definition: string
  usageTip: string | null
  partOfSpeech: string
  difficulty: number
  examples: Example[]
  synonyms: { id: number; text: string }[]
  antonyms: { id: number; text: string }[]
}

export default function WordDetailPage() {
  const params = useParams()
  const [word, setWord] = useState<Word | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toggleFavorite, isFavorite, getWordStats } = useProgress()

  useEffect(() => {
    async function fetchWord() {
      try {
        const response = await fetch(`/api/words/${params.id}`)
        if (!response.ok) {
          throw new Error('Word not found')
        }
        const data = await response.json()
        setWord(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load word')
      } finally {
        setLoading(false)
      }
    }
    fetchWord()
  }, [params.id])

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="mt-2 text-gray-500">Loading...</p>
      </div>
    )
  }

  if (error || !word) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-red-500">{error || 'Word not found'}</p>
        <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
          Back to word list
        </Link>
      </div>
    )
  }

  const favorite = isFavorite(word.id)
  const stats = getWordStats(word.id)

  // Difficulty level labels
  const difficultyLabels = ['', 'Beginner', 'Elementary', 'Intermediate', 'Upper-Int', 'Advanced']

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Back Link */}
      <Link
        href="/"
        className="inline-flex items-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
      >
        <span className="mr-2">←</span> Back to list
      </Link>

      {/* Word Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {word.word}
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              {word.pronunciation}
            </p>
          </div>
          <button
            onClick={() => toggleFavorite(word.id)}
            className="text-3xl hover:scale-110 transition-transform"
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {favorite ? '⭐' : '☆'}
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
            {word.partOfSpeech}
          </span>
          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm">
            {difficultyLabels[word.difficulty]} (Level {word.difficulty})
          </span>
          {stats.total > 0 && (
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
              Quiz: {stats.correct}/{stats.total} correct
            </span>
          )}
        </div>

        {/* Definition */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-4">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Definition
          </h2>
          <p className="text-lg text-gray-800 dark:text-gray-200">
            {word.definition}
          </p>
        </div>

        {/* Usage Tip */}
        {word.usageTip && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 rounded-r-lg p-4 mb-4">
            <h2 className="text-sm font-semibold text-yellow-700 dark:text-yellow-400 uppercase tracking-wider mb-1">
              Usage Tip
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {word.usageTip}
            </p>
          </div>
        )}
      </div>

      {/* Examples */}
      {word.examples.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Example Sentences
          </h2>
          <ul className="space-y-3">
            {word.examples.map((example, index) => (
              <li
                key={example.id}
                className="flex gap-3 text-gray-700 dark:text-gray-300"
              >
                <span className="text-blue-500 font-medium">{index + 1}.</span>
                <span>{example.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Synonyms & Antonyms */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Synonyms */}
        {word.synonyms.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Synonyms
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              Words with similar meaning
            </p>
            <div className="flex flex-wrap gap-2">
              {word.synonyms.map(syn => (
                <span
                  key={syn.id}
                  className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm"
                >
                  {syn.text}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Antonyms */}
        {word.antonyms.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Antonyms
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              Words with opposite meaning
            </p>
            <div className="flex flex-wrap gap-2">
              {word.antonyms.map(ant => (
                <span
                  key={ant.id}
                  className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm"
                >
                  {ant.text}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3">
        <Link
          href="/flashcards"
          className="flex-1 text-center py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Practice with Flashcards
        </Link>
        <Link
          href="/quiz"
          className="flex-1 text-center py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
        >
          Take a Quiz
        </Link>
      </div>
    </div>
  )
}
