// dominant-seventh-chord.js
// The dominant seventh chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// A dominant 7th chord is a major triad with one more note stacked on
// top — a minor 7th above the root:
//   root -> +4 semitones -> major 3rd
//   major 3rd -> +3 more semitones (root +7 total) -> perfect 5th
//   perfect 5th -> +3 more semitones (root +10 total) -> minor 7th
// So every dominant 7th chord, in any of the 12 keys, is just the
// pitch-class pattern [0, 4, 7, 10] measured in semitones from its root
// -- an ordinary major triad (0, 4, 7) plus a minor 7th on top. It gets
// the name "dominant" because it's the chord built on the 5th (dominant)
// degree of a major scale once the scale's own 7th degree is added as
// the chord's 7th -- V7 is the single most common way a major key
// creates the pull back home to its tonic.
const DominantSeventhChordService = (() => {
  const base = makeChordService({
    intervals: [0, 4, 7, 10],
    labels: ['Root', 'Major 3rd', 'Perfect 5th', 'Minor 7th'],
    explanations: [
      'The starting note — this note names the chord.',
      'Count 4 semitones up from the root.',
      'Count 3 more semitones up from the 3rd (7 semitones from the root).',
      'Count 3 more semitones up from the 5th (10 semitones from the root) — a minor 7th above the root, not a major 7th.',
    ],
  });
  const { buildChord } = base;

  // A 12-bar-blues-style turnaround built entirely from dominant 7th
  // chords: I7 - IV7 - V7 - I7. Unlike a classical I-IV-V-I (all major
  // triads), every chord here keeps its bluesy 7th, which is exactly what
  // gives this progression its bluesy pull rather than a clean classical
  // cadence -- and it works the same way in every one of the 12 keys.
  const progression = {
    id: 'I7-IV7-V7-I7',
    label: 'I7 – IV7 – V7 – I7',
    description: 'A classic blues turnaround: the tonic 7th (I7), the subdominant 7th (IV7), the dominant 7th (V7), and home again (I7) — four chords, three of them distinct, and every single one a dominant 7th chord in every one of the 12 keys. This is the harmonic backbone of countless blues, gospel, and early rock \u2019n\u2019 roll progressions.',
    degrees: [
      { roman: 'I7', name: 'Tonic 7th', semitoneFromKey: 0 },
      { roman: 'IV7', name: 'Subdominant 7th', semitoneFromKey: 5 },
      { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7 },
      { roman: 'I7', name: 'Tonic 7th', semitoneFromKey: 0 },
    ],
  };

  /** Builds the I7-IV7-V7-I7 progression's four chords for `key` at `octave`. */
  function buildProgression(key, octave, preferFlats) {
    return progression.degrees.map((degree) => {
      const degreeKey = {
        semitoneFromC: key.semitoneFromC + degree.semitoneFromKey,
        midiNoteForOctave(o) { return key.midiNoteForOctave(o) + degree.semitoneFromKey; },
      };
      const notes = buildChord(degreeKey, octave, preferFlats);
      return {
        roman: degree.roman,
        name: degree.name,
        chordName: `${notes[0].noteName} dominant 7th`,
        notes,
      };
    });
  }

  return { ...base, progression, buildProgression };
})();
