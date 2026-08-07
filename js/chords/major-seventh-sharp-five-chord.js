// major-seventh-sharp-five-chord.js
// The major seventh sharp five chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// A Major 7th♯5 chord (augmented major 7th) (e.g. Cmaj7♯5) is built as an augmented triad (Lesson 10) with a major 7th on top, instead of the minor 7th an augmented 7th chord (Lesson 23) uses:
//   pitch-class pattern [0, 4, 8, 11] from the root, in every one of the 12 keys.
const MajorSeventhSharpFiveChordService = makeChordService({
  intervals: [0, 4, 8, 11],
  labels: ["Root", "Major 3rd", "Augmented 5th", "Major 7th"],
  explanations: [
    "The starting note — this note names the chord.",
    "Count 4 semitones up from the root — the major 3rd.",
    "Count 4 more semitones up from the 3rd (8 semitones from the root) — the augmented (raised) 5th, the same raised 5th an augmented triad (Lesson 10) uses.",
    "Count 3 more semitones up from the 5th (11 semitones from the root) — the major 7th."
  ],
});
