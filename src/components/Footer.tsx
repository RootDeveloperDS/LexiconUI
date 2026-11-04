import React from 'react';
import {
  Globe,
  Briefcase,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Send,
  ArrowUpRight,
  Search,
  Layers,
  Eye,
  Wand2,
  Table,
  GitPullRequest,
  FileDown,
} from 'lucide-react';
import { LexiconLogo } from './LexiconLogo';
import { FeedbackRatingWidget } from './FeedbackRatingWidget';
import type { ActiveWorkspaceTab } from '../App';

interface FooterProps {
  activeTab: ActiveWorkspaceTab;
  specCartCount: number;
  totalConceptsCount: number;
  githubRepoUrl: string;
  onSelectWorkspaceTab: (tab: ActiveWorkspaceTab, targetId?: string) => void;
  onOpenCommandPalette: () => void;
  onOpenSpecDrawer: () => void;
}

interface SocialLinkItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  isExternal: boolean;
}

const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    id: 'portfolio',
    label: 'Developer Portfolio',
    href: 'https://devanshsharma.vercel.app/',
    icon: Globe,
    isExternal: true,
  },
  {
    id: 'business',
    label: 'Business Website',
    href: 'https://rootdeveloperds.odoo.com',
    icon: Briefcase,
    isExternal: true,
  },
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:developersofroot@gmail.com',
    icon: Mail,
    isExternal: false,
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/RootDeveloperDS',
    icon: Github,
    isExternal: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/devanshsharma987',
    icon: Linkedin,
    isExternal: true,
  },
  {
    id: 'twitter',
    label: 'Twitter/X',
    href: 'https://x.com/devanshsha6563',
    icon: Twitter,
    isExternal: true,
  },
  {
    id: 'telegram',
    label: 'Telegram',
    href: 'https://t.me/developerofroot',
    icon: Send,
    isExternal: true,
  },
];

