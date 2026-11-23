/**
 * SYNTESIA — Moteur Unifié de Validation des Formulaires, Pré-Qualification CRM & Navigation Mobile
 * Version : 2.2 (Recette AGIA-009 — Anti-Injection CWE-1236, Anti-Doublon, E.164 Phone, RGPD distinct & A11y)
 *
 * GARDE-FOU DE SÉCURITÉ ABSOLU :
 * WEBHOOK_ENABLED est strictement maintenu à `false` et ENVIRONMENT à `"PREPROD"`.
 * Aucune requête réseau externe n'est émise.
 */

window.SYNTESIA_CONFIG = {
  ENVIRONMENT: "PREPROD",
  WEBHOOK_ENABLED: false, // NE PAS ACTIVER SANS AUTORISATION EXPLICITE DU FONDATEUR
  WEBHOOK_URL: ""         // [À RENSEIGNER AU GO-LIVE : URL Web App Google Apps Script doPost]
};

window.__SYNTESIA_SUBMITTED_SIGNATURES = window.__SYNTESIA_SUBMITTED_SIGNATURES || {};

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Neutralise toute tentative d'injection de formule tableur (CSV / Google Sheets Formula Injection CWE-1236),
 * supprime les caractères de contrôle et applique une limite stricte de longueur.
 */
