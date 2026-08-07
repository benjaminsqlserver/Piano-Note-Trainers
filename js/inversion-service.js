// inversion-service.js
// Chord inversions, plus the generic chord/progression builder every
// progression exercise in the app runs on.
//
// This holds the logic only. The progression *data* for each chord lesson
// lives in js/progressions/<lesson>-progressions.js, and each of those files
// attaches itself here via registerProgressions() — so a lesson page loads
// its own progressions and nothing else. The Chord Inversions lesson's own
// jazz and gospel sets stay here, since that lesson always needs them.
//
// Requires no other script.

const InversionService = (() => {
  // An inversion re-orders a chord's existing notes so that a tone other
  // than the root sits at the bottom (in the bass), by moving one or more
  // of the chord's lowest notes up an octave. The pitch classes never
  // change -- a C major triad is still just C, E, and G no matter which
  // one is on the bottom -- only *which* tone is lowest changes, which is
  // why an inversion is still named after (and functions as) the same
  // chord. This service works generically for every chord quality this
  // app teaches: 3-note triads (major, minor, augmented, diminished) get
  // root position + 2 inversions, and 4-note seventh chords (dominant 7th,
  // diminished 7th, minor 7th, major 7th, half-diminished 7th) get root
  // position + 3 inversions.

  const SHARP_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const FLAT_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

  const keys = SHARP_NAMES.map((name, semitoneFromC) => ({
    semitoneFromC,
    name,
    flatName: FLAT_NAMES[semitoneFromC],
    midiNoteForOctave(octave) { return 12 * (octave + 1) + semitoneFromC; },
  }));

  function noteNameFor(absSemitoneFromC, preferFlats) {
    const idx = ((absSemitoneFromC % 12) + 12) % 12;
    return preferFlats ? FLAT_NAMES[idx] : SHARP_NAMES[idx];
  }

  // Every chord quality this app has taught so far, as a pitch-class
  // pattern measured in semitones from the root -- exactly the same
  // interval sets used in the Major/Minor/Augmented/Diminished Chord and
  // Dominant/Diminished/Minor/Major/Half-Diminished 7th Chord lessons.
  const QUALITIES = {
    major:            { suffix: 'major',                      displayName: 'Major triad',              intervals: [0, 4, 7],     labels: ['Root', 'Major 3rd', 'Perfect 5th'] },
    minor:            { suffix: 'minor',                      displayName: 'Minor triad',               intervals: [0, 3, 7],     labels: ['Root', 'Minor 3rd', 'Perfect 5th'] },
    augmented:        { suffix: 'augmented',                  displayName: 'Augmented triad',           intervals: [0, 4, 8],     labels: ['Root', 'Major 3rd', 'Augmented 5th'] },
    diminished:       { suffix: 'diminished',                 displayName: 'Diminished triad',          intervals: [0, 3, 6],     labels: ['Root', 'Minor 3rd', 'Diminished 5th'] },
    sixth:            { suffix: '6',                          displayName: '6th chord',                 intervals: [0, 4, 7, 9],  labels: ['Root', 'Major 3rd', 'Perfect 5th', 'Major 6th'] },
    minorSixth:       { suffix: 'minor 6th',                  displayName: 'Minor 6th chord',           intervals: [0, 3, 7, 9],  labels: ['Root', 'Minor 3rd', 'Perfect 5th', 'Major 6th'] },
    dominant7:        { suffix: 'dominant 7th',                displayName: 'Dominant 7th chord',        intervals: [0, 4, 7, 10], labels: ['Root', 'Major 3rd', 'Perfect 5th', 'Minor 7th'] },
    diminished7:      { suffix: 'diminished 7th',              displayName: 'Diminished 7th chord',      intervals: [0, 3, 6, 9],  labels: ['Root', 'Minor 3rd', 'Diminished 5th', 'Diminished 7th'] },
    minor7:           { suffix: 'minor 7th',                   displayName: 'Minor 7th chord',           intervals: [0, 3, 7, 10], labels: ['Root', 'Minor 3rd', 'Perfect 5th', 'Minor 7th'] },
    major7:           { suffix: 'major 7th',                   displayName: 'Major 7th chord',           intervals: [0, 4, 7, 11], labels: ['Root', 'Major 3rd', 'Perfect 5th', 'Major 7th'] },
    halfDiminished7:  { suffix: 'half-diminished 7th (m7\u266d5)', displayName: 'Half-diminished 7th chord', intervals: [0, 3, 6, 10], labels: ['Root', 'Minor 3rd', 'Diminished 5th', 'Minor 7th'] },
    augmentedSeventh: { suffix: 'augmented 7th (7\u266f5)',        displayName: 'Augmented 7th chord (7\u266f5)', intervals: [0, 4, 8, 10], labels: ['Root', 'Major 3rd', 'Augmented 5th', 'Minor 7th'] },
    majorSeventhFlatFive: { suffix: 'major 7th\u266d5 (maj7\u266d5)', displayName: 'Major 7th\u266d5 chord (maj7\u266d5)', intervals: [0, 4, 6, 11], labels: ['Root', 'Major 3rd', 'Diminished 5th', 'Major 7th'] },
    majorSeventhSharpEleven: { suffix: 'major 7th\u266f11 (maj7\u266f11)', displayName: 'Major 7th\u266f11 chord (maj7\u266f11)', intervals: [0, 4, 7, 11, 18], labels: ['Root', 'Major 3rd', 'Perfect 5th', 'Major 7th', 'Sharp 11th'] },
    add9:             { suffix: 'add9',                        displayName: 'Add9 chord',                 intervals: [0, 4, 7, 14], labels: ['Root', 'Major 3rd', 'Perfect 5th', '9th'] },
    susTwo:           { suffix: 'sus2',                        displayName: 'Sus2 chord',                 intervals: [0, 2, 7],     labels: ['Root', 'Major 2nd', 'Perfect 5th'] },
    susFour:          { suffix: 'sus4',                        displayName: 'Sus4 chord',                 intervals: [0, 5, 7],     labels: ['Root', 'Perfect 4th', 'Perfect 5th'] },
    dominantSeventhSusFour: { suffix: '7sus4',                 displayName: 'Dominant 7sus4 chord',       intervals: [0, 5, 7, 10], labels: ['Root', 'Perfect 4th', 'Perfect 5th', 'Minor 7th'] },
    sixNine:          { suffix: '6/9',                         displayName: '6/9 chord',                  intervals: [0, 4, 7, 9, 14], labels: ['Root', 'Major 3rd', 'Perfect 5th', 'Major 6th', '9th'] },
    dominant9:           { suffix: '9', displayName: 'Dominant 9th chord', intervals: [0, 4, 7, 10, 14], labels: ['Root', 'Major 3rd', 'Perfect 5th', 'Minor 7th', '9th'] },
    dominant11:          { suffix: '11', displayName: 'Dominant 11th chord', intervals: [0, 4, 7, 10, 14, 17], labels: ['Root', 'Major 3rd', 'Perfect 5th', 'Minor 7th', '9th', '11th'] },
    dominant13:          { suffix: '13', displayName: 'Dominant 13th chord', intervals: [0, 4, 7, 10, 14, 17, 21], labels: ['Root', 'Major 3rd', 'Perfect 5th', 'Minor 7th', '9th', '11th', '13th'] },
    dominant7FlatNine:   { suffix: '7\u266d9', displayName: 'Dominant 7\u266d9 chord', intervals: [0, 4, 7, 10, 13], labels: ['Root', 'Major 3rd', 'Perfect 5th', 'Minor 7th', '\u266d9th'] },
    dominant7SharpNine:  { suffix: '7\u266f9', displayName: 'Dominant 7\u266f9 chord', intervals: [0, 4, 7, 10, 15], labels: ['Root', 'Major 3rd', 'Perfect 5th', 'Minor 7th', '\u266f9th'] },
    dominant7FlatFive:   { suffix: '7\u266d5', displayName: 'Dominant 7\u266d5 chord', intervals: [0, 4, 6, 10], labels: ['Root', 'Major 3rd', '\u266d5th (Diminished 5th)', 'Minor 7th'] },
    dominant7SharpEleven: { suffix: '7\u266f11', displayName: 'Dominant 7\u266f11 chord', intervals: [0, 4, 7, 10, 18], labels: ['Root', 'Major 3rd', 'Perfect 5th', 'Minor 7th', '\u266f11th'] },
    dominant7FlatThirteen: { suffix: '7\u266d13', displayName: 'Dominant 7\u266d13 chord', intervals: [0, 4, 7, 10, 20], labels: ['Root', 'Major 3rd', 'Perfect 5th', 'Minor 7th', '\u266d13th'] },
    dominant9SharpEleven: { suffix: '9\u266f11', displayName: 'Dominant 9\u266f11 chord', intervals: [0, 4, 7, 10, 14, 18], labels: ['Root', 'Major 3rd', 'Perfect 5th', 'Minor 7th', '9th', '\u266f11th'] },
    dominantAlt:         { suffix: '7alt', displayName: 'Altered Dominant chord', intervals: [0, 4, 8, 10, 15], labels: ['Root', 'Major 3rd', '\u266f5th (Augmented 5th)', 'Minor 7th', '\u266f9th'] },
    minorNinth: { suffix: "m9", displayName: "Minor 9th chord", intervals: [0, 3, 7, 10, 14], labels: ["Root", "Minor 3rd", "Perfect 5th", "Minor 7th", "9th"] },
    minorEleventh: { suffix: "m11", displayName: "Minor 11th chord", intervals: [0, 3, 7, 10, 14, 17], labels: ["Root", "Minor 3rd", "Perfect 5th", "Minor 7th", "9th", "11th"] },
    minorThirteenth: { suffix: "m13", displayName: "Minor 13th chord", intervals: [0, 3, 7, 10, 14, 17, 21], labels: ["Root", "Minor 3rd", "Perfect 5th", "Minor 7th", "9th", "11th", "13th"] },
    minorSixNine: { suffix: "m6/9", displayName: "Minor 6/9 chord", intervals: [0, 3, 7, 9, 14], labels: ["Root", "Minor 3rd", "Perfect 5th", "Major 6th", "9th"] },
    minorMajorSeventh: { suffix: "m(maj7)", displayName: "Minor-major 7th chord", intervals: [0, 3, 7, 11], labels: ["Root", "Minor 3rd", "Perfect 5th", "Major 7th"] },
    minorMajorNinth: { suffix: "m(maj9)", displayName: "Minor-major 9th chord", intervals: [0, 3, 7, 11, 14], labels: ["Root", "Minor 3rd", "Perfect 5th", "Major 7th", "9th"] },
    majorNinth: { suffix: "maj9", displayName: "Major 9th chord", intervals: [0, 4, 7, 11, 14], labels: ["Root", "Major 3rd", "Perfect 5th", "Major 7th", "9th"] },
    majorThirteenth: { suffix: "maj13", displayName: "Major 13th chord", intervals: [0, 4, 7, 11, 14, 21], labels: ["Root", "Major 3rd", "Perfect 5th", "Major 7th", "9th", "13th"] },
    majorSeventhSharpFive: { suffix: "maj7♯5", displayName: "Major 7th♯5 chord (augmented major 7th)", intervals: [0, 4, 8, 11], labels: ["Root", "Major 3rd", "Augmented 5th", "Major 7th"] },
    dominantNineSusFour: { suffix: "9sus4", displayName: "Dominant 9sus4 chord", intervals: [0, 5, 7, 10, 14], labels: ["Root", "Perfect 4th", "Perfect 5th", "Minor 7th", "9th"] },
    dominantThirteenSusFour: { suffix: "13sus4", displayName: "Dominant 13sus4 chord", intervals: [0, 5, 7, 10, 14, 21], labels: ["Root", "Perfect 4th", "Perfect 5th", "Minor 7th", "9th", "13th"] },
    majorSeventhSusTwo: { suffix: "maj7sus2", displayName: "Major 7sus2 chord", intervals: [0, 2, 7, 11], labels: ["Root", "Major 2nd", "Perfect 5th", "Major 7th"] },
    majorSeventhSusFour: { suffix: "maj7sus4", displayName: "Major 7sus4 chord", intervals: [0, 5, 7, 11], labels: ["Root", "Perfect 4th", "Perfect 5th", "Major 7th"] },
    add11: { suffix: "add11", displayName: "Add11 chord (add4)", intervals: [0, 4, 5, 7], labels: ["Root", "Major 3rd", "11th (Perfect 4th)", "Perfect 5th"] },
    diminishedMajorSeventh: { suffix: "°(maj7)", displayName: "Diminished major 7th chord", intervals: [0, 3, 6, 11], labels: ["Root", "Minor 3rd", "Diminished 5th", "Major 7th"] },
    minorSeventhFlatNine: { suffix: "m7♭9", displayName: "Minor 7♭9 chord", intervals: [0, 3, 7, 10, 13], labels: ["Root", "Minor 3rd", "Perfect 5th", "Minor 7th", "♭9th"] },
    halfDiminishedEleventh: { suffix: "m11♭5", displayName: "Half-diminished 11th chord", intervals: [0, 3, 6, 10, 14, 17], labels: ["Root", "Minor 3rd", "Diminished 5th", "Minor 7th", "9th", "11th"] },
    powerChord: { suffix: "5", displayName: "Power chord", intervals: [0, 7], labels: ["Root", "Perfect 5th"] },
    splitThirdBlues: { suffix: "7(♭3/♮3)", displayName: "Split-third \"blues\" chord", intervals: [0, 3, 4, 7, 10], labels: ["Root", "Minor 3rd", "Major 3rd", "Perfect 5th", "Minor 7th"] },
    quartal: { suffix: "quartal", displayName: "Quartal chord (\"So What\" voicing)", intervals: [0, 5, 10, 15, 19], labels: ["Root", "Stacked 4th (♭7th, oct.)", "Stacked 4th (♭3rd, oct. up)", "Stacked 4th (5th, oct. up)", "Stacked 4th (top voice)"] },
    toneCluster: { suffix: "cluster", displayName: "Tone cluster", intervals: [0, 1, 2], labels: ["Root", "Minor 2nd", "Major 2nd"] },
    polychord: { suffix: "/", displayName: "Polychord / slash chord", intervals: [0, 2, 4, 6, 7, 9, 10], labels: ["Root (bass)", "Upper triad root (+2)", "Major 3rd", "Upper triad 3rd (+6)", "Perfect 5th", "Upper triad 5th (+9)", "Minor 7th"] },
    neapolitan: { suffix: "♭II", displayName: "Neapolitan (♭II) chord", intervals: [1, 5, 8], labels: ["♭II (chord root)", "Major 3rd of ♭II", "Perfect 5th of ♭II"] },
  };

  // Display order used by the "All chord types" reference tab -- triads
  // first (in the order they were taught, Lessons 8-11), then the 6th
  // chords (Lessons 20-21), then the five 7th chords (Lessons 13-17),
  // then the augmented 7th chord (Lesson 23), then the major 7th\u266d5
  // chord (Lesson 24), then the major 7th\u266f11 chord (Lesson 25), then
  // the add9 chord (Lesson 26), then the sus2/sus4/7sus4/6-9 chords
  // (Lessons 27-30), then the ten Dominant Extensions & Alterations
  // chords -- dominant 9th/11th/13th and the altered dominants 7\u266d9,
  // 7\u266f9, 7\u266d5, 7\u266f11, 7\u266d13, 9\u266f11, and the "alt" dominant
  // (Lessons 32-41), then the 23 remaining chords from the Jazz & Gospel
  // reference list -- Minor Extensions (Lessons 42-47), Major Extensions
  // (Lessons 48-50), Suspended & Add Extensions (Lessons 51-55),
  // Diminished & Augmented Variants (Lessons 56-58), and Gospel & Modal
  // Color Chords (Lessons 59-64).
  const QUALITY_ORDER = ['major', 'minor', 'augmented', 'diminished', 'sixth', 'minorSixth', 'dominant7', 'diminished7', 'minor7', 'major7', 'halfDiminished7', 'augmentedSeventh', 'majorSeventhFlatFive', 'majorSeventhSharpEleven', 'add9', 'susTwo', 'susFour', 'dominantSeventhSusFour', 'sixNine', 'dominant9', 'dominant11', 'dominant13', 'dominant7FlatNine', 'dominant7SharpNine', 'dominant7FlatFive', 'dominant7SharpEleven', 'dominant7FlatThirteen', 'dominant9SharpEleven', 'dominantAlt', 'minorNinth', 'minorEleventh', 'minorThirteenth', 'minorSixNine', 'minorMajorSeventh', 'minorMajorNinth', 'majorNinth', 'majorThirteenth', 'majorSeventhSharpFive', 'dominantNineSusFour', 'dominantThirteenSusFour', 'majorSeventhSusTwo', 'majorSeventhSusFour', 'add11', 'diminishedMajorSeventh', 'minorSeventhFlatNine', 'halfDiminishedEleventh', 'powerChord', 'splitThirdBlues', 'quartal', 'toneCluster', 'polychord', 'neapolitan'];

  // Most chord types this app teaches have 3 or 4 notes (root position
  // plus 2 or 3 inversions). The major 7th\u266f11, 6/9, dominant 9th,
  // 7\u266d9, 7\u266f9, 7\u266f11, 7\u266d13, and altered-dominant chords have 5
  // notes (root position plus a 4th inversion); the dominant 11th chord
  // and dominant 9\u266f11 chord have 6 notes (plus a 5th inversion); the
  // dominant 13th chord (Lesson 34) is the fullest chord in the app, with
  // all 7 stock chord tones (root through the 13th) and so a 6th
  // inversion too. The "All Chord Types" reference tab (Exercise 1)
  // enumerates every one of these automatically, since it loops over
  // each quality's own interval count rather than a fixed number.
  const INVERSION_NAMES = ['Root position', '1st inversion', '2nd inversion', '3rd inversion', '4th inversion', '5th inversion', '6th inversion'];

  /** Builds a chord (root position) for `key` at `octave` in the given quality. */
  function buildChordTones(key, octave, qualityKey, preferFlats) {
    const quality = QUALITIES[qualityKey];
    const rootMidi = key.midiNoteForOctave(octave);
    return quality.intervals.map((semitone, i) => ({
      role: quality.labels[i],
      semitoneFromRoot: semitone,
      midiNote: rootMidi + semitone,
      noteName: noteNameFor(key.semitoneFromC + semitone, preferFlats),
    }));
  }

  /**
   * Inverts a root-position chord (as returned by buildChordTones) so that
   * the chord tone at `requestedInversion` (0 = root, 1 = the next tone up,
   * and so on) ends up lowest, in the bass. `requestedInversion` is capped
   * at tones.length - 1 (a triad only has a 1st and 2nd inversion; it has
   * no 3rd inversion, since it has no 7th to put in the bass).
   *
   * Rotates the chord tones so the requested tone comes first, then walks
   * the rest of the list bumping each one up by whole octaves until it
   * sits above the tone before it. A simple "shift the bottom N tones up
   * one octave" only works when every chord tone is within an octave of
   * its neighbor -- it silently breaks for extended chords whose top tone
   * sits *more* than an octave above the root (the 9th in an add9 chord,
   * 14 semitones up, or the \u266f11th in a maj7\u266f11 chord, 18 semitones
   * up): shifting the lower tones by a single octave isn't always enough
   * to lift them above a tone that was already voiced more than an octave
   * away, so the "wrong" tone would end up in the bass. Rotating first and
   * then normalizing each tone upward (by as many octaves as it actually
   * needs) guarantees the requested tone is always the one that lands in
   * the bass, for every chord quality this app teaches.
   */
  function invert(tones, requestedInversion) {
    const n = tones.length;
    const applied = Math.max(0, Math.min(requestedInversion, n - 1));
    const rotated = [];
    for (let i = 0; i < n; i++) rotated.push({ ...tones[(applied + i) % n] });
    for (let i = 1; i < rotated.length; i++) {
      while (rotated[i].midiNote <= rotated[i - 1].midiNote) rotated[i].midiNote += 12;
    }
    return { tones: rotated, appliedInversion: applied, bassRole: rotated[0].role, bassNoteName: rotated[0].noteName };
  }

  /** A short human label, e.g. "2nd inversion (G in the bass)". */
  function inversionLabel(appliedInversion, bassNoteName) {
    const name = INVERSION_NAMES[appliedInversion];
    return appliedInversion === 0 ? name : `${name} (${bassNoteName} in the bass)`;
  }

  // -------------------------------------------------------- progressions

  /**
   * Builds one progression's chords for `key` at `octave`, applying
   * `requestedInversion` to every chord (each chord caps it to its own
   * size -- a triad in a mostly-7th-chord progression simply maxes out at
   * its 2nd inversion). Works for both the jazz and gospel progression
   * lists below since they share the same { roman, name, semitoneFromKey,
   * quality } degree shape used throughout this file's other services.
   */
  function buildProgressionChords(progressionDef, key, octave, requestedInversion, preferFlats) {
    return progressionDef.degrees.map((degree) => {
      const degreeKey = {
        semitoneFromC: key.semitoneFromC + degree.semitoneFromKey,
        midiNoteForOctave(o) { return key.midiNoteForOctave(o) + degree.semitoneFromKey; },
      };
      const rootTones = buildChordTones(degreeKey, octave, degree.quality, preferFlats);
      const { tones, appliedInversion, bassNoteName } = invert(rootTones, requestedInversion);
      return {
        roman: degree.roman,
        name: degree.name,
        quality: degree.quality,
        qualityLabel: QUALITIES[degree.quality].displayName,
        chordName: `${rootTones[0].noteName} ${QUALITIES[degree.quality].suffix}`,
        inversionLabel: inversionLabel(appliedInversion, bassNoteName),
        appliedInversion,
        tones,
      };
    });
  }

  // Five jazz chord progressions, each drawing on the chord qualities
  // taught in this app's Chord lessons. Every one works, unchanged, in
  // all 12 keys, and every chord in every one of them can be played in
  // root position or any inversion it has.
  const JAZZ_PROGRESSIONS = [
    {
      id: 'major-ii-V-I',
      name: 'Major ii\u2013V\u2013I',
      label: 'ii7 \u2013 V7 \u2013 Imaj7',
      description: 'The single most common chord movement in jazz: a supertonic minor 7th (ii7) falls a 5th to a dominant 7th (V7), which falls another 5th to rest on the tonic major 7th (Imaj7). Almost every jazz standard contains at least one ii\u2013V\u2013I, in this key or another.',
      degrees: [
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
      ],
    },
    {
      id: 'turnaround-3-6-2-5',
      name: 'Turnaround (3\u20136\u20132\u20135)',
      label: 'iii7 \u2013 vi7 \u2013 ii7 \u2013 V7',
      description: 'A four-chord "turnaround" that walks the harmony back around to the top of the tune: iii7 falls a 5th to vi7, which falls a 5th to ii7, which falls a 5th to V7 -- three straight falling-5th moves, all built from minor 7th chords except the final dominant 7th.',
      degrees: [
        { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
        { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
    {
      id: 'passing-diminished',
      name: 'Passing Diminished',
      label: 'Imaj7 \u2013 \u266fIdim7 \u2013 ii7 \u2013 V7',
      description: 'A diminished 7th chord built on the raised tonic (\u266fIdim7) bridges the tonic major 7th to the ii7 chord with a smooth chromatic bass line (I \u2192 \u266fI \u2192 ii), a classic jazz voice-leading trick that reuses the diminished 7th chord as a passing chord rather than a destination.',
      degrees: [
        { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
        { roman: '\u266fIdim7', name: 'Raised-tonic diminished 7th', semitoneFromKey: 1, quality: 'diminished7' },
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
    {
      id: 'minor-ii-V-i',
      name: 'Minor ii\u2013V\u2013i',
      label: 'ii\u00f87 \u2013 V7 \u2013 i7',
      description: 'The minor-key cousin of the major ii\u2013V\u2013I: a half-diminished 7th on the supertonic (ii\u00f87 -- diatonic to the minor key, no borrowed notes) falls a 5th to a dominant 7th (V7), which resolves to the minor 7th tonic (i7). This is the harmonic engine behind countless minor-key jazz standards.',
      degrees: [
        { roman: 'ii\u00f87', name: 'Supertonic half-diminished 7th', semitoneFromKey: 2, quality: 'halfDiminished7' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        { roman: 'i7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'minor7' },
      ],
    },
    {
      id: 'jazz-blues-turnaround',
      name: 'Jazz Blues Turnaround',
      label: 'I7 \u2013 IV7 \u2013 ii7 \u2013 V7',
      description: 'A jazz-blues flavored turnaround built almost entirely from dominant 7th chords (I7 and IV7), with a ii7\u2013V7 tag at the end to pull the harmony back home -- the same "every chord wants to move" restlessness that gives the 12-bar blues its drive, compressed into four bars.',
      degrees: [
        { roman: 'I7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'dominant7' },
        { roman: 'IV7', name: 'Subdominant 7th', semitoneFromKey: 5, quality: 'dominant7' },
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
  ];

  // Five gospel chord progressions, drawing on the same chord qualities.
  // Gospel piano leans more on plain major/minor triads and dominant 7ths
  // than dense jazz voicings, plus the "borrowed" minor iv chord that
  // gives the classic plagal "Amen" cadence its bittersweet color.
  const GOSPEL_PROGRESSIONS = [
    {
      id: 'classic-gospel-turnaround',
      name: 'Classic Gospel Turnaround',
      label: 'I \u2013 vi \u2013 IV \u2013 V7',
      description: 'The quintessential gospel (and 1950s pop) progression: tonic (I), relative-minor (vi), subdominant (IV), and dominant 7th (V7) -- a warm, singable four-chord loop that has anchored gospel hymns and vamps for generations.',
      degrees: [
        { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
        { roman: 'IV', name: 'Subdominant', semitoneFromKey: 5, quality: 'major' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
    {
      id: 'amen-plagal-vamp',
      name: 'Amen Plagal Vamp',
      label: 'I \u2013 IV \u2013 iv \u2013 I',
      description: 'The "Amen cadence" (IV\u2013I, also called the plagal cadence) closes countless hymns; gospel players color it further by briefly borrowing the *minor* iv chord from the parallel minor key on the way back home (IV \u2192 iv \u2192 I), a bittersweet touch heard throughout gospel and soul.',
      degrees: [
        { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        { roman: 'IV', name: 'Subdominant', semitoneFromKey: 5, quality: 'major' },
        { roman: 'iv', name: 'Borrowed minor subdominant', semitoneFromKey: 5, quality: 'minor' },
        { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
      ],
    },
    {
      id: 'extended-gospel-turnaround',
      name: 'Extended Gospel Turnaround',
      label: 'iii7 \u2013 vi7 \u2013 ii7 \u2013 V7 \u2013 Imaj7',
      description: 'A five-chord "walk-back" turnaround popular in gospel vamps and shout choruses: three falling-5th minor 7ths (iii7\u2013vi7\u2013ii7) lead into a dominant 7th (V7) and land on a lush tonic major 7th (Imaj7), giving a simple hymn tag a jazzier, more churchy color.',
      degrees: [
        { roman: 'iii7', name: 'Mediant 7th', semitoneFromKey: 4, quality: 'minor7' },
        { roman: 'vi7', name: 'Submediant 7th', semitoneFromKey: 9, quality: 'minor7' },
        { roman: 'ii7', name: 'Supertonic 7th', semitoneFromKey: 2, quality: 'minor7' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        { roman: 'Imaj7', name: 'Tonic 7th', semitoneFromKey: 0, quality: 'major7' },
      ],
    },
    {
      id: 'minor-gospel-cadence',
      name: 'Minor Gospel Cadence',
      label: 'i \u2013 iv \u2013 V7 \u2013 i',
      description: 'A minor-key gospel cadence built from the natural minor\'s tonic (i) and subdominant (iv) triads, with a raised-leading-tone dominant 7th (V7, borrowed from the harmonic minor scale) pulling firmly back home -- the same "sharpened V7 in a minor key" sound heard in many minor-key hymns and spirituals.',
      degrees: [
        { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
        { roman: 'iv', name: 'Subdominant', semitoneFromKey: 5, quality: 'minor' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
        { roman: 'i', name: 'Tonic', semitoneFromKey: 0, quality: 'minor' },
      ],
    },
    {
      id: 'secondary-dominant-turnaround',
      name: 'Secondary Dominant Turnaround',
      label: 'I \u2013 III7 \u2013 vi \u2013 V7',
      description: 'A gospel-flavored turnaround that "tonicizes" the vi chord for a bar: III7 is a dominant 7th chord built a major 3rd above the tonic (borrowing its raised note from outside the key) that resolves down a 5th into vi, exactly the way V7 resolves into I -- before V7 pulls the whole progression back to the tonic.',
      degrees: [
        { roman: 'I', name: 'Tonic', semitoneFromKey: 0, quality: 'major' },
        { roman: 'III7', name: 'Secondary dominant of vi', semitoneFromKey: 4, quality: 'dominant7' },
        { roman: 'vi', name: 'Submediant', semitoneFromKey: 9, quality: 'minor' },
        { roman: 'V7', name: 'Dominant 7th', semitoneFromKey: 7, quality: 'dominant7' },
      ],
    },
  ];

  const service = {
    keys,
    qualities: QUALITIES,
    qualityOrder: QUALITY_ORDER,
    inversionNames: INVERSION_NAMES,
    noteNameFor,
    buildChordTones,
    invert,
    inversionLabel,
    buildProgressionChords,
    jazzProgressions: JAZZ_PROGRESSIONS,
    gospelProgressions: GOSPEL_PROGRESSIONS,
  };

  /**
   * Attaches one chord lesson's progression sets, as
   * `<name>JazzProgressions` and `<name>GospelProgressions`. Called by each
   * file in js/progressions/.
   */
  service.registerProgressions = (name, jazz, gospel) => {
    service[`${name}JazzProgressions`] = jazz;
    service[`${name}GospelProgressions`] = gospel;
  };

  return service;
})();
