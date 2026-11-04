# Changelog

All notable changes to **LexiconUI** (`RootDeveloperDS/LexiconUI`) are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.11.0] - 2026-11-04

### Added
- **Interactive Workspace Intro Tour (`IntroTour.tsx`)**: Added a 5-step guided walkthrough that automatically introduces first-time visitors to all 5 workspace tools (*Live UI Sandbox*, *App Anatomy X-Ray*, *Vibe-to-Spec Translator*, *Pattern Cheat Sheets*, and *Blueprints & UI Quiz*), programmatically highlighting each tool card and switching views live.
- **Expanded Encyclopedia to 48 Live Interactive Concepts (`termsData.ts`, `InteractiveStage.tsx`, `PromptTranslatorView.tsx`)**: Promoted all 6 showcase patterns into full first-class Encyclopedia terms (`43`–`48`) with real-time interactive DOM sandboxes and natural-language synonym detection:
  - `43.` **CSS Subgrid Cross-Card Alignment** (`css-subgrid`)
  - `44.` **Inline Slash Command Menu (/ Trigger)** (`slash-command-menu`)
  - `45.` **Docked Picture-in-Picture (PiP) Mini-Player** (`pip-mini-player`)
  - `46.` **Segmented OTP / 2FA Auto-Advance Input** (`segmented-otp-input`)
  - `47.` **Magnetic Cursor Target & Proximity Pull** (`magnetic-cursor-target`)
  - `48.` **Isometric Exploded Layer Stack (3D CSS Planes)** (`isometric-layer-stack`)
- **Multi-Pattern Full-Page Blueprints & Interactive "Name That UI!" Quiz (`ContributorStudioView.tsx`)**: Replaced the legacy PR form with 5 copy-ready production page blueprints (*B2B SaaS Workspace*, *Product Launch Landing Page*, *Collaborative Docs & Editor*, *2FA Auth & Onboarding Flow*, and *Sci-Fi Telemetry Studio*), a 5-question interactive UI vocabulary quiz, and direct GitHub repository links.

---

## [1.10.0] - 2026-11-04

### Added
- **Desktop Horizontal Scroll Ergonomics**: Added universal mouse-wheel-to-horizontal-scroll support across all horizontal strips, click-and-drag grab scrolling, floating left/right edge paddles, and an interactive progress scrubber on the Step 01 Concept Strip.
- **Vercel Web Analytics**: Integrated `@vercel/analytics/react` (`<Analytics />`) in the root application shell.
- **Community Showcase Gallery (`ContributorStudioView.tsx`)**: Added 6 pre-loaded community component schematics with live code/prompt inspection and local draft publishing.
- **Production Footer & Telemetry Rating Widget (`Footer.tsx`, `FeedbackRatingWidget.tsx`)**: Added a 12-column architectural footer with quick workspace navigation, creator social links, and an interactive 1–5 star rating widget.

### Changed
- **Unified Brand & Repository Naming**: Standardized all package metadata, repository URLs, and documentation to `LexiconUI` (`RootDeveloperDS/LexiconUI`) and `lexicon-ui`.
- **Dependency Resolution**: Updated `esbuild` in `devDependencies` to `^0.28.0` for clean compatibility with `vite@^8.3.0` on Vercel builds.

---

## [1.5.0] - 2026-10-20

### Added
- **42 Canonical UI/UX Concepts Across 5 Pillars**:
  - *Layout & Spatial Systems* (`01`–`06`, `25`–`26`)
  - *Navigation & UI Components* (`07`–`13`, `27`–`34`)
  - *Typography & Color Hierarchy* (`14`–`19`)
  - *Micro-Interactions & Motion Craft* (`20`–`24`, `35`–`36`)
  - *Sci-Fi, Spatial & Futuristic UI / FUI* (`37`–`42`)
- **4 Full-Screen Visual Anatomy X-Ray Blueprints**: *SaaS Analytics & Developer Console*, *Editorial Product Launch Landing Page*, *Modern E-Commerce Studio*, and *Sci-Fi Tactical HUD & Orbital Console*.
- **Deterministic Vibe-to-Spec Prompt Translator**: Added 250+ colloquial synonym triggers and `.MD` specification export.
