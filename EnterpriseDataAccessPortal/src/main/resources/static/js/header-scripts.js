document.addEventListener('DOMContentLoaded', () => {
  const host = document.getElementById('header-placeholder');
  if (!host) return;

  const onIndex = /(^|\/)index(\.html)?$/i.test(location.pathname);
  const headerFile = onIndex ? 'fragments/header.html' : '../fragments/header.html';
  const resultsUrl = onIndex ? 'pages/searchResults.html' : '../pages/searchResults.html';

  fetch(headerFile)
    .then(r => {
      if (!r.ok) throw new Error(`Header fetch failed: ${r.status}`);
      return r.text();
    })
    .then(html => {
      host.innerHTML = html;

      // Elements (from injected fragment)
      const headerEl  = host.querySelector('header');              // the header we injected
      const nav       = host.querySelector('#nav-links');
      const burger    = host.querySelector('#hamburger');
      const backdrop  = host.querySelector('#nav-backdrop');
      const form      = host.querySelector('#search-form');
      const input     = host.querySelector('#search-input');

      // Search
      if (form && input) {
        form.addEventListener('submit', e => {
          e.preventDefault();
          const q = input.value.trim();
          if (q) location.href = `${resultsUrl}?q=${encodeURIComponent(q)}`;
        });
      }

      // Drawer helpers
      function setOpen(open) {
        if (!nav || !burger) return;
        nav.classList.toggle('open', open);
        burger.classList.toggle('active', open);
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (backdrop) backdrop.classList.toggle('show', open);
      }

      // Burger + backdrop
      if (burger && nav) {
        burger.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
        nav.addEventListener('click', e => { if (e.target.tagName === 'A') setOpen(false); });
        document.addEventListener('click', e => {
          if (!nav.contains(e.target) && !burger.contains(e.target)) setOpen(false);
        });
        document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
        window.addEventListener('resize', () => { if (innerWidth > 768) setOpen(false); });
      }
      if (backdrop) backdrop.addEventListener('click', () => setOpen(false));

      // *** SCROLL TRIGGER: show hamburger on desktop after 50px ***
      if (headerEl) {
        const THRESH = 50;
        const onScroll = () => headerEl.classList.toggle('scrolled', window.scrollY > THRESH);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll(); // run once on load
      }
    })
    .catch(err => console.error('[header] load error:', err));
});
