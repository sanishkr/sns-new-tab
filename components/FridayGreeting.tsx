import { useEffect, useState } from "react"

interface FridayGreetingProps {
  className?: string
}

// Days until Friday: 0=Sunday … 5=Friday … 6=Saturday
// (5 - today + 7) % 7 gives days remaining from today (exclusive of today's Friday case).
function getFridayStatus() {
  const today = new Date().getDay()
  const isFriday = today === 5
  const daysUntil = isFriday ? 0 : (5 - today + 7) % 7
  return { isFriday, daysUntil }
}

export function FridayGreeting({ className = "" }: FridayGreetingProps) {
  const [status, setStatus] = useState(getFridayStatus())

  // Refresh once a minute so the answer flips at midnight if the tab is left open.
  useEffect(() => {
    const update = () => setStatus(getFridayStatus())
    update()
    const timer = setInterval(update, 60000)
    return () => clearInterval(timer)
  }, [])

  const countdownText =
    status.daysUntil === 1 ? "Tomorrow!" : `${status.daysUntil} days to go`

  return (
    <h1 className={`text-5xl font-semibold ${className}`}>
      Is it Friday yet?
      <span
        className={`block mt-4 ${status.isFriday ? "text-8xl" : "text-6xl"}`}>
        {status.isFriday ? "Yes!" : `Nope. ${countdownText}.`}
      </span>
    </h1>
  )
}
