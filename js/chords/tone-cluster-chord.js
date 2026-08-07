// tone-cluster-chord.js
// The tone cluster chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// A Tone cluster (e.g. Ccluster) is built as three adjacent notes struck together — a half step and a whole step stacked right on top of the root, with no 3rd, 5th, or 7th at all:
//   pitch-class pattern [0, 1, 2] from the root, in every one of the 12 keys.
const ToneClusterChordService = makeChordService({
  intervals: [0, 1, 2],
  labels: ["Root", "Minor 2nd", "Major 2nd"],
  explanations: [
    "The starting note — this note names the chord.",
    "Count 1 semitone up from the root — the minor 2nd, right next door to the root.",
    "Count 1 more semitone up from the minor 2nd (2 semitones from the root) — the major 2nd."
  ],
});
