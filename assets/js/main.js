// ============================================
// Timerdoro — main.js (Cookie Consent Mock + Contact Form Mock)
// ============================================
// IMPORTANT: This site does not actually run analytics or marketing
// trackers. The consent UI is fully implemented per DSGVO/TTDSG
// requirements but the categories themselves have no real effect —
// they are a mock used for the academic exercise and to show what the
// UI would look like if such trackers were ever introduced.
// ============================================

(function () {
  'use strict';

  var STORAGE_KEY = 'timerdoro_cookie_consent_v2';

  /** Returns the saved consent object, or null if no choice yet. */
  function getStoredConsent() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) { return null; }
  }

  function storeConsent(obj) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        v: 2,
        ts: new Date().toISOString(),
        essential: true,                       // always on
        functional: !!obj.functional,
        analytics:  !!obj.analytics,
        marketing:  !!obj.marketing
      }));
    } catch (e) { /* private mode */ }
  }

  function buildBanner() {
    var div = document.createElement('div');
    div.className = 'cookie-banner';
    div.setAttribute('role', 'dialog');
    div.setAttribute('aria-modal', 'false');
    div.setAttribute('aria-labelledby', 'cookie-title');
    div.setAttribute('aria-describedby', 'cookie-intro');
    div.innerHTML =
      '<div class="cookie-head">' +
        '<h2 id="cookie-title" data-i18n="cookie.title">Cookies &amp; local storage</h2>' +
        '<button type="button" class="cookie-close" data-cookie-close aria-label="Close">×</button>' +
      '</div>' +
      '<p id="cookie-intro" data-i18n="cookie.intro">' +
        'We use only essential local storage to remember your preferences.' +
      '</p>' +
      '<fieldset class="cookie-categories">' +
        '<legend class="visually-hidden">Cookie categories</legend>' +

        '<label class="cookie-cat">' +
          '<input type="checkbox" checked disabled data-cat="essential">' +
          '<span class="cookie-cat-text">' +
            '<span class="cookie-cat-label" data-i18n="cookie.essential.label">Strictly necessary</span>' +
            '<span class="cookie-cat-desc" data-i18n="cookie.essential.desc">Required for the site to work. Cannot be disabled.</span>' +
          '</span>' +
        '</label>' +

        '<label class="cookie-cat">' +
          '<input type="checkbox" data-cat="functional">' +
          '<span class="cookie-cat-text">' +
            '<span class="cookie-cat-label" data-i18n="cookie.functional.label">Functional</span>' +
            '<span class="cookie-cat-desc" data-i18n="cookie.functional.desc">Language preference, cookie acknowledgement.</span>' +
          '</span>' +
        '</label>' +

        '<label class="cookie-cat">' +
          '<input type="checkbox" data-cat="analytics">' +
          '<span class="cookie-cat-text">' +
            '<span class="cookie-cat-label" data-i18n="cookie.analytics.label">Analytics (mock)</span>' +
            '<span class="cookie-cat-desc" data-i18n="cookie.analytics.desc">Anonymous usage statistics. Currently not active.</span>' +
          '</span>' +
        '</label>' +

        '<label class="cookie-cat">' +
          '<input type="checkbox" data-cat="marketing">' +
          '<span class="cookie-cat-text">' +
            '<span class="cookie-cat-label" data-i18n="cookie.marketing.label">Marketing (mock)</span>' +
            '<span class="cookie-cat-desc" data-i18n="cookie.marketing.desc">Personalised offers. Currently not active.</span>' +
          '</span>' +
        '</label>' +
      '</fieldset>' +
      '<div class="cookie-actions">' +
        '<button type="button" class="cookie-btn cookie-reject" data-cookie-reject data-i18n="cookie.btnRejectAll">Reject all</button>' +
        '<button type="button" class="cookie-btn cookie-save" data-cookie-save data-i18n="cookie.btnSave">Save preferences</button>' +
        '<button type="button" class="cookie-btn cookie-accept" data-cookie-accept data-i18n="cookie.btnAcceptAll">Accept all</button>' +
      '</div>' +
      '<p class="cookie-link-row">' +
        '<a class="cookie-link" data-cookie-policy data-i18n="cookie.learnMore">Cookie policy</a>' +
      '</p>';
    return div;
  }

  function fillCheckboxes(banner, consent) {
    if (!consent) return;
    banner.querySelector('[data-cat="functional"]').checked = !!consent.functional;
    banner.querySelector('[data-cat="analytics"]').checked  = !!consent.analytics;
    banner.querySelector('[data-cat="marketing"]').checked  = !!consent.marketing;
  }

  function show(banner) {
    document.body.appendChild(banner);
    requestAnimationFrame(function () {
      banner.classList.add('show');
    });
  }

  function hide(banner) {
    banner.classList.remove('show');
    setTimeout(function () {
      if (banner.parentNode) banner.parentNode.removeChild(banner);
    }, 350);
  }

  function setupCookieBanner() {
    var existing = document.querySelector('.cookie-banner');
    if (existing) return existing;

    var banner = buildBanner();
    var consent = getStoredConsent();
    fillCheckboxes(banner, consent);

    banner.addEventListener('click', function (e) {
      var target = e.target;

      if (target.closest('[data-cookie-close]')) {
        hide(banner);
        return;
      }
      if (target.closest('[data-cookie-accept]')) {
        storeConsent({ functional: true, analytics: true, marketing: true });
        hide(banner);
        return;
      }
      if (target.closest('[data-cookie-reject]')) {
        storeConsent({ functional: false, analytics: false, marketing: false });
        hide(banner);
        return;
      }
      if (target.closest('[data-cookie-save]')) {
        storeConsent({
          functional: banner.querySelector('[data-cat="functional"]').checked,
          analytics:  banner.querySelector('[data-cat="analytics"]').checked,
          marketing:  banner.querySelector('[data-cat="marketing"]').checked
        });
        hide(banner);
        return;
      }
      if (target.closest('[data-cookie-policy]')) {
        // Navigate to cookies page (relative)
        var cssLink = document.querySelector('link[href*="style.css"]');
        var base = '';
        if (cssLink) base = cssLink.getAttribute('href').replace(/assets\/css\/style\.css$/, '');
        window.location.href = base + 'legal/cookies/index.html';
      }
    });

    return banner;
  }

  // First-visit auto-show ─ shows banner if no consent stored
  function autoShowIfNeeded() {
    if (getStoredConsent()) return;
    var banner = setupCookieBanner();
    show(banner);
  }

  // Trigger from "Manage cookies" link/button anywhere on the site
  function bindManageTriggers() {
    document.addEventListener('click', function (e) {
      var trigger = e.target.closest('[data-cookie-open]');
      if (!trigger) return;
      e.preventDefault();
      // Re-show banner with stored values
      var banner = setupCookieBanner();
      if (!banner.parentNode) show(banner);
      else banner.classList.add('show');
      // Re-apply i18n to ensure newly created elements get translated
      if (window.I18n) window.I18n.apply(window.I18n.getLang());
    });
  }

  /* ── Contact form mock ── */
  function bindContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      // Mock: do not send. Show success message.
      var success = document.getElementById('contact-form-success');
      var fields  = form.querySelector('.contact-form-fields');
      if (success && fields) {
        fields.style.display = 'none';
        success.style.display = 'block';
        success.setAttribute('tabindex', '-1');
        success.focus();
      }
    });
  }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', function () {
    bindManageTriggers();
    bindContactForm();
    // Delay autoshow slightly so it doesn't race with i18n.js
    setTimeout(autoShowIfNeeded, 800);
  });

})();
