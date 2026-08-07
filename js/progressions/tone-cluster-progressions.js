// tone-cluster-progressions.js
// The jazz and gospel progression sets for the toneCluster chord lesson.
// Data only — the builder that turns these into playable chords lives in
// js/inversion-service.js, which must be loaded first.

InversionService.registerProgressions(
  'toneCluster',
    // Five jazz chord progressions built around the Tone cluster.
  [
      {
        id: "tone-cluster-chord-hit-tonic",
        name: "Tone cluster Hit on the Tonic",
        label: "I – Tone cluster – I",
        description: "A percussive Tone cluster struck on the tonic as a rhythmic accent, then released back to the plain triad.",
        degrees: [
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
          { roman: "hit", name: "Percussive accent", semitoneFromKey: 0, quality: "toneCluster" },
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
        ],
      },
      {
        id: "tone-cluster-chord-turnaround-hits",
        name: "Turnaround with Tone cluster Accents",
        label: "ii7 – Tone cluster – V7 – I",
        description: "A ii–V–I turnaround with a Tone cluster struck as a percussive accent between the ii and V chords.",
        degrees: [
          { roman: "ii7", name: "Supertonic 7th", semitoneFromKey: 2, quality: "minor7" },
          { roman: "hit", name: "Percussive accent", semitoneFromKey: 2, quality: "toneCluster" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
        ],
      },
      {
        id: "tone-cluster-chord-blues-hit",
        name: "Blues Turnaround with Tone cluster Accent",
        label: "I7 – IV7 – Tone cluster – V7",
        description: "A blues turnaround with a Tone cluster struck as a dramatic accent right before the closing dominant.",
        degrees: [
          { roman: "I7", name: "Tonic 7th", semitoneFromKey: 0, quality: "dominant7" },
          { roman: "IV7", name: "Subdominant 7th", semitoneFromKey: 5, quality: "dominant7" },
          { roman: "hit", name: "Percussive accent", semitoneFromKey: 7, quality: "toneCluster" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
      {
        id: "tone-cluster-chord-vamp-hit",
        name: "Vamp with Tone cluster Punctuation",
        label: "I – IV – Tone cluster – I",
        description: "A subdominant vamp punctuated by a percussive Tone cluster right before returning to the tonic.",
        degrees: [
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
          { roman: "IV", name: "Subdominant", semitoneFromKey: 5, quality: "major" },
          { roman: "hit", name: "Percussive accent", semitoneFromKey: 5, quality: "toneCluster" },
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
        ],
      },
      {
        id: "tone-cluster-chord-minor-hit",
        name: "Minor Cadence with Tone cluster Accent",
        label: "i – Tone cluster – V7 – i",
        description: "A minor cadence with a Tone cluster struck as a percussive accent leading into the dominant.",
        degrees: [
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
          { roman: "hit", name: "Percussive accent", semitoneFromKey: 0, quality: "toneCluster" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
        ],
      },
    ],
    // Five gospel chord progressions built around the Tone cluster.
  [
      {
        id: "tone-cluster-chord-gospel-hit",
        name: "Gospel Hit with Tone cluster",
        label: "I – vi – Tone cluster – IV – V7",
        description: "A gospel progression punctuated by a percussive Tone cluster accent between the vi and IV chords.",
        degrees: [
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
          { roman: "vi", name: "Submediant", semitoneFromKey: 9, quality: "minor" },
          { roman: "hit", name: "Percussive accent", semitoneFromKey: 9, quality: "toneCluster" },
          { roman: "IV", name: "Subdominant", semitoneFromKey: 5, quality: "major" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
      {
        id: "tone-cluster-chord-amen-hit",
        name: "Amen Vamp with Tone cluster Accent",
        label: "I – IV – Tone cluster – I",
        description: "The classic plagal \"Amen\" vamp, punctuated by a percussive Tone cluster hit right before the final tonic.",
        degrees: [
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
          { roman: "IV", name: "Subdominant", semitoneFromKey: 5, quality: "major" },
          { roman: "hit", name: "Percussive accent", semitoneFromKey: 5, quality: "toneCluster" },
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
        ],
      },
      {
        id: "tone-cluster-chord-secondary-hit",
        name: "Secondary Turnaround with Tone cluster Accent",
        label: "I – Tone cluster – vi – V7",
        description: "A percussive Tone cluster punctuates the turnaround immediately after the tonic.",
        degrees: [
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
          { roman: "hit", name: "Percussive accent", semitoneFromKey: 0, quality: "toneCluster" },
          { roman: "vi", name: "Submediant", semitoneFromKey: 9, quality: "minor" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
        ],
      },
      {
        id: "tone-cluster-chord-extended-hit",
        name: "Extended Turnaround with Tone cluster Accent",
        label: "iii7 – vi7 – ii7 – Tone cluster – I",
        description: "A five-chord walk-back turnaround closing with a percussive Tone cluster hit just before landing on the tonic.",
        degrees: [
          { roman: "iii7", name: "Mediant 7th", semitoneFromKey: 4, quality: "minor7" },
          { roman: "vi7", name: "Submediant 7th", semitoneFromKey: 9, quality: "minor7" },
          { roman: "ii7", name: "Supertonic 7th", semitoneFromKey: 2, quality: "minor7" },
          { roman: "hit", name: "Percussive accent", semitoneFromKey: 2, quality: "toneCluster" },
          { roman: "I", name: "Tonic", semitoneFromKey: 0, quality: "major" },
        ],
      },
      {
        id: "tone-cluster-chord-minor-gospel-hit",
        name: "Minor Gospel Cadence with Tone cluster Accent",
        label: "i – Tone cluster – V7 – i",
        description: "A minor-key gospel cadence with a percussive Tone cluster accent leading into the dominant.",
        degrees: [
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
          { roman: "hit", name: "Percussive accent", semitoneFromKey: 0, quality: "toneCluster" },
          { roman: "V7", name: "Dominant 7th", semitoneFromKey: 7, quality: "dominant7" },
          { roman: "i", name: "Tonic", semitoneFromKey: 0, quality: "minor" },
        ],
      },
    ],
);
