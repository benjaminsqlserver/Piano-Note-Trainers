// major-chord.js
// The major chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// A major triad is built by stacking two intervals on top of a root:
//   root -> +4 semitones -> major 3rd
//   major 3rd -> +3 semitones (root +7 total) -> perfect 5th
// So every major triad, in any of the 12 keys, is just the pitch-class
// pattern [0, 4, 7] measured in semitones from its root.
const MajorChordService = (() => {
  const base = makeChordService({
    intervals: [0, 4, 7],
    labels: ['Root', 'Major 3rd', 'Perfect 5th'],
    explanations: [
      'The starting note — this note names the chord.',
      'Count 4 semitones up from the root.',
      'Count 3 more semitones up from the 3rd (7 semitones from the root).',
    ],
    naming: 'triad',
  });
  const { buildTriad } = base;

  // The most fundamental progression in tonal music: I - IV - V - I. Built
  // only from the three primary major triads of a major key, it never
  // touches a minor chord in any of the 12 keys, which is exactly what
  // makes it work as an "all major triads" progression everywhere.
  const progression = {
    id: 'I-IV-V-I',
    label: 'I – IV – V – I',
    description: 'The classic cadential progression: the tonic (I), the subdominant (IV), the dominant (V), and home again (I) — four chords, three of them distinct, and every single one a major triad in every one of the 12 keys.',
    degrees: [
      { roman: 'I', name: 'Tonic', semitoneFromKey: 0 },
      { roman: 'IV', name: 'Subdominant', semitoneFromKey: 5 },
      { roman: 'V', name: 'Dominant', semitoneFromKey: 7 },
      { roman: 'I', name: 'Tonic', semitoneFromKey: 0 },
    ],
  };

  /** Builds the I-IV-V-I progression's four triads for `key` at `octave`. */
  function buildProgression(key, octave, preferFlats) {
    return progression.degrees.map((degree) => {
      const degreeKey = {
        semitoneFromC: key.semitoneFromC + degree.semitoneFromKey,
        midiNoteForOctave(o) { return key.midiNoteForOctave(o) + degree.semitoneFromKey; },
      };
      const notes = buildTriad(degreeKey, octave, preferFlats);
      return {
        roman: degree.roman,
        name: degree.name,
        chordName: `${notes[0].noteName} major`,
        notes,
      };
    });
  }

  return { ...base, progression, buildProgression };
})();
