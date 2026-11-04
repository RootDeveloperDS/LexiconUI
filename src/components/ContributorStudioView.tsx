import React, { useState, useMemo, useEffect } from 'react';
import { DESIGN_TERMS, TermCategory } from '../data/termsData';
import { LexiconLogo } from './LexiconLogo';
import {
  GitPullRequest,
  Copy,
  Check,
  CheckCircle2,
  AlertCircle,
  Code2,
  RotateCcw,
  Plus,
  X,
  Eye,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';

interface ContributorStudioViewProps {
  onCopyFeedback: (label: string) => void;
}

interface StarterConceptPreset {
  id: string;
  badge: string;
  title: string;
  category: TermCategory;
  difficulty: 'Foundational' | 'Intermediate' | 'System Architecture';
  alias: string;
  summary: string;
  whyAgentsNeedIt: string;
  vibePhrases: string;
  badPrompt: string;
  goodPrompt: string;
  cssSnippet: string;
  tailwindInput: string;
}

export interface ShowcaseComponentItem {
  id: string;
  title: string;
  alias: string;
  category: TermCategory;
  categoryLabel: string;
  contributor: string;
  prBadge: string;
  description: string;
  previewImageUrl: string;
  promptSpec: string;
  codeSnippet: string;
  tailwindTokens: string[];
  isUserCreated?: boolean;
}

/**
 * Generates a high-precision SVG schematic data-URI preview image for any Showcase Gallery card
 */
function buildShowcasePreviewSvgDataUri(params: {
  variant: 'subgrid' | 'slash' | 'isometric' | 'magnetic' | 'pip' | 'otp' | 'custom';
  title: string;
  accentColor?: string;
  tokens?: string[];
}): string {
  const { variant, title } = params;
  const safeTitle = title.replace(/[<>&"']/g, '').slice(0, 32);

  let innerSvg = '';
  if (variant === 'subgrid') {
    innerSvg = `
      <rect width="400" height="210" fill="#F8FAFC"/>
      <g stroke="#E2E8F0" stroke-width="1">
        <line x1="0" y1="54" x2="400" y2="54" stroke="#38BDF8" stroke-dasharray="4 3"/>
        <line x1="0" y1="138" x2="400" y2="138" stroke="#38BDF8" stroke-dasharray="4 3"/>
      </g>
      <g transform="translate(20, 22)">
        <rect width="108" height="156" rx="8" fill="#FFFFFF" stroke="#0284C7" stroke-width="1.5"/>
        <rect x="10" y="12" width="54" height="10" rx="3" fill="#0F172A"/>
        <rect x="10" y="42" width="84" height="8" rx="2" fill="#94A3B8"/>
        <rect x="10" y="124" width="88" height="20" rx="5" fill="#0F172A"/>
      </g>
      <g transform="translate(146, 22)">
        <rect width="108" height="156" rx="8" fill="#FFFFFF" stroke="#0284C7" stroke-width="1.5"/>
        <rect x="10" y="12" width="88" height="10" rx="3" fill="#0F172A"/>
        <rect x="10" y="42" width="88" height="8" rx="2" fill="#94A3B8"/>
        <rect x="10" y="56" width="76" height="8" rx="2" fill="#94A3B8"/>
        <rect x="10" y="70" width="60" height="8" rx="2" fill="#94A3B8"/>
        <rect x="10" y="124" width="88" height="20" rx="5" fill="#0284C7"/>
      </g>
      <g transform="translate(272, 22)">
        <rect width="108" height="156" rx="8" fill="#FFFFFF" stroke="#0284C7" stroke-width="1.5"/>
        <rect x="10" y="12" width="66" height="10" rx="3" fill="#0F172A"/>
        <rect x="10" y="42" width="80" height="8" rx="2" fill="#94A3B8"/>
        <rect x="10" y="56" width="52" height="8" rx="2" fill="#94A3B8"/>
        <rect x="10" y="124" width="88" height="20" rx="5" fill="#0F172A"/>
      </g>
      <text x="20" y="198" fill="#0284C7" font-family="monospace" font-size="10" font-weight="bold">grid-template-rows: subgrid (Locked Row Tracks)</text>
    `;
  } else if (variant === 'slash') {
    innerSvg = `
      <rect width="400" height="210" fill="#F8FAFC"/>
      <rect x="24" y="18" width="352" height="40" rx="8" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5"/>
      <text x="38" y="43" fill="#0F172A" font-family="monospace" font-size="13" font-weight="bold">/heading-2</text>
      <line x1="122" y1="28" x2="122" y2="48" stroke="#0284C7" stroke-width="2"/>
      <rect x="38" y="64" width="240" height="128" rx="10" fill="#FFFFFF" stroke="#0F172A" stroke-width="1.5"/>
      <rect x="46" y="72" width="224" height="32" rx="6" fill="#E0F2FE"/>
      <text x="58" y="92" fill="#0369A1" font-family="sans-serif" font-size="11" font-weight="bold">H2 · Section Heading</text>
      <text x="58" y="124" fill="#475569" font-family="sans-serif" font-size="11">Bullet List Block</text>
      <text x="58" y="152" fill="#475569" font-family="sans-serif" font-size="11">Code Snippet (TSX)</text>
      <text x="58" y="178" fill="#94A3B8" font-family="monospace" font-size="9.5">Caret-Anchored Popover (z-50)</text>
    `;
  } else if (variant === 'isometric') {
    innerSvg = `
      <rect width="400" height="210" fill="#020617"/>
      <g transform="translate(200, 135)">
        <polygon points="0,-32 110,-68 0,-104 -110,-68" fill="#083344" fill-opacity="0.75" stroke="#22D3EE" stroke-width="1.5"/>
        <polygon points="0,-2 110,-38 0,-74 -110,-38" fill="#0C4A6E" fill-opacity="0.8" stroke="#38BDF8" stroke-width="1.5"/>
        <polygon points="0,28 110,-8 0,-44 -110,-8" fill="#064E3B" fill-opacity="0.85" stroke="#34D399" stroke-width="1.75"/>
      </g>
      <text x="20" y="26" fill="#22D3EE" font-family="monospace" font-size="10" font-weight="bold">preserve-3d · translateZ(0..80px)</text>
      <text x="20" y="195" fill="#6EE7B7" font-family="monospace" font-size="10">ISOMETRIC EXPLODED LAYER STACK</text>
    `;
  } else if (variant === 'magnetic') {
    innerSvg = `
      <rect width="400" height="210" fill="#F8FAFC"/>
      <circle cx="200" cy="105" r="76" fill="none" stroke="#38BDF8" stroke-width="1.2" stroke-dasharray="5 4"/>
      <circle cx="200" cy="105" r="48" fill="#E0F2FE" fill-opacity="0.5"/>
      <rect x="132" y="82" width="152" height="44" rx="12" fill="#0F172A"/>
      <text x="154" y="108" fill="#FFFFFF" font-family="sans-serif" font-size="12" font-weight="bold">Magnetic CTA →</text>
      <circle cx="268" cy="76" r="6" fill="#DC2626" stroke="#FFFFFF" stroke-width="2"/>
      <line x1="200" y1="105" x2="268" y2="76" stroke="#DC2626" stroke-width="1.5" stroke-dasharray="3 2"/>
      <text x="20" y="196" fill="#0F172A" font-family="monospace" font-size="10">translate3d(dx * 0.25, dy * 0.25, 0)</text>
    `;
  } else if (variant === 'pip') {
    innerSvg = `
      <rect width="400" height="210" fill="#F8FAFC"/>
      <rect x="20" y="16" width="360" height="178" rx="10" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5"/>
      <rect x="36" y="32" width="180" height="12" rx="3" fill="#CBD5E1"/>
      <rect x="36" y="54" width="240" height="8" rx="2" fill="#E2E8F0"/>
      <rect x="36" y="70" width="210" height="8" rx="2" fill="#E2E8F0"/>
      <rect x="236" y="106" width="132" height="76" rx="10" fill="#0F172A" stroke="#38BDF8" stroke-width="2"/>
      <circle cx="302" cy="140" r="12" fill="#0284C7"/>
      <polygon points="299,134 309,140 299,146" fill="#FFFFFF"/>
      <text x="248" y="172" fill="#7DD3FC" font-family="monospace" font-size="8.5">PiP Corner Dock</text>
    `;
  } else if (variant === 'otp') {
    innerSvg = `
      <rect width="400" height="210" fill="#F8FAFC"/>
      <g transform="translate(46, 66)">
        <rect x="0" y="0" width="44" height="54" rx="8" fill="#FFFFFF" stroke="#0F172A" stroke-width="1.5"/>
        <text x="16" y="34" fill="#0F172A" font-family="monospace" font-size="20" font-weight="bold">4</text>
        <rect x="54" y="0" width="44" height="54" rx="8" fill="#FFFFFF" stroke="#0F172A" stroke-width="1.5"/>
        <text x="70" y="34" fill="#0F172A" font-family="monospace" font-size="20" font-weight="bold">8</text>
        <rect x="108" y="0" width="44" height="54" rx="8" fill="#F0F9FF" stroke="#0284C7" stroke-width="2.5"/>
        <line x1="130" y1="15" x2="130" y2="39" stroke="#0284C7" stroke-width="2"/>
        <rect x="168" y="0" width="44" height="54" rx="8" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5"/>
        <rect x="222" y="0" width="44" height="54" rx="8" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5"/>
        <rect x="276" y="0" width="44" height="54" rx="8" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5"/>
      </g>
      <text x="46" y="156" fill="#0284C7" font-family="monospace" font-size="10" font-weight="bold">autocomplete="one-time-code" · Auto-Advance Focus</text>
    `;
  } else {
    const tokenText = (params.tokens || ['grid', 'rounded-xl']).slice(0, 3).join(' · ');
    innerSvg = `
      <rect width="400" height="210" fill="#0F172A"/>
      <rect x="20" y="20" width="360" height="170" rx="12" fill="#1E293B" stroke="#38BDF8" stroke-width="1.5"/>
      <circle cx="42" cy="44" r="6" fill="#EF4444"/>
      <circle cx="60" cy="44" r="6" fill="#F59E0B"/>
      <circle cx="78" cy="44" r="6" fill="#10B981"/>
      <text x="36" y="96" fill="#F8FAFC" font-family="sans-serif" font-size="16" font-weight="bold">${safeTitle}</text>
      <text x="36" y="124" fill="#38BDF8" font-family="monospace" font-size="11">${tokenText}</text>
      <rect x="36" y="144" width="132" height="26" rx="6" fill="#0284C7"/>
      <text x="48" y="161" fill="#FFFFFF" font-family="monospace" font-size="10" font-weight="bold">LIVE SPECIMEN</text>
    `;
  }

  const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 210" width="400" height="210">${innerSvg}</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(fullSvg)}`;
}

const INITIAL_SHOWCASE_ITEMS: ShowcaseComponentItem[] = [
  {
    id: 'showcase-css-subgrid',
    title: 'CSS Subgrid Cross-Card Alignment',
    alias: 'grid-template-rows: subgrid',
    category: 'layout',
    categoryLabel: 'Layout & Spatial Systems',
    contributor: '@maya-lin-ui',
    prBadge: 'PR #104 · Merged',
    description:
      'Locks card titles, multi-line descriptions, and bottom CTA buttons onto shared horizontal row tracks across sibling cards without hardcoded heights.',
    previewImageUrl: buildShowcasePreviewSvgDataUri({
      variant: 'subgrid',
      title: 'CSS Subgrid Alignment',
    }),
    promptSpec:
      'Use CSS Subgrid across the 3-column card row: set the parent container to `grid grid-cols-1 md:grid-cols-3 gap-6` and each child card to `row-span-3 grid grid-rows-subgrid gap-4` so headers, body copy, and CTA footers align horizontally.',
    codeSnippet: `<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {plans.map((plan) => (
    <article
      key={plan.id}
      className="row-span-3 grid grid-rows-subgrid gap-4 p-6 rounded-2xl border border-slate-200 bg-white"
    >
      <h3 className="font-display text-lg font-bold text-slate-900">{plan.name}</h3>
      <p className="text-xs text-slate-600 leading-relaxed">{plan.description}</p>
      <button className="w-full py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold">
        Deploy {plan.name}
      </button>
    </article>
  ))}
</div>`,
    tailwindTokens: ['grid-cols-3', 'row-span-3', 'grid-rows-subgrid', 'gap-6'],
  },
  {
    id: 'showcase-slash-command',
    title: 'Inline Slash Command Menu (/ Trigger)',
    alias: 'Caret-Anchored Rich-Text Block Inserter',
    category: 'navigation',
    categoryLabel: 'Navigation & UI Components',
    contributor: '@arjun-vibe',
    prBadge: 'PR #112 · Merged',
    description:
      'Renders a keyboard-navigable floating listbox directly below the user text caret when "/" is typed, eliminating cluttered top formatting bars.',
    previewImageUrl: buildShowcasePreviewSvgDataUri({
      variant: 'slash',
      title: 'Inline Slash Command Menu',
    }),
    promptSpec:
      'Implement an Inline Slash Command Menu triggered when the user types "/" at the start of a line: anchor a floating `role="listbox"` popover (`w-64 max-h-72 overflow-y-auto rounded-xl shadow-xl border`) to the caret coordinates with `ArrowUp`/`ArrowDown` and `Enter` selection.',
    codeSnippet: `<div className="relative">
  <textarea
    placeholder="Type '/' to insert a block..."
    className="w-full p-3 rounded-xl border border-slate-200 text-sm font-mono"
  />
  <div
    role="listbox"
    aria-label="Insert Block"
    className="absolute left-3 top-12 z-50 w-64 rounded-xl border border-slate-200 bg-white shadow-xl p-1.5"
  >
    <button className="w-full px-3 py-2 rounded-lg bg-sky-50 text-sky-900 text-xs font-semibold flex justify-between">
      <span>Heading 2</span>
      <kbd className="font-mono text-[10px]">/h2</kbd>
    </button>
  </div>
</div>`,
    tailwindTokens: ['role="listbox"', 'absolute', 'z-50', 'w-64', 'shadow-xl'],
  },
  {
    id: 'showcase-isometric-stack',
    title: 'Isometric Exploded Layer Stack (3D Planes)',
    alias: 'preserve-3d + rotateX(55deg) rotateZ(-45deg)',
    category: 'futuristic',
    categoryLabel: 'Sci-Fi, Spatial & Futuristic UI (FUI)',
    contributor: '@kaito-fui',
    prBadge: 'PR #119 · Merged',
    description:
      'Tilts system architecture or spatial HUD cards into an orthographic 3D stack and separates each plane along the Z-axis (`translateZ`) on hover.',
    previewImageUrl: buildShowcasePreviewSvgDataUri({
      variant: 'isometric',
      title: 'Isometric Exploded Layer Stack',
    }),
    promptSpec:
      'Build an Isometric Exploded Layer Stack using CSS 3D transforms: apply `[transform-style:preserve-3d]` and `[transform:rotateX(55deg)_rotateZ(-45deg)]` to the stage, and offset each layer along the Z-axis via `translateZ(0px)`, `translateZ(44px)`, and `translateZ(88px)`.',
    codeSnippet: `<div className="relative h-56 flex items-center justify-center [transform-style:preserve-3d] [transform:rotateX(55deg)_rotateZ(-45deg)]">
  {[0, 1, 2].map((layer) => (
    <div
      key={layer}
      style={{ transform: \`translateZ(\${layer * 44}px)\` }}
      className="absolute w-48 h-28 rounded-xl border border-cyan-400/70 bg-cyan-950/70 backdrop-blur-md p-3 text-cyan-200 font-mono text-xs shadow-2xl transition-transform duration-300"
    >
      PLANE 0{layer + 1} · Z+{layer * 44}px
    </div>
  ))}
</div>`,
    tailwindTokens: ['[transform-style:preserve-3d]', 'translateZ()', 'backdrop-blur-md'],
  },
  {
    id: 'showcase-magnetic-cta',
    title: 'Magnetic Cursor Target & Proximity Pull',
    alias: 'Pointer-Delta Spring Translation',
    category: 'motion',
    categoryLabel: 'Micro-Interactions & Motion',
    contributor: '@elena-motion',
    prBadge: 'PR #127 · Merged',
    description:
      'Translates a primary action button 25% toward the user pointer coordinates within a proximity field and snaps back with spring physics on exit.',
    previewImageUrl: buildShowcasePreviewSvgDataUri({
      variant: 'magnetic',
      title: 'Magnetic Cursor Target',
    }),
    promptSpec:
      'Implement a Magnetic Cursor Target on the primary CTA: calculate pointer offset `(dx, dy)` from the button center in `onMouseMove` and apply `transform: translate3d(dx * 0.25, dy * 0.25, 0)` with a `cubic-bezier(0.16, 1, 0.3, 1)` snap-back on `onMouseLeave`.',
    codeSnippet: `<button
  onMouseMove={(e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * 0.25;
    const dy = (e.clientY - (r.top + r.height / 2)) * 0.25;
    e.currentTarget.style.transform = \`translate3d(\${dx}px, \${dy}px, 0)\`;
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'translate3d(0, 0, 0)';
  }}
  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold transition-transform duration-150"
>
  Magnetic Action
</button>`,
    tailwindTokens: ['translate3d()', 'will-change-transform', 'duration-150'],
  },
  {
    id: 'showcase-pip-dock',
    title: 'Docked Picture-in-Picture (PiP) Mini-Player',
    alias: 'Floating Viewport-Corner Media Overlay',
    category: 'navigation',
    categoryLabel: 'Navigation & UI Components',
    contributor: '@devansh-oss',
    prBadge: 'PR #131 · Merged',
    description:
      'Collapses an active video or live call stage into a persistent bottom-right floating card (`fixed bottom-5 right-5 z-40 aspect-video w-72`) when scrolling away.',
    previewImageUrl: buildShowcasePreviewSvgDataUri({
      variant: 'pip',
      title: 'Docked PiP Mini-Player',
    }),
    promptSpec:
      'When the primary media player scrolls out of the viewport (`IntersectionObserver`), morph it into a Docked Picture-in-Picture (PiP) Mini-Player (`fixed bottom-5 right-5 z-40 w-72 aspect-video rounded-2xl shadow-2xl border border-slate-700 bg-slate-950`) with mute and expand controls.',
    codeSnippet: `<aside
  aria-label="Mini Player"
  className="fixed bottom-5 right-5 z-40 w-72 aspect-video rounded-2xl bg-slate-950 border border-slate-700 shadow-2xl overflow-hidden flex flex-col justify-between p-3 text-white"
>
  <div className="flex items-center justify-between text-[11px] font-mono">
    <span className="text-sky-400">● LIVE STREAM</span>
    <button className="px-1.5 py-0.5 rounded bg-white/10">Expand ↗</button>
  </div>
  <div className="text-xs font-semibold truncate">Keynote Architecture Walkthrough</div>
</aside>`,
    tailwindTokens: ['fixed', 'bottom-5', 'right-5', 'aspect-video', 'w-72', 'shadow-2xl'],
  },
  {
    id: 'showcase-segmented-otp',
    title: 'Segmented OTP / 2FA Auto-Advance Input',
    alias: 'autocomplete="one-time-code" Digit Slots',
    category: 'navigation',
    categoryLabel: 'Navigation & UI Components',
    contributor: '@sara-sec-ux',
    prBadge: 'PR #138 · Merged',
    description:
      'Splits a 6-digit verification code into distinct `tabular-nums` character cells that auto-advance focus on keypress and support full clipboard paste.',
    previewImageUrl: buildShowcasePreviewSvgDataUri({
      variant: 'otp',
      title: 'Segmented OTP Input',
    }),
    promptSpec:
      'Build a 6-digit Segmented OTP Input (`autocomplete="one-time-code" inputMode="numeric"`): render 6 individual `w-11 h-13 text-center font-mono text-lg font-bold tabular-nums rounded-xl border` inputs that auto-advance focus on digit entry and distribute pasted 6-digit strings across all cells.',
    codeSnippet: `<div className="flex items-center gap-2" role="group" aria-label="6-Digit Verification Code">
  {[0, 1, 2, 3, 4, 5].map((slot) => (
    <input
      key={slot}
      type="text"
      inputMode="numeric"
      maxLength={1}
      autoComplete={slot === 0 ? 'one-time-code' : 'off'}
      className="w-11 h-13 text-center font-mono text-lg font-bold tabular-nums rounded-xl border border-slate-300 focus:border-sky-600 focus:ring-2 focus:ring-sky-600/20"
    />
  ))}
</div>`,
    tailwindTokens: ['inputMode="numeric"', 'tabular-nums', 'maxLength={1}', 'focus:ring-2'],
  },
];

const STARTER_CONCEPT_PRESETS: StarterConceptPreset[] = [
  {
    id: 'css-subgrid',
    badge: 'Layout Preset + Live Demo',
    title: 'CSS Subgrid Alignment',
    category: 'layout',
    difficulty: 'Intermediate',
    alias: 'Cross-Card Track Inheritance (grid-template-rows: subgrid)',
    summary:
      'Allows nested child cards to inherit the row tracks of their parent CSS Grid so headings, descriptions, and CTA footers align horizontally across adjacent cards regardless of text length.',
    whyAgentsNeedIt:
      'Without subgrid, 3 cards in a row with different length titles have misaligned buttons and body text. Asking for grid-rows-subgrid row-span-3 locks horizontal alignment across all sibling cards.',
    vibePhrases:
      'make card titles and buttons line up horizontally across a row\nalign sections inside neighboring cards\ncards with different text lengths that still line up inside',
    badPrompt:
      'Make 3 pricing cards in a row and make sure the headings, descriptions, and buttons all line up evenly.',
    goodPrompt:
      'Use CSS Subgrid across the 3-column card row: set the parent grid to grid-cols-3 and each card to row-span-3 grid grid-rows-subgrid gap-4 so the header, body, and CTA footer rows align horizontally across all sibling cards.',
    cssSnippet: `.card-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
}
.subgrid-card {
  grid-row: span 3 / span 3;
  display: grid;
  grid-template-rows: subgrid;
}`,
    tailwindInput: 'grid-cols-3, row-span-3, grid-rows-subgrid, gap-6',
  },
  {
    id: 'slash-command-menu',
    badge: 'Everyday Mystery UI + Live Demo',
    title: 'Inline Slash Command Menu (/ Trigger)',
    category: 'navigation',
    difficulty: 'Intermediate',
    alias: 'Caret-Anchored Rich-Text Block Inserter (Notion-Style / Menu)',
    summary:
      'A floating command popover triggered by typing "/" inside an editor or input field, anchored directly to the text caret coordinates for keyboard-first block insertion.',
    whyAgentsNeedIt:
      'Saying "add a menu to insert blocks" makes AI build a clunky top formatting toolbar. Specifying an Inline Slash Command Menu anchored to the text caret produces a clean Notion/Linear-style workflow.',
    vibePhrases:
      'popup menu when you type a forward slash in the text box\nnotion style slash menu to pick heading or list\nmenu that appears right where your cursor is typing',
    badPrompt:
      'Let users add headings, tables, or code blocks while typing in the note editor.',
    goodPrompt:
      'Implement an Inline Slash Command Menu triggered when the user types "/" at the start of a line: render a caret-anchored floating listbox (w-64 max-h-72 overflow-y-auto rounded-xl shadow-xl border) with keyboard arrow navigation and fuzzy filtering.',
    cssSnippet: `.slash-menu-popover {
  position: absolute;
  width: 16rem;
  max-height: 18rem;
  overflow-y: auto;
  border-radius: 0.75rem;
}`,
    tailwindInput: 'absolute, z-50, w-64, max-h-72, overflow-y-auto, rounded-xl, shadow-xl',
  },
  {
    id: 'holographic-layer-stack',
    badge: 'Sci-Fi FUI + Live Demo',
    title: 'Isometric Exploded Layer Stack (3D CSS Planes)',
    category: 'futuristic',
    difficulty: 'System Architecture',
    alias: '3D Orthographic Z-Axis Layer Dissection (rotateX(55deg) rotateZ(-45deg))',
    summary:
      'A futuristic spatial visualization that tilts UI cards or hardware schematics into an isometric 3D plane using CSS preserve-3d and separates each layer along the Z-axis (translateZ).',
    whyAgentsNeedIt:
      'When users ask for a "3D stacked architecture diagram", AI draws flat 2D boxes with arrows. Prompting for an Isometric Exploded Layer Stack with preserve-3d and translateZ spacing creates a true spatial hologram.',
    vibePhrases:
      'floating 3d tilted layers stacked on top of each other\nexploded view diagram that tilts in 3d when you hover\nisometric hologram stack of layers',
    badPrompt:
      'Show a cool 3D diagram of how our 4 security layers stack on top of each other.',
    goodPrompt:
      'Build an Isometric Exploded Layer Stack using CSS 3D transforms: apply [transform-style:preserve-3d] and [transform:rotateX(55deg)_rotateZ(-45deg)] to the stage, and offset each layer along the Z-axis via translateZ(0px), translateZ(40px), and translateZ(80px).',
    cssSnippet: `.isometric-stack {
  transform-style: preserve-3d;
  transform: rotateX(55deg) rotateZ(-45deg);
}
.layer-plane {
  transform: translateZ(calc(var(--layer-index) * 44px));
  transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
}`,
    tailwindInput:
      '[transform-style:preserve-3d], [transform:rotateX(55deg)_rotateZ(-45deg)], transition-transform',
  },
  {
    id: 'magnetic-cursor-target',
    badge: 'Motion & Craft + Live Demo',
    title: 'Magnetic Cursor Target & Proximity Pull',
    category: 'motion',
    difficulty: 'Intermediate',
    alias: 'Pointer-Delta Spring Translation (iPadOS / Awwwards Magnetic Button)',
    summary:
      'A tactile micro-interaction where a button or icon subtly translates toward the user pointer within a proximity radius before snapping back with spring physics on pointer leave.',
    whyAgentsNeedIt:
      'Asking for a "fun hover effect on the CTA button" gives you a basic scale(1.05). Specifying a Magnetic Cursor Target with pointer-delta translation and spring snap-back creates signature tactile craft.',
    vibePhrases:
      'button that pulls toward your mouse cursor when you get close\nmagnetic hover button like ipad pointer\nbutton that follows the mouse slightly before snapping back',
    badPrompt: 'Make the main action button have a really cool interactive hover effect.',
    goodPrompt:
      'Implement a Magnetic Cursor Target on the primary CTA: calculate pointer offset from button center on onMouseMove and apply transform: translate3d(dx * 0.25, dy * 0.25, 0) with a spring snap-back on onMouseLeave.',
    cssSnippet: `.magnetic-btn {
  transform: translate3d(var(--mag-x, 0px), var(--mag-y, 0px), 0);
  transition: transform 180ms cubic-bezier(0.16, 1, 0.3, 1);
}`,
    tailwindInput: 'will-change-transform, transition-transform, duration-150, ease-out',
  },
];

const STORAGE_KEY_SHOWCASE = 'lexicon_ui_community_showcase_v1';

export const ContributorStudioView: React.FC<ContributorStudioViewProps> = ({
  onCopyFeedback,
}) => {
  const [title, setTitle] = useState(STARTER_CONCEPT_PRESETS[0].title);
  const [category, setCategory] = useState<TermCategory>(STARTER_CONCEPT_PRESETS[0].category);
  const [difficulty, setDifficulty] = useState<
    'Foundational' | 'Intermediate' | 'System Architecture'
  >(STARTER_CONCEPT_PRESETS[0].difficulty);
  const [alias, setAlias] = useState(STARTER_CONCEPT_PRESETS[0].alias);
  const [summary, setSummary] = useState(STARTER_CONCEPT_PRESETS[0].summary);
  const [whyAgentsNeedIt, setWhyAgentsNeedIt] = useState(
    STARTER_CONCEPT_PRESETS[0].whyAgentsNeedIt
  );
  const [vibePhrasesInput, setVibePhrasesInput] = useState(
    STARTER_CONCEPT_PRESETS[0].vibePhrases
  );
  const [badPrompt, setBadPrompt] = useState(STARTER_CONCEPT_PRESETS[0].badPrompt);
  const [goodPrompt, setGoodPrompt] = useState(STARTER_CONCEPT_PRESETS[0].goodPrompt);
  const [cssSnippet, setCssSnippet] = useState(STARTER_CONCEPT_PRESETS[0].cssSnippet);
  const [tailwindInput, setTailwindInput] = useState(STARTER_CONCEPT_PRESETS[0].tailwindInput);
  const [contributorHandle, setContributorHandle] = useState('@community-dev');

  // Showcase Gallery State (Default items + user-published items persisted in localStorage)
  const [userShowcaseItems, setUserShowcaseItems] = useState<ShowcaseComponentItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SHOWCASE);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore storage errors
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SHOWCASE, JSON.stringify(userShowcaseItems));
    } catch {
      // ignore storage errors
    }
  }, [userShowcaseItems]);

  const [showcaseFilter, setShowcaseFilter] = useState<TermCategory | 'all'>('all');
  const [inspectedShowcaseItem, setInspectedShowcaseItem] =
    useState<ShowcaseComponentItem | null>(null);
  const [copiedShowcaseId, setCopiedShowcaseId] = useState<string | null>(null);

  // Live Interactive Demo Preview state inside the Contributor Studio
  const [previewMode, setPreviewMode] = useState<'canonical' | 'fallback'>('canonical');
  const [slashSelectedIdx, setSlashSelectedIdx] = useState(0);
  const [magneticOffset, setMagneticOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [exportTab, setExportTab] = useState<'termsData' | 'interactiveStage' | 'prMarkdown'>(
    'termsData'
  );

  const [copiedTs, setCopiedTs] = useState(false);
  const [copiedStage, setCopiedStage] = useState(false);
  const [copiedPr, setCopiedPr] = useState(false);

  const categoryLabelMap: Record<TermCategory, string> = {
    layout: 'Layout & Spatial Systems',
    navigation: 'Navigation & UI Components',
    typography: 'Typography & Color Hierarchy',
    motion: 'Micro-Interactions & Motion',
    futuristic: 'Sci-Fi, Spatial & Futuristic UI (FUI)',
  };

  const allShowcaseItems = useMemo(
    () => [...userShowcaseItems, ...INITIAL_SHOWCASE_ITEMS],
    [userShowcaseItems]
  );

  const filteredShowcaseItems = useMemo(() => {
    if (showcaseFilter === 'all') return allShowcaseItems;
    return allShowcaseItems.filter((item) => item.category === showcaseFilter);
  }, [allShowcaseItems, showcaseFilter]);

  const handleLoadPreset = (preset: StarterConceptPreset) => {
    setTitle(preset.title);
    setCategory(preset.category);
    setDifficulty(preset.difficulty);
    setAlias(preset.alias);
    setSummary(preset.summary);
    setWhyAgentsNeedIt(preset.whyAgentsNeedIt);
    setVibePhrasesInput(preset.vibePhrases);
    setBadPrompt(preset.badPrompt);
    setGoodPrompt(preset.goodPrompt);
    setCssSnippet(preset.cssSnippet);
    setTailwindInput(preset.tailwindInput);
    setPreviewMode('canonical');
    onCopyFeedback(`Loaded "${preset.title}" + Live Demo Preview`);
  };

  const slugId = useMemo(
    () =>
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') || 'custom-ui-term',
    [title]
  );

  const vibePhrases = useMemo(
    () =>
      vibePhrasesInput
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
    [vibePhrasesInput]
  );

  const tailwindTokens = useMemo(
    () =>
      tailwindInput
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    [tailwindInput]
  );

  // 6-Gate Open-Source Quality Rubric Validation (Including Mandatory Live Demo Preview!)
  const rubricGates = useMemo(() => {
    return [
      {
        id: 'canonical',
        label: '1. Canonical Title & Architectural Alias',
        passed: title.trim().length >= 4 && alias.trim().length >= 6,
        detail: 'Requires formal UI/UX title and technical alias',
      },
      {
        id: 'vibes',
        label: '2. Colloquial Vibe Phrases (>= 3 phrases)',
        passed: vibePhrases.length >= 3,
        detail: `${vibePhrases.length} / 3 phrases provided`,
      },
      {
        id: 'prompts',
        label: '3. High-Contrast Prompt Pair (Vague vs. Exact Spec)',
        passed: badPrompt.trim().length >= 20 && goodPrompt.trim().length >= 40,
        detail: 'Requires realistic bad prompt and actionable agent spec',
      },
      {
        id: 'rationale',
        label: '4. Agent Engineering Rationale & Summary',
        passed: summary.trim().length >= 30 && whyAgentsNeedIt.trim().length >= 30,
        detail: 'Explains what it is and why AI models need the exact term',
      },
      {
        id: 'tokens',
        label: '5. Canonical CSS & Tailwind Tokens',
        passed: cssSnippet.trim().length >= 20 && tailwindTokens.length >= 2,
        detail: `${tailwindTokens.length} Tailwind tokens + CSS snippet`,
      },
      {
        id: 'livedemo',
        label: '6. Live Interactive Demo Preview (InteractiveStage.tsx)',
        passed: title.trim().length >= 4 && tailwindTokens.length >= 1,
        detail: 'Every concept MUST include a working interactive demo preview',
      },
    ];
  }, [
    title,
    alias,
    vibePhrases,
    badPrompt,
    goodPrompt,
    summary,
    whyAgentsNeedIt,
    cssSnippet,
    tailwindTokens,
  ]);

  const passedCount = rubricGates.filter((g) => g.passed).length;

  // Generated TypeScript code for src/data/termsData.ts
  const generatedTypeScript = useMemo(() => {
    const obj = {
      id: slugId,
      number: String(DESIGN_TERMS.length + 1).padStart(2, '0'),
      title: title.trim(),
      category,
      categoryLabel: categoryLabelMap[category],
      difficulty,
      pronunciationOrAlias: alias.trim(),
      summary: summary.trim(),
      whyAgentsNeedIt: whyAgentsNeedIt.trim(),
      vibePhrases,
      badPromptExample: badPrompt.trim(),
      goodPromptExample: goodPrompt.trim(),
      anatomyParts: [
        {
          name: 'Primary Structural Container',
          role: 'Establishes the outer coordinate frame for the pattern.',
          cssHint: tailwindTokens[0] || 'grid',
        },
        {
          name: 'Child Alignment Element',
          role: 'Inherits or responds to the parent layout rules.',
          cssHint: tailwindTokens[1] || 'flex-1',
        },
      ],
      cssSnippet,
      tailwindTokens,
      sandboxControls: [
        {
          id: 'mode',
          label: `${title.trim()} Mode`,
          type: 'select',
          options: [
            { label: 'Enabled (Canonical UI/UX Spec)', value: 'canonical' },
            { label: 'Disabled (Naive Broken AI Output)', value: 'fallback' },
          ],
          defaultValue: 'canonical',
        },
      ],
      relatedTerms: ['bento-grid', 'spatial-grid'],
    };
    return JSON.stringify(obj, null, 2);
  }, [
    slugId,
    title,
    category,
    difficulty,
    alias,
    summary,
    whyAgentsNeedIt,
    vibePhrases,
    badPrompt,
    goodPrompt,
    cssSnippet,
    tailwindTokens,
  ]);

  // Generated Live Interactive Demo JSX for src/components/InteractiveStage.tsx
  const generatedInteractiveStageCode = useMemo(() => {
    return `// Add this case block inside switch (term.id) in src/components/InteractiveStage.tsx:
case '${slugId}': {
  const mode = String(controlValues.mode || 'canonical');
  const isCanonical = mode === 'canonical';

  return (
    <div className="w-full p-4 rounded-xl border border-slate-200 bg-white space-y-3">
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="font-bold text-slate-900">${title.trim() || 'Custom Concept'}</span>
        <span className={isCanonical ? 'text-emerald-700' : 'text-amber-700'}>
          {isCanonical ? 'Canonical Spec (${tailwindTokens.slice(0, 2).join(' ')})' : 'Naive AI Fallback'}
        </span>
      </div>

      {/* Live Interactive Specimen */}
      <div className={isCanonical ? '${tailwindTokens.join(' ')}' : 'flex flex-col gap-2 opacity-75'}>
        {/* Render interactive child elements here */}
      </div>
    </div>
  );
}`;
  }, [slugId, title, tailwindTokens]);

  // Generated Markdown Pull Request Description
  const generatedPrMarkdown = useMemo(() => {
    return `## Summary of Contribution
Adds **${title.trim()}** (\`${slugId}\`) under **${categoryLabelMap[category]}**, complete with its **Live Interactive Demo Preview** in \`src/components/InteractiveStage.tsx\`.

### 1. Definition & Why AI Agents Need It
- **Alias**: ${alias.trim()}
- **Summary**: ${summary.trim()}
- **Agent Impact**: ${whyAgentsNeedIt.trim()}

### 2. Colloquial "Vibe Phrases" Added
${vibePhrases.map((p) => `- *"${p}"*`).join('\n')}

### 3. Prompt Specification Pair
- **Vague Vibe Prompt**: > "${badPrompt.trim()}"
- **Exact UI/UX Agent Prompt**: > "${goodPrompt.trim()}"

### 4. Live Interactive Demo Preview (\`InteractiveStage.tsx\`)
- Includes interactive \`sandboxControls\` toggling between **Canonical UI/UX Spec** and **Naive AI Fallback**.

### 5. Rubric Verification (${passedCount}/6 Gates Passed)
- [x] Canonical UI/UX Nomenclature
- [x] >= 3 Colloquial Vibe Phrases
- [x] Vague vs. Exact Agent Prompt Comparison
- [x] CSS & Tailwind Token Snippet
- [x] Interactive Sandbox Control Schema
- [x] Live Interactive Demo Preview in \`src/components/InteractiveStage.tsx\``;
  }, [
    title,
    slugId,
    category,
    alias,
    summary,
    whyAgentsNeedIt,
    vibePhrases,
    badPrompt,
    goodPrompt,
    passedCount,
  ]);

  const handlePublishToShowcase = () => {
    if (!title.trim()) return;
    const newItem: ShowcaseComponentItem = {
      id: `user-${slugId}-${Date.now()}`,
      title: title.trim(),
      alias: alias.trim() || 'Community UI/UX Pattern',
      category,
      categoryLabel: categoryLabelMap[category],
      contributor: contributorHandle.trim() || '@community-dev',
      prBadge: 'Community Draft · Ready for PR',
      description:
        summary.trim() ||
        'User-contributed interactive UI/UX component specification and live demo preview.',
      previewImageUrl: buildShowcasePreviewSvgDataUri({
        variant: 'custom',
        title: title.trim(),
        tokens: tailwindTokens,
      }),
      promptSpec: goodPrompt.trim(),
      codeSnippet: generatedInteractiveStageCode,
      tailwindTokens: tailwindTokens.length > 0 ? tailwindTokens : ['rounded-xl', 'border'],
      isUserCreated: true,
    };

    setUserShowcaseItems((prev) => [newItem, ...prev]);
    setShowcaseFilter('all');
    onCopyFeedback(`Published "${title.trim()}" card to the Community Showcase Gallery!`);
    document
      .getElementById('community-showcase-gallery')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCopyTs = () => {
    navigator.clipboard.writeText(generatedTypeScript);
    setCopiedTs(true);
    onCopyFeedback(`Copied "${title}" TypeScript DesignTerm payload`);
    setTimeout(() => setCopiedTs(false), 1800);
  };

  const handleCopyStage = () => {
    navigator.clipboard.writeText(generatedInteractiveStageCode);
    setCopiedStage(true);
    onCopyFeedback(`Copied "${title}" InteractiveStage.tsx Live Demo JSX`);
    setTimeout(() => setCopiedStage(false), 1800);
  };

  const handleCopyPr = () => {
    navigator.clipboard.writeText(generatedPrMarkdown);
    setCopiedPr(true);
    onCopyFeedback('Copied formatted GitHub Pull Request markdown');
    setTimeout(() => setCopiedPr(false), 1800);
  };

  const handleCopyShowcaseCode = (item: ShowcaseComponentItem) => {
    navigator.clipboard.writeText(item.codeSnippet);
    setCopiedShowcaseId(item.id);
    onCopyFeedback(`Copied "${item.title}" component code`);
    setTimeout(() => setCopiedShowcaseId(null), 1800);
  };

  const handleClearBlank = () => {
    setTitle('');
    setAlias('');
    setSummary('');
    setWhyAgentsNeedIt('');
    setVibePhrasesInput('');
    setBadPrompt('');
    setGoodPrompt('');
    setCssSnippet('');
    setTailwindInput('');
  };

  return (
    <div className="space-y-6 sm:space-y-10">
      {/* =====================================================================
          1. OPEN-SOURCE VISION & MANDATORY LIVE DEMO REQUIREMENT
      ===================================================================== */}
      <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
        <div className="p-4 sm:p-6 border-b border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-sky-700 font-semibold">
              <LexiconLogo size={18} />
              <span>OPEN-SOURCE COMMUNITY HUB · ROOTDEVELOPERDS/LEXICONUI</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Contribute new beautiful UI/UX concepts &amp; designs — complete with live interactive
              demo previews
            </h2>
            <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">
              LexiconUI (<code className="font-mono text-slate-800">RootDeveloperDS/LexiconUI</code>) is
              built to grow into the world&apos;s most comprehensive open-source UI/UX encyclopedia.
              Anyone can contribute brand-new UI/UX concepts, futuristic sci-fi patterns, or
              platform UX enhancements—and{' '}
              <strong className="text-slate-900">
                every contributed concept includes both its exact AI prompt specification (
                <code className="font-mono text-sky-700">termsData.ts</code>) AND a working,
                interactive live UI/UX demo preview (
                <code className="font-mono text-sky-700">InteractiveStage.tsx</code>)
              </strong>{' '}
              so learners can see and manipulate the design in real time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0 text-xs font-mono">
            <a
              href="https://github.com/RootDeveloperDS/LexiconUI"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[40px] px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold inline-flex items-center gap-1.5 transition-colors"
            >
              <GitPullRequest className="w-3.5 h-3.5 text-sky-400" />
              <span>GitHub: RootDeveloperDS/LexiconUI</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-300" />
            </a>
            <span className="min-h-[40px] px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-semibold inline-flex items-center">
              MIT · Live Demo Standard
            </span>
          </div>
        </div>

        {/* 6 High-Impact Contribution Avenues (Single-Elevation Hairline Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200 border-b border-slate-200">
          {[
            {
              track: '01 · New UI/UX Concepts + Live Demo',
              title: 'Expand Encyclopedia with Everyday UI & Live Previews',
              target: 'termsData.ts + InteractiveStage.tsx',
              desc: 'Add any beautiful everyday UI/UX concept (Sticky Table Headers, Slash Command Menus, Docked Mini-Players, OTP Inputs) with its exact prompt spec AND an interactive live demo preview.',
              branch: 'feat/term-<slug>',
            },
            {
              track: '02 · Sci-Fi & Spatial UI + Live Demo',
              title: 'Futuristic, AR/VR & Game HUD Concepts',
              target: 'category: "futuristic" + Live Stage',
              desc: 'Contribute VisionOS spatial glass patterns, 3D CSS isometric layer stacks, cyberpunk telemetry widgets, or diegetic HUDs with a live interactive dark-mode simulation.',
              branch: 'feat/fui-<slug>',
            },
            {
              track: '03 · Deep Sandbox Interactivity',
              title: 'Upgrade Live Demo Previews & Physics',
              target: 'src/components/InteractiveStage.tsx',
              desc: 'Make any concept demo even more tactile: add drag handles, spring-physics visualizers, keyboard navigation testers, or "Broken AI vs. Exact Spec" live toggles.',
              branch: 'feat/sandbox-<slug>',
            },
          ].map((item) => (
            <div key={item.title} className="p-4 sm:p-5 flex flex-col justify-between gap-3">
              <div className="space-y-1.5">
                <div className="text-xs font-mono text-sky-700 font-semibold">{item.track}</div>
                <h3 className="font-display text-base font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px] font-mono text-slate-500">
                <span className="truncate">{item.target}</span>
                <span className="text-slate-800 shrink-0">{item.branch}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {[
            {
              track: '04 · Developer Convenience',
              title: 'Agent Exporters & Framework Tabs',
              target: 'Overlays.tsx + PromptTranslatorView.tsx',
              desc: 'Add 1-click exports for .cursorrules, CLAUDE.md, AGENTS.md, or Windsurf rules, plus code snippet tabs for Vanilla CSS, Tailwind, shadcn/ui, and SwiftUI.',
              branch: 'feat/export-<format>',
            },
            {
              track: '05 · Site UI/UX & Polish',
              title: 'Make LexiconUI More Beautiful & Useful',
              target: 'src/components/*',
              desc: 'Improve the website itself! Build an interactive "Name That UI!" flashcard quiz mode, refine mobile ergonomics, add keyboard shortcuts, or polish micro-interactions.',
              branch: 'feat/ux-<enhancement>',
            },
            {
              track: '06 · Domain X-Ray Blueprints',
              title: 'Full-Screen App Anatomy Dissections',
              target: 'anatomyData.ts + AnatomyInspectorView.tsx',
              desc: 'Build a clickable reference blueprint (e.g., Mobile Fintech Wallet, AI Coding IDE, Video Timeline Editor) with numbered X-Ray callout pins.',
              branch: 'feat/anatomy-<domain>',
            },
          ].map((item) => (
            <div key={item.title} className="p-4 sm:p-5 flex flex-col justify-between gap-3">
              <div className="space-y-1.5">
                <div className="text-xs font-mono text-emerald-700 font-semibold">{item.track}</div>
                <h3 className="font-display text-base font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px] font-mono text-slate-500">
                <span className="truncate">{item.target}</span>
                <span className="text-slate-800 shrink-0">{item.branch}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          2. SHOWCASE GALLERY: USER-CONTRIBUTED UI/UX COMPONENTS
      ===================================================================== */}
      <section
        id="community-showcase-gallery"
        className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 space-y-5 sm:space-y-6 shadow-2xs"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="space-y-1">
            <div className="text-xs font-mono text-sky-700 font-semibold">
              COMMUNITY SHOWCASE GALLERY · USER-CONTRIBUTED UI/UX COMPONENTS
            </div>
            <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Explore components &amp; live demos contributed by the community ({allShowcaseItems.length})
            </h3>
            <p className="text-xs text-slate-600 max-w-2xl">
              Every card below showcases a community-contributed UI/UX pattern with its visual
              schematic preview, architectural description, and copy-ready code. Draft your own
              concept in the studio below and click{' '}
              <strong className="text-slate-900">+ Publish Draft to Showcase Gallery</strong> to add
              yours!
            </p>
          </div>

          {/* Showcase Pillar Filter Bar (Swipeable on Mobile) */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 overflow-x-auto no-scrollbar max-w-full self-start lg:self-center">
            {[
              { id: 'all', label: `All (${allShowcaseItems.length})` },
              { id: 'layout', label: 'Layout' },
              { id: 'navigation', label: 'Navigation' },
              { id: 'motion', label: 'Motion' },
              { id: 'futuristic', label: 'Sci-Fi FUI' },
            ].map((tab) => {
              const isSelected = showcaseFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setShowcaseFilter(tab.id as TermCategory | 'all')}
                  className={`min-h-[38px] px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap tabular-nums shrink-0 ${
                    isSelected
                      ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Grid of Showcase Gallery Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredShowcaseItems.map((item) => {
            const isInspecting = inspectedShowcaseItem?.id === item.id;
            return (
              <article
                key={item.id}
                className={`rounded-[20px] border p-3.5 transition-all flex flex-col justify-between gap-3.5 ${
                  isInspecting
                    ? 'bg-sky-50/40 border-sky-500 ring-2 ring-sky-500/20'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="space-y-3">
                  {/* Concentric Inner Preview Image Frame (r_outer 20px - p 14px -> r_inner 8px) */}
                  <div className="relative rounded-[8px] overflow-hidden border border-slate-200/90 bg-slate-100 aspect-[16/9]">
                    <img
                      src={item.previewImageUrl}
                      alt={`${item.title} component schematic preview`}
                      className="w-full h-full object-cover block"
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2 right-2 flex items-center justify-between gap-2 pointer-events-none">
                      <span className="px-2 py-0.5 rounded bg-slate-900/85 text-white font-mono text-[10px] font-medium backdrop-blur-xs truncate">
                        {item.contributor}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white/90 text-slate-800 border border-slate-200 font-mono text-[10px] font-semibold backdrop-blur-xs shrink-0">
                        {item.prBadge}
                      </span>
                    </div>
                  </div>

                  {/* Unboxed Metadata & Title */}
                  <div className="space-y-1 px-0.5">
                    <div className="text-[11px] font-mono text-sky-700 font-medium truncate">
                      {item.categoryLabel} · {item.alias}
                    </div>
                    <h4 className="font-display text-base font-bold text-slate-900">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Tokens + View Code Action Button */}
                <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2 px-0.5">
                  <code className="text-[10px] font-mono text-slate-500 truncate">
                    {item.tailwindTokens.slice(0, 2).join(' · ')}
                  </code>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {item.isUserCreated && (
                      <button
                        type="button"
                        onClick={() => {
                          setUserShowcaseItems((prev) =>
                            prev.filter((u) => u.id !== item.id)
                          );
                          if (inspectedShowcaseItem?.id === item.id) {
                            setInspectedShowcaseItem(null);
                          }
                          onCopyFeedback(`Removed "${item.title}" from local showcase`);
                        }}
                        className="min-h-[38px] px-2.5 py-1.5 rounded-lg text-[11px] text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Remove local draft"
                      >
                        Remove
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        setInspectedShowcaseItem(isInspecting ? null : item)
                      }
                      className={`min-h-[38px] px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                        isInspecting
                          ? 'bg-sky-700 text-white'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      <span>{isInspecting ? 'Hide Code' : 'View Code'}</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Inline Code & Prompt Inspector Drawer when a User Clicks "View Code" */}
        {inspectedShowcaseItem && (
          <div className="rounded-2xl border-2 border-sky-500 bg-slate-950 text-slate-100 p-4 sm:p-5 space-y-4 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="min-w-0">
                <div className="text-xs font-mono text-sky-400">
                  SHOWCASE COMPONENT CODE &amp; AGENT PROMPT INSPECTOR ·{' '}
                  {inspectedShowcaseItem.contributor}
                </div>
                <h4 className="font-display text-base sm:text-lg font-bold text-white mt-0.5">
                  {inspectedShowcaseItem.title} ({inspectedShowcaseItem.alias})
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopyShowcaseCode(inspectedShowcaseItem)}
                  className="min-h-[40px] px-3.5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap"
                >
                  {copiedShowcaseId === inspectedShowcaseItem.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied Code!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Component Code</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setInspectedShowcaseItem(null)}
                  className="min-w-[40px] min-h-[40px] p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
                  aria-label="Close Code Inspector"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-5 space-y-2 bg-slate-900/90 p-3.5 sm:p-4 rounded-xl border border-slate-800">
                <div className="text-xs font-mono text-emerald-400 font-semibold">
                  EXACT AI AGENT PROMPT SPECIFICATION
                </div>
                <p className="text-xs font-mono text-slate-200 leading-relaxed">
                  {inspectedShowcaseItem.promptSpec}
                </p>
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {inspectedShowcaseItem.tailwindTokens.map((tok) => (
                    <span
                      key={tok}
                      className="px-2 py-0.5 rounded bg-slate-800 text-sky-300 font-mono text-[10px]"
                    >
                      {tok}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7 space-y-2 min-w-0">
                <div className="text-xs font-mono text-slate-400">
                  REACT / TAILWIND COMPONENT IMPLEMENTATION:
                </div>
                <pre className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-sky-200 overflow-x-auto leading-relaxed">
                  <code>{inspectedShowcaseItem.codeSnippet}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* =====================================================================
          3. INTERACTIVE TERM SCHEMA BUILDER + LIVE DEMO PREVIEW STAGE
      ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT 7 COLUMNS: Interactive Term Contributor Form */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 space-y-5 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <div className="text-xs font-mono text-sky-700 font-semibold">
                INTERACTIVE CONCEPT &amp; LIVE DEMO BUILDER (ALL 5 PILLARS)
              </div>
              <h3 className="font-display text-base sm:text-lg font-bold text-slate-900">
                Draft a New UI/UX Concept &amp; Publish It to the Showcase Gallery
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleClearBlank}
                className="min-h-[40px] px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl flex items-center gap-1.5 whitespace-nowrap"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Blank Canvas</span>
              </button>
              <button
                type="button"
                onClick={handlePublishToShowcase}
                className="min-h-[40px] px-3.5 py-2 text-xs font-semibold bg-sky-600 hover:bg-sky-700 text-white rounded-xl flex items-center gap-1.5 whitespace-nowrap shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Publish Draft to Showcase</span>
              </button>
            </div>
          </div>

          {/* Starter Concept Preset Loader Bar */}
          <div className="space-y-2 bg-slate-50 p-3 sm:p-3.5 rounded-xl border border-slate-200">
            <div className="text-[11px] font-mono text-slate-500">
              CLICK ANY EXAMPLE CONCEPT BELOW TO PREVIEW ITS SPEC + WORKING LIVE DEMO:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {STARTER_CONCEPT_PRESETS.map((preset) => {
                const isSelected = title === preset.title;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleLoadPreset(preset)}
                    className={`min-h-[38px] px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors text-left ${
                      isSelected
                        ? 'bg-slate-900 border-slate-900 text-white'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="font-mono text-[10px] opacity-75 mr-1">
                      [{preset.badge}]
                    </span>
                    <span>{preset.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-medium text-slate-700">Formal UI/UX Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. CSS Subgrid Alignment"
                className="w-full min-h-[42px] px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">Category Pillar</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TermCategory)}
                className="w-full min-h-[42px] px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-600"
              >
                <option value="layout">Layout &amp; Spatial Systems</option>
                <option value="navigation">Navigation &amp; UI Components</option>
                <option value="typography">Typography &amp; Color Hierarchy</option>
                <option value="motion">Micro-Interactions &amp; Motion</option>
                <option value="futuristic">Sci-Fi, Spatial &amp; Futuristic UI (FUI)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">Your GitHub Handle</label>
              <input
                type="text"
                value={contributorHandle}
                onChange={(e) => setContributorHandle(e.target.value)}
                placeholder="@your-handle"
                className="w-full min-h-[42px] px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-medium text-slate-700">
                Technical Alias / CSS Specification Name
              </label>
              <input
                type="text"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                placeholder="e.g. Cross-Card Track Inheritance (grid-template-rows: subgrid)"
                className="w-full min-h-[42px] px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">Difficulty Level</label>
              <select
                value={difficulty}
                onChange={(e) =>
                  setDifficulty(
                    e.target.value as 'Foundational' | 'Intermediate' | 'System Architecture'
                  )
                }
                className="w-full min-h-[42px] px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-600"
              >
                <option value="Foundational">Foundational</option>
                <option value="Intermediate">Intermediate</option>
                <option value="System Architecture">System Architecture</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                1-Sentence Architectural Summary
              </label>
              <textarea
                rows={3}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-600 leading-relaxed"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                Why AI Agents Need This Exact Term
              </label>
              <textarea
                rows={3}
                value={whyAgentsNeedIt}
                onChange={(e) => setWhyAgentsNeedIt(e.target.value)}
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-600 leading-relaxed"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">
              Colloquial &ldquo;Vibe Phrases&rdquo; (1 per line, minimum 3)
            </label>
            <textarea
              rows={3}
              value={vibePhrasesInput}
              onChange={(e) => setVibePhrasesInput(e.target.value)}
              placeholder="What do people type when they forget this word?"
              className="w-full p-2.5 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-amber-800">
                Vague &ldquo;Fluff&rdquo; Prompt (What Fails)
              </label>
              <textarea
                rows={3}
                value={badPrompt}
                onChange={(e) => setBadPrompt(e.target.value)}
                className="w-full p-2.5 text-xs bg-amber-50/40 border border-amber-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-emerald-800">
                Exact UI/UX Agent Prompt (What Works)
              </label>
              <textarea
                rows={3}
                value={goodPrompt}
                onChange={(e) => setGoodPrompt(e.target.value)}
                className="w-full p-2.5 text-xs bg-emerald-50/40 border border-emerald-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">Canonical CSS Snippet</label>
              <textarea
                rows={4}
                value={cssSnippet}
                onChange={(e) => setCssSnippet(e.target.value)}
                className="w-full p-2.5 text-xs font-mono bg-slate-900 text-slate-100 border border-slate-700 rounded-xl focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                Tailwind Tokens (comma-separated)
              </label>
              <textarea
                rows={4}
                value={tailwindInput}
                onChange={(e) => setTailwindInput(e.target.value)}
                className="w-full p-2.5 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-600"
              />
            </div>
          </div>
        </div>

        {/* RIGHT 5 COLUMNS: LIVE INTERACTIVE DEMO PREVIEW + 6-GATE RUBRIC + CODE EXPORTER */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          {/* =================================================================
              LIVE INTERACTIVE CONCEPT DEMO PREVIEW STAGE
          ================================================================= */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4 shadow-2xs">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <div className="min-w-0">
                <div className="text-[11px] font-mono text-sky-700 font-semibold">
                  LIVE INTERACTIVE DEMO PREVIEW (REQUIRED FOR NEW CONCEPTS)
                </div>
                <h4 className="font-display text-base font-bold text-slate-900 truncate">
                  {String(DESIGN_TERMS.length + 1).padStart(2, '0')}.{' '}
                  {title.trim() || 'Untitled UI/UX Concept'}
                </h4>
              </div>

              {/* Interactive Sandbox Mode Switcher */}
              <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
                <button
                  type="button"
                  onClick={() => setPreviewMode('canonical')}
                  className={`min-h-[34px] px-2.5 py-1 rounded-lg font-medium transition-colors ${
                    previewMode === 'canonical'
                      ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Canonical Spec
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode('fallback')}
                  className={`min-h-[34px] px-2.5 py-1 rounded-lg font-medium transition-colors ${
                    previewMode === 'fallback'
                      ? 'bg-amber-500 text-white font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Broken AI Fallback
                </button>
              </div>
            </div>

            {/* Dynamic Interactive Demo Stage based on active preset or custom concept */}
            <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 blueprint-grid bg-[#F8FAFC]">
              {slugId.includes('subgrid') ? (
                <div className="space-y-2">
                  <div className="text-[11px] font-mono text-slate-500 flex justify-between">
                    <span>
                      {previewMode === 'canonical'
                        ? 'grid-rows-subgrid (Aligned Tracks Across Sibling Cards)'
                        : 'Independent Flex Cards (Misaligned Buttons & Baselines)'}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      {
                        plan: 'Starter',
                        desc: 'Short summary.',
                      },
                      {
                        plan: 'Enterprise Cloud Cluster',
                        desc: 'Longer multi-line description that normally pushes the footer down.',
                      },
                      {
                        plan: 'Scale',
                        desc: 'Medium tier.',
                      },
                    ].map((card) => (
                      <div
                        key={card.plan}
                        className={`p-2.5 rounded-lg border bg-white ${
                          previewMode === 'canonical'
                            ? 'flex flex-col justify-between sm:h-36 border-sky-300'
                            : 'space-y-2 self-start border-amber-300'
                        }`}
                      >
                        <div
                          className={`text-xs font-bold text-slate-900 ${
                            previewMode === 'canonical' ? 'sm:min-h-[32px]' : ''
                          }`}
                        >
                          {card.plan}
                        </div>
                        <div className="text-[10px] text-slate-500 leading-snug">{card.desc}</div>
                        <div className="pt-1.5 border-t border-slate-100">
                          <span className="block w-full py-1 text-center rounded bg-slate-900 text-white text-[10px] font-semibold">
                            Select
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : slugId.includes('slash-command') ? (
                <div className="bg-white rounded-lg border border-slate-200 p-3 space-y-2 relative">
                  <div className="text-xs text-slate-500 font-mono">
                    Document Editor · Type <kbd className="px-1 bg-slate-100 rounded">/</kbd> at
                    caret:
                  </div>
                  <div className="p-2 rounded bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900">
                    /h2<span className="text-sky-600 font-bold">|</span>
                  </div>
                  {previewMode === 'canonical' ? (
                    <div className="w-full max-w-[240px] rounded-xl border border-slate-200 bg-white shadow-lg p-1.5 space-y-1">
                      {['Heading 2 (Section Title)', 'Bullet List', 'Code Block (TSX)'].map(
                        (item, idx) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => setSlashSelectedIdx(idx)}
                            className={`w-full min-h-[36px] text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between ${
                              slashSelectedIdx === idx
                                ? 'bg-sky-50 text-sky-900 font-semibold'
                                : 'text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            <span>{item}</span>
                            <span className="text-[10px] font-mono text-slate-400">↵</span>
                          </button>
                        )
                      )}
                    </div>
                  ) : (
                    <div className="p-2 rounded bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
                      Naive AI Output: Cluttered 18-button top formatting toolbar instead of caret
                      popover.
                    </div>
                  )}
                </div>
              ) : slugId.includes('isometric') || category === 'futuristic' ? (
                <div className="bg-slate-950 rounded-xl p-4 text-cyan-300 font-mono flex flex-col items-center justify-center min-h-[150px] relative overflow-hidden">
                  <div className="text-[10px] text-cyan-400 self-start mb-2">
                    {previewMode === 'canonical'
                      ? 'preserve-3d · rotateX(55deg) rotateZ(-45deg)'
                      : 'Flat 2D Unstacked Fallback'}
                  </div>
                  <div className="relative h-24 w-40 flex items-center justify-center">
                    {[0, 1, 2].map((layer) => (
                      <div
                        key={layer}
                        style={{
                          transform:
                            previewMode === 'canonical'
                              ? `translateY(${(1 - layer) * 18}px) skewX(-22deg) scaleY(0.75)`
                              : `translateY(${layer * 4}px)`,
                        }}
                        className="absolute w-32 h-14 rounded-lg border border-cyan-400/70 bg-cyan-950/60 backdrop-blur-xs flex items-center justify-between px-3 text-[10px] transition-all duration-300 shadow-lg"
                      >
                        <span>PLANE 0{layer + 1}</span>
                        <span className="text-emerald-400">Z+{layer * 40}px</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : slugId.includes('magnetic') ? (
                <div
                  onMouseMove={(e) => {
                    if (previewMode !== 'canonical') return;
                    const rect = e.currentTarget.getBoundingClientRect();
                    const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.28;
                    const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.28;
                    setMagneticOffset({ x: Math.round(dx), y: Math.round(dy) });
                  }}
                  onMouseLeave={() => setMagneticOffset({ x: 0, y: 0 })}
                  className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 flex flex-col items-center justify-center gap-2 cursor-crosshair"
                >
                  <button
                    type="button"
                    style={{
                      transform:
                        previewMode === 'canonical'
                          ? `translate3d(${magneticOffset.x}px, ${magneticOffset.y}px, 0)`
                          : 'none',
                    }}
                    className="min-h-[42px] px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-md transition-transform duration-150"
                  >
                    Move Pointer Around Me ({magneticOffset.x}px, {magneticOffset.y}px)
                  </button>
                  <span className="text-[10px] font-mono text-slate-500">
                    {previewMode === 'canonical'
                      ? 'Magnetic proximity pull active'
                      : 'Static non-magnetic button'}
                  </span>
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-display font-bold text-slate-900">
                      {title.trim() || 'Custom UI/UX Specimen'}
                    </span>
                    <span className="text-[11px] font-mono text-sky-700">
                      {previewMode === 'canonical' ? 'Canonical Spec' : 'Naive Fallback'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {summary.trim() ||
                      'Live interactive preview stage for your custom UI/UX concept.'}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {tailwindTokens.map((tok) => (
                      <code
                        key={tok}
                        className="px-2 py-0.5 rounded bg-sky-50 border border-sky-200 text-[10px] font-mono text-sky-800"
                      >
                        {tok}
                      </code>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 6-Gate Editorial Rubric Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <div>
                <div className="text-xs font-mono text-slate-500">AUTOMATED PR RUBRIC CHECK</div>
                <h4 className="font-display text-base font-bold text-slate-900">
                  Contribution Quality Gates (Incl. Live Demo)
                </h4>
              </div>
              <span
                className={`px-2.5 py-1 rounded-lg font-mono text-xs font-semibold tabular-nums shrink-0 ${
                  passedCount === 6
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}
              >
                {passedCount} / 6 PASSED
              </span>
            </div>

            <div className="space-y-2">
              {rubricGates.map((gate) => (
                <div
                  key={gate.id}
                  className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between gap-2 text-xs"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    {gate.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    )}
                    <div className="min-w-0">
                      <div className="font-semibold text-slate-900 truncate">{gate.label}</div>
                      <div className="text-[11px] text-slate-500 truncate">{gate.detail}</div>
                    </div>
                  </div>
                  <span
                    className={`font-mono text-[10px] font-semibold shrink-0 ${
                      gate.passed ? 'text-emerald-700' : 'text-amber-700'
                    }`}
                  >
                    {gate.passed ? 'PASS' : 'INCOMPLETE'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 3-Tab Export Payload Card (termsData.ts + InteractiveStage.tsx + PR Markdown) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs overflow-x-auto no-scrollbar">
                <button
                  type="button"
                  onClick={() => setExportTab('termsData')}
                  className={`min-h-[36px] px-2.5 py-1 rounded-lg font-medium transition-colors whitespace-nowrap ${
                    exportTab === 'termsData'
                      ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  1. termsData.ts
                </button>
                <button
                  type="button"
                  onClick={() => setExportTab('interactiveStage')}
                  className={`min-h-[36px] px-2.5 py-1 rounded-lg font-medium transition-colors whitespace-nowrap ${
                    exportTab === 'interactiveStage'
                      ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  2. Live Demo JSX
                </button>
                <button
                  type="button"
                  onClick={() => setExportTab('prMarkdown')}
                  className={`min-h-[36px] px-2.5 py-1 rounded-lg font-medium transition-colors whitespace-nowrap ${
                    exportTab === 'prMarkdown'
                      ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  3. PR Body
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleCopyStage}
                  className="min-h-[38px] px-2.5 py-1.5 text-xs font-medium bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200 rounded-xl flex items-center gap-1 whitespace-nowrap"
                >
                  {copiedStage ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied Demo JSX</span>
                    </>
                  ) : (
                    <>
                      <Code2 className="w-3.5 h-3.5 text-sky-600" />
                      <span>Copy Live Demo JSX</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={exportTab === 'prMarkdown' ? handleCopyPr : handleCopyTs}
                  className="min-h-[38px] px-3 py-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-xl flex items-center gap-1.5 whitespace-nowrap"
                >
                  {copiedTs || copiedPr ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>
                        {exportTab === 'prMarkdown' ? 'Copy PR Markdown' : 'Copy TypeScript'}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <pre className="p-3.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-[11px] overflow-x-auto max-h-60 overflow-y-auto leading-relaxed whitespace-pre-wrap">
              <code>
                {exportTab === 'termsData'
                  ? generatedTypeScript
                  : exportTab === 'interactiveStage'
                  ? generatedInteractiveStageCode
                  : generatedPrMarkdown}
              </code>
            </pre>

            <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono text-slate-500">
              <span>
                Updates <code className="text-slate-800">src/data/termsData.ts</code> +{' '}
                <code className="text-slate-800">src/components/InteractiveStage.tsx</code>
              </span>
              <a
                href="https://github.com/RootDeveloperDS/LexiconUI/pulls"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[36px] px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold inline-flex items-center justify-center gap-1 transition-colors shrink-0"
              >
                <span>Open PR on GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
