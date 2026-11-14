const VISIBLE_CLASS = 'is-visible';

/**
 * Adds `is-visible` to every [data-reveal] element the first time it scrolls
 * into view. `data-reveal-delay` (ms) staggers siblings.
 */
export function initReveal() {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (targets.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        const element = entry.target as HTMLElement;
        const delay = element.dataset.revealDelay;
        if (delay) element.style.transitionDelay = `${delay}ms`;

        element.classList.add(VISIBLE_CLASS);
        observer.unobserve(element);
      }
    },
    { threshold: 0.2, rootMargin: '0px 0px -10% 0px' },
  );

  targets.forEach((element) => observer.observe(element));
}