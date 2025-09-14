# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Contexte du projet

Alpine Bar - Bar à cocktails de niveau professionnel visant le top 500 world bars
- Localisation : Annecy, Haute-Savoie, Alpes françaises  
- Ouverture prévue : début octobre
- Objectif : Excellence et ambition professionnelle
- URL : www.alpine-bar.com
- Contact : contact@alpine-bar.com

## Charte graphique

### Logo
- Logo principal : Pictogramme inspiré des lettres A et E (formes de gouttes)
- Versions : verticale (référence), horizontale, picto seul
- Taille minimum : 2cm en impression
- Zone de protection obligatoire

### Couleurs
- Primaire claire : #9C7A60 (marron clair)
- Primaire foncée : #41352B (marron foncé) 
- Noir : #000000
- Blanc : #FFFFFF

### Typographie
- Site web : Montserrat (regular, italic, bold, black) - priorité pour lisibilité
- Enseignes : Baskerville Old Face
- Support print : Montserrat également 


## Menu complet

### Cocktails signatures
- ALPINE SPRITZ (Génépi, vermouth, crémant de Savoie) - 12€
- RED CLOVER (Gin Altitude, vermouth, framboise) - 13€
- CROSSBILL (Eau-de-vie seigle, gentiane, cerise) - 13€
- REBLOCHON TART (Vodka poire, reblochon, miel) - 14€
- MONT BLANC (Distillat pistache, chocolat blanc) - 14€
- GOLDEN EAGLE (Whisky Indigène, cognac, amaretto) - 15€

### Collaboration Christian Drouin (Calvados)
- HIGHBALL CONTEST - 12€
- JAMAICAN CAFE CALVA - 13€
- BOURDALOUE - 13€
- FALL FASHIONED - 14€
- Plateau dégustation calvados - 16€

### Vins & Bières locales
- Sélection de vins de Savoie (Chignin, Mondeuse, Crémant)
- Bières artisanales (Galibier, Ibex)

## Exigences techniques

### SEO ultra-performant requis
- Balises meta complètes
- Structured data (JSON-LD)
- Sitemap XML
- Optimisation images
- Temps de chargement <3s
- Mobile-first obligatoire

### Architecture technique
- Site statique HTML/CSS/JS pur (pas de frameworks lourds)
- Header partagé via fetch
- Responsive design avec breakpoints 768px et 480px
- Fonte principale : Montserrat via Google Fonts

## Development Workflow

### Local Development
- This is a static site that can be served with any HTTP server
- For local testing: `python -m http.server 8000` or similar
- No build process or package manager required

### Content Management
- Pages are in French language but english is a plus.
- Multi-language selector present but not functional yet
- Footer copyright shows 2024/2025 (inconsistent across pages) --> variable à appliquer pour un footer dynamique.

### Styling Notes
- Color scheme: Dark header (#333), Alpine green (#2f4f4f), accent yellow (#f9d342)
- Mobile breakpoints: 768px and 480px
- Logo sizing: 100px width, auto height
- Custom form styling with hover effects

## Configuration SEO & Analytics (TERMINÉE)

### Google Analytics 4 - ACTIF ✅
- ID Tracking : G-49Z27M7V6G
- Implémentation : Consent Mode complet (RGPD compliant)
- Configuration : Anonymisation IP activée
- Consentement par défaut : Refusé (conforme RGPD)
- Script présent sur toutes les 12 pages (FR/EN)
- Cookie banner fonctionnel avec contrôle du consentement

### Google Search Console - VALIDÉ ✅
- Propriété vérifiée : www.alpine-bar.com
- Méta balise de vérification : DAVaD75AmrHSjjC6YknH1gud0obya5649CcS_fwbzRU
- Présente sur toutes les pages HTML
- Sitemap XML soumis et accepté par Google
- 12 URLs découvertes et en cours d'indexation

### Structure de Production ✅
- Dossier `/production-ready/` avec 26 fichiers essentiels uniquement
- Script `prepare-production.sh` pour déploiement propre
- Séparation claire développement/production
- Site déployé et fonctionnel sur www.alpine-bar.com

### Configuration Cookies & RGPD ✅
- Banner de cookies conforme RGPD
- Gestion du consentement via gtag
- Politique de confidentialité complète (FR/EN)
- Droits utilisateurs explicités
- Durée de conservation précisée

### SEO Technique ✅
- Sitemap XML avec 12 pages principales
- Structured data (JSON-LD) sur toutes les pages
- Meta tags Open Graph complets
- Balises canonical et hreflang
- Optimisation mobile-first
- Accessibilité WCAG 2.1

## État Actuel du Site

✅ **TERMINÉ - Site en production** :
- 6 pages françaises + 6 pages anglaises
- Analytics et Search Console configurés
- Structure professionnelle déployée
- Monitoring SEO actif

🔄 **Évolution naturelle attendue** :
- Indexation Google : 3-7 jours
- Premières données Analytics : 24-48h
- Référencement naturel : 1-2 semaines

⚠️ **Points d'attention** :
- Language selector présent mais non-fonctionnel (cosmétique)
- Horaires d'ouverture : indicatifs jusqu'à octobre 2025
- Contenu : focus sur teasing pré-ouverture

- rappelle toi de toujours suivre la conformité WCAG 2.1