// major-scale-trainer.js — page logic for major-scale-trainer.html
// Expects audio-engine.js, piano-keyboard.js, music-services.js,
// midi-file-reader.js, and tabs.js to already be loaded as plain scripts
// before this one.
initTabs();

const midi = new AudioEngine();
const keyOptions = MajorScaleService.keys;

// ============================================================ GUIDED TRAINER

const el = {
  key: document.getElementById('ms-key'),
  octave: document.getElementById('ms-octave'),
  tempo: document.getElementById('ms-tempo'),
  tempoValue: document.getElementById('ms-tempo-value'),
  output: document.getElementById('ms-output'),
  play: document.getElementById('ms-play'),
  step: document.getElementById('ms-step'),
  stop: document.getElementById('ms-stop'),
  practice: document.getElementById('ms-practice'),
  input: document.getElementById('ms-input'),
  midiWarning: document.getElementById('ms-midi-warning'),
  directionLabel: document.getElementById('ms-direction-label'),
  currentNote: document.getElementById('ms-current-note'),
  currentDegree: document.getElementById('ms-current-degree'),
  progress: document.getElementById('ms-progress'),
  keyboard: document.getElementById('ms-keyboard'),
  tableTitle: document.getElementById('ms-table-title'),
  tableBody: document.getElementById('ms-table-body'),
};

keyOptions.forEach((k, i) => {
  const opt = document.createElement('option');
  opt.value = String(i);
  opt.textContent = k.name;
  el.key.appendChild(opt);
});

let direction = 'ascending';
let sequence = [];
let currentStep = null;
let isPlaying = false;
let stopRequested = false;
let practiceMode = false;
let expectedPracticeIndex = 0;

const keyboard = createPianoKeyboard(el.keyboard, {
  lowestMidi: FULL_KEYBOARD_LOWEST_MIDI, octaves: FULL_KEYBOARD_OCTAVES, activeNote: null, tonicPitchClass: 0,
  showLabels: true, clickableWhite: false, clickableBlack: false,
});

function directionLabelText() {
  return direction === 'ascending' ? 'Ascending' : direction === 'descending' ? 'Descending' : 'Ascending then Descending';
}

function rebuildSequence() {
  const key = keyOptions[Number(el.key.value)];
  const octave = Number(el.octave.value);
  if (direction === 'ascending') sequence = MajorScaleService.buildAscending(key, octave);
  else if (direction === 'descending') sequence = MajorScaleService.buildDescending(key, octave);
  else sequence = MajorScaleService.buildAscendingThenDescending(key, octave);

  currentStep = null;
  expectedPracticeIndex = 0;
  el.directionLabel.textContent = directionLabelText();
  el.currentNote.textContent = '—';
  el.currentDegree.textContent = '';
  el.progress.style.width = '0%';
  el.tableTitle.textContent = `${key.name} major scale — ${directionLabelText()}`;

  keyboard.update({ activeNote: null, tonicPitchClass: key.semitoneFromC });

  renderTable();
}

function renderTable() {
  el.tableBody.innerHTML = sequence.map((s) => `
    <tr data-midi="${s.midiNote}">
      <td>${s.degreeName}</td><td>${s.noteName}</td><td>${s.solfa}</td><td>${s.midiNote}</td><td>${s.isTonic ? '●' : ''}</td>
    </tr>`).join('');
}

function highlightRow(midiNote) {
  el.tableBody.querySelectorAll('tr').forEach((tr) => {
    tr.classList.toggle('is-current', Number(tr.getAttribute('data-midi')) === midiNote);
  });
}

async function playSequence() {
  if (isPlaying || sequence.length === 0) return;
  isPlaying = true;
  stopRequested = false;
  el.play.disabled = true;
  el.stop.disabled = false;

  const bpm = Number(el.tempo.value);
  const noteDurationMs = 60000 / bpm;
  const tonicPitchClass = keyOptions[Number(el.key.value)].semitoneFromC;

  for (let i = 0; i < sequence.length; i++) {
    if (stopRequested) break;
    currentStep = sequence[i];
    el.currentNote.textContent = `${currentStep.noteName} · ${currentStep.solfa}`;
    el.currentDegree.textContent = `Degree ${currentStep.degreeName}`;
    el.progress.style.width = `${((i + 1) * 100) / sequence.length}%`;
    keyboard.update({ activeNote: currentStep.midiNote, tonicPitchClass });
    highlightRow(currentStep.midiNote);

    midi.playNote(el.output.value || null, currentStep.midiNote, Math.round(noteDurationMs * 0.9));
    await new Promise((r) => setTimeout(r, noteDurationMs));
  }

  isPlaying = false;
  el.play.disabled = false;
  el.stop.disabled = true;
}

