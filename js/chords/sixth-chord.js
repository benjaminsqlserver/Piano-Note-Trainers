// sixth-chord.js
// The sixth chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// A (major) 6th chord is a major triad with one more note stacked on
// top -- a major 6th above the root, not a 7th at all:
//   root -> +4 semitones -> major 3rd
//   major 3rd -> +3 more semitones (root +7 total) -> perfect 5th
//   perfect 5th -> +2 more semitones (root +9 total) -> major 6th
// So every 6th chord, in any of the 12 keys, is just the pitch-class
// pattern [0, 4, 7, 9] measured in semitones from its root -- an
// ordinary major triad (0, 4, 7) plus a major 6th on top. Unlike the
// 7th chords taught in Lessons 13-17, a 6th chord never resolves
// anywhere -- it's a stable, "at rest" color, which is exactly why
// jazz and gospel pianists so often use it as the very last chord of a
// tune (I6) instead of a plain triad or a major 7th.
const SixthChordService = makeChordService({
  intervals: [0, 4, 7, 9],
  labels: ['Root', 'Major 3rd', 'Perfect 5th', 'Major 6th'],
  explanations: [
    'The starting note — this note names the chord.',
    'Count 4 semitones up from the root.',
    'Count 3 more semitones up from the 3rd (7 semitones from the root).',
    'Count 2 more semitones up from the 5th (9 semitones from the root) — a major 6th, not a 7th of any kind.',
  ],
});
