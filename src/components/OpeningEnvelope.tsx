import React, { useState } from 'react';
import { Heart, Sparkles, ChevronDown, Smile } from 'lucide-react';
import { soundSynth } from '../utils/soundSynthesizer';

interface OpeningEnvelopeProps {
  onOpen?: () => void;
}

export const OpeningEnvelope: React.FC<OpeningEnvelopeProps> = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [teaseMessage, setTeaseMessage] = useState<string | null>(null);

  const handleOpenEnvelope = () => {
    if (!isOpen) {
      setIsOpen(true);
      soundSynth.playEnvelopeOpen();
      soundSynth.toggleMusic(true);
      if (onOpen) onOpen();
    }
  };

  const handleTooCuteClick = () => {
    soundSynth.playDodgeSound();
    setTeaseMessage("Too late, madam. Your curiosity has already said YES. 😌💕");
    setTimeout(() => {
      handleOpenEnvelope();
    }, 1200);
  };

  const handleScrollToNext = () => {
    const el = document.getElementById('tease');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="opening" className="min-h-[92vh] flex flex-col items-center justify-center px-4 py-12 relative">
      {/* Background soft glow aura */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-[#FFC6D4]/50 to-[#E8DDF8]/40 blur-3xl -z-10 pointer-events-none" />

      {/* Hero Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 transition-all">
        <span className="text-xs uppercase tracking-widest text-[#FF6F91] font-semibold">
          A Private Universe Just For You
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif-romantic font-bold text-[#6D2446] mt-2 mb-3 leading-tight" style={{ textWrap: 'balance' }}>
          One Question, Infinite Feelings… 💌
        </h1>
        <p className="text-base sm:text-lg text-[#6D2446]/80 font-serif-romantic italic">
          “Psst… someone has a VERY important question for you. 👀💗”
        </p>
      </div>

      {/* The 3D Interactive Envelope */}
      <div className="relative w-full max-w-md mx-auto flex flex-col items-center">
        <div
          onClick={handleOpenEnvelope}
          className={`group cursor-pointer relative w-72 sm:w-88 h-48 sm:h-56 bg-[#FFF8F1] rounded-2xl border-2 border-[#FFC6D4] shadow-xl transition-all duration-700 select-none ${
            isOpen ? 'shadow-2xl translate-y-8' : 'hover:scale-[1.02] hover:-translate-y-1'
          }`}
          style={{ perspective: '1000px' }}
        >
          {/* Top Flap */}
          <div
            className={`absolute top-0 left-0 right-0 h-24 sm:h-28 bg-[#FFEBF0] border-b-2 border-[#FFC6D4] rounded-t-2xl transition-transform duration-700 origin-top flex items-center justify-center z-20 ${
              isOpen ? '-rotate-180 -translate-y-full opacity-60 pointer-events-none' : ''
            }`}
            style={{
              clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
              boxShadow: '0 4px 10px rgba(109, 36, 70, 0.08)',
            }}
          >
            {/* Wax Seal Heart */}
            {!isOpen && (
              <div className="absolute bottom-1 w-11 h-11 rounded-full bg-gradient-to-br from-[#FF6F91] to-[#6D2446] shadow-md flex items-center justify-center border-2 border-white animate-pulse-heart">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
            )}
          </div>

          {/* Envelope Body Details */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 pointer-events-none">
            {!isOpen ? (
              <div className="space-y-2">
                <span className="text-xs tracking-wider uppercase text-[#FF6F91] font-semibold">
                  Sealed with Love
                </span>
                <p className="font-handwriting text-2xl text-[#6D2446]">
                  To the prettiest girl in the world 🌸
                </p>
                <p className="text-xs text-[#6D2446]/60">
                  (Click envelope or button below to unseal)
                </p>
              </div>
            ) : null}
          </div>

          {/* Letter Peeking / Sliding Out */}
          <div
            className={`absolute left-4 right-4 bg-white rounded-xl p-5 border border-[#FFC6D4] shadow-lg transition-all duration-700 ease-out z-30 ${
              isOpen
                ? '-top-32 sm:-top-36 opacity-100 scale-100'
                : 'top-2 opacity-0 scale-95 pointer-events-none'
            }`}
          >
            <div className="flex items-center justify-between border-b border-[#FFC6D4]/40 pb-2 mb-2">
              <span className="font-handwriting text-xl text-[#FF6F91]">Dear Madam,</span>
              <Sparkles className="w-4 h-4 text-[#FFE082]" />
            </div>
            <p className="font-handwriting text-lg sm:text-xl text-[#6D2446] leading-relaxed">
              You didn't really think today was just an ordinary day, did you? Take a deep breath, smile that gorgeous smile, and let me tell you everything I've been waiting to say. 💕
            </p>
            <div className="mt-2 text-right">
              <span className="font-handwriting text-sm text-[#FF6F91]">- Yours forever</span>
            </div>
          </div>
        </div>

        {/* Teasing Toast Alert */}
        {teaseMessage && (
          <div className="mt-4 px-4 py-2.5 rounded-xl bg-[#FF6F91] text-white text-sm font-medium shadow-lg animate-bounce">
            {teaseMessage}
          </div>
        )}

        {/* Question & Interactive Buttons */}
        <div className="mt-8 text-center space-y-4">
          <p className="font-serif-romantic text-lg sm:text-xl font-medium text-[#6D2446]">
            Are you ready, madam? 😏
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleOpenEnvelope}
              type="button"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#FF6F91] text-white font-semibold text-sm sm:text-base hover:bg-[#ff5b83] transition-all transform active:scale-95 shadow-md flex items-center justify-center gap-2 group"
            >
              <span>Obviously, show me! 💌</span>
              <Sparkles className="w-4 h-4 text-[#FFE082] group-hover:rotate-12 transition-transform" />
            </button>

            <button
              onClick={handleTooCuteClick}
              type="button"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-[#6D2446] font-semibold text-sm sm:text-base border border-[#FFC6D4] hover:bg-[#FFF8F1] transition-all transform active:scale-95 shadow-sm flex items-center justify-center gap-2"
            >
              <span>Nope, I'm too cute for this. 🙈</span>
            </button>
          </div>
        </div>

        {/* Continue indicator when open */}
        {isOpen && (
          <div className="mt-10 animate-bounce">
            <button
              onClick={handleScrollToNext}
              type="button"
              className="flex flex-col items-center gap-1 text-xs font-semibold text-[#FF6F91] hover:text-[#6D2446] transition-colors"
            >
              <span>Scroll down for the fun part</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
