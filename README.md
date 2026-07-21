# Piano Note Trainers

A consolidated, framework-free web app that teaches the letter names of
every piano key through four short, focused lessons, each with guided
playback and a flashcard quiz.

This app is a JavaScript (HTML/CSS/JS) rewrite and consolidation of four
originally separate Blazor WebAssembly + Radzen.Blazor projects
(`WhiteKeyNamesTrainer`, `SharpKeyNamesTrainer`, `FlatKeyNamesTrainer`, and
`ChromaticMidiTrainer`) into a single static site with shared navigation,
shared styling, and a shared audio/MIDI engine. It uses **plain JavaScript
only** — no Blazor, no Radzen components, no build step, and no external
JavaScript framework.

Every lesson displays notes on the same full **8-octave keyboard (C0–C8)**
rather than a lesson-specific zoomed-in slice, so learners can always see
where a note sits on a real, full-size piano. This applies to every guided
trainer, flashcard quiz, improvisation demo, and learn-tab keyboard across
all lessons — current and future.

## Step through playback, silently

Every "▶ Play ..." button in this app (Circle of Fourths, Chord
Progression, Jazz/Gospel Progression, guided note/scale sequences,
improvisation demos, and hymn song players) has a matching
**"⏭ Step (no sound)"** button right beside it. Instead of auto-playing
the whole sequence with audio, Step advances exactly one note or chord at
a time — updating the keyboard highlight, the "now playing" labels, and
the current table row — without making any sound at all. It's for
studying the shape of a chord or the notes of a progression at your own
pace, one click per note, with no MIDI device or speakers required. Step
is disabled (a no-op) while a sequence is auto-playing, and wraps back to
the start once it reaches the end.

The one place this differs is each lesson's **Learn** tab for scales,
plain chords, and the Chord Inversions lesson: those already have a
built-in step-by-step "▶ Play next step" (or equivalent) button as part
of the tutorial itself, which deliberately *does* play each note aloud —
that's the point of a Learn tab. The Chord Inversions lesson's Learn tab
additionally now has its own **silent** "⏭ Step through notes (no
sound)" button beside its single "Play this inversion" button, since that
tab (unlike the individual chord lessons) only ever played the whole
chord together and had no note-by-note option at all before.

## Lessons

