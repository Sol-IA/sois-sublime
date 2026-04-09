/* ═══════════════════════════════════════════════
   SOIS SUBLIME — Main JS (vitrine)
   Header scroll, menu mobile, fade-in, slider,
   dynamic content from CONFIG
   ═══════════════════════════════════════════════ */

(function() {
  'use strict';

  /* ═══ SVG ICONS ═══ */
  var SVG = {
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="32" height="32"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="32" height="32"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="32" height="32"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    quote: '<svg viewBox="0 0 24 24" fill="currentColor" opacity="0.15" width="48" height="48"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>'
  };

  /* ═══ HEADER SCROLL ═══ */
  var header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function() {
      header.classList.toggle('header--scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ═══ MOBILE MENU ═══ */
  var burger = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.header__nav');
  if (burger && nav) {
    burger.addEventListener('click', function() {
      burger.classList.toggle('active');
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });
    nav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        burger.classList.remove('active');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ═══ SMOOTH SCROLL ═══ */
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.pageYOffset - 90;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ═══ BUILD DYNAMIC CONTENT FROM CONFIG ═══ */
  if (typeof CONFIG === 'undefined') return;

  /* ── Pillars ── */
  var pillarGrid = document.getElementById('pillar-grid');
  if (pillarGrid) {
    var ph = '';
    CONFIG.pillars.forEach(function(p) {
      var icon = SVG[p.icon] || '';
      ph += '<div class="card pillar-card fade-in">';
      ph += '<div class="pillar-card__icon">' + icon + '</div>';
      ph += '<h3>' + p.title + '</h3>';
      ph += '<p>' + p.text + '</p>';
      ph += '</div>';
    });
    pillarGrid.innerHTML = ph;
  }

  /* ── Programs ── */
  var programGrid = document.getElementById('program-grid');
  if (programGrid) {
    var prh = '';
    CONFIG.programs.forEach(function(prog) {
      var modClass = '';
      if (prog.id === 'reset21') modClass = ' program-card--accent';
      if (prog.id === 'evolution') modClass = ' program-card--rose';
      if (prog.comingSoon) modClass = ' program-card--muted';

      prh += '<div class="card program-card' + modClass + ' fade-in">';
      prh += '<div class="program-card__header">';
      prh += '<h3>' + prog.name + '</h3>';
      prh += '<div class="program-card__price">' + prog.priceLabel + '</div>';
      prh += '<div class="program-card__duration">' + prog.duration + '</div>';
      prh += '</div>';
      prh += '<div class="program-card__body">';
      prh += '<p>' + prog.shortDesc + '</p>';
      if (prog.features && prog.features.length) {
        prh += '<ul class="program-card__features">';
        prog.features.forEach(function(f) { prh += '<li>' + f + '</li>'; });
        prh += '</ul>';
      }
      if (!prog.comingSoon) {
        var href = prog.stripeLink || CONFIG.calendlyUrl;
        var label = prog.id === 'diagnostic' ? 'Prendre RDV' : 'Je me lance';
        prh += '<a class="btn btn--primary" href="' + href + '" target="_blank" rel="noopener">' + label + '</a>';
      } else {
        prh += '<span class="btn btn--outline" style="opacity:.5;cursor:default;">Bientot disponible</span>';
      }
      prh += '</div></div>';
    });
    programGrid.innerHTML = prh;
  }

  /* ── Testimonials ── */
  var sliderEl = document.getElementById('testimonial-slider');
  if (sliderEl && CONFIG.testimonials && CONFIG.testimonials.length) {
    var th = '<div class="testimonial-slider__track">';
    var dh = '<div class="testimonial-slider__dots">';
    CONFIG.testimonials.forEach(function(t, i) {
      th += '<div class="testimonial-slider__slide"><div class="testimonial-card">';
      th += '<div class="testimonial-card__quote">' + SVG.quote + '</div>';
      th += '<p>&laquo; ' + t.text + ' &raquo;</p>';
      th += '<div class="testimonial-card__author">' + t.name + '</div>';
      th += '</div></div>';
      dh += '<div class="testimonial-slider__dot' + (i === 0 ? ' active' : '') + '"></div>';
    });
    th += '</div>';
    dh += '</div>';
    sliderEl.innerHTML = th + dh;

    // Init slider
    var track = sliderEl.querySelector('.testimonial-slider__track');
    var dots = sliderEl.querySelectorAll('.testimonial-slider__dot');
    var total = CONFIG.testimonials.length;
    var cur = 0;
    var timer;

    function go(idx) {
      cur = ((idx % total) + total) % total;
      track.style.transform = 'translateX(-' + (cur * 100) + '%)';
      dots.forEach(function(d, i) { d.classList.toggle('active', i === cur); });
    }
    function nxt() { go(cur + 1); }
    function startAuto() { stopAuto(); timer = setInterval(nxt, 5000); }
    function stopAuto() { if (timer) clearInterval(timer); }

    dots.forEach(function(dot, i) {
      dot.addEventListener('click', function() { go(i); startAuto(); });
    });

    var tx = 0;
    track.addEventListener('touchstart', function(e) { tx = e.touches[0].clientX; stopAuto(); }, { passive: true });
    track.addEventListener('touchend', function(e) {
      var d = tx - e.changedTouches[0].clientX;
      if (Math.abs(d) > 50) { d > 0 ? nxt() : go(cur - 1); }
      startAuto();
    }, { passive: true });

    go(0);
    startAuto();
  }

  /* ═══ FADE-IN ON SCROLL (after all dynamic content is built) ═══ */
  var fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach(function(el) { observer.observe(el); });
  } else {
    fadeEls.forEach(function(el) { el.classList.add('visible'); });
  }

  /* ═══ ACTIVE NAV ON SCROLL ═══ */
  var navLinks = document.querySelectorAll('.header__nav a[href^="#"]');
  var sects = document.querySelectorAll('section[id]');
  if (navLinks.length && sects.length && 'IntersectionObserver' in window) {
    var navObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function(l) { l.classList.remove('active'); });
          var a = document.querySelector('.header__nav a[href="#' + entry.target.id + '"]');
          if (a) a.classList.add('active');
        }
      });
    }, { threshold: 0.3 });
    sects.forEach(function(s) { navObs.observe(s); });
  }

})();
