// major-seventh-sus-two-chord.js
// The major seventh sus two chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// A Major 7sus2 chord (e.g. Cmaj7sus2) is built as a sus2 chord (Lesson 27) with a major 7th stacked on top:
//   pitch-class pattern [0, 2, 7, 11] from the root, in every one of the 12 keys.
const MajorSeventhSusTwoChordService = makeChordService({
  intervals: [0, 2, 7, 11],
  labels: ["Root", "Major 2nd", "Perfect 5th", "Major 7th"],
  explanations: [
    "The starting note — this note names the chord.",
    "Count 2 semitones up from the root — the major 2nd, replacing the 3rd exactly like a sus2 chord (Lesson 27).",
    "Count 5 more semitones up from the 2nd (7 semitones from the root) — the perfect 5th.",
    "Count 4 more semitones up from the 5th (11 semitones from the root) — the major 7th, the same 7th a major 7th chord (Lesson 16) uses."
  ],
});
