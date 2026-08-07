// half-diminished-seventh-chord.js
// The half diminished seventh chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// A half-diminished 7th chord (also written m7♭5) is a diminished triad
// with one more note stacked on top -- a minor 7th above the root,
// instead of the diminished 7th that makes a FULLY diminished chord:
//   root -> +3 semitones -> minor 3rd
//   minor 3rd -> +3 more semitones (root +6 total) -> diminished 5th
//   diminished 5th -> +4 more semitones (root +10 total) -> minor 7th
// So every half-diminished 7th chord, in any of the 12 keys, is just the
// pitch-class pattern [0, 3, 6, 10] measured in semitones from its root
// -- a diminished triad (0, 3, 6) plus a minor 7th (not a diminished
// 7th) on top. "Half"-diminished because only the triad underneath is
// diminished; the 7th itself is the ordinary minor 7th, one semitone
// higher than the fully-diminished chord's diminished 7th. This is the
// chord a major scale naturally builds on its own 7th (leading-tone)
// degree -- unlike the fully-diminished 7th, which has to borrow a note
// from outside the scale.
const HalfDiminishedSeventhChordService = (() => {
  const base = makeChordService({
    intervals: [0, 3, 6, 10],
    labels: ['Root', 'Minor 3rd', 'Diminished 5th', 'Minor 7th'],
    explanations: [
      'The starting note — this note names the chord.',
      'Count 3 semitones up from the root.',
      'Count 3 more semitones up from the 3rd (6 semitones from the root).',
      'Count 4 more semitones up from the 5th (10 semitones from the root) — a minor 7th, not a diminished 7th.',
    ],
  });
  const { noteNameFor } = base;

  // Quality tables used only by the mixed-quality progression below.
  const QUALITY_INTERVALS = {
    major: [0, 4, 7],
    dominant7: [0, 4, 7, 10],
    halfDiminished7: [0, 3, 6, 10],
  };
  const QUALITY_LABELS = {
    major: ['Root', 'Major 3rd', 'Perfect 5th'],
    dominant7: ['Root', 'Major 3rd', 'Perfect 5th', 'Minor 7th'],
    halfDiminished7: ['Root', 'Minor 3rd', 'Diminished 5th', 'Minor 7th'],
  };
  const QUALITY_SUFFIX = {
    major: 'major',
    dominant7: 'dominant 7th',
    halfDiminished7: 'half-diminished 7th',
  };

  function buildChordWithQuality(key, octave, quality, preferFlats) {
    const rootMidi = key.midiNoteForOctave(octave);
    const intervals = QUALITY_INTERVALS[quality];
    const labels = QUALITY_LABELS[quality];
    return intervals.map((semitone, i) => ({
      role: labels[i],
      semitoneFromRoot: semitone,
      midiNote: rootMidi + semitone,
      noteName: noteNameFor(key.semitoneFromC + semitone, preferFlats),
    }));
  }

  // A cadential progression showing the half-diminished 7th chord's own
  // diatonic home: the tonic (I), the dominant 7th (V7), the
  // half-diminished 7th chord built on the scale's own leading tone
  // (viiø7 -- the 7th chord a major scale naturally produces there,
  // without borrowing any note from outside the scale), and home again
  // (I). Compare this to the Diminished 7th Chord lesson's I-V7-vii\u00b07-I,
  // which instead uses the FULLY-diminished, chromatically-borrowed
  // version of the same leading-tone chord -- the two progressions are
  // deliberately parallel so you can hear the difference a single
  // semitone (minor 7th vs. diminished 7th) makes.
  const progression = {
    id: 'I-V7-viihalfdim7-I',
    label: 'I – V7 – vii\u00f87 – I',
    description: 'A cadential progression showing the half-diminished 7th chord\u2019s own diatonic home: the tonic (I), the dominant 7th (V7), the half-diminished 7th chord built on the scale\u2019s own leading tone (vii\u00f87 -- a chord the major scale produces naturally, without borrowing any note from outside the scale), and home again (I). Compare this to the Diminished 7th Chord lesson\u2019s I-V7-vii\u00b07-I, which instead uses the fully-diminished, chromatically-borrowed version of the same leading-tone chord -- the two progressions are deliberately parallel so you can hear the difference a single semitone makes, in every one of the 12 keys.',
    degrees: [
      { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
      { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      { roman: 'vii\u00f87', name: 'Leading-tone half-diminished 7th', semitoneFromKey: 11, quality: 'halfDiminished7' },
      { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
    ],
  };

  /** Builds the I-V7-viiø7-I progression's chords for `key` at `octave`. */
  function buildProgression(key, octave, preferFlats) {
    return progression.degrees.map((degree) => {
      const degreeKey = {
        semitoneFromC: key.semitoneFromC + degree.semitoneFromKey,
        midiNoteForOctave(o) { return key.midiNoteForOctave(o) + degree.semitoneFromKey; },
      };
      const notes = buildChordWithQuality(degreeKey, octave, degree.quality, preferFlats);
      return {
        roman: degree.roman,
        name: degree.name,
        quality: degree.quality,
        chordName: `${notes[0].noteName} ${QUALITY_SUFFIX[degree.quality]}`,
        notes,
      };
    });
  }

  return { ...base, progression, buildProgression };
})();
