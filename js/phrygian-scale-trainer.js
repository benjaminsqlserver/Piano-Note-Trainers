// phrygian-scale-trainer.js — page logic for phrygian-scale-trainer.html
// Expects audio-engine.js, piano-keyboard.js, music-services.js,
// midi-file-reader.js, and tabs.js to already be loaded as plain scripts
// before this one.
initTabs();

const midi = new AudioEngine();
const keyOptions = PhrygianScaleService.keys;

// ============================================================ GUIDED TRAINER

const el = {
  key: document.getElementById('ps-key'),
  octave: document.getElementById('ps-octave'),
  tempo: document.getElementById('ps-tempo'),
  tempoValue: document.getElementById('ps-tempo-value'),
  output: document.getElementById('ps-output'),
  play: document.getElementById('ps-play'),
  stop: document.getElementById('ps-stop'),
  practice: document.getElementById('ps-practice'),
  input: document.getElementById('ps-input'),
  midiWarning: document.getElementById('ps-midi-warning'),
  directionLabel: document.getElementById('ps-direction-label'),
  currentNote: document.getElementById('ps-current-note'),
  currentDegree: document.getElementById('ps-current-degree'),
  progress: document.getElementById('ps-progress'),
  keyboard: document.getElementById('ps-keyboard'),
  tableTitle: document.getElementById('ps-table-title'),
  tableBody: document.getElementById('ps-table-body'),
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
  if (direction === 'ascending') sequence = PhrygianScaleService.buildAscending(key, octave);
  else if (direction === 'descending') sequence = PhrygianScaleService.buildDescending(key, octave);
  else sequence = PhrygianScaleService.buildAscendingThenDescending(key, octave);

  currentStep = null;
  expectedPracticeIndex = 0;
  el.directionLabel.textContent = directionLabelText();
  el.currentNote.textContent = '—';
  el.currentDegree.textContent = '';
  el.progress.style.width = '0%';
  el.tableTitle.textContent = `${key.name} Phrygian scale — ${directionLabelText()}`;

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

initSegmented(document.querySelector('[data-segmented="ps-direction"]'), (value) => {
  direction = value;
  rebuildSequence();
});

// ========================================================= IMPROVISATION DEMO
// Loads a short, original MIDI file per key (midi/phrygian-scale-<slug>.mid) —
// a sequence-in-thirds lick built entirely from that key's Phrygian scale —
// parses it with the vanilla-JS reader in midi-file-reader.js, and plays it
// back with the same synth/MIDI-output engine every lesson uses,
// highlighting each note on the keyboard as it sounds.

const pi = {
  key: document.getElementById('pi-key'),
  tempo: document.getElementById('pi-tempo'),
  tempoValue: document.getElementById('pi-tempo-value'),
  output: document.getElementById('pi-output'),
  play: document.getElementById('pi-play'),
  stop: document.getElementById('pi-stop'),
  midiWarning: document.getElementById('pi-midi-warning'),
  loadError: document.getElementById('pi-load-error'),
  keyLabel: document.getElementById('pi-key-label'),
  currentNote: document.getElementById('pi-current-note'),
  currentStep: document.getElementById('pi-current-step'),
  progress: document.getElementById('pi-progress'),
  keyboard: document.getElementById('pi-keyboard'),
  tableBody: document.getElementById('pi-table-body'),
};

keyOptions.forEach((k, i) => {
  const opt = document.createElement('option');
  opt.value = String(i);
  opt.textContent = k.name;
  pi.key.appendChild(opt);
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
  return PhrygianScaleService.solfaForSemitoneFromRoot(semitoneFromRoot) || '—';
}

const improvKeyboard = createPianoKeyboard(pi.keyboard, {
  lowestMidi: FULL_KEYBOARD_LOWEST_MIDI, octaves: FULL_KEYBOARD_OCTAVES, activeNote: null, tonicPitchClass: 0,
  showLabels: true, clickableWhite: false, clickableBlack: false,
});

let improvIsPlaying = false;
let improvStopRequested = false;
const midiFileCache = new Map(); // fileSlug -> parsed { notes, totalDurationMs }

function renderImprovTable(notes, key) {
  pi.tableBody.innerHTML = notes.map((n, i) => {
    const pc = ((n.midiNote % 12) + 12) % 12;
    const semitoneFromRoot = ((pc - key.semitoneFromC) + 12) % 12;
    const solfa = PhrygianScaleService.solfaForSemitoneFromRoot(semitoneFromRoot) || '—';
    return `
    <tr data-midi="${n.midiNote}" data-index="${i}">
      <td>${i + 1}</td><td>${midiNoteName(n.midiNote)}</td><td>${solfa}</td><td>${n.midiNote}</td><td>${(n.startMs / 1000).toFixed(2)}s</td>
    </tr>`;
  }).join('');
}

function highlightImprovRow(index) {
  pi.tableBody.querySelectorAll('tr').forEach((tr) => {
    tr.classList.toggle('is-current', Number(tr.getAttribute('data-index')) === index);
  });
}

async function loadCurrentKeyMidi() {
  const key = keyOptions[Number(pi.key.value)];
  pi.keyLabel.textContent = `Key of ${key.name}`;
  pi.loadError.style.display = 'none';

  improvKeyboard.update({ activeNote: null, tonicPitchClass: key.semitoneFromC });

  if (midiFileCache.has(key.fileSlug)) {
    renderImprovTable(midiFileCache.get(key.fileSlug).notes, key);
    return midiFileCache.get(key.fileSlug);
  }

  try {
    pi.play.disabled = true;
    const base64 = PHRYGIAN_SCALE_MIDI_DATA[key.fileSlug];
    if (!base64) throw new Error(`No embedded MIDI data for key slug "${key.fileSlug}"`);
    const parsed = loadMidiFileFromBase64(base64);
    midiFileCache.set(key.fileSlug, parsed);
    renderImprovTable(parsed.notes, key);
    return parsed;
  } catch (err) {
    console.error(err);
    pi.loadError.textContent = `Couldn't load the demo for ${key.name} Phrygian. Please refresh the page and try again.`;
    pi.loadError.style.display = '';
    return null;
  } finally {
    pi.play.disabled = false;
  }
}

async function playImprovDemo() {
  if (improvIsPlaying) return;
  const parsed = await loadCurrentKeyMidi();
  if (!parsed || parsed.notes.length === 0) return;

  improvIsPlaying = true;
  improvStopRequested = false;
  pi.play.disabled = true;
  pi.stop.disabled = false;

  const key = keyOptions[Number(pi.key.value)];
  const speedPct = Number(pi.tempo.value);
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

    pi.currentNote.textContent = `${midiNoteName(note.midiNote)} · ${solfaFor(note.midiNote, key)}`;
    pi.currentStep.textContent = `Note ${i + 1} of ${notes.length}`;
    pi.progress.style.width = `${((i + 1) * 100) / notes.length}%`;
    improvKeyboard.update({ activeNote: note.midiNote, tonicPitchClass: key.semitoneFromC });
    highlightImprovRow(i);

    midi.playNote(pi.output.value || null, note.midiNote, Math.round(note.durationMs * speedFactor * 0.9));
  }

  if (!improvStopRequested) {
    const remaining = parsed.totalDurationMs * speedFactor - (performance.now() - startedAt);
    if (remaining > 0) await new Promise((r) => setTimeout(r, remaining));
  }

  improvIsPlaying = false;
  pi.play.disabled = false;
  pi.stop.disabled = true;
  improvKeyboard.update({ activeNote: null });
}

function stopImprovDemo() {
  improvStopRequested = true;
  midi.stopAll(pi.output.value || null);
  improvIsPlaying = false;
  pi.play.disabled = false;
  pi.stop.disabled = true;
}

pi.key.addEventListener('change', loadCurrentKeyMidi);
pi.tempo.addEventListener('input', () => { pi.tempoValue.textContent = pi.tempo.value; });
pi.play.addEventListener('click', playImprovDemo);
pi.stop.addEventListener('click', stopImprovDemo);

// -------------------------------------------------------------------- init

(async function init() {
  const supported = await midi.init();
  el.midiWarning.style.display = supported ? 'none' : '';
  pi.midiWarning.style.display = supported ? 'none' : '';
  if (supported) {
    const outputs = midi.getOutputDevices();
    const optionsHtml = '<option value="">Built-in synth (no MIDI device needed)</option>' + outputs.map((d) => `<option value="${d.id}">${d.name}</option>`).join('');
    el.output.innerHTML = optionsHtml;
    pi.output.innerHTML = optionsHtml;
    await refreshInputDevices();
  }
  midi.onDevicesChanged((outputs) => {
    const optionsHtml = '<option value="">Built-in synth (no MIDI device needed)</option>' + outputs.map((d) => `<option value="${d.id}">${d.name}</option>`).join('');
    const currentOut = el.output.value;
    const currentPiOut = pi.output.value;
    el.output.innerHTML = optionsHtml;
    el.output.value = currentOut;
    pi.output.innerHTML = optionsHtml;
    pi.output.value = currentPiOut;
  });
  midi.onNoteOn((note) => onMidiNoteOn(note));

  rebuildSequence();
  await loadCurrentKeyMidi();
})();
