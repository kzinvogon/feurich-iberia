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
    updateHeroKeys(theme);
  }

  function updateHeroKeys(theme) {
    var fields = { '.hero__eyebrow': 'eyebrow', '.hero__title': 'title', '.hero__subtitle': 'subtitle' };
    Object.keys(fields).forEach(function (sel) {
      var el = document.querySelector(sel);
      if (el) el.dataset.i18n = 'hero.themes.' + theme + '.' + fields[sel];
    });
    if (typeof I18n !== 'undefined' && I18n.apply) I18n.apply();
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
        // Show the chosen theme on the home page (theme persists via localStorage)
        const base = document.querySelector('meta[name="base-path"]')?.content || '';
        window.location.href = base + 'index.html';
      }
    });
  }

  return { init, apply, get current() { return current; } };
})();

document.addEventListener('DOMContentLoaded', () => Theme.init());
