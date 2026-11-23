# DOSSIER DE CONSULTATION FINALE & AUDIT INTÉGRAL AUTO-PORTEUR (V3 — OBJECTIF « GO SANS RÉSERVE »)

**Référence :** `REF-AUDIT-FINAL-IDCC1351-SECURIAXE-2026-v3`  
**Émetteur :** Direction Générale — Securiaxe (`idcc1351.fr` & `idcc1351.fr/boutique/`)  
**Date :** 24 novembre 2026  
**Objet :** Dossier d'audit final **100 % auto-porteur** (incluant la table d'apurement des 18 réserves du Tour 2, le code source intégral du moteur mathématique, les résultats détaillés au centime des 4 scénarios, les textes juridiques et contractuels mot pour mot, le fichier `.htaccess` et la stratégie commerciale complète à 14 jours) soumis pour validation **`GO SANS RÉSERVE — GARANTIE SKIN IN THE GAME (100/100)`**.

---

## PRÉAMBULE AUX 7 AGENTS AUDITEURS INDÉPENDANTS (META, CLAUDE, MISTRAL, SINTRA, GROK, DEEPSEEK, CHATGPT-GPT6)

Lors du tour précédent (`v2`), certains auditeurs ont retenu un verdict `NO-GO` pour deux raisons principales :
1. **Absence d'accès navigateur temps réel au serveur local/DNS** et absence de certaines pièces brutes dans le dossier (code source complet, résultats détaillés du Scénario 4 `P07`, formule explicite du seuil de rentabilité `138,22 h`, section dédiée à la stratégie commerciale à 14 jours).
2. **18 demandes de précisions chirurgicales** (articles exacts de l'Avenant n° 2, distinction `CSI art. L.612-9` vs Ordres de Mission, conformité `EI art. L.526-22 & R.123-237 C. com.`, double référence TVA `art. 293 B du CGI / art. L. 223-3 du CIBS`, référence `art. L.121-1 C. com.`, barèmes conventionnels 2026 panier `4,48 €` et chien `1,41 €/h`, clause anti-fraude au virement IBAN, règle unique `11,0 h` du calculateur vs exception `12,0 h` en cycle continu, et reformulation de *« Projection de trésorerie »* en *« Annualisation indicative du résultat mensuel sur 12 mois (à paramètres constants) »*).

**Ce dossier `v3` est 100 % auto-porteur (*Code-Complete & Text-Complete*) :** toutes les pièces, formules, codes sources, textes légaux et plans d'action à 14 jours sont reproduits **intégralement** ci-dessous. Vous n'avez besoin d'aucun accès réseau externe pour vérifier mathématiquement et textuellement chaque élément.

---

## 0. REGISTRE D'APUREMENT INTÉGRAL DES 18 RÉSERVES DU TOUR 2 (100 % RÉSOLUES)

| N° | Réserve soulevée au Tour 2 (Auditeurs) | Correctif chirurgical implémenté et vérifié dans ce dossier v3 | Statut |
| :-: | :--- | :--- | :-: |
| **01** | **Formule du seuil de rentabilité (`138,22 h`) non explicite** *(Sintra, GPT-6, DeepSeek)* | Formule complète exposée en §3.2 et §3.3 : $\text{Seuil} = \frac{(\text{fixedCosts} + \text{ponctuel}) \times (1 + \text{provPct}/100)}{\text{sellPrice} - \text{varCostPerWorkHour}} = \frac{(1\,000 + 100) \times 1,05}{35,00 - 26,64375} = \frac{1\,155,00}{8,35625} = \mathbf{138,22\text{ h}}$. | **RÉSOLU** |
| **02** | **Résultats complets du Scénario 4 (`Cynophile P07`) absents** *(Sintra, GPT-6, Mistral, DeepSeek)* | Détail complet ajouté en §3.3 et dans `#referentiel-1351` : `320 h @ 42,00 €/h` $\rightarrow$ CA `13 440,00 €`, Coût direct `8 940,00 €` (`27,94 €/h`), Coût complet `11 109,00 €` (`34,72 €/h`), Résultat opérationnel **`+2 331,00 €/mois` (`+17,34 %`)**, Prix cible 10 % = **`38,57 €/h`**, Seuil = **`106,02 h`** (`1 155,00 / 10,89375`). | **RÉSOLU** |
| **03** | **Justification de la base annuelle `1 820,04 h` et des paramètres du Mode Express** *(Mistral, Claude, GPT-6)* | Explicité dans le tableau méthodologique et le PDF A4 : $151,67\text{ h/mois} \times 12 = 1\,820,04\text{ h/an}$ ; part non vendable (CP/absences) $10\text{ \%}$ ($1\,638,036\text{ h}$ productives) ; taux de charges patronales Mode Express `50,37 %` (avant allègements Fillon/RGCP propres à l'entreprise) ; prime nuit `1,00 €/h` ; structure `4,57 €/h`. | **RÉSOLU** |
| **04** | **Ambiguïté entre `11 h` et `12 h` sur le repos quotidien** *(Sintra, Claude)* | Règle clarifiée sans ambiguïté en §2.2 : **le moteur applique la règle unique de `11,0 h` consécutives minimum** entre deux vacations (C. trav. art. L.3131-1 & CCN 1351). La durée de **`12,0 h`** est mentionnée uniquement comme cas particulier applicable aux organisations en cycles continus comportant des vacations de 12 heures (Accord du 18/05/1993 Art. 3, `KALIARTI000029725763`). | **RÉSOLU** |
| **05** | **Libellé *« Projection de trésorerie sur 12 mois »* impropre comptablement** *(Sintra, GPT-6)* | Remplacé dans `app.js` (Rapport PDF A4 et export `.txt`) par : **« Annualisation indicative du résultat mensuel sur 12 mois (à paramètres constants) »**. | **RÉSOLU** |
| **06** | **Libellé *« Marge nette / Résultat net »* avant impôts** *(GPT-6)* | Précisé dans `index.html`, `app.js` et le Rapport PDF A4 en : **« Résultat opérationnel mensuel estimé / Marge opérationnelle estimative sur CA (avant IS/IR) »**. | **RÉSOLU** |
| **07** | **Champ exact Art. 1 & 2 de l'Avenant n° 2 (`KALIARTI000053576557`)** *(GPT-6, DeepSeek)* | Intégré dans `index.html` et `app.js` : **Art. 1 & 2** applicables aux **Agents d'exploitation (Annexe IV) et Agents de maîtrise (Annexe V)** (ainsi qu'aux cadres/administratifs exerçant sur site des fonctions directes de protection), **à l'exclusion de l'Annexe VIII (pompiers d'aérodrome), des astreintes et des cas dérogatoires**. Règle des coupures précisée : interruption $\le 2\text{ h}$ = une seule période (cumul) ; interruption $> 2\text{ h}$ = nouvelle période soumise au plancher de 6,0 h. | **RÉSOLU** |
| **08** | **Précision sur le panier repas (1 seul pour 12 h + barème `4,48 €` au 01/01/2026)** *(Claude, GPT-6)* | Précisé dans `index.html` et `app.js` : **1 seule indemnité de panier par vacation d'au moins 6,0 h continues de travail effectif** (même pour une vacation de 8 h ou 12 h). Barème conventionnel minimum au 01/01/2026 : **`4,48 €`** (Annexe IV Art. 6) ; paramètre par défaut du Mode Recette : `5,00 €/vacation` (modifiable). | **RÉSOLU** |
| **09** | **Barème conventionnel de l'indemnité chien P07 (`1,41 €/h` vs `1,68 €/h`)** *(GPT-6)* | Précisé dans `#referentiel-1351` : minimum conventionnel au 01/01/2026 = **`1,41 €/h` de travail effectif** (Annexe IV Art. 7) ; paramètre retenu dans le scénario étalon P07 = **`1,68 €/h`** (frais non soumis exclus de l'assiette des majorations). | **RÉSOLU** |
| **10** | **Confusion entre `Ordres de Mission` et `CSI art. L.612-9`** *(GPT-6)* | Corrigé dans `index.html`, `boutique/boutique.js` et `agence/securite-privee/index.html` : **« Modèles d'Ordres de Mission & contrôle préalable des autorisations d'exercice (CSI art. L.612-9) et des cartes professionnelles (CSI art. L.612-20) »**. | **RÉSOLU** |
| **11** | **Double référence fiscale TVA (`art. 293 B du CGI / art. L. 223-3 du CIBS`)** *(Claude, DeepSeek, GPT-6, Mistral)* | Uniformisée partout (`app.js`, `boutique/index.html`, `boutique/boutique.js`, `cgv-rgpd.html`, `legal-pages.js`) : **« TVA non applicable — art. 293 B du CGI / art. L. 223-3 du CIBS (franchise en base de TVA) »**. | **RÉSOLU** |
| **12** | **Conformité Entrepreneur Individuel (`art. L.526-22 & R.123-237 C. com.`) + Confinement du nom personnel** *(Claude, GPT-6, DeepSeek)* | Architecture à 2 niveaux : (1) Sur le front web public (`index.html`, `boutique/index.html`, `cgv-rgpd.html`), confinement strict sous **`Securiaxe — Entreprise Individuelle (EI, SIREN 849 261 870)`** (`PERSONAL_NAME_ON_HOME = False`, `PERSONAL_NAME_ON_STORE = False`). (2) Dans `mentions-legales.html` et sur les pièces comptables définitives, mention statutaire complète **`Mounir NAIT MOHAND EI (Entrepreneur Individuel — art. L.526-22 & R.123-237 C. com.)`** + coordonnées complètes de l'hébergeur o2switch SASU. | **RÉSOLU** |
| **13** | **Statut exact de `securiaxe.fr` vs `idcc1351.fr` & Antériorité INPI** *(GPT-6, Claude, Mistral, DeepSeek)* | État exact documenté en §1 : `idcc1351.fr` est **enregistré et actif à l'AFNIC (`DOM107408513-FRNIC`)** ; la boutique est servie en production sur **`https://idcc1351.fr/boutique/`** (zéro dépendance à un domaine tiers non résolu). `0` homonyme SIRENE/INSEE + réserve explicite de recherche d'antériorité phonétique INPI avant dépôt de marque en classes 9, 35, 42. | **RÉSOLU** |
| **14** | **Référence explicite à l'Article L.121-1 du Code de commerce** *(Mistral, DeepSeek)* | Intégrée dans `index.html`, `app.js`, `boutique/boutique.js` et `cgv-rgpd.html` (Art. 1) : transparence sur le caractère indicatif des simulations, absence d'affiliation institutionnelle et obligation de moyens sans promesse d'attribution de marché. | **RÉSOLU** |
| **15** | **Clause et encadré de sécurité anti-fraude au virement IBAN** *(Mistral)* | Intégrés dans `boutique/index.html` (`#bankPendingBox`), `boutique/boutique.js` (`Proforma A4`), `app.js` (`Bon de Commande A4`) et `cgv-rgpd.html` (Art. 2) : vérification obligatoire de la concordance du RIB officiel rattaché au SIREN `849 261 870` et au Bon de Commande avant exécution du virement. | **RÉSOLU** |
| **16** | **Cadre RGPD du Copilote IA local (`COS Bureau IA` en mode BYOK)** *(DeepSeek)* | Explicité à l'Article 6.2 de `cgv-rgpd.html` et dans `boutique/boutique.js` : exécution locale dans le navigateur du Client, clé API stockée uniquement en `sessionStorage` sur le poste du Client, appel direct au fournisseur choisi par le Client (Mistral AI UE / Ollama local / OpenAI API sans entraînement), **zéro transit des données par un serveur Securiaxe**. | **RÉSOLU** |
| **17** | **En-tête `Strict-Transport-Security` (HSTS) et `.htaccess` complet** *(DeepSeek)* | Fichier `.htaccess` créé à la racine et inclus dans `pack-o2switch-securiaxe.zip` avec `Strict-Transport-Security "max-age=31536000; includeSubDomains"`, redirection HTTPS 301, `X-Frame-Options`, `nosniff`, `Referrer-Policy`, `Permissions-Policy` et Gzip (code intégral reproduit en §5.3). | **RÉSOLU** |
| **18** | **Section dédiée à la Stratégie Commerciale à 14 Jours absente du dossier v2** *(GPT-6, Claude, DeepSeek, Mistral)* | Section 6 complète intégrée au présent dossier (`STRAT-14J-IDCC1351-SECURIAXE-2026`) : 0 illusion SEO à 14 jours, protocole Outbound B2B « 20 Diagnostics PDF / jour » sur 200 dirigeants `NAF 80.10Z`, entonnoir mathématique conservateur (`2 à 3 ventes = 1 670 € à 3 120 € HT`), conformité CPCE art. L.34-5 et RGPD art. 14. | **RÉSOLU** |

---

## 1. ARCHITECTURE DE MARQUE, DOMAINES, STATUT « EI » & CONFINEMENT DU NOM PERSONNEL

| Composant | Rôle & Positionnement | Preuve technique & juridique vérifiée |
| :--- | :--- | :--- |
| **`https://idcc1351.fr`** | Référentiel technique indépendant & Calculateur de coût de revient réel (Convention Collective Nationale des Entreprises de Prévention et de Sécurité — IDCC 1351 / Brochure JO 3196). | Domaine **enregistré et actif au registre AFNIC** le 23/11/2026 (`Handle : DOM107408513-FRNIC`, bureau Hostinger Operations UAB, statut `ACTIVE`). |
| **`https://idcc1351.fr/boutique/`** *(Enseigne **Securiaxe**)* | Boutique B2B souveraine et Agence d'outillage opérationnel commercialisant les 3 Packs Dirigeants Sécurité Privée (`690 €`, `980 €`, `1 450 € HT`). | Hébergée en sous-répertoire direct `/boutique/index.html` sur `idcc1351.fr` (`0` lien cassé, `0` dépendance à un domaine externe non résolu). Le domaine `securiaxe.fr` est vérifié disponible à l'AFNIC (`HTTP 404 RDAP`) pour extension future. |
| **Antériorité INSEE & Réserve INPI** | Exploitation sous le nom commercial / enseigne **Securiaxe**. | `0` homonyme au Répertoire SIRENE/INSEE (`api.gouv.fr`) et `0` marque identique détectée en classes 9, 35, 42. **Clause de gouvernance :** réalisation d'une recherche d'antériorité phonétique/orthographique INPI avant tout dépôt formel de marque verbale. |
| **Double conformité : Confinement Front (LCEN) + Mention `EI` (C. com. art. L.526-22 & R.123-237)** | **1. Pages web publiques (`index.html`, `boutique/index.html`, `cgv-rgpd.html`) :** affichage exclusif de **`Securiaxe — Entreprise Individuelle (EI, SIREN 849 261 870 · Albi)`** (`PERSONAL_NAME_ON_HOME = False`, `PERSONAL_NAME_ON_STORE = False`).<br>**2. Mentions légales & Facturation définitive :** mention statutaire complète **`Mounir NAIT MOHAND EI (Entrepreneur Individuel)`**. | Conforme simultanément à la consigne de confidentialité du dirigeant sur le front public, à l'**article 6-III-1 de la LCEN (loi n° 2004-575)** dans `mentions-legales.html` (`PERSONAL_NAME_ON_MENTIONS_LEGALES_EI = True`) et aux **articles L.526-22 et R.123-237 du Code de commerce** sur les pièces comptables. |

---

## 2. AUDIT DE CONFORMITÉ RÉGLEMENTAIRE & JURIDIQUE (TEXTES EXACTS AFFICHÉS)

### 2.1. Bandeau permanent d'indépendance (Haut de page `idcc1351.fr`, visible sans défiler)
> **Information d'indépendance :** `idcc1351.fr` est un outil technique privé d'aide au chiffrage édité par **Securiaxe** (SIREN 849 261 870 — hors activités réglementées CNAPS art. L.611-1 CSI). Ce site n'est affilié ni aux partenaires sociaux, ni au Ministère du Travail, ni au CNAPS.  
> **Textes officiels (23/11/2026) :**  
> - [Avenant n° 2 du 03/09/2025 ↗](https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000053576553)  
> - [Arrêté du 27/05/2026 (JORF 05/06/2026) ↗](https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000054200800)  
> - [Repos quotidien (Légifrance) ↗](https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000029725763)

### 2.2. Tableau du Référentiel Réglementaire Versionné (`#referentiel-1351` dans `index.html`)

| Règle & Paramètre moteur | Texte officiel & Référence Légifrance | Publication JORF & Entrée en vigueur | Champ d'application exact & Méthodologie appliquée |
| :--- | :--- | :--- | :--- |
| **Plancher de vacation : `6,0 h` minimum rémunérées** | Avenant n° 2 du 03/09/2025 (`KALITEXT000053576553`, Art. 1 & 2 `KALIARTI000053576557`) à l'accord du 01/04/2021 | Arrêté d'extension du 27/05/2026 (`NOR : TRST2612786A`, JORF n°0130 du 05/06/2026, `JORFTEXT000054200800`)<br>**Effet : 01/07/2026** | **Art. 1 :** Agents d'exploitation (Annexe IV) et Agents de maîtrise (Annexe V), ainsi que cadres/administratifs exerçant sur site des fonctions directes de protection, **à l'exclusion de l'Annexe VIII (pompiers d'aérodrome), des astreintes et des cas dérogatoires limitatifs de l'Art. 2**. **Règle des coupures (Art. 2) :** deux périodes séparées par une interruption $\le 2\text{ h}$ forment une seule période de travail (cumul du temps effectif) ; toute interruption $> 2\text{ h}$ ouvre une nouvelle période distincte soumise au plancher de `6,0 h`. |
| **Majorations Nuit (`+10 %`), Dimanche (`+10 %`) & Férié (`+100 %`)** | Avenant du 25/09/2001 (Travail de nuit 21h–06h) & Dispositions IDCC 1351 | En vigueur (Textes étendus brochure JO 3196) | Assiette calculée sur le taux horaire conventionnel hors indemnités non soumises aux cotisations. Pour le profil **P07 Cynophile** (`320 h @ 42,00 €/h` : CA `13 440,00 €`, Coût direct `27,94 €/h`, Coût complet `34,72 €/h` soit `11 109,00 €`, Résultat opérationnel **`+2 331,00 €/mois`** soit `+17,34 %`, Prix cible 10 % = `38,57 €/h`, Seuil **`106,02 h`**), l'indemnité chien (`1,68 €/h` dans le scénario ; minimum conventionnel **`1,41 €/h` au 01/01/2026** selon Annexe IV Art. 7) est exclue de l'assiette de majoration. |
| **Indemnité de panier repas (seuil `6,0 h`)** | Annexe IV Art. 6 (`KALIARTI000023567703`) & Accord salaires du 08/12/2025 | En vigueur (**`4,48 €` au 01/01/2026** · 1 seule indemnité par vacation continue $\ge 6,0\text{ h}$) | Octroyée dès `6,0 heures` continues de travail effectif (**1 seule indemnité par vacation, même pour une vacation de 8 h ou 12 h**). En Mode Paie Réelle, l'indemnité globale par vacation est paramétrée par défaut à `5,00 €` (modifiable). Passer de 25 vacations de 12 h à 50 vacations de 6 h sur 300 h double le nombre de prises de poste (50 paniers et 50 trajets au lieu de 25, soit **`+393,75 €/mois`** avec provision 5 %). |
| **Repos quotidien (règle moteur : `11,0 h`) & Amplitude (`13,0 h`)** | Accord du 18/05/1993 Art. 3 (`KALIARTI000029725763`) & C. trav. art. L.3131-1 | Étendu par arrêté du 03/03/1994 | **Règle unique appliquée par le moteur (`canPlan`) :** repos quotidien minimum obligatoire de **`11,0 h` consécutives** entre deux vacations. **Cas particulier `12,0 h` :** s'applique uniquement aux organisations du travail en cycles continus comportant des vacations de 12 heures. Amplitude quotidienne maximale : `13,0 h` (`12,0 h` de travail effectif). |
| **Formules de base & Seuil de rentabilité** | Méthodologie *Bouclier Anti-Pertes v3.2* | Vérifiée le 23/11/2026 | Base annuelle : `151,67 h/mois × 12 = 1 820,04 h/an` (taux de charges Mode Express `50,37 %` avant allègements Fillon/RGCP spécifiques à l'entreprise). En Mode Paie Réelle, le socle fixe provisionné est `(fixedCosts + ponctuel) × (1 + provPct/100) = (1 000 € + 100 €) × 1,05 = 1 155,00 €`, divisé par la marge sur coût variable horaire (Scénario 3 P01 : `1 155 / 8,35625 = 138,22 h` ; Scénario 4 P07 : `1 155 / 10,89375 = 106,02 h`). |

### 2.3. Mentions Légales Complètes (`mentions-legales.html` & `legal-pages.js` — Texte exact)
- **Enseigne & Nom commercial :** `Securiaxe` (éditeur du référentiel `idcc1351.fr` et de la suite `COS Opérations`)
- **Dénomination légale (art. L.526-22 & R.123-237 C. com.) :** `Mounir NAIT MOHAND EI (Entrepreneur Individuel)`
- **Titulaire légal (LCEN art. 6-III-1) :** `Mounir NAIT MOHAND — Entrepreneur Individuel (EI)`
- **Forme juridique & Registre :** `Entreprise Individuelle (EI) inscrite au Répertoire SIRENE / RNE (SIREN 849 261 870)`
- **Identifiant SIREN / SIRET :** `849 261 870 00018 (Code NAF/APE : 70.22Z / Ingénierie & conseil B2B)`
- **Siège social / Domiciliation :** `81000 Albi (Tarn — France)`
- **Directeur de la publication :** `Mounir NAIT MOHAND`
- **Régime TVA applicable :** `Franchise en base de TVA — art. 293 B du CGI / art. L. 223-3 du CIBS (régime unique)`
- **Hébergeur (LCEN art. 6-III-1 — Raison, Adresse, RCS, Tél.) :** `o2switch SASU — Chemin des Pardiaux, 63000 Clermont-Ferrand, France (SASU au capital de 100 000 € — RCS Clermont-Ferrand 510 909 807 — Tél. : +33 4 44 44 60 40)`
- **Contact B2B & Exercice des droits RGPD :** `nait.conv@gmail.com` · Tél. : `+33 6 17 17 99 74`

### 2.4. Conditions Générales de Vente B2B & Politique RGPD (`cgv-rgpd.html` — Articles 1 à 7)
1. **Article 1 — Objet, Loyauté commerciale (art. L.121-1 C. com.) & Périmètre hors activité CNAPS (art. L.611-1 CSI) :** Prestations B2B d'outillage documentaire et logiciel conclues avec `Securiaxe — Entreprise Individuelle (EI, SIREN 849 261 870 — identité légale complète art. L.526-22 et R.123-237 C. com. figurant aux Mentions légales et sur toute facture émise)`. Exclusion explicite de toute activité réglementée CNAPS (Livre VI CSI) et de tout conseil juridique, fiscal ou comptable réglementé. Conformément à l'article L.121-1 du Code de commerce, toutes les simulations sont présentées comme indicatives.
2. **Article 2 — Gamme tarifaire, TVA (`art. 293 B du CGI / art. L. 223-3 du CIBS`), Sécurité anti-fraude IBAN & Règlement :** Tarifs HT (`690 €`, `980 €`, `1 450 €`). Régime fiscal unique (`TVA non applicable — art. 293 B du CGI / art. L. 223-3 du CIBS` en franchise en base, ou TVA 20 %, jamais cumulés). **Clause de sécurité anti-fraude au virement B2B :** tout virement SEPA doit être exécuté exclusivement vers l'IBAN officiel rattaché à Securiaxe (SIREN 849 261 870) figurant sur le RIB et la facture officielle ; vérification vocale en cas de doute. Pénalités de retard art. L.441-10 et D.441-5 C. com. (3 × taux légal + indemnité forfaitaire de 40 €).
3. **Article 3 — Délais, capacité maximale (2 slots Pack 3) & Obligation de moyens :** Livraison immédiate (Pack 1), atelier sous 48h ouvrées (Pack 2), livraison sous 48h ouvrées dès réception de 100 % des pièces J0 pour le Pack 3 (limité à 1 lot $\le 15$ pages et plafonné à 2 dossiers simultanés). Obligation de moyens stricte, zéro promesse d'attribution de marché.
4. **Article 4 — Propriété intellectuelle & Licence mono-entité :** Licence interne non transférable après paiement complet ; interdiction de revente ou mise en ligne publique.
5. **Article 5 — Limitation de responsabilité :** Verrou Direction obligatoire sur les coûts et taux ; responsabilité totale plafonnée au montant HT effectivement encaissé au titre du Bon de Commande.
6. **Article 6 — Protection des données (RGPD Art. 13/14, Sous-traitance Art. 28 & Copilote IA Local BYOK) :**
   - *6.1 Prospects B2B (Art. 13/14 RGPD & L.34-5 CPCE) :* Traitement exclusif pour la qualification B2B, zéro revente, opposition immédiate (`STOP`), **anonymisation/purge automatique sous 30 jours** si sans suite (hors factures conservées 10 ans selon art. L.123-22 C. com.).
   - *6.2 Sous-traitance & Architecture Copilote IA Local BYOK (Art. 28 RGPD) :* Zéro entraînement de modèle IA tiers. Le module **COS Bureau IA (Pack 2, mode BYOK — Bring Your Own Key)** s'exécute localement dans le navigateur du Client : la clé API du Client reste en `sessionStorage` local et interroge directement le fournisseur choisi par le Client (Mistral AI UE, Ollama local hors ligne ou OpenAI API sans entraînement) **sans jamais transiter par un serveur Securiaxe**. Purge intégrale des pièces d'atelier/mission sous 30 jours après clôture.
7. **Article 7 — Loi applicable & Attribution de compétence :** Droit français, compétence exclusive du Tribunal de commerce d'Albi (81).

---

## 3. AUDIT MATHÉMATIQUE COMPLET : CODE SOURCE & DÉMONSTRATION DES 4 SCÉNARIOS

### 3.1. Code source exact du moteur déterministe (`calculator-engine.js`)

```javascript
var PROFILES = {
  P01: { code: "P01", nom: "Surveillance humaine (ADS Coeff. 120)", classif: "IDCC 1351 — Coeff. 120", baseHoraire: 19.50, brutH: 12.42, fraisNonSoumisH: 0.00 },
  P02: { code: "P02", nom: "Surveillance confirmée (Coeff. 150)", classif: "IDCC 1351 — Coeff. 150", baseHoraire: 20.60, brutH: 13.08, fraisNonSoumisH: 0.00 },
  P03: { code: "P03", nom: "Sécurité incendie SSIAP 1", classif: "IDCC 1351 — Agent SSIAP 1", baseHoraire: 21.00, brutH: 13.10, fraisNonSoumisH: 0.00 },
  P04: { code: "P04", nom: "Chef d'équipe incendie SSIAP 2", classif: "IDCC 1351 — SSIAP 2", baseHoraire: 23.60, brutH: 14.73, fraisNonSoumisH: 0.00 },
  P05: { code: "P05", nom: "Chef de service incendie SSIAP 3", classif: "IDCC 1351 — SSIAP 3", baseHoraire: 29.40, brutH: 18.65, fraisNonSoumisH: 0.00 },
  P06: { code: "P06", nom: "Opérateur vidéo / télésurveillance (L.611-1 1°)", classif: "IDCC 1351 — Opérateur SCT1/SCT2", baseHoraire: 21.80, brutH: 13.86, fraisNonSoumisH: 0.00 },
  P07: { code: "P07", nom: "Agent cynophile (Frais chien H10 non soumis)", classif: "IDCC 1351 — Maître-chien", baseHoraire: 23.75, brutH: 13.30, fraisNonSoumisH: 1.68 }
};

var EXPRESS_DEFAULTS = {
  annualHours: 1820.04,       // 151,67 h/mois * 12 mois
  nonBillablePct: 10.0,       // 10 % CP / absences -> hProd = 1 638,036 h/an
  chargesPatronalesPct: 50.37,// Taux chargé avant allègements Fillon/RGCP spécifiques
  primeNuitH: 1.00,
  structH: 4.57,
  majoNuitPct: 10.0,
  majoDimPct: 10.0,
  majoFeriePct: 100.0
};

var RECETTE_DEFAULTS = {
  vacHours: 8,
  suppH: 2.00,
  indVac: 5.00,
  transVac: 10.00,
  ponctuel: 100.00,
  fixedCosts: 1000.00,
  structH: 2.00,
  provPct: 5.0,
  targetPct: 10.0
};
```

### 3.2. Formules mathématiques exactes exécutées par `calculator-engine.js`

1. **Règle du plancher conventionnel 6,0 h (Avenant n° 2 Art. 1 & 2) :**
   $$\text{effectiveVacPaidHours} = \max(\text{vacHours}, 6.0), \quad \text{vacationsCount} = \frac{\text{hours}}{\text{vacHours}}, \quad \text{paidHours} = \text{vacationsCount} \times \text{effectiveVacPaidHours}$$
2. **Mode 1 — `evaluateExpressTrap` (Mode Express) :**
   $$\text{hProd} = 1\,820,04 \times (1 - 0,10) = 1\,638,036\text{ h}$$
   $$\text{baseJour} = \frac{\text{brutH} \times 1\,820,04 \times (1 + 0,5037)}{\text{hProd}} = \frac{\text{brutH} \times 1,5037}{0,90}$$
   $$\text{extra}_{\text{nuit}} = (\text{brutH} \times 0,10 + 1,00) \times 1,5037, \quad \text{unitEmp} = \text{baseJour} + \text{extra} + \text{fraisNonSoumisH}$$
   $$\text{directCosts} = \text{paidHours} \times \text{unitEmp}, \quad \text{fullCost} = \text{directCosts} + (\text{hours} \times 4,57)$$
3. **Mode 2 — `evaluateScenario` (Mode Paie Réelle / Recette) :**
   $$\text{directCosts} = \text{paidHours} \times (\text{baseH} + \text{suppH}) + \text{vacationsCount} \times (\text{indVac} + \text{transVac}) + \text{ponctuel}$$
   $$\text{fullCost} = (\text{directCosts} + \text{fixedCosts} + \text{hours} \times \text{structH}) \times \left(1 + \frac{\text{provPct}}{100}\right)$$
   $$\text{targetPriceH} = \frac{\text{fullCost} / \text{hours}}{1 - (\text{targetPct} / 100)}$$
4. **Formule exacte du Seuil de Rentabilité (`breakEvenHours` en Mode Paie Réelle) :**
   $$\text{fixedWithProv} = (\text{fixedCosts} + \text{ponctuel}) \times \left(1 + \frac{\text{provPct}}{100}\right) = (1\,000 + 100) \times 1,05 = \mathbf{1\,155,00\text{ €}}$$
   $$\text{varCostPerWorkHour} = \left[\frac{\text{effectiveVacPaidHours}}{\text{vacHours}} \times (\text{baseH} + \text{suppH}) + \frac{\text{indVac} + \text{transVac}}{\text{vacHours}} + \text{structH}\right] \times \left(1 + \frac{\text{provPct}}{100}\right)$$
   $$\text{unitMargin} = \text{sellPrice} - \text{varCostPerWorkHour}, \quad \text{breakEvenHours} = \frac{\text{fixedWithProv}}{\text{unitMargin}}$$

### 3.3. Vérification arithmétique complète des 4 Scénarios Étalons (Sortie Node.js certifiée)

| Scénario étalon | Paramètres d'entrée | Détail arithmétique pas à pas | Résultats exacts affichés |
| :--- | :--- | :--- | :--- |
| **Scénario 1**<br>`Piège 23 €/h (Nuit ADS)`<br>*(Mode Express)* | `P01` (`brutH = 12,42 €`), `nuit`, `hours = 320 h`, `vacHours = 8 h`, `sellPrice = 23,00 €/h`, `targetPct = 10 %` | • $\text{baseJour} = \frac{12,42 \times 1,5037}{0,90} = 20,75106\text{ €/h}$<br>• $\text{extra}_{\text{nuit}} = (1,242 + 1,00) \times 1,5037 = 3,3712954\text{ €/h}$<br>• $\text{unitEmp} = 24,49694378\text{ €/h}$ ($\text{directCosts} = 7\,839,02\text{ €}$)<br>• $\text{structure} = 320 \times 4,57 = 1\,462,40\text{ €}$<br>• $\text{fullCost} = 7\,839,022 + 1\,462,40 = \mathbf{9\,301,42\text{ €}}$ (`29,07 €/h`)<br>• $\text{caTotal} = 320 \times 23,00 = \mathbf{7\,360,00\text{ €}}$ | • Verdict : **`DANGER DÉFICITAIRE`**<br>• Résultat opérationnel : **`-1 941,42 € / mois` (`-26,38 %`)**<br>• Annualisation 12 mois : **`-23 297,04 € / an`**<br>• Coût direct : **`24,50 €/h`** \| Coût complet : **`29,07 €/h`**<br>• Prix cible (10 %) : $\frac{29,066944}{0,90} = \mathbf{32,30\text{ € HT/h}}$ |
| **Scénario 2**<br>`Impact Avenant n° 2 (50×6h vs 25×12h & cas 4h)`<br>*(Mode Paie Réelle)* | `P01` (`baseH = 19,50 €`), `jour`, `hours = 300 h`, `suppH = 2 €`, `indVac = 5 €`, `transVac = 10 €`, `ponctuel = 100 €`, `fixed = 1 000 €`, `structH = 2 €`, `prov = 5 %`, `sellPrice = 35,00 €/h` | • **En vacations de 12 h (`25 vac.`) :**<br>  $\text{direct} = 300 \times 21,50 + 25 \times 15 + 100 = 6\,925,00\text{ €}$<br>  $\text{fullCost}_{12\text{h}} = (6\,925 + 1\,000 + 600) \times 1,05 = \mathbf{8\,951,25\text{ €}}$ (`29,84 €/h`)<br>• **En vacations de 6 h (`50 vac.`) :**<br>  $\text{direct} = 300 \times 21,50 + 50 \times 15 + 100 = 7\,300,00\text{ €}$<br>  $\text{fullCost}_{6\text{h}} = (7\,300 + 1\,000 + 600) \times 1,05 = \mathbf{9\,345,00\text{ €}}$ (`31,15 €/h`)<br>• **Écart 50×6h vs 25×12h :** $9\,345,00 - 8\,951,25 = \mathbf{+393,75\text{ €/mois}}$ (`+4 725,00 €/an`)<br>• **Cas vacation 4 h (`75 vac.` $\rightarrow$ `450 h payées`) :**<br>  $\text{direct} = 450 \times 21,50 + 75 \times 15 + 100 = 10\,900,00\text{ €}$ $\rightarrow$ $\text{fullCost}_{4\text{h}} = \mathbf{13\,125,00\text{ €}}$ (`43,75 €/h`, perte `-2 625,00 €/mois`) | • En `50 × 6h` @ `35 €/h` (CA `10 500 €`) :<br>  Coût direct : **`24,33 €/h`** \| Coût complet : **`31,15 €/h`** (`9 345,00 €`)<br>  Résultat : **`+1 155,00 € / mois` (`+11,00 %`)**<br>  Prix cible (10 %) : **`34,61 € HT/h`**<br>  Seuil : $\frac{1\,155}{35 - 27,30} = \mathbf{150,00\text{ h}}$ |
| **Scénario 3**<br>`Équilibre P01 (320h @ 35 €)`<br>*(Mode Paie Réelle)* | `P01` (`baseH = 19,50 €`), `jour`, `hours = 320 h`, `vacHours = 8 h` (`40 vac.`), `sellPrice = 35,00 €/h`, `targetPct = 10 %` | • $\text{caTotal} = 320 \times 35,00 = \mathbf{11\,200,00\text{ €}}$<br>• $\text{directCosts} = 320 \times 21,50 + 40 \times 15 + 100 = \mathbf{7\,580,00\text{ €}}$ (`23,6875 €/h`)<br>• $\text{fullCost} = (7\,580 + 1\,000 + 640) \times 1,05 = 9\,220 \times 1,05 = \mathbf{9\,681,00\text{ €}}$ (`30,253125 €/h`)<br>• $\text{varCostPerWorkHour} = (21,50 + 1,875 + 2,00) \times 1,05 = 26,64375\text{ €/h}$<br>• $\text{unitMargin} = 35,00 - 26,64375 = 8,35625\text{ €/h}$<br>• $\text{breakEvenHours} = \frac{1\,155,00}{8,35625} = \mathbf{138,219895...\text{ h}}$ | • Verdict : **`CIBLE ATTEINTE`**<br>• Résultat opérationnel : **`+1 519,00 € / mois` (`+13,56 %`)**<br>• Annualisation 12 mois : **`+18 228,00 € / an`**<br>• Coût direct : **`23,69 €/h`** \| Coût complet : **`30,25 €/h`**<br>• Prix cible (10 %) : **`33,61 € HT/h`**<br>• Seuil de rentabilité : **`138,22 h`** |
| **Scénario 4**<br>`Cynophile P07 (320h @ 42 €)`<br>*(Mode Paie Réelle)* | `P07` (`baseH = 23,75 €` dont `1,68 €/h` chien non soumis), `jour`, `hours = 320 h`, `vacHours = 8 h` (`40 vac.`), `sellPrice = 42,00 €/h`, `targetPct = 10 %` | • $\text{caTotal} = 320 \times 42,00 = \mathbf{13\,440,00\text{ €}}$<br>• $\text{directCosts} = 320 \times (23,75 + 2,00) + 40 \times 15 + 100 = 8\,240 + 600 + 100 = \mathbf{8\,940,00\text{ €}}$ (`27,9375 €/h`)<br>• $\text{fullCost} = (8\,940 + 1\,000 + 640) \times 1,05 = 10\,580 \times 1,05 = \mathbf{11\,109,00\text{ €}}$ (`34,715625 €/h`)<br>• $\text{varCostPerWorkHour} = (25,75 + 1,875 + 2,00) \times 1,05 = 31,10625\text{ €/h}$<br>• $\text{unitMargin} = 42,00 - 31,10625 = 10,89375\text{ €/h}$<br>• $\text{breakEvenHours} = \frac{1\,155,00}{10,89375} = \mathbf{106,024096...\text{ h}}$ | • Verdict : **`CIBLE ATTEINTE`**<br>• Résultat opérationnel : **`+2 331,00 € / mois` (`+17,34 %`)**<br>• Annualisation 12 mois : **`+27 972,00 € / an`**<br>• Coût direct : **`27,94 €/h`** \| Coût complet : **`34,72 €/h`**<br>• Prix cible (10 %) : **`38,57 € HT/h`**<br>• Seuil de rentabilité : **`106,02 h`** |

---

## 4. AUDIT DU TUNNEL DE CONVERSION & DES LIVRABLES GÉNÉRÉS (TEXTES VERBATIM)

### 4.1. Livrable Gratuit n° 1 — Rapport PDF A4 « Diagnostic de conformité économique & conventionnelle — IDCC 1351 » (`#diagPdfSheet`)
Généré en 1 clic sans barrière e-mail (`window.print()`) :
- **En-tête :** `DIAGNOSTIC DE CONFORMITÉ ÉCONOMIQUE & CONVENTIONNELLE — IDCC 1351` · `Référentiel technique indépendant : idcc1351.fr — Édité par Securiaxe (EI)` · `SIREN/SIRET : 849 261 870 00018 · Siège : Albi (81) · Hors activité CNAPS (art. L.611-1 CSI & art. L.121-1 C. com.)` · `Non affilié aux organisations paritaires de branche, au Ministère du Travail ou au CNAPS.`
- **Tableau financier :** Profil conventionnel (Annexe IV / V), Contrôle Avenant n° 2 (Art. 1 & 2 — Plancher 6,0 h, Arrêté du 27/05/2026, JORF 05/06/2026, effet 01/07/2026, hors Annexe VIII & astreintes), Seuil de rentabilité, Coût direct horaire, Coût complet horaire et mensuel, Objectif marge opérationnelle sur CA, Tarif facturé vs Tarif plancher cible.
- **Encadré de synthèse :** **« Annualisation indicative du résultat mensuel sur 12 mois (à paramètres constants) »** et **« Résultat opérationnel mensuel »**.
- **Note méthodologique de pied de page :** Exposé intégral des formules du Mode Express (`151,67 h × 12 = 1 820,04 h`, charges `50,37 %` avant allègements Fillon/RGCP) et du Mode Paie Réelle (`Seuil = [(fixedCosts + ponctuel) × (1 + provPct/100)] / [sellPrice - varCostPerWorkHour]`).

### 4.2. Livrable Gratuit n° 2 — Trame administrative de demande de réévaluation BPU (`#trameRevisionText` — Texte verbatim)
```text
OBJET : Demande de réévaluation du Bordereau des Prix Unitaires (BPU) — Entrée en vigueur de l'Avenant n° 2 (IDCC 1351)
RÉFÉRENCES RÉGLEMENTAIRES : Avenant n° 2 du 3 septembre 2025 (IDCC 1351 · Art. 1 & 2 — KALITEXT000053576553 / KALIARTI000053576557) étendu par Arrêté ministériel du 27 mai 2026 (NOR : TRST2612786A, JORF n°0130 du 5 juin 2026, JORFTEXT000054200800), d'application obligatoire au 1er juillet 2026.
--------------------------------------------------------------------------------

Madame, Monsieur,

Dans le cadre du suivi d'exécution de nos prestations de sécurité privée réalisées par [VOTRE SOCIÉTÉ DE SÉCURITÉ PRIVÉE], nous portons à votre attention l'impact économique direct des dispositions conventionnelles étendues par l'Arrêté du 27 mai 2026 (publié au Journal Officiel le 5 juin 2026) applicables aux entreprises relevant de la Convention Collective Nationale des Entreprises de Prévention et de Sécurité (IDCC 1351 — Brochure JO 3196).

1. INCIDENCE CONVENTIONNELLE SUR L'ORGANISATION DES VACATIONS (ART. 1 & 2 AVENANT N° 2) :
- La durée minimale conventionnelle étendue d'une période de travail (vacation) est désormais fixée à 6,0 heures rémunérées minimum (contre 4,0 heures antérieurement à temps partiel) pour les Agents d'exploitation et Agents de maîtrise (hors Annexe VIII, astreintes et exceptions conventionnelles limitatives ; deux vacations séparées par une coupure <= 2 h forment une seule période, toute coupure > 2 h ouvrant une nouvelle période soumise au plancher de 6,0 h).
- Le seuil de déclenchement de l'indemnité de panier (1 seule indemnité par vacation continue >= 6,0 h de travail effectif — Annexe IV art. 6, minimum conventionnel 4,48 € au 01/01/2026) et la multiplication des vacations de 6,0 h alourdissent mécaniquement la structure des coûts directs et des indemnités de transport.

2. ÉTAT COMPARATIF DU COÛT DE REVIENT SUR VOTRE PÉRIMÈTRE (...) :
[Pré-rempli dynamiquement avec les chiffres exacts du dirigeant]

3. DEMANDE D'AVENANT TARIFAIRE :
Afin de garantir la pleine conformité sociale des prestations, la stabilité des équipes affectées à votre site et le respect de l'équilibre économique du contrat, nous sollicitons une réunion d'ajustement de notre BPU sur la base du tarif plancher de [TARIF_CIBLE] HT/h à compter du prochain cycle de facturation.
...
[AVERTISSEMENT : Trame technique et économique générée via idcc1351.fr (édité par Securiaxe — hors activités CNAPS L.611-1 CSI & conforme art. L.121-1 C. com.). Ce modèle d'aide à la négociation commerciale B2B ne constitue pas une consultation juridique ; vérifiez les clauses de révision de prix de votre contrat avant envoi.]
```

### 4.3. Boutique B2B Souveraine (`https://idcc1351.fr/boutique/`) & Sécurité Anti-Fraude IBAN
- **Pack 1 (`690 € HT` · 100 % comptant) :** *Arsenal Documentaire & Chiffrage v3.2* (Classeur Excel `Bouclier-Anti-Pertes.xlsx` + Calculateur Web hors ligne + 6 Mémoires Techniques Word `.docx` conformes Avenant n° 2 + Guide & trames DC4 art. L.612-5-1 CSI).
- **Pack 2 (`980 € HT` · Acompte 50 % = `490 € HT` · Recommandé) :** *COS Opérations (Sentinelle IA) + Atelier Dirigeant 2h* (100 % du Pack 1 + Module local COS Bureau IA en mode BYOK `sessionStorage` sans transit serveur + Contrôle préalable des autorisations d'exercice CSI art. L.612-9, cartes pro L.612-20, repos 11,0 h et modèles d'Ordres de Mission + Atelier 2h).
- **Pack 3 (`1 450 € HT` · Acompte 50 % = `725 € HT` · Plafonné à 2 slots simultanés) :** *Commando Réponse AO 48h (1 lot unique $\le 15$ pages)* (Audit Go/No-Go du RC, chiffrage BPU/DPGF, rédaction du mémoire technique ciblé et débriefing Direction 45 min).
- **Encadré de sécurité anti-fraude au virement B2B (affiché dans le tunnel et sur la Proforma A4) :**
  > **RIB / IBAN professionnel & Sécurité anti-fraude B2B :** Téléchargez votre Proforma A4 ci-dessous puis demandez notre RIB officiel rattaché au SIREN `849 261 870`. Vérifiez systématiquement la concordance du RIB écrit avec votre Bon de Commande avant exécution du virement.

---

## 5. AUDIT VISUEL « UNSLOP », SÉCURITÉ SERVEUR (`.htaccess`) & PREUVES E2E PLAYWRIGHT

### 5.1. Purge intégrale « Unslop » & Direction Artistique Option Alpha Hybride
- **`0` emoji décoratif** et **`0` balise entre crochets** (`[SYS-01 // ...]`, `[DIAG-SEC // ...]`, `[À RENSEIGNER...]`) sur l'ensemble des pages HTML (`index.html`, `boutique/index.html`, `mentions-legales.html`, `cgv-rgpd.html`, `agence/securite-privee/index.html`, `agence/shared/mentions-legales-confidentialite.html`).
- **`0` artifice visuel générique** : suppression des 3 points macOS, des croix `+` aux coins, des grilles de points radiales et des italiques forcés.
- **Accessibilité WCAG AAA :** fond clair `#F4F3EE` / `#FAF9F5`, texte `#161513` / `#0F172A` (contraste $> 16:1$), typographie tabulaire monospace sur tous les montants financiers.

### 5.2. Fichier `.htaccess` de production (Code intégral livré à la racine de `pack-o2switch-securiaxe.zip`)
```apache
# Securiaxe & idcc1351.fr — Configuration Apache Production (o2switch)
Options -Indexes

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTPS} !=on
  RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>

<IfModule mod_headers.c>
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
  Header always set X-Frame-Options "SAMEORIGIN"
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Permissions-Policy "geolocation=(), microphone=(), camera=()"
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/css application/javascript application/json image/svg+xml
</IfModule>
```

### 5.3. Trace d'exécution réelle de la suite de tests automatisés (Node.js + Playwright Chromium Headless)
```text
$ node -c site-config.js && node -c calculator-engine.js && node -c app.js && node -c boutique/boutique.js && node -c legal-pages.js
SYNTAX_AND_SYNC_OK (Exit code 0)

$ python3 run_e2e_verification.py
BROKEN_LINKS: 0 []
JS_ERRORS: 0 []
S1_VERDICT: -1 941,42 € (-26,38 %)
S2_VERDICT: +1 155,00 € (11,00 %) BE: 150,00 h
S3_VERDICT: +1 519,00 € (13,56 %) BE: 138,22 h
S4_VERDICT: +2 331,00 € (17,34 %) BE: 106,02 h
PERSONAL_NAME_ON_HOME: False
PERSONAL_NAME_ON_STORE: False
PERSONAL_NAME_ON_CGV: False
PERSONAL_NAME_ON_MENTIONS_LEGALES_EI: True
MOBILE_OVERFLOW: False
```

---

## 6. STRATÉGIE D'EXÉCUTION COMMERCIALE À 14 JOURS (`STRAT-14J-IDCC1351-SECURIAXE-2026`)

### 6.1. Postulat de réalisme opérationnel (Zéro dépendance au SEO à 14 jours)
Un nom de domaine créé le 23/11/2026 (`idcc1351.fr`) ne génère aucun trafic SEO organique sur ses 14 premiers jours. **100 % des revenus J1–J14 reposent sur la prospection directe sortante (« Outbound B2B chirurgical »)** à budget publicitaire `0,00 €` (Régime F1), en utilisant `idcc1351.fr` comme générateur de preuves financières personnalisées auprès des dirigeants de sociétés de sécurité privée (**Code NAF/APE `80.10Z`, 10 à 150 salariés**).

### 6.2. Protocole « Opération 20 Diagnostics PDF / Jour » (3 étapes quotidiennes)
1. **Extraction & Qualification (08h30 – 09h30 : 20 dirigeants / jour ouvré, soit 200 dirigeants sur 10 jours ouvrés) :**
   - *10 cibles/jour via BOAMP / PLACE / Maximilien (`CPV 79710000-4`, `79713000-5`) :* entreprises positionnées sur des marchés publics de gardiennage/SSIAP en cours ou arrivant à renouvellement.
   - *10 cibles/jour via l'API SIRENE / Annuaire des Entreprises (`api.gouv.fr`) :* PME `NAF 80.10Z` (10 à 150 salariés, agrément CNAPS actif) en Occitanie (81, 31, 34), Nouvelle-Aquitaine (33), Auvergne-Rhône-Alpes (69) et Île-de-France.
2. **Envoi du Diagnostic PDF A4 personnalisé & de la Trame BPU (09h30 – 11h30 : Zéro Pitch Commercial) :**
   - Génération du lien pré-calibré `https://idcc1351.fr/?societe=NOM_SOCIETE&siren=SIREN&ville=VILLE&profil=P01&hours=300&price=23` et du Rapport PDF A4.
   - Envoi d'un e-mail B2B nominatif sobre (conforme art. L.34-5 CPCE) : objet `[IDCC 1351 — Avenant n° 2] Simulation d'impact du plancher 6,0 h (JORF 05/06/2026) — [NOM_SOCIETE]`, présentant le surcoût de **`+393,75 € HT/mois`** (passage 25×12h $\rightarrow$ 50×6h sur 300 h) et offrant en accès libre la **Trame administrative de demande de réévaluation BPU** pour leurs donneurs d'ordres (avec mention d'opposition `STOP` en 1 clic).
3. **Appel de suivi Dirigeant à J+2 & Conversion Boutique SEPA (14h00 – 17h30, jours ouvrés 08h30–19h00) :**
   - Appel court (3 min) au Gérant/Président : vérification de l'impact du plancher 6,0 h et des tarifs nuit sur ses contrats en cours $\rightarrow$ bascule en **Audit Flash 15 min** sur un contrat réel $\rightarrow$ émission immédiate du Bon de Commande / Proforma A4 sur `https://idcc1351.fr/boutique/` payable par **Virement SEPA Express** (ou acompte 50 %) :
     - **Pack 1 (`690 € HT`)** : outillage autonome (Excel + Web + 6 Mémoires Word Avenant n° 2).
     - **Pack 2 (`980 € HT`, acompte `490 €`)** : suite COS Opérations + Copilote IA local BYOK + Atelier 2h.
     - **Pack 3 (`1 450 € HT`, acompte `725 €`)** : Commando Réponse AO 48h (1 lot $\le 15$ p., limité à 2 slots actifs).

### 6.3. Calendrier J1–J14 & Entonnoir mathématique conservateur

| Étape de l'entonnoir (J1 à J14 — 10 jours ouvrés) | Volume / Taux de conversion prudent | Résultat financier projeté à 14 jours |
| :--- | :--- | :--- |
| **1. Diagnostics PDF A4 personnalisés envoyés** | **`200` dirigeants (`20 / jour ouvré`)** | Coût d'acquisition : **`0,00 €`** (Régime F1). |
| **2. Lecture du PDF / Ouverture du lien pré-calibré** | **`80` dirigeants (`40 %`)** | Accès direct sans barrière e-mail au calculateur et à la trame BPU. |
| **3. Échanges qualifiés (Email / Appel J+2)** | **`20` dirigeants (`10 %` des ciblés)** | Qualification du besoin (renégociation BPU, structuration planning ou AO urgent). |
| **4. Audits Flash Dirigeant 15 min réalisés** | **`10` audits (`50 %` des échanges)** | Simulation en direct sur le BPU ou DPGF réel du prospect. |
| **5. Commandes signées (`20 % à 30 %` des audits)** | **`2 à 3` ventes fermes sur 14 jours** | • **Scénario Prudent (2 ventes : 1 Pack 1 + 1 Pack 2) :** **`1 670,00 € HT`** facturés (`1 180,00 €` encaissés dès la commande).<br>• **Scénario Médian (3 ventes : 1 Pack 1 + 1 Pack 2 + 1 Pack 3) :** **`3 120,00 € HT`** facturés (`1 905,00 €` encaissés dès la commande). |

---

## 7. FORMAT DE RÉPONSE OBLIGATOIRE ATTENDU DES AGENTS INDÉPENDANTS

Merci de livrer votre compte rendu final sur ce dossier `v3` auto-porteur en respectant **strictement** le gabarit ci-dessous :

```markdown
### COMPTE RENDU D'AUDIT FINAL (V3) — IDCC1351.FR & SECURIAXE (ENGAGEMENT SKIN IN THE GAME)
**Nom / Modèle de l'Agent Auditeur :** [Votre nom / modèle]
**Date de l'audit :** 24 novembre 2026
**Référence auditée :** REF-AUDIT-FINAL-IDCC1351-SECURIAXE-2026-v3 (Dossier auto-porteur Code & Textes intégraux)

#### 1. NOTATION PAR PILIER AUDITÉ (Sur 100)
1. **Architecture de marque, Statut EI (R.123-237 C. com.) & Confinement du nom personnel (LCEN art. 6-III-1) :** [  / 100 ] — Commentaire :
2. **Exactitude juridique & réglementaire (IDCC 1351, Avenant n° 2 Art. 1 & 2, Panier 4,48 €, Chien 1,41 €/1,68 €, CSI L.611-1/L.612-9, L.121-1 C. com., TVA 293 B CGI / L.223-3 CIBS, RGPD BYOK) :** [  / 100 ] — Commentaire :
3. **Moteur mathématique déterministe & 4 Scénarios étalons (-1 941,42 €, +393,75 €, Seuil P01 138,22 h, P07 +2 331 € / Seuil 106,02 h) :** [  / 100 ] — Commentaire :
4. **Tunnel de conversion, Livrables gratuits (PDF Comptable A4, Trame BPU) & Boutique B2B (Sécurité anti-fraude IBAN) :** [  / 100 ] — Commentaire :
5. **Qualité visuelle « Unslop », Accessibilité WCAG AAA, Sécurité `.htaccess` (HSTS/CSP) & Tests E2E Playwright :** [  / 100 ] — Commentaire :
6. **Stratégie d'exécution commerciale à 14 jours (Outbound B2B 20 PDF/jour, Entonnoir conservateur, CPCE L.34-5) :** [  / 100 ] — Commentaire :

**SCORE GLOBAL MOYEN :** **[    / 100 ]**

---

#### 2. VERDICT D'ENGAGEMENT « SKIN IN THE GAME » (Cochez UNE seule case)

- [ ] **GO SANS RÉSERVE — GARANTIE SKIN IN THE GAME (100/100 sur l'intégralité du périmètre audité)**
  *Déclaration d'engagement :* « J'ai vérifié l'apurement des 18 réserves du Tour 2, l'exactitude arithmétique des formules et des 4 scénarios, la conformité des textes juridiques/fiscaux/RGPD reproduits in extenso, la configuration de sécurité `.htaccess` et le réalisme de la stratégie Outbound à 14 jours. J'engage ma garantie d'auditeur indépendant : le dispositif `idcc1351.fr` + `Securiaxe` est validé GO SANS RÉSERVE pour sa mise en production et son exploitation commerciale immédiate. »

- [ ] **NO-GO SKIN IN THE GAME (Score < 100/100 — Correctifs bloquants requis)**
  *Déclaration d'engagement :* « Je refuse d'engager ma garantie de lancement tant que les écarts factuels démontrés ci-dessous ne sont pas corrigés. »

---

#### 3. SI NO-GO : PLAN DE CORRECTION CHIRURGICAL POUR ATTEINDRE 100 %
*(À remplir uniquement en cas de NO-GO)*

---

#### 4. DIRECTIVE TACTIQUE N° 1 POUR LES 14 PREMIERS JOURS D'EXPLOITATION
- [Votre recommandation d'exécution commerciale la plus rentable dès l'ouverture du serveur]
```
