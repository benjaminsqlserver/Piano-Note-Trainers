// half-diminished-eleventh-chord.js
// The half diminished eleventh chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// A Half-diminished 11th chord (e.g. Cm11♭5) is built as a half-diminished 7th chord (Lesson 17) with a 9th and 11th stacked on top:
//   pitch-class pattern [0, 3, 6, 10, 14, 17] from the root, in every one of the 12 keys.
const HalfDiminishedEleventhChordService = makeChordService({
  intervals: [0, 3, 6, 10, 14, 17],
  labels: ["Root", "Minor 3rd", "Diminished 5th", "Minor 7th", "9th", "11th"],
  explanations: [
    "The starting note — this note names the chord.",
    "Count 3 semitones up from the root — the minor 3rd.",
    "Count 3 more semitones up from the 3rd (6 semitones from the root) — the diminished 5th, the same 5th a half-diminished 7th chord (Lesson 17) uses.",
    "Count 4 more semitones up from the 5th (10 semitones from the root) — the minor 7th.",
    "Count 4 more semitones up from the 7th (14 semitones from the root) — the 9th.",
    "Count 3 more semitones up from the 9th (17 semitones from the root — an octave plus a perfect 4th) — the 11th."
  ],
});
