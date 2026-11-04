export type TermCategory =
  | 'layout'
  | 'navigation'
  | 'typography'
  | 'motion'
  | 'futuristic';

export interface AnatomyPart {
  name: string;
  role: string;
  cssHint: string;
}

export interface SandboxControl {
  id: string;
  label: string;
  type: 'slider' | 'select';
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  options?: { label: string; value: string }[];
  defaultValue: number | string;
}

export interface DesignTerm {
  id: string;
  number: string;
  title: string;
  category: TermCategory;
  categoryLabel: string;
  difficulty: 'Foundational' | 'Intermediate' | 'System Architecture';
  pronunciationOrAlias: string;
  summary: string;
  whyAgentsNeedIt: string;
  vibePhrases: string[];
  badPromptExample: string;
  goodPromptExample: string;
  anatomyParts: AnatomyPart[];
  cssSnippet: string;
  tailwindTokens: string[];
  sandboxControls: SandboxControl[];
  relatedTerms: string[];
}

export const CATEGORY_META: Record<
  TermCategory,
  { label: string; shortLabel: string; description: string; count: number }
> = {
  layout: {
    label: 'Layout & Spatial Systems',
    shortLabel: 'Layout & Spatial',
    description:
      'Bento grids, CSS subgrid, masonry waterfalls, split screens, sticky rails, and spatial math.',
    count: 9,
  },
  navigation: {
    label: 'Navigation & Everyday Components',
    shortLabel: 'Everyday UI & Nav',
    description:
      'Accordions, slash menus, PiP mini-players, OTP inputs, kebab/meatball menus, and sheets.',
    count: 18,
  },
  typography: {
    label: 'Typography & Color Hierarchy',
    shortLabel: 'Type & Color',
    description:
      'Fluid scales, reading measure, tabular numerals, 60-30-10 color balance, and luminance scrims.',
    count: 6,
  },
  motion: {
    label: 'Micro-Interactions & Motion',
    shortLabel: 'Motion & Craft',
    description:
      'Magnetic cursor targets, infinite marquees, scroll progress bars, spring physics, and spotlights.',
    count: 8,
  },
  futuristic: {
    label: 'Sci-Fi, Spatial & Futuristic UI (FUI)',
    shortLabel: 'Sci-Fi & Spatial FUI',
    description:
      'Isometric 3D layer stacks, chamfered HUD reticles, VisionOS glass, CRT scanlines, and node graphs.',
    count: 7,
  },
};

