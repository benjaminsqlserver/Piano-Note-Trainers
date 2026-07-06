// accidental-trainer.js — shared page logic for the Sharp Key and Flat Key
// trainers, which are structurally identical (Learn / Guided Trainer /
// Flashcard Quiz) and differ only in their note data. The page sets
// `window.ACCIDENTAL_KIND` to 'sharp' or 'flat' before this script loads.
// Expects audio-engine.js, piano-keyboard.js, music-services.js, and tabs.js
// to already be loaded as plain scripts before this one.

initTabs();

const KIND = window.ACCIDENTAL_KIND === 'flat' ? 'flat' : 'sharp';
const KeyService = KIND === 'flat' ? FlatKeyService : SharpKeyService;
const SYMBOL_WORD = KIND === 'flat' ? 'flat' : 'sharp';
const noteOptions = KeyService.notes;
const QUIZ_LETTERS = noteOptions.map((n) => n.letter);
const midi = new AudioEngine();

const el = {
  learnButtons: document.getElementById('at-learn-buttons'),
  learnLetter: document.getElementById('at-learn-letter'),
  learnInfo: document.getElementById('at-learn-info'),
  learnKeyboard: document.getElementById('at-learn-keyboard'),
  learnTableBody: document.getElementById('at-learn-table-body'),

  note: document.getElementById('at-note'),
  octave: document.getElementById('at-octave'),
  span: document.getElementById('at-span'),
  tempo: document.getElementById('at-tempo'),
  tempoValue: document.getElementById('at-tempo-value'),
  output: document.getElementById('at-output'),
  play: document.getElementById('at-play'),
  stop: document.getElementById('at-stop'),
  practice: document.getElementById('at-practice'),
  input: document.getElementById('at-input'),
  midiWarning: document.getElementById('at-midi-warning'),
  directionLabel: document.getElementById('at-direction-label'),
  currentLetter: document.getElementById('at-current-letter'),
  currentLabel: document.getElementById('at-current-label'),
  currentEnharmonic: document.getElementById('at-current-enharmonic'),
  progress: document.getElementById('at-progress'),
  keyboard: document.getElementById('at-keyboard'),
  tableTitle: document.getElementById('at-table-title'),
  tableBody: document.getElementById('at-table-body'),

  quizMinOct: document.getElementById('at-quiz-minoct'),
  quizMaxOct: document.getElementById('at-quiz-maxoct'),
  quizNext: document.getElementById('at-quiz-next'),
  quizHear: document.getElementById('at-quiz-hear'),
  quizScore: document.getElementById('at-quiz-score'),
  quizStreak: document.getElementById('at-quiz-streak'),
  quizPrompt: document.getElementById('at-quiz-prompt'),
  quizLetter: document.getElementById('at-quiz-letter'),
  quizFeedback: document.getElementById('at-quiz-feedback'),
  quizEnharmonicNote: document.getElementById('at-quiz-enharmonic-note'),
  quizKeyboard: document.getElementById('at-quiz-keyboard'),
  quizLettersCard: document.getElementById('at-quiz-letters-card'),
  quizLetters: document.getElementById('at-quiz-letters'),
};

// populate dropdown + learn buttons
noteOptions.forEach((n, i) => {
  const opt = document.createElement('option');
  opt.value = String(i);
  opt.textContent = n.letter;
  el.note.appendChild(opt);

  const btn = document.createElement('button');
  btn.className = 'letter-btn';
  btn.textContent = n.letter;
  btn.style.width = '3.6rem';
  btn.addEventListener('click', () => selectLearnNote(i));
  el.learnButtons.appendChild(btn);
});

// ------------------------------------------------------------ Learn tab

function selectLearnNote(letterIndex) {
  const note = noteOptions[letterIndex];
  document.querySelectorAll('#at-learn-buttons .letter-btn').forEach((b, i) => b.classList.toggle('is-active', i === letterIndex));
  el.learnLetter.textContent = note.letter;
  if (note.isWhiteKeyEnharmonic) {
    el.learnInfo.innerHTML = `<div class="alert alert-warning">${note.letter} is enharmonically the same key as <strong>${note.whiteKeyEnharmonicName}</strong> — a white key, not a black one.</div>`;
  } else {
    el.learnInfo.innerHTML = `<p>${note.letter} is a black key, one semitone ${KIND === 'flat' ? 'below' : 'above'} natural ${note.baseLetter}.</p>`;
  }
  learnKeyboard.update({ activeNote: note.midiNoteForOctave(4) });
  midi.playNote(null, note.midiNoteForOctave(4), 600);
}

const learnKeyboard = createPianoKeyboard(el.learnKeyboard, {
  lowestMidi: 60, octaves: 1, activeNote: null, tonicPitchClass: null,
  showLabels: true, clickableWhite: false, clickableBlack: false,
  pitchClassLabels: KeyService.pitchClassLabels,
});

el.learnTableBody.innerHTML = noteOptions.map((n) => `
  <tr>
    <td>${n.letter}</td>
    <td>${n.baseLetter}</td>
    <td>${n.isWhiteKeyEnharmonic ? 'White key' : 'Black key'}</td>
    <td>${n.whiteKeyEnharmonicName || '—'}</td>
  </tr>`).join('');

// ------------------------------------------------------------ Guided trainer

let direction = 'ascending';
let sequence = [];
let currentStep = null;
let isPlaying = false;
let stopRequested = false;
let practiceMode = false;
let expectedPracticeIndex = 0;

