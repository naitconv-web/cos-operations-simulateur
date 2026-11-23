(function () {
  "use strict";

  var LS_CFG = "omnisecur_prod_v1_cfg";
  var LS_CONSENT = "omnisecur_prod_v1_consent";
  var NO_LS = false;
  try { localStorage.setItem("_omni_site_t", "1"); localStorage.removeItem("_omni_site_t"); } catch (e) { NO_LS = true; }

  var OFFERS = {
    1: {
      id: 1,
      shortName: "Pack 1 — Arsenal Documentaire & Chiffrage v3.2",
      label: "Pack 1 — Arsenal Documentaire & Chiffrage v3.2 (Bouclier Excel/Web + 6 Mémoires + Guide & Trames — hors COS IA)",
      price: 690
    },
    2: {
      id: 2,
      shortName: "Pack Dirigeant COS Opérations (Démo 15 min)",
      label: "Pack Dirigeant COS Opérations — Démo personnalisée 15 min (sur devis)",
      price: 990
    },
    3: {
      id: 3,
      shortName: "Pack 3 — Commando Réponse AO 48h (1 lot <= 15p)",
      label: "Pack 3 — Commando Réponse AO 48h (1 lot unique <= 15p : audit Go/No-Go + Bouclier v3.2 + Mémoire ciblé)",
      price: 1450
    }
  };

  var XRAY_CONTENT = {
    bouclier: {
      title: "Bouclier Anti-Pertes v3.2 (Classeur Excel Pro + Outil Web Autonome)",
      desc: "Moteur déterministe sans macro VBA : calcule le coût complet réel à la vacation et bloque mécaniquement l'édition d'un devis tant que la Direction n'a pas validé les coûts (EXACT/UPPER/TRIM = OUI).",
      bullets: [
        "Profils P01 à P07 pré-calibrés IDCC 1351 (ADS, SSIAP 1/2/3, Rondier, Opérateur L.611-1 1°, Cynophile avec indemnité chien H10 non soumise aux charges).",
        "Simulateur RDV terrain « Piège 23 €/h » + bouton Annuler (Undo) + confirmation avant écrasement + sauvegarde/reprise JSON portable.",
        "Validation stricte sur taux à 0 %, charges et base horaire (zéro repli silencieux susceptible de masquer une perte)."
      ],
      specs: [
        ["Fichiers livrés", "Bouclier-Anti-Pertes-v3.2.xlsx + Bouclier_Anti_Pertes_v3.2.html"],
        ["Parité contrôlée", "8/8 scénarios de référence (Recette P01 = 1 519,00 € / Seuil 138,22 h)"],
        ["Compatibilité", "Excel Windows/Mac, LibreOffice Calc, navigateurs desktop & mobile hors ligne"],
        ["Pont vers l'IA", "Export JSON strictement bloqué par COS si non validé ou déficitaire"]
      ]
    },
    memoires: {
      title: "6 Mémoires Techniques Modulaires (.docx) + Guide & Trames B2B",
      desc: "Six trames Word structurées par critère de notation BOAMP, purgées de toute sur-promesse illégale et intégrant l'Avenant n° 2 IDCC 1351 (durée minimale 6,0 h par vacation au 01/07/2026).",
      bullets: [
        "01 Gardiennage institutionnel • 02 Événementiel & interface AASC (L.725-3) • 03 Rondes & surveillance mobile.",
        "04 Contrôle d'accès / Accueil sécurisé • 05 Résidentiel & commerces multi-sites • 06 Télésurveillance L.611-1 1° / L.613-6 (niveaux N1 à N4).",
        "Trames de réponse entrante, script de soutenance orale, encadrement sous-traitance DC4 (L.612-5-1) et recherche de secours zéro valeur d'exemple."
      ],
      specs: [
        ["Volume livré", "10 fichiers Word (.docx) mis en page avec tableaux verrouillés (cantSplit)"],
        ["Plancher légal", "Avenant n° 2 (6,0 h min.) + accord 18/05/1993 Art. 2 (repos 12h / 11h dérog.)"],
        ["Hygiène conformité", "0 promesse hors périmètre (équipements réglementés, faux labels ou véhicules spéciaux purgés)"],
        ["Usage", "Personnalisation rapide par balises [NOM SOCIETE] et [DELAI] avant dépôt"]
      ]
    },
    cos: {
      title: "COS Bureau IA Sécurité v4.2 — Copilote AO Local Mono-Poste (BYOK)",
      desc: "Application HTML autonome mono-poste exécutée dans votre navigateur, branchée directement sur votre propre fournisseur API (OpenAI, Mistral, Groq, OpenRouter ou Ollama local) sans abonnement fournisseur.",
      bullets: [
        "5 postes spécialisés AO sécurité privée (audit RC, analyse mémoire, conformité CSI/IDCC, synthèse Direction, contrôle BPU).",
        "Clé API conservée en sessionStorage par défaut (effacée à la fermeture de l'onglet), zéro secret stocké dans le fichier livré.",
        "Défense anti-injection de second ordre (neutralisation des balises délimitantes sur tout DCE importé, historique isolé hors prompt système, auto-formation OFF par défaut)."
      ],
      specs: [
        ["Sécurité applicative", "CSP stricte + sanitizeExternalUrl() HTTPS/localhost + esc() complet"],
        ["Import chiffrage", "Rejet automatique si état != PRET, non validé ou marge nette < 0 €"],
        ["Modèle économique", "Licence locale mono-poste (Pack 2) distincte d'un futur SaaS 99–299 €/mois"],
        ["Atelier inclus", "2h de paramétrage sur votre Fiche Entreprise + prise en main dirigeant"]
      ]
    },
    conformite: {
      title: "Architecture Juridique, Contractuelle & RGPD B2B",
      desc: "Chaque document et outil commercial trace une frontière nette entre l'outillage/ingénierie méthodologique (OMNISECUR) et les activités réglementées exercées exclusivement par les entreprises clientes.",
      bullets: [
        "Prestation 100 % hors champ CNAPS (art. L.611-1 CSI) : ni gardiennage, ni ronde, ni télésurveillance, ni intervention.",
        "Unicité stricte du régime TVA émetteur sur Bon de Commande (art. L. 223-3 du CIBS (ex-293 B CGI) OU TVA 20 %, jamais les deux).",
        "CGV B2B intégrées : obligation de moyens (zéro promesse d'attribution), plafond de responsabilité au montant HT, L.441-10 + 40 €, et clause RGPD art. 28 avec purge à 30 jours."
      ],
      specs: [
        ["Références CSI", "L.611-1 1°, L.612-9, L.613-6, L.612-5-1 (DC4) — contrôle strict Code sécurité intérieure"],
        ["Convention collective", "IDCC 1351 — Nuit +10 %, Dimanche +10 %, Férié +100 %, Avenant n° 2 (6h)"],
        ["Sous-traitance RGPD", "Aucune donnée utilisée pour entraîner un modèle tiers ; suppression J+30"],
        ["Capacité Commando 48h", "Plafonnée contractuellement à 2 dossiers simultanés (1 lot <= 15 pages)"]
      ]
    }
  };

  function getBaseConfig() {
    var base = {
      issuer: {
        raison: "Mounir NAIT MOHAND (Entrepreneur Individuel)",
        enseigne: "OMNISECUR",
        rep: "M. Mounir NAIT MOHAND, Président",
        capital: "Entreprise Individuelle — Micro-entreprise (SIREN 849 261 870)",
        siege: "Albi (81)",
        siren: "",
        tvaRegime: "293B",
        tvaNum: ""
      },
      channels: {
        domainUrl: "",
        hostProvider: "",
        email: "",
        tel: "",
        whatsapp: "",
        calUrl: "",
        crmWebhookUrl: "",
        stripeVerifyUrl: "",
        iban: "",
        stripeLinks: { 1: "", 2: "", 3: "" },
        commandoSlotsOpen: 2,
        metaPixelId: ""
      }
    };
    var ext = window.OMNISECUR_CONFIG;
    if (ext && typeof ext === "object") {
      if (ext.issuer) Object.assign(base.issuer, ext.issuer);
      if (ext.channels) {
        Object.assign(base.channels, ext.channels);
        if (ext.channels.stripeLinks) base.channels.stripeLinks = Object.assign({ 1: "", 2: "", 3: "" }, ext.channels.stripeLinks);
      }
    }
    return base;
  }

  function localIsoDate(d) {
    var dt = d || new Date();
    var y = dt.getFullYear();
    var m = String(dt.getMonth() + 1).padStart(2, "0");
    var day = String(dt.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + day;
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

  function sanitizeTelHref(raw) {
    var d = String(raw || "").replace(/[^0-9+]/g, "");
    return d.length >= 6 ? d : "";
  }

  function sanitizeWaDigits(raw) {
    var d = String(raw || "").replace(/[^0-9]/g, "");
    if (d.indexOf("00") === 0) d = d.slice(2);
    if (d.length === 10 && d.charAt(0) === "0") d = "33" + d.slice(1);
    return d.length >= 8 ? d : "";
  }

  function esc(s) {
    return String(s === null || s === undefined ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function fmtMoney(n) {
    return Number(n || 0).toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
  }

  function fmtNum(n, d) {
    return Number(n || 0).toLocaleString("fr-FR", { minimumFractionDigits: d, maximumFractionDigits: d });
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
            if (stored.channels.stripeLinks) {
              cfg.channels.stripeLinks = Object.assign({}, cfg.channels.stripeLinks, stored.channels.stripeLinks);
            }
          }
        }
      }
    } catch (e) {}
    cfg.issuer.tvaRegime = cfg.issuer.tvaRegime === "20" ? "20" : "293B";
    cfg.channels.calUrl = sanitizeExternalUrl(cfg.channels.calUrl);
    cfg.channels.crmWebhookUrl = sanitizeExternalUrl(cfg.channels.crmWebhookUrl);
    cfg.channels.stripeVerifyUrl = sanitizeExternalUrl(cfg.channels.stripeVerifyUrl);
    cfg.channels.stripeLinks[1] = sanitizeExternalUrl(cfg.channels.stripeLinks[1]);
    cfg.channels.stripeLinks[2] = sanitizeExternalUrl(cfg.channels.stripeLinks[2]);
    cfg.channels.stripeLinks[3] = sanitizeExternalUrl(cfg.channels.stripeLinks[3]);
    var slots = Number(cfg.channels.commandoSlotsOpen);
    cfg.channels.commandoSlotsOpen = Number.isFinite(slots) ? Math.max(0, Math.min(2, Math.round(slots))) : 2;
    return cfg;
  }

  function saveCfg(cfg) {
    if (NO_LS) return false;
    try {
      localStorage.setItem(LS_CFG, JSON.stringify(cfg));
      return true;
    } catch (e) {
      return false;
    }
  }

  function captureUtm() {
    var out = { utm_source: "direct", utm_medium: "organique", utm_campaign: "aucune", utm_content: "", utm_term: "" };
    try {
      var q = new URLSearchParams(window.location.search || "");
      ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach(function (k) {
        var v = (q.get(k) || "").trim().slice(0, 120);
        if (v) out[k] = v;
      });
    } catch (e) {}
    return out;
  }

  function parseProspectParams() {
    var p = { societe: "", ville: "", siren: "", ref: "", deadline: "", pack: 0, profil: "", hours: NaN, price: NaN, moment: "" };
    try {
      var q = new URLSearchParams(window.location.search || "");
      p.societe = (q.get("societe") || "").trim().slice(0, 100);
      p.ville = (q.get("ville") || "").trim().slice(0, 60);
      p.siren = (q.get("siren") || "").replace(/[^0-9A-Za-z -]/g, "").trim().slice(0, 20);
      p.ref = (q.get("ref") || "").trim().slice(0, 70);
      p.deadline = (q.get("deadline") || "").trim().slice(0, 60);
      var pk = Number(q.get("pack"));
      if (pk === 1 || pk === 2 || pk === 3) p.pack = pk;
      var pr = (q.get("profil") || "").toUpperCase().trim();
      if (/^P0[1-7]$/.test(pr)) p.profil = pr;
      var hr = Number(q.get("hours"));
      if (Number.isFinite(hr) && hr >= 1 && hr <= 50000) p.hours = Math.round(hr);
      var px = Number(q.get("price"));
      if (Number.isFinite(px) && px >= 0 && px <= 500) p.price = px;
      var mo = (q.get("moment") || "").toLowerCase().trim();
      if (mo === "jour" || mo === "nuit" || mo === "dim" || mo === "ferie") p.moment = mo;
    } catch (e) {}
    return p;
  }

  var UTM = captureUtm();
  var PROSPECT_CTX = parseProspectParams();
  var SIM_MODE = "express"; // "express" (Piège 23 €/h par défaut pour effet choc immédiat) | "recette"
  var LAST_DIAG = null;
  var CURRENT_PACK = 2;

  function toast(msg) {
    var el = document.createElement("div");
    el.className = "toast";
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 3000);
  }

  function $(id) { return document.getElementById(id); }

  function renderAdminStatus(cfg) {
    var pill = $("slotStatusPill");
    if (pill) {
      var s = cfg.channels.commandoSlotsOpen;
      if (s === 0) {
        pill.textContent = "Commando : COMPLET (0/2)";
        pill.classList.add("full");
      } else {
        pill.textContent = "Commando : " + s + "/2 slot" + (s > 1 ? "s" : "");
        pill.classList.remove("full");
      }
    }

    var missing = [];
    if (!String(cfg.issuer.siren || "").trim()) missing.push("SIREN/SIRET");
    if (!sanitizeEmail(cfg.channels.email) && !sanitizeTelHref(cfg.channels.tel)) missing.push("Email / Téléphone");
    if (!cfg.channels.calUrl && !cfg.channels.crmWebhookUrl) missing.push("Agenda Cal.com ou Webhook CRM");

    var isAdminMode = false;
    try { isAdminMode = new URLSearchParams(window.location.search || "").get("admin") === "1"; } catch (e) {}

    var admBtn = $("btnToggleAdmin");
    if (admBtn) admBtn.classList.toggle("hidden", !isAdminMode);

    var ban = $("adminBanner");
    var txt = $("adminBannerText");
    if (ban && txt) {
      var hiddenByOp = sessionStorage.getItem("omnisecur_hide_adm_ban") === "1";
      if (isAdminMode && missing.length > 0 && !hiddenByOp) {
        ban.classList.remove("hidden");
        txt.innerHTML = "<strong>Configuration opérateur à finaliser avant campagne publique :</strong> renseignez <b>" + esc(missing.join(" · ")) + "</b> dans <b>⚙️ Config Opérateur</b> (aucun faux identifiant injecté).";
      } else {
        ban.classList.add("hidden");
      }
    }

    var drawerHint = $("adminDrawerMissing");
    if (drawerHint) {
      if (missing.length > 0) {
        drawerHint.classList.remove("hidden");
        drawerHint.textContent = "À renseigner avant campagne publique : " + missing.join(" · ");
      } else {
        drawerHint.classList.add("hidden");
      }
    }
  }

  function populateAdminInputs(cfg) {
    $("admRaison").value = cfg.issuer.raison;
    $("admEnseigne").value = cfg.issuer.enseigne;
    $("admRep").value = cfg.issuer.rep;
    $("admCapital").value = cfg.issuer.capital;
    $("admSiege").value = cfg.issuer.siege;
    $("admSiren").value = cfg.issuer.siren;
    $("admTvaRegime").value = cfg.issuer.tvaRegime;
    $("admTvaNum").value = cfg.issuer.tvaNum;
    $("admEmail").value = cfg.channels.email;
    $("admTel").value = cfg.channels.tel;
    $("admWhatsapp").value = cfg.channels.whatsapp;
    $("admCalUrl").value = cfg.channels.calUrl;
    $("admWebhookUrl").value = cfg.channels.crmWebhookUrl;
    if ($("admStripeVerifyUrl")) $("admStripeVerifyUrl").value = cfg.channels.stripeVerifyUrl || "";
    if ($("admHostProvider")) $("admHostProvider").value = cfg.channels.hostProvider || "";
    $("admIban").value = cfg.channels.iban;
    $("admStripe1").value = cfg.channels.stripeLinks[1];
    $("admStripe2").value = cfg.channels.stripeLinks[2];
    $("admStripe3").value = cfg.channels.stripeLinks[3];
    $("admSlotsOpen").value = String(cfg.channels.commandoSlotsOpen);
    $("admPixelId").value = cfg.channels.metaPixelId || "";
  }

  function readAdminInputs() {
    var calRaw = $("admCalUrl").value.trim();
    var whRaw = $("admWebhookUrl").value.trim();
    var svRaw = $("admStripeVerifyUrl") ? $("admStripeVerifyUrl").value.trim() : "";
    var s1Raw = $("admStripe1").value.trim();
    var s2Raw = $("admStripe2").value.trim();
    var s3Raw = $("admStripe3").value.trim();
    var emRaw = $("admEmail").value.trim();

    if (emRaw && !sanitizeEmail(emRaw)) throw new Error("Adresse email invalide.");
    if (calRaw && !sanitizeExternalUrl(calRaw)) throw new Error("URL agenda invalide (https:// requis).");
    if (whRaw && !sanitizeExternalUrl(whRaw)) throw new Error("URL webhook invalide (https:// ou chemin relatif o2switch requis).");
    if (svRaw && !sanitizeExternalUrl(svRaw)) throw new Error("URL vérification Stripe invalide (https:// ou chemin relatif requis).");
    if ((s1Raw && !sanitizeExternalUrl(s1Raw)) || (s2Raw && !sanitizeExternalUrl(s2Raw)) || (s3Raw && !sanitizeExternalUrl(s3Raw))) {
      throw new Error("Lien Stripe invalide (https://buy.stripe.com/... requis).");
    }
    var pix = $("admPixelId").value.trim().replace(/[^0-9]/g, "");

    return {
      issuer: {
        raison: $("admRaison").value.trim() || "Mounir NAIT MOHAND (Entrepreneur Individuel)",
        enseigne: $("admEnseigne").value.trim() || "OMNISECUR",
        rep: $("admRep").value.trim() || "M. Mounir NAIT MOHAND, Président",
        capital: $("admCapital").value.trim() || "Entreprise Individuelle — Micro-entreprise (SIREN 849 261 870)",
        siege: $("admSiege").value.trim() || "Albi (81)",
        siren: $("admSiren").value.trim(),
        tvaRegime: $("admTvaRegime").value === "20" ? "20" : "293B",
        tvaNum: $("admTvaNum").value.trim()
      },
      channels: {
        domainUrl: loadCfg().channels.domainUrl || "",
        hostProvider: $("admHostProvider") ? $("admHostProvider").value.trim() : "",
        email: emRaw,
        tel: $("admTel").value.trim(),
        whatsapp: $("admWhatsapp").value.trim(),
        calUrl: sanitizeExternalUrl(calRaw),
        crmWebhookUrl: sanitizeExternalUrl(whRaw),
        stripeVerifyUrl: sanitizeExternalUrl(svRaw),
        iban: $("admIban").value.trim(),
        stripeLinks: {
          1: sanitizeExternalUrl(s1Raw),
          2: sanitizeExternalUrl(s2Raw),
          3: sanitizeExternalUrl(s3Raw)
        },
        commandoSlotsOpen: Number($("admSlotsOpen").value),
        metaPixelId: pix
      }
    };
  }

  /* ================= SIMULATEUR INTERACTIF ================= */
  var CUSTOM_PARAMS = null;

  function setActivePresetBtn(id) {
    ["prePiege23", "preRecette35", "preCynoP07", "preAvenant6h"].forEach(function (bid) {
      var b = $(bid);
      if (b) b.classList.toggle("active", bid === id);
    });
  }

  function applyPreset(key) {
    CUSTOM_PARAMS = null;
    if (key === "piege23") {
      SIM_MODE = "express";
      $("simProfile").value = "P01";
      $("simMoment").value = "nuit";
      $("simHours").value = "320";
      $("simVacHours").value = "8";
      $("simSellPrice").value = "23";
      $("simTargetPct").value = "10";
      setActivePresetBtn("prePiege23");
    } else if (key === "recette35") {
      SIM_MODE = "recette";
      CUSTOM_PARAMS = { suppH: 2, indVac: 5, transVac: 10, ponctuel: 100, fixedCosts: 1000, structH: 2, provPct: 5 };
      $("simProfile").value = "P01";
      $("simMoment").value = "jour";
      $("simHours").value = "320";
      $("simVacHours").value = "8";
      $("simSellPrice").value = "35";
      $("simTargetPct").value = "10";
      setActivePresetBtn("preRecette35");
    } else if (key === "cyno07") {
      SIM_MODE = "recette";
      CUSTOM_PARAMS = { suppH: 2, indVac: 5, transVac: 10, ponctuel: 100, fixedCosts: 1000, structH: 2, provPct: 5 };
      $("simProfile").value = "P07";
      $("simMoment").value = "jour";
      $("simHours").value = "320";
      $("simVacHours").value = "8";
      $("simSellPrice").value = "42";
      $("simTargetPct").value = "10";
      setActivePresetBtn("preCynoP07");
    } else if (key === "avenant6h") {
      SIM_MODE = "recette";
      CUSTOM_PARAMS = { suppH: 2, indVac: 5, transVac: 10, ponctuel: 100, fixedCosts: 1000, structH: 2, provPct: 5 };
      $("simProfile").value = "P01";
      $("simMoment").value = "jour";
      $("simHours").value = "300";
      $("simVacHours").value = "6";
      $("simSellPrice").value = "35";
      $("simTargetPct").value = "10";
      setActivePresetBtn("preAvenant6h");
    }
    if ($("simModeSelect")) $("simModeSelect").value = SIM_MODE;
    refreshSimulator();
  }

  function refreshSimulator() {
    var eng = window.OMNISECUR_ENGINE;
    if (!eng) return;

    var prof = $("simProfile").value;
    var moment = $("simMoment").value;
    var hours = $("simHours").value;
    var vacHours = $("simVacHours").value;
    var sellPrice = $("simSellPrice").value;
    var targetPct = $("simTargetPct").value;
    if ($("simModeSelect") && $("simModeSelect").value !== SIM_MODE) {
      $("simModeSelect").value = SIM_MODE;
    }

    var res;
    if (SIM_MODE === "express") {
      res = eng.evaluateExpressTrap({
        profileCode: prof,
        moment: moment,
        demoHours: hours,
        vacHours: vacHours,
        demoPrice: sellPrice,
        targetPct: targetPct
      });
    } else {
      var opts = Object.assign({
        profileCode: prof,
        moment: moment,
        hours: hours,
        vacHours: vacHours,
        sellPrice: sellPrice,
        targetPct: targetPct
      }, CUSTOM_PARAMS || {});
      res = eng.evaluateScenario(opts);
    }

    var errBox = $("simErrorBox");
    var vacBox = $("simVacAlert");

    var vhNum = eng.toNum(vacHours);
    if (res.valid && res.vacWarning) {
      vacBox.classList.remove("hidden");
      vacBox.textContent = res.vacWarning;
    } else if (!res.valid && Number.isFinite(vhNum) && vhNum > 0 && vhNum < 6) {
      vacBox.classList.remove("hidden");
      vacBox.textContent = "Alerte Avenant n° 2 IDCC 1351 : une vacation de " + fmtNum(vhNum, 1) + " h est inférieure au plancher conventionnel de 6,0 h (effet 01/07/2026).";
    } else {
      vacBox.classList.add("hidden");
    }

    if (!res.valid) {
      errBox.classList.remove("hidden");
      errBox.textContent = res.errors.join(" · ");
      LAST_DIAG = null;
      return;
    }
    errBox.classList.add("hidden");
    LAST_DIAG = res;

    var vCard = $("simVerdictCard");
    vCard.className = "verdict-box " + res.verdictCode;
    $("simVerdictTag").textContent = res.verdict + " · " + res.profile.code + " (" + res.moment.toUpperCase() + ")";
    $("simVerdictBig").textContent = (res.netResult >= 0 ? "+" : "") + fmtMoney(res.netResult) + " (" + fmtNum(res.netMarginPct, 2) + " %)";
    $("simVerdictSub").textContent = "Pour " + fmtNum(res.hours, 0) + " h à " + fmtMoney(res.sellPrice) + "/h (CA " + fmtMoney(res.caTotal) + " — Coût complet " + fmtMoney(res.fullCost) + ")" + (res.avenantFloorApplied ? (" · Avenant n° 2 : " + fmtNum(res.paidHours, 1) + " h rémunérées") : "");

    var beLabel = "Déficitaire dès 1 h";
    if (res.breakEvenHours === 0) beLabel = "Dès la 1re heure";
    else if (typeof res.breakEvenHours === "number" && Number.isFinite(res.breakEvenHours)) beLabel = fmtNum(res.breakEvenHours, 2) + " h";

    $("simKpiDirectH").textContent = fmtMoney(res.directCostPerHour) + "/h";
    $("simKpiFullH").textContent = fmtMoney(res.fullCostPerHour) + "/h";
    $("simKpiTargetH").textContent = fmtMoney(res.targetPriceH) + "/h";
    $("simKpiBreakEven").textContent = beLabel;

    var maxRef = Math.max(res.fullCostPerHour, res.sellPrice, res.targetPriceH, 1);
    $("barCostPct").style.width = Math.min(100, (res.fullCostPerHour / maxRef) * 100).toFixed(1) + "%";
    $("barCostLbl").textContent = fmtMoney(res.fullCostPerHour) + "/h";

    var pFill = $("barPricePct");
    pFill.style.width = Math.min(100, (res.sellPrice / maxRef) * 100).toFixed(1) + "%";
    pFill.className = "bar-fill " + (res.netResult >= 0 ? "price-ok" : "price-bad");
    $("barPriceLbl").textContent = fmtMoney(res.sellPrice) + "/h";
  }

  /* ================= X-RAY PRODUCT TABS ================= */
  function renderXray(tabKey) {
    var d = XRAY_CONTENT[tabKey] || XRAY_CONTENT.bouclier;
    document.querySelectorAll("[data-xray]").forEach(function (b) {
      b.classList.toggle("active", b.dataset.xray === tabKey);
    });
    $("xrayTitle").textContent = d.title;
    $("xrayDesc").textContent = d.desc;
    $("xrayBullets").innerHTML = d.bullets.map(function (item) {
      return "<li>" + esc(item) + "</li>";
    }).join("");
    $("xraySpecs").innerHTML = "<h4>Garanties vérifiées</h4>" + d.specs.map(function (pair) {
      return '<div class="proof-line"><span>' + esc(pair[0]) + '</span><b>' + esc(pair[1]) + '</b></div>';
    }).join("");
  }

  /* ================= FUNNEL & BON DE COMMANDE ================= */
  function setStepHighlight(stepNum) {
    [1, 2, 3].forEach(function (n) {
      var el = $("stepPill" + n);
      if (el) el.classList.toggle("active", n === stepNum);
    });
  }

  function defaultBcRef() {
    var suffix = Math.random().toString(36).slice(2, 6).toUpperCase().padEnd(4, "0");
    return "BC-OMNI-" + localIsoDate().replace(/-/g, "") + "-" + suffix;
  }

  function getCgvParagraphs(cfg) {
    var iss = cfg.issuer;
    return [
      "Art. 1 — Objet & Périmètre (hors CSI Livre VI) : " + iss.raison + " (" + iss.enseigne + ") fournit des outils de gestion, chiffrages financiers et prestations d'ingénierie documentaire AO B2B. Ces prestations n'emportent ni exercice d'activité réglementée CNAPS (art. L.611-1 CSI) ni conseil juridique, comptable ou social réglementé.",
      "Art. 2 — Prix, TVA & Règlement : Prix en euros HT. Régime fiscal émetteur actif : " + (iss.tvaRegime === "20" ? "TVA normale 20 %" : "TVA non applicable, art. L. 223-3 du CIBS (ancien art. 293 B du CGI) (sous réserve des seuils légaux)") + ". Virement sur Bon de Commande : acompte à la commande et solde à livraison ; paiement CB Stripe (forfaits catalogue) : règlement comptant à la commande. Conformément aux art. L.441-10 et D.441-5 C. com., tout retard entraîne de plein droit des pénalités (3 × taux d'intérêt légal) et une indemnité forfaitaire de 40 €.",
      "Art. 3 — Délais & Obligation de moyens : Les délais (dont 48h ouvrées pour Pack 3 limité à 1 lot <= 15 p.) courent à réception intégrale des pièces requises (DCE, paie, agréments). Le prestataire est tenu à une obligation de moyens sans garantie d'attribution de marché.",
      "Art. 4 — Propriété intellectuelle : Licence d'usage interne, personnelle, non exclusive et non transférable accordée au Client après paiement complet. Toute revente, partage externe ou mise en ligne publique des gabarits est interdite.",
      "Art. 5 — Limitation de responsabilité : Sauf faute lourde ou dol, la responsabilité cumulée du prestataire est strictement plafonnée au montant total HT payé au titre du présent bon de commande, à l'exclusion de tout préjudice indirect, perte d'exploitation ou perte de chance commerciale.",
      "Art. 6 — Protection des données (RGPD) : 6.1 Prospects (Art. 13 RGPD & L.34-5 CPCE) : qualification B2B sans revente, droit d'accès/opposition et anonymisation J+30 si sans suite. 6.2 Sous-traitance DCE/Paie (Art. 28 RGPD) : traitement exclusif pour l'exécution de la commande, sans entraînement de modèle IA tiers, et suppression sous 30 jours après clôture.",
      "Art. 7 — Droit applicable & Juridiction : Droit français ; compétence du Tribunal de commerce du ressort du siège social du prestataire (" + (iss.siege || "Albi") + ") à défaut de résolution amiable."
    ];
  }

  function buildBonCommandeData(cfg) {
    var ht = Math.max(0, Number($("bcMontant").value) || 0);
    var tvaPct = cfg.issuer.tvaRegime === "20" ? 20 : 0;
    var tvaAmt = tvaPct > 0 ? Number((ht * 0.20).toFixed(2)) : 0;
    var ttc = Number((ht + tvaAmt).toFixed(2));
    var acPct = Math.min(100, Math.max(0, Number($("bcAcomptePct").value)));
    if (!Number.isFinite(acPct)) acPct = 50;
    var acTtc = Number((ttc * acPct / 100).toFixed(2));
    var soldeTtc = Number((ttc - acTtc).toFixed(2));
    return {
      ref: ($("bcRef").value || defaultBcRef()).trim(),
      date: ($("bcDate").value || localIsoDate()).trim(),
      clientNom: ($("bcClientNom").value || "[Raison sociale du client à compléter]").trim(),
      clientInfo: ($("bcClientInfo").value || "[SIREN, Adresse, Ville & Représentant]").trim(),
      desc: ($("bcDesc").value || OFFERS[CURRENT_PACK].label).trim(),
      delai: ($("bcDelai").value || "Pack 1-2 : immédiate ; Pack 3 : 48h ouvrées dès dossier complet").trim(),
      ht: ht,
      tvaPct: tvaPct,
      tvaAmt: tvaAmt,
      tvaMention: tvaPct === 0 ? "TVA non applicable, art. L. 223-3 du CIBS (ancien art. 293 B du CGI)" : ("TVA 20 % (" + (cfg.issuer.tvaNum || "n° TVA à renseigner") + ") : " + fmtMoney(tvaAmt)),
      ttc: ttc,
      acPct: acPct,
      acTtc: acTtc,
      soldeTtc: soldeTtc
    };
  }

  function renderBonCommande() {
    var cfg = loadCfg();
    var bc = buildBonCommandeData(cfg);
    $("bcTvaHint").textContent = cfg.issuer.tvaRegime === "20" ? "Assujetti TVA 20 % (régime unique)" : "Franchise en base — art. L. 223-3 du CIBS (ex-293 B CGI) (régime unique)";
    var sirenHtml = cfg.issuer.siren.trim() ? esc(cfg.issuer.siren.trim()) : '<span style="color:#b45309">[SIREN/SIRET À RENSEIGNER AVANT ENVOI CLIENT]</span>';
    var cgvHtml = getCgvParagraphs(cfg).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
    var contactParts = [cfg.channels.email, cfg.channels.tel].filter(Boolean);

    $("bcPreviewSheet").innerHTML =
      '<div class="bc-head">' +
        '<div>' +
          '<h4>BON DE COMMANDE B2B — N° ' + esc(bc.ref) + '</h4>' +
          '<div><b>' + esc(cfg.issuer.raison) + '</b> (' + esc(cfg.issuer.enseigne) + ') — ' + esc(cfg.issuer.capital) + '</div>' +
          '<div>Siège : ' + esc(cfg.issuer.siege) + ' · SIREN/SIRET : ' + sirenHtml + '</div>' +
          '<div>Représentée par : <b>' + esc(cfg.issuer.rep) + '</b></div>' +
          (contactParts.length ? '<div>Contact : ' + esc(contactParts.join(" · ")) + '</div>' : '') +
        '</div>' +
        '<div style="text-align:right">' +
          '<div><b>Date d\'émission :</b> ' + esc(bc.date) + '</div>' +
          '<div><b>Client :</b> ' + esc(bc.clientNom) + '</div>' +
          '<div>' + esc(bc.clientInfo) + '</div>' +
        '</div>' +
      '</div>' +
      '<table class="bc-table">' +
        '<thead><tr><th>Désignation des livrables / prestations B2B</th><th>Livraison</th><th style="text-align:right">Montant HT</th></tr></thead>' +
        '<tbody><tr><td>' + esc(bc.desc) + '</td><td>' + esc(bc.delai) + '</td><td style="text-align:right">' + fmtMoney(bc.ht) + '</td></tr></tbody>' +
      '</table>' +
      '<div class="bc-totals">' +
        '<div>' +
          '<div><b>Échéancier :</b> Acompte ' + esc(bc.acPct) + ' % à la commande (<b>' + fmtMoney(bc.acTtc) + '</b>) · Solde ' + esc(100 - bc.acPct) + ' % à livraison (<b>' + fmtMoney(bc.soldeTtc) + '</b>)</div>' +
          (cfg.channels.iban ? '<div><b>Virement IBAN :</b> ' + esc(cfg.channels.iban) + '</div>' : '') +
        '</div>' +
        '<div style="text-align:right">' +
          '<div>Total HT : <b>' + fmtMoney(bc.ht) + '</b></div>' +
          '<div>' + esc(bc.tvaMention) + '</div>' +
          '<div style="font-size:17px;margin-top:4px;color:#0b2239"><b>Total TTC : ' + fmtMoney(bc.ttc) + '</b></div>' +
        '</div>' +
      '</div>' +
      '<div class="bc-cgv-box"><b>CONDITIONS GÉNÉRALES DE VENTE SIMPLIFIÉES (CGV B2B) :</b>' + cgvHtml + '</div>' +
      '<div style="display:flex;justify-content:space-between;gap:20px;margin-top:20px;font-size:12px">' +
        '<div style="flex:1;border-top:1px solid #cbd5e1;padding-top:6px"><b>Pour ' + esc(cfg.issuer.raison) + '</b><br>' + esc(cfg.issuer.rep) + '</div>' +
        '<div style="flex:1;border-top:1px solid #cbd5e1;padding-top:6px"><b>Bon pour accord &amp; acceptation des CGV — Le Client</b><br>Date, cachet et signature précédés de la mention « Bon pour accord »</div>' +
      '</div>';

    var stripeBtn = $("btnPayStripe");
    if (stripeBtn) {
      var hasStripe = Boolean(cfg.channels.stripeLinks[CURRENT_PACK]);
      stripeBtn.textContent = hasStripe
        ? ("💳 Régler " + OFFERS[CURRENT_PACK].shortName.split("—")[0].trim() + " (" + OFFERS[CURRENT_PACK].price + " € HT) via Stripe")
        : "🏦 Virement / Paiement sur Bon de Commande";
    }
  }

  function pickOfferPack(k, scrollToStep2) {
    k = Number(k);
    if (!OFFERS[k]) return;
    CURRENT_PACK = k;
    $("leadOffre").value = String(k);
    $("bcDesc").value = OFFERS[k].label;
    $("bcMontant").value = String(OFFERS[k].price);
    renderBonCommande();
    setStepHighlight(2);
    if (scrollToStep2) {
      $("tunnel-section").scrollIntoView({ behavior: "smooth" });
      toast("Pack " + k + " sélectionné (" + OFFERS[k].price + " € HT). Complétez l'étape 2 ou éditez le Bon de Commande.");
    }
  }

  function collectLeadPayload() {
    var cfg = loadCfg();
    var packKey = Number($("leadOffre").value) || 2;
    var off = OFFERS[packKey] || OFFERS[2];
    var boampRefEl = $("leadBoampRef");
    var boampRefVal = boampRefEl ? boampRefEl.value.trim() : "";
    var payload = {
      schemaVersion: "omnisecur-lead-v1.3",
      createdAt: new Date().toISOString(),
      utm_source: UTM.utm_source,
      utm_medium: UTM.utm_medium,
      utm_campaign: UTM.utm_campaign,
      utm_content: UTM.utm_content,
      utm_term: UTM.utm_term,
      societe: $("leadSociete").value.trim(),
      siren: $("leadSiren").value.trim(),
      contact: $("leadContact").value.trim(),
      email: $("leadEmail").value.trim(),
      tel: $("leadTel").value.trim(),
      ville: $("leadVille").value.trim(),
      offreKey: packKey,
      offreLabel: off.shortName,
      montantHT: off.price,
      modalite: $("leadMode").value,
      boampRef: boampRefVal,
      deadline: $("leadDeadline").value.trim(),
      rdvDate: $("leadRdvDate").value,
      rdvSlot: $("leadRdvSlot").value,
      notes: $("leadNotes").value.trim(),
      website_hp: $("leadWebsiteHp") ? $("leadWebsiteHp").value.trim() : "",
      rgpdConsent: $("leadRgpdConsent").checked,
      diagnosticBouclier: LAST_DIAG ? {
        profil: LAST_DIAG.profile.code,
        heures: LAST_DIAG.hours,
        vacationsH: LAST_DIAG.vacHours,
        heuresPayees: Number(LAST_DIAG.paidHours.toFixed(2)),
        avenantFloorApplied: Boolean(LAST_DIAG.avenantFloorApplied),
        tarifFactureH: LAST_DIAG.sellPrice,
        coutCompletH: Number(LAST_DIAG.fullCostPerHour.toFixed(2)),
        resultatNetEUR: Number(LAST_DIAG.netResult.toFixed(2)),
        prixCibleH: Number(LAST_DIAG.targetPriceH.toFixed(2)),
        verdict: LAST_DIAG.verdict
      } : null,
      issuerEnseigne: cfg.issuer.enseigne
    };
    try {
      sessionStorage.setItem("omnisecur_prospect_ctx", JSON.stringify({
        societe: payload.societe,
        ref: payload.boampRef,
        deadline: payload.deadline,
        email: payload.email
      }));
    } catch (e) {}
    return payload;
  }

  function formatLeadFiche(p) {
    var lines = [
      "=== FICHE QUALIFICATION B2B " + p.issuerEnseigne + " ===",
      "Date      : " + p.createdAt,
      "Origine   : " + p.utm_source + " / " + p.utm_medium + (p.utm_campaign ? " (" + p.utm_campaign + ")" : ""),
      "Société   : " + (p.societe || "[Non renseignée]") + (p.siren ? " (SIREN " + p.siren + ")" : ""),
      "Contact   : " + (p.contact || "[Non renseigné]"),
      "Email/Tél : " + [p.email, p.tel].filter(Boolean).join(" / "),
      "Secteur   : " + (p.ville || "[Non renseigné]"),
      "Offre     : " + p.offreLabel,
      "Modalité  : " + p.modalite,
      "Créneau   : " + (p.rdvDate ? (p.rdvDate + " à " + p.rdvSlot) : "À confirmer"),
      "Réf AO    : " + (p.boampRef || "[Non précisée]"),
      "Échéance  : " + (p.deadline || "[Non précisée]"),
      "Notes     : " + (p.notes || "[Néant]")
    ];
    if (p.diagnosticBouclier) {
      var d = p.diagnosticBouclier;
      lines.push("Diag Web  : " + d.profil + " · " + d.heures + "h @ " + d.tarifFactureH + " €/h -> Net " + d.resultatNetEUR + " € (" + d.verdict + ", cible " + d.prixCibleH + " €/h)" + (d.avenantFloorApplied ? (" [Plancher 6h : " + d.heuresPayees + "h payées]") : ""));
    }
    lines.push("RGPD Art13: Consentement explicite = " + (p.rgpdConsent ? "OUI (étude B2B, purge 30j)" : "NON COCHÉ"));
    return lines.join("\n");
  }

  function formatDiagTxt(d, soc, refAo) {
    return [
      "===============================================================",
      "OMNISECUR x BOUCLIER ANTI-PERTES v3.2 — NOTE DIAGNOSTIC CHIFFRAGE",
      "Simulation indicative B2B (hors activités CNAPS art. L.611-1 CSI)",
      "===============================================================",
      "Date           : " + localIsoDate(),
      soc ? ("Société cible  : " + soc) : "",
      refAo ? ("Référence AO   : " + refAo) : "",
      "Profil IDCC1351: " + d.profile.code + " — " + d.profile.nom,
      "Plage horaire  : " + d.moment.toUpperCase(),
      "Volume mensuel : " + fmtNum(d.hours, 0) + " h" + (d.avenantFloorApplied ? (" (" + fmtNum(d.paidHours, 1) + " h rémunérées — Avenant n° 2)") : ""),
      "Prix facturé   : " + fmtMoney(d.sellPrice) + " HT/h",
      "---------------------------------------------------------------",
      "Coût direct/h  : " + fmtMoney(d.directCostPerHour) + "/h",
      "Coût complet/h : " + fmtMoney(d.fullCostPerHour) + "/h (Complet total : " + fmtMoney(d.fullCost) + ")",
      "Chiffre d'aff. : " + fmtMoney(d.caTotal),
      "Résultat net   : " + (d.netResult >= 0 ? "+" : "") + fmtMoney(d.netResult) + " (" + fmtNum(d.netMarginPct, 2) + " %)",
      "Verdict moteur : " + d.verdict,
      "Prix cible " + fmtNum(d.targetPct, 1) + "%: " + fmtMoney(d.targetPriceH) + " HT/h",
      "---------------------------------------------------------------",
      "Point vigilance Avenant n° 2 (IDCC 1351, effet 01/07/2026) :",
      "Vacation min. 6,0h (rémunération min. 6,0 h par vacation). Sur 300h, passer de 25x12h à 50x6h ajoute +393,75 EUR.",
      "À confirmer sur vos taux horaires chargés réels (verrou Direction)."
    ].filter(Boolean).join("\n");
  }

  function copyWithFallback(txt, okMsg) {
    if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(function () { toast(okMsg); }).catch(function () { execCopyFallback(txt, okMsg); });
    } else {
      execCopyFallback(txt, okMsg);
    }
  }

  function execCopyFallback(txt, okMsg) {
    try {
      var ta = document.createElement("textarea");
      ta.value = txt;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      var ok = document.execCommand("copy");
      ta.remove();
      if (ok) { toast(okMsg); return; }
    } catch (e) {}
    prompt("Copiez cette fiche :", txt);
  }

  function escapeIcsText(s) {
    return String(s || "").replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
  }

  function buildIcsContent(payload, cfg) {
    var dt = payload.rdvDate || localIsoDate(new Date(Date.now() + 86400000));
    var hhmm = (payload.rdvSlot || "10:00").split(":");
    var hStart = Number(hhmm[0]) || 10;
    var mStart = Number(hhmm[1]) || 0;
    var startNum = dt.replace(/-/g, "") + "T" + String(hStart).padStart(2, "0") + String(mStart).padStart(2, "0") + "00";
    var endTotalM = hStart * 60 + mStart + 45;
    var hEnd = Math.floor(endTotalM / 60);
    var mEnd = endTotalM % 60;
    var endNum = dt.replace(/-/g, "") + "T" + String(hEnd).padStart(2, "0") + String(mEnd).padStart(2, "0") + "00";
    var stamp = new Date().toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";

    return [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//OMNISECUR//Arsenal B2B//FR",
      "BEGIN:VTIMEZONE",
      "TZID:Europe/Paris",
      "BEGIN:DAYLIGHT",
      "TZOFFSETFROM:+0100",
      "TZOFFSETTO:+0200",
      "TZNAME:CEST",
      "DTSTART:19700329T020000",
      "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU",
      "END:DAYLIGHT",
      "BEGIN:STANDARD",
      "TZOFFSETFROM:+0200",
      "TZOFFSETTO:+0100",
      "TZNAME:CET",
      "DTSTART:19701025T030000",
      "RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU",
      "END:STANDARD",
      "END:VTIMEZONE",
      "BEGIN:VEVENT",
      "UID:omnisecur-" + Date.now() + "@omnisecur.local",
      "DTSTAMP:" + stamp,
      "DTSTART;TZID=Europe/Paris:" + startNum,
      "DTEND;TZID=Europe/Paris:" + endNum,
      "SUMMARY:" + escapeIcsText("Cadrage & Démo Bouclier OMNISECUR — " + (payload.societe || "Dirigeant Sécurité Privée")),
      "LOCATION:" + escapeIcsText(payload.modalite || "Visio / Sur site Occitanie"),
      "DESCRIPTION:" + escapeIcsText(formatLeadFiche(payload) + (cfg.channels.email ? "\nContact organisateur : " + cfg.channels.email : "")),
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");
  }

  function downloadFile(filename, content, mime) {
    var blob = new Blob([content], { type: mime });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
  }

  function maybeLoadMetaPixel(cfg, hasConsent) {
    if (!hasConsent || !cfg.channels.metaPixelId) return;
    if (window.fbq) return;
    /* Chargement différé du Pixel Meta strictement conditionné au consentement explicite */
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", cfg.channels.metaPixelId);
    window.fbq("track", "PageView");
  }

  function initConsent() {
    var cfg = loadCfg();
    var bar = $("cookieConsentBar");
    var c = null;
    try { c = localStorage.getItem(LS_CONSENT); } catch (e) {}
    if (!cfg.channels.metaPixelId) {
      if (bar) bar.classList.add("hidden");
      return;
    }
    if (c === "accepted") {
      if (bar) bar.classList.add("hidden");
      maybeLoadMetaPixel(cfg, true);
    } else if (c === "declined") {
      if (bar) bar.classList.add("hidden");
    } else if (bar) {
      bar.classList.remove("hidden");
    }
    if ($("btnCookieAccept")) {
      $("btnCookieAccept").addEventListener("click", function () {
        try { localStorage.setItem(LS_CONSENT, "accepted"); } catch (e) {}
        bar.classList.add("hidden");
        maybeLoadMetaPixel(loadCfg(), true);
        toast("Préférence enregistrée.");
      });
    }
    if ($("btnCookieDecline")) {
      $("btnCookieDecline").addEventListener("click", function () {
        try { localStorage.setItem(LS_CONSENT, "declined"); } catch (e) {}
        bar.classList.add("hidden");
      });
    }
  }

  function applyProspectContext() {
    var p = PROSPECT_CTX;
    var hasIdentity = Boolean(p.societe || p.ref || p.deadline || p.siren);
    if (p.societe && $("leadSociete")) $("leadSociete").value = p.societe;
    if (p.siren && $("leadSiren")) $("leadSiren").value = p.siren;
    if (p.ville && $("leadVille")) $("leadVille").value = p.ville;
    if (p.ref && $("leadBoampRef")) $("leadBoampRef").value = p.ref;
    if (p.deadline && $("leadDeadline")) $("leadDeadline").value = p.deadline;

    if (p.societe && $("bcClientNom")) $("bcClientNom").value = p.societe;
    var bcInfo = [p.siren ? ("SIREN " + p.siren) : "", p.ville, p.ref].filter(Boolean).join(" — ");
    if (bcInfo && $("bcClientInfo")) $("bcClientInfo").value = bcInfo;

    var hasSimCustom = Boolean(p.profil || Number.isFinite(p.hours) || Number.isFinite(p.price) || p.moment);
    if (hasSimCustom) {
      SIM_MODE = "express";
      if (p.profil && $("simProfile")) $("simProfile").value = p.profil;
      if (p.moment && $("simMoment")) $("simMoment").value = p.moment;
      if (Number.isFinite(p.hours) && $("simHours")) $("simHours").value = String(p.hours);
      if (Number.isFinite(p.price) && $("simSellPrice")) $("simSellPrice").value = String(p.price);
      setActivePresetBtn("");
      refreshSimulator();
    }

    if (p.pack) {
      pickOfferPack(p.pack, false);
    } else if (hasIdentity) {
      renderBonCommande();
    }

    var ban = $("personalizedBanner");
    if (ban && hasIdentity) {
      ban.classList.remove("hidden");
      $("pbTitle").textContent = "Dossier pré-calibré : " + (p.societe || p.ref || "Marché ciblé");
      var subParts = [
        p.ville ? ("Secteur : " + p.ville) : "",
        p.ref ? ("Référence : " + p.ref) : "",
        p.deadline ? ("Clôture : " + p.deadline) : "",
        "Simulation personnalisée — Pack Dirigeant COS Opérations"
      ].filter(Boolean);
      $("pbSub").textContent = subParts.join(" · ");
    }

    if (hasIdentity) {
      try {
        sessionStorage.setItem("omnisecur_prospect_ctx", JSON.stringify({
          societe: p.societe,
          ref: p.ref,
          deadline: p.deadline,
          email: ""
        }));
      } catch (e) {}
    }
  }

  function initApp() {
    var cfg = loadCfg();
    renderAdminStatus(cfg);
    populateAdminInputs(cfg);

    if ($("utmBadge")) {
      $("utmBadge").textContent = "Source détectée : " + UTM.utm_source + " / " + UTM.utm_medium + (UTM.utm_campaign !== "aucune" ? " (" + UTM.utm_campaign + ")" : "");
    }

    var tomorrow = localIsoDate(new Date(Date.now() + 86400000));
    if ($("leadRdvDate")) $("leadRdvDate").value = tomorrow;
    if ($("bcRef")) $("bcRef").value = defaultBcRef();
    if ($("bcDate")) $("bcDate").value = localIsoDate();

    /* Preset & Simulator bindings */
    $("prePiege23").addEventListener("click", function () { applyPreset("piege23"); });
    $("preRecette35").addEventListener("click", function () { applyPreset("recette35"); });
    $("preCynoP07").addEventListener("click", function () { applyPreset("cyno07"); });
    $("preAvenant6h").addEventListener("click", function () { applyPreset("avenant6h"); });

    if ($("simModeSelect")) {
      $("simModeSelect").addEventListener("change", function () {
        SIM_MODE = $("simModeSelect").value === "recette" ? "recette" : "express";
        CUSTOM_PARAMS = SIM_MODE === "recette"
          ? { suppH: 2, indVac: 5, transVac: 10, ponctuel: 100, fixedCosts: 1000, structH: 2, provPct: 5 }
          : null;
        setActivePresetBtn("");
        refreshSimulator();
      });
    }

    ["simProfile", "simMoment", "simHours", "simVacHours", "simSellPrice", "simTargetPct"].forEach(function (id) {
      var el = $(id);
      el.addEventListener(el.tagName === "SELECT" ? "change" : "input", function () {
        if (id === "simMoment" && CUSTOM_PARAMS && Object.prototype.hasOwnProperty.call(CUSTOM_PARAMS, "suppH")) {
          var nextCustom = Object.assign({}, CUSTOM_PARAMS);
          delete nextCustom.suppH;
          CUSTOM_PARAMS = nextCustom;
        }
        setActivePresetBtn("");
        refreshSimulator();
      });
    });

    $("btnInjectDiagToFunnel").addEventListener("click", function () {
      if (LAST_DIAG) {
        var curNotes = $("leadNotes").value.trim();
        var summary = "[Diagnostic Bouclier] Profil " + LAST_DIAG.profile.code + " · " + fmtNum(LAST_DIAG.hours, 0) + "h @ " + fmtMoney(LAST_DIAG.sellPrice) + "/h -> Résultat net : " + fmtMoney(LAST_DIAG.netResult) + " (Prix cible " + fmtMoney(LAST_DIAG.targetPriceH) + "/h).";
        if (curNotes.indexOf("[Diagnostic Bouclier]") === -1) {
          $("leadNotes").value = curNotes ? (summary + "\n" + curNotes) : summary;
        }
      }
      setStepHighlight(2);
      $("tunnel-section").scrollIntoView({ behavior: "smooth" });
      toast("Diagnostic injecté dans votre fiche de qualification.");
    });

    if ($("btnDownloadDiagTxt")) {
      $("btnDownloadDiagTxt").addEventListener("click", function () {
        if (!LAST_DIAG) { toast("Complétez d'abord un calcul valide."); return; }
        var soc = $("leadSociete") ? $("leadSociete").value.trim() : "";
        var refAo = $("leadBoampRef") ? $("leadBoampRef").value.trim() : "";
        var content = formatDiagTxt(LAST_DIAG, soc, refAo);
        downloadFile("Diagnostic-Bouclier-" + (soc || LAST_DIAG.profile.code).replace(/[^a-zA-Z0-9_-]+/g, "-") + ".txt", content, "text/plain;charset=utf-8;");
        toast("Mémo diagnostic téléchargé (.txt).");
      });
    }

    if ($("btnApplyProspectToFunnel")) {
      $("btnApplyProspectToFunnel").addEventListener("click", function () {
        $("btnInjectDiagToFunnel").click();
      });
    }

    /* X-Ray tabs */
    document.querySelectorAll("[data-xray]").forEach(function (btn) {
      btn.addEventListener("click", function () { renderXray(btn.dataset.xray); });
    });

    /* Offer cards pick */
    document.querySelectorAll("[data-pick-pack]").forEach(function (btn) {
      btn.addEventListener("click", function () { pickOfferPack(btn.dataset.pickPack, true); });
    });

    $("leadOffre").addEventListener("change", function () {
      pickOfferPack($("leadOffre").value, false);
    });

    /* Admin Drawer */
    $("btnToggleAdmin").addEventListener("click", function () {
      var dr = $("adminDrawer");
      var willShow = dr.classList.contains("hidden");
      dr.classList.toggle("hidden");
      if (willShow) window.scrollTo({ top: 0, behavior: "smooth" });
    });
    if ($("btnOpenAdminFromBanner")) {
      $("btnOpenAdminFromBanner").addEventListener("click", function () {
        $("adminDrawer").classList.remove("hidden");
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
    if ($("btnHideAdminBanner")) {
      $("btnHideAdminBanner").addEventListener("click", function () {
        sessionStorage.setItem("omnisecur_hide_adm_ban", "1");
        renderAdminStatus(loadCfg());
      });
    }
    $("btnCloseAdmin").addEventListener("click", function () { $("adminDrawer").classList.add("hidden"); });

    $("btnSaveAdmin").addEventListener("click", function () {
      try {
        var nextCfg = readAdminInputs();
        saveCfg(nextCfg);
        $("adminDrawer").classList.add("hidden");
        renderAdminStatus(nextCfg);
        renderBonCommande();
        toast("Paramètres enregistrés sur ce navigateur.");
      } catch (e) {
        alert(e.message);
      }
    });

    $("btnDownloadSiteCfg").addEventListener("click", function () {
      try {
        var nextCfg = readAdminInputs();
        saveCfg(nextCfg);
        renderAdminStatus(nextCfg);
        renderBonCommande();
        var content = "/* Généré depuis OMNISECUR Config Opérateur */\nwindow.OMNISECUR_CONFIG = " + JSON.stringify(nextCfg, null, 2) + ";\n";
        downloadFile("site-config.js", content, "application/javascript;charset=utf-8;");
        toast("site-config.js généré — déposez-le à la racine o2switch/Vercel.");
      } catch (e) {
        alert(e.message);
      }
    });

    /* Step 2 Channels & Webhook CRM */
    $("btnSubmitWebhook").addEventListener("click", function () {
      var p = collectLeadPayload();
      var fb = $("webhookFeedback");
      fb.classList.remove("hidden", "ok", "warn", "err");

      if (!p.societe || (!p.email && !p.tel)) {
        fb.classList.add("err");
        fb.textContent = "Indiquez au moins votre société et un moyen de contact (email pro ou téléphone).";
        return;
      }
      if (!p.rgpdConsent) {
        fb.classList.add("err");
        fb.textContent = "Cochez l'accord RGPD (art. 13 — traitement B2B exclusif et anonymisation/purge 30 jours) avant transmission.";
        return;
      }

      var cfgNow = loadCfg();
      var preview = formatLeadFiche(p);
      $("leadPreviewBox").textContent = preview;
      $("leadPreviewBox").classList.remove("hidden");
      setStepHighlight(2);

      if (!cfgNow.channels.crmWebhookUrl) {
        fb.classList.add("warn");
        fb.textContent = "Aucun webhook Google Sheets/PHP configuré sur cette page statique : utilisez Email pré-rempli, WhatsApp ou téléchargez votre RDV .ics / BC ci-dessous (zéro donnée perdue).";
        return;
      }

      fb.classList.add("warn");
      fb.textContent = "Transmission vers le CRM Google Sheets en cours…";
      fetch(cfgNow.channels.crmWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(p)
      }).then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.text();
      }).then(function (txt) {
        var parsed;
        try {
          parsed = JSON.parse(txt);
        } catch (parseErr) {
          throw new Error("Réponse serveur CRM non JSON");
        }
        if (!parsed || parsed.ok !== true) {
          throw new Error((parsed && parsed.error) || "Rejet serveur CRM");
        }
        fb.classList.remove("warn");
        fb.classList.add("ok");
        fb.textContent = "Demande transmise au CRM OMNISECUR — Réponse écrite sous 2h ouvrées (24h max week-end/JF).";
        if (window.fbq) window.fbq("track", "Lead");
      }).catch(function () {
        fb.classList.remove("warn");
        fb.classList.add("err");
        fb.textContent = "Envoi serveur indisponible pour ce navigateur : envoyez via Email (mailto:) ou WhatsApp ci-dessous en 1 clic.";
      });
    });

    $("btnSendEmail").addEventListener("click", function () {
      var cfgNow = loadCfg();
      var dest = sanitizeEmail(cfgNow.channels.email);
      if (!dest) {
        alert("Email commercial non encore configuré dans ⚙️ Config Canaux. Copiez la fiche ou utilisez le Bon de Commande ci-dessous.");
        return;
      }
      var p = collectLeadPayload();
      if (!p.rgpdConsent) {
        alert("Merci de cocher l'accord RGPD avant envoi.");
        return;
      }
      var subj = "[" + cfgNow.issuer.enseigne + "] Qualification " + (p.societe || p.offreLabel);
      window.location.href = "mailto:" + encodeURIComponent(dest) + "?subject=" + encodeURIComponent(subj) + "&body=" + encodeURIComponent(formatLeadFiche(p));
    });

    $("btnSendWhatsapp").addEventListener("click", function () {
      var cfgNow = loadCfg();
      var wa = sanitizeWaDigits(cfgNow.channels.whatsapp || cfgNow.channels.tel);
      if (!wa) {
        alert("Numéro WhatsApp Business / Téléphone non encore configuré dans ⚙️ Config Canaux.");
        return;
      }
      var p = collectLeadPayload();
      var url = "https://wa.me/" + wa + "?text=" + encodeURIComponent(formatLeadFiche(p));
      window.open(url, "_blank", "noopener,noreferrer");
    });

    $("btnOpenCal").addEventListener("click", function () {
      var cfgNow = loadCfg();
      if (cfgNow.channels.calUrl) {
        window.open(cfgNow.channels.calUrl, "_blank", "noopener,noreferrer");
      } else {
        toast("Agenda en ligne non configuré : utilisez « Télécharger RDV (.ics) » à côté.");
      }
    });

    $("btnDownloadIcs").addEventListener("click", function () {
      var cfgNow = loadCfg();
      var p = collectLeadPayload();
      var ics = buildIcsContent(p, cfgNow);
      downloadFile("RDV-OMNISECUR-" + (p.societe || "Cadrage").replace(/[^a-zA-Z0-9_-]+/g, "-") + ".ics", ics, "text/calendar;charset=utf-8;");
      toast("Fichier agenda .ics téléchargé.");
    });

    $("btnCopyFiche").addEventListener("click", function () {
      var txt = formatLeadFiche(collectLeadPayload());
      $("leadPreviewBox").textContent = txt;
      $("leadPreviewBox").classList.remove("hidden");
      copyWithFallback(txt, "Fiche qualification copiée dans le presse-papiers !");
    });

    $("btnPushToBc").addEventListener("click", function () {
      var p = collectLeadPayload();
      if (p.societe) $("bcClientNom").value = p.societe;
      var info = [p.siren ? "SIREN " + p.siren : "", p.ville, p.boampRef, p.contact].filter(Boolean).join(" — ");
      if (info) $("bcClientInfo").value = info;
      pickOfferPack(p.offreKey, false);
      setStepHighlight(3);
      $("bc-section").scrollIntoView({ behavior: "smooth" });
      toast("Données reportées dans le Bon de Commande B2B.");
    });

    /* Step 3 Bon de Commande */
    ["bcRef", "bcDate", "bcClientNom", "bcClientInfo", "bcDesc", "bcMontant", "bcAcomptePct", "bcDelai"].forEach(function (id) {
      var el = $(id);
      el.addEventListener(el.type === "date" ? "change" : "input", renderBonCommande);
    });

    $("btnPrintBc").addEventListener("click", function () {
      setStepHighlight(3);
      window.print();
    });

    $("btnDownloadBcTxt").addEventListener("click", function () {
      var cfgNow = loadCfg();
      var bc = buildBonCommandeData(cfgNow);
      var txt = [
        "BON DE COMMANDE B2B — " + bc.ref,
        "Date : " + bc.date,
        "Prestataire : " + cfgNow.issuer.raison + " (" + cfgNow.issuer.enseigne + ") — " + cfgNow.issuer.capital + " — " + cfgNow.issuer.siege,
        "SIREN/SIRET : " + (cfgNow.issuer.siren || "[À COMPLÉTER AVANT ENVOI]"),
        "Représentée par : " + cfgNow.issuer.rep,
        "Client : " + bc.clientNom + " — " + bc.clientInfo,
        "---------------------------------------------------------------",
        "Prestation : " + bc.desc,
        "Livraison  : " + bc.delai,
        "Total HT   : " + fmtMoney(bc.ht),
        "TVA        : " + bc.tvaMention,
        "Total TTC  : " + fmtMoney(bc.ttc),
        "Règlement  : Acompte " + bc.acPct + " % (" + fmtMoney(bc.acTtc) + ") | Solde " + (100 - bc.acPct) + " % (" + fmtMoney(bc.soldeTtc) + ")",
        cfgNow.channels.iban ? ("IBAN       : " + cfgNow.channels.iban) : "",
        "---------------------------------------------------------------",
        "CONDITIONS GÉNÉRALES DE VENTE (CGV B2B) :"
      ].filter(Boolean).concat(getCgvParagraphs(cfgNow)).join("\n");
      downloadFile(bc.ref.replace(/[^a-zA-Z0-9_-]+/g, "-") + "-CGV.txt", txt, "text/plain;charset=utf-8;");
    });

    $("btnPayStripe").addEventListener("click", function () {
      var cfgNow = loadCfg();
      if (CURRENT_PACK === 3 && cfgNow.channels.commandoSlotsOpen <= 0) {
        toast("Capacité Commando 48h complète (0/2 slot disponible) : règlement Stripe Pack 3 temporairement suspendu.");
        var fb = $("webhookFeedback");
        if (fb) {
          fb.classList.remove("hidden", "ok", "err");
          fb.classList.add("warn");
          fb.textContent = "Commando 48h complet (0/2 slot disponible) : règlement Stripe Pack 3 bloqué. Déposez votre besoin en étape 2 ou sélectionnez Pack 1/2.";
        }
        setStepHighlight(2);
        return;
      }
      var url = cfgNow.channels.stripeLinks[CURRENT_PACK];
      if (url) {
        if (window.fbq) window.fbq("track", "InitiateCheckout", { value: OFFERS[CURRENT_PACK].price, currency: "EUR" });
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        toast("Paiement CB non encore activé sur cette préprod : utilisez le Bon de Commande / virement IBAN.");
      }
    });

    $("btnExportLeadJson").addEventListener("click", function () {
      var p = collectLeadPayload();
      p.bonCommande = buildBonCommandeData(loadCfg());
      downloadFile("dossier-omnisecur-" + (p.societe || "lead").replace(/[^a-zA-Z0-9_-]+/g, "-") + ".json", JSON.stringify(p, null, 2), "application/json;charset=utf-8;");
    });

    /* Init views */
    applyPreset("piege23");
    renderXray("bouclier");
    pickOfferPack(2, false);
    setStepHighlight(1);
    applyProspectContext();
    initConsent();
  }

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initApp);
    else initApp();
  }
})();
