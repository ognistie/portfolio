/* ============================================================
   PORTFOLIO — script.js
   Guilherme Moraes Franco · @ognistie
   ============================================================ */

'use strict';

/* ── UTILS ──────────────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* ══════════════════════════════════════════════════════════════
   1. NAVBAR
   — Adds shadow when scrolled
   — Marks active section link on scroll
   — Mobile hamburger toggle
══════════════════════════════════════════════════════════════ */
(function initNavbar() {
  const nav       = $('#nav');
  const navUl     = $('#navUl');
  const hamburger = $('#hamburger');
  const links     = $$('.nav-ul a');

  /* shadow on scroll */
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  /* hamburger toggle */
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      navUl.classList.toggle('mobile-open', isOpen);
    });

    /* close on link click */
    links.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navUl.classList.remove('mobile-open');
      });
    });

    /* close on outside click */
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target)) {
        hamburger.classList.remove('open');
        navUl.classList.remove('mobile-open');
      }
    });
  }

  /* active link on scroll */
  const sections = $$('section[id]');
  const secObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(l => l.classList.remove('on'));
      const active = $$(`.nav-ul a[href="#${entry.target.id}"]`);
      active.forEach(a => a.classList.add('on'));
    });
  }, { rootMargin: '-38% 0px -57% 0px' });

  sections.forEach(sec => secObserver.observe(sec));
})();

/* ══════════════════════════════════════════════════════════════
   2. SCROLL REVEAL
   — Uses IntersectionObserver
   — Supports data-delay attribute (0–11) for stagger
══════════════════════════════════════════════════════════════ */
(function initReveal() {
  const STAGGER = 65; // ms per step
  const elements = $$('.rv');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const delay = parseInt(el.dataset.delay ?? '0', 10) * STAGGER;
      setTimeout(() => el.classList.add('in'), delay);
      observer.unobserve(el);
    });
  }, { threshold: 0.08 });

  elements.forEach(el => observer.observe(el));
})();

/* ══════════════════════════════════════════════════════════════
   3. SMOOTH SCROLL
   — Intercepts all anchor [href^="#"] clicks
   — Offsets for fixed navbar height
══════════════════════════════════════════════════════════════ */
(function initSmoothScroll() {
  const NAV_H = 64; // px offset for fixed nav

  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;

    const target = $(targetId);
    if (!target) return;

    e.preventDefault();

    const top = target.getBoundingClientRect().top + window.scrollY - NAV_H;
    window.scrollTo({ top, behavior: 'smooth' });
  });
})();

/* ══════════════════════════════════════════════════════════════
   4. CARD TILT EFFECT
   — Subtle 3D tilt on mouse move over project/skill cards
   — Resets on mouse leave
══════════════════════════════════════════════════════════════ */
(function initTilt() {
  const INTENSITY = 5; // degrees max
  const cards = $$('.pj-card, .sk-card, .cr-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (e.clientX - cx) / (rect.width  / 2);
      const dy   = (e.clientY - cy) / (rect.height / 2);
      const rotX =  dy * -INTENSITY;
      const rotY =  dx *  INTENSITY;
      card.style.transform = `translateY(-4px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      card.style.transition = 'transform 0.05s linear';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform  = '';
      card.style.transition = '';
    });
  });
})();

/* ══════════════════════════════════════════════════════════════
   5. ANIMATED COUNTERS
   — Animates numbers in .fp-n elements on first visible
══════════════════════════════════════════════════════════════ */
(function initCounters() {
  const counters = $$('.fp-n');

  const animateCounter = (el, target, suffix = '') => {
    const duration = 1200;
    const start    = performance.now();

    const tick = (now) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current  = Math.floor(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el   = entry.target;
      const text = el.textContent.trim();
      const num  = parseInt(text, 10);
      const suf  = text.replace(/[0-9]/g, '');
      if (!isNaN(num)) animateCounter(el, num, suf);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();

/* ══════════════════════════════════════════════════════════════
   6. CURSOR STYLE ON LINKS
   — Adds arrow animation hint to external project links
══════════════════════════════════════════════════════════════ */
(function initLinkHints() {
  $$('.pj-card, .ct-item').forEach(el => {
    el.style.cursor = 'pointer';
  });
})();

/* ══════════════════════════════════════════════════════════════
   7. BANNER IMAGE ERROR FALLBACK (safety net)
══════════════════════════════════════════════════════════════ */
(function initImageFallbacks() {
  const banner = $('.hc-banner');
  const fallback = $('#hcFallback');
  if (banner && fallback) {
    if (banner.complete && banner.naturalHeight === 0) {
      banner.style.display = 'none';
      fallback.style.display = 'flex';
    }
  }
})();