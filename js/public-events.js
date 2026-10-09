(() => {
  const section = document.querySelector('[data-public-events]');
  if (!section) return;
  let userInteracted = false;
  ['pointerdown', 'wheel', 'touchstart', 'keydown'].forEach((type) => {
    window.addEventListener(type, () => { userInteracted = true; }, { once: true, passive: true, capture: true });
  });

  // The exported Webflow page also scrolls anchors. Keep direct calendar links
  // beneath the fixed header after fonts and the surrounding layout are ready.
  const alignCalendar = () => {
    if (window.location.hash !== '#events') return;
    const headerHeight = document.querySelector('.site-header')?.getBoundingClientRect().height || 0;
    const top = section.getBoundingClientRect().top + window.scrollY - headerHeight - 24;
    section.focus({ preventScroll: true });
    window.scrollTo({ top, behavior: 'instant' });
  };
  const alignWhenReady = () => document.fonts.ready.then(() => {
    if (!userInteracted) window.requestAnimationFrame(alignCalendar);
  });
  if (document.readyState === 'complete') alignWhenReady();
  else window.addEventListener('load', alignWhenReady, { once: true });
  window.addEventListener('hashchange', () => document.fonts.ready.then(alignCalendar));
})();
