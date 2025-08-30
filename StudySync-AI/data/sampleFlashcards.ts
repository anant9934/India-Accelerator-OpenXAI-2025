import { nanoid } from 'nanoid'
import type { FlashcardData } from '@/types'

export const sampleFlashcards: FlashcardData[] = [
  {
    id: nanoid(),
    front: 'What is React?',
    back: 'React is a JavaScript library for building user interfaces, particularly single-page applications where data changes over time.',
    difficulty: 'easy',
    category: 'Programming',
    tags: ['react', 'javascript', 'frontend'],
    createdAt: new Date(),
    updatedAt: new Date(),
    streak: 3
  },
  {
    id: nanoid(),
    front: 'What is JSX?',
    back: 'JSX is a syntax extension for JavaScript that looks similar to HTML. It is used with React to describe what the UI should look like.',
    difficulty: 'medium',
    category: 'Programming',
    tags: ['react', 'jsx', 'javascript'],
    createdAt: new Date(),
    updatedAt: new Date(),
    streak: 5
  },
  {
    id: nanoid(),
    front: 'What are React Hooks?',
    back: 'Hooks are functions that let you "hook into" React state and lifecycle features from function components. They were introduced in React 16.8.',
    difficulty: 'medium',
    category: 'Programming',
    tags: ['react', 'hooks', 'javascript'],
    createdAt: new Date(),
    updatedAt: new Date(),
    streak: 2
  },
  {
    id: nanoid(),
    front: 'What is the virtual DOM?',
    back: 'The virtual DOM is a programming concept where a "virtual" representation of a UI is kept in memory and synced with the "real" DOM by a library such as ReactDOM.',
    difficulty: 'hard',
    category: 'Programming',
    tags: ['react', 'virtual-dom', 'performance'],
    createdAt: new Date(),
    updatedAt: new Date(),
    streak: 1
  },
  {
    id: nanoid(),
    front: 'What is TypeScript?',
    back: 'TypeScript is a superset of JavaScript that adds static typing and other features to help build large-scale applications.',
    difficulty: 'easy',
    category: 'Programming',
    tags: ['typescript', 'javascript', 'programming'],
    createdAt: new Date(),
    updatedAt: new Date(),
    streak: 4
  },
  {
    id: nanoid(),
    front: 'What is photosynthesis?',
    back: 'Photosynthesis is the process used by plants, algae, and certain bacteria to harness energy from sunlight and turn it into chemical energy.',
    difficulty: 'easy',
    category: 'Science',
    tags: ['biology', 'plants', 'energy'],
    createdAt: new Date(),
    updatedAt: new Date(),
    streak: 6
  },
  {
    id: nanoid(),
    front: 'What is the mitochondria?',
    back: 'The mitochondria is an organelle found in large numbers in most cells, in which the biochemical processes of respiration and energy production occur.',
    difficulty: 'medium',
    category: 'Science',
    tags: ['biology', 'cells', 'energy'],
    createdAt: new Date(),
    updatedAt: new Date(),
    streak: 3
  },
  {
    id: nanoid(),
    front: 'What is Newton\'s first law of motion?',
    back: 'Newton\'s first law states that an object at rest will stay at rest, and an object in motion will stay in motion with the same speed and in the same direction unless acted upon by an unbalanced force.',
    difficulty: 'medium',
    category: 'Science',
    tags: ['physics', 'motion', 'newton'],
    createdAt: new Date(),
    updatedAt: new Date(),
    streak: 2
  },
  {
    id: nanoid(),
    front: 'What is quantum entanglement?',
    back: 'Quantum entanglement is a physical phenomenon that occurs when pairs or groups of particles are generated or interact in ways such that the quantum state of each particle cannot be described independently of the others.',
    difficulty: 'hard',
    category: 'Science',
    tags: ['physics', 'quantum', 'entanglement'],
    createdAt: new Date(),
    updatedAt: new Date(),
    streak: 1
  },
  {
    id: nanoid(),
    front: 'Who wrote "Romeo and Juliet"?',
    back: 'William Shakespeare wrote "Romeo and Juliet" between 1591 and 1595. It is one of his most famous plays.',
    difficulty: 'easy',
    category: 'Literature',
    tags: ['shakespeare', 'plays', 'classics'],
    createdAt: new Date(),
    updatedAt: new Date(),
    streak: 5
  },
  {
    id: nanoid(),
    front: 'What is the capital of Japan?',
    back: 'The capital of Japan is Tokyo, which is one of the most populous metropolitan areas in the world.',
    difficulty: 'easy',
    category: 'Geography',
    tags: ['japan', 'capitals', 'asia'],
    createdAt: new Date(),
    updatedAt: new Date(),
    streak: 7
  },
  {
    id: nanoid(),
    front: 'What year did World War II end?',
    back: 'World War II ended in 1945, with Victory in Europe Day on May 8 and Victory over Japan Day on September 2.',
    difficulty: 'medium',
    category: 'History',
    tags: ['ww2', '20th-century', 'world-history'],
    createdAt: new Date(),
    updatedAt: new Date(),
    streak: 4
  },
  {
    id: nanoid(),
    front: 'What is the Pythagorean theorem?',
    back: 'The Pythagorean theorem states that in a right-angled triangle, the square of the hypotenuse is equal to the sum of the squares of the other two sides: a² + b² = c².',
    difficulty: 'medium',
    category: 'Mathematics',
    tags: ['geometry', 'theorem', 'math'],
    createdAt: new Date(),
    updatedAt: new Date(),
    streak: 3
  },
  {
    id: nanoid(),
    front: 'What is the theory of relativity?',
    back: 'The theory of relativity, developed by Albert Einstein, consists of special relativity and general relativity, which revolutionized our understanding of space, time, and gravity.',
    difficulty: 'hard',
    category: 'Science',
    tags: ['physics', 'einstein', 'relativity'],
    createdAt: new Date(),
    updatedAt: new Date(),
    streak: 2
  },
  {
    id: nanoid(),
    front: 'What is the Fibonacci sequence?',
    back: 'The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones, usually starting with 0 and 1. It appears in many natural phenomena.',
    difficulty: 'medium',
    category: 'Mathematics',
    tags: ['sequence', 'math', 'patterns'],
    createdAt: new Date(),
    updatedAt: new Date(),
    streak: 4
  }
]