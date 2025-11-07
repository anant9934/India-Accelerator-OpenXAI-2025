'use client'

import { useState, useRef, useEffect, createContext, useContext } from 'react'
import { ThemeToggle } from '@/components/UI/ThemeToggle'
import { FlashcardDeck } from '@/components/Flashcard/Flashcard'
import { Quiz } from '@/components/Quiz/Quiz'
import { Brain, BookOpen, BarChart3, Clock, Target, TrendingUp, Sparkles, ArrowRight, Star, Users, Award, Loader2, X, Check, Zap, FileText, Download, Share2 } from 'lucide-react'

type ViewState = 'home' | 'flashcards' | 'quiz' | 'ai-generate' | 'progress'

// Create Theme Context
const ThemeContext = createContext<{
  theme: 'light' | 'dark'
  toggleTheme: () => void
}>({
  theme: 'light',
  toggleTheme: () => {}
})

// Theme Hook
export const useTheme = () => useContext(ThemeContext)

// Theme Provider Component
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    // Check system preference or stored theme
    const stored = localStorage.getItem('theme') as 'light' | 'dark'
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (stored) {
      setTheme(stored)
    } else if (systemDark) {
      setTheme('dark')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.className = theme
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Moon and Sun icons
const Moon = ({ size = 20, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    className={className}
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

const Sun = ({ size = 20, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    className={className}
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
)

// Fixed Theme Toggle Component
const FixedThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="text-gray-700" size={20} />
      ) : (
        <Sun className="text-yellow-400" size={20} />
      )}
    </button>
  )
}

