/* ═══════════════════════════════════════════════
   SOIS SUBLIME — Main JS (vitrine)
   Header scroll, menu mobile, fade-in, slider
   ═══════════════════════════════════════════════ */

(function() {
  'use strict';

  /* ── Header scroll effect ── */
  var header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 40) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
    }, { passive: true });
  }

  /* ── Mobile menu toggle ── */
  var burger = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.header__nav');
  if (burger && nav) {
    burger.addEventListener('click', function() {
      burger.classList.toggle('active');
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });
    // Close on link click
    nav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        burger.classList.remove('active');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Fade-in on scroll ── */
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
    // Fallback: show all
    fadeEls.forEach(function(el) { el.classList.add('visible'); });
  }

  /* ── Active nav link ── */
  var navLinks = document.querySelectorAll('.header__nav a[href^="#"]');
  var sections = document.querySelectorAll('section[id]');
  if (navLinks.length && sections.length && 'IntersectionObserver' in window) {
    var navObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function(l) { l.classList.remove('active'); });
          var active = document.querySelector('.header__nav a[href="#' + entry.target.id + '"]');
          if (active) active.classList.add('active');
        }
      });
    }, { threshold: 0.3 });
    sections.forEach(function(s) { navObserver.observe(s); });
  }

  /* ── Testimonial slider ── */
  var slider = document.querySelector('.testimonial-slider');
  if (slider) {
    var track = slider.querySelector('.testimonial-slider__track');
    var dots = slider.querySelectorAll('.testimonial-slider__dot');
    var slides = slider.querySelectorAll('.testimonial-slider__slide');
    var current = 0;
    var total = slides.length;
    var autoTimer;

    function goTo(idx) {
      current = ((idx % total) + total) % total;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach(function(d, i) {
        d.classList.toggle('active', i === current);
      });
    }

    function next() { goTo(current + 1); }

    function startAuto() {
      stopAuto();
      autoTimer = setInterval(next, 5000);
    }

    function stopAuto() {
      if (autoTimer) clearInterval(autoTimer);
    }

    dots.forEach(function(dot, i) {
      dot.addEventListener('click', function() {
        goTo(i);
        startAuto();
      });
    });

    // Touch support
    var touchStartX = 0;
    track.addEventListener('touchstart', function(e) {
      touchStartX = e.touches[0].clientX;
      stopAuto();
    }, { passive: true });
    track.addEventListener('touchend', function(e) {
      var diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) next(); else goTo(current - 1);
      }
      startAuto();
    }, { passive: true });

    goTo(0);
    startAuto();
  }

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = 100; // header height
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ── Build programs from CONFIG ── */
  var programGrid = document.getElementById('program-grid');
  if (programGrid && typeof CONFIG !== 'undefined') {
    var html = '';
    CONFIG.programs.forEach(function(prog) {
      var modClass = '';
      if (prog.id === 'reset21') modClass = ' program-card--accent';
      if (prog.id === 'evolution') modClass = ' program-card--rose';
      if (prog.comingSoon) modClass = ' program-card--muted';

      html += '<div class="card program-card' + modClass + ' fade-in">';
      html += '<div class="program-card__header">';
      html += '<h3>' + prog.name + '</h3>';
      html += '<div class="program-card__price">' + prog.priceLabel + '</div>';
      html += '<div class="program-card__duration">' + prog.duration + '</div>';
      html += '</div>';
      html += '<p>' + prog.shortDesc + '</p>';
      if (prog.features.length) {
        html += '<ul class="program-card__features">';
        prog.features.forEach(function(f) {
          html += '<li>' + f + '</li>';
        });
        html += '</ul>';
      }
      if (!prog.comingSoon) {
        var href = prog.stripeLink || CONFIG.calendlyUrl;
        var label = prog.id === 'diagnostic' ? 'Prendre RDV' : 'Je me lance';
        html += '<a class="btn btn--primary" href="' + href + '" target="_blank" rel="noopener">' + label + '</a>';
      } else {
        html += '<span class="btn btn--outline" style="opacity:.5;cursor:default;">Bientot disponible</span>';
      }
      html += '</div>';
    });
    programGrid.innerHTML = html;

    // Observe new fade-in elements
    if ('IntersectionObserver' in window) {
      programGrid.querySelectorAll('.fade-in').forEach(function(el) {
        observer.observe(el);
      });
    }
  }

  /* ── Build testimonials from CONFIG ── */
  var testimonialContainer = document.getElementById('testimonial-slider');
  if (testimonialContainer && typeof CONFIG !== 'undefined') {
    var trackHtml = '<div class="testimonial-slider__track">';
    var dotsHtml = '<div class="testimonial-slider__dots">';
    CONFIG.testimonials.forEach(function(t, i) {
      trackHtml += '<div class="testimonial-slider__slide">';
      trackHtml += '<div class="testimonial-card">';
      trackHtml += '<p>' + t.text + '</p>';
      trackHtml += '<div class="testimonial-card__author">' + t.name + '</div>';
      trackHtml += '</div></div>';
      dotsHtml += '<div class="testimonial-slider__dot' + (i === 0 ? ' active' : '') + '"></div>';
    });
    trackHtml += '</div>';
    dotsHtml += '</div>';
    testimonialContainer.innerHTML = trackHtml + dotsHtml;

    // Re-init slider since DOM was rebuilt
    var newTrack = testimonialContainer.querySelector('.testimonial-slider__track');
    var newDots = testimonialContainer.querySelectorAll('.testimonial-slider__dot');
    var newSlides = testimonialContainer.querySelectorAll('.testimonial-slider__slide');
    var sCurrent = 0;
    var sTotal = newSlides.length;
    var sTimer;

    function sGoTo(idx) {
      sCurrent = ((idx % sTotal) + sTotal) % sTotal;
      newTrack.style.transform = 'translateX(-' + (sCurrent * 100) + '%)';
      newDots.forEach(function(d, i) { d.classList.toggle('active', i === sCurrent); });
    }
    function sNext() { sGoTo(sCurrent + 1); }
    function sStart() { sStop(); sTimer = setInterval(sNext, 5000); }
    function sStop() { if (sTimer) clearInterval(sTimer); }

    newDots.forEach(function(dot, i) {
      dot.addEventListener('click', function() { sGoTo(i); sStart(); });
    });

    var sTouchX = 0;
    newTrack.addEventListener('touchstart', function(e) { sTouchX = e.touches[0].clientX; sStop(); }, { passive: true });
    newTrack.addEventListener('touchend', function(e) {
      var d = sTouchX - e.changedTouches[0].clientX;
      if (Math.abs(d) > 50) { if (d > 0) sNext(); else sGoTo(sCurrent - 1); }
      sStart();
    }, { passive: true });

    sGoTo(0);
    sStart();
  }

  /* ── Build pillars from CONFIG ── */
  var pillarGrid = document.getElementById('pillar-grid');
  if (pillarGrid && typeof CONFIG !== 'undefined') {
    var icons = { leaf: '\uD83C\uDF3F', heart: '\u2764\uFE0F', star: '\u2728' };
    var pHtml = '';
    CONFIG.pillars.forEach(function(p) {
      pHtml += '<div class="card pillar-card fade-in">';
      pHtml += '<div class="pillar-card__icon">' + (icons[p.icon] || '') + '</div>';
      pHtml += '<h3>' + p.title + '</h3>';
      pHtml += '<p>' + p.text + '</p>';
      pHtml += '</div>';
    });
    pillarGrid.innerHTML = pHtml;
    if ('IntersectionObserver' in window) {
      pillarGrid.querySelectorAll('.fade-in').forEach(function(el) { observer.observe(el); });
    }
  }

})();
