import { useEffect, useState } from "react"

interface DateDisplayProps {
  className?: string
}

export function DateDisplay({ className = "" }: DateDisplayProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  return (
    <p className={`text-3xl font-light tracking-wider opacity-80 ${className}`}>
      {formatDate(currentDate)}
    </p>
  )
}
