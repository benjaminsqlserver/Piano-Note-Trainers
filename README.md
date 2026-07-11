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
├─ css/
│  └─ styles.css                # Shared, responsive design system
├─ js/
│  ├─ nav.js                    # Shared responsive navigation bar
│  ├─ tabs.js                   # Shared tab / segmented-control helper
│  ├─ audio-engine.js           # Shared WebAudio synth + Web MIDI wrapper
│  ├─ piano-keyboard.js         # Shared SVG piano keyboard renderer
│  ├─ music-services.js         # Shared music-theory data (white/sharp/flat/chromatic/major/Dorian/Phrygian scale + major chords)
│  ├─ midi-file-reader.js       # Dependency-free Standard MIDI File (.mid) reader
│  ├─ midi-data.js              # Base64-embedded improvisation-demo MIDI data (major + Dorian + Phrygian)
│  ├─ home.js                   # Home page hero keyboard
│  ├─ white-trainer.js          # Lesson 1 page logic
│  ├─ accidental-trainer.js     # Shared logic for Lessons 2 & 3 (sharp/flat)
│  ├─ chromatic-trainer.js      # Lesson 4 page logic
│  ├─ major-scale-trainer.js    # Lesson 5 page logic (guided trainer + improvisation demo)
│  ├─ dorian-scale-trainer.js   # Lesson 6 page logic (guided trainer + improvisation demo)
│  ├─ phrygian-scale-trainer.js # Lesson 7 page logic (guided trainer + improvisation demo)
│  └─ major-chord-trainer.js    # Lesson 8 page logic (learn tab + circle-of-fourths & chord-progression MIDI exercises)
├─ midi/                        # Sample MIDI files for Lessons 5, 6 & 7's Improvisation Demos (one per key each)
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
- The piano keyboard is an SVG that scales to its container width, so it
  stays legible from small phones up to wide desktop monitors.

## Credits

Developed by **HepziBen Technologies Limited**. Released under the
[MIT License](./LICENSE).

Consolidated from, and replaces, the following original Blazor/Radzen
projects: `WhiteKeyNamesTrainer`, `SharpKeyNamesTrainer`,
`FlatKeyNamesTrainer`, and `ChromaticMidiTrainer`.
