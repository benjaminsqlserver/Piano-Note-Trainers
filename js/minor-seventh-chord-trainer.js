// minor-seventh-chord-trainer.js — page logic for minor-seventh-chord-trainer.html
// Every chord lesson shares one implementation; see js/chord-trainer.js.
// Expects audio-engine.js, piano-keyboard.js, tabs.js, this lesson's chord
// service, and chord-trainer.js to already be loaded as plain scripts before
// this one.

setupChordTrainer({
  service: MinorSeventhChordService,
  learnSuffix: " minor 7th",
  tableSuffix: "m7",
  chordProgression: { notesColumn: 'joined' },
});
