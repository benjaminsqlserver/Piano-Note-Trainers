// dominant-seventh-chord-trainer.js — page logic for dominant-seventh-chord-trainer.html
// Expects audio-engine.js, piano-keyboard.js, music-services.js, and
// tabs.js to already be loaded as plain scripts before this one.
initTabs();

const midi = new AudioEngine();
const chordKeys = HalfDiminishedSeventhChordService.keys; // 12 keys, chromatic order, sharp spellings

/** Plays every note of a chord at (roughly) the same instant, as a chord. */
function playChord(deviceId, midiNotes, durationMs, velocity = 100) {
  midiNotes.forEach((n) => midi.playNote(deviceId, n, durationMs, velocity));
}

function wait(ms) { return new Promise((r) => setTimeout(r, ms)); }

// ==================================================================== LEARN

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
  learnChord = HalfDiminishedSeventhChordService.buildChord(key, LEARN_OCTAVE);
  learnStepIndex = 0;
  learnKeyboard.update({ activeNote: null, activeNotes: [], tonicPitchClass: key.semitoneFromC });
  lc.stepLabel.textContent = 'Step 1 of 4';
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
  lc.stepLabel.textContent = 'Step 1 of 4';
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
  lc.currentNote.textContent = `${key.name} half-diminished 7th`;
  lc.currentExplain.textContent = learnChord.map((t) => t.noteName).join(' – ');
  notes.forEach((n) => highlightLearnRow(n));
  playChord(lc.output.value || null, notes, 1200);
}

function renderAllChordsTable() {
  lc.allTableBody.innerHTML = chordKeys.map((key) => {
    const chord = HalfDiminishedSeventhChordService.buildChord(key, LEARN_OCTAVE);
    return `<tr><td>${key.name}m7♭5</td><td>${chord[0].noteName}</td><td>${chord[1].noteName}</td><td>${chord[2].noteName}</td><td>${chord[3].noteName}</td></tr>`;
  }).join('');
}

lc.root.addEventListener('change', rebuildLearnChord);
lc.step.addEventListener('click', playLearnStep);
lc.restart.addEventListener('click', restartLearn);
lc.full.addEventListener('click', playLearnFullChord);

// ========================================== EXERCISE 1: CIRCLE OF FOURTHS

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

function renderCircleOfFourthsTable() {
  const octave = Number(cf.octave.value);
  cf.tableBody.innerHTML = HalfDiminishedSeventhChordService.circleOfFourths.map((entry, i) => {
    const chord = HalfDiminishedSeventhChordService.buildChord(entry.key, octave, true);
    return `<tr data-position="${i}">
      <td>${entry.position}</td><td>${entry.name}m7♭5</td><td>${chord[0].noteName}</td><td>${chord[1].noteName}</td><td>${chord[2].noteName}</td><td>${chord[3].noteName}</td>
    </tr>`;
  }).join('');
}

