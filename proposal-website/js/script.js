/**
 * One Question, Infinite Feelings… 💌
 * Standalone Script with Offline Web Audio Synthesizer and Automatic Playback
 */

// --- 1. Sound Synthesizer with Auto-Play ---
class RomanticAudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.volume = 0.45;
    this.masterGain = null;
    this.intervalId = null;
    this.currentNoteIndex = 0;
    this.autoPlayAttached = false;

    this.melodyNotes = [
      261.63, 329.63, 392.00, 493.88, 523.25, 392.00,
      220.00, 261.63, 329.63, 392.00, 440.00, 329.63,
      174.61, 261.63, 329.63, 349.23, 440.00, 261.63,
      196.00, 293.66, 349.23, 392.00, 493.88, 392.00,
      164.81, 246.94, 329.63, 392.00, 440.00, 329.63,
      146.83, 220.00, 261.63, 349.23, 392.00, 349.23,
      261.63, 329.63, 392.00, 523.25, 659.25, 523.25
    ];
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.volume;
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  playNote(freq, duration = 1.3) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration + 0.1);
  }

  startAutoPlay() {
    if (this.isPlaying) return;

    const start = () => {
      this.initContext();
      if (!this.isPlaying) {
        this.isPlaying = true;
        this.currentNoteIndex = 0;
        this.playLoopStep();
        this.intervalId = setInterval(() => {
          this.playLoopStep();
        }, 550);
      }
    };

    try {
      start();
    } catch (e) {}

    if (!this.autoPlayAttached) {
      this.autoPlayAttached = true;
      const events = ['click', 'touchstart', 'scroll', 'pointerdown', 'keydown'];
      events.forEach(evt => {
        window.addEventListener(evt, () => {
          if (!this.isPlaying || this.ctx?.state === 'suspended') {
            start();
          }
        }, { passive: true });
      });
    }
  }

  playLoopStep() {
    if (!this.isPlaying || !this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    const freq = this.melodyNotes[this.currentNoteIndex];
    this.playNote(freq, 1.4);
    this.currentNoteIndex = (this.currentNoteIndex + 1) % this.melodyNotes.length;
  }

  playEnvelope() {
    this.initContext();
    [329.63, 392.0, 523.25, 659.25].forEach((f, idx) => {
      setTimeout(() => this.playNote(f, 0.8), idx * 90);
    });
  }

  playDodge() {
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.18);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.2);
  }

  playSparkle() {
    this.initContext();
    [587.33, 880.0].forEach((n, idx) => {
      setTimeout(() => this.playNote(n, 0.5), idx * 70);
    });
  }

  playFanfare() {
    this.initContext();
    const fanfare = [
      { f: 523.25, t: 0 },
      { f: 659.25, t: 150 },
      { f: 783.99, t: 300 },
      { f: 1046.50, t: 500 },
      { f: 1318.51, t: 750 },
      { f: 1567.98, t: 1050 }
    ];
    fanfare.forEach(({ f, t }) => {
      setTimeout(() => this.playNote(f, 2.0), t);
    });
  }
}

const soundSynth = new RomanticAudioSynthesizer();

// Start music automatically on page load & interaction
window.addEventListener('DOMContentLoaded', () => {
  soundSynth.startAutoPlay();
});

// Interactive functions
function openEnvelope() {
  document.getElementById('envelope-wrap')?.classList.add('open');
  soundSynth.playEnvelope();
  soundSynth.startAutoPlay();
}

function handleTooCute() {
  soundSynth.playDodge();
  alert("Too late, madam. Your curiosity has already said YES. 😌💕");
  openEnvelope();
}

let dodgeCount = 0;
const teaseQuotes = [
  "Excuse me?! Please reconsider your life choices. 😭",
  "Ma'am, this answer has been rejected by the Department of Love. 💌",
  "Nice try, madam. I know you better than that. 😏",
  "Your finger says NO, but your smile says something else. 👀💗"
];

function handleNoDodge(btn) {
  soundSynth.playDodge();
  dodgeCount++;
  const msgEl = document.getElementById('tease-bubble');
  if (msgEl) {
    msgEl.innerText = teaseQuotes[(dodgeCount - 1) % teaseQuotes.length];
    msgEl.style.display = 'block';
  }
  if (dodgeCount >= 5) {
    btn.innerText = "Fine, I LOVE you! ❤️";
    btn.style.transform = 'none';
    btn.onclick = handleTeaseYes;
    return;
  }
  const x = (Math.random() - 0.5) * 160;
  const y = (Math.random() - 0.5) * 80;
  btn.style.transform = `translate(${x}px, ${y}px)`;
}

function handleTeaseYes() {
  soundSynth.playFanfare();
  document.getElementById('tease-buttons').style.display = 'none';
  document.getElementById('tease-evidence').style.display = 'block';
}

function handleProposalYes() {
  soundSynth.playFanfare();
  document.getElementById('proposal-card').style.display = 'none';
  document.getElementById('celebration-card').style.display = 'block';
}
