export interface AnatomyHotspot {
  id: string;
  pinNumber: string;
  termName: string;
  linkedTermId: string;
  zoneLabel: string;
  uxPurpose: string;
  spatialRule: string;
  cssSignature: string;
  vibeMistake: string;
  agentPrompt: string;
}

export interface AnatomyTemplate {
  id:
    | 'saas-workspace'
    | 'editorial-landing'
    | 'ecommerce-studio'
    | 'fui-orbital-hud';
  name: string;
  subtitle: string;
  domainTag: string;
  description: string;
  hotspots: AnatomyHotspot[];
}

export const ANATOMY_TEMPLATES: AnatomyTemplate[] = [
  {
    id: 'saas-workspace',
    name: 'SaaS Analytics & Developer Console',
    subtitle: 'Viewport-Locked App Shell · High-Density Tabular Grid · Slide-Over Inspector',
    domainTag: 'B2B SaaS / DevTools',
    description:
      'Click any numbered architectural callout pin or UI region to inspect the exact terminology behind Linear-, Stripe-, and Vercel-grade workspace interfaces.',
    hotspots: [
      {
        id: 'saas-sidebar',
        pinNumber: '01',
        termName: 'Persistent Navigation Rail (240px)',
        linkedTermId: 'app-shell',
        zoneLabel: 'Left App Shell Chrome',
        uxPurpose:
          'Anchors primary route switching, workspace selector, and keyboard shortcut hints in a fixed-width vertical column isolated from the main scroll canvas.',
        spatialRule: 'Fixed width 240px (w-60 shrink-0); 1px right hairline border; internal padding 12px (p-3).',
        cssSignature: 'w-60 shrink-0 border-r border-slate-200 bg-slate-50/70 flex flex-col justify-between',
        vibeMistake: 'Asking for "a menu on the left" without locking viewport height causes the sidebar to scroll out of view.',
        agentPrompt:
          'Create a 240px Persistent Left Navigation Rail (w-60 shrink-0 border-r border-slate-200 bg-slate-50/60 flex flex-col justify-between p-3) inside a viewport-locked h-screen overflow-hidden App Shell.',
      },
      {
        id: 'saas-topbar',
        pinNumber: '02',
        termName: 'Contextual Top Bar & Breadcrumb Trail',
        linkedTermId: 'breadcrumb-trail',
        zoneLabel: 'Top Header Zone (56px)',
        uxPurpose:
          'Communicates exact hierarchical path (Workspace / Environment / Active View) on the left and houses the Cmd+K omnibar trigger + 1 primary CTA on the right.',
        spatialRule: 'Height 56px (h-14); horizontal padding 24px (px-6); single-line nowrap items.',
        cssSignature: 'h-14 border-b border-slate-200 px-6 flex items-center justify-between bg-white/80 backdrop-blur-md',
        vibeMistake: 'Stuffing 8 navigation links, notification bells, and secondary sub-headers into the top bar.',
        agentPrompt:
          'Build a 56px Contextual Top Bar (h-14 border-b border-slate-200 px-6 flex items-center justify-between) with a semantic Breadcrumb Trail on the left and a Cmd+K Command Palette trigger + 1 Primary Action button on the right.',
      },
      {
        id: 'saas-segmented',
        pinNumber: '03',
        termName: 'Segmented Control & Filter Bar',
        linkedTermId: 'segmented-control',
        zoneLabel: 'Sub-Header Toolbar',
        uxPurpose:
          'Provides instant client-side view switching (All Events / Errors / Latency) inside a recessed track with concentric inner border radius.',
        spatialRule: 'Recessed track p-1 rounded-lg (8px); active thumb rounded-md (6px) so R_outer - Padding = R_inner.',
        cssSignature: 'inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200/70',
        vibeMistake: 'Rendering 3 separate bordered buttons that jump around when clicked.',
        agentPrompt:
          'Add a Toolbar Filter Row featuring a Segmented Control (inline-flex p-1 bg-slate-100 rounded-lg) with single-line buttons where the active segment has bg-white text-slate-900 shadow-xs rounded-md.',
      },
      {
        id: 'saas-kpi-strip',
        pinNumber: '04',
        termName: 'Single-Elevation Hairline KPI Strip',
        linkedTermId: 'surface-elevation',
        zoneLabel: 'Summary Telemetry Strip',
        uxPurpose:
          'Displays 4 high-signal operational metrics inside one unified container partitioned by 1px vertical hairline dividers (`divide-x`) and tabular numerals.',
        spatialRule: '1 outer border (`border-slate-200 rounded-xl`); `divide-x divide-slate-200`; `p-5` per cell.',
        cssSignature: 'grid grid-cols-4 bg-white border border-slate-200 rounded-xl divide-x divide-slate-200 tabular-nums',
        vibeMistake: 'Putting 4 deeply shadowed cards inside another shadowed container with decorative green pulsing dots.',
        agentPrompt:
          'Render a 4-column Single-Elevation Hairline KPI Strip (grid grid-cols-1 md:grid-cols-4 bg-white border border-slate-200 rounded-xl divide-y md:divide-y-0 md:divide-x divide-slate-200) using font-mono tabular-nums for all metrics.',
      },
      {
        id: 'saas-data-grid',
        pinNumber: '05',
        termName: 'High-Density Tabular Data Grid',
        linkedTermId: 'tabular-numerals',
        zoneLabel: 'Primary Scroll Canvas',
        uxPurpose:
          'Presents structured records with compact 40px row heights, left-aligned text identifiers, and right-aligned `tabular-nums` latency & timestamp columns.',
        spatialRule: 'Row height 40px–44px; left-align text columns; right-align numeric/currency columns (`text-right tabular-nums`).',
        cssSignature: 'w-full text-sm border-collapse divide-y divide-slate-200 font-variant-numeric: tabular-nums',
        vibeMistake: 'Center-aligning numbers or forgetting tabular-nums so decimal points zig-zag down the column.',
        agentPrompt:
          'Build a High-Density Data Table inside a single bordered surface: left-align text columns, right-align numeric/latency columns with `font-mono tabular-nums`, and highlight the active selected row with `bg-sky-50/70`.',
      },
      {
        id: 'saas-drawer',
        pinNumber: '06',
        termName: 'Docked Inspector / Slide-Over Sheet',
        linkedTermId: 'slide-over-drawer',
        zoneLabel: 'Right Contextual Inspector (320px)',
        uxPurpose:
          'Displays deep payload metadata, trace timelines, and quick actions for the currently selected table row without losing table scroll position.',
        spatialRule: 'Width 320px–380px; sticky header + scrollable body + sticky bottom action bar.',
        cssSignature: 'w-80 border-l border-slate-200 bg-white flex flex-col justify-between',
        vibeMistake: 'Opening a tiny centered modal dialog that truncates JSON payloads and hides the table.',
        agentPrompt:
          'Include a Right Contextual Inspector Drawer (w-80 shrink-0 border-l border-slate-200 bg-white flex flex-col) synced to the selected table row, with a sticky header, scrollable payload inspector, and sticky bottom action bar.',
      },
    ],
  },
  {
    id: 'editorial-landing',
    name: 'Editorial Product Launch Landing Page',
    subtitle: '3-Zone Top Bar · 7:5 Split-Screen Hero · Asymmetric Bento Feature Grid',
    domainTag: 'Marketing / Launch',
    description:
      'Inspect how modern developer-first and design-forward product pages pace visual density from the 3-Zone Top Bar through the Split-Screen Hero and Bento Grid.',
    hotspots: [
      {
        id: 'landing-topbar',
        pinNumber: '01',
        termName: 'Strict 3-Zone Top Bar Contract',
        linkedTermId: 'glassmorphism',
        zoneLabel: 'Sticky Glassmorphic Header',
        uxPurpose:
          'Maintains clean brand presence with 1 wordmark on the left, 4 single-line text anchor links in the center, and 1 high-contrast primary CTA on the right.',
        spatialRule: '3 zones separated by `gap-8`; `bg-white/75 backdrop-blur-md`; zero subtitle badges on wordmark.',
        cssSignature: 'sticky top-0 z-30 flex items-center justify-between gap-8 px-8 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200',
        vibeMistake: 'Adding pill tags next to the logo, 2 rows of navigation buttons, or fake "SYSTEM ONLINE" tickers.',
        agentPrompt:
          'Enforce the 3-Zone Top Bar Contract: Zone 1 single-line brand wordmark, Zone 2 four single-line text nav links with hover underlines, and Zone 3 one primary CTA button, styled with bg-white/80 backdrop-blur-md.',
      },
      {
        id: 'landing-hero-copy',
        pinNumber: '02',
        termName: '7-Column Balanced Typographic Stack',
        linkedTermId: 'fluid-typography',
        zoneLabel: 'Left Hero Split (7 Columns)',
        uxPurpose:
          'Delivers the core value proposition through a quiet 1-line eyebrow kicker, a fluid `text-balance` display headline, a 65ch lead paragraph, and a dual-CTA row.',
        spatialRule: 'Fluid display `clamp(2.25rem, 4vw, 3.5rem)`; `text-wrap: balance`; body measure `max-w-[60ch]`.',
        cssSignature: 'lg:col-span-7 flex flex-col justify-center space-y-5',
        vibeMistake: 'Using all-caps shouting headlines or letting a single orphan word wrap onto the last line.',
        agentPrompt:
          'In the left 7 columns of a 12-column Split-Screen Hero, stack a quiet 1-line text kicker, a display headline using clamp() and text-balance, a 60ch lead paragraph in muted slate, and a primary + secondary CTA button pair.',
      },
      {
        id: 'landing-hero-stage',
        pinNumber: '03',
        termName: '5-Column Interactive Specimen Stage',
        linkedTermId: 'split-screen-hero',
        zoneLabel: 'Right Hero Split (5 Columns)',
        uxPurpose:
          'Provides immediate visual proof adjacent to the headline claim, using Concentric Border Radius Math (`R_outer = R_inner + Padding`).',
        spatialRule: 'Outer frame `p-4 rounded-[24px]`; inner preview `rounded-[8px]`; height stretched (`items-stretch`).',
        cssSignature: 'lg:col-span-5 p-4 rounded-[24px] bg-slate-900 text-white flex flex-col justify-between',
        vibeMistake: 'Floating a tiny disconnected box or leaving uneven vertical alignment against the left column.',
        agentPrompt:
          'In the right 5 columns of the Split-Screen Hero, build a full-height interactive product preview frame (p-4 rounded-[24px] with concentric rounded-[8px] inner canvas) aligned via items-stretch.',
      },
      {
        id: 'landing-bento',
        pinNumber: '04',
        termName: 'Asymmetric 3-Column Bento Grid',
        linkedTermId: 'bento-grid',
        zoneLabel: 'Below-the-Fold Architecture Showcase',
        uxPurpose:
          'Paces feature storytelling across a 2-column primary anchor card and a 1-column companion card with uniform 16px (`gap-4`) gutters.',
        spatialRule: '3-column CSS Grid (`grid-cols-3 gap-4`); Hero cell `col-span-2`; companion cell `col-span-1`.',
        cssSignature: 'grid grid-cols-1 md:grid-cols-3 gap-4',
        vibeMistake: 'Creating 6 identical 3-column icon cards that look like a generic Bootstrap template.',
        agentPrompt:
          'Below the hero, construct a 3-column Bento Grid (grid-cols-1 md:grid-cols-3 gap-4) where the primary interactive feature spans 2 columns (md:col-span-2) and the quantitative proof card spans 1 column.',
      },
    ],
  },
  {
    id: 'ecommerce-studio',
    name: 'Modern E-Commerce & Catalog Studio',
    subtitle: 'Sticky Facet Rail · Aspect-Locked Product Cards · Luminance Contrast Scrim',
    domainTag: 'E-Commerce / Editorial Catalog',
    description:
      'Explore the exact UI/UX anatomy of high-craft retail and catalog interfaces: sticky facet filtering, unboxed metadata discipline, and concentric media cards.',
    hotspots: [
      {
        id: 'ecom-sticky-facets',
        pinNumber: '01',
        termName: 'Sticky Facet Filter Rail',
        linkedTermId: 'sticky-rail',
        zoneLabel: 'Left Catalog Filter Column (220px)',
        uxPurpose:
          'Keeps category, material, and price range filters pinned in view (`sticky top-20 self-start`) while the user scrolls through the product grid.',
        spatialRule: 'Width 220px; `sticky top-20 self-start`; clean checkbox/radio affordances with tabular counts.',
        cssSignature: 'w-56 shrink-0 sticky top-20 self-start space-y-6',
        vibeMistake: 'Pushing filters into a hidden modal on desktop or forgetting `self-start` so sticky fails.',
        agentPrompt:
          'Place a 220px Sticky Facet Filter Rail (w-56 shrink-0 sticky top-20 self-start) on the left of the catalog grid with category checkboxes and right-aligned tabular item counts.',
      },
      {
        id: 'ecom-scrim-banner',
        pinNumber: '02',
        termName: 'Editorial Collection Banner with Scrim',
        linkedTermId: 'contrast-scrim',
        zoneLabel: 'Collection Hero Frame',
        uxPurpose:
          'Layers a bottom-up Luminance Contrast Scrim over studio imagery so the collection title and unboxed metadata remain effortless to read.',
        spatialRule: 'Directional gradient `from-slate-950/85 via-slate-950/35 to-transparent`; minimum 4.5:1 text contrast.',
        cssSignature: 'relative rounded-2xl overflow-hidden bg-gradient-to-t from-slate-950/85 via-slate-950/35',
        vibeMistake: 'Putting raw white text directly on a light background image without a contrast scrim.',
        agentPrompt:
          'Render an Editorial Collection Banner with a bottom-up Luminance Contrast Scrim (bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-transparent) protecting bottom-left white display typography.',
      },
      {
        id: 'ecom-product-card',
        pinNumber: '03',
        termName: 'Aspect-Locked Card & Unboxed Metadata',
        linkedTermId: 'nested-radius',
        zoneLabel: 'Catalog Grid Cell',
        uxPurpose:
          'Locks product media to a 4:3 or 1:1 aspect frame, leads directly with the product title, and formats metadata with `·` separators instead of pill badges.',
        spatialRule: 'Zero pill badges on cards; `aspect-[4/3]` media container; `tabular-nums` price alignment.',
        cssSignature: 'group flex flex-col gap-3 p-3 rounded-[20px] border border-slate-200 bg-white',
        vibeMistake: 'Stacking 3 colored pill badges ("NEW", "IN STOCK", "SALE") above the product title.',
        agentPrompt:
          'Design Product Cards using Concentric Border Radius Math (p-3 rounded-[20px] outer card, rounded-[8px] aspect-[4/3] media box), unboxed metadata separated by mid-dots ("Anodized Aluminum · In Stock"), and tabular-nums pricing.',
      },
      {
        id: 'ecom-optimistic-action',
        pinNumber: '04',
        termName: 'Optimistic Quick-Add & Toast Trigger',
        linkedTermId: 'optimistic-ui',
        zoneLabel: 'Primary Card Affordance',
        uxPurpose:
          'Immediately flips button state to "Added to Bag ✓" in <16ms and increments the header bag counter without blocking the browsing flow.',
        spatialRule: 'Single-line button (`whitespace-nowrap`); 180ms transition; tabular bag counter.',
        cssSignature: 'px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-180 whitespace-nowrap',
        vibeMistake: 'Freezing the whole screen with a full-page loading overlay just to add an item to the cart.',
        agentPrompt:
          'Wire the "Add to Spec Bag" button with Optimistic UI feedback: immediately toggle button state to confirmed emerald ("Added ✓") and increment the header counter in <16ms.',
      },
    ],
  },
  {
    id: 'fui-orbital-hud',
    name: 'Sci-Fi Tactical HUD & Orbital Console (FUI)',
    subtitle: 'Chamfered Polygon Frames · Polar Radar Sweep · Node-Graph Bezier Canvas',
    domainTag: 'Sci-Fi / FUI HUD',
    description:
      'Dissect the exact geometry and terminology of SpaceX-, Anduril-, and VisionOS-inspired futuristic interfaces: 45-degree chamfered polygons, corner reticle L-brackets, polar radar sweeps, and CRT raster telemetry.',
    hotspots: [
      {
        id: 'fui-chamfer',
        pinNumber: '01',
        termName: 'Chamfered HUD Frame & Corner Reticles',
        linkedTermId: 'hud-reticle-frame',
        zoneLabel: 'Top-Left Tactical Telemetry Frame',
        uxPurpose:
          'Replaces soft consumer rounded corners with 45-degree mechanical `clip-path` polygon bevels and 10px L-bracket corner targeting reticles.',
        spatialRule: '45° corner bevel (`16px`); `border-t-2 border-l-2 border-sky-400` corner ticks; `tabular-nums`.',
        cssSignature: 'bg-slate-900 [clip-path:polygon(0_0,calc(100%-16px)_0,100%_16px,100%_100%,16px_100%,0_calc(100%-16px))]',
        vibeMistake: 'Putting glowing neon cyan drop-shadows on a normal rounded-2xl card.',
        agentPrompt:
          'Construct a Tactical FUI Frame using a 45-degree Chamfered Polygon clip-path (`polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))`) framed by 4 Corner L-Bracket Reticles.',
      },
      {
        id: 'fui-radar',
        pinNumber: '02',
        termName: 'Polar Coordinate Radar & Conic Sweep',
        linkedTermId: 'polar-radar-hud',
        zoneLabel: 'Sensor Situational Awareness Dial',
        uxPurpose:
          'Plots spatial targets along concentric range rings and azimuth crosshairs swept by a rotating `conic-gradient` sensor beam.',
        spatialRule: '1:1 aspect circle (`aspect-square rounded-full`); 3 concentric range rings; `conic-gradient` sweep.',
        cssSignature: 'aspect-square rounded-full bg-[conic-gradient(from_0deg,transparent_70%,rgba(56,189,248,0.38)_100%)]',
        vibeMistake: 'Drawing a static circle without range rings, azimuth crosshairs, or conic sweep gradient.',
        agentPrompt:
          'Render a Polar Coordinate Radar Plot with 3 concentric range rings, orthogonal azimuth crosshairs, a rotating conic-gradient sweep sector, and pulsing target coordinate blips.',
      },
      {
        id: 'fui-node-graph',
        pinNumber: '03',
        termName: 'Node-Graph Patch Canvas & Bezier Noodles',
        linkedTermId: 'node-graph-canvas',
        zoneLabel: 'Center Autonomous Pipeline Stage',
        uxPurpose:
          'Connects discrete telemetry and AI pipeline nodes via horizontal-tangent SVG Cubic-Bezier splines (`M x1 y1 C cx1 cy1...`) over a dot-matrix canvas.',
        spatialRule: '16px radial dot-matrix grid; typed I/O socket circles; `stroke-dasharray` animated packet flow.',
        cssSignature: 'bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]',
        vibeMistake: 'Using straight HTML borders instead of an underlying SVG Cubic-Bezier spline layer.',
        agentPrompt:
          'Build a Node-Graph Patch Canvas over a 16px radial dot-matrix grid, linking left/right node I/O sockets via an SVG Cubic-Bezier spline path (`M x1 y1 C x1+60 y1, x2-60 y2, x2 y2`).',
      },
      {
        id: 'fui-crt-log',
        pinNumber: '04',
        termName: 'CRT Scanline & Phosphor Halation Log',
        linkedTermId: 'crt-scanline-phosphor',
        zoneLabel: 'Bottom Command Raster Terminal',
        uxPurpose:
          'Layers a non-interactive 2px horizontal scanline grating over P1-emerald or P3-amber phosphor monospace telemetry with `text-shadow` halation.',
        spatialRule: '`pointer-events: none` on scanline overlay; `repeating-linear-gradient` 1px/3px pitch.',
        cssSignature: 'repeating-linear-gradient(0deg,rgba(0,0,0,0.25)_0_1px,transparent_1px_3px) [text-shadow:0_0_8px_currentColor]',
        vibeMistake: 'Forgetting pointer-events-none on the scanline layer, which blocks users from clicking buttons underneath.',
        agentPrompt:
          'Apply a CRT Scanline & Phosphor Terminal overlay (`pointer-events-none repeating-linear-gradient`) over monospace telemetry with subtle phosphor text-shadow bloom.',
      },
    ],
  },
];

