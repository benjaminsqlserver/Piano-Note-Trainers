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
