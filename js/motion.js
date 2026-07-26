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

    // ── Scene-one entrance — runs immediately, no scroll needed ──
    var sceneZeroTargets = document.querySelectorAll('.story-scene[data-scene="0"] > *');
    if (sceneZeroTargets.length) {
      gsap.set(sceneZeroTargets, { opacity: 0, y: 16 });
      gsap.to(sceneZeroTargets, {
        opacity: 1, y: 0, duration: 0.5, ease: EASE, stagger: 0.06, delay: 0.05
      });
    }

    // ── Scroll-triggered reveals for everything else ──
    var revealEls = document.querySelectorAll('.fade-in');
    if (revealEls.length && window.ScrollTrigger) {
      revealEls.forEach(function (el) {
        // Story scenes have their own crossfade below — skip to avoid double-animating.
        if (el.closest('.story')) return;
        gsap.set(el, { opacity: 0, y: 16 });
        gsap.to(el, {
          opacity: 1, y: 0, duration: 0.45, ease: EASE,
          scrollTrigger: { trigger: el, start: 'top 92%', once: true }
        });
      });
    }

    // ── Cinematic scroll story: video scrub + scene crossfade + progress rail ──
    // CSS `position: sticky` on .story-stage already pins the visual with zero
    // JS, scene 0 is `.is-active` by default in the markup, and the <video>
    // has autoplay/muted/loop as a baseline — so if anything below fails
    // (slow network, video never reaching 'loadedmetadata', ScrollTrigger
    // missing) the section still reads as a complete, intentional hero. This
    // block only *upgrades* it: pauses the natural loop and drives
    // video.currentTime, which of the four captions is visible, the progress
    // rail, and a slow Ken-Burns zoom, all directly off scroll position.
    var storySection = document.querySelector('.story');
    var storyVideo = document.querySelector('.story-video');
    var storyScenes = document.querySelectorAll('.story-scene');
    var storyDots = document.querySelectorAll('.story-progress-dot');
    var storyLabel = document.getElementById('storyProgressLabel');
    var storyHint = document.getElementById('storyScrollHint');
    var SCENE_NAMES = ['Home', 'Why Us', 'Specialties', 'Get Started'];

    if (storyHint) {
      storyHint.addEventListener('click', function () {
        window.scrollTo({ top: window.scrollY + window.innerHeight * 0.9, behavior: 'smooth' });
      });
    }

    if (storySection && storyVideo && window.ScrollTrigger) {
      var setActiveScene = function (idx) {
        storyScenes.forEach(function (scene) {
          scene.classList.toggle('is-active', Number(scene.dataset.scene) === idx);
        });
        storyDots.forEach(function (dot) {
          dot.classList.toggle('is-active', Number(dot.dataset.dot) === idx);
        });
        if (storyLabel) storyLabel.textContent = SCENE_NAMES[idx] || '';
      };

      var wireScrub = function () {
        if (!isFinite(storyVideo.duration) || storyVideo.duration <= 0) return;
        storyVideo.pause();
        storyVideo.removeAttribute('autoplay');
        storyVideo.loop = false;

        ScrollTrigger.create({
          trigger: storySection,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          onUpdate: function (self) {
            var p = self.progress;
            var t = p * storyVideo.duration;
            if (isFinite(t)) {
              try { storyVideo.currentTime = t; } catch (e) { /* some browsers throttle seeks — safe to ignore */ }
            }
            gsap.set(storyVideo, { scale: 1.06 + p * 0.12 });
            setActiveScene(Math.min(3, Math.floor(p * 4)));
            if (storyHint) gsap.set(storyHint, { opacity: p > 0.03 ? 0 : 1, pointerEvents: p > 0.03 ? 'none' : 'auto' });
          }
        });
      };

      if (storyVideo.readyState >= 1) {
        wireScrub();
      } else {
        storyVideo.addEventListener('loadedmetadata', wireScrub, { once: true });
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
