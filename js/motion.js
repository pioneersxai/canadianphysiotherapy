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
      '.hero-description', '.hero-buttons', '.specialty-tags', '.scroll-cue'
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

    // ── Elbow flexion scroll-scrub reveal ──
    // CSS `position: sticky` on .elbow-reveal-stage already pins the visual
    // with zero JS, and the <video> has autoplay/muted/loop as a baseline —
    // so if anything below fails (slow network, video never reaches
    // 'loadedmetadata', ScrollTrigger missing) the section still looks
    // intentional. This block only *upgrades* it: pauses the natural loop
    // and drives video.currentTime + caption opacity directly off scroll
    // progress, which is what makes scrolling visually "find" the motion.
    var elbowSection = document.querySelector('.elbow-reveal');
    var elbowVideo = document.querySelector('.elbow-video');
    var elbowCaption = document.querySelector('.elbow-caption');
    if (elbowSection && elbowVideo && window.ScrollTrigger) {
      if (elbowCaption) gsap.set(elbowCaption, { opacity: 0, y: 20 });

      var wireScrub = function () {
        if (!isFinite(elbowVideo.duration) || elbowVideo.duration <= 0) return;
        elbowVideo.pause();
        elbowVideo.removeAttribute('autoplay');
        elbowVideo.loop = false;

        ScrollTrigger.create({
          trigger: elbowSection,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          onUpdate: function (self) {
            var t = self.progress * elbowVideo.duration;
            if (isFinite(t)) {
              try { elbowVideo.currentTime = t; } catch (e) { /* some browsers throttle seeks — safe to ignore */ }
            }
            if (elbowCaption) {
              var p = Math.min(1, Math.max(0, (self.progress - 0.28) / 0.4));
              gsap.set(elbowCaption, { opacity: p, y: 20 - 20 * p });
            }
          }
        });
      };

      if (elbowVideo.readyState >= 1) {
        wireScrub();
      } else {
        elbowVideo.addEventListener('loadedmetadata', wireScrub, { once: true });
      }
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
