// tests.js
// The music theory this whole app rests on, checked against first principles.
//
// The interval tables in js/chords/ are the crown jewels: a single wrong
// number there silently teaches a wrong chord in all 12 keys, and nothing
// else in the app would notice. These tests re-derive what each chord should
// contain rather than restating the tables, so a typo in a table fails here
// instead of reaching a learner.
//
// No build step, no package manager: open tests.html in a browser.

const Test = (() => {
  const results = [];
  let currentSuite = '(none)';

  function suite(name) { currentSuite = name; }

  function check(name, fn) {
    try {
      fn();
      results.push({ suite: currentSuite, name, passed: true });
    } catch (error) {
      results.push({ suite: currentSuite, name, passed: false, message: error.message });
    }
  }

  function fail(message) { throw new Error(message); }

  function equal(actual, expected, context) {
    const a = JSON.stringify(actual);
    const e = JSON.stringify(expected);
    if (a !== e) fail(`${context ? context + ': ' : ''}expected ${e}, got ${a}`);
  }

  function ok(condition, message) {
    if (!condition) fail(message);
  }

  return { suite, check, equal, ok, fail, results };
})();

const { suite, check, equal, ok, fail } = Test;

// --------------------------------------------------------------- core tables

const SHARP = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const FLAT = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

suite('music-theory-core');

check('the 12 keys are chromatic, in order, starting on C', () => {
  equal(MusicTheory.KEYS.map((k) => k.name), SHARP);
  MusicTheory.KEYS.forEach((k, i) => equal(k.semitoneFromC, i, `key ${k.name}`));
});

check('every key knows its own flat spelling', () => {
  equal(MusicTheory.KEYS.map((k) => k.flatName), FLAT);
});

check('midiNoteForOctave puts middle C at 60', () => {
  equal(MusicTheory.KEYS[0].midiNoteForOctave(4), 60);
  // A4 is the 440 Hz tuning reference: MIDI 69.
  equal(MusicTheory.KEYS[9].midiNoteForOctave(4), 69);
  MusicTheory.KEYS.forEach((k) => {
    equal(k.midiNoteForOctave(5) - k.midiNoteForOctave(4), 12, `${k.name} octave span`);
  });
});

check('noteNameFor wraps in both directions and honours the spelling asked for', () => {
  for (let s = -36; s <= 36; s++) {
    const pc = ((s % 12) + 12) % 12;
    equal(MusicTheory.noteNameFor(s, false), SHARP[pc], `sharp name for ${s}`);
    equal(MusicTheory.noteNameFor(s, true), FLAT[pc], `flat name for ${s}`);
  }
});

check('the circle of fourths rises a perfect 4th each step and closes back on C', () => {
  const circle = MusicTheory.CIRCLE_OF_FOURTHS;
  equal(circle.length, 12);
  equal(circle[0].semitoneFromC, 0, 'starts on C');
  for (let i = 1; i < circle.length; i++) {
    const step = (circle[i].semitoneFromC - circle[i - 1].semitoneFromC + 12) % 12;
    equal(step, 5, `step ${i} (${circle[i - 1].name} -> ${circle[i].name})`);
  }
  // Wrapping past the last entry must land back on the first.
  equal((circle[11].semitoneFromC + 5) % 12, circle[0].semitoneFromC, 'closes the circle');
});

check('the circle visits all 12 keys exactly once', () => {
  const seen = new Set(MusicTheory.CIRCLE_OF_FOURTHS.map((c) => c.semitoneFromC));
  equal(seen.size, 12);
});

check('the circle is spelled with flats, showing Gb/F# both ways', () => {
  const names = MusicTheory.CIRCLE_OF_FOURTHS.map((c) => c.name);
  ok(names.includes('Gb (F#)'), 'the enharmonic link should be labelled both ways');
  names.filter((n) => n !== 'Gb (F#)').forEach((n) => {
    ok(!n.includes('#'), `${n} should use its flat spelling on the circle`);
  });
});

// ------------------------------------------------------------ chord services

