(function () {
  "use strict";

  function esc(s) {
    return String(s === null || s === undefined ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function loadCfg() {
    var cfg = { issuer: {}, channels: {} };
    var ext = window.OMNISECUR_CONFIG || {};
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
        : "Franchise en base — art. 293 B du CGI (régime unique)";
    }

    var jur = document.getElementById("cgvJuridiction");
    if (jur && iss.siege) {
      jur.textContent =
        "Les présentes CGV sont soumises au droit français. À défaut d'accord amiable écrit sous 15 jours, tout litige commercial relèvera de la compétence exclusive du Tribunal de commerce du ressort du siège social du prestataire (" + iss.siege + ").";
    }

    var mlHost = document.getElementById("mlHostInfo");
    if (mlHost) {
      mlHost.textContent = (ch.hostProvider && String(ch.hostProvider).trim())
        ? ("Hébergeur déclaré : " + String(ch.hostProvider).trim() + " — Aucune revente ni transfert publicitaire des dossiers déposés.")
        : "Hébergeur de production à renseigner dans site-config.js (channels.hostProvider — ex. o2switch SASU, Clermont-Ferrand, France ou infrastructure UE) avant mise en ligne publique.";
    }

    var mlBox = document.getElementById("mlIssuerBox");
    if (mlBox) {
      var tvaTxt = iss.tvaRegime === "20"
        ? ("Assujetti TVA 20 %" + (iss.tvaNum ? (" — N° " + iss.tvaNum) : " (n° à renseigner dans site-config.js)"))
        : "Franchise en base de TVA — art. 293 B du CGI (régime unique)";

      var rows = [
        ["Raison sociale", iss.raison || "SASU ATLAS GLOBAL TRADING"],
        ["Nom commercial", iss.enseigne || "OMNISECUR"],
        ["Forme & Capital", iss.capital || "SASU — Capital 500 €"],
        ["Directeur de publication", iss.rep || "M. Mounir NAIT MOHAND, Président"],
        ["Siège social / Ressort", iss.siege || "Albi (81)"],
        ["Identifiant SIREN / SIRET", iss.siren ? iss.siren : "[À compléter dans site-config.js avant mise en ligne publique]"],
        ["Régime TVA applicable", tvaTxt],
        ["Hébergement", ch.hostProvider ? ch.hostProvider : "[À compléter dans site-config.js avant mise en ligne publique]"],
        ["Email de contact B2B", ch.email ? ch.email : "[À compléter dans site-config.js]"],
        ["Téléphone", ch.tel ? ch.tel : "[À compléter dans site-config.js]"]
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
