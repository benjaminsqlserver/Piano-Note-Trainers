// dominant-seventh-flat-five-chord.js
// The dominant seventh flat five chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// A Dominant 7♭5 chord (e.g. C7♭5) is built as a plain dominant 7th chord (Lesson 13) with its 5th lowered a semitone:
//   pitch-class pattern [0, 4, 6, 10] from the root, in every one of the 12 keys.
const DominantSeventhFlatFiveChordService = makeChordService({
  intervals: [0, 4, 6, 10],
  labels: ['Root', 'Major 3rd', '♭5th (Diminished 5th)', 'Minor 7th'],
  explanations: [
    'The starting note — this note names the chord.',
    'Count 4 semitones up from the root — the major 3rd.',
    'Count 2 more semitones up from the 3rd (6 semitones from the root, instead of the usual 3) — the ♭5th, a perfect 5th lowered a semitone.',
    'Count 4 more semitones up from the ♭5th (10 semitones from the root) — the minor 7th, the same 7th a plain dominant 7th chord uses.',
  ],
});
