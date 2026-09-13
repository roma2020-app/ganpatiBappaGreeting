// Auspicious temple brass bell chime synthesized via Web Audio API
class SoundPlayer {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  public playTempleBell() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;
      // Authentic temple bell harmonic frequencies
      const freqs = [587.33, 880, 1174.66, 1760]; // D5, A5, D6, A6 harmonious bells
      const gains = [0.4, 0.25, 0.15, 0.08];

      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(gains[idx], now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 2.6);
      });
    } catch {
      // Ignore audio synthesis errors on strict autoplay browsers
    }
  }

  // Divine Shankh (Conch Shell) sacred vibrational sound
  public playShankhNaad() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      // Pitch bend upwards and stabilize like a sacred conch
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.8);
      osc.frequency.setValueAtTime(440, now + 1.8);
      osc.frequency.exponentialRampToValueAtTime(330, now + 2.6);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.4);
      gain.gain.setValueAtTime(0.3, now + 1.8);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.7);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 2.8);
    } catch {
      // Audio safety
    }
  }

  // Authentic festive Dhol-Tasha energy beats
  public playDholBeat() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;

      // Bass Dhol boom
      const dholOsc = this.ctx.createOscillator();
      const dholGain = this.ctx.createGain();
      dholOsc.type = 'triangle';
      dholOsc.frequency.setValueAtTime(120, now);
      dholOsc.frequency.exponentialRampToValueAtTime(45, now + 0.35);

      dholGain.gain.setValueAtTime(0.5, now);
      dholGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      dholOsc.connect(dholGain);
      dholGain.connect(this.ctx.destination);
      dholOsc.start(now);
      dholOsc.stop(now + 0.45);

      // Sharp Brass Tasha snap
      const tashaOsc = this.ctx.createOscillator();
      const tashaGain = this.ctx.createGain();
      tashaOsc.type = 'sine';
      tashaOsc.frequency.setValueAtTime(987.77, now);
      tashaGain.gain.setValueAtTime(0.2, now);
      tashaGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      tashaOsc.connect(tashaGain);
      tashaGain.connect(this.ctx.destination);
      tashaOsc.start(now);
      tashaOsc.stop(now + 0.2);
    } catch {
      // Audio safety
    }
  }
}

export const soundPlayer = new SoundPlayer();
