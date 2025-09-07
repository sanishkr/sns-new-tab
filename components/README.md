# Components

This directory contains modular React components for the Chrome extension new tab page.

## Component Overview

### `Clock.tsx`

- **Purpose**: Displays the current time in large format (10rem)
- **Props**: `className` (optional) for styling customization
- **Features**: Real-time updates every second, 24-hour format

### `DateDisplay.tsx`

- **Purpose**: Shows the current date in a readable format
- **Props**: `className` (optional) for styling customization
- **Features**: Real-time updates, displays weekday, month, day, and year

### `Greeting.tsx`

- **Purpose**: Provides time-based personalized greeting
- **Props**: `name` (optional, defaults to "sns"), `className` (optional)
- **Features**: Dynamic greeting based on time of day (morning/afternoon/evening)

### `QuoteSection.tsx`

- **Purpose**: Displays daily inspirational quotes
- **Props**: `className` (optional) for styling customization
- **Features**: 30 hardcoded quotes, daily rotation based on date, quote attribution

### `BackgroundManager.tsx`

- **Purpose**: Manages background image and overlay
- **Props**: `children` (React content), `overlayOpacity` (optional, defaults to 0.6)
- **Features**: Background image handling, customizable dark overlay

## Usage

```tsx
import {
  BackgroundManager,
  Clock,
  DateDisplay,
  Greeting,
  QuoteSection
} from "./components"

function App() {
  return (
    <BackgroundManager>
      <Clock className="text-8xl" />
      <DateDisplay />
      <Greeting name="User" />
      <QuoteSection />
    </BackgroundManager>
  )
}
```

## Benefits of This Architecture

1. **Modularity**: Each component has a single responsibility
2. **Reusability**: Components can be used in different layouts
3. **Maintainability**: Easier to update individual features
4. **Testability**: Components can be tested in isolation
5. **Scalability**: Easy to add new features without affecting existing code
