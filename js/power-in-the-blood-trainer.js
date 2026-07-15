// power-in-the-blood-trainer.js — page logic for power-in-the-blood-trainer.html
// Expects audio-engine.js, piano-keyboard.js, midi-file-reader.js,
// midi-data.js, and tabs.js to already be loaded as plain scripts before
// this one.
initTabs();

const midi = new AudioEngine();

// ============================================================ SONG DATA
// "There Is Power in the Blood" (Lewis E. Jones, 1899 — public domain) was
// originally published as a four-part hymn in the key of B♭ major. This
// lesson keeps the hymn's real soprano melody line for the right hand, but
// re-harmonizes the left hand as a brand-new set of simple, closed-position
// root triads — deliberately mixing MAJOR and MINOR chords (not just the
// hymn's original I-IV-V) so there's something to practice for both chord
// qualities under one familiar tune. "Semitone from tonic" is all that's
// stored here; the actual notes are built fresh for whichever of the 12
// keys the learner picks.

// The 12 keys, chromatic order, sharp spellings — same shape used by every
// other lesson's key picker (MajorScaleService.keys, MajorChordService.keys,
// etc.), kept local here since this lesson's data is bespoke to one song
// rather than a general reusable scale/chord service.
const SONG_KEYS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'].map((name, semitoneFromC) => ({
  semitoneFromC,
  name,
  fileSlug: name.replace('#', 's'),
}));

const SHARP_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
function noteNameFor(semitoneFromC) {
  return SHARP_NAMES[((semitoneFromC % 12) + 12) % 12];
}

// The left-hand chord chart: one entry per chord change, in playback order.
// startTick/durationTick match the MIDI files exactly (48 ticks per
// quarter note, 4/4 time — the same tick grid the hymn's original file
// used). semitoneFromTonic + quality describe the chord in a
// key-independent way, exactly like MajorChordService.progression does.
const SONG_CHORDS = [
  { startTick: 0, durationTick: 192, semitoneFromTonic: 0, roman: 'I', quality: 'major' },
  { startTick: 192, durationTick: 96, semitoneFromTonic: 5, roman: 'IV', quality: 'major' },
  { startTick: 288, durationTick: 96, semitoneFromTonic: 0, roman: 'I', quality: 'major' },
  { startTick: 384, durationTick: 192, semitoneFromTonic: 7, roman: 'V', quality: 'major' },
  { startTick: 576, durationTick: 96, semitoneFromTonic: 0, roman: 'I', quality: 'major' },
  { startTick: 672, durationTick: 96, semitoneFromTonic: 9, roman: 'vi', quality: 'minor' },
  { startTick: 768, durationTick: 192, semitoneFromTonic: 0, roman: 'I', quality: 'major' },
  { startTick: 960, durationTick: 96, semitoneFromTonic: 5, roman: 'IV', quality: 'major' },
  { startTick: 1056, durationTick: 96, semitoneFromTonic: 0, roman: 'I', quality: 'major' },
  { startTick: 1152, durationTick: 192, semitoneFromTonic: 7, roman: 'V', quality: 'major' },
  { startTick: 1344, durationTick: 192, semitoneFromTonic: 0, roman: 'I', quality: 'major' },
  { startTick: 1536, durationTick: 96, semitoneFromTonic: 0, roman: 'I', quality: 'major' },
  { startTick: 1632, durationTick: 96, semitoneFromTonic: 9, roman: 'vi', quality: 'minor' },
  { startTick: 1728, durationTick: 96, semitoneFromTonic: 5, roman: 'IV', quality: 'major' },
  { startTick: 1824, durationTick: 96, semitoneFromTonic: 0, roman: 'I', quality: 'major' },
  { startTick: 1920, durationTick: 96, semitoneFromTonic: 2, roman: 'ii', quality: 'minor' },
  { startTick: 2016, durationTick: 96, semitoneFromTonic: 7, roman: 'V', quality: 'major' },
  { startTick: 2112, durationTick: 96, semitoneFromTonic: 0, roman: 'I', quality: 'major' },
  { startTick: 2208, durationTick: 192, semitoneFromTonic: 0, roman: 'I', quality: 'major' },
  { startTick: 2400, durationTick: 96, semitoneFromTonic: 9, roman: 'vi', quality: 'minor' },
  { startTick: 2496, durationTick: 96, semitoneFromTonic: 5, roman: 'IV', quality: 'major' },
  { startTick: 2592, durationTick: 96, semitoneFromTonic: 0, roman: 'I', quality: 'major' },
  { startTick: 2688, durationTick: 384, semitoneFromTonic: 7, roman: 'V', quality: 'major' },
];

const DEGREE_NAME = { I: 'Tonic', ii: 'Supertonic', IV: 'Subdominant', V: 'Dominant', vi: 'Relative minor' };
const TICKS_PER_QUARTER = 48;
const BASE_MS_PER_TICK = (60000 / 120) / TICKS_PER_QUARTER; // the MIDI files are all authored at 120 BPM

