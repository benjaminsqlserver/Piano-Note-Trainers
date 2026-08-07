// dominant-ninth-sharp-eleven-chord.js
// The dominant ninth sharp eleven chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// A Dominant 9♯11 chord (e.g. C9♯11) is built as a dominant 9th chord (Lesson 32) with a raised 11th stacked on top — also called the Lydian dominant 9:
//   pitch-class pattern [0, 4, 7, 10, 14, 18] from the root, in every one of the 12 keys.
const DominantNinthSharpElevenChordService = makeChordService({
  intervals: [0, 4, 7, 10, 14, 18],
  labels: ['Root', 'Major 3rd', 'Perfect 5th', 'Minor 7th', '9th', '♯11th'],
  explanations: [
    'The starting note — this note names the chord.',
    'Count 4 semitones up from the root — the major 3rd.',
    'Count 3 more semitones up from the 3rd (7 semitones from the root) — the perfect 5th.',
    'Count 3 more semitones up from the 5th (10 semitones from the root) — the minor 7th.',
    'Count 4 more semitones up from the 7th (14 semitones from the root) — the 9th.',
    'Count 4 more semitones up from the 9th (18 semitones from the root — an octave plus a tritone) — the ♯11th.',
  ],
});
