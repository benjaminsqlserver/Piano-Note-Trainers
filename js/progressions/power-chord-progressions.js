// power-chord-progressions.js
// The jazz and gospel progression sets for the powerChord chord lesson.
// Data only — the builder that turns these into playable chords lives in
// js/inversion-service.js, which must be loaded first.

InversionService.registerProgressions(
  'powerChord',
    // Five jazz chord progressions built around the Power chord.
  [
      {
        id: "power-chord-ii-V-I",
        name: "ii–V–I with Power chord Tonic",
        label: "ii7 – V7 – I5",
        description: "The familiar ii–V–I resolves onto I5 instead of a plain major 7th, for extra color at the cadence.",
        degrees: [
          { roman: "ii7", name: "Supertonic 7th", semitoneFromKey: 2, quality: "minor7" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "I5", name: "Tonic", semitoneFromKey: 0, quality: "powerChord" },
        ],
      },
      {
        id: "power-chord-iv-color",
        name: "IV5 Color Change",
        label: "Imaj7 – IV5 – iii7 – vi7",
        description: "A Power chord stands in for the subdominant before the harmony falls back through iii7 to vi7.",
        degrees: [
          { roman: "Imaj7", name: "Tonic 7th", semitoneFromKey: 0, quality: "major7" },
          { roman: "IV5", name: "Subdominant", semitoneFromKey: 5, quality: "powerChord" },
          { roman: "iii7", name: "Mediant 7th", semitoneFromKey: 4, quality: "minor7" },
          { roman: "vi7", name: "Submediant 7th", semitoneFromKey: 9, quality: "minor7" },
        ],
      },
      {
        id: "power-chord-turnaround",
        name: "Turnaround with Power chord Color",
        label: "iii7 – VI7 – ii7 – V7",
        description: "A falling turnaround that passes briefly through a Power chord-colored submediant before the closing V7.",
        degrees: [
          { roman: "iii7", name: "Mediant 7th", semitoneFromKey: 4, quality: "minor7" },
          { roman: "VI5", name: "Submediant", semitoneFromKey: 9, quality: "powerChord" },
          { roman: "ii7", name: "Supertonic 7th", semitoneFromKey: 2, quality: "minor7" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
      {
        id: "power-chord-minor-key",
        name: "Minor-Key Cadence with Power chord",
        label: "i7 – IV5 – V7 – i7",
        description: "A minor-key cadence borrowing the parallel major’s IV, colored as a full Power chord for extra richness before the dominant resolves home.",
        degrees: [
          { roman: "i7", name: "Tonic 7th", semitoneFromKey: 0, quality: "minor7" },
          { roman: "IV5", name: "Borrowed subdominant", semitoneFromKey: 5, quality: "powerChord" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i7", name: "Tonic 7th", semitoneFromKey: 0, quality: "minor7" },
        ],
      },
      {
        id: "power-chord-blues",
        name: "Jazz Blues Turnaround with Power chord Tonic",
        label: "I5 – IV7 – ii7 – V7",
        description: "A jazz-blues turnaround that opens on I5 instead of a plain major or dominant tonic, establishing a rich color right away.",
        degrees: [
          { roman: "I5", name: "Tonic", semitoneFromKey: 0, quality: "powerChord" },
          { roman: "IV7", name: "Subdominant 7th", semitoneFromKey: 5, quality: "dominant7" },
          { roman: "ii7", name: "Supertonic 7th", semitoneFromKey: 2, quality: "minor7" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
    ],
    // Five gospel chord progressions built around the Power chord.
  [
      {
        id: "power-chord-gospel-turnaround",
        name: "Gospel Turnaround with Power chord IV",
        label: "I – vi – IV – V7",
        description: "The classic gospel turnaround, closing on a Power chord-colored tonic feel just before the final V7.",
        degrees: [
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
          { roman: "vi", name: "Submediant", semitoneFromKey: 9, quality: "minor" },
          { roman: "IV", name: "Subdominant", semitoneFromKey: 5, quality: "major" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
      {
        id: "power-chord-amen-vamp",
        name: "Amen Vamp with Power chord Landing",
        label: "I – IV – iv – I5",
        description: "The classic plagal \"Amen\" vamp, but the final chord blooms into a full Power chord instead of a plain triad — a warm, richly colored landing.",
        degrees: [
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
          { roman: "IV", name: "Subdominant", semitoneFromKey: 5, quality: "major" },
          { roman: "iv", name: "Borrowed minor subdominant", semitoneFromKey: 5, quality: "minor" },
          { roman: "I5", name: "Tonic", semitoneFromKey: 0, quality: "powerChord" },
        ],
      },
      {
        id: "power-chord-secondary",
        name: "Secondary Power chord Turnaround",
        label: "I – III5 – vi – V7",
        description: "A secondary chord built on the mediant, colored as a Power chord instead of the usual minor triad, resolving into vi before the closing V7.",
        degrees: [
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
          { roman: "III5", name: "Mediant", semitoneFromKey: 4, quality: "powerChord" },
          { roman: "vi", name: "Submediant", semitoneFromKey: 9, quality: "minor" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
      {
        id: "power-chord-extended-turnaround",
        name: "Extended Gospel Turnaround with Power chord Color",
        label: "iii7 – vi7 – ii7 – ♭VI5 – I5",
        description: "A five-chord walk-back turnaround that closes with a chromatic ♭VI5 passing chord just before landing on a full, rich Power chord.",
        degrees: [
          { roman: "iii7", name: "Mediant 7th", semitoneFromKey: 4, quality: "minor7" },
          { roman: "vi7", name: "Submediant 7th", semitoneFromKey: 9, quality: "minor7" },
          { roman: "ii7", name: "Supertonic 7th", semitoneFromKey: 2, quality: "minor7" },
          { roman: "♭VI5", name: "Chromatic passing chord", semitoneFromKey: 8, quality: "powerChord" },
          { roman: "I5", name: "Tonic", semitoneFromKey: 0, quality: "powerChord" },
        ],
      },
      {
        id: "power-chord-minor-gospel-cadence",
        name: "Minor Gospel Cadence with Power chord IV",
        label: "i – IV5 – V7 – i",
        description: "A minor-key gospel cadence where the subdominant borrows the parallel major’s IV and blooms into a Power chord, giving a rich lift before the dominant pulls home.",
        degrees: [
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
          { roman: "IV5", name: "Borrowed subdominant", semitoneFromKey: 5, quality: "powerChord" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
        ],
      },
    ],
);
