// every-praise-trainer.js — page logic for every-praise-trainer.html
//
// Ported from the standalone EveryPraiseTrainer app, unchanged in its
// audio/playback behavior. Unlike the other Song Trainer lessons (which use
// a Learn / Song Player tab split), this lesson shows all three parts —
// Alto (lead vocal), Piano Right Hand, and Piano Left Hand — on their own
// full 8-octave keyboards at once, exactly as the source arrangement is
// laid out, so nothing is hidden behind a tab when the lesson opens.
//
// Expects every-praise-data.js (SONG_META, SONG_DATA) to already be loaded
// as a plain script before this one.

// ---- Note naming ------------------------------------------------
const EP_NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const EP_WHITE_PC = new Set([0, 2, 4, 5, 7, 9, 11]); // pitch classes that are white keys

// Scientific pitch notation: MIDI 60 = C4
function epMidiToName(midi) {
  const pc = ((midi % 12) + 12) % 12;
  const octave = Math.floor(midi / 12) - 1;
  return { letter: EP_NOTE_NAMES[pc], octave, isBlack: !EP_WHITE_PC.has(pc), pc };
}

// Keyboard range: C0 (MIDI 12) through C8 (MIDI 108) — a full 8-octave span,
// matching every other lesson's keyboard on this site.
const EP_KB_LOW = 12;
const EP_KB_HIGH = 108;

// ---- Transposition -------------------------------------------------
// The 12 possible keys, in pitch-class order starting at C. Each maps to
// a semitone offset relative to the song's original recorded key.
const EP_KEY_PCS = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
function epKeyIndex(name) { return EP_KEY_PCS.indexOf(name); }

// Current transpose offset in semitones, relative to the notes as stored
// in SONG_DATA (which are in SONG_META.originalKey).
let epTransposeOffset = 0;

function epOffsetForKey(targetKeyName) {
  const originalIdx = epKeyIndex(SONG_META.originalKey);
  const targetIdx = epKeyIndex(targetKeyName);
  // Smallest-distance semitone shift (range roughly -6..+5) so the song
  // stays in a comfortable, similar octave rather than jumping an octave.
  let diff = targetIdx - originalIdx;
  diff = ((diff + 6) % 12 + 12) % 12 - 6;
  return diff;
}

// ---- Instrument configuration -----------------------------------
// Each instrument gets its own 8-octave keyboard, its own synth voice,
// and its own highlight color.
const EP_INSTRUMENTS = [
  { key: 'Alto', label: 'Alto (Lead Vocal)', color: '#3fb6ff', waveform: 'sine', gain: 0.32, vibrato: true },
  { key: 'PianoR', label: 'Piano — Right Hand', color: '#ffb020', waveform: 'triangle', gain: 0.28, vibrato: false },
  { key: 'PianoL', label: 'Piano — Left Hand', color: '#7a5cff', waveform: 'triangle', gain: 0.3, vibrato: false },
];

