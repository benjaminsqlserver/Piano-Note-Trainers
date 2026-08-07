// minor-major-ninth-chord.js
// The minor major ninth chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// A Minor-major 9th chord (e.g. Cm(maj9)) is built as a minor-major 7th chord (Lesson 46) with a 9th stacked on top:
//   pitch-class pattern [0, 3, 7, 11, 14] from the root, in every one of the 12 keys.
const MinorMajorNinthChordService = makeChordService({
  intervals: [0, 3, 7, 11, 14],
  labels: ["Root", "Minor 3rd", "Perfect 5th", "Major 7th", "9th"],
  explanations: [
    "The starting note — this note names the chord.",
    "Count 3 semitones up from the root — the minor 3rd.",
    "Count 4 more semitones up from the 3rd (7 semitones from the root) — the perfect 5th.",
    "Count 4 more semitones up from the 5th (11 semitones from the root) — the major 7th.",
    "Count 3 more semitones up from the 7th (14 semitones from the root — an octave plus a major 2nd) — the 9th, stacked on top."
  ],
});
