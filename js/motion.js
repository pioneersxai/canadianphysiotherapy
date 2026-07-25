/**
 * ===================================
 * CANADIAN PHYSIO CENTER — PREMIUM MOTION (GSAP)
 * The site's baseline reveal system (js/nav.js + css/animations.css)
 * uses simple CSS transitions and is kept as a guaranteed fallback —
 * it works even if this file or the GSAP CDN fails to load. When GSAP
 * IS available, this file takes over the same .fade-in elements with
 * proper spring-like easing and staggering for a noticeably smoother,
 * more premium feel (inline styles GSAP sets win over the plain CSS
 * fallback, so the two systems never fight visually).
 * ===================================
 */
(function () {
  'use strict';

  if (typeof gsap === 'undefined') return; // CSS fallback in nav.js still reveals everything

  document.addEventListener('DOMContentLoaded', function () {
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    var EASE = 'power3.out';

    // ── Hero entrance — runs immediately, no scroll needed ──
    var heroTargets = [
      '.hero-badge', '.hero h1', '.hero .tagline',
      '.hero-description', '.hero-buttons', '.video-showcase'
    ];
    var existing = heroTargets.filter(function (sel) { return document.querySelector(sel); });
    if (existing.length) {
      gsap.set(existing, { opacity: 0, y: 16 });
      gsap.to(existing, {
        opacity: 1, y: 0, duration: 0.5, ease: EASE, stagger: 0.06, delay: 0.05
      });
    }

    // ── Scroll-triggered reveals for everything else ──
    var revealEls = document.querySelectorAll('.fade-in');
    if (revealEls.length && window.ScrollTrigger) {
      revealEls.forEach(function (el) {
        // Hero elements already handled above — skip to avoid double-animating.
        if (el.closest('.hero')) return;
        gsap.set(el, { opacity: 0, y: 16 });
        gsap.to(el, {
          opacity: 1, y: 0, duration: 0.45, ease: EASE,
          scrollTrigger: { trigger: el, start: 'top 92%', once: true }
        });
      });
    }

    // ── Abstract hero glow: slow orb drift + counter-rotating rings ──
    // Each orb gets its own gentle, non-repeating-looking drift path
    // (different duration/direction per orb avoids a robotic synced feel).
    var orbs = document.querySelectorAll('.glow-orb');
    var drift = [
      { x: 18, y: -14, duration: 7 },
      { x: -16, y: 12, duration: 9 },
      { x: 12, y: 16, duration: 6 }
    ];
    orbs.forEach(function (orb, i) {
      var d = drift[i % drift.length];
      gsap.to(orb, {
        x: d.x, y: d.y, duration: d.duration, ease: 'sine.inOut',
        yoyo: true, repeat: -1
      });
    });
    var r1 = document.querySelector('.glow-ring.r1');
    var r2 = document.querySelector('.glow-ring.r2');
    if (r1) gsap.to(r1, { rotation: 360, duration: 40, ease: 'none', repeat: -1, transformOrigin: '50% 50%' });
    if (r2) gsap.to(r2, { rotation: -360, duration: 28, ease: 'none', repeat: -1, transformOrigin: '50% 50%' });
    var core = document.querySelector('.glow-core');
    if (core) gsap.to(core, { scale: 1.4, opacity: .6, duration: 1.8, ease: 'sine.inOut', yoyo: true, repeat: -1, transformOrigin: '50% 50%' });

    // ── Nicer hover lift on cards (spring-like, not linear) ──
    document.querySelectorAll('.service-card, .team-card, .medical-card, .branch-card, .testimonial').forEach(function (card) {
      card.addEventListener('mouseenter', function () {
        gsap.to(card, { y: -8, duration: 0.35, ease: 'power2.out' });
      });
      card.addEventListener('mouseleave', function () {
        gsap.to(card, { y: 0, duration: 0.45, ease: 'power2.out' });
      });
    });
  });
})();
