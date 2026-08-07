// neapolitan-chord-trainer.js — page logic for neapolitan-chord-trainer.html
// Every chord lesson shares one implementation; see js/chord-trainer.js.
// Expects audio-engine.js, piano-keyboard.js, tabs.js, this lesson's chord
// service, inversion-service.js, its progressions file, progression-picker.js,
// and chord-trainer.js to already be loaded as plain scripts before this one.

setupChordTrainer({
  service: NeapolitanChordService,
  learnSuffix: " ♭II",
  tableSuffix: "♭II",
  progressions: "neapolitan",
});
