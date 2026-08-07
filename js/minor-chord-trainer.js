// minor-chord-trainer.js — page logic for minor-chord-trainer.html
// Every chord lesson shares one implementation; see js/chord-trainer.js.
// Expects audio-engine.js, piano-keyboard.js, tabs.js, this lesson's chord
// service, and chord-trainer.js to already be loaded as plain scripts before
// this one.

setupChordTrainer({
  service: MinorChordService,
  learnSuffix: " minor",
  tableSuffix: " minor",
  chordProgression: { notesColumn: 'perNote' },
});
