import { nanoid } from 'nanoid'
import type { QuizQuestion } from '@/types'

export const sampleQuizzes: QuizQuestion[] = [
  {
    id: nanoid(),
    question: 'What does JSX stand for in React?',
    options: [
      'JavaScript XML',
      'JavaScript Extension',
      'Java Syntax Extension',
      'JavaScript Syntax'
    ],
    correctAnswer: 0,
    explanation: 'JSX stands for JavaScript XML. It allows you to write HTML-like syntax in your JavaScript code.',
    category: 'Programming',
    difficulty: 'easy'
  },
  {
    id: nanoid(),
    question: 'Which of the following is NOT a React hook?',
    options: [
      'useState',
      'useEffect',
      'useComponent',
      'useContext'
    ],
    correctAnswer: 2,
    explanation: 'useComponent is not a valid React hook. The built-in hooks are useState, useEffect, useContext, useReducer, useCallback, useMemo, useRef, useImperativeHandle, useLayoutEffect, and useDebugValue.',
    category: 'Programming',
    difficulty: 'medium'
  },
  {
    id: nanoid(),
    question: 'What is the main purpose of the virtual DOM in React?',
    options: [
      'To improve performance by minimizing direct DOM manipulation',
      'To provide a backup of the real DOM',
      'To enable server-side rendering',
      'To make components more reusable'
    ],
    correctAnswer: 0,
    explanation: 'The virtual DOM improves performance by reducing direct manipulation of the actual DOM. React creates a virtual representation of the UI, compares it with the previous version, and updates only what changed.',
    category: 'Programming',
    difficulty: 'hard'
  },
  {
    id: nanoid(),
    question: 'Which TypeScript feature helps catch errors at compile time?',
    options: [
      'Static typing',
      'Dynamic typing',
      'Type inference',
      'Both static typing and type inference'
    ],
    correctAnswer: 3,
    explanation: 'TypeScript uses both static typing (explicit type annotations) and type inference (automatic type detection) to catch errors during compilation rather than at runtime.',
    category: 'Programming',
    difficulty: 'medium'
  },
  {
    id: nanoid(),
    question: 'What is the primary function of chloroplasts in plant cells?',
    options: [
      'Cellular respiration',
      'Protein synthesis',
      'Photosynthesis',
      'DNA replication'
    ],
    correctAnswer: 2,
    explanation: 'Chloroplasts are organelles found in plant cells that contain chlorophyll and are responsible for photosynthesis, the process of converting light energy into chemical energy.',
    category: 'Science',
    difficulty: 'easy'
  },
  {
    id: nanoid(),
    question: 'Which law of thermodynamics states that energy cannot be created or destroyed?',
    options: [
      'Zeroth law',
      'First law',
      'Second law',
      'Third law'
    ],
    correctAnswer: 1,
    explanation: 'The first law of thermodynamics, also known as the law of energy conservation, states that energy cannot be created or destroyed, only transformed from one form to another.',
    category: 'Science',
    difficulty: 'medium'
  },
  {
    id: nanoid(),
    question: 'Who developed the theory of general relativity?',
    options: [
      'Isaac Newton',
      'Niels Bohr',
      'Albert Einstein',
      'Stephen Hawking'
    ],
    correctAnswer: 2,
    explanation: 'Albert Einstein developed the theory of general relativity, which was published in 1915. It revolutionized our understanding of gravity as the curvature of spacetime.',
    category: 'Science',
    difficulty: 'easy'
  },
  {
    id: nanoid(),
    question: 'In which century did William Shakespeare write most of his plays?',
    options: [
      '15th century',
      '16th century',
      '17th century',
      '18th century'
    ],
    correctAnswer: 1,
    explanation: 'William Shakespeare wrote most of his plays during the late 16th and early 17th centuries, specifically between 1589 and 1613.',
    category: 'Literature',
    difficulty: 'medium'
  },
  {
    id: nanoid(),
    question: 'What is the capital of Australia?',
    options: [
      'Sydney',
      'Melbourne',
      'Canberra',
      'Perth'
    ],
    correctAnswer: 2,
    explanation: 'Canberra is the capital of Australia. It was specifically designed as a capital city and is located in the Australian Capital Territory.',
    category: 'Geography',
    difficulty: 'easy'
  },
  {
    id: nanoid(),
    question: 'Which ancient civilization built the Machu Picchu complex?',
    options: [
      'Aztec',
      'Maya',
      'Inca',
      'Olmec'
    ],
    correctAnswer: 2,
    explanation: 'The Inca civilization built Machu Picchu in the 15th century. It is located in the Andes Mountains in Peru and is one of the most famous archaeological sites in the world.',
    category: 'History',
    difficulty: 'medium'
  },
  {
    id: nanoid(),
    question: 'What is the value of π (pi) approximately?',
    options: [
      '3.14',
      '2.71',
      '1.62',
      '4.67'
    ],
    correctAnswer: 0,
    explanation: 'π (pi) is approximately 3.14159, but it is often rounded to 3.14 for calculations. It represents the ratio of a circle\'s circumference to its diameter.',
    category: 'Mathematics',
    difficulty: 'easy'
  },
  {
    id: nanoid(),
    question: 'Which mathematical concept is represented by the golden ratio?',
    options: [
      'φ (phi)',
      'π (pi)',
      'e',
      '√2'
    ],
    correctAnswer: 0,
    explanation: 'The golden ratio is represented by the Greek letter φ (phi) and is approximately equal to 1.618. It appears in various natural and designed structures and is considered aesthetically pleasing.',
    category: 'Mathematics',
    difficulty: 'hard'
  }
]