const keyboard = createPianoKeyboard(el.keyboard, {
  lowestMidi: 60, octaves: 2, activeNote: null, tonicPitchClass: null,
  showLabels: true, clickableWhite: false, clickableBlack: false,
  pitchClassLabels: KeyService.pitchClassLabels,
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
  el.currentEnharmonic.textContent = '';
  el.progress.style.width = '0%';
  el.tableTitle.textContent = `${SYMBOL_WORD[0].toUpperCase()}${SYMBOL_WORD.slice(1)} keys from ${note.letter}${octave} — ${directionLabelText()}`;

  const lowestMidi = 12 * (octave + 1);
  const octaves = Math.max(2, span + 1);
  keyboard.update({ lowestMidi, octaves, activeNote: null, tonicPitchClass: note.pitchClass });

  renderTable();
}

function renderTable() {
  el.tableBody.innerHTML = sequence.map((s) => `
    <tr data-midi="${s.midiNote}">
      <td>${s.letter}</td><td>${s.octave}</td><td>${s.midiNote}</td>
      <td>${s.whiteKeyEnharmonicName || '—'}</td>
      <td>${s.isTonic ? '●' : ''}</td>
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
  const octave = Number(el.octave.value);
  const lowestMidi = 12 * (octave + 1);
  const span = Number(el.span.value);
  const tonicPitchClass = noteOptions[Number(el.note.value)].pitchClass;

  for (let i = 0; i < sequence.length; i++) {
    if (stopRequested) break;
    currentStep = sequence[i];
    el.currentLetter.textContent = currentStep.letter;
    el.currentLabel.textContent = `${currentStep.letter}${currentStep.octave}`;
    el.currentEnharmonic.textContent = currentStep.isWhiteKeyEnharmonic
      ? `(sounds the same as ${currentStep.whiteKeyEnharmonicName} — a white key)` : '';
    el.progress.style.width = `${((i + 1) * 100) / sequence.length}%`;
    keyboard.update({ lowestMidi, octaves: Math.max(2, span + 1), activeNote: currentStep.midiNote, tonicPitchClass });
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

function pitchClassLetter(pc) {
  return KeyService.pitchClassLabels[pc] || null;
}

function onMidiNoteOn(midiNote) {
  const pc = ((midiNote % 12) + 12) % 12;

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
  }

  if (quizTarget && quizFeedback === 'none') {
    const playedLetter = pitchClassLetter(pc);
    evaluateQuizGuess(playedLetter === quizTarget.letter);
  }
}

el.note.addEventListener('change', rebuildSequence);
el.octave.addEventListener('change', rebuildSequence);
el.span.addEventListener('change', rebuildSequence);
el.tempo.addEventListener('input', () => { el.tempoValue.textContent = el.tempo.value; });
el.play.addEventListener('click', playSequence);
el.stop.addEventListener('click', stopPlayback);
el.practice.addEventListener('click', togglePracticeMode);

initSegmented(document.querySelector('[data-segmented="at-direction"]'), (value) => {
  direction = value;
  rebuildSequence();
});

// ------------------------------------------------------------ Flashcard quiz

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
  btn.style.width = '3.6rem';
  btn.addEventListener('click', () => onLetterGuessed(letter));
  el.quizLetters.appendChild(btn);
});

const quizKeyboard = createPianoKeyboard(el.quizKeyboard, {
  lowestMidi: 48, octaves: 3, activeNote: null, tonicPitchClass: null,
  showLabels: false, clickableWhite: false, clickableBlack: false,
  pitchClassLabels: KeyService.pitchClassLabels,
  onKeyClick: (midiNote) => onQuizKeyClicked(midiNote),
});

function updateQuizControlsMode() {
  const isName = quizMode === 'name';
  el.quizPrompt.style.display = isName ? '' : 'none';
  el.quizPrompt.textContent = `Which ${SYMBOL_WORD} key is highlighted?`;
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

  quizTarget = {
    midiNote: note.midiNoteForOctave(randomOctave), letter: note.letter, octave: randomOctave,
    isTonic: false, isWhiteKeyEnharmonic: note.isWhiteKeyEnharmonic, whiteKeyEnharmonicName: note.whiteKeyEnharmonicName,
  };
  quizFeedback = 'none';
  revealLabels = false;

  el.quizFeedback.innerHTML = '';
  el.quizEnharmonicNote.textContent = '';
  el.quizLetter.textContent = quizTarget.letter;
  document.querySelectorAll('#at-quiz-letters .letter-btn').forEach((b) => { b.disabled = false; });

  const lowestMidi = 12 * (minOct + 1);
  const octaves = Math.max(1, maxOct - minOct + 1);
  quizKeyboard.update({
    lowestMidi, octaves,
    activeNote: quizMode === 'name' ? quizTarget.midiNote : null,
    showLabels: revealLabels,
    clickableWhite: quizMode === 'find', clickableBlack: quizMode === 'find',
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
  const pc = ((midiNote % 12) + 12) % 12;
  const clickedLetter = pitchClassLetter(pc);
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
  if (quizTarget.isWhiteKeyEnharmonic) {
    el.quizEnharmonicNote.textContent = `(a white key — same sound as ${quizTarget.whiteKeyEnharmonicName})`;
  }
  el.quizScore.textContent = `${correctCount} / ${totalCount}`;
  el.quizStreak.textContent = String(streak);
  document.querySelectorAll('#at-quiz-letters .letter-btn').forEach((b) => { b.disabled = true; });

  quizKeyboard.update({ showLabels: true });

  setTimeout(nextQuestion, 1200);
}

el.quizNext.addEventListener('click', nextQuestion);
el.quizHear.addEventListener('click', playQuizNote);
el.quizMinOct.addEventListener('change', nextQuestion);
el.quizMaxOct.addEventListener('change', nextQuestion);

initSegmented(document.querySelector('[data-segmented="at-quizmode"]'), (value) => {
  quizMode = value;
  nextQuestion();
});

// ----------------------------------------------------------------- init

(async function init() {
  selectLearnNote(0);

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
