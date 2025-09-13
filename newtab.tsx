import { useEffect, useState } from "react";



import {
  BackgroundManager,
  Clock,
  DateDisplay,
  Greeting,
  QuickLinks,
  QuoteSection
} from "~components"

import "./style.css"

function NewTab() {
  const [showDate, setShowDate] = useState(true)
  const [showQuotes, setShowQuotes] = useState(true)

  // Load date visibility preference from localStorage on mount
  useEffect(() => {
    const savedShowDate = localStorage.getItem("showDate")
    if (savedShowDate !== null) {
      setShowDate(JSON.parse(savedShowDate))
    }
    
    const savedShowQuotes = localStorage.getItem("showQuotes")
    if (savedShowQuotes !== null) {
      setShowQuotes(JSON.parse(savedShowQuotes))
    }
  }, [])

  const toggleDateVisibility = () => {
    const newShowDate = !showDate
    setShowDate(newShowDate)
    // Save preference to localStorage
    localStorage.setItem("showDate", JSON.stringify(newShowDate))
  }

  const toggleQuotesVisibility = () => {
    const newShowQuotes = !showQuotes
    setShowQuotes(newShowQuotes)
    // Save preference to localStorage
    localStorage.setItem("showQuotes", JSON.stringify(newShowQuotes))
  }
  // useEffect(() => {
  //   // Set viewport meta tag programmatically to prevent zoom
  //   const setViewportMeta = () => {
  //     // Remove existing viewport meta tag if it exists
  //     const existingMeta = document.querySelector('meta[name="viewport"]')
  //     if (existingMeta) {
  //       existingMeta.remove()
  //     }

  //     // Add new viewport meta tag with zoom disabled
  //     const meta = document.createElement("meta")
  //     meta.name = "viewport"
  //     meta.content =
  //       "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
  //     document.head.appendChild(meta)

  //     // Add additional meta tags for mobile web app behavior
  //     const appleMeta = document.createElement("meta")
  //     appleMeta.name = "apple-mobile-web-app-capable"
  //     appleMeta.content = "yes"
  //     document.head.appendChild(appleMeta)

  //     const statusBarMeta = document.createElement("meta")
  //     statusBarMeta.name = "apple-mobile-web-app-status-bar-style"
  //     statusBarMeta.content = "black-translucent"
  //     document.head.appendChild(statusBarMeta)
  //   }

  //   setViewportMeta()

  //   // Prevent zoom and gesture behaviors
  //   const preventZoom = (e: Event) => {
  //     // Prevent pinch zoom
  //     if ((e as any).touches && (e as any).touches.length > 1) {
  //       e.preventDefault()
  //       e.stopPropagation()
  //     }
  //   }

  //   const preventWheel = (e: WheelEvent) => {
  //     // Prevent zoom with Ctrl+scroll
  //     if (e.ctrlKey || e.metaKey) {
  //       e.preventDefault()
  //       e.stopPropagation()
  //     }
  //   }

  //   const preventKeyZoom = (e: KeyboardEvent) => {
  //     // Prevent zoom with keyboard shortcuts
  //     if (
  //       (e.ctrlKey || e.metaKey) &&
  //       (e.key === "+" || e.key === "-" || e.key === "0" || e.key === "=")
  //     ) {
  //       e.preventDefault()
  //       e.stopPropagation()
  //     }
  //   }

  //   const preventGestures = (e: Event) => {
  //     // Prevent all gesture events
  //     e.preventDefault()
  //     e.stopPropagation()
  //   }

  //   const preventContextMenu = (e: Event) => {
  //     // Prevent right-click context menu
  //     e.preventDefault()
  //   }

  //   const preventDrag = (e: Event) => {
  //     // Prevent drag and select events
  //     e.preventDefault()
  //   }

  //   // Add event listeners with capture and passive false
  //   const options = { capture: true, passive: false }
  //   document.addEventListener("touchstart", preventZoom, options)
  //   document.addEventListener("touchmove", preventZoom, options)
  //   document.addEventListener("gesturestart", preventGestures, options)
  //   document.addEventListener("gesturechange", preventGestures, options)
  //   document.addEventListener("gestureend", preventGestures, options)
  //   document.addEventListener("wheel", preventWheel, options)
  //   document.addEventListener("keydown", preventKeyZoom, options)
  //   document.addEventListener("contextmenu", preventContextMenu, options)
  //   document.addEventListener("dragstart", preventDrag, options)
  //   document.addEventListener("selectstart", preventDrag, options)

  //   // Also add to window for additional coverage
  //   window.addEventListener("touchstart", preventZoom, options)
  //   window.addEventListener("touchmove", preventZoom, options)
  //   window.addEventListener("gesturestart", preventGestures, options)
  //   window.addEventListener("gesturechange", preventGestures, options)
  //   window.addEventListener("gestureend", preventGestures, options)

  //   // Cleanup
  //   return () => {
  //     document.removeEventListener("touchstart", preventZoom, true)
  //     document.removeEventListener("touchmove", preventZoom, true)
  //     document.removeEventListener("gesturestart", preventGestures, true)
  //     document.removeEventListener("gesturechange", preventGestures, true)
  //     document.removeEventListener("gestureend", preventGestures, true)
  //     document.removeEventListener("wheel", preventWheel, true)
  //     document.removeEventListener("keydown", preventKeyZoom, true)
  //     document.removeEventListener("contextmenu", preventContextMenu, true)
  //     document.removeEventListener("dragstart", preventDrag, true)
  //     document.removeEventListener("selectstart", preventDrag, true)

  //     window.removeEventListener("touchstart", preventZoom, true)
  //     window.removeEventListener("touchmove", preventZoom, true)
  //     window.removeEventListener("gesturestart", preventGestures, true)
  //     window.removeEventListener("gesturechange", preventGestures, true)
  //     window.removeEventListener("gestureend", preventGestures, true)
  //   }
  // }, [])

  return (
    <BackgroundManager
      useDynamicImages={true}
      category="nature,landscape,mountains,ocean"
      overlayOpacity={0.8}>
      {/* Quick Links - Top left */}
      <QuickLinks />

      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-white">
        {/* Main content */}
        <div className="text-center flex flex-col items-center">
          <Clock
            onToggleDateVisibility={toggleDateVisibility}
            showDate={showDate}
            onToggleQuotesVisibility={toggleQuotesVisibility}
            showQuotes={showQuotes}
          />
          {showDate && (
            <DateDisplay className="text-3xl font-light tracking-wider opacity-80 mb-6" />
          )}
          <Greeting className="text-4xl font-light tracking-wide opacity-90" />
        </div>

        {/* Quote Section - Bottom of screen */}
        {showQuotes && (
          <QuoteSection className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white" />
        )}
      </div>
    </BackgroundManager>
  )
}

export default NewTab