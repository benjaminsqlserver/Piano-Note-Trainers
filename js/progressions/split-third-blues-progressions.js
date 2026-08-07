// split-third-blues-progressions.js
// The jazz and gospel progression sets for the splitThirdBlues chord lesson.
// Data only — the builder that turns these into playable chords lives in
// js/inversion-service.js, which must be loaded first.

InversionService.registerProgressions(
  'splitThirdBlues',
    // Five jazz chord progressions built around the Split-third "blues" chord.
  [
      {
        id: "split-third-blues-chord-ii-V-I",
        name: "ii–V–I with Split-third \"blues\" chord Tonic",
        label: "ii7 – V7 – I7(♭3/♮3)",
        description: "The familiar ii–V–I resolves onto I7(♭3/♮3) instead of a plain major 7th, for extra color at the cadence.",
        degrees: [
          { roman: "ii7", name: "Supertonic 7th", semitoneFromKey: 2, quality: "minor7" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "I7(♭3/♮3)", name: "Tonic", semitoneFromKey: 0, quality: "splitThirdBlues" },
        ],
      },
      {
        id: "split-third-blues-chord-iv-color",
        name: "IV7(♭3/♮3) Color Change",
        label: "Imaj7 – IV7(♭3/♮3) – iii7 – vi7",
        description: "A Split-third \"blues\" chord stands in for the subdominant before the harmony falls back through iii7 to vi7.",
        degrees: [
          { roman: "Imaj7", name: "Tonic 7th", semitoneFromKey: 0, quality: "major7" },
          { roman: "IV7(♭3/♮3)", name: "Subdominant", semitoneFromKey: 5, quality: "splitThirdBlues" },
          { roman: "iii7", name: "Mediant 7th", semitoneFromKey: 4, quality: "minor7" },
          { roman: "vi7", name: "Submediant 7th", semitoneFromKey: 9, quality: "minor7" },
        ],
      },
      {
        id: "split-third-blues-chord-turnaround",
        name: "Turnaround with Split-third \"blues\" chord Color",
        label: "iii7 – VI7 – ii7 – V7",
        description: "A falling turnaround that passes briefly through a Split-third \"blues\" chord-colored submediant before the closing V7.",
        degrees: [
          { roman: "iii7", name: "Mediant 7th", semitoneFromKey: 4, quality: "minor7" },
          { roman: "VI7(♭3/♮3)", name: "Submediant", semitoneFromKey: 9, quality: "splitThirdBlues" },
          { roman: "ii7", name: "Supertonic 7th", semitoneFromKey: 2, quality: "minor7" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
      {
        id: "split-third-blues-chord-minor-key",
        name: "Minor-Key Cadence with Split-third \"blues\" chord",
        label: "i7 – IV7(♭3/♮3) – V7 – i7",
        description: "A minor-key cadence borrowing the parallel major’s IV, colored as a full Split-third \"blues\" chord for extra richness before the dominant resolves home.",
        degrees: [
          { roman: "i7", name: "Tonic 7th", semitoneFromKey: 0, quality: "minor7" },
          { roman: "IV7(♭3/♮3)", name: "Borrowed subdominant", semitoneFromKey: 5, quality: "splitThirdBlues" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i7", name: "Tonic 7th", semitoneFromKey: 0, quality: "minor7" },
        ],
      },
      {
        id: "split-third-blues-chord-blues",
        name: "Jazz Blues Turnaround with Split-third \"blues\" chord Tonic",
        label: "I7(♭3/♮3) – IV7 – ii7 – V7",
        description: "A jazz-blues turnaround that opens on I7(♭3/♮3) instead of a plain major or dominant tonic, establishing a rich color right away.",
        degrees: [
          { roman: "I7(♭3/♮3)", name: "Tonic", semitoneFromKey: 0, quality: "splitThirdBlues" },
          { roman: "IV7", name: "Subdominant 7th", semitoneFromKey: 5, quality: "dominant7" },
          { roman: "ii7", name: "Supertonic 7th", semitoneFromKey: 2, quality: "minor7" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
    ],
    // Five gospel chord progressions built around the Split-third "blues" chord.
  [
      {
        id: "split-third-blues-chord-gospel-turnaround",
        name: "Gospel Turnaround with Split-third \"blues\" chord IV",
        label: "I – vi – IV – V7",
        description: "The classic gospel turnaround, closing on a Split-third \"blues\" chord-colored tonic feel just before the final V7.",
        degrees: [
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
          { roman: "vi", name: "Submediant", semitoneFromKey: 9, quality: "minor" },
          { roman: "IV", name: "Subdominant", semitoneFromKey: 5, quality: "major" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
      {
        id: "split-third-blues-chord-amen-vamp",
        name: "Amen Vamp with Split-third \"blues\" chord Landing",
        label: "I – IV – iv – I7(♭3/♮3)",
        description: "The classic plagal \"Amen\" vamp, but the final chord blooms into a full Split-third \"blues\" chord instead of a plain triad — a warm, richly colored landing.",
        degrees: [
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
          { roman: "IV", name: "Subdominant", semitoneFromKey: 5, quality: "major" },
          { roman: "iv", name: "Borrowed minor subdominant", semitoneFromKey: 5, quality: "minor" },
          { roman: "I7(♭3/♮3)", name: "Tonic", semitoneFromKey: 0, quality: "splitThirdBlues" },
        ],
      },
      {
        id: "split-third-blues-chord-secondary",
        name: "Secondary Split-third \"blues\" chord Turnaround",
        label: "I – III7(♭3/♮3) – vi – V7",
        description: "A secondary chord built on the mediant, colored as a Split-third \"blues\" chord instead of the usual minor triad, resolving into vi before the closing V7.",
        degrees: [
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
          { roman: "III7(♭3/♮3)", name: "Mediant", semitoneFromKey: 4, quality: "splitThirdBlues" },
          { roman: "vi", name: "Submediant", semitoneFromKey: 9, quality: "minor" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
      {
        id: "split-third-blues-chord-extended-turnaround",
        name: "Extended Gospel Turnaround with Split-third \"blues\" chord Color",
        label: "iii7 – vi7 – ii7 – ♭VI7(♭3/♮3) – I7(♭3/♮3)",
        description: "A five-chord walk-back turnaround that closes with a chromatic ♭VI7(♭3/♮3) passing chord just before landing on a full, rich Split-third \"blues\" chord.",
        degrees: [
          { roman: "iii7", name: "Mediant 7th", semitoneFromKey: 4, quality: "minor7" },
          { roman: "vi7", name: "Submediant 7th", semitoneFromKey: 9, quality: "minor7" },
          { roman: "ii7", name: "Supertonic 7th", semitoneFromKey: 2, quality: "minor7" },
          { roman: "♭VI7(♭3/♮3)", name: "Chromatic passing chord", semitoneFromKey: 8, quality: "splitThirdBlues" },
          { roman: "I7(♭3/♮3)", name: "Tonic", semitoneFromKey: 0, quality: "splitThirdBlues" },
        ],
      },
      {
        id: "split-third-blues-chord-minor-gospel-cadence",
        name: "Minor Gospel Cadence with Split-third \"blues\" chord IV",
        label: "i – IV7(♭3/♮3) – V7 – i",
        description: "A minor-key gospel cadence where the subdominant borrows the parallel major’s IV and blooms into a Split-third \"blues\" chord, giving a rich lift before the dominant pulls home.",
        degrees: [
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
          { roman: "IV7(♭3/♮3)", name: "Borrowed subdominant", semitoneFromKey: 5, quality: "splitThirdBlues" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
        ],
      },
    ],
);
