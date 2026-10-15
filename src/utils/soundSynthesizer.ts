/**
 * Romantic Music & Sound Synthesizer using standard Web Audio API
 * 100% self-contained, offline-compatible, no external audio files required.
 */

class RomanticAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private isMuted = false;
  private volume = 0.45;
  private masterGain: GainNode | null = null;
  private intervalId: number | null = null;
  private currentNoteIndex = 0;
  private autoPlayAttached = false;

  // Romantic chord melody notes in Hz (Music Box / Celesta style)
  // Progression: Cmaj9 -> Am9 -> Fmaj7 -> Gsus4
  private melodyNotes = [
    // Measure 1: Cmaj9
    261.63, 329.63, 392.00, 493.88, 523.25, 392.00,
    // Measure 2: Am9
    220.00, 261.63, 329.63, 392.00, 440.00, 329.63,
    // Measure 3: Fmaj7
    174.61, 261.63, 329.63, 349.23, 440.00, 261.63,
    // Measure 4: Gsus4 / G7
    196.00, 293.66, 349.23, 392.00, 493.88, 392.00,
    // Measure 5: Em7 gentle transition
    164.81, 246.94, 329.63, 392.00, 440.00, 329.63,
    // Measure 6: Dm7 -> G7 resolve
    146.83, 220.00, 261.63, 349.23, 392.00, 349.23,
    261.63, 329.63, 392.00, 523.25, 659.25, 523.25
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.isMuted ? 0 : this.volume;
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Play a single sweet music-box note
  private playMusicBoxNote(freq: number, duration: number = 1.3) {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    // Warm bell-like sound: sine with slight triangle overtone
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Envelope: quick attack, sparkling sustain, gentle exponential decay
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(0.35, now + 0.02);
    noteGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration + 0.1);
  }

  // Start background romantic music loop automatically
  public startAutoPlay() {
    if (this.isPlaying) return;

    const start = () => {
      this.initContext();
      if (!this.isPlaying) {
        this.isPlaying = true;
        this.currentNoteIndex = 0;
        this.playLoopStep();
        this.intervalId = window.setInterval(() => {
          this.playLoopStep();
        }, 550);
      }
    };

    // Try immediate start
    try {
      start();
    } catch {
      // Browser autoplay policy might block before interaction
    }

    // Attach interaction listeners to seamlessly start on first user touch/click/scroll
    if (!this.autoPlayAttached && typeof window !== 'undefined') {
      this.autoPlayAttached = true;
      const triggerStart = () => {
        if (!this.isPlaying || this.ctx?.state === 'suspended') {
          start();
        }
      };

      const events = ['click', 'touchstart', 'scroll', 'pointerdown', 'keydown'];
      events.forEach(evt => {
        window.addEventListener(evt, triggerStart, { passive: true });
      });
    }
  }

  // Toggle Background Music Loop
  public toggleMusic(forceState?: boolean): boolean {
    this.initContext();

    const target = forceState !== undefined ? forceState : !this.isPlaying;
    if (target && !this.isPlaying) {
      this.isPlaying = true;
      this.currentNoteIndex = 0;
      this.playLoopStep();
      this.intervalId = window.setInterval(() => {
        this.playLoopStep();
      }, 550);
    } else if (!target && this.isPlaying) {
      this.isPlaying = false;
      if (this.intervalId !== null) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    }
    return this.isPlaying;
  }

  private playLoopStep() {
    if (!this.isPlaying || !this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    const freq = this.melodyNotes[this.currentNoteIndex];
    this.playMusicBoxNote(freq, 1.4);
    this.currentNoteIndex = (this.currentNoteIndex + 1) % this.melodyNotes.length;
  }

  // Sound Effect 1: Envelope opening sound (soft paper swish + chime)
  public playEnvelopeOpen() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const notes = [329.63, 392.0, 523.25, 659.25]; // E4, G4, C5, E5
    notes.forEach((f, idx) => {
      setTimeout(() => {
        this.playMusicBoxNote(f, 0.8);
      }, idx * 90);
    });
  }

  // Sound Effect 2: Playful dodging bounce sound
  public playDodgeSound() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

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

  // Sound Effect 3: Sweet Heart Tap / Sparkle Pop
  public playSparkle() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const notes = [587.33, 880.0]; // D5, A5
    notes.forEach((n, idx) => {
      setTimeout(() => {
        this.playMusicBoxNote(n, 0.5);
      }, idx * 70);
    });
  }

  // Sound Effect 4: Grand Celebration Fanfare for YES
  public playCelebrationFanfare() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const fanfare = [
      { f: 523.25, t: 0 },    // C5
      { f: 659.25, t: 150 },  // E5
      { f: 783.99, t: 300 },  // G5
      { f: 1046.50, t: 500 }, // C6
      { f: 1318.51, t: 750 }, // E6
      { f: 1567.98, t: 1050 } // G6
    ];

    fanfare.forEach(({ f, t }) => {
      setTimeout(() => {
        this.playMusicBoxNote(f, 2.0);
      }, t);
    });
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const soundSynth = new RomanticAudioSynthesizer();
