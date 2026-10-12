# 💼 DealPrep

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Persistence-3ECF8E?style=flat&logo=supabase)](https://supabase.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **AI-powered executive meeting briefing and deal dossier platform that synthesizes corporate filings, executive backgrounds, and strategic talking points into actionable intelligence.**

DealPrep eliminates hours of manual meeting preparation for founders, investors, and executive teams. By condensing statutory SEC disclosures (Form 10-K, 10-Q), leadership track records, and corporate priorities, DealPrep delivers comprehensive, executive-ready dossiers in seconds.

---

## 🌟 Key Features

### 📋 Executive Meeting Dossiers
- **Holistic Leadership Profiles**: Summarizes executive career trajectories, board seats, key management priorities, and communication style.
- **Strategic Talking Points**: Formulates high-impact discussion prompts and alignment angles tailored specifically to meeting objectives.
- **Contextual Icebreakers**: Generates authentic, professional conversation starters based on public statements and corporate milestones.

### 📊 SEC Filing & Financial Synthesis
- **Filing Extraction**: Synthesizes key financial metrics from statutory 10-K and 10-Q filings: top-line revenue trajectories, operating margin trends, capital expenditure priorities, and cash flow stability.
- **Corporate Strategic Initiatives**: Highlights recent mergers, joint ventures, product launches, and enterprise market expansion vectors.

### ⚠️ Risk & Red Flag Radar
- **Vulnerability Identification**: Flags corporate risk factors, litigation disclosures, customer concentration warnings, and supply chain bottlenecks directly from Item 1A regulatory filings.
- **Negotiation Leverage**: Equips dealmakers with awareness of counterparty pain points and operational headwinds.

### 🗄️ Dossier History & Persistence
- **Supabase Cloud Backend**: Automatically archives generated dossiers for quick reference and collaboration.
- **Interactive History Modal**: Search and reload past meeting briefings without re-querying or re-generating.

### 🎨 Immersive Design & Presentation
- **Hero Video & Glassmorphism**: High-contrast dark theme with animated video backdrop and responsive UI components.
- **Export & Print Ready**: Clean typography designed for rapid scanning on mobile before walking into meetings or full-screen review.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technologies | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router), React 19 | Server actions, API route handlers, and streaming UI components. |
| **Language** | TypeScript | Full type safety across dossiers, API responses, and database schemas. |
| **Styling** | Tailwind CSS v4, Lucide Icons | High-performance atomic styling and modern icon library. |
| **Database** | Supabase (`@supabase/supabase-js`) | PostgreSQL cloud persistence for dossier archive and history retrieval. |
| **Animations** | Canvas Confetti | Visual completion feedback when dossiers finish generating. |

---

## 🚀 Getting Started

### 📋 Prerequisites
- **Node.js**: 18.18 or higher (v20+ recommended)
- **npm** or **pnpm** / **yarn**

### ⚙️ Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/DJRKM/DealPrep.git
   cd DealPrep
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   # Optional: AI Provider API key (e.g. OpenAI / Anthropic / Gemini)
   AI_API_KEY=your_ai_api_key
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to start preparing dossiers.

---

## 📁 Project Structure

```
dealprep/
├── public/                 # Static branding assets and hero video backdrop
│   ├── logo.jpeg
│   └── videos/
│       └── hero-bg.mp4
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── dossiers/            # History retrieval and archive endpoints
│   │   │   └── generate-dossier/    # Dossier generation pipeline
│   │   ├── globals.css              # Custom styles and glassmorphism utilities
│   │   ├── layout.tsx               # Root application metadata and layout
│   │   └── page.tsx                 # Main dossier creation & view interface
│   ├── components/
│   │   ├── DossierForm.tsx          # Meeting parameter input form
│   │   ├── DossierView.tsx          # Executive briefing layout & risk cards
│   │   ├── Header.tsx               # Top bar navigation & history drawer trigger
│   │   ├── HeroVideo.tsx            # Cinematic background component
│   │   └── RecentDossiersModal.tsx  # Historical dossier browser modal
│   └── lib/
│       └── supabase.ts              # Supabase client connection
├── package.json
└── tsconfig.json
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
