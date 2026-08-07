// diminished-major-seventh-progressions.js
// The jazz and gospel progression sets for the diminishedMajorSeventh chord lesson.
// Data only — the builder that turns these into playable chords lives in
// js/inversion-service.js, which must be loaded first.

InversionService.registerProgressions(
  'diminishedMajorSeventh',
    // Five jazz chord progressions built around the Diminished major 7th chord.
  [
      {
        id: "diminished-major-seventh-chord-passing-ii",
        name: "Chromatic Passing Chord: I to ii with Diminished major 7th chord",
        label: "I – (maj7)dim – ii7",
        description: "A Diminished major 7th chord passes chromatically between the tonic and the ii chord, a half step below ii.",
        degrees: [
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
          { roman: "#i°(maj7)", name: "Chromatic passing chord", semitoneFromKey: 1, quality: "diminishedMajorSeventh" },
          { roman: "ii7", name: "Supertonic 7th", semitoneFromKey: 2, quality: "minor7" },
        ],
      },
      {
        id: "diminished-major-seventh-chord-ii-V-i",
        name: "Minor ii–V–i with Diminished major 7th chord Passing Chord",
        label: "i – (maj7)dim – V7 – i",
        description: "A minor-key cadence where a Diminished major 7th chord passes between the tonic and the dominant.",
        degrees: [
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
          { roman: "♯i°(maj7)", name: "Chromatic passing chord", semitoneFromKey: 1, quality: "diminishedMajorSeventh" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
        ],
      },
      {
        id: "diminished-major-seventh-chord-turnaround",
        name: "Turnaround with Diminished major 7th chord",
        label: "iii7 – vi7 – ♯i(maj7)dim – ii7",
        description: "A falling turnaround that slips through a Diminished major 7th chord on its way to the ii chord.",
        degrees: [
          { roman: "iii7", name: "Mediant 7th", semitoneFromKey: 4, quality: "minor7" },
          { roman: "vi7", name: "Submediant 7th", semitoneFromKey: 9, quality: "minor7" },
          { roman: "♯i°(maj7)", name: "Chromatic passing chord", semitoneFromKey: 1, quality: "diminishedMajorSeventh" },
          { roman: "ii7", name: "Supertonic 7th", semitoneFromKey: 2, quality: "minor7" },
        ],
      },
      {
        id: "diminished-major-seventh-chord-blues",
        name: "Blues Approach with Diminished major 7th chord",
        label: "I7 – IV7 – ♯iv(maj7)dim – I7",
        description: "A classic blues chromatic-passing move, coloring the approach chord as a Diminished major 7th chord instead of a plain diminished 7th.",
        degrees: [
          { roman: "I7", name: "Tonic 7th", semitoneFromKey: 0, quality: "dominant7" },
          { roman: "IV7", name: "Subdominant 7th", semitoneFromKey: 5, quality: "dominant7" },
          { roman: "♯iv°(maj7)", name: "Chromatic passing chord", semitoneFromKey: 6, quality: "diminishedMajorSeventh" },
          { roman: "I7", name: "Tonic 7th", semitoneFromKey: 0, quality: "dominant7" },
        ],
      },
      {
        id: "diminished-major-seventh-chord-minor-key",
        name: "Minor-Key Turnaround with Diminished major 7th chord",
        label: "i – ♯i(maj7)dim – iiø7 – V7",
        description: "A minor-key turnaround using a Diminished major 7th chord as a chromatic bridge between the tonic and the ii chord.",
        degrees: [
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
          { roman: "♯i°(maj7)", name: "Chromatic passing chord", semitoneFromKey: 1, quality: "diminishedMajorSeventh" },
          { roman: "iiø7", name: "Supertonic half-diminished 7th", semitoneFromKey: 2, quality: "halfDiminished7" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
    ],
    // Five gospel chord progressions built around the Diminished major 7th chord.
  [
      {
        id: "diminished-major-seventh-chord-gospel-passing",
        name: "Gospel Passing Chord with Diminished major 7th chord",
        label: "I – ♯i(maj7)dim – ii – V7",
        description: "A gospel harmonization that slides from the tonic to ii through a chromatic Diminished major 7th chord.",
        degrees: [
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
          { roman: "♯i°(maj7)", name: "Chromatic passing chord", semitoneFromKey: 1, quality: "diminishedMajorSeventh" },
          { roman: "ii", name: "Supertonic", semitoneFromKey: 2, quality: "minor" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
      {
        id: "diminished-major-seventh-chord-vamp",
        name: "Vamp with Diminished major 7th chord Approach",
        label: "I – IV – ♯iv(maj7)dim – I",
        description: "A vamp where the Diminished major 7th chord briefly darkens the color just before the tonic returns.",
        degrees: [
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
          { roman: "IV", name: "Subdominant", semitoneFromKey: 5, quality: "major" },
          { roman: "♯iv°(maj7)", name: "Chromatic passing chord", semitoneFromKey: 6, quality: "diminishedMajorSeventh" },
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
        ],
      },
      {
        id: "diminished-major-seventh-chord-secondary",
        name: "Secondary Approach with Diminished major 7th chord",
        label: "I – ♯i(maj7)dim – vi – V7",
        description: "A Diminished major 7th chord bridges the tonic and the submediant before the closing V7.",
        degrees: [
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
          { roman: "♯i°(maj7)", name: "Chromatic passing chord", semitoneFromKey: 1, quality: "diminishedMajorSeventh" },
          { roman: "vi", name: "Submediant", semitoneFromKey: 9, quality: "minor" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
      {
        id: "diminished-major-seventh-chord-extended",
        name: "Extended Gospel Turnaround with Diminished major 7th chord",
        label: "iii7 – vi7 – ♯i(maj7)dim – ii7 – V7",
        description: "An extended turnaround that slips through a Diminished major 7th chord on its way down to ii7.",
        degrees: [
          { roman: "iii7", name: "Mediant 7th", semitoneFromKey: 4, quality: "minor7" },
          { roman: "vi7", name: "Submediant 7th", semitoneFromKey: 9, quality: "minor7" },
          { roman: "♯i°(maj7)", name: "Chromatic passing chord", semitoneFromKey: 1, quality: "diminishedMajorSeventh" },
          { roman: "ii7", name: "Supertonic 7th", semitoneFromKey: 2, quality: "minor7" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
      {
        id: "diminished-major-seventh-chord-minor-cadence",
        name: "Minor Gospel Cadence with Diminished major 7th chord",
        label: "i – ♯i(maj7)dim – V7 – i",
        description: "A minor gospel cadence bridging the tonic and dominant with a chromatic Diminished major 7th chord.",
        degrees: [
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
          { roman: "♯i°(maj7)", name: "Chromatic passing chord", semitoneFromKey: 1, quality: "diminishedMajorSeventh" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
        ],
      },
    ],
);
