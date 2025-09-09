import React, { useEffect, useRef, useState } from "react";





interface MenuItem {
  label: string
  onClick: () => void
  icon?: string
}

interface DropdownMenuProps {
  items: MenuItem[]
  className?: string
  size?: "small" | "normal"
  position?: "below" | "above"
  horizontalAlign?: "left" | "right"
}

export function DropdownMenu({
  items,
  className = "",
  size = "normal",
  position = "below",
  horizontalAlign = "left"
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleItemClick = (onClick: () => void) => {
    onClick()
    setIsOpen(false)
  }

  return (
    <div className={`${className}`}>
      {/* Dots button */}
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="p-1 rounded-full hover:bg-white/10 transition-colors duration-200">
        <svg
          width={size === "small" ? "16" : "20"}
          height={size === "small" ? "16" : "20"}
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-white/70 hover:text-white">
          {size === "small" ? (
            <>
              <circle cx="7" cy="12" r="2" />
              <circle cx="17" cy="12" r="2" />
            </>
          ) : (
            <>
              <circle cx="5" cy="12" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="19" cy="12" r="2" />
            </>
          )}
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className={`absolute ${
            position === "above" ? "bottom-full mb-2" : "top-full mt-2"
          } ${horizontalAlign === "left" ? "left-0" : "right-0"} bg-black/80 backdrop-blur-lg rounded-lg shadow-lg border border-white/10 min-w-[140px] z-50`}>
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => handleItemClick(item.onClick)}
              className="w-full text-left px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg flex items-center gap-2">
              {item.icon && <span className="text-white/60">{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}