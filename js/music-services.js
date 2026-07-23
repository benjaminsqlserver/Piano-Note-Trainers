// music-services.js
// Vanilla-JS port of the four original C# "*Service" classes: the music
// theory logic that builds note lists and ascending/descending practice
// sequences for each lesson. No framework dependencies.

function floorDiv(a, b) {
  let q = Math.trunc(a / b);
  if (a % b !== 0 && (a < 0) !== (b < 0)) q -= 1;
  return q;
}

// ---------------------------------------------------------------- White keys

const WhiteKeyService = (() => {
  const LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const SEMITONES = [0, 2, 4, 5, 7, 9, 11];

  const notes = LETTERS.map((letter, i) => ({
    letter,
    semitoneFromC: SEMITONES[i],
    letterIndex: i,
    midiNoteForOctave(octave) { return 12 * (octave + 1) + SEMITONES[i]; },
  }));

  function buildAscending(startNote, octave, octaveSpan) {
    const totalSteps = 7 * octaveSpan + 1;
    const steps = [];
    for (let i = 0; i < totalSteps; i++) {
      const position = startNote.letterIndex + i;
      const idx = position % 7;
      const octavesAdvanced = Math.floor(position / 7);
      const stepOctave = octave + octavesAdvanced;
      steps.push({
        midiNote: 12 * (stepOctave + 1) + SEMITONES[idx],
        letter: LETTERS[idx],
        octave: stepOctave,
        isTonic: idx === startNote.letterIndex,
      });
    }
    return steps;
  }

  function buildDescending(startNote, octave, octaveSpan) {
    const totalSteps = 7 * octaveSpan + 1;
    const steps = [];
    for (let i = 0; i < totalSteps; i++) {
      const position = startNote.letterIndex - i;
      const idx = ((position % 7) + 7) % 7;
      const octavesDescended = floorDiv(position, 7);
      const stepOctave = octave + octavesDescended;
      steps.push({
        midiNote: 12 * (stepOctave + 1) + SEMITONES[idx],
        letter: LETTERS[idx],
        octave: stepOctave,
        isTonic: idx === startNote.letterIndex,
      });
    }
    return steps;
  }

  function buildAscendingThenDescending(startNote, octave, octaveSpan) {
    const asc = buildAscending(startNote, octave, octaveSpan);
    const desc = buildDescending(startNote, octave + octaveSpan, octaveSpan);
    return asc.concat(desc.slice(1));
  }

  return { notes, buildAscending, buildDescending, buildAscendingThenDescending };
})();

// ---------------------------------------------------------------- Sharp keys

const SharpKeyService = (() => {
  const LETTERS = ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#'];
  const BASE_LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const SEMITONES = [1, 3, 5, 6, 8, 10, 12];

  function pitchClassOf(semitoneFromC) { return ((semitoneFromC % 12) + 12) % 12; }
  function whiteKeyEnharmonicName(pc) { return pc === 0 ? 'C' : pc === 5 ? 'F' : null; }

  const notes = LETTERS.map((letter, i) => {
    const pc = pitchClassOf(SEMITONES[i]);
    return {
      letter,
      baseLetter: BASE_LETTERS[i],
      semitoneFromC: SEMITONES[i],
      letterIndex: i,
      pitchClass: pc,
      isWhiteKeyEnharmonic: pc === 0 || pc === 5,
      whiteKeyEnharmonicName: whiteKeyEnharmonicName(pc),
      midiNoteForOctave(octave) { return 12 * (octave + 1) + SEMITONES[i]; },
    };
  });

  function buildAscending(startNote, octave, octaveSpan) {
    const totalSteps = 7 * octaveSpan + 1;
    const steps = [];
    for (let i = 0; i < totalSteps; i++) {
      const position = startNote.letterIndex + i;
      const idx = position % 7;
      const octavesAdvanced = Math.floor(position / 7);
      const stepOctave = octave + octavesAdvanced;
      const note = notes[idx];
      steps.push({
        midiNote: 12 * (stepOctave + 1) + SEMITONES[idx],
        letter: LETTERS[idx],
        octave: stepOctave,
        isTonic: idx === startNote.letterIndex,
        isWhiteKeyEnharmonic: note.isWhiteKeyEnharmonic,
        whiteKeyEnharmonicName: note.whiteKeyEnharmonicName,
      });
    }
    return steps;
  }

  function buildDescending(startNote, octave, octaveSpan) {
    const totalSteps = 7 * octaveSpan + 1;
    const steps = [];
    for (let i = 0; i < totalSteps; i++) {
      const position = startNote.letterIndex - i;
      const idx = ((position % 7) + 7) % 7;
      const octavesDescended = floorDiv(position, 7);
      const stepOctave = octave + octavesDescended;
      const note = notes[idx];
      steps.push({
        midiNote: 12 * (stepOctave + 1) + SEMITONES[idx],
        letter: LETTERS[idx],
        octave: stepOctave,
        isTonic: idx === startNote.letterIndex,
        isWhiteKeyEnharmonic: note.isWhiteKeyEnharmonic,
        whiteKeyEnharmonicName: note.whiteKeyEnharmonicName,
      });
    }
    return steps;
  }

  function buildAscendingThenDescending(startNote, octave, octaveSpan) {
    const asc = buildAscending(startNote, octave, octaveSpan);
    const desc = buildDescending(startNote, octave + octaveSpan, octaveSpan);
    return asc.concat(desc.slice(1));
  }

  const pitchClassLabels = Object.fromEntries(notes.map((n) => [n.pitchClass, n.letter]));

  return { notes, buildAscending, buildDescending, buildAscendingThenDescending, pitchClassLabels };
})();

// ----------------------------------------------------------------- Flat keys

const FlatKeyService = (() => {
  const LETTERS = ['C♭', 'D♭', 'E♭', 'F♭', 'G♭', 'A♭', 'B♭'];
  const BASE_LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const SEMITONES = [-1, 1, 3, 4, 6, 8, 10];

  function pitchClassOf(semitoneFromC) { return ((semitoneFromC % 12) + 12) % 12; }
  function whiteKeyEnharmonicName(pc) { return pc === 11 ? 'B' : pc === 4 ? 'E' : null; }

  const notes = LETTERS.map((letter, i) => {
    const pc = pitchClassOf(SEMITONES[i]);
    return {
      letter,
      baseLetter: BASE_LETTERS[i],
      semitoneFromC: SEMITONES[i],
      letterIndex: i,
      pitchClass: pc,
      isWhiteKeyEnharmonic: pc === 11 || pc === 4,
      whiteKeyEnharmonicName: whiteKeyEnharmonicName(pc),
      midiNoteForOctave(octave) { return 12 * (octave + 1) + SEMITONES[i]; },
    };
  });

  function buildAscending(startNote, octave, octaveSpan) {
    const totalSteps = 7 * octaveSpan + 1;
    const steps = [];
    for (let i = 0; i < totalSteps; i++) {
      const position = startNote.letterIndex + i;
      const idx = position % 7;
      const octavesAdvanced = Math.floor(position / 7);
      const stepOctave = octave + octavesAdvanced;
      const note = notes[idx];
      steps.push({
        midiNote: 12 * (stepOctave + 1) + SEMITONES[idx],
        letter: LETTERS[idx],
        octave: stepOctave,
        isTonic: idx === startNote.letterIndex,
        isWhiteKeyEnharmonic: note.isWhiteKeyEnharmonic,
        whiteKeyEnharmonicName: note.whiteKeyEnharmonicName,
      });
    }
    return steps;
  }

  function buildDescending(startNote, octave, octaveSpan) {
    const totalSteps = 7 * octaveSpan + 1;
    const steps = [];
    for (let i = 0; i < totalSteps; i++) {
      const position = startNote.letterIndex - i;
      const idx = ((position % 7) + 7) % 7;
      const octavesDescended = floorDiv(position, 7);
      const stepOctave = octave + octavesDescended;
      const note = notes[idx];
      steps.push({
        midiNote: 12 * (stepOctave + 1) + SEMITONES[idx],
        letter: LETTERS[idx],
        octave: stepOctave,
        isTonic: idx === startNote.letterIndex,
        isWhiteKeyEnharmonic: note.isWhiteKeyEnharmonic,
        whiteKeyEnharmonicName: note.whiteKeyEnharmonicName,
      });
    }
    return steps;
  }

  function buildAscendingThenDescending(startNote, octave, octaveSpan) {
    const asc = buildAscending(startNote, octave, octaveSpan);
    const desc = buildDescending(startNote, octave + octaveSpan, octaveSpan);
    return asc.concat(desc.slice(1));
  }

  const pitchClassLabels = Object.fromEntries(notes.map((n) => [n.pitchClass, n.letter]));

  return { notes, buildAscending, buildDescending, buildAscendingThenDescending, pitchClassLabels };
})();

// ----------------------------------------------------------------- Major scale

const MajorScaleService = (() => {
  // Ionian (major scale) semitone steps from the root: degree 0 = root,
  // degree 7 = octave.
  const STEP_SEMITONES = [0, 2, 4, 5, 7, 9, 11, 12];
  const DEGREE_NAMES = ['1 (root)', '2', '3', '4', '5', '6', '7', '8 (octave)'];
  const STEP_SOLFA = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Ti', 'Do'];
  const SHARP_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  const keys = [
    { semitoneFromC: 0, name: 'C' },
    { semitoneFromC: 1, name: 'C#' },
    { semitoneFromC: 2, name: 'D' },
    { semitoneFromC: 3, name: 'D#' },
    { semitoneFromC: 4, name: 'E' },
    { semitoneFromC: 5, name: 'F' },
    { semitoneFromC: 6, name: 'F#' },
    { semitoneFromC: 7, name: 'G' },
    { semitoneFromC: 8, name: 'G#' },
    { semitoneFromC: 9, name: 'A' },
    { semitoneFromC: 10, name: 'A#' },
    { semitoneFromC: 11, name: 'B' },
  ].map((k) => ({
    ...k,
    fileSlug: k.name.replace('#', 's'), // matches midi/major-scale-<slug>.mid
    midiNoteForOctave(octave) { return 12 * (octave + 1) + k.semitoneFromC; },
  }));

  function noteNameFor(absSemitoneFromC) {
    const idx = ((absSemitoneFromC % 12) + 12) % 12;
    return SHARP_NAMES[idx];
  }

  function buildAscending(key, octave) {
    const tonicMidi = key.midiNoteForOctave(octave);
    return STEP_SEMITONES.map((semitone, degree) => ({
      midiNote: tonicMidi + semitone,
      noteName: noteNameFor(key.semitoneFromC + semitone),
      degreeName: DEGREE_NAMES[degree],
      solfa: STEP_SOLFA[degree],
      isTonic: degree === 0 || degree === 7,
    }));
  }

  function buildDescending(key, octave) {
    return buildAscending(key, octave).slice().reverse();
  }

  function buildAscendingThenDescending(key, octave) {
    const asc = buildAscending(key, octave);
    const desc = buildDescending(key, octave);
    return asc.concat(desc.slice(1));
  }

  // Movable-do solfa for the 7 major-scale degrees (Ti is the leading tone;
  // the octave maps back to "Do"). Keyed by semitone distance from the root.
  const SOLFA_BY_DEGREE = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Ti'];
  const SEMITONE_TO_DEGREE_INDEX = { 0: 0, 2: 1, 4: 2, 5: 3, 7: 4, 9: 5, 11: 6 };

  function solfaForSemitoneFromRoot(semitoneFromRoot) {
    const pc = ((semitoneFromRoot % 12) + 12) % 12;
    const idx = SEMITONE_TO_DEGREE_INDEX[pc];
    return idx === undefined ? null : SOLFA_BY_DEGREE[idx];
  }

  return { keys, buildAscending, buildDescending, buildAscendingThenDescending, solfaForSemitoneFromRoot };
})();

// ---------------------------------------------------------------- Dorian scale

const DorianScaleService = (() => {
  // Dorian mode semitone steps from the root: degree 0 = root, degree 7 =
  // octave. Same as the natural minor scale but with a raised (natural) 6th
  // degree, which is the characteristic note of the Dorian sound.
  const STEP_SEMITONES = [0, 2, 3, 5, 7, 9, 10, 12];
  const DEGREE_NAMES = ['1 (root)', '2', '3', '4', '5', '6', '7', '8 (octave)'];
  const STEP_SOLFA = ['Do', 'Re', 'Me', 'Fa', 'Sol', 'La', 'Te', 'Do'];
  const SHARP_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  const keys = [
    { semitoneFromC: 0, name: 'C' },
    { semitoneFromC: 1, name: 'C#' },
    { semitoneFromC: 2, name: 'D' },
    { semitoneFromC: 3, name: 'D#' },
    { semitoneFromC: 4, name: 'E' },
    { semitoneFromC: 5, name: 'F' },
    { semitoneFromC: 6, name: 'F#' },
    { semitoneFromC: 7, name: 'G' },
    { semitoneFromC: 8, name: 'G#' },
    { semitoneFromC: 9, name: 'A' },
    { semitoneFromC: 10, name: 'A#' },
    { semitoneFromC: 11, name: 'B' },
  ].map((k) => ({
    ...k,
    fileSlug: k.name.replace('#', 's'), // matches midi/dorian-scale-<slug>.mid
    midiNoteForOctave(octave) { return 12 * (octave + 1) + k.semitoneFromC; },
  }));

  function noteNameFor(absSemitoneFromC) {
    const idx = ((absSemitoneFromC % 12) + 12) % 12;
    return SHARP_NAMES[idx];
  }

  function buildAscending(key, octave) {
    const tonicMidi = key.midiNoteForOctave(octave);
    return STEP_SEMITONES.map((semitone, degree) => ({
      midiNote: tonicMidi + semitone,
      noteName: noteNameFor(key.semitoneFromC + semitone),
      degreeName: DEGREE_NAMES[degree],
      solfa: STEP_SOLFA[degree],
      isTonic: degree === 0 || degree === 7,
    }));
  }

  function buildDescending(key, octave) {
    return buildAscending(key, octave).slice().reverse();
  }

  function buildAscendingThenDescending(key, octave) {
    const asc = buildAscending(key, octave);
    const desc = buildDescending(key, octave);
    return asc.concat(desc.slice(1));
  }

  // Movable-do solfa for the 7 Dorian-scale degrees (natural minor solfa,
  // but "La" instead of "Le" for the raised 6th). Keyed by semitone distance
  // from the root.
  const SOLFA_BY_DEGREE = ['Do', 'Re', 'Me', 'Fa', 'Sol', 'La', 'Te'];
  const SEMITONE_TO_DEGREE_INDEX = { 0: 0, 2: 1, 3: 2, 5: 3, 7: 4, 9: 5, 10: 6 };

  function solfaForSemitoneFromRoot(semitoneFromRoot) {
    const pc = ((semitoneFromRoot % 12) + 12) % 12;
    const idx = SEMITONE_TO_DEGREE_INDEX[pc];
    return idx === undefined ? null : SOLFA_BY_DEGREE[idx];
  }

  return { keys, buildAscending, buildDescending, buildAscendingThenDescending, solfaForSemitoneFromRoot };
})();

// -------------------------------------------------------------- Phrygian scale

const PhrygianScaleService = (() => {
  // Phrygian mode semitone steps from the root: degree 0 = root, degree 7 =
  // octave. Same as the natural minor scale but with a lowered (flat) 2nd
  // degree, which is the characteristic note of the Phrygian sound.
  const STEP_SEMITONES = [0, 1, 3, 5, 7, 8, 10, 12];
  const DEGREE_NAMES = ['1 (root)', 'b2', 'b3', '4', '5', 'b6', 'b7', '8 (octave)'];
  const STEP_SOLFA = ['Do', 'Ra', 'Me', 'Fa', 'Sol', 'Le', 'Te', 'Do'];
  const SHARP_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  const keys = [
    { semitoneFromC: 0, name: 'C' },
    { semitoneFromC: 1, name: 'C#' },
    { semitoneFromC: 2, name: 'D' },
    { semitoneFromC: 3, name: 'D#' },
    { semitoneFromC: 4, name: 'E' },
    { semitoneFromC: 5, name: 'F' },
    { semitoneFromC: 6, name: 'F#' },
    { semitoneFromC: 7, name: 'G' },
    { semitoneFromC: 8, name: 'G#' },
    { semitoneFromC: 9, name: 'A' },
    { semitoneFromC: 10, name: 'A#' },
    { semitoneFromC: 11, name: 'B' },
  ].map((k) => ({
    ...k,
    fileSlug: k.name.replace('#', 's'), // matches midi/phrygian-scale-<slug>.mid
    midiNoteForOctave(octave) { return 12 * (octave + 1) + k.semitoneFromC; },
  }));

  function noteNameFor(absSemitoneFromC) {
    const idx = ((absSemitoneFromC % 12) + 12) % 12;
    return SHARP_NAMES[idx];
  }

  function buildAscending(key, octave) {
    const tonicMidi = key.midiNoteForOctave(octave);
    return STEP_SEMITONES.map((semitone, degree) => ({
      midiNote: tonicMidi + semitone,
      noteName: noteNameFor(key.semitoneFromC + semitone),
      degreeName: DEGREE_NAMES[degree],
      solfa: STEP_SOLFA[degree],
      isTonic: degree === 0 || degree === 7,
    }));
  }

  function buildDescending(key, octave) {
    return buildAscending(key, octave).slice().reverse();
  }

  function buildAscendingThenDescending(key, octave) {
    const asc = buildAscending(key, octave);
    const desc = buildDescending(key, octave);
    return asc.concat(desc.slice(1));
  }

  // Movable-do solfa for the 7 Phrygian-scale degrees (natural minor solfa,
  // but "Ra" instead of "Re" for the lowered 2nd). Keyed by semitone distance
  // from the root.
  const SOLFA_BY_DEGREE = ['Do', 'Ra', 'Me', 'Fa', 'Sol', 'Le', 'Te'];
  const SEMITONE_TO_DEGREE_INDEX = { 0: 0, 1: 1, 3: 2, 5: 3, 7: 4, 8: 5, 10: 6 };

  function solfaForSemitoneFromRoot(semitoneFromRoot) {
    const pc = ((semitoneFromRoot % 12) + 12) % 12;
    const idx = SEMITONE_TO_DEGREE_INDEX[pc];
    return idx === undefined ? null : SOLFA_BY_DEGREE[idx];
  }

  return { keys, buildAscending, buildDescending, buildAscendingThenDescending, solfaForSemitoneFromRoot };
})();

// ------------------------------------------------------------- Chromatic/solfa

const ChromaticScaleService = (() => {
  const ASCENDING_SOLFA = ['Do', 'Di', 'Re', 'Ri', 'Mi', 'Fa', 'Fi', 'Sol', 'Si', 'La', 'Li', 'Ti'];
  const DESCENDING_SOLFA = ['Do', 'Ra', 'Re', 'Me', 'Mi', 'Fa', 'Se', 'Sol', 'Le', 'La', 'Te', 'Ti'];
  const SHARP_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  const keys = [
    { semitoneFromC: 0, primaryName: 'C', enharmonicName: 'B#' },
    { semitoneFromC: 1, primaryName: 'C#', enharmonicName: 'Db' },
    { semitoneFromC: 2, primaryName: 'D', enharmonicName: '' },
    { semitoneFromC: 3, primaryName: 'D#', enharmonicName: 'Eb' },
    { semitoneFromC: 4, primaryName: 'E', enharmonicName: 'Fb' },
    { semitoneFromC: 5, primaryName: 'F', enharmonicName: 'E#' },
    { semitoneFromC: 6, primaryName: 'F#', enharmonicName: 'Gb' },
    { semitoneFromC: 7, primaryName: 'G', enharmonicName: '' },
    { semitoneFromC: 8, primaryName: 'G#', enharmonicName: 'Ab' },
    { semitoneFromC: 9, primaryName: 'A', enharmonicName: '' },
    { semitoneFromC: 10, primaryName: 'A#', enharmonicName: 'Bb' },
    { semitoneFromC: 11, primaryName: 'B', enharmonicName: 'Cb' },
  ].map((k) => ({
    ...k,
    displayName: k.enharmonicName ? `${k.primaryName} (${k.enharmonicName})` : k.primaryName,
    midiNoteForOctave(octave) { return 12 * (octave + 1) + k.semitoneFromC; },
  }));

  function noteNameFor(absSemitoneFromC) {
    const idx = ((absSemitoneFromC % 12) + 12) % 12;
    return SHARP_NAMES[idx];
  }

  function buildAscending(key, octave) {
    const tonicMidi = key.midiNoteForOctave(octave);
    const steps = [];
    for (let i = 0; i <= 12; i++) {
      const semitone = i % 12;
      steps.push({
        midiNote: tonicMidi + i,
        noteName: noteNameFor(key.semitoneFromC + i),
        solfa: ASCENDING_SOLFA[semitone],
        semitoneFromTonic: semitone,
        isTonic: semitone === 0,
      });
    }
    return steps;
  }

  function buildDescending(key, octave) {
    const tonicMidi = key.midiNoteForOctave(octave);
    const steps = [];
    for (let i = 0; i <= 12; i++) {
      const semitone = (12 - i) % 12;
      steps.push({
        midiNote: tonicMidi + 12 - i,
        noteName: noteNameFor(key.semitoneFromC + 12 - i),
        solfa: DESCENDING_SOLFA[semitone],
        semitoneFromTonic: semitone,
        isTonic: semitone === 0,
      });
    }
    return steps;
  }

  function buildAscendingThenDescending(key, octave) {
    const asc = buildAscending(key, octave);
    const desc = buildDescending(key, octave);
    return asc.concat(desc.slice(1));
  }

  return { keys, buildAscending, buildDescending, buildAscendingThenDescending };
})();

