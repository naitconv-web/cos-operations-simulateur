(function () {
  "use strict";

  var LS_CFG = "omnisecur_prod_v1_cfg";

  var CATALOG = {
    1: {
      id: 1,
      code: "SEC-ARSENAL-V32",
      sector: "securite",
      sectorLabel: "Sécurité Privée",
      badge: "Pack 1 · Outillage autonome",
      featured: false,
      title: "Arsenal Documentaire & Chiffrage v3.2",
      priceHt: 690,
      monthlyPriceHt: 0,
      monthlyLabel: "",
      defaultAcomptePct: 100,
      allowSplit: false,
      delai: "Livraison numérique immédiate dès confirmation du règlement",
      subtitle: "Licence mono-entité sans abonnement · Hors COS Bureau IA & atelier",
      bullets: [
        "Classeur Excel Bouclier-Anti-Pertes.xlsx (profils P01..P07 IDCC 1351, verrou Direction).",
        "Calculateur Web hors ligne Bouclier_Anti_Pertes_v3.2.html (export .json / .csv).",
        "6 Mémoires Techniques Word (.docx) conformes Avenant n° 2 (6h min.) & CSI.",
        "Guide d'utilisation v3.2 + Trames réponse, soutenance et DC4 (art. L.612-5-1 CSI)."
      ],
      scopeNote: "Usage interne strict pour votre entité · Hors activité réglementée CNAPS."
    },
    2: {
      id: 2,
      code: "SEC-COS-IA-V42",
      sector: "securite",
      sectorLabel: "Sécurité Privée",
      badge: "Pack 2 · Recommandé Dirigeants",
      featured: true,
      title: "COS Opérations (Sentinelle IA) + Atelier 2h",
      priceHt: 980,
      monthlyPriceHt: 0,
      monthlyLabel: "",
      defaultAcomptePct: 50,
      allowSplit: true,
      delai: "Livraison immédiate des outils + Atelier visio/site calé sous 48h ouvrées",
      subtitle: "Application locale souveraine BYOK + paramétrage + 2h dirigeant inclus",
      bullets: [
        "Inclut 100 % du Pack 1 (Bouclier Excel/Web + 6 Mémoires Techniques Word).",
        "Déploiement de COS Bureau IA / Sentinelle IA (usage local, clé API en session).",
        "Paramétrage sur votre Fiche Entreprise et vos agréments réels CNAPS/SSIAP.",
        "Atelier de prise en main 2h (visio France entière ou sur site en Occitanie)."
      ],
      scopeNote: "Licence mono-poste sans abonnement mensuel obligatoire (alternative SaaS 99–299 €/mois)."
    },
    3: {
      id: 3,
      code: "SEC-COMMANDO-48H",
      sector: "securite",
      sectorLabel: "Sécurité Privée",
      badge: "Pack 3 · Urgence Marché (Max 2 actifs)",
      featured: false,
      title: "Commando Réponse AO 48h (1 lot ≤ 15 p.)",
      priceHt: 1450,
      monthlyPriceHt: 0,
      monthlyLabel: "",
      defaultAcomptePct: 50,
      allowSplit: true,
      delai: "Livraison sous 48h ouvrées dès réception de 100 % des 6 pièces J0",
      subtitle: "Forfait 1 lot unique ≤ 15 pages · Limité à 2 dossiers actifs simultanés",
      bullets: [
        "Audit Go / No-Go complet du Règlement de Consultation (visite, reprise 1351, 6h).",
        "Chiffrage DPGF / BPU sur vos taux de paie réels dans Bouclier Anti-Pertes.",
        "Rédaction complète du Mémoire Technique calibré critère par critère.",
        "Débriefing visio Direction (45 min) avant dépôt sur la plateforme acheteur."
      ],
      scopeNote: "Obligation de moyens sans garantie d'attribution · Hors activité CNAPS."
    }
  };

  var CURRENT_ID = 2;
  var CURRENT_FILTER = "all";
  var CURRENT_PAY_TAB = "virement";
  var INCLUDE_MONTHLY = false;

  function $(id) {
    return document.getElementById(id);
  }

  function esc(s) {
    return String(s === null || s === undefined ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function sanitizeExternalUrl(raw) {
    var s = String(raw || "").trim();
    if (!s) return "";
    if (/^(\/(?!\/))?[a-z0-9][a-z0-9._/-]*$/i.test(s) && s.indexOf("..") === -1 && s.indexOf(":") === -1) {
      return s;
    }
    try {
      var u = new URL(s);
      if (u.protocol === "https:") return u.href;
      if (u.protocol === "http:" && (u.hostname === "localhost" || u.hostname === "127.0.0.1")) return u.href;
      return "";
    } catch (e) {
      return "";
    }
  }

  function sanitizeEmail(raw) {
    var s = String(raw || "").trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) ? s : "";
  }

  function sanitizeWaDigits(raw) {
    var d = String(raw || "").replace(/[^0-9]/g, "");
    if (d.indexOf("00") === 0) d = d.slice(2);
    if (d.length === 10 && d.charAt(0) === "0") d = "33" + d.slice(1);
    return d.length >= 8 ? d : "";
  }

  function fmtMoney(n) {
    return Number(n || 0).toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
  }

  function localIsoDate(d) {
    var dt = d || new Date();
    var y = dt.getFullYear();
    var m = String(dt.getMonth() + 1).padStart(2, "0");
    var day = String(dt.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + day;
  }

  function defaultBcRef() {
    var d = new Date();
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return "BC-" + y + m + day + "-01";
  }

  function toast(msg) {
    var t = $("storeToast");
    if (!t) return;
    t.textContent = msg;
    t.classList.remove("hidden");
    clearTimeout(window._storeToastT);
    window._storeToastT = setTimeout(function () { t.classList.add("hidden"); }, 3200);
  }

  function copyText(txt, label) {
    if (!txt) {
      toast("Aucune valeur à copier.");
      return;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(function () {
        toast(label + " copié !");
      }).catch(function () {
        fallbackCopy(txt, label);
      });
    } else {
      fallbackCopy(txt, label);
    }
  }

  function fallbackCopy(txt, label) {
    var ta = document.createElement("textarea");
    ta.value = txt;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      toast(label + " copié !");
    } catch (e) {
      toast("Copie manuelle nécessaire.");
    }
    document.body.removeChild(ta);
  }

  function getBaseConfig() {
    var base = {
      issuer: {
        raison: "Mounir NAIT MOHAND (Entrepreneur Individuel)",
        enseigne: "COS Opérations × SYNTESIA",
        rep: "M. Mounir NAIT MOHAND",
        capital: "Entreprise Individuelle — Micro-entreprise",
        siege: "Albi (81)",
        siren: "849 261 870 00018",
        tvaRegime: "293B",
        tvaNum: ""
      },
      channels: {
        domainUrl: "",
        hostProvider: "",
        email: "nait.conv@gmail.com",
        tel: "+33 6 17 17 99 74",
        whatsapp: "33617179974",
        calUrl: "https://cal.com/nait-p5qttl",
        crmWebhookUrl: "",
        stripeVerifyUrl: "",
        bankName: "",
        bic: "",
        iban: "",
        cardGlobalUrl: "",
        cardLinks: { 1: "", 2: "", 3: "", 4: "", 5: "" },
        paypalLink: "",
        gocardlessLink: "",
        stripeLinks: { 1: "", 2: "", 3: "" },
        commandoSlotsOpen: 2,
        metaPixelId: ""
      }
    };
    var ext = window.COS_OPERATIONS_CONFIG || window.OMNISECUR_CONFIG;
    if (ext && typeof ext === "object") {
      if (ext.issuer) Object.assign(base.issuer, ext.issuer);
      if (ext.channels) {
        Object.assign(base.channels, ext.channels);
        if (ext.channels.cardLinks) base.channels.cardLinks = Object.assign({ 1: "", 2: "", 3: "", 4: "", 5: "" }, ext.channels.cardLinks);
        if (ext.channels.stripeLinks) base.channels.stripeLinks = Object.assign({ 1: "", 2: "", 3: "" }, ext.channels.stripeLinks);
      }
    }
    return base;
  }

  function loadCfg() {
    var cfg = getBaseConfig();
    try {
      var raw = localStorage.getItem(LS_CFG);
      if (raw) {
        var stored = JSON.parse(raw);
        if (stored && typeof stored === "object") {
          if (stored.issuer) Object.assign(cfg.issuer, stored.issuer);
          if (stored.channels) {
            Object.assign(cfg.channels, stored.channels);
            if (stored.channels.cardLinks) cfg.channels.cardLinks = Object.assign({}, cfg.channels.cardLinks, stored.channels.cardLinks);
            if (stored.channels.stripeLinks) cfg.channels.stripeLinks = Object.assign({}, cfg.channels.stripeLinks, stored.channels.stripeLinks);
          }
        }
      }
    } catch (e) {}
    cfg.issuer.tvaRegime = cfg.issuer.tvaRegime === "20" ? "20" : "293B";
    cfg.channels.calUrl = sanitizeExternalUrl(cfg.channels.calUrl);
    cfg.channels.cardGlobalUrl = sanitizeExternalUrl(cfg.channels.cardGlobalUrl);
    cfg.channels.paypalLink = sanitizeExternalUrl(cfg.channels.paypalLink);
    cfg.channels.gocardlessLink = sanitizeExternalUrl(cfg.channels.gocardlessLink);
    [1, 2, 3, 4, 5].forEach(function (i) {
      cfg.channels.cardLinks[i] = sanitizeExternalUrl(cfg.channels.cardLinks[i]);
    });
    return cfg;
  }

  function saveCfg(cfg) {
    try {
      localStorage.setItem(LS_CFG, JSON.stringify(cfg));
      return true;
    } catch (e) {
      return false;
    }
  }

  function renderCatalog() {
    var grid = $("catalogGrid");
    if (!grid) return;
    var items = Object.keys(CATALOG).map(function (k) { return CATALOG[k]; }).filter(function (item) {
      return CURRENT_FILTER === "all" || item.sector === CURRENT_FILTER;
    });

    grid.innerHTML = items.map(function (item) {
      var isSel = Number(item.id) === Number(CURRENT_ID);
      var cardCls = "catalog-card" + (item.featured ? " is-featured" : "") + (isSel ? " is-selected" : "");
      var secCls = item.sector === "securite" ? "secu" : (item.sector === "btp" ? "btp" : "agence");
      var monthlyHtml = item.monthlyPriceHt > 0
        ? '<span class="catalog-price-sub">+ suivi optionnel ' + item.monthlyPriceHt + ' € HT/mois (sans engagement)</span>'
        : '<span class="catalog-price-sub">' + esc(item.subtitle) + '</span>';

      return (
        '<article class="' + cardCls + '" data-card-id="' + item.id + '">' +
          '<div class="catalog-card-top">' +
            '<div class="catalog-meta-row">' +
              '<span class="sector-pill ' + secCls + '">' + esc(item.sectorLabel) + '</span>' +
              (item.featured ? '<span class="catalog-badge-rec">★ Recommandé</span>' : '<span class="mono" style="font-size:10.5px;color:var(--ink-soft)">' + esc(item.code) + '</span>') +
            '</div>' +
            '<span class="offer-badge">' + esc(item.badge) + '</span>' +
            '<h3>' + esc(item.title) + '</h3>' +
            '<div class="catalog-price-block">' +
              '<span class="catalog-price-main">' + item.priceHt.toLocaleString("fr-FR") + ' € HT</span>' +
              monthlyHtml +
            '</div>' +
            '<ul class="catalog-ul">' +
              item.bullets.map(function (b) { return "<li>" + esc(b) + "</li>"; }).join("") +
            '</ul>' +
          '</div>' +
          '<div>' +
            '<div class="catalog-footer-note">' + esc(item.scopeNote) + '</div>' +
            '<button class="btn ' + (isSel ? "btn-emerald" : "btn-primary") + '" style="width:100%;justify-content:center" type="button" data-select-offer="' + item.id + '">' +
              (isSel ? "✓ Formule sélectionnée (Voir le règlement ↓)" : "Commander — " + item.priceHt.toLocaleString("fr-FR") + " € HT →") +
            '</button>' +
          '</div>' +
        '</article>'
      );
    }).join("");

    grid.querySelectorAll("[data-select-offer]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        selectOffer(Number(btn.getAttribute("data-select-offer")), true);
      });
    });
  }

  function selectOffer(id, scroll) {
    if (!CATALOG[id]) return;
    CURRENT_ID = Number(id);
    INCLUDE_MONTHLY = false;
    var item = CATALOG[CURRENT_ID];

    var sel = $("ordFormula");
    if (sel) sel.value = String(CURRENT_ID);

    var splitSel = $("ordPaymentMode");
    if (splitSel) {
      if (item.defaultAcomptePct === 40) splitSel.value = "40";
      else if (item.defaultAcomptePct === 50) splitSel.value = "50";
      else splitSel.value = "100";
    }

    var mWrap = $("ordMonthlyWrap");
    var mChk = $("ordIncludeMonthly");
    var mLbl = $("ordMonthlyLabel");
    if (mWrap && mChk && mLbl) {
      if (item.monthlyPriceHt > 0) {
        mWrap.classList.remove("hidden");
        mChk.checked = false;
        mLbl.textContent = item.monthlyLabel;
      } else {
        mWrap.classList.add("hidden");
        mChk.checked = false;
      }
    }

    renderCatalog();
    renderOrderState();
    if (scroll && $("checkout-section")) {
      $("checkout-section").scrollIntoView({ behavior: "smooth" });
      toast(item.title + " sélectionné — Choisissez votre moyen de paiement.");
    }
  }

  function computeTotals(cfg) {
    var item = CATALOG[CURRENT_ID];
    var ht = item.priceHt;
    var monthlyHt = (item.monthlyPriceHt > 0 && INCLUDE_MONTHLY) ? item.monthlyPriceHt : 0;
    var tvaPct = cfg.issuer.tvaRegime === "20" ? 20 : 0;
    var tvaAmt = tvaPct > 0 ? Number((ht * 0.20).toFixed(2)) : 0;
    var ttc = Number((ht + tvaAmt).toFixed(2));
    var monthlyTtc = Number((monthlyHt * (1 + tvaPct / 100)).toFixed(2));

    var modeRaw = $("ordPaymentMode") ? $("ordPaymentMode").value : "100";
    var dueNowPct = modeRaw === "40" ? 40 : (modeRaw === "50" ? 50 : 100);
    var dueNowTtc = Number((ttc * dueNowPct / 100).toFixed(2));
    var soldeTtc = Number((ttc - dueNowTtc).toFixed(2));
    var q4x = Number((ttc / 4).toFixed(2));

    return {
      item: item,
      ht: ht,
      monthlyHt: monthlyHt,
      monthlyTtc: monthlyTtc,
      tvaPct: tvaPct,
      tvaAmt: tvaAmt,
      tvaMention: tvaPct === 0 ? "TVA non applicable — art. L. 223-3 du CIBS (ex-293 B CGI)" : ("TVA 20 % (" + (cfg.issuer.tvaNum || "FR...") + ")"),
      ttc: ttc,
      modeRaw: modeRaw,
      dueNowPct: dueNowPct,
      dueNowTtc: dueNowTtc,
      soldeTtc: soldeTtc,
      q4x: q4x,
      ref: ($("ordRef") && $("ordRef").value.trim()) || defaultBcRef(),
      date: ($("ordDate") && $("ordDate").value) || localIsoDate(),
      clientNom: ($("ordClientNom") && $("ordClientNom").value.trim()) || "",
      clientSiren: ($("ordClientSiren") && $("ordClientSiren").value.trim()) || "",
      clientAdresse: ($("ordClientAdresse") && $("ordClientAdresse").value.trim()) || "",
      clientRep: ($("ordClientRep") && $("ordClientRep").value.trim()) || "",
      clientEmail: ($("ordClientEmail") && $("ordClientEmail").value.trim()) || "",
      clientTel: ($("ordClientTel") && $("ordClientTel").value.trim()) || "",
      rgpdConsent: Boolean($("ordRgpdConsent") && $("ordRgpdConsent").checked)
    };
  }

  function renderOrderState() {
    var cfg = loadCfg();
    var o = computeTotals(cfg);

    if ($("sumOfferName")) $("sumOfferName").textContent = o.item.title;
    if ($("sumHt")) $("sumHt").textContent = fmtMoney(o.ht);
    if ($("sumTvaLabel")) $("sumTvaLabel").textContent = o.tvaMention;
    if ($("sumTvaAmt")) $("sumTvaAmt").textContent = fmtMoney(o.tvaAmt);
    if ($("sumMonthlyRow")) {
      $("sumMonthlyRow").classList.toggle("hidden", o.monthlyHt <= 0);
      if ($("sumMonthlyVal")) $("sumMonthlyVal").textContent = fmtMoney(o.monthlyTtc) + " / mois (sans engagement)";
    }
    if ($("sumTotalTtc")) $("sumTotalTtc").textContent = fmtMoney(o.ttc);

    var dueLabel = "Montant à régler aujourd'hui (100 %)";
    if (o.modeRaw === "4x") {
      dueLabel = "1ère mensualité estimée (Paiement 4x)";
    } else if (o.dueNowPct < 100) {
      dueLabel = "Acompte à régler aujourd'hui (" + o.dueNowPct + " %)";
    }
    if ($("sumDueLabel")) $("sumDueLabel").textContent = dueLabel;
    if ($("sumDueNow")) $("sumDueNow").textContent = fmtMoney(o.modeRaw === "4x" ? o.q4x : o.dueNowTtc);

    if ($("sumSoldeRow")) {
      $("sumSoldeRow").classList.toggle("hidden", o.modeRaw === "4x" || o.soldeTtc <= 0);
      if ($("sumSoldeVal")) $("sumSoldeVal").textContent = fmtMoney(o.soldeTtc) + " à la livraison";
    }

    renderPaymentPanels(cfg, o);
    renderProformaSheet(cfg, o);
  }

  function renderPaymentPanels(cfg, o) {
    ["virement", "carte", "paypal", "sepa"].forEach(function (tab) {
      var btn = $("tabPay_" + tab);
      var pnl = $("panelPay_" + tab);
      if (btn) btn.classList.toggle("active", CURRENT_PAY_TAB === tab);
      if (pnl) pnl.classList.toggle("hidden", CURRENT_PAY_TAB !== tab);
    });

    /* Virement */
    var hasIban = Boolean(cfg.channels.iban && cfg.channels.iban.trim());
    if ($("bankReadyBox")) $("bankReadyBox").classList.toggle("hidden", !hasIban);
    if ($("bankPendingBox")) $("bankPendingBox").classList.toggle("hidden", hasIban);
    if (hasIban) {
      if ($("valBankHolder")) $("valBankHolder").textContent = cfg.issuer.raison + " (" + cfg.issuer.enseigne + ")";
      if ($("valBankName")) $("valBankName").textContent = cfg.channels.bankName || "Compte Professionnel France";
      if ($("valBankIban")) $("valBankIban").textContent = cfg.channels.iban.trim();
      if ($("valBankBic")) $("valBankBic").textContent = cfg.channels.bic ? cfg.channels.bic.trim() : "Non requis en zone SEPA";
    }
    if ($("valBankRef")) $("valBankRef").textContent = o.ref;
    if ($("valBankAmount")) $("valBankAmount").textContent = fmtMoney(o.modeRaw === "4x" ? o.q4x : o.dueNowTtc);

    /* Carte Pro (Banque / Mollie / SumUp / PayPlug) */
    var cardUrl = cfg.channels.cardLinks[o.item.id] || cfg.channels.cardGlobalUrl || "";
    var hasCard = Boolean(cardUrl);
    if ($("btnOpenCardPay")) $("btnOpenCardPay").classList.toggle("hidden", !hasCard);
    if ($("btnReqCardLinkWa")) $("btnReqCardLinkWa").classList.toggle("hidden", hasCard);
    if ($("btnReqCardLinkMail")) $("btnReqCardLinkMail").classList.toggle("hidden", hasCard);
    if ($("cardHintMsg")) {
      $("cardHintMsg").textContent = hasCard
        ? "Lien de règlement carte société activé pour " + o.item.title + " (hébergé sur votre prestataire bancaire européen)."
        : "Le lien de paiement par carte pro (SumUp / Qonto / Mollie / PayPlug) est en cours de raccordement. Demandez votre lien sécurisé immédiat en 1 clic ci-dessous ou réglez par Virement Express.";
    }

    /* PayPal 4x */
    var ppUrl = cfg.channels.paypalLink || "";
    var hasPp = Boolean(ppUrl);
    if ($("btnOpenPaypalPay")) $("btnOpenPaypalPay").classList.toggle("hidden", !hasPp);
    if ($("btnReqPaypalWa")) $("btnReqPaypalWa").classList.toggle("hidden", hasPp);
    if ($("paypal4xPreview")) {
      $("paypal4xPreview").textContent = "4 mensualités estimées de " + fmtMoney(o.q4x) + " TTC (total " + fmtMoney(o.ttc) + ").";
    }

    /* GoCardless SEPA */
    var gcUrl = cfg.channels.gocardlessLink || "";
    var hasGc = Boolean(gcUrl);
    if ($("btnOpenGcPay")) $("btnOpenGcPay").classList.toggle("hidden", !hasGc);
    if ($("btnReqGcWa")) $("btnReqGcWa").classList.toggle("hidden", hasGc);
  }

  function getCgvParagraphs(cfg) {
    var iss = cfg.issuer;
    return [
      "Art. 1 — Objet & Périmètre hors activité CNAPS : Prestation B2B d'ingénierie documentaire, d'outillage de chiffrage ou de systèmes opérationnels, strictement hors activités réglementées du Livre VI du Code de la sécurité intérieure (art. L.611-1 CSI).",
      "Art. 2 — Prix, TVA & Règlements : Régime fiscal unique appliqué : " + (iss.tvaRegime === "20" ? "TVA normale 20 %" : "TVA non applicable, art. L. 223-3 du CIBS (ancien art. 293 B du CGI)") + ". Règlement par virement SEPA instantané sur Proforma/Bon de Commande (acompte ou comptant), lien bancaire CB ou prélèvement SEPA. Conformément aux art. L.441-10 et D.441-5 C. com., tout retard entraîne des pénalités (3 × taux légal) + indemnité forfaitaire de 40 €.",
      "Art. 3 — Délais & Obligation de moyens : Livraison numérique immédiate dès confirmation d'encaissement pour les kits autonomes ; déploiement selon planning convenu pour les ateliers et intégrations 7 jours. Le prestataire est tenu à une obligation de moyens.",
      "Art. 4 — Propriété intellectuelle : Licence d'usage interne, personnelle et non transférable accordée à l'entité cliente après paiement complet. Toute revente ou diffusion publique est interdite.",
      "Art. 5 — Responsabilité & RGPD (Art. 13/28) : Responsabilité plafonnée au montant HT encaissé. Aucune donnée client n'est cédée à des tiers ni utilisée pour entraîner des modèles IA tiers (purge sous 30 jours après clôture).",
      "Art. 6 — Juridiction : Droit français ; compétence exclusive du Tribunal de commerce du siège du prestataire (" + (iss.siege || "Albi") + ")."
    ];
  }

  function renderProformaSheet(cfg, o) {
    var el = $("proformaSheet");
    if (!el) return;
    var cgvHtml = getCgvParagraphs(cfg).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
    var clientNomAff = o.clientNom || "[Raison sociale acheteur à compléter ci-dessus]";
    var clientInfoAff = [
      o.clientSiren ? "SIREN : " + o.clientSiren : "[SIREN]",
      o.clientAdresse || "[Adresse complète]",
      o.clientRep ? "Représenté par : " + o.clientRep : ""
    ].filter(Boolean).join(" · ");
    var contactParts = [cfg.channels.email, cfg.channels.tel].filter(Boolean);

    el.innerHTML =
      '<div class="bc-head">' +
        '<div>' +
          '<h4>BON DE COMMANDE &amp; PROFORMA B2B — ' + esc(o.ref) + '</h4>' +
          '<div><b>' + esc(cfg.issuer.raison) + '</b> (' + esc(cfg.issuer.enseigne) + ')</div>' +
          '<div>' + esc(cfg.issuer.capital) + ' · Siège : ' + esc(cfg.issuer.siege) + ' · SIREN : ' + esc(cfg.issuer.siren) + '</div>' +
          (contactParts.length ? '<div>Contact : ' + esc(contactParts.join(" · ")) + '</div>' : '') +
        '</div>' +
        '<div style="text-align:right">' +
          '<div><b>Date d\'émission :</b> ' + esc(o.date) + '</div>' +
          '<div><b>Client :</b> ' + esc(clientNomAff) + '</div>' +
          '<div>' + esc(clientInfoAff) + '</div>' +
        '</div>' +
      '</div>' +
      '<table class="bc-table">' +
        '<thead><tr><th>Désignation de la formule B2B</th><th>Livraison &amp; Délai</th><th style="text-align:right">Montant HT</th></tr></thead>' +
        '<tbody>' +
          '<tr><td><b>' + esc(o.item.title) + '</b><br><small>' + esc(o.item.subtitle) + '</small></td><td>' + esc(o.item.delai) + '</td><td style="text-align:right">' + fmtMoney(o.ht) + '</td></tr>' +
          (o.monthlyHt > 0 ? '<tr><td>Option suivi &amp; maintenance mensuelle (sans engagement)</td><td>Mensuel reconductible</td><td style="text-align:right">' + fmtMoney(o.monthlyHt) + ' / mois</td></tr>' : '') +
        '</tbody>' +
      '</table>' +
      '<div class="bc-totals">' +
        '<div>' +
          '<div><b>Modalité choisie :</b> ' + (o.modeRaw === "4x" ? ("Paiement en 4x (" + fmtMoney(o.q4x) + " / mois)") : ("Acompte " + o.dueNowPct + " % à la commande (" + fmtMoney(o.dueNowTtc) + ") · Solde (" + fmtMoney(o.soldeTtc) + ")")) + '</div>' +
          (cfg.channels.iban ? '<div><b>Virement IBAN :</b> ' + esc(cfg.channels.iban) + (cfg.channels.bic ? ' · BIC : ' + esc(cfg.channels.bic) : '') + ' · <b>Libellé :</b> ' + esc(o.ref) + '</div>' : '<div><b>Règlement :</b> Virement SEPA (IBAN communiqué sur validation) / Lien Bancaire Pro / PayPal 4x</div>') +
        '</div>' +
        '<div style="text-align:right">' +
          '<div>Total HT : <b>' + fmtMoney(o.ht) + '</b></div>' +
          '<div>' + esc(o.tvaMention) + ' : <b>' + fmtMoney(o.tvaAmt) + '</b></div>' +
          '<div style="font-size:17px;margin-top:4px;color:var(--ink)"><b>Total TTC : ' + fmtMoney(o.ttc) + '</b></div>' +
        '</div>' +
      '</div>' +
      '<div class="bc-cgv-box"><b>CONDITIONS GÉNÉRALES DE VENTE B2B SIMPLIFIÉES :</b>' + cgvHtml + '</div>' +
      '<div style="display:flex;justify-content:space-between;gap:20px;margin-top:18px;font-size:12px">' +
        '<div style="flex:1;border-top:1px solid #cbd5e1;padding-top:6px"><b>Pour ' + esc(cfg.issuer.raison) + '</b><br>' + esc(cfg.issuer.rep) + '</div>' +
        '<div style="flex:1;border-top:1px solid #cbd5e1;padding-top:6px"><b>Bon pour accord &amp; acceptation des CGV — Le Client</b><br>Date, cachet et signature précédés de la mention « Bon pour accord »</div>' +
      '</div>';
  }

  function buildOrderMessage(actionLabel) {
    var cfg = loadCfg();
    var o = computeTotals(cfg);
    return [
      "=== COMMANDE B2B " + cfg.issuer.enseigne.toUpperCase() + " ===",
      "Action         : " + actionLabel,
      "Référence BC   : " + o.ref,
      "Formule        : " + o.item.title + " (" + o.item.code + ")",
      "Total HT / TTC : " + fmtMoney(o.ht) + " HT / " + fmtMoney(o.ttc) + " TTC",
      "Règlement dû   : " + fmtMoney(o.modeRaw === "4x" ? o.q4x : o.dueNowTtc) + " (" + (o.modeRaw === "4x" ? "Paiement 4x" : (o.dueNowPct + "%")) + ")",
      o.monthlyHt > 0 ? ("Option mensuel : +" + fmtMoney(o.monthlyHt) + " HT/mois") : "",
      "--- Client ---",
      "Entreprise     : " + (o.clientNom || "Non renseigné"),
      "SIREN          : " + (o.clientSiren || "Non renseigné"),
      "Représentant   : " + (o.clientRep || "Non renseigné"),
      "Email          : " + (o.clientEmail || "Non renseigné"),
      "Téléphone      : " + (o.clientTel || "Non renseigné"),
      "Adresse        : " + (o.clientAdresse || "Non renseignée")
    ].filter(Boolean).join("\n");
  }

  function validateBuyerForSend() {
    var nom = ($("ordClientNom") && $("ordClientNom").value.trim()) || "";
    var email = ($("ordClientEmail") && $("ordClientEmail").value.trim()) || "";
    var tel = ($("ordClientTel") && $("ordClientTel").value.trim()) || "";
    var rgpd = Boolean($("ordRgpdConsent") && $("ordRgpdConsent").checked);
    if (!nom || (!email && !tel)) {
      toast("Indiquez votre Raison sociale et un Email ou Téléphone de livraison.");
      if ($("ordClientNom")) $("ordClientNom").focus();
      return false;
    }
    if (!rgpd) {
      toast("Merci de cocher l'accord RGPD & CGV B2B avant validation.");
      if ($("ordRgpdConsent")) $("ordRgpdConsent").focus();
      return false;
    }
    return true;
  }

  function notifyViaWhatsapp(actionLabel) {
    if (!validateBuyerForSend()) return;
    var cfg = loadCfg();
    var wa = sanitizeWaDigits(cfg.channels.whatsapp || cfg.channels.tel);
    if (!wa) {
      toast("Numéro WhatsApp non configuré.");
      return;
    }
    window.open("https://wa.me/" + wa + "?text=" + encodeURIComponent(buildOrderMessage(actionLabel)), "_blank", "noopener,noreferrer");
  }

  function notifyViaEmail(actionLabel) {
    if (!validateBuyerForSend()) return;
    var cfg = loadCfg();
    var dest = sanitizeEmail(cfg.channels.email);
    if (!dest) {
      toast("Email émetteur non configuré.");
      return;
    }
    var o = computeTotals(cfg);
    var subj = "[" + cfg.issuer.enseigne + "] " + actionLabel + " — " + o.ref + " (" + o.clientNom + ")";
    window.location.href = "mailto:" + encodeURIComponent(dest) + "?subject=" + encodeURIComponent(subj) + "&body=" + encodeURIComponent(buildOrderMessage(actionLabel));
  }

  function initAdminDrawer() {
    var cfg = loadCfg();
    var params = new URLSearchParams(window.location.search || "");
    if (params.get("admin") === "1" && $("adminDrawer")) {
      $("adminDrawer").classList.remove("hidden");
    }

    function populate() {
      var c = loadCfg();
      if ($("admBankName")) $("admBankName").value = c.channels.bankName || "";
      if ($("admIban")) $("admIban").value = c.channels.iban || "";
      if ($("admBic")) $("admBic").value = c.channels.bic || "";
      if ($("admCardGlobal")) $("admCardGlobal").value = c.channels.cardGlobalUrl || "";
      if ($("admPaypal")) $("admPaypal").value = c.channels.paypalLink || "";
      if ($("admGc")) $("admGc").value = c.channels.gocardlessLink || "";
      if ($("admSiren")) $("admSiren").value = c.issuer.siren || "";
      if ($("admTvaRegime")) $("admTvaRegime").value = c.issuer.tvaRegime || "293B";
    }

    function readAdmin() {
      var c = loadCfg();
      c.channels.bankName = ($("admBankName") && $("admBankName").value.trim()) || "";
      c.channels.iban = ($("admIban") && $("admIban").value.trim()) || "";
      c.channels.bic = ($("admBic") && $("admBic").value.trim()) || "";
      c.channels.cardGlobalUrl = sanitizeExternalUrl($("admCardGlobal") ? $("admCardGlobal").value.trim() : "");
      c.channels.paypalLink = sanitizeExternalUrl($("admPaypal") ? $("admPaypal").value.trim() : "");
      c.channels.gocardlessLink = sanitizeExternalUrl($("admGc") ? $("admGc").value.trim() : "");
      if ($("admSiren")) c.issuer.siren = $("admSiren").value.trim();
      if ($("admTvaRegime")) c.issuer.tvaRegime = $("admTvaRegime").value === "20" ? "20" : "293B";
      return c;
    }

    populate();

    if ($("btnOpenStoreAdmin")) {
      $("btnOpenStoreAdmin").addEventListener("click", function () {
        populate();
        $("adminDrawer").classList.toggle("hidden");
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
    if ($("btnCloseAdmin")) {
      $("btnCloseAdmin").addEventListener("click", function () { $("adminDrawer").classList.add("hidden"); });
    }
    if ($("btnSaveAdmin")) {
      $("btnSaveAdmin").addEventListener("click", function () {
        var nextCfg = readAdmin();
        saveCfg(nextCfg);
        $("adminDrawer").classList.add("hidden");
        renderOrderState();
        toast("Paramètres bancaires & paiement enregistrés pour votre aperçu.");
      });
    }
    if ($("btnDownloadSiteCfg")) {
      $("btnDownloadSiteCfg").addEventListener("click", function () {
        var nextCfg = readAdmin();
        saveCfg(nextCfg);
        renderOrderState();
        var content = "/* Généré depuis Boutique B2B COS Opérations × SYNTESIA */\nwindow.COS_OPERATIONS_CONFIG = window.OMNISECUR_CONFIG = " + JSON.stringify(nextCfg, null, 2) + ";\n";
        var blob = new Blob([content], { type: "application/javascript;charset=utf-8;" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "site-config.js";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
        toast("site-config.js téléchargé — Déposez-le à la racine de votre hébergement o2switch.");
      });
    }
  }

  function init() {
    if ($("ordRef")) $("ordRef").value = defaultBcRef();
    if ($("ordDate")) $("ordDate").value = localIsoDate();

    document.querySelectorAll("[data-filter]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        CURRENT_FILTER = btn.getAttribute("data-filter") || "all";
        document.querySelectorAll("[data-filter]").forEach(function (b) {
          b.classList.toggle("active", b === btn);
        });
        renderCatalog();
      });
    });

    if ($("ordFormula")) {
      $("ordFormula").addEventListener("change", function () {
        selectOffer(Number($("ordFormula").value), false);
      });
    }
    if ($("ordPaymentMode")) {
      $("ordPaymentMode").addEventListener("change", renderOrderState);
    }
    if ($("ordIncludeMonthly")) {
      $("ordIncludeMonthly").addEventListener("change", function () {
        INCLUDE_MONTHLY = Boolean($("ordIncludeMonthly").checked);
        renderOrderState();
      });
    }

    ["ordRef", "ordDate", "ordClientNom", "ordClientSiren", "ordClientAdresse", "ordClientRep", "ordClientEmail", "ordClientTel"].forEach(function (id) {
      var el = $(id);
      if (el) el.addEventListener(el.type === "date" ? "change" : "input", renderOrderState);
    });

    ["virement", "carte", "paypal", "sepa"].forEach(function (tab) {
      var b = $("tabPay_" + tab);
      if (b) {
        b.addEventListener("click", function () {
          CURRENT_PAY_TAB = tab;
          if ($("ordPaymentMode")) {
            if (tab === "paypal") {
              $("ordPaymentMode").value = "4x";
            } else if ($("ordPaymentMode").value === "4x") {
              var item = CATALOG[CURRENT_ID];
              $("ordPaymentMode").value = String(item.defaultAcomptePct || 100);
            }
          }
          renderOrderState();
        });
      }
    });

    /* Boutons copie IBAN / BIC / Ref */
    if ($("btnCopyIban")) $("btnCopyIban").addEventListener("click", function () { copyText($("valBankIban").textContent, "IBAN"); });
    if ($("btnCopyBic")) $("btnCopyBic").addEventListener("click", function () { copyText($("valBankBic").textContent, "BIC"); });
    if ($("btnCopyRef")) $("btnCopyRef").addEventListener("click", function () { copyText($("valBankRef").textContent, "Référence commande"); });
    if ($("btnCopyAmt")) $("btnCopyAmt").addEventListener("click", function () { copyText($("valBankAmount").textContent, "Montant"); });

    /* Notifications & Actions Paiement */
    if ($("btnNotifyVirementWa")) $("btnNotifyVirementWa").addEventListener("click", function () { notifyViaWhatsapp("CONFIRMATION VIREMENT SEPA EFFECTUÉ"); });
    if ($("btnNotifyVirementMail")) $("btnNotifyVirementMail").addEventListener("click", function () { notifyViaEmail("Confirmation virement SEPA"); });
    if ($("btnAskRibWa")) $("btnAskRibWa").addEventListener("click", function () { notifyViaWhatsapp("DEMANDE RIB / IBAN POUR VIREMENT"); });
    if ($("btnAskRibMail")) $("btnAskRibMail").addEventListener("click", function () { notifyViaEmail("Demande de RIB / IBAN officiel"); });

    if ($("btnOpenCardPay")) {
      $("btnOpenCardPay").addEventListener("click", function () {
        if (!validateBuyerForSend()) return;
        var cfg = loadCfg();
        var url = cfg.channels.cardLinks[CURRENT_ID] || cfg.channels.cardGlobalUrl;
        if (url) window.open(url, "_blank", "noopener,noreferrer");
      });
    }
    if ($("btnReqCardLinkWa")) $("btnReqCardLinkWa").addEventListener("click", function () { notifyViaWhatsapp("DEMANDE LIEN CARTE BANCAIRE PRO"); });
    if ($("btnReqCardLinkMail")) $("btnReqCardLinkMail").addEventListener("click", function () { notifyViaEmail("Demande de lien de paiement CB pro"); });

    if ($("btnOpenPaypalPay")) {
      $("btnOpenPaypalPay").addEventListener("click", function () {
        if (!validateBuyerForSend()) return;
        var cfg = loadCfg();
        if (cfg.channels.paypalLink) window.open(cfg.channels.paypalLink, "_blank", "noopener,noreferrer");
      });
    }
    if ($("btnReqPaypalWa")) $("btnReqPaypalWa").addEventListener("click", function () { notifyViaWhatsapp("DEMANDE LIEN PAYPAL / 4X SANS FRAIS"); });

    if ($("btnOpenGcPay")) {
      $("btnOpenGcPay").addEventListener("click", function () {
        if (!validateBuyerForSend()) return;
        var cfg = loadCfg();
        if (cfg.channels.gocardlessLink) window.open(cfg.channels.gocardlessLink, "_blank", "noopener,noreferrer");
      });
    }
    if ($("btnReqGcWa")) $("btnReqGcWa").addEventListener("click", function () { notifyViaWhatsapp("DEMANDE MANDAT SEPA GOCARDLESS"); });

    if ($("btnOpenCalStore")) {
      $("btnOpenCalStore").addEventListener("click", function () {
        var cfg = loadCfg();
        if (cfg.channels.calUrl) window.open(cfg.channels.calUrl, "_blank", "noopener,noreferrer");
      });
    }

    if ($("btnPrintProforma")) {
      $("btnPrintProforma").addEventListener("click", function () {
        window.print();
      });
    }

    if ($("btnDownloadProformaTxt")) {
      $("btnDownloadProformaTxt").addEventListener("click", function () {
        var cfg = loadCfg();
        var o = computeTotals(cfg);
        var txt = [
          "BON DE COMMANDE & PROFORMA B2B — " + o.ref,
          "Date : " + o.date,
          "Prestataire : " + cfg.issuer.raison + " (" + cfg.issuer.enseigne + ") — SIREN " + cfg.issuer.siren + " — " + cfg.issuer.siege,
          "Client : " + (o.clientNom || "[À compléter]") + " | SIREN " + (o.clientSiren || "[À compléter]"),
          "---------------------------------------------------------------",
          "Formule    : " + o.item.title + " (" + o.item.code + ")",
          "Total HT   : " + fmtMoney(o.ht),
          "TVA        : " + o.tvaMention + " (" + fmtMoney(o.tvaAmt) + ")",
          "Total TTC  : " + fmtMoney(o.ttc),
          "À régler   : " + fmtMoney(o.modeRaw === "4x" ? o.q4x : o.dueNowTtc) + " | Solde : " + fmtMoney(o.soldeTtc),
          cfg.channels.iban ? ("IBAN       : " + cfg.channels.iban + (cfg.channels.bic ? " | BIC : " + cfg.channels.bic : "")) : "",
          "---------------------------------------------------------------"
        ].filter(Boolean).concat(getCgvParagraphs(cfg)).join("\n");
        var blob = new Blob([txt], { type: "text/plain;charset=utf-8;" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = o.ref.replace(/[^a-zA-Z0-9_-]+/g, "-") + "-Proforma-CGV.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      });
    }

    /* Paramètre URL ?pack=1..5 */
    var q = new URLSearchParams(window.location.search || "");
    var qp = Number(q.get("pack"));
    if (CATALOG[qp]) {
      CURRENT_ID = qp;
    }

    initAdminDrawer();
    selectOffer(CURRENT_ID, Boolean(CATALOG[qp]));
  }

  document.addEventListener("DOMContentLoaded", init);
})();
