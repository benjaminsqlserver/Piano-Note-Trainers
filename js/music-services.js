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
