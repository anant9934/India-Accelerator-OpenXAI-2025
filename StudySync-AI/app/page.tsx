'use client'

import { useState, useRef, useEffect } from 'react'
import { ThemeToggle } from '@/components/UI/ThemeToggle'
import { FlashcardDeck } from '@/components/Flashcard/Flashcard'
import { Quiz } from '@/components/Quiz/Quiz'
import { Brain, BookOpen, BarChart3, Clock, Target, TrendingUp, Sparkles, ArrowRight, Star, Users, Award } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

type ViewState = 'home' | 'flashcards' | 'quiz' | 'ai-generate' | 'progress'

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewState>('home')
  const { theme } = useTheme()
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Add subtle animations on page load
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.fade-in, .slide-up')
      elements.forEach(el => el.classList.add('animate-in'))
    }, 100)

    return () => clearTimeout(timer)
  }, [])

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

  if (currentView === 'flashcards') return <FlashcardDeck onBack={() => setCurrentView('home')} />
  if (currentView === 'quiz') return <Quiz onBack={() => setCurrentView('home')} />

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-900/20 dark:to-purple-900/20 pointer-events-none"></div>
      
      <header className="relative z-10 flex justify-between items-center p-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-primary-600 to-cyan-600 rounded-xl shadow-lg">
            <Brain className="text-white" size={28} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">StudySync AI</h1>
        </div>
        <ThemeToggle />
      </header>

      <main className="relative z-10 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16 fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
            <Sparkles className="mr-2" size={16} />
            AI-Powered Learning Companion
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
            Master Anything <br />Faster & Smarter
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            AI-powered flashcards, intelligent quizzes, and progress tracking to optimize your learning journey
          </p>
          
          <button className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            Start Learning Now
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
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
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-cyan-500 rounded-xl flex items-center justify-center text-white mb-4">
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
              <div className="mt-4 text-primary-600 dark:text-primary-400 flex items-center text-sm font-medium">
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
        <section className="mt-16 p-8 bg-gradient-to-r from-primary-600 to-cyan-600 rounded-2xl shadow-lg text-center slide-up">
          <Award className="mx-auto text-white mb-4" size={40} />
          <h3 className="text-2xl font-bold text-white mb-4">Join 10,000+ learners</h3>
          <p className="text-blue-100 max-w-2xl mx-auto mb-6">
            "StudySync AI helped me improve my retention by 72% in just 2 weeks. The spaced repetition system is a game-changer!"
          </p>
          <button className="bg-white text-primary-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors">
            Get Started Free
          </button>
        </section>
      </main>
    </div>
  )
}