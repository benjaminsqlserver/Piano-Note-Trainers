// chord-trainer.js
// The page logic every chord lesson shares.
//
// All 52 chord lessons present the same thing: a Learn tab that walks up the
// chord one tone at a time, an Exercise 1 that plays it around the circle of
// fourths in all 12 keys, and then either two progression-picker tabs (the
// jazz/gospel sets in js/progressions/) or, for the nine oldest lessons, a
// hand-written progression of their own. Only the chord itself and how it is
// spelled change between them, so a lesson's page script is a call to
// setupChordTrainer() with those differences and nothing else.
//
// Expects audio-engine.js, piano-keyboard.js, tabs.js, this lesson's chord
// service, and — when the lesson has progression-picker tabs —
// inversion-service.js, the lesson's progressions file, and
// progression-picker.js to already be loaded as plain scripts before this one.

/**
 * Wires up a chord lesson page.
 *
 * A chord is named by appending a suffix to its root note's name, but lessons
 * differ in how: some attach a symbol (C + "add11"), some read as words
 * (C + " augmented"), and the Learn tab often spells the name out more fully
 * than the tables do (C7 in a table, "C7 (dominant 7th)" while playing). So
 * both suffixes are given literally, leading space and all, rather than being
 * assembled from parts that would only fit some of the lessons.
 *
 * config:
 *   service      {object} the lesson's chord service (from js/chords/)
 *   learnSuffix  {string} appended to the root in the Learn tab's now-playing
 *                         readout, e.g. ' add11', '7 (dominant 7th)'
 *   tableSuffix  {string} appended to the root in the reference tables,
 *                         e.g. 'add11', '7', ' augmented'
 *   progressions {string} base name of this lesson's registered progression
 *                         sets, e.g. 'add11' for InversionService.add11Jazz-
 *                         Progressions; omit if the lesson has no picker tabs
 *   chordProgression {object} for the nine lessons carrying their own
 *                         progression exercise; `{ notesColumn: 'perNote' }`
 *                         gives the triads' one-column-per-note table,
 *                         `{ notesColumn: 'joined' }` the 7ths' single Notes
 *                         column. Omit for every other lesson.
 */
