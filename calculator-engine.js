/**
 * OMNISECUR / SECURIAXE — Moteur de Chiffrage Déterministe (Bouclier Anti-Pertes v3.2)
 * Aligné sur :
 *   - Scénario 1 Piège 23 €/h (Mode Express Nuit ADS P01 320h, brutH 12,42 €) = CA 7 360 €, Direct 7 719,15 € (24,12 €/h), Complet 9 181,55 € (28,69 €/h), Résultat -1 821,55 € (-24,75 %), Prix cible 10% = 31,88 €/h
 *   - Scénario 2 Avenant n° 2 IDCC 1351 (vacation min 6h) 300h = 8 951,25 € (25x12h) vs 9 345,00 € (50x6h) -> écart +393,75 € (+131,25 € paniers + 262,50 € trajets paramétrés)
 *   - Scénario 3 Recette P01 (320h @ 35,00 €/h, coût horaire chargé baseHoraire 19,50 €/h) = CA 11 200 €, Direct 7 580 €, Complet 9 681 €, Résultat +1 519,00 € (13,5625 %), Prix cible 33,61 €/h, Seuil 138,22 h
 *   - Scénario 4 Cynophile P07 (320h @ 42,00 €/h, baseHoraire 23,75 €/h dont 1,68 €/h chien non soumis) = CA 13 440 €, Direct 8 940 €, Complet 11 109 €, Résultat +2 331,00 € (17,34 %), Prix cible 38,57 €/h, Seuil 106,02 h
 */
