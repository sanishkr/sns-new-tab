import "./style.css"

import {
  BackgroundManager,
  Clock,
  DateDisplay,
  Greeting,
  QuoteSection
} from "~components"

function NewTab() {
  return (
    <BackgroundManager 
      useDynamicImages={true}
      category="nature,landscape,mountains,ocean"
      overlayOpacity={0.8}
    >
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-white">
        {/* Main content */}
        <div className="text-center">
          <Clock className="text-[10rem] font-semibold mb-6 leading-none" />
          <DateDisplay className="text-3xl font-light tracking-wider opacity-80" />
          <Greeting className="text-4xl font-light tracking-wide opacity-90 mt-6" />
        </div>

        {/* Quote Section - Bottom of screen */}
        <QuoteSection className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white" />
      </div>
    </BackgroundManager>
  )
}

export default NewTab
