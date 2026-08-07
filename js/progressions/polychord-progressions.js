// polychord-progressions.js
// The jazz and gospel progression sets for the polychord chord lesson.
// Data only — the builder that turns these into playable chords lives in
// js/inversion-service.js, which must be loaded first.

InversionService.registerProgressions(
  'polychord',
    // Five jazz chord progressions built around the Polychord / slash chord.
  [
      {
        id: "polychord-ii-V-I",
        name: "ii–V–I with Polychord / slash chord",
        label: "ii7 – V/ – Imaj7",
        description: "The familiar ii–V–I resolves through a V/ instead of a plain V7, adding extra color on the way to the tonic.",
        degrees: [
          { roman: "ii7", name: "Supertonic 7th", semitoneFromKey: 2, quality: "minor7" },
          { roman: "V/", name: "Dominant", semitoneFromKey: 7, quality: "polychord" },
          { roman: "Imaj7", name: "Tonic 7th", semitoneFromKey: 0, quality: "major7" },
        ],
      },
      {
        id: "polychord-iv-color",
        name: "IV/ Color Change",
        label: "Imaj7 – IV/ – iii7 – vi7",
        description: "A Polychord / slash chord colors the subdominant before the harmony falls back through iii7 to vi7.",
        degrees: [
          { roman: "Imaj7", name: "Tonic 7th", semitoneFromKey: 0, quality: "major7" },
          { roman: "IV/", name: "Subdominant", semitoneFromKey: 5, quality: "polychord" },
          { roman: "iii7", name: "Mediant 7th", semitoneFromKey: 4, quality: "minor7" },
          { roman: "vi7", name: "Submediant 7th", semitoneFromKey: 9, quality: "minor7" },
        ],
      },
      {
        id: "polychord-turnaround",
        name: "Turnaround with Polychord / slash chord",
        label: "iii7 – vi7 – ii7 – V/",
        description: "A falling turnaround whose closing dominant blooms into a V/ instead of a plain V7.",
        degrees: [
          { roman: "iii7", name: "Mediant 7th", semitoneFromKey: 4, quality: "minor7" },
          { roman: "vi7", name: "Submediant 7th", semitoneFromKey: 9, quality: "minor7" },
          { roman: "ii7", name: "Supertonic 7th", semitoneFromKey: 2, quality: "minor7" },
          { roman: "V/", name: "Dominant", semitoneFromKey: 7, quality: "polychord" },
        ],
      },
      {
        id: "polychord-minor-key",
        name: "Minor ii–V–i with Polychord / slash chord",
        label: "iiø7 – V/ – i7",
        description: "The minor-key ii–V–i, with the dominant voiced as a V/ before resolving to the minor 7th tonic.",
        degrees: [
          { roman: "iiø7", name: "Supertonic half-diminished 7th", semitoneFromKey: 2, quality: "halfDiminished7" },
          { roman: "V/", name: "Dominant", semitoneFromKey: 7, quality: "polychord" },
          { roman: "i7", name: "Tonic 7th", semitoneFromKey: 0, quality: "minor7" },
        ],
      },
      {
        id: "polychord-blues",
        name: "Jazz Blues Turnaround with Polychord / slash chord",
        label: "I/ – IV/ – ii7 – V/",
        description: "A jazz-blues turnaround voicing the tonic, subdominant, and dominant all as Polychord / slash chords.",
        degrees: [
          { roman: "I/", name: "Tonic", semitoneFromKey: 0, quality: "polychord" },
          { roman: "IV/", name: "Subdominant", semitoneFromKey: 5, quality: "polychord" },
          { roman: "ii7", name: "Supertonic 7th", semitoneFromKey: 2, quality: "minor7" },
          { roman: "V/", name: "Dominant", semitoneFromKey: 7, quality: "polychord" },
        ],
      },
    ],
    // Five gospel chord progressions built around the Polychord / slash chord.
  [
      {
        id: "polychord-gospel-turnaround",
        name: "Gospel Turnaround with Polychord / slash chord V",
        label: "I – vi – IV – V/",
        description: "The classic gospel turnaround, closing on a rich V/ instead of a plain dominant 7th.",
        degrees: [
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
          { roman: "vi", name: "Submediant", semitoneFromKey: 9, quality: "minor" },
          { roman: "IV", name: "Subdominant", semitoneFromKey: 5, quality: "major" },
          { roman: "V/", name: "Dominant", semitoneFromKey: 7, quality: "polychord" },
        ],
      },
      {
        id: "polychord-vamp-release",
        name: "Vamp with Polychord / slash chord–V7 Release",
        label: "I – IV – V/ – V7 – I",
        description: "A gospel vamp move: the dominant arrives first colored as a V/, then 'releases' into a plain V7 right before the tonic returns.",
        degrees: [
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
          { roman: "IV", name: "Subdominant", semitoneFromKey: 5, quality: "major" },
          { roman: "V/", name: "Dominant", semitoneFromKey: 7, quality: "polychord" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
        ],
      },
      {
        id: "polychord-secondary",
        name: "Secondary Polychord / slash chord Turnaround",
        label: "I – III/ – vi – V7",
        description: "A secondary dominant on the mediant, colored as a III/ for extra richness, resolving into vi before the closing V7.",
        degrees: [
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
          { roman: "III/", name: "Mediant", semitoneFromKey: 4, quality: "polychord" },
          { roman: "vi", name: "Submediant", semitoneFromKey: 9, quality: "minor" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
      {
        id: "polychord-extended-turnaround",
        name: "Extended Gospel Turnaround with Polychord / slash chord Color",
        label: "iii7 – vi7 – ii7 – V/ – Imaj7",
        description: "A five-chord walk-back turnaround whose penultimate dominant blooms into a V/ before landing on a lush tonic major 7th.",
        degrees: [
          { roman: "iii7", name: "Mediant 7th", semitoneFromKey: 4, quality: "minor7" },
          { roman: "vi7", name: "Submediant 7th", semitoneFromKey: 9, quality: "minor7" },
          { roman: "ii7", name: "Supertonic 7th", semitoneFromKey: 2, quality: "minor7" },
          { roman: "V/", name: "Dominant", semitoneFromKey: 7, quality: "polychord" },
          { roman: "Imaj7", name: "Tonic 7th", semitoneFromKey: 0, quality: "major7" },
        ],
      },
      {
        id: "polychord-minor-gospel-cadence",
        name: "Minor Gospel Cadence with Polychord / slash chord V",
        label: "i – iv – V/ – i",
        description: "A minor-key gospel cadence whose dominant is colored as a V/ before pulling back home to the minor tonic.",
        degrees: [
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
          { roman: "iv", name: "Subdominant", semitoneFromKey: 5, quality: "minor" },
          { roman: "V/", name: "Dominant", semitoneFromKey: 7, quality: "polychord" },
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
        ],
      },
    ],
);
