import React, { useState, useEffect } from 'react';
import {
  Search,
  Check,
  Layers,
  Plus,
  RefreshCw,
  FolderGit2,
  Bookmark,
  Share2,
  AlertTriangle,
  ChevronDown,
  MoreVertical,
  MoreHorizontal,
  LayoutGrid,
  ListFilter,
  Menu,
  Sparkles,
  Crosshair,
  Cpu,
  Radio,
} from 'lucide-react';
import { DesignTerm } from '../data/termsData';

interface InteractiveStageProps {
  term: DesignTerm;
  controlValues: Record<string, number | string>;
  showBlueprint: boolean;
}

export const InteractiveStage: React.FC<InteractiveStageProps> = ({
  term,
  controlValues,
  showBlueprint,
}) => {
  // Local interactive states for specific mini-simulations
  const [liveCounter, setLiveCounter] = useState(14289.42);
  const [optimisticSaved, setOptimisticSaved] = useState(false);
  const [optimisticPending, setOptimisticPending] = useState(false);
  const [optimisticCount, setOptimisticCount] = useState(128);
  const [raceTrigger, setRaceTrigger] = useState(0);
  const [staggerTrigger, setStaggerTrigger] = useState(0);
  const [cmdHighlightIdx, setCmdHighlightIdx] = useState(0);
  const [activePopover, setActivePopover] = useState(true);
  const [emptyCreatedItems, setEmptyCreatedItems] = useState<string[]>([]);
  const [openAccordions, setOpenAccordions] = useState<number[]>([0]);
  const [iconMenuOpen, setIconMenuOpen] = useState(true);
  const [nodeRouterY, setNodeRouterY] = useState<number>(84);

  // Live ticker for Tabular Numerals & Sci-Fi Telemetry demos
  useEffect(() => {
    if (
      term.id !== 'tabular-numerals' &&
      term.id !== 'hud-reticle-frame' &&
      term.id !== 'crt-scanline-phosphor'
    ) {
      return;
    }
    const interval = setInterval(() => {
      setLiveCounter((prev) => +(prev + 11.17).toFixed(2));
    }, 650);
    return () => clearInterval(interval);
  }, [term.id]);

  // Reset empty state items when scenario changes
  useEffect(() => {
    setEmptyCreatedItems([]);
  }, [term.id, controlValues.emptyScenario]);

  const handleOptimisticClick = () => {
    const mode = String(controlValues.latencyMode || 'optimistic');
    if (mode === 'optimistic') {
      setOptimisticSaved((prev) => !prev);
      setOptimisticCount((prev) => (optimisticSaved ? prev - 1 : prev + 1));
    } else {
      setOptimisticPending(true);
      setTimeout(() => {
        setOptimisticPending(false);
        setOptimisticSaved((prev) => !prev);
        setOptimisticCount((prev) => (optimisticSaved ? prev - 1 : prev + 1));
      }, 850);
    }
  };

  switch (term.id) {
    // -------------------------------------------------------------------------
    // 01. BENTO GRID
    // -------------------------------------------------------------------------
    case 'bento-grid': {
      const heroSpan = String(controlValues.heroSpan || '2');
      const gapSize = Number(controlValues.gapSize ?? 16);
      const radius = Number(controlValues.radius ?? 12);

      return (
        <div className="w-full space-y-3">
          {showBlueprint && (
            <div className="flex items-center justify-between text-[11px] font-mono text-[#0284C7] bg-[#0284C7]/8 px-3 py-1.5 rounded border border-[#0284C7]/25">
              <span>GRID: grid-cols-3 · auto-rows-[130px]</span>
              <span>GUTTER: {gapSize}px · RADIUS: {radius}px</span>
            </div>
          )}

          <div
            className="grid grid-cols-1 md:grid-cols-3 auto-rows-[132px] transition-all duration-180"
            style={{ gap: `${gapSize}px` }}
          >
            <div
              className={`relative bg-slate-900 text-white p-5 flex flex-col justify-between border border-slate-800 transition-all ${
                heroSpan === '3'
                  ? 'md:col-span-3'
                  : heroSpan === '2'
                  ? 'md:col-span-2'
                  : 'md:col-span-1'
              }`}
              style={{ borderRadius: `${radius}px` }}
            >
              {showBlueprint && (
                <span className="absolute top-2.5 right-3 text-[10px] font-mono text-[#38BDF8] bg-slate-800 px-1.5 py-0.5 rounded">
                  col-span-{heroSpan} · row-span-1
                </span>
              )}
              <div className="text-xs font-mono text-sky-400">01 · Primary Anchor Cell</div>
              <div>
                <div className="font-display font-semibold text-base text-white">
                  Visual Hierarchy Focal Point
                </div>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  Spans {heroSpan} column{heroSpan === '1' ? '' : 's'} to establish immediate scannable dominance.
                </p>
              </div>
            </div>

            <div
              className="relative bg-white p-5 flex flex-col justify-between border border-slate-200 md:row-span-2"
              style={{ borderRadius: `${radius}px` }}
            >
              {showBlueprint && (
                <span className="absolute top-2.5 right-3 text-[10px] font-mono text-[#DC2626] bg-red-50 px-1.5 py-0.5 rounded">
                  col-span-1 · row-span-2
                </span>
              )}
              <div>
                <div className="text-xs font-mono text-slate-400">02 · Vertical Pillar</div>
                <div className="font-display font-semibold text-sm text-slate-900 mt-1">
                  2x Height Timeline Feed
                </div>
              </div>
              <div className="space-y-2.5 my-2">
                {['Token Audit Passed', 'Grid Tracks Verified', 'Contrast >= 4.5:1'].map(
                  (step, i) => (
                    <div
                      key={step}
                      className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100 last:border-0"
                    >
                      <span className="text-slate-700 font-medium">{step}</span>
                      <span className="font-mono text-[11px] text-slate-400 tabular-nums">
                        0{i + 1}s
                      </span>
                    </div>
                  )
                )}
              </div>
              <div className="text-[11px] font-mono text-slate-500">
                Flush bottom edge alignment
              </div>
            </div>

            <div
              className="relative bg-white p-5 flex flex-col justify-between border border-slate-200"
              style={{ borderRadius: `${radius}px` }}
            >
              {showBlueprint && (
                <span className="absolute top-2.5 right-3 text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                  1x1 Cell
                </span>
              )}
              <div className="text-xs font-mono text-slate-400">03 · Metric Tile</div>
              <div>
                <div className="text-2xl font-display font-bold text-slate-900 tabular-nums">
                  99.98%
                </div>
                <div className="text-xs text-slate-500">Zero Ragged Orphans</div>
              </div>
            </div>

            <div
              className="relative bg-sky-50/70 p-5 flex flex-col justify-between border border-sky-200/80"
              style={{ borderRadius: `${radius}px` }}
            >
              {showBlueprint && (
                <span className="absolute top-2.5 right-3 text-[10px] font-mono text-[#0284C7] bg-white px-1.5 py-0.5 rounded">
                  1x1 Cell
                </span>
              )}
              <div className="text-xs font-mono text-sky-700">04 · Companion Tile</div>
              <div>
                <div className="font-display font-semibold text-sm text-slate-900">
                  Modular Proportions
                </div>
                <div className="text-xs text-slate-600 mt-0.5">
                  Every track snaps to {gapSize}px gutters
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 02. SPLIT-SCREEN HERO
    // -------------------------------------------------------------------------
    case 'split-screen-hero': {
      const splitRatio = String(controlValues.splitRatio || '7-5');
      const colGap = Number(controlValues.colGap ?? 32);
      const leftCols =
        splitRatio === '7-5'
          ? 'lg:col-span-7'
          : splitRatio === '6-6'
          ? 'lg:col-span-6'
          : 'lg:col-span-5';
      const rightCols =
        splitRatio === '7-5'
          ? 'lg:col-span-5'
          : splitRatio === '6-6'
          ? 'lg:col-span-6'
          : 'lg:col-span-7';

      return (
        <div className="w-full bg-white border border-slate-200 rounded-xl p-6">
          <div
            className="grid grid-cols-1 lg:grid-cols-12 items-stretch"
            style={{ gap: `${colGap}px` }}
          >
            <div
              className={`${leftCols} flex flex-col justify-center space-y-3.5 relative ${
                showBlueprint ? 'outline-1 outline-dashed outline-[#0284C7] p-3 rounded-lg' : ''
              }`}
            >
              {showBlueprint && (
                <span className="text-[10px] font-mono text-[#0284C7]">
                  LEFT VALUE STACK ({splitRatio.split('-')[0]} / 12 COLS)
                </span>
              )}
              <div className="text-xs font-mono text-sky-700 tracking-wide">
                Design Systems · Release 4.2
              </div>
              <h4 className="font-display text-2xl font-bold text-slate-900 tracking-tight text-balance leading-[1.12]">
                Ship exact interfaces on the first prompt without layout guesswork.
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed max-w-[58ch]">
                Pair a balanced typographic value stack on the left with a live interactive
                product proof stage on the right.
              </p>
              <div className="flex items-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setOptimisticSaved((p) => !p)}
                  className="px-3.5 py-2 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap"
                >
                  {optimisticSaved ? 'Spec Copied ✓' : 'Explore Interactive Stage'}
                </button>
                <span className="text-xs font-medium text-slate-600 px-2 py-1.5">
                  Read Documentation →
                </span>
              </div>
            </div>

            <div
              className={`${rightCols} bg-slate-900 text-white rounded-[20px] p-3.5 flex flex-col justify-between relative`}
            >
              {showBlueprint && (
                <span className="text-[10px] font-mono text-sky-300 mb-2 block">
                  RIGHT STAGE ({splitRatio.split('-')[1]} / 12 COLS · items-stretch)
                </span>
              )}
              <div className="bg-slate-800/90 rounded-[8px] p-3.5 border border-slate-700/80 space-y-2.5 flex-1 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>tokens.config.ts</span>
                  <span className="text-emerald-400">VALIDATED</span>
                </div>
                <div className="space-y-1.5 font-mono text-[11px]">
                  <div className="text-sky-300">gridTemplateColumns: &apos;repeat(12, 1fr)&apos;</div>
                  <div className="text-slate-300">alignItems: &apos;stretch&apos;</div>
                  <div className="text-amber-300">gap: &apos;{colGap}px&apos;</div>
                </div>
                <div className="pt-2 border-t border-slate-700/70 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Height parity locked</span>
                  <span className="font-mono tabular-nums">100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 03. STICKY ASIDE RAIL & SCROLL SPY
    // -------------------------------------------------------------------------
    case 'sticky-rail': {
      const activeIdx = Number(controlValues.activeSection ?? 1);
      const railPos = String(controlValues.railPosition || 'right');
      const sections = [
        {
          title: '01. System Architecture',
          body: 'The primary content column scrolls freely while the aside rail stays pinned via position: sticky and align-self: flex-start.',
        },
        {
          title: '02. Token Hierarchy',
          body: 'Scroll-Spy observes which heading crosses the top 25% viewport threshold and updates the active rail indicator automatically.',
        },
        {
          title: '03. Spatial Grid Math',
          body: 'Always apply align-items: start on the parent grid—otherwise the rail stretches to 100% height and cannot slide!',
        },
        {
          title: '04. Accessibility Audit',
          body: 'Provide aria-current="location" on the active table-of-contents anchor link.',
        },
      ];

      const railElement = (
        <aside className="w-full md:w-52 shrink-0 bg-white border border-slate-200 rounded-xl p-3.5 self-start space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-semibold text-slate-900">
              ON THIS PAGE
            </span>
            {showBlueprint && (
              <span className="text-[10px] font-mono text-[#DC2626]">sticky · self-start</span>
            )}
          </div>
          <nav className="space-y-1">
            {sections.map((sec, idx) => {
              const isActive = idx === activeIdx;
              return (
                <div
                  key={sec.title}
                  className={`text-xs px-2.5 py-1.5 rounded-md transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-sky-50 text-sky-800 font-semibold'
                      : 'text-slate-500'
                  }`}
                >
                  <span className="truncate">{sec.title}</span>
                  {isActive && <span className="text-[10px] font-mono text-sky-600">ACTIVE</span>}
                </div>
              );
            })}
          </nav>
        </aside>
      );

      return (
        <div className="w-full flex flex-col md:flex-row items-start gap-4 bg-slate-100/70 p-4 rounded-xl border border-slate-200">
          {railPos === 'left' && railElement}
          <div className="flex-1 space-y-3 bg-white p-4 rounded-xl border border-slate-200">
            {sections.map((sec, idx) => {
              const isActive = idx === activeIdx;
              return (
                <div
                  key={sec.title}
                  className={`p-3 rounded-lg border transition-all ${
                    isActive
                      ? 'border-sky-500 bg-sky-50/40'
                      : 'border-slate-100 bg-slate-50/40 opacity-65'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-display font-bold text-slate-900">{sec.title}</h5>
                    {isActive && (
                      <span className="text-[10px] font-mono text-sky-700">
                        ← Viewport Scroll Spy Target
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{sec.body}</p>
                </div>
              );
            })}
          </div>
          {railPos === 'right' && railElement}
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 04. CONCENTRIC BORDER RADIUS MATH
    // -------------------------------------------------------------------------
    case 'nested-radius': {
      const innerR = Number(controlValues.innerRadius ?? 12);
      const pad = Number(controlValues.padding ?? 16);
      const mode = String(controlValues.formulaMode || 'concentric');
      const outerR = mode === 'concentric' ? innerR + pad : innerR;

      return (
        <div className="w-full flex flex-col items-center justify-center py-2 space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
            <span className="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 tabular-nums">
              R_inner = <strong>{innerR}px</strong>
            </span>
            <span className="text-slate-400">+</span>
            <span className="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 tabular-nums">
              Padding = <strong>{pad}px</strong>
            </span>
            <span className="text-slate-400">=</span>
            <span
              className={`px-2.5 py-1 rounded font-semibold tabular-nums ${
                mode === 'concentric'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-amber-50 text-amber-800 border border-amber-200'
              }`}
            >
              R_outer = {outerR}px ({mode === 'concentric' ? 'Concentric Harmony' : 'Pinched Corner Mismatch'})
            </span>
          </div>

          <div
            className="w-full max-w-md bg-white border-2 border-slate-900 shadow-sm transition-all duration-180 relative"
            style={{
              padding: `${pad}px`,
              borderRadius: `${outerR}px`,
            }}
          >
            {showBlueprint && (
              <div
                className="absolute top-0 left-0 border-r-2 border-b-2 border-dashed border-[#DC2626] pointer-events-none flex items-end justify-end p-1"
                style={{
                  width: `${outerR * 1.4}px`,
                  height: `${outerR * 1.4}px`,
                  borderTopLeftRadius: `${outerR}px`,
                }}
              >
                <span className="text-[9px] font-mono text-[#DC2626] bg-white/90 px-1 rounded">
                  R{outerR}
                </span>
              </div>
            )}

            <div
              className="bg-slate-900 text-white p-5 flex flex-col justify-between min-h-[130px] transition-all duration-180"
              style={{ borderRadius: `${innerR}px` }}
            >
              <div className="flex items-center justify-between text-xs font-mono text-sky-400">
                <span>Inner Media Frame (r = {innerR}px)</span>
                <span>Padding d = {pad}px</span>
              </div>
              <div className="mt-3">
                <div className="font-display font-semibold text-base">
                  {mode === 'concentric'
                    ? 'Optical Concentric Alignment'
                    : 'Notice the Pinched Corner Diagonal!'}
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  {mode === 'concentric'
                    ? 'Both curves share the exact same geometric center point.'
                    : 'When R_outer equals R_inner, the diagonal corner gap looks thick and clumsy.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 05. 8-POINT GRID & PROXIMITY LAW
    // -------------------------------------------------------------------------
    case 'spatial-grid': {
      const outerPad = Number(controlValues.outerPadding ?? 24);
      const innerGap = Number(controlValues.innerGap ?? 16);
      const isValid = outerPad >= innerGap;

      return (
        <div className="w-full space-y-3">
          <div className="flex items-center justify-between text-xs font-mono px-1">
            <span>
              Outer Padding: <strong>{outerPad}px</strong> · Inner Gap: <strong>{innerGap}px</strong>
            </span>
            <span
              className={`font-semibold ${
                isValid ? 'text-emerald-700' : 'text-amber-700'
              }`}
            >
              {isValid
                ? 'PASS: Outer Padding >= Inner Gap (Cohesive Group)'
                : 'WARN: Inner Gap > Outer Padding (Items Drift Into Border)'}
            </span>
          </div>

          <div
            className={`bg-white border-2 transition-all rounded-xl ${
              isValid ? 'border-slate-200' : 'border-amber-400'
            } ${showBlueprint ? 'blueprint-subgrid' : ''}`}
            style={{ padding: `${outerPad}px` }}
          >
            <div className="grid grid-cols-2" style={{ gap: `${innerGap}px` }}>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-1">
                <div className="text-[11px] font-mono text-slate-500">Micro-Pair Gap: 4px</div>
                <div className="text-lg font-display font-bold text-slate-900 tabular-nums">
                  24.8 ms
                </div>
                <div className="text-xs text-slate-600">P95 Frame Settlement</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-1">
                <div className="text-[11px] font-mono text-slate-500">Micro-Pair Gap: 4px</div>
                <div className="text-lg font-display font-bold text-slate-900 tabular-nums">
                  8pt Base
                </div>
                <div className="text-xs text-slate-600">8 · 16 · 24 · 32px Rhythm</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 06. WORKSPACE APP SHELL
    // -------------------------------------------------------------------------
    case 'app-shell': {
      const sidebarWidth = String(controlValues.sidebarWidth || '240');
      const inspectorOpen = String(controlValues.inspectorOpen || 'open') === 'open';

      return (
        <div className="w-full min-h-[250px] bg-white border border-slate-300 rounded-xl overflow-hidden flex flex-col sm:flex-row shadow-xs">
          <aside
            className="bg-slate-50 border-b sm:border-b-0 sm:border-r border-slate-200 flex sm:flex-col justify-between items-center sm:items-stretch p-2.5 shrink-0 transition-all duration-180 w-full sm:w-auto"
            style={{
              minWidth:
                sidebarWidth === '64' ? '56px' : sidebarWidth === '280' ? '156px' : '132px',
            }}
          >
            <div className="flex sm:flex-col items-center sm:items-stretch gap-1.5 overflow-x-auto no-scrollbar w-full">
              <div className="text-[11px] font-display font-bold text-slate-900 px-1.5 py-1 truncate shrink-0">
                {sidebarWidth === '64' ? 'LX' : 'Lexicon Studio'}
              </div>
              {['Overview', 'Tokens', 'Schemas', 'Audit'].map((nav, i) => (
                <div
                  key={nav}
                  className={`text-[11px] px-2 py-1 rounded flex items-center gap-1.5 shrink-0 ${
                    i === 1 ? 'bg-slate-900 text-white font-medium' : 'text-slate-600'
                  }`}
                >
                  <Layers className="w-3 h-3 shrink-0" />
                  {sidebarWidth !== '64' && <span className="truncate">{nav}</span>}
                </div>
              ))}
            </div>
            <div className="hidden sm:block text-[10px] font-mono text-slate-400 px-1 truncate">
              {sidebarWidth}px Rail
            </div>
          </aside>

          <div className="flex-1 flex flex-col min-w-0">
            <header className="h-10 border-b border-slate-200 px-3.5 flex items-center justify-between bg-white shrink-0">
              <div className="text-[11px] text-slate-500 truncate">
                Workspace <span className="text-slate-300">/</span>{' '}
                <strong className="text-slate-900">Tokens</strong>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-900 text-white rounded">
                Deploy
              </span>
            </header>
            <div className="flex-1 overflow-y-auto p-3.5 space-y-2 bg-[#F8FAFC]">
              <div className="text-[10px] font-mono text-sky-700">
                main (flex-1 overflow-y-auto) — Independent Scroll Canvas
              </div>
              {[1, 2, 3].map((row) => (
                <div
                  key={row}
                  className="bg-white border border-slate-200 rounded-lg p-2.5 flex items-center justify-between text-xs"
                >
                  <span className="font-medium text-slate-800">Token SpecGroup #{row}</span>
                  <span className="font-mono text-[11px] text-slate-400 tabular-nums">
                    24.0{row}kb
                  </span>
                </div>
              ))}
            </div>
          </div>

          {inspectorOpen && (
            <aside className="w-full sm:w-36 border-t sm:border-t-0 sm:border-l border-slate-200 bg-white p-2.5 flex sm:flex-col items-center sm:items-stretch justify-between gap-2 shrink-0">
              <div>
                <div className="text-[10px] font-mono text-slate-400">INSPECTOR</div>
                <div className="text-xs font-semibold text-slate-900 mt-0.5 sm:mt-1">Token #1</div>
                <div className="hidden sm:block mt-2 space-y-1 text-[10px] font-mono text-slate-500">
                  <div>padding: 24px</div>
                  <div>radius: 12px</div>
                </div>
              </div>
              <div className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-1 rounded text-center">
                Synced
              </div>
            </aside>
          )}
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 07. MASONRY WATERFALL LAYOUT
    // -------------------------------------------------------------------------
    case 'masonry-waterfall': {
      const packMode = String(controlValues.packMode || 'masonry');
      const items = [
        { id: '01', title: 'Short Quote', lines: 'Packed with zero vertical gap below.' },
        {
          id: '02',
          title: 'Deep Architectural Review',
          lines:
            'Variable-height card that spans much taller than its siblings without forcing adjacent columns to stretch.',
        },
        { id: '03', title: 'Compact Metric', lines: '99.4% Layout Density' },
        {
          id: '04',
          title: 'Medium Case Note',
          lines: 'Each column flows independently top-to-bottom via CSS multi-column tracks.',
        },
        { id: '05', title: 'Micro Spec', lines: 'break-inside: avoid' },
        {
          id: '06',
          title: 'Extended System Note',
          lines: 'Notice how Masonry eliminates the dead white space under short cards!',
        },
      ];

      return (
        <div className="w-full space-y-2.5">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500">
            <span>
              {packMode === 'masonry'
                ? 'CSS Multi-Column Masonry (columns-3 · Tight Vertical Packing)'
                : 'Naive Row Grid (Notice Wasted White Gaps Under Short Cards)'}
            </span>
          </div>

          {packMode === 'masonry' ? (
            <div className="columns-2 md:columns-3 gap-3 space-y-3">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="break-inside-avoid bg-white border border-slate-200 rounded-xl p-3.5 space-y-1 shadow-2xs"
                >
                  <div className="text-[10px] font-mono text-sky-700">CARD {it.id}</div>
                  <div className="text-xs font-display font-bold text-slate-900">{it.title}</div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{it.lines}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 items-start">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="bg-white border border-amber-300 rounded-xl p-3.5 space-y-1"
                >
                  <div className="text-[10px] font-mono text-amber-700">ROW-LOCKED {it.id}</div>
                  <div className="text-xs font-display font-bold text-slate-900">{it.title}</div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{it.lines}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 08. CSS SCROLL-SNAP CAROUSEL
    // -------------------------------------------------------------------------
    case 'scroll-snap-carousel': {
      const activeIdx = Number(controlValues.activeSnapCard ?? 0);
      const cards = [
        { title: '01 · Spatial Grid Deck', sub: 'snap-start · Magnetic Left Lock' },
        { title: '02 · Typography Scale', sub: 'snap-center · Centered Lock' },
        { title: '03 · Motion Physics', sub: 'snap-end · Terminal Card' },
      ];

      return (
        <div className="w-full space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500">
            <span>scroll-snap-type: x mandatory · Peekaboo Next-Card Affordance</span>
            <span className="text-sky-700 font-semibold">Active Snap Index: 0{activeIdx + 1}</span>
          </div>
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2">
            {cards.map((c, idx) => {
              const isSnapped = idx === activeIdx;
              return (
                <div
                  key={c.title}
                  className={`snap-start shrink-0 w-60 p-4 rounded-xl border transition-all ${
                    isSnapped
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                      : 'bg-white text-slate-700 border-slate-200 opacity-70'
                  }`}
                >
                  <div className="text-[10px] font-mono text-sky-400">
                    {isSnapped ? '● MAGNETICALLY SNAPPED' : 'PEEKABOO CARD'}
                  </div>
                  <div className="text-sm font-display font-bold mt-1">{c.title}</div>
                  <div className="text-xs opacity-75 mt-1">{c.sub}</div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 09. COMMAND PALETTE (CMD+K)
    // -------------------------------------------------------------------------
    case 'command-palette': {
      const qFilter = String(controlValues.queryFilter || 'all');
      const allCommands = [
        { label: 'Jump to Bento Grid Sandbox', group: 'Navigation', kbd: 'G B', tag: 'layout' },
        { label: 'Inspect Split-Screen Hero', group: 'Navigation', kbd: 'G S', tag: 'layout' },
        { label: 'Export AI Agent Prompt Markdown', group: 'Actions', kbd: '⌘ E', tag: 'export' },
        { label: 'Copy Tailwind CSS Tokens', group: 'Actions', kbd: '⌘ C', tag: 'export' },
      ];
      const filtered =
        qFilter === 'all'
          ? allCommands
          : qFilter === 'none'
          ? []
          : allCommands.filter((c) => c.tag === qFilter);

      return (
        <div className="w-full bg-slate-900/10 p-4 rounded-xl flex justify-center">
          <div className="w-full max-w-md bg-white rounded-xl border border-slate-200/90 shadow-xl overflow-hidden divide-y divide-slate-200">
            <div className="px-3.5 py-2.5 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <Search className="w-4 h-4 text-sky-600 shrink-0" />
                <span className="text-xs font-medium text-slate-800 truncate">
                  {qFilter === 'all'
                    ? 'Type a command or search UI terms...'
                    : qFilter === 'none'
                    ? 'xyz_unknown_widget'
                    : qFilter}
                </span>
              </div>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-slate-100 text-slate-500 rounded border border-slate-200">
                ESC
              </kbd>
            </div>

            <div className="p-2 space-y-1 max-h-44 overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-500">
                  No matching commands for{' '}
                  <strong className="text-slate-800">&ldquo;xyz_unknown_widget&rdquo;</strong>
                </div>
              ) : (
                filtered.map((cmd, idx) => {
                  const isFocused = idx === cmdHighlightIdx % filtered.length;
                  return (
                    <button
                      key={cmd.label}
                      type="button"
                      onClick={() => setCmdHighlightIdx(idx)}
                      className={`w-full px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                        isFocused
                          ? 'bg-sky-50 text-sky-950 font-medium'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-[10px] font-mono text-slate-400">{cmd.group}</span>
                        <span>·</span>
                        <span className="truncate">{cmd.label}</span>
                      </div>
                      <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-200 rounded text-slate-600 shrink-0">
                        {cmd.kbd}
                      </kbd>
                    </button>
                  );
                })
              )}
            </div>

            <div className="px-3.5 py-2 bg-slate-50 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>↑↓ to navigate · ↵ to execute</span>
              <span>Cmd+K Omnibar</span>
            </div>
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 10. SEGMENTED CONTROL
    // -------------------------------------------------------------------------
    case 'segmented-control': {
      const activeSeg = String(controlValues.activeSegment || 'preview');
      const density = String(controlValues.density || 'compact');
      const options = [
        { id: 'preview', label: 'Preview Stage', metric: 'Interactive DOM Specimen' },
        { id: 'blueprint', label: 'Blueprint Spec', metric: '8pt Spatial Grid + Rulers' },
        { id: 'prompt', label: 'Prompt Output', metric: 'Structured Agent Markdown' },
      ];

      return (
        <div className="w-full flex flex-col items-center justify-center space-y-4 py-2">
          <div className="inline-flex p-1 bg-slate-200/75 rounded-[10px] border border-slate-300/60">
            {options.map((opt) => {
              const isSelected = activeSeg === opt.id;
              return (
                <div
                  key={opt.id}
                  className={`font-medium transition-all duration-150 whitespace-nowrap select-none rounded-[6px] ${
                    density === 'compact' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'
                  } ${
                    isSelected
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600'
                  }`}
                >
                  {opt.label}
                </div>
              );
            })}
          </div>

          <div className="w-full max-w-md bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-mono text-sky-700">
                ACTIVE SEGMENT: {activeSeg.toUpperCase()}
              </div>
              <div className="text-sm font-display font-semibold text-slate-900 mt-0.5">
                {options.find((o) => o.id === activeSeg)?.metric}
              </div>
            </div>
            <span className="text-xs font-mono text-slate-400">R_track 10px / R_thumb 6px</span>
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 11. SLIDE-OVER DRAWER (SHEET)
    // -------------------------------------------------------------------------
    case 'slide-over-drawer': {
      const isOpen = String(controlValues.drawerState || 'open') === 'open';
      const anchorEdge = String(controlValues.anchorEdge || 'right');

      return (
        <div className="w-full h-[240px] bg-slate-100 border border-slate-200 rounded-xl relative overflow-hidden flex">
          <div className="p-4 flex-1 space-y-2">
            <div className="text-xs font-semibold text-slate-700">Parent Data Table Context</div>
            <div className="bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-500">
              Row #104 · Payment Intent · $420.00 (Scroll context preserved underneath)
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-500">
              Row #105 · Subscription Renewal · $89.00
            </div>
          </div>

          {isOpen && (
            <>
              <div className="absolute inset-0 bg-slate-950/30 backdrop-blur-[1px] transition-opacity" />
              <div
                className={`absolute bg-white shadow-2xl border-slate-200 flex flex-col justify-between transition-transform duration-180 ${
                  anchorEdge === 'right'
                    ? 'inset-y-0 right-0 w-52 sm:w-64 border-l'
                    : 'inset-x-0 bottom-0 h-44 border-t rounded-t-xl'
                }`}
              >
                <div className="px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-display font-bold text-slate-900">
                    Record #104 Details
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Sticky Header</span>
                </div>
                <div className="p-4 text-xs text-slate-600 space-y-1.5 overflow-y-auto flex-1">
                  <div className="font-mono text-[11px] text-sky-700">
                    status: &quot;succeeded&quot;
                  </div>
                  <p>
                    Off-canvas sheet keeps parent scroll context intact while inspecting deep fields.
                  </p>
                </div>
                <div className="px-4 py-2.5 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2">
                  <span className="text-[10px] font-mono text-slate-400 mr-auto">Sticky Footer</span>
                  <span className="px-2.5 py-1 text-[11px] font-medium bg-slate-900 text-white rounded">
                    Save Changes
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 12. BREADCRUMB TRAIL
    // -------------------------------------------------------------------------
    case 'breadcrumb-trail': {
      const sepStyle = String(controlValues.separatorStyle || 'slash');
      const depth = String(controlValues.depth || '3');
      const glyph = sepStyle === 'slash' ? '/' : sepStyle === 'chevron' ? '›' : '·';
      const nodes =
        depth === '3'
          ? ['Workspace', 'Design System', 'Typography Tokens']
          : ['Organization', '...', 'Design System', 'Primitives', 'Typography Tokens'];

      return (
        <div className="w-full bg-white border border-slate-200 rounded-xl p-5 space-y-3">
          <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-sm">
            {nodes.map((node, i) => {
              const isLast = i === nodes.length - 1;
              return (
                <React.Fragment key={node}>
                  {i > 0 && (
                    <span aria-hidden="true" className="text-slate-300 font-mono select-none px-0.5">
                      {glyph}
                    </span>
                  )}
                  <span
                    aria-current={isLast ? 'page' : undefined}
                    className={
                      isLast
                        ? 'font-semibold text-slate-900'
                        : 'text-slate-500 hover:text-slate-900 cursor-pointer transition-colors'
                    }
                  >
                    {node}
                  </span>
                </React.Fragment>
              );
            })}
          </nav>
          <div className="text-xs font-mono text-slate-500 pt-2 border-t border-slate-100 flex items-center justify-between">
            <span>Ancestor Links: text-slate-500</span>
            <span>Terminal Node: font-semibold text-slate-900 (aria-current=&quot;page&quot;)</span>
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 13. ACCORDION & PROGRESSIVE DISCLOSURE
    // -------------------------------------------------------------------------
    case 'accordion-disclosure': {
      const mode = String(controlValues.behaviorMode || 'single');
      const faqs = [
        {
          q: '01. What is Progressive Disclosure in UI/UX?',
          a: 'Progressive Disclosure defers secondary or advanced information inside collapsible panels so the initial view remains scannable and uncrowded.',
        },
        {
          q: '02. Why use aria-expanded on the header button?',
          a: 'Screen readers announce whether the disclosure panel is currently expanded or collapsed, and CSS can target [aria-expanded="true"] to rotate the chevron 180 degrees.',
        },
        {
          q: '03. Single-Expand vs. Multi-Expand Accordion?',
          a: 'Single-expand closes sibling panels automatically (ideal for compact heights); Multi-expand lets users compare multiple open sections simultaneously.',
        },
      ];

      const toggleIdx = (idx: number) => {
        if (mode === 'single') {
          setOpenAccordions((prev) => (prev.includes(idx) ? [] : [idx]));
        } else {
          setOpenAccordions((prev) =>
            prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
          );
        }
      };

      return (
        <div className="w-full bg-white border border-slate-200 rounded-xl divide-y divide-slate-200 overflow-hidden">
          {faqs.map((item, idx) => {
            const isOpen = openAccordions.includes(idx);
            return (
              <div key={item.q} className="px-4">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggleIdx(idx)}
                  className="w-full py-3.5 flex items-center justify-between text-left text-xs font-display font-bold text-slate-900 hover:text-sky-700 transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-180 shrink-0 ${
                      isOpen ? 'rotate-180 text-sky-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="pb-3.5 text-xs text-slate-600 leading-relaxed max-w-[62ch]">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 14. HAMBURGER VS KEBAB VS MEATBALLS VS BENTO MENU ICONS
    // -------------------------------------------------------------------------
    case 'iconic-menu-taxonomy': {
      const iconType = String(controlValues.activeIconType || 'kebab');
      const catalog = [
        {
          id: 'kebab',
          name: 'Kebab Menu (⋮)',
          glyph: MoreVertical,
          where: 'Top-right of mobile app bars or narrow list items',
          purpose: 'Opens secondary inline overflow actions in vertically constrained spaces.',
        },
        {
          id: 'meatballs',
          name: 'Meatballs Menu (⋯)',
          glyph: MoreHorizontal,
          where: 'Rightmost column of desktop data table rows & cards',
          purpose: 'Triggers contextual row actions (Edit, Duplicate, Archive, Delete).',
        },
        {
          id: 'bento',
          name: 'Bento / Waffle Menu (⊞)',
          glyph: LayoutGrid,
          where: 'Global top bar next to user profile (e.g. Google Workspace, Atlassian)',
          purpose: 'Opens a cross-product App Switcher matrix.',
        },
        {
          id: 'doner',
          name: 'Döner Menu (Descending Bars)',
          glyph: ListFilter,
          where: 'Data table toolbars and search headers',
          purpose: 'Signals filtering and sorting narrowing down a dataset.',
        },
        {
          id: 'hamburger',
          name: 'Hamburger Menu (☰)',
          glyph: Menu,
          where: 'Top-left or top-right of mobile viewports',
          purpose: 'Toggles the primary off-canvas navigation drawer.',
        },
      ];

      const current = catalog.find((c) => c.id === iconType) || catalog[0];

      return (
        <div className="w-full bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 space-y-4">
          {/* Interactive 5-Icon Selector Bar */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 sm:gap-2">
            {catalog.map((item) => {
              const Icon = item.glyph;
              const isSelected = item.id === current.id;
              return (
                <div
                  key={item.id}
                  className={`p-2 sm:p-2.5 rounded-xl border text-center flex flex-col items-center gap-1.5 transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[10px] font-mono font-semibold truncate w-full">
                    {item.name.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Active Icon Anatomy Card */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 sm:gap-4">
            <div className="space-y-1 min-w-0">
              <div className="text-xs font-mono text-sky-700 font-semibold">
                FORMAL NAME: {current.name.toUpperCase()}
              </div>
              <div className="text-xs sm:text-sm font-display font-bold text-slate-900">
                {current.purpose}
              </div>
              <div className="text-xs text-slate-500">
                Canonical Placement: <strong className="text-slate-700">{current.where}</strong>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIconMenuOpen((o) => !o)}
              className="min-h-[42px] min-w-[42px] p-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 shadow-2xs shrink-0 flex items-center justify-center"
              title={current.name}
            >
              <current.glyph className="w-5 h-5" />
            </button>
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 15. MEGA MENU (MULTI-COLUMN FLYOUT)
    // -------------------------------------------------------------------------
    case 'mega-menu': {
      const tab = String(controlValues.megaTab || 'products');

      return (
        <div className="w-full bg-slate-100 p-3 sm:p-3.5 rounded-xl border border-slate-200 space-y-2.5">
          {/* Simulated Top Navbar */}
          <div className="bg-white border border-slate-200 rounded-lg px-3.5 sm:px-4 py-2 flex items-center gap-4 sm:gap-6 text-xs">
            <span className="font-display font-bold text-slate-900">Acme Cloud</span>
            <span className="text-sky-700 font-semibold underline underline-offset-4">
              {tab === 'products' ? 'Products ▾' : 'Developers ▾'}
            </span>
            <span className="text-slate-500">Pricing</span>
          </div>

          {/* 12-Col Mega Menu Flyout */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-8 p-3.5 sm:p-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(tab === 'products'
                ? [
                    { t: 'Edge Compute', d: 'Zero-cold-start global isolates' },
                    { t: 'Vector Store', d: 'Sub-millisecond hybrid search' },
                    { t: 'AI Gateway', d: 'Unified caching & rate limiting' },
                    { t: 'Observability', d: 'Real-time distributed traces' },
                  ]
                : [
                    { t: 'TypeScript SDK', d: 'Strict end-to-end type safety' },
                    { t: 'CLI Reference', d: 'Local emulation & deployments' },
                    { t: 'Webhook Events', d: 'HMAC-verified event payloads' },
                    { t: 'OpenAPI Spec', d: 'Downloadable v3.1 schema' },
                  ]
              ).map((item) => (
                <div
                  key={item.t}
                  className="p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors"
                >
                  <div className="text-xs font-display font-bold text-slate-900">{item.t}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{item.d}</div>
                </div>
              ))}
            </div>
            <div className="md:col-span-4 bg-slate-50 border-t md:border-t-0 md:border-l border-slate-200 p-4 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono text-sky-700 font-semibold">
                  FEATURED ASIDE ZONE
                </div>
                <div className="text-xs font-display font-bold text-slate-900 mt-1">
                  Architecture Whitepaper v4
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  How multi-zone Mega Menus prevent deep nav blindness.
                </p>
              </div>
              <span className="text-[11px] font-semibold text-slate-900 mt-3">
                Read Guide →
              </span>
            </div>
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 16. BOTTOM SHEET & DRAG GRABBER HANDLE
    // -------------------------------------------------------------------------
    case 'bottom-sheet': {
      const detent = String(controlValues.detentHeight || 'half');

      return (
        <div className="w-full max-w-sm mx-auto h-[230px] bg-slate-900 rounded-2xl relative overflow-hidden flex flex-col justify-end p-2 border border-slate-800">
          <div className="absolute top-3 inset-x-4 text-[11px] font-mono text-slate-400 flex justify-between">
            <span>Mobile Viewport Backdrop</span>
            <span>Detent: {detent.toUpperCase()}</span>
          </div>

          <div
            className={`w-full bg-white rounded-t-[22px] p-4 shadow-2xl transition-all duration-180 flex flex-col justify-between ${
              detent === 'full' ? 'h-[185px]' : 'h-[135px]'
            }`}
          >
            <div>
              {/* Grabber Pill Handle */}
              <div className="w-10 h-1.5 bg-slate-300 rounded-full mx-auto mb-3" />
              <div className="flex items-center justify-between">
                <span className="text-xs font-display font-bold text-slate-900">
                  Thumb-Zone Bottom Sheet
                </span>
                <span className="text-[10px] font-mono text-sky-700">Grabber Pill ↑</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                {detent === 'full'
                  ? 'Expanded to 85% viewport height for deep mobile inspection.'
                  : 'Resting at 50% half-detent for quick one-handed thumb confirmation.'}
              </p>
            </div>
            <button
              type="button"
              className="w-full py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl"
            >
              Confirm Selection
            </button>
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 17. AVATAR STACK (OVERLAPPING FACEPILE)
    // -------------------------------------------------------------------------
    case 'avatar-stack': {
      const overlap = Number(controlValues.overlapSpacing ?? 10);
      const hasRing = String(controlValues.ringCutout || 'on') === 'on';
      const users = [
        { initials: 'AK', bg: 'bg-sky-600' },
        { initials: 'MR', bg: 'bg-emerald-600' },
        { initials: 'JL', bg: 'bg-amber-600' },
        { initials: 'SV', bg: 'bg-indigo-600' },
      ];

      return (
        <div className="w-full bg-white border border-slate-200 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-mono text-slate-500">
              Overlap: -{overlap}px · Cutout Ring: {hasRing ? 'ring-2 ring-white' : 'NONE'}
            </div>
            <div className="text-sm font-display font-bold text-slate-900">
              Active Collaborators in Spec File
            </div>
          </div>

          <div className="flex items-center">
            {users.map((u, idx) => (
              <div
                key={u.initials}
                style={{ marginLeft: idx === 0 ? 0 : `-${overlap}px` }}
                className={`w-10 h-10 rounded-full ${u.bg} text-white font-mono text-xs font-bold flex items-center justify-center transition-all ${
                  hasRing ? 'ring-2 ring-white' : ''
                }`}
              >
                {u.initials}
              </div>
            ))}
            <div
              style={{ marginLeft: `-${overlap}px` }}
              className={`w-10 h-10 rounded-full bg-slate-900 text-white font-mono text-xs font-bold tabular-nums flex items-center justify-center ${
                hasRing ? 'ring-2 ring-white' : ''
              }`}
            >
              +8
            </div>
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 18. MULTI-STEP WIZARD STEPPER
    // -------------------------------------------------------------------------
    case 'wizard-stepper': {
      const currentStep = Number(controlValues.currentStep ?? 2);
      const steps = [
        { num: 1, label: 'Repository' },
        { num: 2, label: 'Token Map' },
        { num: 3, label: 'Deploy Spec' },
      ];

      return (
        <div className="w-full bg-white border border-slate-200 rounded-xl p-4 sm:p-6 space-y-4">
          <div className="flex items-center w-full">
            {steps.map((s, idx) => {
              const isCompleted = s.num < currentStep;
              const isCurrent = s.num === currentStep;
              return (
                <React.Fragment key={s.num}>
                  <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
                    <div
                      aria-current={isCurrent ? 'step' : undefined}
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full text-[11px] sm:text-xs font-mono font-bold flex items-center justify-center transition-all ${
                        isCompleted
                          ? 'bg-slate-900 text-white'
                          : isCurrent
                          ? 'bg-sky-600 text-white ring-4 ring-sky-600/20'
                          : 'bg-slate-100 text-slate-400 border border-slate-300'
                      }`}
                    >
                      {isCompleted ? <Check className="w-3.5 h-3.5" /> : s.num}
                    </div>
                    <span
                      className={`text-[11px] sm:text-xs font-medium ${
                        isCurrent
                          ? 'text-slate-900 font-bold'
                          : isCompleted
                          ? 'text-slate-700'
                          : 'text-slate-400'
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-1.5 sm:mx-3 transition-colors ${
                        s.num < currentStep ? 'bg-slate-900' : 'bg-slate-200'
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
          <div className="text-[11px] sm:text-xs font-mono text-slate-500 pt-2 border-t border-slate-100 flex flex-wrap justify-between gap-2">
            <span>Completed: Checkmark + Solid Connector</span>
            <span>Active: aria-current=&quot;step&quot;</span>
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 19. FLOATING ACTION BUTTON (FAB) & SPEED DIAL
    // -------------------------------------------------------------------------
    case 'fab-speed-dial': {
      const isOpen = String(controlValues.speedDialOpen || 'open') === 'open';

      return (
        <div className="w-full h-[220px] bg-slate-100 border border-slate-200 rounded-xl p-4 relative flex flex-col justify-between">
          <div className="text-xs font-mono text-slate-500">
            Corner-Pinned Primary Creation Trigger (bottom-6 right-6)
          </div>

          <div className="self-end flex flex-col items-end gap-2">
            {isOpen && (
              <div className="flex flex-col items-end gap-1.5 mb-1">
                {['New Anatomy Blueprint', 'New UI/UX Term'].map((act) => (
                  <div
                    key={act}
                    className="px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-md text-xs font-medium text-slate-800 flex items-center gap-2"
                  >
                    <span>{act}</span>
                    <Plus className="w-3.5 h-3.5 text-sky-600" />
                  </div>
                ))}
              </div>
            )}
            <div className="w-11 h-11 rounded-full bg-slate-900 text-white shadow-xl flex items-center justify-center">
              <Plus
                className={`w-5 h-5 transition-transform duration-180 ${
                  isOpen ? 'rotate-45' : ''
                }`}
              />
            </div>
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 20. COACHMARK & SPOTLIGHT ONBOARDING TOUR
    // -------------------------------------------------------------------------
    case 'spotlight-tour': {
      const step = String(controlValues.tourStep || '1');

      return (
        <div className="w-full h-[220px] bg-slate-900/75 rounded-xl p-4 relative overflow-hidden flex flex-col justify-between text-white">
          <div className="flex items-center justify-between gap-3">
            <div
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                step === '1'
                  ? 'bg-white text-slate-900 ring-4 ring-sky-400 font-bold'
                  : 'bg-white/15 text-white/60'
              }`}
            >
              ⌘K Search Omnibar
            </div>
            <div
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                step === '2'
                  ? 'bg-white text-slate-900 ring-4 ring-sky-400 font-bold'
                  : 'bg-white/15 text-white/60'
              }`}
            >
              Pillar Filter
            </div>
            <div
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                step === '3'
                  ? 'bg-white text-slate-900 ring-4 ring-sky-400 font-bold'
                  : 'bg-white/15 text-white/60'
              }`}
            >
              Export Spec
            </div>
          </div>

          {/* Tethered Coachmark Callout Card */}
          <div className="bg-white text-slate-900 p-4 rounded-xl shadow-2xl max-w-xs mx-auto space-y-2 border border-sky-300">
            <div className="flex items-center justify-between text-[11px] font-mono text-sky-700 font-semibold">
              <span>SPOTLIGHT COACHMARK</span>
              <span>STEP {step} OF 3</span>
            </div>
            <div className="text-xs font-display font-bold">
              {step === '1'
                ? 'Instant Terminology Search'
                : step === '2'
                ? 'Filter by Design Pillar'
                : 'Export Ready-to-Paste Spec'}
            </div>
            <p className="text-[11px] text-slate-600">
              Backdrop scrim dims non-target areas while elevating the active control with a 4px halo.
            </p>
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 21. OVERLAY TAXONOMY (MODAL VS POPOVER VS TOAST)
    // -------------------------------------------------------------------------
    case 'overlay-taxonomy': {
      const overlayType = String(controlValues.overlayType || 'popover');

      return (
        <div className="w-full h-[230px] bg-slate-100 border border-slate-200 rounded-xl p-4 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500">
              ACTIVE SPECIMEN: {overlayType.toUpperCase()}
            </span>
            <div className="relative">
              <button
                type="button"
                onClick={() => setActivePopover((p) => !p)}
                className="px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 rounded-lg shadow-2xs flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5 text-sky-600" />
                <span>Share Spec</span>
              </button>

              {overlayType === 'popover' && activePopover && (
                <div className="absolute right-0 top-full mt-2 w-60 bg-white border border-slate-200 rounded-xl shadow-lg p-3 z-20 space-y-2">
                  <div className="text-xs font-semibold text-slate-900">
                    Anchored Popover (No Scrim)
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Tethered 8px below its trigger button for lightweight contextual settings.
                  </p>
                  <div className="pt-1 flex justify-end">
                    <span className="text-[11px] font-mono text-sky-700">top: calc(100% + 8px)</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {overlayType === 'modal' && (
            <div className="absolute inset-0 bg-slate-950/45 backdrop-blur-[1px] z-30 flex items-center justify-center p-4">
              <div className="bg-white border border-slate-200 rounded-xl p-4 max-w-xs w-full shadow-2xl space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span>Blocking Modal Dialog</span>
                </div>
                <p className="text-xs text-slate-600">
                  Dims the entire viewport and traps keyboard focus until confirmed or cancelled.
                </p>
                <div className="flex justify-end gap-2 pt-1">
                  <span className="px-2.5 py-1 text-xs bg-slate-100 text-slate-700 rounded">
                    Cancel
                  </span>
                  <span className="px-2.5 py-1 text-xs bg-red-600 text-white rounded font-medium">
                    Confirm Reset
                  </span>
                </div>
              </div>
            </div>
          )}

          {overlayType === 'toast' && (
            <div className="self-end bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-3 z-20">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="text-xs">
                <div className="font-semibold">Passive Corner Toast</div>
                <div className="text-[11px] text-slate-300">
                  Zero interruption to the user&apos;s workflow
                </div>
              </div>
            </div>
          )}

          <div className="text-[11px] font-mono text-slate-500">
            Rule: Use Popovers for menus, Toasts for confirmations, and Modals only for critical interruptions.
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 22. SKELETON LOADER
    // -------------------------------------------------------------------------
    case 'skeleton-loader': {
      const isSkeleton = String(controlValues.loadState || 'skeleton') === 'skeleton';

      return (
        <div className="w-full max-w-md mx-auto bg-white border border-slate-200 rounded-xl p-5 h-[168px] flex flex-col justify-between">
          {isSkeleton ? (
            <>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="h-3.5 w-40 bg-slate-200 rounded animate-pulse" />
                  <div className="h-2.5 w-24 bg-slate-100 rounded animate-pulse" />
                </div>
                <span className="text-[10px] font-mono text-slate-400">CLS = 0.00</span>
              </div>
              <div className="space-y-2 pt-2">
                <div className="h-3 w-full bg-slate-200 rounded animate-pulse" />
                <div className="h-3 w-4/5 bg-slate-200 rounded animate-pulse" />
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div className="h-3 w-20 bg-slate-100 rounded animate-pulse" />
                <div className="h-6 w-24 bg-slate-200 rounded-md animate-pulse" />
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-display font-bold text-xs flex items-center justify-center shrink-0">
                  DS
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-slate-900 truncate">
                    Design System Telemetry
                  </div>
                  <div className="text-xs text-slate-500">Hydrated with 0px height jump</div>
                </div>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  HYDRATED
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Because the skeleton bones matched the exact 168px container geometry, zero layout
                shift occurred when real content arrived.
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="font-mono text-slate-500 tabular-nums">168px Fixed Height</span>
                <span className="px-2.5 py-1 bg-slate-900 text-white rounded-md font-medium">
                  Inspect Spec
                </span>
              </div>
            </>
          )}
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 23. ACTIONABLE EMPTY STATE
    // -------------------------------------------------------------------------
    case 'empty-state': {
      const scenario = String(controlValues.emptyScenario || 'first-run');

      return (
        <div className="w-full border border-dashed border-slate-300 rounded-xl bg-white p-6 text-center flex flex-col items-center justify-center space-y-3">
          {emptyCreatedItems.length > 0 ? (
            <div className="w-full space-y-2 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-800">
                  Populated State (Resolved from Empty State)
                </span>
                <button
                  type="button"
                  onClick={() => setEmptyCreatedItems([])}
                  className="text-xs text-slate-500 hover:text-slate-900 underline"
                >
                  Reset to Zero-State
                </button>
              </div>
              {emptyCreatedItems.map((item) => (
                <div
                  key={item}
                  className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between text-xs"
                >
                  <span className="font-medium text-slate-900">{item}</span>
                  <span className="font-mono text-emerald-700">ACTIVE</span>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600">
                <FolderGit2 className="w-5 h-5" />
              </div>
              <div className="space-y-1 max-w-sm">
                <h5 className="text-sm font-display font-bold text-slate-900">
                  {scenario === 'first-run'
                    ? 'No custom prompt presets saved yet'
                    : 'No UI terms matched filter "quantum-flux"'}
                </h5>
                <p className="text-xs text-slate-500">
                  {scenario === 'first-run'
                    ? 'Create your first reusable UI specification preset to share across AI coding sessions.'
                    : 'Try broadening your search keywords or reset active category filters.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setEmptyCreatedItems(['Swiss Bento Architecture Preset · v1.0'])
                }
                className="px-3.5 py-2 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors inline-flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>
                  {scenario === 'first-run' ? 'Create First Preset' : 'Reset Active Filters'}
                </span>
              </button>
            </>
          )}
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 24. FLUID TYPE SCALE (CLAMP + TEXT-WRAP: BALANCE)
    // -------------------------------------------------------------------------
    case 'fluid-typography': {
      const vp = Number(controlValues.simulatedViewport ?? 1080);
      const wrapMode = String(controlValues.textWrapMode || 'balance');
      const computedPx = Math.round(22 + ((vp - 360) / (1440 - 360)) * 14);

      return (
        <div className="w-full bg-white border border-slate-200 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 border-b border-slate-100 pb-2">
            <span>Simulated Viewport: {vp}px</span>
            <span className="text-sky-700 font-semibold">
              Computed clamp() Size: {computedPx}px · text-wrap: {wrapMode}
            </span>
          </div>

          <div
            className="mx-auto bg-slate-50 border border-dashed border-slate-300 rounded-lg p-4 transition-all"
            style={{ maxWidth: `${Math.max(280, Math.min(100, Math.round((vp / 1440) * 100)))}%` }}
          >
            <h4
              className="font-display font-bold text-slate-900 tracking-tight leading-[1.1]"
              style={{
                fontSize: `${computedPx}px`,
                textWrap: wrapMode === 'balance' ? 'balance' : 'wrap',
              }}
            >
              Precision typography scales smoothly without leaving a lonely trailing word
            </h4>
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 25. 60-30-10 COLOR DISTRIBUTION RULE
    // -------------------------------------------------------------------------
    case 'color-60-30-10': {
      const mode = String(controlValues.budgetMode || 'disciplined');
      const accent = String(controlValues.accentHue || '#0284C7');

      return (
        <div className="w-full space-y-3">
          <div className="h-7 w-full rounded-lg overflow-hidden flex border border-slate-300 text-[10px] sm:text-[11px] font-mono font-semibold">
            <div className="w-[60%] bg-[#F8FAFC] text-slate-700 flex items-center justify-center border-r border-slate-200 px-1 truncate">
              60% Neutral Canvas
            </div>
            <div className="w-[30%] bg-white text-slate-900 flex items-center justify-center border-r border-slate-200 px-1 truncate">
              30% Structure
            </div>
            <div
              className="w-[10%] text-white flex items-center justify-center"
              style={{ backgroundColor: accent }}
            >
              10%
            </div>
          </div>

          {mode === 'disciplined' ? (
            <div className="bg-[#F8FAFC] p-3.5 sm:p-4 rounded-xl border border-slate-200">
              <div className="bg-white p-3.5 sm:p-4 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-mono text-slate-500">
                    60-30-10 RESTRAINT SPECIMEN
                  </div>
                  <div className="text-sm font-display font-bold text-slate-900 mt-0.5">
                    Eye goes immediately to the 10% primary CTA
                  </div>
                </div>
                <button
                  type="button"
                  className="min-h-[40px] px-4 py-2 rounded-lg text-xs font-semibold text-white whitespace-nowrap shrink-0"
                  style={{ backgroundColor: accent }}
                >
                  Primary Action (10%)
                </button>
              </div>
            </div>
          ) : (
            <div
              className="p-3.5 sm:p-4 rounded-xl border-2 text-white"
              style={{ backgroundColor: accent, borderColor: accent }}
            >
              <div className="p-3.5 sm:p-4 rounded-lg bg-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-mono text-white/90">
                    OVER-SATURATED ANTI-PATTERN (80% ACCENT)
                  </div>
                  <div className="text-sm font-display font-bold text-white mt-0.5">
                    When everything shouts in brand color, nothing stands out
                  </div>
                </div>
                <span className="px-4 py-2 rounded-lg text-xs font-semibold bg-white text-slate-900 whitespace-nowrap text-center">
                  Lost CTA
                </span>
              </div>
            </div>
          )}
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 26. TABULAR NUMERALS
    // -------------------------------------------------------------------------
    case 'tabular-numerals': {
      const isTabular = String(controlValues.numeralMode || 'tabular') === 'tabular';
      const rows = [
        { label: 'Shard-01 Throughput', val: (liveCounter * 1.11).toFixed(2) },
        { label: 'Shard-02 Throughput', val: (liveCounter * 0.81).toFixed(2) },
        { label: 'Shard-03 Throughput', val: liveCounter.toFixed(2) },
      ];

      return (
        <div className="w-full bg-white border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-200">
          <div className="px-4 py-2.5 bg-slate-50 flex items-center justify-between text-xs font-mono">
            <span>LIVE TICKER COMPARISON</span>
            <span className={isTabular ? 'text-emerald-700 font-semibold' : 'text-amber-700 font-semibold'}>
              {isTabular ? 'tabular-nums (Locked Glyph Widths)' : 'proportional-nums (Notice Jitter)'}
            </span>
          </div>
          {rows.map((r) => (
            <div key={r.label} className="px-4 py-2.5 flex items-center justify-between text-sm">
              <span className="text-slate-600 text-xs">{r.label}</span>
              <span
                className={`font-semibold text-slate-900 text-right ${
                  isTabular ? 'font-mono tabular-nums' : 'font-sans'
                }`}
                style={{
                  fontVariantNumeric: isTabular ? 'tabular-nums' : 'proportional-nums',
                }}
              >
                ${r.val} req/s
              </span>
            </div>
          ))}
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 27. OPTIMAL MEASURE (65CH) & LEADING
    // -------------------------------------------------------------------------
    case 'measure-and-leading': {
      const ch = Number(controlValues.measureCh ?? 65);
      const leading = Number(controlValues.leadingVal ?? 1.6);
      const isOptimal = ch >= 55 && ch <= 75;

      return (
        <div className="w-full bg-white border border-slate-200 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span>
              Measure: <strong>{ch}ch</strong> · Leading: <strong>{leading}</strong>
            </span>
            <span className={isOptimal ? 'text-emerald-700 font-semibold' : 'text-amber-700 font-semibold'}>
              {isOptimal
                ? 'OPTIMAL READING BAND (60ch–75ch)'
                : ch > 75
                ? 'TOO WIDE (>75ch causes eye return-sweep fatigue)'
                : 'TOO NARROW (<50ch causes choppy eye saccades)'}
            </span>
          </div>
          <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-4 overflow-x-auto">
            <p
              className="text-sm text-slate-800 transition-all"
              style={{ maxWidth: `${ch}ch`, lineHeight: leading }}
            >
              Typography is two-dimensional architecture. When a paragraph line extends beyond 75
              characters across a wide desktop monitor, the reader&apos;s eye struggles to locate
              the start of the next baseline during the horizontal return sweep. Constraining body
              copy to 65ch with 1.65 leading creates effortless editorial rhythm.
            </p>
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 28. LUMINANCE CONTRAST SCRIM
    // -------------------------------------------------------------------------
    case 'contrast-scrim': {
      const opacity = Number(controlValues.scrimOpacity ?? 85);

      return (
        <div className="w-full h-[210px] rounded-xl overflow-hidden relative border border-slate-300 flex flex-col justify-end">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 70% 30%, #FFFFFF 0%, #BAE6FD 35%, #E2E8F0 70%, #FEF08A 100%)',
            }}
          />
          <div className="absolute top-3 left-4 z-20 text-[11px] font-mono text-slate-800 bg-white/80 px-2 py-0.5 rounded">
            Bright High-Luminance Photo Background
          </div>

          <div
            className="absolute inset-0 transition-all"
            style={{
              background: `linear-gradient(to top, rgba(2, 6, 23, ${opacity / 100}) 0%, rgba(2, 6, 23, ${
                (opacity / 100) * 0.45
              }) 50%, rgba(2, 6, 23, 0) 100%)`,
            }}
          />

          <div className="relative z-20 p-5 text-white space-y-1">
            <div className="text-xs font-mono text-sky-300">
              Scrim Base Alpha: {opacity}% · {opacity >= 65 ? 'WCAG AA 4.5:1 PASS' : 'LOW CONTRAST FAIL'}
            </div>
            <h4 className="text-lg font-display font-bold">
              Directional Scrim Protects White Foreground Copy
            </h4>
            <p className="text-xs text-white/85">
              Top of image stays 100% bright while bottom text sits on a guaranteed dark luminance ramp.
            </p>
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 29. SURFACE ELEVATION & HAIRLINE ARCHITECTURE
    // -------------------------------------------------------------------------
    case 'surface-elevation': {
      const style = String(controlValues.surfaceStyle || 'hairline');

      return style === 'hairline' ? (
        <div className="w-full bg-white border border-slate-200 rounded-xl divide-y divide-slate-200 overflow-hidden">
          <div className="px-4 py-2.5 flex flex-wrap items-center justify-between gap-1 text-xs">
            <span className="font-semibold text-slate-900">
              Single-Elevation Hairline Grid (1 Outer Border + divide-x)
            </span>
            <span className="font-mono text-emerald-700">CLEAN SWISS ARCHITECTURE</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
            {[
              { k: 'Latency', v: '14.2ms', m: 'Nominal · P95' },
              { k: 'Bundle', v: '38.4kb', m: 'Gzipped · Tree-shaken' },
              { k: 'Contrast', v: '11.4:1', m: 'AAA Verified' },
            ].map((item) => (
              <div key={item.k} className="p-3.5 sm:p-4 space-y-1">
                <div className="text-xs text-slate-500">{item.k}</div>
                <div className="text-lg font-display font-bold text-slate-900 tabular-nums">
                  {item.v}
                </div>
                <div className="text-[11px] text-slate-400">{item.m}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full bg-white border-2 border-slate-300 shadow-lg rounded-2xl p-3.5 sm:p-4 space-y-3">
          <div className="text-xs font-mono text-amber-700">
            ANTI-PATTERN: Box-in-Box-in-Box + Pill Badge Clutter
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {['14.2ms', '38.4kb', '11.4:1'].map((v) => (
              <div
                key={v}
                className="bg-slate-50 border border-slate-300 shadow-md rounded-xl p-3 space-y-2"
              >
                <div className="bg-white border border-slate-200 rounded-lg p-2 text-center font-bold text-sm">
                  {v}
                </div>
                <span className="inline-block bg-sky-100 border border-sky-300 text-sky-800 rounded-full px-2 py-0.5 text-[10px]">
                  Pill Tag
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 30. INFINITE MARQUEE & EDGE-FADE MASK
    // -------------------------------------------------------------------------
    case 'infinite-marquee': {
      const isMasked = String(controlValues.edgeFade || 'masked') === 'masked';
      const isPaused = String(controlValues.marqueePaused || 'running') === 'paused';
      const brands = [
        'LINEAR',
        'STRIPE',
        'VERCEL',
        'RAYCAST',
        'FIGMA',
        'CHRONICLE',
        'SUPABASE',
      ];

      return (
        <div className="w-full bg-white border border-slate-200 rounded-xl p-5 space-y-3 overflow-hidden">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500">
            <span>
              {isMasked
                ? 'mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent)'
                : 'Unmasked Hard Edges'}
            </span>
          </div>

          <div
            className="w-full overflow-hidden py-3 bg-slate-50 border border-slate-200/80 rounded-lg"
            style={
              isMasked
                ? {
                    maskImage:
                      'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
                    WebkitMaskImage:
                      'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
                  }
                : undefined
            }
          >
            <div
              className={`flex items-center gap-8 w-max px-4 ${
                isPaused ? '' : 'animate-[pulse_2.2s_infinite]'
              }`}
            >
              {[...brands, ...brands].map((b, i) => (
                <span
                  key={`${b}-${i}`}
                  className="font-display font-bold text-sm tracking-wider text-slate-700 select-none"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 31. SCROLL-LINKED READING PROGRESS BAR
    // -------------------------------------------------------------------------
    case 'scroll-progress': {
      const pct = Number(controlValues.scrollPct ?? 65);

      return (
        <div className="w-full bg-white border border-slate-200 rounded-xl overflow-hidden">
          {/* Top Sticky Header with 3px Progress Bar */}
          <div className="relative bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between text-xs">
            <span className="font-display font-bold text-slate-900">
              Architecture Monograph · Chapter 04
            </span>
            <span className="font-mono text-sky-700 font-semibold tabular-nums">
              scaleX({(pct / 100).toFixed(2)}) ({pct}%)
            </span>
            <div
              className="absolute bottom-0 left-0 right-0 h-[3px] bg-sky-600 origin-left transition-transform duration-150"
              style={{ transform: `scaleX(${pct / 100})` }}
            />
          </div>
          <div className="p-4 text-xs text-slate-600 space-y-2">
            <p>
              Drag the slider below to simulate scrolling down the document. Using{' '}
              <code className="font-mono text-slate-900">transform: scaleX()</code> with{' '}
              <code className="font-mono text-slate-900">transform-origin: left</code> runs entirely
              on the GPU compositor thread.
            </p>
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 32. SPRING PHYSICS VS CUBIC-BEZIER EASING
    // -------------------------------------------------------------------------
    case 'spring-physics': {
      const preset = String(controlValues.easingPreset || 'expo-out');
      const moved = raceTrigger % 2 === 1;

      return (
        <div className="w-full bg-white border border-slate-200 rounded-xl p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <span className="text-xs font-mono text-slate-600">
              Tap button to race the 3 motion curves side-by-side:
            </span>
            <button
              type="button"
              onClick={() => setRaceTrigger((n) => n + 1)}
              className="min-h-[40px] sm:min-h-[34px] px-3.5 py-1.5 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors self-start sm:self-auto"
            >
              Trigger Motion Impulse →
            </button>
          </div>

          <div className="space-y-2.5">
            {[
              {
                id: 'expo-out',
                label: 'Exponential Out: cubic-bezier(0.16, 1, 0.3, 1)',
                timing: 'cubic-bezier(0.16, 1, 0.3, 1)',
              },
              {
                id: 'spring',
                label: 'Spring Overshoot: cubic-bezier(0.34, 1.56, 0.64, 1)',
                timing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
              },
              {
                id: 'linear',
                label: 'Linear (Robotic Anti-Pattern): linear',
                timing: 'linear',
              },
            ].map((track) => (
              <div
                key={track.id}
                className={`p-2.5 rounded-lg border ${
                  preset === track.id ? 'border-sky-500 bg-sky-50/40' : 'border-slate-200 bg-slate-50'
                }`}
              >
                <div className="text-[11px] font-mono text-slate-600 mb-1.5 truncate">
                  {track.label}
                </div>
                <div className="w-full h-7 bg-white border border-slate-200 rounded-md p-1 flex items-center overflow-hidden">
                  <div
                    className="w-16 h-5 rounded bg-slate-900 text-white text-[10px] font-mono flex items-center justify-center"
                    style={{
                      transform: moved ? 'translateX(min(180px, 42vw))' : 'translateX(0px)',
                      transitionProperty: 'transform',
                      transitionDuration: '450ms',
                      transitionTimingFunction: track.timing,
                    }}
                  >
                    180ms
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 33. GLASSMORPHISM
    // -------------------------------------------------------------------------
    case 'glassmorphism': {
      const blurPx = Number(controlValues.blurPx ?? 12);
      const alpha = Number(controlValues.surfaceAlpha ?? 75);

      return (
        <div className="w-full h-[210px] rounded-xl border border-slate-200 relative overflow-hidden p-3.5 sm:p-4 flex items-center justify-center bg-white">
          <div className="absolute inset-0 p-4 space-y-2 select-none">
            <div className="flex gap-3">
              <div className="w-24 sm:w-28 h-20 rounded-xl bg-sky-500" />
              <div className="w-28 sm:w-32 h-20 rounded-xl bg-amber-400" />
              <div className="flex-1 h-20 rounded-xl bg-emerald-500" />
            </div>
            <p className="text-xs font-mono text-slate-700">
              Underlying scrolling page typography and high-contrast geometry diffuses smoothly behind
              the floating glassmorphic toolbar while foreground text stays 100% crisp.
            </p>
          </div>

          <div
            className="relative z-10 w-full max-w-md rounded-xl p-3.5 sm:p-4 shadow-lg border border-white/70 flex items-center justify-between gap-2"
            style={{
              backgroundColor: `rgba(255, 255, 255, ${alpha / 100})`,
              backdropFilter: `blur(${blurPx}px) saturate(160%)`,
              WebkitBackdropFilter: `blur(${blurPx}px) saturate(160%)`,
            }}
          >
            <div className="min-w-0">
              <div className="text-[11px] font-mono text-sky-800 font-semibold truncate">
                backdrop-filter: blur({blurPx}px) · bg-white/{alpha}
              </div>
              <div className="text-xs sm:text-sm font-display font-bold text-slate-900 mt-0.5 truncate">
                100% Crisp Foreground Typography
              </div>
            </div>
            <span className="px-3 py-1.5 text-xs font-semibold bg-slate-900 text-white rounded-lg shrink-0">
              Sticky Bar
            </span>
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 34. OPTIMISTIC UI
    // -------------------------------------------------------------------------
    case 'optimistic-ui': {
      const mode = String(controlValues.latencyMode || 'optimistic');

      return (
        <div className="w-full bg-white border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
          <div className="space-y-1">
            <div className="text-xs font-mono text-sky-700">
              MODE: {mode === 'optimistic' ? 'OPTIMISTIC (<16ms Instant Mutation)' : 'PESSIMISTIC (850ms Network Wait)'}
            </div>
            <div className="text-sm font-display font-bold text-slate-900">
              Tap the Bookmark button to feel the latency difference
            </div>
            <p className="text-xs text-slate-500">
              Optimistic UI mutates state on pointer tap and reconciles in the background.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOptimisticClick}
            disabled={optimisticPending}
            className={`min-h-[42px] w-full sm:w-auto justify-center px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all whitespace-nowrap shrink-0 tabular-nums ${
              optimisticSaved
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-slate-900 border-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            {optimisticPending ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Waiting 850ms...</span>
              </>
            ) : optimisticSaved ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Bookmarked · {optimisticCount}</span>
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5" />
                <span>Bookmark Spec · {optimisticCount}</span>
              </>
            )}
          </button>
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 35. FOCUS RING (FOCUS-VISIBLE)
    // -------------------------------------------------------------------------
    case 'focus-ring': {
      const offset = Number(controlValues.ringOffset ?? 2);

      return (
        <div className="w-full bg-white border border-slate-200 rounded-xl p-4 sm:p-6 flex flex-col items-center justify-center space-y-4">
          <div className="text-xs font-mono text-slate-500 text-center">
            Simulated `:focus-visible` Double-Ring with {offset}px Offset Gap
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            <button
              type="button"
              className="min-h-[40px] px-4 py-2 text-xs font-semibold bg-slate-900 text-white rounded-lg"
              style={{
                outline: '2px solid #0284C7',
                outlineOffset: `${offset}px`,
              }}
            >
              Keyboard Focused Button (Tab)
            </button>
            <button
              type="button"
              className="min-h-[40px] px-4 py-2 text-xs font-semibold bg-slate-100 text-slate-700 rounded-lg border border-slate-200"
            >
              Unfocused Sibling
            </button>
          </div>
          <div className="text-[11px] font-mono text-slate-500 text-center">
            outline: 2px solid #0284C7; outline-offset: {offset}px;
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 36. STAGGERED CHOREOGRAPHY
    // -------------------------------------------------------------------------
    case 'staggered-choreography': {
      const step = Number(controlValues.staggerStep ?? 40);

      return (
        <div className="w-full bg-white border border-slate-200 rounded-xl p-4 sm:p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-mono text-slate-600">
              Stagger Delay: calc(index * {step}ms) · 8px Y-Axis Lift
            </span>
            <button
              type="button"
              onClick={() => setStaggerTrigger((n) => n + 1)}
              className="min-h-[38px] px-3 py-1.5 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              Replay Stagger Entrance ↻
            </button>
          </div>
          <div key={staggerTrigger} className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1 animate-[pulse_0.35s_ease-out]"
                style={{
                  animationDelay: `${idx * step}ms`,
                }}
              >
                <div className="text-[10px] font-mono text-sky-700 tabular-nums">
                  +{idx * step}ms delay
                </div>
                <div className="text-xs font-display font-bold text-slate-900">Card 0{idx + 1}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 37. CHAMFERED HUD FRAME & CORNER RETICLES (FUI)
    // -------------------------------------------------------------------------
    case 'hud-reticle-frame': {
      const bevel = Number(controlValues.chamferSize ?? 16);
      const showBrackets = String(controlValues.reticleStyle || 'brackets') === 'brackets';

      return (
        <div className="w-full bg-slate-950 p-3.5 sm:p-6 rounded-xl relative overflow-hidden text-white">
          <div
            className="relative p-4 sm:p-5 border border-sky-500/30 bg-slate-900/90"
            style={{
              clipPath: `polygon(0 0, calc(100% - ${bevel}px) 0, 100% ${bevel}px, 100% 100%, ${bevel}px 100%, 0 calc(100% - ${bevel}px))`,
            }}
          >
            {/* 4 Corner L-Bracket Reticles */}
            {showBrackets && (
              <>
                <span className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-sky-400" />
                <span className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-sky-400" />
              </>
            )}

            <div className="flex items-center justify-between text-[11px] font-mono text-sky-400 border-b border-sky-500/20 pb-2">
              <span>TACTICAL FUI FRAME · BEVEL {bevel}PX</span>
              <span className="tabular-nums">AZ {liveCounter.toFixed(1)}°</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 pt-3 font-mono">
              <div>
                <div className="text-[10px] text-slate-400">VECTOR LOCK</div>
                <div className="text-sm font-bold text-white tabular-nums">042.88 KM</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">CHAMFER CLIP</div>
                <div className="text-sm font-bold text-sky-300">45° POLYGON</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">RETICLE FIDUCIAL</div>
                <div className="text-sm font-bold text-emerald-400">+ NOMINAL</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 38. SPATIAL GLASS & SPECULAR RIM LIGHT (VISIONOS UI)
    // -------------------------------------------------------------------------
    case 'spatial-vision-glass': {
      const spec = Number(controlValues.specularIntensity ?? 55);
      const tilted = String(controlValues.spatialDepth || 'tilted') === 'tilted';

      return (
        <div
          className="w-full h-[230px] rounded-xl p-6 flex flex-col items-center justify-center relative overflow-hidden"
          style={{
            background:
              'radial-gradient(circle at 20% 20%, #0284C7 0%, #0F172A 55%, #020617 100%)',
          }}
        >
          <div
            className="w-full max-w-md rounded-[28px] p-5 text-white backdrop-blur-2xl shadow-2xl transition-transform duration-180"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 100%)',
              borderTop: `1px solid rgba(255,255,255,${spec / 100})`,
              borderLeft: `1px solid rgba(255,255,255,${(spec * 0.85) / 100})`,
              borderRight: '1px solid rgba(255,255,255,0.12)',
              borderBottom: '1px solid rgba(255,255,255,0.12)',
              transform: tilted ? 'perspective(700px) rotateX(4deg) rotateY(-4deg)' : 'none',
            }}
          >
            <div className="flex items-center justify-between text-xs font-mono text-sky-200">
              <span>VisionOS Spatial Platter</span>
              <span>Specular Rim: {spec}%</span>
            </div>
            <div className="text-base font-display font-bold mt-1.5">
              Directional Top-Left Catchlight + Gaze Curvature
            </div>
            <p className="text-xs text-white/75 mt-1">
              Overhead light catches the top-left 1px bevel while the floating window bar anchors below.
            </p>
          </div>

          {/* Floating Spatial Window Reposition Bar */}
          <div className="w-28 h-1.5 rounded-full bg-white/75 mt-3 shadow-sm" />
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 39. CRT SCANLINE & PHOSPHOR CHROMATIC BLOOM
    // -------------------------------------------------------------------------
    case 'crt-scanline-phosphor': {
      const colorMode = String(controlValues.phosphorColor || 'emerald');
      const scanDensity = Number(controlValues.scanlineDensity ?? 30);

      const textColor =
        colorMode === 'amber'
          ? '#F59E0B'
          : colorMode === 'chromatic'
          ? '#E2E8F0'
          : '#10B981';

      const textShadow =
        colorMode === 'chromatic'
          ? '-1.5px 0 #FF0055, 1.5px 0 #00F0FF'
          : colorMode === 'amber'
          ? '0 0 8px rgba(245, 158, 11, 0.6)'
          : '0 0 8px rgba(16, 185, 129, 0.6)';

      return (
        <div className="w-full h-[210px] bg-[#050807] rounded-xl border-2 border-slate-800 relative overflow-hidden p-5 font-mono flex flex-col justify-between">
          {/* Repeating 2px Scanline Grating */}
          <div
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              background: `repeating-linear-gradient(to bottom, rgba(0,0,0,${
                scanDensity / 100
              }) 0px, rgba(0,0,0,${scanDensity / 100}) 1px, transparent 1px, transparent 3px)`,
            }}
          />

          <div
            className="relative z-10 space-y-1.5 text-xs"
            style={{ color: textColor, textShadow }}
          >
            <div className="flex justify-between border-b border-current/25 pb-1.5">
              <span>MU-TH-UR 6000 · CRT RASTER TERMINAL</span>
              <span className="tabular-nums">CLK {liveCounter.toFixed(2)}</span>
            </div>
            <div>&gt; SCANLINE GRATING OPACITY: {scanDensity}%</div>
            <div>&gt; PHOSPHOR HALATION: {colorMode.toUpperCase()}</div>
            <div>&gt; ORBITAL APOGEE LOCKED AT 412.8 KM</div>
          </div>

          <div
            className="relative z-10 text-[11px] flex justify-between"
            style={{ color: textColor, textShadow }}
          >
            <span>pointer-events: none (Zero Click Blocking)</span>
            <span>READY █</span>
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 40. POLAR COORDINATE RADAR & CONIC SWEEP HUD
    // -------------------------------------------------------------------------
    case 'polar-radar-hud': {
      const spinning = String(controlValues.sweepState || 'spinning') === 'spinning';

      return (
        <div className="w-full bg-slate-950 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-around gap-6 text-white">
          <div className="w-44 h-44 rounded-full border border-sky-500/40 relative overflow-hidden flex items-center justify-center bg-slate-900/90">
            {/* Concentric Range Rings */}
            <div className="w-28 h-28 rounded-full border border-sky-500/25 absolute" />
            <div className="w-14 h-14 rounded-full border border-sky-500/25 absolute" />
            {/* Orthogonal Crosshairs */}
            <div className="inset-x-0 h-px bg-sky-500/25 absolute" />
            <div className="inset-y-0 w-px bg-sky-500/25 absolute" />

            {/* Conic Sweep Sector */}
            <div
              className={`absolute inset-0 rounded-full ${spinning ? 'animate-spin' : ''}`}
              style={{
                animationDuration: '3.5s',
                background:
                  'conic-gradient(from 0deg, transparent 0deg 260deg, rgba(56, 189, 248, 0.42) 360deg)',
              }}
            />

            {/* Target Blips */}
            <div className="absolute top-9 right-11 w-2 h-2 rounded-full bg-sky-400 ring-4 ring-sky-400/30" />
            <div className="absolute bottom-10 left-12 w-2 h-2 rounded-full bg-emerald-400 ring-4 ring-emerald-400/30" />
          </div>

          <div className="space-y-2 font-mono text-xs">
            <div className="text-sky-400 font-semibold">POLAR RADAR TELEMETRY</div>
            <div className="text-slate-300">Sweep: conic-gradient(260deg..360deg)</div>
            <div className="text-emerald-400 tabular-nums">Target 01: AZ 048° · RNG 34.2km</div>
            <div className="text-sky-300 tabular-nums">Target 02: AZ 215° · RNG 61.8km</div>
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 41. RADIAL PIE MENU (MARKING MENU)
    // -------------------------------------------------------------------------
    case 'radial-pie-menu': {
      const activeSlice = Number(controlValues.activeSlice ?? 0);
      const actions = [
        { label: 'Extrude', deg: 0 },
        { label: 'Bevel', deg: 60 },
        { label: 'Union', deg: 120 },
        { label: 'Subdivide', deg: 180 },
        { label: 'Mirror', deg: 240 },
        { label: 'Raycast', deg: 300 },
      ];

      return (
        <div className="w-full h-[240px] bg-slate-950 rounded-xl relative flex items-center justify-center overflow-hidden text-white">
          {/* Central Origin Hub */}
          <div className="w-24 h-24 rounded-full bg-slate-900 border border-sky-400/50 flex flex-col items-center justify-center text-center z-10 p-2">
            <span className="text-[10px] font-mono text-sky-400">ACTIVE SECTOR</span>
            <span className="text-xs font-display font-bold mt-0.5">
              {actions[activeSlice]?.label}
            </span>
          </div>

          {/* 6 Polar Sector Nodes */}
          {actions.map((act, idx) => {
            const rad = ((act.deg - 90) * Math.PI) / 180;
            const r = 84;
            const x = Math.round(Math.cos(rad) * r);
            const y = Math.round(Math.sin(rad) * r);
            const isSelected = idx === activeSlice;

            return (
              <div
                key={act.label}
                style={{ transform: `translate(${x}px, ${y}px)` }}
                className={`absolute px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold border transition-all ${
                  isSelected
                    ? 'bg-sky-500 text-slate-950 border-white scale-110 shadow-lg'
                    : 'bg-slate-900 text-slate-300 border-slate-700'
                }`}
              >
                {act.label}
              </div>
            );
          })}
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 42. NODE-GRAPH PATCH CANVAS & BEZIER NOODLES
    // -------------------------------------------------------------------------
    case 'node-graph-canvas':
    default: {
      const spline = String(controlValues.splineStyle || 'bezier');
      const activeSignal = String(controlValues.signalFlow || 'active') === 'active';

      // Exact coordinate-locked socket positions inside the 680x240 stage:
      // Node 01 (Prompt Encoder): x=20..190, y=26..132
      //   - Out Port 1 (Embedding Out): (190, 82)
      //   - Out Port 2 (CLIP Mask Out): (190, 110)
      // Node 02 (Latent Conditioner): x=255..425, y=nodeRouterY..(nodeRouterY+92)
      //   - In Port 1 (Embed In): (255, nodeRouterY + 52)
      //   - Out Port 1 (Conditioned Out): (425, nodeRouterY + 52)
      // Node 03 (Spatial KSampler): x=490..660, y=78..184
      //   - In Port 1 (Latent Tensor In): (490, 134)
      //   - In Port 2 (Mask Tensor In): (490, 162)
      const p1OutX = 190;
      const p1OutY1 = 82;
      const p1OutY2 = 110;

      const p2InX = 255;
      const p2PortY = nodeRouterY + 52;
      const p2OutX = 425;

      const p3InX = 490;
      const p3InY1 = 134;
      const p3InY2 = 162;

      const wire1Path =
        spline === 'bezier'
          ? `M ${p1OutX} ${p1OutY1} C ${p1OutX + 36} ${p1OutY1}, ${p2InX - 36} ${p2PortY}, ${p2InX} ${p2PortY}`
          : `M ${p1OutX} ${p1OutY1} L ${Math.round((p1OutX + p2InX) / 2)} ${p1OutY1} L ${Math.round((p1OutX + p2InX) / 2)} ${p2PortY} L ${p2InX} ${p2PortY}`;

      const wire2Path =
        spline === 'bezier'
          ? `M ${p2OutX} ${p2PortY} C ${p2OutX + 36} ${p2PortY}, ${p3InX - 36} ${p3InY1}, ${p3InX} ${p3InY1}`
          : `M ${p2OutX} ${p2PortY} L ${Math.round((p2OutX + p3InX) / 2)} ${p2PortY} L ${Math.round((p2OutX + p3InX) / 2)} ${p3InY1} L ${p3InX} ${p3InY1}`;

      const wire3Path =
        spline === 'bezier'
          ? `M ${p1OutX} ${p1OutY2} C ${p1OutX + 120} ${p1OutY2 + 65}, ${p3InX - 120} ${p3InY2 + 25}, ${p3InX} ${p3InY2}`
          : `M ${p1OutX} ${p1OutY2} L 222 ${p1OutY2} L 222 204 L 460 204 L 460 ${p3InY2} L ${p3InX} ${p3InY2}`;

      return (
        <div className="w-full bg-slate-950 rounded-xl border border-slate-800 overflow-hidden text-white">
          {/* Interactive Topology Toolbar */}
          <div className="px-3.5 py-2.5 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="font-semibold text-sky-300">
                DAG PATCH CANVAS · SOCKET-LOCKED {spline === 'bezier' ? 'CUBIC-BEZIER' : 'ORTHOGONAL'} WIRES
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 text-[10px]">Move Node 02:</span>
              {[
                { label: 'High (Y:28)', y: 28 },
                { label: 'Mid (Y:84)', y: 84 },
                { label: 'Low (Y:122)', y: 122 },
              ].map((pos) => (
                <button
                  key={pos.label}
                  type="button"
                  onClick={() => setNodeRouterY(pos.y)}
                  className={`min-h-[30px] px-2.5 py-1 rounded text-[10px] border transition-colors ${
                    nodeRouterY === pos.y
                      ? 'bg-sky-500/20 border-sky-400 text-sky-300 font-semibold'
                      : 'bg-slate-950 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {pos.label}
                </button>
              ))}
            </div>
          </div>

          {/* Unified Coordinate-Locked SVG Node-Graph Canvas */}
          <svg
            viewBox="0 0 680 232"
            className="w-full h-auto block select-none"
            role="img"
            aria-label="Interactive 3-Node Patch Graph with Cubic-Bezier Noodles"
          >
            <defs>
              <pattern
                id="dotMatrixGrid"
                width="16"
                height="16"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1" fill="#334155" />
              </pattern>
              <filter id="noodleGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Infinite Dot-Matrix Background */}
            <rect width="680" height="232" fill="#020617" />
            <rect width="680" height="232" fill="url(#dotMatrixGrid)" />

            {/* ===============================================================
                LAYER 1: SOCKET-TO-SOCKET BEZIER / ORTHOGONAL NOODLE CABLES
            =============================================================== */}
            {/* Base Wire Shadow / Track */}
            <path d={wire1Path} fill="none" stroke="#0c4a6e" strokeWidth="5" strokeLinecap="round" />
            <path d={wire2Path} fill="none" stroke="#064e3b" strokeWidth="5" strokeLinecap="round" />
            <path d={wire3Path} fill="none" stroke="#3b0764" strokeWidth="4.5" strokeLinecap="round" />

            {/* Primary Glowing Noodle Wires */}
            <path
              d={wire1Path}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeDasharray={activeSignal ? '7 5' : undefined}
              filter="url(#noodleGlow)"
            >
              {activeSignal && (
                <animate
                  attributeName="stroke-dashoffset"
                  from="24"
                  to="0"
                  dur="0.9s"
                  repeatCount="indefinite"
                />
              )}
            </path>

            <path
              d={wire2Path}
              fill="none"
              stroke="#34d399"
              strokeWidth="2.5"
              strokeDasharray={activeSignal ? '7 5' : undefined}
              filter="url(#noodleGlow)"
            >
              {activeSignal && (
                <animate
                  attributeName="stroke-dashoffset"
                  from="24"
                  to="0"
                  dur="0.9s"
                  repeatCount="indefinite"
                />
              )}
            </path>

            <path
              d={wire3Path}
              fill="none"
              stroke="#c084fc"
              strokeWidth="2"
              strokeDasharray={activeSignal ? '6 5' : undefined}
            >
              {activeSignal && (
                <animate
                  attributeName="stroke-dashoffset"
                  from="22"
                  to="0"
                  dur="1.1s"
                  repeatCount="indefinite"
                />
              )}
            </path>

            {/* ===============================================================
                NODE 01: PROMPT ENCODER (x=20, y=26, w=170, h=106)
            =============================================================== */}
            <g transform="translate(20, 26)">
              <rect
                width="170"
                height="106"
                rx="10"
                fill="#0f172a"
                stroke="#334155"
                strokeWidth="1.5"
              />
              <path
                d="M 0 10 Q 0 0 10 0 L 160 0 Q 170 0 170 10 L 170 28 L 0 28 Z"
                fill="#082f49"
              />
              <line x1="0" y1="28" x2="170" y2="28" stroke="#334155" strokeWidth="1" />
              <text
                x="12"
                y="18"
                fill="#7dd3fc"
                fontSize="10.5"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="700"
              >
                01 · Prompt Encoder
              </text>

              {/* Output Row 1 (y = 56 inside node -> y = 82 global) */}
              <text
                x="12"
                y="60"
                fill="#e2e8f0"
                fontSize="10.5"
                fontFamily="Plus Jakarta Sans, sans-serif"
              >
                Embedding Out
              </text>
              <text
                x="118"
                y="60"
                fill="#38bdf8"
                fontSize="9.5"
                fontFamily="JetBrains Mono, monospace"
              >
                vec768
              </text>

              {/* Output Row 2 (y = 84 inside node -> y = 110 global) */}
              <text
                x="12"
                y="88"
                fill="#cbd5e1"
                fontSize="10.5"
                fontFamily="Plus Jakarta Sans, sans-serif"
              >
                CLIP Mask Out
              </text>
              <text
                x="124"
                y="88"
                fill="#c084fc"
                fontSize="9.5"
                fontFamily="JetBrains Mono, monospace"
              >
                mask
              </text>
            </g>

            {/* Node 01 Exact Output Sockets at (190, 82) and (190, 110) */}
            <circle cx={p1OutX} cy={p1OutY1} r="6" fill="#020617" stroke="#38bdf8" strokeWidth="2.5" />
            <circle cx={p1OutX} cy={p1OutY1} r="2.5" fill="#38bdf8" />
            <circle cx={p1OutX} cy={p1OutY2} r="6" fill="#020617" stroke="#c084fc" strokeWidth="2.5" />
            <circle cx={p1OutX} cy={p1OutY2} r="2.5" fill="#c084fc" />

            {/* ===============================================================
                NODE 02: ATTENTION ROUTER (x=255, y=nodeRouterY, w=170, h=86)
            =============================================================== */}
            <g
              transform={`translate(255, ${nodeRouterY})`}
              className="cursor-pointer"
              onClick={() => setNodeRouterY((prev) => (prev === 84 ? 28 : prev === 28 ? 122 : 84))}
            >
              <rect
                width="170"
                height="86"
                rx="10"
                fill="#0f172a"
                stroke="#38bdf8"
                strokeWidth="1.5"
              />
              <path
                d="M 0 10 Q 0 0 10 0 L 160 0 Q 170 0 170 10 L 170 28 L 0 28 Z"
                fill="#0c4a6e"
              />
              <line x1="0" y1="28" x2="170" y2="28" stroke="#0284c7" strokeWidth="1" />
              <text
                x="12"
                y="18"
                fill="#bae6fd"
                fontSize="10.5"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="700"
              >
                02 · Attention Router
              </text>

              {/* Through-Port Row (y = 52 inside node -> nodeRouterY + 52 global) */}
              <text
                x="14"
                y="56"
                fill="#e2e8f0"
                fontSize="10.5"
                fontFamily="Plus Jakarta Sans, sans-serif"
              >
                In → Latent Out
              </text>
              <text
                x="14"
                y="74"
                fill="#64748b"
                fontSize="9"
                fontFamily="JetBrains Mono, monospace"
              >
                (Click node to shift Y)
              </text>
            </g>

            {/* Node 02 Exact Input & Output Sockets at (255, p2PortY) and (425, p2PortY) */}
            <circle cx={p2InX} cy={p2PortY} r="6" fill="#020617" stroke="#38bdf8" strokeWidth="2.5" />
            <circle cx={p2InX} cy={p2PortY} r="2.5" fill="#38bdf8" />
            <circle cx={p2OutX} cy={p2PortY} r="6" fill="#020617" stroke="#34d399" strokeWidth="2.5" />
            <circle cx={p2OutX} cy={p2PortY} r="2.5" fill="#34d399" />

            {/* ===============================================================
                NODE 03: SPATIAL KSAMPLER (x=490, y=78, w=170, h=106)
            =============================================================== */}
            <g transform="translate(490, 78)">
              <rect
                width="170"
                height="106"
                rx="10"
                fill="#0f172a"
                stroke="#334155"
                strokeWidth="1.5"
              />
              <path
                d="M 0 10 Q 0 0 10 0 L 160 0 Q 170 0 170 10 L 170 28 L 0 28 Z"
                fill="#064e3b"
              />
              <line x1="0" y1="28" x2="170" y2="28" stroke="#334155" strokeWidth="1" />
              <text
                x="12"
                y="18"
                fill="#6ee7b7"
                fontSize="10.5"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="700"
              >
                03 · Spatial Sampler
              </text>

              {/* Input Row 1 (y = 56 inside node -> y = 134 global) */}
              <text
                x="14"
                y="60"
                fill="#e2e8f0"
                fontSize="10.5"
                fontFamily="Plus Jakarta Sans, sans-serif"
              >
                Latent Tensor In
              </text>

              {/* Input Row 2 (y = 84 inside node -> y = 162 global) */}
              <text
                x="14"
                y="88"
                fill="#cbd5e1"
                fontSize="10.5"
                fontFamily="Plus Jakarta Sans, sans-serif"
              >
                Mask Tensor In
              </text>
            </g>

            {/* Node 03 Exact Input Sockets at (490, 134) and (490, 162) */}
            <circle cx={p3InX} cy={p3InY1} r="6" fill="#020617" stroke="#34d399" strokeWidth="2.5" />
            <circle cx={p3InX} cy={p3InY1} r="2.5" fill="#34d399" />
            <circle cx={p3InX} cy={p3InY2} r="6" fill="#020617" stroke="#c084fc" strokeWidth="2.5" />
            <circle cx={p3InX} cy={p3InY2} r="2.5" fill="#c084fc" />

            {/* Blueprint Coordinate Callout */}
            {showBlueprint && (
              <text
                x="20"
                y="222"
                fill="#64748b"
                fontSize="9.5"
                fontFamily="JetBrains Mono, monospace"
              >
                path d=&quot;{wire1Path}&quot;
              </text>
            )}
          </svg>
        </div>
      );
    }
  }
};
