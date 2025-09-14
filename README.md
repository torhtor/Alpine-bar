# Alpine Bar - Site Web Officiel

> Bar à cocktails d'exception au cœur d'Annecy - Ouverture Octobre 2025

## 📋 Vue d'ensemble

Site web professionnel pour Alpine Bar, conçu pour atteindre l'excellence et intégrer le classement des 500 meilleurs bars au monde d'ici 2027. Le site respecte rigoureusement les standards WCAG 2.1 niveau AA pour l'accessibilité.

## 🚀 Installation & Lancement

### Prérequis
- Docker et Docker Compose installés
- Navigateur moderne (Chrome, Firefox, Safari, Edge)

### Lancement avec Docker (Recommandé)
```bash
# Construire et démarrer le container
docker-compose up --build -d

# Accéder au site
open http://localhost:8081
```

### Développement local
```bash
# Servir avec Python (simple)
python -m http.server 8080

# Ou avec Node.js live-server
npx live-server --port=8080
```

## 🏗️ Architecture du Site

### Structure des fichiers
```
Alpine/
├── index.html              # Page d'accueil (FR)
├── menu.html               # Carte des cocktails (FR)
├── actualites.html         # Actualités et événements (FR)
├── findus.html             # Localisation et accès (FR)
├── contact.html            # Contact et équipe (FR)
├── header.html             # Header commun FR (chargé dynamiquement)
├── footer.html             # Footer commun FR (chargé dynamiquement)
├── styles.css              # CSS principal avec charte graphique
├── script.js               # JavaScript interactif FR
├── sitemap.xml             # SEO - Plan du site (FR + EN)
├── en/                     # Version anglaise du site
│   ├── index.html          # Homepage (EN)
│   ├── menu.html           # Menu page (EN)
│   ├── news.html           # News page (EN)
│   ├── location.html       # Find us page (EN)
│   ├── contact.html        # Contact page (EN)
│   ├── header.html         # Header commun EN
│   ├── footer.html         # Footer commun EN
│   └── script.js           # JavaScript interactif EN
├── CLAUDE.md               # Documentation technique complète
├── DOCKER.md               # Documentation Docker
└── logo/                   # Assets logos SVG
    ├── alpine-logo-vertical.svg
    ├── alpine-logo-horizontal.svg
    ├── alpine-pictogram.svg
    ├── alpine-logo-white.svg
    ├── alpine-logo-black.svg
    └── favicon.svg
```

## 🎨 Charte Graphique

### Couleurs Alpine (CSS Custom Properties)
```css
:root {
    --alpine-brown-light: #9C7A60;  /* Couleur principale */
    --alpine-brown-dark: #41352B;   /* Couleur secondaire */
    --alpine-black: #000000;        /* Texte principal */
    --alpine-white: #FFFFFF;        /* Contraste */
    --alpine-cream: #F8F6F3;        /* Fond alternatif */
}
```

### Typographie
- **Police principale** : Montserrat (Google Fonts)
- **Poids utilisés** : 300, 400, 500, 600, 700, 800
- **Hiérarchie** : H1 (3rem) > H2 (2.5rem) > H3 (1.8rem)

### Design System
- **Layout** : Cards sur fond foncé pour toutes les pages
- **Spacing** : Système cohérent (xs: 0.5rem → xxl: 4rem)
- **Border-radius** : 15-20px pour les cards principales
- **Shadows** : `0 20px 60px rgba(0, 0, 0, 0.4)`

## ♿ Accessibilité WCAG 2.1 - OBLIGATOIRE

### Standards implémentés
✅ **Navigation clavier complète**
- Skip links sur toutes les pages
- Focus visible personnalisé
- Tabindex et navigation Enter/Espace

✅ **Lecteurs d'écran optimisés**
- Labels ARIA sur tous les éléments interactifs
- Structure sémantique HTML5 complète
- Descriptions contextuelles invisibles (.sr-only)

✅ **Formulaires accessibles**
- Labels associés avec for/id
- Validation et feedback appropriés
- Role et aria-label sur chaque form

✅ **Contenu structuré**
- Hiérarchie des titres logique (H1 > H2 > H3)
- Rôles ARIA (banner, navigation, main, form)
- Images avec alt appropriés

