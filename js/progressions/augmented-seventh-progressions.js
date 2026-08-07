// augmented-seventh-progressions.js
// The jazz and gospel progression sets for the augmentedSeventh chord lesson.
// Data only — the builder that turns these into playable chords lives in
// js/inversion-service.js, which must be loaded first.

InversionService.registerProgressions(
  'augmentedSeventh',
    // Five jazz chord progressions built around the augmented 7th chord
    // (7♯5) -- used by the Augmented 7th Chord Trainer lesson (Lesson 23).
    // An augmented 7th is a dominant 7th with its 5th raised a semitone, so
    // every one of these shows it doing what it does best: standing in for
    // a plain V7 (or another dominant-functioning chord) wherever extra
    // "altered dominant" pull is wanted before a resolution down a 5th.
  [
      {
        id: 'aug7-ii-v-i',
        name: 'Altered ii\u2013V\u2013I',
        label: 'ii7 \u2013 V7\u266f5 \u2013 Imaj7',
        description: 'The familiar major ii\u2013V\u2013I, but with the V7 raised to V7\u266f5: pulling the 5th up a semitone adds extra outward tension before the chord resolves down a 5th onto the tonic major 7th, a common jazz way to spice up an otherwise plain dominant.',
        degrees: [
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7\u266f5', name: 'Altered dominant 7th', semitoneFromKey: 7, quality: 'augmentedSeventh' },
          { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
        ],
      },
      {
        id: 'aug7-turnaround',
        name: 'Turnaround with Altered Dominants',
        label: 'iii7 \u2013 VI7\u266f5 \u2013 ii7 \u2013 V7\u266f5',
        description: 'A falling-5ths turnaround with two altered dominants: a secondary VI7\u266f5 tonicizes ii with extra bite, then the closing V7\u266f5 does the same on its way back to the top of the tune -- both raised 5ths adding color that a plain dominant 7th wouldn\u2019t.',
        degrees: [
          { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
          { roman: 'VI7\u266f5', name: 'Altered secondary dominant of ii', semitoneFromKey: 9, quality: 'augmentedSeventh' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7\u266f5', name: 'Altered dominant 7th', semitoneFromKey: 7, quality: 'augmentedSeventh' },
        ],
      },
      {
        id: 'aug7-passing-to-ii',
        name: 'Altered Dominant Passing to ii',
        label: 'Imaj7 \u2013 I7\u266f5 \u2013 ii7 \u2013 V7\u266f5',
        description: 'I7\u266f5 works as a chromatic passing chord between the tonic and ii: its raised 5th sits a half-step below ii\u2019s 3rd, so it slides smoothly upward, before the closing V7\u266f5 pulls the phrase back home.',
        degrees: [
          { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
          { roman: 'I7\u266f5', name: 'Altered tonic passing dominant', semitoneFromKey: 0, quality: 'augmentedSeventh' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7\u266f5', name: 'Altered dominant 7th', semitoneFromKey: 7, quality: 'augmentedSeventh' },
        ],
      },
      {
        id: 'aug7-minor-ii-v-i',
        name: 'Minor ii\u2013V\u2013i, Altered',
        label: 'ii\u00f87 \u2013 V7\u266f5 \u2013 i7',
        description: 'The minor-key ii\u2013V\u2013i with its dominant altered: the supertonic half-diminished 7th (ii\u00f87) falls a 5th to V7\u266f5, whose raised 5th intensifies the pull into the minor 7th tonic (i7).',
        degrees: [
          { roman: 'ii\u00f87', name: 'Supertonic half-diminished 7th', semitoneFromKey: 2, quality: 'halfDiminished7' },
          { roman: 'V7\u266f5', name: 'Altered dominant 7th', semitoneFromKey: 7, quality: 'augmentedSeventh' },
          { roman: 'i7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'minor7' },
        ],
      },
      {
        id: 'aug7-blues-turnaround',
        name: 'Jazz Blues Turnaround, Altered',
        label: 'I7 \u2013 IV7 \u2013 V7\u266f5 \u2013 I7',
        description: 'A jazz-blues turnaround built from plain dominant 7ths on I and IV, but with the closing V7 raised to V7\u266f5 for an extra push back to the tonic on the last bar of the phrase.',
        degrees: [
          { roman: 'I7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'dominant7' },
          { roman: 'IV7', name: 'Subdominant 7th', semitoneFromKey: 5, quality: 'dominant7' },
          { roman: 'V7\u266f5', name: 'Altered dominant 7th', semitoneFromKey: 7, quality: 'augmentedSeventh' },
          { roman: 'I7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'dominant7' },
        ],
      },
    ],
    // Five gospel chord progressions built around the augmented 7th chord.
  [
      {
        id: 'aug7-gospel-turnaround',
        name: 'Gospel Turnaround with Altered Dominant',
        label: 'I \u2013 vi \u2013 ii7 \u2013 V7\u266f5',
        description: 'The classic gospel turnaround (I\u2013vi\u2013ii7), closed out with an altered dominant (V7\u266f5) instead of a plain V7 -- a small change that adds extra churchy tension right before the harmony resolves back to I.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7\u266f5', name: 'Altered dominant 7th', semitoneFromKey: 7, quality: 'augmentedSeventh' },
        ],
      },
      {
        id: 'aug7-amen-passing',
        name: 'Amen Vamp with Altered Passing Chord',
        label: 'I \u2013 I7\u266f5 \u2013 IV \u2013 iv \u2013 I',
        description: 'The classic plagal "Amen" vamp (IV\u2192iv\u2192I), decorated with I7\u266f5 as a chromatic passing chord between I and IV -- its raised 5th climbs a half-step into IV\u2019s 3rd, a favorite gospel-piano voice-leading touch.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'I7\u266f5', name: 'Altered tonic passing dominant', semitoneFromKey: 0, quality: 'augmentedSeventh' },
          { roman: 'IV', name: 'Subdominant', semitoneFromKey: 5, quality: 'major' },
          { roman: 'iv', name: 'Borrowed minor subdominant', semitoneFromKey: 5, quality: 'minor' },
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        ],
      },
      {
        id: 'aug7-secondary-dominant',
        name: 'Secondary Altered Dominant Turnaround',
        label: 'I \u2013 III7\u266f5 \u2013 vi \u2013 V7',
        description: 'A secondary dominant of vi (III7), raised to III7\u266f5 for extra color, resolves down a 5th into vi exactly the way V7 resolves into I -- before the closing V7 pulls the whole progression back to the tonic.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'III7\u266f5', name: 'Altered secondary dominant of vi', semitoneFromKey: 4, quality: 'augmentedSeventh' },
          { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
      {
        id: 'aug7-extended-turnaround',
        name: 'Extended Gospel Turnaround, Altered',
        label: 'iii7 \u2013 vi7 \u2013 ii7 \u2013 V7\u266f5 \u2013 Imaj7',
        description: 'A five-chord gospel walk-back turnaround -- three falling-5th minor 7ths (iii7\u2013vi7\u2013ii7) -- that lands on an altered dominant (V7\u266f5) before resolving onto a lush tonic major 7th (Imaj7).',
        degrees: [
          { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
          { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7\u266f5', name: 'Altered dominant 7th', semitoneFromKey: 7, quality: 'augmentedSeventh' },
          { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
        ],
      },
      {
        id: 'aug7-minor-gospel-cadence',
        name: 'Minor Gospel Cadence, Altered',
        label: 'i \u2013 iv \u2013 V7\u266f5 \u2013 i',
        description: 'A minor-key gospel cadence built from the natural minor\u2019s tonic and subdominant triads, with the dominant further altered to V7\u266f5 for an even firmer pull back home than a plain harmonic-minor V7.',
        degrees: [
          { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
          { roman: 'iv', name: 'Subdominant', semitoneFromKey: 5, quality: 'minor' },
          { roman: 'V7\u266f5', name: 'Altered dominant 7th', semitoneFromKey: 7, quality: 'augmentedSeventh' },
          { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
        ],
      },
    ],
);
