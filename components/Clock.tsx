import { useEffect, useState } from "react"

import { DropdownMenu } from "./DropdownMenu"

interface ClockProps {
  className?: string
  onToggleDateVisibility?: () => void
  showDate?: boolean
  onToggleQuotesVisibility?: () => void
  showQuotes?: boolean
  onToggleWeatherVisibility?: () => void
  showWeather?: boolean
  onToggleFridayVisibility?: () => void
  showFriday?: boolean
}

export function Clock({
  className = "",
  onToggleDateVisibility,
  showDate = true,
  onToggleQuotesVisibility,
  showQuotes = true,
  onToggleWeatherVisibility,
  showWeather = true,
  onToggleFridayVisibility,
  showFriday = false
}: ClockProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const clockMenuItems = [
    {
      label: showDate ? "Hide date" : "Show date",
      onClick: () => onToggleDateVisibility?.(),
      icon: showDate ? "🙈" : "📅"
    },
    {
      label: showQuotes ? "Hide quotes" : "Show quotes",
      onClick: () => onToggleQuotesVisibility?.(),
      icon: showQuotes ? "💭" : "📝"
    },
    {
      label: showWeather ? "Hide weather" : "Show weather",
      onClick: () => onToggleWeatherVisibility?.(),
      icon: showWeather ? "🌤️" : "☁️"
    },
    {
      label: showFriday ? "Show greeting" : "Is it Friday?",
      onClick: () => onToggleFridayVisibility?.(),
      icon: showFriday ? "👋" : "🎊"
    }
  ]

  return (
    <div className={`relative group ${className}`}>
      <h1 className="text-[10rem] font-semibold mb-6 leading-none -ml-3">
        {formatTime(currentTime)}
      </h1>

      {/* Three dots menu - only visible on hover */}
      <DropdownMenu
        items={clockMenuItems}
        className="absolute ml-2 transition-opacity duration-300 opacity-0 top-16 left-full group-hover:opacity-100"
      />
    </div>
  )
}
