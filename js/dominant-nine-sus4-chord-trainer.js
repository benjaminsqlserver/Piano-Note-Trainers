// dominant-nine-sus4-chord-trainer.js — page logic for dominant-nine-sus4-chord-trainer.html
// Every chord lesson shares one implementation; see js/chord-trainer.js.
// Expects audio-engine.js, piano-keyboard.js, tabs.js, this lesson's chord
// service, inversion-service.js, its progressions file, progression-picker.js,
// and chord-trainer.js to already be loaded as plain scripts before this one.

setupChordTrainer({
  service: DominantNineSusFourChordService,
  learnSuffix: " 9sus4",
  tableSuffix: "9sus4",
  progressions: "dominantNineSusFour",
});