### ⚠️ Règles à respecter ABSOLUMENT
```html
<!-- Élément cliquable accessible -->
<div role="button" tabindex="0" 
     onclick="action()" 
     onkeypress="if(event.key==='Enter'||event.key===' ')action()"
     aria-label="Description claire">

<!-- Formulaire accessible -->
<form role="form" aria-label="Description du formulaire">
  <label for="email-id">Email</label>
  <input type="email" id="email-id" required aria-label="Votre adresse email">
</form>

<!-- Navigation accessible -->
<nav role="navigation" aria-label="Navigation principale">
  <ul role="menubar">
    <li role="none"><a href="#" role="menuitem">Lien</a></li>
  </ul>
</nav>
```

## 🔍 SEO & Performance

### Optimisations implémentées
- **Meta tags** complets sur chaque page
- **Open Graph** et Twitter Cards
- **Données structurées** JSON-LD (Restaurant, Event, Location)
- **Sitemap.xml** pour indexation
- **Canonical URLs** pour éviter le duplicate content
- **Balises alt** optimisées pour les images

### Performance
- **Images SVG** vectorielles pour logos (légères et scalables)
- **CSS optimisé** avec custom properties
- **Fonts preconnect** pour chargement rapide
- **Minification** des assets en production

## 🍸 Contenu & Fonctionnalités

### Pages principales
1. **index.html** - Accueil avec vision et teasing menu cliquable
2. **menu.html** - Carte complète avec cocktails signatures Alpine + Christian Drouin
3. **actualites.html** - Timeline des actualités (ouverture, partenariats, recrutement)
4. **findus.html** - Localisation, transport, parking, points d'intérêt
5. **contact.html** - Équipe, vision, contact@alpine-bar.com, teasing localisation cliquable

### Version anglaise (dossier /en/)
1. **index.html** - Homepage with vision and clickable menu teaser
2. **menu.html** - Complete menu with Alpine signature cocktails + Christian Drouin
3. **news.html** - News timeline (opening, partnerships, recruitment)
4. **location.html** - Location, transport, parking, points of interest
5. **contact.html** - Team, vision, contact@alpine-bar.com, clickable location teaser

### Fonctionnalités interactives
- **Site bilingue** - Version française et anglaise complète
- **Carousel d'actualités** - Auto-rotation 10s, design newspaper sur homepage
- **Navigation active** - Indication de la page courante
- **Teasers cliquables** - Cards redirigeant vers pages détaillées
- **Formulaires newsletter** - Avec validation et accessibilité
- **Responsive design** - Mobile-first approach
- **Header/Footer dynamiques** - Chargés via JavaScript pour maintenance centralisée
- **Réseaux sociaux** - Lien Instagram @alpine_bar dans header et footer
- **SEO multilingue** - Balises hreflang et sitemap incluant FR/EN

## 🐳 Déploiement Docker

### Configuration optimisée
- **Image** : nginx:alpine (légère et sécurisée)
- **Port** : 8081 (configurable)
- **Logs** : Volume persistant dans ./logs/
- **Network** : Bridge isolé alpine-bar-network

### Commandes utiles
```bash
# Développement
docker-compose up --build
docker-compose logs -f alpine-bar-web

# Production
docker-compose up -d
docker-compose ps

# Maintenance
docker exec -it alpine-bar-site /bin/sh
docker-compose down -v  # Supprimer volumes
```

## 📞 Contact & Support

### Informations projet
- **Email** : contact@alpine-bar.com
- **Instagram** : [@alpine_bar](https://www.instagram.com/alpine_bar/)
- **Localisation** : 123 Rue des Alpes, 74000 Annecy
- **Ouverture prévue** : Octobre 2025

### Documentation technique
- **CLAUDE.md** - Documentation complète du projet et contexte
- **DOCKER.md** - Guide détaillé Docker avec troubleshooting
- **Charte graphique** - PDF avec spécifications design originales

## 🔄 Maintenance & Évolutions

### Standards à maintenir
1. **Accessibilité WCAG 2.1 AA** - Non négociable sur toute évolution
2. **SEO optimisé** - Meta tags et structured data à jour
3. **Design cohérent** - Respecter la charte graphique Alpine
4. **Performance** - Tests de vitesse réguliers
5. **Responsive** - Support mobile/tablet/desktop

### Workflow recommandé
1. Développer en local avec live-server
2. Tester l'accessibilité (Tab navigation, lecteur d'écran)
3. Valider le design sur mobile/desktop
4. Tester en environnement Docker
5. Vérifier le SEO (meta, structured data)
6. Déployer en production

---

**Alpine Bar** - L'excellence de la mixologie alpine depuis 2025 🏔️🍸