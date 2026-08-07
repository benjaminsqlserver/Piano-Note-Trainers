// dominant-nine-sus-four-chord.js
// The dominant nine sus four chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// A Dominant 9sus4 chord (e.g. C9sus4) is built as a dominant 7sus4 chord (Lesson 29) with a 9th stacked on top:
//   pitch-class pattern [0, 5, 7, 10, 14] from the root, in every one of the 12 keys.
const DominantNineSusFourChordService = makeChordService({
  intervals: [0, 5, 7, 10, 14],
  labels: ["Root", "Perfect 4th", "Perfect 5th", "Minor 7th", "9th"],
  explanations: [
    "The starting note — this note names the chord.",
    "Count 5 semitones up from the root — the perfect 4th, replacing the 3rd exactly like a sus4 chord (Lesson 28).",
    "Count 2 more semitones up from the 4th (7 semitones from the root) — the perfect 5th.",
    "Count 3 more semitones up from the 5th (10 semitones from the root) — the minor 7th, the same 7th a dominant 7sus4 chord (Lesson 29) uses.",
    "Count 4 more semitones up from the 7th (14 semitones from the root — an octave plus a major 2nd) — the 9th, stacked on top."
  ],
});
