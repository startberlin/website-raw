(() => {
  function countdownValues(deadline, now) {
    const seconds = Math.max(0, Math.floor((deadline - now) / 1000));
    return {
      days: Math.floor(seconds / 86400),
      hours: Math.floor(seconds / 3600) % 24,
      minutes: Math.floor(seconds / 60) % 60,
      seconds: seconds % 60,
    };
  }

  document.querySelectorAll('[data-application-deadline]').forEach((panel) => {
    const deadline = Date.parse(panel.dataset.applicationDeadline);
    if (!Number.isFinite(deadline)) return;

    function update() {
      const now = Date.now();
      const values = countdownValues(deadline, now);
      Object.entries(values).forEach(([unit, value]) => {
        const element = panel.querySelector(`[data-countdown="${unit}"]`);
        if (element) element.textContent = String(value).padStart(2, '0');
      });
      if (now >= deadline) {
        const label = panel.querySelector('.recruitment-countdown-label');
        if (label) label.textContent = 'Application deadline has passed';
        const link = panel.querySelector('.recruitment-button');
        if (link) {
          link.textContent = 'Contact recruiting';
          link.href = 'mailto:recruiting@start-berlin.com';
        }
      }
    }

    update();
    window.setInterval(update, 1000);
  });
})();
