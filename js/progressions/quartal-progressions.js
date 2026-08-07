// quartal-progressions.js
// The jazz and gospel progression sets for the quartal chord lesson.
// Data only — the builder that turns these into playable chords lives in
// js/inversion-service.js, which must be loaded first.

InversionService.registerProgressions(
  'quartal',
    // Five jazz chord progressions built around the Quartal chord ("So What" voicing).
  [
      {
        id: "quartal-chord-ii-V-I",
        name: "ii–V–I with Quartal chord (\"So What\" voicing) Tonic",
        label: "ii7 – V7 – Iquartal",
        description: "The familiar ii–V–I resolves onto Iquartal instead of a plain major 7th, for extra color at the cadence.",
        degrees: [
          { roman: "ii7", name: "Supertonic 7th", semitoneFromKey: 2, quality: "minor7" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "Iquartal", name: "Tonic", semitoneFromKey: 0, quality: "quartal" },
        ],
      },
      {
        id: "quartal-chord-iv-color",
        name: "IVquartal Color Change",
        label: "Imaj7 – IVquartal – iii7 – vi7",
        description: "A Quartal chord (\"So What\" voicing) stands in for the subdominant before the harmony falls back through iii7 to vi7.",
        degrees: [
          { roman: "Imaj7", name: "Tonic 7th", semitoneFromKey: 0, quality: "major7" },
          { roman: "IVquartal", name: "Subdominant", semitoneFromKey: 5, quality: "quartal" },
          { roman: "iii7", name: "Mediant 7th", semitoneFromKey: 4, quality: "minor7" },
          { roman: "vi7", name: "Submediant 7th", semitoneFromKey: 9, quality: "minor7" },
        ],
      },
      {
        id: "quartal-chord-turnaround",
        name: "Turnaround with Quartal chord (\"So What\" voicing) Color",
        label: "iii7 – VI7 – ii7 – V7",
        description: "A falling turnaround that passes briefly through a Quartal chord (\"So What\" voicing)-colored submediant before the closing V7.",
        degrees: [
          { roman: "iii7", name: "Mediant 7th", semitoneFromKey: 4, quality: "minor7" },
          { roman: "VIquartal", name: "Submediant", semitoneFromKey: 9, quality: "quartal" },
          { roman: "ii7", name: "Supertonic 7th", semitoneFromKey: 2, quality: "minor7" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
      {
        id: "quartal-chord-minor-key",
        name: "Minor-Key Cadence with Quartal chord (\"So What\" voicing)",
        label: "i7 – IVquartal – V7 – i7",
        description: "A minor-key cadence borrowing the parallel major’s IV, colored as a full Quartal chord (\"So What\" voicing) for extra richness before the dominant resolves home.",
        degrees: [
          { roman: "i7", name: "Tonic 7th", semitoneFromKey: 0, quality: "minor7" },
          { roman: "IVquartal", name: "Borrowed subdominant", semitoneFromKey: 5, quality: "quartal" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i7", name: "Tonic 7th", semitoneFromKey: 0, quality: "minor7" },
        ],
      },
      {
        id: "quartal-chord-blues",
        name: "Jazz Blues Turnaround with Quartal chord (\"So What\" voicing) Tonic",
        label: "Iquartal – IV7 – ii7 – V7",
        description: "A jazz-blues turnaround that opens on Iquartal instead of a plain major or dominant tonic, establishing a rich color right away.",
        degrees: [
          { roman: "Iquartal", name: "Tonic", semitoneFromKey: 0, quality: "quartal" },
          { roman: "IV7", name: "Subdominant 7th", semitoneFromKey: 5, quality: "dominant7" },
          { roman: "ii7", name: "Supertonic 7th", semitoneFromKey: 2, quality: "minor7" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
    ],
    // Five gospel chord progressions built around the Quartal chord ("So What" voicing).
  [
      {
        id: "quartal-chord-gospel-turnaround",
        name: "Gospel Turnaround with Quartal chord (\"So What\" voicing) IV",
        label: "I – vi – IV – V7",
        description: "The classic gospel turnaround, closing on a Quartal chord (\"So What\" voicing)-colored tonic feel just before the final V7.",
        degrees: [
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
          { roman: "vi", name: "Submediant", semitoneFromKey: 9, quality: "minor" },
          { roman: "IV", name: "Subdominant", semitoneFromKey: 5, quality: "major" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
      {
        id: "quartal-chord-amen-vamp",
        name: "Amen Vamp with Quartal chord (\"So What\" voicing) Landing",
        label: "I – IV – iv – Iquartal",
        description: "The classic plagal \"Amen\" vamp, but the final chord blooms into a full Quartal chord (\"So What\" voicing) instead of a plain triad — a warm, richly colored landing.",
        degrees: [
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
          { roman: "IV", name: "Subdominant", semitoneFromKey: 5, quality: "major" },
          { roman: "iv", name: "Borrowed minor subdominant", semitoneFromKey: 5, quality: "minor" },
          { roman: "Iquartal", name: "Tonic", semitoneFromKey: 0, quality: "quartal" },
        ],
      },
      {
        id: "quartal-chord-secondary",
        name: "Secondary Quartal chord (\"So What\" voicing) Turnaround",
        label: "I – IIIquartal – vi – V7",
        description: "A secondary chord built on the mediant, colored as a Quartal chord (\"So What\" voicing) instead of the usual minor triad, resolving into vi before the closing V7.",
        degrees: [
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
          { roman: "IIIquartal", name: "Mediant", semitoneFromKey: 4, quality: "quartal" },
          { roman: "vi", name: "Submediant", semitoneFromKey: 9, quality: "minor" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
      {
        id: "quartal-chord-extended-turnaround",
        name: "Extended Gospel Turnaround with Quartal chord (\"So What\" voicing) Color",
        label: "iii7 – vi7 – ii7 – ♭VIquartal – Iquartal",
        description: "A five-chord walk-back turnaround that closes with a chromatic ♭VIquartal passing chord just before landing on a full, rich Quartal chord (\"So What\" voicing).",
        degrees: [
          { roman: "iii7", name: "Mediant 7th", semitoneFromKey: 4, quality: "minor7" },
          { roman: "vi7", name: "Submediant 7th", semitoneFromKey: 9, quality: "minor7" },
          { roman: "ii7", name: "Supertonic 7th", semitoneFromKey: 2, quality: "minor7" },
          { roman: "♭VIquartal", name: "Chromatic passing chord", semitoneFromKey: 8, quality: "quartal" },
          { roman: "Iquartal", name: "Tonic", semitoneFromKey: 0, quality: "quartal" },
        ],
      },
      {
        id: "quartal-chord-minor-gospel-cadence",
        name: "Minor Gospel Cadence with Quartal chord (\"So What\" voicing) IV",
        label: "i – IVquartal – V7 – i",
        description: "A minor-key gospel cadence where the subdominant borrows the parallel major’s IV and blooms into a Quartal chord (\"So What\" voicing), giving a rich lift before the dominant pulls home.",
        degrees: [
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
          { roman: "IVquartal", name: "Borrowed subdominant", semitoneFromKey: 5, quality: "quartal" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
        ],
      },
    ],
);
