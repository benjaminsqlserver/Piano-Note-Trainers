// quartal-chord.js
// The quartal chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// A Quartal chord ("So What" voicing) (e.g. Cquartal) is built as five notes stacked entirely in perfect 4ths, instead of the stacked 3rds every other chord in this app uses:
//   pitch-class pattern [0, 5, 10, 15, 19] from the root, in every one of the 12 keys.
const QuartalChordService = makeChordService({
  intervals: [0, 5, 10, 15, 19],
  labels: ["Root", "Stacked 4th (♭7th, oct.)", "Stacked 4th (♭3rd, oct. up)", "Stacked 4th (5th, oct. up)", "Stacked 4th (top voice)"],
  explanations: [
    "The starting note — this note names the chord.",
    "Count 5 semitones up from the root — a perfect 4th, the first \"stack.\"",
    "Count 5 more semitones up (10 semitones from the root) — another perfect 4th stacked on top, landing on the ♭7th.",
    "Count 5 more semitones up (15 semitones from the root — an octave plus a minor 3rd) — another perfect 4th stacked on top.",
    "Count 4 more semitones up (19 semitones from the root — an octave plus a perfect 5th) — the top voice, closing out five notes built entirely from stacked perfect 4ths."
  ],
});
