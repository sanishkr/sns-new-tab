import { useEffect, useState } from "react"

interface GreetingProps {
  name?: string
  className?: string
}

export function Greeting({ name = "sns", className = "" }: GreetingProps) {
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours()
      let timeGreeting = ""

      if (hour >= 5 && hour < 12) {
        timeGreeting = "Good morning"
      } else if (hour >= 12 && hour < 18) {
        timeGreeting = "Good afternoon"
      } else {
        timeGreeting = "Good evening"
      }

      setGreeting(`${timeGreeting}, ${name}`)
    }

    updateGreeting()
    const timer = setInterval(updateGreeting, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [name])

  return (
    <h1 className={`text-5xl font-semibold mt-6 ${className}`}>{greeting}</h1>
  )
}
