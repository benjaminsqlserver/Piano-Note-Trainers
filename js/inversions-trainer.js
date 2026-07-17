// inversions-trainer.js — page logic for inversions-trainer.html
// Expects audio-engine.js, piano-keyboard.js, music-services.js, and
// tabs.js to already be loaded as plain scripts before this one.
initTabs();

const midi = new AudioEngine();
const inv = InversionService;
const invKeys = inv.keys; // 12 keys, chromatic order, sharp spellings

/** Plays every note of a chord at (roughly) the same instant, as a chord. */
function playChord(deviceId, midiNotes, durationMs, velocity = 100) {
  midiNotes.forEach((n) => midi.playNote(deviceId, n, durationMs, velocity));
}

function wait(ms) { return new Promise((r) => setTimeout(r, ms)); }

/**
 * Small segmented (pill button-group) helper with both a getter *and* a
 * setter, plus per-button disabling — tabs.js's initSegmented only
 * supports reading the current value, which isn't enough here since some
 * controls need to be reset or capped programmatically (e.g. a triad has
 * no 3rd inversion).
 */
function setupSegmented(container, initialValue, onChange) {
  const buttons = Array.from(container.querySelectorAll('button'));
  function setValue(v) {
    buttons.forEach((b) => b.classList.toggle('is-active', b.getAttribute('data-value') === String(v)));
  }
  buttons.forEach((b) => {
    b.addEventListener('click', () => {
      if (b.disabled) return;
      setValue(b.getAttribute('data-value'));
      onChange(Number(b.getAttribute('data-value')));
    });
  });
  setValue(initialValue);
  return {
    get value() {
      const active = container.querySelector('button.is-active');
      return active ? Number(active.getAttribute('data-value')) : 0;
    },
    set value(v) { setValue(v); },
    buttons,
  };
}

function populateOutputSelects(selects, outputs) {
  const optionsHtml = '<option value="">Built-in synth (no MIDI device needed)</option>' + outputs.map((d) => `<option value="${d.id}">${d.name}</option>`).join('');
  selects.forEach((sel) => {
    const current = sel.value;
    sel.innerHTML = optionsHtml;
    sel.value = current;
  });
}

// ==================================================================== LEARN

const lc = {
  quality: document.getElementById('lc-quality'),
  root: document.getElementById('lc-root'),
  output: document.getElementById('lc-output'),
  play: document.getElementById('lc-play'),
  chordLabel: document.getElementById('lc-chord-label'),
  inversionValue: document.getElementById('lc-inversion-value'),
  notesSub: document.getElementById('lc-notes-sub'),
  keyboard: document.getElementById('lc-keyboard'),
  tableBody: document.getElementById('lc-table-body'),
  recipeTableBody: document.getElementById('lc-recipe-table-body'),
  inversion3Button: document.getElementById('lc-inversion-3'),
};

inv.qualityOrder.forEach((q) => {
  const opt = document.createElement('option');
  opt.value = q;
  opt.textContent = inv.qualities[q].displayName;
  lc.quality.appendChild(opt);
});

invKeys.forEach((k, i) => {
  const opt = document.createElement('option');
  opt.value = String(i);
  opt.textContent = k.name;
  lc.root.appendChild(opt);
});

const LEARN_OCTAVE = 4;

const lcInversion = setupSegmented(document.querySelector('[data-segmented="lc-inversion"]'), 0, () => renderLearnChord());

const learnKeyboard = createPianoKeyboard(lc.keyboard, {
  lowestMidi: FULL_KEYBOARD_LOWEST_MIDI, octaves: FULL_KEYBOARD_OCTAVES, activeNote: null, activeNotes: [], tonicPitchClass: 0,
  showLabels: true, clickableWhite: false, clickableBlack: false,
});

function currentLearnQualityMaxInversion() {
  const qualityKey = lc.quality.value;
  return inv.qualities[qualityKey].intervals.length - 1; // triad: 2, seventh chord: 3
}

