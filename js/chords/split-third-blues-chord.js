// split-third-blues-chord.js
// The split third blues chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// A Split-third "blues" chord (e.g. C7(♭3/♮3)) is built as a dominant 7th chord (Lesson 13) with both the minor 3rd and major 3rd sounded together, instead of just the major 3rd:
//   pitch-class pattern [0, 3, 4, 7, 10] from the root, in every one of the 12 keys.
const SplitThirdBluesChordService = makeChordService({
  intervals: [0, 3, 4, 7, 10],
  labels: ["Root", "Minor 3rd", "Major 3rd", "Perfect 5th", "Minor 7th"],
  explanations: [
    "The starting note — this note names the chord.",
    "Count 3 semitones up from the root — the minor 3rd (the \"blue\" 3rd).",
    "Count 1 more semitone up from the minor 3rd (4 semitones from the root) — the major 3rd, sounded right alongside it rather than instead of it.",
    "Count 3 more semitones up from the major 3rd (7 semitones from the root) — the perfect 5th.",
    "Count 3 more semitones up from the 5th (10 semitones from the root) — the minor 7th, the same 7th a plain dominant 7th chord (Lesson 13) uses."
  ],
});
