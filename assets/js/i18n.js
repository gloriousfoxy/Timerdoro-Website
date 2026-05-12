// ============================================
// Timerdoro — i18n Engine
// ============================================
// Reads translations from window.TRANSLATIONS (translations.js).
// Loads saved language from localStorage, or falls back to browser
// language, or English as final default.
//
// Usage in HTML:
//   <h1 data-i18n="hero.title"></h1>            → textContent
//   <input data-i18n-attr="placeholder:form.namePh"> → attribute
//   <meta data-i18n-attr="content:meta.desc">    → attribute
//
// Call I18n.setLang('de') or 'en' to switch.
// ============================================

(function () {
  'use strict';

  var STORAGE_KEY = 'timerdoro_lang';
  var DEFAULT_LANG = 'en';
  var SUPPORTED = ['en', 'de'];

  function detectInitialLang() {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* private mode */ }
    if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;

    var nav = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (nav.indexOf('de') === 0) return 'de';
    return DEFAULT_LANG;
  }

  function t(key, lang) {
    var dict = (window.TRANSLATIONS && window.TRANSLATIONS[lang]) || {};
    if (key in dict) return dict[key];
    // fallback to English if missing
    var en = (window.TRANSLATIONS && window.TRANSLATIONS.en) || {};
    if (key in en) return en[key];
    return key; // visible fallback so missing keys are debuggable
  }

  function apply(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = DEFAULT_LANG;

    // Update <html lang="">
    document.documentElement.setAttribute('lang', lang);

    // Apply text content
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      // Preserve children if the element opted in with data-i18n-html=""
      if (el.hasAttribute('data-i18n-html')) {
        el.innerHTML = t(key, lang);
      } else {
        el.textContent = t(key, lang);
      }
    });

    // Apply attributes: data-i18n-attr="attr1:key1; attr2:key2"
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      var spec = el.getAttribute('data-i18n-attr');
      spec.split(';').forEach(function (pair) {
        var parts = pair.trim().split(':');
        if (parts.length !== 2) return;
        var attr = parts[0].trim();
        var key  = parts[1].trim();
        el.setAttribute(attr, t(key, lang));
      });
    });

    // Update <title> if a key is registered on it
    var titleEl = document.querySelector('title[data-i18n]');
    if (titleEl) document.title = t(titleEl.getAttribute('data-i18n'), lang);

    // Persist
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }

    // Mark language toggle buttons
    document.querySelectorAll('[data-lang-toggle]').forEach(function (el) {
      el.setAttribute('data-current', lang);
      // label = the *other* language to switch to
      var other = lang === 'de' ? 'EN' : 'DE';
      el.textContent = other;
      el.setAttribute('aria-label',
        (lang === 'de' ? 'Switch to English' : 'Auf Deutsch umstellen'));
    });

    // Notify listeners
    document.dispatchEvent(new CustomEvent('i18n:changed', { detail: { lang: lang } }));
  }

  function setLang(lang) { apply(lang); }
  function toggle() { setLang(getLang() === 'de' ? 'en' : 'de'); }
  function getLang() {
    return document.documentElement.getAttribute('lang') || DEFAULT_LANG;
  }

  // Expose
  window.I18n = { setLang: setLang, toggle: toggle, getLang: getLang, t: t, apply: apply };

  // Apply on DOM ready (runs after components.js has injected nav/footer
  // because components.js runs synchronously in the same DOMContentLoaded
  // queue — but to be safe, we re-apply on a small delay too)
  document.addEventListener('DOMContentLoaded', function () {
    var lang = detectInitialLang();
    apply(lang);
    // re-apply after components.js has rendered nav/footer
    setTimeout(function () { apply(getLang()); }, 0);
  });

})();
