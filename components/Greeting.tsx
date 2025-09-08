import { useEffect, useRef, useState } from "react"

interface GreetingProps {
  className?: string
}

const DEFAULT_USER_NAME = "user"
export function Greeting({ className = "" }: GreetingProps) {
  const [greeting, setGreeting] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [tempName, setTempName] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  // Load name from localStorage on mount
  useEffect(() => {
    const savedName = localStorage.getItem("userName") || DEFAULT_USER_NAME
    setDisplayName(savedName)
  }, [])

  // Update greeting when displayName changes
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

      setGreeting(`${timeGreeting}, `)
    }

    updateGreeting()
    const timer = setInterval(updateGreeting, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleNameClick = () => {
    setTempName(displayName)
    setIsEditing(true)
  }

  const saveName = () => {
    const newName = tempName.trim() || "sns"
    setDisplayName(newName)
    localStorage.setItem("userName", newName)
    setIsEditing(false)
  }

  const cancelEdit = () => {
    setTempName("")
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      saveName()
    } else if (e.key === "Escape") {
      cancelEdit()
    }
  }

  const handleInputBlur = () => {
    saveName()
  }

  return (
    <h1 className={`text-5xl font-semibold mt-6 ${className}`}>
      {greeting}
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleInputBlur}
          className="bg-transparent border-b-2 border-white/50 outline-none text-white placeholder-white/70 min-w-[90px] max-w-[100px] focus:max-w-[100px] "
          placeholder="user"
          maxLength={20}
        />
      ) : (
        <span
          onClick={handleNameClick}
          className="cursor-pointer hover:text-white/80 transition-colors duration-200 border-b-2 border-transparent hover:border-white/30"
          title="Click to edit your name">
          {displayName}
        </span>
      )}
    </h1>
  )
}