function sanitizeSheetField(str, maxLen) {
  var limit = maxLen || 500;
  var cleaned = String(str || "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, " ")
    .trim();
  if (cleaned.length > limit) {
    cleaned = cleaned.substring(0, limit);
  }
  if (/^[=+\-@|%]/.test(cleaned)) {
    cleaned = "'" + cleaned;
  }
  return cleaned;
}

function computePreviewScore(payload, rawDescriptionLength) {
  var score = 5;
  var budget = (payload.budget || "").toUpperCase();
  var maturite = (payload.maturite || "").toUpperCase();
  var combinedCalibre = budget + " | " + maturite;

  // Barème unifié : reconnaît les tranches budgétaires en euros ET les tranches d'effectif PME/ETI
  if (
    combinedCalibre.indexOf("5 000") !== -1 ||
    combinedCalibre.indexOf("15 000") !== -1 ||
    combinedCalibre.indexOf("50 À 150") !== -1 ||
    combinedCalibre.indexOf("> 150") !== -1 ||
    combinedCalibre.indexOf("ETI") !== -1
  ) {
    score += 3;
  } else if (
    combinedCalibre.indexOf("2 500") !== -1 ||
    combinedCalibre.indexOf("10 À 49") !== -1 ||
    combinedCalibre.indexOf("15 À 50") !== -1 ||
    combinedCalibre.indexOf("PME") !== -1
  ) {
    score += 2;
  } else if (
    combinedCalibre.indexOf("TPE") !== -1 ||
    combinedCalibre.indexOf("1 À 9") !== -1 ||
    combinedCalibre.indexOf("1 À 15") !== -1
  ) {
    score += 1;
  }

  var digits = (payload.telephone || "").replace(/\D/g, "");
  if (digits.length >= 8 && digits.length <= 15) score += 1;

  // Bonus de précision accordé uniquement si l'utilisateur a réellement saisi > 20 caractères
  var actualDescLen = typeof rawDescriptionLength === "number" ? rawDescriptionLength : (payload.description || "").length;
  if (actualDescLen > 20) score += 1;

  var vUpper = (payload.verticale || "").toUpperCase();
  if (
    vUpper.indexOf("SÉCURITÉ") !== -1 ||
    vUpper.indexOf("SECURITE") !== -1 ||
    vUpper.indexOf("BÂTIMENT") !== -1 ||
    vUpper.indexOf("BATIMENT") !== -1 ||
    vUpper.indexOf("BTP") !== -1 ||
    vUpper.indexOf("RÉNOVATION") !== -1 ||
    vUpper.indexOf("RENOVATION") !== -1 ||
    vUpper.indexOf("HCR") !== -1 ||
    vUpper.indexOf("CGP") !== -1
  ) {
    score += 1;
  }
  return score > 10 ? 10 : score;
}

window.initSyntesiaForm = function (formId, feedbackId, defaultMarche, accentColorHex) {
  var form = document.getElementById(formId);
  var feedback = document.getElementById(feedbackId);
  if (!form || !feedback) return;

  feedback.setAttribute("role", "status");
  feedback.setAttribute("aria-live", "polite");

  var badgeColor = accentColorHex || "#5C6B28";
  var isSubmitting = false;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (isSubmitting) {
      window.__LAST_SYNTESIA_STATUS = "DUPLICATE_IN_FLIGHT_BLOCKED";
      return;
    }

    // 1. Contrôle Anti-Spam Honeypot unifié (couvre les 4 pages)
    var honeypots = ["website_url", "website_url_dz", "company_website", "business_site"];
    for (var i = 0; i < honeypots.length; i++) {
      var hpField = form.elements[honeypots[i]];
      if (hpField && hpField.value && hpField.value.trim() !== "") {
        window.__LAST_SYNTESIA_STATUS = "FILTERED_HONEYPOT";
        return;
      }
    }

    // 2. Extraction des valeurs brutes
    var nomRaw = form.nom ? form.nom.value.trim() : "";
    var entrepriseRaw = form.entreprise ? form.entreprise.value.trim() : "";
    var emailRaw = form.email ? form.email.value.trim() : "";
    var telRaw = form.telephone ? form.telephone.value.trim() : "";
    var verticaleRaw = form.verticale ? form.verticale.value : "Transversal / PME";
    var besoinRaw = form.besoin ? form.besoin.value : "";
    var descField = form.description;
    var descRequired = descField ? descField.hasAttribute("required") : false;
    var descRaw = descField ? descField.value.trim() : "";
    var rgpd = form.rgpd_consent ? form.rgpd_consent.checked : false;

    // 3. Validation des champs obligatoires de saisie
    if (!nomRaw || !entrepriseRaw || !emailRaw || !telRaw || (descRequired && !descRaw)) {
      window.__LAST_SYNTESIA_STATUS = "VALIDATION_ERROR_REQUIRED";
      feedback.className = "p-5 border border-[#B84A27] bg-[#FAF9F5] text-xs text-[#B84A27]";
      feedback.innerHTML =
        "<strong>[CONTRÔLE DE SAISIE]</strong> Veuillez renseigner tous les champs obligatoires (*).";
      feedback.classList.remove("hidden");
      return;
    }

    // 4. Validation du format d'adresse e-mail professionnelle
    var emailRegex = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/;
    if (!emailRegex.test(emailRaw) || emailRaw.length > 150) {
      window.__LAST_SYNTESIA_STATUS = "VALIDATION_ERROR_EMAIL";
      feedback.className = "p-5 border border-[#B84A27] bg-[#FAF9F5] text-xs text-[#B84A27]";
      feedback.innerHTML =
        "<strong>[FORMAT E-MAIL INVALIDE]</strong> Veuillez saisir une adresse e-mail professionnelle valide (ex: direction@entreprise.fr).";
      feedback.classList.remove("hidden");
      return;
    }

    // 5. Validation stricte du numéro de téléphone (caractères autorisés + 8 à 15 chiffres E.164)
    var allowedPhoneChars = /^[+\d\s().\-/]{8,25}$/;
    var telDigits = telRaw.replace(/\D/g, "");
    if (!allowedPhoneChars.test(telRaw) || telDigits.length < 8 || telDigits.length > 15) {
      window.__LAST_SYNTESIA_STATUS = "VALIDATION_ERROR_PHONE";
      feedback.className = "p-5 border border-[#B84A27] bg-[#FAF9F5] text-xs text-[#B84A27]";
      feedback.innerHTML =
        "<strong>[FORMAT TÉLÉPHONE INVALIDE]</strong> Veuillez saisir un numéro de téléphone valide (8 à 15 chiffres, sans lettres ni caractères spéciaux).";
      feedback.classList.remove("hidden");
      return;
    }

    // 6. Validation distincte du consentement RGPD obligatoire
    if (!rgpd) {
      window.__LAST_SYNTESIA_STATUS = "VALIDATION_ERROR_RGPD";
      feedback.className = "p-5 border border-[#B84A27] bg-[#FAF9F5] text-xs text-[#B84A27]";
      feedback.innerHTML =
        "<strong>[CONSENTEMENT RGPD REQUIS]</strong> Veuillez cocher la case d'acceptation de traitement confidentiel de votre demande professionnelle.";
      feedback.classList.remove("hidden");
      return;
    }

    // 7. Protection contre la double soumission identique (même email + verticale + besoin)
    var dedupSignature = (emailRaw.toLowerCase() + "|" + verticaleRaw + "|" + besoinRaw).trim();
    var nowMs = Date.now();
    if (
      window.__SYNTESIA_SUBMITTED_SIGNATURES[dedupSignature] &&
      nowMs - window.__SYNTESIA_SUBMITTED_SIGNATURES[dedupSignature] < 120000
    ) {
      window.__LAST_SYNTESIA_STATUS = "DUPLICATE_SUBMISSION_BLOCKED";
      feedback.className = "p-5 border border-[#B84A27] bg-[#FAF9F5] text-xs text-[#B84A27]";
      feedback.innerHTML =
        "<strong>[DEMANDE DÉJÀ ENREGISTRÉE]</strong> Une demande identique pour ce contact et ce besoin vient déjà d'être validée. Il n'est pas nécessaire de la soumettre une seconde fois.";
      feedback.classList.remove("hidden");
      return;
    }

    // 8. Nettoyage anti-injection (CWE-1236) et assemblage normalisé (Schéma 15 colonnes SYNTESIA_CRM_CENTRAL)
    var maturiteRaw = "Non précisée";
    if (form.maturite && form.maturite.value && form.maturite.value.trim() !== "") {
      maturiteRaw = form.maturite.value.trim();
    } else if (form.effectif && form.effectif.value) {
      maturiteRaw = "Effectif: " + form.effectif.value;
    }

    var budgetRaw = "À qualifier";
    if (form.budget && form.budget.value && form.budget.value.trim() !== "") {
      budgetRaw = form.budget.value.trim();
    } else if (form.effectif && form.effectif.value) {
      budgetRaw = "Calibre: " + form.effectif.value;
    }

    var payload = {
      marche: sanitizeSheetField((form.marche && form.marche.value) ? form.marche.value : (defaultMarche || "France"), 40),
      verticale: sanitizeSheetField(verticaleRaw, 120),
      entreprise: sanitizeSheetField(entrepriseRaw, 150),
      nom: sanitizeSheetField(nomRaw, 120),
      email: sanitizeSheetField(emailRaw, 150),
      telephone: sanitizeSheetField(telRaw, 40),
      besoin: sanitizeSheetField(besoinRaw, 200),
      maturite: sanitizeSheetField(maturiteRaw, 150),
      budget: sanitizeSheetField(budgetRaw, 120),
      description: sanitizeSheetField(descRaw || "Demande d'étude opérationnelle sectorielle", 2000),
      test_mode: window.SYNTESIA_CONFIG.ENVIRONMENT === "PREPROD"
    };

    var scorePreview = computePreviewScore(payload, descRaw.length);
    payload.score_preview = scorePreview;
    window.__LAST_SYNTESIA_PAYLOAD = payload;

    var submitBtn = form.querySelector('button[type="submit"]');

    // 9. Branchement conditionnel : Mode Pré-Production (local) vs Mode Production (si autorisé)
    if (window.SYNTESIA_CONFIG.WEBHOOK_ENABLED === true && window.SYNTESIA_CONFIG.WEBHOOK_URL) {
      isSubmitting = true;
      if (submitBtn) submitBtn.disabled = true;
      feedback.className = "p-5 border border-[#161513] bg-[#FAF9F5] text-xs text-[#161513]";
      feedback.innerHTML = "<span class='font-mono-mark'>[TRANSMISSION SÉCURISÉE EN COURS...]</span>";
      feedback.classList.remove("hidden");

      fetch(window.SYNTESIA_CONFIG.WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          isSubmitting = false;
          if (submitBtn) submitBtn.disabled = false;
          window.__SYNTESIA_SUBMITTED_SIGNATURES[dedupSignature] = Date.now();
          window.__LAST_SYNTESIA_STATUS = "WEBHOOK_SENT";
          feedback.className = "p-6 border border-[#161513] bg-[#EAE9E2] text-xs text-[#161513] space-y-2";
          feedback.innerHTML =
            "<div class='font-mono-mark' style='color:" + badgeColor + "'>[DEMANDE D'ÉTUDE ENREGISTRÉE &mdash; RÉF : " + escapeHtml(data.idLead || "CRM-OK") + "]</div>" +
            "<p class='text-sm font-semibold'>Merci " + escapeHtml(payload.nom) + " (" + escapeHtml(payload.entreprise) + ").</p>" +
            "<p class='text-[#464440] leading-relaxed'>Votre demande pour le secteur <strong>" + escapeHtml(payload.verticale) + "</strong> a bien été transmise à notre équipe d'ingénierie.</p>";
          form.reset();
        })
        .catch(function () {
          isSubmitting = false;
          if (submitBtn) submitBtn.disabled = false;
          window.__LAST_SYNTESIA_STATUS = "WEBHOOK_ERROR";
          feedback.className = "p-5 border border-[#B84A27] bg-[#FAF9F5] text-xs text-[#B84A27]";
          feedback.innerHTML =
            "<strong>[INTERRUPTION RÉSEAU]</strong> Le serveur de réception est momentanément indisponible. Vos données n'ont pas été effacées ; veuillez réessayer dans un instant.";
        });
      return;
    }

    // Mode Pré-Production par défaut (zéro appel réseau externe)
    window.__SYNTESIA_SUBMITTED_SIGNATURES[dedupSignature] = nowMs;
    window.__LAST_SYNTESIA_STATUS = "PREPROD_VALIDATED";
    feedback.className = "p-6 border border-[#161513] bg-[#EAE9E2] text-xs text-[#161513] space-y-2";
    feedback.innerHTML =
      "<div class='font-mono-mark' style='color:" + badgeColor + "'>[PRÉ-DIAGNOSTIC QUALIFIÉ &mdash; VALIDATION LOCALE PRÉ-PRODUCTION (" + scorePreview + "/10)]</div>" +
      "<p class='text-sm font-semibold'>Merci " + escapeHtml(payload.nom) + " (" + escapeHtml(payload.entreprise) + ").</p>" +
      "<p class='text-[#464440] leading-relaxed'>Votre demande pour le marché <strong>" + escapeHtml(payload.marche) + "</strong> &middot; secteur <strong>" + escapeHtml(payload.verticale) + "</strong> portant sur <em>« " + escapeHtml(payload.besoin) + " »</em> a été validée et structurée au format exact du CRM central SYNTESIA (15 colonnes).</p>" +
      "<p class='font-mono text-xs text-[#6E6B65] pt-2 border-t border-[#D5D4CC]'>État technique : WEBHOOK_ENABLED = false (Pré-production). Aucune donnée n'est transmise sur le réseau tant que l'activation commerciale n'est pas déclenchée par le fondateur.</p>";
    feedback.classList.remove("hidden");
    form.reset();
  });
};

window.initSyntesiaMobileNav = function () {
  var btn = document.getElementById("synMobileMenuBtn");
  var menu = document.getElementById("synMobileMenuPanel");
  if (!btn || !menu) return;

  btn.addEventListener("click", function () {
    var isHidden = menu.classList.contains("hidden");
    if (isHidden) {
      menu.classList.remove("hidden");
      btn.setAttribute("aria-expanded", "true");
    } else {
      menu.classList.add("hidden");
      btn.setAttribute("aria-expanded", "false");
    }
  });

  var links = menu.querySelectorAll("a");
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function () {
      menu.classList.add("hidden");
      btn.setAttribute("aria-expanded", "false");
    });
  }
};

document.addEventListener("DOMContentLoaded", function () {
  window.initSyntesiaMobileNav();
});