export interface ComparisonGroup {
  id: string;
  title: string;
  subtitle: string;
  question: string;
  items: {
    name: string;
    linkedTermId: string;
    interruptionLevel: string;
    whenToUse: string;
    whenToAvoid: string;
    keyCssOrAria: string;
    promptPhrase: string;
  }[];
}

export const COMPARISON_GROUPS: ComparisonGroup[] = [
  {
    id: 'mystery-icons',
    title: 'Everyday Mystery Menu Icons (The "Three Dots / Lines" Taxonomy)',
    subtitle: 'Everyone clicks these 5 icons every single day, but almost nobody knows their formal UI/UX names.',
    question: 'Which compact menu icon matches the placement and action scope you want the AI agent to build?',
    items: [
      {
        name: 'Hamburger Menu (☰)',
        linkedTermId: 'iconic-menu-taxonomy',
        interruptionLevel: '3 Equal Horizontal Bars (Primary Nav)',
        whenToUse: 'Top-left or top-right of mobile screens to toggle the primary navigation drawer.',
        whenToAvoid: 'Desktop headers that have plenty of horizontal room for visible text links.',
        keyCssOrAria: '<Menu className="w-5 h-5" /> aria-label="Open navigation menu"',
        promptPhrase: 'Hamburger Menu button (3 horizontal bars) that toggles a mobile navigation sheet',
      },
      {
        name: 'Kebab Menu (⋮)',
        linkedTermId: 'iconic-menu-taxonomy',
        interruptionLevel: '3 Vertical Dots (Compact Overflow)',
        whenToUse: 'Top-right of mobile app bars or narrow list cards where horizontal width is tight.',
        whenToAvoid: 'Wide desktop data tables (where Meatballs ⋯ aligns better horizontally).',
        keyCssOrAria: '<MoreVertical className="w-4 h-4" /> aria-haspopup="menu"',
        promptPhrase: 'Kebab Menu icon button (3 vertical dots `MoreVertical`) opening an overflow Popover',
      },
      {
        name: 'Meatballs Menu (⋯)',
        linkedTermId: 'iconic-menu-taxonomy',
        interruptionLevel: '3 Horizontal Dots (Row / Card Actions)',
        whenToUse: 'Rightmost action cell of desktop data table rows or top-right of dashboard cards.',
        whenToAvoid: 'Primary global site navigation.',
        keyCssOrAria: '<MoreHorizontal className="w-4 h-4" /> aria-haspopup="menu"',
        promptPhrase: 'Meatballs Menu trigger (3 horizontal dots `MoreHorizontal`) in the rightmost table column',
      },
      {
        name: 'Bento / Waffle Menu (⊞)',
        linkedTermId: 'iconic-menu-taxonomy',
        interruptionLevel: '3x3 Square Dot Grid (App Switcher)',
        whenToUse: 'Switching between products in a multi-app suite (like Google Workspace, Linear, or Atlassian).',
        whenToAvoid: 'Single-page marketing sites with only 1 product.',
        keyCssOrAria: '<LayoutGrid className="w-4 h-4" /> aria-label="Switch application"',
        promptPhrase: 'Bento / Waffle App Switcher icon (3x3 grid) in the top bar opening a product matrix Popover',
      },
    ],
  },
  {
    id: 'overlays',
    title: 'Overlay & Interruption Spectrum',
    subtitle: 'Stop calling everything a "popup" — pick the exact overlay for the user’s workflow.',
    question: 'Does the user need to stop everything, inspect a deep record, tweak a setting, or just see confirmation?',
    items: [
      {
        name: 'Modal Dialog',
        linkedTermId: 'overlay-taxonomy',
        interruptionLevel: 'High (Blocking Scrim + Focus Trap)',
        whenToUse: 'Destructive confirmations (Delete Project), critical auth gates, or focused wizard steps.',
        whenToAvoid: 'Long scrollable forms, secondary row details, or passive "Saved!" notifications.',
        keyCssOrAria: 'role="dialog" aria-modal="true" fixed inset-0 bg-slate-950/45 flex items-center justify-center',
        promptPhrase: 'Centered blocking Modal Dialog with backdrop scrim and Esc/backdrop dismissal',
      },
      {
        name: 'Slide-Over Drawer (Sheet)',
        linkedTermId: 'slide-over-drawer',
        interruptionLevel: 'Medium-High (Edge-Docked Overlay)',
        whenToUse: 'Inspecting a selected table row, editing a 10-field record, shopping carts, or mobile nav.',
        whenToAvoid: 'Simple 1-sentence confirmations or 2-option dropdown menus.',
        keyCssOrAria: 'fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl border-l flex flex-col',
        promptPhrase: 'Right-anchored Slide-Over Drawer (Sheet) with sticky header, scrollable body, and sticky footer',
      },
      {
        name: 'Bottom Sheet (with Grabber)',
        linkedTermId: 'bottom-sheet',
        interruptionLevel: 'Medium (Mobile Thumb-Zone Sheet)',
        whenToUse: 'Mobile share sheets, filter pickers, or map location cards with a top pill Grabber Handle.',
        whenToAvoid: 'Wide 1440px desktop monitors.',
        keyCssOrAria: 'fixed inset-x-0 bottom-0 rounded-t-[24px] + w-10 h-1.5 rounded-full bg-slate-300 mx-auto',
        promptPhrase: 'Mobile Bottom Sheet with centered top Drag Grabber Handle (`w-10 h-1.5 rounded-full`)',
      },
      {
        name: 'Anchored Popover',
        linkedTermId: 'overlay-taxonomy',
        interruptionLevel: 'Low (Tethered to Trigger Button)',
        whenToUse: 'Share menus, date pickers, multi-facet filter controls, or profile switchers.',
        whenToAvoid: 'Multi-step forms or destructive actions requiring explicit confirmation.',
        keyCssOrAria: 'absolute top-full mt-2 right-0 w-72 rounded-xl border border-slate-200 bg-white shadow-lg',
        promptPhrase: 'Contextual Popover anchored 8px below the trigger button without a full-screen blocking scrim',
      },
      {
        name: 'Toast / Snackbar',
        linkedTermId: 'overlay-taxonomy',
        interruptionLevel: 'Zero (Non-Blocking Corner Feedback)',
        whenToUse: 'Confirming "Copied to clipboard", "Settings saved", or background export completion with an Undo button.',
        whenToAvoid: 'Form validation errors (put those inline next to the input!).',
        keyCssOrAria: 'fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-lg',
        promptPhrase: 'Non-blocking bottom-right Toast notification that auto-dismisses after 3 seconds',
      },
    ],
  },
  {
    id: 'futuristic-paradigms',
    title: 'Sci-Fi, Spatial & Futuristic UI (FUI) Paradigms',
    subtitle: 'Distinguish between Tactical Defense HUDs, VisionOS Spatial Glass, and Retro-Futuristic CRT Consoles.',
    question: 'What flavor of futuristic or sci-fi interface are you instructing the AI agent to build?',
    items: [
      {
        name: 'Tactical Chamfered FUI (Anduril / SpaceX)',
        linkedTermId: 'hud-reticle-frame',
        interruptionLevel: 'Aerospace / Defense HUD Geometry',
        whenToUse: 'Mission control telemetry, drone/robotics autonomy consoles, and hard-surface sci-fi HUDs.',
        whenToAvoid: 'Warm editorial lifestyle blogs or consumer fashion stores.',
        keyCssOrAria: 'clip-path: polygon(...) + 4 Corner L-Bracket Reticles + font-mono tabular-nums',
        promptPhrase: '45-degree Chamfered Polygon HUD Frame with Corner L-Bracket Reticles and tabular monospace metrics',
      },
      {
        name: 'VisionOS Spatial Glass Platter',
        linkedTermId: 'spatial-vision-glass',
        interruptionLevel: '3D Spatial Computing Window',
        whenToUse: 'Immersive spatial computing apps, floating media players, and depth-layered 3D viewports.',
        whenToAvoid: 'High-density 100-row financial spreadsheets.',
        keyCssOrAria: 'rounded-[32px] bg-white/15 backdrop-blur-2xl border-t border-l border-white/50',
        promptPhrase: 'VisionOS Spatial Glass Platter with top-left Specular Rim Lighting and floating bottom grabber bar',
      },
      {
        name: 'CRT Scanline & Phosphor Terminal',
        linkedTermId: 'crt-scanline-phosphor',
        interruptionLevel: 'Cassette Futurism / Cyberdeck',
        whenToUse: 'Retro-futuristic command consoles, sci-fi lore terminals, and hardware synth interfaces.',
        whenToAvoid: 'Light-mode corporate healthcare portals.',
        keyCssOrAria: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.25) 0 1px, transparent 1px 3px) pointer-events-none',
        promptPhrase: 'CRT Phosphor Terminal with pointer-events-none 2px scanline grating and phosphor text-shadow bloom',
      },
      {
        name: 'Node-Graph Bezier Patch Canvas',
        linkedTermId: 'node-graph-canvas',
        interruptionLevel: 'Visual DAG / AI Agent Pipeline',
        whenToUse: 'AI agent workflow builders (ComfyUI / n8n style), shader graphs, and audio patch bays.',
        whenToAvoid: 'Simple linear 3-step forms (use a Wizard Stepper instead).',
        keyCssOrAria: 'radial-gradient dot-matrix + SVG <path d="M x1 y1 C cx1 cy1, cx2 cy2, x2 y2" />',
        promptPhrase: 'Node-Graph Patch Canvas over a 16px dot-matrix grid with typed I/O sockets and SVG Cubic-Bezier noodles',
      },
    ],
  },
];

