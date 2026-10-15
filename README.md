# 💖 One Question, Infinite Feelings… 💌

### An Interactive, Teasing & Romantic Proposal Website

A little universe built with love. ✨

**One Question, Infinite Feelings** is a romantic, interactive website designed to turn a simple proposal into a memorable digital experience. Filled with playful teasing, animated hearts, secret love letters, fun quizzes, relationship memories, and a cinematic final proposal, the website is designed to make someone special smile, laugh, blush, and feel loved.

💌 **The idea:** Every click reveals a little more affection, every interaction brings a surprise, and everything leads to one special question.

---

## 🌷 Features

### 💌 1. Interactive Opening Envelope
- A romantic envelope sealed with a heart.
- Animated letter reveal with sweet, teasing messages.
- Playful opening choices and smooth transitions.

### 😈 2. Playful Teasing Zone
- An interactive “Do you love me?” experience.
- A playful, moving “No” button.
- Funny messages, heart animations, and a celebratory response.

### 🌸 3. 101 Reasons You're My Favourite Person
- A collection of romantic, funny, and heartfelt reasons.
- Search and category-based browsing.
- Random reason selection and favourite bookmarks.

### 🎀 4. The Girlfriend Examination
- A fun, interactive love quiz.
- Playful reactions to answers.
- A cute, celebratory soulmate certificate.

### 🌙 5. Little Moments, Big Feelings
- An interactive relationship memory timeline.
- Beautiful memory cards and photo-style layouts.
- Expandable stories to revisit special moments.

### 💗 6. Secret Love Letter
- An interactive letter with an animated reveal.
- A typewriter-style romantic message.
- A dedicated space for personal feelings and heartfelt words.

### 💍 7. The Final Proposal
- A cinematic night-sky atmosphere.
- A glowing moon, twinkling stars, and a romantic ring animation.
- A gradually revealed proposal.
- A playful “Convince me more” interaction.
- Confetti, celebration animations, and a replay option.

### 🐰 8. Hidden Easter Eggs
Discover secret compliments, interactive surprises, a playful Love-O-Meter, and other hidden details throughout the website.

### ✨ 9. Additional Touches
- Animated backgrounds with floating hearts, petals, and sparkles.
- Custom cursor effects for desktop.
- Romantic sound effects and synthesized background audio.
- Responsive layouts for mobile and desktop.
- Smooth transitions and reduced-motion support.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Interactive user interface |
| TypeScript | Type safety and maintainable code |
| Vite | Development server and production build |
| Tailwind CSS | Responsive styling and layouts |
| Motion | Animation and transitions |
| Lucide React | Icons |
| Canvas Confetti | Celebration effects |
| Web Audio API | Synthesized sound effects and audio |

---

## 📁 Project Structure

```text
proposal-site/
├── index.html
├── package.json
├── bun.lock
├── vite.config.ts
├── tsconfig.json
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── components/
│   │   ├── BackgroundCanvas.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── FooterAndEasterEggs.tsx
│   │   ├── LoveQuiz.tsx
│   │   ├── MemoryTimeline.tsx
│   │   ├── OpeningEnvelope.tsx
│   │   ├── ProposalSection.tsx
│   │   ├── ReasonsGallery.tsx
│   │   ├── SecretLoveLetter.tsx
│   │   ├── TeasingZone.tsx
│   │   └── TopNav.tsx
│   ├── data/
│   │   ├── memories.ts
│   │   ├── quiz.ts
│   │   └── reasons.ts
│   ├── utils/
│   │   └── soundSynthesizer.ts
│   └── types.ts
└── proposal-website/
    └── ...legacy standalone HTML/CSS/JS version
```

*The main React application is located in the repository root. The `proposal-website/` directory contains a separate standalone website version.*

---

## 🚀 Getting Started

Follow these steps to run the project on your computer.

### Prerequisites

Install the following:

