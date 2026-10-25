import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Copy,
  Check,
  Plus,
  Ruler,
  Sliders,
  Code2,
  ArrowUpRight,
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MousePointerClick,
  LayoutGrid,
} from 'lucide-react';
import {
  DESIGN_TERMS,
  CATEGORY_META,
  TermCategory,
} from '../data/termsData';
import { InteractiveStage } from './InteractiveStage';

interface EncyclopediaViewProps {
  selectedTermId: string;
  onSelectTerm: (termId: string) => void;
  specCartIds: string[];
  onToggleSpecCart: (termId: string) => void;
  onCopyFeedback: (label: string) => void;
  onOpenContribute?: () => void;
}

export const EncyclopediaView: React.FC<EncyclopediaViewProps> = ({
  selectedTermId,
  onSelectTerm,
  specCartIds,
  onToggleSpecCart,
  onCopyFeedback,
  onOpenContribute,
}) => {
  const [activeCategory, setActiveCategory] = useState<TermCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showBlueprint, setShowBlueprint] = useState(true);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedCss, setCopiedCss] = useState(false);

  const activeTermIndex = useMemo(() => {
    const idx = DESIGN_TERMS.findIndex((t) => t.id === selectedTermId);
    return idx >= 0 ? idx : 0;
  }, [selectedTermId]);

  const activeTerm = DESIGN_TERMS[activeTermIndex] || DESIGN_TERMS[0];

  const handleStepTerm = (delta: number) => {
    const nextIdx = (activeTermIndex + delta + DESIGN_TERMS.length) % DESIGN_TERMS.length;
    onSelectTerm(DESIGN_TERMS[nextIdx].id);
  };

  // Initialize sandbox control values whenever activeTerm changes
  const [controlValues, setControlValues] = useState<Record<string, number | string>>({});

  useEffect(() => {
    const initial: Record<string, number | string> = {};
    activeTerm.sandboxControls.forEach((ctrl) => {
      initial[ctrl.id] = ctrl.defaultValue;
    });
    setControlValues(initial);
  }, [activeTerm]);

  const handleControlChange = (id: string, value: number | string) => {
    setControlValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleResetControls = () => {
    const reset: Record<string, number | string> = {};
    activeTerm.sandboxControls.forEach((ctrl) => {
      reset[ctrl.id] = ctrl.defaultValue;
    });
    setControlValues(reset);
  };

  // Build dynamic AI Agent prompt incorporating active sandbox control settings
  const compiledDynamicPrompt = useMemo(() => {
    const paramSummary = activeTerm.sandboxControls
      .map((c) => {
        const val = controlValues[c.id] ?? c.defaultValue;
        return `${c.label}: ${val}${c.unit || ''}`;
      })
      .join(', ');

    if (!paramSummary) return activeTerm.goodPromptExample;
    return `${activeTerm.goodPromptExample}\n\n/* Active Sandbox Spec Parameters: ${paramSummary} */`;
  }, [activeTerm, controlValues]);

  const filteredTerms = useMemo(() => {
    return DESIGN_TERMS.filter((term) => {
      const matchesCat = activeCategory === 'all' || term.category === activeCategory;
      if (!matchesCat) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        term.title.toLowerCase().includes(q) ||
        term.pronunciationOrAlias.toLowerCase().includes(q) ||
        term.summary.toLowerCase().includes(q) ||
        term.vibePhrases.some((v) => v.toLowerCase().includes(q)) ||
        term.tailwindTokens.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [activeCategory, searchQuery]);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(compiledDynamicPrompt);
    setCopiedPrompt(true);
    onCopyFeedback(`Copied "${activeTerm.title}" AI prompt spec`);
    setTimeout(() => setCopiedPrompt(false), 1800);
  };

  const handleCopyCss = () => {
    navigator.clipboard.writeText(activeTerm.cssSnippet);
    setCopiedCss(true);
    onCopyFeedback(`Copied "${activeTerm.title}" CSS tokens`);
    setTimeout(() => setCopiedCss(false), 1800);
  };

  const inCart = specCartIds.includes(activeTerm.id);

  // Contextual human coaching string explaining how to interact with the active concept demo
  const interactionCoachText = useMemo(() => {
    const controlNames = activeTerm.sandboxControls.map((c) => `"${c.label}"`).join(' and ');
    if (controlNames) {
      return `Click interactive elements directly inside the live preview below, and adjust ${controlNames} in the control deck underneath to watch both the UI and the AI prompt update in real time.`;
    }
    return 'Click and interact directly with the live UI specimen below to test its behavior and states.';
  }, [activeTerm]);

  return (
    <div className="space-y-6 sm:space-y-9">
      {/* =====================================================================
          STEP 1: TOP CONCEPT EXPLORER & CATEGORY SWITCHER RIBBON
          Placed ABOVE the sandbox so users immediately see all 42 concepts
          and can switch categories/concepts without scrolling to the bottom!
      ===================================================================== */}
      <section className="bg-white border border-slate-200 rounded-2xl p-3.5 sm:p-5 space-y-3.5 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-200 pb-3.5">
          <div className="space-y-0.5">
            <div className="text-[11px] font-mono font-bold text-sky-700">
              STEP 01 · PICK ANY UI/UX CONCEPT TO LOAD ITS LIVE DEMO BELOW ({DESIGN_TERMS.length}{' '}
              CONCEPTS)
            </div>
            <h2 className="font-display text-base sm:text-lg font-bold text-slate-900">
              Filter by Category or Click Any Concept Card in the Strip Below
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Filter ("accordion", "kebab", "hud")...'
                className="w-full min-h-[38px] pl-8 pr-12 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-600"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="px-2 absolute right-1 top-1/2 -translate-y-1/2 text-[11px] font-medium text-slate-500 hover:text-slate-900"
                >
                  Clear
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                document
                  .getElementById('all-concepts-directory')
                  ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="min-h-[38px] px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-semibold text-slate-800 flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 transition-colors"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-sky-600" />
              <span>View Full {DESIGN_TERMS.length}-Card Grid ↓</span>
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 overflow-x-auto no-scrollbar snap-x">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`min-h-[38px] sm:min-h-[34px] px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap tabular-nums shrink-0 snap-start ${
              activeCategory === 'all'
                ? 'bg-slate-900 text-white shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All {DESIGN_TERMS.length} Concepts
          </button>
          {(Object.keys(CATEGORY_META) as TermCategory[]).map((catKey) => {
            const meta = CATEGORY_META[catKey];
            const isSelected = activeCategory === catKey;
            const dynamicCategoryCount = DESIGN_TERMS.filter(
              (t) => t.category === catKey
            ).length;
            return (
              <button
                key={catKey}
                type="button"
                onClick={() => setActiveCategory(catKey)}
                className={`min-h-[38px] sm:min-h-[34px] px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap tabular-nums shrink-0 snap-start ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {meta.shortLabel} ({dynamicCategoryCount})
              </button>
            );
          })}
        </div>

        {/* Always-Visible Horizontal Interactive Concept Carousel */}
        {filteredTerms.length === 0 ? (
          <div className="p-4 rounded-xl border border-dashed border-slate-300 text-center flex flex-wrap items-center justify-center gap-3 text-xs text-slate-600">
            <span>No concepts matched &ldquo;{searchQuery}&rdquo; in this category.</span>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-900 text-white font-semibold"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="flex items-stretch gap-2.5 overflow-x-auto pb-1.5 pt-0.5 no-scrollbar snap-x">
            {filteredTerms.map((term) => {
              const isSelected = term.id === activeTerm.id;
              return (
                <button
                  key={term.id}
                  type="button"
                  onClick={() => onSelectTerm(term.id)}
                  className={`min-w-[210px] sm:min-w-[235px] max-w-[250px] p-3 rounded-xl border text-left transition-all shrink-0 snap-start flex flex-col justify-between gap-1.5 ${
                    isSelected
                      ? 'bg-sky-50/90 border-sky-600 ring-2 ring-sky-600/20 shadow-2xs'
                      : 'bg-slate-50/60 border-slate-200 hover:bg-white hover:border-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
                    <span
                      className={`font-bold tabular-nums ${
                        isSelected ? 'text-sky-700' : 'text-slate-500'
                      }`}
                    >
                      CONCEPT {term.number}
                    </span>
                    <span
                      className={`truncate ${
                        isSelected ? 'text-sky-800 font-semibold' : 'text-slate-400'
                      }`}
                    >
                      {isSelected ? 'ACTIVE DEMO' : term.category}
                    </span>
                  </div>
                  <div className="font-display text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {term.title}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate italic">
                    &ldquo;{term.vibePhrases[0]}&rdquo;
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* =====================================================================
          STEP 2 & STEP 3: TWO-ZONE INTERACTIVE SANDBOX & PROMPT STAGE
          Left 7 Cols = Framed Live Interactive Demo Stage (Dominant Focal Anchor)
          Right 5 Cols = Exact AI Agent Prompt & CSS Output
      ===================================================================== */}
      <section
        id="interactive-sandbox-stage"
        className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm scroll-mt-16"
      >
        {/* Top Concept Header & Quick Stepper Bar */}
        <div className="px-3.5 sm:px-6 py-4 border-b border-slate-200 bg-slate-50/80 space-y-3">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="space-y-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-mono">
                <span className="font-bold text-sky-700 tabular-nums">
                  ACTIVE CONCEPT {activeTerm.number} OF {DESIGN_TERMS.length}
                </span>
                <span aria-hidden="true">·</span>
                <span className="truncate font-medium text-slate-700">
                  {activeTerm.categoryLabel}
                </span>
                <span aria-hidden="true">·</span>
                <span>{activeTerm.difficulty}</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                {activeTerm.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-[72ch]">
                <strong className="text-slate-800 font-mono text-xs">
                  [{activeTerm.pronunciationOrAlias}]
                </strong>{' '}
                — {activeTerm.summary}
              </p>
            </div>

            {/* Concept Stepper + Add to Spec Cart */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <div className="inline-flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => handleStepTerm(-1)}
                  className="min-h-[38px] px-2.5 rounded-lg hover:bg-slate-100 text-xs font-medium text-slate-700 flex items-center gap-1 transition-colors"
                  aria-label="Previous Concept"
                >
                  <ChevronLeft className="w-4 h-4 text-slate-600" />
                  <span>Prev</span>
                </button>
                <select
                  aria-label="Jump to any UI/UX Concept"
                  value={activeTerm.id}
                  onChange={(e) => onSelectTerm(e.target.value)}
                  className="min-h-[38px] max-w-[160px] sm:max-w-[210px] px-2 py-1 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600 truncate"
                >
                  {DESIGN_TERMS.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.number}. {t.title}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => handleStepTerm(1)}
                  className="min-h-[38px] px-2.5 rounded-lg hover:bg-slate-100 text-xs font-medium text-slate-700 flex items-center gap-1 transition-colors"
                  aria-label="Next Concept"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => onToggleSpecCart(activeTerm.id)}
                className={`min-h-[42px] px-3.5 py-2 text-xs font-semibold rounded-xl border transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap ${
                  inCart
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-slate-900 border-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                {inCart ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>In Spec Sheet ✓</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5 shrink-0" />
                    <span>Add to Spec Sheet</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Two-Zone Split Body: Left Interactive Stage (7 cols) | Right Prompt & Code Deck (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
          {/* =================================================================
              LEFT ZONE (7 COLS): STEP 02 · LIVE INTERACTIVE UI/UX DEMO STAGE
              Framed in high-contrast dark slate so it is the #1 visual anchor!
          ================================================================= */}
          <div className="lg:col-span-7 p-3.5 sm:p-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              {/* High-Contrast Interactive Demo Viewport Frame */}
              <div className="rounded-2xl bg-slate-900 p-1.5 sm:p-2.5 shadow-lg border border-slate-800 space-y-2">
                {/* Dark Viewport Header Bar */}
                <div className="px-3 py-2 flex flex-wrap items-center justify-between gap-2 text-white">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="px-2 py-0.5 rounded bg-sky-500 text-slate-950 font-mono text-[10px] font-bold tracking-wide shrink-0">
                      STEP 02 · LIVE DEMO
                    </span>
                    <span className="font-display text-xs sm:text-sm font-bold text-white truncate">
                      Interactive UI/UX Specimen: {activeTerm.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => setShowBlueprint((b) => !b)}
                      className={`min-h-[32px] px-2.5 py-1 text-[11px] font-mono rounded-lg border transition-colors flex items-center gap-1.5 ${
                        showBlueprint
                          ? 'bg-sky-500/20 border-sky-400 text-sky-300 font-semibold'
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                      }`}
                    >
                      <Ruler className="w-3 h-3 text-sky-400 shrink-0" />
                      <span>{showBlueprint ? 'Rulers: ON' : 'Rulers: OFF'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleResetControls}
                      className="min-h-[32px] px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-[11px] font-mono text-slate-300 hover:text-white flex items-center gap-1"
                      title="Reset demo parameters to default"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  </div>
                </div>

                {/* Contextual "How to Interact with This Demo" Coach Bar */}
                <div className="mx-1 px-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700/80 flex items-start sm:items-center gap-2.5 text-xs text-slate-200">
                  <MousePointerClick className="w-4 h-4 text-sky-400 shrink-0 mt-0.5 sm:mt-0" />
                  <span className="leading-snug">
                    <strong className="text-sky-300">How to interact:</strong>{' '}
                    {interactionCoachText}
                  </span>
                </div>

                {/* Live Interactive Specimen Canvas */}
                <div
                  className={`p-3 sm:p-5 rounded-xl border border-slate-200 transition-colors overflow-x-auto ${
                    showBlueprint ? 'blueprint-grid bg-[#F8FAFC]' : 'bg-white'
                  }`}
                >
                  <InteractiveStage
                    term={activeTerm}
                    controlValues={controlValues}
                    showBlueprint={showBlueprint}
                  />
                </div>

                {/* Integrated Live Parameter Sliders & Controls (Inside the Stage Frame) */}
                {activeTerm.sandboxControls.length > 0 && (
                  <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3 text-white">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-xs font-mono font-semibold text-sky-400">
                        <Sliders className="w-3.5 h-3.5 shrink-0" />
                        <span>
                          ADJUST LIVE DEMO PARAMETERS (UPDATES UI ABOVE &amp; PROMPT ON RIGHT)
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                      {activeTerm.sandboxControls.map((ctrl) => {
                        const val = controlValues[ctrl.id] ?? ctrl.defaultValue;
                        return (
                          <div
                            key={ctrl.id}
                            className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2"
                          >
                            <div className="flex items-center justify-between text-xs">
                              <label
                                htmlFor={`ctrl-${ctrl.id}`}
                                className="font-medium text-slate-200"
                              >
                                {ctrl.label}
                              </label>
                              {ctrl.type === 'slider' && (
                                <span className="font-mono font-bold text-sky-400 tabular-nums px-2 py-0.5 rounded bg-sky-950/80 border border-sky-800">
                                  {val}
                                  {ctrl.unit || ''}
                                </span>
                              )}
                            </div>

                            {ctrl.type === 'slider' ? (
                              <div className="py-1.5 flex items-center">
                                <input
                                  id={`ctrl-${ctrl.id}`}
                                  type="range"
                                  min={ctrl.min}
                                  max={ctrl.max}
                                  step={ctrl.step}
                                  value={Number(val)}
                                  onChange={(e) =>
                                    handleControlChange(ctrl.id, Number(e.target.value))
                                  }
                                  className="w-full accent-sky-400 cursor-pointer h-2 bg-slate-700 rounded-lg"
                                />
                              </div>
                            ) : (
                              <select
                                id={`ctrl-${ctrl.id}`}
                                value={String(val)}
                                onChange={(e) => handleControlChange(ctrl.id, e.target.value)}
                                className="w-full min-h-[40px] px-3 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
                              >
                                {ctrl.options?.map((opt) => (
                                  <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </option>
                                ))}
                              </select>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Anatomical Sub-Parts Breakdown (Secondary Reference Below Stage) */}
            <div className="space-y-2.5 pt-2">
              <div className="text-[11px] sm:text-xs font-mono font-semibold text-slate-500">
                COMPONENT ANATOMY &amp; SUB-PARTS (NAMES TO USE IN FOLLOW-UP PROMPTS)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeTerm.anatomyParts.map((part, idx) => (
                  <div
                    key={part.name}
                    className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between gap-2"
                  >
                    <div>
                      <div className="text-xs font-display font-bold text-slate-900">
                        0{idx + 1}. {part.name}
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5 leading-snug">{part.role}</p>
                    </div>
                    <code className="text-[11px] font-mono text-sky-700 bg-white border border-slate-200 px-2 py-0.5 rounded w-fit break-all">
                      {part.cssHint}
                    </code>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* =================================================================
              RIGHT ZONE (5 COLS): STEP 03 · COPY EXACT AI AGENT PROMPT & CODE
          ================================================================= */}
          <div className="lg:col-span-5 p-3.5 sm:p-6 bg-slate-50/50 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Step 03 Header */}
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-emerald-800">
                  <span>STEP 03 · COPY THE EXACT AI AGENT PROMPT</span>
                </div>
                <h4 className="font-display text-base sm:text-lg font-bold text-slate-900">
                  Stop typing vague descriptions — paste this exact spec instead
                </h4>
              </div>

              {/* Good / Exact Spec Prompt (Primary Action Card) */}
              <div className="p-4 rounded-2xl border-2 border-emerald-500/80 bg-white shadow-sm space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span>COPY-READY AI PROMPT (WORKS FIRST TRY)</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyPrompt}
                    className="min-h-[42px] px-4 py-2 text-xs font-bold rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-2xs"
                  >
                    {copiedPrompt ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Exact AI Prompt</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs font-mono text-slate-900 leading-relaxed whitespace-pre-line bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-200 break-words">
                  {compiledDynamicPrompt}
                </p>
              </div>

              {/* Don't Say (Fluff) Contrast Card */}
              <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/60 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-amber-900">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                  <span>WHAT MOST PEOPLE TYPE (CAUSES AI HALLUCINATION)</span>
                </div>
                <p className="text-xs text-amber-950/90 italic leading-relaxed">
                  &ldquo;{activeTerm.badPromptExample}&rdquo;
                </p>
              </div>

              {/* Colloquial Vibe Phrases ("What you might have been calling it") */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1.5">
                <div className="text-[11px] font-mono font-semibold text-slate-500">
                  COMMON PHRASES PEOPLE SEARCH WHEN LOOKING FOR THIS UI:
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  {activeTerm.vibePhrases.map((phrase, i) => (
                    <React.Fragment key={phrase}>
                      {i > 0 && <span className="mx-2 text-slate-300">·</span>}
                      <span className="italic text-slate-800">&ldquo;{phrase}&rdquo;</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Why AI Agents Need It */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
                <div className="text-xs font-semibold text-slate-900">
                  Why This Term Changes AI Output Quality
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {activeTerm.whyAgentsNeedIt}
                </p>
              </div>
            </div>

            {/* CSS & Tailwind Implementation Snippet */}
            <div className="space-y-2.5 pt-3 border-t border-slate-200">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-600">
                  <Code2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>CANONICAL CSS &amp; TAILWIND TOKENS</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyCss}
                  className="min-h-[38px] sm:min-h-[32px] px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-mono text-sky-700 hover:text-sky-900 flex items-center gap-1.5 shrink-0"
                >
                  {copiedCss ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied CSS</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy CSS</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-3.5 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono overflow-x-auto leading-relaxed">
                <code>{activeTerm.cssSnippet}</code>
              </pre>

              <div className="text-xs text-slate-500 font-mono pt-1 leading-relaxed break-words">
                Tokens:{' '}
                {activeTerm.tailwindTokens.map((tok, i) => (
                  <React.Fragment key={tok}>
                    {i > 0 && <span className="mx-1.5 text-slate-300">·</span>}
                    <span className="text-slate-800">{tok}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          FULL 42-CONCEPT VISUAL DIRECTORY GRID (#all-concepts-directory)
      ===================================================================== */}
      <section id="all-concepts-directory" className="space-y-4 sm:space-y-5 scroll-mt-16">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="text-xs font-mono text-sky-700 font-semibold">
              COMPLETE UI/UX ENCYCLOPEDIA DIRECTORY ({filteredTerms.length} OF {DESIGN_TERMS.length}{' '}
              CONCEPTS SHOWN)
            </div>
            <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900">
              Click any concept card below to load its Live Interactive Demo on the stage
            </h3>
          </div>

          {/* Segmented Category Filter */}
          <div className="flex items-center gap-1 p-1 bg-slate-200/75 rounded-xl border border-slate-200 overflow-x-auto no-scrollbar snap-x">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`min-h-[40px] sm:min-h-[34px] px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap tabular-nums shrink-0 snap-start ${
                activeCategory === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All {DESIGN_TERMS.length} Concepts
            </button>
            {(Object.keys(CATEGORY_META) as TermCategory[]).map((catKey) => {
              const meta = CATEGORY_META[catKey];
              const isSelected = activeCategory === catKey;
              const dynamicCategoryCount = DESIGN_TERMS.filter(
                (t) => t.category === catKey
              ).length;
              return (
                <button
                  key={catKey}
                  type="button"
                  onClick={() => setActiveCategory(catKey)}
                  className={`min-h-[40px] sm:min-h-[34px] px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap tabular-nums shrink-0 snap-start ${
                    isSelected
                      ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {meta.shortLabel} ({dynamicCategoryCount})
                </button>
              );
            })}
          </div>
        </div>

        {/* Concept Cards Grid */}
        {filteredTerms.length === 0 ? (
          <div className="border border-dashed border-slate-300 rounded-2xl bg-white p-8 sm:p-12 text-center space-y-3">
            <div className="text-base font-display font-bold text-slate-900">
              No UI/UX terminology matched &ldquo;{searchQuery}&rdquo;
            </div>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try searching by a casual description in the Vibe-to-Spec Translator, reset your
              active category filters, or contribute this concept in the OSS Contributor Studio!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="min-h-[42px] px-4 py-2 text-xs font-semibold bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors"
              >
                Reset All Filters
              </button>
              {onOpenContribute && (
                <button
                  type="button"
                  onClick={onOpenContribute}
                  className="min-h-[42px] px-4 py-2 text-xs font-semibold bg-sky-50 text-sky-800 border border-sky-200 rounded-xl hover:bg-sky-100 transition-colors"
                >
                  + Contribute This Concept
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {filteredTerms.map((term) => {
              const isCurrent = term.id === activeTerm.id;
              const isAdded = specCartIds.includes(term.id);

              return (
                <div
                  key={term.id}
                  onClick={() => {
                    onSelectTerm(term.id);
                    document
                      .getElementById('interactive-sandbox-stage')
                      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`group cursor-pointer p-4 sm:p-5 rounded-xl border transition-all flex flex-col justify-between gap-4 ${
                    isCurrent
                      ? 'bg-sky-50/40 border-sky-600 ring-2 ring-sky-600/15'
                      : 'bg-white border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <div className="space-y-2">
                    {/* Unboxed Metadata Kicker */}
                    <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                      <span>
                        {term.number}. {term.categoryLabel}
                      </span>
                      <span>{term.difficulty}</span>
                    </div>

                    {/* Card Title */}
                    <h4 className="font-display text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors flex items-center justify-between gap-2">
                      <span>{term.title}</span>
                      <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                    </h4>

                    {/* Summary */}
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {term.summary}
                    </p>

                    {/* Casual Vibe Example */}
                    <div className="pt-1 text-[11px] text-slate-500">
                      <span className="font-mono text-slate-400">Casual phrase: </span>
                      <span className="italic text-slate-700">
                        &ldquo;{term.vibePhrases[0]}&rdquo;
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-semibold text-sky-700">
                      {isCurrent ? '● Active on Live Stage ↑' : 'Open Live UI Demo →'}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSpecCart(term.id);
                      }}
                      className={`min-h-[38px] sm:min-h-[32px] px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap ${
                        isAdded
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-semibold'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {isAdded ? 'In Spec Sheet ✓' : '+ Add to Spec'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Open-Source Community Callout Banner */}
        {onOpenContribute && (
          <div className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
            <div className="space-y-1 max-w-2xl">
              <div className="text-xs font-mono text-sky-700 font-semibold">
                OPEN-SOURCE COMMUNITY ENCYCLOPEDIA · BUILT BY &amp; FOR VIBE CODERS
              </div>
              <h3 className="font-display text-base sm:text-lg font-bold text-slate-900">
                Know a UI/UX concept we missed, or have an idea to make LexiconUI even more useful?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Contributors can add new everyday mystery UI patterns, futuristic sci-fi HUD
                components, richer interactive sandboxes, agent rule exporters (
                <code className="font-mono text-slate-800">.cursorrules</code> /{' '}
                <code className="font-mono text-slate-800">CLAUDE.md</code>), or UI/UX convenience
                improvements.
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenContribute}
              className="min-h-[44px] w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap self-start md:self-center shrink-0"
            >
              <span>Open OSS Contributor Studio</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
