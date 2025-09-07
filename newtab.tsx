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
    <BackgroundManager>
      {/* Content */}
      <div className="relative z-10 text-center text-white">
        <Clock />
        <DateDisplay />
        <Greeting name="sns" />
      </div>

      {/* Quote Section - Bottom of screen */}
      <QuoteSection />
    </BackgroundManager>
  )
}

export default NewTab
