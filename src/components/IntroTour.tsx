import React from 'react';
import {
  Layers,
  Eye,
  Wand2,
  Table,
  LayoutTemplate,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  Compass,
} from 'lucide-react';
import type { ActiveWorkspaceTab } from '../App';

export interface IntroTourStep {
  stepNumber: string;
  tabId: ActiveWorkspaceTab;
  title: string;
  shortLabel: string;
  whatItIs: string;
  whenToUseIt: string;
  keyActionLabel: string;
  targetAnchorId: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const INTRO_TOUR_STEPS: IntroTourStep[] = [
  {
    stepNumber: '01',
    tabId: 'encyclopedia',
    title: 'Tool 01 · Live UI Sandbox (48 Interactive Concepts)',
    shortLabel: '01. UI Sandbox',
    whatItIs:
      'An interactive visual dictionary of 48 canonical UI/UX patterns—from Bento Grids and CSS Subgrid to Kebab Menus, Segmented OTP Inputs, and Sci-Fi HUDs.',
    whenToUseIt:
      'Use this when you want to browse UI patterns by category, test live sliders and toggles in real time, and copy a single pattern’s exact AI prompt.',
    keyActionLabel: 'Explore 48 Live Demos',
    targetAnchorId: 'interactive-sandbox-stage',
    icon: Layers,
  },
  {
    stepNumber: '02',
    tabId: 'anatomy',
    title: 'Tool 02 · App Anatomy X-Ray (4 Full-Screen Blueprints)',
    shortLabel: '02. Anatomy X-Ray',
    whatItIs:
      'Four complete application layouts (B2B SaaS Workspace, AI Landing Page, Docs Portal, and Tactical HUD) with clickable numbered X-Ray pins.',
    whenToUseIt:
      'Use this when you see a part of a real app (like a sticky right table-of-contents rail or a command omnibar) and want to click it to learn its exact name.',
    keyActionLabel: 'Inspect App Blueprints',
    targetAnchorId: 'workspace-main-anchor',
    icon: Eye,
  },
  {
    stepNumber: '03',
    tabId: 'translator',
    title: 'Tool 03 · Vibe-to-Spec Prompt Translator',
    shortLabel: '03. Vibe Translator',
    whatItIs:
      'A natural-language translator that turns casual descriptions ("boxes of different sizes", "3 dots menu", "6 digit code boxes") into formal UI terminology.',
    whenToUseIt:
      'Use this when you know what you want to build in plain English, and want LexiconUI to detect the matching UI patterns and compile a ready-to-paste AI prompt.',
    keyActionLabel: 'Translate a Casual Idea',
    targetAnchorId: 'workspace-main-anchor',
    icon: Wand2,
  },
  {
    stepNumber: '04',
    tabId: 'matrix',
    title: 'Tool 04 · Pattern Cheat Sheets (Decision Matrices)',
    shortLabel: '04. Decision Matrix',
    whatItIs:
      'Side-by-side architectural comparison tables for commonly confused components (e.g., Modal vs. Slide-Over Drawer vs. Popover vs. Toast).',
    whenToUseIt:
      'Use this before prompting an AI agent so you stop calling every overlay a "popup" and pick the exact component that fits your user workflow.',
    keyActionLabel: 'Compare Similar Patterns',
    targetAnchorId: 'workspace-main-anchor',
    icon: Table,
  },
  {
    stepNumber: '05',
    tabId: 'contribute',
    title: 'Tool 05 · Starter Blueprints, UI Quiz & Open-Source Hub',
    shortLabel: '05. Blueprints & Quiz',
    whatItIs:
      'Ready-to-copy multi-pattern page blueprints (combining 4–5 terms into a full app spec), an interactive "Name That UI!" flashcard quiz, and official GitHub links.',
    whenToUseIt:
      'Use this when you want a complete full-page architecture prompt in one click, want to test your UI vocabulary, or want to suggest a new term on GitHub.',
    keyActionLabel: 'Browse Page Blueprints',
    targetAnchorId: 'workspace-main-anchor',
    icon: LayoutTemplate,
  },
];

interface IntroTourProps {
  isOpen: boolean;
  currentStepIdx: number;
  onSelectStep: (index: number) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
  onCloseTour: () => void;
  onJumpToToolSection: (tab: ActiveWorkspaceTab, anchorId: string) => void;
}

export const IntroTour: React.FC<IntroTourProps> = ({
  isOpen,
  currentStepIdx,
  onSelectStep,
  onNextStep,
  onPrevStep,
  onCloseTour,
  onJumpToToolSection,
}) => {
  if (!isOpen) return null;

  const currentStep = INTRO_TOUR_STEPS[currentStepIdx] || INTRO_TOUR_STEPS[0];
  const Icon = currentStep.icon;
  const isLastStep = currentStepIdx === INTRO_TOUR_STEPS.length - 1;

  return (
    <section
      aria-label="Interactive Workspace Intro Tour"
      className="mt-3 rounded-2xl bg-slate-900 text-white border-2 border-sky-400 shadow-xl overflow-hidden transition-all"
    >
      {/* Top Step Selector & Progress Header */}
      <div className="px-3.5 sm:px-5 py-2.5 bg-slate-950/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-sky-400 shrink-0" />
          <span className="text-xs font-mono font-bold text-sky-400 tabular-nums">
            INTERACTIVE WORKSPACE TOUR · STEP {currentStepIdx + 1} OF {INTRO_TOUR_STEPS.length}
          </span>
        </div>

        {/* Interactive 5-Tool Step Switcher Strip */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar max-w-full">
          {INTRO_TOUR_STEPS.map((step, idx) => {
            const isCurrent = idx === currentStepIdx;
            return (
              <button
                key={step.tabId}
                type="button"
                onClick={() => onSelectStep(idx)}
                className={`min-h-[30px] px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors whitespace-nowrap shrink-0 ${
                  isCurrent
                    ? 'bg-sky-500 text-slate-950 font-bold'
                    : 'bg-slate-800/90 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {step.shortLabel}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onCloseTour}
          className="min-h-[30px] px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium inline-flex items-center gap-1 shrink-0 transition-colors"
          aria-label="Close Intro Tour"
        >
          <span>Dismiss Tour</span>
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Coachmark Explanation Body */}
      <div className="p-4 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        <div className="lg:col-span-8 space-y-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-sky-500/20 border border-sky-400/40 text-sky-300 shrink-0">
              <Icon className="w-4 h-4" />
            </span>
            <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-tight">
              {currentStep.title}
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            <strong className="text-sky-300">What it is:</strong> {currentStep.whatItIs}
          </p>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            <strong className="text-emerald-300">When to use it:</strong> {currentStep.whenToUseIt}
          </p>
        </div>

        {/* Right Column: Tour Navigation Controls */}
        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-end gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800">
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onPrevStep}
              disabled={currentStepIdx === 0}
              className={`min-h-[40px] px-3 py-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1 transition-colors whitespace-nowrap ${
                currentStepIdx === 0
                  ? 'border-slate-800 bg-slate-900 text-slate-600 cursor-not-allowed'
                  : 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev Tool</span>
            </button>

            <button
              type="button"
              onClick={onNextStep}
              className="min-h-[40px] px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-display text-xs font-bold flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shadow-sm"
            >
              {isLastStep ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Finish Tour</span>
                </>
              ) : (
                <>
                  <span>Next Tool ({currentStepIdx + 2}/5)</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          <button
            type="button"
            onClick={() => onJumpToToolSection(currentStep.tabId, currentStep.targetAnchorId)}
            className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-sky-300 hover:text-white transition-colors whitespace-nowrap text-center"
          >
            {currentStep.keyActionLabel} ↓
          </button>
        </div>
      </div>
    </section>
  );
};
