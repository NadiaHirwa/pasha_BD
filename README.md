# Happy Birthday, Pasha — by Frank

A personal, emotional birthday website for Agahozo Patience (Pasha), built with love using React + Vite + Tailwind CSS.

---

## How to Add Pasha's Photos

1. Put her photo files in the `/public/photos/` folder:
   - `pasha.jpg` — hero circle (main photo, top of page)
   - `pasha1.jpg` through `pasha6.jpg` — gallery photos

2. Each gallery photo has a caption in `src/components/Gallery.jsx` (the `PHOTOS` array — edit captions there too).

---

## How to Run Locally

```bash
npm install
npm run dev
```
Then open http://localhost:5173

---

## How to Build for Deployment

```bash
npm run build
```
The `dist/` folder is the deployable output.

---

## Deploy Options

### Option 1 — Netlify (easiest, free)
1. Go to netlify.com → "Add new site" → "Deploy manually"
2. Drag and drop the `dist/` folder
3. Done! You get a live URL instantly.

### Option 2 — Vercel (free)
1. Push this project to GitHub
2. Go to vercel.com → import your repo
3. Framework preset: Vite
4. Deploy — live URL in seconds.

### Option 3 — GitHub Pages
```bash
npm install -D gh-pages
# Add to package.json scripts: "deploy": "gh-pages -d dist"
npm run build && npm run deploy
```

---

## Project Structure

```
src/
  components/
    Gate.jsx       — Opening splash/entrance page
    Hero.jsx       — Birthday hero with candle & photo
    SongPlayer.jsx — Birthday song using Web Audio API
    Letter.jsx     — Frank's letter (envelope + typewriter reveal)
    Timeline.jsx   — Pasha's journey timeline
    Gallery.jsx    — Photo gallery with lightbox
    Prayer.jsx     — Closing prayer & blessings
  App.jsx          — Main app, ties everything together
  index.css        — Global styles, fonts, animations
public/
  photos/          — Drop Pasha's images here
```

Built with care, by Frank. For Pasha, always.
