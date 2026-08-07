// augmented-chord.js
// The augmented chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// An augmented triad is built by stacking two identical intervals on top
// of a root:
//   root -> +4 semitones -> major 3rd
//   major 3rd -> +4 more semitones (root +8 total) -> augmented 5th
// So every augmented triad, in any of the 12 keys, is just the pitch-class
// pattern [0, 4, 8] measured in semitones from its root -- two stacked
// major thirds. Because 4 + 4 + 4 = 12, the augmented triad is perfectly
// symmetrical: it divides the octave into three equal parts, which is why
// it has no single "correct" spelling of its 5th (it can be written as a
// sharp 5 or, enharmonically, as a flat 6) and why -- unlike major or
// minor triads -- it sounds identical no matter which of its three notes
// is treated as the root.
const AugmentedChordService = (() => {
  const base = makeChordService({
    intervals: [0, 4, 8],
    labels: ['Root', 'Major 3rd', 'Augmented 5th'],
    explanations: [
      'The starting note -- this note names the chord.',
      'Count 4 semitones up from the root.',
      'Count 4 more semitones up from the 3rd (8 semitones from the root).',
    ],
    naming: 'triad',
  });
  const { noteNameFor } = base;

  // Quality tables used only by the mixed-quality progression below. An
  // augmented triad, taken on its own, has no pull toward "home" -- its
  // symmetry means every inversion sounds the same -- so it works best as a
  // passing chord rather than a destination. The classic, genuinely
  // pleasant use of it is as a chromatic bridge: keep the root and 3rd of
  // the tonic chord and simply raise the 5th by a semitone (e.g. G -> G#),
  // then let that raised 5th resolve up by one more semitone into the 6th
  // degree of the scale. That turns a plain I -> vi jump into a smooth
  // stepwise bass line: I -> I+ -> vi -> IV.
  const QUALITY_INTERVALS = {
    major: [0, 4, 7],
    minor: [0, 3, 7],
    augmented: [0, 4, 8],
  };
  const QUALITY_LABELS = {
    major: ['Root', 'Major 3rd', 'Perfect 5th'],
    minor: ['Root', 'Minor 3rd', 'Perfect 5th'],
    augmented: ['Root', 'Major 3rd', 'Augmented 5th'],
  };
  const QUALITY_SUFFIX = {
    major: 'major',
    minor: 'minor',
    augmented: 'augmented',
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

  // A pleasant four-chord progression containing exactly one augmented
  // triad: I (tonic major) - I+ (the same chord with its 5th raised a
  // semitone -- the one augmented chord) - vi (relative minor) - IV
  // (subdominant major). The bass line moves in single steps the whole way
  // (root -> raised 5th -> 6th -> 4th), which is exactly what makes the
  // augmented chord sound like a natural bridge instead of a jarring
  // outsider, and it works the same way in every one of the 12 keys.
  const progression = {
    id: 'I-Iaug-vi-IV',
    label: 'I – I+ – vi – IV',
    description: 'A classic chromatic-bridge progression: the tonic (I), that same chord with its 5th raised a semitone to make it augmented (I+), the relative minor (vi), and the subdominant (IV). Only one chord in the whole progression -- I+ -- is augmented; the rest are ordinary major and minor triads. The augmented chord exists purely to walk the bass smoothly from the 5th up to the 6th degree (G to G# to A in the key of C), which is what makes this progression sound pleasant rather than jarring, in every one of the 12 keys.',
    degrees: [
      { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
      { roman: 'I+', name: 'Augmented tonic', semitoneFromKey: 0, quality: 'augmented' },
      { roman: 'vi', name: 'Relative minor', semitoneFromKey: 9, quality: 'minor' },
      { roman: 'IV', name: 'Subdominant', semitoneFromKey: 5, quality: 'major' },
    ],
  };

  /** Builds the I-I+-vi-IV progression's four triads for `key` at `octave`. */
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