function refreshInversion3Availability() {
  const maxInversion = currentLearnQualityMaxInversion();
  const triadOnly = maxInversion < 3;
  lc.inversion3Button.disabled = triadOnly;
  lc.inversion3Button.title = triadOnly ? 'This chord type only has 3 notes, so it has no 3rd inversion.' : '';
  if (triadOnly && lcInversion.value > maxInversion) {
    lcInversion.value = maxInversion;
  }
}

function renderLearnChord() {
  const key = invKeys[Number(lc.root.value)];
  const qualityKey = lc.quality.value;
  const rootTones = inv.buildChordTones(key, LEARN_OCTAVE, qualityKey, false);
  const requested = lcInversion.value;
  const { tones, appliedInversion, bassNoteName } = inv.invert(rootTones, requested);

  lc.chordLabel.textContent = `${rootTones[0].noteName} ${inv.qualities[qualityKey].suffix}`;
  lc.inversionValue.textContent = inv.inversionLabel(appliedInversion, bassNoteName);
  lc.notesSub.textContent = tones.map((t) => t.noteName).join(' – ');

  const notes = tones.map((t) => t.midiNote);
  learnKeyboard.update({ activeNote: null, activeNotes: notes, tonicPitchClass: key.semitoneFromC });

  lc.tableBody.innerHTML = tones.map((t) => `<tr><td>${t.role}</td><td>${t.noteName}</td><td>${t.midiNote}</td></tr>`).join('');

  return notes;
}

function playLearnChord() {
  const notes = renderLearnChord();
  playChord(lc.output.value || null, notes, 1400);
}

function renderRecipeTable() {
  const rootKey = invKeys[0]; // C, so the reference recipe table is always "from C"
  lc.recipeTableBody.innerHTML = inv.qualityOrder.map((qualityKey) => {
    const quality = inv.qualities[qualityKey];
    const rootTones = inv.buildChordTones(rootKey, LEARN_OCTAVE, qualityKey, false);
    const cells = [0, 1, 2, 3].map((n) => {
      if (n > quality.intervals.length - 1) return '<td>—</td>';
      const { tones } = inv.invert(rootTones, n);
      return `<td>${tones.map((t) => t.noteName).join('-')}</td>`;
    }).join('');
    return `<tr><td>${quality.displayName}</td><td>${quality.intervals.join(', ')}</td>${cells}</tr>`;
  }).join('');
}

lc.quality.addEventListener('change', () => { refreshInversion3Availability(); renderLearnChord(); });
lc.root.addEventListener('change', renderLearnChord);
lc.play.addEventListener('click', playLearnChord);

// ============================================== EXERCISE 1: ALL CHORD TYPES

const rf = {
  root: document.getElementById('rf-root'),
  octave: document.getElementById('rf-octave'),
  output: document.getElementById('rf-output'),
  positionLabel: document.getElementById('rf-position-label'),
  currentChord: document.getElementById('rf-current-chord'),
  currentNotes: document.getElementById('rf-current-notes'),
  keyboard: document.getElementById('rf-keyboard'),
  tableBody: document.getElementById('rf-table-body'),
};

invKeys.forEach((k, i) => {
  const opt = document.createElement('option');
  opt.value = String(i);
  opt.textContent = k.name;
  rf.root.appendChild(opt);
});

const rfKeyboard = createPianoKeyboard(rf.keyboard, {
  lowestMidi: FULL_KEYBOARD_LOWEST_MIDI, octaves: FULL_KEYBOARD_OCTAVES, activeNote: null, activeNotes: [], tonicPitchClass: 0,
  showLabels: true, clickableWhite: false, clickableBlack: false,
});

let rfRows = []; // flat list of { qualityKey, inversion, tones } aligned to table rows

