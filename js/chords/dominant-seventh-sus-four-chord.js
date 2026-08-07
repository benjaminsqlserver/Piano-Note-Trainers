// dominant-seventh-sus-four-chord.js
// The dominant seventh sus four chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// A dominant 7sus4 chord (e.g. C7sus4) is a sus4 chord with a minor 7th
//   stacked on top -- the suspended cousin of an ordinary dominant 7th:
//     root -> +5 semitones -> perfect 4th (replacing the 3rd)
//     perfect 4th -> +2 more semitones (root +7 total) -> perfect 5th
//     perfect 5th -> +3 more semitones (root +10 total) -> minor 7th
//   So every 7sus4 chord, in any of the 12 keys, is the pitch-class
//   pattern [0, 5, 7, 10]. Gospel and jazz pianists lean on 7sus4 as a
//   softer stand-in for V7 -- it still carries the pull of a dominant
//   7th, but the suspended 4th removes the sharp major-3rd edge, so it
//   often lingers for a full bar before resolving down into V7 itself.
const DominantSeventhSusFourChordService = makeChordService({
  intervals: [0, 5, 7, 10],
  labels: ['Root', 'Perfect 4th', 'Perfect 5th', 'Minor 7th'],
  explanations: [
    'The starting note — this note names the chord.',
    'Count 5 semitones up from the root — this replaces the 3rd entirely, so the chord is neither major nor minor.',
    'Count 2 more semitones up from the 4th (7 semitones from the root) — the perfect 5th.',
    'Count 3 more semitones up from the 5th (10 semitones from the root) — the minor 7th, the same 7th a plain dominant 7th chord uses.',
  ],
});
