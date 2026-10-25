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
  GitPullRequest,
} from 'lucide-react';
import { DESIGN_TERMS } from './data/termsData';
import { EncyclopediaView } from './components/EncyclopediaView';
import { AnatomyInspectorView } from './components/AnatomyInspectorView';
import { PromptTranslatorView } from './components/PromptTranslatorView';
import { ComparisonMatrixView } from './components/ComparisonMatrixView';
import { ContributorStudioView } from './components/ContributorStudioView';
import { CommandPaletteModal, SpecCartDrawer } from './components/Overlays';
import { LexiconLogo } from './components/LexiconLogo';

type ActiveWorkspaceTab =
  | 'encyclopedia'
  | 'anatomy'
  | 'translator'
  | 'matrix'
  | 'contribute';

const STORAGE_KEY_CART = 'lexicon_ui_spec_cart_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveWorkspaceTab>('encyclopedia');
  const [selectedTermId, setSelectedTermId] = useState<string>(DESIGN_TERMS[0].id);
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false);
  const [specDrawerOpen, setSpecDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      {/* =====================================================================
          STRICT 3-ZONE TOP BAR CONTRACT
          [Zone 1: 1-line Brand Wordmark] — [Zone 2: 5 single-line nav links] — [Zone 3: 1 primary CTA]
      ===================================================================== */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-8">
        {/* Zone 1: Single brand anchor with vector logo + wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('encyclopedia');
          }}
          className="inline-flex items-center gap-2.5 font-display text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 group"
        >
          <LexiconLogo size={28} className="transition-transform group-hover:scale-105" />
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
              setActiveTab('encyclopedia');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
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
              setActiveTab('anatomy');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
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
              setActiveTab('translator');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
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
              setActiveTab('matrix');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
              activeTab === 'matrix'
                ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                : 'hover:text-slate-900'
            }`}
          >
            Decision Matrix
          </a>
          <a
            href="#oss-contribute"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('contribute');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
              activeTab === 'contribute'
                ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                : 'hover:text-slate-900'
            }`}
          >
            OSS Contribute
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setSpecDrawerOpen(true)}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 tabular-nums"
          >
            Export Spec Sheet ({specCartIds.length})
          </button>
        </div>
      </header>

      {/* =====================================================================
          SWISS EDITORIAL WORKSPACE HERO & QUICK-LAUNCHER BAR
      ===================================================================== */}
      <section className="border-b border-slate-200 bg-white blueprint-grid">
        <div className="max-w-[1360px] mx-auto px-6 py-7 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-sky-700 font-medium">
              <LexiconLogo size={18} />
              <span>Open-Source UI/UX Terminology &amp; Prompt-Engineering Reference · MIT Licensed</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight text-balance leading-[1.1]">
              Stop explaining vague UI fluff. Prompt AI agents with exact design terminology.
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed max-w-[65ch]">
              Manipulate live UI components in the sandbox, dissect full-screen app blueprints in
              X-Ray mode, translate casual descriptions into structured frontend specs, or draft a
              community PR in the Contributor Studio.
            </p>
          </div>

          {/* Right Workspace Toolbar: Cmd+K Launcher + Mobile-Friendly Mode Switcher */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setCmdPaletteOpen(true)}
              className="px-4 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-300/90 rounded-xl text-xs text-slate-600 flex items-center justify-between gap-6 transition-colors shadow-2xs"
            >
              <span className="flex items-center gap-2 font-medium text-slate-800 whitespace-nowrap">
                <Search className="w-3.5 h-3.5 text-sky-600" />
                <span>Quick Search Term or Vibe...</span>
              </span>
              <kbd className="px-1.5 py-0.5 text-[11px] font-mono bg-white border border-slate-200 rounded text-slate-600">
                ⌘K
              </kbd>
            </button>

            {/* Interactive Tool Switcher (Segmented Control) */}
            <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 overflow-x-auto">
              {[
                { id: 'encyclopedia', label: '1. Live Sandbox', icon: Layers },
                { id: 'anatomy', label: '2. Anatomy X-Ray', icon: Eye },
                { id: 'translator', label: '3. Vibe Translator', icon: Wand2 },
                { id: 'matrix', label: '4. Cheat Sheet', icon: Table },
                { id: 'contribute', label: '5. OSS Contribute', icon: GitPullRequest },
              ].map((tool) => {
                const Icon = tool.icon;
                const isSelected = activeTab === tool.id;
                return (
                  <button
                    key={tool.id}
                    type="button"
                    onClick={() => setActiveTab(tool.id as ActiveWorkspaceTab)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
                      isSelected
                        ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 text-sky-600" />
                    <span>{tool.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          MAIN WORKSPACE CANVAS (1360px CONTAINER)
      ===================================================================== */}
      <main className="flex-1 max-w-[1360px] w-full mx-auto px-6 py-8">
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
          <ContributorStudioView onCopyFeedback={triggerToast} />
        )}
      </main>

      {/* =====================================================================
          QUIET ARCHITECTURAL FOOTER
      ===================================================================== */}
      <footer className="border-t border-slate-200 bg-white mt-16">
        <div className="max-w-[1360px] mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2.5">
            <LexiconLogo size={22} />
            <span>
              <strong className="font-display text-slate-900">LexiconUI</strong> · Open-Source
              Interactive UI/UX Terminology &amp; Prompt-Engineering Encyclopedia · MIT License
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setActiveTab('contribute')}
              className="hover:text-slate-900 transition-colors"
            >
              Contributor Studio & PR Guide
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => setCmdPaletteOpen(true)}
              className="hover:text-slate-900 transition-colors"
            >
              Press ⌘K to Search
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => setSpecDrawerOpen(true)}
              className="hover:text-slate-900 transition-colors"
            >
              Export DESIGN_SPEC.md ({specCartIds.length})
            </button>
          </div>
        </div>
      </footer>

      {/* Global Overlays: Cmd+K Command Palette + Slide-Over Spec Cart + Passive Toast */}
      <CommandPaletteModal
        isOpen={cmdPaletteOpen}
        onClose={() => setCmdPaletteOpen(false)}
        onSelectTerm={handleJumpToTerm}
        onSwitchTab={setActiveTab}
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
          className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-2.5 text-xs font-medium"
        >
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
