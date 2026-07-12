// white-trainer.js — page logic for white-key-trainer.html
// Expects audio-engine.js, piano-keyboard.js, music-services.js, and tabs.js
// to already be loaded as plain scripts before this one.
const KeyService = WhiteKeyService;

initTabs();

const midi = new AudioEngine();
const noteOptions = KeyService.notes; // C..B in pitch order
const QUIZ_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const LETTER_BY_PITCH_CLASS = ['C', 'C', 'D', 'D', 'E', 'F', 'F', 'G', 'G', 'A', 'A', 'B'];

// ---------------------------------------------------------------- elements
const el = {
  note: document.getElementById('wt-note'),
  octave: document.getElementById('wt-octave'),
  span: document.getElementById('wt-span'),
  tempo: document.getElementById('wt-tempo'),
  tempoValue: document.getElementById('wt-tempo-value'),
  output: document.getElementById('wt-output'),
  play: document.getElementById('wt-play'),
  stop: document.getElementById('wt-stop'),
  practice: document.getElementById('wt-practice'),
  input: document.getElementById('wt-input'),
  midiWarning: document.getElementById('wt-midi-warning'),
  directionLabel: document.getElementById('wt-direction-label'),
  currentLetter: document.getElementById('wt-current-letter'),
  currentLabel: document.getElementById('wt-current-label'),
  progress: document.getElementById('wt-progress'),
  keyboard: document.getElementById('wt-keyboard'),
  tableTitle: document.getElementById('wt-table-title'),
  tableBody: document.getElementById('wt-table-body'),

  quizMinOct: document.getElementById('wt-quiz-minoct'),
  quizMaxOct: document.getElementById('wt-quiz-maxoct'),
  quizNext: document.getElementById('wt-quiz-next'),
  quizHear: document.getElementById('wt-quiz-hear'),
  quizScore: document.getElementById('wt-quiz-score'),
  quizStreak: document.getElementById('wt-quiz-streak'),
  quizPrompt: document.getElementById('wt-quiz-prompt'),
  quizLetter: document.getElementById('wt-quiz-letter'),
  quizFeedback: document.getElementById('wt-quiz-feedback'),
  quizKeyboard: document.getElementById('wt-quiz-keyboard'),
  quizLettersCard: document.getElementById('wt-quiz-letters-card'),
  quizLetters: document.getElementById('wt-quiz-letters'),
};

// populate start-note dropdown
noteOptions.forEach((n, i) => {
  const opt = document.createElement('option');
  opt.value = String(i);
  opt.textContent = n.letter;
  el.note.appendChild(opt);
});

// ------------------------------------------------------------- shared state
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
  const note = noteOptions[Number(el.note.value)];
  const octave = Number(el.octave.value);
  const span = Number(el.span.value);
  if (direction === 'ascending') sequence = KeyService.buildAscending(note, octave, span);
  else if (direction === 'descending') sequence = KeyService.buildDescending(note, octave, span);
  else sequence = KeyService.buildAscendingThenDescending(note, octave, span);

  currentStep = null;
  expectedPracticeIndex = 0;
  el.directionLabel.textContent = directionLabelText();
  el.currentLetter.textContent = '—';
  el.currentLabel.textContent = '';
  el.progress.style.width = '0%';
  el.tableTitle.textContent = `White keys from ${note.letter}${octave} — ${directionLabelText()}`;

  keyboard.update({ activeNote: null, tonicPitchClass: note.semitoneFromC });

  renderTable();
}

