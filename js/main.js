/**
 * ===================================
 * CANADIAN PHYSIO CENTER — MAIN JAVASCRIPT
 * Contact/booking form → WhatsApp handoff, stat counters, notifications,
 * footer year, lazy image loading. Navbar scroll/hamburger/loader/smooth
 * scroll now live in js/nav.js — kept separate so this file only owns
 * page behavior, not chrome that's identical on every page.
 * ===================================
 */

'use strict';

/**
 * ===================================
 * BOOKING / CONTACT FORM → WHATSAPP
 * Only runs on pages that actually have #contactForm (contact.html) —
 * guarded so pages without a form (index.html, service pages) don't error.
 * ===================================
 */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        if (!validateForm(data)) return;

        const message = createWhatsAppMessage(data);
        const branch = (typeof BRAND !== 'undefined' && BRAND.locations)
            ? (BRAND.locations.find(l => l.id === data.branch) || BRAND.locations[0])
            : null;
        const waNumber = branch ? branch.whatsapp : ((typeof BRAND !== 'undefined') ? BRAND.whatsapp : '201113372169');
        const whatsappUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappUrl, '_blank');
        showNotification('success', 'Thanks — WhatsApp is opening so we can confirm your appointment.');
        contactForm.reset();
    });
}

/**
 * Validate booking form data
 */
function validateForm(data) {
    if (!data.name || !data.phone || !data.message) {
        showNotification('error', 'Please fill in your name, phone number, and message.');
        return false;
    }

    const phoneRegex = /^[0-9+\-\s()]+$/;
    if (!phoneRegex.test(data.phone)) {
        showNotification('error', 'Please enter a valid phone number.');
        return false;
    }

    return true;
}

/**
 * Build the WhatsApp message from booking form data
 */
function createWhatsAppMessage(data) {
    return `Hello, I'd like to book an appointment:

Name: ${data.name}
Phone: ${data.phone}
Branch: ${getBranchName(data.branch)}
Service: ${getServiceName(data.service)}
Message: ${data.message}`;
}

/**
 * Resolve a branch id to its display name via BRAND.locations
 */
function getBranchName(id) {
    if (typeof BRAND === 'undefined' || !BRAND.locations) return id || 'Not specified';
    const branch = BRAND.locations.find(l => l.id === id);
    return branch ? branch.name : (id || 'Not specified');
}

/**
 * Resolve a service id to its display name via BRAND.services
 */
function getServiceName(id) {
    if (typeof BRAND === 'undefined' || !BRAND.services) return id || 'Not specified';
    const service = BRAND.services.find(s => s.id === id);
    return service ? service.name : (id || 'Not specified');
}

/**
 * ===================================
 * NOTIFICATION SYSTEM
 * ===================================
 */
function showNotification(type, message) {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) existingNotification.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('notification-hide');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

/**
 * ===================================
 * COUNTER ANIMATION FOR STATS
 * Triggered by animations.js's IntersectionObserver when .stats
 * scrolls into view (see js/animations.js).
 * ===================================
 */
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = counter.textContent;
        const isPercentage = target.includes('%');
        const isPlus = target.includes('+');
        const is247 = target.includes('/');

        const numericTarget = parseInt(target.replace(/[^\d]/g, ''));
        if (isNaN(numericTarget)) return;

        let current = 0;
        const increment = numericTarget / 50;
        const duration = 2000;
        const stepTime = duration / 50;

        const timer = setInterval(() => {
            current += increment;
            if (current >= numericTarget) {
                counter.textContent = target;
                clearInterval(timer);
            } else if (is247) {
                counter.textContent = '24/7';
            } else {
                counter.textContent = Math.floor(current) + (isPercentage ? '%' : isPlus ? '+' : '');
            }
        }, stepTime);
    });
}

/**
 * ===================================
 * DYNAMIC YEAR IN FOOTER
 * ===================================
 */
const footerYearEl = document.querySelector('.footer-bottom p');
if (footerYearEl) {
    const currentYear = new Date().getFullYear();
    footerYearEl.innerHTML = footerYearEl.innerHTML.replace(/©\s*\d{4}/, `© ${currentYear}`);
}

/**
 * ===================================
 * LAZY LOADING IMAGES (img[data-src])
 * ===================================
 */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

/**
 * ===================================
 * EXPORT FUNCTIONS FOR USE IN OTHER SCRIPTS
 * ===================================
 */
window.CanadianPhysio = {
    showNotification,
    animateCounters
};
