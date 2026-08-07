// dominant-seventh-flat-thirteen-chord.js
// The dominant seventh flat thirteen chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// A Dominant 7♭13 chord (e.g. C7♭13) is built as a plain dominant 7th chord (Lesson 13) with a lowered 13th on top — a darker altered-dominant color:
//   pitch-class pattern [0, 4, 7, 10, 20] from the root, in every one of the 12 keys.
const DominantSeventhFlatThirteenChordService = makeChordService({
  intervals: [0, 4, 7, 10, 20],
  labels: ['Root', 'Major 3rd', 'Perfect 5th', 'Minor 7th', '♭13th'],
  explanations: [
    'The starting note — this note names the chord.',
    'Count 4 semitones up from the root — the major 3rd.',
    'Count 3 more semitones up from the 3rd (7 semitones from the root) — the perfect 5th.',
    'Count 3 more semitones up from the 5th (10 semitones from the root) — the minor 7th.',
    'Count 10 more semitones up from the 7th (20 semitones from the root — an octave plus a minor 6th) — the ♭13th, a lowered 13th.',
  ],
});
