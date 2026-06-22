/* Site-wide image lightbox: click any photo to maximise it. */
(function () {
  let overlay, imgEl, capEl;

  function build() {
    overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.innerHTML =
      '<button class="lightbox__close" type="button" aria-label="Close">&times;</button>' +
      '<img class="lightbox__img" alt="">' +
      '<p class="lightbox__caption"></p>';
    document.body.appendChild(overlay);
    imgEl = overlay.querySelector('.lightbox__img');
    capEl = overlay.querySelector('.lightbox__caption');
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target.classList.contains('lightbox__close')) close();
    });
  }

  function open(src, alt) {
    if (!overlay) build();
    imgEl.src = src;
    imgEl.alt = alt || '';
    capEl.textContent = alt || '';
    overlay.classList.add('open');
    document.body.classList.add('lightbox-open');
  }

  function close() {
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.classList.remove('lightbox-open');
    imgEl.src = '';
  }

  document.addEventListener('click', (e) => {
    const img = e.target.closest('img');
    if (!img) return;
    if (overlay && overlay.contains(img)) return;   // ignore the lightbox's own image
    if (img.closest('a')) return;                    // let linked images follow their link
    if (img.dataset.noLightbox !== undefined) return;
    e.preventDefault();
    open(img.currentSrc || img.src, img.alt);
  });

  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
})();