| # | Lesson | What it teaches |
|---|--------|------------------|
| 1 | **White Keys** (`white-key-trainer.html`) | The 7 natural letter names — A, B, C, D, E, F, G |
| 2 | **Sharp Keys** (`sharp-key-trainer.html`) | What a sharp (♯) is, all 7 sharp keys, and the two enharmonic exceptions (B♯ = C, E♯ = F) |
| 3 | **Flat Keys** (`flat-key-trainer.html`) | What a flat (♭) is, all 7 flat keys, and the two enharmonic exceptions (C♭ = B, F♭ = E) |
| 4 | **Chromatic & Solfa** (`chromatic-trainer.html`) | The ascending/descending chromatic scale in all 12 keys, with movable-do solfa syllables |
| 5 | **Major Scale** (`major-scale-trainer.html`) | The major (Ionian) scale in all 12 keys, plus an Improvisation Demo tab that plays a short, original scale-based melodic pattern from a real MIDI file in each key |
| 6 | **Dorian Scale** (`dorian-scale-trainer.html`) | The Dorian mode (natural minor with a raised 6th) in all 12 keys, plus an Improvisation Demo tab that plays a short, original scale-based melodic pattern from a real MIDI file in each key |
| 7 | **Phrygian Scale** (`phrygian-scale-trainer.html`) | The Phrygian mode (natural minor with a lowered 2nd) in all 12 keys, plus an Improvisation Demo tab that plays a short, original scale-based melodic pattern from a real MIDI file in each key |
| 8 | **Major Chords** (`major-chord-trainer.html`) | How a major triad is built by counting semitones (root, +4 to the 3rd, +3 more to the 5th), plus two MIDI exercises: all 12 major chords around the circle of fourths, and a pleasant I‑IV‑V‑I chord progression played in every key |
| 9 | **Minor Chords** (`minor-chord-trainer.html`) | How a minor triad is built by counting semitones (root, +3 to the 3rd, +4 more to the 5th), plus two MIDI exercises: all 12 minor chords around the circle of fourths, and a pleasant i‑iv‑v‑i chord progression (built from the natural minor scale) played in every key |
| 10 | **Augmented Chords** (`augmented-chord-trainer.html`) | How an augmented triad is built by counting semitones (root, +4 to the 3rd, +4 more to the raised 5th), plus MIDI exercises played in every key |
| 11 | **Diminished Chords** (`diminished-chord-trainer.html`) | How a diminished triad is built by counting semitones (root, +3 to the 3rd, +3 more to the lowered 5th), plus two MIDI exercises: all 12 diminished chords around the circle of fourths, and a I‑IV‑♯ivdim‑V progression in every key |
| 12 | **Power in the Blood — Song Trainer** (`power-in-the-blood-trainer.html`) | The classic gospel hymn "There Is Power in the Blood" (Lewis E. Jones, 1899) arranged for two hands: the hymn's real melody in the right hand, and a new left-hand accompaniment mixing major and minor triads (I, ii, IV, V, vi), played from a real two-channel MIDI file in every key |
| 13 | **Dominant 7th Chords** (`dominant-seventh-chord-trainer.html`) | How every dominant 7th chord is built by counting semitones (root, +4 to the 3rd, +3 more to the 5th, +3 more to the ♭7th), plus two MIDI exercises: all 12 dominant 7th chords around the circle of fourths, and a classic blues-style I7‑IV7‑V7‑I7 turnaround in every key |
| 14 | **Diminished 7th Chords** (`diminished-seventh-chord-trainer.html`) | How every fully-diminished 7th chord is built from three stacked minor 3rds (root, +3, +3, +3), plus two MIDI exercises: all 12 diminished 7th chords around the circle of fourths, and a I‑V7‑vii°7‑I cadence — showing how the diminished 7th functions as a dominant substitute — in every key |
| 15 | **Minor 7th Chords** (`minor-seventh-chord-trainer.html`) | How every minor 7th chord is built by counting semitones (root, +3 to the 3rd, +4 more to the 5th, +3 more to the ♭7th), plus two MIDI exercises: all 12 minor 7th chords around the circle of fourths, and a natural-minor i7‑iv7‑v7‑i7 progression in every key |
| 16 | **Major 7th Chords** (`major-seventh-chord-trainer.html`) | How every major 7th chord is built by counting semitones (root, +4 to the 3rd, +3 more to the 5th, +4 more to the 7th), plus two MIDI exercises: all 12 major 7th chords around the circle of fourths, and a classic jazz/gospel Imaj7‑vi7‑ii7‑V7 turnaround in every key |
| 17 | **Half-Diminished 7th Chords** (`half-diminished-seventh-chord-trainer.html`) | How every half-diminished 7th (m7♭5) chord is built from a diminished triad plus a minor 7th (root, +3, +3, +4), plus two MIDI exercises: all 12 half-diminished 7th chords around the circle of fourths, and a I‑V7‑vii°7‑I cadence showing its diatonic leading-tone role, in every key |
| 18 | **His Eye Is on the Sparrow — Song Trainer** (`his-eye-on-the-sparrow-trainer.html`) | The classic gospel hymn "His Eye Is on the Sparrow" (Civilla D. Martin & Charles H. Gabriel, 1905), played from its real, unaltered source arrangement (melody + accompaniment, both hands, from the original two-channel MIDI file) in every key — the song lesson whose harmony motivated Lessons 13-17, since its arrangement uses all five 7th-chord types they teach (dominant 7th, diminished 7th, minor 7th, major 7th, and half-diminished 7th) |
| 20 | **6th Chords** (`sixth-chord-trainer.html`) | How every 6th chord is built by counting semitones (root, +4 to the major 3rd, +3 more to the perfect 5th, +2 more to the major 6th) — a major triad plus a major 6th, never a 7th of any kind — plus three MIDI exercises: all 12 6th chords around the circle of fourths, and 5 jazz chord progressions plus 5 gospel chord progressions built around the 6th chord's warm, "at rest" tonic color, in every key |
| 21 | **Minor 6th Chords** (`minor-sixth-chord-trainer.html`) | How every minor 6th chord is built by counting semitones (root, +3 to the minor 3rd, +4 more to the perfect 5th, +2 more to the major 6th) — a minor triad plus a *major* 6th, giving it a bittersweet color and the same four notes as a half-diminished 7th chord on its 6th degree — plus three MIDI exercises: all 12 minor 6th chords around the circle of fourths, and 5 jazz chord progressions plus 5 gospel chord progressions built around the minor 6th chord, in every key |
| 22 | **Chord Inversions** (`inversions-trainer.html`) | What a chord inversion is, the different types of inversion (root position, 1st, 2nd, 3rd for 4-note chords, and 4th for the 5-note major 7th♯11 chord), and how to build one for every chord type taught in Lessons 8-11, 13-17, 20-21, 23, 24 & 25, plus two MIDI exercises: 5 jazz chord progressions and 5 gospel chord progressions, each playable in a chosen inversion, in a single key or cycled through all 12 |
| 23 | **Augmented 7th Chords** (`augmented-seventh-chord-trainer.html`) | How every augmented 7th chord — also known as 7♯5, +7, dominant 7♯5, C7♯5, C+7, C7+, augmented dominant seventh, or dominant seventh augmented — is built by counting semitones (a dominant 7th chord with its 5th raised a semitone), plus three MIDI exercises: all 12 augmented 7th chords around the circle of fourths, and 5 jazz plus 5 gospel chord progressions built around this altered dominant, in every key |
| 24 | **Major 7th♭5 Chords** (`major-seventh-flat-five-chord-trainer.html`) | How every major 7th flat 5 chord — also known as maj7♭5, M7♭5, or Δ7♭5 — is built by counting semitones (a major 7th chord with its 5th lowered a semitone), plus three MIDI exercises: all 12 maj7♭5 chords around the circle of fourths, and 5 jazz plus 5 gospel chord progressions built around this unsettled, floating color, in every key |
| 25 | **Major 7th♯11 Chords** (`major-seventh-sharp-eleven-chord-trainer.html`) | How every major 7th sharp 11 chord — also known as maj7♯11, M7♯11, or Δ7♯11 — is built by counting semitones (a major 7th chord plus a raised 11th stacked on top — the first 5-note chord in this app), plus three MIDI exercises: all 12 maj7♯11 chords around the circle of fourths, and 5 jazz plus 5 gospel chord progressions built around this bright, "Lydian" color, in every key |

