// major-seventh-sharp-five-progressions.js
// The jazz and gospel progression sets for the majorSeventhSharpFive chord lesson.
// Data only — the builder that turns these into playable chords lives in
// js/inversion-service.js, which must be loaded first.

InversionService.registerProgressions(
  'majorSeventhSharpFive',
    // Five jazz chord progressions built around the Major 7th♯5 chord (augmented major 7th).
  [
      {
        id: "major-seventh-sharp-five-chord-ii-V-I",
        name: "ii–V–I with Major 7th♯5 chord (augmented major 7th) Tonic",
        label: "ii7 – V7 – Imaj7♯5",
        description: "The familiar ii–V–I resolves onto Imaj7♯5 instead of a plain major 7th, for extra color at the cadence.",
        degrees: [
          { roman: "ii7", name: "Supertonic 7th", semitoneFromKey: 2, quality: "minor7" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "Imaj7♯5", name: "Tonic", semitoneFromKey: 0, quality: "majorSeventhSharpFive" },
        ],
      },
      {
        id: "major-seventh-sharp-five-chord-iv-color",
        name: "IVmaj7♯5 Color Change",
        label: "Imaj7 – IVmaj7♯5 – iii7 – vi7",
        description: "A Major 7th♯5 chord (augmented major 7th) stands in for the subdominant before the harmony falls back through iii7 to vi7.",
        degrees: [
          { roman: "Imaj7", name: "Tonic 7th", semitoneFromKey: 0, quality: "major7" },
          { roman: "IVmaj7♯5", name: "Subdominant", semitoneFromKey: 5, quality: "majorSeventhSharpFive" },
          { roman: "iii7", name: "Mediant 7th", semitoneFromKey: 4, quality: "minor7" },
          { roman: "vi7", name: "Submediant 7th", semitoneFromKey: 9, quality: "minor7" },
        ],
      },
      {
        id: "major-seventh-sharp-five-chord-turnaround",
        name: "Turnaround with Major 7th♯5 chord (augmented major 7th) Color",
        label: "iii7 – VI7 – ii7 – V7",
        description: "A falling turnaround that passes briefly through a Major 7th♯5 chord (augmented major 7th)-colored submediant before the closing V7.",
        degrees: [
          { roman: "iii7", name: "Mediant 7th", semitoneFromKey: 4, quality: "minor7" },
          { roman: "VImaj7♯5", name: "Submediant", semitoneFromKey: 9, quality: "majorSeventhSharpFive" },
          { roman: "ii7", name: "Supertonic 7th", semitoneFromKey: 2, quality: "minor7" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
      {
        id: "major-seventh-sharp-five-chord-minor-key",
        name: "Minor-Key Cadence with Major 7th♯5 chord (augmented major 7th)",
        label: "i7 – IVmaj7♯5 – V7 – i7",
        description: "A minor-key cadence borrowing the parallel major’s IV, colored as a full Major 7th♯5 chord (augmented major 7th) for extra richness before the dominant resolves home.",
        degrees: [
          { roman: "i7", name: "Tonic 7th", semitoneFromKey: 0, quality: "minor7" },
          { roman: "IVmaj7♯5", name: "Borrowed subdominant", semitoneFromKey: 5, quality: "majorSeventhSharpFive" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i7", name: "Tonic 7th", semitoneFromKey: 0, quality: "minor7" },
        ],
      },
      {
        id: "major-seventh-sharp-five-chord-blues",
        name: "Jazz Blues Turnaround with Major 7th♯5 chord (augmented major 7th) Tonic",
        label: "Imaj7♯5 – IV7 – ii7 – V7",
        description: "A jazz-blues turnaround that opens on Imaj7♯5 instead of a plain major or dominant tonic, establishing a rich color right away.",
        degrees: [
          { roman: "Imaj7♯5", name: "Tonic", semitoneFromKey: 0, quality: "majorSeventhSharpFive" },
          { roman: "IV7", name: "Subdominant 7th", semitoneFromKey: 5, quality: "dominant7" },
          { roman: "ii7", name: "Supertonic 7th", semitoneFromKey: 2, quality: "minor7" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
    ],
    // Five gospel chord progressions built around the Major 7th♯5 chord (augmented major 7th).
  [
      {
        id: "major-seventh-sharp-five-chord-gospel-turnaround",
        name: "Gospel Turnaround with Major 7th♯5 chord (augmented major 7th) IV",
        label: "I – vi – IV – V7",
        description: "The classic gospel turnaround, closing on a Major 7th♯5 chord (augmented major 7th)-colored tonic feel just before the final V7.",
        degrees: [
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
          { roman: "vi", name: "Submediant", semitoneFromKey: 9, quality: "minor" },
          { roman: "IV", name: "Subdominant", semitoneFromKey: 5, quality: "major" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
      {
        id: "major-seventh-sharp-five-chord-amen-vamp",
        name: "Amen Vamp with Major 7th♯5 chord (augmented major 7th) Landing",
        label: "I – IV – iv – Imaj7♯5",
        description: "The classic plagal \"Amen\" vamp, but the final chord blooms into a full Major 7th♯5 chord (augmented major 7th) instead of a plain triad — a warm, richly colored landing.",
        degrees: [
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
          { roman: "IV", name: "Subdominant", semitoneFromKey: 5, quality: "major" },
          { roman: "iv", name: "Borrowed minor subdominant", semitoneFromKey: 5, quality: "minor" },
          { roman: "Imaj7♯5", name: "Tonic", semitoneFromKey: 0, quality: "majorSeventhSharpFive" },
        ],
      },
      {
        id: "major-seventh-sharp-five-chord-secondary",
        name: "Secondary Major 7th♯5 chord (augmented major 7th) Turnaround",
        label: "I – IIImaj7♯5 – vi – V7",
        description: "A secondary chord built on the mediant, colored as a Major 7th♯5 chord (augmented major 7th) instead of the usual minor triad, resolving into vi before the closing V7.",
        degrees: [
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
          { roman: "IIImaj7♯5", name: "Mediant", semitoneFromKey: 4, quality: "majorSeventhSharpFive" },
          { roman: "vi", name: "Submediant", semitoneFromKey: 9, quality: "minor" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
      {
        id: "major-seventh-sharp-five-chord-extended-turnaround",
        name: "Extended Gospel Turnaround with Major 7th♯5 chord (augmented major 7th) Color",
        label: "iii7 – vi7 – ii7 – ♭VImaj7♯5 – Imaj7♯5",
        description: "A five-chord walk-back turnaround that closes with a chromatic ♭VImaj7♯5 passing chord just before landing on a full, rich Major 7th♯5 chord (augmented major 7th).",
        degrees: [
          { roman: "iii7", name: "Mediant 7th", semitoneFromKey: 4, quality: "minor7" },
          { roman: "vi7", name: "Submediant 7th", semitoneFromKey: 9, quality: "minor7" },
          { roman: "ii7", name: "Supertonic 7th", semitoneFromKey: 2, quality: "minor7" },
          { roman: "♭VImaj7♯5", name: "Chromatic passing chord", semitoneFromKey: 8, quality: "majorSeventhSharpFive" },
          { roman: "Imaj7♯5", name: "Tonic", semitoneFromKey: 0, quality: "majorSeventhSharpFive" },
        ],
      },
      {
        id: "major-seventh-sharp-five-chord-minor-gospel-cadence",
        name: "Minor Gospel Cadence with Major 7th♯5 chord (augmented major 7th) IV",
        label: "i – IVmaj7♯5 – V7 – i",
        description: "A minor-key gospel cadence where the subdominant borrows the parallel major’s IV and blooms into a Major 7th♯5 chord (augmented major 7th), giving a rich lift before the dominant pulls home.",
        degrees: [
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
          { roman: "IVmaj7♯5", name: "Borrowed subdominant", semitoneFromKey: 5, quality: "majorSeventhSharpFive" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
        ],
      },
    ],
);
