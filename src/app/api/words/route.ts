import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Type for creating a new word
interface CreateWordBody {
  word: string
  pronunciation: string
  definition: string
  usageTip?: string
  partOfSpeech: string
  difficulty?: number
  examples?: string[]
  synonyms?: string[]
  antonyms?: string[]
}

// POST /api/words - Create a new word
export async function POST(request: NextRequest) {
  try {
    const body: CreateWordBody = await request.json()

    // Validate required fields
    if (!body.word || !body.definition || !body.partOfSpeech) {
      return NextResponse.json(
        { error: 'Word, definition, and part of speech are required' },
        { status: 400 }
      )
    }

    // Check if word already exists
    const existing = await prisma.word.findUnique({
      where: { word: body.word.toLowerCase().trim() }
    })

    if (existing) {
      return NextResponse.json(
        { error: 'This word already exists in the database' },
        { status: 409 }
      )
    }

    // Create the word with related data
    const newWord = await prisma.word.create({
      data: {
        word: body.word.toLowerCase().trim(),
        pronunciation: body.pronunciation || '',
        definition: body.definition.trim(),
        usageTip: body.usageTip?.trim() || null,
        partOfSpeech: body.partOfSpeech,
        difficulty: body.difficulty || 2,
        examples: {
          create: (body.examples || [])
            .filter(e => e.trim())
            .map(text => ({ text: text.trim() }))
        },
        synonyms: {
          create: (body.synonyms || [])
            .filter(s => s.trim())
            .map(text => ({ text: text.trim().toLowerCase() }))
        },
        antonyms: {
          create: (body.antonyms || [])
            .filter(a => a.trim())
            .map(text => ({ text: text.trim().toLowerCase() }))
        }
      },
      include: {
        examples: true,
        synonyms: true,
        antonyms: true
      }
    })

    return NextResponse.json(newWord, { status: 201 })
  } catch (error) {
    console.error('Error creating word:', error)
    return NextResponse.json(
      { error: 'Failed to create word' },
      { status: 500 }
    )
  }
}

// GET /api/words - Get all words with optional search
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const search = searchParams.get('search')
  const favoriteIds = searchParams.get('favorites')

  try {
    const words = await prisma.word.findMany({
      where: {
        AND: [
          // Search filter
          search ? {
            OR: [
              { word: { contains: search } },
              { definition: { contains: search } }
            ]
          } : {},
          // Favorites filter
          favoriteIds ? {
            id: { in: favoriteIds.split(',').map(Number) }
          } : {}
        ]
      },
      include: {
        examples: true,
        synonyms: true,
        antonyms: true
      },
      orderBy: { word: 'asc' }
    })

    return NextResponse.json(words)
  } catch (error) {
    console.error('Error fetching words:', error)
    return NextResponse.json(
      { error: 'Failed to fetch words' },
      { status: 500 }
    )
  }
}
