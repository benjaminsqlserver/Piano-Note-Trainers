// sus-four-progressions.js
// The jazz and gospel progression sets for the susFour chord lesson.
// Data only — the builder that turns these into playable chords lives in
// js/inversion-service.js, which must be loaded first.

InversionService.registerProgressions(
  'susFour',
    // Five jazz chord progressions built around the sus4 chord.
  [
      {
        id: 'sus4-ii-V-I',
        name: 'ii–V–I with Sus4 Tonic',
        label: 'ii7 – V7 – Isus4',
        description: 'The familiar ii–V–I resolves onto Isus4 — a taut, leaning landing that wants to settle down a step into a plain triad.',
        degrees: [
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
          { roman: 'Isus4', name: 'Tonic sus4', semitoneFromKey: 0, quality: 'susFour' },
        ],
      },
      {
        id: 'sus4-iv-color',
        name: 'IVsus4 Color Change',
        label: 'Imaj7 – IVsus4 – iii7 – vi7',
        description: 'A taut sus4 stands in for the subdominant, leaning forward before the harmony falls back through iii7 to vi7.',
        degrees: [
          { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
          { roman: 'IVsus4', name: 'Subdominant sus4', semitoneFromKey: 5, quality: 'susFour' },
          { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
          { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
        ],
      },
      {
        id: 'sus4-turnaround',
        name: 'Turnaround with Sus4 Submediant',
        label: 'iii7 – VIsus4 – ii7 – V7',
        description: 'A falling turnaround where the vi chord leans into a sus4 instead of its usual minor 7th color.',
        degrees: [
          { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
          { roman: 'VIsus4', name: 'Submediant sus4', semitoneFromKey: 9, quality: 'susFour' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
      {
        id: 'sus4-minor-key',
        name: 'Minor-Key Cadence with Sus4 IV',
        label: 'i7 – IVsus4 – V7 – i7',
        description: 'A minor-key cadence borrowing the parallel major’s IV, tightened into a sus4 before the dominant resolves home.',
        degrees: [
          { roman: 'i7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'minor7' },
          { roman: 'IVsus4', name: 'Borrowed subdominant sus4', semitoneFromKey: 5, quality: 'susFour' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
          { roman: 'i7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'minor7' },
        ],
      },
      {
        id: 'sus4-blues',
        name: 'Jazz Blues Turnaround with Sus4 Tonic',
        label: 'Isus4 – IV7 – ii7 – V7',
        description: 'A jazz-blues turnaround that opens on Isus4 instead of a plain major or dominant tonic, leaning forward right from the first bar.',
        degrees: [
          { roman: 'Isus4', name: 'Tonic sus4', semitoneFromKey: 0, quality: 'susFour' },
          { roman: 'IV7', name: 'Subdominant 7th', semitoneFromKey: 5, quality: 'dominant7' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
    ],
    // Five gospel chord progressions built around the sus4 chord.
  [
      {
        id: 'sus4-gospel-turnaround',
        name: 'Gospel Turnaround with Sus4 V',
        label: 'I – vi – IV – Vsus4',
        description: 'The classic gospel turnaround, closing on Vsus4 instead of a plain V7 — the suspended 4th resolves down into the 3rd right as the tonic returns.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
          { roman: 'IV', name: 'Subdominant', semitoneFromKey: 5, quality: 'major' },
          { roman: 'Vsus4', name: 'Dominant sus4', semitoneFromKey: 7, quality: 'susFour' },
        ],
      },
      {
        id: 'sus4-amen-passing',
        name: 'Amen Vamp with Sus4 Passing Chord',
        label: 'I – IVsus4 – IV – iv – I',
        description: 'The classic plagal "Amen" vamp, decorated with IVsus4 as a leaning passing chord right before the plain subdominant arrives.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'IVsus4', name: 'Subdominant passing sus4', semitoneFromKey: 5, quality: 'susFour' },
          { roman: 'IV', name: 'Subdominant', semitoneFromKey: 5, quality: 'major' },
          { roman: 'iv', name: 'Borrowed minor subdominant', semitoneFromKey: 5, quality: 'minor' },
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        ],
      },
      {
        id: 'sus4-secondary',
        name: 'Secondary Sus4 Turnaround',
        label: 'I – Vsus4 – vi – V7',
        description: 'A dominant chord suspended into sus4 before resolving down into vi, then the closing V7 pulls the whole progression back home.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'Vsus4', name: 'Dominant passing sus4', semitoneFromKey: 7, quality: 'susFour' },
          { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
      {
        id: 'sus4-extended-turnaround',
        name: 'Extended Gospel Turnaround with Sus4 Color',
        label: 'iii7 – vi7 – ii7 – Vsus4 – I',
        description: 'A five-chord walk-back turnaround that tightens into a Vsus4 just before landing on the tonic, giving the cadence one extra beat of lean.',
        degrees: [
          { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
          { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'Vsus4', name: 'Dominant sus4', semitoneFromKey: 7, quality: 'susFour' },
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        ],
      },
      {
        id: 'sus4-minor-gospel-cadence',
        name: 'Minor Gospel Cadence with Sus4 IV',
        label: 'i – IVsus4 – V7 – i',
        description: 'A minor-key gospel cadence where the subdominant borrows the parallel major’s IV and tightens into a sus4 before the dominant pulls home.',
        degrees: [
          { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
          { roman: 'IVsus4', name: 'Borrowed subdominant sus4', semitoneFromKey: 5, quality: 'susFour' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
          { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
        ],
      },
    ],
);