export interface VibePresetScenario {
  id: string;
  label: string;
  vibeInput: string;
  targetDomain: string;
}

export const VIBE_PRESET_SCENARIOS: VibePresetScenario[] = [
  {
    id: 'everyday-mystery-ui',
    label: 'Famous Everyday UI ("What Is That Called?!")',
    targetDomain: 'Full-Featured Web App',
    vibeInput:
      'I want an endlessly scrolling row of company logos that fades on the edges, overlapping round user profile pictures with +5 at the end, expandable FAQ bars at the bottom, a thin colored line at the very top that fills up as you scroll, and the 3 horizontal dots menu on cards.',
  },
  {
    id: 'scifi-fui-mission-control',
    label: 'Sci-Fi SpaceX / Anduril HUD + VisionOS + Node Graph',
    targetDomain: 'Futuristic / Sci-Fi FUI',
    vibeInput:
      'Build a futuristic sci-fi mission control screen: use boxes with 45 degree cut off corners and L-shaped corner brackets, a circular radar scanner with a rotating sweep beam, a workflow builder with boxes connected by curved glowing wires like ComfyUI, and a retro CRT screen with horizontal scanlines.',
  },
  {
    id: 'apple-bento-launch',
    label: 'Apple-Style Bento Grid & Blurry Top Bar',
    targetDomain: 'Product Launch Page',
    vibeInput:
      'I want a top navigation bar that stays on screen and blurs the page scrolling behind it, a two-column hero with big title text on the left that wraps nicely and a live demo on the right, and below that an Apple-style grid of boxes of different sizes with smooth rounded corners that match.',
  },
  {
    id: 'linear-saas-console',
    label: 'Linear-Style Dashboard + Cmd+K + Side Drawer',
    targetDomain: 'SaaS / Developer Console',
    vibeInput:
      'Build a full screen dashboard where the left menu stays fixed, a path at the top showing folder > page, a popup search when you press ctrl+k, a table where numbers align vertically without jumping, and a panel that slides out from the right when you click a row.',
  },
];
