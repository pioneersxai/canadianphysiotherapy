/**
 * ===================================
 * CANADIAN PHYSIO CENTER — DATA-DRIVEN RENDERING
 * Reads the BRAND object from config.js and builds the repeating
 * sections (accreditations, stats, services, team, branches,
 * testimonials) so config.js stays the single source of truth.
 * Runs before animations.js sets up its IntersectionObserver, so
 * every injected .fade-in / .stat-item element still gets observed.
 * ===================================
 */
(function () {
  'use strict';

  function el(html) {
    var t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  function renderAccreditations() {
    var track = document.getElementById('accredTrack');
    if (!track || !window.BRAND) return;
    BRAND.accreditations.forEach(function (a) {
      track.appendChild(el('<img src="' + a.logo + '" alt="' + a.name + '" loading="lazy">'));
    });
  }

  function renderStats() {
    var grid = document.getElementById('statsGrid');
    if (!grid || !window.BRAND) return;
    BRAND.stats.forEach(function (s) {
      grid.appendChild(el(
        '<div class="stat-item fade-in">' +
          '<div class="stat-number">' + s.number + '</div>' +
          '<div class="stat-label">' + s.label + '</div>' +
        '</div>'
      ));
    });
  }

  function renderServices() {
    var grid = document.getElementById('servicesGrid');
    if (!grid || !window.BRAND) return;
    BRAND.services.forEach(function (s, i) {
      // Each service photo already has a real anatomical highlight overlay
      // baked in by the client (skeletal/pain-zone graphic on real patient
      // photography) — no separate icon graphic needed on top of it.
      grid.appendChild(el(
        '<div class="service-card fade-in">' +
          '<div class="service-card-img"><img src="' + s.image + '" alt="' + s.name + '" loading="lazy"></div>' +
          '<span class="service-number">' + String(i + 1).padStart(2, '0') + '</span>' +
          '<h3 class="service-title">' + s.name + '</h3>' +
          '<p class="service-description"><strong>' + s.tagline + '.</strong> ' + s.description + '</p>' +
          '<a href="' + s.link + '" class="btn btn-secondary btn-service">Learn More</a>' +
        '</div>'
      ));
    });
  }

  function renderTeamHighlight() {
    var grid = document.getElementById('teamHighlight');
    if (!grid || !window.BRAND) return;
    BRAND.team.slice(0, 4).forEach(function (m) {
      grid.appendChild(el(
        '<div class="team-card fade-in">' +
          '<div class="team-card-img"><img src="' + m.photo + '" alt="' + m.name + '" loading="lazy"></div>' +
          '<h3 class="team-name">' + m.name + '</h3>' +
          '<p class="team-role">' + m.role + '</p>' +
        '</div>'
      ));
    });
  }

  function renderBranches() {
    var grid = document.getElementById('branchGrid');
    if (!grid || !window.BRAND) return;
    BRAND.locations.forEach(function (loc) {
      var mapSrc = 'https://www.google.com/maps?q=' + encodeURIComponent(loc.address) + '&output=embed';
      grid.appendChild(el(
        '<div class="branch-card fade-in">' +
          '<iframe class="branch-map" src="' + mapSrc + '" loading="lazy" allowfullscreen></iframe>' +
          '<div class="branch-body">' +
            '<h3>' + loc.name + '</h3>' +
            '<p><i class="fas fa-map-marker-alt"></i> ' + loc.address + '</p>' +
            '<a href="https://wa.me/' + loc.whatsapp + '" class="btn btn-whatsapp btn-sm" target="_blank"><i class="fab fa-whatsapp"></i> ' + loc.phone + '</a>' +
          '</div>' +
        '</div>'
      ));
    });
  }

  function initials(name) {
    return name.split(' ').map(function (p) { return p[0]; }).join('').slice(0, 2).toUpperCase();
  }

  function renderTestimonials() {
    var grid = document.getElementById('testimonialsGrid');
    if (!grid || !window.BRAND) return;
    BRAND.testimonials.forEach(function (t) {
      grid.appendChild(el(
        '<div class="testimonial fade-in">' +
          '<p class="testimonial-text">&ldquo;' + t.text + '&rdquo;</p>' +
          '<div class="testimonial-author">' +
            '<div class="author-avatar">' + initials(t.author) + '</div>' +
            '<div class="author-info"><h4>' + t.author + '</h4><p>' + t.role + '</p></div>' +
          '</div>' +
        '</div>'
      ));
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderAccreditations();
    renderStats();
    renderServices();
    renderTeamHighlight();
    renderBranches();
    renderTestimonials();
  });
})();
