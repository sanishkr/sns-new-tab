import { useEffect, useState } from "react"

interface ClockProps {
  className?: string
}

export function Clock({ className = "" }: ClockProps) {
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

  return (
    <h1 className={`text-[10rem] font-semibold mb-6 leading-none ${className}`}>
      {formatTime(currentTime)}
    </h1>
  )
}