function renderReferenceTable() {
  const key = invKeys[Number(rf.root.value)];
  const octave = Number(rf.octave.value);
  rfRows = [];
  inv.qualityOrder.forEach((qualityKey) => {
    const quality = inv.qualities[qualityKey];
    const rootTones = inv.buildChordTones(key, octave, qualityKey, false);
    for (let n = 0; n < quality.intervals.length; n++) {
      const { tones, appliedInversion, bassNoteName } = inv.invert(rootTones, n);
      rfRows.push({
        qualityKey,
        qualityLabel: quality.displayName,
        chordName: `${rootTones[0].noteName} ${quality.suffix}`,
        inversionLabel: inv.inversionLabel(appliedInversion, bassNoteName),
        tones,
      });
    }
  });

  rf.tableBody.innerHTML = rfRows.map((row, i) => `
    <tr data-index="${i}">
      <td><button type="button" class="btn btn-ghost" data-play-row="${i}" style="padding:0.25rem 0.6rem;">▶</button></td>
      <td>${row.chordName}</td>
      <td>${row.inversionLabel}</td>
      <td>${row.tones.map((t) => t.noteName).join(' – ')}</td>
    </tr>`).join('');
}

function highlightReferenceRow(index) {
  rf.tableBody.querySelectorAll('tr').forEach((tr) => {
    tr.classList.toggle('is-current', Number(tr.getAttribute('data-index')) === index);
  });
}

function playReferenceRow(index) {
  const row = rfRows[index];
  if (!row) return;
  const key = invKeys[Number(rf.root.value)];
  const notes = row.tones.map((t) => t.midiNote);
  rf.positionLabel.textContent = `${row.qualityLabel} — ${row.inversionLabel}`;
  rf.currentChord.textContent = row.chordName;
  rf.currentNotes.textContent = row.tones.map((t) => t.noteName).join(' – ');
  rfKeyboard.update({ activeNote: null, activeNotes: notes, tonicPitchClass: key.semitoneFromC });
  highlightReferenceRow(index);
  playChord(rf.output.value || null, notes, 1100);
}

rf.tableBody.addEventListener('click', (event) => {
  const btn = event.target.closest('[data-play-row]');
  if (!btn) return;
  playReferenceRow(Number(btn.getAttribute('data-play-row')));
});

rf.root.addEventListener('change', renderReferenceTable);
rf.octave.addEventListener('change', renderReferenceTable);

// ================================================ PROGRESSION EXERCISES
// Shared factory used by both the Jazz Progressions and Gospel
// Progressions tabs, which are identical in every way except which list
// of progressions (and which DOM id prefix) they use.