- [Node.js](https://nodejs.org/) — use a version compatible with the installed Vite release.
- npm, which is included with Node.js.
- Git (optional, for cloning the repository).

### 1. Clone the repository

```bash
git clone https://github.com/vns-devtech/proposal-site.git
```

### 2. Open the project directory

```bash
cd proposal-site
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL shown in your terminal. The configured development server normally runs at:

`http://localhost:3000`

### 5. Build for production

```bash
npm run build
```

The production-ready files will be generated in the `dist/` directory.

### 6. Preview the production build

```bash
npm run preview
```

### 7. Check TypeScript

```bash
npm run lint
```

This project uses `npm run lint` to run the TypeScript compiler without emitting files.

---

## 💕 Personalization Guide

Make the experience feel unique by replacing generic messages with your own relationship details.

### Customize the reasons
Edit:

`src/data/reasons.ts`

Add, remove, or change the reasons to reflect the little things you love about your partner.

### Customize the quiz
Edit:

`src/data/quiz.ts`

Replace sample questions and answers with inside jokes, funny memories, and personal references.

### Add real memories
Edit:

`src/data/memories.ts`

Include meaningful moments, dates, captions, and stories. Replace sample memories with genuine experiences and add your own photos where supported by the relevant component.

### Personalize the love letter
Edit:

`src/components/SecretLoveLetter.tsx`

Write a message in your own voice. A personal memory or a simple, sincere line can make the letter much more meaningful.

### Customize the proposal
Edit:

`src/components/ProposalSection.tsx`

Personalize the final question, celebration message, and playful responses.

### Customize the appearance
Edit:

`src/index.css`

Update colors, typography, animation styles, and shared visual effects to create your preferred romantic aesthetic.

**Tip:** Search the `src/` directory for words such as `madam`, `favourite person`, or other sample messages to find additional text you may want to personalize.

---

## 🌐 Deployment

You can deploy the React application using a static hosting platform such as Vercel, Netlify, or GitHub Pages.

### Option 1: Deploy with Vercel

1. Push your latest code to GitHub.
2. Open [Vercel](https://vercel.com/).
3. Import the `vns-devtech/proposal-site` repository.
4. Set the framework preset to **Vite**, if it is not detected automatically.
5. Use `npm run build` as the build command.
6. Use `dist` as the output directory.
7. Deploy the project and open the generated URL.

### Option 2: Deploy with Netlify

1. Open [Netlify](https://www.netlify.com/).
2. Import your GitHub repository.
3. Set the build command to `npm run build`.
4. Set the publish directory to `dist`.
5. Deploy the site.

### Option 3: GitHub Pages

GitHub Pages can host a static Vite build, but the Vite base path must match the repository URL. Configure the `base` option in `vite.config.ts`, add a suitable deployment workflow, and publish the generated `dist/` folder.

For the simplest deployment, Vercel or Netlify is a good starting point.

---

## 📱 Responsive Design

The website is designed for different screen sizes, including:

- Mobile phones
- Tablets
- Laptops and desktops

For the best experience, test the interactive elements on both mobile and desktop before sharing the website.

---

## 💡 Future Improvements

Potential enhancements include:

- Personalized names and nicknames throughout the experience.
- A dedicated gallery of real relationship photographs.
- More customizable themes and animations.
- Additional mini-games and secret surprises.
- A custom music track with user-controlled playback.
- A printable or shareable romantic letter.
- More accessibility and performance improvements.

---

## ❤️ A Little Note

This project is a reminder that love doesn't always need grand gestures. Sometimes, a tiny interactive website, a few personal words, and a little creativity are enough to make someone feel special.

**Made with love, a little mischief, and infinite feelings.** 💌✨

---

## 👨‍💻 Author

**Vansh Bhardwaj**

- GitHub: [@vns-devtech](https://github.com/vns-devtech)
- Repository: [proposal-site](https://github.com/vns-devtech/proposal-site)

---

### 💖 One question. Infinite feelings. One unforgettable moment.

*Because sometimes, the cutest way to ask a question is to build an entire universe around it.* 💍🌙
