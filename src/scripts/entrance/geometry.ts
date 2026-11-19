export interface Parts {
  stage: HTMLElement;
  ticket: HTMLElement;
  stub: HTMLElement;
  body: HTMLElement;
  hero: HTMLElement;
  nameStart: HTMLElement;
  nameEnd: HTMLElement;
  ageEnd: HTMLElement;
  countdownStart: HTMLElement;
  countdownEnd: HTMLElement;
  nameContent: HTMLElement;
  countdownContent: HTMLElement;
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

interface Box {
  width: number;
  height: number;
}

const MIN_SCALE = 0.35;
const LABEL_GAP = 8; // breathing room kept between the countdown tile's label and the countdown

function relativeTo(stage: DOMRect, rect: DOMRect): Point {
  return { x: rect.left - stage.left, y: rect.top - stage.top };
}

/** Size of an element's content area: its client box minus padding. */
function innerBox(element: HTMLElement): Box {
  const style = getComputedStyle(element);
  const horizontal = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
  const vertical = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);

  return { width: element.clientWidth - horizontal, height: element.clientHeight - vertical };
}

/** Largest scale that respects every limit, never enlarging and never shrinking below the minimum. */
function fitScale(...limits: number[]): number {
  return Math.max(MIN_SCALE, Math.min(1, ...limits));
}

function sizeSlot(slot: HTMLElement, reference: DOMRect, scale: number) {
  slot.style.width = `${reference.width * scale}px`;
  slot.style.height = `${reference.height * scale}px`;
}

/**
 * Works out where the name and the countdown start (hidden copies in the
 * entrance) and where they land (empty slots in the tiles). The scales come
 * from the real size of the tiles, so nothing here depends on fixed measures.
 * `show(p)` must render the page at progress p; it is called with the final
 * and the initial states.
 */
export function measureGeometry(parts: Parts, show: (progress: number) => void): Geometry {
  show(1);
  const nameBox = innerBox(parts.nameContent);
  const nameGap = parseFloat(getComputedStyle(parts.nameContent).columnGap) || 0;
  const ageWidth = parts.ageEnd.getBoundingClientRect().width;
  const countdownBox = innerBox(parts.countdownContent);
  const labelHeight = parts.countdownContent.firstElementChild?.getBoundingClientRect().height ?? 0;

  show(0);
  const stageStart = parts.stage.getBoundingClientRect();
  const nameStart = parts.nameStart.getBoundingClientRect();
  const countdownStart = parts.countdownStart.getBoundingClientRect();

  const nameScale = fitScale(
    (nameBox.width - ageWidth - nameGap) / nameStart.width,
    nameBox.height / nameStart.height,
  );
  const countdownScale = fitScale(
    countdownBox.width / countdownStart.width,
    (countdownBox.height - labelHeight - LABEL_GAP) / countdownStart.height,
  );
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