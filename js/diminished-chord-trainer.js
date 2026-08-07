// diminished-chord-trainer.js — page logic for diminished-chord-trainer.html
// Every chord lesson shares one implementation; see js/chord-trainer.js.
// Expects audio-engine.js, piano-keyboard.js, tabs.js, this lesson's chord
// service, and chord-trainer.js to already be loaded as plain scripts before
// this one.

setupChordTrainer({
  service: DiminishedChordService,
  learnSuffix: " diminished",
  tableSuffix: " diminished",
  chordProgression: { notesColumn: 'perNote' },
});
