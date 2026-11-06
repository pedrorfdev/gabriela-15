const TEAR_DELAY_MS = 500;
const SETTLE_DELAY_MS = 650;

type StageState = 'whole' | 'torn' | 'bento';

function setState(stage: HTMLElement, state: StageState) {
  stage.dataset.state = state;
}

function playTear(stage: HTMLElement) {
  window.setTimeout(() => setState(stage, 'torn'), TEAR_DELAY_MS);
  window.setTimeout(() => setState(stage, 'bento'), TEAR_DELAY_MS + SETTLE_DELAY_MS);
}

/**
 * Plays the ticket tear once, when the ticket is mostly on screen.
 * Reduced-motion visitors skip straight to the final bento layout.
 */
export function initDetailsTear() {
  const stage = document.getElementById('details-stage');
  if (!stage) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setState(stage, 'bento');
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      playTear(stage);
    },
    { threshold: 0.6 },
  );

  observer.observe(stage);
}