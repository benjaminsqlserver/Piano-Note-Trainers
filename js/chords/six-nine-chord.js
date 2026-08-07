// six-nine-chord.js
// The six nine chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// A 6/9 chord (e.g. C6/9, sometimes written C6add9) stacks both a 6th
//   and a 9th on top of a plain major triad -- no 7th of any kind:
//     root -> +4 semitones -> major 3rd
//     major 3rd -> +3 more semitones (root +7 total) -> perfect 5th
//     perfect 5th -> +2 more semitones (root +9 total) -> major 6th
//     major 6th -> +5 more semitones (root +14 total) -> 9th
//   So every 6/9 chord, in any of the 12 keys, is the pitch-class
//   pattern [0, 4, 7, 9, 14] -- the same 6th chord taught in Lesson 20
//   with a 9th added on top. Like a plain 6th or add9 chord, a 6/9
//   chord has no 7th at all, so it never pulls toward a resolution --
//   it's an even richer, fuller "at rest" color than a 6th alone,
//   and a favorite last chord for jazz and gospel tunes.
const SixNineChordService = makeChordService({
  intervals: [0, 4, 7, 9, 14],
  labels: ['Root', 'Major 3rd', 'Perfect 5th', 'Major 6th', '9th'],
  explanations: [
    'The starting note — this note names the chord.',
    'Count 4 semitones up from the root.',
    'Count 3 more semitones up from the 3rd (7 semitones from the root).',
    'Count 2 more semitones up from the 5th (9 semitones from the root) — the same major 6th a plain 6th chord uses.',
    'Count 5 more semitones up from the 6th (14 semitones from the root — an octave plus a major 2nd) — the 9th, stacked on top with no 7th of any kind in between.',
  ],
});