// Every chord lesson, with the intervals re-stated here independently of
// js/chords/. A mismatch means one of the two is wrong — which is the point.
const EXPECTED_CHORDS = [
  ['MajorChordService', [0, 4, 7], 'major triad'],
  ['MinorChordService', [0, 3, 7], 'minor triad'],
  ['AugmentedChordService', [0, 4, 8], 'augmented triad'],
  ['DiminishedChordService', [0, 3, 6], 'diminished triad'],
  ['PowerChordService', [0, 7], 'power chord'],
  ['SplitThirdBluesChordService', [0, 3, 4, 7, 10], 'split-third blues chord'],
  ['DominantSeventhChordService', [0, 4, 7, 10], 'dominant 7th'],
  ['DiminishedSeventhChordService', [0, 3, 6, 9], 'diminished 7th'],
  ['MinorSeventhChordService', [0, 3, 7, 10], 'minor 7th'],
  ['MajorSeventhChordService', [0, 4, 7, 11], 'major 7th'],
  ['HalfDiminishedSeventhChordService', [0, 3, 6, 10], 'half-diminished 7th'],
  ['AugmentedSeventhChordService', [0, 4, 8, 10], 'augmented 7th'],
  ['DiminishedMajorSeventhChordService', [0, 3, 6, 11], 'diminished major 7th'],
  ['MinorMajorSeventhChordService', [0, 3, 7, 11], 'minor-major 7th'],
  ['SixthChordService', [0, 4, 7, 9], '6th'],
  ['MinorSixthChordService', [0, 3, 7, 9], 'minor 6th'],
  ['SixNineChordService', [0, 4, 7, 9, 14], '6/9'],
  ['MinorSixNineChordService', [0, 3, 7, 9, 14], 'minor 6/9'],
  ['Add9ChordService', [0, 4, 7, 14], 'add9'],
  ['Add11ChordService', [0, 4, 5, 7], 'add11'],
  ['SusTwoChordService', [0, 2, 7], 'sus2'],
  ['SusFourChordService', [0, 5, 7], 'sus4'],
  ['DominantSeventhSusFourChordService', [0, 5, 7, 10], 'dominant 7sus4'],
  ['DominantNineSusFourChordService', [0, 5, 7, 10, 14], 'dominant 9sus4'],
  ['DominantThirteenSusFourChordService', [0, 5, 7, 10, 14, 21], 'dominant 13sus4'],
  ['MajorSeventhSusTwoChordService', [0, 2, 7, 11], 'major 7sus2'],
  ['MajorSeventhSusFourChordService', [0, 5, 7, 11], 'major 7sus4'],
  ['DominantNinthChordService', [0, 4, 7, 10, 14], 'dominant 9th'],
  ['DominantEleventhChordService', [0, 4, 7, 10, 14, 17], 'dominant 11th'],
  ['DominantThirteenthChordService', [0, 4, 7, 10, 14, 17, 21], 'dominant 13th'],
  ['MinorNinthChordService', [0, 3, 7, 10, 14], 'minor 9th'],
  ['MinorEleventhChordService', [0, 3, 7, 10, 14, 17], 'minor 11th'],
  ['MinorThirteenthChordService', [0, 3, 7, 10, 14, 17, 21], 'minor 13th'],
  ['MinorMajorNinthChordService', [0, 3, 7, 11, 14], 'minor-major 9th'],
  ['MajorNinthChordService', [0, 4, 7, 11, 14], 'major 9th'],
  ['MajorThirteenthChordService', [0, 4, 7, 11, 14, 21], 'major 13th'],
  ['DominantSeventhFlatNineChordService', [0, 4, 7, 10, 13], 'dominant 7b9'],
  ['DominantSeventhSharpNineChordService', [0, 4, 7, 10, 15], 'dominant 7#9'],
  ['DominantSeventhFlatFiveChordService', [0, 4, 6, 10], 'dominant 7b5'],
  ['DominantSeventhSharpElevenChordService', [0, 4, 7, 10, 18], 'dominant 7#11'],
  ['DominantSeventhFlatThirteenChordService', [0, 4, 7, 10, 20], 'dominant 7b13'],
  ['DominantNinthSharpElevenChordService', [0, 4, 7, 10, 14, 18], 'dominant 9#11'],
  ['MajorSeventhFlatFiveChordService', [0, 4, 6, 11], 'major 7b5'],
  ['MajorSeventhSharpElevenChordService', [0, 4, 7, 11, 18], 'major 7#11'],
  ['MajorSeventhSharpFiveChordService', [0, 4, 8, 11], 'major 7#5'],
  ['MinorSeventhFlatNineChordService', [0, 3, 7, 10, 13], 'minor 7b9'],
  ['HalfDiminishedEleventhChordService', [0, 3, 6, 10, 14, 17], 'half-diminished 11th'],
  ['QuartalChordService', [0, 5, 10, 15, 19], 'quartal'],
  ['ToneClusterChordService', [0, 1, 2], 'tone cluster'],
  // Measured from the tonic you pick, not from the chord's own root: the
  // Neapolitan is a major triad built a half step above the tonic.
  ['NeapolitanChordService', [1, 5, 8], 'Neapolitan (a major triad on b2)'],
  ['PolychordService', [0, 2, 4, 6, 7, 9, 10], 'polychord'],
];

