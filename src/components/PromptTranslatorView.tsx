import React, { useState, useMemo } from 'react';
import { DESIGN_TERMS, DesignTerm } from '../data/termsData';
import { VIBE_PRESET_SCENARIOS } from '../data/anatomyData';
import {
  Copy,
  Check,
  Plus,
  Download,
  ArrowUpRight,
  RotateCcw,
  ChevronDown,
} from 'lucide-react';

interface PromptTranslatorViewProps {
  onJumpToTerm: (termId: string) => void;
  specCartIds: string[];
  onAddMultipleToCart: (termIds: string[]) => void;
  onCopyFeedback: (label: string) => void;
}

// Comprehensive colloquial keyword dictionary mapping everyday phrases to canonical term IDs
const KEYWORD_SYNONYM_MAP: Record<string, string[]> = {
  'bento-grid': [
    'bento',
    'boxes of different sizes',
    'different sized',
    'apple-style grid',
    'apple style',
    'uneven grid',
    'mosaic',
    'multi-span',
    'feature grid',
  ],
  'split-screen-hero': [
    'two-column hero',
    'two column',
    'split screen',
    'side by side',
    'text on the left',
    'left and',
    'right side',
    'hero',
  ],
  'sticky-rail': [
    'stays on screen when you scroll',
    'table of contents',
    'follows you',
    'sticky sidebar',
    'scroll spy',
    'right side that stays',
  ],
  'nested-radius': [
    'rounded corners that match',
    'concentric',
    'nested rounded',
    'pinched corners',
    'smooth rounded corners',
    'card corners',
  ],
  'spatial-grid': [
    '8pt',
    'padding',
    'spacing',
    'margins',
    'clean spacing',
    'proximity',
  ],
  'app-shell': [
    'full screen dashboard',
    'left menu stays fixed',
    'linear-style',
    'workspace layout',
    'app shell',
    'sidebar stays fixed',
  ],
  'command-palette': [
    'ctrl+k',
    'cmd+k',
    'popup search',
    'spotlight',
    'quick action',
    'command palette',
    'omnibar',
  ],
  'segmented-control': [
    'toggle switch with 3',
    'connected options',
    'monthly vs annual',
    'segmented',
    'switcher bar',
    '3 connected',
  ],
  'slide-over-drawer': [
    'slides out from the right',
    'side panel',
    'drawer',
    'slide-over',
    'off-canvas',
    'click a row',
  ],
  'breadcrumb-trail': [
    'folder > page',
    'path at the top',
    'breadcrumb',
    'slashes',
    'navigation trail',
  ],
  'overlay-taxonomy': [
    'message in the bottom corner',
    'toast',
    'popover',
    'modal',
    'snackbar',
    'notification',
  ],
  'skeleton-loader': [
    'gray pulsing',
    'placeholder boxes',
    'spinning wheel',
    'skeleton',
    'shimmer',
    'while data loads',
  ],
  'empty-state': [
    'no results',
    'no data',
    'empty state',
    'zero state',
    'first item',
  ],
  'fluid-typography': [
    'wraps nicely',
    'big title',
    'shrink smoothly',
    'orphan',
    'fluid',
    'clamp',
  ],
  'color-60-30-10': [
    'pop of blue',
    'clean neutral color',
    '60-30-10',
    'color scheme',
    'brand color',
  ],
  'tabular-numerals': [
    'numbers align vertically',
    'without jumping',
    'tabular',
    'timer shaking',
    'numbers',
  ],
  'measure-and-leading': [
    'paragraphs are not too wide',
    'too wide to read',
    'line width',
    'reading width',
    'measure',
    'leading',
  ],
  'contrast-scrim': [
    'dark fade',
    'text readable on top of a photo',
    'scrim',
    'gradient behind',
  ],
  'surface-elevation': [
    'thin 1px lines',
    'boxes inside boxes',
    'hairline',
    'drop shadows',
    'flat crisp',
  ],
  'spring-physics': [
    'snappy',
    'spring',
    'smooth animation',
    'cubic-bezier',
    'easing',
  ],
  glassmorphism: [
    'blurs the page',
    'blurry',
    'see-through',
    'frosted glass',
    'glassmorphism',
    'stays on screen and blurs',
  ],
  'optimistic-ui': [
    'immediately when clicked',
    'instant',
    'optimistic',
    'without waiting',
  ],
  'focus-ring': [
    'tab key',
    'keyboard ring',
    'focus ring',
    'outline',
  ],
  'staggered-choreography': [
    'one after another',
    'cascading',
    'stagger',
    'domino',
  ],
  'masonry-waterfall': [
    'pinterest',
    'masonry',
    'waterfall',
    'uneven heights',
    'without vertical gaps',
    'pack tightly',
  ],
  'infinite-marquee': [
    'marquee',
    'ticker',
    'scrolling logo',
    'faded left and right',
    'conveyor belt',
    'infinite scroll strip',
  ],
  'accordion-disclosure': [
    'accordion',
    'faq',
    'click to expand',
    'collapsible',
    'progressive disclosure',
    'plus icon that turns',
  ],
  'iconic-menu-taxonomy': [
    'three dots',
    '3 dots',
    'hamburger',
    'kebab',
    'meatballs',
    '9 dots',
    'waffle icon',
    'doner',
    'three lines',
  ],
  'mega-menu': [
    'mega menu',
    'giant multi-column dropdown',
    'stripe style menu',
    'multi-column flyout',
  ],
  'bottom-sheet': [
    'bottom sheet',
    'slides up from the bottom',
    'little gray pill',
    'drag handle',
    'grabber',
    'apple maps',
  ],
  'scroll-snap-carousel': [
    'scroll snap',
    'locks cleanly',
    'horizontal swipe',
    'peek of the next card',
    'carousel',
  ],
  'avatar-stack': [
    'overlapping profile',
    'facepile',
    'avatar stack',
    'circle avatars',
    '+4 badge',
    'overlapping circles',
  ],
  'wizard-stepper': [
    'numbered circles connected by lines',
    'stepper',
    'wizard',
    'multi-step',
    'step 1',
    'checkout progress',
  ],
  'fab-speed-dial': [
    'round + button',
    'bottom-right corner',
    'floating action button',
    'speed dial',
    'pops out 3',
  ],
  'spotlight-tour': [
    'darkens the whole screen except',
    'coachmark',
    'product tour',
    'spotlight cutout',
    'onboarding tooltip',
  ],
  'scroll-progress': [
    'thin colored bar at the very top',
    'reading progress',
    'scroll progress',
    'fills up from 0% to 100%',
  ],
  'hud-reticle-frame': [
    'angled 45-degree',
    'chamfered',
    'cut corners',
    'cyberpunk',
    'iron man',
    'corner brackets',
    'clip-path',
    'sci-fi frame',
  ],
  'spatial-vision-glass': [
    'apple vision pro',
    'visionos',
    'spatial glass',
    'specular rim',
    'floating 3d glass',
  ],
  'crt-scanline-phosphor': [
    'crt',
    'scanline',
    'phosphor',
    'retro-futuristic',
    'fallout',
    'glowing green',
    'amber monitor',
  ],
  'polar-radar-hud': [
    'spinning radar',
    'radar circle',
    'polar radar',
    'sweeping green',
    'blips',
    'conic sweep',
  ],
  'radial-pie-menu': [
    'circular wheel menu',
    'radial menu',
    'pie menu',
    'marking menu',
    'around my cursor',
  ],
  'node-graph-canvas': [
    'curved wires',
    'node graph',
    'noodles',
    'bezier wires',
    'patch canvas',
    'comfyui',
    'blender',
  ],
};

