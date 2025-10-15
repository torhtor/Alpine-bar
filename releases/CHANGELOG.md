# Changelog - Alpine Bar Website

Toutes les modifications notables de ce projet sont documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

---

## [2.0.0] - 2025-10-15

### 🎉 Annonce Majeure
- **Ouverture officielle : Vendredi 7 Novembre 2025**

### ✨ Ajouté
- **Annonce d'ouverture** sur toutes les pages d'accueil (FR/EN)
- **Carte Saison Hiver 2025** : Collection Christian Drouin
  - Highball Contest (12€)
  - Jamaican Cafe Calva (13€)
  - Bourdaloue (13€)
  - Fall Fashioned (14€) - nouvelle recette châtaigne
  - Plateau Dégustation Calvados (16€)

- **Section Cocktails Premiums** (nouvelle)
  - Alpine Martini (14€)
  - Natsukashii (14€)
  - Magellan (15€)
  - Golden Eagle (15€) - recette améliorée

- **Section Plats à Partager** (nouvelle)
  - Planche de Charcuterie (15€)
  - Planche de Fromage (15€)
  - Planche Mixte (20€)
  - Minis Croques Raclette (prix à venir)
  - Tartiflette Déstructurée (prix à venir)
  - Tartelettes Courge-Diot (prix à venir)
  - Meringues Crème de Châtaigne (prix à venir)

### 🔄 Modifié
- **Cocktails Signatures** - Refonte complète
  - Alpine Spritz : nouvelle recette avec vermouth Bianco
  - Pink Shady : remplace Red Clover
  - Hanging Garden : remplace Crossbill
  - In Da Wood : remplace Mont Blanc
  - Reblochon Tart : base rhum au lieu de vodka, nouveau prix 13€
  - Hot Choc-Tail : nouveau cocktail servi chaud (13€)

- **Mocktails** - Mise à jour des prix et recettes
  - Green Detox : nouvelle recette cardamome/érable (7€)
  - Tropical Storm : 8€ (au lieu de 7€)
  - Bleeding Heart : 8€ (au lieu de 7€)
  - Purple Cloud : remplace Liquid Pastry (8€)

### 🎨 Style
- Harmonisation complète des espacements dans le menu
- Suppression des padding `p-4` des sous-titres
- Ajout de margins cohérents (`mb-4`, `mt-8`)
- Amélioration de la cohérence desktop/mobile

### 🔧 Technique
- Ajout fichier `.htaccess` avec redirections 301
- Configuration SEO optimisée pour index.html → /
- Synchronisation parfaite versions FR/EN

### 📰 Actualités
- Article collaboration Kian Seoul
- Voyage initiatique en Asie (Japon/Corée)
- Section actualités intégrée à la page d'accueil

---

## [1.0.0] - 2024-09-18

### 🚀 Lancement Initial

#### ✨ Fonctionnalités principales
- **Site multilingue** (Français/Anglais)
- **6 pages françaises** : Accueil, Menu, Actualités, Nous Trouver, Contact, Politique de confidentialité
- **6 pages anglaises** : traductions complètes

#### 🍸 Menu Original
- **Alpine × Christian Drouin**
  - 5 cocktails de saison
  - Plateau dégustation calvados

- **Cocktails Signatures**
  - Alpine Spritz (12€)
  - Red Clover (13€)
  - Crossbill (13€)
  - Reblochon Tart (14€)
  - Mont Blanc (14€)
  - Golden Eagle (15€)

- **Mocktails** (4 créations)
- **Bières & Vins** locaux
- **Apéritifs** (Vermouths, Liqueurs)
- **Spiritueux** (Gins, Whiskys, Rhums, Tequilas, Cognac & Calvados)

#### 🎨 Design System Alpine v1
- Charte graphique complète
- Couleurs primaires : #9C7A60 (marron clair), #41352B (marron foncé)
- Typographie : Montserrat
- Design responsive mobile-first

#### 🔍 SEO & Analytics
- **Google Analytics 4** : Tracking complet avec consent mode RGPD
- **Google Search Console** : Propriété vérifiée
- **Sitemap XML** : 12 pages indexées
- **Structured Data** (JSON-LD) : Toutes les pages
- **Meta tags** Open Graph complets
- **Balises canonical** et hreflang

#### 🔒 Sécurité
- Headers HTTP sécurisés
- CSP (Content Security Policy)
- Protection CSRF
- Cookie banner RGPD compliant
- Politique de confidentialité complète

#### 📦 Structure de Production
- Dossier `/production-ready/` optimisé
- Script `prepare-production.sh` automatisé
- 26 fichiers essentiels uniquement

#### 🌐 Informations Business
- Localisation : Galerie des Sorbiers, 13 Rue Royale, Annecy
- Contact : contact@alpine-bar.com
- Instagram : @alpine.bar.annecy
- Ouverture prévue : Octobre 2025

---

## Structure des Releases

```
releases/
├── v1.0.0/
│   ├── alpine-bar-v1.0.0.zip
│   └── README.md
├── v2.0.0/
│   ├── alpine-bar-v2.0.0.zip
│   └── README.md
└── CHANGELOG.md (ce fichier)
```

---

## Notes de Migration

### De v1.0.0 à v2.0.0

**⚠️ Changements Breaking :**
- Certains cocktails signatures ont été supprimés (Red Clover, Crossbill, Mont Blanc)
- Nouvelle structure de prix pour certains produits
- Mocktails : changement de prix (7€ → 8€ pour la plupart)

**✅ Compatibilité :**
- Toutes les URLs restent identiques
- Structure HTML compatible
- Design system v2 rétrocompatible
- Pas de migration de base de données nécessaire

**🔄 Actions Requises :**
1. Mettre à jour le `.htaccess` en production
2. Vérifier les redirections 301
3. Tester l'affichage mobile des nouveaux espacements
4. Valider les nouveaux prix avec l'équipe

---

## Contributeurs

- **Development** : Claude Code (Anthropic)
- **Content & Strategy** : Équipe Alpine Bar
- **Design** : Alpine Bar Design System

---

## Licence

Copyright © 2024-2025 Alpine Bar. Tous droits réservés.
