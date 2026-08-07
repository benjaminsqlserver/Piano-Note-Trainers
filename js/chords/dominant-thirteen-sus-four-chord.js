// dominant-thirteen-sus-four-chord.js
// The dominant thirteen sus four chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// A Dominant 13sus4 chord (e.g. C13sus4) is built as a dominant 9sus4 chord (Lesson 51) with a 13th stacked on top:
//   pitch-class pattern [0, 5, 7, 10, 14, 21] from the root, in every one of the 12 keys.
const DominantThirteenSusFourChordService = makeChordService({
  intervals: [0, 5, 7, 10, 14, 21],
  labels: ["Root", "Perfect 4th", "Perfect 5th", "Minor 7th", "9th", "13th"],
  explanations: [
    "The starting note — this note names the chord.",
    "Count 5 semitones up from the root — the perfect 4th.",
    "Count 2 more semitones up from the 4th (7 semitones from the root) — the perfect 5th.",
    "Count 3 more semitones up from the 5th (10 semitones from the root) — the minor 7th.",
    "Count 4 more semitones up from the 7th (14 semitones from the root) — the 9th.",
    "Count 7 more semitones up from the 9th (21 semitones from the root — an octave plus a major 6th) — the 13th."
  ],
});
