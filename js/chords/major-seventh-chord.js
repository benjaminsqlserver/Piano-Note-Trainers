// major-seventh-chord.js
// The major seventh chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// A major 7th chord is a major triad with one more note stacked on top
// -- a major 7th above the root:
//   root -> +4 semitones -> major 3rd
//   major 3rd -> +3 more semitones (root +7 total) -> perfect 5th
//   perfect 5th -> +4 more semitones (root +11 total) -> major 7th
// So every major 7th chord, in any of the 12 keys, is just the
// pitch-class pattern [0, 4, 7, 11] measured in semitones from its root
// -- an ordinary major triad (0, 4, 7) plus a major 7th on top, only ONE
// semitone below the octave. That's what makes it sound so different
// from a dominant 7th (which uses a minor 7th, two semitones below the
// octave): instead of pulling hard toward another chord, a major 7th
// chord sounds lush, dreamy, and content to stay put -- the signature
// color of jazz ballads and soft gospel tonic chords alike.
const MajorSeventhChordService = (() => {
  const base = makeChordService({
    intervals: [0, 4, 7, 11],
    labels: ['Root', 'Major 3rd', 'Perfect 5th', 'Major 7th'],
    explanations: [
      'The starting note — this note names the chord.',
      'Count 4 semitones up from the root.',
      'Count 3 more semitones up from the 3rd (7 semitones from the root).',
      'Count 4 more semitones up from the 5th (11 semitones from the root) — a major 7th, just one semitone below the octave.',
    ],
  });
  const { noteNameFor } = base;

  // Quality tables used only by the mixed-quality progression below.
  const QUALITY_INTERVALS = {
    major7: [0, 4, 7, 11],
    minor7: [0, 3, 7, 10],
    dominant7: [0, 4, 7, 10],
  };
  const QUALITY_LABELS = {
    major7: ['Root', 'Major 3rd', 'Perfect 5th', 'Major 7th'],
    minor7: ['Root', 'Minor 3rd', 'Perfect 5th', 'Minor 7th'],
    dominant7: ['Root', 'Major 3rd', 'Perfect 5th', 'Minor 7th'],
  };
  const QUALITY_SUFFIX = {
    major7: 'major 7th',
    minor7: 'minor 7th',
    dominant7: 'dominant 7th',
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

  // A classic jazz "turnaround" built around the major 7th's tonic color:
  // Imaj7 - vi7 - ii7 - V7. Only the first chord is a major 7th; the rest
  // are the minor 7th and dominant 7th chords a major scale naturally
  // produces on its 6th, 2nd, and 5th degrees. This is the same
  // circle-of-fifths motion (down a 5th each time: I -> vi -> ii -> V)
  // that powers countless jazz standards and gospel turnarounds, and it
  // works the same way in every one of the 12 keys.
  const progression = {
    id: 'Imaj7-vi7-ii7-V7',
    label: 'Imaj7 – vi7 – ii7 – V7',
    description: 'A classic jazz/gospel turnaround built around the major 7th\u2019s lush tonic color: the tonic major 7th (Imaj7), the relative-minor 7th (vi7), the supertonic minor 7th (ii7), and the dominant 7th (V7). Only the first chord \u2014 Imaj7 \u2014 is a major 7th; the rest are the minor 7th and dominant 7th chords a major scale naturally produces on those degrees. Each root moves down a 5th from the last (I \u2192 vi \u2192 ii \u2192 V), the same circle-of-fifths motion behind countless jazz standards, in every one of the 12 keys.',
    degrees: [
      { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
      { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
      { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
      { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
    ],
  };

  /** Builds the Imaj7-vi7-ii7-V7 progression's chords for `key` at `octave`. */
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
