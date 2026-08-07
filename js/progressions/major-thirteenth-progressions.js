// major-thirteenth-progressions.js
// The jazz and gospel progression sets for the majorThirteenth chord lesson.
// Data only — the builder that turns these into playable chords lives in
// js/inversion-service.js, which must be loaded first.

InversionService.registerProgressions(
  'majorThirteenth',
    // Five jazz chord progressions built around the Major 13th chord.
  [
      {
        id: "major-thirteenth-chord-ii-V-I",
        name: "ii–V–I with Major 13th chord Tonic",
        label: "ii7 – V7 – Imaj13",
        description: "The familiar ii–V–I resolves onto Imaj13 instead of a plain major 7th, for extra color at the cadence.",
        degrees: [
          { roman: "ii7", name: "Supertonic 7th", semitoneFromKey: 2, quality: "minor7" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "Imaj13", name: "Tonic", semitoneFromKey: 0, quality: "majorThirteenth" },
        ],
      },
      {
        id: "major-thirteenth-chord-iv-color",
        name: "IVmaj13 Color Change",
        label: "Imaj7 – IVmaj13 – iii7 – vi7",
        description: "A Major 13th chord stands in for the subdominant before the harmony falls back through iii7 to vi7.",
        degrees: [
          { roman: "Imaj7", name: "Tonic 7th", semitoneFromKey: 0, quality: "major7" },
          { roman: "IVmaj13", name: "Subdominant", semitoneFromKey: 5, quality: "majorThirteenth" },
          { roman: "iii7", name: "Mediant 7th", semitoneFromKey: 4, quality: "minor7" },
          { roman: "vi7", name: "Submediant 7th", semitoneFromKey: 9, quality: "minor7" },
        ],
      },
      {
        id: "major-thirteenth-chord-turnaround",
        name: "Turnaround with Major 13th chord Color",
        label: "iii7 – VI7 – ii7 – V7",
        description: "A falling turnaround that passes briefly through a Major 13th chord-colored submediant before the closing V7.",
        degrees: [
          { roman: "iii7", name: "Mediant 7th", semitoneFromKey: 4, quality: "minor7" },
          { roman: "VImaj13", name: "Submediant", semitoneFromKey: 9, quality: "majorThirteenth" },
          { roman: "ii7", name: "Supertonic 7th", semitoneFromKey: 2, quality: "minor7" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
      {
        id: "major-thirteenth-chord-minor-key",
        name: "Minor-Key Cadence with Major 13th chord",
        label: "i7 – IVmaj13 – V7 – i7",
        description: "A minor-key cadence borrowing the parallel major’s IV, colored as a full Major 13th chord for extra richness before the dominant resolves home.",
        degrees: [
          { roman: "i7", name: "Tonic 7th", semitoneFromKey: 0, quality: "minor7" },
          { roman: "IVmaj13", name: "Borrowed subdominant", semitoneFromKey: 5, quality: "majorThirteenth" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i7", name: "Tonic 7th", semitoneFromKey: 0, quality: "minor7" },
        ],
      },
      {
        id: "major-thirteenth-chord-blues",
        name: "Jazz Blues Turnaround with Major 13th chord Tonic",
        label: "Imaj13 – IV7 – ii7 – V7",
        description: "A jazz-blues turnaround that opens on Imaj13 instead of a plain major or dominant tonic, establishing a rich color right away.",
        degrees: [
          { roman: "Imaj13", name: "Tonic", semitoneFromKey: 0, quality: "majorThirteenth" },
          { roman: "IV7", name: "Subdominant 7th", semitoneFromKey: 5, quality: "dominant7" },
          { roman: "ii7", name: "Supertonic 7th", semitoneFromKey: 2, quality: "minor7" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
    ],
    // Five gospel chord progressions built around the Major 13th chord.
  [
      {
        id: "major-thirteenth-chord-gospel-turnaround",
        name: "Gospel Turnaround with Major 13th chord IV",
        label: "I – vi – IV – V7",
        description: "The classic gospel turnaround, closing on a Major 13th chord-colored tonic feel just before the final V7.",
        degrees: [
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
          { roman: "vi", name: "Submediant", semitoneFromKey: 9, quality: "minor" },
          { roman: "IV", name: "Subdominant", semitoneFromKey: 5, quality: "major" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
      {
        id: "major-thirteenth-chord-amen-vamp",
        name: "Amen Vamp with Major 13th chord Landing",
        label: "I – IV – iv – Imaj13",
        description: "The classic plagal \"Amen\" vamp, but the final chord blooms into a full Major 13th chord instead of a plain triad — a warm, richly colored landing.",
        degrees: [
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
          { roman: "IV", name: "Subdominant", semitoneFromKey: 5, quality: "major" },
          { roman: "iv", name: "Borrowed minor subdominant", semitoneFromKey: 5, quality: "minor" },
          { roman: "Imaj13", name: "Tonic", semitoneFromKey: 0, quality: "majorThirteenth" },
        ],
      },
      {
        id: "major-thirteenth-chord-secondary",
        name: "Secondary Major 13th chord Turnaround",
        label: "I – IIImaj13 – vi – V7",
        description: "A secondary chord built on the mediant, colored as a Major 13th chord instead of the usual minor triad, resolving into vi before the closing V7.",
        degrees: [
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
          { roman: "IIImaj13", name: "Mediant", semitoneFromKey: 4, quality: "majorThirteenth" },
          { roman: "vi", name: "Submediant", semitoneFromKey: 9, quality: "minor" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
      {
        id: "major-thirteenth-chord-extended-turnaround",
        name: "Extended Gospel Turnaround with Major 13th chord Color",
        label: "iii7 – vi7 – ii7 – ♭VImaj13 – Imaj13",
        description: "A five-chord walk-back turnaround that closes with a chromatic ♭VImaj13 passing chord just before landing on a full, rich Major 13th chord.",
        degrees: [
          { roman: "iii7", name: "Mediant 7th", semitoneFromKey: 4, quality: "minor7" },
          { roman: "vi7", name: "Submediant 7th", semitoneFromKey: 9, quality: "minor7" },
          { roman: "ii7", name: "Supertonic 7th", semitoneFromKey: 2, quality: "minor7" },
          { roman: "♭VImaj13", name: "Chromatic passing chord", semitoneFromKey: 8, quality: "majorThirteenth" },
          { roman: "Imaj13", name: "Tonic", semitoneFromKey: 0, quality: "majorThirteenth" },
        ],
      },
      {
        id: "major-thirteenth-chord-minor-gospel-cadence",
        name: "Minor Gospel Cadence with Major 13th chord IV",
        label: "i – IVmaj13 – V7 – i",
        description: "A minor-key gospel cadence where the subdominant borrows the parallel major’s IV and blooms into a Major 13th chord, giving a rich lift before the dominant pulls home.",
        degrees: [
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
          { roman: "IVmaj13", name: "Borrowed subdominant", semitoneFromKey: 5, quality: "majorThirteenth" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
        ],
      },
    ],
);
