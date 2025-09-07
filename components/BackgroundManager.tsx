import { type ReactNode } from "react"
import bgImage from "url:../assets/bg.jpeg"

interface BackgroundManagerProps {
  children: ReactNode
  overlayOpacity?: number
}

export function BackgroundManager({
  children,
  overlayOpacity = 0.8
}: BackgroundManagerProps) {
  const backgrounds = [
    "bg-gradient-to-br from-blue-400 to-purple-600",
    "bg-gradient-to-br from-green-400 to-blue-600",
    "bg-gradient-to-br from-purple-400 to-pink-600",
    "bg-gradient-to-br from-yellow-400 to-red-600",
    "bg-gradient-to-br from-indigo-400 to-cyan-600"
  ]
  // fallback to a gradient background based on the day of the month
  const currentBg =
    backgrounds[
      Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % backgrounds.length
    ]
  return (
    <div
      className={`min-h-screen ${currentBg} flex flex-col items-center justify-center p-8 bg-cover bg-center bg-no-repeat relative`}
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundBlendMode: "overlay"
      }}>
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          inset: 0,
          backgroundColor: "#000000bf",
          opacity: overlayOpacity
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
