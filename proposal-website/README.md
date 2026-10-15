# 💖 One Question, Infinite Feelings… 💌
### An Interactive, Teasing & Deeply Romantic Proposal Website

Welcome to your private romantic universe. This interactive web experience was built to make your girlfriend smile, blush, laugh, feel cherished, and experience a dreamy cinematic proposal.

---

## 🌟 The Emotional Journey

1. **The First Tease 💌**: A 3D interactive envelope sealed with a pulsing pink wax heart asking *“Are you ready, madam? 😏”*
2. **The Teasing Zone 😈**: Asks *“Do you love me?” 🥹* with a playful dodging "No" button and an official certified screenshot receipt when she clicks YES!
3. **101 Reasons You're My Favourite Person 🌷**: 101 authentic, non-generic reasons with search bar, category filters (Sweet, Playful, Habits, Soulful, Future), random picker, and favorite bookmarks.
4. **The Girlfriend Examination 🎀**: A 5-question playful love quiz with humorous reactions and a stamped "Certified Soulmate" certificate.
5. **Little Moments, Big Feelings 🌙**: An interactive memory timeline featuring polaroid frames and a modal lightbox to read your stories.
6. **The Secret Love Letter 💌**: A sealed parchment that unfolds with a real-time typewriter effect.
7. **The Dramatic Night Sky Proposal 💍**: A cinematic midnight sky with glowing full moon, floating roses, 3D diamond ring, celebration fireworks, and a playful "Convince me more" drawer.
8. **5 Hidden Easter Eggs 🐰💗**: Secret compliments on canvas click, moon wishing star, four-leaf clover secret weakness, Love-O-Meter overload, and Love Passport explorer badge.

---

## 🚀 Running Locally

### Option 1: Direct in Browser
Simply double-click `proposal-website/index.html` or drag it into any modern web browser (Chrome, Safari, Firefox, Edge).

### Option 2: Local HTTP Server
Using Python:
```bash
cd proposal-website
python3 -m http.server 8080
```
Open `http://localhost:8080` in your browser.

Using Node.js:
```bash
npx serve proposal-website
```

---

## ✏️ How to Personalize Your Website

### 1. Changing Names & Nicknames
- Open `proposal-website/index.html` (or `src/App.tsx` and components).
- Search for `madam` or `favourite human` and replace with her real name or special pet name.

### 2. Personalizing the Relationship Memories
- Open `proposal-website/index.html` and look for `<div class="memory-card">` (or `src/data/memories.ts`).
- Replace the dates, subtitles, and story descriptions with your actual relationship milestones.
- To use your own photographs, save your pictures into `proposal-website/assets/images/` (e.g. `memory-1.jpg`) and update the `src` attribute.

### 3. Editing the Secret Love Letter
- In `proposal-website/js/script.js` (or `src/components/SecretLoveLetter.tsx`), edit the `FULL_LETTER_TEXT` constant to write your exact personal feelings. The typewriter animation will automatically adjust.

### 4. Adding Your Own Song (Optional)
- Place your audio file into `proposal-website/assets/audio/romantic-bgm.mp3`.
- By default, a gentle offline acoustic music-box synthesizer plays automatically with zero files needed!

---

## 🌐 Free Deployment (GitHub Pages)

You can host this website completely free so she can open it from her own phone or laptop anywhere in the world:

1. Create a free account at [GitHub.com](https://github.com).
2. Create a new repository named `proposal-website` (set to **Public**).
3. Upload the files inside `proposal-website/` (`index.html`, `css/`, `js/`, `assets/`).
4. Go to repository **Settings** → **Pages**.
5. Under **Branch**, select `main` (or `master`) and `/ (root)`, then click **Save**.
6. In about 60 seconds, GitHub will give you a live link:
   `https://<your-username>.github.io/proposal-website/`
7. Send her the link with: *“Hey… open this when you have a quiet minute alone. 👀💌”*
