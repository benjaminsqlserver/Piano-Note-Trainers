// piano-keyboard.js
// Vanilla-JS replacement for the original Blazor <PianoKeyboard> component.
// Renders a multi-octave piano keyboard as SVG, highlighting the tonic
// pitch class and whichever note is currently sounding, with an HTML label
// overlay (so labels scale cleanly with the SVG). Optionally clickable, so
// learners without MIDI hardware can still answer flashcard quizzes by
// tapping keys — on white keys only, or on every key, depending on the
// lesson.

const WHITE_KEY_WIDTH = 34;
const BLACK_KEY_WIDTH = 20;
const IS_BLACK_KEY = [false, true, false, true, false, false, true, false, true, false, true, false];
const NATURAL_LETTER = ['C', 'C', 'D', 'D', 'E', 'F', 'F', 'G', 'G', 'A', 'A', 'B'];

function pitchClass(midi) {
  return ((midi % 12) + 12) % 12;
}

/**
 * Creates a piano keyboard inside `container` and returns an object with an
 * `update(options)` method for re-rendering when state changes.
 *
 * options:
 *   lowestMidi        {number}  lowest MIDI note shown (a C is recommended)
 *   octaves           {number}  how many octaves to render
 *   activeNote        {number|null} MIDI note currently sounding/expected
 *   activeNotes       {number[]|null} multiple MIDI notes to highlight at
 *                      once (e.g. all the tones of a chord); combined with
 *                      activeNote if both are supplied
 *   tonicPitchClass   {number|null} pitch class (0-11) to tint as the tonic
 *   showLabels        {boolean} whether to draw note-name labels
 *   pitchClassLabels  {Object<number,string>|null} maps pitch class -> label
 *                      text; falls back to natural white-key letters only
 *   clickableWhite    {boolean} whether white keys respond to clicks
 *   clickableBlack    {boolean} whether black keys respond to clicks
 *   onKeyClick        {function(midi)} click handler
 */
function createPianoKeyboard(container, options) {
  const state = { ...options };

  function labelFor(midi) {
    const pc = pitchClass(midi);
    if (state.pitchClassLabels) {
      return Object.prototype.hasOwnProperty.call(state.pitchClassLabels, pc)
        ? state.pitchClassLabels[pc]
        : null;
    }
    return NATURAL_LETTER[pc];
  }

  function buildWhiteKeys() {
    const list = [];
    let x = 0;
    const total = state.octaves * 12 + 1;
    for (let i = 0; i < total; i++) {
      const midi = state.lowestMidi + i;
      const pc = pitchClass(midi);
      if (!IS_BLACK_KEY[pc]) {
        list.push({ midi, x });
        x += WHITE_KEY_WIDTH;
      }
    }
    return list;
  }

  function buildBlackKeys() {
    const list = [];
    let whiteX = 0;
    const total = state.octaves * 12 + 1;
    for (let i = 0; i < total; i++) {
      const midi = state.lowestMidi + i;
      const pc = pitchClass(midi);
      if (!IS_BLACK_KEY[pc]) {
        whiteX += WHITE_KEY_WIDTH;
      } else {
        list.push({ midi, x: whiteX - BLACK_KEY_WIDTH / 2 });
      }
    }
    return list;
  }

  function render() {
    const whiteKeys = buildWhiteKeys();
    const blackKeys = buildBlackKeys();
    const svgWidth = whiteKeys.length > 0 ? whiteKeys[whiteKeys.length - 1].x + WHITE_KEY_WIDTH : 700;
    const widthPct = (WHITE_KEY_WIDTH / svgWidth) * 100;
    const blackWidthPct = (BLACK_KEY_WIDTH / svgWidth) * 100;
    const leftPct = (x) => (x / svgWidth) * 100;

    const keyClass = (midi, isBlack) => {
      let cls = isBlack ? 'piano-key piano-key-black' : 'piano-key piano-key-white';
      const clickable = isBlack ? state.clickableBlack : state.clickableWhite;
      if (clickable) cls += ' piano-key-clickable';
      const pc = pitchClass(midi);
      const isActive = state.activeNote === midi || (Array.isArray(state.activeNotes) && state.activeNotes.includes(midi));
      if (isActive) cls += ' piano-key-active';
      else if (state.tonicPitchClass != null && pc === state.tonicPitchClass) cls += ' piano-key-tonic';
      return cls;
    };

    const labelClass = (midi, isBlack) => {
      let cls = isBlack ? 'piano-key-label piano-key-label-black' : 'piano-key-label';
      const isActive = state.activeNote === midi || (Array.isArray(state.activeNotes) && state.activeNotes.includes(midi));
      if (isActive) cls += ' piano-key-label-active';
      return cls;
    };

    const whiteRects = whiteKeys
      .map((wk) => `<rect data-midi="${wk.midi}" x="${wk.x}" y="0" width="${WHITE_KEY_WIDTH}" height="160" rx="4" class="${keyClass(wk.midi, false)}"></rect>`)
      .join('');

    const blackRects = blackKeys
      .map((bk) => `<rect data-midi="${bk.midi}" x="${bk.x}" y="0" width="${BLACK_KEY_WIDTH}" height="100" rx="3" class="${keyClass(bk.midi, true)}"></rect>`)
      .join('');

    let labelsHtml = '';
    if (state.showLabels) {
      labelsHtml += whiteKeys
        .map((wk) => {
          const label = labelFor(wk.midi);
          if (label == null) return '';
          return `<div class="${labelClass(wk.midi, false)}" style="left:${leftPct(wk.x)}%;width:${widthPct}%;">${label}</div>`;
        })
        .join('');
      labelsHtml += blackKeys
        .map((bk) => {
          const label = labelFor(bk.midi);
          if (label == null) return '';
          return `<div class="${labelClass(bk.midi, true)}" style="left:${leftPct(bk.x)}%;width:${blackWidthPct}%;">${label}</div>`;
        })
        .join('');
    }

    container.innerHTML = `
      <div class="piano-wrap">
        <div class="piano-inner">
          <svg viewBox="0 0 ${svgWidth} 170" class="piano-svg" xmlns="http://www.w3.org/2000/svg">
            ${whiteRects}
            ${blackRects}
          </svg>
          ${labelsHtml}
        </div>
      </div>`;

    const svg = container.querySelector('svg');
    svg.addEventListener('click', (evt) => {
      const target = evt.target;
      if (target.tagName !== 'rect') return;
      const midi = Number(target.getAttribute('data-midi'));
      const isBlack = target.classList.contains('piano-key-black');
      const clickable = isBlack ? state.clickableBlack : state.clickableWhite;
      if (clickable && state.onKeyClick) state.onKeyClick(midi);
    });
  }

  function update(newOptions) {
    Object.assign(state, newOptions);
    render();
  }

  render();
  return { update };
}
