'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useProgress } from '@/contexts/ProgressContext'

interface Word {
  id: number
  word: string
  pronunciation: string
  definition: string
  examples: { text: string }[]
  synonyms: { text: string }[]
}

export default function FlashcardsPage() {
  const [words, setWords] = useState<Word[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [loading, setLoading] = useState(true)
  const [mode, setMode] = useState<'all' | 'favorites' | 'review'>('all')
  const { favorites, getWordsToReview, updateReviewSchedule } = useProgress()

  // Fetch words based on mode
  const fetchWords = useCallback(async () => {
    setLoading(true)
    try {
      let url = '/api/words'

      if (mode === 'favorites' && favorites.length > 0) {
        url += `?favorites=${favorites.join(',')}`
      } else if (mode === 'review') {
        const reviewIds = getWordsToReview()
        if (reviewIds.length > 0) {
          url += `?favorites=${reviewIds.join(',')}`
        }
      }

      const response = await fetch(url)
      const data = await response.json()

      // Shuffle the words for variety
      const shuffled = [...data].sort(() => Math.random() - 0.5)
      setWords(shuffled)
      setCurrentIndex(0)
      setIsFlipped(false)
    } catch (error) {
      console.error('Failed to fetch words:', error)
    } finally {
      setLoading(false)
    }
  }, [mode, favorites, getWordsToReview])

  useEffect(() => {
    fetchWords()
  }, [fetchWords])

  const currentWord = words[currentIndex]

  const handleFlip = () => setIsFlipped(!isFlipped)

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsFlipped(false)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setIsFlipped(false)
    }
  }

  // Spaced repetition: mark how well you knew the word
  const handleKnowledge = (quality: number) => {
    if (currentWord) {
      updateReviewSchedule(currentWord.id, quality)
    }
    handleNext()
  }

  const handleShuffle = () => {
    const shuffled = [...words].sort(() => Math.random() - 0.5)
    setWords(shuffled)
    setCurrentIndex(0)
    setIsFlipped(false)
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="mt-2 text-gray-500">Loading flashcards...</p>
      </div>
    )
  }

  const noWords = words.length === 0
  const reviewWords = getWordsToReview()

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Flashcards
      </h1>

      {/* Mode Selection */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setMode('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            mode === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
          }`}
        >
          All Words
        </button>
        <button
          onClick={() => setMode('favorites')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            mode === 'favorites'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
          }`}
        >
          Favorites ({favorites.length})
        </button>
        <button
          onClick={() => setMode('review')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            mode === 'review'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
          }`}
        >
          Due for Review ({reviewWords.length})
        </button>
      </div>

      {noWords ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400">No words to study</p>
          <p className="text-gray-500 mt-2">
            {mode === 'favorites'
              ? 'Add some words to favorites first'
              : mode === 'review'
              ? 'No words are due for review today'
              : 'No words in the database'}
          </p>
          <Link
            href="/"
            className="inline-block mt-4 text-blue-600 hover:underline"
          >
            Browse words
          </Link>
        </div>
      ) : (
        <>
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Card {currentIndex + 1} of {words.length}</span>
            <button
              onClick={handleShuffle}
              className="text-blue-600 hover:underline"
            >
              Shuffle
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
            />
          </div>

          {/* Flashcard */}
          <div
            onClick={handleFlip}
            className="cursor-pointer perspective-1000"
          >
            <div
              className={`relative w-full min-h-[300px] transition-transform duration-500 transform-style-preserve-3d ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
              }}
            >
              {/* Front of Card - Word */}
              <div
                className="absolute inset-0 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <span className="text-sm text-gray-400 mb-2">Tap to reveal</span>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {currentWord?.word}
                </h2>
                <p className="text-lg text-gray-500">
                  {currentWord?.pronunciation}
                </p>
              </div>

              {/* Back of Card - Definition */}
              <div
                className="absolute inset-0 bg-blue-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-blue-200 dark:border-gray-700 flex flex-col items-center justify-center"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <span className="text-sm text-blue-400 mb-2">Definition</span>
                <p className="text-xl text-gray-800 dark:text-white text-center mb-4">
                  {currentWord?.definition}
                </p>
                {currentWord?.examples[0] && (
                  <p className="text-gray-600 dark:text-gray-400 text-center italic">
                    &quot;{currentWord.examples[0].text}&quot;
                  </p>
                )}
                {currentWord?.synonyms.length > 0 && (
                  <div className="mt-4 flex gap-2 flex-wrap justify-center">
                    {currentWord.synonyms.slice(0, 3).map((syn, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded text-sm"
                      >
                        {syn.text}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ← Previous
            </button>
            <Link
              href={`/words/${currentWord?.id}`}
              className="text-blue-600 hover:underline"
            >
              View Details
            </Link>
            <button
              onClick={handleNext}
              disabled={currentIndex === words.length - 1}
              className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next →
            </button>
          </div>

          {/* Knowledge Rating (for spaced repetition) */}
          {isFlipped && (
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
              <p className="text-center text-sm text-gray-500 mb-3">
                How well did you know this word?
              </p>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => handleKnowledge(1)}
                  className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors text-sm"
                >
                  Did not know
                </button>
                <button
                  onClick={() => handleKnowledge(3)}
                  className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-colors text-sm"
                >
                  Hard
                </button>
                <button
                  onClick={() => handleKnowledge(4)}
                  className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors text-sm"
                >
                  Good
                </button>
                <button
                  onClick={() => handleKnowledge(5)}
                  className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors text-sm"
                >
                  Easy
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
