const I18n = (() => {
  const SUPPORTED = ['en', 'es', 'de', 'fr', 'pt'];
  const DEFAULT = 'en';
  let current = DEFAULT;
  let strings = {};

  function detectLang() {
    const stored = localStorage.getItem('fi_lang');
    if (stored && SUPPORTED.includes(stored)) return stored;
    const browser = (navigator.language || 'en').slice(0, 2).toLowerCase();
    const map = { es: 'es', de: 'de', fr: 'fr', pt: 'pt' };
    return map[browser] || DEFAULT;
  }

  function resolve(key) {
    const parts = key.split('.');
    let val = strings;
    for (const p of parts) {
      if (val == null) return key;
      val = val[p];
    }
    return val != null ? String(val) : key;
  }

  async function load(lang) {
    const base = document.querySelector('meta[name="base-path"]')?.content || '';
    const res = await fetch(`${base}locales/${lang}.json`);
    strings = await res.json();
    current = lang;
    localStorage.setItem('fi_lang', lang);
    apply();
    updateSwitcher();
  }

  function apply() {
    document.documentElement.lang = current;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const val = resolve(key);
      if (val !== key) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = val;
        } else if (el.tagName === 'OPTION') {
          el.textContent = val;
        } else {
          el.innerHTML = val.replace(/\n/g, '<br>');
        }
      }
    });
    document.querySelectorAll('[data-i18n-href]').forEach(el => {
      el.href = resolve(el.dataset.i18nHref);
    });
  }

  function updateSwitcher() {
    document.querySelectorAll('[data-lang]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === current);
    });
  }

  function init() {
    const lang = detectLang();
    load(lang);
    document.addEventListener('click', e => {
      const btn = e.target.closest('[data-lang]');
      if (btn) {
        e.preventDefault();
        load(btn.dataset.lang);
      }
    });
  }

  return { init, load, resolve, apply, get current() { return current; } };
})();
