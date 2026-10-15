import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, RotateCcw, CheckCircle2, ChevronRight, Gift } from 'lucide-react';
import { soundSynth } from '../utils/soundSynthesizer';

interface ProposalSectionProps {
  onWishOnStar?: () => void;
}

export const ProposalSection: React.FC<ProposalSectionProps> = ({ onWishOnStar }) => {
  const [step, setStep] = useState(1);
  const [answeredYes, setAnsweredYes] = useState(false);
  const [showConvinceDrawer, setShowConvinceDrawer] = useState(false);

  // Stepped progression
  const handleNextStep = () => {
    soundSynth.playSparkle();
    setStep(prev => Math.min(4, prev + 1));
  };

  const handleYes = () => {
    setAnsweredYes(true);
    setShowConvinceDrawer(false);
    soundSynth.playCelebrationFanfare();

    // Multi-stage fireworks confetti
    const end = Date.now() + 3000;
    const interval: number = window.setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ['#FF6F91', '#FFC6D4', '#FFE082', '#FFFFFF', '#E8DDF8']
      });
    }, 300);
  };

  const handleReplayCelebration = () => {
    soundSynth.playCelebrationFanfare();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FF6F91', '#FFC6D4', '#FFE082', '#FFFFFF'],
    });
  };

  return (
    <section
      id="proposal"
      className="py-24 px-4 min-h-screen relative overflow-hidden bg-gradient-to-b from-[#1C0614] via-[#2F0B20] to-[#14030E] text-white flex flex-col items-center justify-center"
    >
      {/* Night Sky Elements: Glowing Moon & Twinkling Stars */}
      <div
        onClick={onWishOnStar}
        title="Click the moon to make a wish upon our star! 🌙"
        className="absolute top-10 right-6 sm:right-16 w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#FFF3D6] to-[#FFFFFF] shadow-[0_0_60px_rgba(255,243,214,0.6)] cursor-pointer hover:scale-105 transition-transform z-10 flex items-center justify-center group"
      >
        <span className="text-2xl sm:text-3xl opacity-80 group-hover:scale-125 transition-transform">
          ✨
        </span>
      </div>

      {/* Floating subtle ambient stars */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-10 w-1.5 h-1.5 bg-white rounded-full animate-ping" />
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-[#FFE082] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-[#FFC6D4] rounded-full animate-ping delay-300" />
        <div className="absolute top-2/3 right-12 w-2 h-2 bg-white rounded-full animate-pulse delay-500" />
      </div>

      {/* Main Proposal Card Container */}
      <div className="relative z-20 max-w-3xl w-full mx-auto text-center px-4">
        {!answeredYes ? (
          <div className="glass-card-dark rounded-3xl p-8 sm:p-14 border border-[#FF6F91]/30 text-white space-y-8 animate-in fade-in duration-700">
            
            {/* Step 1 */}
            <p className="font-serif-romantic text-xl sm:text-3xl text-[#FFC6D4] font-medium leading-relaxed">
              “Out of all the people in this world…”
            </p>

            {/* Step 2 */}
            {step >= 2 && (
              <p className="font-serif-romantic text-xl sm:text-3xl text-white font-medium leading-relaxed animate-in fade-in duration-500">
                “…you're the person I want to keep making memories with.”
              </p>
            )}

            {/* Step 3 */}
            {step >= 3 && (
              <p className="font-serif-romantic text-lg sm:text-2xl text-[#FFE082] italic animate-in fade-in duration-500">
                “And now, after all my teasing…”
              </p>
            )}

            {/* Step 4: The Ring & Final Question */}
            {step >= 4 ? (
              <div className="space-y-8 pt-4 animate-in zoom-in-95 duration-700">
                {/* 3D Ring Box Art */}
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 mx-auto flex items-center justify-center">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-[#6D2446] to-[#401227] border-2 border-[#FF6F91]/50 shadow-[0_0_35px_rgba(255,111,145,0.4)] flex items-center justify-center relative">
                    {/* Ring Solitaire Diamond SVG */}
                    <div className="relative flex flex-col items-center">
                      <Sparkles className="w-8 h-8 text-[#FFE082] animate-bounce" />
                      <div className="w-12 h-12 rounded-full border-4 border-[#FFE082] shadow-[0_0_15px_rgba(255,224,130,0.8)] mt-1 flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rotate-45 shadow-sm" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* The Big Question */}
                <h3 className="text-2xl sm:text-4xl md:text-5xl font-serif-romantic font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFC6D4] via-[#FFE082] to-[#FF6F91] leading-tight" style={{ textWrap: 'balance' }}>
                  Will you be my forever favourite person? 💖💍
                </h3>

                {/* Proposal Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <button
                    onClick={handleYes}
                    type="button"
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#FF6F91] to-[#ff4773] text-white font-serif-romantic font-bold text-lg sm:text-xl shadow-[0_0_30px_rgba(255,111,145,0.6)] hover:shadow-[0_0_45px_rgba(255,111,145,0.8)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <span>YES, A MILLION TIMES! 💍❤️</span>
                  </button>

                  <button
                    onClick={() => setShowConvinceDrawer(true)}
                    type="button"
                    className="w-full sm:w-auto px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 text-[#FFC6D4] font-medium text-sm sm:text-base border border-[#FF6F91]/30 transition-all backdrop-blur-sm"
                  >
                    <span>Hmmm… convince me more. 😏</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Next Reveal Step Button */
              <div className="pt-6">
                <button
                  onClick={handleNextStep}
                  type="button"
                  className="px-6 py-3 rounded-full bg-white/15 hover:bg-white/25 text-[#FFC6D4] font-serif-romantic text-sm sm:text-base transition-all inline-flex items-center gap-2 border border-white/20"
                >
                  <span>Continue reading…</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Grand Celebration View */
          <div className="glass-card-dark rounded-3xl p-8 sm:p-14 border-2 border-[#FFE082]/60 text-white space-y-6 animate-in zoom-in-95 duration-700 shadow-[0_0_50px_rgba(255,224,130,0.3)]">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-[#FFE082] to-[#FF6F91] flex items-center justify-center shadow-lg text-white">
              <Heart className="w-10 h-10 fill-white" />
            </div>

            <span className="text-xs uppercase tracking-widest text-[#FFE082] font-bold">
              Mission Accomplished
            </span>

            <h2 className="text-3xl sm:text-5xl font-serif-romantic font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFC6D4] to-[#FFE082]">
              SHE SAID YESSSS! 😭💖🎉
            </h2>

            <p className="font-serif-romantic text-base sm:text-xl text-[#FFC6D4] max-w-lg mx-auto leading-relaxed">
              From this day forward, you are officially stuck with my love, my jokes, my teasing, and all of my adoration for the rest of our lives.
            </p>

            <div className="p-4 rounded-2xl bg-white/10 border border-white/20 max-w-md mx-auto text-xs text-white/80 space-y-1">
              <div className="flex justify-between">
                <span>Contract Status:</span>
                <strong className="text-[#FFE082]">Signed & Sealed In Heaven ✨</strong>
              </div>
              <div className="flex justify-between">
                <span>Warranty:</span>
                <span>Infinite Forehead Kisses & French Fry Shares</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                onClick={handleReplayCelebration}
                type="button"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#FF6F91] text-white font-semibold text-xs sm:text-sm hover:bg-[#ff5b83] transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <Sparkles className="w-4 h-4 text-[#FFE082]" />
                <span>Replay Celebration 🎆</span>
              </button>

              <a
                href="#letter"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/15 text-white font-semibold text-xs sm:text-sm hover:bg-white/25 transition-all flex items-center justify-center gap-2 border border-white/20"
              >
                <span>Re-read Love Letter 💌</span>
              </a>
            </div>
          </div>
        )}

        {/* Convince Me More Drawer Modal */}
        {showConvinceDrawer && (
          <div
            onClick={() => setShowConvinceDrawer(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
          >
            <div
              onClick={e => e.stopPropagation()}
              className="bg-[#2D0F20] text-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border-2 border-[#FF6F91] shadow-2xl space-y-4 text-left"
            >
              <div className="flex items-center gap-2 text-[#FFE082]">
                <Gift className="w-6 h-6" />
                <h4 className="text-xl font-serif-romantic font-bold">
                  Challenge Accepted, Madam! 😏💗
                </h4>
              </div>

              <p className="text-xs sm:text-sm text-[#FFC6D4]">
                If you accept, you are guaranteed these 5 unbreakable lifetime benefits:
              </p>

              <ul className="space-y-2.5 text-xs sm:text-sm text-white/90">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF6F91] shrink-0 mt-0.5" />
                  <span>Unlimited forehead kisses on demand, zero expiration date.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF6F91] shrink-0 mt-0.5" />
                  <span>Priority rights to the larger dessert slice and the last french fry.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF6F91] shrink-0 mt-0.5" />
                  <span>Warm hugs whenever you are cold, tired, or complaining about life.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF6F91] shrink-0 mt-0.5" />
                  <span>100% car aux cord control for road trips (yes, even cheesy pop).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF6F91] shrink-0 mt-0.5" />
                  <span>A dedicated partner who will wake up choosing you every single day.</span>
                </li>
              </ul>

              <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={handleYes}
                  type="button"
                  className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-[#FF6F91] to-[#ff4773] text-white font-bold text-sm shadow-md hover:scale-[1.02] transition-transform text-center"
                >
                  I'm totally convinced! YES! 💍❤️
                </button>
                <button
                  onClick={() => setShowConvinceDrawer(false)}
                  type="button"
                  className="w-full sm:w-auto px-4 py-3 rounded-full bg-white/10 hover:bg-white/20 text-xs text-white/80"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