function highlightCircleRow(index) {
  cf.tableBody.querySelectorAll('tr').forEach((tr) => {
    tr.classList.toggle('is-current', Number(tr.getAttribute('data-position')) === index);
  });
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
  const sequence = HalfDiminishedSeventhChordService.circleOfFourths;

  for (let i = 0; i < sequence.length; i++) {
    if (cfStopRequested) break;
    const entry = sequence[i];
    const chord = HalfDiminishedSeventhChordService.buildChord(entry.key, octave, true);
    const notes = chord.map((t) => t.midiNote);

    cf.positionLabel.textContent = `Chord ${entry.position} of 12`;
    cf.currentChord.textContent = `${entry.name}m7♭5`;
    cf.currentNotes.textContent = chord.map((t) => t.noteName).join(' – ');
    cf.progress.style.width = `${((i + 1) * 100) / sequence.length}%`;
    cfKeyboard.update({ activeNote: null, activeNotes: notes, tonicPitchClass: entry.semitoneFromC });
    highlightCircleRow(i);

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

let cfStepIndex = 0;

/** Silently advances to the next chord in the circle-of-fourths sequence -- highlights the keyboard, table row, and labels, but plays no sound. */
function stepCircleOfFourths() {
  if (cfIsPlaying) return;
  const octave = Number(cf.octave.value);
  const sequence = HalfDiminishedSeventhChordService.circleOfFourths;
  if (cfStepIndex >= sequence.length) cfStepIndex = 0;
  const entry = sequence[cfStepIndex];
  const chord = HalfDiminishedSeventhChordService.buildChord(entry.key, octave, true);
  const notes = chord.map((t) => t.midiNote);

  cf.positionLabel.textContent = `Chord ${entry.position} of 12`;
  cf.currentChord.textContent = `${entry.name}m7♭5`;
  cf.currentNotes.textContent = chord.map((t) => t.noteName).join(' – ');
  cf.progress.style.width = `${((cfStepIndex + 1) * 100) / sequence.length}%`;
  cfKeyboard.update({ activeNote: null, activeNotes: notes, tonicPitchClass: entry.semitoneFromC });
  highlightCircleRow(cfStepIndex);

  cfStepIndex += 1;
}

cf.octave.addEventListener('change', renderCircleOfFourthsTable);
cf.tempo.addEventListener('input', () => { cf.tempoValue.textContent = cf.tempo.value; });
cf.play.addEventListener('click', playCircleOfFourths);
cf.step.addEventListener('click', stepCircleOfFourths);
cf.stop.addEventListener('click', stopCircleOfFourths);

// ========================================== EXERCISE 2: CHORD PROGRESSION

const cp = {
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

cp.description.textContent = HalfDiminishedSeventhChordService.progression.description;

chordKeys.forEach((k, i) => {
  const opt = document.createElement('option');
  opt.value = String(i);
  opt.textContent = k.name;
  cp.key.appendChild(opt);
});

const cpKeyboard = createPianoKeyboard(cp.keyboard, {
  lowestMidi: FULL_KEYBOARD_LOWEST_MIDI, octaves: FULL_KEYBOARD_OCTAVES, activeNote: null, activeNotes: [], tonicPitchClass: 0,
  showLabels: true, clickableWhite: false, clickableBlack: false,
});

let cpIsPlaying = false;
let cpStopRequested = false;

function renderProgressionTable(key, octave) {
  const chords = HalfDiminishedSeventhChordService.buildProgression(key, octave);
  cp.tableTitle.textContent = `Progression in ${key.name}`;
  cp.tableBody.innerHTML = chords.map((c, i) => `
    <tr data-index="${i}">
      <td>${c.roman} (${c.name})</td><td>${c.chordName}</td><td>${c.notes.map((n) => n.noteName).join(' – ')}</td>
    </tr>`).join('');
  return chords;
}

function highlightProgressionRow(index) {
  cp.tableBody.querySelectorAll('tr').forEach((tr) => {
    tr.classList.toggle('is-current', Number(tr.getAttribute('data-index')) === index);
  });
}

function refreshProgressionForCurrentKey() {
  cpStepIndex = 0;
  const key = chordKeys[Number(cp.key.value)];
  const octave = Number(cp.octave.value);
  cp.keyLabel.textContent = `Key of ${key.name}`;
  cpKeyboard.update({ activeNote: null, activeNotes: [], tonicPitchClass: key.semitoneFromC });
  cp.currentChord.textContent = '—';
  cp.currentDegree.textContent = '';
  cp.progress.style.width = '0%';
  renderProgressionTable(key, octave);
}

async function playChordsSequence(chords, tonicPitchClass, bpm) {
  const chordDurationMs = (60000 / bpm) * 2;
  for (let i = 0; i < chords.length; i++) {
    if (cpStopRequested) break;
    const c = chords[i];
    const notes = c.notes.map((t) => t.midiNote);
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

async function playProgressionInCurrentKey() {
  if (cpIsPlaying) return;
  cpIsPlaying = true;
  cpStopRequested = false;
  cp.play.disabled = true;
  cp.playAll.disabled = true;
  cp.stop.disabled = false;

  const key = chordKeys[Number(cp.key.value)];
  const octave = Number(cp.octave.value);
  const bpm = Number(cp.tempo.value);
  const chords = renderProgressionTable(key, octave);
  cp.keyLabel.textContent = `Key of ${key.name}`;

  await playChordsSequence(chords, key.semitoneFromC, bpm);

  cpIsPlaying = false;
  cp.play.disabled = false;
  cp.playAll.disabled = false;
  cp.stop.disabled = true;
  cpKeyboard.update({ activeNotes: [] });
}

async function playProgressionInAllKeys() {
  if (cpIsPlaying) return;
  cpIsPlaying = true;
  cpStopRequested = false;
  cp.play.disabled = true;
  cp.playAll.disabled = true;
  cp.stop.disabled = false;

  const octave = Number(cp.octave.value);
  const bpm = Number(cp.tempo.value);

  for (let k = 0; k < chordKeys.length; k++) {
    if (cpStopRequested) break;
    const key = chordKeys[k];
    cp.key.value = String(k);
    cp.keyLabel.textContent = `Key of ${key.name}`;
    const chords = renderProgressionTable(key, octave);
    await playChordsSequence(chords, key.semitoneFromC, bpm);
    if (cpStopRequested) break;
    await wait(150);
  }

  cpIsPlaying = false;
  cp.play.disabled = false;
  cp.playAll.disabled = false;
  cp.stop.disabled = true;
  cpKeyboard.update({ activeNotes: [] });
}

function stopProgression() {
  cpStopRequested = true;
  midi.stopAll(cp.output.value || null);
  cpIsPlaying = false;
  cp.play.disabled = false;
  cp.playAll.disabled = false;
  cp.stop.disabled = true;
}

let cpStepIndex = 0;

/** Silently advances to the next chord in the current key's progression -- highlights the keyboard, table row, and labels, but plays no sound. */
function stepProgression() {
  if (cpIsPlaying) return;
  const key = chordKeys[Number(cp.key.value)];
  const octave = Number(cp.octave.value);
  const chords = renderProgressionTable(key, octave);
  if (cpStepIndex >= chords.length) cpStepIndex = 0;
  const c = chords[cpStepIndex];
  const notes = c.notes.map((t) => t.midiNote);
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

// -------------------------------------------------------------------- init

(async function init() {
  const supported = await midi.init();
  cf.midiWarning.style.display = supported ? 'none' : '';
  cp.midiWarning.style.display = supported ? 'none' : '';
  if (supported) {
    const outputs = midi.getOutputDevices();
    const optionsHtml = '<option value="">Built-in synth (no MIDI device needed)</option>' + outputs.map((d) => `<option value="${d.id}">${d.name}</option>`).join('');
    lc.output.innerHTML = optionsHtml;
    cf.output.innerHTML = optionsHtml;
    cp.output.innerHTML = optionsHtml;
  }
  midi.onDevicesChanged((outputs) => {
    const optionsHtml = '<option value="">Built-in synth (no MIDI device needed)</option>' + outputs.map((d) => `<option value="${d.id}">${d.name}</option>`).join('');
    [lc.output, cf.output, cp.output].forEach((sel) => {
      const current = sel.value;
      sel.innerHTML = optionsHtml;
      sel.value = current;
    });
  });

  rebuildLearnChord();
  renderAllChordsTable();
  renderCircleOfFourthsTable();
  refreshProgressionForCurrentKey();
})();
