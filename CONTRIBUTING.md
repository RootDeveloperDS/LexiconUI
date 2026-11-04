# Contributing to LexiconUI (`RootDeveloperDS/LexiconUI`)

Thank you for helping build **LexiconUI** ([`https://github.com/RootDeveloperDS/LexiconUI`](https://github.com/RootDeveloperDS/LexiconUI))—the open-source interactive UI/UX terminology encyclopedia and prompt-engineering standard for developers, designers, and AI vibe coders!

Whether you want to **add new UI/UX concepts**, **invent richer interactive sandboxes**, **contribute Sci-Fi / Spatial UI (FUI) patterns**, or **improve the website's own convenience, UI/UX polish, and developer workflows**, your contributions are deeply valued.

---

## Table of Contents

1. [Six Ways You Can Make LexiconUI Indispensable](#1-six-ways-you-can-make-lexiconui-indispensable)
2. [Quality Rubric for UI/UX Terms](#2-quality-rubric-for-uiux-terms)
3. [Step-by-Step: Adding a New UI/UX or Sci-Fi FUI Term](#3-step-by-step-adding-a-new-uiux-or-sci-fi-fui-term)
4. [Step-by-Step: Improving Site UX, Interactivity & Convenience](#4-step-by-step-improving-site-ux-interactivity--convenience)
5. [Step-by-Step: Adding a Visual Anatomy Case Study](#5-step-by-step-adding-a-visual-anatomy-case-study)
6. [Pull Request Structure & Review Lifecycle](#6-pull-request-structure--review-lifecycle)

---

## 1. Six Ways You Can Make LexiconUI Indispensable

Contributors can participate across six open-ended tracks depending on their interests and skills:

| Track | What You Can Build | Files Touched | Complexity |
| :--- | :--- | :--- | :--- |
| **01 · Everyday Mystery UI Concepts** | Add common UI patterns people see daily but don't know the name of (*Inline Slash Command Menu*, *Sticky Table Header*, *Docked PiP Mini-Player*, *OTP Input*) + colloquial vibe phrases. | `src/data/termsData.ts`, `src/components/InteractiveStage.tsx`, `src/components/PromptTranslatorView.tsx` | Starter–Intermediate |
| **02 · Sci-Fi, Spatial & Futuristic UI (FUI)** | Add AR/VR spatial glass patterns, 3D CSS isometric layer stacks, game HUD reticles, cyberpunk telemetry, or WebGL shader surfaces under `category: 'futuristic'`. | `src/data/termsData.ts`, `src/components/InteractiveStage.tsx` | Intermediate |
| **03 · Richer Interactive Sandboxes** | Upgrade existing or new concept sandboxes with drag-and-drop physics, keyboard navigation testers, spring visualizers, or *"Broken AI Output vs. Exact Spec"* toggles. | `src/components/InteractiveStage.tsx` | Intermediate |
| **04 · Developer Convenience & Exporters** | Build 1-click exporters for `.cursorrules`, `CLAUDE.md`, `AGENTS.md`, Windsurf rules, or multi-framework code tabs (Tailwind, Vanilla CSS, `shadcn/ui`, SwiftUI). | `src/components/Overlays.tsx`, `src/components/PromptTranslatorView.tsx` | Intermediate |
| **05 · Website UI/UX Polish & Learning Modes** | Make LexiconUI itself more convenient, beautiful, and indispensable—add an interactive *"Name That UI!"* flashcard/quiz game, keyboard shortcuts, or mobile ergonomic refinements. | `src/components/*`, `src/App.tsx` | Intermediate–Advanced |
| **06 · Visual Anatomy X-Ray Blueprints** | Build clickable full-screen domain dissections (*Mobile Fintech Wallet*, *AI Agent Canvas IDE*, *Video Timeline Editor*) with numbered X-Ray callout pins. | `src/data/anatomyData.ts`, `src/components/AnatomyInspectorView.tsx` | Advanced |

> **Pro Tip**: Open the **OSS Contribute** tab inside the live LexiconUI web app to browse Community Wishlist ideas, load starter templates, validate your concept against the 5-Gate Rubric, and generate ready-to-paste TypeScript and Pull Request Markdown!

---

## 2. Quality Rubric for UI/UX Terms

Every term in LexiconUI must pass our **5-Point Editorial & Engineering Rubric** before merge:

1. **Industry-Standard Canonical Naming**:
   - The `title` and `pronunciationOrAlias` must reflect established design-system, W3C WAI-ARIA, Apple HIG, Material Design, or game/spatial FUI nomenclature—never invented buzzwords.
2. **Authentic Colloquial "Vibe Phrases" (`3–6 phrases`)**:
   - Include at least 3 natural-language phrases that a developer or non-designer actually types when they forget the word (e.g., *"three vertical dots vs three horizontal dots"* or *"darkens the screen except one highlighted button"*).
3. **High-Contrast Prompt Pair (`Bad Prompt` vs. `Good Prompt`)**:
   - **`badPromptExample`**: Illustrates the realistic, ambiguous "fluff" prompt that causes AI coding agents to hallucinate or produce generic layouts.
   - **`goodPromptExample`**: Provides a concrete, copy-pasteable specification containing exact structural layout rules, Tailwind/CSS tokens, and accessibility constraints.
4. **Anatomical Sub-Parts (`2–4 parts`)**:
   - Breaks the pattern into named sub-elements (`name`, `role`, `cssHint`) so users learn how to refer to specific pieces of the component during iterative follow-up prompts.
5. **Interactive Stage Simulation (No Static Placeholders)**:
   - Every term must feature an interactive simulation in `src/components/InteractiveStage.tsx` controlled by `sandboxControls` (sliders or select switches) so learners can feel how changing parameters mutates the UI in real time.

---

## 3. Step-by-Step: Adding a New UI/UX or Sci-Fi FUI Term

1. **Draft & Validate in the In-App Contributor Studio**:
   - Run `npm run dev` and open the **OSS Contribute** tab.
   - Choose one of the 5 pillars (`layout` | `navigation` | `typography` | `motion` | `futuristic`), fill in the fields (or load a starter preset), and verify that all **5 / 5 Quality Gates** show **PASS**.
   - Click **Copy TypeScript** to copy the formatted `DesignTerm` object.
2. **Register the Term in `src/data/termsData.ts`**:
   - Append your `DesignTerm` object to `DESIGN_TERMS` and increment the corresponding category `count` in `CATEGORY_META`.
3. **Add Synonyms to the Vibe Translator**:
   - In `src/components/PromptTranslatorView.tsx`, add a key for your new `term.id` inside `KEYWORD_SYNONYM_MAP` with 4–6 colloquial trigger substrings.
4. **Implement the Interactive Simulation**:
   - In `src/components/InteractiveStage.tsx`, add a `case '<your-term-id>':` block inside `switch (term.id)` that reads `controlValues` and `showBlueprint` to render a live, responsive demo.

---

## 4. Step-by-Step: Improving Site UX, Interactivity & Convenience

We actively encourage Pull Requests that make LexiconUI itself more intuitive, convenient, and visually refined! When proposing a UX or feature enhancement:

1. **Preserve the Swiss Editorial Studio Aesthetic**:
   - Maintain the high-contrast light canvas (`#F8FAFC`), crisp `1px solid` structural hairlines (`#E2E8F0`), `Bricolage Grotesque` display typography, and `JetBrains Mono` (`tabular-nums`) for technical specs. (For Sci-Fi / FUI stages, use deep obsidian `bg-slate-950` specimen frames).
2. **Zero Dead Controls**:
   - Every button, filter, tab, or keyboard shortcut you add must have a complete, deterministic event handler.
3. **Explain the User Benefit in Your PR**:
   - Describe how your improvement saves developers time, clarifies a confusing UI/UX distinction, or makes exporting specifications into AI coding agents faster.

---

## 5. Step-by-Step: Adding a Visual Anatomy Case Study

Visual Anatomy Case Studies live in `src/data/anatomyData.ts` (`ANATOMY_TEMPLATES`) and `src/components/AnatomyInspectorView.tsx`.

1. Define a new `AnatomyTemplate` entry in `ANATOMY_TEMPLATES` containing **4 to 6 `AnatomyHotspot` items** (`pinNumber: '01'` through `'06'`).
2. Link each hotspot to an existing `linkedTermId` in `DESIGN_TERMS` and specify `zoneLabel`, `uxPurpose`, `spatialRule`, `vibeMistake`, and `agentPrompt`.
3. Render the interactive mockup in `src/components/AnatomyInspectorView.tsx` using `renderCalloutPin('01', '<hotspot-id>')` so users can click either the pin or the structural region container.

---

## 6. Pull Request Structure & Review Lifecycle

### Branch Naming
- `feat/term-<term-id>` — Adding a new everyday UI/UX concept and sandbox
- `feat/fui-<term-id>` — Adding a new Sci-Fi / Spatial / Futuristic UI concept
- `feat/ux-<short-name>` — Improving site convenience, exporters, quiz mode, or UI/UX polish
- `feat/anatomy-<template-id>` — Adding a new Visual Anatomy X-Ray blueprint
- `fix/<short-description>` — Fixing a bug, typo, or layout issue

### Pre-Submission Checklist
- [ ] `npm run lint` (`tsc --noEmit`) passes with zero TypeScript errors.
- [ ] `npm run build` succeeds cleanly.
- [ ] All interactive controls have working event handlers.
- [ ] Contrast meets WCAG AA (`>= 4.5:1`) and respects the Swiss Editorial 60-30-10 color budget.
