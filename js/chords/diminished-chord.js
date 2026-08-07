// diminished-chord.js
// The diminished chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// A diminished triad is built by stacking two identical minor-3rd
// intervals on top of a root:
//   root -> +3 semitones -> minor 3rd
//   minor 3rd -> +3 more semitones (root +6 total) -> diminished 5th
// So every diminished triad, in any of the 12 keys, is just the
// pitch-class pattern [0, 3, 6] measured in semitones from its root --
// two stacked minor thirds. Compare this to a minor triad, which counts
// 3 then 4 semitones instead -- the diminished triad simply lowers that
// perfect 5th by one more semitone, turning it into a diminished 5th
// (the same interval musicians call a "tritone", exactly halfway through
// the octave). That squeezed-in 5th is what gives the diminished triad
// its tense, unstable sound -- it has no perfect 5th to anchor it, which
// is exactly why it wants to resolve somewhere else rather than sit
// still.
const DiminishedChordService = (() => {
  const base = makeChordService({
    intervals: [0, 3, 6],
    labels: ['Root', 'Minor 3rd', 'Diminished 5th'],
    explanations: [
      'The starting note -- this note names the chord.',
      'Count 3 semitones up from the root.',
      'Count 3 more semitones up from the 3rd (6 semitones from the root).',
    ],
    naming: 'triad',
  });
  const { noteNameFor } = base;

  // Quality tables used only by the mixed-quality progression below. A
  // diminished triad, taken on its own, is restless and wants to resolve --
  // it has no perfect 5th to rest on, so it works best as a passing chord
  // rather than a destination. The classic, genuinely pleasant use of it is
  // as a chromatic bridge between the subdominant and the dominant: raise
  // the root of the IV chord by a semitone to build a diminished triad on
  // the raised 4th degree (#IV), then let that raised 4th resolve up by one
  // more semitone into the 5th degree. That turns a plain IV -> V step into
  // a smooth stepwise bass line: I -> IV -> #ivdim -> V.
  const QUALITY_INTERVALS = {
    major: [0, 4, 7],
    minor: [0, 3, 7],
    diminished: [0, 3, 6],
  };
  const QUALITY_LABELS = {
    major: ['Root', 'Major 3rd', 'Perfect 5th'],
    minor: ['Root', 'Minor 3rd', 'Perfect 5th'],
    diminished: ['Root', 'Minor 3rd', 'Diminished 5th'],
  };
  const QUALITY_SUFFIX = {
    major: 'major',
    minor: 'minor',
    diminished: 'diminished',
  };

  function buildTriadWithQuality(key, octave, quality, preferFlats) {
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

  // A pleasant four-chord progression containing exactly one diminished
  // triad: I (tonic major) - IV (subdominant major) - #ivdim (a diminished
  // triad built on the raised 4th degree -- the one diminished chord) - V
  // (dominant major). The bass line moves in single steps the whole way
  // (root -> 4th -> raised 4th -> 5th), which is exactly what makes the
  // diminished chord sound like a natural bridge easing into the dominant
  // instead of a jarring outsider, and it works the same way in every one
  // of the 12 keys.
  const progression = {
    id: 'I-IV-ivdim-V',
    label: 'I – IV – #ivdim – V',
    description: 'A classic chromatic-bridge progression: the tonic (I), the subdominant (IV), a diminished triad built on the raised 4th degree (#ivdim), and the dominant (V). Only one chord in the whole progression -- #ivdim -- is diminished; the rest are ordinary major triads. The diminished chord exists purely to walk the bass smoothly from the 4th up to the 5th degree (F to F# to G in the key of C), which is what makes this progression sound pleasant rather than jarring, in every one of the 12 keys.',
    degrees: [
      { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
      { roman: 'IV', name: 'Subdominant', semitoneFromKey: 5, quality: 'major' },
      { roman: '#ivdim', name: 'Raised-subdominant diminished', semitoneFromKey: 6, quality: 'diminished' },
      { roman: 'V', name: 'Dominant', semitoneFromKey: 7, quality: 'major' },
    ],
  };

  /** Builds the I-IV-#ivdim-V progression's four triads for `key` at `octave`. */
  function buildProgression(key, octave, preferFlats) {
    return progression.degrees.map((degree) => {
      const degreeKey = {
        semitoneFromC: key.semitoneFromC + degree.semitoneFromKey,
        midiNoteForOctave(o) { return key.midiNoteForOctave(o) + degree.semitoneFromKey; },
      };
      const notes = buildTriadWithQuality(degreeKey, octave, degree.quality, preferFlats);
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
