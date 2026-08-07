// dominant-thirteenth-progressions.js
// The jazz and gospel progression sets for the dominantThirteenth chord lesson.
// Data only — the builder that turns these into playable chords lives in
// js/inversion-service.js, which must be loaded first.

InversionService.registerProgressions(
  'dominantThirteenth',
    // Five jazz chord progressions built around the Dominant 13th chord.
  [
      {
        id: 'dominant-thirteenth-ii-V-I',
        name: 'ii–V–I with Dominant 13th',
        label: 'ii7 – V13 – Imaj7',
        description: 'The familiar ii–V–I resolves through a V13 instead of a plain V7, adding extra color on the way to the tonic.',
        degrees: [
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V13', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant13' },
          { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
        ],
      },
      {
        id: 'dominant-thirteenth-iv-color',
        name: 'IV13 Color Change',
        label: 'Imaj7 – IV13 – iii7 – vi7',
        description: 'A Dominant 13th chord colors the subdominant before the harmony falls back through iii7 to vi7.',
        degrees: [
          { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
          { roman: 'IV13', name: 'Subdominant', semitoneFromKey: 5, quality: 'dominant13' },
          { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
          { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
        ],
      },
      {
        id: 'dominant-thirteenth-turnaround',
        name: 'Turnaround with Dominant 13th',
        label: 'iii7 – vi7 – ii7 – V13',
        description: 'A falling turnaround whose closing dominant blooms into a V13 instead of a plain V7.',
        degrees: [
          { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
          { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V13', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant13' },
        ],
      },
      {
        id: 'dominant-thirteenth-minor-key',
        name: 'Minor ii–V–i with Dominant 13th',
        label: 'iiø7 – V13 – i7',
        description: 'The minor-key ii–V–i, with the dominant voiced as a V13 before resolving to the minor 7th tonic.',
        degrees: [
          { roman: 'iiø7', name: 'Supertonic half-diminished 7th', semitoneFromKey: 2, quality: 'halfDiminished7' },
          { roman: 'V13', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant13' },
          { roman: 'i7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'minor7' },
        ],
      },
      {
        id: 'dominant-thirteenth-blues',
        name: 'Jazz Blues Turnaround with Dominant 13th',
        label: 'I13 – IV13 – ii7 – V13',
        description: 'A jazz-blues turnaround voicing the tonic, subdominant, and dominant all as Dominant 13th chords.',
        degrees: [
          { roman: 'I13', name: 'Tonic', semitoneFromKey: 0, quality: 'dominant13' },
          { roman: 'IV13', name: 'Subdominant', semitoneFromKey: 5, quality: 'dominant13' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V13', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant13' },
        ],
      },
    ],
    // Five gospel chord progressions built around the Dominant 13th chord.
  [
      {
        id: 'dominant-thirteenth-gospel-turnaround',
        name: 'Gospel Turnaround with Dominant 13th V',
        label: 'I – vi – IV – V13',
        description: 'The classic gospel turnaround, closing on a rich V13 instead of a plain dominant 7th.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
          { roman: 'IV', name: 'Subdominant', semitoneFromKey: 5, quality: 'major' },
          { roman: 'V13', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant13' },
        ],
      },
      {
        id: 'dominant-thirteenth-vamp-release',
        name: 'Vamp with Dominant 13th–V7 Release',
        label: 'I – IV – V13 – V7 – I',
        description: 'A gospel vamp move: the dominant arrives first colored as a V13, then \'releases\' into a plain V7 right before the tonic returns.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'IV', name: 'Subdominant', semitoneFromKey: 5, quality: 'major' },
          { roman: 'V13', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant13' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        ],
      },
      {
        id: 'dominant-thirteenth-secondary',
        name: 'Secondary Dominant 13th Turnaround',
        label: 'I – III13 – vi – V7',
        description: 'A secondary dominant on the mediant, colored as a III13 for extra richness, resolving into vi before the closing V7.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'III13', name: 'Mediant', semitoneFromKey: 4, quality: 'dominant13' },
          { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
      {
        id: 'dominant-thirteenth-extended-turnaround',
        name: 'Extended Gospel Turnaround with Dominant 13th Color',
        label: 'iii7 – vi7 – ii7 – V13 – Imaj7',
        description: 'A five-chord walk-back turnaround whose penultimate dominant blooms into a V13 before landing on a lush tonic major 7th.',
        degrees: [
          { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
          { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V13', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant13' },
          { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
        ],
      },
      {
        id: 'dominant-thirteenth-minor-gospel-cadence',
        name: 'Minor Gospel Cadence with Dominant 13th V',
        label: 'i – iv – V13 – i',
        description: 'A minor-key gospel cadence whose dominant is colored as a V13 before pulling back home to the minor tonic.',
        degrees: [
          { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
          { roman: 'iv', name: 'Subdominant', semitoneFromKey: 5, quality: 'minor' },
          { roman: 'V13', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant13' },
          { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
        ],
      },
    ],
);
