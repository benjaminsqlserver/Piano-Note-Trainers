// power-chord.js
// The power chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// A Power chord (e.g. C5) is built as just a root and a perfect 5th, with no 3rd at all — the simplest possible chord shape:
//   pitch-class pattern [0, 7] from the root, in every one of the 12 keys.
const PowerChordService = makeChordService({
  intervals: [0, 7],
  labels: ["Root", "Perfect 5th"],
  explanations: [
    "The starting note — this note names the chord.",
    "Count 7 semitones up from the root — the perfect 5th. There is no 3rd at all."
  ],
});
