import React, { useState, useEffect, useRef } from 'react';
import { Mail, Sparkles, Heart, ArrowDown, FastForward } from 'lucide-react';
import { soundSynth } from '../utils/soundSynthesizer';

const FULL_LETTER_TEXT = `Hey, my favourite human. ❤️

I don't think you realize how effortlessly you find your way into my thoughts. Sometimes it's your smile, sometimes it's something silly you said, and sometimes it's just the thought of talking to you after a long day.

You make ordinary moments feel warmer, conversations feel shorter than they should, and distance feel a little less powerful.

I love teasing you, making you smile, and finding new reasons to choose you. I don't need everything to be perfect. I just want the chance to keep creating little moments with you, one memory at a time.

And now, madam… after all this drama, I have one VERY important question. 👀💗`;

export const SecretLoveLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const handleOpenLetter = () => {
    if (!isOpen) {
      setIsOpen(true);
      soundSynth.playEnvelopeOpen();
    }
  };

  useEffect(() => {
    if (isOpen && !isTypingComplete) {
      let charIndex = 0;
      intervalRef.current = window.setInterval(() => {
        if (charIndex < FULL_LETTER_TEXT.length) {
          charIndex++;
          setDisplayedText(FULL_LETTER_TEXT.slice(0, charIndex));
        } else {
          setIsTypingComplete(true);
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
      }, 22);

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [isOpen, isTypingComplete]);

  const handleSkipTyping = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayedText(FULL_LETTER_TEXT);
    setIsTypingComplete(true);
  };

  const handleScrollToProposal = () => {
    const el = document.getElementById('proposal');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="letter" className="py-20 px-4 max-w-3xl mx-auto">
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="text-xs uppercase tracking-widest text-[#FF6F91] font-semibold">
          From The Heart
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif-romantic font-bold text-[#6D2446] mt-1 mb-2">
          The Secret Love Letter 💌
        </h2>
        <p className="text-xs sm:text-sm text-[#6D2446]/75">
          Written in late quiet hours with thoughts of only you.
        </p>
      </div>

      {!isOpen ? (
        /* Sealed State */
        <div className="glass-card rounded-3xl p-8 sm:p-12 text-center border-2 border-[#FFC6D4] shadow-xl relative overflow-hidden group">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-[#FFEBF0] to-[#FFC6D4] flex items-center justify-center text-[#FF6F91] mb-5 group-hover:scale-105 transition-transform">
            <Mail className="w-10 h-10" />
          </div>

          <h3 className="text-xl sm:text-2xl font-serif-romantic font-bold text-[#6D2446] mb-3">
            A message sealed for your eyes only.
          </h3>
          <p className="text-sm text-[#6D2446]/70 mb-6 max-w-md mx-auto">
            Warning: High concentration of genuine feelings and blush-inducing truths ahead.
          </p>

          <button
            onClick={handleOpenLetter}
            type="button"
            className="px-8 py-3.5 rounded-full bg-[#FF6F91] text-white font-serif-romantic font-semibold text-base sm:text-lg hover:bg-[#ff5b83] transition-all transform active:scale-95 shadow-lg flex items-center gap-2 mx-auto"
          >
            <span>Open this only if you're ready to blush. 🙈</span>
            <Sparkles className="w-4 h-4 text-[#FFE082]" />
          </button>
        </div>
      ) : (
        /* Unfolded Letter with Typewriter animation */
        <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-12 border-2 border-[#FFC6D4] shadow-2xl relative animate-in fade-in zoom-in-95 duration-500">
          {/* Top Decorative Header */}
          <div className="flex items-center justify-between border-b border-[#FFC6D4]/60 pb-3 mb-6">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#FF6F91] fill-[#FF6F91]" />
              <span className="font-handwriting text-2xl text-[#6D2446]">My Heart's Secret</span>
            </div>

            {!isTypingComplete && (
              <button
                onClick={handleSkipTyping}
                type="button"
                className="flex items-center gap-1 text-xs text-[#6D2446]/60 hover:text-[#FF6F91] transition-colors"
                title="Show entire letter immediately"
              >
                <FastForward className="w-3.5 h-3.5" />
                <span>Skip typing</span>
              </button>
            )}
          </div>

          {/* Typewritten Prose */}
          <div className="font-serif-romantic text-base sm:text-xl text-[#6D2446] leading-relaxed whitespace-pre-line min-h-[220px]">
            {displayedText}
            {!isTypingComplete && (
              <span className="inline-block w-2 h-5 bg-[#FF6F91] ml-1 animate-pulse align-middle" />
            )}
          </div>

          {/* Bottom Action after letter finishes typing */}
          {isTypingComplete && (
            <div className="mt-10 pt-6 border-t border-[#FFC6D4]/50 text-center animate-in fade-in duration-500 space-y-4">
              <p className="font-handwriting text-2xl text-[#FF6F91]">
                Are you ready for what comes next? ✨
              </p>
              <button
                onClick={handleScrollToProposal}
                type="button"
                className="px-8 py-3.5 rounded-full bg-[#6D2446] text-white font-semibold text-sm sm:text-base hover:bg-[#571c36] transition-all shadow-lg inline-flex items-center gap-2 group"
              >
                <span>I'm ready for the question… 💍</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
