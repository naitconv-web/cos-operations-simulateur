# STRATÉGIE D'EXÉCUTION COMMERCIALE À 14 JOURS — IDCC1351.FR & SECURIAXE (VERSION V4 CERTIFIÉE)

## 6. STRATÉGIE D'EXÉCUTION COMMERCIALE À 14 JOURS (`STRAT-14J-IDCC1351-SECURIAXE-2026-v4`)

### 6.1. Prérequis technique J1 (Délivrabilité DNS `SPF / DKIM / DMARC` sur o2switch)
Avant le premier envoi d'e-mail en J1 :
1. Déploiement de `pack-o2switch-securiaxe.zip` sur o2switch (`https://idcc1351.fr` et `https://idcc1351.fr/boutique/`).
2. Création de la boîte professionnelle **`contact@idcc1351.fr`** sur o2switch et activation dans cPanel (`Email Deliverability`) des 3 enregistrements DNS d'authentification :
   - **`SPF` :** `v=spf1 a mx include:_spf.o2switch.net ~all`
   - **`DKIM` :** clé RSA 2048 bits signant `default._domainkey.idcc1351.fr`
   - **`DMARC` :** `_dmarc.idcc1351.fr` $\rightarrow$ `v=DMARC1; p=quarantine; rua=mailto:contact@idcc1351.fr`
   *(Optimise l'authentification technique et la délivrabilité face aux filtres anti-spam B2B avec montée en charge progressive / warm-up de 20 envois ciblés par jour, sans promesse de boîte principale absolue).*

### 6.2. Protocole quotidien « Opération 20 Diagnostics PDF / Jour » (100 % Outbound B2B, 0 illusion SEO)
1. **Ciblage quotidien (20 dirigeants / jour ouvré sur 10 jours ouvrés = 200 dirigeants `NAF 80.10Z`) :**
   - *Priorité 1 (10 cibles/jour — Urgence Renouvellement BOAMP / PLACE `< 60–90 jours`) :* entreprises de sécurité privée (`CPV 79710000-4`, `79713000-5`) dont un marché arrive à renouvellement ou qui soumissionnent en cours.
   - *Priorité 2 (10 cibles/jour — Proximité Régionale Occitanie `81/31/34` puis Grand Sud) :* PME de 10 à 150 salariés extraites de l'Annuaire des Entreprises (`api.gouv.fr` / SIRENE) et annuaires publics de branche.
2. **Envoi J0 du Diagnostic PDF A4 & de la Trame BPU (Zéro Pitch Commercial, conforme art. L.34-5 CPCE) :**
   - **Objet :** `[IDCC 1351 — Avenant n° 2] Simulation d'impact du plancher 6,0 h (hypothèses modifiables) — [NOM_SOCIETE]`
   - **Contenu :** envoi du PDF A4 personnalisé et du lien `https://idcc1351.fr/?societe=[NOM_SOCIETE]&siren=[SIREN]` présentant la simulation indicative du fractionnement `25×12h -> 50×6h` (`+393,75 €/mois` selon les paramètres de panier à `5,00 €` et de trajet à `10,00 €` modifiables en ligne) ainsi que la perte sur tarif nuit à `23,00 €/h` (`-1 821,55 €/mois` à `50,37 %` de charges, ou `-880 €` à `-1 140 €/mois` après allègements RGCP/Fillon à `30–35 %`), avec accès gratuit à la **Trame administrative de demande de réévaluation BPU**.
   - **Conformité RGPD Art. 14 & CPCE Art. L.34-5 :** mention explicite de la source publique (SIRENE/BOAMP), de l'intérêt légitime B2B, du lien vers `cgv-rgpd.html` et désinscription immédiate et gratuite par simple réponse `STOP` (purge à 30 jours).
3. **Suivi à J+2 / J+3 & Recette sur Bulletin Réel (15 min) :**
   - Relance sobre à J+2/J+3 (par **second e-mail personnalisé + message LinkedIn B2B**, ou appel court de courtoisie entre 08h30 et 19h00 sur les contacts ayant consulté leur lien pré-calibré) proposant de **recalibrer gratuitement le moteur en 15 minutes sur 1 à 3 bulletins de paie réels anonymisés de l'entreprise**.
   - Émission du Bon de Commande / Proforma A4 sur `https://idcc1351.fr/boutique/` payable par Virement SEPA sur le RIB officiel Securiaxe (SIREN `849 261 870`).

### 6.3. Hypothèses commerciales de travail à 14 jours (Fourchette Basse / Prudente / Médiane & Plan B à J+7)
*(Conformément aux règles de rigueur épistémique, les taux ci-dessous constituent des **hypothèses commerciales cibles de travail** à tester par l'exécution J1–J14, et non des prévisions garanties).*

| Scénario d'exécution (sur 200 dirigeants contactés en 14 jours) | Réponses / Échanges qualifiés | Audits 15 min sur bulletin réel | Commandes signées (Hypothèse de travail) | Chiffre d'affaires HT facturé (et encaissé à la commande) |
| :--- | :-: | :-: | :-: | :--- |
| **Scénario Plancher Bas (Conservateur strict — 2 % à 3 % de réponse)** | `4 à 6` réponses | `3` audits | **`1` vente ferme** (`Pack 1` ou `Pack 2`) | **`690,00 € à 980,00 € HT`** (`490 €` à `690 €` encaissés immédiatement) |
| **Scénario Prudent Cible (5 % à 10 % de réponse)** | `10 à 20` réponses | `6 à 10` audits | **`2` ventes fermes** (`1 Pack 1 + 1 Pack 2`) | **`1 670,00 € HT`** (`1 180,00 €` encaissés dès la commande) |
| **Scénario Médian Haut (avec 1 urgence AO Pack 3)** | `20` réponses | `10` audits | **`3` ventes fermes** (`Pack 1 + Pack 2 + Pack 3`) | **`3 120,00 € HT`** (`1 905,00 €` encaissés dès la commande) |

- **Clause de Plan B automatique à J+7 :** Si le nombre d'échanges qualifiés à J+7 (après les 100 premiers envois) est inférieur à `5`, bascule immédiate de 100 % du volume de la Semaine 2 sur deux segments exclusifs : **(a)** les entreprises dont un marché public BOAMP (`CPV 79710000-4`) arrive à échéance sous 60 à 90 jours, et **(b)** les PME de sécurité privée situées en **Occitanie (`81 / 31 / 34`)** avec proposition d'atelier sur site autour d'Albi/Toulouse.

---

## 7. FORMAT DE RÉPONSE OBLIGATOIRE ATTENDU DES AGENTS INDÉPENDANTS

Merci de livrer votre compte rendu final sur ce dossier `v4` auto-porteur en respectant **strictement** le gabarit ci-dessous :

```markdown
### COMPTE RENDU D'AUDIT FINAL (V4) — IDCC1351.FR & SECURIAXE (ENGAGEMENT SKIN IN THE GAME)
**Nom / Modèle de l'Agent Auditeur :** [Votre nom / modèle]
**Date de l'audit :** 24 novembre 2026
**Référence auditée :** REF-AUDIT-FINAL-IDCC1351-SECURIAXE-2026-v4 (Dossier auto-porteur Code 284 lignes & Textes intégraux)

#### 1. NOTATION PAR PILIER AUDITÉ (Sur 100)
1. **Architecture de marque, Preuve RDAP AFNIC, Statut EI (L.526-22, R.526-27 & R.123-237 C. com.) & Confinement LCEN :** [  / 100 ] — Commentaire :
2. **Exactitude juridique & réglementaire (Citations Légifrance Avenant n° 2 Art. 1 & 2, Accord 01/04/2021, Panier 4,48 €, Chien 1,41 €/1,68 €, CSI L.611-1/L.612-9/L.612-20, Suppression L.121-1 C. com. -> C. civ. 1104/1112-1, TVA 293 B CGI, RGPD BYOK) :** [  / 100 ] — Commentaire :
3. **Moteur mathématique intégral (284 lignes) & 4 Scénarios (-1 821,55 € + sensibilité 30-50 %, +393,75 € décomposé 131,25 € + 262,50 €, Source unique P01 12,42 € brut / 19,50 € chargé, Seuils 138,22 h et 106,02 h) :** [  / 100 ] — Commentaire :
4. **Tunnel de conversion, Livrables gratuits (PDF Comptable A4, Trame BPU 100 % remplie) & Boutique B2B (Sécurité anti-fraude IBAN) :** [  / 100 ] — Commentaire :
5. **Qualité visuelle « Unslop », `.htaccess` complet (HSTS + Content-Security-Policy), Empreintes SHA-256 & Tests E2E Playwright :** [  / 100 ] — Commentaire :
6. **Stratégie d'exécution commerciale à 14 jours (DNS SPF/DKIM/DMARC, Fourchette d'hypothèses 1 à 3 ventes, Plan B J+7, CPCE L.34-5) :** [  / 100 ] — Commentaire :

**SCORE GLOBAL MOYEN :** **[    / 100 ]**

---

#### 2. VERDICT D'ENGAGEMENT « SKIN IN THE GAME » (Cochez UNE seule case)

- [ ] **GO SANS RÉSERVE — GARANTIE SKIN IN THE GAME (100/100 sur l'intégralité du périmètre audité)**
  *Déclaration d'engagement :* « J'ai vérifié l'apurement des 10 écarts du Tour 3, le code source intégral de 284 lignes de `calculator-engine.js`, l'exactitude arithmétique des 4 scénarios (dont le Scénario 1 à -1 821,55 € et sa sensibilité 30-50 %), la suppression de l'art. L.121-1 C. com., la présence de la CSP dans `.htaccess` et le réalisme de la stratégie à 14 jours. J'engage ma garantie d'auditeur indépendant : le dispositif `idcc1351.fr` + `Securiaxe` est validé GO SANS RÉSERVE pour sa mise en production et son exploitation commerciale immédiate. »

- [ ] **NO-GO SKIN IN THE GAME (Score < 100/100 — Correctifs bloquants requis)**
  *Déclaration d'engagement :* « Je refuse d'engager ma garantie de lancement tant que les écarts factuels démontrés ci-dessous ne sont pas corrigés. »

---

#### 3. SI NO-GO : PLAN DE CORRECTION CHIRURGICAL POUR ATTEINDRE 100 %
*(À remplir uniquement en cas de NO-GO)*

---

#### 4. DIRECTIVE TACTIQUE N° 1 POUR LES 14 PREMIERS JOURS D'EXPLOITATION
- [Votre recommandation d'exécution commerciale prioritaire dès l'ouverture du serveur]
```
