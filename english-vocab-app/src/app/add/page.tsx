'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const partsOfSpeech = [
  'noun',
  'verb',
  'adjective',
  'adverb',
  'preposition',
  'conjunction',
  'pronoun',
  'interjection'
]

export default function AddWordPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Form state
  const [word, setWord] = useState('')
  const [pronunciation, setPronunciation] = useState('')
  const [definition, setDefinition] = useState('')
  const [usageTip, setUsageTip] = useState('')
  const [partOfSpeech, setPartOfSpeech] = useState('noun')
  const [difficulty, setDifficulty] = useState(2)
  const [examples, setExamples] = useState(['', '', ''])
  const [synonyms, setSynonyms] = useState('')
  const [antonyms, setAntonyms] = useState('')

  const handleExampleChange = (index: number, value: string) => {
    const newExamples = [...examples]
    newExamples[index] = value
    setExamples(newExamples)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/words', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          word,
          pronunciation,
          definition,
          usageTip: usageTip || undefined,
          partOfSpeech,
          difficulty,
          examples: examples.filter(e => e.trim()),
          synonyms: synonyms.split(',').map(s => s.trim()).filter(Boolean),
          antonyms: antonyms.split(',').map(a => a.trim()).filter(Boolean)
        })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to add word')
      }

      setSuccess(true)
      // Reset form
      setWord('')
      setPronunciation('')
      setDefinition('')
      setUsageTip('')
      setPartOfSpeech('noun')
      setDifficulty(2)
      setExamples(['', '', ''])
      setSynonyms('')
      setAntonyms('')

      // Redirect after short delay
      setTimeout(() => {
        router.push('/')
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleAddAnother = () => {
    setSuccess(false)
    setWord('')
    setPronunciation('')
    setDefinition('')
    setUsageTip('')
    setExamples(['', '', ''])
    setSynonyms('')
    setAntonyms('')
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12 space-y-6">
        <div className="text-6xl">✅</div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Word Added Successfully!
        </h1>
        <p className="text-gray-500">
          Your word has been added to the vocabulary database.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleAddAnother}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Add Another Word
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
          >
            View All Words
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Add New Word
        </h1>
        <Link
          href="/"
          className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          ← Back
        </Link>
      </div>

      <p className="text-gray-500">
        Add your own vocabulary words to study. Write definitions in simple English.
      </p>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg p-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Word and Pronunciation */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Word <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              required
              placeholder="e.g., abundant"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Pronunciation (IPA)
            </label>
            <input
              type="text"
              value={pronunciation}
              onChange={(e) => setPronunciation(e.target.value)}
              placeholder="e.g., /əˈbʌndənt/"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Part of Speech and Difficulty */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Part of Speech <span className="text-red-500">*</span>
            </label>
            <select
              value={partOfSpeech}
              onChange={(e) => setPartOfSpeech(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {partsOfSpeech.map(pos => (
                <option key={pos} value={pos}>{pos}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Difficulty Level
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="5"
                value={difficulty}
                onChange={(e) => setDifficulty(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm text-gray-500 w-20">
                Level {difficulty}
              </span>
            </div>
          </div>
        </div>

        {/* Definition */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Definition (in simple English) <span className="text-red-500">*</span>
          </label>
          <textarea
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
            required
            rows={3}
            placeholder="Write a clear, simple definition in English..."
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Usage Tip */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Usage Tip (optional)
          </label>
          <textarea
            value={usageTip}
            onChange={(e) => setUsageTip(e.target.value)}
            rows={2}
            placeholder="How and when to use this word..."
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Example Sentences */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Example Sentences
          </label>
          <div className="space-y-2">
            {examples.map((example, index) => (
              <input
                key={index}
                type="text"
                value={example}
                onChange={(e) => handleExampleChange(index, e.target.value)}
                placeholder={`Example sentence ${index + 1}...`}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ))}
          </div>
        </div>

        {/* Synonyms and Antonyms */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Synonyms (comma separated)
            </label>
            <input
              type="text"
              value={synonyms}
              onChange={(e) => setSynonyms(e.target.value)}
              placeholder="e.g., plentiful, rich, ample"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Antonyms (comma separated)
            </label>
            <input
              type="text"
              value={antonyms}
              onChange={(e) => setAntonyms(e.target.value)}
              placeholder="e.g., scarce, rare, limited"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-lg"
        >
          {loading ? 'Adding Word...' : 'Add Word'}
        </button>
      </form>
    </div>
  )
}
