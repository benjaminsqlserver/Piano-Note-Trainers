// chromatic-trainer.js — page logic for chromatic-trainer.html
// Expects audio-engine.js, piano-keyboard.js, music-services.js, and tabs.js
// to already be loaded as plain scripts before this one.
const ScaleService = ChromaticScaleService;
const midi = new AudioEngine();
const keyOptions = ScaleService.keys;

const el = {
  key: document.getElementById('ct-key'),
  octave: document.getElementById('ct-octave'),
  tempo: document.getElementById('ct-tempo'),
  tempoValue: document.getElementById('ct-tempo-value'),
  output: document.getElementById('ct-output'),
  play: document.getElementById('ct-play'),
  step: document.getElementById('ct-step'),
  stop: document.getElementById('ct-stop'),
  practice: document.getElementById('ct-practice'),
  input: document.getElementById('ct-input'),
  midiWarning: document.getElementById('ct-midi-warning'),
  directionLabel: document.getElementById('ct-direction-label'),
  currentSolfa: document.getElementById('ct-current-solfa'),
  currentNote: document.getElementById('ct-current-note'),
  progress: document.getElementById('ct-progress'),
  keyboard: document.getElementById('ct-keyboard'),
  tableTitle: document.getElementById('ct-table-title'),
  tableBody: document.getElementById('ct-table-body'),
};

keyOptions.forEach((k, i) => {
  const opt = document.createElement('option');
  opt.value = String(i);
  opt.textContent = k.displayName;
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
  if (direction === 'ascending') sequence = ScaleService.buildAscending(key, octave);
  else if (direction === 'descending') sequence = ScaleService.buildDescending(key, octave);
  else sequence = ScaleService.buildAscendingThenDescending(key, octave);

  currentStep = null;
  expectedPracticeIndex = 0;
  el.directionLabel.textContent = directionLabelText();
  el.currentSolfa.textContent = '—';
  el.currentNote.textContent = '';
  el.progress.style.width = '0%';
  el.tableTitle.textContent = `${key.displayName} chromatic scale — ${directionLabelText()}`;

  keyboard.update({ activeNote: null, tonicPitchClass: Number(el.key.value) });

  renderTable();
}

function renderTable() {
  el.tableBody.innerHTML = sequence.map((s) => `
    <tr data-midi="${s.midiNote}">
      <td>${s.noteName}</td><td>${s.solfa}</td><td>${s.midiNote}</td><td>${s.isTonic ? '●' : ''}</td>
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
  const tonicPitchClass = Number(el.key.value);

  for (let i = 0; i < sequence.length; i++) {
    if (stopRequested) break;
    currentStep = sequence[i];
    el.currentSolfa.textContent = currentStep.solfa;
    el.currentNote.textContent = currentStep.noteName;
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
    el.currentSolfa.textContent = currentStep.solfa;
    el.currentNote.textContent = currentStep.noteName;
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
  el.currentSolfa.textContent = expected.solfa;
  el.currentNote.textContent = expected.noteName;
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

initSegmented(document.querySelector('[data-segmented="ct-direction"]'), (value) => {
  direction = value;
  rebuildSequence();
});

(async function init() {
  const supported = await midi.init();
  el.midiWarning.style.display = supported ? 'none' : '';
  if (supported) {
    const outputs = midi.getOutputDevices();
    el.output.innerHTML = '<option value="">Built-in synth (no MIDI device needed)</option>' + outputs.map((d) => `<option value="${d.id}">${d.name}</option>`).join('');
    await refreshInputDevices();
  }
  midi.onDevicesChanged((outputs) => {
    const current = el.output.value;
    el.output.innerHTML = '<option value="">Built-in synth (no MIDI device needed)</option>' + outputs.map((d) => `<option value="${d.id}">${d.name}</option>`).join('');
    el.output.value = current;
  });
  midi.onNoteOn((note) => onMidiNoteOn(note));

  rebuildSequence();
})();
