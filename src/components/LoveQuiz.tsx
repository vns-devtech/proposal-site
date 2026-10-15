import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/quiz';
import { soundSynth } from '../utils/soundSynthesizer';

export const LoveQuiz: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentStep];

  const handleSelectOption = (idx: number) => {
    setSelectedOptionIndex(idx);
    soundSynth.playSparkle();
  };

  const handleNext = () => {
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
      setSelectedOptionIndex(null);
    } else {
      setIsCompleted(true);
      soundSynth.playCelebrationFanfare();
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FF6F91', '#FFC6D4', '#E8DDF8', '#FFE082'],
      });
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedOptionIndex(null);
    setIsCompleted(false);
  };

  return (
    <section id="quiz" className="py-20 px-4 max-w-4xl mx-auto">
      <div className="glass-card rounded-3xl p-6 sm:p-12 border border-[#FFC6D4]/60 relative shadow-xl">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs uppercase tracking-widest text-[#FF6F91] font-semibold">
            Pop Quiz
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif-romantic font-bold text-[#6D2446] mt-1 mb-2">
            The Girlfriend Examination 🎀
          </h2>
          <p className="text-xs sm:text-sm text-[#6D2446]/75">
            Strict scientific testing to determine if madam is indeed 100% girlfriend material.
          </p>

          {/* Progress bar */}
          {!isCompleted && (
            <div className="mt-5 max-w-xs mx-auto">
              <div className="flex items-center justify-between text-xs text-[#6D2446]/60 mb-1 font-medium">
                <span>Question {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
                <span>{Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100)}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#FFC6D4]/40 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#FFC6D4] to-[#FF6F91] transition-all duration-300 rounded-full"
                  style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Active Quiz Question */}
        {!isCompleted ? (
          <div className="space-y-6 max-w-2xl mx-auto">
            {/* Question Text */}
            <h3 className="text-xl sm:text-2xl font-serif-romantic font-bold text-[#6D2446] text-center">
              {currentQ.question}
            </h3>

            {/* Options List */}
            <div className="space-y-3">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOptionIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    type="button"
                    className={`w-full text-left p-4 rounded-2xl transition-all duration-200 border flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#FFEBF0] border-[#FF6F91] shadow-md ring-2 ring-[#FF6F91]/30'
                        : 'bg-white/80 border-[#FFC6D4]/60 hover:bg-white hover:border-[#FF6F91]/50'
                    }`}
                  >
                    <span className="font-medium text-sm sm:text-base text-[#6D2446]">
                      {opt.label}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'border-[#FF6F91] bg-[#FF6F91] text-white'
                          : 'border-[#FFC6D4]'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Personalized Reaction Box */}
            {selectedOptionIndex !== null && (
              <div className="p-4 rounded-2xl bg-[#FFF8F1] border border-[#FF6F91]/30 text-center animate-in fade-in duration-300">
                <p className="font-serif-romantic text-sm sm:text-base text-[#6D2446] italic">
                  “{currentQ.options[selectedOptionIndex].reaction}”
                </p>
                <div className="mt-4">
                  <button
                    onClick={handleNext}
                    type="button"
                    className="px-6 py-2.5 rounded-full bg-[#FF6F91] text-white text-xs sm:text-sm font-semibold hover:bg-[#ff5b83] transition-all shadow-md inline-flex items-center gap-1.5"
                  >
                    <span>
                      {currentStep < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'View Final Verdict 🏆'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Final Result Pass Card */
          <div className="max-w-lg mx-auto text-center space-y-5 animate-in zoom-in-95 duration-500">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-[#FFE082] to-[#FF6F91] text-white flex items-center justify-center shadow-lg">
              <Award className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#FF6F91] font-bold">
                Official Examination Certificate
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif-romantic font-bold text-[#6D2446]">
                Congratulations! You have officially passed the Girlfriend Examination. 🏆💗
              </h3>
              <p className="font-handwriting text-2xl text-[#FF6F91]">
                Grade: A+++ (Certified Soulmate For Life)
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#FFC6D4] text-xs text-[#6D2446]/80 text-left space-y-1.5 shadow-sm">
              <div className="flex justify-between">
                <span>Subject:</span>
                <strong>Madam's Adorable Behavior</strong>
              </div>
              <div className="flex justify-between">
                <span>Cuteness Quotient:</span>
                <strong className="text-[#FF6F91]">Off the charts (1000%)</strong>
              </div>
              <div className="flex justify-between">
                <span>Dramatic Capability:</span>
                <strong>Award-winning Oscar tier</strong>
              </div>
              <div className="flex justify-between border-t border-[#FFC6D4]/40 pt-1.5">
                <span>Final Decision:</span>
                <strong className="text-emerald-700">APPROVED WITH DISTINCTION ✨</strong>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href="#memories"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#6D2446] text-white text-xs sm:text-sm font-semibold hover:bg-[#571c36] transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Take Me Down Memory Lane 🌙</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={handleReset}
                type="button"
                className="w-full sm:w-auto px-4 py-3 rounded-full bg-white text-[#6D2446] text-xs sm:text-sm font-semibold border border-[#FFC6D4] hover:bg-[#FFF8F1] transition-all flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Re-take Quiz</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
