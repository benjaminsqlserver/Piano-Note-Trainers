// sus-four-chord.js
// The sus four chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// A sus4 chord (e.g. Csus4) replaces a triad's 3rd with a perfect 4th,
//   the mirror image of a sus2 chord:
//     root -> +5 semitones -> perfect 4th (replacing the 3rd)
//     perfect 4th -> +2 more semitones (root +7 total) -> perfect 5th
//   So every sus4 chord, in any of the 12 keys, is the pitch-class
//   pattern [0, 5, 7]. The 4th sits a half step above where the major
//   3rd would be, creating a taut, "leaning" tension that classically
//   resolves down a step into the 3rd of a plain triad (sus4 -> triad),
//   a staple move in gospel, rock, and pop vamps and cadences.
const SusFourChordService = makeChordService({
  intervals: [0, 5, 7],
  labels: ['Root', 'Perfect 4th', 'Perfect 5th'],
  explanations: [
    'The starting note — this note names the chord.',
    'Count 5 semitones up from the root — this replaces the 3rd entirely, so the chord is neither major nor minor.',
    'Count 2 more semitones up from the 4th (7 semitones from the root) — the perfect 5th.',
  ],
});