function stopPlayback() {
  stopRequested = true;
  midi.stopAll(el.output.value || null);
}

let stepIndex = 0;

/** Silently advances one note at a time through the current sequence -- highlights the keyboard and table row, but plays no sound. */
function stepSequence() {
  if (isPlaying || sequence.length === 0) return;
  if (stepIndex >= sequence.length) stepIndex = 0;
  currentStep = sequence[stepIndex];
    el.currentNote.textContent = `${currentStep.noteName} · ${currentStep.solfa}`;
    el.currentDegree.textContent = `Degree ${currentStep.degreeName}`;
    el.progress.style.width = `${((stepIndex + 1) * 100) / sequence.length}%`;
  keyboard.update({ activeNote: currentStep.midiNote, tonicPitchClass });
  highlightRow(currentStep.midiNote);

  stepIndex += 1;
}

async function togglePracticeMode() {
  practiceMode = !practiceMode;
  el.practice.textContent = practiceMode ? 'Practice mode: ON' : 'Practice mode: OFF';
  el.practice.classList.toggle('is-on', practiceMode);
  el.input.style.display = practiceMode ? '' : 'none';
  if (practiceMode) {
    expectedPracticeIndex = 0;
    await refreshInputDevices();
  } else {
    midi.stopListening();
  }
}

async function refreshInputDevices() {
  const inputs = midi.getInputDevices();
  el.input.innerHTML = '<option value="">Select your MIDI keyboard</option>' + inputs.map((d) => `<option value="${d.id}">${d.name}</option>`).join('');
}

el.input.addEventListener('change', () => {
  if (el.input.value) midi.startListening(el.input.value);
});

function onMidiNoteOn(midiNote) {
  if (!practiceMode || sequence.length === 0) return;
  const expected = sequence[expectedPracticeIndex];
  currentStep = expected;
  el.currentNote.textContent = `${expected.noteName} · ${expected.solfa}`;
  el.currentDegree.textContent = `Degree ${expected.degreeName}`;
  el.progress.style.width = `${((expectedPracticeIndex + 1) * 100) / sequence.length}%`;
  highlightRow(expected.midiNote);
  if (midiNote === expected.midiNote) {
    expectedPracticeIndex = Math.min(expectedPracticeIndex + 1, sequence.length - 1);
  }
}

el.key.addEventListener('change', rebuildSequence);
el.octave.addEventListener('change', rebuildSequence);
el.tempo.addEventListener('input', () => { el.tempoValue.textContent = el.tempo.value; });
el.play.addEventListener('click', playSequence);
el.step.addEventListener('click', stepSequence);
el.stop.addEventListener('click', stopPlayback);
el.practice.addEventListener('click', togglePracticeMode);

initSegmented(document.querySelector('[data-segmented="ms-direction"]'), (value) => {
  direction = value;
  rebuildSequence();
});

// ========================================================= IMPROVISATION DEMO
// Loads a short, original MIDI file per key (midi/major-scale-<slug>.mid) —
// a diatonic sequence-in-thirds lick built entirely from that key's major
// scale — parses it with the vanilla-JS reader in midi-file-reader.js, and
// plays it back with the same synth/MIDI-output engine every lesson uses,
// highlighting each note on the keyboard as it sounds.

const mi = {
  key: document.getElementById('mi-key'),
  tempo: document.getElementById('mi-tempo'),
  tempoValue: document.getElementById('mi-tempo-value'),
  output: document.getElementById('mi-output'),
  play: document.getElementById('mi-play'),
  step: document.getElementById('mi-step'),
  stop: document.getElementById('mi-stop'),
  midiWarning: document.getElementById('mi-midi-warning'),
  loadError: document.getElementById('mi-load-error'),
  keyLabel: document.getElementById('mi-key-label'),
  currentNote: document.getElementById('mi-current-note'),
  currentStep: document.getElementById('mi-current-step'),
  progress: document.getElementById('mi-progress'),
  keyboard: document.getElementById('mi-keyboard'),
  tableBody: document.getElementById('mi-table-body'),
};

