import React from 'react';
import { Heart } from 'lucide-react';

interface TopNavProps {
  onLoveMeterClick?: () => void;
  loveMeterValue: number;
}

export const TopNav: React.FC<TopNavProps> = ({ onLoveMeterClick, loveMeterValue }) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FFF8F1]/85 border-b border-[#FFC6D4]/50 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4 md:gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#opening"
          className="text-lg sm:text-xl font-serif-romantic font-bold tracking-tight text-[#6D2446] whitespace-nowrap shrink-0 hover:text-[#FF6F91] transition-colors flex items-center gap-1.5"
        >
          <span>One Question…</span>
          <span className="text-sm">💌</span>
        </a>

        {/* Zone 2: 4–5 clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#6D2446]/80">
          <a href="#tease" className="hover:text-[#FF6F91] transition-colors whitespace-nowrap shrink-0">
            The Tease
          </a>
          <a href="#reasons" className="hover:text-[#FF6F91] transition-colors whitespace-nowrap shrink-0">
            101 Reasons
          </a>
          <a href="#quiz" className="hover:text-[#FF6F91] transition-colors whitespace-nowrap shrink-0">
            Our Quiz
          </a>
          <a href="#memories" className="hover:text-[#FF6F91] transition-colors whitespace-nowrap shrink-0">
            Memories
          </a>
          <a href="#proposal" className="hover:text-[#FF6F91] transition-colors whitespace-nowrap shrink-0">
            The Question
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action (Love-O-Meter Easter Egg) */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onLoveMeterClick}
            type="button"
            title="Click to measure our love!"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#6D2446] bg-[#FFC6D4]/40 hover:bg-[#FFC6D4]/70 rounded-full transition-all border border-[#FF6F91]/30 whitespace-nowrap shrink-0 shadow-sm"
          >
            <Heart className="w-3.5 h-3.5 text-[#FF6F91] fill-[#FF6F91] animate-pulse" />
            <span className="tabular-nums font-semibold">Love: {loveMeterValue}%</span>
          </button>
        </div>

      </div>
    </header>
  );
};
