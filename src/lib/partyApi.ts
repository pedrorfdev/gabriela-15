export type UploadResult =
  | { ok: true }
  | { ok: false; reason: 'network' | 'rejected' | 'not-configured' };

const ENDPOINT = import.meta.env.PUBLIC_SHEETS_URL as string | undefined;
const SIMULATED_DELAY_MS = 900;

function queryParam(name: string): string | null {
  return new URLSearchParams(window.location.search).get(name);
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1] ?? '');
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

/** Dev-only stand-in so the whole flow can be seen without a backend. Add ?partySimulate=error to force a failure. */
async function simulate(fileName: string): Promise<UploadResult> {
  console.info('[party] simulated upload:', fileName);
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY_MS));
  return queryParam('partySimulate') === 'error' ? { ok: false, reason: 'network' } : { ok: true };
}

/**
 * Sends one already-resized photo. The body goes as text/plain because Apps
 * Script cannot answer a CORS preflight. The `k` code in the table QR is
 * forwarded so the script can check it.
 * TODO: align this payload with the Apps Script when the spreadsheet step starts.
 */
export async function uploadPartyPhoto(blob: Blob, fileName: string): Promise<UploadResult> {
  if (!ENDPOINT) {
    return import.meta.env.DEV ? simulate(fileName) : { ok: false, reason: 'not-configured' };
  }

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        action: 'party-photo',
        key: queryParam('k'),
        fileName,
        mime: blob.type,
        data: await blobToBase64(blob),
      }),
    });
    const data = (await response.json()) as { ok?: boolean };
    return data.ok ? { ok: true } : { ok: false, reason: 'rejected' };
  } catch {
    return { ok: false, reason: 'network' };
  }
}