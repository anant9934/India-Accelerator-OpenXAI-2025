'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { sampleQuizzes } from '@/data/sampleQuizzes'
import type { QuizQuestion, QuizResult } from '@/types'

interface QuizProps {
  onBack: () => void
}

export function Quiz({ onBack }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [results, setResults] = useState<QuizResult[]>([])
  const [isQuizComplete, setIsQuizComplete] = useState(false)

  const currentQuestion = sampleQuizzes[currentIndex]

  useEffect(() => {
    if (timeLeft > 0 && !showExplanation) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showExplanation) {
      handleAnswer(-1) // Time's up
    }
  }, [timeLeft, showExplanation])

  const handleAnswer = (optionIndex: number) => {
    setSelectedOption(optionIndex)
    setShowExplanation(true)
    
    const isCorrect = optionIndex === currentQuestion.correctAnswer
    const result: QuizResult = {
      questionId: currentQuestion.id,
      correct: isCorrect,
      selectedAnswer: optionIndex,
      timeSpent: 30 - timeLeft,
      timestamp: new Date()
    }
    
    setResults([...results, result])
  }

  const handleNext = () => {
    if (currentIndex < sampleQuizzes.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedOption(null)
      setShowExplanation(false)
      setTimeLeft(30)
    } else {
      setIsQuizComplete(true)
    }
  }

  const calculateScore = () => {
    const correct = results.filter(r => r.correct).length
    return Math.round((correct / sampleQuizzes.length) * 100)
  }

  if (isQuizComplete) {
    const score = calculateScore()
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Dashboard
          </button>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Quiz Complete!</h2>
            
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary-600 to-cyan-600 flex items-center justify-center">
              <span className="text-3xl font-bold text-white">{score}%</span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-4">
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                  {results.filter(r => r.correct).length}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">Correct</p>
              </div>
              
              <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-4">
                <p className="text-2xl font-bold text-red-700 dark:text-red-300">
                  {results.filter(r => !r.correct).length}
                </p>
                <p className="text-sm text-red-600 dark:text-red-400">Incorrect</p>
              </div>
              
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4">
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                  {Math.round(results.reduce((acc, r) => acc + r.timeSpent, 0) / results.length)}s
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400">Avg Time</p>
              </div>
            </div>

            <button
              onClick={onBack}
              className="btn-primary"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Dashboard
        </button>

        {/* Progress and Timer */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Question {currentIndex + 1} of {sampleQuizzes.length}
          </div>
          <div className="flex items-center bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-3 py-1 rounded-full">
            <Clock size={16} className="mr-1" />
            {timeLeft}s
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-8">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / sampleQuizzes.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            {currentQuestion.question}
          </h2>
          
          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showExplanation && handleAnswer(index)}
                disabled={showExplanation}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                  showExplanation
                    ? index === currentQuestion.correctAnswer
                      ? 'bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-400'
                      : index === selectedOption
                      ? 'bg-red-100 border-red-500 dark:bg-red-900/30 dark:border-red-400'
                      : 'bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600'
                    : 'bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500'
                } ${!showExplanation && 'hover:shadow-md'}`}
              >
                <div className="flex items-center">
                  {showExplanation && (
                    <div className="mr-3">
                      {index === currentQuestion.correctAnswer ? (
                        <CheckCircle className="text-green-500" size={20} />
                      ) : index === selectedOption ? (
                        <XCircle className="text-red-500" size={20} />
                      ) : null}
                    </div>
                  )}
                  <span className="text-gray-800 dark:text-white">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-6 mb-6">
            <div className="flex items-start mb-3">
              <AlertCircle className="text-blue-500 mr-2 mt-1 flex-shrink-0" size={20} />
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">Explanation</h3>
            </div>
            <p className="text-blue-700 dark:text-blue-200">{currentQuestion.explanation}</p>
          </div>
        )}

        {/* Next Button */}
        {showExplanation && (
          <button
            onClick={handleNext}
            className="w-full btn-primary"
          >
            {currentIndex < sampleQuizzes.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </button>
        )}
      </div>
    </div>
  )
}