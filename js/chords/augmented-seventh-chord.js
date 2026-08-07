// augmented-seventh-chord.js
// The augmented seventh chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// An augmented 7th chord — also called a dominant 7♯5, C7♯5, C+7, C7+,
// augmented dominant seventh, or dominant seventh augmented — is a
// dominant 7th chord with its 5th raised a semitone:
//   root -> +4 semitones -> major 3rd
//   major 3rd -> +4 more semitones (root +8 total) -> augmented 5th
//   augmented 5th -> +2 more semitones (root +10 total) -> minor 7th
// So every augmented 7th chord, in any of the 12 keys, is just the
// pitch-class pattern [0, 4, 8, 10] measured in semitones from its root
// -- an augmented triad (0, 4, 8) plus a minor 7th on top, the same
// minor 7th a plain dominant 7th chord uses. Raising the 5th pulls it
// outward instead of leaving it perfect, giving this "altered dominant"
// extra tension and an even stronger pull to its tonic than a plain
// dominant 7th -- which is exactly why jazz and gospel players reach
// for it as a spicier substitute for V7 wherever a dominant chord
// resolves down a 5th (or up a 4th) to its tonic.
const AugmentedSeventhChordService = makeChordService({
  intervals: [0, 4, 8, 10],
  labels: ['Root', 'Major 3rd', 'Augmented 5th', 'Minor 7th'],
  explanations: [
    'The starting note — this note names the chord.',
    'Count 4 semitones up from the root.',
    'Count 4 more semitones up from the 3rd (8 semitones from the root) — a raised (augmented) 5th, a semitone higher than a perfect 5th.',
    'Count 2 more semitones up from the 5th (10 semitones from the root) — a minor 7th, the same 7th a plain dominant 7th chord uses.',
  ],
});
