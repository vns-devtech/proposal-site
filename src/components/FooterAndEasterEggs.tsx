import React, { useState } from 'react';
import { Heart, Sparkles, X, Gift } from 'lucide-react';
import { soundSynth } from '../utils/soundSynthesizer';

interface FooterAndEasterEggsProps {
  toastMessage: string | null;
  onCloseToast: () => void;
  visitedCount: number;
}

export const FooterAndEasterEggs: React.FC<FooterAndEasterEggsProps> = ({
  toastMessage,
  onCloseToast,
  visitedCount,
}) => {
  const [weaknessModalOpen, setWeaknessModalOpen] = useState(false);

  const handleWeaknessClick = () => {
    soundSynth.playSparkle();
    setWeaknessModalOpen(true);
  };

  return (
    <>
      {/* Quiet, tasteful footer */}
      <footer className="py-12 px-4 border-t border-[#FFC6D4]/50 bg-white/60 backdrop-blur-md text-center text-xs text-[#6D2446]/70 relative">
        <div className="max-w-4xl mx-auto space-y-3">
          <p className="font-serif-romantic text-sm text-[#6D2446]">
            Made with infinite love and playful teasing for my favorite person in the entire universe. 🌸
          </p>

          <div className="flex items-center justify-center gap-4 text-[11px] text-[#6D2446]/60">
            <span>© {new Date().getFullYear()} Our Love Story</span>
            <span>·</span>
            <span>All Smiles Reserved</span>
            <span>·</span>
            {/* Easter Egg #3: Secret Weakness Clover */}
            <button
              onClick={handleWeaknessClick}
              type="button"
              title="A little secret…"
              className="hover:scale-125 transition-transform text-sm select-none p-1 cursor-pointer"
            >
              🍀
            </button>
          </div>

          {/* Love Passport Explorer Badge */}
          {visitedCount >= 5 && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8DDF8]/70 text-[#6D2446] text-[11px] font-medium mt-2">
              <Sparkles className="w-3 h-3 text-[#FF6F91]" />
              <span>Love Passport: {visitedCount}/6 Areas Explored</span>
            </div>
          )}
        </div>
      </footer>

      {/* Easter Egg Toast Notification (Compliments / Stars) */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-sm w-[90%] bg-white/95 border-2 border-[#FFC6D4] text-[#6D2446] p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-3 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-[#FF6F91] shrink-0 animate-bounce" />
            <p className="text-xs sm:text-sm font-medium">{toastMessage}</p>
          </div>
          <button
            onClick={onCloseToast}
            type="button"
            className="p-1 rounded-full hover:bg-[#FFC6D4]/40 text-[#6D2446]/60 hover:text-[#6D2446]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Easter Egg #3 Modal: Secret Weakness */}
      {weaknessModalOpen && (
        <div
          onClick={() => setWeaknessModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full border-2 border-[#FF6F91] shadow-2xl text-center space-y-4"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-[#FFEBF0] flex items-center justify-center text-[#FF6F91]">
              <Gift className="w-8 h-8" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6F91]">
              Top Secret Classified File
            </span>

            <h4 className="text-2xl font-serif-romantic font-bold text-[#6D2446]">
              You found my secret weakness: YOU. 😭❤️
            </h4>

            <p className="text-xs sm:text-sm text-[#6D2446]/80">
              One pout, one smile, or one look from you and I instantly lose every argument.
            </p>

            <button
              onClick={() => setWeaknessModalOpen(false)}
              type="button"
              className="px-6 py-2 rounded-full bg-[#FF6F91] text-white text-xs font-semibold hover:bg-[#ff5b83] transition-all"
            >
              Guilty as charged! 🙈
            </button>
          </div>
        </div>
      )}
    </>
  );
};
