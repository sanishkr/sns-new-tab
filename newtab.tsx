


import "./style.css";



import { useEffect, useState } from "react"
import bgImage from "url:./assets/bg.jpeg"

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
    if (hour >= 5 && hour < 12) {
      setGreeting("Good morning")
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Good afternoon")
    } else {
      setGreeting("Good evening")
    }
  }, [currentTime])

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

      {/* <div className="relative z-10 mt-12 text-white text-center opacity-70">
        <p className="text-lg">Have a productive day! 🚀</p>
      </div> */}
    </div>
  )
}

export default NewTab