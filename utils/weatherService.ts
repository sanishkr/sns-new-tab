// Weather API service for OpenWeatherMap
const API_KEY = process.env.PLASMO_PUBLIC_OPENWEATHER_API_KEY || "" // You'll need to get this from openweathermap.org
const BASE_URL = "https://api.openweathermap.org/data/2.5"

export interface WeatherData {
  temperature: number
  condition: string
  description: string
  humidity: number
  windSpeed: number
  feelsLike: number
  location: string
  country: string
  icon: string
  units: "metric" | "imperial" // Track what units this data is in
}

export interface LocationData {
  lat: number
  lon: number
  name: string
  country: string
}

export interface WeatherPreferences {
  units: "metric" | "imperial"
  autoLocation: boolean
  customLocation?: string
}

// Get user's location using browser geolocation
export const getUserLocation = (): Promise<LocationData> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported"))
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        try {
          // Reverse geocoding to get location name
          const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`
          )
          const data = await response.json()

          if (data.length > 0) {
            resolve({
              lat: latitude,
              lon: longitude,
              name: data[0].name,
              country: data[0].country
            })
          } else {
            resolve({
              lat: latitude,
              lon: longitude,
              name: "Current Location",
              country: ""
            })
          }
        } catch (error) {
          // Fallback to coordinates only
          resolve({
            lat: latitude,
            lon: longitude,
            name: "Current Location",
            country: ""
          })
        }
      },
      (error) => {
        reject(new Error("Unable to get location"))
      },
      {
        timeout: 10000,
        enableHighAccuracy: false
      }
    )
  })
}

// Fetch weather data from OpenWeatherMap API
export const fetchWeatherData = async (
  location: LocationData,
  units: "metric" | "imperial" = "metric"
): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=${units}`
    )

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`)
    }

    const data = await response.json()

    return {
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind?.speed || 0,
      feelsLike: Math.round(data.main.feels_like),
      location: location.name,
      country: location.country,
      icon: data.weather[0].icon,
      units: units
    }
  } catch (error) {
    throw new Error(`Failed to fetch weather data: ${error.message}`)
  }
}

// Get cached weather data
export const getCachedWeatherData = (): WeatherData | null => {
  try {
    const cached = localStorage.getItem("weatherData")
    const timestamp = localStorage.getItem("weatherTimestamp")

    if (!cached || !timestamp) return null

    const cacheAge = Date.now() - parseInt(timestamp)
    const maxAge = 10 * 60 * 1000 // 10 minutes

    if (cacheAge > maxAge) {
      localStorage.removeItem("weatherData")
      localStorage.removeItem("weatherTimestamp")
      return null
    }

    return JSON.parse(cached)
  } catch {
    return null
  }
}

// Cache weather data
export const cacheWeatherData = (data: WeatherData): void => {
  try {
    localStorage.setItem("weatherData", JSON.stringify(data))
    localStorage.setItem("weatherTimestamp", Date.now().toString())
  } catch (error) {
    console.warn("Failed to cache weather data:", error)
  }
}

// Get weather preferences
export const getWeatherPreferences = (): WeatherPreferences => {
  try {
    const saved = localStorage.getItem("weatherPreferences")
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (error) {
    console.warn("Failed to load weather preferences:", error)
  }

  return {
    units: "metric",
    autoLocation: true
  }
}

// Save weather preferences
export const saveWeatherPreferences = (
  preferences: WeatherPreferences
): void => {
  try {
    localStorage.setItem("weatherPreferences", JSON.stringify(preferences))
  } catch (error) {
    console.warn("Failed to save weather preferences:", error)
  }
}

// Get weather icon component based on condition
export const getWeatherIcon = (condition: string, iconCode: string): string => {
  const iconMap: Record<string, string> = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧️",
    Drizzle: "🌦️",
    Thunderstorm: "⛈️",
    Snow: "❄️",
    Mist: "🌫️",
    Fog: "🌫️",
    Haze: "🌫️",
    Dust: "🌪️",
    Sand: "🌪️",
    Ash: "🌋",
    Squall: "💨",
    Tornado: "🌪️"
  }

  return iconMap[condition] || "🌤️"
}

// Demo weather data for development
export const getDemoWeatherData = (): WeatherData => {
  return {
    temperature: 22,
    condition: "Clear",
    description: "clear sky",
    humidity: 45,
    windSpeed: 3.2,
    feelsLike: 24,
    location: "San Francisco",
    country: "US",
    icon: "01d",
    units: "metric"
  }
}

// Convert weather data between metric and imperial units
export const convertWeatherUnits = (
  data: WeatherData,
  targetUnits: "metric" | "imperial"
): WeatherData => {
  // If target units are the same as current, no conversion needed
  if (data.units === targetUnits) {
    return data
  }

  // If converting to metric (from imperial)
  if (targetUnits === "metric") {
    return {
      ...data,
      temperature: Math.round(((data.temperature - 32) * 5) / 9),
      feelsLike: Math.round(((data.feelsLike - 32) * 5) / 9),
      windSpeed: Math.round(data.windSpeed * 0.44704 * 10) / 10, // mph to m/s
      units: "metric"
    }
  }

  // If converting to imperial (from metric)
  return {
    ...data,
    temperature: Math.round((data.temperature * 9) / 5 + 32),
    feelsLike: Math.round((data.feelsLike * 9) / 5 + 32),
    windSpeed: Math.round(data.windSpeed * 2.237 * 10) / 10, // m/s to mph
    units: "imperial"
  }
}
