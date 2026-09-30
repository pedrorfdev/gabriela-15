// ============================================================
// src/lib/constants.ts
//
// Small shared constants. Nothing here should need to change
// per-event — that belongs in data/event.ts instead.
// ============================================================

export const STORAGE_KEYS = {
  gateUnlocked: 'gabriela15:unlocked',
} as const;

export const RSVP_LIMITS = {
  maxCompanions: 6,
} as const;

export const BREAKPOINTS = {
  desktop: 1024,
} as const;
