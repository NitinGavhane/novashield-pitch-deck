document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const progress = document.getElementById('progress');
  const counter = document.getElementById('slide-counter');
  let current = 0;

  function updateSlide(idx) {
    slides.forEach((s, i) => s.classList.toggle('active', i === idx));
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    progress.style.width = ((idx + 1) / slides.length * 100) + '%';
    counter.textContent = String(idx + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
    current = idx;
    animateCounters();
  }

  window.gotoSlide = function (idx) {
    slides[idx].scrollIntoView({ behavior: 'smooth' });
    updateSlide(idx);
  };

  document.getElementById('btn-next').onclick = function () {
    gotoSlide(Math.min(current + 1, slides.length - 1));
  };
  document.getElementById('btn-prev').onclick = function () {
    gotoSlide(Math.max(current - 1, 0));
  };

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') gotoSlide(Math.min(current + 1, slides.length - 1));
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') gotoSlide(Math.max(current - 1, 0));
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
        var idx = parseInt(entry.target.dataset.idx);
        updateSlide(idx);
      }
    });
  }, { threshold: 0.5 });
  slides.forEach(function (s) { observer.observe(s); });

  function animateCounters() {
    var slide = slides[current];
    slide.querySelectorAll('[data-target]').forEach(function (el) {
      var target = parseInt(el.dataset.target);
      var count = 0;
      var step = Math.ceil(target / 40);
      var t = setInterval(function () {
        count = Math.min(count + step, target);
        el.textContent = count;
        if (count >= target) clearInterval(t);
      }, 30);
    });
    slide.querySelectorAll('[data-text]').forEach(function (el) {
      el.textContent = el.dataset.text;
    });
  }

  updateSlide(0);
});