// dorian-scale-trainer.js — page logic for dorian-scale-trainer.html
// Expects audio-engine.js, piano-keyboard.js, music-services.js,
// midi-file-reader.js, and tabs.js to already be loaded as plain scripts
// before this one.
initTabs();

const midi = new AudioEngine();
const keyOptions = DorianScaleService.keys;

// ============================================================ GUIDED TRAINER

const el = {
  key: document.getElementById('ds-key'),
  octave: document.getElementById('ds-octave'),
  tempo: document.getElementById('ds-tempo'),
  tempoValue: document.getElementById('ds-tempo-value'),
  output: document.getElementById('ds-output'),
  play: document.getElementById('ds-play'),
  stop: document.getElementById('ds-stop'),
  practice: document.getElementById('ds-practice'),
  input: document.getElementById('ds-input'),
  midiWarning: document.getElementById('ds-midi-warning'),
  directionLabel: document.getElementById('ds-direction-label'),
  currentNote: document.getElementById('ds-current-note'),
  currentDegree: document.getElementById('ds-current-degree'),
  progress: document.getElementById('ds-progress'),
  keyboard: document.getElementById('ds-keyboard'),
  tableTitle: document.getElementById('ds-table-title'),
  tableBody: document.getElementById('ds-table-body'),
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
  if (direction === 'ascending') sequence = DorianScaleService.buildAscending(key, octave);
  else if (direction === 'descending') sequence = DorianScaleService.buildDescending(key, octave);
  else sequence = DorianScaleService.buildAscendingThenDescending(key, octave);

  currentStep = null;
  expectedPracticeIndex = 0;
  el.directionLabel.textContent = directionLabelText();
  el.currentNote.textContent = '—';
  el.currentDegree.textContent = '';
  el.progress.style.width = '0%';
  el.tableTitle.textContent = `${key.name} Dorian scale — ${directionLabelText()}`;

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
el.stop.addEventListener('click', stopPlayback);
el.practice.addEventListener('click', togglePracticeMode);

initSegmented(document.querySelector('[data-segmented="ds-direction"]'), (value) => {
  direction = value;
  rebuildSequence();
});

// ========================================================= IMPROVISATION DEMO
// Loads a short, original MIDI file per key (midi/dorian-scale-<slug>.mid) —
// a sequence-in-thirds lick built entirely from that key's Dorian scale —
// parses it with the vanilla-JS reader in midi-file-reader.js, and plays it
// back with the same synth/MIDI-output engine every lesson uses,
// highlighting each note on the keyboard as it sounds.

const di = {
  key: document.getElementById('di-key'),
  tempo: document.getElementById('di-tempo'),
  tempoValue: document.getElementById('di-tempo-value'),
  output: document.getElementById('di-output'),
  play: document.getElementById('di-play'),
  stop: document.getElementById('di-stop'),
  midiWarning: document.getElementById('di-midi-warning'),
  loadError: document.getElementById('di-load-error'),
  keyLabel: document.getElementById('di-key-label'),
  currentNote: document.getElementById('di-current-note'),
  currentStep: document.getElementById('di-current-step'),
  progress: document.getElementById('di-progress'),
  keyboard: document.getElementById('di-keyboard'),
  tableBody: document.getElementById('di-table-body'),
};

keyOptions.forEach((k, i) => {
  const opt = document.createElement('option');
  opt.value = String(i);
  opt.textContent = k.name;
  di.key.appendChild(opt);
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
  return DorianScaleService.solfaForSemitoneFromRoot(semitoneFromRoot) || '—';
}

const improvKeyboard = createPianoKeyboard(di.keyboard, {
  lowestMidi: FULL_KEYBOARD_LOWEST_MIDI, octaves: FULL_KEYBOARD_OCTAVES, activeNote: null, tonicPitchClass: 0,
  showLabels: true, clickableWhite: false, clickableBlack: false,
});

let improvIsPlaying = false;
let improvStopRequested = false;
const midiFileCache = new Map(); // fileSlug -> parsed { notes, totalDurationMs }

function renderImprovTable(notes, key) {
  di.tableBody.innerHTML = notes.map((n, i) => {
    const pc = ((n.midiNote % 12) + 12) % 12;
    const semitoneFromRoot = ((pc - key.semitoneFromC) + 12) % 12;
    const solfa = DorianScaleService.solfaForSemitoneFromRoot(semitoneFromRoot) || '—';
    return `
    <tr data-midi="${n.midiNote}" data-index="${i}">
      <td>${i + 1}</td><td>${midiNoteName(n.midiNote)}</td><td>${solfa}</td><td>${n.midiNote}</td><td>${(n.startMs / 1000).toFixed(2)}s</td>
    </tr>`;
  }).join('');
}

function highlightImprovRow(index) {
  di.tableBody.querySelectorAll('tr').forEach((tr) => {
    tr.classList.toggle('is-current', Number(tr.getAttribute('data-index')) === index);
  });
}

async function loadCurrentKeyMidi() {
  const key = keyOptions[Number(di.key.value)];
  di.keyLabel.textContent = `Key of ${key.name}`;
  di.loadError.style.display = 'none';

  improvKeyboard.update({ activeNote: null, tonicPitchClass: key.semitoneFromC });

  if (midiFileCache.has(key.fileSlug)) {
    renderImprovTable(midiFileCache.get(key.fileSlug).notes, key);
    return midiFileCache.get(key.fileSlug);
  }

  try {
    di.play.disabled = true;
    const base64 = DORIAN_SCALE_MIDI_DATA[key.fileSlug];
    if (!base64) throw new Error(`No embedded MIDI data for key slug "${key.fileSlug}"`);
    const parsed = loadMidiFileFromBase64(base64);
    midiFileCache.set(key.fileSlug, parsed);
    renderImprovTable(parsed.notes, key);
    return parsed;
  } catch (err) {
    console.error(err);
    di.loadError.textContent = `Couldn't load the demo for ${key.name} Dorian. Please refresh the page and try again.`;
    di.loadError.style.display = '';
    return null;
  } finally {
    di.play.disabled = false;
  }
}

async function playImprovDemo() {
  if (improvIsPlaying) return;
  const parsed = await loadCurrentKeyMidi();
  if (!parsed || parsed.notes.length === 0) return;

  improvIsPlaying = true;
  improvStopRequested = false;
  di.play.disabled = true;
  di.stop.disabled = false;

  const key = keyOptions[Number(di.key.value)];
  const speedPct = Number(di.tempo.value);
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

    di.currentNote.textContent = `${midiNoteName(note.midiNote)} · ${solfaFor(note.midiNote, key)}`;
    di.currentStep.textContent = `Note ${i + 1} of ${notes.length}`;
    di.progress.style.width = `${((i + 1) * 100) / notes.length}%`;
    improvKeyboard.update({ activeNote: note.midiNote, tonicPitchClass: key.semitoneFromC });
    highlightImprovRow(i);

    midi.playNote(di.output.value || null, note.midiNote, Math.round(note.durationMs * speedFactor * 0.9));
  }

  if (!improvStopRequested) {
    const remaining = parsed.totalDurationMs * speedFactor - (performance.now() - startedAt);
    if (remaining > 0) await new Promise((r) => setTimeout(r, remaining));
  }

  improvIsPlaying = false;
  di.play.disabled = false;
  di.stop.disabled = true;
  improvKeyboard.update({ activeNote: null });
}

function stopImprovDemo() {
  improvStopRequested = true;
  midi.stopAll(di.output.value || null);
  improvIsPlaying = false;
  di.play.disabled = false;
  di.stop.disabled = true;
}

di.key.addEventListener('change', loadCurrentKeyMidi);
di.tempo.addEventListener('input', () => { di.tempoValue.textContent = di.tempo.value; });
di.play.addEventListener('click', playImprovDemo);
di.stop.addEventListener('click', stopImprovDemo);

// -------------------------------------------------------------------- init

(async function init() {
  const supported = await midi.init();
  el.midiWarning.style.display = supported ? 'none' : '';
  di.midiWarning.style.display = supported ? 'none' : '';
  if (supported) {
    const outputs = midi.getOutputDevices();
    const optionsHtml = '<option value="">Built-in synth (no MIDI device needed)</option>' + outputs.map((d) => `<option value="${d.id}">${d.name}</option>`).join('');
    el.output.innerHTML = optionsHtml;
    di.output.innerHTML = optionsHtml;
    await refreshInputDevices();
  }
  midi.onDevicesChanged((outputs) => {
    const optionsHtml = '<option value="">Built-in synth (no MIDI device needed)</option>' + outputs.map((d) => `<option value="${d.id}">${d.name}</option>`).join('');
    const currentOut = el.output.value;
    const currentDiOut = di.output.value;
    el.output.innerHTML = optionsHtml;
    el.output.value = currentOut;
    di.output.innerHTML = optionsHtml;
    di.output.value = currentDiOut;
  });
  midi.onNoteOn((note) => onMidiNoteOn(note));

  rebuildSequence();
  await loadCurrentKeyMidi();
})();
