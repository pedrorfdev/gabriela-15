// ============================================================
// src/lib/hash.ts
//
// SHA-256 hashing for the password gate. The real password never
// lives in the codebase — only its hash (GATE_HASH).
// ============================================================

/**
 * Hashes a string with SHA-256 using the native Web Crypto API.
 * Trims and lowercases the input first, so guests aren't tripped
 * up by stray spaces or capitalization.
 */
export async function sha256Hex(input: string): Promise<string> {
  const normalized = input.trim().toLowerCase();
  const data = new TextEncoder().encode(normalized);
  const digest = await crypto.subtle.digest('SHA-256', data);

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Compares a typed password against the configured hash.
 */
export async function verifyPassword(input: string, expectedHash: string): Promise<boolean> {
  if (!input || !expectedHash) return false;
  const hash = await sha256Hex(input);
  return hash === expectedHash;
}
