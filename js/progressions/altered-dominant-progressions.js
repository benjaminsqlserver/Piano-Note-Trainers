// altered-dominant-progressions.js
// The jazz and gospel progression sets for the alteredDominant chord lesson.
// Data only — the builder that turns these into playable chords lives in
// js/inversion-service.js, which must be loaded first.

InversionService.registerProgressions(
  'alteredDominant',
    // Five jazz chord progressions built around the Altered Dominant chord.
  [
      {
        id: 'altered-dominant-ii-V-I',
        name: 'ii–V–I with Altered Dominant',
        label: 'ii7 – V7alt – Imaj7',
        description: 'The familiar ii–V–I, with the dominant altered into a V7alt for extra tension before resolving to the tonic.',
        degrees: [
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7alt', name: 'Dominant', semitoneFromKey: 7, quality: 'dominantAlt' },
          { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
        ],
      },
      {
        id: 'altered-dominant-minor-ii-V-i',
        name: 'Minor ii–V–i with Altered Dominant',
        label: 'iiø7 – V7alt – i7',
        description: 'The classic minor-key ii–V–i — the altered dominant\'s tension tones resolve smoothly down into the minor 7th tonic.',
        degrees: [
          { roman: 'iiø7', name: 'Supertonic half-diminished 7th', semitoneFromKey: 2, quality: 'halfDiminished7' },
          { roman: 'V7alt', name: 'Dominant', semitoneFromKey: 7, quality: 'dominantAlt' },
          { roman: 'i7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'minor7' },
        ],
      },
      {
        id: 'altered-dominant-turnaround',
        name: 'Turnaround with Altered Dominant',
        label: 'iii7 – vi7 – ii7 – V7alt',
        description: 'A falling turnaround whose closing dominant is altered into a V7alt for extra pull into the next chorus.',
        degrees: [
          { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
          { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7alt', name: 'Dominant', semitoneFromKey: 7, quality: 'dominantAlt' },
        ],
      },
      {
        id: 'altered-dominant-blues',
        name: 'Jazz Blues Turnaround with Altered Dominant',
        label: 'I7 – IV7 – ii7 – V7alt',
        description: 'A jazz-blues turnaround whose closing dominant is altered into a V7alt, sharpening the pull back to the top of the tune.',
        degrees: [
          { roman: 'I7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'dominant7' },
          { roman: 'IV7', name: 'Subdominant 7th', semitoneFromKey: 5, quality: 'dominant7' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7alt', name: 'Dominant', semitoneFromKey: 7, quality: 'dominantAlt' },
        ],
      },
      {
        id: 'altered-dominant-secondary-dominant',
        name: 'Secondary Dominant with Altered Dominant',
        label: 'vi7 – II7alt – ii7 – V7alt',
        description: 'The secondary dominant of ii is altered into a II7alt too, doubling the tension before the primary dominant resolves home.',
        degrees: [
          { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
          { roman: 'II7alt', name: 'Secondary dominant of ii', semitoneFromKey: 2, quality: 'dominantAlt' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7alt', name: 'Dominant', semitoneFromKey: 7, quality: 'dominantAlt' },
        ],
      },
    ],
    // Five gospel chord progressions built around the Altered Dominant chord.
  [
      {
        id: 'altered-dominant-gospel-turnaround',
        name: 'Gospel Turnaround with Altered Dominant',
        label: 'I – IV – V7alt – I',
        description: 'A gospel turnaround whose dominant is altered into a V7alt for a sharper pull home.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'IV', name: 'Subdominant', semitoneFromKey: 5, quality: 'major' },
          { roman: 'V7alt', name: 'Dominant', semitoneFromKey: 7, quality: 'dominantAlt' },
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        ],
      },
      {
        id: 'altered-dominant-vamp-release',
        name: 'Vamp with Altered Dominant Release',
        label: 'I – ii7 – V7alt – V7 – I',
        description: 'A gospel vamp move: the dominant arrives altered as a V7alt, then \'releases\' into a plain V7 right before the tonic returns.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7alt', name: 'Dominant', semitoneFromKey: 7, quality: 'dominantAlt' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        ],
      },
      {
        id: 'altered-dominant-secondary',
        name: 'Secondary Altered Dominant Turnaround',
        label: 'I – III7alt – vi – V7',
        description: 'A secondary dominant on the mediant, altered into a III7alt for extra richness, resolving into vi before the closing V7.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'III7alt', name: 'Mediant', semitoneFromKey: 4, quality: 'dominantAlt' },
          { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
      {
        id: 'altered-dominant-extended-turnaround',
        name: 'Extended Gospel Turnaround with Altered Dominant Color',
        label: 'iii7 – vi7 – ii7 – V7alt – Imaj7',
        description: 'A five-chord walk-back turnaround whose penultimate dominant is altered into a V7alt before landing on a lush tonic major 7th.',
        degrees: [
          { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
          { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7alt', name: 'Dominant', semitoneFromKey: 7, quality: 'dominantAlt' },
          { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
        ],
      },
      {
        id: 'altered-dominant-minor-gospel-cadence',
        name: 'Minor Gospel Cadence with Altered Dominant V',
        label: 'i – iv – V7alt – i',
        description: 'A minor-key gospel cadence whose dominant is altered into a V7alt before pulling back home to the minor tonic.',
        degrees: [
          { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
          { roman: 'iv', name: 'Subdominant', semitoneFromKey: 5, quality: 'minor' },
          { roman: 'V7alt', name: 'Dominant', semitoneFromKey: 7, quality: 'dominantAlt' },
          { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
        ],
      },
    ],
);
