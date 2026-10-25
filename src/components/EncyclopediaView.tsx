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
  Terminal,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import {
  DESIGN_TERMS,
  CATEGORY_META,
  DesignTerm,
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

  const activeTerm = useMemo(
    () => DESIGN_TERMS.find((t) => t.id === selectedTermId) || DESIGN_TERMS[0],
    [selectedTermId]
  );

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

  return (
    <div className="space-y-10">
      {/* =====================================================================
          TWO-ZONE INTERACTIVE SANDBOX & SPEC STAGE (FOCAL ANCHOR)
      ===================================================================== */}
      <section
        id="interactive-sandbox-stage"
        className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs"
      >
        {/* Top Stage Bar */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/70 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-mono text-xs font-semibold text-sky-700">
              {activeTerm.number}.
            </span>
            <h2 className="font-display text-xl font-bold text-slate-900 tracking-tight truncate">
              {activeTerm.title}
            </h2>
            <span className="hidden sm:inline text-slate-300" aria-hidden="true">
              ·
            </span>
            <span className="hidden sm:inline text-xs text-slate-500 truncate">
              {activeTerm.categoryLabel} · {activeTerm.difficulty}
            </span>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setShowBlueprint((b) => !b)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                showBlueprint
                  ? 'bg-sky-50 border-sky-300 text-sky-900'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              <Ruler className="w-3.5 h-3.5 text-sky-600" />
              <span>{showBlueprint ? 'Blueprint Rulers: On' : 'Blueprint Rulers: Off'}</span>
            </button>

            <button
              type="button"
              onClick={() => onToggleSpecCart(activeTerm.id)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                inCart
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'bg-slate-900 border-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              {inCart ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>In Spec Cart</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Prompt Spec</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Two-Zone Split Body: Left Interactive Stage (7 cols) | Right Prompt & Code Deck (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
          {/* LEFT ZONE: Interactive Stage + Parameter Controls + Anatomy Sub-Parts */}
          <div className="lg:col-span-7 p-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Architectural Summary & Alias */}
              <div className="space-y-1.5">
                <div className="text-xs font-mono text-slate-500">
                  Formal Architecture Alias:{' '}
                  <strong className="text-slate-800">{activeTerm.pronunciationOrAlias}</strong>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed max-w-[68ch]">
                  {activeTerm.summary}
                </p>
              </div>

              {/* Live Specimen Canvas */}
              <div
                className={`p-5 rounded-xl border border-slate-200/90 transition-colors ${
                  showBlueprint ? 'blueprint-grid bg-[#F8FAFC]' : 'bg-slate-50/60'
                }`}
              >
                <InteractiveStage
                  term={activeTerm}
                  controlValues={controlValues}
                  showBlueprint={showBlueprint}
                />
              </div>

              {/* Interactive Sandbox Controls Deck */}
              {activeTerm.sandboxControls.length > 0 && (
                <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-900">
                      <Sliders className="w-3.5 h-3.5 text-sky-600" />
                      <span>Interactive Parameter Controls</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleResetControls}
                      className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 font-mono"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset Defaults</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    {activeTerm.sandboxControls.map((ctrl) => {
                      const val = controlValues[ctrl.id] ?? ctrl.defaultValue;
                      return (
                        <div key={ctrl.id} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <label
                              htmlFor={`ctrl-${ctrl.id}`}
                              className="font-medium text-slate-700"
                            >
                              {ctrl.label}
                            </label>
                            {ctrl.type === 'slider' && (
                              <span className="font-mono font-semibold text-sky-700 tabular-nums">
                                {val}
                                {ctrl.unit || ''}
                              </span>
                            )}
                          </div>

                          {ctrl.type === 'slider' ? (
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
                              className="w-full accent-sky-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                            />
                          ) : (
                            <select
                              id={`ctrl-${ctrl.id}`}
                              value={String(val)}
                              onChange={(e) => handleControlChange(ctrl.id, e.target.value)}
                              className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-sky-600"
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

            {/* Anatomical Sub-Parts Breakdown */}
            <div className="space-y-2.5 pt-2 border-t border-slate-200">
              <div className="text-xs font-mono font-semibold text-slate-500">
                COMPONENT ANATOMY & SUB-PARTS (USE THESE NAMES WHEN PROMPTING)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeTerm.anatomyParts.map((part, idx) => (
                  <div
                    key={part.name}
                    className="p-3 rounded-lg border border-slate-200 bg-white flex flex-col justify-between gap-1.5"
                  >
                    <div>
                      <div className="text-xs font-display font-bold text-slate-900">
                        0{idx + 1}. {part.name}
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5 leading-snug">{part.role}</p>
                    </div>
                    <code className="text-[11px] font-mono text-sky-700 bg-sky-50/70 px-2 py-0.5 rounded w-fit">
                      {part.cssHint}
                    </code>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT ZONE: Prompt Engineering Comparison & CSS Token Deck */}
          <div className="lg:col-span-5 p-6 bg-slate-50/40 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              {/* Colloquial Vibe Phrases ("What you might have been calling it") */}
              <div className="space-y-2">
                <div className="text-xs font-mono font-semibold text-slate-500">
                  CASUAL &ldquo;VIBE PHRASES&rdquo; THAT MAP TO THIS TERM
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  {activeTerm.vibePhrases.map((phrase, i) => (
                    <React.Fragment key={phrase}>
                      {i > 0 && <span className="mx-2 text-slate-300">·</span>}
                      <span className="italic text-slate-700">&ldquo;{phrase}&rdquo;</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Don't Say (Fluff) vs. Do Say (Exact UI/UX Agent Spec) */}
              <div className="space-y-3">
                {/* Bad / Fluffy Prompt */}
                <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/60 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-amber-800">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                    <span>VAGUE VIBE PROMPT (CAUSES AI HALLUCINATION)</span>
                  </div>
                  <p className="text-xs text-amber-950/90 italic leading-relaxed">
                    &ldquo;{activeTerm.badPromptExample}&rdquo;
                  </p>
                </div>

                {/* Good / Exact Spec Prompt */}
                <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/60 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-900">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                      <span>EXACT UI/UX AGENT PROMPT</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyPrompt}
                      className="px-2.5 py-1 text-xs font-semibold rounded-md bg-emerald-800 text-white hover:bg-emerald-900 transition-colors flex items-center gap-1.5 whitespace-nowrap"
                    >
                      {copiedPrompt ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Copied Prompt</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Agent Prompt</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs font-mono text-slate-900 leading-relaxed whitespace-pre-line bg-white/90 p-3 rounded-lg border border-emerald-200">
                    {compiledDynamicPrompt}
                  </p>
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
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-600">
                  <Code2 className="w-3.5 h-3.5 text-sky-600" />
                  <span>CANONICAL CSS & TAILWIND TOKENS</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyCss}
                  className="text-xs font-mono text-sky-700 hover:text-sky-900 flex items-center gap-1"
                >
                  {copiedCss ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Copied CSS</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy CSS</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-3.5 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono overflow-x-auto leading-relaxed">
                <code>{activeTerm.cssSnippet}</code>
              </pre>

              <div className="text-xs text-slate-500 font-mono pt-1">
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
          CURRICULUM DIRECTORY & FILTER BAR (DYNAMIC CONCEPT COUNT)
      ===================================================================== */}
      <section className="space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          {/* Segmented Category Filter */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/75 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap tabular-nums ${
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
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap tabular-nums ${
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

          {/* Live Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search term or vibe ("accordion", "kebab", "hud", "cmd+k")...'
              className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-600"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Concept Cards Grid */}
        {filteredTerms.length === 0 ? (
          <div className="border border-dashed border-slate-300 rounded-2xl bg-white p-12 text-center space-y-3">
            <div className="text-base font-display font-bold text-slate-900">
              No UI/UX terminology matched &ldquo;{searchQuery}&rdquo;
            </div>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try searching by a casual description in the Vibe-to-Spec Translator, reset your
              active category filters, or contribute this concept in the OSS Contributor Studio!
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="px-4 py-2 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                Reset All Filters
              </button>
              {onOpenContribute && (
                <button
                  type="button"
                  onClick={onOpenContribute}
                  className="px-4 py-2 text-xs font-semibold bg-sky-50 text-sky-800 border border-sky-200 rounded-lg hover:bg-sky-100 transition-colors"
                >
                  + Contribute This Concept
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                      ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                  }}
                  className={`group cursor-pointer p-5 rounded-xl border transition-all flex flex-col justify-between gap-4 ${
                    isCurrent
                      ? 'bg-white border-sky-600 ring-2 ring-sky-600/15'
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
                    <h3 className="font-display text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors flex items-center justify-between">
                      <span>{term.title}</span>
                      <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                    </h3>

                    {/* Summary */}
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {term.summary}
                    </p>

                    {/* Casual Vibe Example */}
                    <div className="pt-1 text-[11px] text-slate-500">
                      <span className="font-mono text-slate-400">Vibe: </span>
                      <span className="italic">&ldquo;{term.vibePhrases[0]}&rdquo;</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-sky-700 font-medium">
                      {isCurrent ? 'Active on Sandbox Stage' : 'Load in Sandbox →'}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSpecCart(term.id);
                      }}
                      className={`px-2.5 py-1 text-[11px] font-medium rounded-md border transition-colors whitespace-nowrap ${
                        isAdded
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {isAdded ? 'In Spec Cart ✓' : '+ Spec Cart'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Open-Source Community Callout Banner */}
        {onOpenContribute && (
          <div className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
            <div className="space-y-1 max-w-2xl">
              <div className="text-xs font-mono text-sky-700 font-semibold">
                OPEN-SOURCE COMMUNITY ENCYCLOPEDIA · BUILT BY &amp; FOR VIBE CODERS
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900">
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
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap self-start md:self-center shrink-0"
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
