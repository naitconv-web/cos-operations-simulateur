(function () {
  "use strict";

  var PACKS = {
    1: {
      badge: "Pack 1 · Arsenal Documentaire v3.2",
      confirmedTitle: "Commande Pack 1 confirmée — Arsenal Chiffrage & 6 Mémoires",
      previewTitle: "Démarrage Pack 1 (en attente de confirmation paiement Stripe)",
      sub: "Livraison numérique immédiate hors COS Bureau IA · Licence interne mono-entité.",
      price: "690 € HT",
      amount: 690,
      steps: [
        "1. Ouvrez Bouclier-Anti-Pertes-v3.2.xlsx et vérifiez le scénario témoin Recette P01 (+1 519,00 € / seuil 138,22 h) puis activez le Verrou Direction = OUI.",
        "2. Renseignez vos propres coûts horaires chargés IDCC 1351 et vérifiez l'impact de l'Avenant n° 2 (plancher de rémunération 6,0 h dès le 01/07/2026).",
        "3. Sélectionnez l'un des 6 Mémoires BOAMP (.docx) correspondant à votre lot et remplacez les balises [NOM SOCIETE] et [DELAI] avant dépôt."
      ]
    },
    2: {
      badge: "Pack 2 · COS Bureau IA v4.2 + Atelier 2h",
      confirmedTitle: "Commande Pack 2 confirmée — COS Bureau IA BYOK & Atelier Dirigeant",
      previewTitle: "Démarrage Pack 2 (en attente de confirmation paiement Stripe)",
      sub: "Déploiement local mono-poste sans abonnement cloud ni veille continue · Inclut 2h d'atelier dirigeant.",
      price: "980 € HT",
      amount: 980,
      steps: [
        "1. Réservez votre créneau d'Atelier 2h ci-dessous via l'agenda en ligne (ou par email / WhatsApp).",
        "2. Préparez votre Fiche Entreprise (moyens d'encadrement, références récentes, certifications réelles, périmètre géographique).",
        "3. Prévoyez votre propre clé API fournisseur (OpenAI, Mistral, Groq, OpenRouter ou Ollama local) : elle reste stockée uniquement en sessionStorage."
      ]
    },
    3: {
      badge: "Pack 3 · Commando Réponse AO 48h (1 lot <= 15 p.)",
      confirmedTitle: "Commande Pack 3 confirmée — Mobilisation Commando AO 48h",
      previewTitle: "Bordereau J0 Pack 3 (en attente de confirmation paiement Stripe)",
      sub: "Plafond 2 dossiers actifs · Délai contractuel de 48h ouvrées dès réception de 100 % des 6 pièces J0.",
      price: "1 450 € HT",
      amount: 1450,
      steps: [
        "1. Cochez ci-dessous l'intégralité des 6 pièces J0 (RC, CCTP/AE, BPU vierge, taux chargés réels, fiche société, lien acheteur).",
        "2. Copiez ou transmettez votre bordereau J0 ci-dessous accompagné de votre dossier ZIP DCE.",
        "3. Dès confirmation de règlement et validation des 6 pièces, notre chrono 48h ouvrées démarre et votre créneau de débriefing visio Direction (45 min) est calé."
      ]
    }
  };

  function esc(s) {
    return String(s === null || s === undefined ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function sanitizeUrl(raw) {
    var s = String(raw || "").trim();
    if (!s) return "";
    if (/^(\/(?!\/))?[a-z0-9][a-z0-9._/-]*$/i.test(s) && s.indexOf("..") === -1 && s.indexOf(":") === -1) {
      return s;
    }
    try {
      var u = new URL(s);
      if (u.protocol === "https:") return u.href;
      if (u.protocol === "http:" && (u.hostname === "localhost" || u.hostname === "127.0.0.1")) return u.href;
    } catch (e) {}
    return "";
  }

  function loadCfg() {
    var base = { issuer: {}, channels: {} };
    var ext = window.OMNISECUR_CONFIG || {};
    if (ext.issuer) base.issuer = Object.assign({}, ext.issuer);
    if (ext.channels) base.channels = Object.assign({}, ext.channels);
    try {
      var raw = localStorage.getItem("omnisecur_prod_v1_cfg");
      if (raw) {
        var p = JSON.parse(raw);
        if (p && p.issuer) base.issuer = Object.assign(base.issuer, p.issuer);
        if (p && p.channels) base.channels = Object.assign(base.channels, p.channels);
      }
    } catch (e) {}
    base.channels.calUrl = sanitizeUrl(base.channels.calUrl);
    base.channels.stripeVerifyUrl = sanitizeUrl(base.channels.stripeVerifyUrl);
    return base;
  }

  function toast(msg) {
    var t = document.getElementById("postToast");
    if (!t) return;
    t.textContent = msg;
    t.classList.remove("hidden");
    clearTimeout(window._ptT);
    window._ptT = setTimeout(function () { t.classList.add("hidden"); }, 3200);
  }

  var cfg = loadCfg();
  var params = new URLSearchParams(window.location.search || "");
  var rawPack = Number(params.get("pack"));
  var currentPack = PACKS[rawPack] ? rawPack : 1;
  var sessionIdRaw = String(params.get("session_id") || "").trim();
  var validSessionShape = /^cs_(?:live|test)_[a-zA-Z0-9]{10,120}$/.test(sessionIdRaw);

  var verificationState = {
    verified: false,
    status: (sessionIdRaw && !validSessionShape) ? "failed" : "pending", // pending | checking | verified | failed
    sessionId: validSessionShape ? sessionIdRaw : "",
    message: (sessionIdRaw && !validSessionShape)
      ? "Référence session_id Stripe invalide : aucune commande confirmée ni conversion émise."
      : ""
  };

  var ctxPrefill = {};
  try {
    ctxPrefill = JSON.parse(sessionStorage.getItem("omnisecur_prospect_ctx") || "{}") || {};
  } catch (e) { ctxPrefill = {}; }
  var qSoc = (params.get("societe") || ctxPrefill.societe || "").trim().slice(0, 120);
  var qRef = (params.get("ref") || ctxPrefill.ref || "").trim().slice(0, 80);
  var qDl = (params.get("deadline") || ctxPrefill.deadline || "").trim().slice(0, 80);
  var qEm = (params.get("email") || ctxPrefill.email || "").trim().slice(0, 140);
  if (qSoc && document.getElementById("p3Societe")) document.getElementById("p3Societe").value = qSoc;
  if (qRef && document.getElementById("p3RefAo")) document.getElementById("p3RefAo").value = qRef;
  if (qDl && document.getElementById("p3Deadline")) document.getElementById("p3Deadline").value = qDl;
  if (qEm && document.getElementById("p3Email")) document.getElementById("p3Email").value = qEm;

  function renderVerificationBanner() {
    var box = document.getElementById("payVerificationBanner");
    var badge = document.getElementById("postPayBadge");
    var title = document.getElementById("postPayTitle");
    if (!box || !badge || !title) return;
    var d = PACKS[currentPack];

    box.className = "status-box";
    if (verificationState.verified) {
      box.classList.add("ok");
      badge.textContent = d.badge + " · Paiement vérifié" + (qSoc ? (" · " + qSoc) : "");
      title.textContent = d.confirmedTitle;
      box.textContent = verificationState.message || ("Paiement Stripe vérifié côté serveur (Session " + verificationState.sessionId.slice(0, 18) + "…). Commande B2B activée.");
    } else if (verificationState.status === "checking") {
      box.classList.add("warn");
      badge.textContent = d.badge + " · Vérification en cours";
      title.textContent = d.previewTitle;
      box.textContent = "Vérification serveur de votre session Stripe en cours…";
    } else if (verificationState.status === "failed") {
      box.classList.add("err");
      badge.textContent = d.badge + " · Confirmation requise";
      title.textContent = d.previewTitle;
      box.textContent = verificationState.message || "La session Stripe fournie n'a pas pu être confirmée côté serveur. Aucune commande n'est validée ni aucune conversion comptabilisée avant confirmation.";
    } else if (verificationState.sessionId && !cfg.channels.stripeVerifyUrl) {
      box.classList.add("warn");
      badge.textContent = d.badge + " · En attente validation serveur";
      title.textContent = d.previewTitle;
      box.textContent = "Référence session transmise (" + verificationState.sessionId.slice(0, 18) + "…), mais aucun endpoint serveur stripeVerifyUrl n'est configuré : confirmation en attente de validation manuelle ou webhook Stripe (aucun événement Purchase émis).";
    } else {
      box.classList.add("warn");
      badge.textContent = "Prévisualisation démarrage · " + d.badge + (qSoc ? (" · " + qSoc) : "");
      title.textContent = d.previewTitle;
      box.textContent = "Aucun paiement Stripe vérifié détecté sur cette URL : cet écran présente une prévisualisation de votre bordereau de démarrage. La commande devient ferme uniquement après règlement effectif Stripe / virement validé.";
    }
  }

  function renderPack(pk) {
    currentPack = PACKS[pk] ? pk : 1;
    var d = PACKS[currentPack];
    var tvaTxt = cfg.issuer.tvaRegime === "20" ? "+ TVA 20 %" : "TVA non applicable (art. L. 223-3 du CIBS)";
    document.getElementById("postPaySubtitle").textContent = d.sub;
    document.getElementById("postPayPrice").innerHTML = esc(d.price) + "<small>" + esc(tvaTxt) + "</small>";
    document.getElementById("nextStepsContainer").innerHTML =
      '<ul class="check-list">' + d.steps.map(function (st) { return "<li>" + esc(st) + "</li>"; }).join("") + "</ul>";

    var p3Card = document.getElementById("pack3ChecklistCard");
    if (p3Card) {
      if (currentPack === 3) p3Card.classList.remove("hidden");
      else p3Card.classList.add("hidden");
    }
    renderVerificationBanner();
  }

  function buildJ0Bordereau() {
    var chks = Array.prototype.slice.call(document.querySelectorAll(".p3-chk"));
    var checked = chks.filter(function (c) { return c.checked; });
    var badge = document.getElementById("pack3CounterBadge");
    if (badge) {
      badge.textContent = checked.length + " / 6 pièces cochées" + (checked.length === 6 ? " — Dossier complet" : "");
      badge.className = checked.length === 6 ? "slot-pill" : "slot-pill full";
    }

    var lines = [
      "=== BORDEREAU J0 COMMANDO AO 48H — OMNISECUR ===",
      "Statut paiement : " + (verificationState.verified ? ("VERIFIE STRIPE (" + verificationState.sessionId + ")") : "PREVISUALISATION / EN ATTENTE DE CONFIRMATION"),
      "Offre      : Pack 3 (1 450 EUR HT — 1 lot <= 15 pages)",
      "Société    : " + (document.getElementById("p3Societe").value.trim() || "[À compléter]"),
      "Marché AO  : " + (document.getElementById("p3RefAo").value.trim() || "[À compléter]"),
      "Échéance   : " + (document.getElementById("p3Deadline").value.trim() || "[À compléter]"),
      "Email      : " + (document.getElementById("p3Email").value.trim() || "[À compléter]"),
      "État pièces: " + checked.length + "/6 (" + (checked.length === 6 ? "COMPLET — DÉPART CHRONO 48H OUVRÉES À RÉCEPTION" : "EN COURS DE CONSTITUTION") + ")",
      "Détail     :"
    ];
    chks.forEach(function (c) {
      lines.push((c.checked ? "[X] " : "[ ] ") + c.value);
    });
    lines.push("RGPD Art.28: Purge intégrale des pièces sous 30 jours après clôture.");
    var out = lines.join("\n");
    var box = document.getElementById("p3PreviewBox");
    if (box) box.textContent = out;
    return out;
  }

  function openChannelCal() {
    var url = sanitizeUrl(cfg.channels.calUrl);
    if (url) window.open(url, "_blank", "noopener,noreferrer");
    else toast("Lien agenda non renseigné dans site-config.js : utilisez Email ou WhatsApp.");
  }

  function sendChannelEmail(subjectPrefix, bodyText) {
    var mail = String(cfg.channels.email || "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
      toast("Email opérateur non configuré dans site-config.js : copiez le bordereau.");
      return;
    }
    var subj = subjectPrefix + " — " + (document.getElementById("p3Societe").value.trim() || PACKS[currentPack].badge);
    window.location.href = "mailto:" + encodeURIComponent(mail) + "?subject=" + encodeURIComponent(subj) + "&body=" + encodeURIComponent(bodyText);
  }

  function openChannelWa(text) {
    var raw = String(cfg.channels.whatsapp || cfg.channels.tel || "").replace(/[^0-9]/g, "");
    if (raw.indexOf("00") === 0) raw = raw.slice(2);
    if (raw.length === 10 && raw.charAt(0) === "0") raw = "33" + raw.slice(1);
    if (raw.length < 8) {
      toast("Numéro WhatsApp non renseigné dans site-config.js : copiez le bordereau.");
      return;
    }
    window.open("https://wa.me/" + raw + "?text=" + encodeURIComponent(text), "_blank", "noopener,noreferrer");
  }

  function trackVerifiedPurchaseOnce(pk, sessionId) {
    try {
      if (!verificationState.verified || !sessionId) return;
      if (!cfg.channels.metaPixelId) return;
      if (localStorage.getItem("omnisecur_prod_v1_consent") !== "accepted") return;
      var dedupKey = "omnisecur_purchase_tracked_" + sessionId;
      if (localStorage.getItem(dedupKey) === "1") return;
      localStorage.setItem(dedupKey, "1");

      !function (f, b, e, v, n, t, s) {
        if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
        t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
      }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
      window.fbq("init", cfg.channels.metaPixelId);
      window.fbq("track", "Purchase", { value: PACKS[pk].amount, currency: "EUR" }, { eventID: sessionId });
    } catch (e) {}
  }

  function verifyStripeSessionIfConfigured() {
    if (!verificationState.sessionId || !cfg.channels.stripeVerifyUrl) return;
    verificationState.status = "checking";
    renderVerificationBanner();

    var sep = cfg.channels.stripeVerifyUrl.indexOf("?") === -1 ? "?" : "&";
    var url = cfg.channels.stripeVerifyUrl + sep + "session_id=" + encodeURIComponent(verificationState.sessionId);
    fetch(url, { method: "GET", headers: { Accept: "application/json" } })
      .then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.text();
      })
      .then(function (txt) {
        var parsed = JSON.parse(txt);
        if (parsed && parsed.ok === true && parsed.paid === true) {
          verificationState.verified = true;
          verificationState.status = "verified";
          var verifiedPack = Number(parsed.pack);
          if (PACKS[verifiedPack]) currentPack = verifiedPack;
          renderPack(currentPack);
          buildJ0Bordereau();
          trackVerifiedPurchaseOnce(currentPack, verificationState.sessionId);
        } else {
          verificationState.verified = false;
          verificationState.status = "failed";
          verificationState.message = (parsed && parsed.error) || "Paiement non confirmé par Stripe.";
          renderVerificationBanner();
        }
      })
      .catch(function () {
        verificationState.verified = false;
        verificationState.status = "failed";
        verificationState.message = "Impossible de vérifier la session Stripe auprès du serveur : commande maintenue en attente de vérification.";
        renderVerificationBanner();
      });
  }

  function initPostPay() {
    document.getElementById("btnSelectPack1").addEventListener("click", function () { renderPack(1); });
    document.getElementById("btnSelectPack2").addEventListener("click", function () { renderPack(2); });
    document.getElementById("btnSelectPack3").addEventListener("click", function () { renderPack(3); });

    document.querySelectorAll(".p3-chk, #p3Societe, #p3RefAo, #p3Deadline, #p3Email").forEach(function (el) {
      el.addEventListener("input", buildJ0Bordereau);
      el.addEventListener("change", buildJ0Bordereau);
    });

    document.getElementById("btnP3Copy").addEventListener("click", function () {
      var txt = buildJ0Bordereau();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(txt).then(function () { toast("Bordereau J0 copié !"); });
      } else {
        prompt("Copiez ce bordereau :", txt);
      }
    });
    document.getElementById("btnP3DownloadTxt").addEventListener("click", function () {
      var txt = buildJ0Bordereau();
      var slug = (document.getElementById("p3Societe").value.trim() || "OMNISECUR").replace(/[^a-zA-Z0-9_-]+/g, "-");
      var blob = new Blob([txt], { type: "text/plain;charset=utf-8;" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = "Bordereau-J0-" + slug + ".txt";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
      toast("Bordereau J0 téléchargé !");
    });
    document.getElementById("btnP3Email").addEventListener("click", function () {
      sendChannelEmail("[OMNISECUR J0 Pack 3]", buildJ0Bordereau());
    });
    document.getElementById("btnP3Wa").addEventListener("click", function () {
      openChannelWa(buildJ0Bordereau());
    });
    document.getElementById("btnP3Cal").addEventListener("click", openChannelCal);

    document.getElementById("btnDirectCal").addEventListener("click", openChannelCal);
    document.getElementById("btnDirectEmail").addEventListener("click", function () {
      sendChannelEmail("[OMNISECUR Post-Commande]", "Bonjour,\n\nMa démarche post-commande concerne " + PACKS[currentPack].badge + ".\nJe souhaite démarrer la prise en charge.");
    });
    document.getElementById("btnDirectWa").addEventListener("click", function () {
      openChannelWa("Bonjour, je souhaite finaliser le démarrage pour " + PACKS[currentPack].badge + " sur OMNISECUR.");
    });

    var chInfo = [];
    if (cfg.channels.email) chInfo.push("Email : " + cfg.channels.email);
    if (cfg.channels.tel) chInfo.push("Tél : " + cfg.channels.tel);
    if (sanitizeUrl(cfg.channels.calUrl)) chInfo.push("Agenda en ligne actif");
    document.getElementById("directChannelStatus").textContent = chInfo.length
      ? ("Canaux actifs : " + chInfo.join(" · "))
      : "Complétez email / téléphone / calUrl dans site-config.js avant la mise en production.";

    renderPack(currentPack);
    buildJ0Bordereau();
    verifyStripeSessionIfConfigured();
  }

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initPostPay);
    else initPostPay();
  }
})();
