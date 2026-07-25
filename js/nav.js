/**
 * ===================================
 * CANADIAN PHYSIO CENTER — SHARED NAV BEHAVIOR
 * Navbar scroll effect, mobile hamburger menu, scroll-to-top button,
 * anchor smooth-scroll, sticky booking bar, and the page loader.
 * Used on every page. Extracted so no page carries inline <script>.
 * ===================================
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var nav = document.getElementById('navbar');
    var scrollTopBtn = document.getElementById('scrollTop');
    var stickyBar = document.getElementById('stickyBookBar');

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
