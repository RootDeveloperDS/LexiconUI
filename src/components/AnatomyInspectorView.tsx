import React, { useState } from 'react';
import {
  ANATOMY_TEMPLATES,
  AnatomyTemplate,
  AnatomyHotspot,
} from '../data/anatomyData';
import {
  Eye,
  Copy,
  Check,
  Plus,
  ArrowUpRight,
  Layers,
  Crosshair,
  Ruler,
  Search,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

interface AnatomyInspectorViewProps {
  onJumpToTerm: (termId: string) => void;
  specCartIds: string[];
  onToggleSpecCart: (termId: string) => void;
  onCopyFeedback: (label: string) => void;
}

export const AnatomyInspectorView: React.FC<AnatomyInspectorViewProps> = ({
  onJumpToTerm,
  specCartIds,
  onToggleSpecCart,
  onCopyFeedback,
}) => {
  const [activeTemplateId, setActiveTemplateId] =
    useState<AnatomyTemplate['id']>('saas-workspace');
  const [xRayMode, setXRayMode] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeTemplate =
    ANATOMY_TEMPLATES.find((t) => t.id === activeTemplateId) || ANATOMY_TEMPLATES[0];

  const [selectedHotspotId, setSelectedHotspotId] = useState<string>(
    activeTemplate.hotspots[0].id
  );

  const handleSelectTemplate = (id: AnatomyTemplate['id']) => {
    setActiveTemplateId(id);
    const tpl = ANATOMY_TEMPLATES.find((t) => t.id === id) || ANATOMY_TEMPLATES[0];
    setSelectedHotspotId(tpl.hotspots[0].id);
  };

  const activeHotspot: AnatomyHotspot =
    activeTemplate.hotspots.find((h) => h.id === selectedHotspotId) ||
    activeTemplate.hotspots[0];

  const handleCopyHotspotPrompt = (hotspot: AnatomyHotspot) => {
    navigator.clipboard.writeText(hotspot.agentPrompt);
    setCopiedId(hotspot.id);
    onCopyFeedback(`Copied "${hotspot.termName}" prompt spec`);
    setTimeout(() => setCopiedId(null), 1800);
  };

  // Helper to render a clickable Swiss Vermilion / Klein Blue X-Ray Callout Pin
  const renderCalloutPin = (pinNumber: string, hotspotId: string) => {
    const isSelected = selectedHotspotId === hotspotId;
    if (!xRayMode) return null;
    return (
      <span
        onClick={(e) => {
          e.stopPropagation();
          setSelectedHotspotId(hotspotId);
        }}
        className={`inline-flex items-center justify-center w-6 h-6 rounded-full font-mono text-[11px] font-bold cursor-pointer transition-transform select-none shadow-sm ${
          isSelected
            ? 'bg-[#DC2626] text-white scale-110 ring-4 ring-[#DC2626]/25'
            : 'bg-[#0284C7] text-white hover:scale-105'
        }`}
        title="Click to inspect UI/UX anatomy"
      >
        {pinNumber}
      </span>
    );
  };

  return (
    <div className="space-y-8">
      {/* Top Control Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-mono text-sky-700 font-semibold">
            VISUAL ANATOMY X-RAY INSPECTOR
          </div>
          <h2 className="font-display text-2xl font-bold text-slate-900 tracking-tight">
            Click any part of a real interface to learn its exact UI/UX name
          </h2>
          <p className="text-xs text-slate-600 max-w-2xl">
            Stop guessing how to describe layout zones. Select an industry blueprint below and
            click any numbered callout pin or structural container to reveal its architectural
            specification and copy-ready AI agent prompt.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {/* Template Switcher Segmented Control */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
            {ANATOMY_TEMPLATES.map((tpl) => {
              const isSelected = tpl.id === activeTemplateId;
              return (
                <button
                  key={tpl.id}
                  type="button"
                  onClick={() => handleSelectTemplate(tpl.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    isSelected
                      ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tpl.domainTag}
                </button>
              );
            })}
          </div>

          {/* X-Ray Overlay Toggle */}
          <button
            type="button"
            onClick={() => setXRayMode((x) => !x)}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              xRayMode
                ? 'bg-[#DC2626] border-[#DC2626] text-white'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span>{xRayMode ? 'X-Ray Pins: Active' : 'X-Ray Pins: Hidden'}</span>
          </button>
        </div>
      </div>

      {/* Main Split: Left Interactive Blueprint Dissector (7 cols) | Right Synced Anatomy Spec Sheet (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT 7 COLUMNS: Interactive Reference Mockup with Clickable Regions */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
          {/* Mockup Window Header */}
          <div className="px-5 py-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-600 truncate">
              <Ruler className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span className="font-semibold text-slate-900">{activeTemplate.name}</span>
              <span>·</span>
              <span className="text-slate-500 truncate">{activeTemplate.subtitle}</span>
            </div>
            <span className="text-[11px] font-mono text-[#DC2626] shrink-0">
              Click any region or pin (01–0{activeTemplate.hotspots.length})
            </span>
          </div>

          {/* =================================================================
              TEMPLATE 1: SAAS ANALYTICS & DEVELOPER CONSOLE
          ================================================================= */}
          {activeTemplate.id === 'saas-workspace' && (
            <div className="h-[490px] flex bg-[#F8FAFC] overflow-hidden select-none">
              {/* 01. Persistent Left Navigation Rail */}
              <div
                onClick={() => setSelectedHotspotId('saas-sidebar')}
                className={`w-44 shrink-0 border-r p-3 flex flex-col justify-between cursor-pointer transition-all relative ${
                  selectedHotspotId === 'saas-sidebar'
                    ? 'bg-sky-50/70 border-sky-500 ring-2 ring-inset ring-sky-500'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100/70'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-xs text-slate-900">
                      Nexus Cloud
                    </span>
                    {renderCalloutPin('01', 'saas-sidebar')}
                  </div>
                  <div className="space-y-1 text-xs">
                    {['Overview', 'Live Traces', 'Token Schemas', 'Edge Logs', 'Billing'].map(
                      (item, i) => (
                        <div
                          key={item}
                          className={`px-2.5 py-1.5 rounded-md ${
                            i === 1
                              ? 'bg-slate-900 text-white font-medium'
                              : 'text-slate-600'
                          }`}
                        >
                          {item}
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div className="p-2 rounded-lg border border-slate-200 bg-white text-[10px] font-mono text-slate-500">
                  w-60 · shrink-0 · border-r
                </div>
              </div>

              {/* Center Workspace Column */}
              <div className="flex-1 flex flex-col min-w-0">
                {/* 02. Contextual Top Bar & Breadcrumb Trail */}
                <div
                  onClick={() => setSelectedHotspotId('saas-topbar')}
                  className={`h-13 border-b px-4 flex items-center justify-between cursor-pointer transition-all ${
                    selectedHotspotId === 'saas-topbar'
                      ? 'bg-sky-50/80 border-sky-500 ring-2 ring-inset ring-sky-500'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs">
                    {renderCalloutPin('02', 'saas-topbar')}
                    <span className="text-slate-400">Production</span>
                    <span className="text-slate-300">/</span>
                    <span className="text-slate-400">us-east-1</span>
                    <span className="text-slate-300">/</span>
                    <span className="font-semibold text-slate-900">Live Traces</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 text-[10px] font-mono bg-slate-100 border border-slate-200 rounded text-slate-600">
                      ⌘K Search
                    </span>
                    <span className="px-2.5 py-1 text-[11px] font-semibold bg-slate-900 text-white rounded-md">
                      Export CSV
                    </span>
                  </div>
                </div>

                {/* Main Scrollable Stage */}
                <div className="flex-1 p-4 space-y-3.5 overflow-y-auto">
                  {/* 03. Segmented Control & Filter Bar */}
                  <div
                    onClick={() => setSelectedHotspotId('saas-segmented')}
                    className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      selectedHotspotId === 'saas-segmented'
                        ? 'bg-sky-50/80 border-sky-500 ring-2 ring-sky-500'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {renderCalloutPin('03', 'saas-segmented')}
                      <div className="inline-flex p-0.5 bg-slate-100 rounded-lg border border-slate-200 text-[11px]">
                        <span className="px-2.5 py-1 bg-white text-slate-900 font-semibold rounded-md shadow-2xs">
                          All Traces
                        </span>
                        <span className="px-2.5 py-1 text-slate-600">4xx / 5xx</span>
                        <span className="px-2.5 py-1 text-slate-600">Slow (&gt;250ms)</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      Segmented Control Track
                    </span>
                  </div>

                  {/* 04. Single-Elevation Hairline KPI Strip */}
                  <div
                    onClick={() => setSelectedHotspotId('saas-kpi-strip')}
                    className={`rounded-xl border bg-white cursor-pointer transition-all overflow-hidden ${
                      selectedHotspotId === 'saas-kpi-strip'
                        ? 'border-sky-500 ring-2 ring-sky-500 bg-sky-50/30'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="px-3 py-1.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-[10px] font-mono text-slate-500">
                      <span>SINGLE-ELEVATION HAIRLINE KPI STRIP (divide-x)</span>
                      {renderCalloutPin('04', 'saas-kpi-strip')}
                    </div>
                    <div className="grid grid-cols-3 divide-x divide-slate-200">
                      {[
                        { label: 'Total Requests', val: '1,420,910' },
                        { label: 'P95 Latency', val: '18.4 ms' },
                        { label: 'Error Rate', val: '0.02%' },
                      ].map((kpi) => (
                        <div key={kpi.label} className="p-3">
                          <div className="text-[11px] text-slate-500">{kpi.label}</div>
                          <div className="text-sm font-display font-bold text-slate-900 font-mono tabular-nums mt-0.5">
                            {kpi.val}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 05. High-Density Tabular Data Grid */}
                  <div
                    onClick={() => setSelectedHotspotId('saas-data-grid')}
                    className={`rounded-xl border bg-white cursor-pointer transition-all overflow-hidden ${
                      selectedHotspotId === 'saas-data-grid'
                        ? 'border-sky-500 ring-2 ring-sky-500'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="px-3.5 py-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800">
                        High-Density Data Grid (Right-Aligned tabular-nums)
                      </span>
                      {renderCalloutPin('05', 'saas-data-grid')}
                    </div>
                    <div className="divide-y divide-slate-200 text-xs">
                      {[
                        { path: 'POST /v1/chat/completions', status: '200 OK', ms: '142.8 ms' },
                        { path: 'GET /v1/models/lexicon-spec', status: '200 OK', ms: '19.2 ms' },
                        { path: 'POST /v1/embeddings/batch', status: '202 ACCEPTED', ms: '84.0 ms' },
                      ].map((row, idx) => (
                        <div
                          key={row.path}
                          className={`px-3.5 py-2.5 flex items-center justify-between ${
                            idx === 0 ? 'bg-sky-50/60 font-medium' : ''
                          }`}
                        >
                          <span className="font-mono text-[11px] text-slate-800 truncate">
                            {row.path}
                          </span>
                          <div className="flex items-center gap-4 shrink-0 font-mono tabular-nums text-[11px]">
                            <span className="text-emerald-700">{row.status}</span>
                            <span className="text-slate-900 w-16 text-right">{row.ms}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 06. Right Docked Inspector / Slide-Over Sheet */}
              <div
                onClick={() => setSelectedHotspotId('saas-drawer')}
                className={`w-52 shrink-0 border-l flex flex-col justify-between p-3 cursor-pointer transition-all ${
                  selectedHotspotId === 'saas-drawer'
                    ? 'bg-sky-50/70 border-sky-500 ring-2 ring-inset ring-sky-500'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-xs font-display font-bold text-slate-900">
                      Trace Inspector
                    </span>
                    {renderCalloutPin('06', 'saas-drawer')}
                  </div>
                  <div className="text-[11px] font-mono text-slate-500 space-y-1.5">
                    <div>id: &quot;req_99281a&quot;</div>
                    <div>region: &quot;iad-01&quot;</div>
                    <div>latency: 142.8ms</div>
                    <div className="p-2 rounded bg-slate-900 text-sky-300 text-[10px]">
                      {`{ "stream": true, "tokens": 412 }`}
                    </div>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-end">
                  <span className="w-full text-center py-1.5 bg-slate-900 text-white rounded text-[11px] font-medium">
                    Replay Request
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================
              TEMPLATE 2: EDITORIAL PRODUCT LAUNCH LANDING PAGE
          ================================================================= */}
          {activeTemplate.id === 'editorial-landing' && (
            <div className="p-5 space-y-5 bg-[#F8FAFC] select-none">
              {/* 01. 3-Zone Top Bar Contract */}
              <div
                onClick={() => setSelectedHotspotId('landing-topbar')}
                className={`px-4 py-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  selectedHotspotId === 'landing-topbar'
                    ? 'bg-sky-50 border-sky-500 ring-2 ring-sky-500'
                    : 'bg-white/85 backdrop-blur-md border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  {renderCalloutPin('01', 'landing-topbar')}
                  <span className="font-display font-bold text-sm text-slate-900">Chronicle</span>
                </div>
                <div className="hidden sm:flex items-center gap-5 text-xs text-slate-600">
                  <span>Architecture</span>
                  <span>Benchmarks</span>
                  <span>Customers</span>
                  <span>Pricing</span>
                </div>
                <span className="px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg">
                  Start Trial
                </span>
              </div>

              {/* 02 & 03. Split-Screen Hero (7:5) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
                {/* 02. 7-Column Balanced Typographic Stack */}
                <div
                  onClick={() => setSelectedHotspotId('landing-hero-copy')}
                  className={`md:col-span-7 p-5 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                    selectedHotspotId === 'landing-hero-copy'
                      ? 'bg-sky-50/70 border-sky-500 ring-2 ring-sky-500'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-sky-700">
                        Release 3.0 · Precision Engine
                      </span>
                      {renderCalloutPin('02', 'landing-hero-copy')}
                    </div>
                    <h3 className="font-display text-xl font-bold text-slate-900 text-balance leading-tight">
                      Deterministic infrastructure for design-led engineering teams.
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      7-column typographic stack constrained to a 60ch reading measure with
                      balanced headline line-wrapping.
                    </p>
                  </div>
                  <div className="flex items-center gap-2.5 pt-3">
                    <span className="px-3.5 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg">
                      Deploy Cluster
                    </span>
                    <span className="px-3 py-2 text-xs text-slate-600 font-medium">
                      Read Manifesto →
                    </span>
                  </div>
                </div>

                {/* 03. 5-Column Interactive Specimen Stage */}
                <div
                  onClick={() => setSelectedHotspotId('landing-hero-stage')}
                  className={`md:col-span-5 p-3.5 rounded-[20px] border cursor-pointer transition-all flex flex-col justify-between ${
                    selectedHotspotId === 'landing-hero-stage'
                      ? 'bg-slate-900 border-sky-400 ring-4 ring-sky-500/30 text-white'
                      : 'bg-slate-900 border-slate-800 text-white'
                  }`}
                >
                  <div className="flex items-center justify-between px-1 pb-2">
                    <span className="text-[10px] font-mono text-sky-400">
                      5-COL STAGE (Concentric R20 / R8)
                    </span>
                    {renderCalloutPin('03', 'landing-hero-stage')}
                  </div>
                  <div className="bg-slate-800 rounded-[8px] p-3.5 border border-slate-700 space-y-2 flex-1 flex flex-col justify-between">
                    <div className="text-xs font-mono text-emerald-400">● CLUSTER READY</div>
                    <div className="text-lg font-display font-bold tabular-nums">
                      0.42 ms P99
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Matched height parity via items-stretch
                    </div>
                  </div>
                </div>
              </div>

              {/* 04. Asymmetric Bento Grid */}
              <div
                onClick={() => setSelectedHotspotId('landing-bento')}
                className={`p-4 rounded-xl border cursor-pointer transition-all space-y-3 ${
                  selectedHotspotId === 'landing-bento'
                    ? 'bg-sky-50/70 border-sky-500 ring-2 ring-sky-500'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-slate-700">
                    BELOW-THE-FOLD ASYMMETRIC BENTO GRID (2:1 SPAN)
                  </span>
                  {renderCalloutPin('04', 'landing-bento')}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2 bg-slate-50 border border-slate-200 rounded-lg p-3">
                    <div className="text-xs font-bold text-slate-900">
                      Primary Anchor Cell (md:col-span-2)
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Carries the primary interactive product diagram
                    </div>
                  </div>
                  <div className="col-span-1 bg-slate-50 border border-slate-200 rounded-lg p-3">
                    <div className="text-xs font-bold text-slate-900">1x1 Proof Cell</div>
                    <div className="text-[11px] text-slate-500 mt-0.5 tabular-nums">+140% Speed</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================
              TEMPLATE 3: MODERN E-COMMERCE & CATALOG STUDIO
          ================================================================= */}
          {activeTemplate.id === 'ecommerce-studio' && (
            <div className="p-5 bg-[#F8FAFC] flex gap-4 select-none">
              {/* 01. Sticky Facet Filter Rail */}
              <div
                onClick={() => setSelectedHotspotId('ecom-sticky-facets')}
                className={`w-44 shrink-0 p-3.5 rounded-xl border self-start cursor-pointer transition-all space-y-3 ${
                  selectedHotspotId === 'ecom-sticky-facets'
                    ? 'bg-sky-50 border-sky-500 ring-2 ring-sky-500'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-display font-bold text-slate-900">
                    Sticky Facets
                  </span>
                  {renderCalloutPin('01', 'ecom-sticky-facets')}
                </div>
                <div className="space-y-1.5 text-xs text-slate-600">
                  {[
                    { c: 'Anodized Aluminum', n: 18 },
                    { c: 'Brushed Brass', n: 9 },
                    { c: 'Matte Ceramic', n: 14 },
                  ].map((f) => (
                    <div key={f.c} className="flex items-center justify-between">
                      <span className="truncate">{f.c}</span>
                      <span className="font-mono text-[11px] text-slate-400 tabular-nums">
                        {f.n}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-100">
                  sticky top-20 self-start
                </div>
              </div>

              {/* Right Catalog Column */}
              <div className="flex-1 space-y-4">
                {/* 02. Editorial Collection Banner with Scrim */}
                <div
                  onClick={() => setSelectedHotspotId('ecom-scrim-banner')}
                  className={`h-32 rounded-xl overflow-hidden relative cursor-pointer border transition-all flex flex-col justify-end p-4 ${
                    selectedHotspotId === 'ecom-scrim-banner'
                      ? 'border-sky-500 ring-2 ring-sky-500'
                      : 'border-slate-300'
                  }`}
                  style={{
                    background:
                      'linear-gradient(120deg, #E2E8F0 0%, #BAE6FD 50%, #FDE68A 100%)',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-transparent" />
                  <div className="relative z-10 flex items-end justify-between text-white">
                    <div>
                      <div className="text-[10px] font-mono text-sky-300">
                        Autumn Architectural Objects · 2026
                      </div>
                      <div className="text-base font-display font-bold">
                        Protected by Luminance Contrast Scrim
                      </div>
                    </div>
                    {renderCalloutPin('02', 'ecom-scrim-banner')}
                  </div>
                </div>

                {/* 03 & 04. Product Card Grid */}
                <div className="grid grid-cols-2 gap-3.5">
                  <div
                    onClick={() => setSelectedHotspotId('ecom-product-card')}
                    className={`p-3 rounded-[20px] border bg-white cursor-pointer transition-all space-y-2.5 ${
                      selectedHotspotId === 'ecom-product-card'
                        ? 'border-sky-500 ring-2 ring-sky-500'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="h-24 rounded-[8px] bg-slate-100 border border-slate-200/80 p-2.5 flex items-start justify-between">
                      <span className="text-[10px] font-mono text-slate-500">
                        aspect-[4/3] · R8
                      </span>
                      {renderCalloutPin('03', 'ecom-product-card')}
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                        <span>Monolith Desk Lamp</span>
                        <span className="font-mono tabular-nums">$280</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Machined Aluminum · Warm 2700K
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => setSelectedHotspotId('ecom-optimistic-action')}
                    className={`p-3 rounded-[20px] border bg-white cursor-pointer transition-all flex flex-col justify-between ${
                      selectedHotspotId === 'ecom-optimistic-action'
                        ? 'border-sky-500 ring-2 ring-sky-500'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">
                        Optimistic Quick-Add
                      </span>
                      {renderCalloutPin('04', 'ecom-optimistic-action')}
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Zero-latency state mutation flips button to confirmed emerald in &lt;16ms.
                    </p>
                    <span className="w-full py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold text-center block">
                      Added to Bag ✓ (1)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================
              TEMPLATE 4: SCI-FI TACTICAL HUD & ORBITAL CONSOLE (FUI)
          ================================================================= */}
          {activeTemplate.id === 'fui-orbital-hud' && (
            <div className="p-5 bg-slate-950 text-cyan-300 font-mono select-none space-y-4">
              {/* 01. Chamfered HUD Frame & Corner Reticles */}
              <div
                onClick={() => setSelectedHotspotId('fui-chamfer')}
                className={`p-3.5 border transition-all cursor-pointer relative ${
                  selectedHotspotId === 'fui-chamfer'
                    ? 'bg-cyan-950/60 border-cyan-400 ring-2 ring-cyan-400/50'
                    : 'bg-slate-900/90 border-cyan-500/40 hover:border-cyan-400/70'
                }`}
                style={{
                  clipPath:
                    'polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px))',
                }}
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    {renderCalloutPin('01', 'fui-chamfer')}
                    <span className="font-bold tracking-wider text-cyan-200 uppercase">
                      SYS.ORBITAL // CHAMFERED HUD VIEWPORT (45° CLIP-PATH)
                    </span>
                  </div>
                  <span className="text-[11px] text-cyan-400 tabular-nums">
                    AZIMUTH: 284.12° · LOCK
                  </span>
                </div>
                <div className="text-[11px] text-cyan-400/80 mt-1">
                  Corner reticle ticks + polygon(0 0, calc(100% - 18px) 0, 100% 18px...)
                </div>
              </div>

              {/* Middle Split: 02. Polar Radar HUD (5 cols) + 03. Node-Graph Patch Canvas (7 cols) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
                {/* 02. Polar Coordinate Radar & Conic Sweep */}
                <div
                  onClick={() => setSelectedHotspotId('fui-radar')}
                  className={`md:col-span-5 p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    selectedHotspotId === 'fui-radar'
                      ? 'bg-cyan-950/50 border-cyan-400 ring-2 ring-cyan-400'
                      : 'bg-slate-900/80 border-cyan-500/30 hover:border-cyan-400/60'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-cyan-200 font-bold">POLAR RADAR SWEEP</span>
                    {renderCalloutPin('02', 'fui-radar')}
                  </div>

                  <div className="my-2 mx-auto w-32 h-32 rounded-full border border-cyan-500/40 relative flex items-center justify-center overflow-hidden bg-slate-950">
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          'conic-gradient(from 45deg, rgba(34,211,238,0.38) 0deg, transparent 85deg, transparent 360deg)',
                      }}
                    />
                    <div className="w-20 h-20 rounded-full border border-cyan-500/30" />
                    <div className="w-9 h-9 rounded-full border border-cyan-500/30" />
                    <div className="absolute inset-x-0 h-px bg-cyan-500/25" />
                    <div className="absolute inset-y-0 w-px bg-cyan-500/25" />
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] absolute top-6 right-8" />
                  </div>

                  <div className="text-[10px] text-cyan-400/80 text-center tabular-nums">
                    conic-gradient() · 3 Contacts
                  </div>
                </div>

                {/* 03. Node-Graph Patch Canvas & Bezier Noodles */}
                <div
                  onClick={() => setSelectedHotspotId('fui-node-graph')}
                  className={`md:col-span-7 p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                    selectedHotspotId === 'fui-node-graph'
                      ? 'bg-cyan-950/50 border-cyan-400 ring-2 ring-cyan-400'
                      : 'bg-slate-900/80 border-cyan-500/30 hover:border-cyan-400/60'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] z-10">
                    <span className="text-cyan-200 font-bold">
                      DAG NODE-GRAPH &amp; SVG BEZIER NOODLES
                    </span>
                    {renderCalloutPin('03', 'fui-node-graph')}
                  </div>

                  <svg
                    viewBox="0 0 360 112"
                    className="w-full h-32 my-1 rounded-lg bg-slate-950/90 border border-cyan-500/20"
                  >
                    {/* Cubic Bezier Noodle from (132, 42) to (222, 74) */}
                    <path
                      d="M 132 42 C 178 42, 176 74, 222 74"
                      fill="none"
                      stroke="#083344"
                      strokeWidth="5"
                    />
                    <path
                      d="M 132 42 C 178 42, 176 74, 222 74"
                      fill="none"
                      stroke="#22d3ee"
                      strokeWidth="2.5"
                      strokeDasharray="6 4"
                    />

                    {/* Node 1: Telemetry In (x=14, y=14, w=118, h=50) */}
                    <g transform="translate(14, 14)">
                      <rect
                        width="118"
                        height="50"
                        rx="7"
                        fill="#0f172a"
                        stroke="#22d3ee"
                        strokeWidth="1.2"
                      />
                      <text x="10" y="18" fill="#a5f3fc" fontSize="9.5" fontWeight="700">
                        01 · Telemetry In
                      </text>
                      <text x="10" y="36" fill="#38bdf8" fontSize="9">
                        vec3 stream →
                      </text>
                    </g>
                    <circle cx="132" cy="42" r="5" fill="#020617" stroke="#22d3ee" strokeWidth="2" />
                    <circle cx="132" cy="42" r="2" fill="#22d3ee" />

                    {/* Node 2: Kalman Solver (x=222, y=46, w=124, h=50) */}
                    <g transform="translate(222, 46)">
                      <rect
                        width="124"
                        height="50"
                        rx="7"
                        fill="#0f172a"
                        stroke="#34d399"
                        strokeWidth="1.2"
                      />
                      <text x="12" y="18" fill="#6ee7b7" fontSize="9.5" fontWeight="700">
                        02 · Kalman Solver
                      </text>
                      <text x="12" y="36" fill="#34d399" fontSize="9">
                        → 99.8 Hz Lock
                      </text>
                    </g>
                    <circle cx="222" cy="74" r="5" fill="#020617" stroke="#34d399" strokeWidth="2" />
                    <circle cx="222" cy="74" r="2" fill="#34d399" />
                  </svg>

                  <div className="text-[10px] text-cyan-400/80">
                    SVG &lt;path d=&quot;M 132 42 C 178 42, 176 74, 222 74&quot; /&gt;
                  </div>
                </div>
              </div>

              {/* 04. CRT Scanline & Phosphor Telemetry Log */}
              <div
                onClick={() => setSelectedHotspotId('fui-crt-log')}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                  selectedHotspotId === 'fui-crt-log'
                    ? 'bg-slate-900 border-amber-400 ring-2 ring-amber-400'
                    : 'bg-slate-900/95 border-amber-500/40 hover:border-amber-400/70'
                }`}
              >
                <div
                  className="absolute inset-0 pointer-events-none opacity-25"
                  style={{
                    background:
                      'repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0, 0, 0, 0.85) 3px, rgba(0, 0, 0, 0.85) 4px)',
                  }}
                />
                <div className="relative z-10 flex items-center justify-between">
                  <div
                    className="text-xs text-amber-300 space-y-0.5"
                    style={{ textShadow: '0 0 8px rgba(251, 191, 36, 0.65)' }}
                  >
                    <div className="font-bold">
                      &gt; CRT PHOSPHOR SCANLINE LOG // CHROMATIC BLOOM ACTIVE
                    </div>
                    <div className="text-[11px] text-amber-400/90 tabular-nums">
                      [00:42:19.08] THRUSTER_GIMBAL_SYNC: OK · P99 JITTER 0.04ms
                    </div>
                  </div>
                  {renderCalloutPin('04', 'fui-crt-log')}
                </div>
              </div>
            </div>
          )}

          {/* Bottom Hotspot Strip Selector */}
          <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-500 mr-1">Hotspots:</span>
            {activeTemplate.hotspots.map((h) => {
              const isSelected = h.id === selectedHotspotId;
              return (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => setSelectedHotspotId(h.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-slate-900 text-white'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="font-mono text-[11px] opacity-75">{h.pinNumber}.</span>
                  <span>{h.termName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT 5 COLUMNS: Synced Anatomy Specification Sheet */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-2xs sticky top-24">
          <div className="flex items-start justify-between gap-3 border-b border-slate-200 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-[#DC2626] font-semibold">
                <span>PIN {activeHotspot.pinNumber}</span>
                <span>·</span>
                <span>{activeHotspot.zoneLabel}</span>
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900">
                {activeHotspot.termName}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => onJumpToTerm(activeHotspot.linkedTermId)}
              className="px-3 py-1.5 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-lg flex items-center gap-1 whitespace-nowrap shrink-0"
            >
              <span>Open Sandbox</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* UX Purpose & Spatial Rule */}
          <div className="space-y-3">
            <div>
              <div className="text-xs font-mono font-semibold text-slate-500">
                ARCHITECTURAL PURPOSE
              </div>
              <p className="text-sm text-slate-700 mt-1 leading-relaxed">
                {activeHotspot.uxPurpose}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="text-xs font-mono font-semibold text-slate-700">
                SPATIAL & GEOMETRIC RULE
              </div>
              <p className="text-xs font-mono text-sky-800">{activeHotspot.spatialRule}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-amber-800">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>COMMON VIBE-CODING MISTAKE</span>
              </div>
              <p className="text-xs text-amber-950">{activeHotspot.vibeMistake}</p>
            </div>
          </div>

          {/* Exact Prompt for This Region */}
          <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/50 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-900">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>EXACT PROMPT FOR THIS REGION</span>
              </div>
              <button
                type="button"
                onClick={() => handleCopyHotspotPrompt(activeHotspot)}
                className="px-2.5 py-1 text-xs font-semibold bg-emerald-800 text-white rounded-md hover:bg-emerald-900 transition-colors flex items-center gap-1.5"
              >
                {copiedId === activeHotspot.id ? (
                  <>
                    <Check className="w-3 h-3" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Prompt</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-xs font-mono text-slate-900 bg-white p-3 rounded-lg border border-emerald-200 leading-relaxed">
              {activeHotspot.agentPrompt}
            </p>
          </div>

          {/* CSS Signature + Add to Spec Cart */}
          <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-3">
            <code className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2.5 py-1 rounded truncate">
              {activeHotspot.cssSignature}
            </code>

            <button
              type="button"
              onClick={() => onToggleSpecCart(activeHotspot.linkedTermId)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                specCartIds.includes(activeHotspot.linkedTermId)
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'bg-slate-900 border-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              {specCartIds.includes(activeHotspot.linkedTermId)
                ? 'In Spec Cart ✓'
                : '+ Add Term to Spec'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
