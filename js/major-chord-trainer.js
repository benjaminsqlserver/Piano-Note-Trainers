// major-chord-trainer.js — page logic for major-chord-trainer.html
// Every chord lesson shares one implementation; see js/chord-trainer.js.
// Expects audio-engine.js, piano-keyboard.js, tabs.js, this lesson's chord
// service, and chord-trainer.js to already be loaded as plain scripts before
// this one.

setupChordTrainer({
  service: MajorChordService,
  learnSuffix: " major",
  tableSuffix: " major",
  chordProgression: { notesColumn: 'perNote' },
});
