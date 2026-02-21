# Gidan Kallo — Entertainment Hub

Kano's Premier Entertainment Venue — Cinema, Turf, Games Lounge & Food ordering platform.

## Tech Stack
- **React 18** + **Vite 6**
- Fully responsive (Mobile / Tablet / Desktop)
- Zero external UI libraries — pure inline styles

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Deploy to Vercel

### Option 1: Via GitHub (Recommended)
1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your GitHub repo
4. Vercel auto-detects Vite — just click **Deploy**
5. Done! Your site is live.

### Option 2: Via Vercel CLI
```bash
npm i -g vercel
vercel
```

## Connect Custom Domain
1. In Vercel dashboard → your project → **Settings** → **Domains**
2. Add your domain (e.g. `gidankallo.com`)
3. Update your domain's DNS:
   - **A Record**: `76.76.21.21`
   - **CNAME**: `cname.vercel-dns.com` (for www)
4. Vercel auto-provisions SSL — your site is live on your domain!

## Features
- 🎬 Cinema booking with seat selection
- ⚽ Turf pitch reservations
- 🎮 Games lounge sessions (PS5, Snooker)
- 🍔 Food & drinks ordering with cart
- ⭐ Customer reviews system
- 📱 Responsive across all devices
