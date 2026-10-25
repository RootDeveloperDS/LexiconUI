## Summary of Contribution

<!-- Briefly describe what this Pull Request adds or improves (e.g., "Adds CSS Subgrid Alignment term and live interactive demo preview"). -->

### Contribution Track
- [ ] **Track 01 / 02**: New UI/UX or Sci-Fi FUI Concept (`src/data/termsData.ts`) + **Live Interactive Demo Preview (`src/components/InteractiveStage.tsx`)**
- [ ] **Track 03**: Upgraded Interactive Sandbox Demo / Physics (`src/components/InteractiveStage.tsx`)
- [ ] **Track 04 / 05**: Developer Convenience Exporter / Site UI/UX Enhancement / Quiz Mode
- [ ] **Track 06**: New Visual Anatomy X-Ray Blueprint (`src/data/anatomyData.ts` + `src/components/AnatomyInspectorView.tsx`)

---

## Quality & Editorial Rubric Verification (For New UI/UX Concepts)

Every new concept added to the LexiconUI Encyclopedia must include **both** its terminology specification AND an actual working **Live Interactive Demo Preview**:
- [ ] **1. Canonical Nomenclature**: Uses established industry-standard UI/UX or spatial FUI terminology.
- [ ] **2. Colloquial Vibe Phrases**: Includes `>= 3` realistic phrases that vibe coders or developers type when they forget the formal term.
- [ ] **3. High-Contrast Prompt Pair**: Includes both a realistic `badPromptExample` (vague fluff) and a concrete, copy-pasteable `goodPromptExample` (exact architectural spec).
- [ ] **4. Anatomical Breakdown**: Includes `2–4` named `anatomyParts` with CSS/Tailwind hints.
- [ ] **5. Canonical CSS & Tailwind Tokens**: Includes clean `cssSnippet` and `tailwindTokens`.
- [ ] **6. Live Interactive Demo Preview (`InteractiveStage.tsx`)**: Includes working `sandboxControls` and a real interactive visual simulation in `src/components/InteractiveStage.tsx` so users can see and manipulate the UI/UX design live.

---

## Technical Pre-Flight Checklist

- [ ] `npm run lint` (`tsc --noEmit`) passes with zero TypeScript errors.
- [ ] `npm run build` succeeds cleanly.
- [ ] Tested Blueprint Rulers (`On / Off`) and keyboard accessibility (`:focus-visible`).
