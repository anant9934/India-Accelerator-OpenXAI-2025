export interface FlashcardData {
  id: string
  front: string
  back: string
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
  streak: number
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface QuizResult {
  questionId: string
  correct: boolean
  selectedAnswer: number
  timeSpent: number
  timestamp: Date
}

export interface SpacedRepetitionData {
  cardId: string
  easeFactor: number
  interval: number
  repetition: number
  nextReview: Date
}

export interface StudyStatistics {
  total: number
  dueToday: number
  newCards: number
  mature: number
  reviews: number
  streakDays: number
}

export interface AIGenerationRequest {
  type: 'flashcard' | 'quiz'
  topic: string
  difficulty: 'easy' | 'medium' | 'hard'
  model?: string
}

export interface AIGenerationResponse {
  success: boolean
  data?: any
  error?: string
}