(function () {
  var INTERVAL = 5000;
  var current = 0;
  var timer;

  function go(n) {
    var slides = document.querySelectorAll('.hero__slide');
    var dots   = document.querySelectorAll('.hero__dot');
    if (!slides.length) return;
    slides[current].classList.remove('is-active');
    if (dots[current]) dots[current].classList.remove('is-active');
    current = ((n % slides.length) + slides.length) % slides.length;
    slides[current].classList.add('is-active');
    if (dots[current]) dots[current].classList.add('is-active');
  }

  function start() {
    var slides = document.querySelectorAll('.hero__slide');
    if (slides.length <= 1) return;
    timer = setInterval(function () { go(current + 1); }, INTERVAL);
    document.querySelectorAll('.hero__dot').forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        clearInterval(timer);
        go(i);
        timer = setInterval(function () { go(current + 1); }, INTERVAL);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
