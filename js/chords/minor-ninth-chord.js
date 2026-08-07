// minor-ninth-chord.js
// The minor ninth chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// A Minor 9th chord (e.g. Cm9) is built as a minor 7th chord (Lesson 15) with a 9th stacked on top:
//   pitch-class pattern [0, 3, 7, 10, 14] from the root, in every one of the 12 keys.
const MinorNinthChordService = makeChordService({
  intervals: [0, 3, 7, 10, 14],
  labels: ["Root", "Minor 3rd", "Perfect 5th", "Minor 7th", "9th"],
  explanations: [
    "The starting note — this note names the chord.",
    "Count 3 semitones up from the root — the minor 3rd.",
    "Count 4 more semitones up from the 3rd (7 semitones from the root) — the perfect 5th.",
    "Count 3 more semitones up from the 5th (10 semitones from the root) — the minor 7th, the same 7th a plain minor 7th chord uses.",
    "Count 4 more semitones up from the 7th (14 semitones from the root — an octave plus a major 2nd) — the 9th, stacked on top of a complete minor 7th chord."
  ],
});
