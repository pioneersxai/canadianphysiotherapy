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
      gsap.set(existing, { opacity: 0, y: 26 });
      gsap.to(existing, {
        opacity: 1, y: 0, duration: 1, ease: EASE, stagger: 0.12, delay: 0.15
      });
    }

    // ── Scroll-triggered reveals for everything else ──
    var revealEls = document.querySelectorAll('.fade-in');
    if (revealEls.length && window.ScrollTrigger) {
      revealEls.forEach(function (el) {
        // Hero elements already handled above — skip to avoid double-animating.
        if (el.closest('.hero')) return;
        gsap.set(el, { opacity: 0, y: 24 });
        gsap.to(el, {
          opacity: 1, y: 0, duration: 0.8, ease: EASE,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        });
      });
    }

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
