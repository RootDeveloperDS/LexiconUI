import React from 'react';

interface LexiconLogoProps {
  className?: string;
  size?: number;
}

/**
 * LexiconUI Vector Mark:
 * Combines a Swiss Bento Grid "L" monogram, concentric border-radius math,
 * blueprint coordinate hairlines, and an X-Ray Inspector callout pin.
 */
export const LexiconLogo: React.FC<LexiconLogoProps> = ({
  className = '',
  size = 28,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-hidden="true"
    >
      {/* Outer Concentric Architectural Squircle */}
      <rect
        x="2"
        y="2"
        width="60"
        height="60"
        rx="14"
        fill="#0F172A"
        stroke="#1E293B"
        strokeWidth="2"
      />

      {/* Subtle Blueprint Grid Hairlines */}
      <line
        x1="28"
        y1="8"
        x2="28"
        y2="56"
        stroke="#334155"
        strokeWidth="1"
        strokeDasharray="2 2"
      />
      <line
        x1="8"
        y1="36"
        x2="56"
        y2="36"
        stroke="#334155"
        strokeWidth="1"
        strokeDasharray="2 2"
      />

      {/* Swiss Bento Cell 1: Vertical Left Stem of "L" */}
      <rect x="11" y="11" width="13" height="42" rx="4" fill="#F8FAFC" />

      {/* Swiss Bento Cell 2: Bottom Horizontal Base of "L" (Klein Blueprint Blue) */}
      <rect x="28" y="40" width="25" height="13" rx="4" fill="#0284C7" />
      <rect
        x="28"
        y="40"
        width="25"
        height="4"
        rx="2"
        fill="#38BDF8"
        fillOpacity="0.45"
      />

      {/* Swiss Bento Cell 3: Top-Right X-Ray Anatomy Inspector Frame */}
      <rect
        x="28"
        y="11"
        width="25"
        height="25"
        rx="5"
        fill="#1E293B"
        stroke="#38BDF8"
        strokeWidth="1.75"
      />

      {/* X-Ray Callout Pin Node (Swiss Vermilion #EF4444) */}
      <circle cx="40.5" cy="23.5" r="7" fill="#DC2626" fillOpacity="0.24" />
      <circle
        cx="40.5"
        cy="23.5"
        r="4"
        fill="#EF4444"
        stroke="#F8FAFC"
        strokeWidth="1.5"
      />

      {/* Corner Precision Reticle Ticks */}
      <path
        d="M7 15V9C7 7.89543 7.89543 7 9 7H15"
        stroke="#38BDF8"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M57 49V55C57 56.1046 56.1046 57 55 57H49"
        stroke="#38BDF8"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
