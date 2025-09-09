import { useEffect, useState } from "react";



import { DropdownMenu } from "./DropdownMenu"

interface ClockProps {
  className?: string
  onToggleDateVisibility?: () => void
  showDate?: boolean
}

export function Clock({
  className = "",
  onToggleDateVisibility,
  showDate = true
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
        className="absolute top-16 left-full ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
    </div>
  )
}