// major-seventh-chord-trainer.js — page logic for major-seventh-chord-trainer.html
// Every chord lesson shares one implementation; see js/chord-trainer.js.
// Expects audio-engine.js, piano-keyboard.js, tabs.js, this lesson's chord
// service, and chord-trainer.js to already be loaded as plain scripts before
// this one.

setupChordTrainer({
  service: MajorSeventhChordService,
  learnSuffix: " major 7th",
  tableSuffix: "maj7",
  chordProgression: { notesColumn: 'joined' },
});
