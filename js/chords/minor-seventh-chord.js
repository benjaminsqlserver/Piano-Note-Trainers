// minor-seventh-chord.js
// The minor seventh chord quality, as data: its intervals in semitones from the
// root, the name of each tone, and the Learn tab's step-by-step prose.
// Everything mechanical (the 12 keys, the circle of fourths, note spellings,
// MIDI numbers) comes from makeChordService() in js/music-theory-core.js,
// which must be loaded first.

// A minor 7th chord is a minor triad with one more note stacked on top
// -- a minor 7th above the root:
//   root -> +3 semitones -> minor 3rd
//   minor 3rd -> +4 more semitones (root +7 total) -> perfect 5th
//   perfect 5th -> +3 more semitones (root +10 total) -> minor 7th
// So every minor 7th chord, in any of the 12 keys, is just the
// pitch-class pattern [0, 3, 7, 10] measured in semitones from its root
// -- an ordinary minor triad (0, 3, 7) plus a minor 7th on top. It's the
// chord you get by stacking a scale's 1st, 3rd, 5th, and 7th degrees on
// top of each other whenever that scale's 3rd and 7th are both minor
// (lowered a semitone from major) -- which happens naturally on several
// degrees of the natural minor scale, and is exactly why it has such a
// warm, settled, "resting" sound compared to the more restless dominant
// 7th.
const MinorSeventhChordService = (() => {
  const base = makeChordService({
    intervals: [0, 3, 7, 10],
    labels: ['Root', 'Minor 3rd', 'Perfect 5th', 'Minor 7th'],
    explanations: [
      'The starting note — this note names the chord.',
      'Count 3 semitones up from the root.',
      'Count 4 more semitones up from the 3rd (7 semitones from the root).',
      'Count 3 more semitones up from the 5th (10 semitones from the root) — a minor 7th above the root.',
    ],
  });
  const { buildChord } = base;

  // A pleasant, all-minor-7th four-chord progression: i7 - iv7 - v7 - i7,
  // built from the notes of the natural (Aeolian) minor scale -- the
  // 7th-chord mirror of MinorChordService's i-iv-v-i. Every 7th chord
  // stacked on the 1st, 4th, and 5th degrees of a natural minor scale
  // happens to come out minor 7th (unlike the major scale, where the
  // equivalent V7 chord would be dominant 7th), so this stays entirely
  // minor 7th in every one of the 12 keys.
  const progression = {
    id: 'i7-iv7-v7-i7',
    label: 'i7 – iv7 – v7 – i7',
    description: 'The 7th-chord mirror of the natural-minor i-iv-v-i cadence: the tonic 7th (i7), the subdominant 7th (iv7), the dominant 7th of the natural minor scale (v7 -- minor here, not the dominant 7th you\u2019d get in a major key), and home again (i7) -- four chords, three of them distinct, and every single one a minor 7th chord in every one of the 12 keys, built from the natural (Aeolian) minor scale.',
    degrees: [
      { roman: 'i7', name: 'Tonic 7th', semitoneFromKey: 0 },
      { roman: 'iv7', name: 'Subdominant 7th', semitoneFromKey: 5 },
      { roman: 'v7', name: 'Minor dominant 7th', semitoneFromKey: 7 },
      { roman: 'i7', name: 'Tonic 7th', semitoneFromKey: 0 },
    ],
  };

  /** Builds the i7-iv7-v7-i7 progression's four chords for `key` at `octave`. */
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
        chordName: `${notes[0].noteName} minor 7th`,
        notes,
      };
    });
  }

  return { ...base, progression, buildProgression };
})();
