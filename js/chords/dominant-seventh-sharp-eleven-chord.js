// dominant-seventh-sharp-eleven-chord.js
// The dominant seventh sharp eleven chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// A Dominant 7♯11 chord (e.g. C7♯11) is built as a plain dominant 7th chord (Lesson 13) with a raised 11th on top — the Lydian dominant color:
//   pitch-class pattern [0, 4, 7, 10, 18] from the root, in every one of the 12 keys.
const DominantSeventhSharpElevenChordService = makeChordService({
  intervals: [0, 4, 7, 10, 18],
  labels: ['Root', 'Major 3rd', 'Perfect 5th', 'Minor 7th', '♯11th'],
  explanations: [
    'The starting note — this note names the chord.',
    'Count 4 semitones up from the root — the major 3rd.',
    'Count 3 more semitones up from the 3rd (7 semitones from the root) — the perfect 5th.',
    'Count 3 more semitones up from the 5th (10 semitones from the root) — the minor 7th.',
    'Count 8 more semitones up from the 7th (18 semitones from the root — an octave plus a tritone) — the ♯11th, a raised 11th.',
  ],
});
