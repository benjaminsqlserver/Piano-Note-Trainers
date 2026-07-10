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
