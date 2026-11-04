/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Search,
  Layers,
  Eye,
  Wand2,
  Table,
  Check,
  LayoutTemplate,
  ArrowUpRight,
  ArrowDown,
  Copy,
  Sliders,
  ChevronUp,
  ChevronDown,
  AlertCircle,
  CheckCircle2,
  Compass,
} from 'lucide-react';
import { DESIGN_TERMS } from './data/termsData';
import { EncyclopediaView } from './components/EncyclopediaView';
import { AnatomyInspectorView } from './components/AnatomyInspectorView';
import { PromptTranslatorView } from './components/PromptTranslatorView';
import { ComparisonMatrixView } from './components/ComparisonMatrixView';
import { ContributorStudioView } from './components/ContributorStudioView';
import { CommandPaletteModal, SpecCartDrawer } from './components/Overlays';
import { IntroTour, INTRO_TOUR_STEPS } from './components/IntroTour';
import { LexiconLogo } from './components/LexiconLogo';
import { Footer } from './components/Footer';
import { Analytics } from '@vercel/analytics/react';

export type ActiveWorkspaceTab =
  | 'encyclopedia'
  | 'anatomy'
  | 'translator'
  | 'matrix'
  | 'contribute';

export const GITHUB_REPO_URL = 'https://github.com/RootDeveloperDS/LexiconUI';
const STORAGE_KEY_CART = 'lexicon_ui_spec_cart_v1';
const STORAGE_KEY_TOUR_SEEN = 'lexicon_ui_intro_tour_seen_v1';

interface HeroDemoComparison {
  id: string;
  termId: string;
  everydayQuestion: string;
  shortBadge: string;
  vaguePrompt: string;
  brokenResultLabel: string;
  canonicalName: string;
  exactPrompt: string;
}

