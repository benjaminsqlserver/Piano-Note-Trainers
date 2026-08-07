// minor-major-seventh-chord.js
// The minor major seventh chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// A Minor-major 7th chord (e.g. Cm(maj7)) is built as a minor triad (Lesson 9) with a major 7th on top, instead of the minor 7th a plain minor 7th chord uses:
//   pitch-class pattern [0, 3, 7, 11] from the root, in every one of the 12 keys.
const MinorMajorSeventhChordService = makeChordService({
  intervals: [0, 3, 7, 11],
  labels: ["Root", "Minor 3rd", "Perfect 5th", "Major 7th"],
  explanations: [
    "The starting note — this note names the chord.",
    "Count 3 semitones up from the root — the minor 3rd.",
    "Count 4 more semitones up from the 3rd (7 semitones from the root) — the perfect 5th.",
    "Count 4 more semitones up from the 5th (11 semitones from the root) — the major 7th, not the minor 7th a plain minor 7th chord (Lesson 15) uses."
  ],
});
