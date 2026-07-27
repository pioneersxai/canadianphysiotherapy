/**
 * ===================================
 * CANADIAN PHYSIO CENTER — EDITORIAL LANDING
 * Plain JS, no external animation libraries: nav scroll state + mobile
 * menu, staggered hero entrance, IntersectionObserver scroll-reveal,
 * animated stat counters, and the commitment-block tabs.
 * ===================================
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    // Nav background on scroll + mobile menu toggle
    var nav = document.getElementById('nav');
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('navLinks');

    window.addEventListener('scroll', function () {
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });

    if (hamburger && navLinks) {
      var hIcon = hamburger.querySelector('i');
      var setIcon = function (open) {
        if (!hIcon) return;
        hIcon.classList.toggle('fa-bars', !open);
        hIcon.classList.toggle('fa-times', open);
      };
      hamburger.addEventListener('click', function () {
        var isOpen = navLinks.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        setIcon(isOpen);
      });
      navLinks.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          navLinks.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
          setIcon(false);
        });
      });
    }

    // Staggered hero word entrance
    document.querySelectorAll('.hero-words li').forEach(function (li, i) {
      setTimeout(function () { li.classList.add('on'); }, 300 + i * 180);
    });

    // Reveal-on-scroll for .rv elements
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('on');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.rv').forEach(function (el) { io.observe(el); });

    // Animated stat counters
    var fmt = function (n) { return n >= 1000 ? n.toLocaleString('en-US') + '+' : n; };
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var end = +el.dataset.count;
        var t0 = performance.now();
        var dur = 1600;
        var tick = function (t) {
          var p = Math.min((t - t0) / dur, 1);
          el.textContent = fmt(Math.round(end * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        cio.unobserve(el);
      });
    }, { threshold: 0.6 });
    document.querySelectorAll('[data-count]').forEach(function (el) { cio.observe(el); });

    // Commitment block tabs
    document.querySelectorAll('.tab-btns button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.tab-btns button').forEach(function (b) { b.classList.remove('active'); });
        document.querySelectorAll('.panel').forEach(function (p) { p.classList.remove('active'); });
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab).classList.add('active');
      });
    });
  });
})();