export const DESIGN_TERMS: DesignTerm[] = [
  // ==================== 1. LAYOUT & SPATIAL SYSTEMS (8) ====================
  {
    id: 'bento-grid',
    number: '01',
    title: 'Bento Grid',
    category: 'layout',
    categoryLabel: 'Layout & Spatial Systems',
    difficulty: 'Foundational',
    pronunciationOrAlias: 'Asymmetric Multi-Span CSS Grid',
    summary:
      'A modular, compartmentalized grid layout inspired by Japanese bento boxes where rectangular cells span varying column and row ratios to establish visual hierarchy.',
    whyAgentsNeedIt:
      'When you ask an AI for "a cool feature grid with different sized boxes," it often outputs broken flex-wrap cards with uneven bottom edges. Asking for a "3-column CSS Grid Bento Layout with explicit col-span and row-span cells" guarantees a flush outer rectangle.',
    vibePhrases: [
      'boxes of different sizes',
      'apple style feature grid',
      'uneven grid of cards that fit together',
      'mosaic dashboard tiles',
      'cards where one is wide and one is tall',
    ],
    badPromptExample:
      'Make a modern section with 4 or 5 feature cards of different sizes like Apple does in their presentations so it looks dynamic and not boring.',
    goodPromptExample:
      'Build a 3-column CSS Grid Bento Layout (grid-cols-1 md:grid-cols-3 auto-rows-[220px] gap-4). Make the primary hero feature span 2 columns (md:col-span-2), the vertical telemetry card span 2 rows (md:row-span-2), and the remaining 2 cards span 1x1 so the outer perimeter forms a flush rectangle.',
    anatomyParts: [
      {
        name: 'Anchor Cell (Hero Span)',
        role: 'Primary focal card spanning 2 columns or 2x2 to anchor the eye first.',
        cssHint: 'md:col-span-2 md:row-span-1',
      },
      {
        name: 'Vertical Pillar Cell',
        role: 'Tall 1x2 card suited for timelines, mobile previews, or vertical lists.',
        cssHint: 'md:col-span-1 md:row-span-2',
      },
      {
        name: 'Uniform Gutter Track',
        role: 'Consistent gap (16px–24px) separating all cells equally on both axes.',
        cssHint: 'gap-4 lg:gap-6',
      },
      {
        name: 'Implicit Row Track',
        role: 'Fixed minimum row height preventing cells from collapsing on short text.',
        cssHint: 'auto-rows-[minmax(200px,auto)]',
      },
    ],
    cssSnippet: `.bento-container {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-auto-rows: minmax(210px, auto);
  gap: 16px;
}
.bento-hero { grid-column: span 2 / span 2; }
.bento-tall { grid-row: span 2 / span 2; }`,
    tailwindTokens: ['grid-cols-3', 'auto-rows-[210px]', 'col-span-2', 'row-span-2', 'gap-4'],
    sandboxControls: [
      {
        id: 'heroSpan',
        label: 'Hero Cell Column Span',
        type: 'select',
        options: [
          { label: '2 Columns (Asymmetric Bento)', value: '2' },
          { label: '3 Columns (Full Top Banner)', value: '3' },
          { label: '1 Column (Uniform Grid)', value: '1' },
        ],
        defaultValue: '2',
      },
      {
        id: 'gapSize',
        label: 'Grid Gutter (gap)',
        type: 'slider',
        min: 8,
        max: 32,
        step: 4,
        unit: 'px',
        defaultValue: 16,
      },
      {
        id: 'radius',
        label: 'Cell Border Radius',
        type: 'slider',
        min: 0,
        max: 24,
        step: 4,
        unit: 'px',
        defaultValue: 12,
      },
    ],
    relatedTerms: ['nested-radius', 'spatial-grid', 'masonry-waterfall'],
  },
  {
    id: 'split-screen-hero',
    number: '02',
    title: 'Asymmetric Split-Screen Hero',
    category: 'layout',
    categoryLabel: 'Layout & Spatial Systems',
    difficulty: 'Foundational',
    pronunciationOrAlias: '7:5 or 6:6 Two-Column Viewport Split',
    summary:
      'A high-converting above-the-fold layout that divides the viewport into a Left Value Proposition Column (kicker, display headline, lead copy, CTA cluster) and a Right Interactive/Visual Stage.',
    whyAgentsNeedIt:
      'Without specifying column ratios and vertical stretch alignment, AI agents center-align everything into a generic single-column SaaS template or leave awkward height mismatches between left text and right media.',
    vibePhrases: [
      'text on the left and image or demo on the right',
      'two column top section',
      'side by side landing page header',
      'left headline right product preview',
    ],
    badPromptExample:
      'Put the main title and buttons on the left side and put a nice picture or preview of the app on the right side.',
    goodPromptExample:
      'Use a 12-column Asymmetric Split-Screen Hero (grid-cols-1 lg:grid-cols-12 gap-12 items-stretch). Allocate 7 columns on the left for the typographic stack (1-line kicker, balanced display headline max-w-xl, 65ch lead paragraph, primary + secondary CTA row) and 5 columns on the right for an interactive product specimen with items-stretch height parity.',
    anatomyParts: [
      {
        name: 'Eyebrow / Kicker',
        role: 'Quiet 1-line category or release identifier above the main headline.',
        cssHint: 'text-xs font-mono tracking-wider text-sky-700',
      },
      {
        name: 'Balanced Display Headline',
        role: 'Primary hook constrained with text-wrap: balance to prevent orphan words.',
        cssHint: 'text-4xl lg:text-5xl font-bold text-balance',
      },
      {
        name: 'CTA Action Cluster',
        role: 'High-contrast primary button paired with a quiet secondary ghost action.',
        cssHint: 'flex items-center gap-3 pt-2',
      },
      {
        name: 'Right Visual Stage',
        role: 'Interactive preview or media frame stretching to match the left column.',
        cssHint: 'lg:col-span-5 h-full flex items-stretch',
      },
    ],
    cssSnippet: `.hero-split {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 3rem;
  align-items: stretch;
}
.hero-copy { grid-column: span 7 / span 7; }
.hero-stage { grid-column: span 5 / span 5; }`,
    tailwindTokens: ['lg:grid-cols-12', 'lg:col-span-7', 'lg:col-span-5', 'items-stretch', 'text-balance'],
    sandboxControls: [
      {
        id: 'splitRatio',
        label: 'Column Split Ratio (12-Col Grid)',
        type: 'select',
        options: [
          { label: '7 : 5 (Editorial Asymmetric)', value: '7-5' },
          { label: '6 : 6 (Balanced 50/50 Split)', value: '6-6' },
          { label: '5 : 7 (Visual Stage Dominant)', value: '5-7' },
        ],
        defaultValue: '7-5',
      },
      {
        id: 'colGap',
        label: 'Column Separation',
        type: 'slider',
        min: 16,
        max: 64,
        step: 8,
        unit: 'px',
        defaultValue: 32,
      },
    ],
    relatedTerms: ['bento-grid', 'contrast-scrim', 'fluid-typography'],
  },
  {
    id: 'sticky-rail',
    number: '03',
    title: 'Sticky Aside Rail & Scroll Spy',
    category: 'layout',
    categoryLabel: 'Layout & Spatial Systems',
    difficulty: 'Intermediate',
    pronunciationOrAlias: 'Position Sticky Context Sidebar / TOC Rail',
    summary:
      'A secondary vertical column that remains pinned within the viewport while the user scrolls through a long primary content column, highlighting the currently active section via Scroll Spy.',
    whyAgentsNeedIt:
      'Users often say "keep the sidebar on screen when scrolling," causing AI agents to apply position: fixed which overlaps the header or footer. Specifying "sticky aside rail with top offset and self-start alignment inside a flex/grid container" prevents overlap bugs.',
    vibePhrases: [
      'sidebar that stays when you scroll',
      'table of contents on the side that highlights where you are',
      'floating summary card on the right side',
      'panel that follows you down the page',
    ],
    badPromptExample:
      'Keep the table of contents and summary box on the right side so it follows the user as they scroll down the article.',
    goodPromptExample:
      'Implement a 2-column layout with a scrolling primary article column (flex-1) and a 280px Sticky Aside Rail (w-72 sticky top-24 self-start) containing a Scroll-Spy Table of Contents and a summary action card.',
    anatomyParts: [
      {
        name: 'Self-Start Anchor (`align-self: start`)',
        role: 'Crucial CSS rule: prevents the rail from stretching to 100% height of the parent grid, allowing sticky behavior to work.',
        cssHint: 'sticky top-24 self-start',
      },
      {
        name: 'Scroll-Spy Indicator',
        role: 'Active section marker that tracks intersection observer positions.',
        cssHint: 'text-sky-600 font-semibold',
      },
      {
        name: 'Primary Scroll Track',
        role: 'Unconstrained main column that drives the page scroll height.',
        cssHint: 'flex-1 min-w-0 space-y-12',
      },
    ],
    cssSnippet: `.layout-with-rail {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 280px;
  gap: 2.5rem;
  align-items: start; /* Mandatory so sticky child can slide */
}
.sticky-rail {
  position: sticky;
  top: 6rem;
}`,
    tailwindTokens: ['sticky', 'top-24', 'self-start', 'items-start', 'w-72'],
    sandboxControls: [
      {
        id: 'activeSection',
        label: 'Simulated Scroll Position (Scroll Spy)',
        type: 'select',
        options: [
          { label: '01. System Architecture', value: '0' },
          { label: '02. Token Hierarchy', value: '1' },
          { label: '03. Spatial Grid Math', value: '2' },
          { label: '04. Accessibility Audit', value: '3' },
        ],
        defaultValue: '1',
      },
      {
        id: 'railPosition',
        label: 'Sticky Rail Placement',
        type: 'select',
        options: [
          { label: 'Right Aside Rail (Documentation)', value: 'right' },
          { label: 'Left Navigation Rail (Catalog)', value: 'left' },
        ],
        defaultValue: 'right',
      },
    ],
    relatedTerms: ['app-shell', 'breadcrumb-trail'],
  },
  {
    id: 'nested-radius',
    number: '04',
    title: 'Concentric Border Radius Math',
    category: 'layout',
    categoryLabel: 'Layout & Spatial Systems',
    difficulty: 'Foundational',
    pronunciationOrAlias: 'Optical Curvature Harmony (R_outer = R_inner + Padding)',
    summary:
      'The geometric rule that when a rounded element sits inside a padded rounded container, the outer border radius must equal the inner border radius plus the padding distance so both curves share the same center point.',
    whyAgentsNeedIt:
      'AI agents routinely put a `rounded-xl` (12px) image inside a `rounded-xl` (12px) card with `p-4` (16px) padding, creating pinched, awkward corners. Specifying Concentric Border Radius Math makes cards look immediately crafted.',
    vibePhrases: [
      'corners that match nicely inside a card',
      'why do my card corners look weird and pinched',
      'smooth nested rounded corners',
      'inner image radius matching outer card radius',
    ],
    badPromptExample:
      'Make the card and the image inside it both have nice rounded corners with some padding around the image.',
    goodPromptExample:
      'Apply Concentric Border Radius Math (r_outer = r_inner + padding): give the outer card container p-4 (16px padding) and rounded-[28px], and give the inner media frame rounded-[12px] so the curves are optically concentric.',
    anatomyParts: [
      {
        name: 'Outer Container Radius (R_outer)',
        role: 'Sum of the inner radius and the container padding (e.g. 12px + 16px = 28px).',
        cssHint: 'rounded-[28px] p-4',
      },
      {
        name: 'Padding Offset Channel (d)',
        role: 'Uniform gap between the outer border and inner element border.',
        cssHint: 'p-4 (16px)',
      },
      {
        name: 'Inner Element Radius (R_inner)',
        role: 'Outer radius minus padding (28px - 16px = 12px) sharing the exact focal origin.',
        cssHint: 'rounded-[12px]',
      },
    ],
    cssSnippet: `.card-outer {
  --inner-radius: 12px;
  --card-padding: 16px;
  padding: var(--card-padding);
  border-radius: calc(var(--inner-radius) + var(--card-padding)); /* 28px */
}
.card-inner-media {
  border-radius: var(--inner-radius); /* 12px */
}`,
    tailwindTokens: ['p-4', 'rounded-[28px]', 'rounded-[12px]'],
    sandboxControls: [
      {
        id: 'innerRadius',
        label: 'Inner Element Radius (R_inner)',
        type: 'slider',
        min: 4,
        max: 24,
        step: 2,
        unit: 'px',
        defaultValue: 12,
      },
      {
        id: 'padding',
        label: 'Container Padding (d)',
        type: 'slider',
        min: 8,
        max: 32,
        step: 4,
        unit: 'px',
        defaultValue: 16,
      },
      {
        id: 'formulaMode',
        label: 'Geometry Mode',
        type: 'select',
        options: [
          { label: 'Concentric (R_outer = R_inner + Padding)', value: 'concentric' },
          { label: 'Broken / Naive (R_outer = R_inner)', value: 'naive' },
        ],
        defaultValue: 'concentric',
      },
    ],
    relatedTerms: ['spatial-grid', 'bento-grid', 'surface-elevation'],
  },
  {
    id: 'spatial-grid',
    number: '05',
    title: '8-Point Grid & Proximity Law',
    category: 'layout',
    categoryLabel: 'Layout & Spatial Systems',
    difficulty: 'Foundational',
    pronunciationOrAlias: 'Gestalt Law of Proximity & Container Padding Rule',
    summary:
      'A spatial rhythm system where all dimensions, paddings, and gaps increment in multiples of 8px (8, 16, 24, 32, 48), governed by the Gestalt Proximity Rule: outer container padding must always be greater than or equal to the inner gap between child items.',
    whyAgentsNeedIt:
      'When cards feel "floaty" or hard to scan, it is almost always because the inner gap between elements is larger than the outer card padding, violating Gestalt proximity.',
    vibePhrases: [
      'clean spacing that feels balanced',
      'why does my card layout look messy',
      'consistent padding and margins',
      'proper distance between title text and card edges',
    ],
    badPromptExample:
      'Put good spacing between all the elements inside the card so it looks clean and readable.',
    goodPromptExample:
      'Enforce the 8pt Spatial Grid and Gestalt Proximity Law: set outer card padding to p-6 (24px), section group gap to gap-4 (16px), and tightly coupled label-to-value gap to gap-1 (4px), ensuring outer padding >= inner child gap.',
    anatomyParts: [
      {
        name: 'Outer Perimeter Padding (24px–32px)',
        role: 'Frames the entire component and must be >= any internal child gap.',
        cssHint: 'p-6 (24px) or p-8 (32px)',
      },
      {
        name: 'Sibling Group Gap (16px)',
        role: 'Separates distinct functional blocks inside the container.',
        cssHint: 'gap-4 (16px)',
      },
      {
        name: 'Micro-Pair Gap (4px–8px)',
        role: 'Binds a label directly to its value or heading to its subcopy.',
        cssHint: 'gap-1 (4px) or gap-2 (8px)',
      },
    ],
    cssSnippet: `.metric-card {
  padding: 24px;          /* Outer >= Inner */
  display: flex;
  flex-direction: column;
  gap: 16px;              /* Inner block gap */
}
.metric-header-pair {
  display: flex;
  flex-direction: column;
  gap: 4px;               /* Tight semantic coupling */
}`,
    tailwindTokens: ['p-6', 'gap-4', 'space-y-1', 'p-8', 'gap-6'],
    sandboxControls: [
      {
        id: 'outerPadding',
        label: 'Outer Container Padding',
        type: 'slider',
        min: 8,
        max: 40,
        step: 8,
        unit: 'px',
        defaultValue: 24,
      },
      {
        id: 'innerGap',
        label: 'Inner Child Gap',
        type: 'slider',
        min: 8,
        max: 40,
        step: 8,
        unit: 'px',
        defaultValue: 16,
      },
    ],
    relatedTerms: ['nested-radius', 'bento-grid'],
  },
  {
    id: 'app-shell',
    number: '06',
    title: 'Workspace App Shell',
    category: 'layout',
    categoryLabel: 'Layout & Spatial Systems',
    difficulty: 'System Architecture',
    pronunciationOrAlias: 'Fixed Sidebar + 3-Zone Top Bar + Independent Scroll Canvas',
    summary:
      'The foundational structural skeleton of modern SaaS and developer applications: a persistent left navigation rail (240px–280px), a 1-row contextual top bar with breadcrumbs and primary CTA, and an independently scrolling main viewport canvas.',
    whyAgentsNeedIt:
      'Asking for a "dashboard layout" often yields a page where the sidebar scrolls away with the table or causes double-scrollbars on the body. Requesting a "Viewport-Locked App Shell (`h-screen overflow-hidden flex`) with an independent `overflow-y-auto` main canvas" creates a rock-solid desktop app feel.',
    vibePhrases: [
      'linear or notion style app layout',
      'left sidebar with top bar and scrolling main area',
      'dashboard skeleton where sidebar stays fixed',
      'full screen workspace layout',
    ],
    badPromptExample:
      'Make a dashboard with a menu on the left, a header at the top, and the main page content in the middle.',
    goodPromptExample:
      'Construct a Viewport-Locked Workspace App Shell (h-screen overflow-hidden grid grid-cols-[240px_1fr]): a persistent 240px left navigation rail with border-r, a right column containing a 56px sticky top bar (Breadcrumb Trail on left, 1 primary CTA on right), and an independently scrolling <main className="flex-1 overflow-y-auto p-6"> canvas.',
    anatomyParts: [
      {
        name: 'Persistent Navigation Rail (240px)',
        role: 'Houses workspace switcher, primary route links, and bottom account footer.',
        cssHint: 'w-60 shrink-0 border-r border-slate-200 flex flex-col',
      },
      {
        name: 'Contextual Top Bar (56px)',
        role: 'Displays current location breadcrumb trail and 1 primary view action.',
        cssHint: 'h-14 border-b border-slate-200 px-6 flex items-center justify-between',
      },
      {
        name: 'Independent Scroll Canvas',
        role: 'Scrollable main stage isolated from the chrome.',
        cssHint: 'flex-1 overflow-y-auto bg-slate-50/50 p-6',
      },
    ],
    cssSnippet: `.app-shell {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  height: 100vh;
  overflow: hidden;
}
.app-main-scroll {
  overflow-y: auto;
  height: calc(100vh - 56px);
}`,
    tailwindTokens: ['h-screen', 'overflow-hidden', 'w-60', 'flex-1', 'overflow-y-auto'],
    sandboxControls: [
      {
        id: 'sidebarWidth',
        label: 'Left Navigation Rail Width',
        type: 'select',
        options: [
          { label: '240px (Standard Workspace)', value: '240' },
          { label: '64px (Collapsed Icon Rail)', value: '64' },
          { label: '280px (Expanded Tree Rail)', value: '280' },
        ],
        defaultValue: '240',
      },
      {
        id: 'inspectorOpen',
        label: 'Right Inspector Drawer',
        type: 'select',
        options: [
          { label: 'Closed (2-Column Shell)', value: 'closed' },
          { label: 'Open (3-Pane IDE / Studio Shell)', value: 'open' },
        ],
        defaultValue: 'open',
      },
    ],
    relatedTerms: ['sticky-rail', 'breadcrumb-trail', 'slide-over-drawer'],
  },
  {
    id: 'masonry-waterfall',
    number: '07',
    title: 'Masonry Grid (Waterfall Layout)',
    category: 'layout',
    categoryLabel: 'Layout & Spatial Systems',
    difficulty: 'Intermediate',
    pronunciationOrAlias: 'Multi-Column Staggered Height Packing (`columns-3`)',
    summary:
      'A vertical waterfall layout (famous from Pinterest and Are.na) where cards of varying natural heights pack tightly underneath one another inside vertical columns without leaving blank horizontal row gaps.',
    whyAgentsNeedIt:
      'If you ask for a "grid of testimonials or photos of different heights," standard CSS Grid stretches every card in a row to match the tallest card, leaving huge empty gaps. Asking for a **CSS Multi-Column Masonry Waterfall (`columns-1 md:columns-3 gap-4 space-y-4` with `break-inside-avoid`)** packs variable-height cards seamlessly.',
    vibePhrases: [
      'pinterest style grid where cards have different heights',
      'staggered wall of testimonials with no gaps between rows',
      'waterfall photo gallery layout',
      'cards of uneven heights that pack tightly together',
    ],
    badPromptExample:
      'Put all the customer reviews of different lengths in a 3-column grid so there is no wasted empty space under the short reviews.',
    goodPromptExample:
      'Use a Masonry Waterfall Layout (`columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4`) and apply `break-inside-avoid` to every child card so variable-height testimonials pack tightly without row-height stretching.',
    anatomyParts: [
      {
        name: 'Multi-Column Flow Container (`columns-3`)',
        role: 'Distributes items top-to-bottom down vertical column tracks.',
        cssHint: 'columns-1 md:columns-3 gap-4 space-y-4',
      },
      {
        name: 'Break-Inside Guard (`break-inside-avoid`)',
        role: 'Prevents a single card from splitting awkwardly across two columns.',
        cssHint: 'break-inside-avoid rounded-xl border p-4',
      },
    ],
    cssSnippet: `.masonry-wall {
  column-count: 3;
  column-gap: 1rem;
}
.masonry-item {
  break-inside: avoid;
  margin-bottom: 1rem;
}`,
    tailwindTokens: ['columns-3', 'gap-4', 'space-y-4', 'break-inside-avoid'],
    sandboxControls: [
      {
        id: 'packMode',
        label: 'Grid Packing Algorithm',
        type: 'select',
        options: [
          { label: 'Masonry Waterfall (columns-3 · Tight Vertical Pack)', value: 'masonry' },
          { label: 'Naive CSS Grid (Row Height Stretches to Tallest Card)', value: 'naive-grid' },
        ],
        defaultValue: 'masonry',
      },
    ],
    relatedTerms: ['bento-grid', 'spatial-grid'],
  },
  {
    id: 'scroll-snap-carousel',
    number: '08',
    title: 'CSS Scroll-Snap Carousel',
    category: 'layout',
    categoryLabel: 'Layout & Spatial Systems',
    difficulty: 'Foundational',
    pronunciationOrAlias: 'Magnetic Axis-Locked Swipe Track (`scroll-snap-type: x mandatory`)',
    summary:
      'A native CSS horizontal (or vertical) scroll container where swiping or scrolling magnetically locks each child card into a precise alignment anchor (`snap-center` or `snap-start`), with peekaboo edge padding showing the next card.',
    whyAgentsNeedIt:
      'Instead of importing heavy, buggy JavaScript carousel libraries, asking an AI agent for a **Native CSS Scroll-Snap Track (`overflow-x-auto snap-x snap-mandatory flex gap-4`) with `snap-start shrink-0` cards** gives you 120fps hardware-accelerated trackpad and touch swiping.',
    vibePhrases: [
      'horizontal slider that locks onto each card when you swipe',
      'netflix or app store horizontal card row',
      'carousel where you can see a peek of the next card on the right',
      'magnetic horizontal scroll row',
    ],
    badPromptExample:
      'Make a horizontal slider of cards that the user can swipe through and have it stop nicely on each card.',
    goodPromptExample:
      'Build a native CSS Scroll-Snap Carousel (`flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scroll-smooth`) where each card has `snap-start shrink-0 w-72` so trackpad and touch swipes magnetically lock onto card boundaries while revealing a partial peek of the next card.',
    anatomyParts: [
      {
        name: 'Mandatory Snap Track (`snap-x snap-mandatory`)',
        role: 'Enforces magnetic resting points along the horizontal scroll axis.',
        cssHint: 'flex overflow-x-auto snap-x snap-mandatory gap-4',
      },
      {
        name: 'Snap-Aligned Card (`snap-start shrink-0`)',
        role: 'Locks its leading edge to the container scrollport on release.',
        cssHint: 'snap-start shrink-0 w-64',
      },
      {
        name: 'Next-Card Affordance Peek',
        role: 'Sizing cards so ~2.3 cards fit in view signals horizontal scrollability.',
        cssHint: 'w-[42%] shrink-0',
      },
    ],
    cssSnippet: `.snap-carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 16px;
}
.snap-card {
  scroll-snap-align: start;
  flex: 0 0 260px;
}`,
    tailwindTokens: ['overflow-x-auto', 'snap-x', 'snap-mandatory', 'snap-start', 'shrink-0'],
    sandboxControls: [
      {
        id: 'activeSnapCard',
        label: 'Simulated Snap Target Card',
        type: 'select',
        options: [
          { label: 'Card 01 (Snap Start)', value: '0' },
          { label: 'Card 02 (Centered Lock)', value: '1' },
          { label: 'Card 03 (Terminal Card)', value: '2' },
        ],
        defaultValue: '0',
      },
    ],
    relatedTerms: ['bento-grid', 'spring-physics'],
  },

  // ==================== 2. NAVIGATION & EVERYDAY UI COMPONENTS (15) ====================
  {
    id: 'command-palette',
    number: '09',
    title: 'Command Palette (Cmd+K Omnibar)',
    category: 'navigation',
    categoryLabel: 'Navigation & Everyday Components',
    difficulty: 'Intermediate',
    pronunciationOrAlias: 'Keyboard-First Modal Launcher / Spotlight Bar',
    summary:
      'A keyboard-triggered modal overlay (`Cmd+K` or `Ctrl+K`) featuring an auto-focused fuzzy search input, categorized action groups, keyboard arrow navigation, and shortcut keybind hints (`<kbd>`).',
    whyAgentsNeedIt:
      'Vibe coders often ask for "a popup search box like Raycast or Linear," and get a plain `<input>` inside a centered `<div>`. Naming a "Command Palette with auto-focused search input, grouped result sections, active keyboard highlight row, and footer `<kbd>` legend" produces an authentic power-user launcher.',
    vibePhrases: [
      'that popup when you press ctrl+k or cmd+k',
      'spotlight search bar in the middle of the screen',
      'linear or raycast quick action menu',
      'keyboard shortcut search popup',
    ],
    badPromptExample:
      'Add a popup search box that opens when the user presses Ctrl+K so they can search pages and actions.',
    goodPromptExample:
      'Implement a Command Palette modal triggered by Cmd/Ctrl+K or header search button: center-top positioned (top-[18%] max-w-xl w-full), backdrop-blur scrim, auto-focused search input with Esc badge, categorized action groups (Navigation, Actions, Theme), Up/Down arrow active row state, and a bottom footer showing <kbd>↑↓</kbd> to navigate and <kbd>↵</kbd> to select.',
    anatomyParts: [
      {
        name: 'Auto-Focused Omnibar Input',
        role: 'Immediate text entry field with magnifying glass icon and Esc keycap hint.',
        cssHint: 'w-full px-4 py-3.5 text-base border-b border-slate-200 focus:outline-none',
      },
      {
        name: 'Categorized Action Group',
        role: 'Sectioned list grouping Navigation routes separately from Quick Commands.',
        cssHint: 'px-2 py-1.5 text-xs font-medium text-slate-400',
      },
      {
        name: 'Active Highlight Row',
        role: 'Currently focused item showing right-aligned keyboard shortcut <kbd> tokens.',
        cssHint: 'bg-sky-50 text-sky-900 rounded-lg px-3 py-2 flex justify-between',
      },
      {
        name: 'Keybind Legend Footer',
        role: 'Bottom bar teaching keyboard navigation affordances.',
        cssHint: 'bg-slate-50 px-4 py-2 border-t text-xs text-slate-500 flex gap-4',
      },
    ],
    cssSnippet: `.cmd-palette-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  padding-top: 14vh;
}`,
    tailwindTokens: ['fixed inset-0', 'backdrop-blur-xs', 'max-w-xl', 'divide-y', 'font-mono'],
    sandboxControls: [
      {
        id: 'queryFilter',
        label: 'Simulated Search Filter',
        type: 'select',
        options: [
          { label: 'All Commands (Default Open State)', value: 'all' },
          { label: 'Filtered: "layout" (2 matches)', value: 'layout' },
          { label: 'Filtered: "export" (Action match)', value: 'export' },
          { label: 'Zero Matches (Empty Search State)', value: 'none' },
        ],
        defaultValue: 'all',
      },
    ],
    relatedTerms: ['overlay-taxonomy', 'segmented-control', 'focus-ring'],
  },
  {
    id: 'segmented-control',
    number: '10',
    title: 'Segmented Control',
    category: 'navigation',
    categoryLabel: 'Navigation & Everyday Components',
    difficulty: 'Foundational',
    pronunciationOrAlias: 'Mutually Exclusive Inline Pill/Tab Switcher',
    summary:
      'A compact horizontal set of 2–5 mutually exclusive button segments housed inside a shared recessed track, where selecting one option immediately switches the view state or filter without a page reload.',
    whyAgentsNeedIt:
      'People often ask for "a toggle button with 3 options" or "little filter buttons next to each other," resulting in disconnected buttons. Asking for a "Segmented Control with a recessed `bg-slate-100 p-1 rounded-lg` track and an elevated `bg-white shadow-xs` active thumb" creates a tactile, cohesive switcher.',
    vibePhrases: [
      'toggle switch with 3 or 4 options',
      'monthly vs annual switcher bar',
      'connected buttons where one is highlighted white',
      'ios style tab switcher bar',
    ],
    badPromptExample:
      'Put three buttons at the top so the user can switch between Daily, Weekly, and Monthly views.',
    goodPromptExample:
      'Use a Segmented Control (inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200/80) containing 3 single-line <button> segments (Daily, Weekly, Monthly). Style the active segment with bg-white text-slate-900 shadow-xs rounded-md and inactive segments with text-slate-600 hover:text-slate-900.',
    anatomyParts: [
      {
        name: 'Recessed Outer Track',
        role: 'Muted container with 4px (`p-1`) internal padding that frames all options.',
        cssHint: 'inline-flex p-1 bg-slate-100 rounded-lg',
      },
      {
        name: 'Elevated Active Segment',
        role: 'High-contrast surface with concentric inner radius (`rounded-md`) and subtle shadow.',
        cssHint: 'bg-white text-slate-900 shadow-xs rounded-md px-3 py-1.5',
      },
      {
        name: 'Single-Line Label (`whitespace-nowrap`)',
        role: 'Concise 1–2 word label that never wraps onto two lines.',
        cssHint: 'text-xs font-medium whitespace-nowrap',
      },
    ],
    cssSnippet: `.segmented-track {
  display: inline-flex;
  padding: 4px;
  background: #F1F5F9;
  border-radius: 10px;
}
.segment-btn[data-active="true"] {
  background: #FFFFFF;
  color: #0F172A;
  border-radius: 6px; /* Concentric: 10px - 4px = 6px */
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08);
}`,
    tailwindTokens: ['inline-flex', 'p-1', 'bg-slate-100', 'rounded-lg', 'bg-white', 'shadow-xs', 'whitespace-nowrap'],
    sandboxControls: [
      {
        id: 'activeSegment',
        label: 'Selected Segment State',
        type: 'select',
        options: [
          { label: 'Segment 1: Preview Stage', value: 'preview' },
          { label: 'Segment 2: Blueprint Spec', value: 'blueprint' },
          { label: 'Segment 3: Prompt Output', value: 'prompt' },
        ],
        defaultValue: 'preview',
      },
      {
        id: 'density',
        label: 'Control Density',
        type: 'select',
        options: [
          { label: 'Compact Toolbar (text-xs py-1.5)', value: 'compact' },
          { label: 'Standard Hero Switcher (text-sm py-2)', value: 'standard' },
        ],
        defaultValue: 'compact',
      },
    ],
    relatedTerms: ['nested-radius', 'command-palette'],
  },
  {
    id: 'slide-over-drawer',
    number: '11',
    title: 'Slide-Over Drawer (Sheet)',
    category: 'navigation',
    categoryLabel: 'Navigation & Everyday Components',
    difficulty: 'Intermediate',
    pronunciationOrAlias: 'Off-Canvas Contextual Detail Panel',
    summary:
      'A full-height overlay panel anchored to the right (or left/bottom) edge of the viewport that slides in over a dimmed backdrop scrim to display deep item details, forms, or carts without losing the parent page scroll context.',
    whyAgentsNeedIt:
      'When users ask for "a popup to edit a row," AI agents default to a cramped centered modal that cuts off long forms. A "Right-Anchored Slide-Over Drawer (`fixed inset-y-0 right-0 w-full max-w-md`) with sticky header and sticky action footer" handles long vertical content gracefully.',
    vibePhrases: [
      'panel that slides out from the right side',
      'side popup for shopping cart or settings',
      'off-canvas detail panel',
      'drawer that opens over the page',
    ],
    badPromptExample:
      'When clicking a table row, open a popup on the side where the user can see all the details and edit them.',
    goodPromptExample:
      'Open a Right-Anchored Slide-Over Drawer (fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col) over a backdrop scrim (bg-slate-900/30). Structure the drawer into 3 zones: a sticky header with title & close button, an overflow-y-auto body, and a sticky bottom footer with Cancel and Save actions.',
    anatomyParts: [
      {
        name: 'Backdrop Scrim',
        role: 'Dimmed translucent overlay that closes the drawer when clicked.',
        cssHint: 'fixed inset-0 bg-slate-950/30 backdrop-blur-[1px]',
      },
      {
        name: 'Sticky Drawer Header',
        role: 'Pinned top bar showing the entity title, ID, and Esc/Close button.',
        cssHint: 'px-6 py-4 border-b border-slate-200 flex items-center justify-between',
      },
      {
        name: 'Scrollable Inspector Body',
        role: 'Independent scroll container holding forms, logs, or cart items.',
        cssHint: 'flex-1 overflow-y-auto p-6 space-y-6',
      },
      {
        name: 'Sticky Action Footer',
        role: 'Pinned bottom bar keeping Save/Cancel buttons always reachable.',
        cssHint: 'px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3',
      },
    ],
    cssSnippet: `.slide-over-sheet {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(100vw, 420px);
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  box-shadow: -12px 0 32px rgba(15, 23, 42, 0.12);
}`,
    tailwindTokens: ['fixed inset-y-0 right-0', 'max-w-md', 'flex-col', 'overflow-y-auto', 'shadow-2xl'],
    sandboxControls: [
      {
        id: 'drawerState',
        label: 'Drawer State',
        type: 'select',
        options: [
          { label: 'Open (Inspecting Selected Record)', value: 'open' },
          { label: 'Closed (Parent Table View)', value: 'closed' },
        ],
        defaultValue: 'open',
      },
      {
        id: 'anchorEdge',
        label: 'Sheet Anchor Edge',
        type: 'select',
        options: [
          { label: 'Right Edge (Detail / Cart Sheet)', value: 'right' },
          { label: 'Bottom Sheet (Mobile / Drawer)', value: 'bottom' },
        ],
        defaultValue: 'right',
      },
    ],
    relatedTerms: ['overlay-taxonomy', 'bottom-sheet', 'contrast-scrim'],
  },
  {
    id: 'breadcrumb-trail',
    number: '12',
    title: 'Breadcrumb Trail',
    category: 'navigation',
    categoryLabel: 'Navigation & Everyday Components',
    difficulty: 'Foundational',
    pronunciationOrAlias: 'Hierarchical Path Locator',
    summary:
      'A secondary navigation trail displaying the user’s current hierarchical location within a multi-level app (`Workspace / Project / Current View`), using quiet typographic separators (`/`, `›`) and a high-contrast terminal node.',
    whyAgentsNeedIt:
      'Helps AI agents place hierarchical context cleanly in the Top Bar without cluttering the primary navigation or inventing bulky "Back" buttons everywhere.',
    vibePhrases: [
      'path at the top showing folder > subfolder > page',
      'navigation trail with slashes or arrows',
      'where am i path links at the top left',
      'breadcrumbs link trail',
    ],
    badPromptExample:
      'Show the folder path at the top of the page so the user can click back to previous folders.',
    goodPromptExample:
      'Render a semantic Breadcrumb Trail (<nav aria-label="Breadcrumb">) in the top bar: style parent ancestor links in muted slate (text-slate-500 hover:text-slate-900), separate nodes with quiet "/" or chevron glyphs (text-slate-300), and render the current terminal page node in semibold ink (text-slate-900 font-medium aria-current="page").',
    anatomyParts: [
      {
        name: 'Ancestor Link Node',
        role: 'Clickable parent level that navigates up the hierarchy.',
        cssHint: 'text-sm text-slate-500 hover:text-slate-900 transition-colors',
      },
      {
        name: 'Typographic Separator (`/` or `›`)',
        role: 'Low-contrast decorative divider hidden from screen readers (`aria-hidden="true"`).',
        cssHint: 'text-slate-300 select-none px-1',
      },
      {
        name: 'Current Terminal Node',
        role: 'Non-clickable active page title marked with `aria-current="page"`.',
        cssHint: 'text-sm font-semibold text-slate-900 truncate',
      },
    ],
    cssSnippet: `<nav aria-label="Breadcrumb" class="flex items-center gap-2 text-sm">
  <a href="/workspace" class="text-slate-500 hover:text-slate-900">Workspace</a>
  <span aria-hidden="true" class="text-slate-300">/</span>
  <span aria-current="page" class="font-semibold text-slate-900">Design Tokens</span>
</nav>`,
    tailwindTokens: ['aria-label="Breadcrumb"', 'aria-current="page"', 'text-slate-500', 'truncate'],
    sandboxControls: [
      {
        id: 'separatorStyle',
        label: 'Separator Glyph',
        type: 'select',
        options: [
          { label: 'Architectural Slash ( / )', value: 'slash' },
          { label: 'Chevron Arrow ( › )', value: 'chevron' },
          { label: 'Mid-Dot ( · )', value: 'dot' },
        ],
        defaultValue: 'slash',
      },
      {
        id: 'depth',
        label: 'Hierarchy Depth',
        type: 'select',
        options: [
          { label: '3 Levels (Standard)', value: '3' },
          { label: '5 Levels (With Middle Ellipsis Collapse)', value: '5' },
        ],
        defaultValue: '3',
      },
    ],
    relatedTerms: ['app-shell', 'sticky-rail'],
  },
  {
    id: 'accordion-disclosure',
    number: '13',
    title: 'Accordion & Progressive Disclosure',
    category: 'navigation',
    categoryLabel: 'Navigation & Everyday Components',
    difficulty: 'Foundational',
    pronunciationOrAlias: 'Vertically Stacked Collapsible Disclosure Panels',
    summary:
      'A vertically stacked list of interactive headers that expand or collapse associated content panels on click—practicing Progressive Disclosure so users scan high-level questions or settings first without cognitive overload.',
    whyAgentsNeedIt:
      'Many people call this "those expandable FAQ bars" or "dropdown boxes for questions" (which confuses AI into rendering `<select>` dropdowns!). Asking for an **Accordion with 1px hairline dividers, rotating chevron affordance, and `aria-expanded` state** builds the exact collapsible FAQ/settings pattern.',
    vibePhrases: [
      'expandable faq bars that open when you click the plus or arrow',
      'collapsible sections for questions and answers',
      'click a row to expand more details underneath it',
      'dropdown text bars on pricing pages',
    ],
    badPromptExample:
      'Add a list of questions at the bottom where clicking a question drops down the answer.',
    goodPromptExample:
      'Build an Accordion component (`divide-y divide-slate-200 border-y border-slate-200`) practicing Progressive Disclosure: each item renders a full-width `<button aria-expanded={isOpen}>` header with a 180deg rotating chevron icon and reveals its answer panel smoothly below.',
    anatomyParts: [
      {
        name: 'Disclosure Trigger Header (`<button>`)',
        role: 'Full-width clickable bar containing the question/title and state icon.',
        cssHint: 'w-full py-4 flex items-center justify-between text-left font-semibold',
      },
      {
        name: 'Rotating Affordance Icon (`ChevronDown` / `Plus`)',
        role: 'Rotates 180deg (chevron) or 45deg (plus -> close) when expanded.',
        cssHint: 'transition-transform duration-180 rotate-180',
      },
      {
        name: 'Collapsible Content Region',
        role: 'Revealed prose panel constrained to 65ch reading measure.',
        cssHint: 'pb-4 text-sm text-slate-600 max-w-[65ch]',
      },
    ],
    cssSnippet: `.accordion-stack {
  border-top: 1px solid #E2E8F0;
  border-bottom: 1px solid #E2E8F0;
}
.accordion-trigger[aria-expanded="true"] .chevron {
  transform: rotate(180deg);
}`,
    tailwindTokens: ['divide-y', 'aria-expanded', 'rotate-180', 'transition-transform'],
    sandboxControls: [
      {
        id: 'behaviorMode',
        label: 'Expansion Behavior',
        type: 'select',
        options: [
          { label: 'Single-Expand (Opening one closes others)', value: 'single' },
          { label: 'Multi-Expand (Independent Disclosure)', value: 'multi' },
        ],
        defaultValue: 'single',
      },
    ],
    relatedTerms: ['surface-elevation', 'measure-and-leading'],
  },
  {
    id: 'iconic-menu-taxonomy',
    number: '14',
    title: 'Hamburger vs. Kebab vs. Meatballs vs. Bento Menu Icons',
    category: 'navigation',
    categoryLabel: 'Navigation & Everyday Components',
    difficulty: 'Foundational',
    pronunciationOrAlias: 'The 5 Canonical Minimalist Menu Trigger Glyphs (☰ · ⋮ · ⋯ · ⊞ · ═)',
    summary:
      'Every day, users click "the three dots" or "the three lines" without knowing their exact industry names: Hamburger (☰ 3 horizontal bars = primary nav drawer), Kebab (⋮ 3 vertical dots = inline row/mobile overflow actions), Meatballs (⋯ 3 horizontal dots = desktop card/table row menu), Bento/Waffle (⊞ 3x3 grid = app launcher switcher), and Döner (3 descending width bars = filter/sort menu).',
    whyAgentsNeedIt:
      'Saying "put a three-dots menu on the table row and a grid icon in the header" leaves AI guessing orientation and placement. Naming a **Meatballs Menu (`MoreHorizontal` `⋯`) for table row overflow**, a **Kebab Menu (`MoreVertical` `⋮`) for mobile headers**, or a **Bento App Switcher (`Grid` `⊞`)** communicates exact intent.',
    vibePhrases: [
      'three vertical dots icon vs three horizontal dots icon',
      'what is the 3 dots menu button called',
      '9 dots square grid icon at the top right like google apps',
      'three lines menu icon vs filter lines icon',
      'kebab vs meatballs vs hamburger menu',
    ],
    badPromptExample:
      'Put the three dots button on each card for more options, and put the 9 little squares icon in the top bar to switch apps.',
    goodPromptExample:
      'Place a Bento App Switcher icon button (3x3 grid glyph) in the header bar for cross-app navigation, and place a quiet Meatballs Menu trigger (3 horizontal dots `MoreHorizontal`) in the top-right corner of each card that opens an anchored action Popover.',
    anatomyParts: [
      {
        name: 'Hamburger (`☰` 3 Horizontal Lines)',
        role: 'Opens the primary off-canvas mobile navigation drawer.',
        cssHint: '<Menu className="w-5 h-5" />',
      },
      {
        name: 'Kebab (`⋮` 3 Vertical Dots)',
        role: 'Opens secondary overflow actions in tight vertical/mobile headers.',
        cssHint: '<MoreVertical className="w-4 h-4" />',
      },
      {
        name: 'Meatballs (`⋯` 3 Horizontal Dots)',
        role: 'Opens contextual row or card actions (Edit, Duplicate, Delete) on desktop.',
        cssHint: '<MoreHorizontal className="w-4 h-4" />',
      },
      {
        name: 'Bento / Waffle (`⊞` 3x3 Dot Grid)',
        role: 'Opens a cross-product App Launcher or workspace suite matrix.',
        cssHint: '<LayoutGrid className="w-4 h-4" />',
      },
    ],
    cssSnippet: `/* Canonical Lucide Icon Mapping */
// Hamburger -> <Menu /> (Primary Nav Drawer)
// Kebab     -> <MoreVertical /> (Mobile/Compact Overflow)
// Meatballs -> <MoreHorizontal /> (Table Row / Card Actions)
// Bento     -> <Grip /> or <LayoutGrid /> (App Suite Switcher)
// Döner     -> <ListFilter /> (Descending Filter Bars)`,
    tailwindTokens: ['aria-haspopup="menu"', 'p-2 rounded-lg hover:bg-slate-100', 'focus-visible:ring-2'],
    sandboxControls: [
      {
        id: 'activeIconType',
        label: 'Select Iconic Trigger to Inspect',
        type: 'select',
        options: [
          { label: '1. Kebab Menu (⋮ 3 Vertical Dots — Compact Overflow)', value: 'kebab' },
          { label: '2. Meatballs Menu (⋯ 3 Horizontal Dots — Row/Card Menu)', value: 'meatballs' },
          { label: '3. Bento / Waffle Menu (⊞ 3x3 Grid — App Switcher)', value: 'bento' },
          { label: '4. Döner Menu (Descending Bars — Filter/Sort Stack)', value: 'doner' },
          { label: '5. Hamburger Menu (☰ 3 Equal Bars — Mobile Nav Drawer)', value: 'hamburger' },
        ],
        defaultValue: 'kebab',
      },
    ],
    relatedTerms: ['overlay-taxonomy', 'command-palette'],
  },
  {
    id: 'mega-menu',
    number: '15',
    title: 'Mega Menu (Multi-Column Flyout)',
    category: 'navigation',
    categoryLabel: 'Navigation & Everyday Components',
    difficulty: 'Intermediate',
    pronunciationOrAlias: 'Structured Multi-Zone Navigation Popover',
    summary:
      'An expansive, multi-column navigation panel triggered from a top-level header item (seen on Stripe, Vercel, and Linear) that groups deep site architecture into icon-paired links, category headers, and a featured highlight card.',
    whyAgentsNeedIt:
      'If you ask for a "dropdown menu under Products," AI agents render a narrow, boring 1-column list of links. Asking for a **2-Zone Mega Menu Flyout (2-column icon-link grid on the left + a featured changelog/case-study card on the right)** creates an enterprise-grade header.',
    vibePhrases: [
      'big dropdown menu with icons descriptions and columns like stripe',
      'wide hover menu in the top navbar',
      'multi column navigation popup with a featured card on the side',
    ],
    badPromptExample:
      'When hovering over Products in the navbar, show a big nice dropdown with all our features and descriptions.',
    goodPromptExample:
      'Build a Mega Menu Flyout (`w-[580px] rounded-2xl bg-white shadow-xl border border-slate-200 grid grid-cols-12 overflow-hidden`): allocate 8 columns to a 2-column grid of icon-paired product links (title + 1-line muted description) and 4 columns to a subtle `bg-slate-50` featured release highlight panel.',
    anatomyParts: [
      {
        name: 'Icon-Paired Nav Item',
        role: 'Combines a 36px bordered icon box with a bold title and 1-line sub-description.',
        cssHint: 'flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50',
      },
      {
        name: 'Featured Aside Zone',
        role: 'Secondary column highlighting a new release, customer story, or documentation CTA.',
        cssHint: 'col-span-4 bg-slate-50 p-4 border-l border-slate-200',
      },
    ],
    cssSnippet: `.mega-menu-panel {
  width: min(92vw, 580px);
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 16px;
  box-shadow: 0 20px 38px -10px rgba(15, 23, 42, 0.12);
}`,
    tailwindTokens: ['grid-cols-12', 'col-span-8', 'col-span-4', 'shadow-xl', 'rounded-2xl'],
    sandboxControls: [
      {
        id: 'megaTab',
        label: 'Active Header Trigger',
        type: 'select',
        options: [
          { label: 'Products Flyout (2-Col Grid + Featured Card)', value: 'products' },
          { label: 'Developers Flyout (SDK Links + Quickstart CLI)', value: 'developers' },
        ],
        defaultValue: 'products',
      },
    ],
    relatedTerms: ['overlay-taxonomy', 'app-shell'],
  },
  {
    id: 'bottom-sheet',
    number: '16',
    title: 'Bottom Sheet & Drag Grabber Handle',
    category: 'navigation',
    categoryLabel: 'Navigation & Everyday Components',
    difficulty: 'Foundational',
    pronunciationOrAlias: 'Thumb-Zone Mobile Drawer with Pill Drag Affordance',
    summary:
      'A mobile-first surface anchored to the bottom edge of the screen that slides upward over a dimmed backdrop, topped by a centered horizontal pill "Grabber Handle" (`w-10 h-1.5 rounded-full bg-slate-300`) signaling that it can be swiped down to dismiss or snapped to half/full height.',
    whyAgentsNeedIt:
      'On mobile viewports, top-right `X` buttons in centered modals are hard to reach with one thumb. Specifying a **Bottom Sheet (`fixed inset-x-0 bottom-0 rounded-t-2xl`) with a centered top Drag Grabber Handle** makes mobile menus and pickers feel like native iOS/Android apps.',
    vibePhrases: [
      'panel that slides up from the bottom of a phone screen',
      'what is that little gray horizontal bar at the top of a mobile popup called',
      'apple maps or uber swipe up bottom card',
      'mobile drawer with a drag handle pill',
    ],
    badPromptExample:
      'On mobile, show a popup at the bottom with that little gray line at the top so users know they can pull it down.',
    goodPromptExample:
      'Render a Mobile Bottom Sheet (`fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-[24px] shadow-2xl border-t border-slate-200 p-5`) featuring a centered Drag Grabber Handle (`w-10 h-1.5 bg-slate-300 rounded-full mx-auto mb-4`) and thumb-friendly full-width action buttons.',
    anatomyParts: [
      {
        name: 'Drag Grabber Handle (Pill Bar)',
        role: 'Centered 40x6px neutral capsule signaling vertical swipe/snap affordance.',
        cssHint: 'w-10 h-1.5 bg-slate-300 rounded-full mx-auto mb-3',
      },
      {
        name: 'Top-Rounded Sheet Surface (`rounded-t-[24px]`)',
        role: 'Curved upper corners matching modern mobile device bezels.',
        cssHint: 'rounded-t-[24px] bg-white border-t border-slate-200',
      },
      {
        name: 'Snap Detent Heights (Peek / Half / Full)',
        role: 'Resting height stops (e.g. 40% peek vs 85% expanded).',
        cssHint: 'max-h-[85vh] overflow-y-auto',
      },
    ],
    cssSnippet: `.bottom-sheet {
  position: fixed;
  inset-inline: 0;
  bottom: 0;
  background: #FFFFFF;
  border-radius: 24px 24px 0 0;
}
.grabber-handle {
  width: 40px;
  height: 6px;
  border-radius: 9999px;
  background: #CBD5E1;
  margin: 10px auto;
}`,
    tailwindTokens: ['fixed inset-x-0 bottom-0', 'rounded-t-[24px]', 'w-10 h-1.5 rounded-full bg-slate-300 mx-auto'],
    sandboxControls: [
      {
        id: 'detentHeight',
        label: 'Sheet Snap Detent State',
        type: 'select',
        options: [
          { label: 'Half Detent (Compact Action Sheet)', value: 'half' },
          { label: 'Expanded Detent (Full Details)', value: 'full' },
        ],
        defaultValue: 'half',
      },
    ],
    relatedTerms: ['slide-over-drawer', 'overlay-taxonomy'],
  },
  {
    id: 'avatar-stack',
    number: '17',
    title: 'Avatar Stack (Overlapping Facepile)',
    category: 'navigation',
    categoryLabel: 'Navigation & Everyday Components',
    difficulty: 'Foundational',
    pronunciationOrAlias: 'Negative-Margin Overlapping Presence Cluster (`-space-x-2`)',
    summary:
      'A compact horizontal cluster of circular user avatars that overlap slightly via negative horizontal margin (`-space-x-2.5`), separated by crisp cutout rings (`ring-2 ring-white`) and capped with a tabular overflow counter (`+8`) to signal live collaboration or social proof.',
    whyAgentsNeedIt:
      'Everyone sees those overlapping profile pictures in Figma, Notion, and GitHub, but if you ask for "circles next to each other overlapping," AI agents forget the `ring-2 ring-white` cutout border—making the avatars bleed muddily into each other. Asking for an **Avatar Stack (Facepile) with `-space-x-2.5` and `ring-2 ring-white`** looks razor-sharp.',
    vibePhrases: [
      'overlapping round user profile pictures with +5 at the end',
      'figma or google docs active users circles in the corner',
      'row of overlapping avatars for social proof',
      'facepile of team members',
    ],
    badPromptExample:
      'Put a few small round profile photos overlapping each other and a +4 circle at the end to show who is in the project.',
    goodPromptExample:
      'Render an Avatar Stack (Facepile) using `flex items-center -space-x-2.5`: give each `w-8 h-8 rounded-full` avatar a `ring-2 ring-white` cutout border so overlapping edges stay crisp, and append a terminal overflow counter circle (`+6`) in `font-mono tabular-nums`.',
    anatomyParts: [
      {
        name: 'Negative Margin Track (`-space-x-2.5`)',
        role: 'Pulls each subsequent avatar 10px left over its neighbor.',
        cssHint: 'flex items-center -space-x-2.5',
      },
      {
        name: 'Cutout Mask Ring (`ring-2 ring-white`)',
        role: 'Matches the background canvas color to create an optical gap between overlapping circles.',
        cssHint: 'w-8 h-8 rounded-full ring-2 ring-white',
      },
      {
        name: 'Overflow Counter Cap (`+N`)',
        role: 'Displays remaining collaborator count in tabular numerals.',
        cssHint: 'bg-slate-900 text-white text-xs font-mono tabular-nums',
      },
    ],
    cssSnippet: `.avatar-facepile {
  display: flex;
  align-items: center;
}
.avatar-facepile > * + * {
  margin-left: -10px;
}
.avatar-item {
  border-radius: 9999px;
  box-shadow: 0 0 0 2px #FFFFFF; /* Cutout ring */
}`,
    tailwindTokens: ['flex', '-space-x-2.5', 'rounded-full', 'ring-2', 'ring-white'],
    sandboxControls: [
      {
        id: 'overlapSpacing',
        label: 'Negative Overlap Distance',
        type: 'slider',
        min: 4,
        max: 16,
        step: 2,
        unit: 'px',
        defaultValue: 10,
      },
      {
        id: 'ringCutout',
        label: 'Cutout Ring Border (ring-white)',
        type: 'select',
        options: [
          { label: '2px White Cutout Ring (Crisp Separation)', value: 'on' },
          { label: 'No Ring (Muddy Overlap Anti-Pattern)', value: 'off' },
        ],
        defaultValue: 'on',
      },
    ],
    relatedTerms: ['spatial-grid', 'tabular-numerals'],
  },
  {
    id: 'wizard-stepper',
    number: '18',
    title: 'Multi-Step Wizard Stepper',
    category: 'navigation',
    categoryLabel: 'Navigation & Everyday Components',
    difficulty: 'Foundational',
    pronunciationOrAlias: 'Sequential Progress Node Tracker (Completed -> Current -> Upcoming)',
    summary:
      'A horizontal (or vertical) progress tracker that breaks a complex multi-stage workflow (checkout, onboarding, deployment) into numbered node states (`Completed ✓`, `Current Active`, `Upcoming Muted`) connected by progress connector lines.',
    whyAgentsNeedIt:
      'When building a multi-step form, asking for "steps at the top" often yields plain text tabs without clear visual distinction between completed steps and future locked steps. Specifying a **3-State Wizard Stepper with connecting progress tracks** makes form progression unmistakable.',
    vibePhrases: [
      'numbered circles connected by lines at the top of a checkout form',
      'step 1 step 2 step 3 progress tracker bar',
      'multi-step form indicator showing which step you are on',
    ],
    badPromptExample:
      'Show Step 1, Step 2, and Step 3 at the top of the form with lines between them.',
    goodPromptExample:
      'Add a Multi-Step Wizard Stepper across the top of the form with 3 distinct node states: Completed steps (emerald/dark circle with checkmark icon + solid connector line), Current step (`aria-current="step"`, accented ring + bold label), and Upcoming steps (muted border circle + dashed/gray connector line).',
    anatomyParts: [
      {
        name: 'Completed Node (`✓`)',
        role: 'Confirms finished stages and allows clicking back to edit.',
        cssHint: 'w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center',
      },
      {
        name: 'Active Current Node (`aria-current="step"`)',
        role: 'Highlights the active stage with an offset focus ring.',
        cssHint: 'w-7 h-7 rounded-full bg-sky-600 text-white ring-4 ring-sky-600/20',
      },
      {
        name: 'Inter-Node Connector Track (`flex-1 h-0.5`)',
        role: 'Horizontal bar between step nodes that fills as stages complete.',
        cssHint: 'flex-1 h-0.5 bg-slate-900 (or bg-slate-200)',
      },
    ],
    cssSnippet: `.stepper-row {
  display: flex;
  align-items: center;
  width: 100%;
}
.step-connector {
  flex: 1;
  height: 2px;
  margin-inline: 12px;
}`,
    tailwindTokens: ['aria-current="step"', 'flex-1 h-0.5', 'rounded-full', 'ring-4'],
    sandboxControls: [
      {
        id: 'currentStep',
        label: 'Active Wizard Step',
        type: 'select',
        options: [
          { label: 'Step 1: Repository Config', value: '1' },
          { label: 'Step 2: Token Mapping (Active)', value: '2' },
          { label: 'Step 3: Production Deploy', value: '3' },
        ],
        defaultValue: '2',
      },
    ],
    relatedTerms: ['breadcrumb-trail', 'segmented-control'],
  },
  {
    id: 'fab-speed-dial',
    number: '19',
    title: 'Floating Action Button (FAB) & Speed Dial',
    category: 'navigation',
    categoryLabel: 'Navigation & Everyday Components',
    difficulty: 'Foundational',
    pronunciationOrAlias: 'Corner-Pinned Primary Creation Trigger + Expanding Action Stack',
    summary:
      'A high-elevation circular or pill button pinned to the bottom-right corner (`fixed bottom-6 right-6`) representing the single most constructive action on a screen (e.g., `+ Compose`, `+ New Note`), which can optionally fan out vertically into a "Speed Dial" of 2–4 micro-actions.',
    whyAgentsNeedIt:
      'Users often say "that round plus button in the bottom corner like Gmail or Google Docs." Calling it a **Floating Action Button (FAB) with an expandable vertical Speed Dial stack** tells the AI agent the exact positioning, elevation, and interaction pattern.',
    vibePhrases: [
      'round plus button floating in the bottom right corner',
      'gmail compose button that stays in the corner',
      'floating button that pops out 3 smaller buttons above it when clicked',
    ],
    badPromptExample:
      'Put a round plus button in the bottom right corner that opens a few quick actions above it when clicked.',
    goodPromptExample:
      'Render a corner-pinned Floating Action Button (FAB) (`fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-slate-900 text-white shadow-xl flex items-center justify-center`) that toggles a vertical Speed Dial stack (`flex-col-reverse gap-2 mb-3`) with labeled quick-action buttons.',
    anatomyParts: [
      {
        name: 'Primary FAB Trigger (`w-12 h-12 rounded-full`)',
        role: 'High-contrast circular button whose `+` icon rotates 45deg into an `×` when open.',
        cssHint: 'w-12 h-12 rounded-full bg-slate-900 text-white shadow-xl',
      },
      {
        name: 'Speed Dial Action Stack',
        role: 'Vertical column of secondary mini-actions emerging directly above the FAB.',
        cssHint: 'flex flex-col items-end gap-2 mb-3',
      },
    ],
    cssSnippet: `.fab-container {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}`,
    tailwindTokens: ['fixed bottom-6 right-6', 'rounded-full', 'shadow-xl', 'rotate-45'],
    sandboxControls: [
      {
        id: 'speedDialOpen',
        label: 'Speed Dial State',
        type: 'select',
        options: [
          { label: 'Expanded Speed Dial (3 Quick Actions Visible)', value: 'open' },
          { label: 'Collapsed FAB (Primary + Trigger Only)', value: 'closed' },
        ],
        defaultValue: 'open',
      },
    ],
    relatedTerms: ['overlay-taxonomy', 'spring-physics'],
  },
  {
    id: 'spotlight-tour',
    number: '20',
    title: 'Coachmark & Spotlight Onboarding Tour',
    category: 'navigation',
    categoryLabel: 'Navigation & Everyday Components',
    difficulty: 'Intermediate',
    pronunciationOrAlias: 'Backdrop Cutout Highlight + Tethered Step Callout (`Step 1 of 3`)',
    summary:
      'A guided feature-discovery pattern that dims the surrounding interface behind a translucent scrim while illuminating a single target UI element ("Spotlight Cutout") paired with an anchored Coachmark popover containing step progress (`1 of 3`), explanation, and `Next / Skip` controls.',
    whyAgentsNeedIt:
      'Everyone has seen an onboarding tour where the whole page darkens except for one glowing button and a tooltip box, yet almost nobody knows it is formally called a **Spotlight Cutout + Coachmark Popover Tour**.',
    vibePhrases: [
      'when the whole screen goes dark except for one highlighted button with a next tooltip',
      'step by step feature tour pointing at buttons',
      'onboarding popup that highlights parts of the screen',
      'coachmark walkthrough',
    ],
    badPromptExample:
      'Make a tutorial for new users that darkens the screen and points to the Export button with a box explaining what it does.',
    goodPromptExample:
      'Implement a 3-step Spotlight & Coachmark Onboarding Tour: dim the background with a backdrop scrim while elevating the active target element (`relative z-50 ring-4 ring-sky-400 bg-white`), and tether a Coachmark Popover displaying a step counter (`1 of 3`), concise feature description, and `Skip` / `Next →` buttons.',
    anatomyParts: [
      {
        name: 'Spotlight Cutout Target',
        role: 'Illuminated UI control elevated above the dark scrim with a high-contrast halo ring.',
        cssHint: 'relative z-50 ring-4 ring-sky-400 bg-white rounded-lg',
      },
      {
        name: 'Tethered Coachmark Card',
        role: 'Instructional popover pointing at the target with step progress and navigation.',
        cssHint: 'w-72 bg-slate-900 text-white p-4 rounded-xl shadow-2xl',
      },
    ],
    cssSnippet: `.spotlight-target {
  position: relative;
  z-index: 50;
  box-shadow: 0 0 0 4px #38BDF8, 0 0 0 9999px rgba(15, 23, 42, 0.55);
}`,
    tailwindTokens: ['ring-4 ring-sky-400', 'z-50', 'shadow-[0_0_0_9999px_rgba(15,23,42,0.55)]'],
    sandboxControls: [
      {
        id: 'tourStep',
        label: 'Active Coachmark Tour Target',
        type: 'select',
        options: [
          { label: 'Step 1 of 3: Highlight Search Omnibar', value: '1' },
          { label: 'Step 2 of 3: Highlight Filter Switcher', value: '2' },
          { label: 'Step 3 of 3: Highlight Export Action', value: '3' },
        ],
        defaultValue: '1',
      },
    ],
    relatedTerms: ['overlay-taxonomy', 'focus-ring'],
  },
  {
    id: 'overlay-taxonomy',
    number: '21',
    title: 'Modal vs. Popover vs. Toast',
    category: 'navigation',
    categoryLabel: 'Navigation & Everyday Components',
    difficulty: 'Foundational',
    pronunciationOrAlias: 'Transient Overlay Interruption Spectrum',
    summary:
      'The three distinct overlay patterns sorted by interruption severity: a Modal Dialog blocks the entire screen for critical confirmation; a Popover anchors directly to a trigger button for contextual controls; a Toast (Snackbar) floats unobtrusively in the corner for non-blocking feedback.',
    whyAgentsNeedIt:
      'Calling everything a "popup" is the #1 reason AI agents build annoying full-screen blocking modals when you actually wanted an anchored Popover menu or a non-blocking corner Toast notification.',
    vibePhrases: [
      'what is the difference between a popup a tooltip and a notification',
      'small menu box attached to a button',
      'little message that pops up in the bottom corner after saving',
      'confirmation box in the center of the screen',
    ],
    badPromptExample:
      'Show a popup when the user clicks Share, and show another popup when they copy the link.',
    goodPromptExample:
      'When clicking the Share button, open an anchored Popover positioned 8px below the trigger containing quick permission toggles and a Copy Link button. When Copy Link is clicked, trigger a non-blocking Toast notification in the bottom-right corner ("Link copied to clipboard") that auto-dismisses after 3 seconds.',
    anatomyParts: [
      {
        name: 'Modal Dialog (Blocking)',
        role: 'Centered overlay with backdrop scrim that traps focus until confirmed or cancelled.',
        cssHint: 'fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40',
      },
      {
        name: 'Anchored Popover (Contextual)',
        role: 'Lightweight floating card tethered to its trigger button without dimming the screen.',
        cssHint: 'absolute top-full mt-2 right-0 w-72 bg-white shadow-lg border rounded-xl',
      },
      {
        name: 'Toast / Snackbar (Passive Feedback)',
        role: 'Corner-pinned banner confirming a completed background or clipboard action.',
        cssHint: 'fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-lg',
      },
    ],
    cssSnippet: `/* 1. Modal: Blocking Screen Center */
.modal-scrim { position: fixed; inset: 0; background: rgba(15,23,42,0.45); }
/* 2. Popover: Anchored to Trigger */
.popover-card { position: absolute; top: calc(100% + 8px); right: 0; }
/* 3. Toast: Non-blocking Corner Feedback */
.toast-banner { position: fixed; bottom: 20px; right: 20px; pointer-events: auto; }`,
    tailwindTokens: ['role="dialog"', 'aria-modal="true"', 'absolute top-full mt-2', 'fixed bottom-5 right-5'],
    sandboxControls: [
      {
        id: 'overlayType',
        label: 'Active Overlay Pattern to Inspect',
        type: 'select',
        options: [
          { label: '1. Anchored Popover (Low Interruption, Contextual)', value: 'popover' },
          { label: '2. Toast / Snackbar (Zero Interruption, Confirmation)', value: 'toast' },
          { label: '3. Modal Dialog (High Interruption, Destructive/Critical)', value: 'modal' },
        ],
        defaultValue: 'popover',
      },
    ],
    relatedTerms: ['slide-over-drawer', 'command-palette', 'optimistic-ui'],
  },
  {
    id: 'skeleton-loader',
    number: '22',
    title: 'Skeleton Loader (Geometry-Matched)',
    category: 'navigation',
    categoryLabel: 'Navigation & Everyday Components',
    difficulty: 'Foundational',
    pronunciationOrAlias: 'Shimmer Wireframe Placeholder',
    summary:
      'A low-contrast structural wireframe that mirrors the exact heights, widths, and paddings of the incoming populated UI (geometry delta <= 2px) with a subtle pulse animation, eliminating layout shift (CLS) when data arrives.',
    whyAgentsNeedIt:
      'If you just ask for a "loading state," AI agents put a centered spinning circle (`Loader2`) that causes the entire page height to jump violently when data loads. Asking for a "Geometry-Matched Skeleton Loader" eliminates layout jump.',
    vibePhrases: [
      'gray pulsing boxes before content loads',
      'youtube or linkedin loading placeholder blocks',
      'shimmer effect while data is fetching',
      'placeholder shapes instead of a spinning wheel',
    ],
    badPromptExample:
      'Show a loading spinner while the user profile and metrics are loading.',
    goodPromptExample:
      'Replace the loading spinner with a Geometry-Matched Skeleton Loader: render animate-pulse bg-slate-200/80 placeholder blocks matching the exact dimensions of the populated state (40px avatar circle, 16px title bar w-48, and 3 metric rows h-12) so Cumulative Layout Shift (CLS) is zero on hydration.',
    anatomyParts: [
      {
        name: 'Geometry-Locked Bounding Box',
        role: 'Identical outer container padding and height as the real populated card.',
        cssHint: 'p-6 h-[184px] border border-slate-200 rounded-xl',
      },
      {
        name: 'Bone Placeholder Bar',
        role: 'Rounded neutral rectangle representing text lines or numeric values.',
        cssHint: 'h-4 w-3/4 bg-slate-200 rounded animate-pulse',
      },
      {
        name: 'Avatar / Media Bone',
        role: 'Circular or aspect-locked block reserving image space.',
        cssHint: 'w-10 h-10 rounded-full bg-slate-200 animate-pulse shrink-0',
      },
    ],
    cssSnippet: `.skeleton-bone {
  background: linear-gradient(90deg, #E2E8F0 25%, #F1F5F9 50%, #E2E8F0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.6s infinite linear;
  border-radius: 6px;
}`,
    tailwindTokens: ['animate-pulse', 'bg-slate-200', 'rounded-md', 'shrink-0'],
    sandboxControls: [
      {
        id: 'loadState',
        label: 'Hydration State',
        type: 'select',
        options: [
          { label: 'Skeleton Loading State (Wireframe Bones)', value: 'skeleton' },
          { label: 'Populated Data State (Zero Layout Shift)', value: 'populated' },
        ],
        defaultValue: 'skeleton',
      },
    ],
    relatedTerms: ['empty-state', 'optimistic-ui'],
  },
  {
    id: 'empty-state',
    number: '23',
    title: 'Actionable Empty State (Zero-State)',
    category: 'navigation',
    categoryLabel: 'Navigation & Everyday Components',
    difficulty: 'Foundational',
    pronunciationOrAlias: 'First-Run Onboarding / Zero-Results Canvas',
    summary:
      'A structured placeholder rendered when a collection, table, or search filter has zero items—combining a quiet architectural illustration, a clear explanation of *why* it is empty, and a direct primary CTA button to create the first record or reset filters.',
    whyAgentsNeedIt:
      'Without explicit instructions, AI agents render raw text like `"No items found."` inside an empty container. Specifying an "Actionable Empty State with architectural wireframe graphic, explanatory subcopy, and a Primary Creation / Filter Reset CTA" makes zero-states feel intentional.',
    vibePhrases: [
      'what to show when a table or list has no data yet',
      'nice screen when search returns nothing',
      'no results found box with a button to add first item',
    ],
    badPromptExample:
      'If there are no projects in the list, show a message saying no projects found.',
    goodPromptExample:
      'Design an Actionable Empty State inside a dashed blueprint container (border border-dashed border-slate-300 rounded-xl p-12 text-center): include a minimal geometric icon frame, a clear heading ("No design tokens saved yet"), a 1-sentence value explanation, and a primary CTA button ("Create First Token" or "Load Starter Preset").',
    anatomyParts: [
      {
        name: 'Dashed Architectural Perimeter',
        role: 'Signals an open slot waiting to be populated with content.',
        cssHint: 'border border-dashed border-slate-300 rounded-xl bg-slate-50/50 p-10',
      },
      {
        name: 'Diagnostic Heading & Explanation',
        role: 'States clearly what belongs here and what will appear once added.',
        cssHint: 'text-base font-semibold text-slate-900 + text-sm text-slate-500 max-w-sm',
      },
      {
        name: 'Resolution CTA Cluster',
        role: 'Direct button that resolves the empty state (e.g. "+ New Record" or "Clear Filters").',
        cssHint: 'mt-4 inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg',
      },
    ],
    cssSnippet: `.empty-state-slot {
  border: 1px dashed #CBD5E1;
  border-radius: 12px;
  padding: 3rem 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}`,
    tailwindTokens: ['border-dashed', 'border-slate-300', 'text-center', 'max-w-sm'],
    sandboxControls: [
      {
        id: 'emptyScenario',
        label: 'Zero-State Scenario',
        type: 'select',
        options: [
          { label: 'First-Run Onboarding (0 Records Created Yet)', value: 'first-run' },
          { label: 'Zero Filter Matches (Search Query Returned 0)', value: 'no-matches' },
        ],
        defaultValue: 'first-run',
      },
    ],
    relatedTerms: ['skeleton-loader', 'app-shell'],
  },

  // ==================== 3. TYPOGRAPHY & COLOR HIERARCHY (6) ====================
  {
    id: 'fluid-typography',
    number: '24',
    title: 'Fluid Type Scale (CSS clamp())',
    category: 'typography',
    categoryLabel: 'Typography & Color Hierarchy',
    difficulty: 'Intermediate',
    pronunciationOrAlias: 'Viewport-Interpolated Typography + Balanced Wrap',
    summary:
      'A responsive typography technique using `clamp(min, preferred-vw, max)` paired with `text-wrap: balance` so display headlines scale smoothly between mobile and desktop viewports without abrupt media-query jumps or awkward single-word orphan lines.',
    whyAgentsNeedIt:
      'AI agents frequently hardcode giant `text-6xl` headlines that overflow mobile screens or leave a single trailing word on the last line. Prompting for `clamp(2rem, 4vw, 3.5rem)` with `text-wrap: balance` solves both instantly.',
    vibePhrases: [
      'headlines that shrink smoothly on smaller screens',
      'stop the last word of my title from sitting alone on a new line',
      'responsive font size without media queries',
      'proportional heading scale',
    ],
    badPromptExample:
      'Make the main title big on desktop and smaller on mobile phones, and make sure the lines wrap nicely.',
    goodPromptExample:
      'Use a Fluid Type Scale for display headings (`font-size: clamp(2.25rem, 3.8vw + 1rem, 3.75rem); line-height: 1.08; letter-spacing: -0.025em; text-wrap: balance;`) so headlines scale smoothly across viewports and never leave single-word orphan lines.',
    anatomyParts: [
      {
        name: 'Minimum Floor (`2.25rem`)',
        role: 'Guarantees legibility on narrow 375px mobile viewports.',
        cssHint: 'clamp(2.25rem, ...)',
      },
      {
        name: 'Fluid Viewport Slope (`3.5vw + 1rem`)',
        role: 'Smoothly interpolates font size proportional to viewport width.',
        cssHint: 'clamp(..., 3.5vw + 1rem, ...)',
      },
      {
        name: 'Balanced Line Wrapping (`text-wrap: balance`)',
        role: 'Equalizes line lengths across multi-line headings to eliminate orphan words.',
        cssHint: 'text-balance tracking-tight leading-[1.08]',
      },
    ],
    cssSnippet: `.display-headline {
  font-size: clamp(2.25rem, 3.5vw + 1rem, 3.75rem);
  line-height: 1.08;
  letter-spacing: -0.025em;
  text-wrap: balance;
}`,
    tailwindTokens: ['text-balance', 'tracking-tight', 'leading-[1.08]', 'text-[clamp(2.25rem,4vw,3.75rem)]'],
    sandboxControls: [
      {
        id: 'simulatedViewport',
        label: 'Simulated Viewport Width',
        type: 'slider',
        min: 360,
        max: 1440,
        step: 60,
        unit: 'px',
        defaultValue: 1080,
      },
      {
        id: 'textWrapMode',
        label: 'Headline Line-Wrapping Algorithm',
        type: 'select',
        options: [
          { label: 'text-wrap: balance (Equalized Lines, No Orphans)', value: 'balance' },
          { label: 'text-wrap: wrap (Default Greedy Browser Wrap)', value: 'wrap' },
        ],
        defaultValue: 'balance',
      },
    ],
    relatedTerms: ['measure-and-leading', 'split-screen-hero'],
  },
  {
    id: 'color-60-30-10',
    number: '25',
    title: '60-30-10 Color Distribution Rule',
    category: 'typography',
    categoryLabel: 'Typography & Color Hierarchy',
    difficulty: 'Foundational',
    pronunciationOrAlias: 'Architectural Color Budget & Accent Restraint',
    summary:
      'The classic interior and interface color proportion law: 60% dominant neutral canvas (background field), 30% structural surfaces & typography (cards, hairline borders, slate ink), and strictly 10% high-intent accent budget reserved for primary CTAs and active states.',
    whyAgentsNeedIt:
      'When you ask an AI to "use blue and purple theme colors," it paints gradients, card backgrounds, borders, and headings in neon blue/purple—creating visual chaos. Specifying the **60-30-10 Color Rule** restricts the accent color to the 10% interactive focal points.',
    vibePhrases: [
      'how to use brand color without making the page look loud and ugly',
      'clean neutral design with just a pop of accent color',
      'why does my app look like a rainbow of buttons',
      'balanced color palette proportions',
    ],
    badPromptExample:
      'Use ocean blue as the main theme color across the dashboard so it looks vibrant and modern.',
    goodPromptExample:
      'Enforce the 60-30-10 Color Distribution Rule: allocate 60% to a crisp neutral paper canvas (#F8FAFC), 30% to structural white surfaces (#FFFFFF), 1px slate hairlines (#E2E8F0), and carbon ink (#0F172A), and reserve the 10% Cerulean Blue accent (#0284C7) strictly for the primary CTA button, active tab indicator, and focus rings.',
    anatomyParts: [
      {
        name: '60% Dominant Neutral Canvas',
        role: 'Provides visual breathing room and prevents eye fatigue.',
        cssHint: 'bg-[#F8FAFC] or bg-[#FFFFFF]',
      },
      {
        name: '30% Structural Surfaces & Ink',
        role: 'Defines card boundaries, hairline dividers, and readable prose hierarchy.',
        cssHint: 'bg-white border-slate-200 text-slate-900',
      },
      {
        name: '10% High-Intent Accent Budget',
        role: 'Concentrates user attention immediately on the primary interactive affordance.',
        cssHint: 'bg-[#0284C7] text-white (Primary CTA only)',
      },
    ],
    cssSnippet: `:root {
  --canvas-60: #F8FAFC;      /* 60% Dominant Field */
  --surface-30: #FFFFFF;     /* 30% Structural Containers */
  --border-30: #E2E8F0;      /* 30% Hairline Grid */
  --accent-10: #0284C7;      /* 10% Focal Action Budget */
}`,
    tailwindTokens: ['bg-[#F8FAFC]', 'bg-white', 'border-slate-200', 'bg-sky-600'],
    sandboxControls: [
      {
        id: 'budgetMode',
        label: 'Color Allocation Discipline',
        type: 'select',
        options: [
          { label: '60-30-10 Discipline (10% Focused Accent)', value: 'disciplined' },
          { label: 'Over-Saturated AI Slop (Accent Everywhere)', value: 'slop' },
        ],
        defaultValue: 'disciplined',
      },
      {
        id: 'accentHue',
        label: '10% Primary Accent Token',
        type: 'select',
        options: [
          { label: 'International Klein Blue (#0284C7)', value: '#0284C7' },
          { label: 'Swiss Vermilion (#DC2626)', value: '#DC2626' },
          { label: 'Emerald Studio (#059669)', value: '#059669' },
        ],
        defaultValue: '#0284C7',
      },
    ],
    relatedTerms: ['surface-elevation', 'contrast-scrim'],
  },
  {
    id: 'tabular-numerals',
    number: '26',
    title: 'Tabular Numerals (tabular-nums)',
    category: 'typography',
    categoryLabel: 'Typography & Color Hierarchy',
    difficulty: 'Foundational',
    pronunciationOrAlias: 'Monospaced Figure Widths (`font-variant-numeric: tabular-nums`)',
    summary:
      'An OpenType font feature that forces every numeric digit (`0` through `9`) to occupy the exact same horizontal bounding width so columns of prices, percentages, and live counters align vertically and never jitter during updates.',
    whyAgentsNeedIt:
      'In proportional fonts, the digit `1` is narrower than `8`. Without `tabular-nums`, live timers jitter horizontally and financial table columns fail to line up by decimal point.',
    vibePhrases: [
      'stop numbers from jumping around when a timer counts up',
      'align numbers and decimals vertically in a table',
      'fixed width digits without changing the whole font',
      'why is my countdown timer shaking horizontally',
    ],
    badPromptExample:
      'Put a live counter and a table of prices and make sure the numbers look neat.',
    goodPromptExample:
      'Apply `tabular-nums` (`font-variant-numeric: tabular-nums`) and right-alignment (`text-right`) to all numeric table columns, KPI counters, currency figures, and live timers so digits share identical glyph widths and never cause horizontal layout jitter.',
    anatomyParts: [
      {
        name: 'Uniform Glyph Advance Box',
        role: 'Forces narrow digits like "1" into the same pixel width box as wide digits like "8".',
        cssHint: 'tabular-nums (font-variant-numeric: tabular-nums)',
      },
      {
        name: 'Right-Aligned Numeric Column',
        role: 'Aligns decimal points and thousand separators vertically down data tables.',
        cssHint: 'text-right font-mono tabular-nums',
      },
    ],
    cssSnippet: `.metric-value, td.numeric {
  font-variant-numeric: tabular-nums;
  text-align: right;
}`,
    tailwindTokens: ['tabular-nums', 'font-mono', 'text-right'],
    sandboxControls: [
      {
        id: 'numeralMode',
        label: 'Numeric Glyph Spacing',
        type: 'select',
        options: [
          { label: 'tabular-nums (Aligned Columns, Zero Jitter)', value: 'tabular' },
          { label: 'Proportional Digits (Uneven Widths, Horizontal Jitter)', value: 'proportional' },
        ],
        defaultValue: 'tabular',
      },
    ],
    relatedTerms: ['measure-and-leading', 'fluid-typography'],
  },
  {
    id: 'measure-and-leading',
    number: '27',
    title: 'Optimal Measure (65ch) & Leading',
    category: 'typography',
    categoryLabel: 'Typography & Color Hierarchy',
    difficulty: 'Foundational',
    pronunciationOrAlias: 'Line Length (`60ch–75ch`) + Line Height (`1.5–1.7`) + Tracking',
    summary:
      'The three pillars of readable body prose: Measure constrains paragraph line width to 60–75 characters (`max-w-[65ch]`) so the eye does not lose its place on return sweeps; Leading sets vertical line-height (`1.6`); Tracking adjusts horizontal letter-spacing.',
    whyAgentsNeedIt:
      'AI agents often let body paragraphs stretch across a full 1200px container (`w-full`), producing exhausting, unreadable 180-character lines. Specifying `max-w-[65ch] leading-relaxed` immediately fixes editorial legibility.',
    vibePhrases: [
      'paragraphs are too wide across the screen and hard to read',
      'good line width and line spacing for articles',
      'difference between kerning tracking and leading',
      'comfortable reading width for documentation',
    ],
    badPromptExample:
      'Write the description text below the heading and make it easy to read on large screens.',
    goodPromptExample:
      'Constrain all body prose paragraphs to an Optimal Measure of 65 characters (`max-w-[65ch]`) with relaxed Leading (`leading-relaxed` / 1.65 line-height) and tighter display Tracking (`tracking-tight` / -0.02em) on headings.',
    anatomyParts: [
      {
        name: 'Measure (`max-w-[65ch]`)',
        role: 'Horizontal line length measured in character units (`ch`), ideally 60–75 characters.',
        cssHint: 'max-w-[65ch]',
      },
      {
        name: 'Leading (`line-height: 1.6`)',
        role: 'Vertical breathing space between baselines of text (tight `1.1` for display, `1.6` for body).',
        cssHint: 'leading-relaxed (1.625)',
      },
      {
        name: 'Tracking (`letter-spacing`)',
        role: 'Uniform horizontal spacing across a word or heading (`-0.02em` for large titles).',
        cssHint: 'tracking-tight (-0.025em)',
      },
    ],
    cssSnippet: `.editorial-prose {
  max-width: 65ch;       /* Measure: 60-75 characters per line */
  line-height: 1.65;     /* Leading: comfortable vertical scan */
  font-size: 1rem;
}`,
    tailwindTokens: ['max-w-[65ch]', 'leading-relaxed', 'tracking-tight'],
    sandboxControls: [
      {
        id: 'measureCh',
        label: 'Paragraph Measure (Line Width in ch)',
        type: 'slider',
        min: 35,
        max: 115,
        step: 10,
        unit: 'ch',
        defaultValue: 65,
      },
      {
        id: 'leadingVal',
        label: 'Leading (line-height)',
        type: 'slider',
        min: 1.1,
        max: 2.0,
        step: 0.15,
        unit: 'x',
        defaultValue: 1.6,
      },
    ],
    relatedTerms: ['fluid-typography', 'tabular-numerals'],
  },
  {
    id: 'contrast-scrim',
    number: '28',
    title: 'Luminance Contrast Scrim',
    category: 'typography',
    categoryLabel: 'Typography & Color Hierarchy',
    difficulty: 'Foundational',
    pronunciationOrAlias: 'Gradient Protection Layer for Text-Over-Media',
    summary:
      'A directional translucent gradient (`bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent`) placed between background imagery and foreground typography to guarantee WCAG AA contrast (4.5:1) regardless of how bright the underlying photo is.',
    whyAgentsNeedIt:
      'When placing white text over an image card, AI agents often forget a scrim or apply a flat `bg-black/50` that muddies the entire photo. A directional bottom-up Luminance Contrast Scrim keeps the top of the image vibrant while protecting text legibility at the bottom.',
    vibePhrases: [
      'dark fade at the bottom of an image so white text is readable',
      'how to make text readable on top of a bright photo',
      'shadow gradient behind card title on image',
    ],
    badPromptExample:
      'Put the article title in white text at the bottom of the cover photo.',
    goodPromptExample:
      'Insert a directional Luminance Contrast Scrim (`absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-transparent`) between the cover image and the bottom-aligned white typography to guarantee >= 4.5:1 WCAG AA contrast without dulling the upper half of the photograph.',
    anatomyParts: [
      {
        name: 'Base Media Layer (`z-0`)',
        role: 'Full-bleed background photograph or video (`object-cover`).',
        cssHint: 'absolute inset-0 w-full h-full object-cover',
      },
      {
        name: 'Directional Gradient Scrim (`z-10`)',
        role: 'Smooth opacity ramp from 85% dark at the text baseline to 0% transparent at mid-frame.',
        cssHint: 'absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-transparent',
      },
      {
        name: 'Protected Foreground Copy (`z-20`)',
        role: 'Crisp high-contrast white headline and unboxed metadata anchored at the bottom.',
        cssHint: 'relative z-20 text-white p-6',
      },
    ],
    cssSnippet: `.media-scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(2, 6, 23, 0.88) 0%,
    rgba(2, 6, 23, 0.42) 45%,
    rgba(2, 6, 23, 0) 100%
  );
}`,
    tailwindTokens: ['bg-gradient-to-t', 'from-slate-950/85', 'via-slate-950/35', 'to-transparent'],
    sandboxControls: [
      {
        id: 'scrimOpacity',
        label: 'Scrim Base Opacity',
        type: 'slider',
        min: 0,
        max: 95,
        step: 5,
        unit: '%',
        defaultValue: 85,
      },
    ],
    relatedTerms: ['color-60-30-10', 'glassmorphism'],
  },
  {
    id: 'surface-elevation',
    number: '29',
    title: 'Single-Elevation & Hairline Architecture',
    category: 'typography',
    categoryLabel: 'Typography & Color Hierarchy',
    difficulty: 'Intermediate',
    pronunciationOrAlias: '1px Structural Borders vs. Nested Drop-Shadow Clutter',
    summary:
      'A structural surface discipline that limits card elevation to at most 1 level per screen and separates inner sub-sections using whitespace and crisp `1px solid` hairline dividers rather than nesting bordered boxes inside bordered boxes.',
    whyAgentsNeedIt:
      'Left to default habits, AI agents wrap every stat, badge, and paragraph in a `rounded-xl border shadow-md` box inside another `rounded-2xl border shadow-lg` card ("cards within cards"). Prompting for **Single-Elevation Hairline Architecture** produces ultra-clean Linear/Stripe-level craft.',
    vibePhrases: [
      'stop putting boxes inside boxes inside boxes',
      'clean thin 1px lines like linear or vercel',
      'flat crisp layout without heavy drop shadows everywhere',
      'architectural grid lines between sections',
    ],
    badPromptExample:
      'Make a card with 3 smaller cards inside it for the metrics, and put boxes around the tags.',
    goodPromptExample:
      'Follow Single-Elevation Hairline Architecture: use a single outer container (`bg-white border border-slate-200 rounded-xl`) and divide internal metric columns using `divide-x divide-slate-200` hairline borders and whitespace rather than nesting bordered sub-cards inside the parent card.',
    anatomyParts: [
      {
        name: 'Outer Surface Boundary',
        role: 'Defined by a crisp 1px border (`border-slate-200`) without heavy drop shadows.',
        cssHint: 'bg-white border border-slate-200 rounded-xl',
      },
      {
        name: 'Internal Hairline Divider (`divide-x` / `divide-y`)',
        role: 'Partitions internal cells cleanly with zero double-border bloat.',
        cssHint: 'grid grid-cols-3 divide-x divide-slate-200',
      },
      {
        name: 'Unboxed Inline Metadata',
        role: 'Renders tags and timestamps as quiet text separated by `·` rather than pill chips.',
        cssHint: 'text-xs text-slate-500 (A · B · C)',
      },
    ],
    cssSnippet: `.hairline-grid {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.hairline-grid > div + div {
  border-left: 1px solid #E2E8F0;
}`,
    tailwindTokens: ['border-slate-200', 'divide-x', 'divide-y', 'divide-slate-200'],
    sandboxControls: [
      {
        id: 'surfaceStyle',
        label: 'Container Architecture Mode',
        type: 'select',
        options: [
          { label: 'Single-Elevation Hairline Dividers (Clean Swiss Grid)', value: 'hairline' },
          { label: 'Cards-Within-Cards Clutter (Anti-Pattern)', value: 'nested-clutter' },
        ],
        defaultValue: 'hairline',
      },
    ],
    relatedTerms: ['spatial-grid', 'color-60-30-10', 'nested-radius'],
  },

  // ==================== 4. MICRO-INTERACTIONS & MOTION (7) ====================
  {
    id: 'infinite-marquee',
    number: '30',
    title: 'Infinite Marquee & Edge-Fade Mask',
    category: 'motion',
    categoryLabel: 'Micro-Interactions & Motion',
    difficulty: 'Foundational',
    pronunciationOrAlias: 'Continuous Seamless Ticker with CSS `mask-image` Vignette',
    summary:
      'A continuously looping horizontal belt of partner logos, testimonials, or status tokens achieved by duplicating a flex track (`translateX(-50%)`) inside an overflow-hidden container with soft alpha gradient masks (`mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent)`) on the left and right edges.',
    whyAgentsNeedIt:
      'Everyone sees the endlessly scrolling logo strip on modern landing pages, yet when you ask an AI for a "scrolling logo bar," it often jumps abruptly when resetting or clips harshly at the container edges. Asking for a **Seamless Duplicated Track Infinite Marquee with Left/Right Alpha Fade Masks and `pause-on-hover`** makes it seamless.',
    vibePhrases: [
      'endlessly scrolling row of company logos on landing pages',
      'moving ticker belt that fades out on the left and right edges',
      'continuous loop of testimonials or badges',
      'marquee slider that pauses when you hover over it',
    ],
    badPromptExample:
      'Add a row of customer logos that scrolls across the screen forever.',
    goodPromptExample:
      'Build a seamless Infinite Logo Marquee: duplicate the item track inside a `flex w-max animate-marquee hover:[animation-play-state:paused]` wrapper translating from `0%` to `-50%`, and apply an edge-fade mask (`mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent)`) so items dissolve smoothly at both edges.',
    anatomyParts: [
      {
        name: 'Edge-Fade Alpha Mask (`mask-image`)',
        role: 'Softly fades entering and exiting items at the left/right 10% boundaries.',
        cssHint: '[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]',
      },
      {
        name: 'Duplicated 200% Track (`-50%` Loop)',
        role: 'Contains two identical sets of items so `-50%` translation loops with zero seam.',
        cssHint: 'flex w-max gap-8 animate-marquee',
      },
    ],
    cssSnippet: `.marquee-viewport {
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent, #000 10%, #000 90%, transparent);
}
.marquee-track {
  display: flex;
  width: max-content;
  animation: scrollLoop 18s linear infinite;
}
@keyframes scrollLoop {
  to { transform: translateX(-50%); }
}`,
    tailwindTokens: ['overflow-hidden', 'w-max', 'hover:[animation-play-state:paused]'],
    sandboxControls: [
      {
        id: 'edgeFade',
        label: 'Left/Right Edge Alpha Mask',
        type: 'select',
        options: [
          { label: 'Smooth Alpha Vignette Mask (12% Edge Fade)', value: 'masked' },
          { label: 'Unmasked Hard Clipping (Harsh Cutoffs)', value: 'raw' },
        ],
        defaultValue: 'masked',
      },
      {
        id: 'marqueePaused',
        label: 'Track Motion State',
        type: 'select',
        options: [
          { label: 'Scrolling Continuously', value: 'running' },
          { label: 'Paused on Hover Inspection', value: 'paused' },
        ],
        defaultValue: 'running',
      },
    ],
    relatedTerms: ['contrast-scrim', 'staggered-choreography'],
  },
  {
    id: 'scroll-progress',
    number: '31',
    title: 'Scroll-Linked Reading Progress Bar',
    category: 'motion',
    categoryLabel: 'Micro-Interactions & Motion',
    difficulty: 'Foundational',
    pronunciationOrAlias: 'Top Viewport Completion Bar (`scaleX(scrollProgress)`)',
    summary:
      'A 2px–3px horizontal indicator pinned to the top edge of the viewport (or sticky header bottom) that scales horizontally from `0%` to `100%` (`transform: scaleX()` with `transform-origin: left`) in direct proportion to how far the user has scrolled through an article or multi-section guide.',
    whyAgentsNeedIt:
      'Readers love knowing how much of a long article remains. Specifying a **Compositor-Driven Scroll Progress Bar (`origin-left scale-x-[var(--progress)]` rather than animating `width`)** ensures zero layout thrashing while scrolling.',
    vibePhrases: [
      'thin colored line at the very top of a blog post that fills up as you scroll down',
      'reading progress bar under the navbar',
      'scroll percentage line at the top of the screen',
    ],
    badPromptExample:
      'Put a bar at the top of the article that shows how far down the page the user has scrolled.',
    goodPromptExample:
      'Pin a 3px Scroll-Linked Reading Progress Bar (`fixed top-0 inset-x-0 h-[3px] bg-sky-600 origin-left z-50`) driven by `transform: scaleX(scrollRatio)` so the bar fills smoothly from left to right at 60fps without triggering layout recalculations.',
    anatomyParts: [
      {
        name: 'Left Transform Origin (`origin-left`)',
        role: 'Anchors the `scaleX()` growth vector to the left viewport edge.',
        cssHint: 'origin-left transition-transform duration-75',
      },
      {
        name: 'Compositor Scale Bar (`scaleX`)',
        role: 'Uses GPU transform scaling (`0.0` to `1.0`) instead of costly `width: %` reflows.',
        cssHint: 'h-[3px] bg-sky-600 w-full',
      },
    ],
    cssSnippet: `.scroll-progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: #0284C7;
  transform-origin: 0% 50%;
  transform: scaleX(var(--scroll-ratio, 0.45));
}`,
    tailwindTokens: ['fixed top-0 inset-x-0', 'h-[3px]', 'origin-left', 'bg-sky-600'],
    sandboxControls: [
      {
        id: 'scrollPct',
        label: 'Simulated Article Scroll Completion',
        type: 'slider',
        min: 5,
        max: 100,
        step: 5,
        unit: '%',
        defaultValue: 65,
      },
    ],
    relatedTerms: ['sticky-rail', 'spring-physics'],
  },
  {
    id: 'spring-physics',
    number: '32',
    title: 'Spring Physics vs. Exponential Easing',
    category: 'motion',
    categoryLabel: 'Micro-Interactions & Motion',
    difficulty: 'Intermediate',
    pronunciationOrAlias: 'Cubic-Bezier Settling Curve (`cubic-bezier(0.16, 1, 0.3, 1)`)',
    summary:
      'Natural UI motion relies on rapid initial velocity followed by a gentle, friction-damped deceleration (`cubic-bezier(0.16, 1, 0.3, 1)` or spring stiffness/damping) settling within 150ms–200ms—never robotic `linear` transitions.',
    whyAgentsNeedIt:
      'When you ask for "smooth animations," AI agents sometimes apply `transition-all duration-700 ease-linear`, making the UI feel sluggish and robotic. Specifying a **180ms Exponential Out Settling Curve (`cubic-bezier(0.16, 1, 0.3, 1)`)** on `transform` and `opacity` only makes interactions feel crisp and immediate.',
    vibePhrases: [
      'snappy apple style animation',
      'why does my animation feel slow and robotic',
      'fast start and smooth stop transition',
      'springy button and drawer movement',
    ],
    badPromptExample:
      'Add smooth animations when panels open and buttons move.',
    goodPromptExample:
      'Use a 180ms Exponential Settling Curve (`transition-transform duration-180 ease-[cubic-bezier(0.16,1,0.3,1)]`) animating strictly compositor properties (`transform` and `opacity`) for immediate, high-craft responsiveness.',
    anatomyParts: [
      {
        name: 'Initial Impulse Velocity',
        role: 'Starts moving immediately on click (zero perceived input latency).',
        cssHint: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      {
        name: 'Damped Settling Tail',
        role: 'Decelerates smoothly into its final pixel coordinate without abrupt snapping.',
        cssHint: 'duration-180 or spring(stiffness: 400, damping: 30)',
      },
      {
        name: 'Compositor-Only Property Lock',
        role: 'Animates only `transform` and `opacity` to guarantee 60fps/120fps rendering.',
        cssHint: 'transition-[transform,opacity]',
      },
    ],
    cssSnippet: `.snappy-panel {
  transition-property: transform, opacity;
  transition-duration: 180ms;
  transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}`,
    tailwindTokens: ['transition-[transform,opacity]', 'duration-180', 'ease-[cubic-bezier(0.16,1,0.3,1)]'],
    sandboxControls: [
      {
        id: 'easingPreset',
        label: 'Motion Curve Comparison',
        type: 'select',
        options: [
          { label: 'Exponential Out: cubic-bezier(0.16, 1, 0.3, 1) (Snappy)', value: 'expo-out' },
          { label: 'Spring Overshoot: cubic-bezier(0.34, 1.56, 0.64, 1)', value: 'spring' },
          { label: 'Linear: linear (Robotic Anti-Pattern)', value: 'linear' },
        ],
        defaultValue: 'expo-out',
      },
    ],
    relatedTerms: ['staggered-choreography', 'optimistic-ui'],
  },
  {
    id: 'glassmorphism',
    number: '33',
    title: 'Glassmorphism & Specular Hairline',
    category: 'motion',
    categoryLabel: 'Micro-Interactions & Motion',
    difficulty: 'Foundational',
    pronunciationOrAlias: 'Translucent Backdrop Blur (`backdrop-filter: blur()`) + 1px Specular Edge',
    summary:
      'A translucent surface treatment used for sticky headers, floating toolbars, and command overlays that combines a semi-transparent background fill (`bg-white/75`), an optical `backdrop-filter: blur(12px)`, and a crisp 1px specular border.',
    whyAgentsNeedIt:
      'If you ask for a "blurry transparent header," AI agents often apply `opacity: 0.5` (which makes the text inside faded and unreadable!) instead of `bg-white/75 backdrop-blur-md`. Using the exact term **Glassmorphism with `backdrop-blur-md` and `bg-white/75`** preserves 100% foreground text contrast.',
    vibePhrases: [
      'blurry see-through sticky header like apple',
      'frosted glass card effect',
      'translucent bar that blurs content scrolling behind it',
    ],
    badPromptExample:
      'Make the top navigation bar semi-transparent and blurry when scrolling.',
    goodPromptExample:
      'Apply a Glassmorphic surface treatment to the sticky header (`sticky top-0 z-40 bg-white/75 backdrop-blur-md border-b border-slate-200/80`) so scrolling content diffuses cleanly behind the bar while foreground navigation links remain at 100% opacity.',
    anatomyParts: [
      {
        name: 'Translucent Alpha Surface (`bg-white/75`)',
        role: 'Allows underlying luminance to pass through without sacrificing text contrast.',
        cssHint: 'bg-white/75 (never opacity-75!)',
      },
      {
        name: 'Optical Backdrop Filter (`backdrop-blur-md`)',
        role: 'Diffuses high-frequency text and edges scrolling beneath the floating layer.',
        cssHint: 'backdrop-blur-md (12px)',
      },
      {
        name: '1px Specular Catchlight Edge',
        role: 'Defines the glass perimeter cleanly against both light and dark backgrounds.',
        cssHint: 'border border-white/60 shadow-sm',
      },
    ],
    cssSnippet: `.glass-toolbar {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(12px) saturate(160%);
  -webkit-backdrop-filter: blur(12px) saturate(160%);
  border: 1px solid rgba(226, 232, 240, 0.85);
}`,
    tailwindTokens: ['bg-white/75', 'backdrop-blur-md', 'backdrop-saturate-150', 'border-white/60'],
    sandboxControls: [
      {
        id: 'blurPx',
        label: 'Backdrop Blur Radius',
        type: 'slider',
        min: 0,
        max: 24,
        step: 4,
        unit: 'px',
        defaultValue: 12,
      },
      {
        id: 'surfaceAlpha',
        label: 'Surface White Alpha (%)',
        type: 'slider',
        min: 35,
        max: 95,
        step: 10,
        unit: '%',
        defaultValue: 75,
      },
    ],
    relatedTerms: ['spatial-vision-glass', 'contrast-scrim'],
  },
  {
    id: 'optimistic-ui',
    number: '34',
    title: 'Optimistic UI & Micro-State Feedback',
    category: 'motion',
    categoryLabel: 'Micro-Interactions & Motion',
    difficulty: 'Intermediate',
    pronunciationOrAlias: 'Zero-Latency State Mutation Before Server Roundtrip',
    summary:
      'An interaction pattern where the interface immediately updates its visual state (e.g. toggling a bookmark, incrementing a counter, or checking a task) the instant the user clicks, reconciling with the background request asynchronously.',
    whyAgentsNeedIt:
      'Waiting 600ms for a server response before toggling a button makes an app feel broken. Prompting for **Optimistic UI State Updates with inline confirmation feedback** ensures every click responds in under 16ms.',
    vibePhrases: [
      'update the button immediately when clicked without waiting',
      'instant like or bookmark toggle',
      'copy button that turns into a checkmark for 2 seconds',
    ],
    badPromptExample:
      'When the user clicks Save or Copy, save the item and let them know it worked.',
    goodPromptExample:
      'Implement Optimistic UI feedback: immediately mutate the local state on click so the counter increments and button transitions to its confirmed state ("Saved" with checkmark glyph) in <16ms, reverting only if the background request fails.',
    anatomyParts: [
      {
        name: 'Immediate State Mutation (<16ms)',
        role: 'Updates the UI state synchronously on pointer down/click.',
        cssHint: 'setItems(prev => ...)',
      },
      {
        name: 'Morphing Label & Icon Confirmation',
        role: 'Swaps "Copy Prompt" to "Copied to Clipboard" with a checkmark for 1800ms.',
        cssHint: 'text-emerald-700 bg-emerald-50',
      },
    ],
    cssSnippet: `function handleOptimisticToggle(id: string) {
  // 1. Mutate UI state immediately (<16ms)
  setBookmarked(prev => !prev);
  // 2. Sync in background with rollback on error
  syncBookmark(id).catch(() => setBookmarked(prev => !prev));
}`,
    tailwindTokens: ['active:scale-[0.98]', 'transition-transform', 'tabular-nums'],
    sandboxControls: [
      {
        id: 'latencyMode',
        label: 'Interaction Response Strategy',
        type: 'select',
        options: [
          { label: 'Optimistic UI (0ms Instant State Update)', value: 'optimistic' },
          { label: 'Pessimistic Blocking (800ms Spinner Wait)', value: 'pessimistic' },
        ],
        defaultValue: 'optimistic',
      },
    ],
    relatedTerms: ['spring-physics', 'skeleton-loader', 'overlay-taxonomy'],
  },
  {
    id: 'focus-ring',
    number: '35',
    title: 'Keyboard Focus Ring (focus-visible)',
    category: 'motion',
    categoryLabel: 'Micro-Interactions & Motion',
    difficulty: 'Foundational',
    pronunciationOrAlias: 'Offset Double-Ring Keyboard Affordance',
    summary:
      'A high-contrast, 2px offset outline (`focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2`) that appears strictly during keyboard `Tab` navigation (`:focus-visible`) so keyboard users always know which control is active without showing ugly outlines on mouse clicks.',
    whyAgentsNeedIt:
      'Developers often write `outline-none` to remove ugly default browser outlines, accidentally destroying keyboard accessibility. Specifying `focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2` gives you clean mouse clicks AND accessible keyboard rings.',
    vibePhrases: [
      'blue outline around buttons when pressing tab key',
      'remove ugly click outline but keep keyboard navigation ring',
      'offset border ring around active input',
    ],
    badPromptExample:
      'Remove the ugly default browser outline when clicking buttons, but keep it accessible.',
    goodPromptExample:
      'Apply `:focus-visible` Double-Ring Affordance (`focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white`) to all interactive buttons, inputs, and cards.',
    anatomyParts: [
      {
        name: '2px Inner Offset Gap (`ring-offset-2`)',
        role: 'Creates a crisp 2px white breathing gap between the button edge and the focus ring.',
        cssHint: 'focus-visible:ring-offset-2 focus-visible:ring-offset-white',
      },
      {
        name: 'High-Contrast Outer Ring (`ring-2`)',
        role: '2px solid accent ring meeting 3:1 non-text contrast against the canvas.',
        cssHint: 'focus-visible:ring-2 focus-visible:ring-sky-600',
      },
    ],
    cssSnippet: `.interactive-control:focus {
  outline: none;
}
.interactive-control:focus-visible {
  outline: 2px solid #0284C7;
  outline-offset: 2px;
}`,
    tailwindTokens: ['focus:outline-none', 'focus-visible:ring-2', 'focus-visible:ring-sky-600', 'focus-visible:ring-offset-2'],
    sandboxControls: [
      {
        id: 'ringOffset',
        label: 'Focus Ring Offset Gap',
        type: 'slider',
        min: 0,
        max: 4,
        step: 1,
        unit: 'px',
        defaultValue: 2,
      },
    ],
    relatedTerms: ['command-palette', 'segmented-control'],
  },
  {
    id: 'staggered-choreography',
    number: '36',
    title: 'Staggered Choreography',
    category: 'motion',
    categoryLabel: 'Micro-Interactions & Motion',
    difficulty: 'Intermediate',
    pronunciationOrAlias: 'Cascading Micro-Delay Reveal (`calc(index * 40ms)`)',
    summary:
      'A coordinated entrance sequence where sibling items in a grid or list enter with a subtle cascading delay (`35ms–50ms` per item, capped at `250ms` total) moving along a shared 8px vertical vector (`translateY(8px) -> 0`).',
    whyAgentsNeedIt:
      'Without rules, AI agents either animate nothing or make cards fly in from 4 different directions (`translateX(-100px)`) over 1.5 seconds. Specifying **Staggered Choreography (8px Y-axis lift, 40ms stagger step, 180ms duration)** creates refined editorial polish.',
    vibePhrases: [
      'cards appearing one after another smoothly',
      'cascading list animation on load',
      'domino effect reveal for grid items',
    ],
    badPromptExample:
      'Animate the cards onto the screen one by one when the user switches tabs.',
    goodPromptExample:
      'Use Staggered Choreography when switching categories: animate each card from `opacity: 0; transform: translateY(8px)` to `opacity: 1; transform: translateY(0)` over 180ms using `cubic-bezier(0.16, 1, 0.3, 1)` with a `40ms` per-index stagger delay capped at 240ms.',
    anatomyParts: [
      {
        name: 'Micro-Vector Translation (`8px`)',
        role: 'Subtle vertical rise that feels grounded rather than theatrical.',
        cssHint: 'translate-y-2 -> translate-y-0',
      },
      {
        name: 'Index Stagger Step (`40ms`)',
        role: 'Cascades visual attention from top-left to bottom-right.',
        cssHint: 'animation-delay: calc(var(--index) * 40ms)',
      },
    ],
    cssSnippet: `.stagger-item {
  animation: subtleRise 180ms cubic-bezier(0.16, 1, 0.3, 1) backwards;
  animation-delay: calc(var(--item-index, 0) * 40ms);
}
@keyframes subtleRise {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}`,
    tailwindTokens: ['transition-all', 'duration-180', 'translate-y-0', 'opacity-100'],
    sandboxControls: [
      {
        id: 'staggerStep',
        label: 'Per-Card Stagger Delay',
        type: 'slider',
        min: 0,
        max: 100,
        step: 20,
        unit: 'ms',
        defaultValue: 40,
      },
    ],
    relatedTerms: ['spring-physics', 'bento-grid'],
  },

  // ==================== 5. SCI-FI, SPATIAL & FUTURISTIC UI (FUI) (6) ====================
  {
    id: 'hud-reticle-frame',
    number: '37',
    title: 'Chamfered HUD Frame & Corner Reticles (FUI)',
    category: 'futuristic',
    categoryLabel: 'Sci-Fi, Spatial & Futuristic UI (FUI)',
    difficulty: 'Intermediate',
    pronunciationOrAlias: 'Octagonal Beveled `clip-path` Polygon + L-Bracket Fiducial Markers',
    summary:
      'The signature geometric container of Sci-Fi Fantasy User Interfaces (FUI), defense autonomy consoles (Anduril Lattice, SpaceX Dragon), and mecha HUDs: replaces standard rounded corners with 45-degree chamfered diagonal cuts (`clip-path: polygon(...)`) framed by 4 corner L-bracket targeting reticles and micro-fiducial crosshairs.',
    whyAgentsNeedIt:
      'When developers ask an AI for a "futuristic sci-fi box," the model usually just slaps neon cyan `rounded-xl shadow-cyan-500` on a normal rounded card—which looks cheap. Asking for a **Chamfered Polygon Frame (`clip-path` 12px 45° corner bevel) with Corner L-Bracket Reticles (`w-3 h-3 border-t-2 border-l-2`)** creates authentic military/aerospace FUI geometry.',
    vibePhrases: [
      'sci-fi boxes with 45 degree cut off corners instead of rounded corners',
      'L-shaped corner brackets around a target box like iron man or cyberpunk',
      'anduril or spacex tactical hud panel frame',
      'futuristic octagonal beveled container with crosshairs',
    ],
    badPromptExample:
      'Make the telemetry panel look futuristic and sci-fi like Iron Man or a spaceship screen.',
    goodPromptExample:
      'Construct a Tactical FUI Panel using a 45-degree Chamfered Polygon (`clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))`) on a deep obsidian surface (`bg-slate-950`), and anchor four 10px L-Bracket Corner Reticles (`border-t-2 border-l-2 border-sky-400`) at the outer vertices with tabular monospace telemetry.',
    anatomyParts: [
      {
        name: '45° Chamfered Bevel (`clip-path: polygon`)',
        role: 'Slices the top-right and bottom-left corners at an exact 45-degree mechanical bevel.',
        cssHint: '[clip-path:polygon(0_0,calc(100%-16px)_0,100%_16px,100%_100%,16px_100%,0_calc(100%-16px))]',
      },
      {
        name: 'Corner Reticle L-Brackets',
        role: 'Four 10x10px right-angle corner ticks framing the optical bounding box.',
        cssHint: 'w-2.5 h-2.5 border-t-2 border-l-2 border-sky-400',
      },
      {
        name: 'Fiducial Registration Crosshair (`+`)',
        role: 'Precision coordinate markers placed at grid intersections.',
        cssHint: 'font-mono text-[10px] text-slate-500 select-none',
      },
    ],
    cssSnippet: `.fui-chamfer-panel {
  --bevel: 16px;
  background: #020617;
  clip-path: polygon(
    0 0,
    calc(100% - var(--bevel)) 0,
    100% var(--bevel),
    100% 100%,
    var(--bevel) 100%,
    0 calc(100% - var(--bevel))
  );
}`,
    tailwindTokens: ['bg-slate-950', 'border-sky-400', 'font-mono', 'tabular-nums'],
    sandboxControls: [
      {
        id: 'chamferSize',
        label: '45° Corner Chamfer Bevel Size',
        type: 'slider',
        min: 0,
        max: 28,
        step: 4,
        unit: 'px',
        defaultValue: 16,
      },
      {
        id: 'reticleStyle',
        label: 'Corner Reticle Brackets',
        type: 'select',
        options: [
          { label: 'Active Lock (4 Corner L-Brackets + Fiducials)', value: 'brackets' },
          { label: 'Minimal Bevel Only', value: 'minimal' },
        ],
        defaultValue: 'brackets',
      },
    ],
    relatedTerms: ['polar-radar-hud', 'crt-scanline-phosphor'],
  },
  {
    id: 'spatial-vision-glass',
    number: '38',
    title: 'Spatial Glass & Specular Rim Light (VisionOS UI)',
    category: 'futuristic',
    categoryLabel: 'Sci-Fi, Spatial & Futuristic UI (FUI)',
    difficulty: 'Intermediate',
    pronunciationOrAlias: 'Spatial Computing Window + Top-Left Specular Rim Catchlight + Grabber Bar',
    summary:
      'The spatial computing material language introduced by Apple VisionOS: a floating translucent platter (`backdrop-filter: blur(28px) saturate(190%)`) illuminated by an angled top-left 1px specular rim gradient (`border-t border-l border-white/45`), deep Z-axis drop shadow, and a floating bottom window-reposition capsule bar.',
    whyAgentsNeedIt:
      'Standard flat glassmorphism looks 2D. To achieve the floating 3D spatial computing look of VisionOS, you must prompt for **Directional Specular Rim Lighting (bright top-left catchlight fading to subtle bottom-right edge) + Floating Spatial Window Bar below the platter**.',
    vibePhrases: [
      'apple vision pro floating glass window style',
      'spatial computing 3d glass card with glowing top edge',
      'visionos translucent window with the white bar underneath it',
      'holographic spatial platter',
    ],
    badPromptExample:
      'Make the card look like an Apple Vision Pro window floating in space.',
    goodPromptExample:
      'Style the container as a VisionOS Spatial Glass Platter (`rounded-[32px] bg-white/15 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_24px_60px_rgba(0,0,0,0.45)]`) with directional Specular Rim Lighting (`border-t border-l border-white/50 border-r border-b border-white/15`) and a floating spatial window control bar (`w-32 h-1.5 rounded-full bg-white/70 mx-auto mt-4`) beneath the window.',
    anatomyParts: [
      {
        name: 'Directional Specular Rim (`border-t border-white/50`)',
        role: 'Simulates overhead studio lighting catching the top-left glass bevel.',
        cssHint: 'border-t border-l border-white/50 border-b border-r border-white/15',
      },
      {
        name: 'High-Radius Spatial Platter (`rounded-[32px]`)',
        role: 'Generous continuous curvature optimized for eye-tracking gaze targets.',
        cssHint: 'rounded-[32px] bg-white/15 backdrop-blur-2xl p-6',
      },
      {
        name: 'Spatial Window Grabber Bar',
        role: 'Floating horizontal capsule below the platter used to move the window in 3D space.',
        cssHint: 'w-28 h-1.5 rounded-full bg-white/75 mx-auto mt-3',
      },
    ],
    cssSnippet: `.vision-spatial-platter {
  border-radius: 32px;
  background: linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,255,255,0.07));
  backdrop-filter: blur(28px) saturate(190%);
  border-top: 1px solid rgba(255, 255, 255, 0.55);
  border-left: 1px solid rgba(255, 255, 255, 0.45);
  border-right: 1px solid rgba(255, 255, 255, 0.12);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}`,
    tailwindTokens: ['rounded-[32px]', 'backdrop-blur-2xl', 'border-white/50', 'bg-white/15'],
    sandboxControls: [
      {
        id: 'specularIntensity',
        label: 'Specular Rim Catchlight Intensity',
        type: 'slider',
        min: 15,
        max: 85,
        step: 10,
        unit: '%',
        defaultValue: 55,
      },
      {
        id: 'spatialDepth',
        label: 'Z-Axis Perspective Tilt',
        type: 'select',
        options: [
          { label: '0deg (Front-Facing Spatial Window)', value: 'flat' },
          { label: 'Perspective Tilt (3D Spatial Depth)', value: 'tilted' },
        ],
        defaultValue: 'tilted',
      },
    ],
    relatedTerms: ['glassmorphism', 'nested-radius'],
  },
  {
    id: 'crt-scanline-phosphor',
    number: '39',
    title: 'CRT Scanline & Phosphor Chromatic Bloom',
    category: 'futuristic',
    categoryLabel: 'Sci-Fi, Spatial & Futuristic UI (FUI)',
    difficulty: 'Intermediate',
    pronunciationOrAlias: 'Retro-Futuristic Repeating-Linear-Gradient Scanlines + Phosphor Text-Shadow',
    summary:
      'The iconic retro-futuristic cathode-ray terminal aesthetic (Cassette Futurism, Fallout Pip-Boy, Alien Mother, Bloomberg/Cyberdeck consoles): layers a `pointer-events-none` repeating 2px horizontal scanline grating over phosphor-amber (`#F59E0B`) or P1-green (`#10B981`) monospace typography with dual-offset RGB chromatic aberration (`text-shadow`).',
    whyAgentsNeedIt:
      'When users ask for a "retro sci-fi terminal," AI agents just make a black box with green courier text. Prompting for a **Repeating-Linear-Gradient 2px Scanline Overlay + Phosphor Halation `text-shadow` + Subtle Barrel Vignette** creates an authentic tactile CRT monitor.',
    vibePhrases: [
      'retro sci-fi tv screen with horizontal lines and glowing green or amber text',
      'fallout pip-boy or alien movie computer monitor effect',
      'crt scanlines and rgb glitch text shadow',
      'cassette futurism terminal screen',
    ],
    badPromptExample:
      'Make this log viewer look like a cool old-school sci-fi computer terminal.',
    goodPromptExample:
      'Apply a Retro-Futuristic CRT Phosphor Terminal treatment: overlay a `pointer-events-none` scanline grating (`background: repeating-linear-gradient(0deg, rgba(0,0,0,0.22) 0px, rgba(0,0,0,0.22) 1px, transparent 1px, transparent 3px)`), radial vignette inner shadow, and Phosphor Halation bloom (`text-shadow: 0 0 8px rgba(16,185,129,0.55)`).',
    anatomyParts: [
      {
        name: '2px Raster Scanline Grating',
        role: 'Non-interactive overlay simulating horizontal CRT electron beam lines.',
        cssHint: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.25) 0 1px, transparent 1px 3px)',
      },
      {
        name: 'Phosphor Halation Bloom (`text-shadow`)',
        role: 'Soft optical glow surrounding high-luminance terminal characters.',
        cssHint: '[text-shadow:0_0_8px_currentColor]',
      },
      {
        name: 'Chromatic Aberration Split',
        role: '1px red/cyan horizontal channel separation on high-contrast edges.',
        cssHint: '[text-shadow:-1px_0_#FF0055,1px_0_#00F0FF]',
      },
    ],
    cssSnippet: `.crt-scanlines::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.24) 0px,
    rgba(0, 0, 0, 0.24) 1px,
    transparent 1px,
    transparent 3px
  );
}`,
    tailwindTokens: ['pointer-events-none', 'font-mono', '[text-shadow:0_0_8px_currentColor]'],
    sandboxControls: [
      {
        id: 'phosphorColor',
        label: 'CRT Phosphor Persistence Type',
        type: 'select',
        options: [
          { label: 'P1 Emerald Phosphor (#10B981)', value: 'emerald' },
          { label: 'P3 Amber Tactical Phosphor (#F59E0B)', value: 'amber' },
          { label: 'Chromatic RGB Split (Cyan / Red Aberration)', value: 'chromatic' },
        ],
        defaultValue: 'emerald',
      },
      {
        id: 'scanlineDensity',
        label: 'Scanline Grating Opacity',
        type: 'slider',
        min: 0,
        max: 50,
        step: 10,
        unit: '%',
        defaultValue: 30,
      },
    ],
    relatedTerms: ['hud-reticle-frame', 'tabular-numerals'],
  },
  {
    id: 'polar-radar-hud',
    number: '40',
    title: 'Polar Coordinate Radar & Conic Sweep HUD',
    category: 'futuristic',
    categoryLabel: 'Sci-Fi, Spatial & Futuristic UI (FUI)',
    difficulty: 'System Architecture',
    pronunciationOrAlias: 'Concentric Range Rings + Rotating `conic-gradient` Beam + Vector Blips',
    summary:
      'A spatial situational-awareness widget used in aerospace telemetry, autonomous robotics, and sci-fi FUI consoles: combines concentric range rings (`25km · 50km · 100km`), orthogonal azimuth crosshairs (`0° · 90° · 180° · 270°`), a rotating `conic-gradient` sweep beam, and pulsing target coordinate blips.',
    whyAgentsNeedIt:
      'Asking for a "radar scanner" without specifying `conic-gradient` sweep geometry and concentric SVG/CSS range rings often results in a broken static circle. Naming a **Polar Coordinate Radar Plot with a Rotating `conic-gradient(from 0deg, transparent 70%, rgba(14,165,233,0.35) 100%)` Sweep Beam** builds an authentic tactical sensor display.',
    vibePhrases: [
      'circular radar scanner with rotating green or blue beam and glowing dots',
      'sonar sweep circle screen from sci-fi movies',
      'autonomous drone or submarine radar map widget',
    ],
    badPromptExample:
      'Add a cool sci-fi radar circle that spins around and shows targets.',
    goodPromptExample:
      'Build a Polar Coordinate Radar HUD (`aspect-square rounded-full bg-slate-950 border border-sky-500/40 relative overflow-hidden`): layer 3 concentric range rings, orthogonal azimuth axes, a rotating `conic-gradient(from 0deg, transparent 70%, rgba(56,189,248,0.4) 100%)` sweep layer, and labeled target blips with `font-mono tabular-nums` bearing coordinates.',
    anatomyParts: [
      {
        name: 'Concentric Range Rings',
        role: 'Equally spaced circular distance markers (e.g. 33%, 66%, 100% radius).',
        cssHint: 'rounded-full border border-sky-500/20',
      },
      {
        name: 'Conic Sweep Sector (`conic-gradient`)',
        role: 'Rotating 90-degree translucent sector simulating active sensor scan.',
        cssHint: 'bg-[conic-gradient(from_0deg,transparent_70%,rgba(56,189,248,0.35)_100%)] animate-spin',
      },
      {
        name: 'Target Vector Blip',
        role: 'Coordinate-plotted marker with azimuth callout tag (`AZ 042°`).',
        cssHint: 'w-2 h-2 rounded-full bg-sky-400 ring-4 ring-sky-400/30',
      },
    ],
    cssSnippet: `.radar-sweep {
  border-radius: 9999px;
  background: conic-gradient(
    from 0deg,
    transparent 0deg 260deg,
    rgba(56, 189, 248, 0.38) 360deg
  );
  animation: radarSpin 4s linear infinite;
}`,
    tailwindTokens: ['aspect-square', 'rounded-full', 'animate-spin', 'font-mono'],
    sandboxControls: [
      {
        id: 'sweepState',
        label: 'Sensor Sweep Rotation',
        type: 'select',
        options: [
          { label: 'Active Continuous 360° Sweep', value: 'spinning' },
          { label: 'Locked Sector Bearing (045°)', value: 'locked' },
        ],
        defaultValue: 'spinning',
      },
    ],
    relatedTerms: ['hud-reticle-frame', 'tabular-numerals'],
  },
  {
    id: 'radial-pie-menu',
    number: '41',
    title: 'Radial Pie Menu (Marking Menu)',
    category: 'futuristic',
    categoryLabel: 'Sci-Fi, Spatial & Futuristic UI (FUI)',
    difficulty: 'Intermediate',
    pronunciationOrAlias: 'Polar Cursor-Centered Action Wheel (Fitts’s Law Muscle-Memory Menu)',
    summary:
      'A circular context menu (used in Maya, Blender, CAD studios, and sci-fi HUDs/games) where 4–8 action slices arrange radially at equal angles (`0°, 60°, 120°...`) around a central origin hub. Because selection depends on directional angle rather than distance, expert users trigger actions via muscle memory in under 100ms.',
    whyAgentsNeedIt:
      'Linear vertical dropdown menus require slow visual scanning. When building a spatial canvas, 3D tool, or futuristic HUD, asking for a **Radial Pie Menu (Marking Menu) with trigonometric polar node placement (`cos(θ)`, `sin(θ)`) and central active command readout** creates an unmistakable sci-fi/CAD interaction.',
    vibePhrases: [
      'circular wheel menu that pops up around your mouse cursor like games or blender',
      'weapon wheel or tool wheel popup menu',
      'round ring menu with icons arranged in a circle',
      'iron man circular gesture menu',
    ],
    badPromptExample:
      'Make a round menu with 6 buttons arranged in a circle around the center.',
    goodPromptExample:
      'Implement a Radial Pie Menu (Marking Menu): position 6 action nodes at 60-degree intervals (`angle = index * 60deg`) along a `90px` radius circle around a central status hub that displays the currently hovered action label and keyboard shortcut.',
    anatomyParts: [
      {
        name: 'Central Origin Hub',
        role: 'Displays the active hovered sector title and cancels when clicked.',
        cssHint: 'w-20 h-20 rounded-full bg-slate-900 border border-sky-400/50',
      },
      {
        name: 'Polar Sector Node (`r * cos(θ), r * sin(θ)`)',
        role: 'Orbital action button positioned via trigonometric polar coordinates.',
        cssHint: 'absolute -translate-x-1/2 -translate-y-1/2 rounded-full',
      },
    ],
    cssSnippet: `.radial-node {
  --angle: calc(var(--index) * 60deg);
  --radius: 84px;
  transform:
    rotate(var(--angle))
    translateY(calc(-1 * var(--radius)))
    rotate(calc(-1 * var(--angle)));
}`,
    tailwindTokens: ['rounded-full', 'absolute', '-translate-x-1/2', '-translate-y-1/2'],
    sandboxControls: [
      {
        id: 'activeSlice',
        label: 'Hovered Polar Sector',
        type: 'select',
        options: [
          { label: '0° North: Extrude Mesh (E)', value: '0' },
          { label: '60° North-East: Bevel Edges (B)', value: '1' },
          { label: '120° South-East: Boolean Union (U)', value: '2' },
          { label: '180° South: Subdivide Surface (S)', value: '3' },
          { label: '240° South-West: Mirror Axis (M)', value: '4' },
          { label: '300° North-West: Raycast Snap (R)', value: '5' },
        ],
        defaultValue: '0',
      },
    ],
    relatedTerms: ['command-palette', 'hud-reticle-frame'],
  },
  {
    id: 'node-graph-canvas',
    number: '42',
    title: 'Node-Graph Patch Canvas & Bezier Noodles',
    category: 'futuristic',
    categoryLabel: 'Sci-Fi, Spatial & Futuristic UI (FUI)',
    difficulty: 'System Architecture',
    pronunciationOrAlias: 'Directed Acyclic Graph (DAG) Cards + Cubic-Bezier SVG Spline Connectors',
    summary:
      'The visual programming paradigm behind AI agent workflows (n8n, Langflow, ComfyUI), shader editors (Blender, Unreal Blueprints), and modular synthesizers: discrete node cards with typed Input/Output socket ports connected by smooth SVG Cubic-Bezier spline curves (`M x1 y1 C cx1 cy1, cx2 cy2, x2 y2`) over an infinite dot-matrix pan/zoom canvas.',
    whyAgentsNeedIt:
      'When users ask for "boxes connected by lines like ComfyUI or n8n," AI agents often draw awkward straight diagonal `<div>` lines that miss the ports. Specifying a **Dot-Matrix Infinite Canvas with Typed Port Sockets and an SVG Cubic-Bezier Spline Layer (`<path d="M... C..." />`)** produces a true node-graph editor.',
    vibePhrases: [
      'boxes connected by curved glowing wires like comfyui or unreal blueprints',
      'n8n or zapier visual workflow builder with nodes and noodles',
      'flowchart cards with little input and output circles on the sides',
      'node graph editor canvas',
    ],
    badPromptExample:
      'Make a workflow builder with boxes for each step and curved lines connecting them.',
    goodPromptExample:
      'Build a Node-Graph Patch Canvas over a radial dot-matrix background (`background-image: radial-gradient(#CBD5E1 1px, transparent 1px); background-size: 16px 16px`): render Node Cards with header bars and left/right Input/Output Port Sockets, connected via an underlying `<svg>` layer drawing horizontal-tangent Cubic-Bezier splines (`M x1 y1 C x1+60 y1, x2-60 y2, x2 y2`) with animated signal pulses.',
    anatomyParts: [
      {
        name: 'Dot-Matrix Infinite Canvas',
        role: 'Provides spatial orientation for panning and zooming node topologies.',
        cssHint: 'bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]',
      },
      {
        name: 'Typed I/O Socket Port',
        role: 'Color-coded circular anchor on the left (input) or right (output) edge of a node.',
        cssHint: 'w-3 h-3 rounded-full bg-sky-500 ring-2 ring-white',
      },
      {
        name: 'Cubic-Bezier Spline ("Noodle")',
        role: 'Smooth S-curve SVG path connecting an output socket to an input socket.',
        cssHint: '<path d="M 140 60 C 210 60, 210 130, 280 130" strokeWidth="2" />',
      },
    ],
    cssSnippet: `.node-canvas {
  background-image: radial-gradient(#334155 1px, transparent 1px);
  background-size: 16px 16px;
}
/* SVG Bezier Noodle Formula */
/* d="M startX startY C (startX + 70) startY, (endX - 70) endY, endX endY" */`,
    tailwindTokens: ['stroke-dasharray', 'bg-[radial-gradient(#cbd5e1_1px,transparent_1px)]', '[background-size:16px_16px]'],
    sandboxControls: [
      {
        id: 'splineStyle',
        label: 'Connector Wire Geometry',
        type: 'select',
        options: [
          { label: 'Cubic-Bezier S-Curve Spline (ComfyUI / Blender)', value: 'bezier' },
          { label: 'Orthogonal Right-Angle Circuit Trace', value: 'orthogonal' },
        ],
        defaultValue: 'bezier',
      },
      {
        id: 'signalFlow',
        label: 'Live Data Packet Pulse',
        type: 'select',
        options: [
          { label: 'Active Flowing Signal Packets (stroke-dashoffset)', value: 'active' },
          { label: 'Static Idle Wire', value: 'idle' },
        ],
        defaultValue: 'active',
      },
    ],
    relatedTerms: ['hud-reticle-frame', 'app-shell'],
  },
  {
    id: 'css-subgrid',
    number: '43',
    title: 'CSS Subgrid Cross-Card Alignment',
    category: 'layout',
    categoryLabel: 'Layout & Spatial Systems',
    difficulty: 'Intermediate',
    pronunciationOrAlias: 'Cross-Card Track Inheritance (grid-template-rows: subgrid)',
    summary:
      'Allows nested child cards to inherit the row tracks of their parent CSS Grid (`row-span-3 grid grid-rows-subgrid`) so card titles, variable-length descriptions, and bottom CTA buttons lock onto shared horizontal axes across sibling cards.',
    whyAgentsNeedIt:
      'Without CSS Subgrid, when 3 pricing or feature cards in a row have different title or paragraph lengths, their internal sections and buttons sit at ragged, misaligned heights. Prompting for `grid-rows-subgrid row-span-3` locks horizontal alignment across all sibling cards without brittle fixed heights.',
    vibePhrases: [
      'make card titles and buttons line up horizontally across a row',
      'align sections inside neighboring cards even when text length differs',
      'pricing cards where headers descriptions and buttons stay on the same row line',
      'css subgrid card alignment',
    ],
    badPromptExample:
      'Make 3 pricing cards in a row and make sure the headings, descriptions, and bottom buttons all line up evenly.',
    goodPromptExample:
      'Use CSS Subgrid across the 3-column card row: set the parent container to `grid grid-cols-1 md:grid-cols-3 gap-6` and each child card to `row-span-3 grid grid-rows-subgrid gap-4 p-6 rounded-2xl border` so the header, body copy, and CTA footer rows align horizontally across all sibling cards.',
    anatomyParts: [
      {
        name: 'Parent Multi-Column Grid',
        role: 'Defines the master column tracks and implicit row tracks shared by all cards.',
        cssHint: 'grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4',
      },
      {
        name: 'Subgrid Child Card (`grid-rows-subgrid`)',
        role: 'Spans 3 parent rows (header, body, footer) and inherits their exact track heights.',
        cssHint: 'row-span-3 grid grid-rows-subgrid p-6 rounded-xl border',
      },
      {
        name: 'Locked Baseline Footer',
        role: 'CTA button row that stays perfectly flush across all cards regardless of copy length.',
        cssHint: 'pt-3 border-t border-slate-100 self-end',
      },
    ],
    cssSnippet: `.card-grid-parent {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
}
.subgrid-card {
  grid-row: span 3 / span 3;
  display: grid;
  grid-template-rows: subgrid;
  gap: 0.75rem;
}`,
    tailwindTokens: ['grid-cols-3', 'row-span-3', 'grid-rows-subgrid', 'gap-6'],
    sandboxControls: [
      {
        id: 'subgridMode',
        label: 'Cross-Card Row Alignment Mode',
        type: 'select',
        options: [
          { label: 'CSS Subgrid Enabled (Aligned Headers, Body & CTA Rows)', value: 'subgrid' },
          { label: 'Naive Flex Cards (Ragged Misaligned Baselines)', value: 'naive' },
        ],
        defaultValue: 'subgrid',
      },
      {
        id: 'copyLength',
        label: 'Middle Card Copy Length',
        type: 'select',
        options: [
          { label: 'Long Multi-Line Description (Stress Test)', value: 'long' },
          { label: 'Uniform Short Copy', value: 'short' },
        ],
        defaultValue: 'long',
      },
    ],
    relatedTerms: ['bento-grid', 'spatial-grid'],
  },
  {
    id: 'slash-command-menu',
    number: '44',
    title: 'Inline Slash Command Menu (/ Trigger)',
    category: 'navigation',
    categoryLabel: 'Navigation & Everyday Components',
    difficulty: 'Intermediate',
    pronunciationOrAlias: 'Caret-Anchored Rich-Text Block Inserter (Notion / Linear Style)',
    summary:
      'A keyboard-first floating command listbox triggered by typing `/` inside an editor or text input, anchored directly to the text caret coordinates for inserting headings, code blocks, tables, or AI actions without leaving the keyboard.',
    whyAgentsNeedIt:
      'When you ask an AI to "let users insert headings, code blocks, or tables in the editor," it defaults to a cluttered 15-button formatting toolbar at the top. Specifying an **Inline Slash Command Menu anchored to the text caret** produces a modern Notion/Linear editing experience.',
    vibePhrases: [
      'popup menu when you type a forward slash in the text box',
      'notion style slash menu to pick heading or list',
      'menu that appears right where your cursor is typing',
      'inline slash command popover',
    ],
    badPromptExample:
      'Let users add headings, bullet lists, or code blocks while typing in the document editor.',
    goodPromptExample:
      'Implement an Inline Slash Command Menu triggered when the user types "/" at the start of a line: anchor a floating `role="listbox"` popover (`w-64 max-h-72 overflow-y-auto rounded-xl shadow-xl border border-slate-200 bg-white p-1.5 z-50`) to the caret coordinates with keyboard `ArrowUp`/`ArrowDown` navigation, live query filtering, and `Enter` block insertion.',
    anatomyParts: [
      {
        name: 'Slash Trigger Token (`/query`)',
        role: 'Inline text token after the `/` character that filters the command list in real time.',
        cssHint: 'font-mono text-sky-700 bg-sky-50 px-1 rounded',
      },
      {
        name: 'Caret-Anchored Listbox Popover',
        role: 'Floating menu positioned directly beneath the active line or cursor coordinates.',
        cssHint: 'absolute left-4 top-12 z-50 w-64 rounded-xl border bg-white shadow-xl p-1.5',
      },
      {
        name: 'Keyboard-Highlighted Command Option',
        role: 'Row displaying block icon, title, description, and shortcut badge (`↵`).',
        cssHint: 'aria-selected="true" bg-sky-50 text-sky-900 font-semibold rounded-lg px-3 py-2',
      },
    ],
    cssSnippet: `.slash-command-popover {
  position: absolute;
  top: var(--caret-y, 48px);
  left: var(--caret-x, 16px);
  z-index: 50;
  width: 16rem;
  max-height: 18rem;
  overflow-y: auto;
  border-radius: 0.75rem;
}`,
    tailwindTokens: ['role="listbox"', 'absolute', 'z-50', 'w-64', 'shadow-xl'],
    sandboxControls: [
      {
        id: 'slashFilter',
        label: 'Typed Slash Query Filter',
        type: 'select',
        options: [
          { label: '`/` (Show All 4 Block Types)', value: 'all' },
          { label: '`/h2` (Filter to Heading 2)', value: 'h2' },
          { label: '`/code` (Filter to TSX Code Block)', value: 'code' },
        ],
        defaultValue: 'all',
      },
      {
        id: 'editorPattern',
        label: 'Editor Toolbar Architecture',
        type: 'select',
        options: [
          { label: 'Caret-Anchored Slash Popover (Clean Canvas)', value: 'slash' },
          { label: 'Cluttered Top Ribbon Toolbar (Legacy)', value: 'toolbar' },
        ],
        defaultValue: 'slash',
      },
    ],
    relatedTerms: ['command-palette', 'overlay-taxonomy'],
  },
  {
    id: 'pip-mini-player',
    number: '45',
    title: 'Docked Picture-in-Picture (PiP) Mini-Player',
    category: 'navigation',
    categoryLabel: 'Navigation & Everyday Components',
    difficulty: 'Intermediate',
    pronunciationOrAlias: 'Floating Viewport-Corner Media Overlay (`aspect-video w-72`)',
    summary:
      'A persistent floating media or live-call stage (`fixed bottom-5 right-5 z-40 w-72 aspect-video`) that automatically docks to the viewport corner when the user scrolls past the primary video player or switches workspace tabs.',
    whyAgentsNeedIt:
      'When users ask to "keep the video or call visible while scrolling down to read comments," AI agents often make the giant full-width video `sticky top-0`, blocking half the screen. Asking for a **Docked Picture-in-Picture (PiP) Corner Mini-Player** keeps media accessible while preserving 90% of the reading viewport.',
    vibePhrases: [
      'small floating video player in the bottom right corner when you scroll down',
      'youtube or twitch mini player that docks in the corner',
      'picture in picture floating call window',
      'corner docked mini player',
    ],
    badPromptExample:
      'Make sure the user can still watch the livestream video while they scroll down the page to read the documentation notes.',
    goodPromptExample:
      'When the primary media stage scrolls out of view (`IntersectionObserver`), morph it into a Docked Picture-in-Picture (PiP) Mini-Player (`fixed bottom-5 right-5 z-40 w-72 aspect-video rounded-2xl shadow-2xl border border-slate-700 bg-slate-950 overflow-hidden`) featuring a live status badge, Play/Pause toggle, and an Expand (`↗`) button.',
    anatomyParts: [
      {
        name: '16:9 Corner-Pinned Frame',
        role: 'Compact floating container anchored 20px from the viewport corner.',
        cssHint: 'fixed bottom-5 right-5 z-40 w-72 aspect-video rounded-2xl shadow-2xl',
      },
      {
        name: 'Scrim Control Overlay',
        role: 'Top and bottom gradient bars housing stream title, timecode, and expand/close buttons.',
        cssHint: 'bg-gradient-to-t from-black/80 via-transparent to-black/50 p-3',
      },
      {
        name: 'Restore / Expand Action (`↗`)',
        role: 'Returns the mini-player back to the full-width primary stage.',
        cssHint: 'px-2 py-1 rounded bg-white/15 hover:bg-white/25 text-white text-xs',
      },
    ],
    cssSnippet: `.pip-dock {
  position: fixed;
  bottom: 1.25rem;
  right: 1.25rem;
  z-index: 40;
  width: 18rem;
  aspect-ratio: 16 / 9;
  border-radius: 1rem;
}`,
    tailwindTokens: ['fixed bottom-5 right-5', 'aspect-video', 'w-72', 'shadow-2xl', 'z-40'],
    sandboxControls: [
      {
        id: 'dockPosition',
        label: 'Mini-Player Dock State',
        type: 'select',
        options: [
          { label: 'Bottom-Right PiP Corner Dock (Scrolled Down)', value: 'bottom-right' },
          { label: 'Bottom-Left PiP Corner Dock', value: 'bottom-left' },
          { label: 'Expanded Full-Width Stage (Top of Page)', value: 'expanded' },
        ],
        defaultValue: 'bottom-right',
      },
    ],
    relatedTerms: ['overlay-taxonomy', 'sticky-rail', 'luminance-scrim'],
  },
  {
    id: 'segmented-otp-input',
    number: '46',
    title: 'Segmented OTP / 2FA Auto-Advance Input',
    category: 'navigation',
    categoryLabel: 'Navigation & Everyday Components',
    difficulty: 'Foundational',
    pronunciationOrAlias: 'Individual Character Slot Array (`autocomplete="one-time-code"`)',
    summary:
      'A 6-digit verification code input pattern that splits each digit into a dedicated `tabular-nums` character box, automatically advancing keyboard focus on digit entry, stepping backward on `Backspace`, and distributing a pasted 6-digit string across all slots.',
    whyAgentsNeedIt:
      'If you ask an AI for a "6-digit verification code box," it either renders a plain `<input type="number">` (with ugly up/down spinner arrows) or 6 separate inputs that trap the user because focus does not auto-advance or support clipboard paste.',
    vibePhrases: [
      '6 separate little boxes for typing a verification code',
      'two factor authentication code input where cursor jumps to next box',
      'sms otp 6 digit boxes with paste support',
      'segmented passcode input',
    ],
    badPromptExample:
      'Add a 6-digit verification code input on the login screen with 6 boxes.',
    goodPromptExample:
      'Build a 6-digit Segmented OTP Input (`role="group" aria-label="6-Digit Verification Code"`): render 6 individual `w-11 h-13 text-center font-mono text-lg font-bold tabular-nums rounded-xl border` inputs with `inputMode="numeric" maxLength={1}` and `autoComplete="one-time-code"` on slot 0. Auto-advance focus to `slot + 1` on digit input, move focus to `slot - 1` on `Backspace`, and intercept `onPaste` to populate all 6 slots simultaneously.',
    anatomyParts: [
      {
        name: 'Digit Slot Cell (`maxLength={1}`)',
        role: 'Single-character monospace input with high-contrast focus ring.',
        cssHint: 'w-11 h-12 text-center font-mono text-lg font-bold tabular-nums rounded-xl border',
      },
      {
        name: 'Triplet Visual Grouping Divider',
        role: 'Subtle dash (`-`) after the 3rd digit reducing cognitive chunking load (`482 - 910`).',
        cssHint: 'text-slate-300 font-mono px-1 select-none',
      },
      {
        name: 'SMS Autofill & Paste Handler',
        role: 'Distributes a 6-character clipboard or OS SMS payload across all 6 state indices.',
        cssHint: 'autoComplete="one-time-code" onPaste={handlePaste}',
      },
    ],
    cssSnippet: `.otp-slot {
  width: 2.75rem;
  height: 3.25rem;
  text-align: center;
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  border-radius: 0.75rem;
}`,
    tailwindTokens: ['inputMode="numeric"', 'autoComplete="one-time-code"', 'tabular-nums', 'maxLength={1}'],
    sandboxControls: [
      {
        id: 'otpPreset',
        label: 'Interactive Verification State',
        type: 'select',
        options: [
          { label: 'Active Entry (3 of 6 Digits Typed)', value: 'partial' },
          { label: 'Verified 6-Digit Code (482-910)', value: 'verified' },
          { label: 'Invalid Code Shake / Error State', value: 'error' },
        ],
        defaultValue: 'partial',
      },
    ],
    relatedTerms: ['focus-ring', 'tabular-numerals'],
  },
  {
    id: 'magnetic-cursor-target',
    number: '47',
    title: 'Magnetic Cursor Target & Proximity Pull',
    category: 'motion',
    categoryLabel: 'Micro-Interactions & Motion',
    difficulty: 'Intermediate',
    pronunciationOrAlias: 'Pointer-Delta Spring Translation (`translate3d(dx * 0.28, dy * 0.28, 0)`)',
    summary:
      'A tactile micro-interaction popularized by iPadOS pointer physics and Awwwards interfaces where a primary CTA button or navigation target subtly pulls toward the user cursor within a proximity field before snapping back smoothly on pointer exit.',
    whyAgentsNeedIt:
      'When you ask an AI for an "interactive hover effect on the main button," it applies a generic `hover:scale-105`. Specifying a **Magnetic Cursor Target using pointer-delta translation (`dx * 0.28, dy * 0.28`) and spring snap-back** creates genuine physical craft.',
    vibePhrases: [
      'button that pulls toward your mouse cursor when you get close',
      'magnetic hover button like ipad pointer',
      'button that follows the mouse slightly before snapping back',
      'magnetic cursor attraction effect',
    ],
    badPromptExample:
      'Make the primary Call to Action button have a really cool interactive hover animation.',
    goodPromptExample:
      'Implement a Magnetic Cursor Target on the primary CTA: calculate pointer offset `(dx, dy)` relative to the button center in `onMouseMove` (`dx = (e.clientX - centerX) * 0.28`) and apply `transform: translate3d(${dx}px, ${dy}px, 0)` with a smooth `transition: transform 180ms cubic-bezier(0.16, 1, 0.3, 1)` snap-back to `(0, 0, 0)` on `onMouseLeave`.',
    anatomyParts: [
      {
        name: 'Proximity Sensor Hit Area',
        role: 'Outer bounding wrapper that measures pointer coordinates relative to center `(cx, cy)`.',
        cssHint: 'relative p-6 flex items-center justify-center',
      },
      {
        name: 'Compositor-Translated Target (`translate3d`)',
        role: 'Button element shifted on the GPU via `translate3d(dx, dy, 0)` without layout reflow.',
        cssHint: 'will-change-transform transition-transform duration-150 ease-out',
      },
    ],
    cssSnippet: `.magnetic-cta {
  transform: translate3d(var(--mag-x, 0px), var(--mag-y, 0px), 0);
  transition: transform 180ms cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}`,
    tailwindTokens: ['translate3d()', 'will-change-transform', 'transition-transform', 'duration-150'],
    sandboxControls: [
      {
        id: 'pullStrength',
        label: 'Magnetic Pull Multiplier',
        type: 'slider',
        min: 10,
        max: 50,
        step: 5,
        unit: '%',
        defaultValue: 30,
      },
    ],
    relatedTerms: ['spring-physics', 'spotlight-border'],
  },
  {
    id: 'isometric-layer-stack',
    number: '48',
    title: 'Isometric Exploded Layer Stack (3D CSS Planes)',
    category: 'futuristic',
    categoryLabel: 'Sci-Fi, Spatial & Futuristic UI (FUI)',
    difficulty: 'System Architecture',
    pronunciationOrAlias: '3D Orthographic Z-Axis Dissection (`preserve-3d` + `translateZ`)',
    summary:
      'A spatial architecture diagram that tilts UI cards, security layers, or hardware planes into an isometric 3D projection (`rotateX(55deg) rotateZ(-45deg)`) with `transform-style: preserve-3d`, separating each plane along the vertical Z-axis (`translateZ`) to reveal how system layers stack.',
    whyAgentsNeedIt:
      'When users ask for a "3D stacked architecture diagram showing our 3 platform layers," AI models draw flat 2D rectangles stacked vertically. Prompting for an **Isometric Exploded Layer Stack with `preserve-3d`, `rotateX(55deg) rotateZ(-45deg)`, and `translateZ()` spacing** produces a true spatial 3D hologram.',
    vibePhrases: [
      'floating 3d tilted layers stacked on top of each other',
      'exploded view diagram that separates in 3d when you hover',
      'isometric hologram stack of architecture layers',
      '3d css tilted planes',
    ],
    badPromptExample:
      'Show a cool 3D diagram of how our 3 system layers (Hardware, Kernel, and UI) stack on top of each other.',
    goodPromptExample:
      'Build an Isometric Exploded Layer Stack using CSS 3D transforms: apply `[transform-style:preserve-3d]` and `[transform:rotateX(55deg)_rotateZ(-45deg)]` to the stage container, and offset each glass plane along the Z-axis via `translateZ(0px)`, `translateZ(44px)`, and `translateZ(88px)` with smooth hover expansion.',
    anatomyParts: [
      {
        name: '3D Scene Stage (`preserve-3d`)',
        role: 'Establishes the shared 3D coordinate space rotated in X and Z axes.',
        cssHint: '[transform-style:preserve-3d] [transform:rotateX(55deg)_rotateZ(-45deg)]',
      },
      {
        name: 'Z-Translated Plane (`translateZ(n)`)',
        role: 'Individual translucent card levitated along the Z-axis (`0px`, `44px`, `88px`).',
        cssHint: 'absolute w-48 h-28 rounded-xl border border-cyan-400/70 bg-cyan-950/70 backdrop-blur-md',
      },
      {
        name: 'Vertical Axis Alignment Spine',
        role: 'Subtle vertical reference line connecting the centers of all exploded planes.',
        cssHint: 'border-l border-dashed border-cyan-400/40',
      },
    ],
    cssSnippet: `.isometric-stage {
  transform-style: preserve-3d;
  transform: rotateX(55deg) rotateZ(-45deg);
}
.exploded-plane {
  transform: translateZ(calc(var(--layer-idx) * 44px));
  transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
}`,
    tailwindTokens: ['[transform-style:preserve-3d]', '[transform:rotateX(55deg)_rotateZ(-45deg)]', 'translateZ()'],
    sandboxControls: [
      {
        id: 'zGap',
        label: 'Z-Axis Explosion Spacing',
        type: 'slider',
        min: 8,
        max: 44,
        step: 4,
        unit: 'px',
        defaultValue: 28,
      },
      {
        id: 'activePlane',
        label: 'Highlighted Architecture Layer',
        type: 'select',
        options: [
          { label: 'All 3 Planes Illuminated', value: 'all' },
          { label: 'Layer 03: Spatial Glass UI Shell (Top)', value: '2' },
          { label: 'Layer 02: Neural Agent Runtime (Middle)', value: '1' },
          { label: 'Layer 01: Silicon Tensor Core (Base)', value: '0' },
        ],
        defaultValue: 'all',
      },
    ],
    relatedTerms: ['visionos-spatial-glass', 'hud-reticle-frame', 'z-index-scale'],
  },
];

