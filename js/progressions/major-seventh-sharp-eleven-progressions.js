// major-seventh-sharp-eleven-progressions.js
// The jazz and gospel progression sets for the majorSeventhSharpEleven chord lesson.
// Data only — the builder that turns these into playable chords lives in
// js/inversion-service.js, which must be loaded first.

InversionService.registerProgressions(
  'majorSeventhSharpEleven',
    // Five jazz chord progressions built around the major 7th\u266f11 chord --
    // mostly using it as a bright, "Lydian" substitute wherever a plain
    // major 7th chord would otherwise sit, especially on the subdominant
    // (IV) degree, whose own major scale naturally supplies a raised (not
    // plain) 11th.
  [
      {
        id: 'maj7sharp11-iv-lydian',
        name: 'IVmaj7\u266f11 Color Change',
        label: 'Imaj7 \u2013 IVmaj7\u266f11 \u2013 iii7 \u2013 vi7',
        description: 'The classic jazz-ballad move of coloring the subdominant with its natural Lydian 4th: IVmaj7\u266f11 uses only notes diatonic to the tonic major scale, giving a lush, brighter alternative to a plain IVmaj7, before falling back through iii7 to vi7.',
        degrees: [
          { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
          { roman: 'IVmaj7\u266f11', name: 'Lydian subdominant 7th', semitoneFromKey: 5, quality: 'majorSeventhSharpEleven' },
          { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
          { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
        ],
      },
      {
        id: 'maj7sharp11-ii-V-I',
        name: 'ii\u2013V\u2013I with Lydian Tonic',
        label: 'ii7 \u2013 V7 \u2013 Imaj7\u266f11',
        description: 'The familiar ii\u2013V\u2013I, but resolving onto Imaj7\u266f11 instead of a plain Imaj7 -- a shimmering, modern substitution that raises the tonic\u2019s 11th for extra brightness rather than dissonance.',
        degrees: [
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
          { roman: 'Imaj7\u266f11', name: 'Lydian tonic 7th', semitoneFromKey: 0, quality: 'majorSeventhSharpEleven' },
        ],
      },
      {
        id: 'maj7sharp11-turnaround',
        name: 'Turnaround with Lydian Color',
        label: 'iii7 \u2013 VImaj7\u266f11 \u2013 ii7 \u2013 V7',
        description: 'A falling turnaround where the vi chord is colored as a maj7\u266f11 instead of the usual minor 7th, for a brighter major-quality substitution right in the middle of the progression.',
        degrees: [
          { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
          { roman: 'VImaj7\u266f11', name: 'Lydian submediant 7th', semitoneFromKey: 9, quality: 'majorSeventhSharpEleven' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
      {
        id: 'maj7sharp11-minor-key',
        name: 'Minor-Key Cadence with Lydian IV',
        label: 'i7 \u2013 IVmaj7\u266f11 \u2013 V7 \u2013 i7',
        description: 'A minor-key cadence borrowing the parallel major\u2019s IV, colored as a maj7\u266f11 for a bright, modal lift between the minor tonic and the dominant that finally pulls the harmony home.',
        degrees: [
          { roman: 'i7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'minor7' },
          { roman: 'IVmaj7\u266f11', name: 'Borrowed Lydian subdominant 7th', semitoneFromKey: 5, quality: 'majorSeventhSharpEleven' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
          { roman: 'i7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'minor7' },
        ],
      },
      {
        id: 'maj7sharp11-blues',
        name: 'Jazz Blues Turnaround with Lydian Tonic',
        label: 'Imaj7\u266f11 \u2013 IV7 \u2013 ii7 \u2013 V7',
        description: 'A jazz-blues turnaround that opens on Imaj7\u266f11 instead of a plain major 7th or dominant tonic, establishing a bright, modern color right away before the familiar changes underneath.',
        degrees: [
          { roman: 'Imaj7\u266f11', name: 'Lydian tonic 7th', semitoneFromKey: 0, quality: 'majorSeventhSharpEleven' },
          { roman: 'IV7', name: 'Subdominant 7th', semitoneFromKey: 5, quality: 'dominant7' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
    ],
    // Five gospel chord progressions built around the major 7th\u266f11 chord.
  [
      {
        id: 'maj7sharp11-gospel-turnaround',
        name: 'Gospel Turnaround with Lydian IV',
        label: 'I \u2013 vi \u2013 IVmaj7\u266f11 \u2013 V7',
        description: 'The classic gospel turnaround (I\u2013vi), swapping the usual IV or ii7 for a IVmaj7\u266f11 color chord just before the closing V7 pulls the harmony back to the tonic -- a shimmering reharmonization gospel pianists use for extra lift.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
          { roman: 'IVmaj7\u266f11', name: 'Lydian subdominant 7th', semitoneFromKey: 5, quality: 'majorSeventhSharpEleven' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
      {
        id: 'maj7sharp11-amen-passing',
        name: 'Amen Vamp with Lydian Passing Chord',
        label: 'I \u2013 IVmaj7\u266f11 \u2013 IV \u2013 iv \u2013 I',
        description: 'The classic plagal "Amen" vamp (IV\u2192iv\u2192I), decorated with IVmaj7\u266f11 as a bright passing color chord right before the plain subdominant arrives -- its raised 11th glows against the melody without any dissonant clash.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'IVmaj7\u266f11', name: 'Lydian passing subdominant 7th', semitoneFromKey: 5, quality: 'majorSeventhSharpEleven' },
          { roman: 'IV', name: 'Subdominant', semitoneFromKey: 5, quality: 'major' },
          { roman: 'iv', name: 'Borrowed minor subdominant', semitoneFromKey: 5, quality: 'minor' },
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        ],
      },
      {
        id: 'maj7sharp11-secondary',
        name: 'Secondary Lydian Turnaround',
        label: 'I \u2013 IIImaj7\u266f11 \u2013 vi \u2013 V7',
        description: 'A secondary chord built on the mediant, colored as a maj7\u266f11 instead of the usual minor 7th, resolves into vi the way a secondary dominant would -- before the closing V7 pulls the whole progression back home.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'IIImaj7\u266f11', name: 'Lydian mediant 7th', semitoneFromKey: 4, quality: 'majorSeventhSharpEleven' },
          { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
      {
        id: 'maj7sharp11-extended-turnaround',
        name: 'Extended Gospel Turnaround with Lydian Color',
        label: 'iii7 \u2013 vi7 \u2013 ii7 \u2013 \u266dVImaj7\u266f11 \u2013 Imaj7',
        description: 'A five-chord walk-back turnaround -- three falling-5th minor 7ths (iii7\u2013vi7\u2013ii7) -- that closes with a chromatic \u266dVImaj7\u266f11 passing chord just before landing on a lush tonic major 7th (Imaj7).',
        degrees: [
          { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
          { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: '\u266dVImaj7\u266f11', name: 'Chromatic passing Lydian 7th', semitoneFromKey: 8, quality: 'majorSeventhSharpEleven' },
          { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
        ],
      },
      {
        id: 'maj7sharp11-minor-gospel-cadence',
        name: 'Minor Gospel Cadence with Lydian IV',
        label: 'i \u2013 IVmaj7\u266f11 \u2013 V7 \u2013 i',
        description: 'A minor-key gospel cadence where the subdominant borrows the parallel major\u2019s IV and raises its 11th, giving a bright, floating lift before the dominant pulls the harmony back home.',
        degrees: [
          { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
          { roman: 'IVmaj7\u266f11', name: 'Borrowed Lydian subdominant 7th', semitoneFromKey: 5, quality: 'majorSeventhSharpEleven' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
          { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
        ],
      },
    ],
);
