// ╔═══════════════════════════════════════════════════════════════╗
// ║  GIDAN KALLO — IMAGE CONFIGURATION                          ║
// ║                                                               ║
// ║  Change ANY image on the site by editing this file.          ║
// ║  Then push to GitHub → Vercel auto-redeploys in 30 seconds. ║
// ║                                                               ║
// ║  HOW TO USE YOUR OWN IMAGES:                                 ║
// ║  1. Upload image to GitHub (public/ folder)                  ║
// ║     → use path like "/my-image.jpg"                          ║
// ║  2. OR use any image URL from the internet                   ║
// ║     → paste the full URL like "https://..."                  ║
// ║  3. OR upload to https://postimages.org (free, no signup)    ║
// ║     → copy the "Direct link" and paste here                  ║
// ╚═══════════════════════════════════════════════════════════════╝

const IMAGES = {

  // ── SPLASH / LOADING SCREEN ──
  // This GIF/image shows while the app is loading
  // Upload your own GIF to public/ folder or use a URL
  splashGif: "/splash.gif",
  // Set to null to use the default animated logo instead:
  // splashGif: null,

  // ── MOVIE POSTERS (Cinema Page cards + detail) ──
  movies: {
    taqdeer:   "/TSANDAURI.jpeg",
    hakeem:    "/KAMANNI.jpeg",
    rigarAro:  "/FAISA.jpeg",
    varanasi:  "/varanasi.jpg",
  },

  // ── HERO BANNERS (Homepage slider — landscape images preferred) ──
  // If you have wide/landscape versions of posters, put them here.
  // If not, leave same as movies — the layout handles both well.
  heroBanners: {
     taqdeer:   "/TSANDAURI.jpeg",
    hakeem:    "/KAMANNI.jpeg",
    rigarAro:  "/FAISA.jpeg",
    varanasi:  "/varanasi.jpg",
  },

  // ── HOMEPAGE BANNERS ──
  home: {
    turfA:       "https://images.unsplash.com/photo-1624880357913-a8539238245b?w=800&q=80",
    turfB:       "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&q=80",
    gamesLounge: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&q=80",
  },

  // ── TURF PAGE ──
  turf: {
    greenTurf:  "https://images.unsplash.com/photo-1624880357913-a8539238245b?w=800&q=80",
    arenaPitch: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&q=80",
  },

  // ── GAMES PAGE ──
  games: {
    snooker: "https://images.unsplash.com/photo-1615213612138-4d1195b1c0e1?w=800&q=80",
    ps5vr:   "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&q=80",
  },

  // ── FOOD PAGE ──
  food: {
    todaySpecial:  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    orderHeader:   "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    paymentBg:     "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
  },

  // ── FOOD MENU ITEMS ──
  foodMenu: {
    suyaPlatter:    "https://images.unsplash.com/photo-1624300629298-e9de39c13be5?w=400&q=80",
    poundedYam:     "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&q=80",
    jollofRice:     "https://images.unsplash.com/photo-1587116861219-230ac19df100?w=400&q=80",
    pepperSoup:     "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80",
    asun:           "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80",
    beefBurger:     "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
    shawarma:       "https://images.unsplash.com/photo-1561651823-34feb02f2c28?w=400&q=80",
    coconutRice:    "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80",
    spaghettiJollof:"https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&q=80",
    popcornCombo:   "https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=400&q=80",
    smallPopcorn:   "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=400&q=80",
    largePopcorn:   "https://images.unsplash.com/photo-1621188988909-fbef0a88dc04?w=400&q=80",
    nachos:         "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&q=80",
    slushy:         "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80",
    hotDog:         "https://images.unsplash.com/photo-1612392062126-d7f0b10c2810?w=400&q=80",
  },

  // ── CANTEEN DEALS (Homepage) ──
  canteen: {
    popcornCombo: "https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=400&q=80",
    beefBurger:   "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
    slushy:       "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80",
  },

  // ── SNACK ITEMS (Cinema checkout) ──
  snacks: {
    smallPopcorn:  "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=400&q=80",
    largePopcorn:  "https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=400&q=80",
    nachos:        "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&q=80",
    beefBurger:    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
    slushy:        "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80",
    popcornCombo:  "https://images.unsplash.com/photo-1621188988909-fbef0a88dc04?w=400&q=80",
  },
};

export default IMAGES;
