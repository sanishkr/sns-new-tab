


import "./style.css";



import { useEffect, useState } from "react"
import bgImage from "url:./assets/bg.jpeg"





function NewTab() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [greeting, setGreeting] = useState("")
  const [quote, setQuote] = useState({ text: "", author: "" })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const hour = currentTime.getHours()
    if (hour >= 5 && hour < 12) {
      setGreeting("Good morning")
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Good afternoon")
    } else {
      setGreeting("Good evening")
    }
  }, [currentTime])

  useEffect(() => {
    // Set daily quote based on current date
    const quotes = [
      {
        text: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney"
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
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill"
      },
      {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
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
        text: "The only impossible journey is the one you never begin.",
        author: "Tony Robbins"
      }
    ]

    // Get daily quote based on date
    const today = new Date()
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
        (1000 * 60 * 60 * 24)
    )
    const selectedQuote = quotes[dayOfYear % quotes.length]
    setQuote(selectedQuote)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  const quickLinks = [
    { name: "Gmail", url: "https://gmail.com", icon: "📧" },
    { name: "GitHub", url: "https://github.com", icon: "💻" },
    { name: "YouTube", url: "https://youtube.com", icon: "🎬" },
    { name: "Twitter", url: "https://twitter.com", icon: "🐦" },
    { name: "Reddit", url: "https://reddit.com", icon: "📱" },
    { name: "Stack Overflow", url: "https://stackoverflow.com", icon: "❓" }
  ]

  const backgrounds = [
    "bg-gradient-to-br from-blue-400 to-purple-600",
    "bg-gradient-to-br from-green-400 to-blue-600",
    "bg-gradient-to-br from-purple-400 to-pink-600",
    "bg-gradient-to-br from-yellow-400 to-red-600",
    "bg-gradient-to-br from-indigo-400 to-cyan-600"
  ]

  const currentBg =
    backgrounds[
      Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % backgrounds.length
    ]

  return (
    <div
      className={`min-h-screen ${currentBg} flex flex-col items-center justify-center p-8 bg-cover bg-center bg-no-repeat relative`}
      style={{
        backgroundImage: `url('${bgImage}')`,
        backgroundBlendMode: "overlay",
        backgroundSize: "cover"
      }}>
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "#000000bf",
          opacity: 0.8
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center text-white">
        <h1 className="text-[10rem] font-semibold mb-6 leading-none">
          {formatTime(currentTime)}
        </h1>
        <p className="text-3xl font-light tracking-wider opacity-80">
          {formatDate(currentTime)}
        </p>
        <p className="text-5xl font-semibold mt-6">{greeting}, sns!</p>
      </div>

      {/* Quote Section - Bottom of screen */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center text-white max-w-2xl z-10">
        <blockquote className="text-sm font-light italic opacity-70 leading-relaxed">
          "{quote.text}"
        </blockquote>
        <cite className="block mt-2 text-xs font-medium opacity-60">
          — {quote.author}
        </cite>
      </div>

      {/* <div className="relative z-10 mt-12 text-white text-center opacity-70">
        <p className="text-lg">Have a productive day! 🚀</p>
      </div> */}
    </div>
  )
}

export default NewTab