// neapolitan-progressions.js
// The jazz and gospel progression sets for the neapolitan chord lesson.
// Data only — the builder that turns these into playable chords lives in
// js/inversion-service.js, which must be loaded first.

InversionService.registerProgressions(
  'neapolitan',
    // Five jazz chord progressions built around the Neapolitan (♭II) chord.
  [
      {
        id: "neapolitan-chord-neapolitan-cadence",
        name: "Neapolitan Cadence",
        label: "♭II – V7 – I",
        description: "The textbook Neapolitan cadence: a Neapolitan (♭II) chord substitutes for the subdominant, resolving through V7 to the tonic.",
        degrees: [
          { roman: "♭II", name: "Neapolitan", semitoneFromKey: 1, quality: "neapolitan" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
        ],
      },
      {
        id: "neapolitan-chord-minor-neapolitan",
        name: "Minor-Key Neapolitan Cadence",
        label: "i – ♭II – V7 – i",
        description: "The Neapolitan chord in its original minor-key home, substituting for the subdominant before the dominant resolves home.",
        degrees: [
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
          { roman: "♭II", name: "Neapolitan", semitoneFromKey: 1, quality: "neapolitan" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
        ],
      },
      {
        id: "neapolitan-chord-turnaround",
        name: "Turnaround with Neapolitan Approach",
        label: "iii7 – vi7 – ♭II – V7",
        description: "A falling turnaround that detours through the Neapolitan chord just before the closing dominant.",
        degrees: [
          { roman: "iii7", name: "Mediant 7th", semitoneFromKey: 4, quality: "minor7" },
          { roman: "vi7", name: "Submediant 7th", semitoneFromKey: 9, quality: "minor7" },
          { roman: "♭II", name: "Neapolitan", semitoneFromKey: 1, quality: "neapolitan" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
      {
        id: "neapolitan-chord-extended",
        name: "Extended Cadence with Neapolitan Color",
        label: "I – vi – ♭II – V7 – I",
        description: "A five-chord cadence bringing the Neapolitan chord in as a surprise color just before the final dominant.",
        degrees: [
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
          { roman: "vi", name: "Submediant", semitoneFromKey: 9, quality: "minor" },
          { roman: "♭II", name: "Neapolitan", semitoneFromKey: 1, quality: "neapolitan" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
        ],
      },
      {
        id: "neapolitan-chord-classical",
        name: "Classical-Style Neapolitan Progression",
        label: "I – IV – ♭II – V7 – I",
        description: "A classical-flavored progression where the Neapolitan chord takes over the subdominant’s usual role.",
        degrees: [
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
          { roman: "IV", name: "Subdominant", semitoneFromKey: 5, quality: "major" },
          { roman: "♭II", name: "Neapolitan", semitoneFromKey: 1, quality: "neapolitan" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
        ],
      },
    ],
    // Five gospel chord progressions built around the Neapolitan (♭II) chord.
  [
      {
        id: "neapolitan-chord-gospel-cadence",
        name: "Gospel Neapolitan Cadence",
        label: "I – vi – ♭II – V7",
        description: "A gospel turnaround borrowing the Neapolitan chord in place of the usual IV or ii, for a surprising chromatic lift before the V7.",
        degrees: [
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
          { roman: "vi", name: "Submediant", semitoneFromKey: 9, quality: "minor" },
          { roman: "♭II", name: "Neapolitan", semitoneFromKey: 1, quality: "neapolitan" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
      {
        id: "neapolitan-chord-vamp",
        name: "Vamp with Neapolitan Color",
        label: "I – IV – ♭II – I",
        description: "A vamp that briefly borrows the Neapolitan color just before returning home to the tonic.",
        degrees: [
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
          { roman: "IV", name: "Subdominant", semitoneFromKey: 5, quality: "major" },
          { roman: "♭II", name: "Neapolitan", semitoneFromKey: 1, quality: "neapolitan" },
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
        ],
      },
      {
        id: "neapolitan-chord-secondary",
        name: "Secondary Turnaround with Neapolitan Color",
        label: "I – ♭II – vi – V7",
        description: "The Neapolitan chord appears early in the turnaround, well before the closing dominant.",
        degrees: [
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
          { roman: "♭II", name: "Neapolitan", semitoneFromKey: 1, quality: "neapolitan" },
          { roman: "vi", name: "Submediant", semitoneFromKey: 9, quality: "minor" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
      {
        id: "neapolitan-chord-extended-turnaround",
        name: "Extended Gospel Turnaround with Neapolitan Color",
        label: "iii7 – vi7 – ♭II – V7 – I",
        description: "A five-chord walk-back turnaround with the Neapolitan chord standing in for ii7.",
        degrees: [
          { roman: "iii7", name: "Mediant 7th", semitoneFromKey: 4, quality: "minor7" },
          { roman: "vi7", name: "Submediant 7th", semitoneFromKey: 9, quality: "minor7" },
          { roman: "♭II", name: "Neapolitan", semitoneFromKey: 1, quality: "neapolitan" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
        ],
      },
      {
        id: "neapolitan-chord-minor-gospel-cadence",
        name: "Minor Gospel Cadence with Neapolitan Color",
        label: "i – ♭II – V7 – i",
        description: "A minor-key gospel cadence with the Neapolitan chord taking the subdominant’s place.",
        degrees: [
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
          { roman: "♭II", name: "Neapolitan", semitoneFromKey: 1, quality: "neapolitan" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
        ],
      },
    ],
);
