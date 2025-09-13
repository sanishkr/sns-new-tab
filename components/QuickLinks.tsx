import React, { useEffect, useRef, useState } from "react"

interface QuickLink {
  id: string
  name: string
  url: string
  favicon?: string
}

interface QuickLinksProps {
  className?: string
}

const defaultQuickLinks: QuickLink[] = [
  {
    id: "1",
    name: "GitHub",
    url: "https://github.com",
    favicon: "https://github.com/favicon.ico"
  },
  {
    id: "2",
    name: "Gmail",
    url: "https://gmail.com",
    favicon: "https://gmail.com/favicon.ico"
  },
  {
    id: "3",
    name: "YouTube",
    url: "https://youtube.com",
    favicon: "https://youtube.com/favicon.ico"
  },
  {
    id: "4",
    name: "Twitter",
    url: "https://twitter.com",
    favicon: "https://twitter.com/favicon.ico"
  }
]

export function QuickLinks({ className = "" }: QuickLinksProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [quickLinks, setQuickLinks] = useState<QuickLink[]>(defaultQuickLinks)
  const [draggedItem, setDraggedItem] = useState<QuickLink | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [newLink, setNewLink] = useState({ name: "", url: "" })
  const panelRef = useRef<HTMLDivElement>(null)

  // Load quick links and panel state from localStorage
  useEffect(() => {
    const savedLinks = localStorage.getItem("quickLinks")
    const savedIsOpen = localStorage.getItem("quickLinksOpen")

    if (savedLinks) {
      setQuickLinks(JSON.parse(savedLinks))
    }
    if (savedIsOpen !== null) {
      setIsOpen(JSON.parse(savedIsOpen))
    }
  }, [])

  // Save state to localStorage
  const saveToStorage = (links: QuickLink[], isOpenState: boolean) => {
    localStorage.setItem("quickLinks", JSON.stringify(links))
    localStorage.setItem("quickLinksOpen", JSON.stringify(isOpenState))
  }

  const togglePanel = () => {
    const newIsOpen = !isOpen
    setIsOpen(newIsOpen)
    saveToStorage(quickLinks, newIsOpen)
  }

  const getFaviconUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`
    } catch {
      return "🌐"
    }
  }

  const handleDragStart = (e: React.DragEvent, link: QuickLink) => {
    setDraggedItem(link)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    if (!draggedItem) return

    const dragIndex = quickLinks.findIndex((link) => link.id === draggedItem.id)
    if (dragIndex === dropIndex) return

    const newLinks = [...quickLinks]
    newLinks.splice(dragIndex, 1)
    newLinks.splice(dropIndex, 0, draggedItem)

    setQuickLinks(newLinks)
    saveToStorage(newLinks, isOpen)
    setDraggedItem(null)
  }

  const addNewLink = () => {
    if (!newLink.name.trim() || !newLink.url.trim()) return

    let url = newLink.url
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url
    }

    const link: QuickLink = {
      id: Date.now().toString(),
      name: newLink.name.trim(),
      url: url,
      favicon: getFaviconUrl(url)
    }

    const newLinks = [...quickLinks, link]
    setQuickLinks(newLinks)
    saveToStorage(newLinks, isOpen)
    setNewLink({ name: "", url: "" })
    setIsEditing(false)
  }

  const removeLink = (id: string) => {
    const newLinks = quickLinks.filter((link) => link.id !== id)
    setQuickLinks(newLinks)
    saveToStorage(newLinks, isOpen)
  }

  const openLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <div className={`fixed top-4 left-4 z-30 ${className}`}>
      {/* Toggle Button */}
      <button
        onClick={togglePanel}
        className="bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors duration-200 rounded-lg p-3 text-white/80 hover:text-white"
        title="Quick Links">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <rect x="3" y="3" width="7" height="7" rx="1"/>
          <rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/>
          <rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
      </button>

      {/* Quick Links Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          className="mt-2 backdrop-blur-lg rounded-lg shadow-lg border border-white/10 p-4 min-w-[280px] max-w-[320px]"
          style={{ backgroundColor: "#0000007d" }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-medium">Quick Links</h3>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-white/60 hover:text-white transition-colors"
              title="Add new link">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
            </button>
          </div>

          {/* Quick Links List */}
          <div className="space-y-2 mb-3 max-h-[473px] overflow-y-auto quick-links-scroll">
            {quickLinks.map((link, index) => (
              <div
                key={link.id}
                draggable
                onDragStart={(e) => handleDragStart(e, link)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 cursor-pointer transition-colors group"
                onClick={() => openLink(link.url)}>
                <img
                  src={getFaviconUrl(link.url)}
                  alt=""
                  className="w-5 h-5 flex-shrink-0"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = "none"
                    target.nextElementSibling!.classList.remove("hidden")
                  }}
                />
                <span className="hidden text-xs">🌐</span>
                <div className="flex-1 min-w-0">
                  <div className="text-white/90 text-sm font-medium truncate">
                    {link.name}
                  </div>
                  <div className="text-white/60 text-xs truncate">
                    {link.url.replace(/^https?:\/\//, "")}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    removeLink(link.id)
                  }}
                  className="opacity-0 group-hover:opacity-100 text-white/40 hover:text-red-400 transition-all duration-200"
                  title="Remove link">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Add New Link Form */}
          {isEditing && (
            <div className="border-t border-white/10 pt-3 space-y-2">
              <input
                type="text"
                placeholder="Site name"
                value={newLink.name}
                onChange={(e) =>
                  setNewLink({ ...newLink, name: e.target.value })
                }
                className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white placeholder-white/50 text-sm focus:outline-none focus:border-white/40"
              />
              <input
                type="url"
                placeholder="URL (e.g., github.com)"
                value={newLink.url}
                onChange={(e) =>
                  setNewLink({ ...newLink, url: e.target.value })
                }
                className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white placeholder-white/50 text-sm focus:outline-none focus:border-white/40"
              />
              <div className="flex gap-2">
                <button
                  onClick={addNewLink}
                  className="flex-1 bg-white/20 hover:bg-white/30 text-white text-sm py-2 px-3 rounded transition-colors">
                  Add
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false)
                    setNewLink({ name: "", url: "" })
                  }}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white text-sm py-2 px-3 rounded transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
