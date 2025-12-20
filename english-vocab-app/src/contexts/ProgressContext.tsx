'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

// Types for spaced repetition
interface ReviewItem {
  wordId: number
  nextReview: string // ISO date string
  interval: number   // Days until next review
  easeFactor: number // SM-2 ease factor (starts at 2.5)
}

interface QuizResult {
  wordId: number
  correct: boolean
  timestamp: string
}

interface ProgressState {
  favorites: number[]
  reviewSchedule: ReviewItem[]
  quizHistory: QuizResult[]
}

interface ProgressContextType {
  favorites: number[]
  reviewSchedule: ReviewItem[]
  quizHistory: QuizResult[]
  toggleFavorite: (wordId: number) => void
  isFavorite: (wordId: number) => boolean
  updateReviewSchedule: (wordId: number, quality: number) => void
  getWordsToReview: () => number[]
  addQuizResult: (wordId: number, correct: boolean) => void
  getWordStats: (wordId: number) => { correct: number; total: number }
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

const STORAGE_KEY = 'vocab-progress'

// Default state
const defaultState: ProgressState = {
  favorites: [],
  reviewSchedule: [],
  quizHistory: []
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(defaultState)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setState(JSON.parse(saved))
      } catch {
        console.error('Failed to parse saved progress')
      }
    }
    setIsLoaded(true)
  }, [])

  // Save to localStorage when state changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    }
  }, [state, isLoaded])

  // Toggle favorite status
  const toggleFavorite = (wordId: number) => {
    setState(prev => ({
      ...prev,
      favorites: prev.favorites.includes(wordId)
        ? prev.favorites.filter(id => id !== wordId)
        : [...prev.favorites, wordId]
    }))
  }

  // Check if word is favorite
  const isFavorite = (wordId: number) => state.favorites.includes(wordId)

  // Update review schedule using SM-2 algorithm (simplified)
  const updateReviewSchedule = (wordId: number, quality: number) => {
    // quality: 0-5 (0=complete fail, 5=perfect)
    setState(prev => {
      const existing = prev.reviewSchedule.find(r => r.wordId === wordId)
      let newInterval: number
      let newEaseFactor: number

      if (!existing) {
        // First review
        newInterval = quality >= 3 ? 1 : 0 // Review tomorrow if correct
        newEaseFactor = 2.5
      } else {
        // Calculate new ease factor
        newEaseFactor = Math.max(
          1.3,
          existing.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
        )

        if (quality < 3) {
          // Failed - reset interval
          newInterval = 0
        } else {
          // Success - increase interval
          if (existing.interval === 0) {
            newInterval = 1
          } else if (existing.interval === 1) {
            newInterval = 6
          } else {
            newInterval = Math.round(existing.interval * newEaseFactor)
          }
        }
      }

      const nextReview = new Date()
      nextReview.setDate(nextReview.getDate() + newInterval)

      const newItem: ReviewItem = {
        wordId,
        nextReview: nextReview.toISOString(),
        interval: newInterval,
        easeFactor: newEaseFactor
      }

      return {
        ...prev,
        reviewSchedule: [
          ...prev.reviewSchedule.filter(r => r.wordId !== wordId),
          newItem
        ]
      }
    })
  }

  // Get words that need review today
  const getWordsToReview = () => {
    const now = new Date()
    return state.reviewSchedule
      .filter(r => new Date(r.nextReview) <= now)
      .map(r => r.wordId)
  }

  // Add quiz result
  const addQuizResult = (wordId: number, correct: boolean) => {
    setState(prev => ({
      ...prev,
      quizHistory: [
        ...prev.quizHistory,
        { wordId, correct, timestamp: new Date().toISOString() }
      ]
    }))
  }

  // Get word statistics
  const getWordStats = (wordId: number) => {
    const results = state.quizHistory.filter(r => r.wordId === wordId)
    return {
      correct: results.filter(r => r.correct).length,
      total: results.length
    }
  }

  return (
    <ProgressContext.Provider
      value={{
        favorites: state.favorites,
        reviewSchedule: state.reviewSchedule,
        quizHistory: state.quizHistory,
        toggleFavorite,
        isFavorite,
        updateReviewSchedule,
        getWordsToReview,
        addQuizResult,
        getWordStats
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider')
  }
  return context
}
