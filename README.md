# 404ghost

A cinematic, interactive 3D portfolio website built with Next.js, React, and Three.js. This project is defined by a "Dark Matte" aesthetic—minimalist, premium, and system-oriented.

---

## 🌌 Live Demo

> [bharat3645.vercel.app](https://bharat3645.vercel.app/)

---

## 🚀 Features

- **Dark Matte Aesthetic:** A strict "Black, White, Crimson" palette creating a premium, studio-grade visual experience.
- **3D Interactive Showcase:** Immersive 3D model centerpiece using Three.js with drag, rotate, and zoom capabilities.
- **Dynamic Project Flashcards:** Interactive, physics-based project cards with detailed metadata and GitHub integrations.
- **Cinematic Motion:** Powered by Framer Motion for smooth, direction-aware entry animations and micro-interactions.
- **Responsive & Accessible:** Fully responsive layout with semantic HTML and accessibility best practices.
- **Downloadable Resumes:** dedicated dropdown for accessing specific resume versions (Web, Data Science, etc.).

---

## 🗂️ Project Structure

```
3D-Portfolio-Website/
├── public/                 # Static assets (images, 3D models, PDF resumes)
│   ├── models/             # GLB/GLTF model files
│   └── ...
├── src/
│   ├── app/                # Next.js App Router entry points
│   ├── components/         # React components (UI, 3D scenes, sections)
│   ├── hooks/              # Custom React hooks
│   └── lib/                # Utilities and helpers
├── docs/                   # Documentation and design blueprints
├── package.json            # Dependencies and scripts
└── tailwind.config.ts      # Tailwind CSS configuration
```

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS, Radix UI, Framer Motion
- **3D Graphics:** Three.js (@react-three/fiber, @react-three/drei)
- **Type Safety:** TypeScript
- **Forms:** React Hook Form, Zod

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bharat3645/3D-Portfolio-Website.git
   cd 3D-Portfolio-Website
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:9002](http://localhost:9002) to view your site.

---

## 🎨 Design & Style Guide

- **Theme:** "Dark Matte" – A sophisticated, low-light aesthetic.
- **Palette:**
  - **Background:** Pure Black (`#000000`) or specific dark matte shades.
  - **Accent:** Crimson (`#E61E32`) for active states and highlights.
  - **Text:** White (`#FFFFFF`) and Grey-400 for secondary text.
- **Typography:**
  - **Display:** *Inter Tight* (Bold, Tracking-tight)
  - **Body:** *Inter* (Clean, readable)
- **Motion:** Subtle, eased transitions. No bouncy or chaotic animations.

See [`docs/blueprint.md`](docs/blueprint.md) for the complete design system.

---

## 👤 Author

- **Bharat Singh Parihar**
- [GitHub](https://github.com/bharat3645)
- [LinkedIn](https://www.linkedin.com/in/bharat-singh-parihar/)
- Email: bharat3645@gmail.com
