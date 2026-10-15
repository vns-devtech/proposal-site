import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Heart, ShieldCheck, Award, ArrowRight, Sparkles } from 'lucide-react';
import { soundSynth } from '../utils/soundSynthesizer';

const TEASING_QUOTES = [
  "Excuse me?! Please reconsider your life choices. 😭",
  "Ma'am, this answer has been rejected by the Department of Love. 💌",
  "Nice try, madam. I know you better than that. 😏",
  "Your finger says NO, but your smile says something else. 👀💗",
  "Error 404: 'NO' option not found in your heart. 🤖❤️",
  "Nice reflexes! But my love is still faster! 🏃‍♂️💨"
];

export const TeasingZone: React.FC = () => {
  const [saidYes, setSaidYes] = useState(false);
  const [dodgeCount, setDodgeCount] = useState(0);
  const [currentTease, setCurrentTease] = useState<string | null>(null);
  const [buttonOffset, setButtonOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleYes = () => {
    setSaidYes(true);
    soundSynth.playSparkle();

    // Heart explosion confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF6F91', '#FFC6D4', '#6D2446', '#FFE082'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FF6F91', '#FFC6D4', '#E8DDF8']
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FF6F91', '#FFC6D4', '#FFE082']
      });
    }, 250);
  };

  const handleNoDodge = () => {
    soundSynth.playDodgeSound();
    const newCount = dodgeCount + 1;
    setDodgeCount(newCount);

    // Pick rotating message
    const msg = TEASING_QUOTES[(newCount - 1) % TEASING_QUOTES.length];
    setCurrentTease(msg);

    // After 4 attempts, the button surrenders affectionately into YES
    if (newCount >= 5) {
      setButtonOffset({ x: 0, y: 0 });
      return;
    }

    // Calculate random dodge within bounded container
    const randomX = (Math.random() - 0.5) * 180;
    const randomY = (Math.random() - 0.5) * 90;
    setButtonOffset({ x: randomX, y: randomY });
  };

  return (
    <section id="tease" className="py-20 px-4 relative max-w-4xl mx-auto">
      {/* Container Card */}
      <div
        ref={containerRef}
        className="glass-card rounded-3xl p-6 sm:p-12 text-center border border-[#FFC6D4]/60 relative overflow-hidden"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFC6D4]/40 text-[#6D2446] text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#FF6F91]" />
          <span>Checkpoint #1</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-serif-romantic font-bold text-[#6D2446] mb-3">
          Before we proceed… tell me something important.
        </h2>

        <p className="text-xl sm:text-2xl font-serif-romantic italic text-[#FF6F91] mb-8">
          “Do you love me?” 🥹
        </p>

        {/* Dynamic Tease Speech Bubble */}
        {currentTease && !saidYes && (
          <div className="max-w-md mx-auto mb-6 p-3 rounded-2xl bg-[#FFEBF0] border border-[#FF6F91]/40 text-[#6D2446] text-sm sm:text-base font-medium shadow-sm animate-bounce">
            {currentTease}
          </div>
        )}

        {!saidYes ? (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 min-h-[140px] relative">
            {/* The YES Button */}
            <button
              onClick={handleYes}
              type="button"
              className="px-8 py-3.5 rounded-full bg-[#FF6F91] text-white font-semibold text-base sm:text-lg hover:bg-[#ff5b83] transition-all transform active:scale-95 shadow-lg hover:shadow-xl flex items-center gap-2 group cursor-pointer"
            >
              <Heart className="w-5 h-5 fill-white text-white group-hover:scale-125 transition-transform" />
              <span>YES, obviously! ❤️</span>
            </button>

            {/* The NO Button (Dodging or surrendered) */}
            {dodgeCount >= 5 ? (
              <button
                onClick={handleYes}
                type="button"
                className="px-6 py-3 rounded-full bg-[#E8DDF8] text-[#6D2446] font-semibold text-sm hover:bg-[#d8c5f5] transition-all transform active:scale-95 border border-[#6D2446]/20 flex items-center gap-2"
              >
                <span>Fine, I admit it: I LOVE you! ❤️</span>
              </button>
            ) : (
              <button
                onMouseEnter={handleNoDodge}
                onTouchStart={handleNoDodge}
                onClick={handleNoDodge}
                type="button"
                style={{
                  transform: `translate(${buttonOffset.x}px, ${buttonOffset.y}px)`,
                  transition: 'transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
                className="px-6 py-3 rounded-full bg-white text-[#6D2446]/70 font-medium text-sm sm:text-base border border-[#FFC6D4] hover:bg-[#FFF8F1] shadow-sm select-none"
              >
                <span>No… 😈</span>
              </button>
            )}
          </div>
        ) : (
          /* Stamped Evidence Certificate */
          <div className="mt-4 p-6 sm:p-8 rounded-2xl bg-white border-2 border-[#FFC6D4] shadow-xl max-w-lg mx-auto text-center space-y-4 animate-in fade-in zoom-in-95 duration-500">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#FFC6D4]/40 flex items-center justify-center text-[#FF6F91]">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-[#FF6F91] font-bold">
                Official Declaration
              </span>
              <h3 className="text-2xl font-serif-romantic font-bold text-[#6D2446]">
                I KNEW IT! 😌💕
              </h3>
              <p className="text-base font-serif-romantic italic text-[#6D2446]/90">
                “Screenshot this. I have official legal evidence now.”
              </p>
            </div>

            <div className="p-3 bg-[#FFF8F1] rounded-xl border border-[#FFC6D4]/50 text-xs text-[#6D2446]/70 flex items-center justify-between">
              <span>Timestamp: {new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              <span className="flex items-center gap-1 text-[#FF6F91] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Soulmate
              </span>
            </div>

            <a
              href="#reasons"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#6D2446] text-white text-sm font-semibold hover:bg-[#571c36] transition-all shadow-md mt-2 w-full"
            >
              <span>Continue with pride 😏</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};
