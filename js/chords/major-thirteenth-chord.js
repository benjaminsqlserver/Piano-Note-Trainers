// major-thirteenth-chord.js
// The major thirteenth chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// A Major 13th chord (e.g. Cmaj13) is built as a major 9th chord (Lesson 48) with a 13th stacked on top — the fullest stock major 7th-family chord:
//   pitch-class pattern [0, 4, 7, 11, 14, 21] from the root, in every one of the 12 keys.
const MajorThirteenthChordService = makeChordService({
  intervals: [0, 4, 7, 11, 14, 21],
  labels: ["Root", "Major 3rd", "Perfect 5th", "Major 7th", "9th", "13th"],
  explanations: [
    "The starting note — this note names the chord.",
    "Count 4 semitones up from the root — the major 3rd.",
    "Count 3 more semitones up from the 3rd (7 semitones from the root) — the perfect 5th.",
    "Count 4 more semitones up from the 5th (11 semitones from the root) — the major 7th.",
    "Count 3 more semitones up from the 7th (14 semitones from the root) — the 9th.",
    "Count 7 more semitones up from the 9th (21 semitones from the root — an octave plus a major 6th) — the 13th; the 11th is skipped, since it clashes with the major 3rd a half step below it."
  ],
});
