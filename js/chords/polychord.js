// polychord.js
// The polychord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// A Polychord / slash chord (e.g. C/) is built as a major triad (Lesson 8) rooted a whole step above the bass note, stacked over a dominant 7th chord (Lesson 13) built on that bass note — the app’s reference voicing for "X/Y" slash-chord notation:
//   pitch-class pattern [0, 2, 4, 6, 7, 9, 10] from the root, in every one of the 12 keys.
const PolychordService = makeChordService({
  intervals: [0, 2, 4, 6, 7, 9, 10],
  labels: ["Root (bass)", "Upper triad root (+2)", "Major 3rd", "Upper triad 3rd (+6)", "Perfect 5th", "Upper triad 5th (+9)", "Minor 7th"],
  explanations: [
    "The starting note — this is the bass note, the \"denominator\" of the slash chord, and the root of the dominant 7th chord (Lesson 13) that forms the lower half.",
    "Count 2 semitones up from the bass — a whole step — for the root of the major triad (Lesson 8) stacked on top, the \"numerator\" of the slash chord.",
    "Count 2 more semitones up (4 from the bass) — the major 3rd of the lower dominant 7th chord.",
    "Count 2 more semitones up (6 from the bass) — the major 3rd of the upper triad, sitting 4 semitones above its own root.",
    "Count 1 more semitone up (7 from the bass) — the perfect 5th of the lower dominant 7th chord.",
    "Count 2 more semitones up (9 from the bass) — the perfect 5th of the upper triad, 7 semitones above its own root, completing the major triad on top.",
    "Count 1 more semitone up (10 from the bass) — the minor 7th that completes the dominant 7th chord underneath. All seven notes together are this app’s reference polychord, transposable to any of the 12 keys."
  ],
});