// ------------------------------------------------------------- Major chords

const MajorChordService = (() => {
  // A major triad is built by stacking two intervals on top of a root:
  //   root -> +4 semitones -> major 3rd
  //   major 3rd -> +3 semitones (root +7 total) -> perfect 5th
  // So every major triad, in any of the 12 keys, is just the pitch-class
  // pattern [0, 4, 7] measured in semitones from its root.
  const INTERVALS_FROM_ROOT = [0, 4, 7];
  const CHORD_TONE_LABELS = ['Root', 'Major 3rd', 'Perfect 5th'];
  const CHORD_TONE_EXPLANATIONS = [
    'The starting note — this note names the chord.',
    'Count 4 semitones up from the root.',
    'Count 3 more semitones up from the 3rd (7 semitones from the root).',
  ];

  const SHARP_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const FLAT_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

  // The 12 keys in simple chromatic order (used by the Learn tab and by the
  // key picker on the Chord Progression tab).
  const keys = SHARP_NAMES.map((name, semitoneFromC) => ({
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
  const circleOfFourths = CIRCLE_OF_FOURTHS_SEMITONES.map((semitoneFromC, position) => {
    const key = keys[semitoneFromC];
    const isEnharmonicLink = semitoneFromC === 6; // Gb / F#
    return {
      position: position + 1,
      semitoneFromC,
      name: isEnharmonicLink ? `${FLAT_NAMES[6]} (${SHARP_NAMES[6]})` : key.flatName,
      key,
    };
  });

  function noteNameFor(absSemitoneFromC, preferFlats) {
    const idx = ((absSemitoneFromC % 12) + 12) % 12;
    return preferFlats ? FLAT_NAMES[idx] : SHARP_NAMES[idx];
  }

  /** Builds a major triad (root, 3rd, 5th) for `key` starting at `octave`. */
  function buildTriad(key, octave, preferFlats) {
    const rootMidi = key.midiNoteForOctave(octave);
    return INTERVALS_FROM_ROOT.map((semitone, i) => ({
      role: CHORD_TONE_LABELS[i],
      explanation: CHORD_TONE_EXPLANATIONS[i],
      semitoneFromRoot: semitone,
      midiNote: rootMidi + semitone,
      noteName: noteNameFor(key.semitoneFromC + semitone, preferFlats),
    }));
  }

  function triadMidiNotes(key, octave) {
    return INTERVALS_FROM_ROOT.map((semitone) => key.midiNoteForOctave(octave) + semitone);
  }

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

  return {
    keys,
    circleOfFourths,
    progression,
    intervalsFromRoot: INTERVALS_FROM_ROOT,
    chordToneLabels: CHORD_TONE_LABELS,
    noteNameFor,
    buildTriad,
    triadMidiNotes,
    buildProgression,
  };
})();

const MinorChordService = (() => {
  // A minor triad is built by stacking two intervals on top of a root:
  //   root -> +3 semitones -> minor 3rd
  //   minor 3rd -> +4 semitones (root +7 total) -> perfect 5th
  // So every minor triad, in any of the 12 keys, is just the pitch-class
  // pattern [0, 3, 7] measured in semitones from its root -- the same total
  // span as a major triad (7 semitones, root to 5th), but with the 3rd
  // pulled down a semitone, which is what gives it its minor color.
  const INTERVALS_FROM_ROOT = [0, 3, 7];
  const CHORD_TONE_LABELS = ['Root', 'Minor 3rd', 'Perfect 5th'];
  const CHORD_TONE_EXPLANATIONS = [
    'The starting note -- this note names the chord.',
    'Count 3 semitones up from the root.',
    'Count 4 more semitones up from the 3rd (7 semitones from the root).',
  ];

  const SHARP_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const FLAT_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

  // The 12 keys in simple chromatic order (used by the Learn tab and by the
  // key picker on the Chord Progression tab).
  const keys = SHARP_NAMES.map((name, semitoneFromC) => ({
    semitoneFromC,
    name,
    flatName: FLAT_NAMES[semitoneFromC],
    midiNoteForOctave(octave) { return 12 * (octave + 1) + semitoneFromC; },
  }));

  // The circle of fourths: starting on C, each next key is a perfect 4th
  // (5 semitones) higher than the last. Same order as the major-chord
  // lesson -- the circle of fourths is a property of the 12 pitch classes,
  // not of chord quality, so it applies equally well to minor chords.
  const CIRCLE_OF_FOURTHS_SEMITONES = [0, 5, 10, 3, 8, 1, 6, 11, 4, 9, 2, 7];
  const circleOfFourths = CIRCLE_OF_FOURTHS_SEMITONES.map((semitoneFromC, position) => {
    const key = keys[semitoneFromC];
    const isEnharmonicLink = semitoneFromC === 6; // Gb / F#
    return {
      position: position + 1,
      semitoneFromC,
      name: isEnharmonicLink ? `${FLAT_NAMES[6]} (${SHARP_NAMES[6]})` : key.flatName,
      key,
    };
  });

  function noteNameFor(absSemitoneFromC, preferFlats) {
    const idx = ((absSemitoneFromC % 12) + 12) % 12;
    return preferFlats ? FLAT_NAMES[idx] : SHARP_NAMES[idx];
  }

  /** Builds a minor triad (root, 3rd, 5th) for `key` starting at `octave`. */
  function buildTriad(key, octave, preferFlats) {
    const rootMidi = key.midiNoteForOctave(octave);
    return INTERVALS_FROM_ROOT.map((semitone, i) => ({
      role: CHORD_TONE_LABELS[i],
      explanation: CHORD_TONE_EXPLANATIONS[i],
      semitoneFromRoot: semitone,
      midiNote: rootMidi + semitone,
      noteName: noteNameFor(key.semitoneFromC + semitone, preferFlats),
    }));
  }

  function triadMidiNotes(key, octave) {
    return INTERVALS_FROM_ROOT.map((semitone) => key.midiNoteForOctave(octave) + semitone);
  }

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

  return {
    keys,
    circleOfFourths,
    progression,
    intervalsFromRoot: INTERVALS_FROM_ROOT,
    chordToneLabels: CHORD_TONE_LABELS,
    noteNameFor,
    buildTriad,
    triadMidiNotes,
    buildProgression,
  };
})();

const DiminishedChordService = (() => {
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
  const INTERVALS_FROM_ROOT = [0, 3, 6];
  const CHORD_TONE_LABELS = ['Root', 'Minor 3rd', 'Diminished 5th'];
  const CHORD_TONE_EXPLANATIONS = [
    'The starting note -- this note names the chord.',
    'Count 3 semitones up from the root.',
    'Count 3 more semitones up from the 3rd (6 semitones from the root).',
  ];

  const SHARP_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const FLAT_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

  // The 12 keys in simple chromatic order (used by the Learn tab and by the
  // key picker on the Chord Progression tab).
  const keys = SHARP_NAMES.map((name, semitoneFromC) => ({
    semitoneFromC,
    name,
    flatName: FLAT_NAMES[semitoneFromC],
    midiNoteForOctave(octave) { return 12 * (octave + 1) + semitoneFromC; },
  }));

  // The circle of fourths: starting on C, each next key is a perfect 4th
  // (5 semitones) higher than the last. Same order as the major-, minor-,
  // and augmented-chord lessons -- the circle of fourths is a property of
  // the 12 pitch classes, not of chord quality, so it applies equally well
  // to diminished chords.
  const CIRCLE_OF_FOURTHS_SEMITONES = [0, 5, 10, 3, 8, 1, 6, 11, 4, 9, 2, 7];
  const circleOfFourths = CIRCLE_OF_FOURTHS_SEMITONES.map((semitoneFromC, position) => {
    const key = keys[semitoneFromC];
    const isEnharmonicLink = semitoneFromC === 6; // Gb / F#
    return {
      position: position + 1,
      semitoneFromC,
      name: isEnharmonicLink ? `${FLAT_NAMES[6]} (${SHARP_NAMES[6]})` : key.flatName,
      key,
    };
  });

  function noteNameFor(absSemitoneFromC, preferFlats) {
    const idx = ((absSemitoneFromC % 12) + 12) % 12;
    return preferFlats ? FLAT_NAMES[idx] : SHARP_NAMES[idx];
  }

  /** Builds a diminished triad (root, 3rd, diminished 5th) for `key` at `octave`. */
  function buildTriad(key, octave, preferFlats) {
    const rootMidi = key.midiNoteForOctave(octave);
    return INTERVALS_FROM_ROOT.map((semitone, i) => ({
      role: CHORD_TONE_LABELS[i],
      explanation: CHORD_TONE_EXPLANATIONS[i],
      semitoneFromRoot: semitone,
      midiNote: rootMidi + semitone,
      noteName: noteNameFor(key.semitoneFromC + semitone, preferFlats),
    }));
  }

  function triadMidiNotes(key, octave) {
    return INTERVALS_FROM_ROOT.map((semitone) => key.midiNoteForOctave(octave) + semitone);
  }

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

  return {
    keys,
    circleOfFourths,
    progression,
    intervalsFromRoot: INTERVALS_FROM_ROOT,
    chordToneLabels: CHORD_TONE_LABELS,
    noteNameFor,
    buildTriad,
    triadMidiNotes,
    buildProgression,
  };
})();

const AugmentedChordService = (() => {
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
  const INTERVALS_FROM_ROOT = [0, 4, 8];
  const CHORD_TONE_LABELS = ['Root', 'Major 3rd', 'Augmented 5th'];
  const CHORD_TONE_EXPLANATIONS = [
    'The starting note -- this note names the chord.',
    'Count 4 semitones up from the root.',
    'Count 4 more semitones up from the 3rd (8 semitones from the root).',
  ];

  const SHARP_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const FLAT_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

  // The 12 keys in simple chromatic order (used by the Learn tab and by the
  // key picker on the Chord Progression tab).
  const keys = SHARP_NAMES.map((name, semitoneFromC) => ({
    semitoneFromC,
    name,
    flatName: FLAT_NAMES[semitoneFromC],
    midiNoteForOctave(octave) { return 12 * (octave + 1) + semitoneFromC; },
  }));

  // The circle of fourths: starting on C, each next key is a perfect 4th
  // (5 semitones) higher than the last. Same order as the major- and
  // minor-chord lessons -- the circle of fourths is a property of the 12
  // pitch classes, not of chord quality, so it applies equally well to
  // augmented chords.
  const CIRCLE_OF_FOURTHS_SEMITONES = [0, 5, 10, 3, 8, 1, 6, 11, 4, 9, 2, 7];
  const circleOfFourths = CIRCLE_OF_FOURTHS_SEMITONES.map((semitoneFromC, position) => {
    const key = keys[semitoneFromC];
    const isEnharmonicLink = semitoneFromC === 6; // Gb / F#
    return {
      position: position + 1,
      semitoneFromC,
      name: isEnharmonicLink ? `${FLAT_NAMES[6]} (${SHARP_NAMES[6]})` : key.flatName,
      key,
    };
  });

  function noteNameFor(absSemitoneFromC, preferFlats) {
    const idx = ((absSemitoneFromC % 12) + 12) % 12;
    return preferFlats ? FLAT_NAMES[idx] : SHARP_NAMES[idx];
  }

  /** Builds an augmented triad (root, 3rd, augmented 5th) for `key` at `octave`. */
  function buildTriad(key, octave, preferFlats) {
    const rootMidi = key.midiNoteForOctave(octave);
    return INTERVALS_FROM_ROOT.map((semitone, i) => ({
      role: CHORD_TONE_LABELS[i],
      explanation: CHORD_TONE_EXPLANATIONS[i],
      semitoneFromRoot: semitone,
      midiNote: rootMidi + semitone,
      noteName: noteNameFor(key.semitoneFromC + semitone, preferFlats),
    }));
  }

  function triadMidiNotes(key, octave) {
    return INTERVALS_FROM_ROOT.map((semitone) => key.midiNoteForOctave(octave) + semitone);
  }

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

  return {
    keys,
    circleOfFourths,
    progression,
    intervalsFromRoot: INTERVALS_FROM_ROOT,
    chordToneLabels: CHORD_TONE_LABELS,
    noteNameFor,
    buildTriad,
    triadMidiNotes,
    buildProgression,
  };
})();

const DominantSeventhChordService = (() => {
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
  const INTERVALS_FROM_ROOT = [0, 4, 7, 10];
  const CHORD_TONE_LABELS = ['Root', 'Major 3rd', 'Perfect 5th', 'Minor 7th'];
  const CHORD_TONE_EXPLANATIONS = [
    'The starting note — this note names the chord.',
    'Count 4 semitones up from the root.',
    'Count 3 more semitones up from the 3rd (7 semitones from the root).',
    'Count 3 more semitones up from the 5th (10 semitones from the root) — a minor 7th above the root, not a major 7th.',
  ];

  const SHARP_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const FLAT_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

  const keys = SHARP_NAMES.map((name, semitoneFromC) => ({
    semitoneFromC,
    name,
    flatName: FLAT_NAMES[semitoneFromC],
    midiNoteForOctave(octave) { return 12 * (octave + 1) + semitoneFromC; },
  }));

  const CIRCLE_OF_FOURTHS_SEMITONES = [0, 5, 10, 3, 8, 1, 6, 11, 4, 9, 2, 7];
  const circleOfFourths = CIRCLE_OF_FOURTHS_SEMITONES.map((semitoneFromC, position) => {
    const key = keys[semitoneFromC];
    const isEnharmonicLink = semitoneFromC === 6; // Gb / F#
    return {
      position: position + 1,
      semitoneFromC,
      name: isEnharmonicLink ? `${FLAT_NAMES[6]} (${SHARP_NAMES[6]})` : key.flatName,
      key,
    };
  });

  function noteNameFor(absSemitoneFromC, preferFlats) {
    const idx = ((absSemitoneFromC % 12) + 12) % 12;
    return preferFlats ? FLAT_NAMES[idx] : SHARP_NAMES[idx];
  }

  /** Builds a dominant 7th chord (root, 3rd, 5th, minor 7th) for `key` at `octave`. */
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

  return {
    keys,
    circleOfFourths,
    progression,
    intervalsFromRoot: INTERVALS_FROM_ROOT,
    chordToneLabels: CHORD_TONE_LABELS,
    noteNameFor,
    buildChord,
    chordMidiNotes,
    buildProgression,
  };
})();

const DiminishedSeventhChordService = (() => {
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
  const INTERVALS_FROM_ROOT = [0, 3, 6, 9];
  const CHORD_TONE_LABELS = ['Root', 'Minor 3rd', 'Diminished 5th', 'Diminished 7th'];
  const CHORD_TONE_EXPLANATIONS = [
    'The starting note — this note names the chord.',
    'Count 3 semitones up from the root.',
    'Count 3 more semitones up from the 3rd (6 semitones from the root).',
    'Count 3 more semitones up from the 5th (9 semitones from the root) — a diminished 7th, one semitone below a minor 7th.',
  ];

  const SHARP_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const FLAT_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

  const keys = SHARP_NAMES.map((name, semitoneFromC) => ({
    semitoneFromC,
    name,
    flatName: FLAT_NAMES[semitoneFromC],
    midiNoteForOctave(octave) { return 12 * (octave + 1) + semitoneFromC; },
  }));

  const CIRCLE_OF_FOURTHS_SEMITONES = [0, 5, 10, 3, 8, 1, 6, 11, 4, 9, 2, 7];
  const circleOfFourths = CIRCLE_OF_FOURTHS_SEMITONES.map((semitoneFromC, position) => {
    const key = keys[semitoneFromC];
    const isEnharmonicLink = semitoneFromC === 6; // Gb / F#
    return {
      position: position + 1,
      semitoneFromC,
      name: isEnharmonicLink ? `${FLAT_NAMES[6]} (${SHARP_NAMES[6]})` : key.flatName,
      key,
    };
  });

  function noteNameFor(absSemitoneFromC, preferFlats) {
    const idx = ((absSemitoneFromC % 12) + 12) % 12;
    return preferFlats ? FLAT_NAMES[idx] : SHARP_NAMES[idx];
  }

  /** Builds a fully-diminished 7th chord (root, m3rd, dim5th, dim7th) for `key` at `octave`. */
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

  return {
    keys,
    circleOfFourths,
    progression,
    intervalsFromRoot: INTERVALS_FROM_ROOT,
    chordToneLabels: CHORD_TONE_LABELS,
    noteNameFor,
    buildChord,
    chordMidiNotes,
    buildProgression,
  };
})();

const MinorSeventhChordService = (() => {
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
  const INTERVALS_FROM_ROOT = [0, 3, 7, 10];
  const CHORD_TONE_LABELS = ['Root', 'Minor 3rd', 'Perfect 5th', 'Minor 7th'];
  const CHORD_TONE_EXPLANATIONS = [
    'The starting note — this note names the chord.',
    'Count 3 semitones up from the root.',
    'Count 4 more semitones up from the 3rd (7 semitones from the root).',
    'Count 3 more semitones up from the 5th (10 semitones from the root) — a minor 7th above the root.',
  ];

  const SHARP_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const FLAT_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

  const keys = SHARP_NAMES.map((name, semitoneFromC) => ({
    semitoneFromC,
    name,
    flatName: FLAT_NAMES[semitoneFromC],
    midiNoteForOctave(octave) { return 12 * (octave + 1) + semitoneFromC; },
  }));

  const CIRCLE_OF_FOURTHS_SEMITONES = [0, 5, 10, 3, 8, 1, 6, 11, 4, 9, 2, 7];
  const circleOfFourths = CIRCLE_OF_FOURTHS_SEMITONES.map((semitoneFromC, position) => {
    const key = keys[semitoneFromC];
    const isEnharmonicLink = semitoneFromC === 6; // Gb / F#
    return {
      position: position + 1,
      semitoneFromC,
      name: isEnharmonicLink ? `${FLAT_NAMES[6]} (${SHARP_NAMES[6]})` : key.flatName,
      key,
    };
  });

  function noteNameFor(absSemitoneFromC, preferFlats) {
    const idx = ((absSemitoneFromC % 12) + 12) % 12;
    return preferFlats ? FLAT_NAMES[idx] : SHARP_NAMES[idx];
  }

  /** Builds a minor 7th chord (root, m3rd, 5th, minor 7th) for `key` at `octave`. */
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

  return {
    keys,
    circleOfFourths,
    progression,
    intervalsFromRoot: INTERVALS_FROM_ROOT,
    chordToneLabels: CHORD_TONE_LABELS,
    noteNameFor,
    buildChord,
    chordMidiNotes,
    buildProgression,
  };
})();

const MajorSeventhChordService = (() => {
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
  const INTERVALS_FROM_ROOT = [0, 4, 7, 11];
  const CHORD_TONE_LABELS = ['Root', 'Major 3rd', 'Perfect 5th', 'Major 7th'];
  const CHORD_TONE_EXPLANATIONS = [
    'The starting note — this note names the chord.',
    'Count 4 semitones up from the root.',
    'Count 3 more semitones up from the 3rd (7 semitones from the root).',
    'Count 4 more semitones up from the 5th (11 semitones from the root) — a major 7th, just one semitone below the octave.',
  ];

  const SHARP_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const FLAT_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

  const keys = SHARP_NAMES.map((name, semitoneFromC) => ({
    semitoneFromC,
    name,
    flatName: FLAT_NAMES[semitoneFromC],
    midiNoteForOctave(octave) { return 12 * (octave + 1) + semitoneFromC; },
  }));

  const CIRCLE_OF_FOURTHS_SEMITONES = [0, 5, 10, 3, 8, 1, 6, 11, 4, 9, 2, 7];
  const circleOfFourths = CIRCLE_OF_FOURTHS_SEMITONES.map((semitoneFromC, position) => {
    const key = keys[semitoneFromC];
    const isEnharmonicLink = semitoneFromC === 6; // Gb / F#
    return {
      position: position + 1,
      semitoneFromC,
      name: isEnharmonicLink ? `${FLAT_NAMES[6]} (${SHARP_NAMES[6]})` : key.flatName,
      key,
    };
  });

  function noteNameFor(absSemitoneFromC, preferFlats) {
    const idx = ((absSemitoneFromC % 12) + 12) % 12;
    return preferFlats ? FLAT_NAMES[idx] : SHARP_NAMES[idx];
  }

  /** Builds a major 7th chord (root, 3rd, 5th, major 7th) for `key` at `octave`. */
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

  return {
    keys,
    circleOfFourths,
    progression,
    intervalsFromRoot: INTERVALS_FROM_ROOT,
    chordToneLabels: CHORD_TONE_LABELS,
    noteNameFor,
    buildChord,
    chordMidiNotes,
    buildProgression,
  };
})();

const HalfDiminishedSeventhChordService = (() => {
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
  const INTERVALS_FROM_ROOT = [0, 3, 6, 10];
  const CHORD_TONE_LABELS = ['Root', 'Minor 3rd', 'Diminished 5th', 'Minor 7th'];
  const CHORD_TONE_EXPLANATIONS = [
    'The starting note — this note names the chord.',
    'Count 3 semitones up from the root.',
    'Count 3 more semitones up from the 3rd (6 semitones from the root).',
    'Count 4 more semitones up from the 5th (10 semitones from the root) — a minor 7th, not a diminished 7th.',
  ];

  const SHARP_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const FLAT_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

  const keys = SHARP_NAMES.map((name, semitoneFromC) => ({
    semitoneFromC,
    name,
    flatName: FLAT_NAMES[semitoneFromC],
    midiNoteForOctave(octave) { return 12 * (octave + 1) + semitoneFromC; },
  }));

  const CIRCLE_OF_FOURTHS_SEMITONES = [0, 5, 10, 3, 8, 1, 6, 11, 4, 9, 2, 7];
  const circleOfFourths = CIRCLE_OF_FOURTHS_SEMITONES.map((semitoneFromC, position) => {
    const key = keys[semitoneFromC];
    const isEnharmonicLink = semitoneFromC === 6; // Gb / F#
    return {
      position: position + 1,
      semitoneFromC,
      name: isEnharmonicLink ? `${FLAT_NAMES[6]} (${SHARP_NAMES[6]})` : key.flatName,
      key,
    };
  });

  function noteNameFor(absSemitoneFromC, preferFlats) {
    const idx = ((absSemitoneFromC % 12) + 12) % 12;
    return preferFlats ? FLAT_NAMES[idx] : SHARP_NAMES[idx];
  }

  /** Builds a half-diminished 7th chord (root, m3rd, dim5th, minor 7th) for `key` at `octave`. */
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

  return {
    keys,
    circleOfFourths,
    progression,
    intervalsFromRoot: INTERVALS_FROM_ROOT,
    chordToneLabels: CHORD_TONE_LABELS,
    noteNameFor,
    buildChord,
    chordMidiNotes,
    buildProgression,
  };
})();

const SixthChordService = (() => {
  // A (major) 6th chord is a major triad with one more note stacked on
  // top -- a major 6th above the root, not a 7th at all:
  //   root -> +4 semitones -> major 3rd
  //   major 3rd -> +3 more semitones (root +7 total) -> perfect 5th
  //   perfect 5th -> +2 more semitones (root +9 total) -> major 6th
  // So every 6th chord, in any of the 12 keys, is just the pitch-class
  // pattern [0, 4, 7, 9] measured in semitones from its root -- an
  // ordinary major triad (0, 4, 7) plus a major 6th on top. Unlike the
  // 7th chords taught in Lessons 13-17, a 6th chord never resolves
  // anywhere -- it's a stable, "at rest" color, which is exactly why
  // jazz and gospel pianists so often use it as the very last chord of a
  // tune (I6) instead of a plain triad or a major 7th.
  const INTERVALS_FROM_ROOT = [0, 4, 7, 9];
  const CHORD_TONE_LABELS = ['Root', 'Major 3rd', 'Perfect 5th', 'Major 6th'];
  const CHORD_TONE_EXPLANATIONS = [
    'The starting note — this note names the chord.',
    'Count 4 semitones up from the root.',
    'Count 3 more semitones up from the 3rd (7 semitones from the root).',
    'Count 2 more semitones up from the 5th (9 semitones from the root) — a major 6th, not a 7th of any kind.',
  ];

  const SHARP_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const FLAT_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

  const keys = SHARP_NAMES.map((name, semitoneFromC) => ({
    semitoneFromC,
    name,
    flatName: FLAT_NAMES[semitoneFromC],
    midiNoteForOctave(octave) { return 12 * (octave + 1) + semitoneFromC; },
  }));

  const CIRCLE_OF_FOURTHS_SEMITONES = [0, 5, 10, 3, 8, 1, 6, 11, 4, 9, 2, 7];
  const circleOfFourths = CIRCLE_OF_FOURTHS_SEMITONES.map((semitoneFromC, position) => {
    const key = keys[semitoneFromC];
    const isEnharmonicLink = semitoneFromC === 6; // Gb / F#
    return {
      position: position + 1,
      semitoneFromC,
      name: isEnharmonicLink ? `${FLAT_NAMES[6]} (${SHARP_NAMES[6]})` : key.flatName,
      key,
    };
  });

  function noteNameFor(absSemitoneFromC, preferFlats) {
    const idx = ((absSemitoneFromC % 12) + 12) % 12;
    return preferFlats ? FLAT_NAMES[idx] : SHARP_NAMES[idx];
  }

  /** Builds a 6th chord (root, 3rd, 5th, 6th) for `key` at `octave`. */
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

  return {
    keys,
    circleOfFourths,
    intervalsFromRoot: INTERVALS_FROM_ROOT,
    chordToneLabels: CHORD_TONE_LABELS,
    noteNameFor,
    buildChord,
    chordMidiNotes,
  };
})();

const MinorSixthChordService = (() => {
  // A minor 6th chord is a minor triad with a *major* 6th (not a minor
  // one) stacked on top:
  //   root -> +3 semitones -> minor 3rd
  //   minor 3rd -> +4 more semitones (root +7 total) -> perfect 5th
  //   perfect 5th -> +2 more semitones (root +9 total) -> major 6th
  // So every minor 6th chord, in any of the 12 keys, is the pitch-class
  // pattern [0, 3, 7, 9] measured in semitones from its root -- a minor
  // triad (0, 3, 7) plus a major 6th on top. That major 6th is what gives
  // this chord its distinctive bittersweet color, and it's no accident:
  // a minor 6th chord shares every pitch class with a half-diminished
  // 7th chord (Lesson 17) built on its 6th degree -- Cm6 (C-E♭-G-A) is
  // exactly the same four notes as Am7♭5 (A-C-E♭-G), just named and
  // voiced from a different root.
  const INTERVALS_FROM_ROOT = [0, 3, 7, 9];
  const CHORD_TONE_LABELS = ['Root', 'Minor 3rd', 'Perfect 5th', 'Major 6th'];
  const CHORD_TONE_EXPLANATIONS = [
    'The starting note — this note names the chord.',
    'Count 3 semitones up from the root.',
    'Count 4 more semitones up from the 3rd (7 semitones from the root).',
    'Count 2 more semitones up from the 5th (9 semitones from the root) — a major 6th, even though the chord is minor.',
  ];

  const SHARP_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const FLAT_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

  const keys = SHARP_NAMES.map((name, semitoneFromC) => ({
    semitoneFromC,
    name,
    flatName: FLAT_NAMES[semitoneFromC],
    midiNoteForOctave(octave) { return 12 * (octave + 1) + semitoneFromC; },
  }));

  const CIRCLE_OF_FOURTHS_SEMITONES = [0, 5, 10, 3, 8, 1, 6, 11, 4, 9, 2, 7];
  const circleOfFourths = CIRCLE_OF_FOURTHS_SEMITONES.map((semitoneFromC, position) => {
    const key = keys[semitoneFromC];
    const isEnharmonicLink = semitoneFromC === 6; // Gb / F#
    return {
      position: position + 1,
      semitoneFromC,
      name: isEnharmonicLink ? `${FLAT_NAMES[6]} (${SHARP_NAMES[6]})` : key.flatName,
      key,
    };
  });

  function noteNameFor(absSemitoneFromC, preferFlats) {
    const idx = ((absSemitoneFromC % 12) + 12) % 12;
    return preferFlats ? FLAT_NAMES[idx] : SHARP_NAMES[idx];
  }

  /** Builds a minor 6th chord (root, ♭3rd, 5th, 6th) for `key` at `octave`. */
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

  return {
    keys,
    circleOfFourths,
    intervalsFromRoot: INTERVALS_FROM_ROOT,
    chordToneLabels: CHORD_TONE_LABELS,
    noteNameFor,
    buildChord,
    chordMidiNotes,
  };
})();

const AugmentedSeventhChordService = (() => {
  // An augmented 7th chord — also called a dominant 7♯5, C7♯5, C+7, C7+,
  // augmented dominant seventh, or dominant seventh augmented — is a
  // dominant 7th chord with its 5th raised a semitone:
  //   root -> +4 semitones -> major 3rd
  //   major 3rd -> +4 more semitones (root +8 total) -> augmented 5th
  //   augmented 5th -> +2 more semitones (root +10 total) -> minor 7th
  // So every augmented 7th chord, in any of the 12 keys, is just the
  // pitch-class pattern [0, 4, 8, 10] measured in semitones from its root
  // -- an augmented triad (0, 4, 8) plus a minor 7th on top, the same
  // minor 7th a plain dominant 7th chord uses. Raising the 5th pulls it
  // outward instead of leaving it perfect, giving this "altered dominant"
  // extra tension and an even stronger pull to its tonic than a plain
  // dominant 7th -- which is exactly why jazz and gospel players reach
  // for it as a spicier substitute for V7 wherever a dominant chord
  // resolves down a 5th (or up a 4th) to its tonic.
  const INTERVALS_FROM_ROOT = [0, 4, 8, 10];
  const CHORD_TONE_LABELS = ['Root', 'Major 3rd', 'Augmented 5th', 'Minor 7th'];
  const CHORD_TONE_EXPLANATIONS = [
    'The starting note — this note names the chord.',
    'Count 4 semitones up from the root.',
    'Count 4 more semitones up from the 3rd (8 semitones from the root) — a raised (augmented) 5th, a semitone higher than a perfect 5th.',
    'Count 2 more semitones up from the 5th (10 semitones from the root) — a minor 7th, the same 7th a plain dominant 7th chord uses.',
  ];

  const SHARP_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const FLAT_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

  const keys = SHARP_NAMES.map((name, semitoneFromC) => ({
    semitoneFromC,
    name,
    flatName: FLAT_NAMES[semitoneFromC],
    midiNoteForOctave(octave) { return 12 * (octave + 1) + semitoneFromC; },
  }));

  const CIRCLE_OF_FOURTHS_SEMITONES = [0, 5, 10, 3, 8, 1, 6, 11, 4, 9, 2, 7];
  const circleOfFourths = CIRCLE_OF_FOURTHS_SEMITONES.map((semitoneFromC, position) => {
    const key = keys[semitoneFromC];
    const isEnharmonicLink = semitoneFromC === 6; // Gb / F#
    return {
      position: position + 1,
      semitoneFromC,
      name: isEnharmonicLink ? `${FLAT_NAMES[6]} (${SHARP_NAMES[6]})` : key.flatName,
      key,
    };
  });

  function noteNameFor(absSemitoneFromC, preferFlats) {
    const idx = ((absSemitoneFromC % 12) + 12) % 12;
    return preferFlats ? FLAT_NAMES[idx] : SHARP_NAMES[idx];
  }

  /** Builds an augmented 7th chord (root, 3rd, ♯5th, minor 7th) for `key` at `octave`. */
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

  return {
    keys,
    circleOfFourths,
    intervalsFromRoot: INTERVALS_FROM_ROOT,
    chordToneLabels: CHORD_TONE_LABELS,
    noteNameFor,
    buildChord,
    chordMidiNotes,
  };
})();

const MajorSeventhFlatFiveChordService = (() => {
  // A major 7th flat 5 chord — written maj7♭5 (also seen as M7♭5 or
  // Δ7♭5) — is a major 7th chord with its 5th lowered a semitone:
  //   root -> +4 semitones -> major 3rd
  //   major 3rd -> +2 more semitones (root +6 total) -> diminished 5th
  //   diminished 5th -> +5 more semitones (root +11 total) -> major 7th
  // So every maj7♭5 chord, in any of the 12 keys, is just the
  // pitch-class pattern [0, 4, 6, 11] measured in semitones from its
  // root -- an ordinary major 3rd and major 7th (the same two intervals
  // a plain major 7th chord uses) wrapped around a lowered, diminished
  // 5th instead of a perfect one. That lowered 5th is what gives the
  // chord its unsettled, "floating" color -- it never quite sits still
  // the way a plain major 7th does -- which is exactly why jazz and
  // gospel pianists reach for it as a chromatic passing chord or a
  // spicier substitute wherever a major 7th chord would otherwise sit.
  const INTERVALS_FROM_ROOT = [0, 4, 6, 11];
  const CHORD_TONE_LABELS = ['Root', 'Major 3rd', 'Diminished 5th', 'Major 7th'];
  const CHORD_TONE_EXPLANATIONS = [
    'The starting note — this note names the chord.',
    'Count 4 semitones up from the root.',
    'Count 2 more semitones up from the 3rd (6 semitones from the root) — a lowered (diminished) 5th, a semitone below a perfect 5th.',
    'Count 5 more semitones up from the 5th (11 semitones from the root) — the same major 7th a plain major 7th chord uses.',
  ];

  const SHARP_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const FLAT_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

  const keys = SHARP_NAMES.map((name, semitoneFromC) => ({
    semitoneFromC,
    name,
    flatName: FLAT_NAMES[semitoneFromC],
    midiNoteForOctave(octave) { return 12 * (octave + 1) + semitoneFromC; },
  }));

  const CIRCLE_OF_FOURTHS_SEMITONES = [0, 5, 10, 3, 8, 1, 6, 11, 4, 9, 2, 7];
  const circleOfFourths = CIRCLE_OF_FOURTHS_SEMITONES.map((semitoneFromC, position) => {
    const key = keys[semitoneFromC];
    const isEnharmonicLink = semitoneFromC === 6; // Gb / F#
    return {
      position: position + 1,
      semitoneFromC,
      name: isEnharmonicLink ? `${FLAT_NAMES[6]} (${SHARP_NAMES[6]})` : key.flatName,
      key,
    };
  });

  function noteNameFor(absSemitoneFromC, preferFlats) {
    const idx = ((absSemitoneFromC % 12) + 12) % 12;
    return preferFlats ? FLAT_NAMES[idx] : SHARP_NAMES[idx];
  }

  /** Builds a major 7th flat 5 chord (root, 3rd, ♭5th, major 7th) for `key` at `octave`. */
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

  return {
    keys,
    circleOfFourths,
    intervalsFromRoot: INTERVALS_FROM_ROOT,
    chordToneLabels: CHORD_TONE_LABELS,
    noteNameFor,
    buildChord,
    chordMidiNotes,
  };
})();

const MajorSeventhSharpElevenChordService = (() => {
  // A major 7th sharp 11 chord — written maj7\u266f11 (also seen as
  // M7\u266f11 or \u03947\u266f11) — is a plain major 7th chord with one
  // more note stacked on top: a raised (augmented) 11th, an octave and a
  // tritone above the root:
  //   root -> +4 semitones -> major 3rd
  //   major 3rd -> +3 more semitones (root +7 total) -> perfect 5th
  //   perfect 5th -> +4 more semitones (root +11 total) -> major 7th
  //   major 7th -> +7 more semitones (root +18 total) -> sharp 11th
  // So every maj7\u266f11 chord, in any of the 12 keys, is just the
  // pitch-class pattern [0, 4, 7, 11, 18] measured in semitones from its
  // root -- an ordinary major 7th chord (0, 4, 7, 11) plus a raised 11th
  // stacked on top, one octave and a tritone above the root. A *plain*
  // (unraised) 11th would sit just one semitone above the major 3rd,
  // clashing hard against it -- which is why the 11th is almost always
  // either left out of a major 7th chord or raised a semitone, as it is
  // here. That raised 11th removes the clash entirely and instead adds a
  // bright, shimmering lift, the same "Lydian" color a major scale's own
  // 4th degree gets when it's the root of its own chord (an IVmaj7 chord
  // extended with the notes already sitting in its parent major scale
  // naturally produces a sharp, not a plain, 11th) -- which is exactly why
  // jazz and gospel pianists reach for a maj7\u266f11 wherever a major 7th
  // chord would otherwise sit, especially on the subdominant (IV) degree.
  const INTERVALS_FROM_ROOT = [0, 4, 7, 11, 18];
  const CHORD_TONE_LABELS = ['Root', 'Major 3rd', 'Perfect 5th', 'Major 7th', 'Sharp 11th'];
  const CHORD_TONE_EXPLANATIONS = [
    'The starting note — this note names the chord.',
    'Count 4 semitones up from the root.',
    'Count 3 more semitones up from the 3rd (7 semitones from the root).',
    'Count 4 more semitones up from the 5th (11 semitones from the root) — the same major 7th a plain major 7th chord uses.',
    'Count 7 more semitones up from the 7th (18 semitones from the root — an octave plus a tritone) — a raised (augmented) 11th, one semitone higher than a plain 11th would be.',
  ];

  const SHARP_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const FLAT_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

  const keys = SHARP_NAMES.map((name, semitoneFromC) => ({
    semitoneFromC,
    name,
    flatName: FLAT_NAMES[semitoneFromC],
    midiNoteForOctave(octave) { return 12 * (octave + 1) + semitoneFromC; },
  }));

  const CIRCLE_OF_FOURTHS_SEMITONES = [0, 5, 10, 3, 8, 1, 6, 11, 4, 9, 2, 7];
  const circleOfFourths = CIRCLE_OF_FOURTHS_SEMITONES.map((semitoneFromC, position) => {
    const key = keys[semitoneFromC];
    const isEnharmonicLink = semitoneFromC === 6; // Gb / F#
    return {
      position: position + 1,
      semitoneFromC,
      name: isEnharmonicLink ? `${FLAT_NAMES[6]} (${SHARP_NAMES[6]})` : key.flatName,
      key,
    };
  });

  function noteNameFor(absSemitoneFromC, preferFlats) {
    const idx = ((absSemitoneFromC % 12) + 12) % 12;
    return preferFlats ? FLAT_NAMES[idx] : SHARP_NAMES[idx];
  }

  /** Builds a major 7th sharp 11 chord (root, 3rd, 5th, 7th, ♯11th) for `key` at `octave`. */
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

  return {
    keys,
    circleOfFourths,
    intervalsFromRoot: INTERVALS_FROM_ROOT,
    chordToneLabels: CHORD_TONE_LABELS,
    noteNameFor,
    buildChord,
    chordMidiNotes,
  };
})();

const Add9ChordService = (() => {
  // An add9 chord — written add9 (e.g. Cadd9) — is a plain major triad
  // with one more note stacked on top: a 9th, an octave and a major 2nd
  // above the root, and crucially *no 7th of any kind* in between:
  //   root -> +4 semitones -> major 3rd
  //   major 3rd -> +3 more semitones (root +7 total) -> perfect 5th
  //   perfect 5th -> +7 more semitones (root +14 total) -> 9th
  // So every add9 chord, in any of the 12 keys, is just the pitch-class
  // pattern [0, 4, 7, 14] measured in semitones from its root -- an
  // ordinary major triad (0, 4, 7) plus a 9th stacked an octave and a
  // major 2nd above the root. That 9th is the very same pitch class as
  // the major 2nd degree, just moved up an octave so it sits above the
  // 5th instead of clashing right next to the root -- which is exactly
  // why it can be "added" to a plain triad without any of the tension a
  // 7th would bring. Because there's no 7th at all, an add9 chord never
  // pulls toward another chord the way a dominant 7th or major 7th does;
  // it's a bright, wide-open, "at rest" color, which is exactly why jazz,
  // pop, and gospel pianists reach for it as a shimmering substitute for
  // a plain triad wherever a tonic or subdominant chord would otherwise
  // sit. Watch out for one mix-up: an add9 chord is not the same thing as
  // a 9th chord (which stacks a 9th on top of a full dominant or major
  // 7th chord) or a sus2 chord (which replaces the 3rd with a 2nd instead
  // of adding a 9th above an intact triad).
  const INTERVALS_FROM_ROOT = [0, 4, 7, 14];
  const CHORD_TONE_LABELS = ['Root', 'Major 3rd', 'Perfect 5th', '9th'];
  const CHORD_TONE_EXPLANATIONS = [
    'The starting note — this note names the chord.',
    'Count 4 semitones up from the root.',
    'Count 3 more semitones up from the 3rd (7 semitones from the root).',
    'Count 7 more semitones up from the 5th (14 semitones from the root — an octave plus a major 2nd) — the 9th, added on top of the intact triad with no 7th of any kind in between.',
  ];

  const SHARP_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const FLAT_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

  const keys = SHARP_NAMES.map((name, semitoneFromC) => ({
    semitoneFromC,
    name,
    flatName: FLAT_NAMES[semitoneFromC],
    midiNoteForOctave(octave) { return 12 * (octave + 1) + semitoneFromC; },
  }));

  const CIRCLE_OF_FOURTHS_SEMITONES = [0, 5, 10, 3, 8, 1, 6, 11, 4, 9, 2, 7];
  const circleOfFourths = CIRCLE_OF_FOURTHS_SEMITONES.map((semitoneFromC, position) => {
    const key = keys[semitoneFromC];
    const isEnharmonicLink = semitoneFromC === 6; // Gb / F#
    return {
      position: position + 1,
      semitoneFromC,
      name: isEnharmonicLink ? `${FLAT_NAMES[6]} (${SHARP_NAMES[6]})` : key.flatName,
      key,
    };
  });

  function noteNameFor(absSemitoneFromC, preferFlats) {
    const idx = ((absSemitoneFromC % 12) + 12) % 12;
    return preferFlats ? FLAT_NAMES[idx] : SHARP_NAMES[idx];
  }

  /** Builds an add9 chord (root, 3rd, 5th, 9th) for `key` at `octave`. */
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

  return {
    keys,
    circleOfFourths,
    intervalsFromRoot: INTERVALS_FROM_ROOT,
    chordToneLabels: CHORD_TONE_LABELS,
    noteNameFor,
    buildChord,
    chordMidiNotes,
  };
})();

const SusTwoChordService = (() => {
  // A sus2 chord (e.g. Csus2) replaces a triad's 3rd with a major 2nd,
  //   leaving the chord neither major nor minor -- an open, unresolved
  //   color with no 3rd to color it either way:
  //     root -> +2 semitones -> major 2nd (replacing the 3rd)
  //     major 2nd -> +5 more semitones (root +7 total) -> perfect 5th
  //   So every sus2 chord, in any of the 12 keys, is the pitch-class
  //   pattern [0, 2, 7] -- a wide-open fifth with a 2nd sitting where a
  //   3rd would normally go. Because it has no 3rd, a sus2 chord doesn't
  //   resolve toward anything the way a dominant chord does; pianists
  //   reach for it as a suspended, ambiguous color, often as a passing
  //   step on the way into or out of a plain triad.
  const INTERVALS_FROM_ROOT = [0, 2, 7];
  const CHORD_TONE_LABELS = ['Root', 'Major 2nd', 'Perfect 5th'];
  const CHORD_TONE_EXPLANATIONS = [
    'The starting note — this note names the chord.',
    'Count 2 semitones up from the root — this replaces the 3rd entirely, so the chord is neither major nor minor.',
    'Count 5 more semitones up from the 2nd (7 semitones from the root) — the perfect 5th.',
  ];

  const SHARP_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const FLAT_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

  const keys = SHARP_NAMES.map((name, semitoneFromC) => ({
    semitoneFromC,
    name,
    flatName: FLAT_NAMES[semitoneFromC],
    midiNoteForOctave(octave) { return 12 * (octave + 1) + semitoneFromC; },
  }));

  const CIRCLE_OF_FOURTHS_SEMITONES = [0, 5, 10, 3, 8, 1, 6, 11, 4, 9, 2, 7];
  const circleOfFourths = CIRCLE_OF_FOURTHS_SEMITONES.map((semitoneFromC, position) => {
    const key = keys[semitoneFromC];
    const isEnharmonicLink = semitoneFromC === 6; // Gb / F#
    return {
      position: position + 1,
      semitoneFromC,
      name: isEnharmonicLink ? `${FLAT_NAMES[6]} (${SHARP_NAMES[6]})` : key.flatName,
      key,
    };
  });

  function noteNameFor(absSemitoneFromC, preferFlats) {
    const idx = ((absSemitoneFromC % 12) + 12) % 12;
    return preferFlats ? FLAT_NAMES[idx] : SHARP_NAMES[idx];
  }

  /** Builds a sus2 chord (root, 2nd, 5th) for `key` at `octave`. */
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

  return {
    keys,
    circleOfFourths,
    intervalsFromRoot: INTERVALS_FROM_ROOT,
    chordToneLabels: CHORD_TONE_LABELS,
    noteNameFor,
    buildChord,
    chordMidiNotes,
  };
})();


const SusFourChordService = (() => {
  // A sus4 chord (e.g. Csus4) replaces a triad's 3rd with a perfect 4th,
  //   the mirror image of a sus2 chord:
  //     root -> +5 semitones -> perfect 4th (replacing the 3rd)
  //     perfect 4th -> +2 more semitones (root +7 total) -> perfect 5th
  //   So every sus4 chord, in any of the 12 keys, is the pitch-class
  //   pattern [0, 5, 7]. The 4th sits a half step above where the major
  //   3rd would be, creating a taut, "leaning" tension that classically
  //   resolves down a step into the 3rd of a plain triad (sus4 -> triad),
  //   a staple move in gospel, rock, and pop vamps and cadences.
  const INTERVALS_FROM_ROOT = [0, 5, 7];
  const CHORD_TONE_LABELS = ['Root', 'Perfect 4th', 'Perfect 5th'];
  const CHORD_TONE_EXPLANATIONS = [
    'The starting note — this note names the chord.',
    'Count 5 semitones up from the root — this replaces the 3rd entirely, so the chord is neither major nor minor.',
    'Count 2 more semitones up from the 4th (7 semitones from the root) — the perfect 5th.',
  ];

  const SHARP_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const FLAT_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

  const keys = SHARP_NAMES.map((name, semitoneFromC) => ({
    semitoneFromC,
    name,
    flatName: FLAT_NAMES[semitoneFromC],
    midiNoteForOctave(octave) { return 12 * (octave + 1) + semitoneFromC; },
  }));

  const CIRCLE_OF_FOURTHS_SEMITONES = [0, 5, 10, 3, 8, 1, 6, 11, 4, 9, 2, 7];
  const circleOfFourths = CIRCLE_OF_FOURTHS_SEMITONES.map((semitoneFromC, position) => {
    const key = keys[semitoneFromC];
    const isEnharmonicLink = semitoneFromC === 6; // Gb / F#
    return {
      position: position + 1,
      semitoneFromC,
      name: isEnharmonicLink ? `${FLAT_NAMES[6]} (${SHARP_NAMES[6]})` : key.flatName,
      key,
    };
  });

  function noteNameFor(absSemitoneFromC, preferFlats) {
    const idx = ((absSemitoneFromC % 12) + 12) % 12;
    return preferFlats ? FLAT_NAMES[idx] : SHARP_NAMES[idx];
  }

  /** Builds a sus4 chord (root, 4th, 5th) for `key` at `octave`. */
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

  return {
    keys,
    circleOfFourths,
    intervalsFromRoot: INTERVALS_FROM_ROOT,
    chordToneLabels: CHORD_TONE_LABELS,
    noteNameFor,
    buildChord,
    chordMidiNotes,
  };
})();


const DominantSeventhSusFourChordService = (() => {
  // A dominant 7sus4 chord (e.g. C7sus4) is a sus4 chord with a minor 7th
  //   stacked on top -- the suspended cousin of an ordinary dominant 7th:
  //     root -> +5 semitones -> perfect 4th (replacing the 3rd)
  //     perfect 4th -> +2 more semitones (root +7 total) -> perfect 5th
  //     perfect 5th -> +3 more semitones (root +10 total) -> minor 7th
  //   So every 7sus4 chord, in any of the 12 keys, is the pitch-class
  //   pattern [0, 5, 7, 10]. Gospel and jazz pianists lean on 7sus4 as a
  //   softer stand-in for V7 -- it still carries the pull of a dominant
  //   7th, but the suspended 4th removes the sharp major-3rd edge, so it
  //   often lingers for a full bar before resolving down into V7 itself.
  const INTERVALS_FROM_ROOT = [0, 5, 7, 10];
  const CHORD_TONE_LABELS = ['Root', 'Perfect 4th', 'Perfect 5th', 'Minor 7th'];
  const CHORD_TONE_EXPLANATIONS = [
    'The starting note — this note names the chord.',
    'Count 5 semitones up from the root — this replaces the 3rd entirely, so the chord is neither major nor minor.',
    'Count 2 more semitones up from the 4th (7 semitones from the root) — the perfect 5th.',
    'Count 3 more semitones up from the 5th (10 semitones from the root) — the minor 7th, the same 7th a plain dominant 7th chord uses.',
  ];

  const SHARP_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const FLAT_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

  const keys = SHARP_NAMES.map((name, semitoneFromC) => ({
    semitoneFromC,
    name,
    flatName: FLAT_NAMES[semitoneFromC],
    midiNoteForOctave(octave) { return 12 * (octave + 1) + semitoneFromC; },
  }));

  const CIRCLE_OF_FOURTHS_SEMITONES = [0, 5, 10, 3, 8, 1, 6, 11, 4, 9, 2, 7];
  const circleOfFourths = CIRCLE_OF_FOURTHS_SEMITONES.map((semitoneFromC, position) => {
    const key = keys[semitoneFromC];
    const isEnharmonicLink = semitoneFromC === 6; // Gb / F#
    return {
      position: position + 1,
      semitoneFromC,
      name: isEnharmonicLink ? `${FLAT_NAMES[6]} (${SHARP_NAMES[6]})` : key.flatName,
      key,
    };
  });

  function noteNameFor(absSemitoneFromC, preferFlats) {
    const idx = ((absSemitoneFromC % 12) + 12) % 12;
    return preferFlats ? FLAT_NAMES[idx] : SHARP_NAMES[idx];
  }

  /** Builds a dominant 7sus4 chord (root, 4th, 5th, ♭7th) for `key` at `octave`. */
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

  return {
    keys,
    circleOfFourths,
    intervalsFromRoot: INTERVALS_FROM_ROOT,
    chordToneLabels: CHORD_TONE_LABELS,
    noteNameFor,
    buildChord,
    chordMidiNotes,
  };
})();


const SixNineChordService = (() => {
  // A 6/9 chord (e.g. C6/9, sometimes written C6add9) stacks both a 6th
  //   and a 9th on top of a plain major triad -- no 7th of any kind:
  //     root -> +4 semitones -> major 3rd
  //     major 3rd -> +3 more semitones (root +7 total) -> perfect 5th
  //     perfect 5th -> +2 more semitones (root +9 total) -> major 6th
  //     major 6th -> +5 more semitones (root +14 total) -> 9th
  //   So every 6/9 chord, in any of the 12 keys, is the pitch-class
  //   pattern [0, 4, 7, 9, 14] -- the same 6th chord taught in Lesson 20
  //   with a 9th added on top. Like a plain 6th or add9 chord, a 6/9
  //   chord has no 7th at all, so it never pulls toward a resolution --
  //   it's an even richer, fuller "at rest" color than a 6th alone,
  //   and a favorite last chord for jazz and gospel tunes.
  const INTERVALS_FROM_ROOT = [0, 4, 7, 9, 14];
  const CHORD_TONE_LABELS = ['Root', 'Major 3rd', 'Perfect 5th', 'Major 6th', '9th'];
  const CHORD_TONE_EXPLANATIONS = [
    'The starting note — this note names the chord.',
    'Count 4 semitones up from the root.',
    'Count 3 more semitones up from the 3rd (7 semitones from the root).',
    'Count 2 more semitones up from the 5th (9 semitones from the root) — the same major 6th a plain 6th chord uses.',
    'Count 5 more semitones up from the 6th (14 semitones from the root — an octave plus a major 2nd) — the 9th, stacked on top with no 7th of any kind in between.',
  ];

  const SHARP_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const FLAT_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

  const keys = SHARP_NAMES.map((name, semitoneFromC) => ({
    semitoneFromC,
    name,
    flatName: FLAT_NAMES[semitoneFromC],
    midiNoteForOctave(octave) { return 12 * (octave + 1) + semitoneFromC; },
  }));

  const CIRCLE_OF_FOURTHS_SEMITONES = [0, 5, 10, 3, 8, 1, 6, 11, 4, 9, 2, 7];
  const circleOfFourths = CIRCLE_OF_FOURTHS_SEMITONES.map((semitoneFromC, position) => {
    const key = keys[semitoneFromC];
    const isEnharmonicLink = semitoneFromC === 6; // Gb / F#
    return {
      position: position + 1,
      semitoneFromC,
      name: isEnharmonicLink ? `${FLAT_NAMES[6]} (${SHARP_NAMES[6]})` : key.flatName,
      key,
    };
  });

  function noteNameFor(absSemitoneFromC, preferFlats) {
    const idx = ((absSemitoneFromC % 12) + 12) % 12;
    return preferFlats ? FLAT_NAMES[idx] : SHARP_NAMES[idx];
  }

  /** Builds a 6/9 chord (root, 3rd, 5th, 6th, 9th) for `key` at `octave`. */
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

  return {
    keys,
    circleOfFourths,
    intervalsFromRoot: INTERVALS_FROM_ROOT,
    chordToneLabels: CHORD_TONE_LABELS,
    noteNameFor,
    buildChord,
    chordMidiNotes,
  };
})();


// ------------------------------------------------------------ Inversions

const InversionService = (() => {
  // An inversion re-orders a chord's existing notes so that a tone other
  // than the root sits at the bottom (in the bass), by moving one or more
  // of the chord's lowest notes up an octave. The pitch classes never
  // change -- a C major triad is still just C, E, and G no matter which
  // one is on the bottom -- only *which* tone is lowest changes, which is
  // why an inversion is still named after (and functions as) the same
  // chord. This service works generically for every chord quality this
  // app teaches: 3-note triads (major, minor, augmented, diminished) get
  // root position + 2 inversions, and 4-note seventh chords (dominant 7th,
  // diminished 7th, minor 7th, major 7th, half-diminished 7th) get root
  // position + 3 inversions.

  const SHARP_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const FLAT_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

  const keys = SHARP_NAMES.map((name, semitoneFromC) => ({
    semitoneFromC,
    name,
    flatName: FLAT_NAMES[semitoneFromC],
    midiNoteForOctave(octave) { return 12 * (octave + 1) + semitoneFromC; },
  }));

  function noteNameFor(absSemitoneFromC, preferFlats) {
    const idx = ((absSemitoneFromC % 12) + 12) % 12;
    return preferFlats ? FLAT_NAMES[idx] : SHARP_NAMES[idx];
  }

  // Every chord quality this app has taught so far, as a pitch-class
  // pattern measured in semitones from the root -- exactly the same
  // interval sets used in the Major/Minor/Augmented/Diminished Chord and
  // Dominant/Diminished/Minor/Major/Half-Diminished 7th Chord lessons.
  const QUALITIES = {
    major:            { suffix: 'major',                      displayName: 'Major triad',              intervals: [0, 4, 7],     labels: ['Root', 'Major 3rd', 'Perfect 5th'] },
    minor:            { suffix: 'minor',                      displayName: 'Minor triad',               intervals: [0, 3, 7],     labels: ['Root', 'Minor 3rd', 'Perfect 5th'] },
    augmented:        { suffix: 'augmented',                  displayName: 'Augmented triad',           intervals: [0, 4, 8],     labels: ['Root', 'Major 3rd', 'Augmented 5th'] },
    diminished:       { suffix: 'diminished',                 displayName: 'Diminished triad',          intervals: [0, 3, 6],     labels: ['Root', 'Minor 3rd', 'Diminished 5th'] },
    sixth:            { suffix: '6',                          displayName: '6th chord',                 intervals: [0, 4, 7, 9],  labels: ['Root', 'Major 3rd', 'Perfect 5th', 'Major 6th'] },
    minorSixth:       { suffix: 'minor 6th',                  displayName: 'Minor 6th chord',           intervals: [0, 3, 7, 9],  labels: ['Root', 'Minor 3rd', 'Perfect 5th', 'Major 6th'] },
    dominant7:        { suffix: 'dominant 7th',                displayName: 'Dominant 7th chord',        intervals: [0, 4, 7, 10], labels: ['Root', 'Major 3rd', 'Perfect 5th', 'Minor 7th'] },
    diminished7:      { suffix: 'diminished 7th',              displayName: 'Diminished 7th chord',      intervals: [0, 3, 6, 9],  labels: ['Root', 'Minor 3rd', 'Diminished 5th', 'Diminished 7th'] },
    minor7:           { suffix: 'minor 7th',                   displayName: 'Minor 7th chord',           intervals: [0, 3, 7, 10], labels: ['Root', 'Minor 3rd', 'Perfect 5th', 'Minor 7th'] },
    major7:           { suffix: 'major 7th',                   displayName: 'Major 7th chord',           intervals: [0, 4, 7, 11], labels: ['Root', 'Major 3rd', 'Perfect 5th', 'Major 7th'] },
    halfDiminished7:  { suffix: 'half-diminished 7th (m7\u266d5)', displayName: 'Half-diminished 7th chord', intervals: [0, 3, 6, 10], labels: ['Root', 'Minor 3rd', 'Diminished 5th', 'Minor 7th'] },
    augmentedSeventh: { suffix: 'augmented 7th (7\u266f5)',        displayName: 'Augmented 7th chord (7\u266f5)', intervals: [0, 4, 8, 10], labels: ['Root', 'Major 3rd', 'Augmented 5th', 'Minor 7th'] },
    majorSeventhFlatFive: { suffix: 'major 7th\u266d5 (maj7\u266d5)', displayName: 'Major 7th\u266d5 chord (maj7\u266d5)', intervals: [0, 4, 6, 11], labels: ['Root', 'Major 3rd', 'Diminished 5th', 'Major 7th'] },
    majorSeventhSharpEleven: { suffix: 'major 7th\u266f11 (maj7\u266f11)', displayName: 'Major 7th\u266f11 chord (maj7\u266f11)', intervals: [0, 4, 7, 11, 18], labels: ['Root', 'Major 3rd', 'Perfect 5th', 'Major 7th', 'Sharp 11th'] },
    add9:             { suffix: 'add9',                        displayName: 'Add9 chord',                 intervals: [0, 4, 7, 14], labels: ['Root', 'Major 3rd', 'Perfect 5th', '9th'] },
    susTwo:           { suffix: 'sus2',                        displayName: 'Sus2 chord',                 intervals: [0, 2, 7],     labels: ['Root', 'Major 2nd', 'Perfect 5th'] },
    susFour:          { suffix: 'sus4',                        displayName: 'Sus4 chord',                 intervals: [0, 5, 7],     labels: ['Root', 'Perfect 4th', 'Perfect 5th'] },
    dominantSeventhSusFour: { suffix: '7sus4',                 displayName: 'Dominant 7sus4 chord',       intervals: [0, 5, 7, 10], labels: ['Root', 'Perfect 4th', 'Perfect 5th', 'Minor 7th'] },
    sixNine:          { suffix: '6/9',                         displayName: '6/9 chord',                  intervals: [0, 4, 7, 9, 14], labels: ['Root', 'Major 3rd', 'Perfect 5th', 'Major 6th', '9th'] },
  };

  // Display order used by the "All chord types" reference tab -- triads
  // first (in the order they were taught, Lessons 8-11), then the 6th
  // chords (Lessons 20-21), then the five 7th chords (Lessons 13-17),
  // then the augmented 7th chord (Lesson 23), then the major 7th\u266d5
  // chord (Lesson 24), then the major 7th\u266f11 chord (Lesson 25), then
  // the add9 chord (Lesson 26).
  const QUALITY_ORDER = ['major', 'minor', 'augmented', 'diminished', 'sixth', 'minorSixth', 'dominant7', 'diminished7', 'minor7', 'major7', 'halfDiminished7', 'augmentedSeventh', 'majorSeventhFlatFive', 'majorSeventhSharpEleven', 'add9', 'susTwo', 'susFour', 'dominantSeventhSusFour', 'sixNine'];

  // Most chord types this app teaches have 3 or 4 notes (root position
  // plus 2 or 3 inversions). The major 7th\u266f11 chord (Lesson 25) is
  // the first 5-note chord -- it has a 4th inversion too (\u266f11th in
  // the bass), which the "All Chord Types" reference tab (Exercise 1)
  // enumerates automatically since it loops over each quality's own
  // interval count rather than a fixed number.
  const INVERSION_NAMES = ['Root position', '1st inversion', '2nd inversion', '3rd inversion', '4th inversion'];

  /** Builds a chord (root position) for `key` at `octave` in the given quality. */
  function buildChordTones(key, octave, qualityKey, preferFlats) {
    const quality = QUALITIES[qualityKey];
    const rootMidi = key.midiNoteForOctave(octave);
    return quality.intervals.map((semitone, i) => ({
      role: quality.labels[i],
      semitoneFromRoot: semitone,
      midiNote: rootMidi + semitone,
      noteName: noteNameFor(key.semitoneFromC + semitone, preferFlats),
    }));
  }

  /**
   * Inverts a root-position chord (as returned by buildChordTones) so that
   * the chord tone at `requestedInversion` (0 = root, 1 = the next tone up,
   * and so on) ends up lowest, in the bass. `requestedInversion` is capped
   * at tones.length - 1 (a triad only has a 1st and 2nd inversion; it has
   * no 3rd inversion, since it has no 7th to put in the bass).
   *
   * Rotates the chord tones so the requested tone comes first, then walks
   * the rest of the list bumping each one up by whole octaves until it
   * sits above the tone before it. A simple "shift the bottom N tones up
   * one octave" only works when every chord tone is within an octave of
   * its neighbor -- it silently breaks for extended chords whose top tone
   * sits *more* than an octave above the root (the 9th in an add9 chord,
   * 14 semitones up, or the \u266f11th in a maj7\u266f11 chord, 18 semitones
   * up): shifting the lower tones by a single octave isn't always enough
   * to lift them above a tone that was already voiced more than an octave
   * away, so the "wrong" tone would end up in the bass. Rotating first and
   * then normalizing each tone upward (by as many octaves as it actually
   * needs) guarantees the requested tone is always the one that lands in
   * the bass, for every chord quality this app teaches.
   */
  function invert(tones, requestedInversion) {
    const n = tones.length;
    const applied = Math.max(0, Math.min(requestedInversion, n - 1));
    const rotated = [];
    for (let i = 0; i < n; i++) rotated.push({ ...tones[(applied + i) % n] });
    for (let i = 1; i < rotated.length; i++) {
      while (rotated[i].midiNote <= rotated[i - 1].midiNote) rotated[i].midiNote += 12;
    }
    return { tones: rotated, appliedInversion: applied, bassRole: rotated[0].role, bassNoteName: rotated[0].noteName };
  }

  /** A short human label, e.g. "2nd inversion (G in the bass)". */
  function inversionLabel(appliedInversion, bassNoteName) {
    const name = INVERSION_NAMES[appliedInversion];
    return appliedInversion === 0 ? name : `${name} (${bassNoteName} in the bass)`;
  }

  // -------------------------------------------------------- progressions

  /**
   * Builds one progression's chords for `key` at `octave`, applying
   * `requestedInversion` to every chord (each chord caps it to its own
   * size -- a triad in a mostly-7th-chord progression simply maxes out at
   * its 2nd inversion). Works for both the jazz and gospel progression
   * lists below since they share the same { roman, name, semitoneFromKey,
   * quality } degree shape used throughout this file's other services.
   */
  function buildProgressionChords(progressionDef, key, octave, requestedInversion, preferFlats) {
    return progressionDef.degrees.map((degree) => {
      const degreeKey = {
        semitoneFromC: key.semitoneFromC + degree.semitoneFromKey,
        midiNoteForOctave(o) { return key.midiNoteForOctave(o) + degree.semitoneFromKey; },
      };
      const rootTones = buildChordTones(degreeKey, octave, degree.quality, preferFlats);
      const { tones, appliedInversion, bassNoteName } = invert(rootTones, requestedInversion);
      return {
        roman: degree.roman,
        name: degree.name,
        quality: degree.quality,
        qualityLabel: QUALITIES[degree.quality].displayName,
        chordName: `${rootTones[0].noteName} ${QUALITIES[degree.quality].suffix}`,
        inversionLabel: inversionLabel(appliedInversion, bassNoteName),
        appliedInversion,
        tones,
      };
    });
  }

  // Five jazz chord progressions, each drawing on the chord qualities
  // taught in this app's Chord lessons. Every one works, unchanged, in
  // all 12 keys, and every chord in every one of them can be played in
  // root position or any inversion it has.
  const JAZZ_PROGRESSIONS = [
    {
      id: 'major-ii-V-I',
      name: 'Major ii\u2013V\u2013I',
      label: 'ii7 \u2013 V7 \u2013 Imaj7',
      description: 'The single most common chord movement in jazz: a supertonic minor 7th (ii7) falls a 5th to a dominant 7th (V7), which falls another 5th to rest on the tonic major 7th (Imaj7). Almost every jazz standard contains at least one ii\u2013V\u2013I, in this key or another.',
      degrees: [
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
      ],
    },
    {
      id: 'turnaround-3-6-2-5',
      name: 'Turnaround (3\u20136\u20132\u20135)',
      label: 'iii7 \u2013 vi7 \u2013 ii7 \u2013 V7',
      description: 'A four-chord "turnaround" that walks the harmony back around to the top of the tune: iii7 falls a 5th to vi7, which falls a 5th to ii7, which falls a 5th to V7 -- three straight falling-5th moves, all built from minor 7th chords except the final dominant 7th.',
      degrees: [
        { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
        { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
    {
      id: 'passing-diminished',
      name: 'Passing Diminished',
      label: 'Imaj7 \u2013 \u266fIdim7 \u2013 ii7 \u2013 V7',
      description: 'A diminished 7th chord built on the raised tonic (\u266fIdim7) bridges the tonic major 7th to the ii7 chord with a smooth chromatic bass line (I \u2192 \u266fI \u2192 ii), a classic jazz voice-leading trick that reuses the diminished 7th chord as a passing chord rather than a destination.',
      degrees: [
        { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
        { roman: '\u266fIdim7', name: 'Raised-tonic diminished 7th', semitoneFromKey: 1, quality: 'diminished7' },
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
    {
      id: 'minor-ii-V-i',
      name: 'Minor ii\u2013V\u2013i',
      label: 'ii\u00f87 \u2013 V7 \u2013 i7',
      description: 'The minor-key cousin of the major ii\u2013V\u2013I: a half-diminished 7th on the supertonic (ii\u00f87 -- diatonic to the minor key, no borrowed notes) falls a 5th to a dominant 7th (V7), which resolves to the minor 7th tonic (i7). This is the harmonic engine behind countless minor-key jazz standards.',
      degrees: [
        { roman: 'ii\u00f87', name: 'Supertonic half-diminished 7th', semitoneFromKey: 2, quality: 'halfDiminished7' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        { roman: 'i7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'minor7' },
      ],
    },
    {
      id: 'jazz-blues-turnaround',
      name: 'Jazz Blues Turnaround',
      label: 'I7 \u2013 IV7 \u2013 ii7 \u2013 V7',
      description: 'A jazz-blues flavored turnaround built almost entirely from dominant 7th chords (I7 and IV7), with a ii7\u2013V7 tag at the end to pull the harmony back home -- the same "every chord wants to move" restlessness that gives the 12-bar blues its drive, compressed into four bars.',
      degrees: [
        { roman: 'I7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'dominant7' },
        { roman: 'IV7', name: 'Subdominant 7th', semitoneFromKey: 5, quality: 'dominant7' },
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
  ];

  // Five gospel chord progressions, drawing on the same chord qualities.
  // Gospel piano leans more on plain major/minor triads and dominant 7ths
  // than dense jazz voicings, plus the "borrowed" minor iv chord that
  // gives the classic plagal "Amen" cadence its bittersweet color.
  const GOSPEL_PROGRESSIONS = [
    {
      id: 'classic-gospel-turnaround',
      name: 'Classic Gospel Turnaround',
      label: 'I \u2013 vi \u2013 IV \u2013 V7',
      description: 'The quintessential gospel (and 1950s pop) progression: tonic (I), relative-minor (vi), subdominant (IV), and dominant 7th (V7) -- a warm, singable four-chord loop that has anchored gospel hymns and vamps for generations.',
      degrees: [
        { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
        { roman: 'IV', name: 'Subdominant', semitoneFromKey: 5, quality: 'major' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
    {
      id: 'amen-plagal-vamp',
      name: 'Amen Plagal Vamp',
      label: 'I \u2013 IV \u2013 iv \u2013 I',
      description: 'The "Amen cadence" (IV\u2013I, also called the plagal cadence) closes countless hymns; gospel players color it further by briefly borrowing the *minor* iv chord from the parallel minor key on the way back home (IV \u2192 iv \u2192 I), a bittersweet touch heard throughout gospel and soul.',
      degrees: [
        { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        { roman: 'IV', name: 'Subdominant', semitoneFromKey: 5, quality: 'major' },
        { roman: 'iv', name: 'Borrowed minor subdominant', semitoneFromKey: 5, quality: 'minor' },
        { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
      ],
    },
    {
      id: 'extended-gospel-turnaround',
      name: 'Extended Gospel Turnaround',
      label: 'iii7 \u2013 vi7 \u2013 ii7 \u2013 V7 \u2013 Imaj7',
      description: 'A five-chord "walk-back" turnaround popular in gospel vamps and shout choruses: three falling-5th minor 7ths (iii7\u2013vi7\u2013ii7) lead into a dominant 7th (V7) and land on a lush tonic major 7th (Imaj7), giving a simple hymn tag a jazzier, more churchy color.',
      degrees: [
        { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
        { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
      ],
    },
    {
      id: 'minor-gospel-cadence',
      name: 'Minor Gospel Cadence',
      label: 'i \u2013 iv \u2013 V7 \u2013 i',
      description: 'A minor-key gospel cadence built from the natural minor\'s tonic (i) and subdominant (iv) triads, with a raised-leading-tone dominant 7th (V7, borrowed from the harmonic minor scale) pulling firmly back home -- the same "sharpened V7 in a minor key" sound heard in many minor-key hymns and spirituals.',
      degrees: [
        { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
        { roman: 'iv', name: 'Subdominant', semitoneFromKey: 5, quality: 'minor' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
      ],
    },
    {
      id: 'secondary-dominant-turnaround',
      name: 'Secondary Dominant Turnaround',
      label: 'I \u2013 III7 \u2013 vi \u2013 V7',
      description: 'A gospel-flavored turnaround that "tonicizes" the vi chord for a bar: III7 is a dominant 7th chord built a major 3rd above the tonic (borrowing its raised note from outside the key) that resolves down a 5th into vi, exactly the way V7 resolves into I -- before V7 pulls the whole progression back to the tonic.',
      degrees: [
        { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        { roman: 'III7', name: 'Secondary dominant of vi', semitoneFromKey: 4, quality: 'dominant7' },
        { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
  ];

  // Five jazz chord progressions built around the (major) 6th chord --
  // used by the Sixth Chord Trainer lesson (Lesson 20). A 6th chord never
  // pulls anywhere the way a 7th chord does, so every one of these shows
  // it doing what it does best: sitting as a warm, "at rest" tonic color,
  // reached either straight away or after a turnaround.
  const SIXTH_JAZZ_PROGRESSIONS = [
    {
      id: 'six-turnaround-i-vi-ii-v',
      name: 'Tonic Six Turnaround',
      label: 'I6 \u2013 vi7 \u2013 ii7 \u2013 V7',
      description: 'The classic 1\u20136\u20132\u20135 turnaround, but with a 6th chord standing in for the tonic instead of a plain triad or a major 7th: I6 opens the phrase, then falls through vi7 and ii7 before V7 pulls the harmony back around to the top.',
      degrees: [
        { roman: 'I6', name: 'Tonic 6th', semitoneFromKey: 0, quality: 'sixth' },
        { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
    {
      id: 'six-on-i-and-iv',
      name: 'Six on the One and Four',
      label: 'I6 \u2013 IV6 \u2013 ii7 \u2013 V7',
      description: 'The 6th-chord color isn\u2019t just for the tonic \u2014 it works equally well on the subdominant. This progression puts a 6th chord on both I and IV, the same two degrees a classical I\u2013IV cadence uses, before ii7\u2013V7 brings the phrase home.',
      degrees: [
        { roman: 'I6', name: 'Tonic 6th', semitoneFromKey: 0, quality: 'sixth' },
        { roman: 'IV6', name: 'Subdominant 6th', semitoneFromKey: 5, quality: 'sixth' },
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
    {
      id: 'landing-on-the-six',
      name: 'Landing on the Six',
      label: 'iii7 \u2013 vi7 \u2013 ii7 \u2013 V7 \u2013 I6',
      description: 'A five-chord \u201cwalk-back\u201d turnaround \u2014 three falling-5th minor 7ths (iii7\u2013vi7\u2013ii7) and a dominant 7th (V7) \u2014 that resolves not onto a plain tonic triad but onto the richer-colored I6, a favorite way for a jazz standard to land its very last chord.',
      degrees: [
        { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
        { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        { roman: 'I6', name: 'Tonic 6th', semitoneFromKey: 0, quality: 'sixth' },
      ],
    },
    {
      id: 'passing-dim-to-six',
      name: 'Passing Diminished to the Six',
      label: 'I6 \u2013 \u266fIdim7 \u2013 ii7 \u2013 V7',
      description: 'The same chromatic passing-diminished voice-leading trick used elsewhere in this app (I \u2192 \u266fI \u2192 ii), except the phrase now starts from the warmer I6 tonic color rather than a plain triad or major 7th.',
      degrees: [
        { roman: 'I6', name: 'Tonic 6th', semitoneFromKey: 0, quality: 'sixth' },
        { roman: '\u266fIdim7', name: 'Raised-tonic diminished 7th', semitoneFromKey: 1, quality: 'diminished7' },
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
    {
      id: 'blues-to-six',
      name: 'Blues Turnaround to the Six',
      label: 'I7 \u2013 IV7 \u2013 I6 \u2013 V7',
      description: 'A bluesy turnaround where the restless tonic dominant 7th (I7) moves through the subdominant 7th (IV7) and then settles, if only briefly, into the tonic 6th\u2019s calmer color before V7 pushes the harmony onward.',
      degrees: [
        { roman: 'I7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'dominant7' },
        { roman: 'IV7', name: 'Subdominant 7th', semitoneFromKey: 5, quality: 'dominant7' },
        { roman: 'I6', name: 'Tonic 6th', semitoneFromKey: 0, quality: 'sixth' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
  ];

  // Five gospel chord progressions built around the (major) 6th chord.
  const SIXTH_GOSPEL_PROGRESSIONS = [
    {
      id: 'gospel-six-turnaround',
      name: 'Gospel Six Turnaround',
      label: 'I6 \u2013 vi \u2013 IV \u2013 V7',
      description: 'The quintessential gospel turnaround (I\u2013vi\u2013IV\u2013V7), voiced with a 6th chord on the tonic instead of a plain triad \u2014 a small change that gives an otherwise simple, singable loop a jazzier, more churchy color.',
      degrees: [
        { roman: 'I6', name: 'Tonic 6th', semitoneFromKey: 0, quality: 'sixth' },
        { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
        { roman: 'IV', name: 'Subdominant', semitoneFromKey: 5, quality: 'major' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
    {
      id: 'amen-six-vamp',
      name: 'Amen Six Vamp',
      label: 'I6 \u2013 IV \u2013 iv \u2013 I6',
      description: 'The classic plagal \u201cAmen cadence\u201d (IV \u2192 iv \u2192 I), with its bittersweet borrowed minor iv, bookended here by the tonic 6th chord instead of a plain major triad.',
      degrees: [
        { roman: 'I6', name: 'Tonic 6th', semitoneFromKey: 0, quality: 'sixth' },
        { roman: 'IV', name: 'Subdominant', semitoneFromKey: 5, quality: 'major' },
        { roman: 'iv', name: 'Borrowed minor subdominant', semitoneFromKey: 5, quality: 'minor' },
        { roman: 'I6', name: 'Tonic 6th', semitoneFromKey: 0, quality: 'sixth' },
      ],
    },
    {
      id: 'gospel-six-extended',
      name: 'Extended Gospel Six Turnaround',
      label: 'vi7 \u2013 ii7 \u2013 V7 \u2013 I6',
      description: 'A gospel walk-back turnaround \u2014 two falling-5th minor 7ths (vi7\u2013ii7) followed by the dominant 7th (V7) \u2014 that resolves onto the warmer I6 tonic color, common at the end of a shout chorus.',
      degrees: [
        { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        { roman: 'I6', name: 'Tonic 6th', semitoneFromKey: 0, quality: 'sixth' },
      ],
    },
    {
      id: 'secondary-dominant-to-six',
      name: 'Secondary Dominant to the Six',
      label: 'I \u2013 III7 \u2013 vi \u2013 V7 \u2013 I6',
      description: 'A gospel-flavored turnaround that briefly tonicizes vi with a secondary dominant (III7) before V7 pulls the harmony back home \u2014 not to a plain tonic triad, but to the richer-colored I6.',
      degrees: [
        { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        { roman: 'III7', name: 'Secondary dominant of vi', semitoneFromKey: 4, quality: 'dominant7' },
        { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        { roman: 'I6', name: 'Tonic 6th', semitoneFromKey: 0, quality: 'sixth' },
      ],
    },
    {
      id: 'gospel-blues-six',
      name: 'Gospel Blues Six Cadence',
      label: 'I7 \u2013 IV \u2013 I6 \u2013 V7',
      description: 'A gospel piano vamp that mixes a bluesy dominant-7th tonic (I7) with a warmer 6th-chord tonic color (I6) either side of the subdominant, before the final dominant 7th push.',
      degrees: [
        { roman: 'I7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'dominant7' },
        { roman: 'IV', name: 'Subdominant', semitoneFromKey: 5, quality: 'major' },
        { roman: 'I6', name: 'Tonic 6th', semitoneFromKey: 0, quality: 'sixth' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
  ];

  // Five jazz chord progressions built around the minor 6th chord --
  // used by the Minor Sixth Chord Trainer lesson (Lesson 21). Context is
  // the natural (Aeolian) minor scale, the same convention used by the
  // Minor Chords and Minor 7th Chords lessons.
  const MINOR_SIXTH_JAZZ_PROGRESSIONS = [
    {
      id: 'minor-six-ii-v-i',
      name: 'Minor ii\u2013V\u2013i Landing on the Six',
      label: 'ii\u00f87 \u2013 V7 \u2013 i6',
      description: 'The classic minor-key ii\u2013V\u2013i, but resolving onto the moodier minor 6th tonic (i6) instead of a plain minor triad or minor(-major) 7th \u2014 a favorite way for a minor-key jazz standard to rest on its very last chord.',
      degrees: [
        { roman: 'ii\u00f87', name: 'Supertonic half-diminished 7th', semitoneFromKey: 2, quality: 'halfDiminished7' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        { roman: 'i6', name: 'Tonic minor 6th', semitoneFromKey: 0, quality: 'minorSixth' },
      ],
    },
    {
      id: 'minor-six-on-i-and-iv',
      name: 'Minor Six on the One and Four',
      label: 'i6 \u2013 iv6 \u2013 ii\u00f87 \u2013 V7',
      description: 'Minor 6th chords stacked on both the tonic and subdominant \u2014 the natural-minor mirror of "Six on the One and Four" \u2014 before a ii\u00f87\u2013V7 turnaround pulls the harmony back toward home.',
      degrees: [
        { roman: 'i6', name: 'Tonic minor 6th', semitoneFromKey: 0, quality: 'minorSixth' },
        { roman: 'iv6', name: 'Subdominant minor 6th', semitoneFromKey: 5, quality: 'minorSixth' },
        { roman: 'ii\u00f87', name: 'Supertonic half-diminished 7th', semitoneFromKey: 2, quality: 'halfDiminished7' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
    {
      id: 'minor-six-passing-dim',
      name: 'Passing Diminished to the Minor Six',
      label: 'i6 \u2013 \u266fidim7 \u2013 ii\u00f87 \u2013 V7',
      description: 'The same chromatic passing-diminished trick (i \u2192 \u266fi \u2192 ii) used elsewhere in this app, reused here in a minor key and starting the phrase from the minor 6th tonic.',
      degrees: [
        { roman: 'i6', name: 'Tonic minor 6th', semitoneFromKey: 0, quality: 'minorSixth' },
        { roman: '\u266fidim7', name: 'Raised-tonic diminished 7th', semitoneFromKey: 1, quality: 'diminished7' },
        { roman: 'ii\u00f87', name: 'Supertonic half-diminished 7th', semitoneFromKey: 2, quality: 'halfDiminished7' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
    {
      id: 'minor-six-secondary-dominant',
      name: 'Secondary Dominant to the Minor Six',
      label: 'i6 \u2013 VI7 \u2013 ii\u00f87 \u2013 V7',
      description: 'A borrowed dominant 7th built on the submediant (VI7) briefly tonicizes the ii chord before the familiar ii\u00f87\u2013V7 turnaround resolves the phrase back toward the tonic minor 6th.',
      degrees: [
        { roman: 'i6', name: 'Tonic minor 6th', semitoneFromKey: 0, quality: 'minorSixth' },
        { roman: 'VI7', name: 'Secondary dominant of ii', semitoneFromKey: 8, quality: 'dominant7' },
        { roman: 'ii\u00f87', name: 'Supertonic half-diminished 7th', semitoneFromKey: 2, quality: 'halfDiminished7' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
    {
      id: 'minor-six-blues-turnaround',
      name: 'Minor Blues Turnaround to the Six',
      label: 'i7 \u2013 iv7 \u2013 V7 \u2013 i6',
      description: 'A minor-blues-style turnaround (i7\u2013iv7\u2013V7) that resolves not to a plain minor 7th tonic but up to the richer-colored minor 6th (i6), a common way jazz players close out a minor blues chorus.',
      degrees: [
        { roman: 'i7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'minor7' },
        { roman: 'iv7', name: 'Subdominant 7th', semitoneFromKey: 5, quality: 'minor7' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        { roman: 'i6', name: 'Tonic minor 6th', semitoneFromKey: 0, quality: 'minorSixth' },
      ],
    },
  ];

  // Five gospel chord progressions built around the minor 6th chord.
  const MINOR_SIXTH_GOSPEL_PROGRESSIONS = [
    {
      id: 'minor-gospel-six-cadence',
      name: 'Minor Gospel Six Cadence',
      label: 'i6 \u2013 iv \u2013 V7 \u2013 i6',
      description: 'The classic minor-key gospel cadence (i\u2013iv\u2013V7\u2013i), bookended here by the tonic minor 6th for a warmer, jazzier color than a plain minor triad.',
      degrees: [
        { roman: 'i6', name: 'Tonic minor 6th', semitoneFromKey: 0, quality: 'minorSixth' },
        { roman: 'iv', name: 'Subdominant', semitoneFromKey: 5, quality: 'minor' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        { roman: 'i6', name: 'Tonic minor 6th', semitoneFromKey: 0, quality: 'minorSixth' },
      ],
    },
    {
      id: 'minor-six-relative-major-walk',
      name: 'Minor Six to the Relative Major',
      label: 'i6 \u2013 VI \u2013 iv6 \u2013 V7',
      description: 'A gospel-style walk from the tonic minor 6th up to the relative-major submediant triad (VI), then back down through a subdominant minor 6th chord (iv6) into the dominant 7th.',
      degrees: [
        { roman: 'i6', name: 'Tonic minor 6th', semitoneFromKey: 0, quality: 'minorSixth' },
        { roman: 'VI', name: 'Relative-major submediant', semitoneFromKey: 8, quality: 'major' },
        { roman: 'iv6', name: 'Subdominant minor 6th', semitoneFromKey: 5, quality: 'minorSixth' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
    {
      id: 'minor-six-amen-vamp',
      name: 'Minor Amen Six Vamp',
      label: 'i6 \u2013 iv \u2013 i6 \u2013 V7',
      description: 'A simple plagal-flavored gospel vamp \u2014 tonic minor 6th, subdominant minor, back to the tonic 6th, then the dominant 7th push \u2014 common in slow, minor-key gospel intros and vamps.',
      degrees: [
        { roman: 'i6', name: 'Tonic minor 6th', semitoneFromKey: 0, quality: 'minorSixth' },
        { roman: 'iv', name: 'Subdominant', semitoneFromKey: 5, quality: 'minor' },
        { roman: 'i6', name: 'Tonic minor 6th', semitoneFromKey: 0, quality: 'minorSixth' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
    {
      id: 'minor-six-passing-dim-gospel',
      name: 'Gospel Passing Diminished to the Minor Six',
      label: 'i6 \u2013 \u266fidim7 \u2013 iv6 \u2013 V7',
      description: 'A favorite gospel piano voice-leading trick \u2014 a chromatic passing diminished chord (i \u2192 \u266fi \u2192 iv) \u2014 framed here around minor 6th chords on the tonic and subdominant.',
      degrees: [
        { roman: 'i6', name: 'Tonic minor 6th', semitoneFromKey: 0, quality: 'minorSixth' },
        { roman: '\u266fidim7', name: 'Raised-tonic diminished 7th', semitoneFromKey: 1, quality: 'diminished7' },
        { roman: 'iv6', name: 'Subdominant minor 6th', semitoneFromKey: 5, quality: 'minorSixth' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
    {
      id: 'minor-six-double-plagal',
      name: 'Double Plagal Minor Six',
      label: 'i6 \u2013 VII \u2013 iv \u2013 i6',
      description: 'A modal-sounding gospel vamp that borrows the subtonic major triad (\u266dVII) on the way down through the subdominant and back home to the tonic minor 6th.',
      degrees: [
        { roman: 'i6', name: 'Tonic minor 6th', semitoneFromKey: 0, quality: 'minorSixth' },
        { roman: 'VII', name: 'Subtonic', semitoneFromKey: 10, quality: 'major' },
        { roman: 'iv', name: 'Subdominant', semitoneFromKey: 5, quality: 'minor' },
        { roman: 'i6', name: 'Tonic minor 6th', semitoneFromKey: 0, quality: 'minorSixth' },
      ],
    },
  ];

  // Five jazz chord progressions built around the augmented 7th chord
  // (7♯5) -- used by the Augmented 7th Chord Trainer lesson (Lesson 23).
  // An augmented 7th is a dominant 7th with its 5th raised a semitone, so
  // every one of these shows it doing what it does best: standing in for
  // a plain V7 (or another dominant-functioning chord) wherever extra
  // "altered dominant" pull is wanted before a resolution down a 5th.
  const AUGMENTED_SEVENTH_JAZZ_PROGRESSIONS = [
    {
      id: 'aug7-ii-v-i',
      name: 'Altered ii\u2013V\u2013I',
      label: 'ii7 \u2013 V7\u266f5 \u2013 Imaj7',
      description: 'The familiar major ii\u2013V\u2013I, but with the V7 raised to V7\u266f5: pulling the 5th up a semitone adds extra outward tension before the chord resolves down a 5th onto the tonic major 7th, a common jazz way to spice up an otherwise plain dominant.',
      degrees: [
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7\u266f5', name: 'Altered dominant 7th', semitoneFromKey: 7, quality: 'augmentedSeventh' },
        { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
      ],
    },
    {
      id: 'aug7-turnaround',
      name: 'Turnaround with Altered Dominants',
      label: 'iii7 \u2013 VI7\u266f5 \u2013 ii7 \u2013 V7\u266f5',
      description: 'A falling-5ths turnaround with two altered dominants: a secondary VI7\u266f5 tonicizes ii with extra bite, then the closing V7\u266f5 does the same on its way back to the top of the tune -- both raised 5ths adding color that a plain dominant 7th wouldn\u2019t.',
      degrees: [
        { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
        { roman: 'VI7\u266f5', name: 'Altered secondary dominant of ii', semitoneFromKey: 9, quality: 'augmentedSeventh' },
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7\u266f5', name: 'Altered dominant 7th', semitoneFromKey: 7, quality: 'augmentedSeventh' },
      ],
    },
    {
      id: 'aug7-passing-to-ii',
      name: 'Altered Dominant Passing to ii',
      label: 'Imaj7 \u2013 I7\u266f5 \u2013 ii7 \u2013 V7\u266f5',
      description: 'I7\u266f5 works as a chromatic passing chord between the tonic and ii: its raised 5th sits a half-step below ii\u2019s 3rd, so it slides smoothly upward, before the closing V7\u266f5 pulls the phrase back home.',
      degrees: [
        { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
        { roman: 'I7\u266f5', name: 'Altered tonic passing dominant', semitoneFromKey: 0, quality: 'augmentedSeventh' },
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7\u266f5', name: 'Altered dominant 7th', semitoneFromKey: 7, quality: 'augmentedSeventh' },
      ],
    },
    {
      id: 'aug7-minor-ii-v-i',
      name: 'Minor ii\u2013V\u2013i, Altered',
      label: 'ii\u00f87 \u2013 V7\u266f5 \u2013 i7',
      description: 'The minor-key ii\u2013V\u2013i with its dominant altered: the supertonic half-diminished 7th (ii\u00f87) falls a 5th to V7\u266f5, whose raised 5th intensifies the pull into the minor 7th tonic (i7).',
      degrees: [
        { roman: 'ii\u00f87', name: 'Supertonic half-diminished 7th', semitoneFromKey: 2, quality: 'halfDiminished7' },
        { roman: 'V7\u266f5', name: 'Altered dominant 7th', semitoneFromKey: 7, quality: 'augmentedSeventh' },
        { roman: 'i7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'minor7' },
      ],
    },
    {
      id: 'aug7-blues-turnaround',
      name: 'Jazz Blues Turnaround, Altered',
      label: 'I7 \u2013 IV7 \u2013 V7\u266f5 \u2013 I7',
      description: 'A jazz-blues turnaround built from plain dominant 7ths on I and IV, but with the closing V7 raised to V7\u266f5 for an extra push back to the tonic on the last bar of the phrase.',
      degrees: [
        { roman: 'I7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'dominant7' },
        { roman: 'IV7', name: 'Subdominant 7th', semitoneFromKey: 5, quality: 'dominant7' },
        { roman: 'V7\u266f5', name: 'Altered dominant 7th', semitoneFromKey: 7, quality: 'augmentedSeventh' },
        { roman: 'I7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'dominant7' },
      ],
    },
  ];

  // Five gospel chord progressions built around the augmented 7th chord.
  const AUGMENTED_SEVENTH_GOSPEL_PROGRESSIONS = [
    {
      id: 'aug7-gospel-turnaround',
      name: 'Gospel Turnaround with Altered Dominant',
      label: 'I \u2013 vi \u2013 ii7 \u2013 V7\u266f5',
      description: 'The classic gospel turnaround (I\u2013vi\u2013ii7), closed out with an altered dominant (V7\u266f5) instead of a plain V7 -- a small change that adds extra churchy tension right before the harmony resolves back to I.',
      degrees: [
        { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7\u266f5', name: 'Altered dominant 7th', semitoneFromKey: 7, quality: 'augmentedSeventh' },
      ],
    },
    {
      id: 'aug7-amen-passing',
      name: 'Amen Vamp with Altered Passing Chord',
      label: 'I \u2013 I7\u266f5 \u2013 IV \u2013 iv \u2013 I',
      description: 'The classic plagal "Amen" vamp (IV\u2192iv\u2192I), decorated with I7\u266f5 as a chromatic passing chord between I and IV -- its raised 5th climbs a half-step into IV\u2019s 3rd, a favorite gospel-piano voice-leading touch.',
      degrees: [
        { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        { roman: 'I7\u266f5', name: 'Altered tonic passing dominant', semitoneFromKey: 0, quality: 'augmentedSeventh' },
        { roman: 'IV', name: 'Subdominant', semitoneFromKey: 5, quality: 'major' },
        { roman: 'iv', name: 'Borrowed minor subdominant', semitoneFromKey: 5, quality: 'minor' },
        { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
      ],
    },
    {
      id: 'aug7-secondary-dominant',
      name: 'Secondary Altered Dominant Turnaround',
      label: 'I \u2013 III7\u266f5 \u2013 vi \u2013 V7',
      description: 'A secondary dominant of vi (III7), raised to III7\u266f5 for extra color, resolves down a 5th into vi exactly the way V7 resolves into I -- before the closing V7 pulls the whole progression back to the tonic.',
      degrees: [
        { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        { roman: 'III7\u266f5', name: 'Altered secondary dominant of vi', semitoneFromKey: 4, quality: 'augmentedSeventh' },
        { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
    {
      id: 'aug7-extended-turnaround',
      name: 'Extended Gospel Turnaround, Altered',
      label: 'iii7 \u2013 vi7 \u2013 ii7 \u2013 V7\u266f5 \u2013 Imaj7',
      description: 'A five-chord gospel walk-back turnaround -- three falling-5th minor 7ths (iii7\u2013vi7\u2013ii7) -- that lands on an altered dominant (V7\u266f5) before resolving onto a lush tonic major 7th (Imaj7).',
      degrees: [
        { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
        { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7\u266f5', name: 'Altered dominant 7th', semitoneFromKey: 7, quality: 'augmentedSeventh' },
        { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
      ],
    },
    {
      id: 'aug7-minor-gospel-cadence',
      name: 'Minor Gospel Cadence, Altered',
      label: 'i \u2013 iv \u2013 V7\u266f5 \u2013 i',
      description: 'A minor-key gospel cadence built from the natural minor\u2019s tonic and subdominant triads, with the dominant further altered to V7\u266f5 for an even firmer pull back home than a plain harmonic-minor V7.',
      degrees: [
        { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
        { roman: 'iv', name: 'Subdominant', semitoneFromKey: 5, quality: 'minor' },
        { roman: 'V7\u266f5', name: 'Altered dominant 7th', semitoneFromKey: 7, quality: 'augmentedSeventh' },
        { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
      ],
    },
  ];

  // Five jazz chord progressions built around the major 7th\u266d5 chord --
  // mostly using it as a floating, unresolved substitute wherever a
  // plain major 7th chord would otherwise sit.
  const MAJOR_SEVENTH_FLAT_FIVE_JAZZ_PROGRESSIONS = [
    {
      id: 'maj7b5-ii-V-I',
      name: 'ii\u2013V\u2013I with Altered Tonic',
      label: 'ii7 \u2013 V7 \u2013 Imaj7\u266d5',
      description: 'The familiar ii\u2013V\u2013I, but resolving onto Imaj7\u266d5 instead of a plain Imaj7 -- the lowered 5th gives the tonic a floating, not-quite-settled color instead of full repose.',
      degrees: [
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        { roman: 'Imaj7\u266d5', name: 'Altered tonic 7th', semitoneFromKey: 0, quality: 'majorSeventhFlatFive' },
      ],
    },
    {
      id: 'maj7b5-passing',
      name: 'Passing Maj7\u266d5',
      label: 'Imaj7 \u2013 \u266fImaj7\u266d5 \u2013 ii7 \u2013 V7',
      description: 'A chromatic passing chord between Imaj7 and ii7, built as a maj7\u266d5 on the raised tonic -- the same chromatic bass motion (I \u2192 \u266fI \u2192 ii) as the Major 7th Chords lesson\u2019s Passing Diminished progression, but colored with a different substitute chord.',
      degrees: [
        { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
        { roman: '\u266fImaj7\u266d5', name: 'Raised-tonic altered 7th', semitoneFromKey: 1, quality: 'majorSeventhFlatFive' },
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
    {
      id: 'maj7b5-turnaround',
      name: 'Turnaround with Maj7\u266d5 Color',
      label: 'iii7 \u2013 VImaj7\u266d5 \u2013 ii7 \u2013 V7',
      description: 'A falling turnaround where the vi chord is colored as a maj7\u266d5 instead of the usual minor 7th, for an unexpected major-quality substitution right in the middle of the progression.',
      degrees: [
        { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
        { roman: 'VImaj7\u266d5', name: 'Altered submediant 7th', semitoneFromKey: 9, quality: 'majorSeventhFlatFive' },
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
    {
      id: 'maj7b5-minor-key',
      name: 'Minor-Key Cadence with Maj7\u266d5',
      label: 'i7 \u2013 ivmaj7\u266d5 \u2013 V7 \u2013 i7',
      description: 'A minor-key cadence where the borrowed subdominant becomes a maj7\u266d5 chord -- a bittersweet, unresolved color sitting between the minor tonic and the dominant that finally pulls the harmony home.',
      degrees: [
        { roman: 'i7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'minor7' },
        { roman: 'ivmaj7\u266d5', name: 'Altered subdominant 7th', semitoneFromKey: 5, quality: 'majorSeventhFlatFive' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        { roman: 'i7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'minor7' },
      ],
    },
    {
      id: 'maj7b5-blues',
      name: 'Jazz Blues Turnaround with Maj7\u266d5',
      label: 'Imaj7\u266d5 \u2013 IV7 \u2013 ii7 \u2013 V7',
      description: 'A jazz-blues turnaround that opens on Imaj7\u266d5 instead of a plain major 7th or dominant tonic, establishing the chord\u2019s unstable color right away before the familiar changes underneath.',
      degrees: [
        { roman: 'Imaj7\u266d5', name: 'Altered tonic 7th', semitoneFromKey: 0, quality: 'majorSeventhFlatFive' },
        { roman: 'IV7', name: 'Subdominant 7th', semitoneFromKey: 5, quality: 'dominant7' },
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
  ];

  // Five gospel chord progressions built around the major 7th\u266d5 chord.
  const MAJOR_SEVENTH_FLAT_FIVE_GOSPEL_PROGRESSIONS = [
    {
      id: 'maj7b5-gospel-turnaround',
      name: 'Gospel Turnaround with Altered IV',
      label: 'I \u2013 vi \u2013 IVmaj7\u266d5 \u2013 V7',
      description: 'The classic gospel turnaround (I\u2013vi), swapping the usual ii7 for a IVmaj7\u266d5 passing color chord just before the closing V7 pulls the harmony back to the tonic -- a rich reharmonization gospel pianists use for extra shimmer.',
      degrees: [
        { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
        { roman: 'IVmaj7\u266d5', name: 'Altered subdominant 7th', semitoneFromKey: 5, quality: 'majorSeventhFlatFive' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
    {
      id: 'maj7b5-amen-passing',
      name: 'Amen Vamp with Maj7\u266d5 Passing Chord',
      label: 'I \u2013 Imaj7\u266d5 \u2013 IV \u2013 iv \u2013 I',
      description: 'The classic plagal "Amen" vamp (IV\u2192iv\u2192I), decorated with Imaj7\u266d5 as a passing color chord right after the opening tonic -- its lowered 5th creates a brief chromatic dip before the subdominant arrives.',
      degrees: [
        { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        { roman: 'Imaj7\u266d5', name: 'Altered tonic passing chord', semitoneFromKey: 0, quality: 'majorSeventhFlatFive' },
        { roman: 'IV', name: 'Subdominant', semitoneFromKey: 5, quality: 'major' },
        { roman: 'iv', name: 'Borrowed minor subdominant', semitoneFromKey: 5, quality: 'minor' },
        { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
      ],
    },
    {
      id: 'maj7b5-secondary',
      name: 'Secondary Maj7\u266d5 Turnaround',
      label: 'I \u2013 IIImaj7\u266d5 \u2013 vi \u2013 V7',
      description: 'A secondary chord built on the mediant, colored as a maj7\u266d5 instead of the usual minor 7th, resolves into vi the way a secondary dominant would -- before the closing V7 pulls the whole progression back home.',
      degrees: [
        { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        { roman: 'IIImaj7\u266d5', name: 'Altered mediant 7th', semitoneFromKey: 4, quality: 'majorSeventhFlatFive' },
        { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
    {
      id: 'maj7b5-extended-turnaround',
      name: 'Extended Gospel Turnaround with Maj7\u266d5',
      label: 'iii7 \u2013 vi7 \u2013 ii7 \u2013 \u266dVImaj7\u266d5 \u2013 Imaj7',
      description: 'A five-chord walk-back turnaround -- three falling-5th minor 7ths (iii7\u2013vi7\u2013ii7) -- that closes with a chromatic \u266dVImaj7\u266d5 passing chord just before landing on a lush tonic major 7th (Imaj7).',
      degrees: [
        { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
        { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: '\u266dVImaj7\u266d5', name: 'Chromatic passing altered 7th', semitoneFromKey: 8, quality: 'majorSeventhFlatFive' },
        { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
      ],
    },
    {
      id: 'maj7b5-minor-gospel-cadence',
      name: 'Minor Gospel Cadence with Maj7\u266d5',
      label: 'i \u2013 ivmaj7\u266d5 \u2013 V7 \u2013 i',
      description: 'A minor-key gospel cadence where the subdominant borrows the parallel major\u2019s IV but flats its 5th, giving an unresolved, bittersweet color before the dominant pulls the harmony back home.',
      degrees: [
        { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
        { roman: 'ivmaj7\u266d5', name: 'Altered subdominant 7th', semitoneFromKey: 5, quality: 'majorSeventhFlatFive' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
      ],
    },
  ];

  // Five jazz chord progressions built around the major 7th\u266f11 chord --
  // mostly using it as a bright, "Lydian" substitute wherever a plain
  // major 7th chord would otherwise sit, especially on the subdominant
  // (IV) degree, whose own major scale naturally supplies a raised (not
  // plain) 11th.
  const MAJOR_SEVENTH_SHARP_ELEVEN_JAZZ_PROGRESSIONS = [
    {
      id: 'maj7sharp11-iv-lydian',
      name: 'IVmaj7\u266f11 Color Change',
      label: 'Imaj7 \u2013 IVmaj7\u266f11 \u2013 iii7 \u2013 vi7',
      description: 'The classic jazz-ballad move of coloring the subdominant with its natural Lydian 4th: IVmaj7\u266f11 uses only notes diatonic to the tonic major scale, giving a lush, brighter alternative to a plain IVmaj7, before falling back through iii7 to vi7.',
      degrees: [
        { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
        { roman: 'IVmaj7\u266f11', name: 'Lydian subdominant 7th', semitoneFromKey: 5, quality: 'majorSeventhSharpEleven' },
        { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
        { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
      ],
    },
    {
      id: 'maj7sharp11-ii-V-I',
      name: 'ii\u2013V\u2013I with Lydian Tonic',
      label: 'ii7 \u2013 V7 \u2013 Imaj7\u266f11',
      description: 'The familiar ii\u2013V\u2013I, but resolving onto Imaj7\u266f11 instead of a plain Imaj7 -- a shimmering, modern substitution that raises the tonic\u2019s 11th for extra brightness rather than dissonance.',
      degrees: [
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        { roman: 'Imaj7\u266f11', name: 'Lydian tonic 7th', semitoneFromKey: 0, quality: 'majorSeventhSharpEleven' },
      ],
    },
    {
      id: 'maj7sharp11-turnaround',
      name: 'Turnaround with Lydian Color',
      label: 'iii7 \u2013 VImaj7\u266f11 \u2013 ii7 \u2013 V7',
      description: 'A falling turnaround where the vi chord is colored as a maj7\u266f11 instead of the usual minor 7th, for a brighter major-quality substitution right in the middle of the progression.',
      degrees: [
        { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
        { roman: 'VImaj7\u266f11', name: 'Lydian submediant 7th', semitoneFromKey: 9, quality: 'majorSeventhSharpEleven' },
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
    {
      id: 'maj7sharp11-minor-key',
      name: 'Minor-Key Cadence with Lydian IV',
      label: 'i7 \u2013 IVmaj7\u266f11 \u2013 V7 \u2013 i7',
      description: 'A minor-key cadence borrowing the parallel major\u2019s IV, colored as a maj7\u266f11 for a bright, modal lift between the minor tonic and the dominant that finally pulls the harmony home.',
      degrees: [
        { roman: 'i7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'minor7' },
        { roman: 'IVmaj7\u266f11', name: 'Borrowed Lydian subdominant 7th', semitoneFromKey: 5, quality: 'majorSeventhSharpEleven' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        { roman: 'i7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'minor7' },
      ],
    },
    {
      id: 'maj7sharp11-blues',
      name: 'Jazz Blues Turnaround with Lydian Tonic',
      label: 'Imaj7\u266f11 \u2013 IV7 \u2013 ii7 \u2013 V7',
      description: 'A jazz-blues turnaround that opens on Imaj7\u266f11 instead of a plain major 7th or dominant tonic, establishing a bright, modern color right away before the familiar changes underneath.',
      degrees: [
        { roman: 'Imaj7\u266f11', name: 'Lydian tonic 7th', semitoneFromKey: 0, quality: 'majorSeventhSharpEleven' },
        { roman: 'IV7', name: 'Subdominant 7th', semitoneFromKey: 5, quality: 'dominant7' },
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
  ];

  // Five gospel chord progressions built around the major 7th\u266f11 chord.
  const MAJOR_SEVENTH_SHARP_ELEVEN_GOSPEL_PROGRESSIONS = [
    {
      id: 'maj7sharp11-gospel-turnaround',
      name: 'Gospel Turnaround with Lydian IV',
      label: 'I \u2013 vi \u2013 IVmaj7\u266f11 \u2013 V7',
      description: 'The classic gospel turnaround (I\u2013vi), swapping the usual IV or ii7 for a IVmaj7\u266f11 color chord just before the closing V7 pulls the harmony back to the tonic -- a shimmering reharmonization gospel pianists use for extra lift.',
      degrees: [
        { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
        { roman: 'IVmaj7\u266f11', name: 'Lydian subdominant 7th', semitoneFromKey: 5, quality: 'majorSeventhSharpEleven' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
    {
      id: 'maj7sharp11-amen-passing',
      name: 'Amen Vamp with Lydian Passing Chord',
      label: 'I \u2013 IVmaj7\u266f11 \u2013 IV \u2013 iv \u2013 I',
      description: 'The classic plagal "Amen" vamp (IV\u2192iv\u2192I), decorated with IVmaj7\u266f11 as a bright passing color chord right before the plain subdominant arrives -- its raised 11th glows against the melody without any dissonant clash.',
      degrees: [
        { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        { roman: 'IVmaj7\u266f11', name: 'Lydian passing subdominant 7th', semitoneFromKey: 5, quality: 'majorSeventhSharpEleven' },
        { roman: 'IV', name: 'Subdominant', semitoneFromKey: 5, quality: 'major' },
        { roman: 'iv', name: 'Borrowed minor subdominant', semitoneFromKey: 5, quality: 'minor' },
        { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
      ],
    },
    {
      id: 'maj7sharp11-secondary',
      name: 'Secondary Lydian Turnaround',
      label: 'I \u2013 IIImaj7\u266f11 \u2013 vi \u2013 V7',
      description: 'A secondary chord built on the mediant, colored as a maj7\u266f11 instead of the usual minor 7th, resolves into vi the way a secondary dominant would -- before the closing V7 pulls the whole progression back home.',
      degrees: [
        { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        { roman: 'IIImaj7\u266f11', name: 'Lydian mediant 7th', semitoneFromKey: 4, quality: 'majorSeventhSharpEleven' },
        { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
    {
      id: 'maj7sharp11-extended-turnaround',
      name: 'Extended Gospel Turnaround with Lydian Color',
      label: 'iii7 \u2013 vi7 \u2013 ii7 \u2013 \u266dVImaj7\u266f11 \u2013 Imaj7',
      description: 'A five-chord walk-back turnaround -- three falling-5th minor 7ths (iii7\u2013vi7\u2013ii7) -- that closes with a chromatic \u266dVImaj7\u266f11 passing chord just before landing on a lush tonic major 7th (Imaj7).',
      degrees: [
        { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
        { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: '\u266dVImaj7\u266f11', name: 'Chromatic passing Lydian 7th', semitoneFromKey: 8, quality: 'majorSeventhSharpEleven' },
        { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
      ],
    },
    {
      id: 'maj7sharp11-minor-gospel-cadence',
      name: 'Minor Gospel Cadence with Lydian IV',
      label: 'i \u2013 IVmaj7\u266f11 \u2013 V7 \u2013 i',
      description: 'A minor-key gospel cadence where the subdominant borrows the parallel major\u2019s IV and raises its 11th, giving a bright, floating lift before the dominant pulls the harmony back home.',
      degrees: [
        { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
        { roman: 'IVmaj7\u266f11', name: 'Borrowed Lydian subdominant 7th', semitoneFromKey: 5, quality: 'majorSeventhSharpEleven' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
      ],
    },
  ];

  // Five jazz chord progressions built around the add9 chord -- mostly
  // using it as a bright, open substitute for a plain triad or a 6th
  // chord wherever a tonic or subdominant chord would otherwise sit,
  // since (unlike a 7th chord) it never creates any tension that needs
  // to resolve.
  const ADD9_JAZZ_PROGRESSIONS = [
    {
      id: 'add9-ii-V-I',
      name: 'ii\u2013V\u2013I with Add9 Tonic',
      label: 'ii7 \u2013 V7 \u2013 Iadd9',
      description: 'The familiar ii\u2013V\u2013I, but resolving onto Iadd9 instead of a plain Imaj7 -- an open, ambiguous color that settles the progression without any of the closed, "complete" feeling a 7th brings.',
      degrees: [
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        { roman: 'Iadd9', name: 'Tonic add9', semitoneFromKey: 0, quality: 'add9' },
      ],
    },
    {
      id: 'add9-iv-color',
      name: 'IVadd9 Color Change',
      label: 'Imaj7 \u2013 IVadd9 \u2013 iii7 \u2013 vi7',
      description: 'A jazz-ballad move that colors the subdominant with an add9 instead of a plain triad or major 7th -- a wide, airy alternative with no 7th at all -- before falling back through iii7 to vi7.',
      degrees: [
        { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
        { roman: 'IVadd9', name: 'Subdominant add9', semitoneFromKey: 5, quality: 'add9' },
        { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
        { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
      ],
    },
    {
      id: 'add9-turnaround',
      name: 'Turnaround with Add9 Submediant',
      label: 'iii7 \u2013 VIadd9 \u2013 ii7 \u2013 V7',
      description: 'A falling turnaround where the vi chord is colored as an add9 instead of the usual minor 7th, for an open, major-quality substitution right in the middle of the progression.',
      degrees: [
        { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
        { roman: 'VIadd9', name: 'Submediant add9', semitoneFromKey: 9, quality: 'add9' },
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
    {
      id: 'add9-minor-key',
      name: 'Minor-Key Cadence with Add9 IV',
      label: 'i7 \u2013 IVadd9 \u2013 V7 \u2013 i7',
      description: 'A minor-key cadence borrowing the parallel major\u2019s IV, colored as an add9 for an open, unresolved lift between the minor tonic and the dominant that finally pulls the harmony home.',
      degrees: [
        { roman: 'i7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'minor7' },
        { roman: 'IVadd9', name: 'Borrowed subdominant add9', semitoneFromKey: 5, quality: 'add9' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        { roman: 'i7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'minor7' },
      ],
    },
    {
      id: 'add9-blues',
      name: 'Jazz Blues Turnaround with Add9 Tonic',
      label: 'Iadd9 \u2013 IV7 \u2013 ii7 \u2013 V7',
      description: 'A jazz-blues turnaround that opens on Iadd9 instead of a plain major or dominant tonic, establishing a bright, open color right away before the familiar changes underneath.',
      degrees: [
        { roman: 'Iadd9', name: 'Tonic add9', semitoneFromKey: 0, quality: 'add9' },
        { roman: 'IV7', name: 'Subdominant 7th', semitoneFromKey: 5, quality: 'dominant7' },
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
  ];

  // Five gospel chord progressions built around the add9 chord.
  const ADD9_GOSPEL_PROGRESSIONS = [
    {
      id: 'add9-gospel-turnaround',
      name: 'Gospel Turnaround with Add9 IV',
      label: 'I \u2013 vi \u2013 IVadd9 \u2013 V7',
      description: 'The classic gospel turnaround (I\u2013vi), swapping the usual IV or ii7 for an IVadd9 color chord just before the closing V7 pulls the harmony back to the tonic -- an open, shimmering reharmonization gospel pianists use for extra lift.',
      degrees: [
        { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
        { roman: 'IVadd9', name: 'Subdominant add9', semitoneFromKey: 5, quality: 'add9' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
    {
      id: 'add9-amen-passing',
      name: 'Amen Vamp with Add9 Passing Chord',
      label: 'I \u2013 IVadd9 \u2013 IV \u2013 iv \u2013 I',
      description: 'The classic plagal "Amen" vamp (IV\u2192iv\u2192I), decorated with IVadd9 as a bright passing color chord right before the plain subdominant arrives -- its added 9th glows against the melody without any dissonant clash.',
      degrees: [
        { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        { roman: 'IVadd9', name: 'Subdominant passing add9', semitoneFromKey: 5, quality: 'add9' },
        { roman: 'IV', name: 'Subdominant', semitoneFromKey: 5, quality: 'major' },
        { roman: 'iv', name: 'Borrowed minor subdominant', semitoneFromKey: 5, quality: 'minor' },
        { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
      ],
    },
    {
      id: 'add9-secondary',
      name: 'Secondary Add9 Turnaround',
      label: 'I \u2013 IIIadd9 \u2013 vi \u2013 V7',
      description: 'A secondary chord built on the mediant, colored as an add9 instead of the usual minor triad, resolves into vi the way a secondary dominant would -- before the closing V7 pulls the whole progression back home.',
      degrees: [
        { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        { roman: 'IIIadd9', name: 'Mediant add9', semitoneFromKey: 4, quality: 'add9' },
        { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
    {
      id: 'add9-extended-turnaround',
      name: 'Extended Gospel Turnaround with Add9 Color',
      label: 'iii7 \u2013 vi7 \u2013 ii7 \u2013 \u266dVIadd9 \u2013 Iadd9',
      description: 'A five-chord walk-back turnaround -- three falling-5th minor 7ths (iii7\u2013vi7\u2013ii7) -- that closes with a chromatic \u266dVIadd9 passing chord just before landing on an open, wide tonic add9 (Iadd9).',
      degrees: [
        { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
        { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: '\u266dVIadd9', name: 'Chromatic passing add9', semitoneFromKey: 8, quality: 'add9' },
        { roman: 'Iadd9', name: 'Tonic add9', semitoneFromKey: 0, quality: 'add9' },
      ],
    },
    {
      id: 'add9-minor-gospel-cadence',
      name: 'Minor Gospel Cadence with Add9 IV',
      label: 'i \u2013 IVadd9 \u2013 V7 \u2013 i',
      description: 'A minor-key gospel cadence where the subdominant borrows the parallel major\u2019s IV and adds a 9th, giving an open, floating lift before the dominant pulls the harmony back home.',
      degrees: [
        { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
        { roman: 'IVadd9', name: 'Borrowed subdominant add9', semitoneFromKey: 5, quality: 'add9' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
      ],
    },
  ];

  // Five jazz chord progressions built around the sus2 chord.
  const SUS_TWO_JAZZ_PROGRESSIONS = [
    {
      id: 'sus2-ii-V-I',
      name: 'ii–V–I with Sus2 Tonic',
      label: 'ii7 – V7 – Isus2',
      description: 'The familiar ii–V–I resolves onto Isus2 instead of a closed major 7th — an open, ambiguous landing with no 3rd to color it major or minor.',
      degrees: [
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        { roman: 'Isus2', name: 'Tonic sus2', semitoneFromKey: 0, quality: 'susTwo' },
      ],
    },
    {
      id: 'sus2-iv-color',
      name: 'IVsus2 Color Change',
      label: 'Imaj7 – IVsus2 – iii7 – vi7',
      description: 'A wide, airy sus2 stands in for the subdominant before the harmony falls back through iii7 to vi7.',
      degrees: [
        { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
        { roman: 'IVsus2', name: 'Subdominant sus2', semitoneFromKey: 5, quality: 'susTwo' },
        { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
        { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
      ],
    },
    {
      id: 'sus2-turnaround',
      name: 'Turnaround with Sus2 Submediant',
      label: 'iii7 – VIsus2 – ii7 – V7',
      description: 'A falling turnaround where the vi chord opens up into a sus2 instead of its usual minor 7th color.',
      degrees: [
        { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
        { roman: 'VIsus2', name: 'Submediant sus2', semitoneFromKey: 9, quality: 'susTwo' },
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
    {
      id: 'sus2-minor-key',
      name: 'Minor-Key Cadence with Sus2 IV',
      label: 'i7 – IVsus2 – V7 – i7',
      description: 'A minor-key cadence borrowing the parallel major’s IV, opened into a sus2 for an ambiguous lift before the dominant resolves home.',
      degrees: [
        { roman: 'i7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'minor7' },
        { roman: 'IVsus2', name: 'Borrowed subdominant sus2', semitoneFromKey: 5, quality: 'susTwo' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        { roman: 'i7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'minor7' },
      ],
    },
    {
      id: 'sus2-blues',
      name: 'Jazz Blues Turnaround with Sus2 Tonic',
      label: 'Isus2 – IV7 – ii7 – V7',
      description: 'A jazz-blues turnaround that opens on Isus2 instead of a plain major or dominant tonic, establishing an open color right away.',
      degrees: [
        { roman: 'Isus2', name: 'Tonic sus2', semitoneFromKey: 0, quality: 'susTwo' },
        { roman: 'IV7', name: 'Subdominant 7th', semitoneFromKey: 5, quality: 'dominant7' },
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
  ];

  // Five gospel chord progressions built around the sus2 chord.
  const SUS_TWO_GOSPEL_PROGRESSIONS = [
    {
      id: 'sus2-gospel-turnaround',
      name: 'Gospel Turnaround with Sus2 IV',
      label: 'I – vi – IVsus2 – V7',
      description: 'The classic gospel turnaround, swapping the usual IV triad for an IVsus2 color chord just before the closing V7.',
      degrees: [
        { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
        { roman: 'IVsus2', name: 'Subdominant sus2', semitoneFromKey: 5, quality: 'susTwo' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
    {
      id: 'sus2-amen-passing',
      name: 'Amen Vamp with Sus2 Passing Chord',
      label: 'I – IVsus2 – IV – iv – I',
      description: 'The classic plagal "Amen" vamp, decorated with IVsus2 as an open passing color chord right before the plain subdominant arrives.',
      degrees: [
        { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        { roman: 'IVsus2', name: 'Subdominant passing sus2', semitoneFromKey: 5, quality: 'susTwo' },
        { roman: 'IV', name: 'Subdominant', semitoneFromKey: 5, quality: 'major' },
        { roman: 'iv', name: 'Borrowed minor subdominant', semitoneFromKey: 5, quality: 'minor' },
        { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
      ],
    },
    {
      id: 'sus2-secondary',
      name: 'Secondary Sus2 Turnaround',
      label: 'I – IIIsus2 – vi – V7',
      description: 'A secondary chord built on the mediant, opened into a sus2 instead of the usual minor triad, on the way to vi.',
      degrees: [
        { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        { roman: 'IIIsus2', name: 'Mediant sus2', semitoneFromKey: 4, quality: 'susTwo' },
        { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
    {
      id: 'sus2-extended-turnaround',
      name: 'Extended Gospel Turnaround with Sus2 Color',
      label: 'iii7 – vi7 – ii7 – ♭VIsus2 – Isus2',
      description: 'A five-chord walk-back turnaround that closes with a chromatic ♭VIsus2 passing chord before landing on an open tonic sus2.',
      degrees: [
        { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
        { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: '♭VIsus2', name: 'Chromatic passing sus2', semitoneFromKey: 8, quality: 'susTwo' },
        { roman: 'Isus2', name: 'Tonic sus2', semitoneFromKey: 0, quality: 'susTwo' },
      ],
    },
    {
      id: 'sus2-minor-gospel-cadence',
      name: 'Minor Gospel Cadence with Sus2 IV',
      label: 'i – IVsus2 – V7 – i',
      description: 'A minor-key gospel cadence where the subdominant borrows the parallel major’s IV and opens into a sus2 before the dominant pulls home.',
      degrees: [
        { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
        { roman: 'IVsus2', name: 'Borrowed subdominant sus2', semitoneFromKey: 5, quality: 'susTwo' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
      ],
    },
  ];

  // Five jazz chord progressions built around the sus4 chord.
  const SUS_FOUR_JAZZ_PROGRESSIONS = [
    {
      id: 'sus4-ii-V-I',
      name: 'ii–V–I with Sus4 Tonic',
      label: 'ii7 – V7 – Isus4',
      description: 'The familiar ii–V–I resolves onto Isus4 — a taut, leaning landing that wants to settle down a step into a plain triad.',
      degrees: [
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        { roman: 'Isus4', name: 'Tonic sus4', semitoneFromKey: 0, quality: 'susFour' },
      ],
    },
    {
      id: 'sus4-iv-color',
      name: 'IVsus4 Color Change',
      label: 'Imaj7 – IVsus4 – iii7 – vi7',
      description: 'A taut sus4 stands in for the subdominant, leaning forward before the harmony falls back through iii7 to vi7.',
      degrees: [
        { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
        { roman: 'IVsus4', name: 'Subdominant sus4', semitoneFromKey: 5, quality: 'susFour' },
        { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
        { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
      ],
    },
    {
      id: 'sus4-turnaround',
      name: 'Turnaround with Sus4 Submediant',
      label: 'iii7 – VIsus4 – ii7 – V7',
      description: 'A falling turnaround where the vi chord leans into a sus4 instead of its usual minor 7th color.',
      degrees: [
        { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
        { roman: 'VIsus4', name: 'Submediant sus4', semitoneFromKey: 9, quality: 'susFour' },
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
    {
      id: 'sus4-minor-key',
      name: 'Minor-Key Cadence with Sus4 IV',
      label: 'i7 – IVsus4 – V7 – i7',
      description: 'A minor-key cadence borrowing the parallel major’s IV, tightened into a sus4 before the dominant resolves home.',
      degrees: [
        { roman: 'i7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'minor7' },
        { roman: 'IVsus4', name: 'Borrowed subdominant sus4', semitoneFromKey: 5, quality: 'susFour' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        { roman: 'i7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'minor7' },
      ],
    },
    {
      id: 'sus4-blues',
      name: 'Jazz Blues Turnaround with Sus4 Tonic',
      label: 'Isus4 – IV7 – ii7 – V7',
      description: 'A jazz-blues turnaround that opens on Isus4 instead of a plain major or dominant tonic, leaning forward right from the first bar.',
      degrees: [
        { roman: 'Isus4', name: 'Tonic sus4', semitoneFromKey: 0, quality: 'susFour' },
        { roman: 'IV7', name: 'Subdominant 7th', semitoneFromKey: 5, quality: 'dominant7' },
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
  ];

  // Five gospel chord progressions built around the sus4 chord.
  const SUS_FOUR_GOSPEL_PROGRESSIONS = [
    {
      id: 'sus4-gospel-turnaround',
      name: 'Gospel Turnaround with Sus4 V',
      label: 'I – vi – IV – Vsus4',
      description: 'The classic gospel turnaround, closing on Vsus4 instead of a plain V7 — the suspended 4th resolves down into the 3rd right as the tonic returns.',
      degrees: [
        { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
        { roman: 'IV', name: 'Subdominant', semitoneFromKey: 5, quality: 'major' },
        { roman: 'Vsus4', name: 'Dominant sus4', semitoneFromKey: 7, quality: 'susFour' },
      ],
    },
    {
      id: 'sus4-amen-passing',
      name: 'Amen Vamp with Sus4 Passing Chord',
      label: 'I – IVsus4 – IV – iv – I',
      description: 'The classic plagal "Amen" vamp, decorated with IVsus4 as a leaning passing chord right before the plain subdominant arrives.',
      degrees: [
        { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        { roman: 'IVsus4', name: 'Subdominant passing sus4', semitoneFromKey: 5, quality: 'susFour' },
        { roman: 'IV', name: 'Subdominant', semitoneFromKey: 5, quality: 'major' },
        { roman: 'iv', name: 'Borrowed minor subdominant', semitoneFromKey: 5, quality: 'minor' },
        { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
      ],
    },
    {
      id: 'sus4-secondary',
      name: 'Secondary Sus4 Turnaround',
      label: 'I – Vsus4 – vi – V7',
      description: 'A dominant chord suspended into sus4 before resolving down into vi, then the closing V7 pulls the whole progression back home.',
      degrees: [
        { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        { roman: 'Vsus4', name: 'Dominant passing sus4', semitoneFromKey: 7, quality: 'susFour' },
        { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
    {
      id: 'sus4-extended-turnaround',
      name: 'Extended Gospel Turnaround with Sus4 Color',
      label: 'iii7 – vi7 – ii7 – Vsus4 – I',
      description: 'A five-chord walk-back turnaround that tightens into a Vsus4 just before landing on the tonic, giving the cadence one extra beat of lean.',
      degrees: [
        { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
        { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'Vsus4', name: 'Dominant sus4', semitoneFromKey: 7, quality: 'susFour' },
        { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
      ],
    },
    {
      id: 'sus4-minor-gospel-cadence',
      name: 'Minor Gospel Cadence with Sus4 IV',
      label: 'i – IVsus4 – V7 – i',
      description: 'A minor-key gospel cadence where the subdominant borrows the parallel major’s IV and tightens into a sus4 before the dominant pulls home.',
      degrees: [
        { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
        { roman: 'IVsus4', name: 'Borrowed subdominant sus4', semitoneFromKey: 5, quality: 'susFour' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
      ],
    },
  ];

  // Five jazz chord progressions built around the dominant 7sus4 chord.
  const DOMINANT_SEVENTH_SUS_FOUR_JAZZ_PROGRESSIONS = [
    {
      id: '7sus4-ii-V-I',
      name: 'ii–V–I with 7sus4 Dominant',
      label: 'ii7 – V7sus4 – Imaj7',
      description: 'The familiar ii–V–I, but the dominant lingers as a V7sus4 before resolving to the tonic — a softer, less pointed pull than a plain V7.',
      degrees: [
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7sus4', name: 'Suspended dominant 7th', semitoneFromKey: 7, quality: 'dominantSeventhSusFour' },
        { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
      ],
    },
    {
      id: '7sus4-iv-color',
      name: 'IV7sus4 Color Change',
      label: 'Imaj7 – IV7sus4 – iii7 – vi7',
      description: 'A suspended dominant-quality chord colors the subdominant before the harmony falls back through iii7 to vi7.',
      degrees: [
        { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
        { roman: 'IV7sus4', name: 'Subdominant 7sus4', semitoneFromKey: 5, quality: 'dominantSeventhSusFour' },
        { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
        { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
      ],
    },
    {
      id: '7sus4-turnaround',
      name: 'Turnaround with 7sus4 Dominant',
      label: 'iii7 – vi7 – ii7 – V7sus4',
      description: 'A falling turnaround whose final dominant lingers as a 7sus4 instead of resolving straight to a plain V7, delaying the release by a beat.',
      degrees: [
        { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
        { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7sus4', name: 'Suspended dominant 7th', semitoneFromKey: 7, quality: 'dominantSeventhSusFour' },
      ],
    },
    {
      id: '7sus4-minor-key',
      name: 'Minor ii–V–i with 7sus4',
      label: 'iiø7 – V7sus4 – i7',
      description: 'The minor-key ii–V–i, softened by suspending the dominant into a 7sus4 before it resolves to the minor 7th tonic.',
      degrees: [
        { roman: 'iiø7', name: 'Supertonic half-diminished 7th', semitoneFromKey: 2, quality: 'halfDiminished7' },
        { roman: 'V7sus4', name: 'Suspended dominant 7th', semitoneFromKey: 7, quality: 'dominantSeventhSusFour' },
        { roman: 'i7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'minor7' },
      ],
    },
    {
      id: '7sus4-blues',
      name: 'Jazz Blues Turnaround with 7sus4 Tag',
      label: 'I7 – IV7 – ii7 – V7sus4',
      description: 'A jazz-blues turnaround whose closing tag suspends the dominant into a 7sus4, holding the tension one beat longer before the top of the tune.',
      degrees: [
        { roman: 'I7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'dominant7' },
        { roman: 'IV7', name: 'Subdominant 7th', semitoneFromKey: 5, quality: 'dominant7' },
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7sus4', name: 'Suspended dominant 7th', semitoneFromKey: 7, quality: 'dominantSeventhSusFour' },
      ],
    },
  ];

  // Five gospel chord progressions built around the dominant 7sus4 chord.
  const DOMINANT_SEVENTH_SUS_FOUR_GOSPEL_PROGRESSIONS = [
    {
      id: '7sus4-gospel-turnaround',
      name: 'Gospel Turnaround with 7sus4 V',
      label: 'I – vi – IV – V7sus4',
      description: 'The classic gospel turnaround, closing on a suspended V7sus4 that lingers before finally resolving down to the tonic.',
      degrees: [
        { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
        { roman: 'IV', name: 'Subdominant', semitoneFromKey: 5, quality: 'major' },
        { roman: 'V7sus4', name: 'Suspended dominant 7th', semitoneFromKey: 7, quality: 'dominantSeventhSusFour' },
      ],
    },
    {
      id: '7sus4-amen-passing',
      name: 'Vamp with 7sus4–V7 Release',
      label: 'I – IV – V7sus4 – V7 – I',
      description: 'A gospel vamp move: the dominant arrives first as a suspended 7sus4, then "releases" down into a plain V7 right before the tonic returns — a classic build-and-release gesture.',
      degrees: [
        { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        { roman: 'IV', name: 'Subdominant', semitoneFromKey: 5, quality: 'major' },
        { roman: 'V7sus4', name: 'Suspended dominant 7th', semitoneFromKey: 7, quality: 'dominantSeventhSusFour' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
      ],
    },
    {
      id: '7sus4-secondary',
      name: 'Secondary 7sus4 Turnaround',
      label: 'I – III7sus4 – vi – V7',
      description: 'A secondary dominant built on the mediant, suspended into a 7sus4 for extra lift, resolving into vi before the closing V7.',
      degrees: [
        { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        { roman: 'III7sus4', name: 'Mediant 7sus4', semitoneFromKey: 4, quality: 'dominantSeventhSusFour' },
        { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
    {
      id: '7sus4-extended-turnaround',
      name: 'Extended Gospel Turnaround with 7sus4 Color',
      label: 'iii7 – vi7 – ii7 – V7sus4 – Imaj7',
      description: 'A five-chord walk-back turnaround whose penultimate dominant lingers as a 7sus4 before landing on a lush tonic major 7th.',
      degrees: [
        { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
        { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7sus4', name: 'Suspended dominant 7th', semitoneFromKey: 7, quality: 'dominantSeventhSusFour' },
        { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
      ],
    },
    {
      id: '7sus4-minor-gospel-cadence',
      name: 'Minor Gospel Cadence with 7sus4 V',
      label: 'i – iv – V7sus4 – i',
      description: 'A minor-key gospel cadence whose dominant lingers as a suspended 7sus4 before finally pulling back home to the minor tonic.',
      degrees: [
        { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
        { roman: 'iv', name: 'Subdominant', semitoneFromKey: 5, quality: 'minor' },
        { roman: 'V7sus4', name: 'Suspended dominant 7th', semitoneFromKey: 7, quality: 'dominantSeventhSusFour' },
        { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
      ],
    },
  ];

  // Five jazz chord progressions built around the 6/9 chord.
  const SIX_NINE_JAZZ_PROGRESSIONS = [
    {
      id: 'six-nine-ii-V-I',
      name: 'ii–V–I with 6/9 Tonic',
      label: 'ii7 – V7 – I6/9',
      description: 'The familiar ii–V–I resolves onto I6/9 instead of a plain major 7th — a rich, full "at rest" color with no 7th at all to pull anywhere.',
      degrees: [
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        { roman: 'I6/9', name: 'Tonic 6/9', semitoneFromKey: 0, quality: 'sixNine' },
      ],
    },
    {
      id: 'six-nine-iv-color',
      name: 'IV6/9 Color Change',
      label: 'Imaj7 – IV6/9 – iii7 – vi7',
      description: 'A lush 6/9 stands in for the subdominant, adding both a 6th and a 9th before the harmony falls back through iii7 to vi7.',
      degrees: [
        { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
        { roman: 'IV6/9', name: 'Subdominant 6/9', semitoneFromKey: 5, quality: 'sixNine' },
        { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
        { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
      ],
    },
    {
      id: 'six-nine-turnaround',
      name: 'Turnaround with 6/9 Submediant',
      label: 'iii7 – VI6/9 – ii7 – V7',
      description: 'A falling turnaround where the vi chord blooms into a full 6/9 instead of its usual minor 7th color.',
      degrees: [
        { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
        { roman: 'VI6/9', name: 'Submediant 6/9', semitoneFromKey: 9, quality: 'sixNine' },
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
    {
      id: 'six-nine-minor-key',
      name: 'Minor-Key Cadence with 6/9 IV',
      label: 'i7 – IV6/9 – V7 – i7',
      description: 'A minor-key cadence borrowing the parallel major’s IV, colored as a full 6/9 for extra richness before the dominant resolves home.',
      degrees: [
        { roman: 'i7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'minor7' },
        { roman: 'IV6/9', name: 'Borrowed subdominant 6/9', semitoneFromKey: 5, quality: 'sixNine' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        { roman: 'i7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'minor7' },
      ],
    },
    {
      id: 'six-nine-blues',
      name: 'Jazz Blues Turnaround with 6/9 Tonic',
      label: 'I6/9 – IV7 – ii7 – V7',
      description: 'A jazz-blues turnaround that opens on I6/9 instead of a plain major or dominant tonic, establishing a rich, settled color right away.',
      degrees: [
        { roman: 'I6/9', name: 'Tonic 6/9', semitoneFromKey: 0, quality: 'sixNine' },
        { roman: 'IV7', name: 'Subdominant 7th', semitoneFromKey: 5, quality: 'dominant7' },
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
  ];

  // Five gospel chord progressions built around the 6/9 chord.
  const SIX_NINE_GOSPEL_PROGRESSIONS = [
    {
      id: 'six-nine-gospel-turnaround',
      name: 'Gospel Turnaround with 6/9 IV',
      label: 'I – vi – IV6/9 – V7',
      description: 'The classic gospel turnaround, swapping the usual IV triad for a lush IV6/9 color chord just before the closing V7.',
      degrees: [
        { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
        { roman: 'IV6/9', name: 'Subdominant 6/9', semitoneFromKey: 5, quality: 'sixNine' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
    {
      id: 'six-nine-amen-passing',
      name: 'Amen Vamp with 6/9 Landing',
      label: 'I – IV – iv – I6/9',
      description: 'The classic plagal "Amen" vamp, but the final tonic blooms into a full I6/9 instead of a plain triad — a warm, richly colored landing.',
      degrees: [
        { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        { roman: 'IV', name: 'Subdominant', semitoneFromKey: 5, quality: 'major' },
        { roman: 'iv', name: 'Borrowed minor subdominant', semitoneFromKey: 5, quality: 'minor' },
        { roman: 'I6/9', name: 'Tonic 6/9', semitoneFromKey: 0, quality: 'sixNine' },
      ],
    },
    {
      id: 'six-nine-secondary',
      name: 'Secondary 6/9 Turnaround',
      label: 'I – III6/9 – vi – V7',
      description: 'A secondary chord built on the mediant, colored as a 6/9 instead of the usual minor triad, resolving into vi before the closing V7.',
      degrees: [
        { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        { roman: 'III6/9', name: 'Mediant 6/9', semitoneFromKey: 4, quality: 'sixNine' },
        { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
    {
      id: 'six-nine-extended-turnaround',
      name: 'Extended Gospel Turnaround with 6/9 Color',
      label: 'iii7 – vi7 – ii7 – ♭VI6/9 – I6/9',
      description: 'A five-chord walk-back turnaround that closes with a chromatic ♭VI6/9 passing chord just before landing on a full, rich tonic 6/9.',
      degrees: [
        { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
        { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: '♭VI6/9', name: 'Chromatic passing 6/9', semitoneFromKey: 8, quality: 'sixNine' },
        { roman: 'I6/9', name: 'Tonic 6/9', semitoneFromKey: 0, quality: 'sixNine' },
      ],
    },
    {
      id: 'six-nine-minor-gospel-cadence',
      name: 'Minor Gospel Cadence with 6/9 IV',
      label: 'i – IV6/9 – V7 – i',
      description: 'A minor-key gospel cadence where the subdominant borrows the parallel major’s IV and blooms into a 6/9, giving a rich lift before the dominant pulls home.',
      degrees: [
        { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
        { roman: 'IV6/9', name: 'Borrowed subdominant 6/9', semitoneFromKey: 5, quality: 'sixNine' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
      ],
    },
  ];

  return {
    keys,
    qualities: QUALITIES,
    qualityOrder: QUALITY_ORDER,
    inversionNames: INVERSION_NAMES,
    noteNameFor,
    buildChordTones,
    invert,
    inversionLabel,
    buildProgressionChords,
    jazzProgressions: JAZZ_PROGRESSIONS,
    gospelProgressions: GOSPEL_PROGRESSIONS,
    sixthJazzProgressions: SIXTH_JAZZ_PROGRESSIONS,
    sixthGospelProgressions: SIXTH_GOSPEL_PROGRESSIONS,
    minorSixthJazzProgressions: MINOR_SIXTH_JAZZ_PROGRESSIONS,
    minorSixthGospelProgressions: MINOR_SIXTH_GOSPEL_PROGRESSIONS,
    augmentedSeventhJazzProgressions: AUGMENTED_SEVENTH_JAZZ_PROGRESSIONS,
    augmentedSeventhGospelProgressions: AUGMENTED_SEVENTH_GOSPEL_PROGRESSIONS,
    majorSeventhFlatFiveJazzProgressions: MAJOR_SEVENTH_FLAT_FIVE_JAZZ_PROGRESSIONS,
    majorSeventhFlatFiveGospelProgressions: MAJOR_SEVENTH_FLAT_FIVE_GOSPEL_PROGRESSIONS,
    majorSeventhSharpElevenJazzProgressions: MAJOR_SEVENTH_SHARP_ELEVEN_JAZZ_PROGRESSIONS,
    majorSeventhSharpElevenGospelProgressions: MAJOR_SEVENTH_SHARP_ELEVEN_GOSPEL_PROGRESSIONS,
    add9JazzProgressions: ADD9_JAZZ_PROGRESSIONS,
    add9GospelProgressions: ADD9_GOSPEL_PROGRESSIONS,
    susTwoJazzProgressions: SUS_TWO_JAZZ_PROGRESSIONS,
    susTwoGospelProgressions: SUS_TWO_GOSPEL_PROGRESSIONS,
    susFourJazzProgressions: SUS_FOUR_JAZZ_PROGRESSIONS,
    susFourGospelProgressions: SUS_FOUR_GOSPEL_PROGRESSIONS,
    dominantSeventhSusFourJazzProgressions: DOMINANT_SEVENTH_SUS_FOUR_JAZZ_PROGRESSIONS,
    dominantSeventhSusFourGospelProgressions: DOMINANT_SEVENTH_SUS_FOUR_GOSPEL_PROGRESSIONS,
    sixNineJazzProgressions: SIX_NINE_JAZZ_PROGRESSIONS,
    sixNineGospelProgressions: SIX_NINE_GOSPEL_PROGRESSIONS,
  };
})();
