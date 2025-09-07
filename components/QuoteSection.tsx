import { useEffect, useState } from "react"

interface QuoteSectionProps {
  className?: string
}

interface Quote {
  text: string
  author: string
}

const quotes: Quote[] = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs"
  },
  {
    text: "Life is what happens to you while you're busy making other plans.",
    author: "John Lennon"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle"
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney"
  },
  {
    text: "Don't let yesterday take up too much of today.",
    author: "Will Rogers"
  },
  {
    text: "You learn more from failure than from success.",
    author: "Unknown"
  },
  {
    text: "If you are working on something exciting that you really care about, you don't have to be pushed.",
    author: "Steve Jobs"
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins"
  },
  {
    text: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein"
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  },
  {
    text: "The only person you are destined to become is the person you decide to be.",
    author: "Ralph Waldo Emerson"
  },
  {
    text: "Go confidently in the direction of your dreams. Live the life you have imagined.",
    author: "Henry David Thoreau"
  },
  {
    text: "Everything you've ever wanted is on the other side of fear.",
    author: "George Addair"
  },
  { text: "Dreams don't work unless you do.", author: "John C. Maxwell" },
  {
    text: "The future starts today, not tomorrow.",
    author: "Pope John Paul II"
  },
  {
    text: "Whether you think you can or you think you can't, you're right.",
    author: "Henry Ford"
  },
  {
    text: "The only limit to our realization of tomorrow will be our doubts of today.",
    author: "Franklin D. Roosevelt"
  },
  {
    text: "Do something today that your future self will thank you for.",
    author: "Sean Patrick Flanery"
  },
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb"
  },
  { text: "Your limitation—it's only your imagination.", author: "Unknown" },
  {
    text: "Push yourself, because no one else is going to do it for you.",
    author: "Unknown"
  },
  { text: "Great things never come from comfort zones.", author: "Unknown" },
  { text: "Dream it. Wish it. Do it.", author: "Unknown" },
  {
    text: "Success doesn't just find you. You have to go out and get it.",
    author: "Unknown"
  },
  {
    text: "The harder you work for something, the greater you'll feel when you achieve it.",
    author: "Unknown"
  },
  { text: "Dream bigger. Do bigger.", author: "Unknown" },
  {
    text: "Don't stop when you're tired. Stop when you're done.",
    author: "Unknown"
  }
]
export function QuoteSection({ className = "" }: QuoteSectionProps) {
  const [quote, setQuote] = useState<Quote>({ text: "", author: "" })

  useEffect(() => {
    // Get a consistent quote for the day based on the date
    const today = new Date()
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
        86400000
    )
    const quoteIndex = dayOfYear % quotes.length
    setQuote(quotes[quoteIndex])
  }, [])

  if (!quote.text) return null

  return (
    <div
      className={`text-center max-w-2xl fixed bottom-8 left-1/2 transform -translate-x-1/2 text-white z-10 ${className}`}>
      <blockquote className="text-lg font-light italic opacity-80leading-relaxed">
        "{quote.text}"
      </blockquote>
      <cite className="block mt-2 text-xs font-medium opacity-60">
        — {quote.author}
      </cite>
    </div>
  )
}
