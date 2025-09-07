/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./popup.tsx",
    "./tabs/**/*.{js,ts,jsx,tsx}",
    "./newtab.tsx",
    "./*.tsx"
  ],
  theme: {
    extend: {}
  },
  plugins: []
}
