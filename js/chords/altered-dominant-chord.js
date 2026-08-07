// altered-dominant-chord.js
// The altered dominant chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// A Altered Dominant chord (e.g. C7alt) is built as an umbrella name for any dominant 7th chord voiced with altered upper tones (some mix of ♭5, ♯5, ♭9, ♯9) — this trainer voices the common ♯5/♯9 combination:
//   pitch-class pattern [0, 4, 8, 10, 15] from the root, in every one of the 12 keys.
const AlteredDominantChordService = makeChordService({
  intervals: [0, 4, 8, 10, 15],
  labels: ['Root', 'Major 3rd', '♯5th (Augmented 5th)', 'Minor 7th', '♯9th'],
  explanations: [
    'The starting note — this note names the chord.',
    'Count 4 semitones up from the root — the major 3rd.',
    'Count 4 more semitones up from the 3rd (8 semitones from the root, instead of the usual 3) — the ♯5th, a raised perfect 5th.',
    'Count 2 more semitones up from the ♯5th (10 semitones from the root) — the minor 7th.',
    'Count 5 more semitones up from the 7th (15 semitones from the root) — the ♯9th.',
  ],
});
