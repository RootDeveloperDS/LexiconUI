import React, { useState } from 'react';
import { COMPARISON_GROUPS } from '../data/anatomyData';
import { Copy, Check, ArrowUpRight } from 'lucide-react';

interface ComparisonMatrixViewProps {
  onJumpToTerm: (termId: string) => void;
  specCartIds: string[];
  onToggleSpecCart: (termId: string) => void;
  onCopyFeedback: (label: string) => void;
}

export const ComparisonMatrixView: React.FC<ComparisonMatrixViewProps> = ({
  onJumpToTerm,
  specCartIds,
  onToggleSpecCart,
  onCopyFeedback,
}) => {
  const [copiedPhrase, setCopiedPhrase] = useState<string | null>(null);

  const handleCopyPhrase = (phrase: string, name: string) => {
    navigator.clipboard.writeText(phrase);
    setCopiedPhrase(name);
    onCopyFeedback(`Copied "${name}" prompt phrase`);
    setTimeout(() => setCopiedPhrase(null), 1800);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 space-y-1.5">
        <div className="text-xs font-mono text-sky-700 font-semibold">
          ARCHITECTURAL DECISION MATRICES
        </div>
        <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          When to use which UI/UX pattern (and stop calling everything a &ldquo;popup&rdquo; or
          &ldquo;box&rdquo;)
        </h2>
        <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
          Use these side-by-side comparison matrices to select the exact component that matches your
          interruption budget, data density, and user workflow.
        </p>
      </div>

      {/* Comparison Matrix Sections */}
      <div className="space-y-6 sm:space-y-8">
        {COMPARISON_GROUPS.map((group, gIdx) => (
          <section
            key={group.id}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs"
          >
            <div className="px-4 sm:px-6 py-4 border-b border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div>
                <h3 className="font-display text-base sm:text-lg font-bold text-slate-900">
                  0{gIdx + 1}. {group.title}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">{group.subtitle}</p>
              </div>
              <span className="text-xs font-mono text-sky-700 bg-sky-50 border border-sky-200 px-3 py-1.5 rounded-lg self-start sm:self-auto">
                Decision Question: {group.question}
              </span>
            </div>

            {/* MOBILE CARD STACK VIEW (< md viewports — zero horizontal table scrolling) */}
            <div className="md:hidden divide-y divide-slate-200">
              {group.items.map((item) => {
                const isCopied = copiedPhrase === item.name;
                const inCart = specCartIds.includes(item.linkedTermId);

                return (
                  <article key={item.name} className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-display text-base font-bold text-slate-900">
                          {item.name}
                        </h4>
                        <div className="text-[11px] font-mono text-sky-700 mt-0.5">
                          Scope: {item.interruptionLevel}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onJumpToTerm(item.linkedTermId)}
                        className="min-h-[38px] px-3 py-1.5 rounded-lg bg-sky-50 border border-sky-200 text-xs font-mono font-semibold text-sky-800 inline-flex items-center gap-1 shrink-0"
                      >
                        <span>Sandbox</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-200/80">
                        <span className="font-mono text-[10px] font-bold text-emerald-800 block">
                          WHEN TO USE
                        </span>
                        <span className="text-slate-700 leading-relaxed">{item.whenToUse}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-amber-50/50 border border-amber-200/80">
                        <span className="font-mono text-[10px] font-bold text-amber-800 block">
                          WHEN TO AVOID
                        </span>
                        <span className="text-slate-600 leading-relaxed">{item.whenToAvoid}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => handleCopyPhrase(item.promptPhrase, item.name)}
                        className="min-h-[42px] px-3 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold inline-flex items-center justify-center gap-1.5"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Copied Phrase</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Prompt</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => onToggleSpecCart(item.linkedTermId)}
                        className={`min-h-[42px] px-3 py-2 rounded-xl border text-xs font-semibold inline-flex items-center justify-center ${
                          inCart
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {inCart ? 'In Spec Cart ✓' : '+ Add to Spec'}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* DESKTOP ARCHITECTURAL TABLE VIEW (>= md viewports) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse divide-y divide-slate-200 text-xs">
                <thead>
                  <tr className="bg-slate-50/50 text-slate-500 font-mono text-[11px]">
                    <th className="py-3 px-5 font-semibold">UI/UX PATTERN</th>
                    <th className="py-3 px-4 font-semibold">INTERRUPTION / SCOPE</th>
                    <th className="py-3 px-4 font-semibold">WHEN TO USE</th>
                    <th className="py-3 px-4 font-semibold">WHEN TO AVOID</th>
                    <th className="py-3 px-5 font-semibold text-right">EXACT AGENT PROMPT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {group.items.map((item) => {
                    const isCopied = copiedPhrase === item.name;
                    const inCart = specCartIds.includes(item.linkedTermId);

                    return (
                      <tr
                        key={item.name}
                        className="hover:bg-slate-50/70 transition-colors align-top"
                      >
                        <td className="py-4 px-5 whitespace-nowrap">
                          <div className="font-display font-bold text-sm text-slate-900">
                            {item.name}
                          </div>
                          <button
                            type="button"
                            onClick={() => onJumpToTerm(item.linkedTermId)}
                            className="text-[11px] font-mono text-sky-700 hover:underline inline-flex items-center gap-0.5 mt-1"
                          >
                            <span>Open Sandbox</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </button>
                        </td>
                        <td className="py-4 px-4 font-mono text-[11px] text-slate-700">
                          {item.interruptionLevel}
                        </td>
                        <td className="py-4 px-4 text-slate-700 max-w-xs leading-relaxed">
                          {item.whenToUse}
                        </td>
                        <td className="py-4 px-4 text-slate-500 max-w-xs leading-relaxed">
                          {item.whenToAvoid}
                        </td>
                        <td className="py-4 px-5 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleCopyPhrase(item.promptPhrase, item.name)}
                              className="min-h-[36px] px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 font-medium inline-flex items-center gap-1.5"
                            >
                              {isCopied ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span>Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy Phrase</span>
                                </>
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() => onToggleSpecCart(item.linkedTermId)}
                              className={`min-h-[36px] px-3 py-1.5 rounded-lg border font-medium ${
                                inCart
                                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              {inCart ? 'In Cart ✓' : '+ Spec'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