export const PromptTranslatorView: React.FC<PromptTranslatorViewProps> = ({
  onJumpToTerm,
  onAddMultipleToCart,
  onCopyFeedback,
}) => {
  const [vibeText, setVibeText] = useState(VIBE_PRESET_SCENARIOS[0].vibeInput);
  const [manualExtraIds, setManualExtraIds] = useState<string[]>([]);
  const [excludedIds, setExcludedIds] = useState<string[]>([]);
  const [copiedOutput, setCopiedOutput] = useState(false);
  const [showAllChips, setShowAllChips] = useState(false);

  // Universal architectural guardrails
  const [guardrails, setGuardrails] = useState({
    enforce603010: true,
    enforceConcentricRadius: true,
    enforceSingleElevation: true,
    enforceTabularNums: true,
  });

  // Match terms from natural-language input
  const matchedResults = useMemo(() => {
    const lower = vibeText.toLowerCase();
    const detected: { term: DesignTerm; matchedTrigger: string }[] = [];

    DESIGN_TERMS.forEach((term) => {
      const triggers = [
        term.title.toLowerCase(),
        ...term.vibePhrases.map((p) => p.toLowerCase()),
        ...(KEYWORD_SYNONYM_MAP[term.id] || []),
      ];

      const hit = triggers.find((trig) => trig.length > 3 && lower.includes(trig));
      if (hit && !excludedIds.includes(term.id)) {
        detected.push({ term, matchedTrigger: hit });
      } else if (manualExtraIds.includes(term.id) && !excludedIds.includes(term.id)) {
        detected.push({ term, matchedTrigger: 'Manually Added' });
      }
    });

    return detected;
  }, [vibeText, manualExtraIds, excludedIds]);

  const activeTerms = useMemo(() => matchedResults.map((r) => r.term), [matchedResults]);

  // Compile the structured AI Agent System Prompt
  const compiledMarkdownPrompt = useMemo(() => {
    const layoutTerms = activeTerms.filter((t) => t.category === 'layout');
    const navTerms = activeTerms.filter((t) => t.category === 'navigation');
    const typeTerms = activeTerms.filter((t) => t.category === 'typography');
    const motionTerms = activeTerms.filter((t) => t.category === 'motion');
    const futuristicTerms = activeTerms.filter((t) => t.category === 'futuristic');

    const lines: string[] = [
      '# UI/UX Frontend Architecture & Design Specification',
      '',
      'Please build this interface following these exact UI/UX architectural patterns and spatial rules:',
      '',
    ];

    if (layoutTerms.length > 0) {
      lines.push('## 1. Layout & Spatial Systems');
      layoutTerms.forEach((t) => {
        lines.push(`- **${t.title} (${t.pronunciationOrAlias})**: ${t.goodPromptExample}`);
      });
      lines.push('');
    }

    if (navTerms.length > 0) {
      lines.push('## 2. Navigation & Interactive Components');
      navTerms.forEach((t) => {
        lines.push(`- **${t.title}**: ${t.goodPromptExample}`);
      });
      lines.push('');
    }

    if (typeTerms.length > 0) {
      lines.push('## 3. Typography & Color Hierarchy');
      typeTerms.forEach((t) => {
        lines.push(`- **${t.title}**: ${t.goodPromptExample}`);
      });
      lines.push('');
    }

    if (motionTerms.length > 0) {
      lines.push('## 4. Micro-Interactions & Motion Craft');
      motionTerms.forEach((t) => {
        lines.push(`- **${t.title}**: ${t.goodPromptExample}`);
      });
      lines.push('');
    }

    if (futuristicTerms.length > 0) {
      lines.push('## 5. Sci-Fi, Spatial & Futuristic UI (FUI) Paradigms');
      futuristicTerms.forEach((t) => {
        lines.push(`- **${t.title} (${t.pronunciationOrAlias})**: ${t.goodPromptExample}`);
      });
      lines.push('');
    }

    const activeGuardrails: string[] = [];
    if (guardrails.enforce603010) {
      activeGuardrails.push(
        '- **60-30-10 Color Discipline**: 60% neutral canvas (#F8FAFC), 30% structural white surfaces & 1px slate hairlines (#E2E8F0), and strictly 10% high-intent accent budget on primary CTAs.'
      );
    }
    if (guardrails.enforceConcentricRadius) {
      activeGuardrails.push(
        '- **Concentric Border Radius Math**: For any padded card containing an inner frame, enforce `r_outer = r_inner + padding` (e.g. `p-4 rounded-[28px]` outer, `rounded-[12px]` inner).'
      );
    }
    if (guardrails.enforceSingleElevation) {
      activeGuardrails.push(
        '- **Single-Elevation Hairline Discipline**: Avoid nesting bordered cards inside bordered cards; partition inner groups using whitespace and `1px solid` (`divide-x` / `divide-y`) hairline borders.'
      );
    }
    if (guardrails.enforceTabularNums) {
      activeGuardrails.push(
        '- **Tabular Numerals**: Apply `font-mono tabular-nums` and right-alignment to all metrics, prices, counters, and timestamps.'
      );
    }

    if (activeGuardrails.length > 0) {
      lines.push('## 6. Universal Design Guardrails');
      lines.push(...activeGuardrails);
    }

    return lines.join('\n');
  }, [activeTerms, guardrails]);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(compiledMarkdownPrompt);
    setCopiedOutput(true);
    onCopyFeedback(`Copied structured prompt with ${activeTerms.length} UI/UX specs`);
    setTimeout(() => setCopiedOutput(false), 1800);
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([compiledMarkdownPrompt], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'UI_UX_AGENT_PROMPT.md';
    a.click();
    URL.revokeObjectURL(url);
    onCopyFeedback('Downloaded UI_UX_AGENT_PROMPT.md');
  };

  const handleToggleTermChip = (termId: string) => {
    const isCurrentlyActive = activeTerms.some((t) => t.id === termId);
    if (isCurrentlyActive) {
      setExcludedIds((prev) => [...prev, termId]);
      setManualExtraIds((prev) => prev.filter((id) => id !== termId));
    } else {
      setExcludedIds((prev) => prev.filter((id) => id !== termId));
      setManualExtraIds((prev) => [...prev, termId]);
    }
  };

  const visibleChips = useMemo(() => {
    if (showAllChips) return DESIGN_TERMS;
    // By default show active/matched terms + top 10 foundational terms so mobile isn't flooded with 42 chips
    const activeSet = new Set(activeTerms.map((t) => t.id));
    const prioritized = [
      ...DESIGN_TERMS.filter((t) => activeSet.has(t.id)),
      ...DESIGN_TERMS.filter((t) => !activeSet.has(t.id)).slice(0, 8),
    ];
    return prioritized.slice(0, 14);
  }, [showAllChips, activeTerms]);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-mono text-sky-700 font-semibold">
              VIBE-TO-SPEC PROMPT TRANSLATOR &amp; COMPILER
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Describe the UI in plain English — get the exact UI/UX engineering prompt
            </h2>
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
              Type how you naturally picture the screen (or load a common scenario below). LexiconUI
              detects every underlying UI/UX pattern, shows you what it is formally called, and
              compiles a clean Markdown specification ready to paste into any AI coding agent.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setExcludedIds([]);
              setManualExtraIds([]);
              setVibeText(VIBE_PRESET_SCENARIOS[0].vibeInput);
            }}
            className="min-h-[42px] sm:min-h-[38px] px-3.5 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 border border-slate-200 rounded-xl flex items-center justify-center gap-1.5 self-start lg:self-auto whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Translator</span>
          </button>
        </div>

        {/* Preset Scenario Buttons (Swipeable on mobile, wrapped on desktop) */}
        <div className="space-y-2 pt-3 border-t border-slate-100">
          <div className="text-xs font-mono text-slate-500">
            LOAD A COMMON VIBE-CODING SCENARIO:
          </div>
          <div className="flex sm:flex-wrap gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0 snap-x">
            {VIBE_PRESET_SCENARIOS.map((preset) => {
              const isSelected = vibeText === preset.vibeInput;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    setExcludedIds([]);
                    setManualExtraIds([]);
                    setVibeText(preset.vibeInput);
                  }}
                  className={`min-h-[40px] sm:min-h-[34px] px-3 py-1.5 rounded-xl sm:rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 snap-start ${
                    isSelected
                      ? 'bg-slate-900 border-slate-900 text-white font-semibold'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Two-Column Translator Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        {/* LEFT 6 COLUMNS: Natural Vibe Input + Detected UI/UX Terms Breakdown */}
        <div className="lg:col-span-6 space-y-5 sm:space-y-6">
          {/* Natural Language Input Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label
                htmlFor="vibe-input-textarea"
                className="text-xs font-mono font-semibold text-slate-700"
              >
                1. YOUR CASUAL &ldquo;VIBE&rdquo; DESCRIPTION
              </label>
              <span className="text-xs font-mono text-sky-700 font-semibold tabular-nums">
                {matchedResults.length} UI/UX Concepts Detected
              </span>
            </div>

            <textarea
              id="vibe-input-textarea"
              rows={4}
              value={vibeText}
              onChange={(e) => setVibeText(e.target.value)}
              placeholder='Describe what you want, e.g.: "I want a blurry top bar, boxes of different sizes like Apple, a ctrl+k popup search, and a panel that slides out from the right..."'
              className="w-full p-3.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:bg-white leading-relaxed"
            />

            {/* Quick-Toggle Concept Chips (Collapsible on Mobile for clean ergonomics) */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono text-slate-500">
                  TAP ANY CONCEPT TO TOGGLE IT IN OR OUT:
                </span>
                <button
                  type="button"
                  onClick={() => setShowAllChips((prev) => !prev)}
                  className="text-xs font-mono font-semibold text-sky-700 hover:text-sky-900 inline-flex items-center gap-1"
                >
                  <span>
                    {showAllChips
                      ? 'Show Compact List'
                      : `Show All ${DESIGN_TERMS.length} Chips`}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      showAllChips ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {visibleChips.map((term) => {
                  const isIncluded = activeTerms.some((t) => t.id === term.id);
                  return (
                    <button
                      key={term.id}
                      type="button"
                      onClick={() => handleToggleTermChip(term.id)}
                      className={`min-h-[36px] sm:min-h-[30px] px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                        isIncluded
                          ? 'bg-sky-50 border-sky-400 text-sky-900 font-semibold'
                          : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {isIncluded ? '✓ ' : '+ '}
                      {term.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Detected UI/UX Terms & Translation Cards */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono font-semibold text-slate-700">
                2. DETECTED EXACT UI/UX TERMINOLOGY ({matchedResults.length})
              </span>
              {activeTerms.length > 0 && (
                <button
                  type="button"
                  onClick={() => onAddMultipleToCart(activeTerms.map((t) => t.id))}
                  className="min-h-[36px] px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-200 text-xs font-semibold text-sky-800 hover:bg-sky-100 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add All {activeTerms.length} to Spec Cart</span>
                </button>
              )}
            </div>

            {matchedResults.length === 0 ? (
              <div className="p-6 sm:p-8 border border-dashed border-slate-300 rounded-xl text-center space-y-2">
                <div className="text-sm font-semibold text-slate-800">
                  No specific terms detected yet
                </div>
                <p className="text-xs text-slate-500">
                  Type phrases like &ldquo;boxes of different sizes&rdquo;, &ldquo;blurry top
                  bar&rdquo;, &ldquo;ctrl+k popup&rdquo;, or tap any concept chip above.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
                {matchedResults.map(({ term, matchedTrigger }) => (
                  <div
                    key={term.id}
                    className="p-3.5 sm:p-4 bg-white hover:bg-slate-50/70 transition-colors space-y-1.5"
                  >
                    <div className="flex items-start sm:items-center justify-between gap-2">
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs font-mono text-sky-700 font-semibold">
                            {term.number}.
                          </span>
                          <h4 className="font-display text-sm font-bold text-slate-900">
                            {term.title}
                          </h4>
                        </div>
                        <div className="text-[11px] font-mono text-emerald-700">
                          Matched: &ldquo;{matchedTrigger}&rdquo;
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onJumpToTerm(term.id)}
                        className="min-h-[36px] px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-sky-700 hover:text-sky-900 flex items-center gap-1 shrink-0"
                      >
                        <span>Sandbox</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{term.summary}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT 6 COLUMNS: Compiled AI Agent System Prompt Output */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 space-y-5 lg:sticky lg:top-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <div className="text-xs font-mono font-semibold text-emerald-800">
                3. COMPILED AI AGENT SPECIFICATION PROMPT
              </div>
              <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                Ready to paste into Cursor, Claude Code, Windsurf, or AI Studio
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleDownloadMarkdown}
                className="min-h-[42px] sm:min-h-[38px] px-3 py-2 text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl flex items-center justify-center gap-1.5 whitespace-nowrap"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .MD</span>
              </button>
              <button
                type="button"
                onClick={handleCopyPrompt}
                className="min-h-[42px] sm:min-h-[38px] px-4 py-2 text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 rounded-xl flex items-center justify-center gap-1.5 whitespace-nowrap"
              >
                {copiedOutput ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied Spec!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Prompt</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Architectural Guardrail Checkboxes */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-slate-500">
              INCLUDE UNIVERSAL ANTI-SLOP ARCHITECTURAL GUARDRAILS:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { key: 'enforce603010', label: '60-30-10 Color Restraint' },
                { key: 'enforceConcentricRadius', label: 'Concentric Radius Math' },
                { key: 'enforceSingleElevation', label: '1px Hairlines (No Box-in-Box)' },
                { key: 'enforceTabularNums', label: 'Tabular Numerals on Metrics' },
              ].map((item) => {
                const checked = guardrails[item.key as keyof typeof guardrails];
                return (
                  <label
                    key={item.key}
                    className="min-h-[44px] flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-xs font-medium text-slate-800 cursor-pointer hover:bg-slate-100/80"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) =>
                        setGuardrails((prev) => ({
                          ...prev,
                          [item.key]: e.target.checked,
                        }))
                      }
                      className="w-4 h-4 rounded accent-slate-900 shrink-0"
                    />
                    <span>{item.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Markdown Code Preview */}
          <pre className="p-3.5 sm:p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto max-h-[420px] overflow-y-auto leading-relaxed whitespace-pre-wrap break-words">
            <code>{compiledMarkdownPrompt}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
