const APP_NAME = "Sns new tab"

interface DynamicImage {
  url: string
  photographer: string
  photographerUrl?: string
  source: "unsplash" | "pexels" | "local"
  cached: boolean
  sourceUrl?: string
}

interface UnsplashImage {
  id: string
  urls: {
    raw: string
    full: string
    regular: string
    small: string
    thumb: string
  }
  user: {
    name: string
    username: string
  }
  description: string
  alt_description: string
}

interface PexelsImage {
  id: number
  photographer: string
  photographer_url: string
  src: {
    original: string
    large2x: string
    large: string
    medium: string
    small: string
    portrait: string
    landscape: string
    tiny: string
  }
}

export class ImageService {
  private readonly UNSPLASH_ACCESS_KEY =
    process.env.PLASMO_PUBLIC_UNSPLASH_ACCESS_KEY || ""
  private readonly PEXELS_API_KEY =
    process.env.PLASMO_PUBLIC_PEXELS_API_KEY || ""

  async getUnsplashImage(category: string): Promise<DynamicImage | null> {
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?client_id=${this.UNSPLASH_ACCESS_KEY}&orientation=landscape&w=1920&h=1080&query=${category}`
      )

      if (!response.ok) throw new Error("Unsplash API failed")

      const image: UnsplashImage = await response.json()

      return {
        url: image.urls.regular,
        photographer: image.user.name,
        photographerUrl: `https://unsplash.com/@${image.user.username}?utm_source=${encodeURIComponent(APP_NAME)}&utm_medium=referral`,
        sourceUrl: `https://unsplash.com?utm_source=${encodeURIComponent(APP_NAME)}&utm_medium=referral`,
        source: "unsplash",
        cached: true
      }
    } catch (error) {
      console.warn("Unsplash API failed:", error)
      return null
    }
  }

  async getPexelsImage(category: string): Promise<DynamicImage | null> {
    try {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${category}&orientation=landscape&size=large&per_page=1`,
        {
          headers: {
            Authorization: this.PEXELS_API_KEY
          }
        }
      )

      if (!response.ok) throw new Error("Pexels API failed")

      const data = await response.json()
      const image: PexelsImage = data.photos[0]

      if (!image) throw new Error("No images found")

      return {
        url: image.src.large,
        photographer: image.photographer,
        photographerUrl: `${image.photographer_url}?utm_source=${encodeURIComponent(APP_NAME)}&utm_medium=referral`,
        sourceUrl: `https://www.pexels.com/?utm_source=${encodeURIComponent(APP_NAME)}&utm_medium=referral`,
        source: "pexels",
        cached: true
      }
    } catch (error) {
      console.warn("Pexels API failed:", error)
      return null
    }
  }

  async getDailyImage(
    category: string,
    localImageUrl: string
  ): Promise<DynamicImage> {
    // Try Unsplash first (higher quality, like Momentum)
    let image = await this.getUnsplashImage(category)

    // Fallback to Pexels if Unsplash fails
    if (!image) {
      image = await this.getPexelsImage(category)
    }

    // Final fallback to local image
    if (!image) {
      return {
        url: localImageUrl,
        photographer: "",
        photographerUrl: "",
        sourceUrl: "",
        source: "local",
        cached: false
      }
    }

    return image
  }
}

export type { DynamicImage }
