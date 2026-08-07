// minor-eleventh-progressions.js
// The jazz and gospel progression sets for the minorEleventh chord lesson.
// Data only — the builder that turns these into playable chords lives in
// js/inversion-service.js, which must be loaded first.

InversionService.registerProgressions(
  'minorEleventh',
    // Five jazz chord progressions built around the Minor 11th chord.
  [
      {
        id: "minor-eleventh-chord-ii-V-i",
        name: "Minor ii–V–i with Minor 11th chord",
        label: "vim11 – V7 – i7",
        description: "A minor ii–V–i with the ii chord colored as a Minor 11th chord instead of a plain minor 7th or half-diminished 7th.",
        degrees: [
          { roman: "vim11", name: "Supertonic", semitoneFromKey: 2, quality: "minor7" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i7", name: "Tonic 7th", semitoneFromKey: 0, quality: "minor7" },
        ],
      },
      {
        id: "minor-eleventh-chord-turnaround",
        name: "Turnaround with Minor 11th chord",
        label: "vim11 – V7 – vim11 – i",
        description: "A vamp-like turnaround that lingers on the Minor 11th chord before resolving down to the minor tonic.",
        degrees: [
          { roman: "vim11", name: "Color chord", semitoneFromKey: 9, quality: "minorEleventh" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "vim11", name: "Color chord", semitoneFromKey: 9, quality: "minorEleventh" },
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
        ],
      },
      {
        id: "minor-eleventh-chord-iv-color",
        name: "Minor 11th chord Subdominant Color",
        label: "i7 – vim11 – V7 – i7",
        description: "A minor-key cadence that colors its middle chord as a Minor 11th chord before the dominant resolves home.",
        degrees: [
          { roman: "i7", name: "Tonic 7th", semitoneFromKey: 0, quality: "minor7" },
          { roman: "vim11", name: "Color chord", semitoneFromKey: 9, quality: "minorEleventh" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i7", name: "Tonic 7th", semitoneFromKey: 0, quality: "minor7" },
        ],
      },
      {
        id: "minor-eleventh-chord-relative-major",
        name: "Relative-Major Turnaround with Minor 11th chord",
        label: "III – vim11 – V7 – i",
        description: "A move through the relative major before the Minor 11th chord colors the approach to the closing V7–i.",
        degrees: [
          { roman: "III", name: "Relative major", semitoneFromKey: 4, quality: "major" },
          { roman: "vim11", name: "Color chord", semitoneFromKey: 9, quality: "minorEleventh" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
        ],
      },
      {
        id: "minor-eleventh-chord-blues",
        name: "Minor Blues Turnaround with Minor 11th chord",
        label: "i7 – iv7 – vim11 – V7",
        description: "A minor-blues turnaround voicing its final approach chord as a Minor 11th chord before the closing dominant.",
        degrees: [
          { roman: "i7", name: "Tonic 7th", semitoneFromKey: 0, quality: "minor7" },
          { roman: "iv7", name: "Subdominant 7th", semitoneFromKey: 5, quality: "minor7" },
          { roman: "vim11", name: "Color chord", semitoneFromKey: 9, quality: "minorEleventh" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
    ],
    // Five gospel chord progressions built around the Minor 11th chord.
  [
      {
        id: "minor-eleventh-chord-gospel-turnaround",
        name: "Minor Gospel Turnaround with Minor 11th chord",
        label: "i – vim11 – V7 – i",
        description: "A minor-key gospel turnaround whose middle chord blooms into a Minor 11th chord before the dominant pulls back home.",
        degrees: [
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
          { roman: "vim11", name: "Color chord", semitoneFromKey: 9, quality: "minorEleventh" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
        ],
      },
      {
        id: "minor-eleventh-chord-vamp",
        name: "Minor Vamp with Minor 11th chord",
        label: "i – iv – vim11 – i",
        description: "A sustained minor-key vamp that settles onto the rich Minor 11th chord just before returning to the tonic.",
        degrees: [
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
          { roman: "iv", name: "Subdominant", semitoneFromKey: 5, quality: "minor" },
          { roman: "vim11", name: "Color chord", semitoneFromKey: 9, quality: "minorEleventh" },
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
        ],
      },
      {
        id: "minor-eleventh-chord-secondary",
        name: "Secondary Minor 11th chord Turnaround",
        label: "i – ♭VI – vim11 – V7",
        description: "A chromatic ♭VI passing chord leads into a Minor 11th chord before the closing dominant.",
        degrees: [
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
          { roman: "♭VI", name: "Chromatic passing chord", semitoneFromKey: 8, quality: "major" },
          { roman: "vim11", name: "Color chord", semitoneFromKey: 9, quality: "minorEleventh" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
      {
        id: "minor-eleventh-chord-extended-turnaround",
        name: "Extended Minor Turnaround with Minor 11th chord",
        label: "i – iv – vim11 – V7 – i",
        description: "A five-chord minor turnaround whose penultimate approach chord is colored as a Minor 11th chord.",
        degrees: [
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
          { roman: "iv", name: "Subdominant", semitoneFromKey: 5, quality: "minor" },
          { roman: "vim11", name: "Color chord", semitoneFromKey: 9, quality: "minorEleventh" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
        ],
      },
      {
        id: "minor-eleventh-chord-cadence",
        name: "Minor Gospel Cadence with Minor 11th chord",
        label: "vim11 – V7 – i",
        description: "A short, direct minor gospel cadence approaching the tonic through a Minor 11th chord.",
        degrees: [
          { roman: "vim11", name: "Color chord", semitoneFromKey: 9, quality: "minorEleventh" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
        ],
      },
    ],
);
