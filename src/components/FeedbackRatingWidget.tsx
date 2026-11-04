import React, { useState } from 'react';
import { Star, Send, CheckCircle2, Loader2, X } from 'lucide-react';

export interface FeedbackRatingWidgetProps {
  /** Optional override for project slug; defaults to package.json name "lexicon-ui" */
  projectId?: string;
  /** Optional className for container layout customization */
  className?: string;
}

const TELEMETRY_ENDPOINT = 'https://visar-backend.onrender.com/api/v1/feedback';
const DEFAULT_PROJECT_SLUG = 'lexicon-ui';

const STAR_LABELS: Record<number, string> = {
  1: 'Needs work',
  2: 'Fair',
  3: 'Good',
  4: 'Great',
  5: 'Loved it!',
};

export const FeedbackRatingWidget: React.FC<FeedbackRatingWidgetProps> = ({
  projectId = DEFAULT_PROJECT_SLUG,
  className = '',
}) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'expanded' | 'submitting' | 'settled'>('idle');

  const activeStarValue = hoveredRating ?? selectedRating ?? 0;

  const handleStarClick = (starValue: number) => {
    if (status === 'submitting' || status === 'settled') return;
    setSelectedRating(starValue);
    setStatus('expanded');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRating || status === 'submitting' || status === 'settled') return;

    setStatus('submitting');

    const payload = {
      projectId: projectId.trim() || DEFAULT_PROJECT_SLUG,
      rating: selectedRating,
      feedback: feedback.trim(),
      name: name.trim(),
      email: email.trim(),
      path:
        typeof window !== 'undefined'
          ? `${window.location.pathname}${window.location.hash || ''}` || '/'
          : '/',
    };

    try {
      await window.fetch(TELEMETRY_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    } catch {
      // Silent failure per production guard directives: never crash UI or show disruptive alerts
    } finally {
      setStatus('settled');
    }
  };

  if (status === 'settled') {
    return (
      <div
        role="status"
        aria-live="polite"
        className={`inline-flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-emerald-50/90 border border-emerald-200 text-xs font-medium text-emerald-900 transition-all duration-200 ${className}`}
      >
        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>Thanks for your feedback!</span>
        <div className="flex items-center gap-0.5 pl-1 border-l border-emerald-200/80">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-3 h-3 ${
                star <= (selectedRating ?? 5)
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-slate-300'
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 transition-all duration-200 ${className}`}
    >
      {/* Top Row: Compact 1-5 Star Interactive Control */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-display text-xs font-bold text-slate-900 whitespace-nowrap">
            Rate LexiconUI
          </span>
          {activeStarValue > 0 && (
            <span className="text-[11px] font-mono text-sky-700 font-medium transition-opacity duration-150">
              · {STAR_LABELS[activeStarValue]}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1" role="group" aria-label="Rate this project 1 to 5 stars">
          {[1, 2, 3, 4, 5].map((star) => {
            const isFilled = star <= activeStarValue;
            const isSelected = selectedRating === star;
            return (
              <button
                key={star}
                type="button"
                disabled={status === 'submitting'}
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(null)}
                onFocus={() => setHoveredRating(star)}
                onBlur={() => setHoveredRating(null)}
                aria-label={`Rate ${star} out of 5 stars`}
                aria-pressed={isSelected}
                className="p-1.5 rounded-lg hover:bg-white hover:shadow-xs focus-visible:outline-2 focus-visible:outline-sky-500 transition-all duration-150 active:scale-95 group cursor-pointer disabled:opacity-50"
              >
                <Star
                  className={`w-4 h-4 transition-transform duration-150 group-hover:scale-110 ${
                    isFilled
                      ? 'fill-amber-400 text-amber-400'
                      : 'fill-transparent text-slate-400 group-hover:text-amber-400'
                  }`}
                />
              </button>
            );
          })}

          {status === 'expanded' && (
            <button
              type="button"
              onClick={() => {
                setStatus('idle');
                setSelectedRating(null);
                setHoveredRating(null);
              }}
              aria-label="Close feedback form"
              className="ml-1 p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Progressive Disclosure: Expanded Form on Star Selection */}
      {(status === 'expanded' || status === 'submitting') && (
        <form onSubmit={handleSubmit} className="mt-3 pt-3 border-t border-slate-200/80 space-y-2.5">
          <div>
            <label htmlFor="lexicon-feedback-comment" className="sr-only">
              Optional feedback comment
            </label>
            <textarea
              id="lexicon-feedback-comment"
              rows={2}
              maxLength={500}
              disabled={status === 'submitting'}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Optional thoughts, bugs, or ideas..."
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500/20 disabled:opacity-60 resize-none transition-colors"
            />
            <div className="flex justify-end mt-0.5">
              <span className="text-[10px] font-mono text-slate-400 tabular-nums">
                {feedback.length}/500
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label htmlFor="lexicon-feedback-name" className="sr-only">
                Name (optional)
              </label>
              <input
                id="lexicon-feedback-name"
                type="text"
                maxLength={100}
                disabled={status === 'submitting'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name (optional)"
                className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500/20 disabled:opacity-60 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="lexicon-feedback-email" className="sr-only">
                Email (optional - for reply)
              </label>
              <input
                id="lexicon-feedback-email"
                type="email"
                maxLength={150}
                disabled={status === 'submitting'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email (optional - for reply)"
                className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500/20 disabled:opacity-60 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 pt-0.5">
            <span className="text-[11px] text-slate-500">
              Submitting <strong className="font-mono text-slate-800">{selectedRating}/5★</strong>{' '}
              rating
            </span>

            <button
              type="submit"
              disabled={status === 'submitting' || !selectedRating}
              className="min-h-[34px] px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-all active:scale-[0.99] whitespace-nowrap shrink-0 cursor-pointer disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-sky-400" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 text-sky-400" />
                  <span>Send Feedback</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
