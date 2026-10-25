<div align="center">

<img src="./public/favicon.svg" width="76" height="76" alt="LexiconUI Vector Logo" />

# LexiconUI

**The Open-Source Interactive UI/UX Terminology & Prompt-Engineering Encyclopedia for Developers and AI Vibe Coders**

[![License: MIT](https://img.shields.io/badge/License-MIT-0284C7.svg)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-059669.svg)](./CONTRIBUTING.md)
[![Concepts: 42 Interactive Specs](https://img.shields.io/badge/UI%2FUX_Concepts-42_Live_Sandboxes-0F172A.svg)](#3-complete-42-concept-curriculum-taxonomy)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-0F172A.svg)](./tsconfig.json)
[![React 19](https://img.shields.io/badge/React-19-0284C7.svg)](./package.json)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38BDF8.svg)](./src/index.css)

[**Project Overview**](#1-project-overview--the-problem-we-solve) · [**Interactive Modules**](#2-core-interactive-modules) · [**42-Concept Curriculum**](#3-complete-42-concept-curriculum-taxonomy) · [**Installation**](#4-installation--local-development) · [**Roadmap**](#6-project-roadmap) · [**Contributing**](#7-contribution-guidelines--how-you-can-make-lexiconui-indispensable) · [**MIT License**](#8-license)

</div>

---

## Table of Contents

1. [Project Overview & The Problem We Solve](#1-project-overview--the-problem-we-solve)
2. [Core Interactive Modules](#2-core-interactive-modules)
3. [Complete 42-Concept Curriculum Taxonomy (Everyday UI + Sci-Fi FUI)](#3-complete-42-concept-curriculum-taxonomy)
4. [Installation & Local Development](#4-installation--local-development)
5. [Repository Structure & Technical Architecture](#5-repository-structure--technical-architecture)
6. [Project Roadmap](#6-project-roadmap)
7. [Contribution Guidelines & How You Can Make LexiconUI Indispensable](#7-contribution-guidelines--how-you-can-make-lexiconui-indispensable)
8. [License](#8-license)

---

## 1. Project Overview & The Problem We Solve

In the era of AI-assisted software engineering and "vibe coding," developers and founders frequently have a crystal-clear mental picture of the exact frontend UI/UX they want to build—yet struggle to recall the **industry-standard UI/UX terminology** needed to instruct AI coding agents (Cursor, Claude Code, Windsurf, GitHub Copilot, Google AI Studio) accurately.

Whether it is an **everyday mystery pattern** you see a hundred times a day (*Accordion Disclosure*, *Kebab vs. Meatballs vs. Bento Menu Icons*, *Bottom Sheet Grabber Handle*, *Overlapping Avatar Facepile*, *Coachmark Spotlight*) or a **futuristic sci-fi / spatial computing interface** (*Chamfered HUD `clip-path` Frame*, *VisionOS Specular Rim Glass*, *Polar Conic Radar*, *DAG Node-Graph Bezier Noodles*), prompting with vague descriptions forces AI models to guess:

| What Vibe Coders Often Type (Ambiguous Fluff) | What the AI Agent Hallucinates | Exact LexiconUI Prompt Specification (First-Try Precision) |
| :--- | :--- | :--- |
| *"Make a modern grid of boxes of different sizes like Apple."* | Broken `flex-wrap` cards with ragged bottom edges and inconsistent heights. | **"Build a 3-column CSS Grid Bento Layout (`grid-cols-3 auto-rows-[210px] gap-4`) where the primary anchor cell spans 2 columns (`md:col-span-2`) and the vertical timeline spans 2 rows (`md:row-span-2`)."** |
| *"Add that three-dot button on the table row and the 9-dot app switcher."* | Confuses horizontal and vertical menu icons or builds a full mobile hamburger drawer inside a table cell. | **"Render a vertical 3-dot Kebab Menu icon button (`MoreVertical`) on each table row for row actions, and a 3x3 Bento / Waffle Grid Launcher icon (`Grid`) in the top header."** |
| *"Put a FAQ list where clicking a question opens the answer."* | Janky `display: none` toggles without ARIA attributes or smooth height transitions. | **"Build a WAI-ARIA Accordion (`aria-expanded`) with single-open progressive disclosure, rotating chevron indicator (`rotate-180`), and `grid-template-rows: 0fr` to `1fr` transition."** |
| *"Make a cool sci-fi Iron Man / Cyberpunk frame with angled corners and a node graph."* | Standard rounded rectangles (`rounded-lg`) with neon blue borders and straight lines. | **"Apply a 45° Chamfered HUD Polygon (`clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))`) and render a DAG Node-Graph Canvas with SVG cubic Bezier noodles (`M x1 y1 C cx1 cy1, cx2 cy2, x2 y2`)."** |

**LexiconUI** solves this permanently by combining a 42-concept interactive UI/UX encyclopedia, a clickable full-screen Visual Anatomy X-Ray dissector, a deterministic Vibe-to-Spec Prompt Translator, and an in-app Open-Source Contributor Studio into a single zero-config web application.

---

## 2. Core Interactive Modules

```
┌───────────────────────────────────────────────────────────────────────────────┐
│                         LexiconUI Application Shell                           │
│  ┌─────────────────────┐  ┌─────────────────────────────┐  ┌───────────────┐  │
│  │  Brand: LexiconUI   │  │ Encyclopedia · Anatomy X-Ray│  │ Spec Cart (N) │  │
│  │  (3-Zone Top Bar)   │  │ Translator · Matrix · OSS   │  │ + Quick Cmd+K │  │
│  └─────────────────────┘  └──────────────┬──────────────┘  └───────┬───────┘  │
└──────────────────────────────────────────┼─────────────────────────┼──────────┘
                                           │                         │
    ┌──────────────────────┬───────────────┴───────┬─────────────────┴─────┐
    ▼                      ▼                       ▼                       ▼
┌────────────────┐ ┌───────────────────┐ ┌───────────────────┐ ┌────────────────┐
│ 1. Two-Zone    │ │ 2. Visual Anatomy │ │ 3. Vibe-to-Spec   │ │ 4. In-App OSS  │
│    Live        │ │    X-Ray          │ │    Prompt         │ │    Contributor │
│    Sandbox     │ │    Inspector      │ │    Translator     │ │    Studio      │
├────────────────┤ ├───────────────────┤ ├───────────────────┤ ├────────────────┤
│ • 42 Live DOM  │ │ • 4 Full-Screen   │ │ • Plain-English   │ │ • 6 Community  │
│   Simulations  │ │   Blueprints      │ │   Vibe Input      │ │   Contribution │
│ • Real-Time    │ │   (incl. Sci-Fi   │ │ • 250+ Colloquial │ │   Avenues      │
│   Sliders &    │ │   FUI HUD)        │ │   Synonym Graph   │ │ • Live 5-Gate  │
│   Rulers       │ │ • Numbered Pins   │ │ • Anti-Slop       │ │   Rubric Audit │
│ • Fluff vs.    │ │   & Synced Spec   │ │   Guardrails &    │ │ • 1-Click TS & │
│   Exact Spec   │ │   Prompt Sheet    │ │   .MD Compiler    │ │   PR Generator │
└────────────────┘ └───────────────────┘ └───────────────────┘ └────────────────┘
```

1. **Interactive Encyclopedia & Two-Zone Component Sandbox (`42 Live Concepts`)**:
   - Manipulate live parameters (grid spans, gutter widths, concentric border-radius math, accordion disclosure modes, menu icon morphologies, chamfered HUD clip-paths, VisionOS specular rim angles, Bezier node curvature) and watch both the **live DOM specimen** and the **copy-ready AI agent prompt** update in real time.
2. **Visual Anatomy X-Ray Inspector (`4 Industry & Sci-Fi Blueprints`)**:
   - Switch between 4 full-scale reference interfaces (*SaaS Analytics & Developer Console*, *Editorial Product Launch Landing Page*, *Modern E-Commerce Studio*, and *Sci-Fi Tactical HUD & Orbital Console*). Click any numbered X-Ray callout pin (`01`–`06`) or UI zone to reveal its formal name, spatial math rule, common vibe-coding mistake, and region-specific prompt.
3. **Vibe-to-Spec Prompt Translator & Spec Composer**:
   - Type how you naturally picture an interface in plain English. Automatically detects every underlying UI/UX concept across all 5 pillars, attaches universal anti-slop guardrails, and exports a structured Markdown system prompt (`UI_UX_AGENT_PROMPT.md`).
4. **Architectural Decision Matrices ("When to Use What")**:
   - Side-by-side comparison tables resolving classic UI confusion (*Modal vs. Slide-Over Drawer vs. Popover vs. Toast*, *Bento vs. Hairline Grid vs. Split-Screen Hero*, *Hamburger vs. Kebab vs. Meatballs vs. Bento Menu Icons*, and *Sci-Fi & Spatial UI Paradigms*).
5. **In-App Open-Source Contributor Studio & Community Wishlist**:
   - Draft and validate new UI/UX concepts, load starter presets, copy GitHub Issue/PR specs for community wishlist features, and generate validated TypeScript & Pull Request payloads in one click.

---

## 3. Complete 42-Concept Curriculum Taxonomy

| # | Formal UI/UX Term | Pillar | Colloquial "Vibe Phrase" Example | Core CSS / Tailwind Signature |
| :- | :--- | :--- | :--- | :--- |
| `01` | **Bento Grid** | Layout & Spatial | *"Boxes of different sizes like Apple"* | `grid-cols-3 auto-rows-[210px] col-span-2 gap-4` |
| `02` | **Asymmetric Split-Screen Hero** | Layout & Spatial | *"Text on left and live demo on right"* | `lg:grid-cols-12 lg:col-span-7 lg:col-span-5 items-stretch` |
| `03` | **Sticky Aside Rail & Scroll Spy** | Layout & Spatial | *"Sidebar TOC that stays when you scroll"* | `sticky top-24 self-start w-72` |
| `04` | **Concentric Border Radius Math** | Layout & Spatial | *"Smooth nested card corners that match"* | `r_outer = r_inner + padding` (`p-4 rounded-[28px]` / `rounded-[12px]`) |
| `05` | **8-Point Grid & Proximity Law** | Layout & Spatial | *"Clean balanced spacing inside cards"* | `Outer Padding (p-6) >= Inner Child Gap (gap-4)` |
| `06` | **Workspace App Shell** | Layout & Spatial | *"Linear-style fixed sidebar and scrolling main"* | `h-screen overflow-hidden flex` + `flex-1 overflow-y-auto` |
| `07` | **Command Palette (`Cmd+K` Omnibar)** | Navigation & UI | *"Popup search when you press Ctrl+K"* | `fixed inset-0 backdrop-blur-xs max-w-xl divide-y` |
| `08` | **Segmented Control** | Navigation & UI | *"Toggle switch bar with 3 connected options"* | `inline-flex p-1 bg-slate-100 rounded-lg` + `bg-white shadow-xs` |
| `09` | **Slide-Over Drawer (`Sheet`)** | Navigation & UI | *"Panel that slides out from the right edge"* | `fixed inset-y-0 right-0 max-w-md flex-col shadow-2xl` |
| `10` | **Breadcrumb Trail** | Navigation & UI | *"Folder > subfolder > page path at top"* | `<nav aria-label="Breadcrumb">` + `aria-current="page"` |
| `11` | **Modal vs. Popover vs. Toast** | Navigation & UI | *"Difference between a popup, menu, and corner alert"* | `role="dialog"` vs. `top-full mt-2` vs. `fixed bottom-5 right-5` |
| `12` | **Geometry-Matched Skeleton Loader** | Navigation & UI | *"Gray pulsing blocks while data loads"* | `animate-pulse bg-slate-200 rounded-md` (`CLS = 0.00`) |
| `13` | **Actionable Empty State (`Zero-State`)** | Navigation & UI | *"Nice screen when a table has no data yet"* | `border-dashed border-slate-300 text-center p-12` |
| `14` | **Fluid Type Scale (`CSS clamp()`)** | Typography & Color | *"Headlines that scale smoothly without orphans"* | `clamp(2.25rem, 3.5vw + 1rem, 3.75rem)` + `text-balance` |
| `15` | **60-30-10 Color Distribution Rule** | Typography & Color | *"Clean neutral UI with a 10% pop of brand color"* | `60% #F8FAFC` · `30% #FFFFFF / #E2E8F0` · `10% #0284C7` |
| `16` | **Tabular Numerals (`tabular-nums`)** | Typography & Color | *"Stop numbers from jumping when timer counts"* | `font-variant-numeric: tabular-nums` (`font-mono tabular-nums`) |
| `17` | **Optimal Measure (`65ch`) & Leading** | Typography & Color | *"Paragraphs that aren't too wide across the screen"* | `max-w-[65ch] leading-relaxed tracking-tight` |
| `18` | **Luminance Contrast Scrim** | Typography & Color | *"Dark fade at bottom of photo so white text reads"* | `bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-transparent` |
| `19` | **Single-Elevation Hairline Grid** | Typography & Color | *"Thin 1px lines instead of boxes inside boxes"* | `border border-slate-200 divide-x divide-y divide-slate-200` |
| `20` | **Spring Physics vs. Exponential Easing** | Motion & Craft | *"Snappy Apple-style panel and button movement"* | `cubic-bezier(0.16, 1, 0.3, 1)` (`duration-180`) |
| `21` | **Glassmorphism & Specular Hairline** | Motion & Craft | *"Frosted glass bar that blurs content behind it"* | `bg-white/75 backdrop-blur-md backdrop-saturate-150` |
| `22` | **Optimistic UI & Micro-State Feedback** | Motion & Craft | *"Button updates immediately when clicked (<16ms)"* | Synchronous state mutation + async background reconciliation |
| `23` | **Keyboard Focus Ring (`:focus-visible`)** | Motion & Craft | *"Offset blue ring when pressing Tab key"* | `focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2` |
| `24` | **Staggered Choreography** | Motion & Craft | *"Cards appearing one after another smoothly"* | `animation-delay: calc(var(--index) * 40ms)` + `translateY(8px)` |
| `25` | **Masonry Waterfall Grid** | Layout & Spatial | *"Pinterest-style columns of different height cards"* | `columns-1 sm:columns-2 lg:columns-3 gap-4` + `break-inside-avoid` |
| `26` | **Infinite Marquee & Edge-Fade Mask** | Layout & Spatial | *"Scrolling logo ticker faded on left and right edges"* | `mask-image: linear-gradient(to right, transparent, black 12%...)` |
| `27` | **Accordion & Progressive Disclosure** | Navigation & UI | *"Click a question row to expand the answer below"* | `aria-expanded` + `grid-rows-[1fr]` / `grid-rows-[0fr]` |
| `28` | **Hamburger, Kebab, Meatballs, Bento & Döner Icons** | Navigation & UI | *"The 3 vertical dots vs 3 horizontal dots vs 9-dot grid"* | `Menu` vs. `MoreVertical` vs. `MoreHorizontal` vs. `Grid` vs. `Filter` |
| `29` | **Mega Menu Flyout** | Navigation & UI | *"Stripe-style multi-column navbar dropdown with icons"* | `grid-cols-12 col-span-8 grid-cols-2` + `col-span-4 bg-slate-50` |
| `30` | **Bottom Sheet & Drag Grabber Handle** | Navigation & UI | *"Card that slides up from bottom with a little gray pill"* | `fixed inset-x-0 bottom-0 rounded-t-[24px]` + `w-10 h-1.5 rounded-full` |
| `31` | **CSS Scroll-Snap Carousel & Peek** | Navigation & UI | *"Horizontal swipe slider that locks cleanly to each card"* | `overflow-x-auto snap-x snap-mandatory` + `snap-center shrink-0 w-[82%]` |
| `32` | **Avatar Stack (`Overlapping Facepile`)** | Navigation & UI | *"Row of overlapping profile circles with a +4 badge"* | `flex -space-x-2.5` + `ring-2 ring-white rounded-full` |
| `33` | **Multi-Step Wizard Stepper** | Navigation & UI | *"Numbered circles connected by lines for checkout steps"* | `aria-current="step"` + connector track progress bar |
| `34` | **Floating Action Button (`FAB`) & Speed Dial** | Navigation & UI | *"Round + button in bottom-right that pops out mini actions"* | `fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-xl` |
| `35` | **Coachmark & Spotlight Onboarding Tour** | Motion & Craft | *"Darkens screen except one glowing button with Next tooltip"* | `box-shadow: 0 0 0 9999px rgba(15, 23, 42, 0.72)` |
| `36` | **Scroll-Linked Reading Progress Bar** | Motion & Craft | *"Thin colored bar at top of blog post that fills 0% to 100%"* | `fixed top-0 inset-x-0 h-1 origin-left scale-x-[var(--scroll)]` |
| `37` | **Chamfered HUD Frame & Corner Reticles** | Sci-Fi & FUI | *"Cyberpunk / Iron Man box with 45-degree cut corners"* | `clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px...)` |
| `38` | **Spatial Glass & Specular Rim Light (`VisionOS`)** | Sci-Fi & FUI | *"Apple Vision Pro floating 3D glass window with lit edge"* | `backdrop-blur-2xl backdrop-saturate-180 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.45)]` |
| `39` | **CRT Scanline & Phosphor Chromatic Bloom** | Sci-Fi & FUI | *"Retro-futuristic terminal with horizontal scanlines and glow"* | `repeating-linear-gradient(...)` + `text-shadow: 0 0 8px` |
| `40` | **Polar Coordinate Radar & Conic Sweep HUD** | Sci-Fi & FUI | *"Spinning radar circle with sweeping beam and glowing blips"* | `conic-gradient(from 0deg, rgba(34,211,238,0.35), transparent 75deg)` |
| `41` | **Radial Pie Menu (`Marking Menu`)** | Sci-Fi & FUI | *"Circular wheel menu that pops up around the cursor"* | Polar angle wedge sectors (`atan2(dy, dx)`) around origin |
| `42` | **Node-Graph Patch Canvas & Bezier Noodles** | Sci-Fi & FUI | *"Boxes connected by curved wires like Blender or ComfyUI"* | `<svg>` cubic Bezier `<path d="M x1 y1 C cx1 cy1, cx2 cy2, x2 y2" />` |

---

## 4. Installation & Local Development

LexiconUI is a 100% deterministic, client-side application built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS v4**. It requires **zero external API keys or database setup** to run locally or deploy.

### Prerequisites
- **Node.js** `>= 20.0.0`
- **npm** `>= 10.0.0` (or `pnpm` / `bun`)

### Step-by-Step Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-username/lexicon-ui.git
cd lexicon-ui

# 2. Install dependencies
npm install

# 3. Start the development server at http://localhost:3000
npm run dev
```

### Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server on port `3000`. |
| `npm run lint` | Runs strict TypeScript compiler checks (`tsc --noEmit`) across the entire codebase. |
| `npm run build` | Compiles and bundles the production application into `/dist`. |
| `npm run preview` | Locally previews the production bundle from `/dist`. |

---

## 5. Repository Structure & Technical Architecture

```text
lexicon-ui/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md               # Issue template for UI or sandbox bugs
│   │   ├── new_anatomy_case_study.md   # Proposal template for X-Ray blueprints
│   │   └── new_ui_ux_term.md           # Proposal template for new UI/UX terms
│   └── PULL_REQUEST_TEMPLATE.md        # Standardized PR checklist & 5-gate rubric
├── src/
│   ├── components/
│   │   ├── AnatomyInspectorView.tsx    # Interactive X-Ray blueprint dissector (4 templates)
│   │   ├── ComparisonMatrixView.tsx    # Side-by-side pattern decision tables (4 groups)
│   │   ├── ContributorStudioView.tsx   # In-app OSS hub, wishlist & PR schema builder
│   │   ├── EncyclopediaView.tsx        # Two-Zone sandbox & 42-term curriculum directory
│   │   ├── InteractiveStage.tsx        # 42 live React mini-simulations
│   │   ├── Overlays.tsx                # Global Cmd+K modal & Slide-Over Spec Cart
│   │   └── PromptTranslatorView.tsx    # Natural-language Vibe-to-Spec compiler
│   ├── data/
│   │   ├── anatomyData.ts              # X-Ray hotspots, decision matrices & presets
│   │   └── termsData.ts                # 42 canonical UI/UX & Sci-Fi FUI concepts
│   ├── App.tsx                         # Application shell & persistent Spec store
│   ├── index.css                       # Swiss Editorial theme & blueprint utilities
│   └── main.tsx                        # React 19 DOM entry point
├── ARCHITECTURE.md                     # Deep technical & ontology extension guide
├── CODE_OF_CONDUCT.md                  # Contributor Covenant v2.1
├── CONTRIBUTING.md                     # Complete contributor guide & review rubric
├── LICENSE                             # MIT License
├── README.md                           # Project overview, roadmap & documentation
└── SECURITY.md                         # Security policy & vulnerability reporting
```

---

## 6. Project Roadmap

### Phase 1: Foundation, Everyday Mystery UI & Sci-Fi FUI Core (Completed)
- [x] **42 Canonical UI/UX Concepts** across 5 Pillars (*Layout*, *Navigation*, *Typography & Color*, *Motion*, and *Sci-Fi / Spatial / Futuristic FUI*).
- [x] **Two-Zone Interactive Sandbox** with real-time parameter sliders and Blueprint Rulers for all 42 concepts.
- [x] **4 Full-Screen Visual Anatomy X-Ray Blueprints**: *SaaS Console*, *Editorial Landing Page*, *E-Commerce Studio*, and *Sci-Fi Tactical HUD & Orbital Console*.
- [x] **Deterministic Vibe-to-Spec Translator** with 250+ colloquial synonym triggers and `.MD` Spec export.
- [x] **In-App OSS Contributor Studio** with 6 contribution avenues, starter presets, community wishlist issue generators, and 5-gate rubric validation.

### Phase 2: Developer Convenience & AI Agent Ecosystem Integrations (Open for Community PRs!)
- [ ] **1-Click Agent Rule File Exporters (`.cursorrules`, `CLAUDE.md`, `AGENTS.md`, Windsurf)**: Export your Spec Cart directly into IDE-native agent instruction files.
- [ ] **LexiconUI MCP Server (`@lexicon-ui/mcp-server`)**: Expose the `DESIGN_TERMS` ontology via the Model Context Protocol so coding agents can query exact UI/UX specifications autonomously.
- [ ] **Multi-Framework Code Tabs**: Toggle code snippets between Tailwind CSS, Vanilla CSS, `shadcn/ui`, and SwiftUI / Jetpack Compose.

### Phase 3: Deep Interactivity, Visual Quiz Mode & Expanded Curriculum (Planned)
- [ ] **"Name That UI Pattern!" Interactive Visual Flashcard & Quiz Mode**: Timed visual challenges to help developers internalize UI/UX vocabulary from sight.
- [ ] **50+ Additional Everyday & Domain Concepts**: Sticky Table Headers, Docked PiP Mini-Players, Inline Slash Command Menus, Isometric 3D Exploded Layer Stacks, and Data Visualization taxonomies.
- [ ] **Community Localization (i18n)**: Map colloquial vibe phrases in multiple languages to canonical English UI/UX engineering terminology.

---

## 7. Contribution Guidelines & How You Can Make LexiconUI Indispensable

**LexiconUI belongs to the developer and design community.** Our mission is to make this repository so useful, convenient, and visually interactive that every developer keeps it bookmarked whenever they build a frontend with AI.

### Six High-Impact Ways You Can Contribute

1. **01 · Add Everyday "What Is That Called?!" UI Concepts**:
   - Spot a common UI pattern people see every day (e.g., *Sticky Table Header*, *Inline Slash Command Menu (`/`) *, *Docked Mini-Player*, *Segmented OTP Input*, *Pull-to-Refresh*) that isn't in the encyclopedia yet? Draft it in the **OSS Contribute** tab and submit a PR!
2. **02 · Expand the Sci-Fi, Spatial & Futuristic UI (FUI) Collection**:
   - Contribute VisionOS spatial glass components, 3D CSS isometric exploded layer stacks, diegetic game HUD overlays, biometric waveform oscilloscopes, or WebGL shader surfaces.
3. **03 · Make the Sandboxes Even More Interactive & Tactile**:
   - Upgrade existing or new concept sandboxes in `src/components/InteractiveStage.tsx` with drag-and-drop physics, keyboard navigation testers, spring-mass visualizers, or side-by-side *"What AI Hallucinates vs. Canonical UI/UX Spec"* toggles.
4. **04 · Build Developer Convenience & Workflow Power-Ups**:
   - Add 1-click exports for `.cursorrules`, `CLAUDE.md`, `AGENTS.md`, or Figma Tokens, or add framework tabs (Tailwind, Vanilla CSS, React/shadcn) to the code deck.
5. **05 · Elevate the Website's Own UI/UX, Polish & Learning Modes**:
   - Have an idea to make LexiconUI itself faster, cleaner, more intuitive, or more fun to learn from? Build an interactive Flashcard/Quiz mode, improve mobile responsiveness, refine micro-interactions, or add keyboard shortcuts.
6. **06 · Create New Full-Screen Visual Anatomy X-Ray Blueprints**:
   - Dissect whole industry interfaces (*Mobile Fintech Wallet*, *AI Coding IDE & Canvas*, *Non-Linear Video Timeline Editor*) with clickable numbered X-Ray pins.

### Quick Contribution Workflow

```bash
# 1. Fork the repo and create a feature branch
git checkout -b feat/term-slash-command-menu

# 2. Open the "OSS Contribute" tab in the running app to draft & validate your contribution
# 3. Verify TypeScript compilation and production build
npm run lint
npm run build

# 4. Commit using Conventional Commits and open a Pull Request
git commit -m "feat(terms): add Inline Slash Command Menu term and interactive sandbox"
git push origin feat/term-slash-command-menu
```

Read our full [**Contribution Framework & Review Rubric (`CONTRIBUTING.md`)**](./CONTRIBUTING.md) and [**Technical Architecture Guide (`ARCHITECTURE.md`)**](./ARCHITECTURE.md) for step-by-step instructions.

---

## 8. License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for full license text.

```text
MIT License — Copyright (c) 2026 LexiconUI Contributors
Free for personal, educational, open-source, and commercial use.
```
