// minor-sixth-progressions.js
// The jazz and gospel progression sets for the minorSixth chord lesson.
// Data only — the builder that turns these into playable chords lives in
// js/inversion-service.js, which must be loaded first.

InversionService.registerProgressions(
  'minorSixth',
    // Five jazz chord progressions built around the minor 6th chord --
    // used by the Minor Sixth Chord Trainer lesson (Lesson 21). Context is
    // the natural (Aeolian) minor scale, the same convention used by the
    // Minor Chords and Minor 7th Chords lessons.
  [
      {
        id: 'minor-six-ii-v-i',
        name: 'Minor ii\u2013V\u2013i Landing on the Six',
        label: 'ii\u00f87 \u2013 V7 \u2013 i6',
        description: 'The classic minor-key ii\u2013V\u2013i, but resolving onto the moodier minor 6th tonic (i6) instead of a plain minor triad or minor(-major) 7th \u2014 a favorite way for a minor-key jazz standard to rest on its very last chord.',
        degrees: [
          { roman: 'ii\u00f87', name: 'Supertonic half-diminished 7th', semitoneFromKey: 2, quality: 'halfDiminished7' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
          { roman: 'i6', name: 'Tonic minor 6th', semitoneFromKey: 0, quality: 'minorSixth' },
        ],
      },
      {
        id: 'minor-six-on-i-and-iv',
        name: 'Minor Six on the One and Four',
        label: 'i6 \u2013 iv6 \u2013 ii\u00f87 \u2013 V7',
        description: 'Minor 6th chords stacked on both the tonic and subdominant \u2014 the natural-minor mirror of "Six on the One and Four" \u2014 before a ii\u00f87\u2013V7 turnaround pulls the harmony back toward home.',
        degrees: [
          { roman: 'i6', name: 'Tonic minor 6th', semitoneFromKey: 0, quality: 'minorSixth' },
          { roman: 'iv6', name: 'Subdominant minor 6th', semitoneFromKey: 5, quality: 'minorSixth' },
          { roman: 'ii\u00f87', name: 'Supertonic half-diminished 7th', semitoneFromKey: 2, quality: 'halfDiminished7' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
      {
        id: 'minor-six-passing-dim',
        name: 'Passing Diminished to the Minor Six',
        label: 'i6 \u2013 \u266fidim7 \u2013 ii\u00f87 \u2013 V7',
        description: 'The same chromatic passing-diminished trick (i \u2192 \u266fi \u2192 ii) used elsewhere in this app, reused here in a minor key and starting the phrase from the minor 6th tonic.',
        degrees: [
          { roman: 'i6', name: 'Tonic minor 6th', semitoneFromKey: 0, quality: 'minorSixth' },
          { roman: '\u266fidim7', name: 'Raised-tonic diminished 7th', semitoneFromKey: 1, quality: 'diminished7' },
          { roman: 'ii\u00f87', name: 'Supertonic half-diminished 7th', semitoneFromKey: 2, quality: 'halfDiminished7' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
      {
        id: 'minor-six-secondary-dominant',
        name: 'Secondary Dominant to the Minor Six',
        label: 'i6 \u2013 VI7 \u2013 ii\u00f87 \u2013 V7',
        description: 'A borrowed dominant 7th built on the submediant (VI7) briefly tonicizes the ii chord before the familiar ii\u00f87\u2013V7 turnaround resolves the phrase back toward the tonic minor 6th.',
        degrees: [
          { roman: 'i6', name: 'Tonic minor 6th', semitoneFromKey: 0, quality: 'minorSixth' },
          { roman: 'VI7', name: 'Secondary dominant of ii', semitoneFromKey: 8, quality: 'dominant7' },
          { roman: 'ii\u00f87', name: 'Supertonic half-diminished 7th', semitoneFromKey: 2, quality: 'halfDiminished7' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
      {
        id: 'minor-six-blues-turnaround',
        name: 'Minor Blues Turnaround to the Six',
        label: 'i7 \u2013 iv7 \u2013 V7 \u2013 i6',
        description: 'A minor-blues-style turnaround (i7\u2013iv7\u2013V7) that resolves not to a plain minor 7th tonic but up to the richer-colored minor 6th (i6), a common way jazz players close out a minor blues chorus.',
        degrees: [
          { roman: 'i7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'minor7' },
          { roman: 'iv7', name: 'Subdominant 7th', semitoneFromKey: 5, quality: 'minor7' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
          { roman: 'i6', name: 'Tonic minor 6th', semitoneFromKey: 0, quality: 'minorSixth' },
        ],
      },
    ],
    // Five gospel chord progressions built around the minor 6th chord.
  [
      {
        id: 'minor-gospel-six-cadence',
        name: 'Minor Gospel Six Cadence',
        label: 'i6 \u2013 iv \u2013 V7 \u2013 i6',
        description: 'The classic minor-key gospel cadence (i\u2013iv\u2013V7\u2013i), bookended here by the tonic minor 6th for a warmer, jazzier color than a plain minor triad.',
        degrees: [
          { roman: 'i6', name: 'Tonic minor 6th', semitoneFromKey: 0, quality: 'minorSixth' },
          { roman: 'iv', name: 'Subdominant', semitoneFromKey: 5, quality: 'minor' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
          { roman: 'i6', name: 'Tonic minor 6th', semitoneFromKey: 0, quality: 'minorSixth' },
        ],
      },
      {
        id: 'minor-six-relative-major-walk',
        name: 'Minor Six to the Relative Major',
        label: 'i6 \u2013 VI \u2013 iv6 \u2013 V7',
        description: 'A gospel-style walk from the tonic minor 6th up to the relative-major submediant triad (VI), then back down through a subdominant minor 6th chord (iv6) into the dominant 7th.',
        degrees: [
          { roman: 'i6', name: 'Tonic minor 6th', semitoneFromKey: 0, quality: 'minorSixth' },
          { roman: 'VI', name: 'Relative-major submediant', semitoneFromKey: 8, quality: 'major' },
          { roman: 'iv6', name: 'Subdominant minor 6th', semitoneFromKey: 5, quality: 'minorSixth' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
      {
        id: 'minor-six-amen-vamp',
        name: 'Minor Amen Six Vamp',
        label: 'i6 \u2013 iv \u2013 i6 \u2013 V7',
        description: 'A simple plagal-flavored gospel vamp \u2014 tonic minor 6th, subdominant minor, back to the tonic 6th, then the dominant 7th push \u2014 common in slow, minor-key gospel intros and vamps.',
        degrees: [
          { roman: 'i6', name: 'Tonic minor 6th', semitoneFromKey: 0, quality: 'minorSixth' },
          { roman: 'iv', name: 'Subdominant', semitoneFromKey: 5, quality: 'minor' },
          { roman: 'i6', name: 'Tonic minor 6th', semitoneFromKey: 0, quality: 'minorSixth' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
      {
        id: 'minor-six-passing-dim-gospel',
        name: 'Gospel Passing Diminished to the Minor Six',
        label: 'i6 \u2013 \u266fidim7 \u2013 iv6 \u2013 V7',
        description: 'A favorite gospel piano voice-leading trick \u2014 a chromatic passing diminished chord (i \u2192 \u266fi \u2192 iv) \u2014 framed here around minor 6th chords on the tonic and subdominant.',
        degrees: [
          { roman: 'i6', name: 'Tonic minor 6th', semitoneFromKey: 0, quality: 'minorSixth' },
          { roman: '\u266fidim7', name: 'Raised-tonic diminished 7th', semitoneFromKey: 1, quality: 'diminished7' },
          { roman: 'iv6', name: 'Subdominant minor 6th', semitoneFromKey: 5, quality: 'minorSixth' },
          { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        ],
      },
      {
        id: 'minor-six-double-plagal',
        name: 'Double Plagal Minor Six',
        label: 'i6 \u2013 VII \u2013 iv \u2013 i6',
        description: 'A modal-sounding gospel vamp that borrows the subtonic major triad (\u266dVII) on the way down through the subdominant and back home to the tonic minor 6th.',
        degrees: [
          { roman: 'i6', name: 'Tonic minor 6th', semitoneFromKey: 0, quality: 'minorSixth' },
          { roman: 'VII', name: 'Subtonic', semitoneFromKey: 10, quality: 'major' },
          { roman: 'iv', name: 'Subdominant', semitoneFromKey: 5, quality: 'minor' },
          { roman: 'i6', name: 'Tonic minor 6th', semitoneFromKey: 0, quality: 'minorSixth' },
        ],
      },
    ],
);
