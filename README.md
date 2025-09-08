# New Tab Chrome Extension

A beautiful Chrome extension that replaces your default new tab page with a modern, customizable interface built with Plasmo and Tailwind CSS.

## Features

- 🕒 **Real-time Clock** - Live time display with elegant formatting
- 🌅 **Dynamic Greetings** - Time-based greetings (morning, afternoon, evening)
- 🔗 **Quick Links** - Easy access to popular websites
- 🎨 **Daily Themes** - Rotating gradient backgrounds that change daily
- 📱 **Responsive Design** - Beautiful on all screen sizes
- ⚡ **Fast & Lightweight** - Built with modern web technologies

## Tech Stack

- **Framework**: [Plasmo](https://docs.plasmo.com/) - The Browser Extension Framework
- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Plasmo CLI (built on Parcel)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Yarn or npm

### Development

1. **Install dependencies:**

   ```bash
   yarn install
   # or
   npm install
   ```

2. **Start development server:**

   ```bash
   yarn dev
   # or
   npm run dev
   ```

3. **Load in Chrome:**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `build/chrome-mv3-dev` folder

### Production Build

```bash
yarn build
# or
npm run build
```

This creates a production bundle ready for the Chrome Web Store.

## Project Structure

```
sns-new-tab/
├── newtab.tsx          # Main new tab page component
├── components/         # Modular React components
├── style.css           # Tailwind CSS imports
├── tailwind.config.js  # Tailwind configuration
├── postcss.config.js   # PostCSS configuration
├── package.json        # Dependencies and scripts
└── assets/             # Static assets
```

## Customization

### Adding Quick Links

Edit the `quickLinks` array in `newtab.tsx`:

```typescript
const quickLinks = [
  { name: "Your Site", url: "https://yoursite.com", icon: "🌐" }
  // Add more links...
]
```

### Changing Background Themes

Modify the `backgrounds` array in `newtab.tsx`:

```typescript
const backgrounds = [
  "bg-gradient-to-br from-your-color to-another-color"
  // Add more gradients...
]
```

## Publishing

1. **Build for production:**

   ```bash
   yarn build
   ```

2. **Create a ZIP file** of the `build/chrome-mv3-prod` folder

3. **Upload to Chrome Web Store:**
   - Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
   - Upload your ZIP file
   - Fill in store listing details
   - Submit for review

## Development Guidelines

- Use React functional components with hooks
- Leverage Tailwind utility classes for styling
- Follow TypeScript best practices
- Test thoroughly in Chrome development mode
- Follow Chrome Extension Manifest V3 guidelines

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the extension
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:

- Check the [Plasmo Documentation](https://docs.plasmo.com/)
- Open an issue in this repository
- Visit [Chrome Extension Development Guide](https://developer.chrome.com/docs/extensions/)

---

Built with ❤️ using [Plasmo](https://docs.plasmo.com/)