function setupChordTrainer(config) {
  const service = config.service;
  const learnSuffix = config.learnSuffix;
  const tableSuffix = config.tableSuffix;
  const chordKeys = service.keys; // 12 keys, chromatic order, sharp spellings
  const toneCount = service.intervalsFromRoot.length;

  // Triad lessons name these builders after triads; every later lesson calls
  // them chords. Same functions either way.
  const buildChord = service.buildChord || service.buildTriad;

  initTabs();

  const midi = new AudioEngine();

  /** Plays every note of a chord at (roughly) the same instant, as a chord. */
  function playChord(deviceId, midiNotes, durationMs, velocity = 100) {
    midiNotes.forEach((n) => midi.playNote(deviceId, n, durationMs, velocity));
  }

  function wait(ms) { return new Promise((r) => setTimeout(r, ms)); }

  /** How this chord is written in the reference tables, e.g. "Cadd11". */
  function nameChord(rootName) {
    return `${rootName}${tableSuffix}`;
  }

  function noteCells(tones) {
    return tones.map((t) => `<td>${t.noteName}</td>`).join('');
  }

  // ================================================================== LEARN

  const lc = {
    root: document.getElementById('lc-root'),
    output: document.getElementById('lc-output'),
    step: document.getElementById('lc-step'),
    restart: document.getElementById('lc-restart'),
    full: document.getElementById('lc-full'),
    stepLabel: document.getElementById('lc-step-label'),
    currentNote: document.getElementById('lc-current-note'),
    currentExplain: document.getElementById('lc-current-explain'),
    keyboard: document.getElementById('lc-keyboard'),
    tableBody: document.getElementById('lc-table-body'),
    allTableBody: document.getElementById('lc-all-table-body'),
  };

  chordKeys.forEach((k, i) => {
    const opt = document.createElement('option');
    opt.value = String(i);
    opt.textContent = k.name;
    lc.root.appendChild(opt);
  });

  const LEARN_OCTAVE = 4;
  let learnChord = [];
  let learnStepIndex = 0;

  const learnKeyboard = createPianoKeyboard(lc.keyboard, {
    lowestMidi: FULL_KEYBOARD_LOWEST_MIDI, octaves: FULL_KEYBOARD_OCTAVES, activeNote: null, activeNotes: [], tonicPitchClass: 0,
    showLabels: true, clickableWhite: false, clickableBlack: false,
  });

  function rebuildLearnChord() {
    const key = chordKeys[Number(lc.root.value)];
    learnChord = buildChord(key, LEARN_OCTAVE);
    learnStepIndex = 0;
    learnKeyboard.update({ activeNote: null, activeNotes: [], tonicPitchClass: key.semitoneFromC });
    lc.stepLabel.textContent = `Step 1 of ${toneCount}`;
    lc.currentNote.textContent = '—';
    lc.currentExplain.textContent = '';
    renderLearnTable();
  }

  function renderLearnTable() {
    lc.tableBody.innerHTML = learnChord.map((t) => `
    <tr data-midi="${t.midiNote}">
      <td>${t.role}</td><td>${t.noteName}</td><td>+${t.semitoneFromRoot}</td><td>${t.midiNote}</td>
    </tr>`).join('');
  }

  function highlightLearnRow(midiNote) {
    lc.tableBody.querySelectorAll('tr').forEach((tr) => {
      tr.classList.toggle('is-current', Number(tr.getAttribute('data-midi')) === midiNote);
    });
  }

  function playLearnStep() {
    if (learnStepIndex >= learnChord.length) learnStepIndex = 0;
    const tone = learnChord[learnStepIndex];
    lc.stepLabel.textContent = `Step ${learnStepIndex + 1} of ${learnChord.length}`;
    lc.currentNote.textContent = `${tone.role} · ${tone.noteName}`;
    lc.currentExplain.textContent = tone.explanation;
    const soundingNotes = learnChord.slice(0, learnStepIndex + 1).map((t) => t.midiNote);
    learnKeyboard.update({ activeNote: tone.midiNote, activeNotes: soundingNotes });
    highlightLearnRow(tone.midiNote);
    midi.playNote(lc.output.value || null, tone.midiNote, 700);
    learnStepIndex += 1;
  }

  function restartLearn() {
    learnStepIndex = 0;
    lc.stepLabel.textContent = `Step 1 of ${toneCount}`;
    lc.currentNote.textContent = '—';
    lc.currentExplain.textContent = '';
    learnKeyboard.update({ activeNote: null, activeNotes: [] });
    highlightLearnRow(null);
  }

  function playLearnFullChord() {
    const notes = learnChord.map((t) => t.midiNote);
    learnKeyboard.update({ activeNote: null, activeNotes: notes });
    lc.stepLabel.textContent = 'Full chord';
    const key = chordKeys[Number(lc.root.value)];
    lc.currentNote.textContent = `${key.name}${learnSuffix}`;
    lc.currentExplain.textContent = learnChord.map((t) => t.noteName).join(' – ');
    notes.forEach((n) => highlightLearnRow(n));
    playChord(lc.output.value || null, notes, 1200);
  }

  function renderAllChordsTable() {
    lc.allTableBody.innerHTML = chordKeys.map((key) => {
      const chord = buildChord(key, LEARN_OCTAVE);
      return `<tr><td>${nameChord(key.name)}</td>${noteCells(chord)}</tr>`;
    }).join('');
  }

  lc.root.addEventListener('change', rebuildLearnChord);
  lc.step.addEventListener('click', playLearnStep);
  lc.restart.addEventListener('click', restartLearn);
  lc.full.addEventListener('click', playLearnFullChord);

  // ======================================== EXERCISE 1: CIRCLE OF FOURTHS

  const cf = {
    octave: document.getElementById('cf-octave'),
    tempo: document.getElementById('cf-tempo'),
    tempoValue: document.getElementById('cf-tempo-value'),
    output: document.getElementById('cf-output'),
    play: document.getElementById('cf-play'),
    step: document.getElementById('cf-step'),
    stop: document.getElementById('cf-stop'),
    midiWarning: document.getElementById('cf-midi-warning'),
    positionLabel: document.getElementById('cf-position-label'),
    currentChord: document.getElementById('cf-current-chord'),
    currentNotes: document.getElementById('cf-current-notes'),
    progress: document.getElementById('cf-progress'),
    keyboard: document.getElementById('cf-keyboard'),
    tableBody: document.getElementById('cf-table-body'),
  };

  const cfKeyboard = createPianoKeyboard(cf.keyboard, {
    lowestMidi: FULL_KEYBOARD_LOWEST_MIDI, octaves: FULL_KEYBOARD_OCTAVES, activeNote: null, activeNotes: [], tonicPitchClass: 0,
    showLabels: true, clickableWhite: false, clickableBlack: false,
  });

  let cfIsPlaying = false;
  let cfStopRequested = false;
  let cfStepIndex = 0;

  function renderCircleOfFourthsTable() {
    const octave = Number(cf.octave.value);
    cf.tableBody.innerHTML = service.circleOfFourths.map((entry, i) => {
      const chord = buildChord(entry.key, octave, true);
      return `<tr data-position="${i}">
      <td>${entry.position}</td><td>${nameChord(entry.name)}</td>${noteCells(chord)}
    </tr>`;
    }).join('');
  }

  function highlightCircleRow(index) {
    cf.tableBody.querySelectorAll('tr').forEach((tr) => {
      tr.classList.toggle('is-current', Number(tr.getAttribute('data-position')) === index);
    });
  }

  /** Shows one circle-of-fourths entry on the keyboard, table, and labels. */
  function showCircleEntry(index, octave) {
    const entry = service.circleOfFourths[index];
    const chord = buildChord(entry.key, octave, true);
    const notes = chord.map((t) => t.midiNote);

    cf.positionLabel.textContent = `Chord ${entry.position} of 12`;
    cf.currentChord.textContent = nameChord(entry.name);
    cf.currentNotes.textContent = chord.map((t) => t.noteName).join(' – ');
    cf.progress.style.width = `${((index + 1) * 100) / service.circleOfFourths.length}%`;
    cfKeyboard.update({ activeNote: null, activeNotes: notes, tonicPitchClass: entry.semitoneFromC });
    highlightCircleRow(index);
    return notes;
  }

  async function playCircleOfFourths() {
    if (cfIsPlaying) return;
    cfIsPlaying = true;
    cfStopRequested = false;
    cf.play.disabled = true;
    cf.stop.disabled = false;

    const octave = Number(cf.octave.value);
    const bpm = Number(cf.tempo.value);
    const chordDurationMs = (60000 / bpm) * 2; // each chord rings for two beats
    const sequence = service.circleOfFourths;

    for (let i = 0; i < sequence.length; i++) {
      if (cfStopRequested) break;
      const notes = showCircleEntry(i, octave);
      playChord(cf.output.value || null, notes, Math.round(chordDurationMs * 0.9));
      await wait(chordDurationMs);
      if (cfStopRequested) break;
    }

    cfIsPlaying = false;
    cf.play.disabled = false;
    cf.stop.disabled = true;
    cfKeyboard.update({ activeNotes: [] });
  }

  function stopCircleOfFourths() {
    cfStopRequested = true;
    midi.stopAll(cf.output.value || null);
    cfIsPlaying = false;
    cf.play.disabled = false;
    cf.stop.disabled = true;
  }

  /** Silently advances to the next chord in the circle-of-fourths sequence -- highlights the keyboard, table row, and labels, but plays no sound. */
  function stepCircleOfFourths() {
    if (cfIsPlaying) return;
    if (cfStepIndex >= service.circleOfFourths.length) cfStepIndex = 0;
    showCircleEntry(cfStepIndex, Number(cf.octave.value));
    cfStepIndex += 1;
  }

  cf.octave.addEventListener('change', renderCircleOfFourthsTable);
  cf.tempo.addEventListener('input', () => { cf.tempoValue.textContent = cf.tempo.value; });
  cf.play.addEventListener('click', playCircleOfFourths);
  cf.step.addEventListener('click', stepCircleOfFourths);
  cf.stop.addEventListener('click', stopCircleOfFourths);
  document.addEventListener('tabchange', stopCircleOfFourths);

  // ==================================== EXERCISE 2: THE LESSON'S OWN PROGRESSION

  // Only the four triad lessons and five 7th-chord lessons have this; every
  // later lesson uses the shared jazz/gospel pickers instead.
  let cp = null;
  let cpKeyboard = null;
  let refreshProgressionForCurrentKey = null;

  if (config.chordProgression) {
    const notesColumn = config.chordProgression.notesColumn;

    cp = {
      description: document.getElementById('cp-description'),
      key: document.getElementById('cp-key'),
      octave: document.getElementById('cp-octave'),
      tempo: document.getElementById('cp-tempo'),
      tempoValue: document.getElementById('cp-tempo-value'),
      output: document.getElementById('cp-output'),
      play: document.getElementById('cp-play'),
      step: document.getElementById('cp-step'),
      playAll: document.getElementById('cp-play-all'),
      stop: document.getElementById('cp-stop'),
      midiWarning: document.getElementById('cp-midi-warning'),
      keyLabel: document.getElementById('cp-key-label'),
      currentChord: document.getElementById('cp-current-chord'),
      currentDegree: document.getElementById('cp-current-degree'),
      progress: document.getElementById('cp-progress'),
      keyboard: document.getElementById('cp-keyboard'),
      tableTitle: document.getElementById('cp-table-title'),
      tableBody: document.getElementById('cp-table-body'),
    };

    cp.description.textContent = service.progression.description;

    chordKeys.forEach((k, i) => {
      const opt = document.createElement('option');
      opt.value = String(i);
      opt.textContent = k.name;
      cp.key.appendChild(opt);
    });

    cpKeyboard = createPianoKeyboard(cp.keyboard, {
      lowestMidi: FULL_KEYBOARD_LOWEST_MIDI, octaves: FULL_KEYBOARD_OCTAVES, activeNote: null, activeNotes: [], tonicPitchClass: 0,
      showLabels: true, clickableWhite: false, clickableBlack: false,
    });

    let cpIsPlaying = false;
    let cpStopRequested = false;
    let cpStepIndex = 0;

    function renderProgressionTable(key, octave) {
      const chords = service.buildProgression(key, octave);
      cp.tableTitle.textContent = `Progression in ${key.name}`;
      cp.tableBody.innerHTML = chords.map((c, i) => {
        // The triad lessons give each note its own column; the 7th-chord
        // lessons list them together under a single "Notes" heading.
        const notes = notesColumn === 'joined'
          ? `<td>${c.notes.map((n) => n.noteName).join(' – ')}</td>`
          : noteCells(c.notes);
        return `
    <tr data-index="${i}">
      <td>${c.roman} (${c.name})</td><td>${c.chordName}</td>${notes}
    </tr>`;
      }).join('');
      return chords;
    }

    function highlightProgressionRow(index) {
      cp.tableBody.querySelectorAll('tr').forEach((tr) => {
        tr.classList.toggle('is-current', Number(tr.getAttribute('data-index')) === index);
      });
    }

    refreshProgressionForCurrentKey = function refreshProgressionForCurrentKey() {
      cpStepIndex = 0;
      const key = chordKeys[Number(cp.key.value)];
      const octave = Number(cp.octave.value);
      cp.keyLabel.textContent = `Key of ${key.name}`;
      cpKeyboard.update({ activeNote: null, activeNotes: [], tonicPitchClass: key.semitoneFromC });
      cp.currentChord.textContent = '—';
      cp.currentDegree.textContent = '';
      cp.progress.style.width = '0%';
      renderProgressionTable(key, octave);
    };

    async function playProgressionChords(chords, tonicPitchClass, bpm) {
      const chordDurationMs = (60000 / bpm) * 2;
      for (let i = 0; i < chords.length; i++) {
        if (cpStopRequested) break;
        const c = chords[i];
        const notes = c.notes.map((n) => n.midiNote);
        cp.currentChord.textContent = c.chordName;
        cp.currentDegree.textContent = `Degree ${c.roman} (${c.name})`;
        cp.progress.style.width = `${((i + 1) * 100) / chords.length}%`;
        cpKeyboard.update({ activeNote: null, activeNotes: notes, tonicPitchClass });
        highlightProgressionRow(i);
        playChord(cp.output.value || null, notes, Math.round(chordDurationMs * 0.9));
        await wait(chordDurationMs);
        if (cpStopRequested) break;
      }
    }

    function setProgressionControlsPlaying(isPlaying) {
      cp.play.disabled = isPlaying;
      cp.playAll.disabled = isPlaying;
      cp.step.disabled = isPlaying;
      cp.stop.disabled = !isPlaying;
    }

    async function playProgressionInCurrentKey() {
      if (cpIsPlaying) return;
      cpIsPlaying = true;
      cpStopRequested = false;
      setProgressionControlsPlaying(true);

      const key = chordKeys[Number(cp.key.value)];
      const octave = Number(cp.octave.value);
      const bpm = Number(cp.tempo.value);
      const chords = renderProgressionTable(key, octave);
      cp.keyLabel.textContent = `Key of ${key.name}`;

      await playProgressionChords(chords, key.semitoneFromC, bpm);

      cpIsPlaying = false;
      setProgressionControlsPlaying(false);
      cpKeyboard.update({ activeNotes: [] });
    }

    async function playProgressionInAllKeys() {
      if (cpIsPlaying) return;
      cpIsPlaying = true;
      cpStopRequested = false;
      setProgressionControlsPlaying(true);

      const octave = Number(cp.octave.value);
      const bpm = Number(cp.tempo.value);

      for (let k = 0; k < chordKeys.length; k++) {
        if (cpStopRequested) break;
        const key = chordKeys[k];
        cp.key.value = String(k);
        cp.keyLabel.textContent = `Key of ${key.name}`;
        const chords = renderProgressionTable(key, octave);
        await playProgressionChords(chords, key.semitoneFromC, bpm);
        if (cpStopRequested) break;
        await wait(150);
      }

      cpIsPlaying = false;
      setProgressionControlsPlaying(false);
      cpKeyboard.update({ activeNotes: [] });
    }

    function stopProgression() {
      cpStopRequested = true;
      midi.stopAll(cp.output.value || null);
      cpIsPlaying = false;
      setProgressionControlsPlaying(false);
    }

    /** Silently advances to the next chord of the progression -- highlights the keyboard, table row, and labels, but plays no sound. */
    function stepProgression() {
      if (cpIsPlaying) return;
      const key = chordKeys[Number(cp.key.value)];
      const octave = Number(cp.octave.value);
      const chords = renderProgressionTable(key, octave);
      if (cpStepIndex >= chords.length) cpStepIndex = 0;
      const c = chords[cpStepIndex];
      const notes = c.notes.map((n) => n.midiNote);
      cp.keyLabel.textContent = `Key of ${key.name}`;
      cp.currentChord.textContent = c.chordName;
      cp.currentDegree.textContent = `Degree ${c.roman} (${c.name})`;
      cp.progress.style.width = `${((cpStepIndex + 1) * 100) / chords.length}%`;
      cpKeyboard.update({ activeNote: null, activeNotes: notes, tonicPitchClass: key.semitoneFromC });
      highlightProgressionRow(cpStepIndex);

      cpStepIndex += 1;
    }

    cp.key.addEventListener('change', refreshProgressionForCurrentKey);
    cp.octave.addEventListener('change', refreshProgressionForCurrentKey);
    cp.tempo.addEventListener('input', () => { cp.tempoValue.textContent = cp.tempo.value; });
    cp.play.addEventListener('click', playProgressionInCurrentKey);
    cp.playAll.addEventListener('click', playProgressionInAllKeys);
    cp.step.addEventListener('click', stepProgression);
    cp.stop.addEventListener('click', stopProgression);
    document.addEventListener('tabchange', stopProgression);
  }

  // ============================ EXERCISES 2 & 3: JAZZ / GOSPEL PROGRESSIONS

  let jazzExercise = null;
  let gospelExercise = null;

  if (config.progressions) {
    jazzExercise = setupProgressionPicker('jz', InversionService[`${config.progressions}JazzProgressions`], midi);
    gospelExercise = setupProgressionPicker('gp', InversionService[`${config.progressions}GospelProgressions`], midi);
  }

  // ------------------------------------------------------------------ init

  (async function init() {
    const supported = await midi.init();
    const warnings = [cf.midiWarning];
    if (cp) warnings.push(cp.midiWarning);
    if (jazzExercise) warnings.push(jazzExercise.midiWarning, gospelExercise.midiWarning);
    warnings.forEach((w) => { w.style.display = supported ? 'none' : ''; });

    const allOutputSelects = [lc.output, cf.output];
    if (cp) allOutputSelects.push(cp.output);
    if (jazzExercise) allOutputSelects.push(jazzExercise.outputSelect, gospelExercise.outputSelect);

    if (supported) {
      const outputs = midi.getOutputDevices();
      allOutputSelects.forEach((sel) => { fillOutputOptions(sel, outputs); });
    }
    midi.onDevicesChanged((outputs) => {
      allOutputSelects.forEach((sel) => { fillOutputOptions(sel, outputs); });
    });

    rebuildLearnChord();
    renderAllChordsTable();
    renderCircleOfFourthsTable();
    if (refreshProgressionForCurrentKey) refreshProgressionForCurrentKey();
  })();

  return { midi, lc, cf, cp, jazzExercise, gospelExercise };
}
