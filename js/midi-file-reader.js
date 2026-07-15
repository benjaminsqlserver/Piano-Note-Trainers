// midi-file-reader.js
// A small, dependency-free Standard MIDI File (SMF) reader. Fetches a .mid
// file and parses it into a flat, time-ordered list of notes the way the
// rest of this app already thinks about playback (midiNote / startMs /
// durationMs / velocity / channel) — the same shape the guided trainers
// build by hand in music-services.js, just sourced from a real MIDI file
// instead. The `channel` field lets a caller distinguish separate voices
// encoded on different MIDI channels within the same file (e.g. the Power
// in the Blood Song Trainer's right-hand melody on channel 0 vs its
// left-hand chords on channel 1) without changing the shape existing
// callers already rely on.
//
// Supports format 0 and format 1 files, running status, tempo meta events
// (including tempo changes mid-track), and ignores sysex/other meta events.
// SMPTE time-code division is not supported (all lessons' sample files use
// ticks-per-quarter-note division, the overwhelmingly common case).

async function loadMidiFile(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Could not load MIDI file: ${url} (${response.status})`);
  const buffer = await response.arrayBuffer();
  return parseMidiFile(buffer);
}

/**
 * Parses a MIDI file from a base64 string (e.g. one of the entries in
 * js/midi-data.js) instead of fetching a file over the network. This is the
 * path used by the Improvisation Demo tab so it keeps working when the site
 * is opened straight from the file system, where fetch() against local
 * files is blocked by the browser.
 */
function loadMidiFileFromBase64(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return parseMidiFile(bytes.buffer);
}

function parseMidiFile(arrayBuffer) {
  const data = new DataView(arrayBuffer);
  let pos = 0;

  function readUint32() { const v = data.getUint32(pos); pos += 4; return v; }
  function readUint16() { const v = data.getUint16(pos); pos += 2; return v; }
  function readUint8() { const v = data.getUint8(pos); pos += 1; return v; }
  function readString(len) {
    let s = '';
    for (let i = 0; i < len; i++) s += String.fromCharCode(readUint8());
    return s;
  }
  function readVarLen() {
    let value = 0;
    let byte;
    do {
      byte = readUint8();
      value = (value << 7) | (byte & 0x7f);
    } while (byte & 0x80);
    return value;
  }

  if (readString(4) !== 'MThd') throw new Error('Not a Standard MIDI File (missing MThd header)');
  readUint32(); // header length, always 6
  const format = readUint16();
  const trackCount = readUint16();
  const division = readUint16();
  if (division & 0x8000) throw new Error('SMPTE time-code division is not supported');
  const ticksPerQuarter = division;

  const notes = [];

  for (let t = 0; t < trackCount; t++) {
    if (readString(4) !== 'MTrk') throw new Error('Expected an MTrk chunk');
    const trackLength = readUint32();
    const trackEnd = pos + trackLength;

    let runningStatus = null;
    let msElapsed = 0;
    let microsPerQuarter = 500000; // default 120 BPM until a tempo event says otherwise
    const activeNotes = new Map(); // "channel-note" -> {startMs, velocity}

    while (pos < trackEnd) {
      const delta = readVarLen();
      msElapsed += (delta / ticksPerQuarter) * (microsPerQuarter / 1000);

      const peek = data.getUint8(pos);
      let statusByte;
      if (peek & 0x80) { statusByte = peek; pos += 1; runningStatus = statusByte; }
      else { statusByte = runningStatus; }

      if (statusByte === 0xff) {
        const metaType = readUint8();
        const len = readVarLen();
        if (metaType === 0x51 && len === 3) {
          microsPerQuarter = (readUint8() << 16) | (readUint8() << 8) | readUint8();
        } else {
          pos += len;
        }
      } else if (statusByte === 0xf0 || statusByte === 0xf7) {
        const len = readVarLen();
        pos += len;
      } else {
        const type = statusByte & 0xf0;
        const channel = statusByte & 0x0f;
        if (type === 0x90 || type === 0x80) {
          const noteNum = readUint8();
          const velocity = readUint8();
          const key = `${channel}-${noteNum}`;
          if (type === 0x90 && velocity > 0) {
            activeNotes.set(key, { startMs: msElapsed, velocity });
          } else {
            const start = activeNotes.get(key);
            if (start) {
              notes.push({
                midiNote: noteNum,
                startMs: start.startMs,
                durationMs: Math.max(20, msElapsed - start.startMs),
                velocity: start.velocity,
                channel,
              });
              activeNotes.delete(key);
            }
          }
        } else if (type === 0xc0 || type === 0xd0) {
          readUint8(); // program change / channel pressure: one data byte
        } else {
          readUint8(); readUint8(); // control change, pitch bend, etc.: two data bytes
        }
      }
    }
    pos = trackEnd;
  }

  notes.sort((a, b) => a.startMs - b.startMs);
  const totalDurationMs = notes.reduce((max, n) => Math.max(max, n.startMs + n.durationMs), 0);
  const impliedBpm = notes.length ? Math.round(60000 / ((notes[0].durationMs || 500) * 2)) : 120;

  return { format, ticksPerQuarter, notes, totalDurationMs };
}
