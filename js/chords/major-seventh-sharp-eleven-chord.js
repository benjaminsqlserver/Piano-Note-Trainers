// major-seventh-sharp-eleven-chord.js
// The major seventh sharp eleven chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// A major 7th sharp 11 chord — written maj7\u266f11 (also seen as
// M7\u266f11 or \u03947\u266f11) — is a plain major 7th chord with one
// more note stacked on top: a raised (augmented) 11th, an octave and a
// tritone above the root:
//   root -> +4 semitones -> major 3rd
//   major 3rd -> +3 more semitones (root +7 total) -> perfect 5th
//   perfect 5th -> +4 more semitones (root +11 total) -> major 7th
//   major 7th -> +7 more semitones (root +18 total) -> sharp 11th
// So every maj7\u266f11 chord, in any of the 12 keys, is just the
// pitch-class pattern [0, 4, 7, 11, 18] measured in semitones from its
// root -- an ordinary major 7th chord (0, 4, 7, 11) plus a raised 11th
// stacked on top, one octave and a tritone above the root. A *plain*
// (unraised) 11th would sit just one semitone above the major 3rd,
// clashing hard against it -- which is why the 11th is almost always
// either left out of a major 7th chord or raised a semitone, as it is
// here. That raised 11th removes the clash entirely and instead adds a
// bright, shimmering lift, the same "Lydian" color a major scale's own
// 4th degree gets when it's the root of its own chord (an IVmaj7 chord
// extended with the notes already sitting in its parent major scale
// naturally produces a sharp, not a plain, 11th) -- which is exactly why
// jazz and gospel pianists reach for a maj7\u266f11 wherever a major 7th
// chord would otherwise sit, especially on the subdominant (IV) degree.
const MajorSeventhSharpElevenChordService = makeChordService({
  intervals: [0, 4, 7, 11, 18],
  labels: ['Root', 'Major 3rd', 'Perfect 5th', 'Major 7th', 'Sharp 11th'],
  explanations: [
    'The starting note — this note names the chord.',
    'Count 4 semitones up from the root.',
    'Count 3 more semitones up from the 3rd (7 semitones from the root).',
    'Count 4 more semitones up from the 5th (11 semitones from the root) — the same major 7th a plain major 7th chord uses.',
    'Count 7 more semitones up from the 7th (18 semitones from the root — an octave plus a tritone) — a raised (augmented) 11th, one semitone higher than a plain 11th would be.',
  ],
});
