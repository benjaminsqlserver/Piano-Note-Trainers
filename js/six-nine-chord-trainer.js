// six-nine-chord-trainer.js — page logic for six-nine-chord-trainer.html
// Expects audio-engine.js, piano-keyboard.js, music-services.js,
// tabs.js, and progression-picker.js to already be loaded as plain
// scripts before this one.
initTabs();

const midi = new AudioEngine();
const chordKeys = SixNineChordService.keys; // 12 keys, chromatic order, sharp spellings

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
  learnChord = SixNineChordService.buildChord(key, LEARN_OCTAVE);
  learnStepIndex = 0;
  learnKeyboard.update({ activeNote: null, activeNotes: [], tonicPitchClass: key.semitoneFromC });
  lc.stepLabel.textContent = 'Step 1 of 5';
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
  lc.stepLabel.textContent = 'Step 1 of 5';
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
  lc.currentNote.textContent = `${key.name} 6/9`;
  lc.currentExplain.textContent = learnChord.map((t) => t.noteName).join(' – ');
  notes.forEach((n) => highlightLearnRow(n));
  playChord(lc.output.value || null, notes, 1200);
}

function renderAllChordsTable() {
  lc.allTableBody.innerHTML = chordKeys.map((key) => {
    const chord = SixNineChordService.buildChord(key, LEARN_OCTAVE);
    return `<tr><td>${key.name}6/9</td><td>${chord[0].noteName}</td><td>${chord[1].noteName}</td><td>${chord[2].noteName}</td><td>${chord[3].noteName}</td><td>${chord[4].noteName}</td></tr>`;
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
  cf.tableBody.innerHTML = SixNineChordService.circleOfFourths.map((entry, i) => {
    const chord = SixNineChordService.buildChord(entry.key, octave, true);
    return `<tr data-position="${i}">
      <td>${entry.position}</td><td>${entry.name}6/9</td><td>${chord[0].noteName}</td><td>${chord[1].noteName}</td><td>${chord[2].noteName}</td><td>${chord[3].noteName}</td><td>${chord[4].noteName}</td>
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
  const sequence = SixNineChordService.circleOfFourths;

  for (let i = 0; i < sequence.length; i++) {
    if (cfStopRequested) break;
    const entry = sequence[i];
    const chord = SixNineChordService.buildChord(entry.key, octave, true);
    const notes = chord.map((t) => t.midiNote);

    cf.positionLabel.textContent = `Chord ${entry.position} of 12`;
    cf.currentChord.textContent = `${entry.name}6/9`;
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
  const sequence = SixNineChordService.circleOfFourths;
  if (cfStepIndex >= sequence.length) cfStepIndex = 0;
  const entry = sequence[cfStepIndex];
  const chord = SixNineChordService.buildChord(entry.key, octave, true);
  const notes = chord.map((t) => t.midiNote);

  cf.positionLabel.textContent = `Chord ${entry.position} of 12`;
  cf.currentChord.textContent = `${entry.name}6/9`;
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

// ================================ EXERCISES 2 & 3: JAZZ / GOSPEL PROGRESSIONS

const jazzExercise = setupProgressionPicker('jz', InversionService.sixNineJazzProgressions, midi);
const gospelExercise = setupProgressionPicker('gp', InversionService.sixNineGospelProgressions, midi);

// -------------------------------------------------------------------- init

(async function init() {
  const supported = await midi.init();
  cf.midiWarning.style.display = supported ? 'none' : '';
  jazzExercise.midiWarning.style.display = supported ? 'none' : '';
  gospelExercise.midiWarning.style.display = supported ? 'none' : '';

  const allOutputSelects = [lc.output, cf.output, jazzExercise.outputSelect, gospelExercise.outputSelect];

  if (supported) {
    const outputs = midi.getOutputDevices();
    const optionsHtml = '<option value="">Built-in synth (no MIDI device needed)</option>' + outputs.map((d) => `<option value="${d.id}">${d.name}</option>`).join('');
    allOutputSelects.forEach((sel) => { sel.innerHTML = optionsHtml; });
  }
  midi.onDevicesChanged((outputs) => {
    const optionsHtml = '<option value="">Built-in synth (no MIDI device needed)</option>' + outputs.map((d) => `<option value="${d.id}">${d.name}</option>`).join('');
    allOutputSelects.forEach((sel) => {
      const current = sel.value;
      sel.innerHTML = optionsHtml;
      sel.value = current;
    });
  });

  rebuildLearnChord();
  renderAllChordsTable();
  renderCircleOfFourthsTable();
})();
