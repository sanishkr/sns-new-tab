import React, { useEffect, useState, type ReactNode } from "react"
import bgImage from "url:../assets/bg.jpeg"

import { useDailyImage } from "../utils"
import { DropdownMenu } from "./DropdownMenu"

interface BackgroundManagerProps {
  children: ReactNode
  overlayOpacity?: number
  useDynamicImages?: boolean
  category?: string
}

// Gradient backgrounds for local fallback (daily rotation)
const gradients = [
  "from-blue-400 to-purple-600",
  "from-green-400 to-blue-600",
  "from-purple-400 to-pink-600",
  "from-yellow-400 to-red-600",
  "from-indigo-400 to-cyan-600",
  "from-purple-500 to-pink-500",
  "from-blue-500 to-teal-500",
  "from-green-500 to-blue-500",
  "from-yellow-500 to-red-500",
  "from-pink-500 to-rose-500",
  "from-indigo-500 to-purple-500",
  "from-teal-500 to-green-500"
]

export function BackgroundManager({
  children,
  overlayOpacity = 0.8,
  useDynamicImages = true,
  category = "nature,landscape,mountains"
}: BackgroundManagerProps) {
  const { currentImage, isLoading, getDayOfYear } = useDailyImage({
    useDynamicImages,
    category,
    localImageUrl: bgImage
  })

  const [hasFilter, setHasFilter] = useState(true)

  // Load filter preference from localStorage on mount
  useEffect(() => {
    const savedHasFilter = localStorage.getItem("hasFilter")
    if (savedHasFilter !== null) {
      setHasFilter(JSON.parse(savedHasFilter))
    }
  }, [])

  const toggleFilter = () => {
    const newHasFilter = !hasFilter
    setHasFilter(newHasFilter)
    // Save preference to localStorage
    localStorage.setItem("hasFilter", JSON.stringify(newHasFilter))
  }

  const currentGradient = gradients[getDayOfYear() % gradients.length]

  return (
    <div
      className={`min-h-screen bg-cover bg-center bg-no-repeat relative ${
        currentImage.source === "local" || isLoading
          ? `bg-gradient-to-br ${currentGradient}`
          : ""
      }`}
      style={{
        backgroundImage: `url(${currentImage.url})`,
        backgroundBlendMode:
          currentImage.source === "local" ? "overlay" : "normal"
      }}>
      {/* Dark overlay with optional filter */}
      <div
        className={"absolute top-0 left-0 w-full h-full"}
        style={{
          backgroundColor: hasFilter ? "rgba(0, 0, 0, 0.85)" : "transparent",
          opacity:
            currentImage.source === "local"
              ? 0.8
              : hasFilter
                ? overlayOpacity
                : 1,
          zIndex: 1
        }}
      />

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute top-4 right-4 z-20">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 text-white/80 text-xs flex items-center gap-2">
            <div className="w-3 h-3 border border-white/30 border-t-white/80 rounded-full animate-spin"></div>
            Loading new background...
          </div>
        </div>
      )}

      {/* Photographer credit with menu */}
      {currentImage.photographer && currentImage.source !== "local" && (
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 group">
          <div className="bg-black/30 backdrop-blur-sm rounded-lg px-3 py-1 text-white/70 text-xs">
            Photo by{" "}
            <a
              href={currentImage.photographerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/90 hover:text-white underline transition-colors">
              {currentImage.photographer}
            </a>{" "}
            on{" "}
            <a
              href={currentImage.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/90 hover:text-white underline transition-colors">
              {currentImage.source === "unsplash" ? "Unsplash" : "Pexels"}
            </a>
          </div>

          {/* Three dots menu (horizontal) - only visible on hover */}
          <DropdownMenu
            items={[
              {
                label: hasFilter ? "Remove filter" : "Add filter",
                onClick: toggleFilter,
                icon: hasFilter ? "🔆" : "🔅"
              }
            ]}
            position="above"
            horizontalAlign="right"
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      )}

      {/* Content */}
      <div className="relative" style={{ zIndex: 10 }}>
        {children}
      </div>
    </div>
  )
}