function setupProgressionExercise(prefix, progressions) {
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

  invKeys.forEach((k, i) => {
    const opt = document.createElement('option');
    opt.value = String(i);
    opt.textContent = k.name;
    el.key.appendChild(opt);
  });

  const inversionControl = setupSegmented(document.querySelector(`[data-segmented="${prefix}-inversion"]`), 0, refresh);

  const keyboard = createPianoKeyboard(el.keyboard, {
    lowestMidi: FULL_KEYBOARD_LOWEST_MIDI, octaves: FULL_KEYBOARD_OCTAVES, activeNote: null, activeNotes: [], tonicPitchClass: 0,
    showLabels: true, clickableWhite: false, clickableBlack: false,
  });

  let isPlaying = false;
  let stopRequested = false;

  function currentProgression() {
    return progressions[Number(el.progression.value)];
  }

  function renderTable(key, octave) {
    const progressionDef = currentProgression();
    const chords = inv.buildProgressionChords(progressionDef, key, octave, inversionControl.value, false);
    el.tableTitle.textContent = `Progression in ${key.name}`;
    el.tableBody.innerHTML = chords.map((c, i) => `
      <tr data-index="${i}">
        <td>${c.roman} (${c.name})</td><td>${c.chordName}</td><td>${c.inversionLabel}</td><td>${c.tones.map((t) => t.noteName).join(' – ')}</td>
      </tr>`).join('');
    return chords;
  }

  function highlightRow(index) {
    el.tableBody.querySelectorAll('tr').forEach((tr) => {
      tr.classList.toggle('is-current', Number(tr.getAttribute('data-index')) === index);
    });
  }

  function refresh() {
    const key = invKeys[Number(el.key.value)];
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
      el.currentDegree.textContent = `Degree ${c.roman} (${c.name}) — ${c.inversionLabel}`;
      el.progress.style.width = `${((i + 1) * 100) / chords.length}%`;
      keyboard.update({ activeNote: null, activeNotes: notes, tonicPitchClass });
      highlightRow(i);
      playChord(el.output.value || null, notes, Math.round(chordDurationMs * 0.9));
      await wait(chordDurationMs);
      if (stopRequested) break;
    }
  }

  async function playInCurrentKey() {
    if (isPlaying) return;
    isPlaying = true;
    stopRequested = false;
    el.play.disabled = true;
    el.playAll.disabled = true;
    el.stop.disabled = false;

    const key = invKeys[Number(el.key.value)];
    const octave = Number(el.octave.value);
    const bpm = Number(el.tempo.value);
    const chords = renderTable(key, octave);
    el.keyLabel.textContent = `Key of ${key.name}`;

    await playChordsSequence(chords, key.semitoneFromC, bpm);

    isPlaying = false;
    el.play.disabled = false;
    el.playAll.disabled = false;
    el.stop.disabled = true;
    keyboard.update({ activeNotes: [] });
  }

  async function playInAllKeys() {
    if (isPlaying) return;
    isPlaying = true;
    stopRequested = false;
    el.play.disabled = true;
    el.playAll.disabled = true;
    el.stop.disabled = false;

    const octave = Number(el.octave.value);
    const bpm = Number(el.tempo.value);

    for (let k = 0; k < invKeys.length; k++) {
      if (stopRequested) break;
      const key = invKeys[k];
      el.key.value = String(k);
      el.keyLabel.textContent = `Key of ${key.name}`;
      const chords = renderTable(key, octave);
      await playChordsSequence(chords, key.semitoneFromC, bpm);
      if (stopRequested) break;
      await wait(150);
    }

    isPlaying = false;
    el.play.disabled = false;
    el.playAll.disabled = false;
    el.stop.disabled = true;
    keyboard.update({ activeNotes: [] });
  }

  function stopPlayback() {
    stopRequested = true;
    midi.stopAll(el.output.value || null);
    isPlaying = false;
    el.play.disabled = false;
    el.playAll.disabled = false;
    el.stop.disabled = true;
  }

  el.progression.addEventListener('change', refresh);
  el.key.addEventListener('change', refresh);
  el.octave.addEventListener('change', refresh);
  el.tempo.addEventListener('input', () => { el.tempoValue.textContent = el.tempo.value; });
  el.play.addEventListener('click', playInCurrentKey);
  el.playAll.addEventListener('click', playInAllKeys);
  el.stop.addEventListener('click', stopPlayback);

  refresh();

  return { outputs: [el.output], midiWarning: el.midiWarning };
}

const jazzExercise = setupProgressionExercise('jz', inv.jazzProgressions);
const gospelExercise = setupProgressionExercise('gp', inv.gospelProgressions);

// -------------------------------------------------------------------- init

(async function init() {
  const supported = await midi.init();
  const allOutputSelects = [lc.output, rf.output, ...jazzExercise.outputs, ...gospelExercise.outputs];
  const allMidiWarnings = [jazzExercise.midiWarning, gospelExercise.midiWarning];
  allMidiWarnings.forEach((w) => { w.style.display = supported ? 'none' : ''; });

  if (supported) {
    const outputs = midi.getOutputDevices();
    populateOutputSelects(allOutputSelects, outputs);
  }
  midi.onDevicesChanged((outputs) => {
    populateOutputSelects(allOutputSelects, outputs);
  });

  refreshInversion3Availability();
  renderLearnChord();
  renderRecipeTable();
  renderReferenceTable();
})();
