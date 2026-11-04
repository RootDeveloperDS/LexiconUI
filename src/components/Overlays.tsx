import React, { useState, useEffect, useMemo } from 'react';
import { DESIGN_TERMS, DesignTerm } from '../data/termsData';
import {
  Search,
  X,
  Copy,
  Check,
  Download,
  Trash2,
  ArrowUpRight,
  Layers,
  Eye,
  Wand2,
  Table,
  GitPullRequest,
} from 'lucide-react';
import { LexiconLogo } from './LexiconLogo';

const GITHUB_REPO_URL = 'https://github.com/RootDeveloperDS/LexiconUI';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTerm: (termId: string) => void;
  onSwitchTab: (
    tab: 'encyclopedia' | 'anatomy' | 'translator' | 'matrix' | 'contribute'
  ) => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onSelectTerm,
  onSwitchTab,
}) => {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveIndex(0);
    }
  }, [isOpen]);

  const matchedTerms = useMemo(() => {
    if (!query.trim()) return DESIGN_TERMS.slice(0, 8);
    const q = query.toLowerCase();
    return DESIGN_TERMS.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.pronunciationOrAlias.toLowerCase().includes(q) ||
        t.summary.toLowerCase().includes(q) ||
        t.vibePhrases.some((v) => v.toLowerCase().includes(q)) ||
        t.tailwindTokens.some((tok) => tok.toLowerCase().includes(q))
    );
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) =>
          matchedTerms.length > 0 ? (prev + 1) % matchedTerms.length : 0
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) =>
          matchedTerms.length > 0
            ? (prev - 1 + matchedTerms.length) % matchedTerms.length
            : 0
        );
      } else if (e.key === 'Enter' && matchedTerms[activeIndex]) {
        e.preventDefault();
        onSelectTerm(matchedTerms[activeIndex].id);
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, matchedTerms, activeIndex, onSelectTerm, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-xs flex items-start justify-center pt-[6vh] sm:pt-[12vh] p-3 sm:p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command Palette Search"
        className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden divide-y divide-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Omnibar Search Input */}
        <div className="px-3.5 sm:px-4 py-3 sm:py-3.5 flex items-center gap-2.5 sm:gap-3">
          <LexiconLogo size={22} />
          <Search className="w-4 h-4 text-sky-600 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            placeholder='Search UI/UX terms or vibe phrases ("cmd+k", "bento")...'
            className="w-full min-h-[36px] text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="min-h-[36px] px-2.5 py-1 text-[11px] font-mono bg-slate-100 text-slate-600 rounded-lg border border-slate-200 hover:text-slate-900 shrink-0"
          >
            ESC
          </button>
        </div>

        {/* Quick Workspace Switcher */}
        <div className="px-3 py-2 bg-slate-50/70 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-mono text-slate-400 px-1 shrink-0">VIEW:</span>
          {[
            { id: 'encyclopedia', label: 'Sandbox', icon: Layers },
            { id: 'anatomy', label: 'X-Ray', icon: Eye },
            { id: 'translator', label: 'Translator', icon: Wand2 },
            { id: 'matrix', label: 'Matrix', icon: Table },
            { id: 'contribute', label: 'OSS Hub', icon: GitPullRequest },
          ].map((v) => {
            const Icon = v.icon;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => {
                  onSwitchTab(
                    v.id as 'encyclopedia' | 'anatomy' | 'translator' | 'matrix' | 'contribute'
                  );
                  onClose();
                }}
                className="min-h-[36px] px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white border border-slate-200 text-slate-700 hover:border-slate-300 flex items-center gap-1.5 shrink-0"
              >
                <Icon className="w-3.5 h-3.5 text-sky-600" />
                <span>{v.label}</span>
              </button>
            );
          })}
        </div>

        {/* Matched UI/UX Terms */}
        <div className="p-2 max-h-[55vh] sm:max-h-80 overflow-y-auto space-y-1">
          {matchedTerms.length === 0 ? (
            <div className="py-10 px-4 text-center text-xs text-slate-500">
              No terms matched <strong className="text-slate-900">&ldquo;{query}&rdquo;</strong>.
              Try opening the Vibe-to-Spec Translator!
            </div>
          ) : (
            matchedTerms.map((term, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={term.id}
                  type="button"
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => {
                    onSelectTerm(term.id);
                    onClose();
                  }}
                  className={`w-full min-h-[48px] px-3 py-2.5 rounded-xl text-left flex items-center justify-between gap-3 transition-colors ${
                    isSelected ? 'bg-sky-50 text-slate-900' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-sky-700 font-semibold shrink-0">
                        {term.number}.
                      </span>
                      <span className="font-display font-bold text-sm text-slate-900 truncate">
                        {term.title}
                      </span>
                      <span className="hidden sm:inline text-xs text-slate-300">·</span>
                      <span className="hidden sm:inline text-xs text-slate-500 truncate">
                        {term.categoryLabel}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 truncate mt-0.5">
                      Vibe: &ldquo;{term.vibePhrases[0]}&rdquo;
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 shrink-0" />
                </button>
              );
            })
          )}
        </div>

        {/* Footer Keybind Legend */}
        <div className="px-3.5 sm:px-4 py-2.5 bg-slate-50 flex items-center justify-between gap-2 text-[11px] font-mono text-slate-500">
          <span className="truncate">↑↓ Navigate · ↵ Open · ESC Close</span>
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-700 hover:underline shrink-0"
          >
            RootDeveloperDS/LexiconUI ↗
          </a>
        </div>
      </div>
    </div>
  );
};

interface SpecCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  specCartIds: string[];
  onToggleSpecCart: (termId: string) => void;
  onClearCart: () => void;
  onJumpToTerm: (termId: string) => void;
  onCopyFeedback: (label: string) => void;
}

export const SpecCartDrawer: React.FC<SpecCartDrawerProps> = ({
  isOpen,
  onClose,
  specCartIds,
  onToggleSpecCart,
  onClearCart,
  onJumpToTerm,
  onCopyFeedback,
}) => {
  const [copiedSpec, setCopiedSpec] = useState(false);

  const selectedTerms: DesignTerm[] = useMemo(
    () =>
      specCartIds
        .map((id) => DESIGN_TERMS.find((t) => t.id === id))
        .filter((t): t is DesignTerm => Boolean(t)),
    [specCartIds]
  );

  const compiledSpecMarkdown = useMemo(() => {
    if (selectedTerms.length === 0) return '';
    const lines = [
      '# Frontend UI/UX Design Specification (Generated via LexiconUI)',
      `> Reference Repository: ${GITHUB_REPO_URL}`,
      '',
      'Apply the following industry-standard UI/UX patterns, spatial laws, and component architectures:',
      '',
    ];
    selectedTerms.forEach((term, idx) => {
      lines.push(`### ${idx + 1}. ${term.title} (${term.pronunciationOrAlias})`);
      lines.push(`${term.goodPromptExample}`);
      lines.push(`- **Key CSS / Tailwind Tokens**: \`${term.tailwindTokens.join(' ')}\``);
      lines.push('');
    });
    return lines.join('\n');
  }, [selectedTerms]);

  if (!isOpen) return null;

  const handleCopyAll = () => {
    if (!compiledSpecMarkdown) return;
    navigator.clipboard.writeText(compiledSpecMarkdown);
    setCopiedSpec(true);
    onCopyFeedback(`Copied full DESIGN_SPEC.md (${selectedTerms.length} patterns)`);
    setTimeout(() => setCopiedSpec(false), 1800);
  };

  const handleDownloadMd = () => {
    if (!compiledSpecMarkdown) return;
    const blob = new Blob([compiledSpecMarkdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'DESIGN_SPEC.md';
    a.click();
    URL.revokeObjectURL(url);
    onCopyFeedback('Downloaded DESIGN_SPEC.md');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      {/* Backdrop Scrim */}
      <div className="fixed inset-0 bg-slate-950/35 backdrop-blur-[1px]" />

      {/* Right-Anchored Slide-Over Sheet */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Prompt Specification Cart"
        className="relative z-10 w-full max-w-lg bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Drawer Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-200 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <LexiconLogo size={26} />
            <div className="min-w-0">
              <div className="text-[11px] font-mono text-sky-700 font-semibold truncate">
                SLIDE-OVER SPEC COMPOSER
              </div>
              <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 truncate">
                My AI Agent Prompt Spec ({selectedTerms.length})
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-w-[42px] min-h-[42px] p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 flex items-center justify-center shrink-0"
            aria-label="Close Spec Drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Drawer Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {selectedTerms.length === 0 ? (
            <div className="border border-dashed border-slate-300 rounded-xl p-8 sm:p-10 text-center space-y-2">
              <div className="font-display font-bold text-sm text-slate-900">
                Your Prompt Spec Sheet is empty
              </div>
              <p className="text-xs text-slate-500">
                Add UI/UX concepts from the Encyclopedia, Anatomy X-Ray, or Prompt Translator to
                combine them into a unified system prompt for your coding agent.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-slate-500">
                  SELECTED UI/UX PATTERNS ({selectedTerms.length})
                </span>
                <button
                  type="button"
                  onClick={onClearCart}
                  className="min-h-[38px] px-2.5 py-1 rounded-lg text-red-600 hover:text-red-800 hover:bg-red-50 font-medium flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {selectedTerms.map((term) => (
                  <div
                    key={term.id}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 flex items-start justify-between gap-3"
                  >
                    <div className="space-y-1 min-w-0 flex-1">
                      <button
                        type="button"
                        onClick={() => {
                          onJumpToTerm(term.id);
                          onClose();
                        }}
                        className="min-h-[36px] font-display font-bold text-sm text-slate-900 hover:text-sky-700 flex items-center gap-1 text-left"
                      >
                        <span className="truncate">
                          {term.number}. {term.title}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      </button>
                      <p className="text-xs text-slate-600 line-clamp-2">
                        {term.goodPromptExample}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onToggleSpecCart(term.id)}
                      className="min-w-[38px] min-h-[38px] rounded-lg text-xs text-slate-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center shrink-0"
                      title="Remove from Spec"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Combined Markdown Preview */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <div className="text-xs font-mono font-semibold text-slate-600">
                  COMBINED MARKDOWN SYSTEM PROMPT PREVIEW
                </div>
                <pre className="p-3.5 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono overflow-x-auto max-h-60 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                  <code>{compiledSpecMarkdown}</code>
                </pre>
              </div>
            </>
          )}
        </div>

        {/* Sticky Drawer Action Footer */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <button
            type="button"
            disabled={selectedTerms.length === 0}
            onClick={handleDownloadMd}
            className="min-h-[44px] px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 flex items-center justify-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download DESIGN_SPEC.md</span>
          </button>

          <button
            type="button"
            disabled={selectedTerms.length === 0}
            onClick={handleCopyAll}
            className="min-h-[44px] px-4 py-2 text-xs font-semibold rounded-xl bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-40 flex items-center justify-center gap-1.5"
          >
            {copiedSpec ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Full Agent Prompt</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </div>
  );
};