Each lesson page includes:

- A **Guided Trainer** (or, for the chromatic lesson, a single trainer view) — pick a
  starting note, octave, span, direction, and tempo, then play the sequence
  through the built-in synthesizer or a connected MIDI device, highlighted on
  an on-screen piano keyboard. An optional **Practice mode** listens to a
  real MIDI keyboard and only advances when you play the correct note.
- A **Flashcard Quiz** — "Name the key" (a key lights up, you pick the
  letter) or "Find the key" (a letter is shown, you click the matching key),
  with a running score and streak.
- The Sharp and Flat lessons additionally include a **Learn** tab with a
  plain-language explanation and an interactive explorer.
- The Major Scale lesson additionally includes an **Improvisation Demo**
  tab: pick any of the 12 keys and it loads a short, original MIDI file (a
  diatonic "1‑3‑5‑8‑5‑3‑1, 2‑4‑6‑8‑6‑4‑2" sequence-in-thirds pattern built
  entirely from that key's major scale) with a dependency-free in-browser
  MIDI file reader, then plays it back — through the built-in synth or a
  connected MIDI device — highlighted on the keyboard in sync, with an
  adjustable playback-speed slider.
- The Dorian Scale lesson works the same way, with its own Improvisation
  Demo tab built from a "1‑3‑5‑8‑5‑3‑1, 2‑4‑6‑8‑6‑4‑2" pattern in each key's
  Dorian scale — the natural 6th degree is what gives the Dorian mode its
  distinctive brighter-than-minor sound.
- The Phrygian Scale lesson works the same way too, with its own
  Improvisation Demo tab built from a "1‑3‑5‑8‑5‑3‑1, 2‑4‑6‑8‑6‑4‑2" pattern
  in each key's Phrygian scale — the lowered 2nd degree is what gives the
  Phrygian mode its distinctive darker, Spanish/exotic-sounding character.
- The Major Chords lesson has a **Learn** tab that walks through building a
  major triad one semitone-count at a time (root → +4 semitones → major 3rd
  → +3 more semitones → perfect 5th), plus a table of all 12 major triads.
  Its two exercise tabs are both MIDI exercises played through the same
  synth/MIDI-output engine every lesson uses: **Circle of Fourths**, which
  plays all 12 major chords in sequence (C → F → B♭ → E♭ → A♭ → D♭ → G♭/F♯ →
  B → E → A → D → G → C), and **Chord Progression**, which plays a pleasant
  four-chord I‑IV‑V‑I progression — built entirely from major triads — in
  a chosen key or cycled through all 12 keys.
- The Minor Chords lesson works the same way, with a **Learn** tab that
  walks through building a minor triad one semitone-count at a time
  (root → +3 semitones → minor 3rd → +4 more semitones → perfect 5th) —
  the same 7-semitone root-to-5th span as a major triad, but with the 3rd
  pulled down one semitone — plus a table of all 12 minor triads. Its
  **Circle of Fourths** exercise plays all 12 minor chords in the same
  C → F → B♭ → E♭ → A♭ → D♭ → G♭/F♯ → B → E → A → D → G → C sequence, and
  its **Chord Progression** exercise plays a pleasant four-chord i‑iv‑v‑i
  progression built from each key's natural (Aeolian) minor scale — which
  is what keeps the v chord minor instead of major — in a chosen key or
  cycled through all 12 keys.
- The Augmented and Diminished Chords lessons follow the same Learn +
  Circle of Fourths + Chord Progression pattern as the Major and Minor
  Chords lessons, for augmented (root, +4, +4) and diminished
  (root, +3, +3) triads respectively.
- The **Power in the Blood — Song Trainer** lesson is the first lesson
  built around a real song rather than a scale or chord shape. Its **Learn**
  tab explains the two-hand split (right hand = melody, left hand = chords)
  and shows the full left-hand chord chart, color-coded major vs. minor, for
  any of the 12 keys. Its **Song Player** tab loads a purpose-built,
  two-channel MIDI file for the chosen key (right-hand melody on channel 0,
  left-hand chords on channel 1) through the same dependency-free MIDI file
  reader the scale lessons use, then plays both hands together — through
  the built-in synth or a connected MIDI device — highlighting the melody
  and chord notes in different colors on the keyboard as they sound, with
  an adjustable playback-speed slider.
- The **Dominant 7th**, **Diminished 7th**, **Minor 7th**, **Major 7th**, and
  **Half-Diminished 7th Chords** lessons all follow the same Learn + Circle
  of Fourths + Chord Progression pattern as the Major, Minor, Augmented,
  and Diminished Chords lessons, but for 4-note chords instead of 3-note
  triads: dominant 7th (root, +4, +3, +3), fully-diminished 7th (root, +3,
  +3, +3), minor 7th (root, +3, +4, +3), major 7th (root, +4, +3, +4), and
  half-diminished 7th (root, +3, +3, +4). Each Chord Progression exercise
  showcases its chord in a realistic role: Dominant 7th's is an
  all-dominant-7th blues turnaround (I7‑IV7‑V7‑I7); Minor 7th's is the
  natural-minor mirror (i7‑iv7‑v7‑i7); Diminished 7th's and Half-Diminished
  7th's are deliberately parallel mixed-quality cadences
  (I‑V7‑vii°7‑I vs. I‑V7‑vii&#248;7‑I) contrasting the chromatically-borrowed
  fully-diminished leading-tone chord with the scale's own diatonic
  half-diminished one; and Major 7th's is a classic jazz/gospel
  circle-of-fifths turnaround (Imaj7‑vi7‑ii7‑V7). These five lessons exist
  because the His Eye Is on the Sparrow Song Trainer's real hymn
  arrangement uses all five chord types and this app hadn't taught any of
  them yet.
- The **His Eye Is on the Sparrow — Song Trainer** lesson follows the same
  two-tab pattern as Power in the Blood, but keeps the source hymn
  arrangement completely unaltered (melody *and* accompaniment both taken
  note-for-note from the original two-channel MIDI file, only transposed
  into each of the 12 keys) rather than re-harmonizing the accompaniment
  from scratch. Its **Learn** tab shows a harmonic analysis of that
  unaltered arrangement — a chord chart spanning major, minor, and all
  five 7th-chord qualities taught in Lessons 13-17, color-coded by
  quality — and its **Song Player** tab plays both hands together exactly
  as Power in the Blood's does.

- The **6th Chords** and **Minor 6th Chords** lessons follow the same
  Learn + Circle of Fourths pattern as the earlier triad and 7th-chord
  lessons, but for a 4-note chord that is neither a triad nor a 7th
  chord: a 6th chord (root, +4, +3, +2) and a minor 6th chord
  (root, +3, +4, +2) both stack a *major* 6th on top of their triad
  rather than a 7th of any kind — which is exactly why 6th chords never
  pull toward another chord the way 7th chords do, and are instead
  prized as a warm (or, in the minor 6th's case, bittersweet) "at rest"
  tonic color, often the very last chord of a jazz or gospel tune. Each
  lesson replaces the earlier single-progression **Chord Progression**
  exercise with two progression-picker exercises of its own, **Jazz
  Progressions** and **Gospel Progressions**, each offering 5 real
  progressions built around that lesson's chord — mostly using it as a
  tonic substitute for a plain triad or major/minor 7th chord — playable
  in a chosen key or cycled through all 12.

- The **Chord Inversions** lesson's **Learn** tab explains what an
  inversion is (the same chord tones, reordered so a different tone sits
  in the bass), the inversion types (root position, 1st, 2nd, 3rd for
  4-note chords, and — for the 5-note major 7th♯11 chord only — a 4th),
  slash-chord notation, and an interactive builder covering every chord
  type taught in Lessons 8-11, 13-17, 20-21, 23, 24 & 25. Its **All Chord
  Types** tab is a clickable reference table of every quality's every
  inversion in a chosen key — including the maj7♯11 chord's 4th inversion,
  since that tab loops over each quality's own note count rather than a
  fixed number. Its two chord-progression exercises — **Jazz
  Progressions** and **Gospel Progressions** — each offer 5 real
  progressions built from those same chord qualities; pick a progression
  and an inversion (applied to every chord in it, capped per-chord where a
  triad can't reach a 3rd inversion) and play it in one key or cycle
  through all 12.

- The **Augmented 7th Chords** lesson follows the same Learn + Circle of
  Fourths + Jazz/Gospel Progressions pattern as the 6th Chord lessons, for
  a 4-note chord also known as **7♯5**, **+7**, **dominant 7♯5**,
  **C7♯5**, **C+7**, **C7+**, **augmented dominant seventh**, or
  **dominant seventh augmented** (root, +4, +4, +2) — a dominant 7th chord
  with its perfect 5th raised a semitone to an augmented 5th. That raised
  5th pulls outward instead of settling, giving this "altered dominant" an
  even stronger pull toward its tonic than a plain dominant 7th, which is
  exactly why jazz and gospel pianists reach for it as a spicier
  substitute for V7 wherever a dominant chord resolves down a 5th. Its
  **Jazz Progressions** and **Gospel Progressions** tabs each offer 5 real
  progressions showcasing it in that altered-dominant role, playable in a
  chosen key or cycled through all 12.

- The **Major 7th♭5 Chords** lesson follows the same Learn + Circle of
  Fourths + Jazz/Gospel Progressions pattern as the Augmented 7th Chords
  lesson, for a 4-note chord also known as **maj7♭5**, **M7♭5**, or
  **Δ7♭5** (root, +4, +2, +5) — a major 7th chord with its perfect 5th
  lowered a semitone to a diminished 5th. That lowered 5th gives the
  chord an unsettled, "floating" color instead of the repose a plain
  major 7th chord has, which is exactly why jazz and gospel pianists
  reach for it as a chromatic passing chord or a spicier substitute
  wherever a major 7th chord would otherwise sit. Its **Jazz
  Progressions** and **Gospel Progressions** tabs each offer 5 real
  progressions showcasing it in that role, playable in a chosen key or
  cycled through all 12.

- The **Major 7th♯11 Chords** lesson follows the same Learn + Circle of
  Fourths + Jazz/Gospel Progressions pattern, for a chord also known as
  **maj7♯11**, **M7♯11**, or **Δ7♯11** (root, +4, +3, +4, +7) — the first
  **5-note** chord in this app: a complete major 7th chord (root, 3rd,
  5th, major 7th) with a raised 11th stacked on top, an octave and a
  tritone above the root. A plain (unraised) 11th would clash hard
  against the major 3rd a semitone below it, so the 11th is raised
  instead, removing the clash and adding a bright, shimmering "Lydian"
  lift — the same color a major scale's own 4th degree naturally
  produces when it becomes the root of its own chord, which is why jazz
  and gospel pianists reach for a maj7♯11 wherever a major 7th chord
  would otherwise sit, especially on the subdominant (IV) degree. Its
  **Jazz Progressions** and **Gospel Progressions** tabs each offer 5
  real progressions showcasing it in that role, playable in a chosen key
  or cycled through all 12. The **Chord Inversions** lesson (Lesson 22)
  has also been updated to include both this chord type and the major
  7th♭5 chord in its Learn tab, All Chord Types reference table, and
  per-chord max-inversion logic — since the maj7♯11 chord has 5 notes
  (not 4), it's the first chord type with a genuine 4th inversion, which
  the All Chord Types reference tab lists in full even though the
  Learn tab's quick picker and recipe table (like every other control in
  this lesson) top out at the 3rd.

The home page (`index.html`) is a landing page with an interactive
hero keyboard and cards linking to each lesson.

## Project structure

```
PianoNoteTrainers/
├─ index.html                  # Home page (required entry point)
├─ white-key-trainer.html       # Lesson 1
├─ sharp-key-trainer.html       # Lesson 2
├─ flat-key-trainer.html        # Lesson 3
├─ chromatic-trainer.html       # Lesson 4
├─ major-scale-trainer.html     # Lesson 5
├─ dorian-scale-trainer.html    # Lesson 6
├─ phrygian-scale-trainer.html  # Lesson 7
├─ major-chord-trainer.html     # Lesson 8
├─ minor-chord-trainer.html     # Lesson 9
├─ augmented-chord-trainer.html # Lesson 10
├─ diminished-chord-trainer.html # Lesson 11
├─ power-in-the-blood-trainer.html # Lesson 12
├─ dominant-seventh-chord-trainer.html # Lesson 13
├─ diminished-seventh-chord-trainer.html # Lesson 14
├─ minor-seventh-chord-trainer.html # Lesson 15
├─ major-seventh-chord-trainer.html # Lesson 16
├─ half-diminished-seventh-chord-trainer.html # Lesson 17
├─ his-eye-on-the-sparrow-trainer.html # Lesson 18
├─ sixth-chord-trainer.html     # Lesson 20
├─ minor-sixth-chord-trainer.html # Lesson 21
├─ inversions-trainer.html      # Lesson 22
├─ augmented-seventh-chord-trainer.html # Lesson 23
├─ major-seventh-flat-five-chord-trainer.html # Lesson 24
├─ major-seventh-sharp-eleven-chord-trainer.html # Lesson 25
├─ css/
│  └─ styles.css                # Shared, responsive design system
├─ js/
│  ├─ nav.js                    # Shared responsive navigation bar
│  ├─ tabs.js                   # Shared tab / segmented-control helper
│  ├─ audio-engine.js           # Shared WebAudio synth + Web MIDI wrapper
│  ├─ piano-keyboard.js         # Shared SVG piano keyboard renderer (fixed 8-octave range, C0–C8, on every lesson)
│  ├─ music-services.js         # Shared music-theory data (white/sharp/flat/chromatic/major/Dorian/Phrygian scale + major/minor/augmented/diminished + 6th + 7th chords + augmented 7th + major 7th♭5 + major 7th♯11 + inversions/progressions)
│  ├─ progression-picker.js     # Shared root-position-only progression-picker exercise (Jazz/Gospel tabs on Lessons 20-21, 23, 24 & 25)
│  ├─ midi-file-reader.js       # Dependency-free Standard MIDI File (.mid) reader (tags each note with its source MIDI channel)
│  ├─ midi-data.js              # Base64-embedded improvisation-demo + song MIDI data (major + Dorian + Phrygian + Power in the Blood + His Eye Is on the Sparrow)
│  ├─ home.js                   # Home page hero keyboard
│  ├─ white-trainer.js          # Lesson 1 page logic
│  ├─ accidental-trainer.js     # Shared logic for Lessons 2 & 3 (sharp/flat)
│  ├─ chromatic-trainer.js      # Lesson 4 page logic
│  ├─ major-scale-trainer.js    # Lesson 5 page logic (guided trainer + improvisation demo)
│  ├─ dorian-scale-trainer.js   # Lesson 6 page logic (guided trainer + improvisation demo)
│  ├─ phrygian-scale-trainer.js # Lesson 7 page logic (guided trainer + improvisation demo)
│  ├─ major-chord-trainer.js    # Lesson 8 page logic (learn tab + circle-of-fourths & chord-progression MIDI exercises)
│  ├─ minor-chord-trainer.js    # Lesson 9 page logic
│  ├─ augmented-chord-trainer.js # Lesson 10 page logic
│  ├─ diminished-chord-trainer.js # Lesson 11 page logic
│  ├─ power-in-the-blood-trainer.js # Lesson 12 page logic (learn tab + two-hand Song Player)
│  ├─ dominant-seventh-chord-trainer.js # Lesson 13 page logic
│  ├─ diminished-seventh-chord-trainer.js # Lesson 14 page logic
│  ├─ minor-seventh-chord-trainer.js # Lesson 15 page logic
│  ├─ major-seventh-chord-trainer.js # Lesson 16 page logic
│  ├─ half-diminished-seventh-chord-trainer.js # Lesson 17 page logic
│  ├─ his-eye-on-the-sparrow-trainer.js # Lesson 18 page logic (learn tab + two-hand Song Player)
│  ├─ sixth-chord-trainer.js    # Lesson 20 page logic (learn tab + circle-of-fourths + jazz & gospel progression-picker exercises)
│  ├─ minor-sixth-chord-trainer.js # Lesson 21 page logic (learn tab + circle-of-fourths + jazz & gospel progression-picker exercises)
│  ├─ inversions-trainer.js     # Lesson 22 page logic (learn tab + all-chord-types reference + jazz & gospel progression exercises)
│  ├─ augmented-seventh-chord-trainer.js # Lesson 23 page logic (learn tab + circle-of-fourths + jazz & gospel progression-picker exercises)
│  ├─ major-seventh-flat-five-chord-trainer.js # Lesson 24 page logic (learn tab + circle-of-fourths + jazz & gospel progression-picker exercises)
│  └─ major-seventh-sharp-eleven-chord-trainer.js # Lesson 25 page logic (learn tab + circle-of-fourths + jazz & gospel progression-picker exercises)
├─ midi/                        # Sample MIDI files for Lessons 5-7, 12 & 18's playback (one per key each; Lessons 12 & 18's files each carry melody on channel 0 and chords/accompaniment on channel 1)
├─ LICENSE                      # MIT License
└─ README.md                    # This file
```

## Running it

No build step, server, package manager, or internet connection is required.
Every script is a plain classic JavaScript file (no ES modules, no bundler),
so the app runs by simply **double-clicking `index.html`** (or right-click →
Open with → your browser). It works straight from the file system.

You can also deploy the folder as-is to any static file host (GitHub Pages,
Netlify, Vercel, Azure Static Web Apps, S3, nginx, etc.) if you'd rather
serve it over HTTP — nothing needs to change either way.

## Browser support

- Playback works in **any modern browser** via the built-in WebAudio
  synthesizer — no MIDI hardware required.
- Connecting a real MIDI keyboard (for output or Practice mode input)
  requires the **Web MIDI API**, currently supported in Chromium-based
  browsers (Chrome, Edge, Opera, Brave). Firefox and Safari will
  automatically fall back to the built-in synth with a notice shown on the
  page.

## Responsive design

The layout, navigation, controls, and piano keyboard are all built with
fluid, relative units and CSS breakpoints so the app is usable on phones,
tablets, and desktops:

- The top navigation collapses into a hamburger menu below 760px wide.
- Form controls wrap and resize on narrow screens.
- The piano keyboard is an SVG that always renders the **full 8-octave
  range (C0–C8)**, on every lesson, so learners always see where a note
  sits on a real, full-size keyboard rather than a lesson-specific zoomed-in
  slice. On narrower screens the keyboard scrolls horizontally instead of
  shrinking keys down to an unreadable size — the keyboard container has a
  minimum width that keeps keys and labels legible and tappable, with
  `overflow-x: auto` so you can scroll to any register.

## Credits

Developed by **HepziBen Technologies Limited**. Released under the
[MIT License](./LICENSE).

Consolidated from, and replaces, the following original Blazor/Radzen
projects: `WhiteKeyNamesTrainer`, `SharpKeyNamesTrainer`,
`FlatKeyNamesTrainer`, and `ChromaticMidiTrainer`.
