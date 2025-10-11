import React, { useEffect, useRef, useState } from "react"

import type { LocationResult } from "../utils/locationService"
import {
  debounce,
  formatLocationName,
  searchLocations
} from "../utils/locationService"

interface LocationSearchProps {
  onLocationSelect: (location: LocationResult) => void
  placeholder?: string
  className?: string
}

export function LocationSearch({
  onLocationSelect,
  placeholder = "Search for a city...",
  className = ""
}: LocationSearchProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<LocationResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLocationResultsOpen, setIsLocationResultsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsLocationResultsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Debounced search function
  const debouncedSearch = useRef(
    debounce(async (searchQuery: string) => {
      if (searchQuery.trim().length < 2) {
        setResults([])
        setIsLoading(false)
        return
      }

      try {
        // get top 5 locations max
        const locations = await searchLocations(searchQuery, 5)
        setResults(locations)
      } catch (error) {
        console.error("Search error:", error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }, 300)
  ).current

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    setIsLoading(true)
    setIsLocationResultsOpen(true)
    setSelectedIndex(-1)
    debouncedSearch(value)
  }

  const handleLocationSelect = (location: LocationResult) => {
    setQuery(formatLocationName(location))
    setIsLocationResultsOpen(false)
    setResults([])
    onLocationSelect(location)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isLocationResultsOpen || results.length === 0) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        )
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          handleLocationSelect(results[selectedIndex])
        }
        break
      case "Escape":
        setIsLocationResultsOpen(false)
        setSelectedIndex(-1)
        break
    }
  }

  const handleClear = () => {
    setQuery("")
    setResults([])
    setIsLocationResultsOpen(false)
    setSelectedIndex(-1)
    inputRef.current?.focus()
  }

  // when selectedIndex changes, set the item selected into scrollview
  useEffect(() => {
    if (selectedIndex >= 0 && selectedIndex < results.length) {
      const element = document.querySelector(
        `.location-result:nth-child(${selectedIndex + 1})`
      )
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "nearest" })
      }
    }
  }, [selectedIndex, results.length])

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (results.length > 0) setIsLocationResultsOpen(true)
          }}
          placeholder={placeholder}
          className="w-full px-3 py-2 pr-20 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
        />

        {/* Loading/Clear Button */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {isLoading && (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          )}
          {query && !isLoading && (
            <button
              onClick={handleClear}
              className="text-white/60 hover:text-white transition-colors p-1"
              aria-label="Clear search">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 4L4 12M4 4L12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
          <div className="text-white/40 text-xs">🔍</div>
        </div>
      </div>

      {/* Results Dropdown */}
      {isLocationResultsOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-black/90 backdrop-blur-lg rounded-lg shadow-lg border border-white/10 overflow-hidden z-50 max-h-60 overflow-y-auto">
          {results.map((location, index) => (
            <button
              key={`${location.lat}-${location.lon}-${location.name}`}
              onClick={() => handleLocationSelect(location)}
              className={`location-result w-full px-4 py-3 text-left hover:bg-white/10 transition-colors ${
                index === selectedIndex ? "bg-white/10" : ""
              }`}>
              <div className="flex items-start gap-2">
                <span className="text-lg mt-0.5">📍</span>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium truncate">
                    {location.name}
                  </div>
                  <div className="text-white/60 text-sm truncate">
                    {location.state && `${location.state}, `}
                    {location.country}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No Results */}
      {isLocationResultsOpen &&
        !isLoading &&
        query.length >= 2 &&
        results.length === 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-black/90 backdrop-blur-lg rounded-lg shadow-lg border border-white/10 p-4 z-50">
            <div className="text-white/60 text-sm text-center">
              No locations found for "{query}"
            </div>
          </div>
        )}
    </div>
  )
}
