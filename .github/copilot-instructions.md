<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Chrome Extension New Tab Project

This is a Chrome extension built with Plasmo framework and styled with Tailwind CSS. The extension replaces the default new tab page with a custom, beautiful interface.

## Tech Stack

- **Framework**: Plasmo (Browser Extension Framework)
- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Plasmo CLI (built on Parcel)

## Project Structure

- `newtab.tsx` - Main new tab page component
- `popup.tsx` - Extension popup component
- `style.css` - Tailwind CSS imports
- `tailwind.config.js` - Tailwind configuration
- `postcss.config.js` - PostCSS configuration

## Development Guidelines

- Use React functional components with hooks
- Leverage Tailwind utility classes for styling
- Follow TypeScript best practices
- Keep components modular and reusable
- Use Chrome Extension APIs appropriately

## Key Features

- Real-time clock display
- Dynamic greeting based on time of day
- Quick links to popular websites
- Daily rotating gradient backgrounds
- Responsive design with Tailwind CSS

## Chrome Extension Specific

- The `newtab.tsx` file will replace the default Chrome new tab page
- The `popup.tsx` file creates the extension popup when clicking the extension icon
- Make sure to follow Chrome extension manifest v3 guidelines
- Test thoroughly in Chrome browser development mode
