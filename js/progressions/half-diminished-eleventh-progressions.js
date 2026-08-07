// half-diminished-eleventh-progressions.js
// The jazz and gospel progression sets for the halfDiminishedEleventh chord lesson.
// Data only — the builder that turns these into playable chords lives in
// js/inversion-service.js, which must be loaded first.

InversionService.registerProgressions(
  'halfDiminishedEleventh',
    // Five jazz chord progressions built around the Half-diminished 11th chord.
  [
      {
        id: "half-diminished-eleventh-chord-ii-V-i",
        name: "Minor ii–V–i with Half-diminished 11th chord",
        label: "iim11♭5 – V7 – i7",
        description: "A minor ii–V–i with the ii chord colored as a Half-diminished 11th chord instead of a plain minor 7th or half-diminished 7th.",
        degrees: [
          { roman: "iim11♭5", name: "Supertonic", semitoneFromKey: 2, quality: "halfDiminishedEleventh" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i7", name: "Tonic 7th", semitoneFromKey: 0, quality: "minor7" },
        ],
      },
      {
        id: "half-diminished-eleventh-chord-turnaround",
        name: "Turnaround with Half-diminished 11th chord",
        label: "iim11♭5 – V7 – iim11♭5 – i",
        description: "A vamp-like turnaround that lingers on the Half-diminished 11th chord before resolving down to the minor tonic.",
        degrees: [
          { roman: "iim11♭5", name: "Color chord", semitoneFromKey: 2, quality: "halfDiminishedEleventh" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "iim11♭5", name: "Color chord", semitoneFromKey: 2, quality: "halfDiminishedEleventh" },
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
        ],
      },
      {
        id: "half-diminished-eleventh-chord-iv-color",
        name: "Half-diminished 11th chord Subdominant Color",
        label: "i7 – iim11♭5 – V7 – i7",
        description: "A minor-key cadence that colors its middle chord as a Half-diminished 11th chord before the dominant resolves home.",
        degrees: [
          { roman: "i7", name: "Tonic 7th", semitoneFromKey: 0, quality: "minor7" },
          { roman: "iim11♭5", name: "Color chord", semitoneFromKey: 2, quality: "halfDiminishedEleventh" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i7", name: "Tonic 7th", semitoneFromKey: 0, quality: "minor7" },
        ],
      },
      {
        id: "half-diminished-eleventh-chord-relative-major",
        name: "Relative-Major Turnaround with Half-diminished 11th chord",
        label: "III – iim11♭5 – V7 – i",
        description: "A move through the relative major before the Half-diminished 11th chord colors the approach to the closing V7–i.",
        degrees: [
          { roman: "III", name: "Relative major", semitoneFromKey: 4, quality: "major" },
          { roman: "iim11♭5", name: "Color chord", semitoneFromKey: 2, quality: "halfDiminishedEleventh" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
        ],
      },
      {
        id: "half-diminished-eleventh-chord-blues",
        name: "Minor Blues Turnaround with Half-diminished 11th chord",
        label: "i7 – iv7 – iim11♭5 – V7",
        description: "A minor-blues turnaround voicing its final approach chord as a Half-diminished 11th chord before the closing dominant.",
        degrees: [
          { roman: "i7", name: "Tonic 7th", semitoneFromKey: 0, quality: "minor7" },
          { roman: "iv7", name: "Subdominant 7th", semitoneFromKey: 5, quality: "minor7" },
          { roman: "iim11♭5", name: "Color chord", semitoneFromKey: 2, quality: "halfDiminishedEleventh" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
    ],
    // Five gospel chord progressions built around the Half-diminished 11th chord.
  [
      {
        id: "half-diminished-eleventh-chord-gospel-turnaround",
        name: "Minor Gospel Turnaround with Half-diminished 11th chord",
        label: "i – iim11♭5 – V7 – i",
        description: "A minor-key gospel turnaround whose middle chord blooms into a Half-diminished 11th chord before the dominant pulls back home.",
        degrees: [
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
          { roman: "iim11♭5", name: "Color chord", semitoneFromKey: 2, quality: "halfDiminishedEleventh" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
        ],
      },
      {
        id: "half-diminished-eleventh-chord-vamp",
        name: "Minor Vamp with Half-diminished 11th chord",
        label: "i – iv – iim11♭5 – i",
        description: "A sustained minor-key vamp that settles onto the rich Half-diminished 11th chord just before returning to the tonic.",
        degrees: [
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
          { roman: "iv", name: "Subdominant", semitoneFromKey: 5, quality: "minor" },
          { roman: "iim11♭5", name: "Color chord", semitoneFromKey: 2, quality: "halfDiminishedEleventh" },
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
        ],
      },
      {
        id: "half-diminished-eleventh-chord-secondary",
        name: "Secondary Half-diminished 11th chord Turnaround",
        label: "i – ♭VI – iim11♭5 – V7",
        description: "A chromatic ♭VI passing chord leads into a Half-diminished 11th chord before the closing dominant.",
        degrees: [
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
          { roman: "♭VI", name: "Chromatic passing chord", semitoneFromKey: 8, quality: "major" },
          { roman: "iim11♭5", name: "Color chord", semitoneFromKey: 2, quality: "halfDiminishedEleventh" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
      {
        id: "half-diminished-eleventh-chord-extended-turnaround",
        name: "Extended Minor Turnaround with Half-diminished 11th chord",
        label: "i – iv – iim11♭5 – V7 – i",
        description: "A five-chord minor turnaround whose penultimate approach chord is colored as a Half-diminished 11th chord.",
        degrees: [
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
          { roman: "iv", name: "Subdominant", semitoneFromKey: 5, quality: "minor" },
          { roman: "iim11♭5", name: "Color chord", semitoneFromKey: 2, quality: "halfDiminishedEleventh" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
        ],
      },
      {
        id: "half-diminished-eleventh-chord-cadence",
        name: "Minor Gospel Cadence with Half-diminished 11th chord",
        label: "iim11♭5 – V7 – i",
        description: "A short, direct minor gospel cadence approaching the tonic through a Half-diminished 11th chord.",
        degrees: [
          { roman: "iim11♭5", name: "Color chord", semitoneFromKey: 2, quality: "halfDiminishedEleventh" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
        ],
      },
    ],
);
