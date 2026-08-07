// dominant-eleventh-progressions.js
// The jazz and gospel progression sets for the dominantEleventh chord lesson.
// Data only — the builder that turns these into playable chords lives in
// js/inversion-service.js, which must be loaded first.

InversionService.registerProgressions(
  'dominantEleventh',
    // Five jazz chord progressions built around the Dominant 11th chord.
  [
      {
        id: 'dominant-eleventh-ii-V-I',
        name: 'ii–V–I with Dominant 11th',
        label: 'ii7 – V11 – Imaj7',
        description: 'The familiar ii–V–I resolves through a V11 instead of a plain V7, adding extra color on the way to the tonic.',
        degrees: [
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V11', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant11' },
          { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
        ],
      },
      {
        id: 'dominant-eleventh-iv-color',
        name: 'IV11 Color Change',
        label: 'Imaj7 – IV11 – iii7 – vi7',
        description: 'A Dominant 11th chord colors the subdominant before the harmony falls back through iii7 to vi7.',
        degrees: [
          { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
          { roman: 'IV11', name: 'Subdominant', semitoneFromKey: 5, quality: 'dominant11' },
          { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
          { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
        ],
      },
      {
        id: 'dominant-eleventh-turnaround',
        name: 'Turnaround with Dominant 11th',
        label: 'iii7 – vi7 – ii7 – V11',
        description: 'A falling turnaround whose closing dominant blooms into a V11 instead of a plain V7.',
        degrees: [
          { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
          { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V11', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant11' },
        ],
      },
      {
        id: 'dominant-eleventh-minor-key',
        name: 'Minor ii–V–i with Dominant 11th',
        label: 'iiø7 – V11 – i7',
        description: 'The minor-key ii–V–i, with the dominant voiced as a V11 before resolving to the minor 7th tonic.',
        degrees: [
          { roman: 'iiø7', name: 'Supertonic half-diminished 7th', semitoneFromKey: 2, quality: 'halfDiminished7' },
          { roman: 'V11', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant11' },
          { roman: 'i7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'minor7' },
        ],
      },
      {
        id: 'dominant-eleventh-blues',
        name: 'Jazz Blues Turnaround with Dominant 11th',
        label: 'I11 – IV11 – ii7 – V11',
        description: 'A jazz-blues turnaround voicing the tonic, subdominant, and dominant all as Dominant 11th chords.',
        degrees: [
          { roman: 'I11', name: 'Tonic', semitoneFromKey: 0, quality: 'dominant11' },
          { roman: 'IV11', name: 'Subdominant', semitoneFromKey: 5, quality: 'dominant11' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V11', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant11' },
        ],
      },
    ],
    // Five gospel chord progressions built around the Dominant 11th chord.
  [
      {
        id: 'dominant-eleventh-gospel-turnaround',
        name: 'Gospel Turnaround with Dominant 11th V',
        label: 'I – vi – IV – V11',
        description: 'The classic gospel turnaround, closing on a rich V11 instead of a plain dominant 7th.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
          { roman: 'IV', name: 'Subdominant', semitoneFromKey: 5, quality: 'major' },
          { roman: 'V11', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant11' },
        ],
      },
      {
        id: 'dominant-eleventh-vamp-release',
        name: 'Vamp with Dominant 11th–V7 Release',
        label: 'I – IV – V11 – V7 – I',
        description: 'A gospel vamp move: the dominant arrives first colored as a V11, then \'releases\' into a plain V7 right before the tonic returns.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'IV', name: 'Subdominant', semitoneFromKey: 5, quality: 'major' },
          { roman: 'V11', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant11' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        ],
      },
      {
        id: 'dominant-eleventh-secondary',
        name: 'Secondary Dominant 11th Turnaround',
        label: 'I – III11 – vi – V7',
        description: 'A secondary dominant on the mediant, colored as a III11 for extra richness, resolving into vi before the closing V7.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'III11', name: 'Mediant', semitoneFromKey: 4, quality: 'dominant11' },
          { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
      {
        id: 'dominant-eleventh-extended-turnaround',
        name: 'Extended Gospel Turnaround with Dominant 11th Color',
        label: 'iii7 – vi7 – ii7 – V11 – Imaj7',
        description: 'A five-chord walk-back turnaround whose penultimate dominant blooms into a V11 before landing on a lush tonic major 7th.',
        degrees: [
          { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
          { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V11', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant11' },
          { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
        ],
      },
      {
        id: 'dominant-eleventh-minor-gospel-cadence',
        name: 'Minor Gospel Cadence with Dominant 11th V',
        label: 'i – iv – V11 – i',
        description: 'A minor-key gospel cadence whose dominant is colored as a V11 before pulling back home to the minor tonic.',
        degrees: [
          { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
          { roman: 'iv', name: 'Subdominant', semitoneFromKey: 5, quality: 'minor' },
          { roman: 'V11', name: 'Dominant', semitoneFromKey: 7, quality: 'dominant11' },
          { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
        ],
      },
    ],
);
