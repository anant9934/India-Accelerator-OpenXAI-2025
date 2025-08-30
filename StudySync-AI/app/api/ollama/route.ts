import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { type, topic, difficulty, model = 'llama3.2:1b' } = await request.json()

    if (!type || !topic) {
      return NextResponse.json(
        { error: 'Missing required fields: type and topic' },
        { status: 400 }
      )
    }

    // Ollama API endpoint
    const OLLAMA_URL = 'http://localhost:11434/api/generate'

    let prompt = ''
    if (type === 'flashcard') {
      prompt = `Create a educational flashcard about ${topic} at ${difficulty} difficulty level. 
      Return ONLY a JSON object with front and back properties. The front should be a question 
      and the back should be the answer. Make it concise but informative.`
    } else if (type === 'quiz') {
      prompt = `Create a multiple choice quiz question about ${topic} at ${difficulty} difficulty level.
      Return ONLY a JSON object with: question, options (array of 4 strings), correctAnswer (index 0-3),
      and explanation. Make the question challenging but fair.`
    }

    const response = await fetch(OLLAMA_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        prompt,
        stream: false,
      }),
      signal: AbortSignal.timeout(30000), // 30 second timeout
    })

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`)
    }

    const data = await response.json()
    
    // Try to extract JSON from the response
    try {
      const jsonMatch = data.response.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const result = JSON.parse(jsonMatch[0])
        return NextResponse.json(result)
      }
      throw new Error('No JSON found in response')
    } catch (parseError) {
      // Fallback response if AI is unavailable or returns invalid JSON
      return NextResponse.json(getFallbackContent(type, topic, difficulty))
    }
  } catch (error) {
    console.error('Ollama API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate content. Please check if Ollama is running.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Health check endpoint
    const response = await fetch('http://localhost:11434/api/tags', {
      signal: AbortSignal.timeout(5000),
    })
    
    if (!response.ok) {
      throw new Error('Ollama not available')
    }
    
    return NextResponse.json({ status: 'connected' })
  } catch (error) {
    return NextResponse.json(
      { status: 'disconnected', error: 'Ollama is not running' },
      { status: 503 }
    )
  }
}

function getFallbackContent(type: string, topic: string, difficulty: string) {
  if (type === 'flashcard') {
    return {
      front: `What is the main concept behind ${topic}?`,
      back: `${topic} is a fundamental concept that involves important principles and applications in its field.`
    }
  } else {
    return {
      question: `What is the primary purpose of ${topic}?`,
      options: [
        'To solve complex problems',
        'To optimize processes',
        'To enhance understanding',
        'All of the above'
      ],
      correctAnswer: 3,
      explanation: `${topic} serves multiple purposes including problem-solving, optimization, and enhancing understanding of complex concepts.`
    }
  }
}