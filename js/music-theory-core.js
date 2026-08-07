// music-theory-core.js
// The note-naming tables, the 12 keys, the circle of fourths, and the chord
// factory that every chord lesson is built from.
//
// Every chord this app teaches is described the same way: a list of intervals
// in semitones from the root, a label for each of those tones, and a sentence
// explaining how a learner counts their way to it. Given those three lists,
// the note names, MIDI numbers, and per-key spellings all follow mechanically
// — which is what `makeChordService` does. A chord lesson therefore only has
// to state what actually makes its chord different (see chord-services.js).
//
// Loaded as a plain classic script, like everything else here: it defines
// exactly two globals, `MusicTheory` and `makeChordService`, so it can't
// collide with the note-name helpers the song trainers define for themselves.

const MusicTheory = (() => {
  const SHARP_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const FLAT_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

  /** Names an absolute semitone offset from C, in whichever spelling is asked for. */
  function noteNameFor(absSemitoneFromC, preferFlats) {
    const idx = ((absSemitoneFromC % 12) + 12) % 12;
    return preferFlats ? FLAT_NAMES[idx] : SHARP_NAMES[idx];
  }

  // The 12 keys in simple chromatic order (used by the Learn tab and by the
  // key picker on every progression exercise).
  const KEYS = SHARP_NAMES.map((name, semitoneFromC) => ({
    semitoneFromC,
    name,
    flatName: FLAT_NAMES[semitoneFromC],
    midiNoteForOctave(octave) { return 12 * (octave + 1) + semitoneFromC; },
  }));

  // The circle of fourths: starting on C, each next key is a perfect 4th
  // (5 semitones) higher than the last. Traditionally spelled with flats
  // (except the enharmonic F#/Gb link, shown both ways) because that's how
  // players actually read it on a chart.
  const CIRCLE_OF_FOURTHS_SEMITONES = [0, 5, 10, 3, 8, 1, 6, 11, 4, 9, 2, 7];
  const CIRCLE_OF_FOURTHS = CIRCLE_OF_FOURTHS_SEMITONES.map((semitoneFromC, position) => {
    const key = KEYS[semitoneFromC];
    const isEnharmonicLink = semitoneFromC === 6; // Gb / F#
    return {
      position: position + 1,
      semitoneFromC,
      name: isEnharmonicLink ? `${FLAT_NAMES[6]} (${SHARP_NAMES[6]})` : key.flatName,
      key,
    };
  });

  return { SHARP_NAMES, FLAT_NAMES, KEYS, CIRCLE_OF_FOURTHS, noteNameFor };
})();

/**
 * Builds a chord service from the only three things that vary between chord
 * qualities. Returns the same shape every chord lesson's page script already
 * expects.
 *
 * config:
 *   intervals    {number[]} semitones from the root, e.g. [0, 4, 7, 11] for maj7
 *   labels       {string[]} a name per tone, e.g. ['Root', 'Major 3rd', ...]
 *   explanations {string[]} the Learn tab's step-by-step prose, one per tone
 *   naming       {'chord'|'triad'} whether the builders are exposed as
 *                buildChord/chordMidiNotes (the default) or buildTriad/
 *                triadMidiNotes, matching what each lesson's script calls
 */
function makeChordService(config) {
  const INTERVALS_FROM_ROOT = config.intervals;
  const CHORD_TONE_LABELS = config.labels;
  const CHORD_TONE_EXPLANATIONS = config.explanations;
  const { KEYS, CIRCLE_OF_FOURTHS, noteNameFor } = MusicTheory;

  /** Builds one chord, tone by tone, for `key` starting at `octave`. */
  function buildChord(key, octave, preferFlats) {
    const rootMidi = key.midiNoteForOctave(octave);
    return INTERVALS_FROM_ROOT.map((semitone, i) => ({
      role: CHORD_TONE_LABELS[i],
      explanation: CHORD_TONE_EXPLANATIONS[i],
      semitoneFromRoot: semitone,
      midiNote: rootMidi + semitone,
      noteName: noteNameFor(key.semitoneFromC + semitone, preferFlats),
    }));
  }

  function chordMidiNotes(key, octave) {
    return INTERVALS_FROM_ROOT.map((semitone) => key.midiNoteForOctave(octave) + semitone);
  }

  const service = {
    keys: KEYS,
    circleOfFourths: CIRCLE_OF_FOURTHS,
    intervalsFromRoot: INTERVALS_FROM_ROOT,
    chordToneLabels: CHORD_TONE_LABELS,
    noteNameFor,
  };

  // The triad lessons (Lessons 08-11) name these builders after triads; every
  // later lesson calls them chords. Same functions either way.
  if (config.naming === 'triad') {
    service.buildTriad = buildChord;
    service.triadMidiNotes = chordMidiNotes;
  } else {
    service.buildChord = buildChord;
    service.chordMidiNotes = chordMidiNotes;
  }

  return service;
}
