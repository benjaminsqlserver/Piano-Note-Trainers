// dominant-seventh-flat-five-progressions.js
// The jazz and gospel progression sets for the dominantSeventhFlatFive chord lesson.
// Data only — the builder that turns these into playable chords lives in
// js/inversion-service.js, which must be loaded first.

InversionService.registerProgressions(
  'dominantSeventhFlatFive',
    // Five jazz chord progressions built around the Dominant 7♭5 chord.
  [
      {
        id: 'dominant-seventh-flat-five-ii-V-I',
        name: 'ii–V–I with Dominant 7♭5',
        label: 'ii7 – V7♭5 – Imaj7',
        description: 'The familiar ii–V–I, with the dominant altered into a V7♭5 for extra tension before resolving to the tonic.',
        degrees: [
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7♭5', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant7FlatFive' },
          { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
        ],
      },
      {
        id: 'dominant-seventh-flat-five-minor-ii-V-i',
        name: 'Minor ii–V–i with Dominant 7♭5',
        label: 'iiø7 – V7♭5 – i7',
        description: 'The classic minor-key ii–V–i — the altered dominant\'s tension tones resolve smoothly down into the minor 7th tonic.',
        degrees: [
          { roman: 'iiø7', name: 'Supertonic half-diminished 7th', semitoneFromKey: 2, quality: 'halfDiminished7' },
          { roman: 'V7♭5', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant7FlatFive' },
          { roman: 'i7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'minor7' },
        ],
      },
      {
        id: 'dominant-seventh-flat-five-turnaround',
        name: 'Turnaround with Dominant 7♭5',
        label: 'iii7 – vi7 – ii7 – V7♭5',
        description: 'A falling turnaround whose closing dominant is altered into a ♭5 — a color that, thanks to the tritone symmetry a ♭5 alteration creates, sounds just as at home resolving down a half step as it does resolving straight home.',
        degrees: [
          { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
          { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7♭5', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant7FlatFive' },
        ],
      },
      {
        id: 'dominant-seventh-flat-five-blues',
        name: 'Jazz Blues Turnaround with Dominant 7♭5',
        label: 'I7 – IV7 – ii7 – V7♭5',
        description: 'A jazz-blues turnaround whose closing dominant is altered into a V7♭5, sharpening the pull back to the top of the tune.',
        degrees: [
          { roman: 'I7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'dominant7' },
          { roman: 'IV7', name: 'Subdominant 7th', semitoneFromKey: 5, quality: 'dominant7' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7♭5', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant7FlatFive' },
        ],
      },
      {
        id: 'dominant-seventh-flat-five-secondary-dominant',
        name: 'Secondary Dominant with Dominant 7♭5',
        label: 'vi7 – II7♭5 – ii7 – V7♭5',
        description: 'The secondary dominant of ii is altered into a II7♭5 too, doubling the tension before the primary dominant resolves home.',
        degrees: [
          { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
          { roman: 'II7♭5', name: 'Secondary dominant of ii', semitoneFromKey: 2, quality: 'dominant7FlatFive' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7♭5', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant7FlatFive' },
        ],
      },
    ],
    // Five gospel chord progressions built around the Dominant 7♭5 chord.
  [
      {
        id: 'dominant-seventh-flat-five-gospel-turnaround',
        name: 'Gospel Turnaround with Dominant 7♭5',
        label: 'I – IV – V7♭5 – I',
        description: 'A gospel turnaround whose dominant is altered into a V7♭5 for a sharper pull home.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'IV', name: 'Subdominant', semitoneFromKey: 5, quality: 'major' },
          { roman: 'V7♭5', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant7FlatFive' },
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        ],
      },
      {
        id: 'dominant-seventh-flat-five-vamp-release',
        name: 'Vamp with Dominant 7♭5 Release',
        label: 'I – ii7 – V7♭5 – V7 – I',
        description: 'A gospel vamp move: the dominant arrives altered as a V7♭5, then \'releases\' into a plain V7 right before the tonic returns.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7♭5', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant7FlatFive' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        ],
      },
      {
        id: 'dominant-seventh-flat-five-secondary',
        name: 'Secondary Dominant 7♭5 Turnaround',
        label: 'I – III7♭5 – vi – V7',
        description: 'A secondary dominant on the mediant, altered into a III7♭5 for extra richness, resolving into vi before the closing V7.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'III7♭5', name: 'Mediant', semitoneFromKey: 4, quality: 'dominant7FlatFive' },
          { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
      {
        id: 'dominant-seventh-flat-five-extended-turnaround',
        name: 'Extended Gospel Turnaround with Dominant 7♭5 Color',
        label: 'iii7 – vi7 – ii7 – V7♭5 – Imaj7',
        description: 'A five-chord walk-back turnaround whose penultimate dominant is altered into a V7♭5 before landing on a lush tonic major 7th.',
        degrees: [
          { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
          { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7♭5', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant7FlatFive' },
          { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
        ],
      },
      {
        id: 'dominant-seventh-flat-five-minor-gospel-cadence',
        name: 'Minor Gospel Cadence with Dominant 7♭5 V',
        label: 'i – iv – V7♭5 – i',
        description: 'A minor-key gospel cadence whose dominant is altered into a V7♭5 before pulling back home to the minor tonic.',
        degrees: [
          { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
          { roman: 'iv', name: 'Subdominant', semitoneFromKey: 5, quality: 'minor' },
          { roman: 'V7♭5', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant7FlatFive' },
          { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
        ],
      },
    ],
);
