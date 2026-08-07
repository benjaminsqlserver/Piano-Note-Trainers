// neapolitan-chord.js
// The neapolitan chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// A Neapolitan (♭II) chord (e.g. C♭II) is built as a plain major triad (Lesson 8), but rooted a minor 2nd (half step) above the tonic instead of on it:
//   pitch-class pattern [1, 5, 8] from the root, in every one of the 12 keys.
const NeapolitanChordService = makeChordService({
  intervals: [1, 5, 8],
  labels: ["♭II (chord root)", "Major 3rd of ♭II", "Perfect 5th of ♭II"],
  explanations: [
    "Count 1 semitone up from the tonic you select — the ♭2nd degree, which becomes the root of this chord (hence \"♭II\"). The Neapolitan is built relative to the tonic, not on it.",
    "Count 4 more semitones up from that root (5 semitones from the tonic) — the major 3rd of the ♭II chord.",
    "Count 3 more semitones up from the 3rd (8 semitones from the tonic) — the perfect 5th of the ♭II chord, completing a plain major triad (Lesson 8) built a half step above the tonic."
  ],
});
