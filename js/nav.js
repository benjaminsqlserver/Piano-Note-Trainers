// nav.js
// Injects the shared, responsive top navigation bar used on every page.
// Usage: <div id="site-nav"></div> then <script src="js/nav.js"></script>
// The current page is marked active by matching document body's
// data-page attribute against each link's data-page attribute.

const LINKS = [
  { page: 'home', href: 'index.html', label: 'Home' },
  { page: 'white', href: 'white-key-trainer.html', label: 'White Keys' },
  { page: 'sharp', href: 'sharp-key-trainer.html', label: 'Sharp Keys' },
  { page: 'flat', href: 'flat-key-trainer.html', label: 'Flat Keys' },
  { page: 'chromatic', href: 'chromatic-trainer.html', label: 'Chromatic & Solfa' },
  { page: 'major-scale', href: 'major-scale-trainer.html', label: 'Major Scale' },
  { page: 'dorian-scale', href: 'dorian-scale-trainer.html', label: 'Dorian Scale' },
  { page: 'phrygian-scale', href: 'phrygian-scale-trainer.html', label: 'Phrygian Scale' },
  { page: 'major-chord', href: 'major-chord-trainer.html', label: 'Major Chords' },
];

function brandMarkSvg() {
  return `<svg class="site-nav__brand-mark" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="1" y="2" width="22" height="20" rx="2" fill="#f6f2ea"/>
    <rect x="4" y="2" width="2.6" height="12" fill="#15151a"/>
    <rect x="8" y="2" width="2.6" height="12" fill="#15151a"/>
    <rect x="14" y="2" width="2.6" height="12" fill="#15151a"/>
    <rect x="18" y="2" width="2.6" height="12" fill="#15151a"/>
  </svg>`;
}

function renderNav(mountEl) {
  const currentPage = document.body.getAttribute('data-page') || '';

  const linksHtml = LINKS.map(
    (l) => `<li><a href="${l.href}" data-page="${l.page}"${l.page === currentPage ? ' class="is-active" aria-current="page"' : ''}>${l.label}</a></li>`
  ).join('');

  mountEl.innerHTML = `
    <nav class="site-nav" aria-label="Lesson navigation">
      <div class="site-nav__inner">
        <a class="site-nav__brand" href="index.html">
          ${brandMarkSvg()}
          <span>Piano Note Trainers</span>
        </a>
        <button class="site-nav__toggle" type="button" aria-label="Toggle navigation menu" aria-expanded="false">
          <span></span>
        </button>
        <ul class="site-nav__links" id="site-nav-links">
          ${linksHtml}
        </ul>
      </div>
    </nav>`;

  const toggle = mountEl.querySelector('.site-nav__toggle');
  const linksList = mountEl.querySelector('#site-nav-links');
  toggle.addEventListener('click', () => {
    const isOpen = linksList.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close the mobile menu after choosing a link.
  linksList.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      linksList.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const mount = document.getElementById('site-nav');
  if (mount) renderNav(mount);
});
