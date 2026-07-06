// home.js — interactive hero keyboard on index.html.
// A quiet demonstration of the shared engine: tap any key to hear it play,
// using the same AudioEngine and keyboard renderer every lesson uses.

const midi = new AudioEngine();
let lastActive = null;

const keyboard = createPianoKeyboard(document.getElementById('hero-keyboard'), {
  lowestMidi: 48,
  octaves: 3,
  activeNote: null,
  tonicPitchClass: 0,
  showLabels: true,
  clickableWhite: true,
  clickableBlack: true,
  onKeyClick: (midiNote) => {
    midi.playNote(null, midiNote, 500);
    lastActive = midiNote;
    keyboard.update({ activeNote: midiNote });
    setTimeout(() => {
      if (lastActive === midiNote) keyboard.update({ activeNote: null });
    }, 350);
  },
});

midi.init();
