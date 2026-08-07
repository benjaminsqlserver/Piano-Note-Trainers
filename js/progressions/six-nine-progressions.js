// six-nine-progressions.js
// The jazz and gospel progression sets for the sixNine chord lesson.
// Data only — the builder that turns these into playable chords lives in
// js/inversion-service.js, which must be loaded first.

InversionService.registerProgressions(
  'sixNine',
    // Five jazz chord progressions built around the 6/9 chord.
  [
      {
        id: 'six-nine-ii-V-I',
        name: 'ii–V–I with 6/9 Tonic',
        label: 'ii7 – V7 – I6/9',
        description: 'The familiar ii–V–I resolves onto I6/9 instead of a plain major 7th — a rich, full "at rest" color with no 7th at all to pull anywhere.',
        degrees: [
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
          { roman: 'I6/9', name: 'Tonic 6/9', semitoneFromKey: 0, quality: 'sixNine' },
        ],
      },
      {
        id: 'six-nine-iv-color',
        name: 'IV6/9 Color Change',
        label: 'Imaj7 – IV6/9 – iii7 – vi7',
        description: 'A lush 6/9 stands in for the subdominant, adding both a 6th and a 9th before the harmony falls back through iii7 to vi7.',
        degrees: [
          { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
          { roman: 'IV6/9', name: 'Subdominant 6/9', semitoneFromKey: 5, quality: 'sixNine' },
          { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
          { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
        ],
      },
      {
        id: 'six-nine-turnaround',
        name: 'Turnaround with 6/9 Submediant',
        label: 'iii7 – VI6/9 – ii7 – V7',
        description: 'A falling turnaround where the vi chord blooms into a full 6/9 instead of its usual minor 7th color.',
        degrees: [
          { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
          { roman: 'VI6/9', name: 'Submediant 6/9', semitoneFromKey: 9, quality: 'sixNine' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
      {
        id: 'six-nine-minor-key',
        name: 'Minor-Key Cadence with 6/9 IV',
        label: 'i7 – IV6/9 – V7 – i7',
        description: 'A minor-key cadence borrowing the parallel major’s IV, colored as a full 6/9 for extra richness before the dominant resolves home.',
        degrees: [
          { roman: 'i7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'minor7' },
          { roman: 'IV6/9', name: 'Borrowed subdominant 6/9', semitoneFromKey: 5, quality: 'sixNine' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
          { roman: 'i7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'minor7' },
        ],
      },
      {
        id: 'six-nine-blues',
        name: 'Jazz Blues Turnaround with 6/9 Tonic',
        label: 'I6/9 – IV7 – ii7 – V7',
        description: 'A jazz-blues turnaround that opens on I6/9 instead of a plain major or dominant tonic, establishing a rich, settled color right away.',
        degrees: [
          { roman: 'I6/9', name: 'Tonic 6/9', semitoneFromKey: 0, quality: 'sixNine' },
          { roman: 'IV7', name: 'Subdominant 7th', semitoneFromKey: 5, quality: 'dominant7' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
    ],
    // Five gospel chord progressions built around the 6/9 chord.
  [
      {
        id: 'six-nine-gospel-turnaround',
        name: 'Gospel Turnaround with 6/9 IV',
        label: 'I – vi – IV6/9 – V7',
        description: 'The classic gospel turnaround, swapping the usual IV triad for a lush IV6/9 color chord just before the closing V7.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
          { roman: 'IV6/9', name: 'Subdominant 6/9', semitoneFromKey: 5, quality: 'sixNine' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
      {
        id: 'six-nine-amen-passing',
        name: 'Amen Vamp with 6/9 Landing',
        label: 'I – IV – iv – I6/9',
        description: 'The classic plagal "Amen" vamp, but the final tonic blooms into a full I6/9 instead of a plain triad — a warm, richly colored landing.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'IV', name: 'Subdominant', semitoneFromKey: 5, quality: 'major' },
          { roman: 'iv', name: 'Borrowed minor subdominant', semitoneFromKey: 5, quality: 'minor' },
          { roman: 'I6/9', name: 'Tonic 6/9', semitoneFromKey: 0, quality: 'sixNine' },
        ],
      },
      {
        id: 'six-nine-secondary',
        name: 'Secondary 6/9 Turnaround',
        label: 'I – III6/9 – vi – V7',
        description: 'A secondary chord built on the mediant, colored as a 6/9 instead of the usual minor triad, resolving into vi before the closing V7.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'III6/9', name: 'Mediant 6/9', semitoneFromKey: 4, quality: 'sixNine' },
          { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
      {
        id: 'six-nine-extended-turnaround',
        name: 'Extended Gospel Turnaround with 6/9 Color',
        label: 'iii7 – vi7 – ii7 – ♭VI6/9 – I6/9',
        description: 'A five-chord walk-back turnaround that closes with a chromatic ♭VI6/9 passing chord just before landing on a full, rich tonic 6/9.',
        degrees: [
          { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
          { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: '♭VI6/9', name: 'Chromatic passing 6/9', semitoneFromKey: 8, quality: 'sixNine' },
          { roman: 'I6/9', name: 'Tonic 6/9', semitoneFromKey: 0, quality: 'sixNine' },
        ],
      },
      {
        id: 'six-nine-minor-gospel-cadence',
        name: 'Minor Gospel Cadence with 6/9 IV',
        label: 'i – IV6/9 – V7 – i',
        description: 'A minor-key gospel cadence where the subdominant borrows the parallel major’s IV and blooms into a 6/9, giving a rich lift before the dominant pulls home.',
        degrees: [
          { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
          { roman: 'IV6/9', name: 'Borrowed subdominant 6/9', semitoneFromKey: 5, quality: 'sixNine' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
          { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
        ],
      },
    ],
);
