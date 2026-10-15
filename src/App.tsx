/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { CustomCursor } from './components/CustomCursor';
import { TopNav } from './components/TopNav';
import { OpeningEnvelope } from './components/OpeningEnvelope';
import { TeasingZone } from './components/TeasingZone';
import { ReasonsGallery } from './components/ReasonsGallery';
import { LoveQuiz } from './components/LoveQuiz';
import { MemoryTimeline } from './components/MemoryTimeline';
import { SecretLoveLetter } from './components/SecretLoveLetter';
import { ProposalSection } from './components/ProposalSection';
import { FooterAndEasterEggs } from './components/FooterAndEasterEggs';
import { soundSynth } from './utils/soundSynthesizer';

export default function App() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [loveMeterValue, setLoveMeterValue] = useState(100);
  const [visitedSections, setVisitedSections] = useState<Set<string>>(new Set(['opening']));

  // Start romantic song automatically
  useEffect(() => {
    soundSynth.startAutoPlay();
  }, []);

  // Handle Toast popup with auto-dismiss
  const showToast = (msg: string) => {
    soundSynth.playSparkle();
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(current => (current === msg ? null : current));
    }, 4500);
  };

  // Easter Egg #4: Love-O-Meter click interaction
  const handleLoveMeterClick = () => {
    soundSynth.playSparkle();
    setLoveMeterValue(prev => {
      const next = prev + 50;
      if (next === 150) {
        showToast("Charging love meter… power levels rising! 📈💗");
      } else if (next === 300) {
        showToast("Warning: Love levels surpassing normal human limits! 💥");
      } else if (next >= 500) {
        showToast("SYSTEM OVERLOAD: Too much cuteness detected! 🚀💖 (1000% Love)");
        return 1000;
      }
      return next;
    });
  };

  // Easter Egg #2: Wishing upon a star on the proposal moon
  const handleWishOnStar = () => {
    showToast("🌟 You wished upon our star! Wish granted: Unlimited hugs for life. 💫");
  };

  // Intersection observer to track visited sections for Love Passport
  useEffect(() => {
    const sectionIds = ['opening', 'tease', 'reasons', 'quiz', 'memories', 'letter', 'proposal'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        const obs = new IntersectionObserver(
          entries => {
            if (entries[0].isIntersecting) {
              setVisitedSections(prev => {
                const next = new Set(prev);
                next.add(id);
                if (next.size === sectionIds.length && !prev.has(id)) {
                  showToast("Love Passport Complete! 🏆 You explored every corner of my heart.");
                }
                return next;
              });
            }
          },
          { threshold: 0.25 }
        );
        obs.observe(el);
        observers.push(obs);
      }
    });

    return () => {
      observers.forEach(o => o.disconnect());
    };
  }, []);

  return (
    <div className="min-h-screen relative flex flex-col font-sans-clean overflow-x-hidden">
      {/* Interactive 60fps Floating Hearts, Petals & Sparkles Canvas */}
      <BackgroundCanvas onSecretHeartClick={showToast} />

      {/* Romantic Custom Cursor for Desktop */}
      <CustomCursor />

      {/* Sticky 3-Zone Navigation with Music Controller & Love-O-Meter */}
      <TopNav
        onLoveMeterClick={handleLoveMeterClick}
        loveMeterValue={loveMeterValue}
      />

      {/* Main Experience Flow */}
      <main className="flex-1 relative z-10">
        {/* Section 3: The Opening Envelope */}
        <OpeningEnvelope />

        {/* Section 4: The Teasing Interaction Zone */}
        <TeasingZone />

        {/* Section 5: The 101 Reasons Gallery */}
        <ReasonsGallery />

        {/* Section 6: The Mini Love Quiz */}
        <LoveQuiz />

        {/* Section 7: The Love Memory Timeline */}
        <MemoryTimeline />

        {/* Section 8: The Secret Love Letter */}
        <SecretLoveLetter />

        {/* Section 9: The Dramatic Final Proposal */}
        <ProposalSection onWishOnStar={handleWishOnStar} />
      </main>

      {/* Section 10: Footer & Hidden Easter Eggs */}
      <FooterAndEasterEggs
        toastMessage={toastMessage}
        onCloseToast={() => setToastMessage(null)}
        visitedCount={visitedSections.size}
      />
    </div>
  );
}
