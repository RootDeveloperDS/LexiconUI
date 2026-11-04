import React, { useState } from 'react';
import { DESIGN_TERMS, TermCategory } from '../data/termsData';
import { LexiconLogo } from './LexiconLogo';
import {
  Copy,
  Check,
  CheckCircle2,
  Code2,
  Plus,
  ArrowUpRight,
  RotateCcw,
  Github,
  Layers,
  HelpCircle,
} from 'lucide-react';

interface ContributorStudioViewProps {
  onCopyFeedback: (label: string) => void;
  onJumpToTerm?: (termId: string) => void;
  onAddMultipleToCart?: (termIds: string[]) => void;
  specCartIds?: string[];
}

interface PageBlueprintPreset {
  id: string;
  number: string;
  title: string;
  domain: string;
  category: TermCategory;
  summary: string;
  includedTermIds: string[];
  compiledAgentPrompt: string;
  structuralCodeSnippet: string;
}

interface QuizQuestion {
  id: string;
  everydayClue: string;
  contextHint: string;
  correctTermId: string;
  options: {
    termId: string;
    label: string;
  }[];
  explanation: string;
}

const PAGE_BLUEPRINTS: PageBlueprintPreset[] = [
  {
    id: 'blueprint-saas-workspace',
    number: '01',
    title: 'B2B SaaS Command & Triage Workspace',
    domain: 'Enterprise Dashboard · Linear / Raycast Architecture',
    category: 'navigation',
    summary:
      'Combines a viewport-locked App Shell with a Cmd+K Command Palette, Slide-Over Detail Drawer, and Geometry-Matched Skeleton Loaders for zero-layout-shift data triage.',
    includedTermIds: [
      'app-shell',
      'command-palette',
      'slide-over-drawer',
      'skeleton-loader',
      'tabular-numerals',
    ],
    compiledAgentPrompt:
      'Build a B2B SaaS Command Workspace using a Viewport-Locked App Shell (`h-screen overflow-hidden grid grid-cols-[240px_1fr]`). Include a global Cmd+K Command Palette (`role="dialog" max-w-xl top-[15vh]`) for keyboard navigation, a Right-Anchored Slide-Over Drawer (`w-full max-w-md border-l`) for inspecting table rows without losing scroll context, Geometry-Matched Skeleton Loaders (`animate-pulse`) during data fetches, and `tabular-nums` on all metric columns.',
    structuralCodeSnippet: `<div className="h-screen w-screen overflow-hidden grid grid-cols-[240px_1fr] bg-slate-50">
  <aside className="border-r border-slate-200 bg-white p-4 flex flex-col justify-between">
    <nav className="space-y-1">{/* Fixed Left Navigation Rail */}</nav>
  </aside>
  <div className="flex flex-col min-w-0 overflow-hidden">
    <header className="h-14 border-b border-slate-200 bg-white px-6 flex items-center justify-between shrink-0">
      <h1 className="font-display text-sm font-bold text-slate-900">Workspace Triage</h1>
      <kbd className="px-2 py-1 text-xs font-mono bg-slate-100 rounded border">⌘K</kbd>
    </header>
    <main className="flex-1 overflow-y-auto p-6 tabular-nums">
      {/* Scrollable Data Canvas + Right Slide-Over Drawer */}
    </main>
  </div>
</div>`,
  },
  {
    id: 'blueprint-product-landing',
    number: '02',
    title: 'High-Converting Product Launch Landing Page',
    domain: 'Marketing & SaaS Launch · Apple / Stripe Architecture',
    category: 'layout',
    summary:
      'Pairs an Asymmetric 7:5 Split-Screen Hero with a 3-Column Bento Grid, CSS Subgrid Pricing Cards, and a Magnetic Primary CTA button.',
    includedTermIds: [
      'split-screen-hero',
      'bento-grid',
      'css-subgrid',
      'magnetic-cursor-target',
      'nested-radius',
    ],
    compiledAgentPrompt:
      'Architect a Product Launch Page starting with a 12-column Asymmetric Split-Screen Hero (`grid-cols-1 lg:grid-cols-12 gap-8 items-stretch`, 7 cols value proposition on left, 5 cols interactive preview on right) with a Magnetic Cursor Target on the primary CTA. Follow with a 3-column Bento Grid (`grid-cols-3 auto-rows-[220px] gap-4`) using Concentric Border Radius math (`r_inner = r_outer - padding`), and a 3-tier pricing section using CSS Subgrid (`row-span-3 grid-rows-subgrid`) so card headers, descriptions, and CTA buttons align horizontally.',
    structuralCodeSnippet: `<main className="max-w-7xl mx-auto px-6 py-12 space-y-20">
  {/* 1. Asymmetric 7:5 Split-Screen Hero */}
  <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
    <div className="lg:col-span-7 flex flex-col justify-between space-y-6">{/* Copy + Magnetic CTA */}</div>
    <div className="lg:col-span-5 rounded-2xl bg-slate-900 p-5">{/* Live Product Stage */}</div>
  </section>

  {/* 2. 3-Column CSS Subgrid Pricing Row */}
  <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {tiers.map((tier) => (
      <article key={tier.id} className="row-span-3 grid grid-rows-subgrid gap-4 p-6 rounded-2xl border border-slate-200 bg-white">
        <h3 className="font-display font-bold text-slate-900">{tier.name}</h3>
        <p className="text-xs text-slate-600">{tier.summary}</p>
        <button className="w-full py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold">Select</button>
      </article>
    ))}
  </section>
</main>`,
  },
  {
    id: 'blueprint-docs-editor',
    number: '03',
    title: 'Collaborative Docs & Rich-Text Knowledge Base',
    domain: 'Documentation & Note Editor · Notion / Mintlify Architecture',
    category: 'typography',
    summary:
      'Combines Optimal Reading Measure (65ch), a Sticky Scroll-Spy Table of Contents Rail, an Inline Slash Command Menu (/), and a Docked PiP Video Walkthrough.',
    includedTermIds: [
      'reading-measure',
      'sticky-rail',
      'slash-command-menu',
      'pip-mini-player',
      'breadcrumb-trail',
    ],
    compiledAgentPrompt:
      'Build a Documentation & Editor layout with a Breadcrumb Trail header, a central prose column constrained to Optimal Reading Measure (`max-w-[65ch] leading-relaxed`), and a Sticky Scroll-Spy Rail (`sticky top-24 self-start`) highlighting the active section. Inside the editor canvas, support an Inline Slash Command Menu (`/`) anchored to the text caret, and dock tutorial videos into a bottom-right Picture-in-Picture (PiP) Mini-Player (`fixed bottom-5 right-5 w-72 aspect-video`) when scrolling.',
    structuralCodeSnippet: `<div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
  <article className="lg:col-span-8 max-w-[65ch] space-y-6 leading-relaxed">
    {/* Breadcrumb Trail + 65ch Prose + Caret Slash Command Menu */}
  </article>
  <aside className="lg:col-span-4 sticky top-24 self-start border-l border-slate-200 pl-5 space-y-2">
    {/* Scroll-Spy Table of Contents Rail */}
  </aside>
</div>`,
  },
  {
    id: 'blueprint-fintech-auth',
    number: '04',
    title: 'Frictionless Auth, 2FA Verification & Onboarding Flow',
    domain: 'Security & Onboarding · Stripe / Linear Auth Architecture',
    category: 'navigation',
    summary:
      'Combines a Multi-Step Progress Stepper, Segmented 6-Digit OTP Input with clipboard autofill, Accessible Focus Rings, and a Spotlight Coachmark Tour.',
    includedTermIds: [
      'segmented-otp-input',
      'progress-stepper',
      'focus-ring',
      'spotlight-tour',
      'optimistic-ui',
    ],
    compiledAgentPrompt:
      'Design a 3-step Authentication & Onboarding flow tracked by a Multi-Step Progress Stepper. On the verification step, render a 6-digit Segmented OTP Input (`inputMode="numeric" autoComplete="one-time-code" tabular-nums`) with auto-advancing focus and full clipboard paste distribution. Ensure WCAG AA `:focus-visible` rings (`focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2`) and launch a non-blocking Coachmark Tour on first workspace entry.',
    structuralCodeSnippet: `<section className="max-w-md mx-auto p-6 rounded-2xl border border-slate-200 bg-white space-y-6">
  <header className="space-y-1 text-center">
    <h2 className="font-display text-lg font-bold text-slate-900">Verify Your Security Code</h2>
    <p className="text-xs text-slate-500">Enter the 6-digit code sent to your device</p>
  </header>
  <div role="group" aria-label="6-Digit Verification Code" className="flex justify-center gap-2">
    {[0, 1, 2, 3, 4, 5].map((slot) => (
      <input
        key={slot}
        type="text"
        inputMode="numeric"
        maxLength={1}
        autoComplete={slot === 0 ? 'one-time-code' : 'off'}
        className="w-11 h-12 text-center font-mono text-lg font-bold tabular-nums rounded-xl border border-slate-300 focus-visible:ring-2 focus-visible:ring-sky-600"
      />
    ))}
  </div>
</section>`,
  },
  {
    id: 'blueprint-spatial-fui',
    number: '05',
    title: 'Sci-Fi Telemetry HUD & Node-Graph Workflow Studio',
    domain: 'Spatial Computing & AI Agent DAGs · ComfyUI / VisionOS Architecture',
    category: 'futuristic',
    summary:
      'Combines a Dot-Matrix Node-Graph Patch Canvas with Cubic-Bezier splines, an Isometric 3D Exploded Layer Stack, Chamfered HUD Reticles, and VisionOS Spatial Glass.',
    includedTermIds: [
      'node-graph-canvas',
      'isometric-layer-stack',
      'hud-reticle-frame',
      'visionos-spatial-glass',
      'radial-pie-menu',
    ],
    compiledAgentPrompt:
      'Build a Spatial Workflow & Telemetry Studio over a dot-matrix infinite canvas (`bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]`). Render Node Cards connected by SVG Cubic-Bezier splines (`M x1 y1 C cx1 cy1, cx2 cy2, x2 y2`), a floating VisionOS Spatial Glass inspector (`backdrop-blur-2xl bg-white/10 border border-white/25`), an Isometric 3D Exploded Layer Stack (`[transform-style:preserve-3d] [transform:rotateX(55deg)_rotateZ(-45deg)]`), and Chamfered 45° HUD Corner Reticles.',
    structuralCodeSnippet: `<div className="relative min-h-[480px] rounded-2xl bg-slate-950 text-cyan-200 p-6 overflow-hidden bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]">
  {/* Underlying SVG Cubic-Bezier Connector Layer */}
  <svg className="absolute inset-0 w-full h-full pointer-events-none">
    <path d="M 180 120 C 260 120, 260 220, 340 220" stroke="#38bdf8" strokeWidth="2" fill="none" />
  </svg>
  {/* Floating VisionOS Spatial Glass Inspector */}
  <aside className="relative z-10 w-80 rounded-2xl backdrop-blur-2xl bg-white/10 border border-white/20 p-4 shadow-2xl">
    <div className="font-mono text-xs text-cyan-300">SPATIAL NODE TELEMETRY</div>
  </aside>
</div>`,
  },
];

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    everydayClue:
      '"I have 3 pricing cards in a row. The middle card has a longer description, which pushes its button down so the 3 buttons don’t line up horizontally."',
    contextHint: 'Layout & Spatial Systems · Term #43',
    correctTermId: 'css-subgrid',
    options: [
      { termId: 'css-subgrid', label: 'CSS Subgrid Cross-Card Alignment (grid-rows-subgrid)' },
      { termId: 'masonry-waterfall', label: 'Masonry Waterfall Layout' },
      { termId: 'scroll-snap-carousel', label: 'CSS Scroll-Snap Carousel' },
    ],
    explanation:
      'Setting `row-span-3 grid grid-rows-subgrid` on each child card locks card headers, variable-length body copy, and bottom CTA footers onto shared horizontal row tracks across the parent grid.',
  },
  {
    id: 'q2',
    everydayClue:
      '"What is the exact name for the 3 vertical dots menu inside a table row vs. the 9-dot square app switcher in the top corner?"',
    contextHint: 'Navigation & Everyday Components · Term #28',
    correctTermId: 'iconic-menu-taxonomy',
    options: [
      { termId: 'iconic-menu-taxonomy', label: 'Kebab Menu (3 vertical dots) & Bento/Waffle Launcher (3x3 grid)' },
      { termId: 'breadcrumb-trail', label: 'Breadcrumb Hierarchy Trail' },
      { termId: 'mega-menu-popover', label: 'Multi-Column Mega-Menu' },
    ],
    explanation:
      '3 vertical dots is a Kebab Menu (`MoreVertical`), 3 horizontal dots is a Meatballs Menu (`MoreHorizontal`), and the 3x3 square grid is a Bento or Waffle App Launcher.',
  },
  {
    id: 'q3',
    everydayClue:
      '"When the user types a forward slash (/) in the note editor, show a small floating menu right below their text cursor to insert a Heading or Code Block."',
    contextHint: 'Navigation & Everyday Components · Term #44',
    correctTermId: 'slash-command-menu',
    options: [
      { termId: 'slash-command-menu', label: 'Inline Slash Command Menu (Caret-Anchored Listbox)' },
      { termId: 'accordion-disclosure', label: 'Vertical Accordion Disclosure' },
      { termId: 'bottom-sheet', label: 'Mobile Bottom Sheet' },
    ],
    explanation:
      'An Inline Slash Command Menu anchors a keyboard-navigable `role="listbox"` popover directly to the active text caret coordinates when `/` is typed.',
  },
  {
    id: 'q4',
    everydayClue:
      '"When someone clicks a row in my table, I don’t want a jarring center popup—I want a detail panel to slide in smoothly from the right edge of the screen."',
    contextHint: 'Navigation & Everyday Components · Term #12',
    correctTermId: 'slide-over-drawer',
    options: [
      { termId: 'slide-over-drawer', label: 'Slide-Over Drawer (Right-Anchored Off-Canvas Sheet)' },
      { termId: 'overlay-taxonomy', label: 'Corner Toast / Snackbar Banner' },
      { termId: 'floating-action-button', label: 'Floating Action Button (FAB)' },
    ],
    explanation:
      'A Right-Anchored Slide-Over Drawer (`fixed inset-y-0 right-0 max-w-md`) lets users inspect or edit a record while preserving their underlying table context.',
  },
  {
    id: 'q5',
    everydayClue:
      '"Instead of one plain number box for a 2FA code, give me 6 separate digit boxes that automatically jump to the next box as you type and support pasting."',
    contextHint: 'Navigation & Everyday Components · Term #46',
    correctTermId: 'segmented-otp-input',
    options: [
      { termId: 'segmented-otp-input', label: 'Segmented OTP / 2FA Auto-Advance Input' },
      { termId: 'segmented-control', label: 'Segmented Control Pill Bar' },
      { termId: 'filter-chip-bar', label: 'Interactive Filter Chip Bar' },
    ],
    explanation:
      'A Segmented OTP Input renders 6 `maxLength={1}` `tabular-nums` inputs with `autoComplete="one-time-code"`, auto-advancing focus on digit entry and distributing pasted strings.',
  },
];

