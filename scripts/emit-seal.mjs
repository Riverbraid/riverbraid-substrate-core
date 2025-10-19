/**
 * Riverbraid Ledger Seal Generator
 * --------------------------------
 * Computes HMAC-SHA3-256 signature for ledger integrity verification.
 * 
 * Usage:
 *   MASTER_KEY="your-secret-key" node scripts/emit-seal.mjs
 * 
 * Notes:
 *   - Requires Node.js v18+.
 *   - Safe to run locally or in CI/CD.
 *   - If MASTER_KEY is not defined, a placeholder signature will be written.
 */

import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";

const LEDGER_PATH = path.resolve("riverbraid_ledger.json");

function computeHMAC(data, key) {
  const hmac = crypto.createHmac("sha3-256", key);
  hmac.update("riverbraid:vNext:ledger");
  hmac.update(data);
  return hmac.digest("hex");
}

function updateSeal(signature) {
  const ledger = JSON.parse(fs.readFileSync(LEDGER_PATH, "utf8"));
  ledger.verification_seal.signature = signature;
  ledger.verification_seal.generated_at = new Date().toISOString();
  fs.writeFileSync(LEDGER_PATH, JSON.stringify(ledger, null, 2));
}

try {
  const rawLedger = fs.readFileSync(LEDGER_PATH, "utf8");
  const key = process.env.MASTER_KEY;

  if (!key) {
    console.warn("⚠ No MASTER_KEY set — emitting unsigned placeholder seal.");
    updateSeal("<unsigned-placeholder>");
    process.exit(0);
  }

  const signature = computeHMAC(rawLedger, key);
  updateSeal(signature);

  console.log("✅ Riverbraid Ledger sealed successfully.");
  console.log("Signature:", signature);
} catch (err) {
  console.error("❌ Failed to emit seal:", err.message);
  process.exit(1);
}
