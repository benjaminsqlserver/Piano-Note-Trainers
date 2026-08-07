// minor-major-seventh-chord-trainer.js — page logic for minor-major-seventh-chord-trainer.html
// Every chord lesson shares one implementation; see js/chord-trainer.js.
// Expects audio-engine.js, piano-keyboard.js, tabs.js, this lesson's chord
// service, inversion-service.js, its progressions file, progression-picker.js,
// and chord-trainer.js to already be loaded as plain scripts before this one.

setupChordTrainer({
  service: MinorMajorSeventhChordService,
  learnSuffix: " m(maj7)",
  tableSuffix: "m(maj7)",
  progressions: "minorMajorSeventh",
});
