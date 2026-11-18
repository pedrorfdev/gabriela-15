import type { Flight, Geometry, Parts } from './geometry';
import { mix, type Frame } from './timeline';

const TORN_THRESHOLD = 0.3;
const BODY_TILT_RATIO = 0.8;

function shift(distance: number, tilt: number, isWide: boolean): string {
  const axis = isWide ? 'X' : 'Y';
  return `translate${axis}(${distance}px) rotate(${tilt}deg)`;
}

function placeFlyer(element: HTMLElement, flight: Flight, frame: Frame, isWide: boolean) {
  const pullX = isWide ? frame.pull : 0;
  const pullY = isWide ? 0 : frame.pull;
  const x = mix(flight.from.x + pullX, flight.to.x, frame.move);
  const y = mix(flight.from.y + pullY, flight.to.y, frame.move);
  const scale = mix(1, flight.scale, frame.move);

  element.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
}

/** Writes one animation frame into the DOM. Wide screens tear sideways, narrow ones tear vertically. */
export function renderFrame(parts: Parts, frame: Frame, geometry: Geometry | null, isWide: boolean) {
  const { ticket, stub, body, hero, tileContents } = parts;

  stub.style.transform = shift(-frame.pull, -frame.tilt, isWide);
  body.style.transform = shift(frame.pull, frame.tilt * BODY_TILT_RATIO, isWide);

  for (const piece of [stub, body]) {
    piece.dataset.torn = String(frame.bite > TORN_THRESHOLD);
    piece.style.setProperty('--bite', `${frame.bite}px`);
  }

  ticket.style.gap = `${frame.gap}px`;
  body.style.gap = `${frame.gap}px`;
  ticket.style.setProperty('--r-in', `${frame.innerRadius}px`);
  ticket.style.setProperty('--perf', String(frame.perforation));

  hero.style.opacity = String(frame.heroOpacity);
  for (const content of tileContents) content.style.opacity = String(frame.tilesOpacity);

  if (!geometry) return;
  placeFlyer(parts.flyName, geometry.name, frame, isWide);
  placeFlyer(parts.flyCountdown, geometry.countdown, frame, isWide);
}