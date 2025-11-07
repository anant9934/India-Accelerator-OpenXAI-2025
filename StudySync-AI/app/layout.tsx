import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/contexts/ThemeContext'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: {
    default: 'StudySync AI - Personalized Learning Companion',
    template: '%s | StudySync AI'
  },
  description: 'AI-powered personalized learning companion with interactive flashcards, quizzes, and progress tracking using spaced repetition and adaptive learning algorithms.',
  keywords: 'education, flashcards, quiz, AI, learning, spaced repetition, study tools, online learning, adaptive learning, progress tracking',
  authors: [{ name: 'StudySync AI Team' }],
  creator: 'StudySync AI',
  publisher: 'StudySync AI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://studysync-ai.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://studysync-ai.vercel.app',
    title: 'StudySync AI - Personalized Learning Companion',
    description: 'AI-powered personalized learning companion with interactive flashcards, quizzes, and progress tracking.',
    siteName: 'StudySync AI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'StudySync AI - Master Anything Faster & Smarter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StudySync AI - Personalized Learning Companion',
    description: 'AI-powered personalized learning companion with interactive flashcards, quizzes, and progress tracking.',
    images: ['/og-image.png'],
    creator: '@studysync_ai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3b82f6' },
    { media: '(prefers-color-scheme: dark)', color: '#1e40af' }
  ],
  colorScheme: 'light dark',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/_next/static/css/app.css"
          as="style"
        />
        
        {/* Favicon and app icons */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/safari-pinned-tab.svg"
          color="#3b82f6"
        />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "StudySync AI",
              "description": "AI-powered personalized learning companion with interactive flashcards, quizzes, and progress tracking.",
              "url": "https://studysync-ai.vercel.app",
              "applicationCategory": "EducationalApplication",
              "operatingSystem": "Web Browser",
              "permissions": "browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "author": {
                "@type": "Organization",
                "name": "StudySync AI Team"
              },
              "featureList": [
                "AI-Powered Content Generation",
                "Spaced Repetition System",
                "Interactive Quizzes",
                "Progress Tracking",
                "Adaptive Learning"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <div className="min-h-screen bg-background text-foreground">
            {/* Background Pattern */}
            <div 
              className="fixed inset-0 -z-10 opacity-5"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                backgroundSize: '32px 32px',
              }}
            />
            
            {/* Main Content */}
            <main className="relative z-10">
              {children}
            </main>

            {/* Performance Monitoring */}
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  if (typeof window !== 'undefined') {
                    // Performance monitoring
                    window.addEventListener('load', function() {
                      setTimeout(function() {
                        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                        console.log('Page load time:', loadTime + 'ms');
                      }, 0);
                    });

                    // Service Worker registration (optional)
                    if ('serviceWorker' in navigator) {
                      navigator.serviceWorker.register('/sw.js').catch(console.error);
                    }
                  }
                `,
              }}
            />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
