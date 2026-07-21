// progression-picker.js
// Shared factory for a "pick a progression, pick a key, play it" MIDI
// exercise tab -- the same shape used by the Jazz Progressions and Gospel
// Progressions tabs on the Sixth Chord and Minor Sixth Chord lessons.
// Every progression is always played in root position; if an inversion
// picker is needed too, see the Chord Inversions lesson's own
// setupProgressionExercise() in inversions-trainer.js instead.
//
// Expects audio-engine.js, piano-keyboard.js, music-services.js, and
// tabs.js to already be loaded as plain scripts before this one.

/** Plays every note of a chord at (roughly) the same instant, as a chord. */
function playChordNotes(midi, deviceId, midiNotes, durationMs, velocity = 100) {
  midiNotes.forEach((n) => midi.playNote(deviceId, n, durationMs, velocity));
}

function progressionPickerWait(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }

/**
 * Wires up a progression-picker exercise tab.
 * `prefix` — the DOM id prefix shared by every element on this tab (e.g. 'jz', 'gp').
 * `progressions` — array of progression defs, same shape used throughout music-services.js.
 * `midi` — a shared AudioEngine instance.
 * Returns `{ outputSelect, midiWarning }` so the page's init() can wire up MIDI devices.
 */
function setupProgressionPicker(prefix, progressions, midi) {
  const inv = InversionService; // shared 12-key list + generic chord/progression builder
  const keys = inv.keys;

  const el = {
    progression: document.getElementById(`${prefix}-progression`),
    key: document.getElementById(`${prefix}-key`),
    octave: document.getElementById(`${prefix}-octave`),
    tempo: document.getElementById(`${prefix}-tempo`),
    tempoValue: document.getElementById(`${prefix}-tempo-value`),
    output: document.getElementById(`${prefix}-output`),
    description: document.getElementById(`${prefix}-description`),
    play: document.getElementById(`${prefix}-play`),
    playAll: document.getElementById(`${prefix}-play-all`),
    step: document.getElementById(`${prefix}-step`),
    stop: document.getElementById(`${prefix}-stop`),
    midiWarning: document.getElementById(`${prefix}-midi-warning`),
    keyLabel: document.getElementById(`${prefix}-key-label`),
    currentChord: document.getElementById(`${prefix}-current-chord`),
    currentDegree: document.getElementById(`${prefix}-current-degree`),
    progress: document.getElementById(`${prefix}-progress`),
    keyboard: document.getElementById(`${prefix}-keyboard`),
    tableTitle: document.getElementById(`${prefix}-table-title`),
    tableBody: document.getElementById(`${prefix}-table-body`),
  };

  progressions.forEach((p, i) => {
    const opt = document.createElement('option');
    opt.value = String(i);
    opt.textContent = `${p.name} (${p.label})`;
    el.progression.appendChild(opt);
  });

  keys.forEach((k, i) => {
    const opt = document.createElement('option');
    opt.value = String(i);
    opt.textContent = k.name;
    el.key.appendChild(opt);
  });

  const keyboard = createPianoKeyboard(el.keyboard, {
    lowestMidi: FULL_KEYBOARD_LOWEST_MIDI, octaves: FULL_KEYBOARD_OCTAVES, activeNote: null, activeNotes: [], tonicPitchClass: 0,
    showLabels: true, clickableWhite: false, clickableBlack: false,
  });

  let isPlaying = false;
  let stopRequested = false;
  let stepIndex = 0;

  function currentProgression() {
    return progressions[Number(el.progression.value)];
  }

  function renderTable(key, octave) {
    const progressionDef = currentProgression();
    const chords = inv.buildProgressionChords(progressionDef, key, octave, 0, false);
    el.tableTitle.textContent = `Progression in ${key.name}`;
    el.tableBody.innerHTML = chords.map((c, i) => `
      <tr data-index="${i}">
        <td>${c.roman} (${c.name})</td><td>${c.chordName}</td><td>${c.tones.map((t) => t.noteName).join(' – ')}</td>
      </tr>`).join('');
    return chords;
  }

  function highlightRow(index) {
    el.tableBody.querySelectorAll('tr').forEach((tr) => {
      tr.classList.toggle('is-current', Number(tr.getAttribute('data-index')) === index);
    });
  }

  function refresh() {
    stepIndex = 0;
    const key = keys[Number(el.key.value)];
    const octave = Number(el.octave.value);
    const progressionDef = currentProgression();
    el.description.textContent = progressionDef.description;
    el.keyLabel.textContent = `Key of ${key.name}`;
    keyboard.update({ activeNote: null, activeNotes: [], tonicPitchClass: key.semitoneFromC });
    el.currentChord.textContent = '—';
    el.currentDegree.textContent = '';
    el.progress.style.width = '0%';
    renderTable(key, octave);
  }

  async function playChordsSequence(chords, tonicPitchClass, bpm) {
    const chordDurationMs = (60000 / bpm) * 2;
    for (let i = 0; i < chords.length; i++) {
      if (stopRequested) break;
      const c = chords[i];
      const notes = c.tones.map((t) => t.midiNote);
      el.currentChord.textContent = c.chordName;
      el.currentDegree.textContent = `Degree ${c.roman} (${c.name})`;
      el.progress.style.width = `${((i + 1) * 100) / chords.length}%`;
      keyboard.update({ activeNote: null, activeNotes: notes, tonicPitchClass });
      highlightRow(i);
      playChordNotes(midi, el.output.value || null, notes, Math.round(chordDurationMs * 0.9));
      await progressionPickerWait(chordDurationMs);
      if (stopRequested) break;
    }
  }

  async function playInCurrentKey() {
    if (isPlaying) return;
    isPlaying = true;
    stopRequested = false;
    el.play.disabled = true;
    el.playAll.disabled = true;
    el.step.disabled = true;
    el.stop.disabled = false;

    const key = keys[Number(el.key.value)];
    const octave = Number(el.octave.value);
    const bpm = Number(el.tempo.value);
    const chords = renderTable(key, octave);
    el.keyLabel.textContent = `Key of ${key.name}`;

    await playChordsSequence(chords, key.semitoneFromC, bpm);

    isPlaying = false;
    el.play.disabled = false;
    el.playAll.disabled = false;
    el.step.disabled = false;
    el.stop.disabled = true;
    keyboard.update({ activeNotes: [] });
  }

  async function playInAllKeys() {
    if (isPlaying) return;
    isPlaying = true;
    stopRequested = false;
    el.play.disabled = true;
    el.playAll.disabled = true;
    el.step.disabled = true;
    el.stop.disabled = false;

    const octave = Number(el.octave.value);
    const bpm = Number(el.tempo.value);

    for (let k = 0; k < keys.length; k++) {
      if (stopRequested) break;
      const key = keys[k];
      el.key.value = String(k);
      el.keyLabel.textContent = `Key of ${key.name}`;
      const chords = renderTable(key, octave);
      await playChordsSequence(chords, key.semitoneFromC, bpm);
      if (stopRequested) break;
      await progressionPickerWait(150);
    }

    isPlaying = false;
    el.play.disabled = false;
    el.playAll.disabled = false;
    el.step.disabled = false;
    el.stop.disabled = true;
    keyboard.update({ activeNotes: [] });
  }

  function stopPlayback() {
    stopRequested = true;
    midi.stopAll(el.output.value || null);
    isPlaying = false;
    el.play.disabled = false;
    el.playAll.disabled = false;
    el.step.disabled = false;
    el.stop.disabled = true;
  }

  /** Silently advances to the next chord in the current key's progression -- highlights the keyboard, table row, and labels, but plays no sound. */
  function stepForward() {
    if (isPlaying) return;
    const key = keys[Number(el.key.value)];
    const octave = Number(el.octave.value);
    const chords = renderTable(key, octave);
    if (stepIndex >= chords.length) stepIndex = 0;
    const c = chords[stepIndex];
    const notes = c.tones.map((t) => t.midiNote);
    el.keyLabel.textContent = `Key of ${key.name}`;
    el.currentChord.textContent = c.chordName;
    el.currentDegree.textContent = `Degree ${c.roman} (${c.name})`;
    el.progress.style.width = `${((stepIndex + 1) * 100) / chords.length}%`;
    keyboard.update({ activeNote: null, activeNotes: notes, tonicPitchClass: key.semitoneFromC });
    highlightRow(stepIndex);

    stepIndex += 1;
  }

  el.progression.addEventListener('change', refresh);
  el.key.addEventListener('change', refresh);
  el.octave.addEventListener('change', refresh);
  el.tempo.addEventListener('input', () => { el.tempoValue.textContent = el.tempo.value; });
  el.play.addEventListener('click', playInCurrentKey);
  el.playAll.addEventListener('click', playInAllKeys);
  el.step.addEventListener('click', stepForward);
  el.stop.addEventListener('click', stopPlayback);

  refresh();

  return { outputSelect: el.output, midiWarning: el.midiWarning };
}
