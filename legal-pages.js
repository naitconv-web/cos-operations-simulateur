(function () {
  "use strict";

  function esc(s) {
    return String(s === null || s === undefined ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function loadCfg() {
    var cfg = { issuer: {}, channels: {} };
    var ext = window.COS_OPERATIONS_CONFIG || window.OMNISECUR_CONFIG || {};
    if (ext.issuer) cfg.issuer = Object.assign({}, ext.issuer);
    if (ext.channels) cfg.channels = Object.assign({}, ext.channels);
    try {
      var raw = localStorage.getItem("omnisecur_prod_v1_cfg");
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed && parsed.issuer) cfg.issuer = Object.assign(cfg.issuer, parsed.issuer);
        if (parsed && parsed.channels) cfg.channels = Object.assign(cfg.channels, parsed.channels);
      }
    } catch (e) {}
    return cfg;
  }

  function initLegalPages() {
    var cfg = loadCfg();
    var iss = cfg.issuer || {};
    var ch = cfg.channels || {};

    var tvaLabel = document.getElementById("cgvTvaLabel");
    if (tvaLabel) {
      tvaLabel.textContent = iss.tvaRegime === "20"
        ? "TVA normale 20 % (régime unique)"
        : "Franchise en base — art. 293 B du CGI / art. L. 223-3 du CIBS (régime unique)";
    }

    var jur = document.getElementById("cgvJuridiction");
    if (jur && iss.siege) {
      jur.textContent =
        "Les présentes CGV sont soumises au droit français. À défaut d'accord amiable écrit sous 15 jours, tout litige commercial relèvera de la compétence exclusive du Tribunal de commerce du ressort du siège social du prestataire (" + iss.siege + ").";
    }

    var mlHost = document.getElementById("mlHostInfo");
    if (mlHost) {
      mlHost.textContent = (ch.hostProvider && String(ch.hostProvider).trim())
        ? ("Hébergeur (LCEN art. 6-III-1) : " + String(ch.hostProvider).trim() + " — Infrastructure située en France (UE). Aucune revente ni transfert publicitaire des dossiers déposés.")
        : "Hébergeur (LCEN art. 6-III-1) : o2switch SASU — Chemin des Pardiaux, 63000 Clermont-Ferrand, France (RCS Clermont-Ferrand 510 909 807 — Tél. : +33 4 44 44 60 40).";
    }

    var mlBox = document.getElementById("mlIssuerBox");
    if (mlBox) {
      var tvaTxt = iss.tvaRegime === "20"
        ? ("Assujetti TVA 20 %" + (iss.tvaNum ? (" — N° " + iss.tvaNum) : " (n° à renseigner dans site-config.js)"))
        : "Franchise en base de TVA — art. 293 B du CGI / art. L. 223-3 du CIBS (régime unique)";

      var rows = [
        ["Enseigne & Nom commercial", iss.enseigne || "Securiaxe"],
        ["Dénomination légale (art. L.526-22 & R.123-237 C. com.)", "Mounir NAIT MOHAND EI (Entrepreneur Individuel)"],
        ["Titulaire légal (LCEN art. 6-III-1)", "Mounir NAIT MOHAND — Entrepreneur Individuel (EI)"],
        ["Forme juridique & Registre", "Entreprise Individuelle (EI) inscrite au Répertoire SIRENE / RNE (SIREN 849 261 870)"],
        ["Directeur de la publication", "Mounir NAIT MOHAND"],
        ["Siège social / Domiciliation", iss.siege || "81000 Albi (Tarn — France)"],
        ["Identifiant SIREN / SIRET", iss.siren ? iss.siren : "849 261 870 00018 (Code NAF/APE : 70.22Z / Ingénierie & conseil B2B)"],
        ["Régime TVA applicable", tvaTxt],
        ["Hébergeur (Raison, Adresse, Tél.)", ch.hostProvider ? ch.hostProvider : "o2switch SASU — Chemin des Pardiaux, 63000 Clermont-Ferrand, France (Tél. : +33 4 44 44 60 40)"],
        ["Email de contact B2B", ch.email ? ch.email : "nait.conv@gmail.com"],
        ["Téléphone direct", ch.tel ? ch.tel : "+33 6 17 17 99 74"]
      ];
      mlBox.innerHTML = rows.map(function (r) {
        return '<div class="proof-line"><span>' + esc(r[0]) + '</span><b>' + esc(r[1]) + '</b></div>';
      }).join("");
    }
  }

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initLegalPages);
    else initLegalPages();
  }
})();
