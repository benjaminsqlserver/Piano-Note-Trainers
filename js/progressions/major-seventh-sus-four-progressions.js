// major-seventh-sus-four-progressions.js
// The jazz and gospel progression sets for the majorSeventhSusFour chord lesson.
// Data only — the builder that turns these into playable chords lives in
// js/inversion-service.js, which must be loaded first.

InversionService.registerProgressions(
  'majorSeventhSusFour',
    // Five jazz chord progressions built around the Major 7sus4 chord.
  [
      {
        id: "major-seventh-sus4-chord-ii-V-I",
        name: "ii–V–I with Major 7sus4 chord Tonic",
        label: "ii7 – V7 – IVmaj7sus4",
        description: "The familiar ii–V–I resolves onto IVmaj7sus4 instead of a plain major 7th, for extra color at the cadence.",
        degrees: [
          { roman: "ii7", name: "Supertonic 7th", semitoneFromKey: 2, quality: "minor7" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "IVmaj7sus4", name: "Subdominant", semitoneFromKey: 5, quality: "majorSeventhSusFour" },
        ],
      },
      {
        id: "major-seventh-sus4-chord-iv-color",
        name: "IVmaj7sus4 Color Change",
        label: "Imaj7 – IVmaj7sus4 – iii7 – vi7",
        description: "A Major 7sus4 chord stands in for the subdominant before the harmony falls back through iii7 to vi7.",
        degrees: [
          { roman: "Imaj7", name: "Tonic 7th", semitoneFromKey: 0, quality: "major7" },
          { roman: "IVmaj7sus4", name: "Subdominant", semitoneFromKey: 5, quality: "majorSeventhSusFour" },
          { roman: "iii7", name: "Mediant 7th", semitoneFromKey: 4, quality: "minor7" },
          { roman: "vi7", name: "Submediant 7th", semitoneFromKey: 9, quality: "minor7" },
        ],
      },
      {
        id: "major-seventh-sus4-chord-turnaround",
        name: "Turnaround with Major 7sus4 chord Color",
        label: "iii7 – VI7 – ii7 – V7",
        description: "A falling turnaround that passes briefly through a Major 7sus4 chord-colored submediant before the closing V7.",
        degrees: [
          { roman: "iii7", name: "Mediant 7th", semitoneFromKey: 4, quality: "minor7" },
          { roman: "VImaj7sus4", name: "Submediant", semitoneFromKey: 9, quality: "majorSeventhSusFour" },
          { roman: "ii7", name: "Supertonic 7th", semitoneFromKey: 2, quality: "minor7" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
      {
        id: "major-seventh-sus4-chord-minor-key",
        name: "Minor-Key Cadence with Major 7sus4 chord",
        label: "i7 – IVmaj7sus4 – V7 – i7",
        description: "A minor-key cadence borrowing the parallel major’s IV, colored as a full Major 7sus4 chord for extra richness before the dominant resolves home.",
        degrees: [
          { roman: "i7", name: "Tonic 7th", semitoneFromKey: 0, quality: "minor7" },
          { roman: "IVmaj7sus4", name: "Borrowed subdominant", semitoneFromKey: 5, quality: "majorSeventhSusFour" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i7", name: "Tonic 7th", semitoneFromKey: 0, quality: "minor7" },
        ],
      },
      {
        id: "major-seventh-sus4-chord-blues",
        name: "Jazz Blues Turnaround with Major 7sus4 chord Tonic",
        label: "IVmaj7sus4 – IV7 – ii7 – V7",
        description: "A jazz-blues turnaround that opens on IVmaj7sus4 instead of a plain major or dominant tonic, establishing a rich color right away.",
        degrees: [
          { roman: "IVmaj7sus4", name: "Subdominant", semitoneFromKey: 5, quality: "majorSeventhSusFour" },
          { roman: "IV7", name: "Subdominant 7th", semitoneFromKey: 5, quality: "dominant7" },
          { roman: "ii7", name: "Supertonic 7th", semitoneFromKey: 2, quality: "minor7" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
    ],
    // Five gospel chord progressions built around the Major 7sus4 chord.
  [
      {
        id: "major-seventh-sus4-chord-gospel-turnaround",
        name: "Gospel Turnaround with Major 7sus4 chord IV",
        label: "I – vi – IVmaj7sus4 – V7",
        description: "The classic gospel turnaround, swapping the usual IV triad for a Major 7sus4 chord color chord just before the closing V7.",
        degrees: [
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
          { roman: "vi", name: "Submediant", semitoneFromKey: 9, quality: "minor" },
          { roman: "IVmaj7sus4", name: "Subdominant", semitoneFromKey: 5, quality: "majorSeventhSusFour" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
      {
        id: "major-seventh-sus4-chord-amen-vamp",
        name: "Amen Vamp with Major 7sus4 chord Landing",
        label: "I – IV – iv – IVmaj7sus4",
        description: "The classic plagal \"Amen\" vamp, but the final chord blooms into a full Major 7sus4 chord instead of a plain triad — a warm, richly colored landing.",
        degrees: [
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
          { roman: "IV", name: "Subdominant", semitoneFromKey: 5, quality: "major" },
          { roman: "iv", name: "Borrowed minor subdominant", semitoneFromKey: 5, quality: "minor" },
          { roman: "IVmaj7sus4", name: "Subdominant", semitoneFromKey: 5, quality: "majorSeventhSusFour" },
        ],
      },
      {
        id: "major-seventh-sus4-chord-secondary",
        name: "Secondary Major 7sus4 chord Turnaround",
        label: "I – IIImaj7sus4 – vi – V7",
        description: "A secondary chord built on the mediant, colored as a Major 7sus4 chord instead of the usual minor triad, resolving into vi before the closing V7.",
        degrees: [
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
          { roman: "IIImaj7sus4", name: "Mediant", semitoneFromKey: 4, quality: "majorSeventhSusFour" },
          { roman: "vi", name: "Submediant", semitoneFromKey: 9, quality: "minor" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
      {
        id: "major-seventh-sus4-chord-extended-turnaround",
        name: "Extended Gospel Turnaround with Major 7sus4 chord Color",
        label: "iii7 – vi7 – ii7 – ♭VImaj7sus4 – IVmaj7sus4",
        description: "A five-chord walk-back turnaround that closes with a chromatic ♭VImaj7sus4 passing chord just before landing on a full, rich Major 7sus4 chord.",
        degrees: [
          { roman: "iii7", name: "Mediant 7th", semitoneFromKey: 4, quality: "minor7" },
          { roman: "vi7", name: "Submediant 7th", semitoneFromKey: 9, quality: "minor7" },
          { roman: "ii7", name: "Supertonic 7th", semitoneFromKey: 2, quality: "minor7" },
          { roman: "♭VImaj7sus4", name: "Chromatic passing chord", semitoneFromKey: 8, quality: "majorSeventhSusFour" },
          { roman: "IVmaj7sus4", name: "Subdominant", semitoneFromKey: 5, quality: "majorSeventhSusFour" },
        ],
      },
      {
        id: "major-seventh-sus4-chord-minor-gospel-cadence",
        name: "Minor Gospel Cadence with Major 7sus4 chord IV",
        label: "i – IVmaj7sus4 – V7 – i",
        description: "A minor-key gospel cadence where the subdominant borrows the parallel major’s IV and blooms into a Major 7sus4 chord, giving a rich lift before the dominant pulls home.",
        degrees: [
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
          { roman: "IVmaj7sus4", name: "Borrowed subdominant", semitoneFromKey: 5, quality: "majorSeventhSusFour" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
        ],
      },
    ],
);