export const Footer: React.FC<FooterProps> = ({
  activeTab,
  specCartCount,
  totalConceptsCount,
  githubRepoUrl,
  onSelectWorkspaceTab,
  onOpenCommandPalette,
  onOpenSpecDrawer,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      aria-label="Site Footer"
      className="border-t border-slate-200 bg-white mt-12 sm:mt-16 text-slate-600"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 py-10 sm:py-12">
        {/* Main 12-Column Architectural Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pb-9 border-b border-slate-200/80">
          {/* Column 1 (4 Cols): Brand Identity, Mission & Direct Contact Action */}
          <div className="lg:col-span-4 space-y-4">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                onSelectWorkspaceTab('encyclopedia');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2.5 font-display text-lg font-bold tracking-tight text-slate-900 group"
            >
              <LexiconLogo
                size={28}
                className="transition-transform duration-150 group-hover:scale-105 shrink-0"
              />
              <span>LexiconUI</span>
            </a>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-[38ch]">
              The open-source interactive UI/UX terminology encyclopedia &amp; prompt-engineering
              sandbox for developers, designers, and AI builders.
            </p>

            {/* Direct Contact Action + Official Repo Action */}
            <div className="pt-1 flex flex-wrap items-center gap-2.5">
              <a
                href="mailto:developersofroot@gmail.com"
                className="min-h-[38px] px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
              >
                <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>Contact Us</span>
              </a>

              <a
                href={githubRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[38px] px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-800 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
              >
                <Github className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                <span>Star on GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              </a>
            </div>
          </div>

          {/* Column 2 (4 Cols): Primary Navigation Links & Quick Actions */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-6">
            <nav aria-label="Footer Workspace Navigation" className="space-y-2.5">
              <div className="text-xs font-display font-bold text-slate-900 tracking-tight">
                Workspace Tools
              </div>
              <ul className="space-y-2 text-xs">
                <li>
                  <a
                    href="#encyclopedia"
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectWorkspaceTab('encyclopedia', 'interactive-sandbox-stage');
                    }}
                    className={`inline-flex items-center gap-1.5 transition-colors ${
                      activeTab === 'encyclopedia'
                        ? 'text-sky-700 font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5 shrink-0" />
                    <span>Live UI Sandbox</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#anatomy-xray"
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectWorkspaceTab('anatomy');
                    }}
                    className={`inline-flex items-center gap-1.5 transition-colors ${
                      activeTab === 'anatomy'
                        ? 'text-sky-700 font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5 shrink-0" />
                    <span>App Anatomy X-Ray</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#prompt-translator"
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectWorkspaceTab('translator');
                    }}
                    className={`inline-flex items-center gap-1.5 transition-colors ${
                      activeTab === 'translator'
                        ? 'text-sky-700 font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Wand2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Vibe-to-Spec Translator</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#decision-matrix"
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectWorkspaceTab('matrix');
                    }}
                    className={`inline-flex items-center gap-1.5 transition-colors ${
                      activeTab === 'matrix'
                        ? 'text-sky-700 font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Table className="w-3.5 h-3.5 shrink-0" />
                    <span>Pattern Cheat Sheets</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#oss-contribute"
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectWorkspaceTab('contribute');
                    }}
                    className={`inline-flex items-center gap-1.5 transition-colors ${
                      activeTab === 'contribute'
                        ? 'text-sky-700 font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <GitPullRequest className="w-3.5 h-3.5 shrink-0" />
                    <span>Community &amp; PR Studio</span>
                  </a>
                </li>
              </ul>
            </nav>

            <nav aria-label="Footer Quick Links" className="space-y-2.5">
              <div className="text-xs font-display font-bold text-slate-900 tracking-tight">
                Quick Actions
              </div>
              <ul className="space-y-2 text-xs">
                <li>
                  <a
                    href="#all-concepts-directory"
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectWorkspaceTab('encyclopedia', 'all-concepts-directory');
                    }}
                    className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    <span>All {totalConceptsCount} UI Terms</span>
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onOpenCommandPalette}
                    className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <Search className="w-3.5 h-3.5 shrink-0" />
                    <span>Command Search (⌘K)</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onOpenSpecDrawer}
                    className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer tabular-nums"
                  >
                    <FileDown className="w-3.5 h-3.5 shrink-0" />
                    <span>Export DESIGN_SPEC ({specCartCount})</span>
                  </button>
                </li>
                <li>
                  <a
                    href={`${githubRepoUrl}/releases`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    <span>Releases &amp; Changelog</span>
                    <ArrowUpRight className="w-3 h-3 shrink-0" />
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:developersofroot@gmail.com"
                    className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    <span>developersofroot@gmail.com</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Column 3 (4 Cols): Universal Feedback & Star Rating Telemetry Widget */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-3">
            <div className="space-y-1">
              <div className="text-xs font-display font-bold text-slate-900 tracking-tight">
                Project Feedback &amp; Rating
              </div>
              <p className="text-xs text-slate-500">
                Help improve LexiconUI — click a star to share quick thoughts or feature ideas.
              </p>
            </div>
            <FeedbackRatingWidget projectId="lexicon-ui" />
          </div>
        </div>

        {/* Bottom Bar: Copyright, Creator Credit & Animated Social Presence */}
        <div className="pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <span>&copy; {currentYear} LexiconUI.</span>
            <span aria-hidden="true">·</span>
            <span>
              Product by{' '}
              <a
                href="https://devanshsharma.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-slate-900 hover:text-sky-700 underline underline-offset-2 transition-colors"
              >
                Devansh Sharma
              </a>
            </span>
            <span aria-hidden="true">·</span>
            <span>MIT License</span>
          </div>

          {/* Comprehensive Social Presence with Hover Label Reveal Micro-Animations */}
          <div
            aria-label="Creator and Community Social Links"
            className="flex flex-wrap items-center gap-1.5"
          >
            {SOCIAL_LINKS.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  target={item.isExternal ? '_blank' : undefined}
                  rel={item.isExternal ? 'noopener noreferrer' : undefined}
                  aria-label={item.label}
                  className="group inline-flex items-center rounded-lg border border-slate-200/90 bg-slate-50/70 hover:bg-slate-900 hover:border-slate-900 text-slate-600 hover:text-white px-2.5 py-1.5 transition-all duration-200"
                >
                  <Icon className="w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover:scale-110 group-hover:text-sky-400" />
                  <span className="max-w-0 overflow-hidden opacity-0 -translate-x-1 group-hover:max-w-[140px] group-hover:opacity-100 group-hover:translate-x-0 group-hover:ml-1.5 transition-all duration-200 whitespace-nowrap text-[11px] font-medium">
                    {item.label}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};
