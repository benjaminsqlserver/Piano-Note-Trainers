// dominant-seventh-sharp-nine-progressions.js
// The jazz and gospel progression sets for the dominantSeventhSharpNine chord lesson.
// Data only — the builder that turns these into playable chords lives in
// js/inversion-service.js, which must be loaded first.

InversionService.registerProgressions(
  'dominantSeventhSharpNine',
    // Five jazz chord progressions built around the Dominant 7♯9 chord.
  [
      {
        id: 'dominant-seventh-sharp-nine-ii-V-I',
        name: 'ii–V–I with Dominant 7♯9',
        label: 'ii7 – V7♯9 – Imaj7',
        description: 'The familiar ii–V–I, with the dominant altered into a V7♯9 for extra tension before resolving to the tonic.',
        degrees: [
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7♯9', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant7SharpNine' },
          { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
        ],
      },
      {
        id: 'dominant-seventh-sharp-nine-minor-ii-V-i',
        name: 'Minor ii–V–i with Dominant 7♯9',
        label: 'iiø7 – V7♯9 – i7',
        description: 'The classic minor-key ii–V–i — the altered dominant\'s tension tones resolve smoothly down into the minor 7th tonic.',
        degrees: [
          { roman: 'iiø7', name: 'Supertonic half-diminished 7th', semitoneFromKey: 2, quality: 'halfDiminished7' },
          { roman: 'V7♯9', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant7SharpNine' },
          { roman: 'i7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'minor7' },
        ],
      },
      {
        id: 'dominant-seventh-sharp-nine-turnaround',
        name: 'Turnaround with Dominant 7♯9',
        label: 'iii7 – vi7 – ii7 – V7♯9',
        description: 'A falling turnaround whose closing dominant is altered into a V7♯9 for extra pull into the next chorus.',
        degrees: [
          { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
          { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7♯9', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant7SharpNine' },
        ],
      },
      {
        id: 'dominant-seventh-sharp-nine-blues',
        name: 'Jazz Blues Turnaround with Dominant 7♯9',
        label: 'I7♯9 – IV7 – ii7 – V7♯9',
        description: 'A funky, gospel-blues turnaround that opens right on I7♯9 -- the famous \'Hendrix chord\' -- used here as a tonic vamp color, not just a passing dominant.',
        degrees: [
          { roman: 'I7♯9', name: 'Tonic', semitoneFromKey: 0, quality: 'dominant7SharpNine' },
          { roman: 'IV7', name: 'Subdominant 7th', semitoneFromKey: 5, quality: 'dominant7' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7♯9', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant7SharpNine' },
        ],
      },
      {
        id: 'dominant-seventh-sharp-nine-secondary-dominant',
        name: 'Secondary Dominant with Dominant 7♯9',
        label: 'vi7 – II7♯9 – ii7 – V7♯9',
        description: 'The secondary dominant of ii is altered into a II7♯9 too, doubling the tension before the primary dominant resolves home.',
        degrees: [
          { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
          { roman: 'II7♯9', name: 'Secondary dominant of ii', semitoneFromKey: 2, quality: 'dominant7SharpNine' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7♯9', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant7SharpNine' },
        ],
      },
    ],
    // Five gospel chord progressions built around the Dominant 7♯9 chord.
  [
      {
        id: 'dominant-seventh-sharp-nine-gospel-turnaround',
        name: 'Gospel Turnaround with Dominant 7♯9',
        label: 'I – IV – V7♯9 – I',
        description: 'A gospel turnaround whose dominant is altered into a V7♯9 for a sharper pull home.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'IV', name: 'Subdominant', semitoneFromKey: 5, quality: 'major' },
          { roman: 'V7♯9', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant7SharpNine' },
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        ],
      },
      {
        id: 'dominant-seventh-sharp-nine-vamp-release',
        name: 'Vamp with Dominant 7♯9 Release',
        label: 'I – ii7 – V7♯9 – V7 – I',
        description: 'A gospel vamp move: the dominant arrives altered as a V7♯9, then \'releases\' into a plain V7 right before the tonic returns.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7♯9', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant7SharpNine' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        ],
      },
      {
        id: 'dominant-seventh-sharp-nine-secondary',
        name: 'Secondary Dominant 7♯9 Turnaround',
        label: 'I – III7♯9 – vi – V7',
        description: 'A secondary dominant on the mediant, altered into a III7♯9 for extra richness, resolving into vi before the closing V7.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'III7♯9', name: 'Mediant', semitoneFromKey: 4, quality: 'dominant7SharpNine' },
          { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
      {
        id: 'dominant-seventh-sharp-nine-extended-turnaround',
        name: 'Extended Gospel Turnaround with Dominant 7♯9 Color',
        label: 'iii7 – vi7 – ii7 – V7♯9 – Imaj7',
        description: 'A five-chord walk-back turnaround whose penultimate dominant is altered into a V7♯9 before landing on a lush tonic major 7th.',
        degrees: [
          { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
          { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7♯9', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant7SharpNine' },
          { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
        ],
      },
      {
        id: 'dominant-seventh-sharp-nine-minor-gospel-cadence',
        name: 'Minor Gospel Cadence with Dominant 7♯9 V',
        label: 'i – iv – V7♯9 – i',
        description: 'A minor-key gospel cadence whose dominant is altered into a V7♯9 before pulling back home to the minor tonic.',
        degrees: [
          { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
          { roman: 'iv', name: 'Subdominant', semitoneFromKey: 5, quality: 'minor' },
          { roman: 'V7♯9', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant7SharpNine' },
          { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
        ],
      },
    ],
);
