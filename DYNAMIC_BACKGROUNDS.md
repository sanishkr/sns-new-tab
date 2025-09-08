# 🔧 Setup Dynamic Backgrounds

To enable beautiful daily HD backgrounds like Momentum, you'll need free API keys from image providers.

## 🚀 Quick Setup (5 minutes)

### 1. Get Free API Keys

#### Unsplash (Primary - Higher Quality)

- Visit [Unsplash Developers](https://unsplash.com/developers)
- Click "New Application"
- Fill out the form (personal use is fine)
- Copy your **Access Key**
- **Free Limit**: 50 requests/hour

#### Pexels (Backup - More Requests)

- Visit [Pexels API](https://www.pexels.com/api/)
- Click "Get Started"
- Create account and generate API key
- Copy your **API Key**
- **Free Limit**: 200 requests/hour

### 2. Configure Your Extension

1. **Copy the example environment file:**

   ```bash
   cp .env.example .env
   ```

2. **Add your API keys to `.env`:**

   ```env
   PLASMO_PUBLIC_UNSPLASH_ACCESS_KEY=your_actual_unsplash_key_here
   PLASMO_PUBLIC_PEXELS_API_KEY=your_actual_pexels_key_here
   ```

3. **That's it!** Restart your dev server and enjoy fresh backgrounds daily 🎉

## 🎨 How It Works

- **Smart Fallback**: Tries Unsplash first, falls back to Pexels, then your local image
- **Daily Rotation**: New gorgeous image every day, cached for performance
- **Categories**: Nature, landscapes, mountains, oceans, minimalist
- **Credits**: Automatically shows photographer attribution
- **Offline Support**: Works without internet using local fallback

## 🛠️ Customization

Change image categories in `newtab.tsx`:

```tsx
<BackgroundManager
  useDynamicImages={true}
  category="nature,landscape,mountains,ocean,minimalist"
  overlayOpacity={0.6}
>
```

**Popular Categories:**

- `nature,landscape` - Beautiful outdoor scenes
- `mountains,ocean` - Dramatic natural vistas
- `minimalist,abstract` - Clean, simple designs
- `architecture,city` - Urban and building shots
- `sunset,golden hour` - Warm, golden lighting

## 💡 Tips

- **Free Forever**: Both APIs have generous free tiers
- **Performance**: Images are cached daily, minimal bandwidth usage
- **Quality**: Unsplash provides the highest quality (like Momentum uses)
- **Privacy**: No personal data sent to APIs, just anonymous image requests

Enjoy your beautiful new tab experience! ✨