keyOptions.forEach((k, i) => {
  const opt = document.createElement('option');
  opt.value = String(i);
  opt.textContent = k.name;
  mi.key.appendChild(opt);
});

const NOTE_NAMES_SHARP = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
function midiNoteName(midiNote) {
  const pc = ((midiNote % 12) + 12) % 12;
  const octave = Math.floor(midiNote / 12) - 1;
  return `${NOTE_NAMES_SHARP[pc]}${octave}`;
}

function solfaFor(midiNote, key) {
  const pc = ((midiNote % 12) + 12) % 12;
  const semitoneFromRoot = ((pc - key.semitoneFromC) + 12) % 12;
  return MajorScaleService.solfaForSemitoneFromRoot(semitoneFromRoot) || '—';
}

const improvKeyboard = createPianoKeyboard(mi.keyboard, {
  lowestMidi: FULL_KEYBOARD_LOWEST_MIDI, octaves: FULL_KEYBOARD_OCTAVES, activeNote: null, tonicPitchClass: 0,
  showLabels: true, clickableWhite: false, clickableBlack: false,
});

let improvIsPlaying = false;
let improvStopRequested = false;
const midiFileCache = new Map(); // fileSlug -> parsed { notes, totalDurationMs }

function renderImprovTable(notes, key) {
  mi.tableBody.innerHTML = notes.map((n, i) => {
    const pc = ((n.midiNote % 12) + 12) % 12;
    const semitoneFromRoot = ((pc - key.semitoneFromC) + 12) % 12;
    const solfa = MajorScaleService.solfaForSemitoneFromRoot(semitoneFromRoot) || '—';
    return `
    <tr data-midi="${n.midiNote}" data-index="${i}">
      <td>${i + 1}</td><td>${midiNoteName(n.midiNote)}</td><td>${solfa}</td><td>${n.midiNote}</td><td>${(n.startMs / 1000).toFixed(2)}s</td>
    </tr>`;
  }).join('');
}

function highlightImprovRow(index) {
  mi.tableBody.querySelectorAll('tr').forEach((tr) => {
    tr.classList.toggle('is-current', Number(tr.getAttribute('data-index')) === index);
  });
}

async function loadCurrentKeyMidi() {
  const key = keyOptions[Number(mi.key.value)];
  mi.keyLabel.textContent = `Key of ${key.name}`;
  mi.loadError.style.display = 'none';

  improvKeyboard.update({ activeNote: null, tonicPitchClass: key.semitoneFromC });

  if (midiFileCache.has(key.fileSlug)) {
    renderImprovTable(midiFileCache.get(key.fileSlug).notes, key);
    return midiFileCache.get(key.fileSlug);
  }

  try {
    mi.play.disabled = true;
    const base64 = MAJOR_SCALE_MIDI_DATA[key.fileSlug];
    if (!base64) throw new Error(`No embedded MIDI data for key slug "${key.fileSlug}"`);
    const parsed = loadMidiFileFromBase64(base64);
    midiFileCache.set(key.fileSlug, parsed);
    renderImprovTable(parsed.notes, key);
    return parsed;
  } catch (err) {
    console.error(err);
    mi.loadError.textContent = `Couldn't load the demo for ${key.name} major. Please refresh the page and try again.`;
    mi.loadError.style.display = '';
    return null;
  } finally {
    mi.play.disabled = false;
  }
}