function renderTable() {
  el.tableBody.innerHTML = sequence.map((s) => `
    <tr data-midi="${s.midiNote}">
      <td>${s.letter}</td><td>${s.octave}</td><td>${s.midiNote}</td><td>${s.isTonic ? '●' : ''}</td>
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

  for (let i = 0; i < sequence.length; i++) {
    if (stopRequested) break;
    currentStep = sequence[i];
    el.currentLetter.textContent = currentStep.letter;
    el.currentLabel.textContent = `${currentStep.letter}${currentStep.octave}`;
    el.progress.style.width = `${((i + 1) * 100) / sequence.length}%`;
    keyboard.update({ activeNote: currentStep.midiNote, tonicPitchClass: noteOptions[Number(el.note.value)].semitoneFromC });
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
  let changed = false;
  if (practiceMode && sequence.length > 0) {
    const expected = sequence[expectedPracticeIndex];
    currentStep = expected;
    el.currentLetter.textContent = expected.letter;
    el.currentLabel.textContent = `${expected.letter}${expected.octave}`;
    el.progress.style.width = `${((expectedPracticeIndex + 1) * 100) / sequence.length}%`;
    highlightRow(expected.midiNote);
    if (midiNote === expected.midiNote) {
      expectedPracticeIndex = Math.min(expectedPracticeIndex + 1, sequence.length - 1);
    }
    changed = true;
  }

  if (quizTarget && quizFeedback === 'none') {
    const playedLetter = LETTER_BY_PITCH_CLASS[((midiNote % 12) + 12) % 12];
    evaluateQuizGuess(playedLetter === quizTarget.letter);
    changed = true;
  }

  return changed;
}

// -------------------------------------------------------------- controls

el.note.addEventListener('change', rebuildSequence);
el.octave.addEventListener('change', rebuildSequence);
el.span.addEventListener('change', rebuildSequence);
el.tempo.addEventListener('input', () => { el.tempoValue.textContent = el.tempo.value; });
el.play.addEventListener('click', playSequence);
el.stop.addEventListener('click', stopPlayback);
el.practice.addEventListener('click', togglePracticeMode);

initSegmented(document.querySelector('[data-segmented="wt-direction"]'), (value) => {
  direction = value;
  rebuildSequence();
});

// ============================================================ FLASHCARD QUIZ

let quizMode = 'name';
let quizTarget = null;
let quizFeedback = 'none';
let revealLabels = false;
let correctCount = 0;
let totalCount = 0;
let streak = 0;

QUIZ_LETTERS.forEach((letter) => {
  const btn = document.createElement('button');
  btn.className = 'letter-btn';
  btn.textContent = letter;
  btn.addEventListener('click', () => onLetterGuessed(letter));
  el.quizLetters.appendChild(btn);
});

const quizKeyboard = createPianoKeyboard(el.quizKeyboard, {
  lowestMidi: FULL_KEYBOARD_LOWEST_MIDI, octaves: FULL_KEYBOARD_OCTAVES, activeNote: null, tonicPitchClass: null,
  showLabels: false, clickableWhite: false, clickableBlack: false,
  onKeyClick: (midiNote) => onQuizKeyClicked(midiNote),
});

function updateQuizControlsMode() {
  const isName = quizMode === 'name';
  el.quizPrompt.style.display = isName ? '' : 'none';
  el.quizPrompt.textContent = 'Which white key is highlighted?';
  el.quizLetter.style.display = isName ? 'none' : '';
  el.quizLettersCard.style.display = isName ? '' : 'none';
}

function nextQuestion() {
  let minOct = Number(el.quizMinOct.value);
  let maxOct = Number(el.quizMaxOct.value);
  if (maxOct < minOct) { maxOct = minOct; el.quizMaxOct.value = String(maxOct); }

  const octaveRange = maxOct - minOct + 1;
  const randomOctave = minOct + Math.floor(Math.random() * octaveRange);
  const note = noteOptions[Math.floor(Math.random() * noteOptions.length)];

  quizTarget = { midiNote: note.midiNoteForOctave(randomOctave), letter: note.letter, octave: randomOctave, isTonic: false };
  quizFeedback = 'none';
  revealLabels = false;

  el.quizFeedback.innerHTML = '';
  el.quizLetter.textContent = quizTarget.letter;
  document.querySelectorAll('#wt-quiz-letters .letter-btn').forEach((b) => { b.disabled = false; b.classList.remove('is-active'); });

  quizKeyboard.update({
    activeNote: quizMode === 'name' ? quizTarget.midiNote : null,
    showLabels: revealLabels,
    clickableWhite: quizMode === 'find',
  });

  updateQuizControlsMode();
}

function playQuizNote() {
  if (!quizTarget) return;
  midi.playNote(el.output.value || null, quizTarget.midiNote, 600);
}

function onLetterGuessed(letter) {
  if (!quizTarget || quizFeedback !== 'none') return;
  evaluateQuizGuess(letter === quizTarget.letter);
}

function onQuizKeyClicked(midiNote) {
  if (!quizTarget || quizFeedback !== 'none') return;
  if (quizMode !== 'find') return;
  const clickedLetter = LETTER_BY_PITCH_CLASS[((midiNote % 12) + 12) % 12];
  evaluateQuizGuess(clickedLetter === quizTarget.letter);
}

function evaluateQuizGuess(isCorrect) {
  totalCount++;
  revealLabels = true;
  if (isCorrect) {
    correctCount++;
    streak++;
    quizFeedback = 'correct';
    el.quizFeedback.innerHTML = `<div class="alert alert-success">Correct — that's ${quizTarget.letter}!</div>`;
  } else {
    streak = 0;
    quizFeedback = 'incorrect';
    el.quizFeedback.innerHTML = `<div class="alert alert-danger">Not quite — that key is ${quizTarget.letter}. Try the next one!</div>`;
  }
  el.quizScore.textContent = `${correctCount} / ${totalCount}`;
  el.quizStreak.textContent = String(streak);
  document.querySelectorAll('#wt-quiz-letters .letter-btn').forEach((b) => { b.disabled = true; });

  quizKeyboard.update({ showLabels: true });

  setTimeout(nextQuestion, 1200);
}

el.quizNext.addEventListener('click', nextQuestion);
el.quizHear.addEventListener('click', playQuizNote);
el.quizMinOct.addEventListener('change', nextQuestion);
el.quizMaxOct.addEventListener('change', nextQuestion);

initSegmented(document.querySelector('[data-segmented="wt-quizmode"]'), (value) => {
  quizMode = value;
  nextQuestion();
});

// -------------------------------------------------------------------- init

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
  nextQuestion();
})();
