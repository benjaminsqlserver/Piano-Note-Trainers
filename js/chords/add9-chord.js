// add9-chord.js
// The add9 chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// An add9 chord — written add9 (e.g. Cadd9) — is a plain major triad
// with one more note stacked on top: a 9th, an octave and a major 2nd
// above the root, and crucially *no 7th of any kind* in between:
//   root -> +4 semitones -> major 3rd
//   major 3rd -> +3 more semitones (root +7 total) -> perfect 5th
//   perfect 5th -> +7 more semitones (root +14 total) -> 9th
// So every add9 chord, in any of the 12 keys, is just the pitch-class
// pattern [0, 4, 7, 14] measured in semitones from its root -- an
// ordinary major triad (0, 4, 7) plus a 9th stacked an octave and a
// major 2nd above the root. That 9th is the very same pitch class as
// the major 2nd degree, just moved up an octave so it sits above the
// 5th instead of clashing right next to the root -- which is exactly
// why it can be "added" to a plain triad without any of the tension a
// 7th would bring. Because there's no 7th at all, an add9 chord never
// pulls toward another chord the way a dominant 7th or major 7th does;
// it's a bright, wide-open, "at rest" color, which is exactly why jazz,
// pop, and gospel pianists reach for it as a shimmering substitute for
// a plain triad wherever a tonic or subdominant chord would otherwise
// sit. Watch out for one mix-up: an add9 chord is not the same thing as
// a 9th chord (which stacks a 9th on top of a full dominant or major
// 7th chord) or a sus2 chord (which replaces the 3rd with a 2nd instead
// of adding a 9th above an intact triad).
const Add9ChordService = makeChordService({
  intervals: [0, 4, 7, 14],
  labels: ['Root', 'Major 3rd', 'Perfect 5th', '9th'],
  explanations: [
    'The starting note — this note names the chord.',
    'Count 4 semitones up from the root.',
    'Count 3 more semitones up from the 3rd (7 semitones from the root).',
    'Count 7 more semitones up from the 5th (14 semitones from the root — an octave plus a major 2nd) — the 9th, added on top of the intact triad with no 7th of any kind in between.',
  ],
});