const HERO_COMPARISONS: HeroDemoComparison[] = [
  {
    id: 'bento',
    termId: 'bento-grid',
    everydayQuestion: '"Boxes of different sizes like Apple"',
    shortBadge: '01. Bento Grid',
    vaguePrompt: 'Make a modern grid of feature boxes of different sizes.',
    brokenResultLabel: 'AI builds uneven flex cards with ragged bottom edges and random heights.',
    canonicalName: '01. Bento Grid (CSS Grid Span Architecture)',
    exactPrompt:
      'Build a 3-column Bento Grid (grid-cols-1 md:grid-cols-3 auto-rows-[200px] gap-4) where the primary feature cell spans 2 columns (md:col-span-2) and the vertical timeline spans 2 rows (md:row-span-2).',
  },
  {
    id: 'menus',
    termId: 'iconic-menu-taxonomy',
    everydayQuestion: '"The 3 dots menu vs. 9-dot app switcher"',
    shortBadge: '28. Menu Icons',
    vaguePrompt: 'Put that three-dot menu icon on each row and the grid icon in the navbar.',
    brokenResultLabel: 'AI confuses horizontal/vertical dots or puts a giant hamburger button inside table rows.',
    canonicalName: '28. Hamburger, Kebab, Meatballs & Bento Menu Taxonomy',
    exactPrompt:
      'Render a vertical 3-dot Kebab Menu (MoreVertical) inside each table row for inline actions, and a 3x3 Bento / Waffle Launcher icon (Grid) in the top header.',
  },
  {
    id: 'subgrid',
    termId: 'css-subgrid',
    everydayQuestion: '"Make card titles & buttons line up across a row"',
    shortBadge: '43. CSS Subgrid',
    vaguePrompt: 'Make 3 pricing cards and make sure the headings and bottom buttons line up evenly.',
    brokenResultLabel: 'AI hardcodes fixed heights that clip text or leaves buttons misaligned when text wraps.',
    canonicalName: '43. CSS Subgrid Cross-Card Alignment',
    exactPrompt:
      'Use CSS Subgrid across the 3-column card row: set the parent container to grid-cols-3 gap-6 and each child card to row-span-3 grid grid-rows-subgrid gap-4 so headers, descriptions, and CTA footers lock onto shared row tracks.',
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveWorkspaceTab>('encyclopedia');
  const [selectedTermId, setSelectedTermId] = useState<string>(DESIGN_TERMS[0].id);
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false);
  const [specDrawerOpen, setSpecDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Interactive Hero comparison state so first-time visitors immediately see what the app does
  const [heroExampleIdx, setHeroExampleIdx] = useState<number>(0);
  const [heroViewMode, setHeroViewMode] = useState<'exact' | 'vague'>('exact');
  const [isHeroCollapsed, setIsHeroCollapsed] = useState<boolean>(false);
  const [copiedHeroPrompt, setCopiedHeroPrompt] = useState<boolean>(false);

  // Interactive Intro Tour State (Automatically active for first-time visitors)
  const [isTourOpen, setIsTourOpen] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_TOUR_SEEN) !== 'true';
    } catch {
      return true;
    }
  });
  const [tourStepIdx, setTourStepIdx] = useState<number>(0);

  const [specCartIds, setSpecCartIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CART);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore storage error
    }
    return ['bento-grid', 'command-palette', 'color-60-30-10'];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(specCartIds));
    } catch {
      // ignore storage error
    }
  }, [specCartIds]);

  // Global Cmd+K / Ctrl+K shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Universal Desktop Mouse-Wheel-to-Horizontal-Scroll for all horizontal strips across the app
  useEffect(() => {
    const handleGlobalWheel = (e: WheelEvent) => {
      if (e.ctrlKey || Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;

      let node = e.target as HTMLElement | null;
      while (node && node !== document.body && node !== document.documentElement) {
        const tag = node.tagName;
        if (tag === 'TEXTAREA' || tag === 'PRE' || tag === 'SELECT') return;

        const maxScrollLeft = node.scrollWidth - node.clientWidth;
        if (maxScrollLeft > 4) {
          const style = window.getComputedStyle(node);
          const overflowX = style.overflowX;
          const isHorizScrollable = overflowX === 'auto' || overflowX === 'scroll';
          const isVertScrollable =
            (style.overflowY === 'auto' || style.overflowY === 'scroll') &&
            node.scrollHeight > node.clientHeight + 12;

          if (isHorizScrollable && !isVertScrollable) {
            const canGoRight = e.deltaY > 0 && node.scrollLeft < maxScrollLeft - 1;
            const canGoLeft = e.deltaY < 0 && node.scrollLeft > 1;
            if (canGoRight || canGoLeft) {
              e.preventDefault();
              node.scrollLeft += e.deltaY;
              return;
            }
          }
        }
        node = node.parentElement;
      }
    };

    window.addEventListener('wheel', handleGlobalWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleGlobalWheel);
  }, []);

  const triggerToast = (message: string) => {
    setToastMessage(message);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 2600);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const handleToggleSpecCart = (termId: string) => {
    const term = DESIGN_TERMS.find((t) => t.id === termId);
    setSpecCartIds((prev) => {
      const exists = prev.includes(termId);
      const next = exists ? prev.filter((id) => id !== termId) : [...prev, termId];
      triggerToast(
        exists
          ? `Removed "${term?.title || termId}" from Spec Sheet`
          : `Added "${term?.title || termId}" to Spec Sheet`
      );
      return next;
    });
  };

  const handleAddMultipleToCart = (termIds: string[]) => {
    setSpecCartIds((prev) => {
      const merged = Array.from(new Set([...prev, ...termIds]));
      return merged;
    });
    triggerToast(`Added ${termIds.length} UI/UX patterns to Spec Sheet`);
    setSpecDrawerOpen(true);
  };

  const handleJumpToTerm = (termId: string) => {
    setSelectedTermId(termId);
    setActiveTab('encyclopedia');
    setTimeout(() => {
      document
        .getElementById('workspace-main-anchor')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 40);
  };

  const scrollToWorkspace = (tab?: ActiveWorkspaceTab, targetId?: string) => {
    if (tab) setActiveTab(tab);
    setTimeout(() => {
      const el = document.getElementById(targetId || 'workspace-main-anchor');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 40);
  };

  // Intro Tour Handlers: Programmatically highlight & switch between the 5 workspace tools
  const handleSelectTourStep = (idx: number) => {
    const clamped = Math.max(0, Math.min(INTRO_TOUR_STEPS.length - 1, idx));
    setTourStepIdx(clamped);
    const step = INTRO_TOUR_STEPS[clamped];
    if (step) {
      setActiveTab(step.tabId);
    }
  };

  const handleCloseTour = () => {
    setIsTourOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY_TOUR_SEEN, 'true');
    } catch {
      // ignore storage error
    }
  };

  const handleStartTour = () => {
    setTourStepIdx(0);
    setActiveTab('encyclopedia');
    setIsTourOpen(true);
    setTimeout(() => {
      document
        .getElementById('workspace-main-anchor')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 40);
  };

  const handleNextTourStep = () => {
    if (tourStepIdx >= INTRO_TOUR_STEPS.length - 1) {
      handleCloseTour();
      triggerToast('Completed the 5-Tool Workspace Intro Tour!');
    } else {
      handleSelectTourStep(tourStepIdx + 1);
    }
  };

  const handlePrevTourStep = () => {
    if (tourStepIdx > 0) {
      handleSelectTourStep(tourStepIdx - 1);
    }
  };

  const activeHeroComparison = HERO_COMPARISONS[heroExampleIdx] || HERO_COMPARISONS[0];

  const handleCopyHeroPrompt = () => {
    navigator.clipboard.writeText(activeHeroComparison.exactPrompt);
    setCopiedHeroPrompt(true);
    triggerToast(`Copied "${activeHeroComparison.canonicalName}" AI Prompt`);
    setTimeout(() => setCopiedHeroPrompt(false), 1800);
  };

  const workspaceTools = [
    {
      id: 'encyclopedia' as const,
      step: '01',
      label: 'Live UI Sandbox',
      shortLabel: 'Sandbox',
      subtitle: `Play with ${DESIGN_TERMS.length} interactive demos & copy prompts`,
      icon: Layers,
    },
    {
      id: 'anatomy' as const,
      step: '02',
      label: 'App Anatomy X-Ray',
      shortLabel: 'X-Ray',
      subtitle: 'Click numbered pins on 4 full-screen apps',
      icon: Eye,
    },
    {
      id: 'translator' as const,
      step: '03',
      label: 'Vibe-to-Spec Translator',
      shortLabel: 'Translator',
      subtitle: 'Type a casual description → get exact UI terms',
      icon: Wand2,
    },
    {
      id: 'matrix' as const,
      step: '04',
      label: 'Pattern Cheat Sheets',
      shortLabel: 'Matrix',
      subtitle: 'Compare Modal vs Drawer vs Popover & more',
      icon: Table,
    },
    {
      id: 'contribute' as const,
      step: '05',
      label: 'Blueprints & UI Quiz',
      shortLabel: 'Blueprints',
      subtitle: 'Copy full-page specs & test your UI vocabulary',
      icon: LayoutTemplate,
    },
  ];

  const highlightedTourTab = isTourOpen ? INTRO_TOUR_STEPS[tourStepIdx]?.tabId : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] pb-20 md:pb-0">
      {/* =====================================================================
          STRICT 3-ZONE TOP BAR CONTRACT
          [Zone 1: 1-line Brand Wordmark] — [Zone 2: 5 single-line nav links] — [Zone 3: 1 primary CTA]
      ===================================================================== */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-3.5 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between gap-3 sm:gap-8">
        {/* Zone 1: Single brand anchor with vector logo + wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('encyclopedia');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 sm:gap-2.5 min-h-[44px] font-display text-base sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 group"
        >
          <LexiconLogo size={26} className="transition-transform group-hover:scale-105 shrink-0" />
          <span>LexiconUI</span>
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Primary Workspace Navigation"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
        >
          <a
            href="#encyclopedia"
            onClick={(e) => {
              e.preventDefault();
              scrollToWorkspace('encyclopedia');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeTab === 'encyclopedia'
                ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                : 'hover:text-slate-900'
            }`}
          >
            Encyclopedia
          </a>
          <a
            href="#anatomy-xray"
            onClick={(e) => {
              e.preventDefault();
              scrollToWorkspace('anatomy');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeTab === 'anatomy'
                ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                : 'hover:text-slate-900'
            }`}
          >
            Anatomy X-Ray
          </a>
          <a
            href="#prompt-translator"
            onClick={(e) => {
              e.preventDefault();
              scrollToWorkspace('translator');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeTab === 'translator'
                ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                : 'hover:text-slate-900'
            }`}
          >
            Prompt Translator
          </a>
          <a
            href="#decision-matrix"
            onClick={(e) => {
              e.preventDefault();
              scrollToWorkspace('matrix');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeTab === 'matrix'
                ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                : 'hover:text-slate-900'
            }`}
          >
            Decision Matrix
          </a>
          <a
            href="#blueprints-quiz"
            onClick={(e) => {
              e.preventDefault();
              scrollToWorkspace('contribute');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeTab === 'contribute'
                ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                : 'hover:text-slate-900'
            }`}
          >
            Blueprints &amp; Quiz
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action Button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setSpecDrawerOpen(true)}
            className="min-h-[42px] sm:min-h-[38px] px-3 sm:px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-xl sm:rounded-lg hover:bg-slate-800 active:scale-[0.99] transition-all whitespace-nowrap shrink-0 tabular-nums"
          >
            <span className="sm:hidden">Spec Sheet ({specCartIds.length})</span>
            <span className="hidden sm:inline">Export Spec Sheet ({specCartIds.length})</span>
          </button>
        </div>
      </header>

      {/* =====================================================================
          ASYMMETRIC SPLIT-SCREEN ONBOARDING HERO (PROPOSITION -> PROOF -> CTA)
      ===================================================================== */}
      <section className="border-b border-slate-200 bg-white blueprint-grid">
        <div className="max-w-[1360px] mx-auto px-3.5 sm:px-6 py-5 sm:py-9">
          {/* Top Metadata & Collapse Toggle Row */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-200/80">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono text-slate-600">
              <span className="inline-flex items-center gap-1.5 font-semibold text-sky-700">
                <LexiconLogo size={16} />
                <span>Visual UI/UX Dictionary &amp; AI Prompt-Engineering Sandbox</span>
              </span>
              <span className="text-slate-300" aria-hidden="true">
                ·
              </span>
              <span className="tabular-nums">{DESIGN_TERMS.length} Live Interactive Concepts</span>
              <span className="text-slate-300" aria-hidden="true">
                ·
              </span>
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-slate-700 hover:text-sky-700 underline underline-offset-2 font-medium"
              >
                <span>GitHub: RootDeveloperDS/LexiconUI</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleStartTour}
                className="min-h-[36px] px-3 py-1 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-lg text-xs font-semibold text-sky-800 flex items-center gap-1.5 transition-colors whitespace-nowrap"
              >
                <Compass className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>Guided Tour (5 Tools)</span>
              </button>

              <button
                type="button"
                onClick={() => setCmdPaletteOpen(true)}
                className="min-h-[36px] px-3 py-1 bg-slate-100 hover:bg-slate-200/80 border border-slate-300/80 rounded-lg text-xs text-slate-700 flex items-center gap-2 transition-colors whitespace-nowrap"
              >
                <Search className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>Search {DESIGN_TERMS.length} UI Terms...</span>
                <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-200 rounded text-slate-600">
                  ⌘K
                </kbd>
              </button>

              <button
                type="button"
                onClick={() => setIsHeroCollapsed((prev) => !prev)}
                className="min-h-[36px] px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1 whitespace-nowrap"
              >
                {isHeroCollapsed ? (
                  <>
                    <span>Show Intro Guide</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">Compact Header</span>
                    <ChevronUp className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>

          {!isHeroCollapsed && (
            <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
              {/* LEFT 7 COLUMNS: Clear Value Proposition, 3-Step Guide & Primary CTAs */}
              <div className="lg:col-span-7 min-w-0 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <h1 className="font-display text-2xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 tracking-tight text-balance leading-[1.1]">
                    Know what the UI looks like, but don&apos;t know what it&apos;s called?
                  </h1>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-[64ch]">
                    When you prompt AI coding tools with casual phrases like{' '}
                    <em className="text-slate-900 font-medium">
                      &ldquo;make boxes of different sizes&rdquo;
                    </em>{' '}
                    or{' '}
                    <em className="text-slate-900 font-medium">
                      &ldquo;add that 3-dot menu&rdquo;
                    </em>
                    , the AI guesses and builds generic layouts.{' '}
                    <strong className="text-slate-900">LexiconUI</strong> lets you visually browse{' '}
                    <strong className="text-slate-900">
                      {DESIGN_TERMS.length} real UI/UX patterns
                    </strong>
                    , test them in a live interactive sandbox, and copy the exact engineering prompt
                    in one click.
                  </p>

                  {/* 3-Step Visual Onboarding Strip ("How to use LexiconUI in 15 seconds") */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 border border-slate-200 rounded-xl bg-slate-50/80">
                    <div className="p-3.5 space-y-1">
                      <div className="text-[11px] font-mono font-bold text-sky-700">
                        STEP 01 · FIND THE NAME
                      </div>
                      <div className="font-display text-sm font-bold text-slate-900">
                        Pick or Describe a Pattern
                      </div>
                      <p className="text-xs text-slate-600 leading-snug">
                        Browse {DESIGN_TERMS.length} visual concepts by category below, or type a
                        casual description in the Vibe Translator.
                      </p>
                    </div>

                    <div className="p-3.5 space-y-1">
                      <div className="text-[11px] font-mono font-bold text-sky-700">
                        STEP 02 · TEST LIVE DEMO
                      </div>
                      <div className="font-display text-sm font-bold text-slate-900">
                        Play with the UI Sandbox
                      </div>
                      <p className="text-xs text-slate-600 leading-snug">
                        Drag live sliders, click interactive components, and inspect anatomical
                        sub-parts in real time.
                      </p>
                    </div>

                    <div className="p-3.5 space-y-1">
                      <div className="text-[11px] font-mono font-bold text-sky-700">
                        STEP 03 · COPY AI PROMPT
                      </div>
                      <div className="font-display text-sm font-bold text-slate-900">
                        Paste into Cursor / Claude
                      </div>
                      <p className="text-xs text-slate-600 leading-snug">
                        Copy the exact UI/UX prompt or combine multiple patterns into a single{' '}
                        <code className="font-mono text-slate-800">DESIGN_SPEC.md</code>.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Primary & Secondary Action Row */}
                <div className="pt-1 flex flex-wrap items-center gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => scrollToWorkspace('encyclopedia', 'interactive-sandbox-stage')}
                    className="min-h-[46px] px-4 sm:px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-display text-xs sm:text-sm font-bold shadow-sm inline-flex items-center justify-center gap-2 transition-all active:scale-[0.99] whitespace-nowrap shrink-0"
                  >
                    <Sliders className="w-4 h-4 shrink-0" />
                    <span>Explore Live UI Demos</span>
                    <ArrowDown className="w-4 h-4 shrink-0" />
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToWorkspace('encyclopedia', 'all-concepts-directory')}
                    className="min-h-[46px] px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0"
                  >
                    <Layers className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>All {DESIGN_TERMS.length} Concepts Grid ↓</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToWorkspace('translator')}
                    className="min-h-[46px] px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0"
                  >
                    <Wand2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Translate My UI Idea →</span>
                  </button>
                </div>
              </div>

              {/* RIGHT 5 COLUMNS: Interactive "Why LexiconUI Matters" Live Comparison Card */}
              <div className="lg:col-span-5 min-w-0 bg-slate-900 text-white rounded-2xl p-4 sm:p-5 border border-slate-800 flex flex-col justify-between gap-4 shadow-xl">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div className="min-w-0">
                      <div className="text-[10px] font-mono text-sky-400 font-semibold">
                        INSTANT PREVIEW · WHY EXACT TERMINOLOGY MATTERS
                      </div>
                      <h2 className="font-display text-base font-bold text-white">
                        See the Difference in 1 Click
                      </h2>
                    </div>

                    {/* Toggle Vague vs Exact (Strictly Single-Line) */}
                    <div className="inline-flex p-0.5 bg-slate-800 rounded-lg border border-slate-700 text-[11px] shrink-0">
                      <button
                        type="button"
                        onClick={() => setHeroViewMode('vague')}
                        className={`px-2.5 py-1 rounded-md font-medium transition-colors whitespace-nowrap shrink-0 ${
                          heroViewMode === 'vague'
                            ? 'bg-amber-500 text-slate-950 font-semibold'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        Vague Prompt
                      </button>
                      <button
                        type="button"
                        onClick={() => setHeroViewMode('exact')}
                        className={`px-2.5 py-1 rounded-md font-medium transition-colors whitespace-nowrap shrink-0 ${
                          heroViewMode === 'exact'
                            ? 'bg-emerald-500 text-slate-950 font-semibold'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        LexiconUI Spec
                      </button>
                    </div>
                  </div>

                  {/* 3 Relatable Mystery Examples Switcher */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-mono text-slate-400">
                      CLICK AN EVERYDAY UI MYSTERY TO TEST:
                    </div>
                    <div className="grid grid-cols-1 gap-1.5">
                      {HERO_COMPARISONS.map((item, idx) => {
                        const isSelected = idx === heroExampleIdx;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              setHeroExampleIdx(idx);
                              setHeroViewMode('exact');
                            }}
                            className={`min-h-[38px] px-3 py-2 rounded-xl text-left text-xs flex items-center justify-between gap-2 transition-colors border ${
                              isSelected
                                ? 'bg-sky-950/90 border-sky-400 text-white font-semibold'
                                : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                            }`}
                          >
                            <span className="truncate">{item.everydayQuestion}</span>
                            <span className="font-mono text-[10px] text-sky-300 whitespace-nowrap shrink-0">
                              → {item.shortBadge}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dynamic Comparison Output Box */}
                  {heroViewMode === 'vague' ? (
                    <div className="p-3.5 rounded-xl bg-amber-950/50 border border-amber-500/40 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-amber-300">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>WHAT MOST PEOPLE TYPE (VAGUE FLUFF):</span>
                      </div>
                      <p className="text-xs italic text-amber-100">
                        &ldquo;{activeHeroComparison.vaguePrompt}&rdquo;
                      </p>
                      <div className="pt-1 text-[11px] text-amber-200/90 border-t border-amber-500/20">
                        <strong>Result:</strong> {activeHeroComparison.brokenResultLabel}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-300">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span>{activeHeroComparison.canonicalName}</span>
                        </div>
                      </div>
                      <p className="text-xs font-mono text-slate-100 leading-relaxed bg-slate-950/80 p-2.5 rounded-lg border border-emerald-500/30">
                        {activeHeroComparison.exactPrompt}
                      </p>
                    </div>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={handleCopyHeroPrompt}
                    className="min-h-[38px] px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors"
                  >
                    {copiedHeroPrompt ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied Prompt!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-sky-400" />
                        <span>Copy This Prompt</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTermId(activeHeroComparison.termId);
                      scrollToWorkspace('encyclopedia', 'interactive-sandbox-stage');
                    }}
                    className="min-h-[38px] px-3.5 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <span>Open This Demo in Sandbox ↓</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          5-MODE WORKSPACE NAVIGATION DECK + PROGRAMMATIC INTRO TOUR HIGHLIGHTER
      ===================================================================== */}
      <div
        id="workspace-main-anchor"
        className="bg-slate-100/80 border-b border-slate-200 scroll-mt-16"
      >
        <div className="max-w-[1360px] mx-auto px-3 sm:px-6 py-3">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-mono font-semibold text-slate-500">
              CHOOSE YOUR INTERACTIVE WORKSPACE MODE (5 TOOLS):
            </span>
            <div className="flex items-center gap-3">
              {!isTourOpen && (
                <button
                  type="button"
                  onClick={handleStartTour}
                  className="text-[11px] font-mono font-semibold text-sky-700 hover:text-sky-900 underline underline-offset-2 inline-flex items-center gap-1"
                >
                  <Compass className="w-3 h-3" />
                  <span>Explain These 5 Tools (Tour)</span>
                </button>
              )}
              <span className="hidden sm:inline text-[11px] font-mono text-slate-500">
                Active Tool:{' '}
                <strong className="text-slate-900">
                  {workspaceTools.find((t) => t.id === activeTab)?.label}
                </strong>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {workspaceTools.map((tool, idx) => {
              const Icon = tool.icon;
              const isSelected = activeTab === tool.id;
              const isTourHighlighted = highlightedTourTab === tool.id;

              return (
                <button
                  key={tool.id}
                  id={`workspace-tool-${tool.id}`}
                  type="button"
                  onClick={() => {
                    setActiveTab(tool.id);
                    if (isTourOpen) {
                      setTourStepIdx(idx);
                    }
                  }}
                  className={`min-h-[60px] p-2.5 sm:p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-1 ${
                    isTourHighlighted
                      ? 'bg-slate-900 border-sky-400 text-white ring-4 ring-sky-400/50 shadow-lg z-10'
                      : isSelected
                      ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                      : 'bg-white border-slate-200/90 text-slate-700 hover:border-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1.5">
                    <span
                      className={`text-[10px] font-mono font-semibold ${
                        isSelected || isTourHighlighted ? 'text-sky-400' : 'text-sky-700'
                      }`}
                    >
                      TOOL {tool.step}
                      {isTourHighlighted ? ' · TOUR FOCUS' : ''}
                    </span>
                    <Icon
                      className={`w-3.5 h-3.5 shrink-0 ${
                        isSelected || isTourHighlighted ? 'text-sky-400' : 'text-slate-400'
                      }`}
                    />
                  </div>
                  <div className="font-display text-xs sm:text-sm font-bold truncate">
                    {tool.label}
                  </div>
                  <div
                    className={`hidden sm:block text-[11px] leading-tight line-clamp-1 ${
                      isSelected || isTourHighlighted ? 'text-slate-300' : 'text-slate-500'
                    }`}
                  >
                    {tool.subtitle}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Programmatic Intro Tour Component */}
          <IntroTour
            isOpen={isTourOpen}
            currentStepIdx={tourStepIdx}
            onSelectStep={handleSelectTourStep}
            onNextStep={handleNextTourStep}
            onPrevStep={handlePrevTourStep}
            onCloseTour={handleCloseTour}
            onJumpToToolSection={(tab, anchorId) => {
              handleCloseTour();
              scrollToWorkspace(tab, anchorId);
            }}
          />
        </div>
      </div>

      {/* =====================================================================
          MAIN WORKSPACE CANVAS (1360px CONTAINER WITH MOBILE PADDING)
      ===================================================================== */}
      <main className="flex-1 max-w-[1360px] w-full mx-auto px-3 sm:px-6 py-5 sm:py-8">
        {activeTab === 'encyclopedia' && (
          <EncyclopediaView
            selectedTermId={selectedTermId}
            onSelectTerm={setSelectedTermId}
            specCartIds={specCartIds}
            onToggleSpecCart={handleToggleSpecCart}
            onCopyFeedback={triggerToast}
            onOpenContribute={() => {
              setActiveTab('contribute');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'anatomy' && (
          <AnatomyInspectorView
            onJumpToTerm={handleJumpToTerm}
            specCartIds={specCartIds}
            onToggleSpecCart={handleToggleSpecCart}
            onCopyFeedback={triggerToast}
          />
        )}

        {activeTab === 'translator' && (
          <PromptTranslatorView
            onJumpToTerm={handleJumpToTerm}
            specCartIds={specCartIds}
            onAddMultipleToCart={handleAddMultipleToCart}
            onCopyFeedback={triggerToast}
          />
        )}

        {activeTab === 'matrix' && (
          <ComparisonMatrixView
            onJumpToTerm={handleJumpToTerm}
            specCartIds={specCartIds}
            onToggleSpecCart={handleToggleSpecCart}
            onCopyFeedback={triggerToast}
          />
        )}

        {activeTab === 'contribute' && (
          <ContributorStudioView
            onCopyFeedback={triggerToast}
            onJumpToTerm={handleJumpToTerm}
            onAddMultipleToCart={handleAddMultipleToCart}
            specCartIds={specCartIds}
          />
        )}
      </main>

      {/* =====================================================================
          PRODUCTION-READY FOOTER WITH EMBEDDED FEEDBACK & TELEMETRY WIDGET
      ===================================================================== */}
      <Footer
        activeTab={activeTab}
        specCartCount={specCartIds.length}
        totalConceptsCount={DESIGN_TERMS.length}
        githubRepoUrl={GITHUB_REPO_URL}
        onSelectWorkspaceTab={(tab, targetId) => scrollToWorkspace(tab, targetId)}
        onOpenCommandPalette={() => setCmdPaletteOpen(true)}
        onOpenSpecDrawer={() => setSpecDrawerOpen(true)}
      />

      {/* =====================================================================
          FIXED MOBILE BOTTOM THUMB-ZONE TAB BAR (< md VIEWPORTS)
      ===================================================================== */}
      <nav
        aria-label="Mobile Bottom Workspace Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-1.5 py-1 grid grid-cols-5 gap-1 shadow-[0_-4px_16px_rgba(15,23,42,0.06)]"
      >
        {workspaceTools.map((tool) => {
          const Icon = tool.icon;
          const isSelected = activeTab === tool.id;
          return (
            <button
              key={tool.id}
              type="button"
              onClick={() => {
                scrollToWorkspace(tool.id);
              }}
              className={`min-h-[48px] rounded-xl flex flex-col items-center justify-center gap-0.5 transition-colors ${
                isSelected
                  ? 'bg-sky-50 text-sky-800 font-semibold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon
                className={`w-4 h-4 ${isSelected ? 'text-sky-600' : 'text-slate-500'}`}
              />
              <span className="text-[10px] tracking-tight truncate max-w-full px-1">
                {tool.shortLabel}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Global Overlays: Cmd+K Command Palette + Slide-Over Spec Cart + Passive Toast */}
      <CommandPaletteModal
        isOpen={cmdPaletteOpen}
        onClose={() => setCmdPaletteOpen(false)}
        onSelectTerm={handleJumpToTerm}
        onSwitchTab={(tab) => scrollToWorkspace(tab)}
      />

      <SpecCartDrawer
        isOpen={specDrawerOpen}
        onClose={() => setSpecDrawerOpen(false)}
        specCartIds={specCartIds}
        onToggleSpecCart={handleToggleSpecCart}
        onClearCart={() => {
          setSpecCartIds([]);
          triggerToast('Cleared Prompt Spec Sheet');
        }}
        onJumpToTerm={handleJumpToTerm}
        onCopyFeedback={triggerToast}
      />

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-20 md:bottom-5 left-3.5 right-3.5 sm:left-auto sm:right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-2.5 text-xs font-medium"
        >
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="truncate">{toastMessage}</span>
        </div>
      )}

      <Analytics />
    </div>
  );
}
