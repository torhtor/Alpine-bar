# Alpine Bar - Releases

Ce dossier contient toutes les versions officielles du site Alpine Bar, prêtes pour le déploiement en production.

---

## 📦 Versions Disponibles

### [v2.0.0](v2.0.0/) - **VERSION ACTUELLE** 🎉
**Date** : 15 octobre 2024
**Statut** : Production - Pré-ouverture
**Taille** : 7.4 MB

**Highlights :**
- 🎉 Annonce ouverture : 7 novembre 2025
- 🍸 Carte Saison Hiver 2025 complète
- ✨ Section Cocktails Premiums (4 nouveaux)
- 🍽️ Section Plats à Partager (7 créations)
- 🎨 Harmonisation complète des espacements
- 🔧 Redirections 301 configurées

[📄 Lire la documentation complète](v2.0.0/README.md)

---

### [v1.0.0](v1.0.0/) - Lancement Initial
**Date** : 18 septembre 2024
**Statut** : Archivée (remplacée par v2.0.0)
**Taille** : 907 KB

**Highlights :**
- 🚀 Lancement initial du site
- 🍸 Menu original (6 cocktails signatures)
- 🔍 SEO & Analytics configurés
- 🔒 Sécurité RGPD complète
- 🌐 Site multilingue FR/EN

[📄 Lire la documentation complète](v1.0.0/README.md)

---

## 📋 Changelog Complet

Consultez le [CHANGELOG.md](CHANGELOG.md) pour voir toutes les modifications détaillées entre les versions.

---

## 🚀 Installation Rapide

### Déployer la dernière version

```bash
# 1. Télécharger la v2.0.0
cd releases/v2.0.0

# 2. Extraire l'archive
unzip alpine-bar-v2.0.0.zip

# 3. Déployer sur le serveur
rsync -avz alpine-bar-v2.0.0/ user@server:/var/www/alpine-bar/

# 4. Configurer les permissions
chmod -R 755 /var/www/alpine-bar/
```

### Rollback vers v1.0.0

```bash
# 1. Backup de la version actuelle
mv /var/www/alpine-bar /var/www/alpine-bar.backup

# 2. Restaurer v1.0.0
cd releases/v1.0.0
unzip alpine-bar-v1.0.0.zip
rsync -avz alpine-bar-v1.0.0/ /var/www/alpine-bar/
```

---

## 🏗️ Structure des Releases

Chaque version contient :
- **Archive ZIP** : Code source complet
- **README.md** : Documentation détaillée
- **Checklist** : Tests de validation
- **Notes de migration** : Si applicable

---

## 📊 Comparaison des Versions

| Fonctionnalité | v1.0.0 | v2.0.0 |
|----------------|--------|--------|
| **Pages HTML** | 12 | 12 |
| **Cocktails Total** | 6 | 10 |
| **Sections Menu** | 6 | 8 |
| **Plats** | ❌ | ✅ 7 |
| **Annonce Ouverture** | ❌ | ✅ 7 nov 2025 |
| **Redirections 301** | ❌ | ✅ .htaccess |
| **Performance Mobile** | 90+ | 92+ |
| **Taille Archive** | 907 KB | 7.4 MB |

---

## 🎯 Versioning Sémantique

Ce projet suit le [Semantic Versioning 2.0.0](https://semver.org/lang/fr/)

**Format** : `MAJOR.MINOR.PATCH`

- **MAJOR** : Changements incompatibles (breaking changes)
- **MINOR** : Nouvelles fonctionnalités (rétrocompatibles)
- **PATCH** : Corrections de bugs

### Exemples
- `1.0.0` → `2.0.0` : Refonte majeure de la carte
- `2.0.0` → `2.1.0` : Ajout système de réservation
- `2.1.0` → `2.1.1` : Correction bug formulaire contact

---

## 🔖 Tags Git

Toutes les releases sont taguées dans Git :

```bash
# Lister tous les tags
git tag -l

# Checkout une version spécifique
git checkout v2.0.0

# Créer un nouveau tag
git tag -a v2.0.0 -m "Release v2.0.0: Carte Hiver 2025"
git push origin v2.0.0
```

---

## 📦 Créer une Nouvelle Release

### Processus

1. **Développement** sur branche feature
2. **Tests** complets (checklist)
3. **Merge** vers main
4. **Tag** la version
5. **Archive** le code
6. **Documentation** README + CHANGELOG
7. **Publication**

### Commandes

```bash
# 1. Créer le tag
git tag -a v2.1.0 -m "Release v2.1.0: Description"

# 2. Créer l'archive
mkdir -p releases/v2.1.0
git archive --format=zip --prefix=alpine-bar-v2.1.0/ v2.1.0 \
    -o releases/v2.1.0/alpine-bar-v2.1.0.zip

# 3. Créer la documentation
cp releases/v2.0.0/README.md releases/v2.1.0/README.md
# Éditer le README avec les nouvelles infos

# 4. Mettre à jour le CHANGELOG
# Ajouter la nouvelle section en haut du fichier

# 5. Commit et push
git add releases/
git commit -m "release: v2.1.0"
git push origin main --tags
```

---

## 📞 Support

**Questions techniques** : contact@alpine-bar.com
**Documentation projet** : Voir `CLAUDE.md` à la racine
**Issues GitHub** : https://github.com/torhtor/Alpine-bar/issues

---

## 🗓️ Roadmap

### v2.1.0 (Novembre 2025) - Post-ouverture
- Système de réservation en ligne
- Galerie photos du bar
- Cartes Event activées
- Programme fidélité

### v3.0.0 (2026) - Évolution majeure
- Refonte complète design
- Application web progressive (PWA)
- Menu interactif avec filtres
- Back-office gestion

---

## 📜 Licence

Copyright © 2024-2025 Alpine Bar. Tous droits réservés.

---

**Dernière mise à jour** : 15 octobre 2024
**Version actuelle** : 2.0.0
**Prochaine release** : 2.1.0 (Novembre 2025)
