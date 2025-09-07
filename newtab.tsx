import "./style.css"

import { useEffect, useState } from "react"

function NewTab() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const hour = currentTime.getHours()
    if (hour < 12) {
      setGreeting("Good morning")
    } else if (hour < 18) {
      setGreeting("Good afternoon")
    } else {
      setGreeting("Good evening")
    }
  }, [currentTime])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
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
      className={`min-h-screen ${currentBg} flex flex-col items-center justify-center p-8`}>
      <div className="text-center text-white mb-12">
        <h1 className="text-6xl font-light mb-4 opacity-90">
          {formatTime(currentTime)}
        </h1>
        <p className="text-2xl font-light opacity-80">
          {formatDate(currentTime)}
        </p>
        <p className="text-3xl font-light mt-4 opacity-90">{greeting}!</p>
      </div>

      <div className="grid grid-cols-3 gap-6 max-w-2xl">
        {quickLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 text-center text-white hover:bg-opacity-30 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            <div className="text-4xl mb-2">{link.icon}</div>
            <div className="text-lg font-medium">{link.name}</div>
          </a>
        ))}
      </div>

      <div className="mt-12 text-white text-center opacity-70">
        <p className="text-lg">Have a productive day! 🚀</p>
      </div>
    </div>
  )
}

export default NewTab
