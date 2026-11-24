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


// Vérification AUD-005 (MD + HTML §5.4 + Code §3.1) & AUD-003 (Intégration UI index.html + app.js)
try {
  const rootDir = path.resolve(__dirname, "..");
  const engineSrc = fs.readFileSync(path.join(rootDir, "calculator-engine.js"), "utf8").trim();
  const dossierMd = fs.readFileSync(path.join(rootDir, "DOSSIER_CONSULTATION_FINALE_SKIN_IN_THE_GAME_IDCC1351_SECURIAXE.md"), "utf8");
  const dossierHtml = fs.readFileSync(path.join(rootDir, "DOSSIER_CONSULTATION_FINALE_SKIN_IN_THE_GAME_IDCC1351_SECURIAXE.html"), "utf8");
  const indexHtml = fs.readFileSync(path.join(rootDir, "index.html"), "utf8");
  const appJs = fs.readFileSync(path.join(rootDir, "app.js"), "utf8");
  const prodShaLines = fs.readFileSync(path.join(__dirname, "production-files.sha256"), "utf8").trim().split(/\r?\n/);

  // Extract section 5.4 specifically from MD and HTML
  const md54 = dossierMd.slice(dossierMd.indexOf("### 5.4."), dossierMd.indexOf("## 6. STRATÉGIE"));
  const html54 = dossierHtml.slice(dossierHtml.indexOf("### 5.4."), dossierHtml.indexOf("## 6. STRATÉGIE"));

  let allHashesMatch = true;
  for (const line of prodShaLines) {
    const [expectedHash, relPath] = line.trim().split(/\s+/);
    const fileBytes = fs.readFileSync(path.join(rootDir, relPath));
    const actualHash = crypto.createHash("sha256").update(fileBytes).digest("hex");
    if (actualHash !== expectedHash) {
      console.error(`[FAIL] AUD005_PROD_SHA256_MISMATCH: ${relPath}`);
      allHashesMatch = false;
    }
    if (!md54.includes(actualHash)) {
      console.error(`[FAIL] AUD005_MD_SECTION54_MISSING_HASH: ${relPath}`);
      allHashesMatch = false;
    }
    if (!html54.includes(actualHash)) {
      console.error(`[FAIL] AUD005_HTML_SECTION54_MISSING_HASH: ${relPath}`);
      allHashesMatch = false;
    }
  }

  // Decode HTML entities inside <pre id="rawMd"> of DOSSIER.html and compare embedded §3.1 code in both MD and HTML
  const decodeHtml = (s) => s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&amp;/g, "&");
  const htmlPreMatch = dossierHtml.match(/<pre id="rawMd" class="dossier-raw">([\s\S]*?)<\/pre>/);
  const decodedHtmlMd = htmlPreMatch ? decodeHtml(htmlPreMatch[1]) : "";

  const mMd = dossierMd.match(/### 3\.1\. Code source intégral de `calculator-engine\.js`[^\n]*\n\n```javascript\n([\s\S]*?)\n```/);
  const mHtml = decodedHtmlMd.match(/### 3\.1\. Code source intégral de `calculator-engine\.js`[^\n]*\n\n```javascript\n([\s\S]*?)\n```/);

  if (!mMd || mMd[1].trim() !== engineSrc) {
    console.error(`[FAIL] AUD005_MD_EMBEDDED_ENGINE_MISMATCH`);
    allHashesMatch = false;
  }
  if (!mHtml || mHtml[1].trim() !== engineSrc) {
    console.error(`[FAIL] AUD005_HTML_EMBEDDED_ENGINE_MISMATCH`);
    allHashesMatch = false;
  }

  if (allHashesMatch) {
    passed++;
    console.log(`[PASS] AUD005_MD_AND_HTML_SECTION54_AND_EMBEDDED_CODE_CONCORDANCE`);
  } else {
    failed++;
  }

  // AUD-003 UI Integration Test: check #simPeriods & #simAvenantExempt in index.html & app.js + execute string input "8-10, 13-17"
  const hasUiFields = indexHtml.includes('id="simPeriods"') && indexHtml.includes('id="simAvenantExempt"') &&
                      appJs.includes('periods: periodsRaw') && appJs.includes('avenantExempt: avenantExemptFlag');
  const uiSimRes = engine.evaluateScenario({
    profileCode: "P01", baseHoraire: 19.50, hours: 300, vacHours: 6,
    periods: "8-10, 13-17", avenantExempt: false,
    sellPrice: 35, suppH: 2, indVac: 5, transVac: 10, ponctuel: 100, fixedCosts: 1000, structH: 2, provPct: 5
  });
  const uiExpRes = engine.evaluateExpressTrap({
    profileCode: "P01", demoHours: 300, vacHours: 6,
    periods: "8-10, 13-17", avenantExempt: false,
    moment: "jour", demoPrice: 23, chargesPct: 50.37, indVac: 4.48
  });

  // Vérification UI : présence de #simPeriods, #simNextShiftStart, #simAvenantExempt ET #simLegalAlert
  const hasUiNextShiftField = indexHtml.includes('id="simNextShiftStart"') && appJs.includes('nextShiftStartRaw') &&
                              appJs.includes('nextShiftStart: nextShiftStartRaw');
  const hasUiLegalAlert = indexHtml.includes('id="simLegalAlert"') && appJs.includes('legalBox') && appJs.includes('legalLimitWarning');

  // Test du parcours complet utilisateur : vacation finissant à 22h suivie d'une reprise le lendemain à 07h (saisie "14-22" et nextShiftStart "7")
  const uiFullJourneyScen = engine.evaluateScenario({
    profileCode: "P01", baseHoraire: 19.50, hours: 320, vacHours: 8,
    periods: "14-22", nextShiftStart: "7",
    sellPrice: 35, suppH: 2, indVac: 5, transVac: 10, ponctuel: 100, fixedCosts: 1000, structH: 2, provPct: 5
  });
  const uiFullJourneyExp = engine.evaluateExpressTrap({
    profileCode: "P01", demoHours: 320, vacHours: 8,
    periods: "14-22", nextShiftStart: "7",
    moment: "nuit", demoPrice: 23, chargesPct: 50.37
  });

  const journeyConform = uiFullJourneyScen.valid && uiFullJourneyScen.restUnder11h === true &&
                         uiFullJourneyScen.dailyRestHours === 9 &&
                         uiFullJourneyScen.legalLimitWarning.includes("9.0 h < minimum légal 11,0 h") &&
                         uiFullJourneyExp.valid && uiFullJourneyExp.restUnder11h === true &&
                         uiFullJourneyExp.dailyRestHours === 9 &&
                         uiFullJourneyExp.legalLimitWarning.includes("9.0 h < minimum légal 11,0 h");

  if (hasUiFields && hasUiNextShiftField && hasUiLegalAlert && journeyConform &&
      uiSimRes.valid && uiSimRes.paidHours === 450 && uiSimRes.panierEligible === true &&
      uiExpRes.valid && uiExpRes.paidHours === 450 && Math.abs(uiExpRes.directCosts - 9561.977) < 1e-3) {
    passed++;
    console.log(`[PASS] AUD003_UI_NEXT_SHIFT_START_AND_REST_9H_WARNING_CONCORDANCE`);
  } else {
    failed++;
    console.error(`[FAIL] AUD003_UI_NEXT_SHIFT_START_AND_REST_9H_WARNING_CONCORDANCE`);
  }
} catch (e) {
  failed++;
  console.error(`[EXCEPTION] AUD005_AUD003_VERIFICATION: ${e.message}`);
}

console.log(`\n=== BILAN CERTIFICATION : ${passed} PASS / ${failed} FAIL ===`);
if (failed > 0) {
  process.exit(1);
}
