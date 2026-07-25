/**
 * ===================================
 * CANADIAN PHYSIO CENTER — SHARED NAV BEHAVIOR
 * Navbar scroll effect, mobile hamburger menu, scroll-to-top button,
 * anchor smooth-scroll, sticky booking bar, and the page loader.
 * Used on every page. Extracted so no page carries inline <script>.
 *
 * Also owns a manual fallback reveal for .fade-in elements. The kit's
 * own animations.js drives the nice progressive reveal via
 * IntersectionObserver, but that API can silently never fire in some
 * browser/automation contexts (confirmed while QA-ing this build — the
 * observer was created successfully with no errors, yet never delivered
 * a single callback). Content must never depend on a single animation
 * API to become visible, so this polls actual scroll position instead
 * and force-reveals anything already on screen, independent of
 * animations.js entirely.
 * ===================================
 */
(function () {
  'use strict';

  function revealFadeInsInViewport() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var els = document.querySelectorAll('.fade-in:not(.visible)');
    for (var i = 0; i < els.length; i++) {
      var rect = els[i].getBoundingClientRect();
      if (rect.top < vh - 40 && rect.bottom > 0) {
        els[i].classList.add('visible');
      }
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var nav = document.getElementById('navbar');
    var scrollTopBtn = document.getElementById('scrollTop');
    var stickyBar = document.getElementById('stickyBookBar');

    // Fallback reveal: run immediately, on every scroll, and on a short
    // poll for the first few seconds (covers content revealed by layout
    // shifts/renders that happen after DOMContentLoaded, e.g. render.js).
    revealFadeInsInViewport();
    window.addEventListener('scroll', revealFadeInsInViewport);
    window.addEventListener('resize', revealFadeInsInViewport);
    var pollCount = 0;
    var pollTimer = setInterval(function () {
      revealFadeInsInViewport();
      pollCount++;
      if (pollCount > 20) clearInterval(pollTimer); // stop after ~6s
    }, 300);

    // Navbar background + scroll-to-top + sticky booking bar visibility
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      if (nav) nav.classList.toggle('scrolled', y > 60);
      if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', y > 400);
      if (stickyBar) stickyBar.classList.toggle('show', y > 500);
    });

    // Smooth scroll for in-page anchor links
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        var navLinks = document.getElementById('navLinks');
        if (navLinks) navLinks.classList.remove('open');
      }
    });

    // Mobile hamburger menu toggle
    var hamburger = document.getElementById('hamburger');
    if (hamburger) {
      hamburger.addEventListener('click', function () {
        var navLinks = document.getElementById('navLinks');
        if (navLinks) navLinks.classList.toggle('open');
      });
    }

    // Scroll-to-top button
    if (scrollTopBtn) {
      scrollTopBtn.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Page loader fade-out
    window.addEventListener('load', function () {
      setTimeout(function () {
        var loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
      }, 500);
    });
  });
})();
