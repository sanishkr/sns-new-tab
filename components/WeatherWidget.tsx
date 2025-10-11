import React, { useEffect, useRef, useState } from "react"

import type {
  LocationData,
  WeatherData,
  WeatherPreferences
} from "../utils/weatherService"
import {
  cacheWeatherData,
  convertWeatherUnits,
  fetchWeatherData,
  getCachedWeatherData,
  getDemoWeatherData,
  getUserLocation,
  getWeatherIcon,
  getWeatherPreferences,
  saveWeatherPreferences
} from "../utils/weatherService"
import { DropdownMenu } from "./DropdownMenu"
import { LocationSearch } from "./LocationSearch"
import type { LocationResult } from "../utils/locationService"

interface WeatherWidgetProps {
  className?: string
}

export function WeatherWidget({ className = "" }: WeatherWidgetProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [preferences, setPreferences] = useState<WeatherPreferences>(
    getWeatherPreferences()
  )
  const [isExpanded, setIsExpanded] = useState(false)
  const [showLocationSearch, setShowLocationSearch] = useState(false)
  const widgetRef = useRef<HTMLDivElement>(null)

  // Load weather data on mount and when preferences change
  useEffect(() => {
    loadWeatherData()
  }, [preferences.units, preferences.autoLocation, preferences.customLocation])

  // Request location permission on first load
  useEffect(() => {
    if (preferences.autoLocation) {
      // Pre-request location permission for better UX
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          () => {
            // Location permission granted, data will load via other useEffect
          },
          (error) => {
            console.log("Location permission denied or failed:", error.message)
            // Will fallback to default location in loadWeatherData
          },
          { timeout: 5000 }
        )
      }
    }
  }, []) // Only run once on mount

  // Click outside to close expanded panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        widgetRef.current &&
        !widgetRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false)
      }
    }

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isExpanded])

  const loadWeatherData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // First try to get cached data
      const cached = getCachedWeatherData()
      if (cached) {
        setWeatherData(cached)
        setIsLoading(false)
        return
      }

      // Production code - get real weather data
      let location: LocationData

      if (preferences.autoLocation) {
        try {
          location = await getUserLocation()
        } catch (locationError) {
          // Fallback to default location if geolocation fails
          location = {
            lat: 37.7749,
            lon: -122.4194,
            name: "San Francisco",
            country: "US"
          }
        }
      } else if (preferences.customLocationData) {
        // Use saved custom location data
        location = preferences.customLocationData
      } else {
        // Fallback to San Francisco if no custom location set
        location = {
          lat: 37.7749,
          lon: -122.4194,
          name: "San Francisco",
          country: "US"
        }
      }

      const weather = await fetchWeatherData(location, preferences.units)
      setWeatherData(weather)
      cacheWeatherData(weather)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load weather")
      console.error("Weather error:", err)

      // Fallback to demo data if API fails
      try {
        const demoData = getDemoWeatherData()
        setWeatherData(demoData)
        cacheWeatherData(demoData)
      } catch (demoError) {
        console.error("Demo data fallback failed:", demoError)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const toggleUnits = () => {
    console.log("Toggle units clicked, current units:", preferences.units)
    const newUnits: "metric" | "imperial" =
      preferences.units === "metric" ? "imperial" : "metric"
    const newPreferences = { ...preferences, units: newUnits }
    setPreferences(newPreferences)
    saveWeatherPreferences(newPreferences)

    // Convert existing weather data instead of making new API call
    if (weatherData) {
      const convertedData = convertWeatherUnits(weatherData, newUnits)
      setWeatherData(convertedData)
      cacheWeatherData(convertedData)
    }
    console.log("Units toggled to:", newUnits)
  }

  const refreshWeather = () => {
    console.log("Refresh weather clicked")
    // Clear cache and reload
    localStorage.removeItem("weatherData")
    localStorage.removeItem("weatherTimestamp")
    loadWeatherData()
  }

  const handleLocationSelect = (location: LocationResult) => {
    console.log("Location selected:", location)
    const newPreferences = {
      ...preferences,
      autoLocation: false,
      customLocation: location.name,
      customLocationData: {
        lat: location.lat,
        lon: location.lon,
        name: location.name,
        country: location.country
      }
    }
    setPreferences(newPreferences)
    saveWeatherPreferences(newPreferences)
    setShowLocationSearch(false)

    // Clear cache and reload weather for new location
    localStorage.removeItem("weatherData")
    localStorage.removeItem("weatherTimestamp")
  }

  const toggleAutoLocation = () => {
    const newPreferences = {
      ...preferences,
      autoLocation: !preferences.autoLocation
    }
    setPreferences(newPreferences)
    saveWeatherPreferences(newPreferences)

    // Clear cache and reload
    localStorage.removeItem("weatherData")
    localStorage.removeItem("weatherTimestamp")
  }

  const weatherMenuItems = [
    {
      label: `Switch to ${preferences.units === "metric" ? "°F" : "°C"}`,
      onClick: toggleUnits,
      icon: "🌡️"
    },
    {
      label: preferences.autoLocation ? "Use Custom Location" : "Use Auto Location",
      onClick: preferences.autoLocation ? () => setShowLocationSearch(true) : toggleAutoLocation,
      icon: "📍"
    },
    {
      label: "Refresh",
      onClick: refreshWeather,
      icon: "🔄"
    }
  ]

  const formatTemperature = (temp: number) => {
    const unit = preferences.units === "metric" ? "°C" : "°F"
    return `${temp}${unit}`
  }

  const formatWindSpeed = (speed: number) => {
    const unit = preferences.units === "metric" ? "m/s" : "mph"
    return `${speed} ${unit}`
  }

  return (
    <div className={`fixed top-4 right-4 z-30 ${className}`}>
      <div ref={widgetRef} className="relative">
        {/* Compact Weather Display */}
        <div
          className="bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-all duration-200 rounded-lg p-3 text-white/80 hover:text-white cursor-pointer min-w-[120px]"
          onClick={() => setIsExpanded(!isExpanded)}>
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full"></div>
              <span className="text-sm">Loading...</span>
            </div>
          ) : error ? (
            <div className="flex items-center gap-2">
              <span className="text-red-400">⚠️</span>
              <span className="text-sm text-red-400">Error</span>
            </div>
          ) : weatherData ? (
            <div className="flex items-center gap-2">
              <span className="text-lg">
                {getWeatherIcon(weatherData.condition, weatherData.icon)}
              </span>
              <div>
                <div className="text-lg font-medium">
                  {formatTemperature(weatherData.temperature)}
                </div>
                <div className="text-xs text-white/60 truncate max-w-[80px]">
                  {weatherData.location}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span>🌤️</span>
              <span className="text-sm">Weather</span>
            </div>
          )}
        </div>

        {/* Expanded Weather Details */}
        {isExpanded && weatherData && !isLoading && !error && (
          <div className="absolute top-full right-0 mt-2 bg-black/80 backdrop-blur-lg rounded-lg shadow-lg border border-white/10 p-4 min-w-[250px] z-50">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-medium">Weather</h3>
              <DropdownMenu
                items={weatherMenuItems}
                size="small"
                position="below"
                horizontalAlign="right"
              />
            </div>

            {/* Current Weather */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {getWeatherIcon(weatherData.condition, weatherData.icon)}
                </span>
                <div>
                  <div className="text-2xl font-bold text-white">
                    {formatTemperature(weatherData.temperature)}
                  </div>
                  <div className="text-sm text-white/80 capitalize">
                    {weatherData.description}
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Feels like</span>
                  <span className="text-white">
                    {formatTemperature(weatherData.feelsLike)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Humidity</span>
                  <span className="text-white">{weatherData.humidity}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Wind</span>
                  <span className="text-white">
                    {formatWindSpeed(weatherData.windSpeed)}
                  </span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-2">
                <div className="text-xs text-white/60 flex items-center gap-1">
                  <span>📍</span>
                  <span>
                    {weatherData.location}
                    {weatherData.country && `, ${weatherData.country}`}
                  </span>
                  {!preferences.autoLocation && (
                    <button
                      onClick={() => setShowLocationSearch(true)}
                      className="ml-auto text-white/60 hover:text-white transition-colors text-xs underline"
                      title="Change location">
                      Change
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Location Search Modal */}
        {showLocationSearch && (
          <div className="absolute top-full right-0 mt-2 bg-black/90 backdrop-blur-lg rounded-lg shadow-lg border border-white/10 p-4 min-w-[300px] z-50">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white font-medium text-sm">Search Location</h4>
              <button
                onClick={() => setShowLocationSearch(false)}
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Close">
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
            </div>
            <LocationSearch
              onLocationSelect={handleLocationSelect}
              placeholder="Search for a city..."
            />
            <div className="mt-3 pt-3 border-t border-white/10">
              <button
                onClick={toggleAutoLocation}
                className="text-xs text-white/60 hover:text-white transition-colors flex items-center gap-1">
                <span>🌐</span>
                <span>Use my current location instead</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
