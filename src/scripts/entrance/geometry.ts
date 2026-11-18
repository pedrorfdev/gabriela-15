export interface Parts {
  stage: HTMLElement;
  ticket: HTMLElement;
  stub: HTMLElement;
  body: HTMLElement;
  hero: HTMLElement;
  nameStart: HTMLElement;
  nameEnd: HTMLElement;
  countdownStart: HTMLElement;
  countdownEnd: HTMLElement;
  nameTile: HTMLElement;
  countdownTile: HTMLElement;
  flyName: HTMLElement;
  flyCountdown: HTMLElement;
  tileContents: HTMLElement[];
}

export interface Point {
  x: number;
  y: number;
}

export interface Flight {
  from: Point;
  to: Point;
  scale: number;
}

export interface Geometry {
  name: Flight;
  countdown: Flight;
}

const MAX_SCALE = { name: 0.62, countdown: 0.72 } as const;
const MIN_SCALE = 0.35;
const TILE_PADDING = 40; // p-5 on both sides of a tile
const AGE_RESERVE = 100; // room kept for "15 anos" next to the name

function relativeTo(stage: DOMRect, rect: DOMRect): Point {
  return { x: rect.left - stage.left, y: rect.top - stage.top };
}

function fitScale(available: number, natural: number, max: number): number {
  return Math.max(MIN_SCALE, Math.min(max, available / natural));
}

function sizeSlot(slot: HTMLElement, reference: DOMRect, scale: number) {
  slot.style.width = `${reference.width * scale}px`;
  slot.style.height = `${reference.height * scale}px`;
}

/**
 * Works out where the name and the countdown start (hidden copies in the
 * entrance) and where they land (empty slots in the tiles). `show(p)` must
 * render the page at progress p; it is called with the final and initial states.
 */
export function measureGeometry(parts: Parts, show: (progress: number) => void): Geometry {
  show(1);
  const nameTileWidth = parts.nameTile.getBoundingClientRect().width;
  const countdownTileWidth = parts.countdownTile.getBoundingClientRect().width;

  show(0);
  const stageStart = parts.stage.getBoundingClientRect();
  const nameStart = parts.nameStart.getBoundingClientRect();
  const countdownStart = parts.countdownStart.getBoundingClientRect();

  const nameScale = fitScale(nameTileWidth - TILE_PADDING - AGE_RESERVE, nameStart.width, MAX_SCALE.name);
  const countdownScale = fitScale(countdownTileWidth - TILE_PADDING, countdownStart.width, MAX_SCALE.countdown);
  sizeSlot(parts.nameEnd, nameStart, nameScale);
  sizeSlot(parts.countdownEnd, countdownStart, countdownScale);

  show(1);
  const stageEnd = parts.stage.getBoundingClientRect();
  const nameEnd = parts.nameEnd.getBoundingClientRect();
  const countdownEnd = parts.countdownEnd.getBoundingClientRect();

  return {
    name: { from: relativeTo(stageStart, nameStart), to: relativeTo(stageEnd, nameEnd), scale: nameScale },
    countdown: {
      from: relativeTo(stageStart, countdownStart),
      to: relativeTo(stageEnd, countdownEnd),
      scale: countdownScale,
    },
  };
}