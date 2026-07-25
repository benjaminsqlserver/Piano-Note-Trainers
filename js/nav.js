// nav.js
// Injects the shared, responsive top navigation bar used on every page.
// Usage: <div id="site-nav"></div> then <script src="js/nav.js"></script>
// The current page is marked active by matching document body's
// data-page attribute against each link's data-page attribute.
//
// Structure: a couple of standalone links (Home) plus grouped dropdowns
// (Note Names / Scales / Chords) so the bar stays short as lessons are
// added. On desktop each group opens as a small dropdown panel below its
// button; on mobile (inside the hamburger panel) the same group buttons
// work as accordion toggles.

const NAV_GROUPS = [
  { standalone: true, page: 'home', href: 'index.html', label: 'Home' },
  {
    id: 'note-names',
    label: 'Note Names',
    links: [
      { page: 'white', href: 'white-key-trainer.html', label: 'White Keys' },
      { page: 'sharp', href: 'sharp-key-trainer.html', label: 'Sharp Keys' },
      { page: 'flat', href: 'flat-key-trainer.html', label: 'Flat Keys' },
      { page: 'chromatic', href: 'chromatic-trainer.html', label: 'Chromatic & Solfa' },
    ],
  },
  {
    id: 'scales',
    label: 'Scales',
    links: [
      { page: 'major-scale', href: 'major-scale-trainer.html', label: 'Major Scale' },
      { page: 'dorian-scale', href: 'dorian-scale-trainer.html', label: 'Dorian Scale' },
      { page: 'phrygian-scale', href: 'phrygian-scale-trainer.html', label: 'Phrygian Scale' },
    ],
  },
  {
    id: 'chords',
    label: 'Chords',
    // 53 chord lessons is too many for one flat list, so they're split
    // into labeled sub-groups. Each sub-group renders as a non-clickable
    // heading followed by its links (see renderNav's handling of
    // `item.subgroups` below). Order within each sub-group preserves the
    // original teaching/lesson order.
    subgroups: [
      {
        heading: 'Triads',
        links: [
          { page: 'major-chord', href: 'major-chord-trainer.html', label: 'Major Chords' },
          { page: 'minor-chord', href: 'minor-chord-trainer.html', label: 'Minor Chords' },
          { page: 'augmented-chord', href: 'augmented-chord-trainer.html', label: 'Augmented Chords' },
          { page: 'diminished-chord', href: 'diminished-chord-trainer.html', label: 'Diminished Chords' },
          { page: 'power-chord', href: 'power-chord-trainer.html', label: 'Power Chords' },
          { page: 'split-third-blues-chord', href: 'split-third-blues-chord-trainer.html', label: 'Split-Third Blues Chords' },
        ],
      },
      {
        heading: '7th Chords',
        links: [
          { page: 'dominant-seventh-chord', href: 'dominant-seventh-chord-trainer.html', label: 'Dominant 7th Chords' },
          { page: 'diminished-seventh-chord', href: 'diminished-seventh-chord-trainer.html', label: 'Diminished 7th Chords' },
          { page: 'minor-seventh-chord', href: 'minor-seventh-chord-trainer.html', label: 'Minor 7th Chords' },
          { page: 'major-seventh-chord', href: 'major-seventh-chord-trainer.html', label: 'Major 7th Chords' },
          { page: 'half-diminished-seventh-chord', href: 'half-diminished-seventh-chord-trainer.html', label: 'Half-Diminished 7th Chords' },
          { page: 'augmented-seventh-chord', href: 'augmented-seventh-chord-trainer.html', label: 'Augmented 7th Chords' },
          { page: 'diminished-major-seventh-chord', href: 'diminished-major-seventh-chord-trainer.html', label: 'Diminished Major 7th Chords' },
          { page: 'minor-major-seventh-chord', href: 'minor-major-seventh-chord-trainer.html', label: 'Minor-Major 7th Chords' },
        ],
      },
      {
        heading: '6th & Added-Tone Chords',
        links: [
          { page: 'sixth-chord', href: 'sixth-chord-trainer.html', label: '6th Chords' },
          { page: 'minor-sixth-chord', href: 'minor-sixth-chord-trainer.html', label: 'Minor 6th Chords' },
          { page: 'six-nine-chord', href: 'six-nine-chord-trainer.html', label: '6/9 Chords' },
          { page: 'minor-six-nine-chord', href: 'minor-six-nine-chord-trainer.html', label: 'Minor 6/9 Chords' },
          { page: 'add9-chord', href: 'add9-chord-trainer.html', label: 'Add9 Chords' },
          { page: 'add11-chord', href: 'add11-chord-trainer.html', label: 'Add11 Chords' },
        ],
      },
      {
        heading: 'Suspended Chords',
        links: [
          { page: 'sus2-chord', href: 'sus2-chord-trainer.html', label: 'Sus2 Chords' },
          { page: 'sus4-chord', href: 'sus4-chord-trainer.html', label: 'Sus4 Chords' },
          { page: 'dominant-seventh-sus4-chord', href: 'dominant-seventh-sus4-chord-trainer.html', label: 'Dominant 7sus4 Chords' },
          { page: 'dominant-nine-sus4-chord', href: 'dominant-nine-sus4-chord-trainer.html', label: 'Dominant 9sus4 Chords' },
          { page: 'dominant-thirteen-sus4-chord', href: 'dominant-thirteen-sus4-chord-trainer.html', label: 'Dominant 13sus4 Chords' },
          { page: 'major-seventh-sus2-chord', href: 'major-seventh-sus2-chord-trainer.html', label: 'Major 7sus2 Chords' },
          { page: 'major-seventh-sus4-chord', href: 'major-seventh-sus4-chord-trainer.html', label: 'Major 7sus4 Chords' },
        ],
      },
      {
        heading: 'Extended Chords (9ths, 11ths, 13ths)',
        links: [
          { page: 'dominant-ninth-chord', href: 'dominant-ninth-chord-trainer.html', label: 'Dominant 9th Chords' },
          { page: 'dominant-eleventh-chord', href: 'dominant-eleventh-chord-trainer.html', label: 'Dominant 11th Chords' },
          { page: 'dominant-thirteenth-chord', href: 'dominant-thirteenth-chord-trainer.html', label: 'Dominant 13th Chords' },
          { page: 'minor-ninth-chord', href: 'minor-ninth-chord-trainer.html', label: 'Minor 9th Chords' },
          { page: 'minor-eleventh-chord', href: 'minor-eleventh-chord-trainer.html', label: 'Minor 11th Chords' },
          { page: 'minor-thirteenth-chord', href: 'minor-thirteenth-chord-trainer.html', label: 'Minor 13th Chords' },
          { page: 'minor-major-ninth-chord', href: 'minor-major-ninth-chord-trainer.html', label: 'Minor-Major 9th Chords' },
          { page: 'major-ninth-chord', href: 'major-ninth-chord-trainer.html', label: 'Major 9th Chords' },
          { page: 'major-thirteenth-chord', href: 'major-thirteenth-chord-trainer.html', label: 'Major 13th Chords' },
        ],
      },
      {
        heading: 'Altered & Color Extensions',
        links: [
          { page: 'dominant-seventh-flat-nine-chord', href: 'dominant-seventh-flat-nine-chord-trainer.html', label: 'Dominant 7♭9 Chords' },
          { page: 'dominant-seventh-sharp-nine-chord', href: 'dominant-seventh-sharp-nine-chord-trainer.html', label: 'Dominant 7♯9 Chords' },
          { page: 'dominant-seventh-flat-five-chord', href: 'dominant-seventh-flat-five-chord-trainer.html', label: 'Dominant 7♭5 Chords' },
          { page: 'dominant-seventh-sharp-eleven-chord', href: 'dominant-seventh-sharp-eleven-chord-trainer.html', label: 'Dominant 7♯11 Chords' },
          { page: 'dominant-seventh-flat-thirteen-chord', href: 'dominant-seventh-flat-thirteen-chord-trainer.html', label: 'Dominant 7♭13 Chords' },
          { page: 'dominant-ninth-sharp-eleven-chord', href: 'dominant-ninth-sharp-eleven-chord-trainer.html', label: 'Dominant 9♯11 Chords' },
          { page: 'altered-dominant-chord', href: 'altered-dominant-chord-trainer.html', label: 'Altered Dominant Chords' },
          { page: 'major-seventh-flat-five-chord', href: 'major-seventh-flat-five-chord-trainer.html', label: 'Major 7th ♭5 Chords' },
          { page: 'major-seventh-sharp-eleven-chord', href: 'major-seventh-sharp-eleven-chord-trainer.html', label: 'Major 7th ♯11 Chords' },
          { page: 'major-seventh-sharp-five-chord', href: 'major-seventh-sharp-five-chord-trainer.html', label: 'Major 7th♯5 Chords' },
          { page: 'minor-seventh-flat-nine-chord', href: 'minor-seventh-flat-nine-chord-trainer.html', label: 'Minor 7♭9 Chords' },
          { page: 'half-diminished-eleventh-chord', href: 'half-diminished-eleventh-chord-trainer.html', label: 'Half-Diminished 11th Chords' },
        ],
      },
      {
        heading: 'Special & Color Chords',
        links: [
          { page: 'inversions', href: 'inversions-trainer.html', label: 'Chord Inversions' },
          { page: 'quartal-chord', href: 'quartal-chord-trainer.html', label: 'Quartal Chords' },
          { page: 'tone-cluster-chord', href: 'tone-cluster-chord-trainer.html', label: 'Tone Cluster Chords' },
          { page: 'polychord', href: 'polychord-trainer.html', label: 'Polychord (Slash Chord)' },
          { page: 'neapolitan-chord', href: 'neapolitan-chord-trainer.html', label: 'Neapolitan (♭II) Chords' },
        ],
      },
    ],
  },
  {
    id: 'songs',
    label: 'Songs',
    links: [
      { page: 'power-in-the-blood', href: 'power-in-the-blood-trainer.html', label: 'Power in the Blood' },
      { page: 'his-eye-on-the-sparrow', href: 'his-eye-on-the-sparrow-trainer.html', label: 'His Eye Is on the Sparrow' },
      { page: 'now-behold-the-lamb', href: 'now-behold-the-lamb-trainer.html', label: 'Now Behold the Lamb' },
    ],
  },
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

function chevronSvg() {
  return `<svg class="site-nav__chevron" viewBox="0 0 12 8" width="10" height="7" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

function renderNav(mountEl) {
  const currentPage = document.body.getAttribute('data-page') || '';

  const itemsHtml = NAV_GROUPS.map((item) => {
    if (item.standalone) {
      const isActive = item.page === currentPage;
      return `<li><a href="${item.href}" data-page="${item.page}"${isActive ? ' class="is-active" aria-current="page"' : ''}>${item.label}</a></li>`;
    }

    // Groups either have a flat `links` array, or a `subgroups` array of
    // { heading, links } for longer lists (currently just Chords). Both
    // shapes render into the same <ul class="site-nav__dropdown">; the
    // only difference is that subgroups get a non-clickable heading in
    // between the clusters of links.
    const allLinks = item.subgroups
      ? item.subgroups.flatMap((sg) => sg.links)
      : item.links;
    const groupHasActive = allLinks.some((l) => l.page === currentPage);

    function linkHtml(l) {
      const isActive = l.page === currentPage;
      return `<li><a href="${l.href}" data-page="${l.page}"${isActive ? ' class="is-active" aria-current="page"' : ''}>${l.label}</a></li>`;
    }

    const dropdownLinksHtml = item.subgroups
      ? item.subgroups.map((sg) => `
          <li class="site-nav__dropdown-heading" role="presentation">${sg.heading}</li>
          ${sg.links.map(linkHtml).join('')}
        `).join('')
      : item.links.map(linkHtml).join('');

    return `
      <li class="site-nav__group">
        <button type="button" class="site-nav__group-toggle${groupHasActive ? ' is-active' : ''}" aria-expanded="false" aria-haspopup="true" data-group="${item.id}">
          <span>${item.label}</span>${chevronSvg()}
        </button>
        <ul class="site-nav__dropdown${item.subgroups ? ' site-nav__dropdown--grouped' : ''}" data-group-panel="${item.id}">
          ${dropdownLinksHtml}
        </ul>
      </li>`;
  }).join('');

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
          ${itemsHtml}
        </ul>
      </div>
    </nav>`;

  const nav = mountEl.querySelector('.site-nav');
  const toggle = mountEl.querySelector('.site-nav__toggle');
  const linksList = mountEl.querySelector('#site-nav-links');
  const groupToggles = Array.from(mountEl.querySelectorAll('.site-nav__group-toggle'));

  function closeAllGroups(exceptButton) {
    groupToggles.forEach((btn) => {
      if (btn === exceptButton) return;
      btn.setAttribute('aria-expanded', 'false');
      btn.parentElement.classList.remove('is-open');
    });
  }

  function closeMobileMenu() {
    linksList.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  // Hamburger toggle for the whole menu (mobile).
  toggle.addEventListener('click', () => {
    const isOpen = linksList.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    if (!isOpen) closeAllGroups(null);
  });

  // Each group button opens/closes its own dropdown (desktop) or
  // accordion panel (mobile). Only one group is open at a time.
  groupToggles.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.stopPropagation();
      const groupItem = btn.parentElement;
      const willOpen = !groupItem.classList.contains('is-open');
      closeAllGroups(willOpen ? btn : null);
      groupItem.classList.toggle('is-open', willOpen);
      btn.setAttribute('aria-expanded', String(willOpen));
    });
  });

  // Close everything after choosing a link.
  linksList.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      closeAllGroups(null);
      closeMobileMenu();
    });
  });

  // Click outside the nav closes any open dropdown (desktop) and,
  // on mobile, the whole menu panel.
  document.addEventListener('click', (event) => {
    if (nav.contains(event.target)) return;
    closeAllGroups(null);
    closeMobileMenu();
  });

  // Escape closes everything, useful for keyboard users.
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    closeAllGroups(null);
    closeMobileMenu();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const mount = document.getElementById('site-nav');
  if (mount) renderNav(mount);
});
