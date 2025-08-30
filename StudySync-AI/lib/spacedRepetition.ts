'use client'

import { useState, useEffect } from 'react'
import { addDays, differenceInDays } from 'date-fns'
import type { FlashcardData, SpacedRepetitionData, StudyStatistics } from '@/types'

const STORAGE_KEY = 'spacedRepetitionData'

export function useSpacedRepetition() {
  const [data, setData] = useState<Record<string, SpacedRepetitionData>>({})

  useEffect(() => {
    // Load data from localStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setData(JSON.parse(stored))
      }
    } catch (error) {
      console.error('Failed to load spaced repetition data:', error)
    }
  }, [])

  useEffect(() => {
    // Save data to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (error) {
      console.error('Failed to save spaced repetition data:', error)
    }
  }, [data])

  const updateCard = (cardId: string, performance: 'easy' | 'medium' | 'hard') => {
    const now = new Date()
    const currentData = data[cardId] || {
      cardId,
      easeFactor: 2.5,
      interval: 1,
      repetition: 0,
      nextReview: now
    }

    const quality = performance === 'easy' ? 5 : performance === 'medium' ? 3 : 1

    let newEaseFactor = currentData.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
    newEaseFactor = Math.max(1.3, newEaseFactor)

    let newInterval
    if (quality >= 3) {
      if (currentData.repetition === 0) {
        newInterval = 1
      } else if (currentData.repetition === 1) {
        newInterval = 6
      } else {
        newInterval = Math.round(currentData.interval * newEaseFactor)
      }
      currentData.repetition += 1
    } else {
      currentData.repetition = 0
      newInterval = 1
    }

    const nextReview = addDays(now, newInterval)

    setData(prev => ({
      ...prev,
      [cardId]: {
        ...currentData,
        easeFactor: newEaseFactor,
        interval: newInterval,
        nextReview
      }
    }))

    return nextReview
  }

  const getDueCards = (cards: FlashcardData[]): FlashcardData[] => {
    const now = new Date()
    return cards.filter(card => {
      const cardData = data[card.id]
      return !cardData || new Date(cardData.nextReview) <= now
    })
  }

  const getStudyStatistics = (cards: FlashcardData[]): StudyStatistics => {
    const now = new Date()
    const dueCards = getDueCards(cards)
    const matureCards = cards.filter(card => {
      const cardData = data[card.id]
      return cardData && cardData.interval >= 21
    })

    // Calculate streak (consecutive days with at least one review)
    let streak = 0
    const today = new Date().toDateString()
    const reviewDates = Object.values(data)
      .map(d => new Date(d.nextReview).toDateString())
      .filter(date => date !== today)
    
    if (reviewDates.length > 0) {
      reviewDates.sort()
      let currentStreak = 1
      for (let i = reviewDates.length - 1; i > 0; i--) {
        const diff = differenceInDays(new Date(reviewDates[i]), new Date(reviewDates[i - 1]))
        if (diff === 1) {
          currentStreak++
        } else {
          break
        }
      }
      streak = currentStreak
    }

    return {
      total: cards.length,
      dueToday: dueCards.length,
      newCards: cards.filter(card => !data[card.id]).length,
      mature: matureCards.length,
      reviews: Object.keys(data).length,
      streakDays: streak
    }
  }

  return {
    updateCard,
    getDueCards,
    getStudyStatistics,
    data
  }
}