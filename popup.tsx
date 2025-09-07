import "./style.css"

import { useState } from "react"

function IndexPopup() {
  const [data, setData] = useState("")

  return (
    <div className="w-80 p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          New Tab Extension
        </h2>
        <p className="text-gray-600 text-sm">
          Your beautiful new tab page is ready!
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quick Note:
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Type something..."
            onChange={(e) => setData(e.target.value)}
            value={data}
          />
        </div>

        <div className="flex space-x-2">
          <a
            href="chrome://newtab"
            target="_blank"
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-4 rounded-md transition-colors text-sm font-medium">
            Open New Tab
          </a>
          <a
            href="https://docs.plasmo.com"
            target="_blank"
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white text-center py-2 px-4 rounded-md transition-colors text-sm font-medium">
            Docs
          </a>
        </div>
      </div>
    </div>
  )
}

export default IndexPopup
