/* --------------------------------------------------
   A tiny Web Audio synth: every letter is a note on a
   pentatonic scale, number keys pick the instrument,
   ↑↓ shift the octave and ←→ change the echo.
-------------------------------------------------- */

export const INSTRUMENTS = [
  "Glass",
  "Pluck",
  "Square",
  "Saw",
  "Bell",
  "Bass",
  "Organ",
  "Chip",
  "Marimba",
  "Noise",
] as const;

// Major pentatonic, so any typing sounds musical
const SCALE = [0, 2, 4, 7, 9];

class Synth {
  private ctx: AudioContext | null = null;
  private master!: GainNode;
  private delay!: DelayNode;
  private feedback!: GainNode;
  private wet!: GainNode;

  enabled = true;
  instrument = 0;
  octave = 0; // -2 … +2
  echo = 1; // 0 … 4

  private ensure() {
    if (this.ctx) return this.ctx;
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return null;
    const ctx = new Ctx();
    this.master = ctx.createGain();
    this.master.gain.value = 0.32;
    this.delay = ctx.createDelay(1);
    this.delay.delayTime.value = 0.28;
    this.feedback = ctx.createGain();
    this.wet = ctx.createGain();
    this.delay.connect(this.feedback).connect(this.delay);
    this.delay.connect(this.wet).connect(ctx.destination);
    this.master.connect(ctx.destination);
    this.master.connect(this.delay);
    this.ctx = ctx;
    this.applyEcho();
    return ctx;
  }

  private applyEcho() {
    if (!this.ctx) return;
    this.feedback.gain.value = [0, 0.25, 0.4, 0.55, 0.7][this.echo];
    this.wet.gain.value = [0, 0.35, 0.45, 0.55, 0.65][this.echo];
  }

  setEcho(v: number) {
    this.echo = Math.max(0, Math.min(4, v));
    this.applyEcho();
  }

  setOctave(v: number) {
    this.octave = Math.max(-2, Math.min(2, v));
  }

  /* Frequency for a character: letters walk up the scale */
  private freq(char: string) {
    const code = char.toLowerCase().charCodeAt(0);
    const i = Number.isFinite(code) ? code % 15 : 0;
    const semis = SCALE[i % 5] + 12 * Math.floor(i / 5) + 12 * this.octave;
    return 220 * Math.pow(2, semis / 12);
  }

  play(char: string) {
    if (!this.enabled) return;
    const ctx = this.ensure();
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume();
    const t = ctx.currentTime;
    const f = this.freq(char);
    const name = INSTRUMENTS[this.instrument];

    const out = ctx.createGain();
    out.connect(this.master);
    const env = (attack: number, decay: number, peak = 1) => {
      out.gain.setValueAtTime(0.0001, t);
      out.gain.exponentialRampToValueAtTime(peak, t + attack);
      out.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
    };
    const osc = (type: OscillatorType, freq: number, dur: number, gain = 1) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = type;
      o.frequency.value = freq;
      g.gain.value = gain;
      o.connect(g).connect(out);
      o.start(t);
      o.stop(t + dur);
      return o;
    };

    switch (name) {
      case "Glass":
        env(0.005, 1.2, 0.6);
        osc("sine", f * 2, 1.3);
        osc("sine", f * 4.01, 0.6, 0.25);
        break;
      case "Pluck": {
        env(0.002, 0.45, 0.8);
        const o = osc("triangle", f, 0.5);
        o.frequency.exponentialRampToValueAtTime(f * 0.995, t + 0.4);
        break;
      }
      case "Square":
        env(0.01, 0.35, 0.25);
        osc("square", f, 0.4);
        break;
      case "Saw": {
        env(0.01, 0.5, 0.3);
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(3200, t);
        filter.frequency.exponentialRampToValueAtTime(300, t + 0.45);
        out.disconnect();
        out.connect(filter).connect(this.master);
        osc("sawtooth", f, 0.55);
        osc("sawtooth", f * 1.007, 0.55);
        break;
      }
      case "Bell": {
        env(0.002, 1.6, 0.5);
        // Simple FM: a modulator wobbles the carrier's pitch
        const mod = ctx.createOscillator();
        const depth = ctx.createGain();
        mod.frequency.value = f * 3.5;
        depth.gain.setValueAtTime(f * 2, t);
        depth.gain.exponentialRampToValueAtTime(1, t + 1.4);
        const car = osc("sine", f * 2, 1.7);
        mod.connect(depth).connect(car.frequency);
        mod.start(t);
        mod.stop(t + 1.7);
        break;
      }
      case "Bass":
        env(0.005, 0.6, 0.9);
        osc("sine", f / 2, 0.7);
        osc("triangle", f / 4, 0.7, 0.5);
        break;
      case "Organ":
        env(0.03, 0.6, 0.35);
        [1, 2, 3, 4].forEach((h, i) => osc("sine", f * h, 0.7, 1 / (i + 1)));
        break;
      case "Chip": {
        env(0.001, 0.25, 0.2);
        const o = osc("square", f * 2, 0.3);
        o.frequency.setValueAtTime(f * 2, t);
        o.frequency.setValueAtTime(f * 3, t + 0.05);
        o.frequency.setValueAtTime(f * 4, t + 0.1);
        break;
      }
      case "Marimba":
        env(0.002, 0.35, 0.8);
        osc("sine", f, 0.4);
        osc("sine", f * 4, 0.08, 0.4);
        break;
      case "Noise": {
        env(0.002, 0.2, 0.5);
        const len = Math.floor(ctx.sampleRate * 0.25);
        const buf = ctx.createBuffer(1, len, ctx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
        const src = ctx.createBufferSource();
        src.buffer = buf;
        const bp = ctx.createBiquadFilter();
        bp.type = "bandpass";
        bp.frequency.value = f * 4;
        bp.Q.value = 6;
        src.connect(bp).connect(out);
        src.start(t);
        break;
      }
    }
  }

  /* A soft tick for hovers and clicks */
  tick(high = false) {
    if (!this.enabled || !this.ctx) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.frequency.value = high ? 1800 : 1200;
    g.gain.setValueAtTime(0.05, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);
    o.connect(g).connect(ctx.destination);
    o.start(t);
    o.stop(t + 0.05);
  }
}

export const synth = new Synth();
