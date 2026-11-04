# LexiconUI Technical Architecture & Ontology Guide

This document explains how **LexiconUI** is architected under the hood so open-source contributors can confidently extend the 48-concept UI/UX ontology, add interactive sandboxes, or integrate the terminology dataset into external developer tools (VS Code / Cursor extensions, MCP servers, or CLI prompt generators).

---

## 1. High-Level System Architecture

```
┌────────────────────────────────────────────────────────────────────────────┐
│                        src/data/termsData.ts                               │
│  Canonical Ontology (DESIGN_TERMS: DesignTerm[] — 48 Live Concepts)        │
│  • Metadata (id, number, title, category, difficulty, alias)               │
│  • Prompt Engineering Pair (badPromptExample vs. goodPromptExample)        │
│  • Colloquial Synonym Graph (vibePhrases[])                                │
│  • Interactive Control Definitions (sandboxControls[])                     │
└───────────────┬─────────────────────────────┬──────────────────────────────┘
                │                             │
                ▼                             ▼
┌───────────────────────────────┐   ┌────────────────────────────────────────┐
│ src/components/               │   │ src/components/                        │
│ EncyclopediaView.tsx          │   │ PromptTranslatorView.tsx               │
│ ───────────────────────────── │   │ ────────────────────────────────────── │
│ • Two-Zone Split Layout       │   │ • Deterministic N-Gram & Substring     │
│ • Dynamic Control State Store │   │   Matcher (KEYWORD_SYNONYM_MAP)        │
│ • Live Prompt Interpolation   │   │ • Universal Guardrail Injector         │
│ • Renders <InteractiveStage/> │   │ • Structured Markdown Compiler         │
└───────────────────────────────┘   └────────────────────────────────────────┘
```

---

## 2. Core Data Contracts & Modules

### `DesignTerm` (`src/data/termsData.ts`)
Every UI/UX concept in LexiconUI is a strongly typed `DesignTerm` object. Because `DESIGN_TERMS` is a pure TypeScript array with zero runtime DOM dependencies, it can also be exported as a standalone JSON dataset or consumed by an **MCP (Model Context Protocol) server** to give AI agents direct access to canonical UI patterns.

Key fields:
- `id`: Kebab-case unique slug (e.g., `'bento-grid'`, `'css-subgrid'`, `'slash-command-menu'`).
- `category`: `'layout' | 'navigation' | 'typography' | 'motion' | 'futuristic'`.
- `vibePhrases`: Colloquial descriptions used by the global `Cmd+K` search and the Vibe-to-Spec Translator.
- `sandboxControls`: Declarative array of `'slider'` or `'select'` controls. `EncyclopediaView` automatically renders the control UI and passes the active key-value map (`controlValues`) to `<InteractiveStage />`.

### `AnatomyTemplate` (`src/data/anatomyData.ts`)
Powers the **Visual Anatomy X-Ray Inspector** (`src/components/AnatomyInspectorView.tsx`). Each template defines a realistic domain interface (*SaaS Console*, *Editorial Landing Page*, *E-Commerce Studio*, *Sci-Fi Tactical HUD*) and an array of `AnatomyHotspot` pins (`01`–`06`), each linked via `linkedTermId` to a canonical `DesignTerm`.

### `IntroTour` (`src/components/IntroTour.tsx`)
Provides a 5-step programmatic guided tour for first-time visitors (persisted via `localStorage` under `lexicon_ui_intro_tour_seen_v1`) and on-demand replay. Each step highlights the corresponding tool card in the 5-tool workspace deck and switches the active workspace view live.

### `ContributorStudioView` (`src/components/ContributorStudioView.tsx`)
Powers Tool 05 (**Blueprints & UI Quiz**), containing 5 multi-pattern full-page architectural blueprints, a 5-question interactive *"Name That UI!"* flashcard quiz, and direct GitHub repository links.

---

## 3. Design System & Anti-Slop Invariants

LexiconUI itself practices every principle it teaches:
1. **Swiss Editorial 60-30-10 Palette**:
   - `60%` Crisp Paper Canvas (`#F8FAFC`)
   - `30%` Pure White Structural Surfaces (`#FFFFFF`), `1px` Slate Hairlines (`#E2E8F0`), and Carbon Ink (`#0F172A`)
   - `10%` High-Intent Semantic Accents: Klein Blue (`#0284C7`) for interactive focus and Swiss Vermilion (`#DC2626`) for X-Ray pins.
2. **The 2+1 Typography Rule**:
   - Display: `Bricolage Grotesque`
   - Body & UI: `Plus Jakarta Sans`
   - Code, Rulers & Tabular Metrics: `JetBrains Mono` (`tabular-nums`)
3. **Zero External Runtime Dependencies**:
   - No fragile external image URLs or required API keys—100% self-contained React + Tailwind CSS + SVG/CSS geometry.
