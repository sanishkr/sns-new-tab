// Location search service using OpenWeatherMap Geocoding API
const API_KEY = process.env.PLASMO_PUBLIC_OPENWEATHER_API_KEY || ""
const GEO_BASE_URL = "https://api.openweathermap.org/geo/1.0"

export interface LocationResult {
  name: string
  lat: number
  lon: number
  country: string
  state?: string
  localNames?: Record<string, string>
}

/**
 * Search for locations by city name
 * @param query - City name to search for
 * @param limit - Maximum number of results (default: 5)
 * @returns Array of matching locations
 */
export const searchLocations = async (
  query: string,
  limit: number = 5
): Promise<LocationResult[]> => {
  if (!query || query.trim().length < 2) {
    return []
  }

  try {
    const response = await fetch(
      `${GEO_BASE_URL}/direct?q=${encodeURIComponent(query)}&limit=${limit}&appid=${API_KEY}`
    )

    if (!response.ok) {
      throw new Error(`Geocoding API error: ${response.status}`)
    }

    const data = await response.json()

    return data.map((location: any) => ({
      name: location.name,
      lat: location.lat,
      lon: location.lon,
      country: location.country,
      state: location.state,
      localNames: location.local_names
    }))
  } catch (error) {
    console.error("Location search error:", error)
    throw new Error(`Failed to search locations: ${error.message}`)
  }
}

/**
 * Get location details by coordinates (reverse geocoding)
 * @param lat - Latitude
 * @param lon - Longitude
 * @returns Location details
 */
export const getLocationByCoordinates = async (
  lat: number,
  lon: number
): Promise<LocationResult | null> => {
  try {
    const response = await fetch(
      `${GEO_BASE_URL}/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
    )

    if (!response.ok) {
      throw new Error(`Reverse geocoding API error: ${response.status}`)
    }

    const data = await response.json()

    if (data.length === 0) {
      return null
    }

    return {
      name: data[0].name,
      lat: data[0].lat,
      lon: data[0].lon,
      country: data[0].country,
      state: data[0].state,
      localNames: data[0].local_names
    }
  } catch (error) {
    console.error("Reverse geocoding error:", error)
    return null
  }
}

/**
 * Format location display name
 * @param location - Location result
 * @returns Formatted display name
 */
export const formatLocationName = (location: LocationResult): string => {
  const parts = [location.name]

  if (location.state) {
    parts.push(location.state)
  }

  parts.push(location.country)

  return parts.join(", ")
}

/**
 * Debounce function for search input
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}