suite('chord intervals');

for (const [serviceName, intervals, label] of EXPECTED_CHORDS) {
  check(`${label} is ${intervals.join('-')}`, () => {
    const service = window[serviceName];
    ok(service, `${serviceName} is not loaded`);
    equal(service.intervalsFromRoot, intervals);
  });
}

suite('chord construction');

/** Every chord service on the page, whichever lessons were loaded. */
function loadedChordServices() {
  return Object.keys(window)
    .filter((k) => /ChordService$|^PolychordService$/.test(k))
    .map((k) => [k, window[k]])
    .filter(([, s]) => s && Array.isArray(s.intervalsFromRoot));
}

function builderFor(service) {
  return service.buildChord || service.buildTriad;
}

check('every chord has one label and one explanation per tone', () => {
  for (const [name, service] of loadedChordServices()) {
    equal(service.chordToneLabels.length, service.intervalsFromRoot.length, `${name} labels`);
    const tones = builderFor(service)(MusicTheory.KEYS[0], 4, false);
    tones.forEach((t, i) => {
      ok(t.role, `${name} tone ${i} has no role`);
      ok(t.explanation, `${name} tone ${i} has no explanation`);
    });
  }
});

check('intervals ascend, and start on the note the lesson measures from', () => {
  for (const [name, service] of loadedChordServices()) {
    const iv = service.intervalsFromRoot;
    // The Neapolitan is the one chord measured from the tonic rather than
    // from its own root, so it legitimately starts a semitone up.
    const expectedFirst = name === 'NeapolitanChordService' ? 1 : 0;
    equal(iv[0], expectedFirst, `${name} first interval`);
    for (let i = 1; i < iv.length; i++) {
      ok(iv[i] > iv[i - 1], `${name}: interval ${iv[i]} does not rise above ${iv[i - 1]}`);
    }
  }
});

check('built MIDI notes are exactly root + interval, in every key and octave', () => {
  for (const [name, service] of loadedChordServices()) {
    const build = builderFor(service);
    for (const key of MusicTheory.KEYS) {
      for (const octave of [0, 2, 4, 6, 8]) {
        const root = key.midiNoteForOctave(octave);
        const tones = build(key, octave, false);
        equal(tones.map((t) => t.midiNote), service.intervalsFromRoot.map((s) => root + s), `${name} in ${key.name}${octave}`);
      }
    }
  }
});

check('note names match the pitch classes the MIDI numbers imply', () => {
  for (const [name, service] of loadedChordServices()) {
    const build = builderFor(service);
    for (const key of MusicTheory.KEYS) {
      for (const preferFlats of [false, true]) {
        for (const tone of build(key, 4, preferFlats)) {
          const expected = (preferFlats ? FLAT : SHARP)[tone.midiNote % 12];
          equal(tone.noteName, expected, `${name} in ${key.name}, tone ${tone.role}`);
        }
      }
    }
  }
});

check('chordMidiNotes agrees with the tones the Learn tab shows', () => {
  for (const [name, service] of loadedChordServices()) {
    const midiNotes = service.chordMidiNotes || service.triadMidiNotes;
    const build = builderFor(service);
    for (const key of MusicTheory.KEYS) {
      equal(midiNotes(key, 4), build(key, 4, false).map((t) => t.midiNote), `${name} in ${key.name}`);
    }
  }
});

check('transposing a chord by one key shifts every note by one semitone', () => {
  for (const [name, service] of loadedChordServices()) {
    const build = builderFor(service);
    for (let i = 1; i < MusicTheory.KEYS.length; i++) {
      const lower = build(MusicTheory.KEYS[i - 1], 4, false).map((t) => t.midiNote);
      const upper = build(MusicTheory.KEYS[i], 4, false).map((t) => t.midiNote);
      equal(upper, lower.map((n) => n + 1), `${name}: ${MusicTheory.KEYS[i].name} vs ${MusicTheory.KEYS[i - 1].name}`);
    }
  }
});

