import React, { useState, useMemo, useEffect } from 'react';
import { Heart, Search, Shuffle, Sparkles, Filter, ChevronDown } from 'lucide-react';
import { ALL_101_REASONS } from '../data/reasons';
import { Reason, ReasonCategory } from '../types';
import { soundSynth } from '../utils/soundSynthesizer';

export const ReasonsGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ReasonCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [randomModalReason, setRandomModalReason] = useState<Reason | null>(null);
  const [sweetnessRevealed, setSweetnessRevealed] = useState(false);

  // Load favorites from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('romantic_fav_reasons');
      if (saved) setFavorites(JSON.parse(saved));
    } catch {
      // safe fallback
    }
  }, []);

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    soundSynth.playSparkle();
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      try {
        localStorage.setItem('romantic_fav_reasons', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const filteredReasons = useMemo(() => {
    return ALL_101_REASONS.filter(r => {
      const matchesCategory = selectedCategory === 'all' || r.category === selectedCategory;
      const matchesSearch = r.text.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const displayedReasons = useMemo(() => {
    return filteredReasons.slice(0, visibleCount);
  }, [filteredReasons, visibleCount]);

  const handlePickRandom = () => {
    soundSynth.playSparkle();
    const randomIndex = Math.floor(Math.random() * ALL_101_REASONS.length);
    setRandomModalReason(ALL_101_REASONS[randomIndex]);
  };

  const handleSweetnessClick = () => {
    soundSynth.playSparkle();
    setSweetnessRevealed(true);
  };

  return (
    <section id="reasons" className="py-20 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs uppercase tracking-widest text-[#FF6F91] font-semibold">
          Curated With Love
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif-romantic font-bold text-[#6D2446] mt-2 mb-3" style={{ textWrap: 'balance' }}>
          101 Reasons You're My Favourite Person 🌷
        </h2>
        <p className="text-sm sm:text-base text-[#6D2446]/80 max-w-xl mx-auto">
          Every single one is true. From the sweet and tender, to the silly and chaotic quirks that make you uniquely you.
        </p>

        {/* Counter & Action Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <div className="text-xs font-medium text-[#6D2446]/80 px-3 py-1.5 rounded-full bg-white border border-[#FFC6D4] shadow-sm">
            <span>Discovered: </span>
            <strong className="text-[#FF6F91]">{displayedReasons.length}</strong>
            <span> of 101</span>
          </div>

          <button
            onClick={handlePickRandom}
            type="button"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FF6F91] text-white text-xs font-semibold hover:bg-[#ff5b83] transition-all shadow-sm"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>✨ Pick a Random Reason</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="mb-8 space-y-4">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white/70 backdrop-blur-md rounded-2xl border border-[#FFC6D4]/60 max-w-2xl mx-auto shadow-sm">
          {[
            { id: 'all', label: 'All (101)' },
            { id: 'sweet', label: 'Sweet & Soft 🍯' },
            { id: 'playful', label: 'Playful & Teasing 🤭' },
            { id: 'habits', label: 'Little Habits ☕' },
            { id: 'deep', label: 'Deep & Soulful 💫' },
            { id: 'future', label: 'Future Dreams ✈️' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedCategory(tab.id as ReasonCategory);
                setVisibleCount(12);
              }}
              type="button"
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === tab.id
                  ? 'bg-[#FF6F91] text-white shadow-sm'
                  : 'text-[#6D2446]/70 hover:text-[#6D2446] hover:bg-[#FFC6D4]/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-[#6D2446]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
              setVisibleCount(12);
            }}
            placeholder="Search reasons (e.g. smile, laugh, hugs, coffee)..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-full bg-white/80 border border-[#FFC6D4] text-[#6D2446] placeholder-[#6D2446]/40 focus:outline-none focus:ring-2 focus:ring-[#FF6F91]/50 shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#6D2446]/50 hover:text-[#6D2446]"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {displayedReasons.map(reason => {
          const isFav = favorites.includes(reason.id);
          return (
            <div
              key={reason.id}
              className="group glass-card rounded-2xl p-5 border border-[#FFC6D4]/60 hover:border-[#FF6F91] transition-all duration-300 hover:shadow-lg flex flex-col justify-between relative overflow-hidden"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-3 text-xs text-[#6D2446]/50">
                <span className="font-mono font-bold text-[#FF6F91]">
                  #{reason.id.toString().padStart(3, '0')}
                </span>
                <div className="flex items-center gap-2">
                  <span className="capitalize text-[11px] font-medium tracking-wide">
                    {reason.category}
                  </span>
                  <button
                    onClick={e => toggleFavorite(reason.id, e)}
                    type="button"
                    title={isFav ? "Favorited" : "Add to favorites"}
                    className="p-1 rounded-full hover:bg-[#FFC6D4]/40 transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 transition-transform ${
                        isFav ? 'fill-[#FF6F91] text-[#FF6F91] scale-110' : 'text-[#6D2446]/40 hover:text-[#FF6F91]'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <p className="font-serif-romantic text-base sm:text-lg text-[#6D2446] leading-relaxed my-2">
                “{reason.text}”
              </p>

              {/* Card Footer Accent */}
              <div className="pt-2 flex items-center justify-end text-[#FF6F91]/40 text-xs">
                <span>💌</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {displayedReasons.length === 0 && (
        <div className="text-center py-12 glass-card rounded-2xl max-w-md mx-auto">
          <p className="text-sm text-[#6D2446]/70">No reasons found matching "{searchQuery}".</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            type="button"
            className="mt-3 text-xs font-semibold text-[#FF6F91] underline"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Pagination / Show More */}
      {visibleCount < filteredReasons.length && (
        <div className="mt-10 text-center flex items-center justify-center gap-3">
          <button
            onClick={() => setVisibleCount(prev => prev + 12)}
            type="button"
            className="px-6 py-2.5 rounded-full bg-white text-[#6D2446] text-xs sm:text-sm font-semibold border border-[#FFC6D4] hover:bg-[#FFF8F1] transition-all shadow-sm"
          >
            Show More Reasons ({filteredReasons.length - visibleCount} remaining)
          </button>
          <button
            onClick={() => setVisibleCount(filteredReasons.length)}
            type="button"
            className="px-4 py-2.5 rounded-full bg-[#E8DDF8] text-[#6D2446] text-xs font-semibold hover:bg-[#d8c5f5] transition-all"
          >
            Show All 101 ✨
          </button>
        </div>
      )}

      {/* The Requested Teasing Sweetness Button */}
      <div className="mt-16 text-center max-w-xl mx-auto">
        {!sweetnessRevealed ? (
          <button
            onClick={handleSweetnessClick}
            type="button"
            className="px-6 py-3 rounded-full bg-white text-[#6D2446] font-serif-romantic font-semibold text-sm sm:text-base border border-[#FFC6D4] hover:bg-[#FFF8F1] transition-all shadow-sm group"
          >
            <span>“Okay, that's enough sweetness… for now. 😏”</span>
          </button>
        ) : (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#FFEBF0] to-[#F3EBFC] border border-[#FF6F91]/40 shadow-md animate-in fade-in duration-500">
            <Sparkles className="w-6 h-6 text-[#FF6F91] mx-auto mb-2" />
            <p className="font-serif-romantic text-lg sm:text-xl font-bold text-[#6D2446]">
              “Who am I kidding? I could write a thousand more.” 💖
            </p>
            <p className="text-xs text-[#6D2446]/70 mt-1 font-serif-romantic italic">
              Because every day with you adds another chapter to the book.
            </p>
          </div>
        )}
      </div>

      {/* Random Reason Modal */}
      {randomModalReason && (
        <div
          onClick={() => setRandomModalReason(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border-2 border-[#FFC6D4] shadow-2xl text-center space-y-4"
          >
            <span className="text-xs font-mono font-bold text-[#FF6F91]">
              REASON #{randomModalReason.id.toString().padStart(3, '0')}
            </span>
            <p className="font-serif-romantic text-xl sm:text-2xl text-[#6D2446] leading-relaxed">
              “{randomModalReason.text}”
            </p>
            <button
              onClick={() => setRandomModalReason(null)}
              type="button"
              className="mt-4 px-6 py-2.5 rounded-full bg-[#FF6F91] text-white text-xs sm:text-sm font-semibold hover:bg-[#ff5b83] transition-all"
            >
              Love it! 💖
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
