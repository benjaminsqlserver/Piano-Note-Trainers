// add11-chord-trainer.js — page logic for add11-chord-trainer.html
// Every chord lesson shares one implementation; see js/chord-trainer.js.
// Expects audio-engine.js, piano-keyboard.js, tabs.js, this lesson's chord
// service, inversion-service.js, its progressions file, progression-picker.js,
// and chord-trainer.js to already be loaded as plain scripts before this one.

setupChordTrainer({
  service: Add11ChordService,
  learnSuffix: " add11",
  tableSuffix: "add11",
  progressions: "add11",
});