// -------------------------------------------------------- inversions service

suite('inversions');

check('inverting moves the lowest note up an octave and keeps the pitch classes', () => {
  const tones = InversionService.buildChordTones(MusicTheory.KEYS[0], 4, 'major', false);
  equal(tones.map((t) => t.midiNote), [60, 64, 67], 'C major, root position');
  equal(InversionService.invert(tones, 1).tones.map((t) => t.midiNote), [64, 67, 72], '1st inversion');
  equal(InversionService.invert(tones, 2).tones.map((t) => t.midiNote), [67, 72, 76], '2nd inversion');
  equal(InversionService.invert(tones, 1).bassNoteName, 'E', '1st inversion bass');
});

check('every inversion preserves the chord as a set of pitch classes', () => {
  for (const quality of Object.keys(InversionService.qualities)) {
    for (const key of MusicTheory.KEYS) {
      const tones = InversionService.buildChordTones(key, 4, quality, false);
      const expected = [...new Set(tones.map((t) => t.midiNote % 12))].sort((a, b) => a - b);
      for (let i = 0; i < tones.length; i++) {
        const inverted = InversionService.invert(tones, i).tones;
        const actual = [...new Set(inverted.map((t) => t.midiNote % 12))].sort((a, b) => a - b);
        equal(actual, expected, `${quality} in ${key.name}, inversion ${i}`);
        // The bass note is what an inversion is named for.
        equal(inverted[0].midiNote % 12, tones[i % tones.length].midiNote % 12, `${quality} in ${key.name}: bass of inversion ${i}`);
      }
    }
  }
});

check('inverted chords stay in ascending order', () => {
  for (const quality of Object.keys(InversionService.qualities)) {
    const tones = InversionService.buildChordTones(MusicTheory.KEYS[0], 4, quality, false);
    for (let i = 0; i < tones.length; i++) {
      const notes = InversionService.invert(tones, i).tones.map((t) => t.midiNote);
      for (let n = 1; n < notes.length; n++) {
        ok(notes[n] > notes[n - 1], `${quality} inversion ${i}: ${notes.join(',')} is not ascending`);
      }
    }
  }
});

check('every quality the inversions lesson knows agrees with its own chord lesson', () => {
  // The two describe the same chords by different routes, so they must match.
  const BY_QUALITY = {
    major: 'MajorChordService',
    minor: 'MinorChordService',
    augmented: 'AugmentedChordService',
    diminished: 'DiminishedChordService',
    dominant7: 'DominantSeventhChordService',
    diminished7: 'DiminishedSeventhChordService',
    minor7: 'MinorSeventhChordService',
    major7: 'MajorSeventhChordService',
    halfDiminished7: 'HalfDiminishedSeventhChordService',
    sixth: 'SixthChordService',
    minorSixth: 'MinorSixthChordService',
  };
  let compared = 0;
  for (const [quality, serviceName] of Object.entries(BY_QUALITY)) {
    const quality_ = InversionService.qualities[quality];
    const service = window[serviceName];
    if (!quality_ || !service) continue;
    equal(quality_.intervals, service.intervalsFromRoot, `${quality} vs ${serviceName}`);
    compared++;
  }
  ok(compared > 0, 'no qualities were available to compare');
});

// ------------------------------------------------------------- progressions

suite('progressions');

check('every registered progression set is well formed', () => {
  const sets = Object.keys(InversionService).filter((k) => /(Jazz|Gospel)Progressions$/.test(k));
  ok(sets.length > 0, 'no progression sets are loaded');
  for (const setName of sets) {
    const progressions = InversionService[setName];
    ok(Array.isArray(progressions) && progressions.length > 0, `${setName} is empty`);
    for (const prog of progressions) {
      ok(prog.id, `${setName}: a progression has no id`);
      ok(prog.name && prog.label && prog.description, `${setName}/${prog.id} is missing its labels`);
      ok(Array.isArray(prog.degrees) && prog.degrees.length > 0, `${setName}/${prog.id} has no degrees`);
      for (const degree of prog.degrees) {
        ok(degree.roman && degree.name, `${setName}/${prog.id}: a degree is unlabelled`);
        ok(Number.isInteger(degree.semitoneFromKey), `${setName}/${prog.id}/${degree.roman}: semitoneFromKey must be a whole number`);
        ok(degree.semitoneFromKey >= 0 && degree.semitoneFromKey < 12, `${setName}/${prog.id}/${degree.roman}: semitoneFromKey ${degree.semitoneFromKey} is outside one octave`);
        if (degree.quality) {
          ok(InversionService.qualities[degree.quality], `${setName}/${prog.id}/${degree.roman}: unknown quality "${degree.quality}"`);
        }
      }
    }
  }
});

