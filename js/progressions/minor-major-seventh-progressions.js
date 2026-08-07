// minor-major-seventh-progressions.js
// The jazz and gospel progression sets for the minorMajorSeventh chord lesson.
// Data only — the builder that turns these into playable chords lives in
// js/inversion-service.js, which must be loaded first.

InversionService.registerProgressions(
  'minorMajorSeventh',
    // Five jazz chord progressions built around the Minor-major 7th chord.
  [
      {
        id: "minor-major-seventh-chord-ii-V-i",
        name: "Minor ii–V–i with Minor-major 7th chord",
        label: "im(maj7) – V7 – i7",
        description: "A minor ii–V–i with the ii chord colored as a Minor-major 7th chord instead of a plain minor 7th or half-diminished 7th.",
        degrees: [
          { roman: "im(maj7)", name: "Supertonic", semitoneFromKey: 2, quality: "minor7" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i7", name: "Tonic 7th", semitoneFromKey: 0, quality: "minor7" },
        ],
      },
      {
        id: "minor-major-seventh-chord-turnaround",
        name: "Turnaround with Minor-major 7th chord",
        label: "im(maj7) – V7 – im(maj7) – i",
        description: "A vamp-like turnaround that lingers on the Minor-major 7th chord before resolving down to the minor tonic.",
        degrees: [
          { roman: "im(maj7)", name: "Color chord", semitoneFromKey: 0, quality: "minorMajorSeventh" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "im(maj7)", name: "Color chord", semitoneFromKey: 0, quality: "minorMajorSeventh" },
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
        ],
      },
      {
        id: "minor-major-seventh-chord-iv-color",
        name: "Minor-major 7th chord Subdominant Color",
        label: "i7 – im(maj7) – V7 – i7",
        description: "A minor-key cadence that colors its middle chord as a Minor-major 7th chord before the dominant resolves home.",
        degrees: [
          { roman: "i7", name: "Tonic 7th", semitoneFromKey: 0, quality: "minor7" },
          { roman: "im(maj7)", name: "Color chord", semitoneFromKey: 0, quality: "minorMajorSeventh" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i7", name: "Tonic 7th", semitoneFromKey: 0, quality: "minor7" },
        ],
      },
      {
        id: "minor-major-seventh-chord-relative-major",
        name: "Relative-Major Turnaround with Minor-major 7th chord",
        label: "III – im(maj7) – V7 – i",
        description: "A move through the relative major before the Minor-major 7th chord colors the approach to the closing V7–i.",
        degrees: [
          { roman: "III", name: "Relative major", semitoneFromKey: 4, quality: "major" },
          { roman: "im(maj7)", name: "Color chord", semitoneFromKey: 0, quality: "minorMajorSeventh" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
        ],
      },
      {
        id: "minor-major-seventh-chord-blues",
        name: "Minor Blues Turnaround with Minor-major 7th chord",
        label: "i7 – iv7 – im(maj7) – V7",
        description: "A minor-blues turnaround voicing its final approach chord as a Minor-major 7th chord before the closing dominant.",
        degrees: [
          { roman: "i7", name: "Tonic 7th", semitoneFromKey: 0, quality: "minor7" },
          { roman: "iv7", name: "Subdominant 7th", semitoneFromKey: 5, quality: "minor7" },
          { roman: "im(maj7)", name: "Color chord", semitoneFromKey: 0, quality: "minorMajorSeventh" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
    ],
    // Five gospel chord progressions built around the Minor-major 7th chord.
  [
      {
        id: "minor-major-seventh-chord-gospel-turnaround",
        name: "Minor Gospel Turnaround with Minor-major 7th chord",
        label: "i – im(maj7) – V7 – i",
        description: "A minor-key gospel turnaround whose middle chord blooms into a Minor-major 7th chord before the dominant pulls back home.",
        degrees: [
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
          { roman: "im(maj7)", name: "Color chord", semitoneFromKey: 0, quality: "minorMajorSeventh" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
        ],
      },
      {
        id: "minor-major-seventh-chord-vamp",
        name: "Minor Vamp with Minor-major 7th chord",
        label: "i – iv – im(maj7) – i",
        description: "A sustained minor-key vamp that settles onto the rich Minor-major 7th chord just before returning to the tonic.",
        degrees: [
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
          { roman: "iv", name: "Subdominant", semitoneFromKey: 5, quality: "minor" },
          { roman: "im(maj7)", name: "Color chord", semitoneFromKey: 0, quality: "minorMajorSeventh" },
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
        ],
      },
      {
        id: "minor-major-seventh-chord-secondary",
        name: "Secondary Minor-major 7th chord Turnaround",
        label: "i – ♭VI – im(maj7) – V7",
        description: "A chromatic ♭VI passing chord leads into a Minor-major 7th chord before the closing dominant.",
        degrees: [
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
          { roman: "♭VI", name: "Chromatic passing chord", semitoneFromKey: 8, quality: "major" },
          { roman: "im(maj7)", name: "Color chord", semitoneFromKey: 0, quality: "minorMajorSeventh" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
      {
        id: "minor-major-seventh-chord-extended-turnaround",
        name: "Extended Minor Turnaround with Minor-major 7th chord",
        label: "i – iv – im(maj7) – V7 – i",
        description: "A five-chord minor turnaround whose penultimate approach chord is colored as a Minor-major 7th chord.",
        degrees: [
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
          { roman: "iv", name: "Subdominant", semitoneFromKey: 5, quality: "minor" },
          { roman: "im(maj7)", name: "Color chord", semitoneFromKey: 0, quality: "minorMajorSeventh" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
        ],
      },
      {
        id: "minor-major-seventh-chord-cadence",
        name: "Minor Gospel Cadence with Minor-major 7th chord",
        label: "im(maj7) – V7 – i",
        description: "A short, direct minor gospel cadence approaching the tonic through a Minor-major 7th chord.",
        degrees: [
          { roman: "im(maj7)", name: "Color chord", semitoneFromKey: 0, quality: "minorMajorSeventh" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
        ],
      },
    ],
);
