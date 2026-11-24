import React from 'react';

interface OrnamentProps {
  className?: string;
  color?: string;
  size?: number;
}

/**
 * Қошқар мүйіз (Koshkar-Muyiz / Ram's Horn)
 * The quintessential Kazakh ornament, embodying strength, prosperity, and cosmic balance.
 */
export const KoshkarMuyiz: React.FC<OrnamentProps> = ({
  className = "w-8 h-8",
  color = "currentColor",
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M50 20 C42 8 20 8 16 26 C12 42 30 52 42 42 C48 37 46 28 39 28 C33 28 32 34 37 36 C34 39 26 34 26 26 C26 16 38 16 45 25 L50 32 L55 25 C62 16 74 16 74 26 C74 34 66 39 63 36 C68 34 67 28 61 28 C54 28 52 37 58 42 C70 52 88 42 84 26 C80 8 58 8 50 20 Z"
        fill={color}
      />
      <path
        d="M50 32 V85 M50 85 L40 75 M50 85 L60 75"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="50" cy="55" r="4" fill={color} />
    </svg>
  );
};

/**
 * Traditional Kazakh Horizontal Section Divider with central Koshkar-Muyiz motif
 */
export const KazakhDivider: React.FC<{
  className?: string;
  accentColor?: string;
  primaryColor?: string;
  label?: string;
}> = ({
  className = "my-12",
  accentColor = "#C49A45",
  primaryColor = "#0D4352",
  label,
}) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center ${className}`}>
      <div className="w-full flex items-center justify-center space-x-4 max-w-4xl px-4">
        {/* Left ornament taper */}
        <div className="flex-1 flex items-center justify-end space-x-1">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#C49A45]/40 to-[#0D4352]/70" />
          <svg width="24" height="12" viewBox="0 0 24 12" fill="none" className="shrink-0 text-[#C49A45]">
            <path d="M0 6 H16 L22 1 L24 6 L22 11 L16 6" fill="currentColor" opacity="0.8" />
          </svg>
        </div>

        {/* Central Kazakh Emblem */}
        <div className="flex items-center space-x-3 px-3 py-1 border border-[#C49A45]/40 bg-[#F7F5F0] rounded-sm shadow-sm">
          <svg width="28" height="28" viewBox="0 0 60 60" fill="none">
            <circle cx="30" cy="30" r="28" stroke={accentColor} strokeWidth="1.5" strokeDasharray="3 3" />
            <path
              d="M30 14 C25 8 12 8 9 18 C6 28 17 34 25 28 C29 25 28 19 23 19 C19 19 19 23 22 24 C20 26 15 23 15 18 C15 12 23 12 27 17 L30 22 L33 17 C37 12 45 12 45 18 C45 23 40 26 38 24 C41 23 41 19 37 19 C32 19 31 25 35 28 C43 34 54 28 51 18 C48 8 35 8 30 14 Z"
              fill={primaryColor}
            />
            <path
              d="M30 22 V46 M30 46 L24 40 M30 46 L36 40"
              stroke={accentColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {label && (
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#0D4352] uppercase font-serif">
              {label}
            </span>
          )}
        </div>

        {/* Right ornament taper */}
        <div className="flex-1 flex items-center justify-start space-x-1">
          <svg width="24" height="12" viewBox="0 0 24 12" fill="none" className="shrink-0 text-[#C49A45] rotate-180">
            <path d="M0 6 H16 L22 1 L24 6 L22 11 L16 6" fill="currentColor" opacity="0.8" />
          </svg>
          <div className="h-[1px] w-full bg-gradient-to-l from-transparent via-[#C49A45]/40 to-[#0D4352]/70" />
        </div>
      </div>
    </div>
  );
};

/**
 * Corner ornamental accents for cards and editorial images
 */
export const KazakhCornerOrnament: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  color?: string;
}> = ({ position, className = "w-6 h-6", color = "#C49A45" }) => {
  const rotationClass = {
    'top-left': 'rotate-0',
    'top-right': 'rotate-90',
    'bottom-right': 'rotate-180',
    'bottom-left': '-rotate-90',
  }[position];

  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={`${className} ${rotationClass} pointer-events-none`}
    >
      <path
        d="M2 30 V6 C2 3.79 3.79 2 6 2 H30 M6 6 H14 M6 6 V14 M10 10 L16 16"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="6" cy="6" r="2" fill={color} />
    </svg>
  );
};
