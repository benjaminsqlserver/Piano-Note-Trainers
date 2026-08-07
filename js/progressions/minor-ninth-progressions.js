// minor-ninth-progressions.js
// The jazz and gospel progression sets for the minorNinth chord lesson.
// Data only — the builder that turns these into playable chords lives in
// js/inversion-service.js, which must be loaded first.

InversionService.registerProgressions(
  'minorNinth',
    // Five jazz chord progressions built around the Minor 9th chord.
  [
      {
        id: "minor-ninth-chord-ii-V-i",
        name: "Minor ii–V–i with Minor 9th chord",
        label: "iim9 – V7 – i7",
        description: "A minor ii–V–i with the ii chord colored as a Minor 9th chord instead of a plain minor 7th or half-diminished 7th.",
        degrees: [
          { roman: "iim9", name: "Supertonic", semitoneFromKey: 2, quality: "minorNinth" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i7", name: "Tonic 7th", semitoneFromKey: 0, quality: "minor7" },
        ],
      },
      {
        id: "minor-ninth-chord-turnaround",
        name: "Turnaround with Minor 9th chord",
        label: "iim9 – V7 – iim9 – i",
        description: "A vamp-like turnaround that lingers on the Minor 9th chord before resolving down to the minor tonic.",
        degrees: [
          { roman: "iim9", name: "Color chord", semitoneFromKey: 2, quality: "minorNinth" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "iim9", name: "Color chord", semitoneFromKey: 2, quality: "minorNinth" },
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
        ],
      },
      {
        id: "minor-ninth-chord-iv-color",
        name: "Minor 9th chord Subdominant Color",
        label: "i7 – iim9 – V7 – i7",
        description: "A minor-key cadence that colors its middle chord as a Minor 9th chord before the dominant resolves home.",
        degrees: [
          { roman: "i7", name: "Tonic 7th", semitoneFromKey: 0, quality: "minor7" },
          { roman: "iim9", name: "Color chord", semitoneFromKey: 2, quality: "minorNinth" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i7", name: "Tonic 7th", semitoneFromKey: 0, quality: "minor7" },
        ],
      },
      {
        id: "minor-ninth-chord-relative-major",
        name: "Relative-Major Turnaround with Minor 9th chord",
        label: "III – iim9 – V7 – i",
        description: "A move through the relative major before the Minor 9th chord colors the approach to the closing V7–i.",
        degrees: [
          { roman: "III", name: "Relative major", semitoneFromKey: 4, quality: "major" },
          { roman: "iim9", name: "Color chord", semitoneFromKey: 2, quality: "minorNinth" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
        ],
      },
      {
        id: "minor-ninth-chord-blues",
        name: "Minor Blues Turnaround with Minor 9th chord",
        label: "i7 – iv7 – iim9 – V7",
        description: "A minor-blues turnaround voicing its final approach chord as a Minor 9th chord before the closing dominant.",
        degrees: [
          { roman: "i7", name: "Tonic 7th", semitoneFromKey: 0, quality: "minor7" },
          { roman: "iv7", name: "Subdominant 7th", semitoneFromKey: 5, quality: "minor7" },
          { roman: "iim9", name: "Color chord", semitoneFromKey: 2, quality: "minorNinth" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
    ],
    // Five gospel chord progressions built around the Minor 9th chord.
  [
      {
        id: "minor-ninth-chord-gospel-turnaround",
        name: "Minor Gospel Turnaround with Minor 9th chord",
        label: "i – iim9 – V7 – i",
        description: "A minor-key gospel turnaround whose middle chord blooms into a Minor 9th chord before the dominant pulls back home.",
        degrees: [
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
          { roman: "iim9", name: "Color chord", semitoneFromKey: 2, quality: "minorNinth" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
        ],
      },
      {
        id: "minor-ninth-chord-vamp",
        name: "Minor Vamp with Minor 9th chord",
        label: "i – iv – iim9 – i",
        description: "A sustained minor-key vamp that settles onto the rich Minor 9th chord just before returning to the tonic.",
        degrees: [
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
          { roman: "iv", name: "Subdominant", semitoneFromKey: 5, quality: "minor" },
          { roman: "iim9", name: "Color chord", semitoneFromKey: 2, quality: "minorNinth" },
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
        ],
      },
      {
        id: "minor-ninth-chord-secondary",
        name: "Secondary Minor 9th chord Turnaround",
        label: "i – ♭VI – iim9 – V7",
        description: "A chromatic ♭VI passing chord leads into a Minor 9th chord before the closing dominant.",
        degrees: [
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
          { roman: "♭VI", name: "Chromatic passing chord", semitoneFromKey: 8, quality: "major" },
          { roman: "iim9", name: "Color chord", semitoneFromKey: 2, quality: "minorNinth" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
      {
        id: "minor-ninth-chord-extended-turnaround",
        name: "Extended Minor Turnaround with Minor 9th chord",
        label: "i – iv – iim9 – V7 – i",
        description: "A five-chord minor turnaround whose penultimate approach chord is colored as a Minor 9th chord.",
        degrees: [
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
          { roman: "iv", name: "Subdominant", semitoneFromKey: 5, quality: "minor" },
          { roman: "iim9", name: "Color chord", semitoneFromKey: 2, quality: "minorNinth" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
        ],
      },
      {
        id: "minor-ninth-chord-cadence",
        name: "Minor Gospel Cadence with Minor 9th chord",
        label: "iim9 – V7 – i",
        description: "A short, direct minor gospel cadence approaching the tonic through a Minor 9th chord.",
        degrees: [
          { roman: "iim9", name: "Color chord", semitoneFromKey: 2, quality: "minorNinth" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
        ],
      },
    ],
);