// Lock icon component
const Lock = ({ size = 16 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

// AI Knowledge Base for different topics
const aiKnowledgeBase = {
  programming: {
    beginner: [
      { question: "What is a variable in programming?", answer: "A variable is a named storage location in memory that holds a value which can be changed during program execution." },
      { question: "What does HTML stand for?", answer: "HTML stands for HyperText Markup Language, used for creating web pages." },
      { question: "What is a function?", answer: "A function is a reusable block of code that performs a specific task when called." },
      { question: "What is CSS used for?", answer: "CSS (Cascading Style Sheets) is used to style and layout web pages." },
      { question: "What is JavaScript?", answer: "JavaScript is a programming language used to make web pages interactive." }
    ],
    medium: [
      { question: "What is object-oriented programming?", answer: "OOP is a programming paradigm based on objects containing data and methods." },
      { question: "Explain the concept of 'state' in React", answer: "State is a built-in React object that contains data or information about the component." },
      { question: "What are promises in JavaScript?", answer: "Promises are objects representing the eventual completion or failure of an asynchronous operation." },
      { question: "What is API?", answer: "API (Application Programming Interface) is a set of rules for building and interacting with software applications." },
      { question: "What is version control?", answer: "Version control is a system that records changes to files over time so you can recall specific versions later." }
    ],
    advanced: [
      { question: "Explain the Virtual DOM in React", answer: "Virtual DOM is a lightweight copy of the real DOM that allows React to optimize updates and improve performance." },
      { question: "What are design patterns in software engineering?", answer: "Design patterns are reusable solutions to common problems in software design." },
      { question: "What is time complexity?", answer: "Time complexity is a concept in computer science that describes the amount of time an algorithm takes to run." },
      { question: "Explain microservices architecture", answer: "Microservices architecture structures an application as a collection of loosely coupled services." },
      { question: "What is continuous integration?", answer: "CI is a development practice where developers integrate code into a shared repository frequently." }
    ]
  },
  science: {
    beginner: [
      { question: "What is photosynthesis?", answer: "Photosynthesis is the process plants use to convert sunlight into energy, producing oxygen." },
      { question: "What are the three states of matter?", answer: "Solid, liquid, and gas are the three fundamental states of matter." },
      { question: "What is gravity?", answer: "Gravity is the force that attracts objects with mass toward each other." },
      { question: "What is an atom?", answer: "An atom is the basic unit of a chemical element, consisting of protons, neutrons, and electrons." },
      { question: "What is the solar system?", answer: "The solar system consists of the Sun and all objects gravitationally bound to it." }
    ],
    medium: [
      { question: "What is DNA?", answer: "DNA (Deoxyribonucleic Acid) is the molecule that carries genetic instructions." },
      { question: "Explain Newton's laws of motion", answer: "Three laws describing the relationship between motion and forces: inertia, F=ma, and action-reaction." },
      { question: "What is evolution?", answer: "Evolution is the process by which species change over time through natural selection." },
      { question: "What are chemical bonds?", answer: "Chemical bonds are forces that hold atoms together in molecules and compounds." },
      { question: "What is the periodic table?", answer: "The periodic table organizes chemical elements based on their atomic number and properties." }
    ],
    advanced: [
      { question: "Explain quantum mechanics", answer: "Quantum mechanics is the branch of physics dealing with atomic and subatomic systems." },
      { question: "What is relativity?", answer: "Relativity is Einstein's theory describing gravity as the curvature of spacetime." },
      { question: "What is gene expression?", answer: "Gene expression is the process by which information from a gene is used to create functional products." },
      { question: "Explain thermodynamics", answer: "Thermodynamics is the study of heat, energy, and work in physical systems." },
      { question: "What is molecular biology?", answer: "Molecular biology studies biological activity at the molecular level." }
    ]
  },
  history: {
    beginner: [
      { question: "When did World War II end?", answer: "World War II ended in 1945." },
      { question: "Who discovered America?", answer: "Christopher Columbus is credited with discovering America in 1492." },
      { question: "What was the Renaissance?", answer: "The Renaissance was a cultural movement in Europe from the 14th to 17th centuries." },
      { question: "Who was the first president of the United States?", answer: "George Washington was the first US president." },
      { question: "What caused the French Revolution?", answer: "The French Revolution was caused by social inequality and financial crisis." }
    ],
    medium: [
      { question: "What was the Industrial Revolution?", answer: "The Industrial Revolution was the transition to new manufacturing processes (1760-1840)." },
      { question: "Explain the Cold War", answer: "The Cold War was a period of geopolitical tension between the US and USSR (1947-1991)." },
      { question: "What was the significance of the Magna Carta?", answer: "The Magna Carta established the principle that everyone is subject to the law." },
      { question: "Who was Julius Caesar?", answer: "Julius Caesar was a Roman general and statesman who played a critical role in the fall of the Republic." },
      { question: "What was the Silk Road?", answer: "The Silk Road was a network of trade routes connecting East and West." }
    ],
    advanced: [
      { question: "Explain the causes of World War I", answer: "Complex causes including militarism, alliances, imperialism, and nationalism led to WWI." },
      { question: "What was the Enlightenment?", answer: "The Enlightenment was an intellectual movement emphasizing reason, science, and individual rights." },
      { question: "Discuss the impact of the printing press", answer: "The printing press revolutionized communication and spread knowledge across Europe." },
      { question: "What was the Byzantine Empire?", answer: "The Byzantine Empire was the continuation of the Roman Empire in the East during Late Antiquity." },
      { question: "Explain the Protestant Reformation", answer: "The Protestant Reformation was a religious movement that created Protestant churches." }
    ]
  }
}

// AI Generation Component with improved content generation
const AIGenerate = ({ onBack }: { onBack: () => void }) => {
  const [topic, setTopic] = useState('')
  const [difficulty, setDifficulty] = useState('medium')
  const [cardCount, setCardCount] = useState(5)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<any[]>([])
  const [progress, setProgress] = useState(0)
  const [category, setCategory] = useState('programming')

  const detectCategory = (topic: string) => {
    const lowerTopic = topic.toLowerCase()
    if (lowerTopic.includes('code') || lowerTopic.includes('program') || lowerTopic.includes('computer') || lowerTopic.includes('software') || lowerTopic.includes('javascript') || lowerTopic.includes('python')) {
      return 'programming'
    } else if (lowerTopic.includes('science') || lowerTopic.includes('biology') || lowerTopic.includes('physics') || lowerTopic.includes('chemistry') || lowerTopic.includes('math')) {
      return 'science'
    } else if (lowerTopic.includes('history') || lowerTopic.includes('war') || lowerTopic.includes('empire') || lowerTopic.includes('revolution') || lowerTopic.includes('ancient')) {
      return 'history'
    }
    return 'programming' // default
  }

  const generateContent = async () => {
    if (!topic.trim()) return
    
    setIsGenerating(true)
    setProgress(0)
    setGeneratedContent([])

    const detectedCategory = detectCategory(topic)
    setCategory(detectedCategory)

    // Simulate AI generation progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval)
          return 95
        }
        return prev + 5
      })
    }, 200)

    // Simulate API call with better content generation
    await new Promise(resolve => setTimeout(resolve, 3000))
    clearInterval(interval)
    setProgress(100)

    // Generate intelligent flashcards based on topic and category
    const baseContent = aiKnowledgeBase[detectedCategory as keyof typeof aiKnowledgeBase]?.[difficulty as keyof (typeof aiKnowledgeBase)['programming']] || aiKnowledgeBase.programming.medium
    
    const sampleContent = Array.from({ length: cardCount }, (_, i) => {
      const baseCard = baseContent[i % baseContent.length]
      // Customize questions and answers based on the actual topic
      const customizedQuestion = baseCard.question
        .replace(/programming|science|history/gi, topic)
        .replace(/variable/gi, topic)
        .replace(/HTML/gi, topic)
      
      const customizedAnswer = baseCard.answer
        .replace(/programming|science|history/gi, topic)
        .replace(/variable/gi, topic)
        .replace(/HTML/gi, topic)

      return {
        id: i + 1,
        question: customizedQuestion,
        answer: customizedAnswer,
        category: detectedCategory,
        difficulty,
        topic: topic
      }
    })

    setGeneratedContent(sampleContent)
    setIsGenerating(false)
  }

  const downloadContent = () => {
    const data = JSON.stringify(generatedContent, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${topic}-flashcards.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={onBack}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors group"
          >
            <ArrowRight className="mr-2 rotate-180 group-hover:-translate-x-1 transition-transform" size={20} />
            Back to Home
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg">
              <Zap className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">AI Content Generator</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Generation Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/20">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Generate Learning Content</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Topic
                  </label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter a topic (e.g., Machine Learning, React Hooks, Spanish Verbs)"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  >
                    <option value="programming">Programming & Technology</option>
                    <option value="science">Science & Biology</option>
                    <option value="history">History & Social Studies</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Difficulty Level
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="medium">Medium</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Number of Cards: {cardCount}
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="20"
                    value={cardCount}
                    onChange={(e) => setCardCount(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>3</span>
                    <span>20</span>
                  </div>
                </div>

                <button
                  onClick={generateContent}
                  disabled={!topic.trim() || isGenerating}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={20} />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2" size={20} />
                      Generate Content
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            {isGenerating && (
              <div className="mt-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/20">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                  <span>Generating intelligent content...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Analyzing topic: "{topic}" • Category: {category} • Difficulty: {difficulty}
                </p>
              </div>
            )}
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/20 h-fit sticky top-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Preview</h3>
              
              {generatedContent.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {generatedContent.length} cards generated
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={downloadContent}
                        className="p-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                        title="Download"
                      >
                        <Download size={18} />
                      </button>
                      <button
                        className="p-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                        title="Share"
                      >
                        <Share2 size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto space-y-3 pr-2">
                    {generatedContent.map((card) => (
                      <div key={card.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-600 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <span className={`text-xs font-medium px-2 py-1 rounded capitalize ${
                            card.difficulty === 'beginner' 
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                              : card.difficulty === 'medium'
                              ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          }`}>
                            {card.difficulty}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                            {card.category}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-gray-800 dark:text-white mb-2 line-clamp-2">
                          {card.question}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-3">
                          {card.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="mx-auto text-gray-400 mb-3" size={40} />
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Generated content will appear here
                  </p>
                  <p className="text-gray-400 dark:text-gray-500 text-xs mt-2">
                    Enter a topic and click generate to create intelligent flashcards
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Progress Component
const Progress = ({ onBack }: { onBack: () => void }) => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week')
  
  const stats = {
    totalStudyTime: '12h 45m',
    averageScore: 84,
    cardsMastered: 156,
    weeklyGoal: 5,
    currentStreak: 8,
    longestStreak: 12
  }

  const progressData = {
    week: [65, 78, 82, 75, 90, 85, 88],
    month: [60, 65, 70, 72, 75, 78, 80, 82, 85, 83, 84, 86, 88, 85, 82, 84, 86, 88, 90, 87, 85, 86, 88, 90, 92, 89, 87, 88, 90, 84],
    year: [65, 68, 72, 75, 78, 80, 82, 84, 83, 85, 87, 90]
  }

  const studySessions = [
    { subject: 'Mathematics', time: '2h 15m', date: 'Today', progress: 85 },
    { subject: 'Computer Science', time: '1h 30m', date: 'Yesterday', progress: 78 },
    { subject: 'Languages', time: '45m', date: '2 days ago', progress: 92 },
    { subject: 'History', time: '1h 00m', date: '3 days ago', progress: 65 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={onBack}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors group"
          >
            <ArrowRight className="mr-2 rotate-180 group-hover:-translate-x-1 transition-transform" size={20} />
            Back to Home
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl shadow-lg">
              <BarChart3 className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Progress Dashboard</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 dark:border-gray-700/20">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="text-blue-500" size={20} />
                  <span className="text-xs text-gray-500 dark:text-gray-400">Time</span>
                </div>
                <p className="text-xl font-bold text-gray-800 dark:text-white">{stats.totalStudyTime}</p>
              </div>
              
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 dark:border-gray-700/20">
                <div className="flex items-center justify-between mb-2">
                  <Target className="text-green-500" size={20} />
                  <span className="text-xs text-gray-500 dark:text-gray-400">Avg Score</span>
                </div>
                <p className="text-xl font-bold text-gray-800 dark:text-white">{stats.averageScore}%</p>
              </div>
              
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 dark:border-gray-700/20">
                <div className="flex items-center justify-between mb-2">
                  <Check className="text-purple-500" size={20} />
                  <span className="text-xs text-gray-500 dark:text-gray-400">Mastered</span>
                </div>
                <p className="text-xl font-bold text-gray-800 dark:text-white">{stats.cardsMastered}</p>
              </div>
              
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 dark:border-gray-700/20">
                <div className="flex items-center justify-between mb-2">
                  <Star className="text-amber-500" size={20} />
                  <span className="text-xs text-gray-500 dark:text-gray-400">Streak</span>
                </div>
                <p className="text-xl font-bold text-gray-800 dark:text-white">{stats.currentStreak} days</p>
              </div>
            </div>

            {/* Progress Chart */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Performance Trend</h3>
                <div className="flex gap-2">
                  {(['week', 'month', 'year'] as const).map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-3 py-1 text-sm rounded-lg transition-all ${
                        timeRange === range
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {range.charAt(0).toUpperCase() + range.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="h-64 flex items-end justify-between gap-1">
                {progressData[timeRange].map((value, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-gradient-to-t from-blue-500 to-cyan-500 rounded-t-lg transition-all duration-500 ease-out"
                      style={{ height: `${value}%` }}
                    />
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      {timeRange === 'week' ? ['M', 'T', 'W', 'T', 'F', 'S', 'S'][index] : 
                       timeRange === 'month' ? (index + 1) : 
                       ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Study Sessions */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/20">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Recent Study Sessions</h3>
              <div className="space-y-4">
                {studySessions.map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-semibold">
                        {session.subject.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">{session.subject}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{session.date} • {session.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800 dark:text-white">{session.progress}%</p>
                      <div className="w-16 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full"
                          style={{ width: `${session.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Weekly Goal */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/20">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Weekly Goal</h3>
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="54"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-gray-200 dark:text-gray-700"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="54"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray="339.292"
                      strokeDashoffset="339.292"
                      strokeLinecap="round"
                      className="text-green-500 transition-all duration-1000 ease-out"
                      style={{ strokeDashoffset: 339.292 * (1 - 0.8) }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-800 dark:text-white">80%</span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {4} of {stats.weeklyGoal} sessions completed
                </p>
              </div>
            </div>

            {/* Streak Info */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/20">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Study Streak</h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-500 mb-2">{stats.currentStreak} days</div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Keep going! Your longest streak is {stats.longestStreak} days
                </p>
                <div className="flex justify-center gap-1">
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        i < stats.currentStreak
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                      }`}
                    >
                      <Check size={16} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/20">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Achievements</h3>
              <div className="space-y-3">
                {[
                  { name: 'Fast Learner', icon: '⚡', unlocked: true },
                  { name: 'Consistent Student', icon: '📚', unlocked: true },
                  { name: 'Quiz Master', icon: '🏆', unlocked: false },
                  { name: 'Perfect Week', icon: '⭐', unlocked: false }
                ].map((achievement, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      achievement.unlocked
                        ? 'bg-gradient-to-r from-green-50 to-cyan-50 dark:from-green-900/20 dark:to-cyan-900/20 border border-green-200 dark:border-green-800'
                        : 'bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    <span className="text-2xl">{achievement.icon}</span>
                    <span className={`font-medium ${
                      achievement.unlocked 
                        ? 'text-gray-800 dark:text-white' 
                        : 'text-gray-400 dark:text-gray-500'
                    }`}>
                      {achievement.name}
                    </span>
                    {achievement.unlocked ? (
                      <Check className="ml-auto text-green-500" size={16} />
                    ) : (
                      <Lock className="ml-auto text-gray-400" size={16} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Home Component
export default function Home() {
  const [currentView, setCurrentView] = useState<ViewState>('home')
  const [isLoading, setIsLoading] = useState(false)
  const { theme } = useTheme()
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Add subtle animations on page load
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.fade-in, .slide-up')
      elements.forEach(el => el.classList.add('animate-in'))
    }, 100)

    // Add keyboard navigation
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && currentView !== 'home') {
        setCurrentView('home')
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [currentView])

  const stats = {
    dueCards: 12,
    progress: 75,
    streak: 8,
    totalStudied: 42
  }

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered",
      description: "Generate content with advanced AI models"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Spaced Repetition",
      description: "Optimize learning with SM-2 algorithm"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Progress Tracking",
      description: "Monitor your learning journey"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Adaptive Learning",
      description: "Personalized to your pace and level"
    }
  ]

  const handleStartLearning = async () => {
    setIsLoading(true)
    // Simulate API call or navigation
    await new Promise(resolve => setTimeout(resolve, 1000))
    setCurrentView('flashcards')
    setIsLoading(false)
  }

  // Add CSS for animations and fixes
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      .fade-in.animate-in {
        opacity: 1;
        transform: translateY(0);
      }
      .slide-up {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
      }
      .slide-up.animate-in {
        opacity: 1;
        transform: translateY(0);
      }
      .slider {
        background: linear-gradient(to right, #8b5cf6, #ec4899);
      }
      .slider::-webkit-slider-thumb {
        appearance: none;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background: white;
        border: 2px solid #8b5cf6;
        cursor: pointer;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
      }
      .slider::-moz-range-thumb {
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background: white;
        border: 2px solid #8b5cf6;
        cursor: pointer;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
      }
      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      
      /* Fix flashcard overlapping */
      .flashcard-container {
        min-height: 400px;
        position: relative;
      }
      .flashcard-content {
        backface-visibility: hidden;
        transform-style: preserve-3d;
        transition: transform 0.6s;
      }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  // Render different views
  if (currentView === 'flashcards') return (
    <ThemeProvider>
      <FlashcardDeck onBack={() => setCurrentView('home')} />
    </ThemeProvider>
  )
  if (currentView === 'quiz') return (
    <ThemeProvider>
      <Quiz onBack={() => setCurrentView('home')} />
    </ThemeProvider>
  )
  if (currentView === 'ai-generate') return (
    <ThemeProvider>
      <AIGenerate onBack={() => setCurrentView('home')} />
    </ThemeProvider>
  )
  if (currentView === 'progress') return (
    <ThemeProvider>
      <Progress onBack={() => setCurrentView('home')} />
    </ThemeProvider>
  )

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-900/20 dark:to-purple-900/20 pointer-events-none"></div>
        
        <header className="relative z-10 flex justify-between items-center p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl shadow-lg">
              <Brain className="text-white" size={28} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">StudySync AI</h1>
          </div>
          <FixedThemeToggle />
        </header>

        <main className="relative z-10 container mx-auto px-4 py-8">
          {/* Hero Section */}
          <section className="text-center mb-16 fade-in">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
              <Sparkles className="mr-2" size={16} />
              AI-Powered Learning Companion
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Master Anything <br />Faster & Smarter
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              AI-powered flashcards, intelligent quizzes, and progress tracking to optimize your learning journey
            </p>
            
            <button 
              onClick={handleStartLearning}
              disabled={isLoading}
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Loading...
                </>
              ) : (
                <>
                  Start Learning Now
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </section>

          {/* Stats Overview */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16 slide-up">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-white/20 dark:border-gray-700/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <BookOpen className="text-blue-600 dark:text-blue-400" size={20} />
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Due</span>
              </div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.dueCards}</p>
            </div>
            
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-white/20 dark:border-gray-700/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <BarChart3 className="text-green-600 dark:text-green-400" size={20} />
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Progress</span>
              </div>
              <div className="flex items-center">
                <p className="text-2xl font-bold text-gray-800 dark:text-white mr-2">{stats.progress}%</p>
                <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full"
                    style={{ width: `${stats.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-white/20 dark:border-gray-700/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <Clock className="text-amber-600 dark:text-amber-400" size={20} />
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Streak</span>
              </div>
              <div className="flex items-center">
                <p className="text-2xl font-bold text-gray-800 dark:text-white mr-2">{stats.streak}</p>
                <div className="flex">
                  {[...Array(Math.min(stats.streak, 5))].map((_, i) => (
                    <Star key={i} className="fill-amber-400 text-amber-400" size={16} />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-white/20 dark:border-gray-700/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Target className="text-purple-600 dark:text-purple-400" size={20} />
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Studied</span>
              </div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.totalStudied}</p>
            </div>
          </section>

          {/* Features Section */}
          <section className="mb-16 slide-up" ref={featuresRef}>
            <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-10">Why Choose StudySync AI?</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white mb-4">
                    {feature.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{feature.title}</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Main Actions */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 slide-up">
            <button
              onClick={() => setCurrentView('flashcards')}
              className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Flashcards</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Study with AI-powered flashcards using spaced repetition
                </p>
                <div className="mt-4 text-blue-600 dark:text-blue-400 flex items-center text-sm font-medium">
                  Start studying <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" size={16} />
                </div>
              </div>
            </button>

            <button
              onClick={() => setCurrentView('quiz')}
              className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Quiz</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Test your knowledge with adaptive quizzes and explanations
                </p>
                <div className="mt-4 text-green-600 dark:text-green-400 flex items-center text-sm font-medium">
                  Take a quiz <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" size={16} />
                </div>
              </div>
            </button>

            <button
              onClick={() => setCurrentView('ai-generate')}
              className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">AI Generator</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Generate new flashcards and quizzes with AI assistance
                </p>
                <div className="mt-4 text-purple-600 dark:text-purple-400 flex items-center text-sm font-medium">
                  Create content <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" size={16} />
                </div>
              </div>
            </button>

            <button
              onClick={() => setCurrentView('progress')}
              className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Progress</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Track your learning progress and analytics dashboard
                </p>
                <div className="mt-4 text-amber-600 dark:text-amber-400 flex items-center text-sm font-medium">
                  View stats <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" size={16} />
                </div>
              </div>
            </button>
          </section>

          {/* Testimonial/CTA Section */}
          <section className="mt-16 p-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl shadow-lg text-center slide-up">
            <Award className="mx-auto text-white mb-4" size={40} />
            <h3 className="text-2xl font-bold text-white mb-4">Join 10,000+ learners</h3>
            <p className="text-blue-100 max-w-2xl mx-auto mb-6">
              "StudySync AI helped me improve my retention by 72% in just 2 weeks. The spaced repetition system is a game-changer!"
            </p>
            <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors">
              Get Started Free
            </button>
          </section>
        </main>
      </div>
    </ThemeProvider>
  )
}