check('progression ids are unique within each set', () => {
  for (const setName of Object.keys(InversionService).filter((k) => /(Jazz|Gospel)Progressions$/.test(k))) {
    const ids = InversionService[setName].map((p) => p.id);
    equal(ids.length, new Set(ids).size, `${setName} has duplicate progression ids`);
  }
});

check('a progression builds real chords, transposed correctly into every key', () => {
  for (const setName of Object.keys(InversionService).filter((k) => /(Jazz|Gospel)Progressions$/.test(k))) {
    for (const prog of InversionService[setName]) {
      const inC = InversionService.buildProgressionChords(prog, MusicTheory.KEYS[0], 4, 0, false);
      equal(inC.length, prog.degrees.length, `${setName}/${prog.id} chord count`);
      for (const key of MusicTheory.KEYS) {
        const built = InversionService.buildProgressionChords(prog, key, 4, 0, false);
        built.forEach((chord, i) => {
          ok(chord.tones.length > 0, `${setName}/${prog.id} chord ${i} is empty`);
          // In root position the lowest tone should sit exactly the degree's
          // distance above the key, offset by wherever that quality starts
          // measuring from (the Neapolitan measures from the tonic, so its
          // own first interval is a semitone up).
          const degree = prog.degrees[i];
          const offset = InversionService.qualities[degree.quality].intervals[0];
          const rootPc = chord.tones[0].midiNote % 12;
          const expectedPc = (key.semitoneFromC + degree.semitoneFromKey + offset) % 12;
          equal(rootPc, expectedPc, `${setName}/${prog.id} chord ${i} in ${key.name}`);
        });
      }
    }
  }
});

// -------------------------------------------------------------- scales

suite('scales');

check('the major scale is the tone-tone-semitone pattern, in every key', () => {
  if (typeof MajorScaleService === 'undefined') return;
  const STEPS = [2, 2, 1, 2, 2, 2, 1];
  for (const key of MajorScaleService.keys) {
    const notes = MajorScaleService.buildAscending(key, 4, 1).map((n) => n.midiNote);
    equal(notes.length, 8, `${key.name} should span an octave`);
    for (let i = 1; i < notes.length; i++) {
      equal(notes[i] - notes[i - 1], STEPS[i - 1], `${key.name} step ${i}`);
    }
  }
});

check('descending a scale is the ascending one reversed', () => {
  for (const name of ['MajorScaleService', 'DorianScaleService', 'PhrygianScaleService']) {
    const service = window[name];
    if (!service) continue;
    for (const key of service.keys) {
      const up = service.buildAscending(key, 4, 1).map((n) => n.midiNote);
      const down = service.buildDescending(key, 4, 1).map((n) => n.midiNote);
      equal(down, [...up].reverse(), `${name} in ${key.name}`);
    }
  }
});

check('white keys are the seven naturals and nothing else', () => {
  if (typeof WhiteKeyService === 'undefined') return;
  equal(WhiteKeyService.notes.map((n) => n.letter), ['C', 'D', 'E', 'F', 'G', 'A', 'B']);
  equal(WhiteKeyService.notes.map((n) => n.semitoneFromC), [0, 2, 4, 5, 7, 9, 11]);
});

check('white-key sequences never land on a black key', () => {
  if (typeof WhiteKeyService === 'undefined') return;
  const BLACK = [1, 3, 6, 8, 10];
  for (const note of WhiteKeyService.notes) {
    for (const step of WhiteKeyService.buildAscendingThenDescending(note, 4, 2)) {
      ok(!BLACK.includes(step.midiNote % 12), `${note.letter}: ${step.midiNote} is a black key`);
    }
  }
});
