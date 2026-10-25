import React, { useState } from 'react';
import { COMPARISON_GROUPS } from '../data/anatomyData';
import { Copy, Check, ArrowUpRight, Plus } from 'lucide-react';

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
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-1.5">
        <div className="text-xs font-mono text-sky-700 font-semibold">
          ARCHITECTURAL DECISION MATRICES
        </div>
        <h2 className="font-display text-2xl font-bold text-slate-900 tracking-tight">
          When to use which UI/UX pattern (and stop calling everything a &ldquo;popup&rdquo; or &ldquo;box&rdquo;)
        </h2>
        <p className="text-xs text-slate-600 max-w-2xl">
          Use these side-by-side comparison tables to select the exact component that matches your
          interruption budget, data density, and user workflow.
        </p>
      </div>

      {/* Comparison Matrix Tables */}
      <div className="space-y-8">
        {COMPARISON_GROUPS.map((group, gIdx) => (
          <section
            key={group.id}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs"
          >
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-display text-lg font-bold text-slate-900">
                  0{gIdx + 1}. {group.title}
                </h3>
                <p className="text-xs text-slate-600">{group.subtitle}</p>
              </div>
              <span className="text-xs font-mono text-sky-700 bg-sky-50 border border-sky-200 px-3 py-1 rounded-lg">
                Decision Question: {group.question}
              </span>
            </div>

            <div className="overflow-x-auto">
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
                              onClick={() =>
                                handleCopyPhrase(item.promptPhrase, item.name)
                              }
                              className="px-2.5 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 font-medium inline-flex items-center gap-1.5"
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
                              className={`px-2.5 py-1.5 rounded-lg border font-medium ${
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
