// sus-two-progressions.js
// The jazz and gospel progression sets for the susTwo chord lesson.
// Data only — the builder that turns these into playable chords lives in
// js/inversion-service.js, which must be loaded first.

InversionService.registerProgressions(
  'susTwo',
    // Five jazz chord progressions built around the sus2 chord.
  [
      {
        id: 'sus2-ii-V-I',
        name: 'ii–V–I with Sus2 Tonic',
        label: 'ii7 – V7 – Isus2',
        description: 'The familiar ii–V–I resolves onto Isus2 instead of a closed major 7th — an open, ambiguous landing with no 3rd to color it major or minor.',
        degrees: [
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
          { roman: 'Isus2', name: 'Tonic sus2', semitoneFromKey: 0, quality: 'susTwo' },
        ],
      },
      {
        id: 'sus2-iv-color',
        name: 'IVsus2 Color Change',
        label: 'Imaj7 – IVsus2 – iii7 – vi7',
        description: 'A wide, airy sus2 stands in for the subdominant before the harmony falls back through iii7 to vi7.',
        degrees: [
          { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
          { roman: 'IVsus2', name: 'Subdominant sus2', semitoneFromKey: 5, quality: 'susTwo' },
          { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
          { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
        ],
      },
      {
        id: 'sus2-turnaround',
        name: 'Turnaround with Sus2 Submediant',
        label: 'iii7 – VIsus2 – ii7 – V7',
        description: 'A falling turnaround where the vi chord opens up into a sus2 instead of its usual minor 7th color.',
        degrees: [
          { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
          { roman: 'VIsus2', name: 'Submediant sus2', semitoneFromKey: 9, quality: 'susTwo' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
      {
        id: 'sus2-minor-key',
        name: 'Minor-Key Cadence with Sus2 IV',
        label: 'i7 – IVsus2 – V7 – i7',
        description: 'A minor-key cadence borrowing the parallel major’s IV, opened into a sus2 for an ambiguous lift before the dominant resolves home.',
        degrees: [
          { roman: 'i7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'minor7' },
          { roman: 'IVsus2', name: 'Borrowed subdominant sus2', semitoneFromKey: 5, quality: 'susTwo' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
          { roman: 'i7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'minor7' },
        ],
      },
      {
        id: 'sus2-blues',
        name: 'Jazz Blues Turnaround with Sus2 Tonic',
        label: 'Isus2 – IV7 – ii7 – V7',
        description: 'A jazz-blues turnaround that opens on Isus2 instead of a plain major or dominant tonic, establishing an open color right away.',
        degrees: [
          { roman: 'Isus2', name: 'Tonic sus2', semitoneFromKey: 0, quality: 'susTwo' },
          { roman: 'IV7', name: 'Subdominant 7th', semitoneFromKey: 5, quality: 'dominant7' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
    ],
    // Five gospel chord progressions built around the sus2 chord.
  [
      {
        id: 'sus2-gospel-turnaround',
        name: 'Gospel Turnaround with Sus2 IV',
        label: 'I – vi – IVsus2 – V7',
        description: 'The classic gospel turnaround, swapping the usual IV triad for an IVsus2 color chord just before the closing V7.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
          { roman: 'IVsus2', name: 'Subdominant sus2', semitoneFromKey: 5, quality: 'susTwo' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
      {
        id: 'sus2-amen-passing',
        name: 'Amen Vamp with Sus2 Passing Chord',
        label: 'I – IVsus2 – IV – iv – I',
        description: 'The classic plagal "Amen" vamp, decorated with IVsus2 as an open passing color chord right before the plain subdominant arrives.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'IVsus2', name: 'Subdominant passing sus2', semitoneFromKey: 5, quality: 'susTwo' },
          { roman: 'IV', name: 'Subdominant', semitoneFromKey: 5, quality: 'major' },
          { roman: 'iv', name: 'Borrowed minor subdominant', semitoneFromKey: 5, quality: 'minor' },
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        ],
      },
      {
        id: 'sus2-secondary',
        name: 'Secondary Sus2 Turnaround',
        label: 'I – IIIsus2 – vi – V7',
        description: 'A secondary chord built on the mediant, opened into a sus2 instead of the usual minor triad, on the way to vi.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'IIIsus2', name: 'Mediant sus2', semitoneFromKey: 4, quality: 'susTwo' },
          { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
      {
        id: 'sus2-extended-turnaround',
        name: 'Extended Gospel Turnaround with Sus2 Color',
        label: 'iii7 – vi7 – ii7 – ♭VIsus2 – Isus2',
        description: 'A five-chord walk-back turnaround that closes with a chromatic ♭VIsus2 passing chord before landing on an open tonic sus2.',
        degrees: [
          { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
          { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: '♭VIsus2', name: 'Chromatic passing sus2', semitoneFromKey: 8, quality: 'susTwo' },
          { roman: 'Isus2', name: 'Tonic sus2', semitoneFromKey: 0, quality: 'susTwo' },
        ],
      },
      {
        id: 'sus2-minor-gospel-cadence',
        name: 'Minor Gospel Cadence with Sus2 IV',
        label: 'i – IVsus2 – V7 – i',
        description: 'A minor-key gospel cadence where the subdominant borrows the parallel major’s IV and opens into a sus2 before the dominant pulls home.',
        degrees: [
          { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
          { roman: 'IVsus2', name: 'Borrowed subdominant sus2', semitoneFromKey: 5, quality: 'susTwo' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
          { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
        ],
      },
    ],
);
