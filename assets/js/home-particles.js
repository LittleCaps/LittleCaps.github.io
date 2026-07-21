/* Hero particle network — dark band, gold links, pass-network flavor. */
(function () {
  'use strict';

  var canvas = document.getElementById('hero-particles');
  var band = document.getElementById('omBand');
  if (!canvas || !band || !canvas.getContext) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var ctx = canvas.getContext('2d');
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var particles = [];
  var COUNT = 60;
  var LINK_DIST = 130;
  var width = 0;
  var height = 0;
  var mouseX = 0.5;
  var mouseY = 0.5;
  var running = false;
  var rafId = null;

  function resize() {
    width = band.clientWidth;
    height = band.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function makeParticles() {
    particles = [];
    for (var i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1 + Math.random() * 1.8,
        warm: Math.random() < 0.4
      });
    }
  }

  function step() {
    if (!running) return;
    ctx.clearRect(0, 0, width, height);

    var px = (mouseX - 0.5) * 14;
    var py = (mouseY - 0.5) * 10;

    var i, j, p, q;
    for (i = 0; i < particles.length; i++) {
      p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;
      if (p.y < -10) p.y = height + 10;
      if (p.y > height + 10) p.y = -10;
    }

    for (i = 0; i < particles.length; i++) {
      p = particles[i];
      for (j = i + 1; j < particles.length; j++) {
        q = particles[j];
        var dx = p.x - q.x;
        var dy = p.y - q.y;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d < LINK_DIST) {
          var a = (1 - d / LINK_DIST) * 0.35;
          ctx.strokeStyle = 'rgba(201, 162, 75, ' + a.toFixed(3) + ')';
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(p.x + px, p.y + py);
          ctx.lineTo(q.x + px, q.y + py);
          ctx.stroke();
        }
      }
    }

    for (i = 0; i < particles.length; i++) {
      p = particles[i];
      ctx.beginPath();
      ctx.arc(p.x + px, p.y + py, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.warm
        ? 'rgba(201, 162, 75, 0.9)'
        : 'rgba(235, 233, 228, 0.55)';
      ctx.fill();
    }

    rafId = window.requestAnimationFrame(step);
  }

  function start() {
    if (running) return;
    running = true;
    rafId = window.requestAnimationFrame(step);
  }

  function stop() {
    running = false;
    if (rafId) window.cancelAnimationFrame(rafId);
    rafId = null;
  }

  band.addEventListener('mousemove', function (e) {
    var rect = band.getBoundingClientRect();
    mouseX = (e.clientX - rect.left) / rect.width;
    mouseY = (e.clientY - rect.top) / rect.height;
  });

  window.addEventListener('resize', function () {
    resize();
    makeParticles();
  });

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { stop(); } else { start(); }
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { start(); } else { stop(); }
      });
    }, { threshold: 0.05 }).observe(band);
  } else {
    start();
  }

  resize();
  makeParticles();
})();
