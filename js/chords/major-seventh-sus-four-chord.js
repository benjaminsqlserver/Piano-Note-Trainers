// major-seventh-sus-four-chord.js
// The major seventh sus four chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// A Major 7sus4 chord (e.g. Cmaj7sus4) is built as a sus4 chord (Lesson 28) with a major 7th stacked on top, instead of the minor 7th a dominant 7sus4 chord (Lesson 29) uses:
//   pitch-class pattern [0, 5, 7, 11] from the root, in every one of the 12 keys.
const MajorSeventhSusFourChordService = makeChordService({
  intervals: [0, 5, 7, 11],
  labels: ["Root", "Perfect 4th", "Perfect 5th", "Major 7th"],
  explanations: [
    "The starting note — this note names the chord.",
    "Count 5 semitones up from the root — the perfect 4th, replacing the 3rd exactly like a sus4 chord (Lesson 28).",
    "Count 2 more semitones up from the 4th (7 semitones from the root) — the perfect 5th.",
    "Count 4 more semitones up from the 5th (11 semitones from the root) — the major 7th, instead of the minor 7th a dominant 7sus4 chord (Lesson 29) uses."
  ],
});
