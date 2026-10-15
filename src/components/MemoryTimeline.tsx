import React, { useState } from 'react';
import { Calendar, Heart, ZoomIn, X, Sparkles, Image as ImageIcon } from 'lucide-react';
import { TIMELINE_MEMORIES } from '../data/memories';
import { MemoryItem } from '../types';
import { soundSynth } from '../utils/soundSynthesizer';

export const MemoryTimeline: React.FC = () => {
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);

  const handleOpenMemory = (m: MemoryItem) => {
    setSelectedMemory(m);
    soundSynth.playSparkle();
  };

  return (
    <section id="memories" className="py-20 px-4 max-w-5xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-widest text-[#FF6F91] font-semibold">
          Our Journey
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif-romantic font-bold text-[#6D2446] mt-2 mb-3" style={{ textWrap: 'balance' }}>
          Little Moments, Big Feelings 🌙
        </h2>
        <p className="text-sm sm:text-base text-[#6D2446]/80">
          The chapters that brought us here. Click any memory polaroid to open the full story.
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Central glowing timeline line */}
        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#FFC6D4] via-[#FF6F91] to-[#E8DDF8] shadow-sm" />

        <div className="space-y-12 md:space-y-16">
          {TIMELINE_MEMORIES.map((memory, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={memory.id}
                className={`relative flex flex-col md:flex-row items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Center Node */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-[#FF6F91] items-center justify-center z-10 shadow-md">
                  <span className="text-xs font-bold text-[#6D2446]">{memory.id}</span>
                </div>

                {/* Card Container */}
                <div className="w-full md:w-[46%]">
                  <div
                    onClick={() => handleOpenMemory(memory)}
                    className="glass-card rounded-3xl p-5 border border-[#FFC6D4]/60 hover:border-[#FF6F91] transition-all duration-300 hover:shadow-xl cursor-pointer group"
                  >
                    {/* Polaroid Styled Header / Artwork */}
                    <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden bg-gradient-to-br from-[#FFEBF0] to-[#F3EBFC] border border-[#FFC6D4]/40 flex flex-col items-center justify-center p-4 text-center group-hover:scale-[1.01] transition-transform">
                      {/* Romantic Vector Art Silhouette Placeholder */}
                      <div className="w-16 h-16 rounded-full bg-white/80 shadow-md flex items-center justify-center text-[#FF6F91] mb-3 group-hover:scale-110 transition-transform">
                        <Heart className="w-8 h-8 fill-[#FF6F91]/20 text-[#FF6F91]" />
                      </div>
                      <span className="text-xs uppercase tracking-wider text-[#FF6F91] font-semibold">
                        {memory.date}
                      </span>
                      <h4 className="text-lg font-serif-romantic font-bold text-[#6D2446] mt-1">
                        {memory.title}
                      </h4>
                      <p className="text-xs text-[#6D2446]/60 italic mt-1 line-clamp-1">
                        {memory.subtitle}
                      </p>

                      {/* Click indicator badge */}
                      <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-full bg-white/90 text-[11px] font-semibold text-[#6D2446] shadow-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ZoomIn className="w-3 h-3 text-[#FF6F91]" />
                        <span>Read Story</span>
                      </div>
                    </div>

                    {/* Card Content Snippet */}
                    <div className="mt-4 px-1">
                      <div className="flex items-center justify-between text-xs text-[#6D2446]/60 mb-2">
                        <span className="font-handwriting text-lg text-[#FF6F91]">Memory #{memory.id}</span>
                        <span className="flex items-center gap-1 font-sans-clean">
                          <Calendar className="w-3.5 h-3.5 text-[#FF6F91]" />
                          <span>{memory.date}</span>
                        </span>
                      </div>
                      <p className="font-serif-romantic text-sm text-[#6D2446]/85 line-clamp-3 leading-relaxed">
                        {memory.story}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expanded Lightbox Modal */}
      {selectedMemory && (
        <div
          onClick={() => setSelectedMemory(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border-2 border-[#FFC6D4] shadow-2xl relative max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedMemory(null)}
              type="button"
              className="absolute top-4 right-4 p-2 rounded-full bg-[#FFF8F1] text-[#6D2446] hover:bg-[#FFC6D4]/40 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image & Header */}
            <div className="h-44 sm:h-52 rounded-2xl bg-gradient-to-tr from-[#FFEBF0] via-[#FFF8F1] to-[#E8DDF8] border border-[#FFC6D4]/50 flex flex-col items-center justify-center p-6 text-center relative">
              <div className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center text-[#FF6F91] mb-2">
                <Heart className="w-7 h-7 fill-[#FF6F91] text-[#FF6F91]" />
              </div>
              <span className="text-xs uppercase tracking-widest text-[#FF6F91] font-semibold">
                {selectedMemory.date}
              </span>
              <h3 className="text-2xl font-serif-romantic font-bold text-[#6D2446] mt-1">
                {selectedMemory.title}
              </h3>
              <p className="text-xs text-[#6D2446]/70 italic mt-1 font-serif-romantic">
                {selectedMemory.subtitle}
              </p>
            </div>

            {/* Editable Hint Guide */}
            <div className="mt-3 p-2.5 rounded-xl bg-[#FFF8F1] border border-[#FFC6D4]/40 text-[11px] text-[#6D2446]/70 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[#FF6F91] shrink-0" />
              <span>{selectedMemory.placeholderDesc}</span>
            </div>

            {/* Story Prose */}
            <div className="mt-5 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#6D2446]/60">
                The Full Story
              </span>
              <p className="font-serif-romantic text-base sm:text-lg text-[#6D2446] leading-relaxed">
                {selectedMemory.story}
              </p>
            </div>

            {/* Bottom Button */}
            <div className="mt-6 text-center">
              <button
                onClick={() => setSelectedMemory(null)}
                type="button"
                className="px-6 py-2.5 rounded-full bg-[#6D2446] text-white text-xs sm:text-sm font-semibold hover:bg-[#571c36] transition-all shadow-md"
              >
                Close Memory 🌸
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
