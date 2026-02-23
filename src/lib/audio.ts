export type PlayMode = "ascending" | "descending" | "harmonic";

function midiToFreq(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function scheduleNote(
  ctx: AudioContext,
  freq: number,
  startTime: number,
  duration: number,
  volume = 0.35,
): void {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.type = "sine";
  osc.frequency.value = freq;

  const attack = 0.01;
  const release = 0.1;
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(volume, startTime + attack);
  gain.gain.setValueAtTime(volume, startTime + duration - release);
  gain.gain.linearRampToValueAtTime(0, startTime + duration);

  osc.start(startTime);
  osc.stop(startTime + duration);
}

function wait(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

export async function playInterval(
  semitones: number,
  baseMidi: number,
  mode: PlayMode = "ascending",
): Promise<void> {
  const ctx = new AudioContext();
  const now = ctx.currentTime;
  const noteDur = 0.75;
  const gap = 0.1;

  const f1 = midiToFreq(baseMidi);
  const f2 = midiToFreq(baseMidi + semitones);

  let totalMs: number;

  if (mode === "harmonic") {
    const dur = noteDur + 0.5;
    scheduleNote(ctx, f1, now, dur);
    scheduleNote(ctx, f2, now, dur);
    totalMs = dur * 1000;
  } else {
    const [first, second] = mode === "ascending" ? [f1, f2] : [f2, f1];
    scheduleNote(ctx, first, now, noteDur);
    scheduleNote(ctx, second, now + noteDur + gap, noteDur);
    totalMs = (noteDur * 2 + gap) * 1000;
  }

  await wait(totalMs + 100);
  await ctx.close();
}
