import { useEffect, useState } from "react";



import { ImageService, type DynamicImage } from "./imageService";


interface UseDailyImageOptions {
  useDynamicImages?: boolean
  category?: string
  localImageUrl: string
}

export function useDailyImage({
  useDynamicImages = true,
  category = "nature,landscape,mountains",
  localImageUrl
}: UseDailyImageOptions) {
  const [currentImage, setCurrentImage] = useState<DynamicImage>({
    url: localImageUrl,
    photographer: "",
    photographerUrl: "",
    sourceUrl: "",
    source: "local",
    cached: false
  })
  const [isLoading, setIsLoading] = useState(false)

  // Get day of year for consistent daily images
  const getDayOfYear = () => {
    const now = new Date()
    const start = new Date(now.getFullYear(), 0, 0)
    const diff = now.getTime() - start.getTime()
    return Math.floor(diff / (1000 * 60 * 60 * 24))
  }

  // Cache key for daily images
  const getCacheKey = () => `daily-bg-${getDayOfYear()}`

  const fetchDailyImage = async () => {
    if (!useDynamicImages) {
      // Set local image when dynamic images are disabled
      setCurrentImage({
        url: localImageUrl,
        photographer: "",
        photographerUrl: "",
        sourceUrl: "",
        source: "local",
        cached: false
      })
      return
    }

    const cacheKey = getCacheKey()
    const cached = localStorage.getItem(cacheKey)

    if (cached) {
      try {
        const cachedImage = JSON.parse(cached)
        setCurrentImage(cachedImage)
        return
      } catch (error) {
        // Invalid cache, continue to fetch new image
        localStorage.removeItem(cacheKey)
      }
    }

    // Only show loading if we don't have any image yet (first load)
    // Keep current image during subsequent loads for smooth transitions
    setIsLoading(
      currentImage.url === localImageUrl && currentImage.source === "local"
    )

    try {
      const imageService = new ImageService()
      const image = await imageService.getDailyImage(category, localImageUrl)

      // Cache for the day
      localStorage.setItem(cacheKey, JSON.stringify(image))
      setCurrentImage(image)
    } catch (error) {
      console.warn("Failed to fetch dynamic image, using fallback:", error)
      // Only fallback to local if we don't have a current image
      if (
        currentImage.url === localImageUrl &&
        currentImage.source === "local"
      ) {
        setCurrentImage({
          url: localImageUrl,
          photographer: "",
          photographerUrl: "",
          sourceUrl: "",
          source: "local",
          cached: false
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Refresh function for manual refresh
  const refreshImage = () => {
    // Clear cache and fetch new image (but keep current image during loading)
    const cacheKey = getCacheKey()
    localStorage.removeItem(cacheKey)
    setIsLoading(true) // Show loading for manual refresh
    fetchDailyImage()
  }

  useEffect(() => {
    fetchDailyImage()
  }, [category, useDynamicImages])

  return {
    currentImage,
    isLoading,
    refreshImage,
    getDayOfYear
  }
}