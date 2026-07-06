// tabs.js
// Small shared helper that wires up the .tabbar / .tabpanel markup used on
// pages with multiple lesson sections (Learn / Guided Trainer / Flashcard
// Quiz). No dependencies.

function initTabs(root = document) {
  const buttons = root.querySelectorAll('.tabbar [data-tab]');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');
      const bar = btn.closest('.tabbar');
      bar.querySelectorAll('[data-tab]').forEach((b) => {
        b.classList.toggle('is-active', b === btn);
        b.setAttribute('aria-selected', String(b === btn));
      });
      root.querySelectorAll('[data-tabpanel]').forEach((panel) => {
        panel.classList.toggle('is-active', panel.getAttribute('data-tabpanel') === target);
      });
    });
  });
}

/** Wires up a `.segmented` control (pill button-group) and returns a getter/setter pair. */
function initSegmented(container, onChange) {
  const buttons = container.querySelectorAll('button');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.toggle('is-active', b === btn));
      onChange(btn.getAttribute('data-value'));
    });
  });
  return {
    get value() {
      const active = container.querySelector('button.is-active');
      return active ? active.getAttribute('data-value') : null;
    },
  };
}
