#!/usr/bin/env node
/**
 * Harnais de Certification Déterministe — OmniSecur / Securiaxe (IDCC 1351)
 * Protocole validé :
 *  1. Vérification cryptographique SHA-256 de tests/golden-cases.json via tests/golden-cases.sha256
 *  2. Exécution réelle de evaluateScenario() et evaluateExpressTrap() sur les 38 cas canoniques
 *  3. Contrôle de tolérance numérique stricte (1e-4) et absence totale de ReferenceError / variables non déclarées
 */
"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const engine = require(path.resolve(__dirname, "../calculator-engine.js"));

const goldenPath = path.resolve(__dirname, "golden-cases.json");
const shaPath = path.resolve(__dirname, "golden-cases.sha256");

const rawJson = fs.readFileSync(goldenPath, "utf8");
const expectedShaLine = fs.readFileSync(shaPath, "utf8").trim().split(/\s+/)[0];
const actualSha = crypto.createHash("sha256").update(rawJson, "utf8").digest("hex");

if (actualSha !== expectedShaLine) {
  console.error(`[FATAL] Échec d'intégrité SHA-256 sur tests/golden-cases.json !`);
  console.error(`  Attendu : ${expectedShaLine}`);
  console.error(`  Actuel  : ${actualSha}`);
  process.exit(1);
}

const suite = JSON.parse(rawJson);
const tol = suite.tolerance || 1e-4;
let passed = 0;
let failed = 0;

console.log(`=== HARNAIS DE CERTIFICATION GOLDEN CASES (${suite.protocol}) ===`);
console.log(`SHA-256 Référentiel : ${actualSha} (VÉRIFIÉ)`);
console.log(`Cas à exécuter      : ${suite.cases.length} (Tolérance : ${tol})\n`);

for (const tc of suite.cases) {
  try {
    const fn = engine[tc.fn];
    if (typeof fn !== "function") {
      throw new Error(`Fonction ${tc.fn} introuvable dans calculator-engine.js`);
    }
    const res = fn(tc.input);
    const exp = tc.expected;
    const errs = [];

    if (Boolean(res.valid) !== Boolean(exp.valid)) {
      errs.push(`valid: attendu=${exp.valid}, obtenu=${res.valid}`);
    }

    if (!exp.valid) {
      if (exp.hasErrors && (!Array.isArray(res.errors) || res.errors.length === 0)) {
        errs.push(`errors: tableau d'erreurs non vide attendu`);
      }
    } else {
      for (const [k, expVal] of Object.entries(exp)) {
        if (k === "valid") continue;
        const actVal = res[k];
        if (typeof expVal === "boolean" || expVal === null) {
          if (actVal !== expVal) {
            errs.push(`${k}: attendu=${expVal}, obtenu=${actVal}`);
          }
        } else if (typeof expVal === "number") {
          if (typeof actVal !== "number" || !Number.isFinite(actVal) || Math.abs(actVal - expVal) > tol) {
            errs.push(`${k}: attendu=${expVal}, obtenu=${actVal} (écart=${Math.abs((actVal || 0) - expVal)})`);
          }
        }
      }
    }

    if (errs.length > 0) {
      failed++;
      console.error(`[FAIL] ${tc.id} (${tc.fn}) — ${tc.description}`);
      for (const e of errs) console.error(`   -> ${e}`);
    } else {
      passed++;
      console.log(`[PASS] ${tc.id} (${tc.fn})`);
    }
  } catch (err) {
    failed++;
    console.error(`[EXCEPTION] ${tc.id} (${tc.fn}) : ${err.stack || err.message}`);
  }
}

// Vérification unitaire supplémentaire de toNum()
if (engine.toNum("21,50") !== 21.5 || engine.toNum("1 234,56") !== 1234.56) {
  failed++;
  console.error(`[FAIL] UNIT_TONUM_FRENCH_DECIMALS`);
} else {
  passed++;
  console.log(`[PASS] UNIT_TONUM_FRENCH_DECIMALS`);
}

console.log(`\n=== BILAN CERTIFICATION : ${passed} PASS / ${failed} FAIL ===`);
if (failed > 0) {
  process.exit(1);
}
