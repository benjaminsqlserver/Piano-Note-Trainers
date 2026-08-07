// split-third-blues-chord-trainer.js — page logic for split-third-blues-chord-trainer.html
// Every chord lesson shares one implementation; see js/chord-trainer.js.
// Expects audio-engine.js, piano-keyboard.js, tabs.js, this lesson's chord
// service, inversion-service.js, its progressions file, progression-picker.js,
// and chord-trainer.js to already be loaded as plain scripts before this one.

setupChordTrainer({
  service: SplitThirdBluesChordService,
  learnSuffix: " 7(♭3/♮3)",
  tableSuffix: "7(♭3/♮3)",
  progressions: "splitThirdBlues",
});
