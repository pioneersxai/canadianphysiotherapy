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

    // ── Lenis smooth scroll ──
    // Native scroll is snappy/jumpy; Lenis eases every wheel/touch delta so
    // the whole page (not just the pinned story) feels weighted instead of
    // jerky — the single biggest "feel" gap next to a site like mont-fort.com.
    // It updates the real window scroll position (not a virtual one), so
    // nothing else in this file has to know it's there. Guarded: if the CDN
    // fails, the browser just falls back to normal native scroll.
    if (typeof Lenis !== 'undefined') {
      try {
        var lenis = new Lenis({ smoothWheel: true, lerp: 0.1 });
        if (window.ScrollTrigger) lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
        gsap.ticker.lagSmoothing(0);
      } catch (e) { /* smooth scroll is an enhancement, never a requirement */ }
    }

    // ── Vanta (three.js/WebGL) fog — the "world" behind the story chapters ──
    // Brand-recolored ambient atmosphere, same family of technique
    // mont-fort.com uses for its live 3D backdrop, without needing a custom
    // shader or 3D assets. Wrapped in try/catch: WebGL can be unavailable or
    // context-lost on some devices, and .story-tint's gradient alone still
    // reads as a complete, intentional dark hero if this never runs.
    var webglEl = document.getElementById('storyWebgl');
    if (webglEl && window.VANTA && window.VANTA.FOG) {
      try {
        // Lower blurFactor/speed than the Vanta defaults on purpose: the
        // higher settings we shipped first washed the gold highlight and
        // navy midtone into an indistinct olive "swamp" — crisper wisps
        // and slower drift read as quiet mist instead of murky water.
        window.VANTA.FOG({
          el: webglEl,
          mouseControls: false, touchControls: false, gyroControls: false,
          minHeight: 200, minWidth: 200,
          highlightColor: 0xf5cf77, midtoneColor: 0x0e3e40,
          lowlightColor: 0x081f20, baseColor: 0x061415,
          blurFactor: 0.38, speed: 0.8, zoom: 1.3
        });
      } catch (e) { /* see comment above */ }
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
