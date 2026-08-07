// dominant-ninth-progressions.js
// The jazz and gospel progression sets for the dominantNinth chord lesson.
// Data only — the builder that turns these into playable chords lives in
// js/inversion-service.js, which must be loaded first.

InversionService.registerProgressions(
  'dominantNinth',
    // Five jazz chord progressions built around the Dominant 9th chord.
  [
      {
        id: 'dominant-ninth-ii-V-I',
        name: 'ii–V–I with Dominant 9th',
        label: 'ii7 – V9 – Imaj7',
        description: 'The familiar ii–V–I resolves through a V9 instead of a plain V7, adding extra color on the way to the tonic.',
        degrees: [
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V9', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant9' },
          { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
        ],
      },
      {
        id: 'dominant-ninth-iv-color',
        name: 'IV9 Color Change',
        label: 'Imaj7 – IV9 – iii7 – vi7',
        description: 'A Dominant 9th chord colors the subdominant before the harmony falls back through iii7 to vi7.',
        degrees: [
          { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
          { roman: 'IV9', name: 'Subdominant', semitoneFromKey: 5, quality: 'dominant9' },
          { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
          { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
        ],
      },
      {
        id: 'dominant-ninth-turnaround',
        name: 'Turnaround with Dominant 9th',
        label: 'iii7 – vi7 – ii7 – V9',
        description: 'A falling turnaround whose closing dominant blooms into a V9 instead of a plain V7.',
        degrees: [
          { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
          { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V9', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant9' },
        ],
      },
      {
        id: 'dominant-ninth-minor-key',
        name: 'Minor ii–V–i with Dominant 9th',
        label: 'iiø7 – V9 – i7',
        description: 'The minor-key ii–V–i, with the dominant voiced as a V9 before resolving to the minor 7th tonic.',
        degrees: [
          { roman: 'iiø7', name: 'Supertonic half-diminished 7th', semitoneFromKey: 2, quality: 'halfDiminished7' },
          { roman: 'V9', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant9' },
          { roman: 'i7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'minor7' },
        ],
      },
      {
        id: 'dominant-ninth-blues',
        name: 'Jazz Blues Turnaround with Dominant 9th',
        label: 'I9 – IV9 – ii7 – V9',
        description: 'A jazz-blues turnaround voicing the tonic, subdominant, and dominant all as Dominant 9th chords.',
        degrees: [
          { roman: 'I9', name: 'Tonic', semitoneFromKey: 0, quality: 'dominant9' },
          { roman: 'IV9', name: 'Subdominant', semitoneFromKey: 5, quality: 'dominant9' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V9', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant9' },
        ],
      },
    ],
    // Five gospel chord progressions built around the Dominant 9th chord.
  [
      {
        id: 'dominant-ninth-gospel-turnaround',
        name: 'Gospel Turnaround with Dominant 9th V',
        label: 'I – vi – IV – V9',
        description: 'The classic gospel turnaround, closing on a rich V9 instead of a plain dominant 7th.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
          { roman: 'IV', name: 'Subdominant', semitoneFromKey: 5, quality: 'major' },
          { roman: 'V9', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant9' },
        ],
      },
      {
        id: 'dominant-ninth-vamp-release',
        name: 'Vamp with Dominant 9th–V7 Release',
        label: 'I – IV – V9 – V7 – I',
        description: 'A gospel vamp move: the dominant arrives first colored as a V9, then \'releases\' into a plain V7 right before the tonic returns.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'IV', name: 'Subdominant', semitoneFromKey: 5, quality: 'major' },
          { roman: 'V9', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant9' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        ],
      },
      {
        id: 'dominant-ninth-secondary',
        name: 'Secondary Dominant 9th Turnaround',
        label: 'I – III9 – vi – V7',
        description: 'A secondary dominant on the mediant, colored as a III9 for extra richness, resolving into vi before the closing V7.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'III9', name: 'Mediant', semitoneFromKey: 4, quality: 'dominant9' },
          { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
      {
        id: 'dominant-ninth-extended-turnaround',
        name: 'Extended Gospel Turnaround with Dominant 9th Color',
        label: 'iii7 – vi7 – ii7 – V9 – Imaj7',
        description: 'A five-chord walk-back turnaround whose penultimate dominant blooms into a V9 before landing on a lush tonic major 7th.',
        degrees: [
          { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
          { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V9', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant9' },
          { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
        ],
      },
      {
        id: 'dominant-ninth-minor-gospel-cadence',
        name: 'Minor Gospel Cadence with Dominant 9th V',
        label: 'i – iv – V9 – i',
        description: 'A minor-key gospel cadence whose dominant is colored as a V9 before pulling back home to the minor tonic.',
        degrees: [
          { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
          { roman: 'iv', name: 'Subdominant', semitoneFromKey: 5, quality: 'minor' },
          { roman: 'V9', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant9' },
          { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
        ],
      },
    ],
);
