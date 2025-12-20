'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useProgress } from '@/contexts/ProgressContext'

interface Word {
  id: number
  word: string
  definition: string
  examples: { text: string }[]
}

interface Question {
  word: Word
  type: 'multiple-choice' | 'fill-in-blank'
  options?: string[]      // For multiple choice
  sentence?: string       // For fill-in-blank
  correctAnswer: string
}

export default function QuizPage() {
  const [words, setWords] = useState<Word[]>([])
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [userInput, setUserInput] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [quizComplete, setQuizComplete] = useState(false)
  const [loading, setLoading] = useState(true)
  const [quizType, setQuizType] = useState<'mixed' | 'multiple-choice' | 'fill-in-blank'>('mixed')
  const { addQuizResult, updateReviewSchedule } = useProgress()

  // Fetch words and generate questions
  const fetchWords = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/words')
      const data = await response.json()
      setWords(data)
    } catch (error) {
      console.error('Failed to fetch words:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchWords()
  }, [fetchWords])

  // Generate quiz questions
  const generateQuestions = useCallback(() => {
    if (words.length < 4) return

    const shuffled = [...words].sort(() => Math.random() - 0.5)
    const quizWords = shuffled.slice(0, 10) // 10 questions

    const newQuestions: Question[] = quizWords.map((word, index) => {
      // Decide question type
      let type: 'multiple-choice' | 'fill-in-blank'
      if (quizType === 'mixed') {
        type = index % 2 === 0 ? 'multiple-choice' : 'fill-in-blank'
      } else {
        type = quizType
      }

      if (type === 'multiple-choice') {
        // Get 3 wrong answers
        const wrongAnswers = words
          .filter(w => w.id !== word.id)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(w => w.word)

        // Shuffle all options
        const options = [word.word, ...wrongAnswers].sort(() => Math.random() - 0.5)

        return {
          word,
          type: 'multiple-choice',
          options,
          correctAnswer: word.word
        }
      } else {
        // Fill in the blank - use an example sentence
        const example = word.examples[0]?.text || `The word is ${word.word}.`
        const sentence = example.replace(
          new RegExp(`\\b${word.word}\\b`, 'gi'),
          '_____'
        )

        return {
          word,
          type: 'fill-in-blank',
          sentence,
          correctAnswer: word.word.toLowerCase()
        }
      }
    })

    setQuestions(newQuestions)
    setCurrentIndex(0)
    setScore(0)
    setQuizComplete(false)
    setSelectedAnswer(null)
    setUserInput('')
    setShowResult(false)
  }, [words, quizType])

  // Start quiz when words are loaded
  useEffect(() => {
    if (words.length >= 4) {
      generateQuestions()
    }
  }, [words, generateQuestions])

  const currentQuestion = questions[currentIndex]

  const checkAnswer = () => {
    if (!currentQuestion) return

    let isCorrect = false
    if (currentQuestion.type === 'multiple-choice') {
      isCorrect = selectedAnswer === currentQuestion.correctAnswer
    } else {
      isCorrect = userInput.toLowerCase().trim() === currentQuestion.correctAnswer
    }

    if (isCorrect) {
      setScore(score + 1)
    }

    // Record result
    addQuizResult(currentQuestion.word.id, isCorrect)
    updateReviewSchedule(currentQuestion.word.id, isCorrect ? 4 : 1)

    setShowResult(true)
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(null)
      setUserInput('')
      setShowResult(false)
    } else {
      setQuizComplete(true)
    }
  }

  const handleRestart = () => {
    generateQuestions()
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="mt-2 text-gray-500">Preparing quiz...</p>
      </div>
    )
  }

  if (words.length < 4) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-400">Not enough words for quiz</p>
        <p className="text-gray-500 mt-2">Need at least 4 words in the database</p>
        <Link href="/" className="inline-block mt-4 text-blue-600 hover:underline">
          Browse words
        </Link>
      </div>
    )
  }

  // Quiz Complete Screen
  if (quizComplete) {
    const percentage = Math.round((score / questions.length) * 100)
    let message = ''
    let emoji = ''

    if (percentage >= 90) {
      message = 'Excellent! You really know these words!'
      emoji = '🎉'
    } else if (percentage >= 70) {
      message = 'Great job! Keep practicing!'
      emoji = '👍'
    } else if (percentage >= 50) {
      message = 'Good effort! Review the words you missed.'
      emoji = '📚'
    } else {
      message = 'Keep studying! Practice makes perfect.'
      emoji = '💪'
    }

    return (
      <div className="max-w-lg mx-auto text-center py-12 space-y-6">
        <div className="text-6xl">{emoji}</div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Quiz Complete!
        </h1>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
          <p className="text-5xl font-bold text-blue-600 mb-2">
            {score}/{questions.length}
          </p>
          <p className="text-xl text-gray-500">
            {percentage}% correct
          </p>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300">{message}</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
          >
            Browse Words
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Quiz
        </h1>
        <select
          value={quizType}
          onChange={(e) => setQuizType(e.target.value as typeof quizType)}
          className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm"
        >
          <option value="mixed">Mixed</option>
          <option value="multiple-choice">Multiple Choice</option>
          <option value="fill-in-blank">Fill in Blank</option>
        </select>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Question {currentIndex + 1} of {questions.length}</span>
        <span>Score: {score}</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      {currentQuestion && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 space-y-6">
          {currentQuestion.type === 'multiple-choice' ? (
            <>
              <div>
                <span className="text-xs text-blue-600 font-medium uppercase tracking-wider">
                  Multiple Choice
                </span>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-2">
                  Which word matches this definition?
                </h2>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <p className="text-gray-800 dark:text-gray-200">
                  {currentQuestion.word.definition}
                </p>
              </div>

              <div className="space-y-3">
                {currentQuestion.options?.map((option, i) => {
                  let buttonClass = 'w-full text-left px-4 py-3 rounded-lg border transition-colors '

                  if (showResult) {
                    if (option === currentQuestion.correctAnswer) {
                      buttonClass += 'bg-green-100 dark:bg-green-900/30 border-green-500 text-green-700 dark:text-green-300'
                    } else if (option === selectedAnswer && option !== currentQuestion.correctAnswer) {
                      buttonClass += 'bg-red-100 dark:bg-red-900/30 border-red-500 text-red-700 dark:text-red-300'
                    } else {
                      buttonClass += 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-500'
                    }
                  } else {
                    if (option === selectedAnswer) {
                      buttonClass += 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-700 dark:text-blue-300'
                    } else {
                      buttonClass += 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-300'
                    }
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => !showResult && setSelectedAnswer(option)}
                      disabled={showResult}
                      className={buttonClass}
                    >
                      <span className="font-medium mr-2">{String.fromCharCode(65 + i)}.</span>
                      {option}
                    </button>
                  )
                })}
              </div>
            </>
          ) : (
            <>
              <div>
                <span className="text-xs text-purple-600 font-medium uppercase tracking-wider">
                  Fill in the Blank
                </span>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-2">
                  Complete the sentence with the correct word
                </h2>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <p className="text-gray-800 dark:text-gray-200 text-lg">
                  {currentQuestion.sentence}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-500">
                  Hint: {currentQuestion.word.definition}
                </p>
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  disabled={showResult}
                  placeholder="Type your answer..."
                  className={`w-full px-4 py-3 rounded-lg border ${
                    showResult
                      ? userInput.toLowerCase().trim() === currentQuestion.correctAnswer
                        ? 'bg-green-100 dark:bg-green-900/30 border-green-500'
                        : 'bg-red-100 dark:bg-red-900/30 border-red-500'
                      : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  onKeyDown={(e) => e.key === 'Enter' && !showResult && checkAnswer()}
                />
                {showResult && userInput.toLowerCase().trim() !== currentQuestion.correctAnswer && (
                  <p className="text-green-600 dark:text-green-400">
                    Correct answer: <strong>{currentQuestion.correctAnswer}</strong>
                  </p>
                )}
              </div>
            </>
          )}

          {/* Result Message */}
          {showResult && (
            <div className={`p-4 rounded-lg ${
              (currentQuestion.type === 'multiple-choice' && selectedAnswer === currentQuestion.correctAnswer) ||
              (currentQuestion.type === 'fill-in-blank' && userInput.toLowerCase().trim() === currentQuestion.correctAnswer)
                ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
            }`}>
              {(currentQuestion.type === 'multiple-choice' && selectedAnswer === currentQuestion.correctAnswer) ||
              (currentQuestion.type === 'fill-in-blank' && userInput.toLowerCase().trim() === currentQuestion.correctAnswer)
                ? '✓ Correct!'
                : '✗ Incorrect'}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            {!showResult ? (
              <button
                onClick={checkAnswer}
                disabled={currentQuestion.type === 'multiple-choice' ? !selectedAnswer : !userInput.trim()}
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                {currentIndex < questions.length - 1 ? 'Next Question →' : 'See Results'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
