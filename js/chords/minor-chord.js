// minor-chord.js
// The minor chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// A minor triad is built by stacking two intervals on top of a root:
//   root -> +3 semitones -> minor 3rd
//   minor 3rd -> +4 semitones (root +7 total) -> perfect 5th
// So every minor triad, in any of the 12 keys, is just the pitch-class
// pattern [0, 3, 7] measured in semitones from its root -- the same total
// span as a major triad (7 semitones, root to 5th), but with the 3rd
// pulled down a semitone, which is what gives it its minor color.
const MinorChordService = (() => {
  const base = makeChordService({
    intervals: [0, 3, 7],
    labels: ['Root', 'Minor 3rd', 'Perfect 5th'],
    explanations: [
      'The starting note -- this note names the chord.',
      'Count 3 semitones up from the root.',
      'Count 4 more semitones up from the 3rd (7 semitones from the root).',
    ],
    naming: 'triad',
  });
  const { buildTriad } = base;

  // A pleasant, all-minor four-chord progression: i - iv - v - i, built from
  // the notes of the natural (Aeolian) minor scale rather than the major
  // scale. Every triad stacked on the 1st, 4th, and 5th degrees of a
  // natural minor scale happens to come out minor (unlike the major scale,
  // where the equivalent v chord would be major and vii would be
  // diminished) -- so this is the natural-minor mirror of the classic
  // I-IV-V-I cadence, and it stays entirely minor in every one of the 12
  // keys.
  const progression = {
    id: 'i-iv-v-i',
    label: 'i – iv – v – i',
    description: 'The natural-minor mirror of the classic cadential progression: the tonic (i), the subdominant (iv), the dominant (v), and home again (i) — four chords, three of them distinct, and every single one a minor triad in every one of the 12 keys. Each chord is built from the natural (Aeolian) minor scale of the chosen key, which is exactly what keeps the v chord minor instead of major.',
    degrees: [
      { roman: 'i', name: 'Tonic', semitoneFromKey: 0 },
      { roman: 'iv', name: 'Subdominant', semitoneFromKey: 5 },
      { roman: 'v', name: 'Dominant', semitoneFromKey: 7 },
      { roman: 'i', name: 'Tonic', semitoneFromKey: 0 },
    ],
  };

  /** Builds the i-iv-v-i progression's four triads for `key` at `octave`. */
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
        chordName: `${notes[0].noteName} minor`,
        notes,
      };
    });
  }

  return { ...base, progression, buildProgression };
})();
