import { GATE_UNLOCKED_EVENT } from '@/lib/constants';
import { measureGeometry, type Geometry, type Parts } from './geometry';
import { renderFrame } from './render';
import { frameAt } from './timeline';

const WIDE_QUERY = '(min-width: 640px)';
const HOLD_MS = 2800; // how long the whole ticket stays on screen before it tears by itself
const DURATION_MS = 4200;
const FIRST_SCROLL_PX = 12; // scrolling this far also starts the tear

type Status = 'idle' | 'playing' | 'done';

function find(root: HTMLElement, name: string): HTMLElement {
  const element = root.querySelector<HTMLElement>(`[data-part="${name}"]`);
  if (!element) throw new Error(`[entrance] missing element: ${name}`);
  return element;
}

function collectParts(root: HTMLElement): Parts {
  return {
    stage: find(root, 'stage'),
    ticket: find(root, 'ticket'),
    stub: find(root, 'stub'),
    body: find(root, 'body'),
    hero: find(root, 'hero'),
    nameStart: find(root, 'name-start'),
    nameEnd: find(root, 'name-end'),
    countdownStart: find(root, 'countdown-start'),
    countdownEnd: find(root, 'countdown-end'),
    nameTile: find(root, 'name-tile'),
    countdownTile: find(root, 'countdown-tile'),
    flyName: find(root, 'fly-name'),
    flyCountdown: find(root, 'fly-countdown'),
    tileContents: Array.from(root.querySelectorAll<HTMLElement>('[data-part="tile-content"]')),
  };
}

function whenGateOpen(callback: () => void) {
  if (document.documentElement.dataset.unlocked === 'true') {
    callback();
    return;
  }
  window.addEventListener(GATE_UNLOCKED_EVENT, callback, { once: true });
}

function isOutOfView(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return rect.bottom < 0 || rect.top > window.innerHeight;
}

function run(root: HTMLElement) {
  const parts = collectParts(root);
  const wide = window.matchMedia(WIDE_QUERY);
  const skipAnimation =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    new URLSearchParams(window.location.search).get('entrance') === 'final';

  let geometry: Geometry | null = null;
  let progress = 0;
  let status: Status = 'idle';
  let frameId = 0;
  let holdId = 0;

  function show(next: number) {
    progress = next;
    renderFrame(parts, frameAt(next), geometry, wide.matches);
  }

  function measure() {
    const keep = progress;
    geometry = null;
    geometry = measureGeometry(parts, show);
    parts.flyName.style.opacity = '1';
    parts.flyCountdown.style.opacity = '1';
    show(keep);
  }

  function finish() {
    window.clearTimeout(holdId);
    cancelAnimationFrame(frameId);
    status = 'done';
    root.dataset.state = 'done';
    show(1);
  }

  function play() {
    if (status !== 'idle') return;
    status = 'playing';
    window.clearTimeout(holdId);
    root.dataset.state = 'playing';

    const startedAt = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - startedAt) / DURATION_MS);
      show(t);
      if (t < 1) frameId = requestAnimationFrame(step);
      else finish();
    };
    frameId = requestAnimationFrame(step);
  }

  function armTriggers() {
    holdId = window.setTimeout(play, HOLD_MS);

    const onScroll = () => {
      if (window.scrollY <= FIRST_SCROLL_PX) return;
      window.removeEventListener('scroll', onScroll);
      play();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  async function start() {
    await Promise.all([
      document.fonts.load("italic 500 48px 'Bodoni Moda'"),
      document.fonts.load('400 14px Jost'),
    ]).catch(() => undefined);

    measure();
    if (skipAnimation || isOutOfView(root)) {
      finish();
      return;
    }
    whenGateOpen(armTriggers);
  }

  // The menu's "Detalhes" link goes straight to the finished layout.
  document.addEventListener('click', (event) => {
    const link = (event.target as HTMLElement).closest('a[href$="#details"]');
    if (link && status !== 'done') finish();
  });

  let resizeId = 0;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeId);
    resizeId = window.setTimeout(measure, 150);
  });

  void start();
}

export function initEntrance() {
  const root = document.querySelector<HTMLElement>('[data-entrance]');
  if (root) run(root);
}