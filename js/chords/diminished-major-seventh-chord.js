// diminished-major-seventh-chord.js
// The diminished major seventh chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// A Diminished major 7th chord (e.g. C°(maj7)) is built as a diminished triad (Lesson 11) with a major 7th on top, instead of the diminished 7th a diminished 7th chord (Lesson 14) uses:
//   pitch-class pattern [0, 3, 6, 11] from the root, in every one of the 12 keys.
const DiminishedMajorSeventhChordService = makeChordService({
  intervals: [0, 3, 6, 11],
  labels: ["Root", "Minor 3rd", "Diminished 5th", "Major 7th"],
  explanations: [
    "The starting note — this note names the chord.",
    "Count 3 semitones up from the root — the minor 3rd.",
    "Count 3 more semitones up from the 3rd (6 semitones from the root) — the diminished (lowered) 5th, the same 5th a diminished triad (Lesson 11) uses.",
    "Count 5 more semitones up from the 5th (11 semitones from the root) — the major 7th, instead of the diminished 7th a diminished 7th chord (Lesson 14) uses."
  ],
});
