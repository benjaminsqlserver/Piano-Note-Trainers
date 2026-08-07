// dominant-seventh-sharp-nine-chord-trainer.js — page logic for dominant-seventh-sharp-nine-chord-trainer.html
// Every chord lesson shares one implementation; see js/chord-trainer.js.
// Expects audio-engine.js, piano-keyboard.js, tabs.js, this lesson's chord
// service, inversion-service.js, its progressions file, progression-picker.js,
// and chord-trainer.js to already be loaded as plain scripts before this one.

setupChordTrainer({
  service: DominantSeventhSharpNineChordService,
  learnSuffix: " 7♯9",
  tableSuffix: "7♯9",
  progressions: "dominantSeventhSharpNine",
});