/** Builds the 3 note names (root, 3rd, 5th) for one chord entry in `key`. */
function chordNoteNames(entry, key) {
  const third = entry.quality === 'minor' ? 3 : 4;
  const rootSemitone = key.semitoneFromC + entry.semitoneFromTonic;
  return [rootSemitone, rootSemitone + third, rootSemitone + 7].map(noteNameFor);
}

// ================================================================= LEARN

const lc = {
  key: document.getElementById('pb-learn-key'),
  tableBody: document.getElementById('pb-learn-table-body'),
};

SONG_KEYS.forEach((k, i) => {
  const opt = document.createElement('option');
  opt.value = String(i);
  opt.textContent = k.name;
  lc.key.appendChild(opt);
});

function renderLearnTable() {
  const key = SONG_KEYS[Number(lc.key.value)];
  lc.tableBody.innerHTML = SONG_CHORDS.map((entry) => {
    const names = chordNoteNames(entry, key);
    const qualityLabel = entry.quality === 'minor' ? 'minor' : 'major';
    const rowClass = entry.quality === 'minor' ? 'is-minor-row' : '';
    return `<tr class="${rowClass}">
      <td>${entry.roman}</td>
      <td>${DEGREE_NAME[entry.roman] || ''}</td>
      <td><span class="pill pill-${qualityLabel}">${names[0]} ${qualityLabel}</span></td>
      <td>${names.join(' – ')}</td>
    </tr>`;
  }).join('');
}

lc.key.addEventListener('change', renderLearnTable);

// ============================================================ SONG PLAYER
// Loads the two-hand MIDI file for the chosen key (right-hand melody on
// channel 0, left-hand chords on channel 1 — see midi-data.js), parses it
// with the same vanilla-JS reader every improvisation demo in this app
// uses, and plays it back, coloring the right hand and left hand
// differently on the keyboard as each note sounds.

const sp = {
  key: document.getElementById('sp-key'),
  tempo: document.getElementById('sp-tempo'),
  tempoValue: document.getElementById('sp-tempo-value'),
  output: document.getElementById('sp-output'),
  play: document.getElementById('sp-play'),
  stop: document.getElementById('sp-stop'),
  midiWarning: document.getElementById('sp-midi-warning'),
  loadError: document.getElementById('sp-load-error'),
  keyLabel: document.getElementById('sp-key-label'),
  currentMelody: document.getElementById('sp-current-melody'),
  currentChord: document.getElementById('sp-current-chord'),
  progress: document.getElementById('sp-progress'),
  keyboard: document.getElementById('sp-keyboard'),
  tableBody: document.getElementById('sp-table-body'),
};

SONG_KEYS.forEach((k, i) => {
  const opt = document.createElement('option');
  opt.value = String(i);
  opt.textContent = k.name;
  sp.key.appendChild(opt);
});

const songKeyboard = createPianoKeyboard(sp.keyboard, {
  lowestMidi: FULL_KEYBOARD_LOWEST_MIDI, octaves: FULL_KEYBOARD_OCTAVES,
  activeNote: null, melodyNotes: [], chordNotes: [], tonicPitchClass: 0,
  showLabels: true, clickableWhite: false, clickableBlack: false,
});

let songIsPlaying = false;
let songStopRequested = false;
const songFileCache = new Map(); // fileSlug -> parsed { notes, totalDurationMs }

function renderChordChartTable(key) {
  sp.tableBody.innerHTML = SONG_CHORDS.map((entry, i) => {
    const names = chordNoteNames(entry, key);
    const qualityLabel = entry.quality === 'minor' ? 'minor' : 'major';
    const startMs = entry.startTick * BASE_MS_PER_TICK;
    return `<tr data-index="${i}">
      <td>${entry.roman}</td>
      <td><span class="pill pill-${qualityLabel}">${names[0]} ${qualityLabel}</span></td>
      <td>${names.join(' – ')}</td>
      <td>${(startMs / 1000).toFixed(1)}s</td>
    </tr>`;
  }).join('');
}

function highlightChordRow(index) {
  sp.tableBody.querySelectorAll('tr').forEach((tr) => {
    tr.classList.toggle('is-current', Number(tr.getAttribute('data-index')) === index);
  });
}

function chordIndexAtTick(tick) {
  for (let i = SONG_CHORDS.length - 1; i >= 0; i--) {
    if (tick >= SONG_CHORDS[i].startTick) return i;
  }
  return 0;
}

