(() => {
  const header = document.querySelector('.site-header');
  const toggle = header?.querySelector('.site-menu-toggle');
  const navigation = header?.querySelector('.site-navigation');
  if (!header || !toggle || !navigation) return;

  const mobile = window.matchMedia('(max-width: 991px)');
  const isOpen = () => header.dataset.menuOpen === 'true';

  function setOpen(open, restoreFocus = false) {
    header.dataset.menuOpen = String(open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    document.documentElement.classList.toggle('site-menu-open', open);
    if (restoreFocus) toggle.focus();
  }

  toggle.addEventListener('click', () => setOpen(!isOpen()));
  navigation.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (!mobile.matches || !isOpen()) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false, true);
      return;
    }
    if (event.key !== 'Tab') return;

    const controls = [toggle, ...navigation.querySelectorAll('a[href]')];
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    } else if (!controls.includes(document.activeElement)) {
      event.preventDefault();
      first.focus();
    }
  });

  mobile.addEventListener('change', () => {
    const wasOpen = isOpen();
    setOpen(false);
    if (wasOpen && !mobile.matches) {
      const currentLink = navigation.querySelector('a[aria-current="page"]');
      (currentLink || navigation.querySelector('a'))?.focus({ preventScroll: true });
    }
  });
})();
