// minor-six-nine-chord.js
// The minor six nine chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// A Minor 6/9 chord (e.g. Cm6/9) is built as a minor 6th chord (Lesson 21) with a 9th stacked on top, and no 7th of any kind:
//   pitch-class pattern [0, 3, 7, 9, 14] from the root, in every one of the 12 keys.
const MinorSixNineChordService = makeChordService({
  intervals: [0, 3, 7, 9, 14],
  labels: ["Root", "Minor 3rd", "Perfect 5th", "Major 6th", "9th"],
  explanations: [
    "The starting note — this note names the chord.",
    "Count 3 semitones up from the root — the minor 3rd.",
    "Count 4 more semitones up from the 3rd (7 semitones from the root) — the perfect 5th.",
    "Count 2 more semitones up from the 5th (9 semitones from the root) — the major 6th, the same 6th a minor 6th chord (Lesson 21) uses.",
    "Count 5 more semitones up from the 6th (14 semitones from the root — an octave plus a major 2nd) — the 9th, stacked on top."
  ],
});