(function (root) {
  "use strict";

  var PROFILES = [
    {
      code: "P01",
      nom: "Surveillance humaine (ADS Coeff. 120)",
      classif: "IDCC 1351 — Coeff. 120",
      baseHoraire: 19.50,
      brutH: 12.42,
      fraisNonSoumisH: 0
    },
    {
      code: "P02",
      nom: "Surveillance confirmée (Coeff 150)",
      classif: "IDCC 1351 — Coeff. 150",
      baseHoraire: 20.60,
      brutH: 12.90,
      fraisNonSoumisH: 0
    },
    {
      code: "P03",
      nom: "SSIAP 1 — Agent de Sécurité Incendie",
      classif: "IDCC 1351 — Coeff. 150",
      baseHoraire: 21.00,
      brutH: 13.10,
      fraisNonSoumisH: 0
    },
    {
      code: "P04",
      nom: "SSIAP 2 — Chef d'Équipe Incendie",
      classif: "IDCC 1351 — Coeff. 170",
      baseHoraire: 23.60,
      brutH: 14.73,
      fraisNonSoumisH: 0
    },
    {
      code: "P05",
      nom: "SSIAP 3 — Chef de Service Incendie",
      classif: "IDCC 1351 — Coeff. 200",
      baseHoraire: 29.40,
      brutH: 18.50,
      fraisNonSoumisH: 0
    },
    {
      code: "P06",
      nom: "Opérateur vidéo / télésurveillance (L.611-1 1°)",
      classif: "IDCC 1351 — Coeff. 160",
      baseHoraire: 21.80,
      brutH: 13.40,
      fraisNonSoumisH: 0
    },
    {
      code: "P07",
      nom: "Agent cynophile (Frais chien H10 non soumis)",
      classif: "IDCC 1351 — Maître-chien",
      baseHoraire: 23.75,
      brutH: 13.30,
      fraisNonSoumisH: 1.68
    }
  ];

  function toNum(v) {
    if (typeof v === "number") return Number.isFinite(v) ? v : NaN;
    var s = String(v === null || v === undefined ? "" : v).trim().replace(/\s+/g, "").replace(/,/g, ".");
    if (!s) return NaN;
    var n = Number(s);
    return Number.isFinite(n) ? n : NaN;
  }

  function findProfile(code) {
    for (var i = 0; i < PROFILES.length; i++) {
      if (PROFILES[i].code === code) return PROFILES[i];
    }
    return PROFILES[0];
  }

  /**
   * Évaluation complète Paie Réelle (parité stricte Bouclier-Anti-Pertes v3.2)
   */
  /**
   * Estimateur de journée discontinue (Avenant n° 2 Art. 2 & Art. 4 — Exemples officiels)
   * Entrée : { periods: [{ start: 8, end: 10 }, { start: 13, end: 17 }], avenantExempt: false }
   * Règle Art. 2 & Art. 4 :
   *  - Si coupure <= 2,0 h entre deux périodes : les durées travaillées s'additionnent dans la même séquence (plancher 6,0 h sur le cumul).
   *  - Si coupure > 2,0 h entre deux périodes : rémunération calculée sur l'AMPLITUDE de la journée (du premier start au dernier end), avec plancher de 6,0 h.
   *    (Ex. officiel Art. 4 : 8h-10h [2h] puis 13h-17h [4h], coupure 3h > 2h -> travail effectif = 6,0 h, amplitude = 17 - 8 = 9,0 h rémunérées, panierEligible = true).
   *    (Ex. officiel Art. 4 : 8h-9h [1h] puis 12h-16h [4h], coupure 3h > 2h -> travail effectif = 5,0 h, amplitude = 16 - 8 = 8,0 h rémunérées, panierEligible = false car effectif 5h < 6h).
   */
  function evaluateDailySchedule(inp) {
    var periods = Array.isArray(inp && inp.periods) ? inp.periods : [];
    var avenantExempt = Boolean(inp && (inp.avenantExempt || inp.annexe8 || inp.astreinte));
    if (periods.length === 0) {
      return { valid: false, errors: ["Au moins une période de travail est requise."] };
    }
    var totalEffective = 0;
    var maxGap = 0;
    var firstStart = null;
    var lastEnd = null;
    for (var i = 0; i < periods.length; i++) {
      var s = toNum(periods[i].start);
      var e = toNum(periods[i].end);
      if (!Number.isFinite(s) || !Number.isFinite(e) || e <= s) {
        return { valid: false, errors: ["Période horaire invalide à l'index " + i] };
      }
      totalEffective += (e - s);
      if (firstStart === null || s < firstStart) firstStart = s;
      if (lastEnd === null || e > lastEnd) lastEnd = e;
      if (i > 0) {
        var prevEnd = toNum(periods[i - 1].end);
        var gap = s - prevEnd;
        if (gap < 0) return { valid: false, errors: ["Chevauchement de périodes détecté."] };
        if (gap > maxGap) maxGap = gap;
      }
    }
    var amplitude = lastEnd - firstStart;
    var hasLongCut = periods.length > 1 && maxGap > 2.0;
    var paidHoursDay;
    if (avenantExempt) {
      paidHoursDay = totalEffective;
    } else if (hasLongCut) {
      paidHoursDay = Math.max(6.0, amplitude);
    } else {
      paidHoursDay = Math.max(6.0, totalEffective);
    }
    var panierEligible = (totalEffective >= 6.0) || Boolean(inp && inp.forcePanierUnder6h);
    return {
      valid: true,
      periodsCount: periods.length,
      firstStart: firstStart,
      lastEnd: lastEnd,
      maxGapHours: maxGap,
      hasLongCutOver2h: hasLongCut,
      effectiveHoursDay: totalEffective,
      amplitudeHoursDay: amplitude,
      paidHoursDay: paidHoursDay,
      avenantExempt: avenantExempt,
      panierEligible: panierEligible
    };
  }

  function evaluateScenario(inp) {
    var prof = findProfile(inp.profileCode || "P01");
    var baseH = toNum(inp.baseHoraire !== undefined ? inp.baseHoraire : prof.baseHoraire);
    var hours = toNum(inp.hours);
    var vacHours = toNum(inp.vacHours);
    var sellPrice = toNum(inp.sellPrice);
    var structH = toNum(inp.structH !== undefined ? inp.structH : 2.00);
    var fixedCosts = toNum(inp.fixedCosts !== undefined ? inp.fixedCosts : 1000.00);
    var provPct = toNum(inp.provPct !== undefined ? inp.provPct : 5.0);
    var targetPct = toNum(inp.targetPct !== undefined ? inp.targetPct : 10.0);
    var moment = inp.moment || "jour"; // jour | nuit | dim | ferie
    var indVac = toNum(inp.indVac !== undefined ? inp.indVac : 5.0);
    var transVac = toNum(inp.transVac !== undefined ? inp.transVac : 10.0);
    var ponctuel = toNum(inp.ponctuel !== undefined ? inp.ponctuel : 100.0);
    var suppManual = inp.suppH !== undefined ? toNum(inp.suppH) : NaN;

    var errors = [];
    if (!(baseH > 0)) errors.push("Coût horaire de base invalide (> 0 requis).");
    if (!(hours > 0)) errors.push("Volume horaire mensuel invalide (> 0 requis).");
    if (!(vacHours >= 1)) errors.push("Durée de vacation invalide.");
    if (!(sellPrice >= 0)) errors.push("Tarif facturé invalide (>= 0 requis).");
    if (!(structH >= 0) || !(fixedCosts >= 0) || !(provPct >= 0) || !(targetPct >= 0 && targetPct < 90)) {
      errors.push("Paramètres de structure, provision ou marge cible invalides.");
    }
    if (errors.length > 0) {
      return { valid: false, errors: errors };
    }

    // Périmètre Avenant n° 2 (Art. 1, 2 & 4) : gestion des coupures > 2h (rémunération sur l'amplitude) et exclusions Annexe VIII / astreintes
    var avenantExempt = Boolean(inp.avenantExempt || inp.annexe8 || inp.astreinte);
    var dailySched = (Array.isArray(inp.periods) && inp.periods.length > 0)
      ? evaluateDailySchedule({ periods: inp.periods, avenantExempt: avenantExempt, forcePanierUnder6h: inp.forcePanierUnder6h })
      : null;
    if (dailySched && !dailySched.valid) {
      return { valid: false, errors: dailySched.errors };
    }
    var cutHours = inp.cutHours !== undefined ? toNum(inp.cutHours) : (dailySched ? dailySched.maxGapHours : 0);
    var amplitudeVacH = dailySched
      ? dailySched.amplitudeHoursDay
      : (inp.amplitudeHours !== undefined ? toNum(inp.amplitudeHours) : (cutHours > 2 ? (vacHours + cutHours) : vacHours));
    var minPaidVacH = avenantExempt ? vacHours : 6;
    var effectiveVacPaidHours = dailySched
      ? dailySched.paidHoursDay
      : (avenantExempt ? vacHours : (cutHours > 2 ? Math.max(minPaidVacH, amplitudeVacH) : Math.max(vacHours, minPaidVacH)));
    var vacationsCount = hours / vacHours;
    var paidHours = vacationsCount * effectiveVacPaidHours;
    var avenantFloorApplied = (!avenantExempt) && (effectiveVacPaidHours > vacHours);

    // Annexe IV Art. 6 : l'indemnité de panier est due si la durée de travail EFFECTIF >= 6,0 h (continues ou discontinues sur la même journée) ou maintien contractuel forcePanierUnder6h
    var dailyEffectiveHours = dailySched
      ? dailySched.effectiveHoursDay
      : (inp.dailyEffectiveHours !== undefined ? toNum(inp.dailyEffectiveHours) : vacHours);
    var panierEligible = (vacHours >= 6) || (Number.isFinite(dailyEffectiveHours) && dailyEffectiveHours >= 6) || Boolean(inp.forcePanierUnder6h);
    var effectiveIndVac = panierEligible ? indVac : 0;

    var vacWarning = avenantFloorApplied
      ? ("Avenant n° 2 IDCC 1351 (Annexe IV · étendu JORF 05/06/2026, effet 01/07/2026) : vacation de " + vacHours.toFixed(1) + " h < plancher conventionnel étendu de 6,0 h — rémunération calculée sur " + paidHours.toFixed(1) + " h payées pour " + hours.toFixed(1) + " h travaillées (panier Annexe IV art. 6 : " + (panierEligible ? "maintenu contractuellement" : "0,00 € car travail effectif < 6,0 h") + ").")
      : (avenantExempt && vacHours < 6 ? "Exclusion Avenant n° 2 activée (Annexe VIII sûreté aéroportuaire / astreinte / dérogation) : rémunération sur heures travaillées (" + hours.toFixed(1) + " h)." : "");

    // Supplément horaire (soit exact manuel Recette = 2,00 €/h, soit calculé selon majoration légale hors frais chien non soumis)
    var suppH = Number.isFinite(suppManual) ? suppManual : 0;
    if (!Number.isFinite(suppManual)) {
      var soumisBase = Math.max(0, baseH - prof.fraisNonSoumisH);
      if (moment === "nuit" || moment === "dim") suppH = soumisBase * 0.10;
      else if (moment === "ferie") suppH = soumisBase * 1.00;
      else suppH = 0;
    }

    var caTotal = hours * sellPrice;
    var directCosts = paidHours * (baseH + suppH) + vacationsCount * (effectiveIndVac + transVac) + ponctuel;
    var structTotal = hours * structH;
    var subTotalBeforeProv = directCosts + fixedCosts + structTotal;
    var provision = subTotalBeforeProv * (provPct / 100);
    var fullCost = subTotalBeforeProv + provision;
    var netResult = caTotal - fullCost;
    var netMarginPct = caTotal > 0 ? (netResult / caTotal) * 100 : -100;

    var fullCostPerHour = fullCost / hours;
    var targetDenominator = 1 - targetPct / 100;
    var targetPriceH = fullCostPerHour / targetDenominator;

    // Seuil de rentabilité en heures (ponctuel + fixes hors coûts variables horaires)
    var variableWithProv = (directCosts - ponctuel + structTotal) * (1 + provPct / 100);
    var varCostPerHour = variableWithProv / hours;
    var contributionPerHour = sellPrice - varCostPerHour;
    var fixedWithProv = (fixedCosts + ponctuel) * (1 + provPct / 100);
    var breakEvenHours = contributionPerHour > 0 ? fixedWithProv / contributionPerHour : null;

    var verdict = "CIBLE ATTEINTE";
    var verdictCode = "ok";
    if (netResult < 0) {
      verdict = "DANGER DÉFICITAIRE";
      verdictCode = "err";
    } else if (netMarginPct + 1e-6 < targetPct) {
      verdict = "SOUS MARGE CIBLE";
      verdictCode = "warn";
    }

    return {
      valid: true,
      mode: "recette",
      profile: prof,
      hours: hours,
      paidHours: paidHours,
      avenantFloorApplied: avenantFloorApplied,
      avenantExempt: avenantExempt,
      dailyEffectiveHours: dailyEffectiveHours,
      panierEligible: panierEligible,
      effectiveIndVac: effectiveIndVac,
      vacHours: vacHours,
      vacationsCount: vacationsCount,
      vacWarning: vacWarning,
      moment: moment,
      sellPrice: sellPrice,
      caTotal: caTotal,
      directCosts: directCosts,
      directCostPerHour: directCosts / hours,
      fullCost: fullCost,
      fullCostPerHour: fullCostPerHour,
      netResult: netResult,
      netMarginPct: netMarginPct,
      targetPct: targetPct,
      targetPriceH: targetPriceH,
      breakEvenHours: breakEvenHours,
      verdict: verdict,
      verdictCode: verdictCode
    };
  }

  /**
   * Modèle SAISIE_EXPRESS officiel v3.2 ("Piège 23 €/h Nuit ADS = -1 941,42 €")
   * Parité mathématique exacte avec Bouclier_Anti_Pertes_v3.2.html :: evalExpressModel()
   * + prise en charge du plancher Avenant n° 2 (6,0 h/vacation) lorsque vacHours < 6.
   */
  function evaluateExpressTrap(inp) {
    var prof = findProfile(inp.profileCode || "P01");
    var hBaseAnnual = toNum(inp.hBaseAnnual !== undefined ? inp.hBaseAnnual : 1820.04);
    var pnvPct = toNum(inp.pnvPct !== undefined ? inp.pnvPct : 10);
    var chargesPct = toNum(inp.chargesPct !== undefined ? inp.chargesPct : 50.37);
    var primeNuitH = toNum(inp.primeNuitH !== undefined ? inp.primeNuitH : 1.00);
    var structH = toNum(inp.structH !== undefined ? inp.structH : 4.57);
    var targetPct = toNum(inp.targetPct !== undefined ? inp.targetPct : 10.0);
    var demoHours = toNum(inp.demoHours !== undefined ? inp.demoHours : 320);
    var demoPrice = toNum(inp.demoPrice !== undefined ? inp.demoPrice : 23.00);
    var vacHours = toNum(inp.vacHours !== undefined ? inp.vacHours : 8);
    var moment = inp.moment || "nuit";

    var errors = [];
    if (!(hBaseAnnual > 0)) errors.push("Base horaire annuelle > 0 requise.");
    if (!(pnvPct >= 0 && pnvPct < 99)) errors.push("Part non vendable invalide [0..98 %].");
    if (!(chargesPct >= 0)) errors.push("Taux de charges invalide.");
    if (!(demoHours > 0) || !(demoPrice >= 0)) errors.push("Volume ou prix démo invalide.");
    if (!(vacHours >= 1)) errors.push("Durée de vacation invalide.");
    if (!(targetPct >= 0 && targetPct < 90)) errors.push("Marge cible invalide (0 à 89,9 % requis).");
    if (errors.length > 0) return { valid: false, errors: errors };

    var pnv = pnvPct / 100;
    var T = chargesPct / 100;
    var hProd = hBaseAnnual * (1 - pnv);
    var b = prof.brutH;
    var baseMens = b * 151.67;
    var cotisAnn = 12 * baseMens * T;
    var baseJour = hProd > 0 ? (12 * baseMens + cotisAnn) / hProd : 0;
    var suppNuit = (b * 0.10 + primeNuitH) * (1 + T);
    var suppDim = (b * 0.10) * (1 + T);
    var suppFerie = (b * 1.00) * (1 + T);

    var extra = moment === "nuit" ? suppNuit : (moment === "dim" ? suppDim : (moment === "ferie" ? suppFerie : 0));
    var unitEmp = baseJour + extra + prof.fraisNonSoumisH;
    var avenantExempt = Boolean(inp.avenantExempt || inp.annexe8 || inp.astreinte);
    var dailySchedExp = (Array.isArray(inp.periods) && inp.periods.length > 0)
      ? evaluateDailySchedule({ periods: inp.periods, avenantExempt: avenantExempt, forcePanierUnder6h: inp.forcePanierUnder6h })
      : null;
    if (dailySchedExp && !dailySchedExp.valid) {
      return { valid: false, errors: dailySchedExp.errors };
    }
    var cutHoursExp = inp.cutHours !== undefined ? toNum(inp.cutHours) : (dailySchedExp ? dailySchedExp.maxGapHours : 0);
    var amplitudeVacExp = dailySchedExp
      ? dailySchedExp.amplitudeHoursDay
      : (inp.amplitudeHours !== undefined ? toNum(inp.amplitudeHours) : (cutHoursExp > 2 ? (vacHours + cutHoursExp) : vacHours));
    var minPaidVacH = avenantExempt ? vacHours : 6;
    var effectiveVacPaidHExp = dailySchedExp
      ? dailySchedExp.paidHoursDay
      : (avenantExempt ? vacHours : (cutHoursExp > 2 ? Math.max(minPaidVacH, amplitudeVacExp) : Math.max(vacHours, minPaidVacH)));
    var vacationsCount = demoHours / vacHours;
    var paidHours = vacationsCount * effectiveVacPaidHExp;
    var avenantFloorApplied = (!avenantExempt) && (effectiveVacPaidHExp > vacHours);
    var dailyEffectiveHours = dailySchedExp
      ? dailySchedExp.effectiveHoursDay
      : (inp.dailyEffectiveHours !== undefined ? toNum(inp.dailyEffectiveHours) : vacHours);
    var panierEligible = (vacHours >= 6) || (Number.isFinite(dailyEffectiveHours) && dailyEffectiveHours >= 6) || Boolean(inp.forcePanierUnder6h);
    var indVacExp = inp.indVac !== undefined ? toNum(inp.indVac) : 0;
    var effectiveIndVac = panierEligible ? indVacExp : 0;
    var panierTotalSim = vacationsCount * effectiveIndVac;
    var vacWarning = avenantFloorApplied
      ? ("Avenant n° 2 IDCC 1351 (Annexe IV · étendu JORF 05/06/2026, effet 01/07/2026) : vacation/journée de " + vacHours.toFixed(1) + " h effectives — " + paidHours.toFixed(1) + " h rémunérées pour " + demoHours.toFixed(1) + " h travaillées (plancher 6h ou amplitude sur coupure > 2h).")
      : (avenantExempt && vacHours < 6 ? "Exclusion Avenant n° 2 activée (Annexe VIII sûreté aéroportuaire / astreinte / dérogation) : rémunération sur heures travaillées (" + demoHours.toFixed(1) + " h)." : "");

    var caSim = demoHours * demoPrice;
    var costEmpSim = paidHours * unitEmp + panierTotalSim;
    var structSim = demoHours * structH;
    var fullCost = costEmpSim + structSim;
    var fullH = fullCost / demoHours;
    var netSim = caSim - fullCost;
    var targetPriceH = fullH / (1 - targetPct / 100);

    return {
      valid: true,
      mode: "express",
      profile: prof,
      moment: moment,
      hours: demoHours,
      paidHours: paidHours,
      vacHours: vacHours,
      avenantFloorApplied: avenantFloorApplied,
      avenantExempt: avenantExempt,
      dailyEffectiveHours: dailyEffectiveHours,
      panierEligible: panierEligible,
      effectiveIndVac: effectiveIndVac,
      vacWarning: vacWarning,
      sellPrice: demoPrice,
      caTotal: caSim,
      directCosts: costEmpSim,
      directCostPerHour: costEmpSim / demoHours,
      fullCost: fullCost,
      fullCostPerHour: fullH,
      netResult: netSim,
      netMarginPct: caSim > 0 ? (netSim / caSim) * 100 : -100,
      targetPct: targetPct,
      targetPriceH: targetPriceH,
      breakEvenHours: demoPrice >= fullH ? 0 : null,
      verdict: netSim < 0 ? "DANGER DÉFICITAIRE" : (caSim > 0 && (netSim / caSim) * 100 >= targetPct ? "CIBLE ATTEINTE" : "SOUS MARGE CIBLE"),
      verdictCode: netSim < 0 ? "err" : (caSim > 0 && (netSim / caSim) * 100 >= targetPct ? "ok" : "warn")
    };
  }

  root.COS_OPERATIONS_ENGINE = root.OMNISECUR_ENGINE = {
    PROFILES: PROFILES,
    toNum: toNum,
    evaluateDailySchedule: evaluateDailySchedule,
    evaluateScenario: evaluateScenario,
    evaluateExpressTrap: evaluateExpressTrap
  };
  if (typeof module !== "undefined" && module.exports) {
    module.exports = root.OMNISECUR_ENGINE;
  }
})(typeof window !== "undefined" ? window : globalThis);
