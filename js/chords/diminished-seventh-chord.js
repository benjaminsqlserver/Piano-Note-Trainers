// diminished-seventh-chord.js
// The diminished seventh chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// A fully-diminished 7th chord is built by stacking THREE identical
// minor-3rd intervals on top of a root:
//   root -> +3 semitones -> minor 3rd
//   minor 3rd -> +3 more semitones (root +6 total) -> diminished 5th
//   diminished 5th -> +3 more semitones (root +9 total) -> diminished 7th
// So every diminished 7th chord, in any of the 12 keys, is just the
// pitch-class pattern [0, 3, 6, 9] measured in semitones from its root --
// three stacked minor 3rds that divide the octave into four exactly
// equal parts. That perfect symmetry means a diminished 7th chord is its
// own inversion: C-Eb-Gb-A (C dim7), Eb-Gb-A-C (Eb dim7), Gb-A-C-Eb
// (Gb/F# dim7), and A-C-Eb-Gb (A dim7) are all made of the exact same
// four notes -- there are really only 3 distinct diminished 7th chords
// in all of music, each one shared by 4 different "root" names.
const DiminishedSeventhChordService = (() => {
  const base = makeChordService({
    intervals: [0, 3, 6, 9],
    labels: ['Root', 'Minor 3rd', 'Diminished 5th', 'Diminished 7th'],
    explanations: [
      'The starting note — this note names the chord.',
      'Count 3 semitones up from the root.',
      'Count 3 more semitones up from the 3rd (6 semitones from the root).',
      'Count 3 more semitones up from the 5th (9 semitones from the root) — a diminished 7th, one semitone below a minor 7th.',
    ],
  });
  const { noteNameFor } = base;

  // Quality tables used only by the mixed-quality progression below.
  const QUALITY_INTERVALS = {
    major: [0, 4, 7],
    dominant7: [0, 4, 7, 10],
    diminished7: [0, 3, 6, 9],
  };
  const QUALITY_LABELS = {
    major: ['Root', 'Major 3rd', 'Perfect 5th'],
    dominant7: ['Root', 'Major 3rd', 'Perfect 5th', 'Minor 7th'],
    diminished7: ['Root', 'Minor 3rd', 'Diminished 5th', 'Diminished 7th'],
  };
  const QUALITY_SUFFIX = {
    major: 'major',
    dominant7: 'dominant 7th',
    diminished7: 'diminished 7th',
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

  // A classic cadential use of the diminished 7th: the tonic (I), the
  // dominant 7th (V7) built on the 5th degree, the fully-diminished 7th
  // built on the raised leading tone (vii°7), and home again (I). Both V7
  // and vii°7 are dominant-function chords that want to resolve to the
  // tonic -- in fact vii°7 shares three of its four notes with V7 (V7's
  // 3rd, 5th, and 7th are vii°7's root, 3rd, and diminished 5th), which is
  // exactly why it's often used as a substitute for V7 -- and it works the
  // same way in every one of the 12 keys.
  const progression = {
    id: 'I-V7-viidim7-I',
    label: 'I – V7 – vii°7 – I',
    description: 'A classic cadential progression built around the diminished 7th chord\u2019s resolving pull: the tonic (I), the dominant 7th (V7), the fully-diminished 7th chord built on the raised leading tone (vii°7), and home again (I). Only one chord \u2014 vii°7 \u2014 is a diminished 7th; the rest are major and dominant 7th. vii°7 shares three of its four notes with V7 (they\u2019re both \u201cdominant-function\u201d chords that want to resolve to I), which is why it\u2019s often used as a substitute dominant, in every one of the 12 keys.',
    degrees: [
      { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
      { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      { roman: 'vii°7', name: 'Leading-tone diminished 7th', semitoneFromKey: 11, quality: 'diminished7' },
      { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
    ],
  };

  /** Builds the I-V7-vii°7-I progression's chords for `key` at `octave`. */
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
