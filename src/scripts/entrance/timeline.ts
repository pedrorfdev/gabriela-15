export interface Frame {
  /** Distance, in px, each half moves away from the tear. */
  pull: number;
  /** Rotation, in degrees, of the halves while they separate. */
  tilt: number;
  /** Space, in px, between the pieces and between the tiles. */
  gap: number;
  /** Radius, in px, of the perforation holes. */
  bite: number;
  /** Corner radius, in px, where two pieces meet. */
  innerRadius: number;
  /** Opacity of the dashed tear line. */
  perforation: number;
  /** Opacity of the entrance texts (everything but the flying name and countdown). */
  heroOpacity: number;
  /** Opacity of the detail tiles' content. */
  tilesOpacity: number;
  /** 0..1 progress of the name and countdown flight. */
  move: number;
}

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const segment = (p: number, from: number, to: number) => clamp((p - from) / (to - from));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export const mix = (from: number, to: number, t: number) => from + (to - from) * t;

/**
 * Everything that animates, as a pure function of the progress p in [0, 1].
 *   0.18-0.42  the ticket tears and the halves pull apart
 *   0.42-0.86  the name and countdown fly to their tiles
 *   0.50-0.82  the pieces settle into separate tiles with rounded corners
 *   0.62-0.86  the tiles' content fades in
 */
export function frameAt(p: number): Frame {
  const tear = ease(segment(p, 0.18, 0.42));
  const settle = ease(segment(p, 0.5, 0.82));

  return {
    pull: 22 * tear * (1 - settle),
    tilt: 1.8 * tear * (1 - settle),
    gap: 12 * settle,
    bite: 8 * tear * (1 - segment(p, 0.55, 0.8)),
    innerRadius: 20 * settle,
    perforation: 1 - tear,
    heroOpacity: 1 - ease(segment(p, 0.3, 0.5)),
    tilesOpacity: ease(segment(p, 0.62, 0.86)),
    move: ease(segment(p, 0.42, 0.86)),
  };
}