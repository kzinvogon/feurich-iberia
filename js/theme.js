const Theme = (() => {
  const SUPPORTED = ['noir', 'galeria', 'hogar', 'publico', 'familia', 'arte'];
  const DEFAULT = 'noir';
  let current = DEFAULT;

  function detect() {
    const stored = localStorage.getItem('fi_theme');
    return (stored && SUPPORTED.includes(stored)) ? stored : DEFAULT;
  }

  function apply(theme) {
    if (!SUPPORTED.includes(theme)) theme = DEFAULT;
    current = theme;
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('fi_theme', theme);
    updateSwitcher();
  }

  function updateSwitcher() {
    document.querySelectorAll('[data-theme-btn]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.themeBtn === current);
    });
  }

  function init() {
    current = detect();
    apply(current);
    document.addEventListener('click', e => {
      const btn = e.target.closest('[data-theme-btn]');
      if (btn) {
        e.preventDefault();
        apply(btn.dataset.themeBtn);
      }
    });
  }

  return { init, apply, get current() { return current; } };
})();

document.addEventListener('DOMContentLoaded', () => Theme.init());
