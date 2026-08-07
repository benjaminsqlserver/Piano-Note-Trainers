// add11-chord.js
// The add11 chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// A Add11 chord (add4) (e.g. Cadd11) is built as a major triad (Lesson 8) with an 11th (4th) added, keeping the 3rd — distinct from a sus4 chord (Lesson 28), which removes the 3rd:
//   pitch-class pattern [0, 4, 5, 7] from the root, in every one of the 12 keys.
const Add11ChordService = makeChordService({
  intervals: [0, 4, 5, 7],
  labels: ["Root", "Major 3rd", "11th (Perfect 4th)", "Perfect 5th"],
  explanations: [
    "The starting note — this note names the chord.",
    "Count 4 semitones up from the root — the major 3rd, kept in (unlike a sus4 chord, which removes it).",
    "Count 1 more semitone up from the 3rd (5 semitones from the root) — the 11th (the same pitch as a perfect 4th), added right alongside the 3rd rather than replacing it.",
    "Count 2 more semitones up from the 11th (7 semitones from the root) — the perfect 5th."
  ],
});
