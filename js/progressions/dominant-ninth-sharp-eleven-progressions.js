// dominant-ninth-sharp-eleven-progressions.js
// The jazz and gospel progression sets for the dominantNinthSharpEleven chord lesson.
// Data only — the builder that turns these into playable chords lives in
// js/inversion-service.js, which must be loaded first.

InversionService.registerProgressions(
  'dominantNinthSharpEleven',
    // Five jazz chord progressions built around the Dominant 9♯11 chord.
  [
      {
        id: 'dominant-ninth-sharp-eleven-ii-V-I',
        name: 'ii–V–I with Dominant 9♯11',
        label: 'ii7 – V9♯11 – Imaj7',
        description: 'The familiar ii–V–I, with the dominant altered into a V9♯11 for extra tension before resolving to the tonic.',
        degrees: [
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V9♯11', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant9SharpEleven' },
          { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
        ],
      },
      {
        id: 'dominant-ninth-sharp-eleven-minor-ii-V-i',
        name: 'Minor ii–V–i with Dominant 9♯11',
        label: 'iiø7 – V9♯11 – i7',
        description: 'The classic minor-key ii–V–i — the altered dominant\'s tension tones resolve smoothly down into the minor 7th tonic.',
        degrees: [
          { roman: 'iiø7', name: 'Supertonic half-diminished 7th', semitoneFromKey: 2, quality: 'halfDiminished7' },
          { roman: 'V9♯11', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant9SharpEleven' },
          { roman: 'i7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'minor7' },
        ],
      },
      {
        id: 'dominant-ninth-sharp-eleven-iv-color',
        name: 'IV9♯11 Color Change',
        label: 'Imaj7 – IV9♯11 – iii7 – vi7',
        description: 'A Dominant 9♯11 chord is a favorite static-vamp color on the subdominant, before the harmony falls back through iii7 to vi7.',
        degrees: [
          { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
          { roman: 'IV9♯11', name: 'Subdominant', semitoneFromKey: 5, quality: 'dominant9SharpEleven' },
          { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
          { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
        ],
      },
      {
        id: 'dominant-ninth-sharp-eleven-blues',
        name: 'Jazz Blues Turnaround with Dominant 9♯11',
        label: 'I7 – IV7 – ii7 – V9♯11',
        description: 'A jazz-blues turnaround whose closing dominant is altered into a V9♯11, sharpening the pull back to the top of the tune.',
        degrees: [
          { roman: 'I7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'dominant7' },
          { roman: 'IV7', name: 'Subdominant 7th', semitoneFromKey: 5, quality: 'dominant7' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V9♯11', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant9SharpEleven' },
        ],
      },
      {
        id: 'dominant-ninth-sharp-eleven-secondary-dominant',
        name: 'Secondary Dominant with Dominant 9♯11',
        label: 'vi7 – II9♯11 – ii7 – V9♯11',
        description: 'The secondary dominant of ii is altered into a II9♯11 too, doubling the tension before the primary dominant resolves home.',
        degrees: [
          { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
          { roman: 'II9♯11', name: 'Secondary dominant of ii', semitoneFromKey: 2, quality: 'dominant9SharpEleven' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V9♯11', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant9SharpEleven' },
        ],
      },
    ],
    // Five gospel chord progressions built around the Dominant 9♯11 chord.
  [
      {
        id: 'dominant-ninth-sharp-eleven-gospel-turnaround',
        name: 'Gospel Vamp with Dominant 9♯11 IV',
        label: 'I – IV9♯11 – I – V7 – I',
        description: 'A modern-gospel vamp move that sits on a static IV9♯11 — exactly the kind of Lydian-dominant color that makes this chord such a favorite subdominant sound.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'IV9♯11', name: 'Subdominant', semitoneFromKey: 5, quality: 'dominant9SharpEleven' },
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        ],
      },
      {
        id: 'dominant-ninth-sharp-eleven-vamp-release',
        name: 'Vamp with Dominant 9♯11 Release',
        label: 'I – ii7 – V9♯11 – V7 – I',
        description: 'A gospel vamp move: the dominant arrives altered as a V9♯11, then \'releases\' into a plain V7 right before the tonic returns.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V9♯11', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant9SharpEleven' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        ],
      },
      {
        id: 'dominant-ninth-sharp-eleven-secondary',
        name: 'Secondary Dominant 9♯11 Turnaround',
        label: 'I – III9♯11 – vi – V7',
        description: 'A secondary dominant on the mediant, altered into a III9♯11 for extra richness, resolving into vi before the closing V7.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'III9♯11', name: 'Mediant', semitoneFromKey: 4, quality: 'dominant9SharpEleven' },
          { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
      {
        id: 'dominant-ninth-sharp-eleven-extended-turnaround',
        name: 'Extended Gospel Turnaround with Dominant 9♯11 Color',
        label: 'iii7 – vi7 – ii7 – V9♯11 – Imaj7',
        description: 'A five-chord walk-back turnaround whose penultimate dominant is altered into a V9♯11 before landing on a lush tonic major 7th.',
        degrees: [
          { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
          { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V9♯11', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant9SharpEleven' },
          { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
        ],
      },
      {
        id: 'dominant-ninth-sharp-eleven-minor-gospel-cadence',
        name: 'Minor Gospel Cadence with Dominant 9♯11 V',
        label: 'i – iv – V9♯11 – i',
        description: 'A minor-key gospel cadence whose dominant is altered into a V9♯11 before pulling back home to the minor tonic.',
        degrees: [
          { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
          { roman: 'iv', name: 'Subdominant', semitoneFromKey: 5, quality: 'minor' },
          { roman: 'V9♯11', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant9SharpEleven' },
          { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
        ],
      },
    ],
);
