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
├─ css/
│  └─ styles.css                # Shared, responsive design system
├─ js/
│  ├─ nav.js                    # Shared responsive navigation bar
│  ├─ tabs.js                   # Shared tab / segmented-control helper
│  ├─ audio-engine.js           # Shared WebAudio synth + Web MIDI wrapper
│  ├─ piano-keyboard.js         # Shared SVG piano keyboard renderer
│  ├─ music-services.js         # Shared music-theory data (white/sharp/flat/chromatic)
│  ├─ home.js                   # Home page hero keyboard
│  ├─ white-trainer.js          # Lesson 1 page logic
│  ├─ accidental-trainer.js     # Shared logic for Lessons 2 & 3 (sharp/flat)
│  └─ chromatic-trainer.js      # Lesson 4 page logic
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
