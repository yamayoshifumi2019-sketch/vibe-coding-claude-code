'use client'

import { useState, useEffect, useCallback } from 'react'
import WordCard from '@/components/WordCard'
import SearchBar from '@/components/SearchBar'
import { useProgress } from '@/contexts/ProgressContext'

interface Word {
  id: number
  word: string
  pronunciation: string
  definition: string
  partOfSpeech: string
  difficulty: number
}

export default function HomePage() {
  const [words, setWords] = useState<Word[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const { favorites } = useProgress()

  // Fetch words from API
  const fetchWords = useCallback(async () => {
    setLoading(true)
    try {
      let url = '/api/words'
      const params = new URLSearchParams()

      if (searchQuery) {
        params.append('search', searchQuery)
      }
      if (showFavoritesOnly && favorites.length > 0) {
        params.append('favorites', favorites.join(','))
      }

      if (params.toString()) {
        url += '?' + params.toString()
      }

      const response = await fetch(url)
      const data = await response.json()

      // If showing favorites only but none exist, show empty
      if (showFavoritesOnly && favorites.length === 0) {
        setWords([])
      } else {
        setWords(data)
      }
    } catch (error) {
      console.error('Failed to fetch words:', error)
    } finally {
      setLoading(false)
    }
  }, [searchQuery, showFavoritesOnly, favorites])

  useEffect(() => {
    fetchWords()
  }, [fetchWords])

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
  }, [])

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="space-y-4">
        <SearchBar onSearch={handleSearch} />

        <div className="flex gap-2">
          <button
            onClick={() => setShowFavoritesOnly(false)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !showFavoritesOnly
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            All Words
          </button>
          <button
            onClick={() => setShowFavoritesOnly(true)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              showFavoritesOnly
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Favorites ({favorites.length})
          </button>
        </div>
      </div>

      {/* Word List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="mt-2 text-gray-500">Loading words...</p>
        </div>
      ) : words.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400">
            {showFavoritesOnly ? 'No favorites yet' : 'No words found'}
          </p>
          <p className="text-gray-500 mt-2">
            {showFavoritesOnly
              ? 'Click the star on any word to add it to your favorites'
              : 'Try a different search term'}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {words.map(word => (
            <WordCard key={word.id} {...word} />
          ))}
        </div>
      )}

      {/* Word Count */}
      {!loading && words.length > 0 && (
        <p className="text-center text-sm text-gray-400">
          Showing {words.length} word{words.length !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  )
}
