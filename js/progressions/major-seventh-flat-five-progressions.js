// major-seventh-flat-five-progressions.js
// The jazz and gospel progression sets for the majorSeventhFlatFive chord lesson.
// Data only — the builder that turns these into playable chords lives in
// js/inversion-service.js, which must be loaded first.

InversionService.registerProgressions(
  'majorSeventhFlatFive',
    // Five jazz chord progressions built around the major 7th\u266d5 chord --
    // mostly using it as a floating, unresolved substitute wherever a
    // plain major 7th chord would otherwise sit.
  [
      {
        id: 'maj7b5-ii-V-I',
        name: 'ii\u2013V\u2013I with Altered Tonic',
        label: 'ii7 \u2013 V7 \u2013 Imaj7\u266d5',
        description: 'The familiar ii\u2013V\u2013I, but resolving onto Imaj7\u266d5 instead of a plain Imaj7 -- the lowered 5th gives the tonic a floating, not-quite-settled color instead of full repose.',
        degrees: [
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
          { roman: 'Imaj7\u266d5', name: 'Altered tonic 7th', semitoneFromKey: 0, quality: 'majorSeventhFlatFive' },
        ],
      },
      {
        id: 'maj7b5-passing',
        name: 'Passing Maj7\u266d5',
        label: 'Imaj7 \u2013 \u266fImaj7\u266d5 \u2013 ii7 \u2013 V7',
        description: 'A chromatic passing chord between Imaj7 and ii7, built as a maj7\u266d5 on the raised tonic -- the same chromatic bass motion (I \u2192 \u266fI \u2192 ii) as the Major 7th Chords lesson\u2019s Passing Diminished progression, but colored with a different substitute chord.',
        degrees: [
          { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
          { roman: '\u266fImaj7\u266d5', name: 'Raised-tonic altered 7th', semitoneFromKey: 1, quality: 'majorSeventhFlatFive' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
      {
        id: 'maj7b5-turnaround',
        name: 'Turnaround with Maj7\u266d5 Color',
        label: 'iii7 \u2013 VImaj7\u266d5 \u2013 ii7 \u2013 V7',
        description: 'A falling turnaround where the vi chord is colored as a maj7\u266d5 instead of the usual minor 7th, for an unexpected major-quality substitution right in the middle of the progression.',
        degrees: [
          { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
          { roman: 'VImaj7\u266d5', name: 'Altered submediant 7th', semitoneFromKey: 9, quality: 'majorSeventhFlatFive' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
      {
        id: 'maj7b5-minor-key',
        name: 'Minor-Key Cadence with Maj7\u266d5',
        label: 'i7 \u2013 ivmaj7\u266d5 \u2013 V7 \u2013 i7',
        description: 'A minor-key cadence where the borrowed subdominant becomes a maj7\u266d5 chord -- a bittersweet, unresolved color sitting between the minor tonic and the dominant that finally pulls the harmony home.',
        degrees: [
          { roman: 'i7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'minor7' },
          { roman: 'ivmaj7\u266d5', name: 'Altered subdominant 7th', semitoneFromKey: 5, quality: 'majorSeventhFlatFive' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
          { roman: 'i7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'minor7' },
        ],
      },
      {
        id: 'maj7b5-blues',
        name: 'Jazz Blues Turnaround with Maj7\u266d5',
        label: 'Imaj7\u266d5 \u2013 IV7 \u2013 ii7 \u2013 V7',
        description: 'A jazz-blues turnaround that opens on Imaj7\u266d5 instead of a plain major 7th or dominant tonic, establishing the chord\u2019s unstable color right away before the familiar changes underneath.',
        degrees: [
          { roman: 'Imaj7\u266d5', name: 'Altered tonic 7th', semitoneFromKey: 0, quality: 'majorSeventhFlatFive' },
          { roman: 'IV7', name: 'Subdominant 7th', semitoneFromKey: 5, quality: 'dominant7' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
    ],
    // Five gospel chord progressions built around the major 7th\u266d5 chord.
  [
      {
        id: 'maj7b5-gospel-turnaround',
        name: 'Gospel Turnaround with Altered IV',
        label: 'I \u2013 vi \u2013 IVmaj7\u266d5 \u2013 V7',
        description: 'The classic gospel turnaround (I\u2013vi), swapping the usual ii7 for a IVmaj7\u266d5 passing color chord just before the closing V7 pulls the harmony back to the tonic -- a rich reharmonization gospel pianists use for extra shimmer.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
          { roman: 'IVmaj7\u266d5', name: 'Altered subdominant 7th', semitoneFromKey: 5, quality: 'majorSeventhFlatFive' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
      {
        id: 'maj7b5-amen-passing',
        name: 'Amen Vamp with Maj7\u266d5 Passing Chord',
        label: 'I \u2013 Imaj7\u266d5 \u2013 IV \u2013 iv \u2013 I',
        description: 'The classic plagal "Amen" vamp (IV\u2192iv\u2192I), decorated with Imaj7\u266d5 as a passing color chord right after the opening tonic -- its lowered 5th creates a brief chromatic dip before the subdominant arrives.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'Imaj7\u266d5', name: 'Altered tonic passing chord', semitoneFromKey: 0, quality: 'majorSeventhFlatFive' },
          { roman: 'IV', name: 'Subdominant', semitoneFromKey: 5, quality: 'major' },
          { roman: 'iv', name: 'Borrowed minor subdominant', semitoneFromKey: 5, quality: 'minor' },
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        ],
      },
      {
        id: 'maj7b5-secondary',
        name: 'Secondary Maj7\u266d5 Turnaround',
        label: 'I \u2013 IIImaj7\u266d5 \u2013 vi \u2013 V7',
        description: 'A secondary chord built on the mediant, colored as a maj7\u266d5 instead of the usual minor 7th, resolves into vi the way a secondary dominant would -- before the closing V7 pulls the whole progression back home.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'IIImaj7\u266d5', name: 'Altered mediant 7th', semitoneFromKey: 4, quality: 'majorSeventhFlatFive' },
          { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
      {
        id: 'maj7b5-extended-turnaround',
        name: 'Extended Gospel Turnaround with Maj7\u266d5',
        label: 'iii7 \u2013 vi7 \u2013 ii7 \u2013 \u266dVImaj7\u266d5 \u2013 Imaj7',
        description: 'A five-chord walk-back turnaround -- three falling-5th minor 7ths (iii7\u2013vi7\u2013ii7) -- that closes with a chromatic \u266dVImaj7\u266d5 passing chord just before landing on a lush tonic major 7th (Imaj7).',
        degrees: [
          { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
          { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: '\u266dVImaj7\u266d5', name: 'Chromatic passing altered 7th', semitoneFromKey: 8, quality: 'majorSeventhFlatFive' },
          { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
        ],
      },
      {
        id: 'maj7b5-minor-gospel-cadence',
        name: 'Minor Gospel Cadence with Maj7\u266d5',
        label: 'i \u2013 ivmaj7\u266d5 \u2013 V7 \u2013 i',
        description: 'A minor-key gospel cadence where the subdominant borrows the parallel major\u2019s IV but flats its 5th, giving an unresolved, bittersweet color before the dominant pulls the harmony back home.',
        degrees: [
          { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
          { roman: 'ivmaj7\u266d5', name: 'Altered subdominant 7th', semitoneFromKey: 5, quality: 'majorSeventhFlatFive' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
          { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
        ],
      },
    ],
);
