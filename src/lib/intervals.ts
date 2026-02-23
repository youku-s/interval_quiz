export interface Interval {
  semitones: number;
  shortName: string;
  jaName: string;
}

export const ALL_INTERVALS: readonly Interval[] = [
  { semitones: 0,  shortName: "P1", jaName: "完全1度（同音）" },
  { semitones: 1,  shortName: "m2", jaName: "短2度" },
  { semitones: 2,  shortName: "M2", jaName: "長2度" },
  { semitones: 3,  shortName: "m3", jaName: "短3度" },
  { semitones: 4,  shortName: "M3", jaName: "長3度" },
  { semitones: 5,  shortName: "P4", jaName: "完全4度" },
  { semitones: 6,  shortName: "TT", jaName: "増4度（三全音）" },
  { semitones: 7,  shortName: "P5", jaName: "完全5度" },
  { semitones: 8,  shortName: "m6", jaName: "短6度" },
  { semitones: 9,  shortName: "M6", jaName: "長6度" },
  { semitones: 10, shortName: "m7", jaName: "短7度" },
  { semitones: 11, shortName: "M7", jaName: "長7度" },
  { semitones: 12, shortName: "P8", jaName: "完全8度（オクターブ）" },
] as const;

/** 選択可能なルート音。value === null はランダムを意味する */
export interface BaseNoteOption {
  label: string;
  midi: number | null; // null = ランダム
}

export const BASE_NOTE_OPTIONS: readonly BaseNoteOption[] = [
  { label: "ランダム", midi: null },
  { label: "C4",       midi: 60 },
  { label: "C#4",      midi: 61 },
  { label: "D4",       midi: 62 },
  { label: "D#4",      midi: 63 },
  { label: "E4",       midi: 64 },
  { label: "F4",       midi: 65 },
  { label: "F#4",      midi: 66 },
  { label: "G4",       midi: 67 },
  { label: "G#4",      midi: 68 },
  { label: "A4",       midi: 69 },
  { label: "A#4",      midi: 70 },
  { label: "B4",       midi: 71 },
];

export function pickRandom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** midi === null のときはランダム（C3〜B4 の範囲）で返す */
export function resolveBaseMidi(midi: number | null): number {
  if (midi !== null) return midi;
  // C3(48) 〜 B4(71) でランダム
  return Math.floor(Math.random() * (71 - 48 + 1)) + 48;
}
