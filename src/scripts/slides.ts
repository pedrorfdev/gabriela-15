const INTERVAL_MS = 5000;

/** Cross-fades the [data-slide] children of every [data-slides] container, one at a time. */
export function initSlides() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll<HTMLElement>('[data-slides]').forEach((container) => {
    const slides = Array.from(container.querySelectorAll<HTMLElement>('[data-slide]'));
    if (slides.length < 2) return;

    let current = 0;
    window.setInterval(() => {
      if (document.hidden) return;

      slides[current].dataset.active = 'false';
      current = (current + 1) % slides.length;
      slides[current].dataset.active = 'true';
    }, INTERVAL_MS);
  });
}