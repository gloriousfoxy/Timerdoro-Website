// ============================================
// Timerdoro — Shared JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {

  // ── Mobile Nav Toggle ──
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function() {
      links.classList.toggle('open');
    });
  }

  // ── Active Link Highlighting ──
  var path = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(function(link) {
    var href = link.getAttribute('href');
    if (!href || href === '#') return;
    // Resolve relative href to absolute for comparison
    var absoluteHref = new URL(href, window.location.href).pathname;
    if (absoluteHref === path ||
        (absoluteHref.endsWith('/') && path.startsWith(absoluteHref) && absoluteHref !== '/')) {
      link.classList.add('active');
    }
  });

  // ── Cookie Banner ──
  initCookieBanner();
});

function initCookieBanner() {
  var STORAGE_KEY = 'timerdoro_cookie_acknowledged';

  if (localStorage.getItem(STORAGE_KEY)) return;

  // Detect base path from CSS link in DOM (works regardless of subfolder)
  var cssLink = document.querySelector('link[href*="style.css"]');
  var basePath = '';
  if (cssLink) {
    var cssHref = cssLink.getAttribute('href');
    // e.g. "../../assets/css/style.css" or "assets/css/style.css"
    // We strip "assets/css/style.css" and use what's left as base
    basePath = cssHref.replace(/assets\/css\/style\.css$/, '');
  }

  var cookiesLink = basePath + 'legal/cookies/';

  var banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Cookie notice');
  banner.innerHTML =
    '<p>' +
      'We use only essential local storage to remember this notice has been seen. ' +
      'No tracking, no analytics, no cookies sent to third parties. ' +
      '<a href="' + cookiesLink + '">Learn more</a>' +
    '</p>' +
    '<div class="cookie-banner-actions">' +
      '<button class="cookie-btn cookie-accept" type="button">Got it</button>' +
    '</div>';
  document.body.appendChild(banner);

  setTimeout(function() { banner.classList.add('show'); }, 600);

  banner.querySelector('.cookie-accept').addEventListener('click', function() {
    localStorage.setItem(STORAGE_KEY, 'true');
    banner.classList.remove('show');
    setTimeout(function() { banner.remove(); }, 400);
  });
}
