// sixth-progressions.js
// The jazz and gospel progression sets for the sixth chord lesson.
// Data only — the builder that turns these into playable chords lives in
// js/inversion-service.js, which must be loaded first.

InversionService.registerProgressions(
  'sixth',
    // Five jazz chord progressions built around the (major) 6th chord --
    // used by the Sixth Chord Trainer lesson (Lesson 20). A 6th chord never
    // pulls anywhere the way a 7th chord does, so every one of these shows
    // it doing what it does best: sitting as a warm, "at rest" tonic color,
    // reached either straight away or after a turnaround.
  [
      {
        id: 'six-turnaround-i-vi-ii-v',
        name: 'Tonic Six Turnaround',
        label: 'I6 \u2013 vi7 \u2013 ii7 \u2013 V7',
        description: 'The classic 1\u20136\u20132\u20135 turnaround, but with a 6th chord standing in for the tonic instead of a plain triad or a major 7th: I6 opens the phrase, then falls through vi7 and ii7 before V7 pulls the harmony back around to the top.',
        degrees: [
          { roman: 'I6', name: 'Tonic 6th', semitoneFromKey: 0, quality: 'sixth' },
          { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
      {
        id: 'six-on-i-and-iv',
        name: 'Six on the One and Four',
        label: 'I6 \u2013 IV6 \u2013 ii7 \u2013 V7',
        description: 'The 6th-chord color isn\u2019t just for the tonic \u2014 it works equally well on the subdominant. This progression puts a 6th chord on both I and IV, the same two degrees a classical I\u2013IV cadence uses, before ii7\u2013V7 brings the phrase home.',
        degrees: [
          { roman: 'I6', name: 'Tonic 6th', semitoneFromKey: 0, quality: 'sixth' },
          { roman: 'IV6', name: 'Subdominant 6th', semitoneFromKey: 5, quality: 'sixth' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
      {
        id: 'landing-on-the-six',
        name: 'Landing on the Six',
        label: 'iii7 \u2013 vi7 \u2013 ii7 \u2013 V7 \u2013 I6',
        description: 'A five-chord \u201cwalk-back\u201d turnaround \u2014 three falling-5th minor 7ths (iii7\u2013vi7\u2013ii7) and a dominant 7th (V7) \u2014 that resolves not onto a plain tonic triad but onto the richer-colored I6, a favorite way for a jazz standard to land its very last chord.',
        degrees: [
          { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
          { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
          { roman: 'I6', name: 'Tonic 6th', semitoneFromKey: 0, quality: 'sixth' },
        ],
      },
      {
        id: 'passing-dim-to-six',
        name: 'Passing Diminished to the Six',
        label: 'I6 \u2013 \u266fIdim7 \u2013 ii7 \u2013 V7',
        description: 'The same chromatic passing-diminished voice-leading trick used elsewhere in this app (I \u2192 \u266fI \u2192 ii), except the phrase now starts from the warmer I6 tonic color rather than a plain triad or major 7th.',
        degrees: [
          { roman: 'I6', name: 'Tonic 6th', semitoneFromKey: 0, quality: 'sixth' },
          { roman: '\u266fIdim7', name: 'Raised-tonic diminished 7th', semitoneFromKey: 1, quality: 'diminished7' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
      {
        id: 'blues-to-six',
        name: 'Blues Turnaround to the Six',
        label: 'I7 \u2013 IV7 \u2013 I6 \u2013 V7',
        description: 'A bluesy turnaround where the restless tonic dominant 7th (I7) moves through the subdominant 7th (IV7) and then settles, if only briefly, into the tonic 6th\u2019s calmer color before V7 pushes the harmony onward.',
        degrees: [
          { roman: 'I7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'dominant7' },
          { roman: 'IV7', name: 'Subdominant 7th', semitoneFromKey: 5, quality: 'dominant7' },
          { roman: 'I6', name: 'Tonic 6th', semitoneFromKey: 0, quality: 'sixth' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
    ],
    // Five gospel chord progressions built around the (major) 6th chord.
  [
      {
        id: 'gospel-six-turnaround',
        name: 'Gospel Six Turnaround',
        label: 'I6 \u2013 vi \u2013 IV \u2013 V7',
        description: 'The quintessential gospel turnaround (I\u2013vi\u2013IV\u2013V7), voiced with a 6th chord on the tonic instead of a plain triad \u2014 a small change that gives an otherwise simple, singable loop a jazzier, more churchy color.',
        degrees: [
          { roman: 'I6', name: 'Tonic 6th', semitoneFromKey: 0, quality: 'sixth' },
          { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
          { roman: 'IV', name: 'Subdominant', semitoneFromKey: 5, quality: 'major' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
      {
        id: 'amen-six-vamp',
        name: 'Amen Six Vamp',
        label: 'I6 \u2013 IV \u2013 iv \u2013 I6',
        description: 'The classic plagal \u201cAmen cadence\u201d (IV \u2192 iv \u2192 I), with its bittersweet borrowed minor iv, bookended here by the tonic 6th chord instead of a plain major triad.',
        degrees: [
          { roman: 'I6', name: 'Tonic 6th', semitoneFromKey: 0, quality: 'sixth' },
          { roman: 'IV', name: 'Subdominant', semitoneFromKey: 5, quality: 'major' },
          { roman: 'iv', name: 'Borrowed minor subdominant', semitoneFromKey: 5, quality: 'minor' },
          { roman: 'I6', name: 'Tonic 6th', semitoneFromKey: 0, quality: 'sixth' },
        ],
      },
      {
        id: 'gospel-six-extended',
        name: 'Extended Gospel Six Turnaround',
        label: 'vi7 \u2013 ii7 \u2013 V7 \u2013 I6',
        description: 'A gospel walk-back turnaround \u2014 two falling-5th minor 7ths (vi7\u2013ii7) followed by the dominant 7th (V7) \u2014 that resolves onto the warmer I6 tonic color, common at the end of a shout chorus.',
        degrees: [
          { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
          { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
          { roman: 'I6', name: 'Tonic 6th', semitoneFromKey: 0, quality: 'sixth' },
        ],
      },
      {
        id: 'secondary-dominant-to-six',
        name: 'Secondary Dominant to the Six',
        label: 'I \u2013 III7 \u2013 vi \u2013 V7 \u2013 I6',
        description: 'A gospel-flavored turnaround that briefly tonicizes vi with a secondary dominant (III7) before V7 pulls the harmony back home \u2014 not to a plain tonic triad, but to the richer-colored I6.',
        degrees: [
          { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
          { roman: 'III7', name: 'Secondary dominant of vi', semitoneFromKey: 4, quality: 'dominant7' },
          { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
          { roman: 'I6', name: 'Tonic 6th', semitoneFromKey: 0, quality: 'sixth' },
        ],
      },
      {
        id: 'gospel-blues-six',
        name: 'Gospel Blues Six Cadence',
        label: 'I7 \u2013 IV \u2013 I6 \u2013 V7',
        description: 'A gospel piano vamp that mixes a bluesy dominant-7th tonic (I7) with a warmer 6th-chord tonic color (I6) either side of the subdominant, before the final dominant 7th push.',
        degrees: [
          { roman: 'I7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'dominant7' },
          { roman: 'IV', name: 'Subdominant', semitoneFromKey: 5, quality: 'major' },
          { roman: 'I6', name: 'Tonic 6th', semitoneFromKey: 0, quality: 'sixth' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
    ],
);
