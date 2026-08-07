// sus-two-chord.js
// The sus two chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// A sus2 chord (e.g. Csus2) replaces a triad's 3rd with a major 2nd,
//   leaving the chord neither major nor minor -- an open, unresolved
//   color with no 3rd to color it either way:
//     root -> +2 semitones -> major 2nd (replacing the 3rd)
//     major 2nd -> +5 more semitones (root +7 total) -> perfect 5th
//   So every sus2 chord, in any of the 12 keys, is the pitch-class
//   pattern [0, 2, 7] -- a wide-open fifth with a 2nd sitting where a
//   3rd would normally go. Because it has no 3rd, a sus2 chord doesn't
//   resolve toward anything the way a dominant chord does; pianists
//   reach for it as a suspended, ambiguous color, often as a passing
//   step on the way into or out of a plain triad.
const SusTwoChordService = makeChordService({
  intervals: [0, 2, 7],
  labels: ['Root', 'Major 2nd', 'Perfect 5th'],
  explanations: [
    'The starting note — this note names the chord.',
    'Count 2 semitones up from the root — this replaces the 3rd entirely, so the chord is neither major nor minor.',
    'Count 5 more semitones up from the 2nd (7 semitones from the root) — the perfect 5th.',
  ],
});
