// add9-progressions.js
// The jazz and gospel progression sets for the add9 chord lesson.
// Data only — the builder that turns these into playable chords lives in
// js/inversion-service.js, which must be loaded first.

InversionService.registerProgressions(
  'add9',
    // Five jazz chord progressions built around the add9 chord -- mostly
    // using it as a bright, open substitute for a plain triad or a 6th
    // chord wherever a tonic or subdominant chord would otherwise sit,
    // since (unlike a 7th chord) it never creates any tension that needs
    // to resolve.
  [
      {
        id: 'add9-ii-V-I',
        name: 'ii\u2013V\u2013I with Add9 Tonic',
        label: 'ii7 \u2013 V7 \u2013 Iadd9',
        description: 'The familiar ii\u2013V\u2013I, but resolving onto Iadd9 instead of a plain Imaj7 -- an open, ambiguous color that settles the progression without any of the closed, "complete" feeling a 7th brings.',
        degrees: [
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
          { roman: 'Iadd9', name: 'Tonic add9', semitoneFromKey: 0, quality: 'add9' },
        ],
      },
      {
        id: 'add9-iv-color',
        name: 'IVadd9 Color Change',
        label: 'Imaj7 \u2013 IVadd9 \u2013 iii7 \u2013 vi7',
        description: 'A jazz-ballad move that colors the subdominant with an add9 instead of a plain triad or major 7th -- a wide, airy alternative with no 7th at all -- before falling back through iii7 to vi7.',
        degrees: [
          { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
          { roman: 'IVadd9', name: 'Subdominant add9', semitoneFromKey: 5, quality: 'add9' },
          { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
          { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
        ],
      },
      {
        id: 'add9-turnaround',
        name: 'Turnaround with Add9 Submediant',
        label: 'iii7 \u2013 VIadd9 \u2013 ii7 \u2013 V7',
        description: 'A falling turnaround where the vi chord is colored as an add9 instead of the usual minor 7th, for an open, major-quality substitution right in the middle of the progression.',
        degrees: [
          { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
          { roman: 'VIadd9', name: 'Submediant add9', semitoneFromKey: 9, quality: 'add9' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
      {
        id: 'add9-minor-key',
        name: 'Minor-Key Cadence with Add9 IV',
        label: 'i7 \u2013 IVadd9 \u2013 V7 \u2013 i7',
        description: 'A minor-key cadence borrowing the parallel major\u2019s IV, colored as an add9 for an open, unresolved lift between the minor tonic and the dominant that finally pulls the harmony home.',
        degrees: [
          { roman: 'i7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'minor7' },
          { roman: 'IVadd9', name: 'Borrowed subdominant add9', semitoneFromKey: 5, quality: 'add9' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
          { roman: 'i7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'minor7' },
        ],
      },
      {
        id: 'add9-blues',
        name: 'Jazz Blues Turnaround with Add9 Tonic',
        label: 'Iadd9 \u2013 IV7 \u2013 ii7 \u2013 V7',
        description: 'A jazz-blues turnaround that opens on Iadd9 instead of a plain major or dominant tonic, establishing a bright, open color right away before the familiar changes underneath.',
        degrees: [
          { roman: 'Iadd9', name: 'Tonic add9', semitoneFromKey: 0, quality: 'add9' },
          { roman: 'IV7', name: 'Subdominant 7th', semitoneFromKey: 5, quality: 'dominant7' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
    ],
    // Five gospel chord progressions built around the add9 chord.
  [
      {
        id: 'add9-gospel-turnaround',
        name: 'Gospel Turnaround with Add9 IV',
        label: 'I \u2013 vi \u2013 IVadd9 \u2013 V7',
        description: 'The classic gospel turnaround (I\u2013vi), swapping the usual IV or ii7 for an IVadd9 color chord just before the closing V7 pulls the harmony back to the tonic -- an open, shimmering reharmonization gospel pianists use for extra lift.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
          { roman: 'IVadd9', name: 'Subdominant add9', semitoneFromKey: 5, quality: 'add9' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
      {
        id: 'add9-amen-passing',
        name: 'Amen Vamp with Add9 Passing Chord',
        label: 'I \u2013 IVadd9 \u2013 IV \u2013 iv \u2013 I',
        description: 'The classic plagal "Amen" vamp (IV\u2192iv\u2192I), decorated with IVadd9 as a bright passing color chord right before the plain subdominant arrives -- its added 9th glows against the melody without any dissonant clash.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'IVadd9', name: 'Subdominant passing add9', semitoneFromKey: 5, quality: 'add9' },
          { roman: 'IV', name: 'Subdominant', semitoneFromKey: 5, quality: 'major' },
          { roman: 'iv', name: 'Borrowed minor subdominant', semitoneFromKey: 5, quality: 'minor' },
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        ],
      },
      {
        id: 'add9-secondary',
        name: 'Secondary Add9 Turnaround',
        label: 'I \u2013 IIIadd9 \u2013 vi \u2013 V7',
        description: 'A secondary chord built on the mediant, colored as an add9 instead of the usual minor triad, resolves into vi the way a secondary dominant would -- before the closing V7 pulls the whole progression back home.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'IIIadd9', name: 'Mediant add9', semitoneFromKey: 4, quality: 'add9' },
          { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
      {
        id: 'add9-extended-turnaround',
        name: 'Extended Gospel Turnaround with Add9 Color',
        label: 'iii7 \u2013 vi7 \u2013 ii7 \u2013 \u266dVIadd9 \u2013 Iadd9',
        description: 'A five-chord walk-back turnaround -- three falling-5th minor 7ths (iii7\u2013vi7\u2013ii7) -- that closes with a chromatic \u266dVIadd9 passing chord just before landing on an open, wide tonic add9 (Iadd9).',
        degrees: [
          { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
          { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: '\u266dVIadd9', name: 'Chromatic passing add9', semitoneFromKey: 8, quality: 'add9' },
          { roman: 'Iadd9', name: 'Tonic add9', semitoneFromKey: 0, quality: 'add9' },
        ],
      },
      {
        id: 'add9-minor-gospel-cadence',
        name: 'Minor Gospel Cadence with Add9 IV',
        label: 'i \u2013 IVadd9 \u2013 V7 \u2013 i',
        description: 'A minor-key gospel cadence where the subdominant borrows the parallel major\u2019s IV and adds a 9th, giving an open, floating lift before the dominant pulls the harmony back home.',
        degrees: [
          { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
          { roman: 'IVadd9', name: 'Borrowed subdominant add9', semitoneFromKey: 5, quality: 'add9' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
          { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
        ],
      },
    ],
);