async function loadCurrentKeySong() {
  const key = SONG_KEYS[Number(sp.key.value)];
  sp.keyLabel.textContent = `Key of ${key.name}`;
  sp.loadError.style.display = 'none';

  songKeyboard.update({ activeNote: null, melodyNotes: [], chordNotes: [], tonicPitchClass: key.semitoneFromC });
  renderChordChartTable(key);

  if (songFileCache.has(key.fileSlug)) return songFileCache.get(key.fileSlug);

  try {
    sp.play.disabled = true;
    const base64 = POWER_IN_THE_BLOOD_MIDI_DATA[key.fileSlug];
    if (!base64) throw new Error(`No embedded MIDI data for key slug "${key.fileSlug}"`);
    const parsed = loadMidiFileFromBase64(base64);
    songFileCache.set(key.fileSlug, parsed);
    return parsed;
  } catch (err) {
    console.error(err);
    sp.loadError.textContent = `Couldn't load "There Is Power in the Blood" in ${key.name}. Please refresh the page and try again.`;
    sp.loadError.style.display = '';
    return null;
  } finally {
    sp.play.disabled = false;
  }
}

async function playSong() {
  if (songIsPlaying) return;
  const parsed = await loadCurrentKeySong();
  if (!parsed || parsed.notes.length === 0) return;

  songIsPlaying = true;
  songStopRequested = false;
  sp.play.disabled = true;
  sp.stop.disabled = false;

  const key = SONG_KEYS[Number(sp.key.value)];
  const speedPct = Number(sp.tempo.value);
  const speedFactor = 100 / speedPct; // >100% speed => smaller time multiplier

  const notes = parsed.notes;
  const startedAt = performance.now();

  // Group notes that start at (roughly) the same instant so simultaneous
  // left-hand chord tones highlight together rather than flickering one at
  // a time, the same way playChord() does for the chord-trainer lessons.
  let i = 0;
  while (i < notes.length) {
    if (songStopRequested) break;
    const groupStartMs = notes[i].startMs;
    const group = [];
    while (i < notes.length && Math.abs(notes[i].startMs - groupStartMs) < 5) {
      group.push(notes[i]);
      i += 1;
    }

    const targetElapsed = groupStartMs * speedFactor;
    const now = performance.now();
    const waitMs = targetElapsed - (now - startedAt);
    if (waitMs > 0) await new Promise((r) => setTimeout(r, waitMs));
    if (songStopRequested) break;

    const melodyNotes = group.filter((n) => n.channel === 0).map((n) => n.midiNote);
    const chordNotes = group.filter((n) => n.channel === 1).map((n) => n.midiNote);

    if (melodyNotes.length) sp.currentMelody.textContent = melodyNotes.map((m) => midiNoteName(m)).join(', ');
    if (chordNotes.length) {
      const tick = groupStartMs / BASE_MS_PER_TICK;
      const idx = chordIndexAtTick(tick);
      const entry = SONG_CHORDS[idx];
      const names = chordNoteNames(entry, key);
      sp.currentChord.textContent = `${entry.roman} — ${names[0]} ${entry.quality}`;
      highlightChordRow(idx);
    }

    sp.progress.style.width = `${Math.min(100, (groupStartMs / parsed.totalDurationMs) * 100)}%`;
    songKeyboard.update({ melodyNotes, chordNotes, tonicPitchClass: key.semitoneFromC });

    group.forEach((n) => {
      midi.playNote(sp.output.value || null, n.midiNote, Math.round(n.durationMs * speedFactor * 0.92), n.velocity);
    });
  }

  if (!songStopRequested) {
    const remaining = parsed.totalDurationMs * speedFactor - (performance.now() - startedAt);
    if (remaining > 0) await new Promise((r) => setTimeout(r, remaining));
  }

  songIsPlaying = false;
  sp.play.disabled = false;
  sp.stop.disabled = true;
  songKeyboard.update({ melodyNotes: [], chordNotes: [] });
}

function stopSong() {
  songStopRequested = true;
  midi.stopAll(sp.output.value || null);
  songIsPlaying = false;
  sp.play.disabled = false;
  sp.stop.disabled = true;
}

const NOTE_NAMES_SHARP = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
function midiNoteName(midiNote) {
  const pc = ((midiNote % 12) + 12) % 12;
  const octave = Math.floor(midiNote / 12) - 1;
  return `${NOTE_NAMES_SHARP[pc]}${octave}`;
}

sp.key.addEventListener('change', loadCurrentKeySong);
sp.tempo.addEventListener('input', () => { sp.tempoValue.textContent = sp.tempo.value; });
sp.play.addEventListener('click', playSong);
sp.stop.addEventListener('click', stopSong);

// -------------------------------------------------------------------- init

(async function init() {
  const supported = await midi.init();
  sp.midiWarning.style.display = supported ? 'none' : '';
  if (supported) {
    const outputs = midi.getOutputDevices();
    const optionsHtml = '<option value="">Built-in synth (no MIDI device needed)</option>' + outputs.map((d) => `<option value="${d.id}">${d.name}</option>`).join('');
    sp.output.innerHTML = optionsHtml;
  }
  midi.onDevicesChanged((outputs) => {
    const optionsHtml = '<option value="">Built-in synth (no MIDI device needed)</option>' + outputs.map((d) => `<option value="${d.id}">${d.name}</option>`).join('');
    const current = sp.output.value;
    sp.output.innerHTML = optionsHtml;
    sp.output.value = current;
  });

  renderLearnTable();
  await loadCurrentKeySong();
})();
