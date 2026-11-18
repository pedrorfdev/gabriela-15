export const STORAGE_KEYS = {
  gateUnlocked: 'gabriela15:unlocked',
} as const;

/** Fired on window when the visitor passes the gate, so non-React code can react. */
export const GATE_UNLOCKED_EVENT = 'gate:unlocked';

export const RSVP_LIMITS = {
  maxCompanions: 6,
  maxNameLength: 80,
  maxNoteLength: 200,
  minNameLength: 3,
} as const;

export const BREAKPOINTS = {
  desktop: 1024,
} as const;