// add11-progressions.js
// The jazz and gospel progression sets for the add11 chord lesson.
// Data only — the builder that turns these into playable chords lives in
// js/inversion-service.js, which must be loaded first.

InversionService.registerProgressions(
  'add11',
    // Five jazz chord progressions built around the Add11 chord (add4).
  [
      {
        id: "add11-chord-ii-V-I",
        name: "ii–V–I with Add11 chord (add4) Tonic",
        label: "ii7 – V7 – IVadd11",
        description: "The familiar ii–V–I resolves onto IVadd11 instead of a plain major 7th, for extra color at the cadence.",
        degrees: [
          { roman: "ii7", name: "Supertonic 7th", semitoneFromKey: 2, quality: "minor7" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "IVadd11", name: "Subdominant", semitoneFromKey: 5, quality: "add11" },
        ],
      },
      {
        id: "add11-chord-iv-color",
        name: "IVadd11 Color Change",
        label: "Imaj7 – IVadd11 – iii7 – vi7",
        description: "A Add11 chord (add4) stands in for the subdominant before the harmony falls back through iii7 to vi7.",
        degrees: [
          { roman: "Imaj7", name: "Tonic 7th", semitoneFromKey: 0, quality: "major7" },
          { roman: "IVadd11", name: "Subdominant", semitoneFromKey: 5, quality: "add11" },
          { roman: "iii7", name: "Mediant 7th", semitoneFromKey: 4, quality: "minor7" },
          { roman: "vi7", name: "Submediant 7th", semitoneFromKey: 9, quality: "minor7" },
        ],
      },
      {
        id: "add11-chord-turnaround",
        name: "Turnaround with Add11 chord (add4) Color",
        label: "iii7 – VI7 – ii7 – V7",
        description: "A falling turnaround that passes briefly through a Add11 chord (add4)-colored submediant before the closing V7.",
        degrees: [
          { roman: "iii7", name: "Mediant 7th", semitoneFromKey: 4, quality: "minor7" },
          { roman: "VIadd11", name: "Submediant", semitoneFromKey: 9, quality: "add11" },
          { roman: "ii7", name: "Supertonic 7th", semitoneFromKey: 2, quality: "minor7" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
      {
        id: "add11-chord-minor-key",
        name: "Minor-Key Cadence with Add11 chord (add4)",
        label: "i7 – IVadd11 – V7 – i7",
        description: "A minor-key cadence borrowing the parallel major’s IV, colored as a full Add11 chord (add4) for extra richness before the dominant resolves home.",
        degrees: [
          { roman: "i7", name: "Tonic 7th", semitoneFromKey: 0, quality: "minor7" },
          { roman: "IVadd11", name: "Borrowed subdominant", semitoneFromKey: 5, quality: "add11" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i7", name: "Tonic 7th", semitoneFromKey: 0, quality: "minor7" },
        ],
      },
      {
        id: "add11-chord-blues",
        name: "Jazz Blues Turnaround with Add11 chord (add4) Tonic",
        label: "IVadd11 – IV7 – ii7 – V7",
        description: "A jazz-blues turnaround that opens on IVadd11 instead of a plain major or dominant tonic, establishing a rich color right away.",
        degrees: [
          { roman: "IVadd11", name: "Subdominant", semitoneFromKey: 5, quality: "add11" },
          { roman: "IV7", name: "Subdominant 7th", semitoneFromKey: 5, quality: "dominant7" },
          { roman: "ii7", name: "Supertonic 7th", semitoneFromKey: 2, quality: "minor7" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
    ],
    // Five gospel chord progressions built around the Add11 chord (add4).
  [
      {
        id: "add11-chord-gospel-turnaround",
        name: "Gospel Turnaround with Add11 chord (add4) IV",
        label: "I – vi – IVadd11 – V7",
        description: "The classic gospel turnaround, swapping the usual IV triad for a Add11 chord (add4) color chord just before the closing V7.",
        degrees: [
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
          { roman: "vi", name: "Submediant", semitoneFromKey: 9, quality: "minor" },
          { roman: "IVadd11", name: "Subdominant", semitoneFromKey: 5, quality: "add11" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
      {
        id: "add11-chord-amen-vamp",
        name: "Amen Vamp with Add11 chord (add4) Landing",
        label: "I – IV – iv – IVadd11",
        description: "The classic plagal \"Amen\" vamp, but the final chord blooms into a full Add11 chord (add4) instead of a plain triad — a warm, richly colored landing.",
        degrees: [
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
          { roman: "IV", name: "Subdominant", semitoneFromKey: 5, quality: "major" },
          { roman: "iv", name: "Borrowed minor subdominant", semitoneFromKey: 5, quality: "minor" },
          { roman: "IVadd11", name: "Subdominant", semitoneFromKey: 5, quality: "add11" },
        ],
      },
      {
        id: "add11-chord-secondary",
        name: "Secondary Add11 chord (add4) Turnaround",
        label: "I – IIIadd11 – vi – V7",
        description: "A secondary chord built on the mediant, colored as a Add11 chord (add4) instead of the usual minor triad, resolving into vi before the closing V7.",
        degrees: [
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
          { roman: "IIIadd11", name: "Mediant", semitoneFromKey: 4, quality: "add11" },
          { roman: "vi", name: "Submediant", semitoneFromKey: 9, quality: "minor" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
      {
        id: "add11-chord-extended-turnaround",
        name: "Extended Gospel Turnaround with Add11 chord (add4) Color",
        label: "iii7 – vi7 – ii7 – ♭VIadd11 – IVadd11",
        description: "A five-chord walk-back turnaround that closes with a chromatic ♭VIadd11 passing chord just before landing on a full, rich Add11 chord (add4).",
        degrees: [
          { roman: "iii7", name: "Mediant 7th", semitoneFromKey: 4, quality: "minor7" },
          { roman: "vi7", name: "Submediant 7th", semitoneFromKey: 9, quality: "minor7" },
          { roman: "ii7", name: "Supertonic 7th", semitoneFromKey: 2, quality: "minor7" },
          { roman: "♭VIadd11", name: "Chromatic passing chord", semitoneFromKey: 8, quality: "add11" },
          { roman: "IVadd11", name: "Subdominant", semitoneFromKey: 5, quality: "add11" },
        ],
      },
      {
        id: "add11-chord-minor-gospel-cadence",
        name: "Minor Gospel Cadence with Add11 chord (add4) IV",
        label: "i – IVadd11 – V7 – i",
        description: "A minor-key gospel cadence where the subdominant borrows the parallel major’s IV and blooms into a Add11 chord (add4), giving a rich lift before the dominant pulls home.",
        degrees: [
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
          { roman: "IVadd11", name: "Borrowed subdominant", semitoneFromKey: 5, quality: "add11" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
        ],
      },
    ],
);
