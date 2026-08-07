// minor-sixth-chord.js
// The minor sixth chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// A minor 6th chord is a minor triad with a *major* 6th (not a minor
// one) stacked on top:
//   root -> +3 semitones -> minor 3rd
//   minor 3rd -> +4 more semitones (root +7 total) -> perfect 5th
//   perfect 5th -> +2 more semitones (root +9 total) -> major 6th
// So every minor 6th chord, in any of the 12 keys, is the pitch-class
// pattern [0, 3, 7, 9] measured in semitones from its root -- a minor
// triad (0, 3, 7) plus a major 6th on top. That major 6th is what gives
// this chord its distinctive bittersweet color, and it's no accident:
// a minor 6th chord shares every pitch class with a half-diminished
// 7th chord (Lesson 17) built on its 6th degree -- Cm6 (C-E♭-G-A) is
// exactly the same four notes as Am7♭5 (A-C-E♭-G), just named and
// voiced from a different root.
const MinorSixthChordService = makeChordService({
  intervals: [0, 3, 7, 9],
  labels: ['Root', 'Minor 3rd', 'Perfect 5th', 'Major 6th'],
  explanations: [
    'The starting note — this note names the chord.',
    'Count 3 semitones up from the root.',
    'Count 4 more semitones up from the 3rd (7 semitones from the root).',
    'Count 2 more semitones up from the 5th (9 semitones from the root) — a major 6th, even though the chord is minor.',
  ],
});