// ---- Audio engine --------------------------------------------------
let epAudioCtx = null;
function epGetAudioCtx() {
  if (!epAudioCtx) {
    epAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return epAudioCtx;
}

function epMidiToFreq(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

// Schedule one note to play through the WebAudio graph at a given
// absolute AudioContext time. Returns nothing; fire-and-forget.
function epScheduleNote(instrument, midi, atTime, duration, velocity) {
  if (midi < 0 || midi > 127) return;
  const ctx = epGetAudioCtx();
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();
  osc.type = instrument.waveform;
  osc.frequency.setValueAtTime(epMidiToFreq(midi), atTime);

  if (instrument.vibrato) {
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 5.5;
    lfoGain.gain.value = 3.5;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    lfo.start(atTime);
    lfo.stop(atTime + duration + 0.05);
  }

  const peak = instrument.gain * (velocity / 127);
  const attack = 0.015;
  const release = Math.min(0.12, duration * 0.4);
  gainNode.gain.setValueAtTime(0, atTime);
  gainNode.gain.linearRampToValueAtTime(peak, atTime + attack);
  gainNode.gain.setValueAtTime(peak, Math.max(atTime + attack, atTime + duration - release));
  gainNode.gain.linearRampToValueAtTime(0, atTime + duration + release * 0.5);

  osc.connect(gainNode);
  gainNode.connect(ctx.destination);
  osc.start(atTime);
  osc.stop(atTime + duration + release + 0.05);
}

// ---- Keyboard rendering ---------------------------------------------
// Builds an 8-octave (C0–C8) piano keyboard inside `container` for one
// instrument. White keys are laid out edge to edge; black keys are
// absolutely positioned on top. Every key is labeled with its letter
// name and octave.
function epBuildKeyboard(container, instrument) {
  container.innerHTML = '';
  container.classList.add('ep-keyboard');

  const whiteKeys = [];
  const blackKeys = [];
  for (let m = EP_KB_LOW; m <= EP_KB_HIGH; m++) {
    const info = epMidiToName(m);
    if (info.isBlack) blackKeys.push({ midi: m, ...info });
    else whiteKeys.push({ midi: m, ...info });
  }

  const WHITE_W = 26; // px, base unit
  const totalWhite = whiteKeys.length;
  container.style.setProperty('--ep-white-count', totalWhite);

  const whiteLayer = document.createElement('div');
  whiteLayer.className = 'ep-white-layer';
  whiteKeys.forEach((k, i) => {
    const el = document.createElement('div');
    el.className = 'ep-key ep-white-key';
    el.dataset.midi = k.midi;
    el.style.left = (i * WHITE_W) + 'px';
    const label = document.createElement('span');
    label.className = 'ep-key-label';
    label.textContent = k.letter + k.octave;
    el.appendChild(label);
    whiteLayer.appendChild(el);
  });

  const whiteIndexByMidi = {};
  whiteKeys.forEach((k, i) => { whiteIndexByMidi[k.midi] = i; });

  const blackLayer = document.createElement('div');
  blackLayer.className = 'ep-black-layer';
  blackKeys.forEach((k) => {
    let lowerWhite = k.midi - 1;
    while (!whiteIndexByMidi.hasOwnProperty(lowerWhite)) lowerWhite--;
    const idx = whiteIndexByMidi[lowerWhite];
    const el = document.createElement('div');
    el.className = 'ep-key ep-black-key';
    el.dataset.midi = k.midi;
    el.style.left = (idx * WHITE_W + WHITE_W * 0.68) + 'px';
    const label = document.createElement('span');
    label.className = 'ep-key-label ep-black-label';
    label.textContent = k.letter + k.octave;
    el.appendChild(label);
    blackLayer.appendChild(el);
  });

  container.style.width = (totalWhite * WHITE_W) + 'px';
  container.appendChild(whiteLayer);
  container.appendChild(blackLayer);

  // Click-to-play on the keyboard itself (plays the exact physical key,
  // independent of the current transpose setting).
  container.addEventListener('pointerdown', (e) => {
    const keyEl = e.target.closest('.ep-key');
    if (!keyEl) return;
    const midi = parseInt(keyEl.dataset.midi, 10);
    epScheduleNote(instrument, midi, epGetAudioCtx().currentTime, 0.5, 100);
    epFlashKey(container, midi, instrument.color, 400);
  });
}

function epFlashKey(container, midi, color, ms) {
  const el = container.querySelector(`.ep-key[data-midi="${midi}"]`);
  if (!el) return;
  el.style.setProperty('--ep-hl', color);
  el.classList.add('is-active');
  window.clearTimeout(el._epFlashTimer);
  el._epFlashTimer = window.setTimeout(() => el.classList.remove('is-active'), ms);
}

// ---- Playback controller ---------------------------------------------
class EpSongPlayer {
  constructor() {
    this.playing = false;
    this.startCtxTime = 0;   // AudioContext time corresponding to song time `startOffset`
    this.startOffset = 0;    // song-time (seconds) we started/resumed from
    this.rate = 1.0;         // playback speed multiplier (derived from tempo slider)
    this.rafId = null;
    this.mutes = {};          // instrument key -> bool
    this.onTick = null;       // callback(songTime)
    this.onEnd = null;
    this.lookahead = 0.25;    // seconds — schedule notes slightly ahead
    this.nextIndexByInstrument = {};
  }

  get duration() { return SONG_META.durationSeconds; }

  songTimeNow() {
    if (!this.playing) return this.startOffset;
    const ctx = epGetAudioCtx();
    return this.startOffset + (ctx.currentTime - this.startCtxTime) * this.rate;
  }

  play() {
    const ctx = epGetAudioCtx();
    if (ctx.state === 'suspended') ctx.resume();
    if (this.playing) return;
    this.playing = true;
    this.startCtxTime = ctx.currentTime;
    if (this.startOffset >= this.duration) this.startOffset = 0;
    this._resetSchedulingCursors();
    this._loop();
  }

  pause() {
    if (!this.playing) return;
    this.startOffset = this.songTimeNow();
    this.playing = false;
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }

  stop() {
    this.playing = false;
    this.startOffset = 0;
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.onTick) this.onTick(0);
  }

  seek(t) {
    t = Math.max(0, Math.min(this.duration, t));
    const wasPlaying = this.playing;
    if (wasPlaying) this.pause();
    this.startOffset = t;
    this._resetSchedulingCursors();
    if (this.onTick) this.onTick(t);
    if (wasPlaying) this.play();
  }

  setRate(r) {
    // preserve current song time across a rate change
    const t = this.songTimeNow();
    this.rate = r;
    this.startOffset = t;
    this.startCtxTime = epGetAudioCtx().currentTime;
  }

  setMute(instKey, muted) {
    this.mutes[instKey] = muted;
  }

  _resetSchedulingCursors() {
    this.nextIndexByInstrument = {};
    EP_INSTRUMENTS.forEach(inst => { this.nextIndexByInstrument[inst.key] = 0; });
  }

  _loop() {
    if (!this.playing) return;
    const ctx = epGetAudioCtx();
    const songTime = this.songTimeNow();

    EP_INSTRUMENTS.forEach(inst => {
      if (this.mutes[inst.key]) return;
      const notes = SONG_DATA[inst.key];
      let idx = this.nextIndexByInstrument[inst.key];
      while (idx < notes.length && notes[idx][1] <= songTime + this.lookahead) {
        const [midi, start, dur, vel] = notes[idx];
        if (start >= songTime - 0.05) {
          const delaySongTime = start - songTime;
          const atCtxTime = ctx.currentTime + Math.max(0, delaySongTime) / this.rate;
          epScheduleNote(inst, midi + epTransposeOffset, atCtxTime, dur / this.rate, vel);
        }
        idx++;
      }
      this.nextIndexByInstrument[inst.key] = idx;
    });

    if (this.onTick) this.onTick(songTime);

    if (songTime >= this.duration) {
      this.playing = false;
      if (this.onEnd) this.onEnd();
      return;
    }
    this.rafId = requestAnimationFrame(() => this._loop());
  }
}

// ---- UI wiring ---------------------------------------------------------
const epPlayer = new EpSongPlayer();
const epKeyboardEls = {};   // instrument key -> container element
let epVisualCursors = {};   // instrument key -> next note index for highlight animation

function epFmtTime(s) {
  s = Math.max(0, s);
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

function epBuildUI() {
  const root = document.getElementById('ep-instruments');
  EP_INSTRUMENTS.forEach(inst => {
    const section = document.createElement('section');
    section.className = 'ep-instrument-panel';
    section.style.setProperty('--ep-inst-color', inst.color);

    const header = document.createElement('div');
    header.className = 'ep-instrument-header';
    header.innerHTML = `
      <h3>${inst.label}</h3>
      <label class="ep-mute-toggle">
        <input type="checkbox" data-mute="${inst.key}"> Mute
      </label>
    `;
    section.appendChild(header);

    const scroller = document.createElement('div');
    scroller.className = 'ep-keyboard-scroller';
    const kb = document.createElement('div');
    scroller.appendChild(kb);
    section.appendChild(scroller);

    root.appendChild(section);
    epBuildKeyboard(kb, inst);
    epKeyboardEls[inst.key] = kb;
    epVisualCursors[inst.key] = 0;

    header.querySelector('input[data-mute]').addEventListener('change', (e) => {
      epPlayer.setMute(inst.key, e.target.checked);
      section.classList.toggle('is-muted', e.target.checked);
    });
  });

  Object.values(epKeyboardEls).forEach(kb => {
    const scroller = kb.parentElement;
    const target = kb.querySelector('.ep-key[data-midi="48"]');
    if (target) scroller.scrollLeft = Math.max(0, target.offsetLeft - 80);
  });
}

function epResetVisualCursors() {
  EP_INSTRUMENTS.forEach(inst => { epVisualCursors[inst.key] = 0; });
}

function epUpdateHighlights(songTime) {
  EP_INSTRUMENTS.forEach(inst => {
    const notes = SONG_DATA[inst.key];
    let idx = epVisualCursors[inst.key];
    while (idx < notes.length && notes[idx][1] <= songTime + 0.02) {
      const [midi, start, dur] = notes[idx];
      const endTime = start + dur;
      if (endTime >= songTime) {
        epFlashKey(epKeyboardEls[inst.key], midi + epTransposeOffset, inst.color, Math.max(120, dur * 1000));
      }
      idx++;
    }
    epVisualCursors[inst.key] = idx;
  });
}

// ---- Transport (play/stop/seek + key + tempo) ---------------------------
function epBuildTransport() {
  const playBtn = document.getElementById('ep-play');
  const stopBtn = document.getElementById('ep-stop');
  const seekBar = document.getElementById('ep-seek');
  const timeLabel = document.getElementById('ep-time');
  const restartBtn = document.getElementById('ep-restart');
  const keySelect = document.getElementById('ep-key');
  const tempoSlider = document.getElementById('ep-tempo');
  const tempoLabel = document.getElementById('ep-tempo-label');

  seekBar.max = Math.ceil(SONG_META.durationSeconds);

  let seeking = false;

  playBtn.addEventListener('click', () => {
    if (epPlayer.playing) {
      epPlayer.pause();
      playBtn.textContent = '▶ Play';
    } else {
      epPlayer.play();
      playBtn.textContent = '⏸ Pause';
    }
  });

  stopBtn.addEventListener('click', () => {
    epPlayer.stop();
    epResetVisualCursors();
    playBtn.textContent = '▶ Play';
    seekBar.value = 0;
    timeLabel.textContent = `0:00 / ${epFmtTime(SONG_META.durationSeconds)}`;
  });

  restartBtn.addEventListener('click', () => {
    epPlayer.seek(0);
    epResetVisualCursors();
  });

  // --- Key / transpose control ---
  EP_KEY_PCS.forEach(k => {
    const opt = document.createElement('option');
    opt.value = k;
    opt.textContent = (k === SONG_META.originalKey) ? `${k} (Original)` : k;
    if (k === SONG_META.originalKey) opt.selected = true;
    keySelect.appendChild(opt);
  });
  keySelect.addEventListener('change', () => {
    epTransposeOffset = epOffsetForKey(keySelect.value);
  });

  // --- Tempo slider (BPM-based) ---
  const baseBpm = SONG_META.baseBpm;
  const minBpm = Math.max(40, Math.round(baseBpm * 0.5));
  const maxBpm = Math.round(baseBpm * 1.6);
  const defaultBpm = 104;
  tempoSlider.min = Math.min(minBpm, defaultBpm);
  tempoSlider.max = Math.max(maxBpm, defaultBpm);
  tempoSlider.step = 1;
  tempoSlider.value = defaultBpm;
  epPlayer.rate = defaultBpm / baseBpm;
  tempoLabel.textContent = `${defaultBpm} BPM (${Math.round((defaultBpm / baseBpm) * 100)}%)`;

  tempoSlider.addEventListener('input', () => {
    const bpm = parseFloat(tempoSlider.value);
    const rate = bpm / baseBpm;
    epPlayer.setRate(rate);
    tempoLabel.textContent = `${bpm} BPM (${Math.round(rate * 100)}%)`;
  });

  seekBar.addEventListener('input', () => { seeking = true; });
  seekBar.addEventListener('change', () => {
    epPlayer.seek(parseFloat(seekBar.value));
    epResetVisualCursors();
    seeking = false;
  });

  epPlayer.onTick = (t) => {
    if (!seeking) seekBar.value = t;
    timeLabel.textContent = `${epFmtTime(t)} / ${epFmtTime(SONG_META.durationSeconds)}`;
    epUpdateHighlights(t);
  };
  epPlayer.onEnd = () => {
    playBtn.textContent = '▶ Play';
  };
}

document.addEventListener('DOMContentLoaded', () => {
  epBuildUI();
  epBuildTransport();
});
