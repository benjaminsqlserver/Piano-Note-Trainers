// minor-thirteenth-chord.js
// The minor thirteenth chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// A Minor 13th chord (e.g. Cm13) is built as a minor 11th chord (Lesson 43) with a 13th stacked on top — the fullest stock minor 7th-family chord:
//   pitch-class pattern [0, 3, 7, 10, 14, 17, 21] from the root, in every one of the 12 keys.
const MinorThirteenthChordService = makeChordService({
  intervals: [0, 3, 7, 10, 14, 17, 21],
  labels: ["Root", "Minor 3rd", "Perfect 5th", "Minor 7th", "9th", "11th", "13th"],
  explanations: [
    "The starting note — this note names the chord.",
    "Count 3 semitones up from the root — the minor 3rd.",
    "Count 4 more semitones up from the 3rd (7 semitones from the root) — the perfect 5th.",
    "Count 3 more semitones up from the 5th (10 semitones from the root) — the minor 7th.",
    "Count 4 more semitones up from the 7th (14 semitones from the root) — the 9th.",
    "Count 3 more semitones up from the 9th (17 semitones from the root) — the 11th.",
    "Count 4 more semitones up from the 11th (21 semitones from the root — an octave plus a major 6th) — the 13th."
  ],
});
