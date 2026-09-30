/**
 * apps-script/Code.gs
 *
 * NOT built yet — this is intentionally left for last, as agreed.
 *
 * When we get here, this script will:
 *   1. Receive a POST from the RsvpWizard with { groupId, people: [...] }
 *   2. Loop over `people` and append one row per person to the sheet
 *   3. Return a JSON success/error response
 *
 * Expected sheet columns:
 *   Timestamp | Group ID | Name | Type (titular/companion) | Confirmed | Note
 *
 * The client-side call for this already has a home reserved at
 * src/lib/sheetsApi.ts (not created yet either) — RsvpWizard's
 * handleFinalSubmit() in RsvpWizard.tsx has a TODO marking exactly
 * where that call plugs in.
 */

function doPost(e) {
  // TODO: implement once we get to this part of the project.
}
