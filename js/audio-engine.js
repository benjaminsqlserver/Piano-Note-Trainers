// audio-engine.js
// Vanilla-JS replacement for the original MidiInteropService.cs + midiInterop.js
// pairing. Bridges the Web MIDI API (real hardware output/input) and a
// built-in WebAudio synthesizer (used whenever no MIDI output device is
// selected). Framework-free: exported as a small class any trainer page can
// instantiate directly.

class AudioEngine {
  constructor() {
    this.midiAccess = null;
    this.midiSupported = false;
    this.audioCtx = null;
    this.activeOscillators = new Map(); // midiNote -> {osc, gain}
    this.listeningInput = null;
    this.listeningHandler = null;

    this._devicesChangedHandlers = new Set();
    this._noteOnHandlers = new Set();
    this._noteOffHandlers = new Set();
  }

  // ---------------------------------------------------------------- setup

  async init() {
    if (!navigator.requestMIDIAccess) {
      this.midiSupported = false;
      return false;
    }
    try {
      this.midiAccess = await navigator.requestMIDIAccess({ sysex: false });
      this.midiAccess.onstatechange = () => this._notifyDevicesChanged();
      this.midiSupported = true;
      return true;
    } catch (e) {
      console.warn('Web MIDI access denied or unavailable:', e);
      this.midiSupported = false;
      return false;
    }
  }

  onDevicesChanged(handler) { this._devicesChangedHandlers.add(handler); }
  onNoteOn(handler) { this._noteOnHandlers.add(handler); }
  onNoteOff(handler) { this._noteOffHandlers.add(handler); }

  _notifyDevicesChanged() {
    const devices = this.getOutputDevices();
    this._devicesChangedHandlers.forEach((h) => h(devices));
  }

  // -------------------------------------------------------------- devices

  getOutputDevices() {
    const outputs = [];
    if (this.midiAccess) {
      for (const output of this.midiAccess.outputs.values()) {
        outputs.push({ id: output.id, name: output.name || 'Unknown device', manufacturer: output.manufacturer || '' });
      }
    }
    return outputs;
  }

  getInputDevices() {
    const inputs = [];
    if (this.midiAccess) {
      for (const input of this.midiAccess.inputs.values()) {
        inputs.push({ id: input.id, name: input.name || 'Unknown device', manufacturer: input.manufacturer || '' });
      }
    }
    return inputs;
  }

  // ---------------------------------------------------------- synth audio

  _midiToFrequency(midiNote) {
    return 440 * Math.pow(2, (midiNote - 69) / 12);
  }

  _ensureAudioContext() {
    if (!this.audioCtx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new Ctx();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  _synthNoteOn(midiNote, velocity) {
    const ctx = this._ensureAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = this._midiToFrequency(midiNote);
    const vol = Math.max(0.05, Math.min(1, velocity / 127)) * 0.35;
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.015);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    this.activeOscillators.set(midiNote, { osc, gain });
  }

  _synthNoteOff(midiNote) {
    const entry = this.activeOscillators.get(midiNote);
    if (!entry) return;
    const ctx = this._ensureAudioContext();
    const { osc, gain } = entry;
    gain.gain.cancelScheduledValues(ctx.currentTime);
    gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.08);
    osc.stop(ctx.currentTime + 0.09);
    this.activeOscillators.delete(midiNote);
  }

  _getOutputById(deviceId) {
    if (!this.midiAccess || !deviceId) return null;
    return this.midiAccess.outputs.get(deviceId) || null;
  }

  // ------------------------------------------------------------- playback

  /** Plays a note either on the chosen MIDI output, or the built-in synth. */
  playNote(deviceId, midiNote, durationMs = 500, velocity = 100) {
    const output = this._getOutputById(deviceId);
    if (output) {
      output.send([0x90, midiNote, velocity]);
      setTimeout(() => output.send([0x80, midiNote, 0]), durationMs);
    } else {
      this._synthNoteOn(midiNote, velocity);
      setTimeout(() => this._synthNoteOff(midiNote), durationMs);
    }
  }

  stopAll(deviceId) {
    const output = this._getOutputById(deviceId);
    if (output) {
      for (let n = 0; n < 128; n++) output.send([0x80, n, 0]);
    }
    for (const midiNote of Array.from(this.activeOscillators.keys())) {
      this._synthNoteOff(midiNote);
    }
  }

  // -------------------------------------------------------------- input

  startListening(inputDeviceId) {
    this.stopListening();
    if (!this.midiAccess) return;
    const input = this.midiAccess.inputs.get(inputDeviceId);
    if (!input) return;
    this.listeningHandler = (event) => {
      const [status, note, velocity] = event.data;
      const command = status & 0xf0;
      if (command === 0x90 && velocity > 0) {
        this._noteOnHandlers.forEach((h) => h(note, velocity));
      } else if (command === 0x80 || (command === 0x90 && velocity === 0)) {
        this._noteOffHandlers.forEach((h) => h(note));
      }
    };
    input.addEventListener('midimessage', this.listeningHandler);
    this.listeningInput = input;
  }

  stopListening() {
    if (this.listeningInput && this.listeningHandler) {
      this.listeningInput.removeEventListener('midimessage', this.listeningHandler);
    }
    this.listeningInput = null;
    this.listeningHandler = null;
  }

  dispose() {
    this.stopListening();
    this.stopAll(null);
  }
}