async function playImprovDemo() {
  if (improvIsPlaying) return;
  const parsed = await loadCurrentKeyMidi();
  if (!parsed || parsed.notes.length === 0) return;

  improvIsPlaying = true;
  improvStopRequested = false;
  mi.play.disabled = true;
  mi.stop.disabled = false;

  const key = keyOptions[Number(mi.key.value)];
  const speedPct = Number(mi.tempo.value);
  const speedFactor = 100 / speedPct; // >100% speed => smaller time multiplier

  const notes = parsed.notes;
  const startedAt = performance.now();

  for (let i = 0; i < notes.length; i++) {
    if (improvStopRequested) break;
    const note = notes[i];
    const targetElapsed = note.startMs * speedFactor;
    const now = performance.now();
    const waitMs = targetElapsed - (now - startedAt);
    if (waitMs > 0) await new Promise((r) => setTimeout(r, waitMs));
    if (improvStopRequested) break;

    mi.currentNote.textContent = `${midiNoteName(note.midiNote)} · ${solfaFor(note.midiNote, key)}`;
    mi.currentStep.textContent = `Note ${i + 1} of ${notes.length}`;
    mi.progress.style.width = `${((i + 1) * 100) / notes.length}%`;
    improvKeyboard.update({ activeNote: note.midiNote, tonicPitchClass: key.semitoneFromC });
    highlightImprovRow(i);

    midi.playNote(mi.output.value || null, note.midiNote, Math.round(note.durationMs * speedFactor * 0.9));
  }

  if (!improvStopRequested) {
    const remaining = parsed.totalDurationMs * speedFactor - (performance.now() - startedAt);
    if (remaining > 0) await new Promise((r) => setTimeout(r, remaining));
  }

  improvIsPlaying = false;
  mi.play.disabled = false;
  mi.stop.disabled = true;
  improvKeyboard.update({ activeNote: null });
}

function stopImprovDemo() {
  improvStopRequested = true;
  midi.stopAll(mi.output.value || null);
  improvIsPlaying = false;
  mi.play.disabled = false;
  mi.stop.disabled = true;
}

let improvStepIndex = 0;

/** Silently advances one note at a time through the improvisation demo -- highlights the keyboard and table row, but plays no sound. */
async function stepImprovDemo() {
  if (improvIsPlaying) return;
  const parsed = await loadCurrentKeyMidi();
  if (!parsed || parsed.notes.length === 0) return;
  const key = keyOptions[Number(mi.key.value)];
  const notes = parsed.notes;
  if (improvStepIndex >= notes.length) improvStepIndex = 0;
  const note = notes[improvStepIndex];

  mi.currentNote.textContent = `${midiNoteName(note.midiNote)} · ${solfaFor(note.midiNote, key)}`;
  mi.currentStep.textContent = `Note ${improvStepIndex + 1} of ${notes.length}`;
  mi.progress.style.width = `${((improvStepIndex + 1) * 100) / notes.length}%`;
  improvKeyboard.update({ activeNote: note.midiNote, tonicPitchClass: key.semitoneFromC });
  highlightImprovRow(improvStepIndex);

  improvStepIndex += 1;
}

mi.key.addEventListener('change', () => { improvStepIndex = 0; loadCurrentKeyMidi(); });
mi.tempo.addEventListener('input', () => { mi.tempoValue.textContent = mi.tempo.value; });
mi.play.addEventListener('click', playImprovDemo);
mi.step.addEventListener('click', stepImprovDemo);
mi.stop.addEventListener('click', stopImprovDemo);

// -------------------------------------------------------------------- init

(async function init() {
  const supported = await midi.init();
  el.midiWarning.style.display = supported ? 'none' : '';
  mi.midiWarning.style.display = supported ? 'none' : '';
  if (supported) {
    const outputs = midi.getOutputDevices();
    const optionsHtml = '<option value="">Built-in synth (no MIDI device needed)</option>' + outputs.map((d) => `<option value="${d.id}">${d.name}</option>`).join('');
    el.output.innerHTML = optionsHtml;
    mi.output.innerHTML = optionsHtml;
    await refreshInputDevices();
  }
  midi.onDevicesChanged((outputs) => {
    const optionsHtml = '<option value="">Built-in synth (no MIDI device needed)</option>' + outputs.map((d) => `<option value="${d.id}">${d.name}</option>`).join('');
    const currentOut = el.output.value;
    const currentMiOut = mi.output.value;
    el.output.innerHTML = optionsHtml;
    el.output.value = currentOut;
    mi.output.innerHTML = optionsHtml;
    mi.output.value = currentMiOut;
  });
  midi.onNoteOn((note) => onMidiNoteOn(note));

  rebuildSequence();
  await loadCurrentKeyMidi();
})();
