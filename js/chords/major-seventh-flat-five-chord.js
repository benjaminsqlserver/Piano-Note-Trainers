// major-seventh-flat-five-chord.js
// The major seventh flat five chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// A major 7th flat 5 chord — written maj7♭5 (also seen as M7♭5 or
// Δ7♭5) — is a major 7th chord with its 5th lowered a semitone:
//   root -> +4 semitones -> major 3rd
//   major 3rd -> +2 more semitones (root +6 total) -> diminished 5th
//   diminished 5th -> +5 more semitones (root +11 total) -> major 7th
// So every maj7♭5 chord, in any of the 12 keys, is just the
// pitch-class pattern [0, 4, 6, 11] measured in semitones from its
// root -- an ordinary major 3rd and major 7th (the same two intervals
// a plain major 7th chord uses) wrapped around a lowered, diminished
// 5th instead of a perfect one. That lowered 5th is what gives the
// chord its unsettled, "floating" color -- it never quite sits still
// the way a plain major 7th does -- which is exactly why jazz and
// gospel pianists reach for it as a chromatic passing chord or a
// spicier substitute wherever a major 7th chord would otherwise sit.
const MajorSeventhFlatFiveChordService = makeChordService({
  intervals: [0, 4, 6, 11],
  labels: ['Root', 'Major 3rd', 'Diminished 5th', 'Major 7th'],
  explanations: [
    'The starting note — this note names the chord.',
    'Count 4 semitones up from the root.',
    'Count 2 more semitones up from the 3rd (6 semitones from the root) — a lowered (diminished) 5th, a semitone below a perfect 5th.',
    'Count 5 more semitones up from the 5th (11 semitones from the root) — the same major 7th a plain major 7th chord uses.',
  ],
});