export const ContributorStudioView: React.FC<ContributorStudioViewProps> = ({
  onCopyFeedback,
  onJumpToTerm,
  onAddMultipleToCart,
}) => {
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<string>(PAGE_BLUEPRINTS[0].id);
  const [copiedBlueprintId, setCopiedBlueprintId] = useState<string | null>(null);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  // Interactive Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});

  const activeBlueprint =
    PAGE_BLUEPRINTS.find((b) => b.id === selectedBlueprintId) || PAGE_BLUEPRINTS[0];

  const handleCopyBlueprintPrompt = (blueprint: PageBlueprintPreset) => {
    navigator.clipboard.writeText(blueprint.compiledAgentPrompt);
    setCopiedBlueprintId(blueprint.id);
    onCopyFeedback(`Copied "${blueprint.title}" Full-Page AI Prompt`);
    setTimeout(() => setCopiedBlueprintId(null), 1800);
  };

  const handleCopyBlueprintCode = (blueprint: PageBlueprintPreset) => {
    navigator.clipboard.writeText(blueprint.structuralCodeSnippet);
    setCopiedCodeId(blueprint.id);
    onCopyFeedback(`Copied "${blueprint.title}" React/Tailwind layout skeleton`);
    setTimeout(() => setCopiedCodeId(null), 1800);
  };

  const correctQuizCount = QUIZ_QUESTIONS.filter(
    (q) => quizAnswers[q.id] === q.correctTermId
  ).length;

  return (
    <div className="space-y-6 sm:space-y-10">
      {/* =====================================================================
          1. FULL-PAGE STARTER BLUEPRINTS (COMBINING MULTIPLE UI/UX PATTERNS)
      ===================================================================== */}
      <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
        <div className="p-4 sm:p-6 border-b border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-sky-700 font-semibold">
              <Layers className="w-4 h-4" />
              <span>MULTI-PATTERN FULL-PAGE BLUEPRINTS · READY TO PASTE</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Copy complete application architectures combining multiple UI/UX patterns
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
              Need more than a single component? Pick a full-page blueprint below to see how{' '}
              <strong className="text-slate-900">4 to 5 Encyclopedia patterns work together</strong>{' '}
              in a real production layout—complete with a unified AI system prompt and structural
              React + Tailwind code.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {onAddMultipleToCart && (
              <button
                type="button"
                onClick={() => onAddMultipleToCart(activeBlueprint.includedTermIds)}
                className="min-h-[42px] px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-2xs whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>
                  Add All {activeBlueprint.includedTermIds.length} Patterns to Spec Sheet
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Blueprint Selector Strip */}
        <div className="p-3 sm:p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {PAGE_BLUEPRINTS.map((bp) => {
            const isSelected = bp.id === activeBlueprint.id;
            return (
              <button
                key={bp.id}
                type="button"
                onClick={() => setSelectedBlueprintId(bp.id)}
                className={`min-h-[42px] px-3.5 py-2 rounded-xl border text-left transition-all shrink-0 flex items-center gap-2 ${
                  isSelected
                    ? 'bg-slate-900 border-slate-900 text-white font-semibold shadow-2xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400'
                }`}
              >
                <span
                  className={`font-mono text-xs ${
                    isSelected ? 'text-sky-400' : 'text-sky-700'
                  }`}
                >
                  {bp.number}.
                </span>
                <span className="text-xs sm:text-sm whitespace-nowrap">{bp.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Blueprint Detail Split View */}
        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left 6 Cols: Blueprint Breakdown & Included Encyclopedia Patterns */}
          <div className="lg:col-span-6 space-y-5">
            <div className="space-y-1.5">
              <div className="text-xs font-mono text-sky-700 font-semibold">
                BLUEPRINT {activeBlueprint.number} · {activeBlueprint.domain}
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900">
                {activeBlueprint.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeBlueprint.summary}
              </p>
            </div>

            {/* Included Encyclopedia Concepts (Clickable to jump directly to Live Sandbox) */}
            <div className="space-y-2.5">
              <div className="text-xs font-mono font-semibold text-slate-600">
                INCLUDED ENCYCLOPEDIA CONCEPTS (CLICK ANY PATTERN TO TEST ITS LIVE DEMO):
              </div>
              <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50">
                {activeBlueprint.includedTermIds.map((termId) => {
                  const term = DESIGN_TERMS.find((t) => t.id === termId);
                  if (!term) return null;
                  return (
                    <div
                      key={term.id}
                      className="p-3 bg-white hover:bg-slate-50 transition-colors flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-sky-700 tabular-nums">
                            {term.number}.
                          </span>
                          <span className="font-display text-xs sm:text-sm font-bold text-slate-900 truncate">
                            {term.title}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 truncate mt-0.5">
                          {term.pronunciationOrAlias}
                        </div>
                      </div>

                      {onJumpToTerm && (
                        <button
                          type="button"
                          onClick={() => onJumpToTerm(term.id)}
                          className="min-h-[34px] px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-900 text-slate-800 hover:text-white text-xs font-semibold inline-flex items-center gap-1 shrink-0 transition-colors"
                        >
                          <span>Live Demo</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right 6 Cols: Copyable Full-Page AI Prompt + Structural React/Tailwind Skeleton */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-4 rounded-2xl border-2 border-emerald-500/80 bg-emerald-50/20 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>COMBINED FULL-PAGE AI PROMPT</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyBlueprintPrompt(activeBlueprint)}
                  className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap"
                >
                  {copiedBlueprintId === activeBlueprint.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied Blueprint Prompt!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Full-Page Prompt</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs font-mono text-slate-900 bg-white p-3.5 rounded-xl border border-emerald-200 leading-relaxed">
                {activeBlueprint.compiledAgentPrompt}
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-900 text-slate-100 space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs font-mono text-sky-400 font-semibold">
                  <Code2 className="w-4 h-4 shrink-0" />
                  <span>STRUCTURAL REACT + TAILWIND SKELETON</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyBlueprintCode(activeBlueprint)}
                  className="min-h-[34px] px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 inline-flex items-center gap-1.5 transition-colors"
                >
                  {copiedCodeId === activeBlueprint.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied TSX!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-sky-400" />
                      <span>Copy TSX</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="text-[11px] font-mono text-sky-100 overflow-x-auto leading-relaxed">
                <code>{activeBlueprint.structuralCodeSnippet}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. INTERACTIVE "NAME THAT UI!" FLASHCARD SELF-TEST (5 REAL QUESTIONS)
      ===================================================================== */}
      <section className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 space-y-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-700 font-semibold">
              <HelpCircle className="w-4 h-4" />
              <span>INTERACTIVE UI VOCABULARY CHECK · &ldquo;NAME THAT UI!&rdquo;</span>
            </div>
            <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900">
              Test yourself: Can you match these 5 everyday descriptions to their exact UI term?
            </h3>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <span className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 font-mono text-xs font-bold text-slate-900 tabular-nums">
              Score: {correctQuizCount} / {QUIZ_QUESTIONS.length}
            </span>
            {Object.keys(quizAnswers).length > 0 && (
              <button
                type="button"
                onClick={() => setQuizAnswers({})}
                className="min-h-[36px] px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-600 hover:text-slate-900 inline-flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Quiz</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {QUIZ_QUESTIONS.map((q, idx) => {
            const picked = quizAnswers[q.id];
            const isCorrect = picked === q.correctTermId;

            return (
              <div
                key={q.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between gap-3.5"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>QUESTION 0{idx + 1}</span>
                    <span>{q.contextHint}</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-slate-900 italic leading-relaxed">
                    {q.everydayClue}
                  </p>
                </div>

                <div className="space-y-1.5">
                  {q.options.map((opt) => {
                    const isThisPicked = picked === opt.termId;
                    const isThisRight = opt.termId === q.correctTermId;

                    let btnStyle =
                      'bg-white border-slate-200 text-slate-800 hover:border-slate-400';
                    if (picked) {
                      if (isThisRight) {
                        btnStyle =
                          'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold';
                      } else if (isThisPicked) {
                        btnStyle = 'bg-amber-50 border-amber-400 text-amber-950';
                      } else {
                        btnStyle = 'bg-white/60 border-slate-200 text-slate-400';
                      }
                    }

                    return (
                      <button
                        key={opt.termId}
                        type="button"
                        onClick={() =>
                          setQuizAnswers((prev) => ({ ...prev, [q.id]: opt.termId }))
                        }
                        className={`w-full min-h-[38px] px-3 py-2 rounded-lg border text-left text-xs transition-all flex items-center justify-between gap-2 ${btnStyle}`}
                      >
                        <span>{opt.label}</span>
                        {picked && isThisRight && (
                          <span className="font-mono text-[10px] text-emerald-700 font-bold shrink-0">
                            ✓ EXACT TERM
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {picked && (
                  <div
                    className={`p-3 rounded-lg text-xs space-y-2 border ${
                      isCorrect
                        ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                        : 'bg-amber-50/70 border-amber-200 text-amber-950'
                    }`}
                  >
                    <p className="leading-relaxed">
                      <strong>{isCorrect ? 'Spot on!' : 'Good try:'}</strong> {q.explanation}
                    </p>
                    {onJumpToTerm && (
                      <button
                        type="button"
                        onClick={() => onJumpToTerm(q.correctTermId)}
                        className="font-mono text-[11px] font-bold text-sky-700 hover:underline inline-flex items-center gap-1"
                      >
                        <span>Open Term in Live UI Sandbox</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          3. GENUINE OPEN-SOURCE REPOSITORY & CONTRIBUTION LINKS
      ===================================================================== */}
      <section className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5 shadow-2xs">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-sky-700 font-semibold">
            <LexiconLogo size={16} />
            <span>OPEN-SOURCE PROJECT · MIT LICENSE</span>
          </div>
          <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900">
            Built openly on GitHub at RootDeveloperDS/LexiconUI
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            LexiconUI is an open-source visual dictionary created by{' '}
            <strong className="text-slate-900">Devansh Sharma</strong>. Have an idea for Concept
            #49, spotted a bug, or want to star the repository? Everything happens directly on our
            GitHub repository—no complicated forms needed.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <a
            href="https://github.com/RootDeveloperDS/LexiconUI"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[42px] px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold inline-flex items-center gap-2 transition-colors whitespace-nowrap"
          >
            <Github className="w-4 h-4 text-sky-400" />
            <span>View on GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
          </a>

          <a
            href="https://github.com/RootDeveloperDS/LexiconUI/issues/new/choose"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[42px] px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap"
          >
            <span>Suggest a UI Term / Issue</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
          </a>
        </div>
      </section>
    </div>
  );
};
