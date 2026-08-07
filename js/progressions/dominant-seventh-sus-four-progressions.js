// dominant-seventh-sus-four-progressions.js
// The jazz and gospel progression sets for the dominantSeventhSusFour chord lesson.
// Data only — the builder that turns these into playable chords lives in
// js/inversion-service.js, which must be loaded first.

InversionService.registerProgressions(
  'dominantSeventhSusFour',
    // Five jazz chord progressions built around the dominant 7sus4 chord.
  [
      {
        id: '7sus4-ii-V-I',
        name: 'ii–V–I with 7sus4 Dominant',
        label: 'ii7 – V7sus4 – Imaj7',
        description: 'The familiar ii–V–I, but the dominant lingers as a V7sus4 before resolving to the tonic — a softer, less pointed pull than a plain V7.',
        degrees: [
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7sus4', name: 'Suspended dominant 7th', semitoneFromKey: 7, quality: 'dominantSeventhSusFour' },
          { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
        ],
      },
      {
        id: '7sus4-iv-color',
        name: 'IV7sus4 Color Change',
        label: 'Imaj7 – IV7sus4 – iii7 – vi7',
        description: 'A suspended dominant-quality chord colors the subdominant before the harmony falls back through iii7 to vi7.',
        degrees: [
          { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
          { roman: 'IV7sus4', name: 'Subdominant 7sus4', semitoneFromKey: 5, quality: 'dominantSeventhSusFour' },
          { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
          { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
        ],
      },
      {
        id: '7sus4-turnaround',
        name: 'Turnaround with 7sus4 Dominant',
        label: 'iii7 – vi7 – ii7 – V7sus4',
        description: 'A falling turnaround whose final dominant lingers as a 7sus4 instead of resolving straight to a plain V7, delaying the release by a beat.',
        degrees: [
          { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
          { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7sus4', name: 'Suspended dominant 7th', semitoneFromKey: 7, quality: 'dominantSeventhSusFour' },
        ],
      },
      {
        id: '7sus4-minor-key',
        name: 'Minor ii–V–i with 7sus4',
        label: 'iiø7 – V7sus4 – i7',
        description: 'The minor-key ii–V–i, softened by suspending the dominant into a 7sus4 before it resolves to the minor 7th tonic.',
        degrees: [
          { roman: 'iiø7', name: 'Supertonic half-diminished 7th', semitoneFromKey: 2, quality: 'halfDiminished7' },
          { roman: 'V7sus4', name: 'Suspended dominant 7th', semitoneFromKey: 7, quality: 'dominantSeventhSusFour' },
          { roman: 'i7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'minor7' },
        ],
      },
      {
        id: '7sus4-blues',
        name: 'Jazz Blues Turnaround with 7sus4 Tag',
        label: 'I7 – IV7 – ii7 – V7sus4',
        description: 'A jazz-blues turnaround whose closing tag suspends the dominant into a 7sus4, holding the tension one beat longer before the top of the tune.',
        degrees: [
          { roman: 'I7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'dominant7' },
          { roman: 'IV7', name: 'Subdominant 7th', semitoneFromKey: 5, quality: 'dominant7' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7sus4', name: 'Suspended dominant 7th', semitoneFromKey: 7, quality: 'dominantSeventhSusFour' },
        ],
      },
    ],
    // Five gospel chord progressions built around the dominant 7sus4 chord.
  [
      {
        id: '7sus4-gospel-turnaround',
        name: 'Gospel Turnaround with 7sus4 V',
        label: 'I – vi – IV – V7sus4',
        description: 'The classic gospel turnaround, closing on a suspended V7sus4 that lingers before finally resolving down to the tonic.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
          { roman: 'IV', name: 'Subdominant', semitoneFromKey: 5, quality: 'major' },
          { roman: 'V7sus4', name: 'Suspended dominant 7th', semitoneFromKey: 7, quality: 'dominantSeventhSusFour' },
        ],
      },
      {
        id: '7sus4-amen-passing',
        name: 'Vamp with 7sus4–V7 Release',
        label: 'I – IV – V7sus4 – V7 – I',
        description: 'A gospel vamp move: the dominant arrives first as a suspended 7sus4, then "releases" down into a plain V7 right before the tonic returns — a classic build-and-release gesture.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'IV', name: 'Subdominant', semitoneFromKey: 5, quality: 'major' },
          { roman: 'V7sus4', name: 'Suspended dominant 7th', semitoneFromKey: 7, quality: 'dominantSeventhSusFour' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        ],
      },
      {
        id: '7sus4-secondary',
        name: 'Secondary 7sus4 Turnaround',
        label: 'I – III7sus4 – vi – V7',
        description: 'A secondary dominant built on the mediant, suspended into a 7sus4 for extra lift, resolving into vi before the closing V7.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'III7sus4', name: 'Mediant 7sus4', semitoneFromKey: 4, quality: 'dominantSeventhSusFour' },
          { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
      {
        id: '7sus4-extended-turnaround',
        name: 'Extended Gospel Turnaround with 7sus4 Color',
        label: 'iii7 – vi7 – ii7 – V7sus4 – Imaj7',
        description: 'A five-chord walk-back turnaround whose penultimate dominant lingers as a 7sus4 before landing on a lush tonic major 7th.',
        degrees: [
          { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
          { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7sus4', name: 'Suspended dominant 7th', semitoneFromKey: 7, quality: 'dominantSeventhSusFour' },
          { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
        ],
      },
      {
        id: '7sus4-minor-gospel-cadence',
        name: 'Minor Gospel Cadence with 7sus4 V',
        label: 'i – iv – V7sus4 – i',
        description: 'A minor-key gospel cadence whose dominant lingers as a suspended 7sus4 before finally pulling back home to the minor tonic.',
        degrees: [
          { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
          { roman: 'iv', name: 'Subdominant', semitoneFromKey: 5, quality: 'minor' },
          { roman: 'V7sus4', name: 'Suspended dominant 7th', semitoneFromKey: 7, quality: 'dominantSeventhSusFour' },
          { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
        ],
      },
    ],
);
