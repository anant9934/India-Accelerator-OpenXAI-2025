'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, ChevronLeft, ChevronRight, ThumbsUp, ThumbsDown, Star } from 'lucide-react'
import { useSpacedRepetition } from '@/lib/spacedRepetition'
import { sampleFlashcards } from '@/data/sampleFlashcards'
import type { FlashcardData } from '@/types'

interface FlashcardDeckProps {
  onBack: () => void
}

export function FlashcardDeck({ onBack }: FlashcardDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [deck, setDeck] = useState<FlashcardData[]>(sampleFlashcards)
  const { updateCard } = useSpacedRepetition()

  const currentCard = deck[currentIndex]

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
    updateCard(currentCard.id, difficulty)
    setIsFlipped(false)
    
    if (currentIndex < deck.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      // End of deck
      onBack()
    }
  }

  const progress = ((currentIndex + 1) / deck.length) * 100

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Dashboard
          </button>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {currentIndex + 1} of {deck.length}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-8">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Flashcard */}
        <div className="flex justify-center mb-8">
          <div
            className={`flip-card w-96 h-56 cursor-pointer ${isFlipped ? 'flipped' : ''}`}
            onClick={handleFlip}
          >
            <div className="flip-card-inner w-full h-full">
              <div className="flip-card-front w-full h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center p-6">
                <p className="text-xl font-semibold text-center text-gray-800 dark:text-white">
                  {currentCard.front}
                </p>
              </div>
              <div className="flip-card-back w-full h-full bg-primary-50 dark:bg-primary-900/20 rounded-xl shadow-lg border border-primary-200 dark:border-primary-700 flex items-center justify-center p-6">
                <p className="text-lg text-center text-gray-800 dark:text-white">
                  {currentCard.back}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation and Difficulty Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white disabled:opacity-50 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>

          {!isFlipped ? (
            <button
              onClick={handleFlip}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Show Answer
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => handleDifficulty('hard')}
                className="flex items-center px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
              >
                <ThumbsDown size={16} className="mr-2" />
                Hard
              </button>
              <button
                onClick={() => handleDifficulty('medium')}
                className="flex items-center px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-colors"
              >
                <Star size={16} className="mr-2" />
                Medium
              </button>
              <button
                onClick={() => handleDifficulty('easy')}
                className="flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
              >
                <ThumbsUp size={16} className="mr-2" />
                Easy
              </button>
            </div>
          )}

          <button
            onClick={() => setCurrentIndex(Math.min(deck.length - 1, currentIndex + 1))}
            disabled={currentIndex === deck.length - 1}
            className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white disabled:opacity-50 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Card Info */}
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>Category: {currentCard.category} • Difficulty: {currentCard.difficulty}</p>
          <p>Streak: {currentCard.streak} days</p>
        </div>
      </div>
    </div>
  )
}