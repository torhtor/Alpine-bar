# 🔄 Git Workflow - Alpine Bar Website

## 📋 Structure des Branches

### 🌿 **main** (Production)
- **Usage** : Code en production sur www.alpine-bar.com
- **Protection** : ⚠️ Jamais de commit direct
- **Déploiement** : Automatique vers la production
- **Merge depuis** : `staging` uniquement

### 🧪 **staging** (Pré-production)  
- **Usage** : Tests finaux avant mise en production
- **URL de test** : staging.alpine-bar.com (si configuré)
- **Tests requis** : SEO, Analytics, Cookie banner, Responsive
- **Merge depuis** : `develop` après validation

### 🛠️ **develop** (Développement)
- **Usage** : Intégration continue des nouvelles features
- **Branche par défaut** pour le développement
- **Tests** : Fonctionnalités, compatibilité navigateurs
- **Merge depuis** : Feature branches

### 🚨 **hotfix** (Correctifs urgents)
- **Usage** : Corrections critiques en production
- **Créée depuis** : `main`
- **Merge vers** : `main` ET `develop`
- **Exemples** : Bug Analytics, erreur 404, problème RGPD

---

## 🔄 Workflow de Développement

### ✨ Nouvelle Feature
```bash
# 1. Créer une branche depuis develop
git checkout develop
git pull origin develop
git checkout -b feature/nom-de-la-feature

# 2. Développer et commiter
git add .
git commit -m "feat: description de la feature

- Détail 1
- Détail 2

🤖 Generated with Claude Code"

# 3. Merge vers develop
git checkout develop
git merge feature/nom-de-la-feature
git branch -d feature/nom-de-la-feature
```

### 🧪 Déploiement Staging
```bash
# Depuis develop vers staging
git checkout staging
git merge develop
# Tests complets sur staging
```

### 🚀 Déploiement Production
```bash
# Depuis staging vers main (après validation)
git checkout main
git merge staging
git tag -a v1.1.0 -m "Release v1.1.0: description"
```

### 🚨 Hotfix Urgent
```bash
# 1. Créer depuis main
git checkout main
git checkout -b hotfix/description-courte

# 2. Corriger et commiter
git commit -m "hotfix: description du correctif"

# 3. Merge vers main ET develop
git checkout main
git merge hotfix/description-courte
git checkout develop
git merge hotfix/description-courte
```

---

## 📝 Convention de Messages de Commit

### Format Standard
```
type(scope): description courte

Description détaillée optionnelle

🤖 Generated with Claude Code
```

### Types de Commits
- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `style:` Changements CSS/design
- `seo:` Améliorations SEO
- `analytics:` Modifications Google Analytics
- `content:` Mise à jour contenu (menu, actualités)
- `config:` Configuration serveur/deployment
- `docs:` Documentation
- `chore:` Maintenance, outils

### Exemples
```bash
feat(menu): add new seasonal cocktail "Winter Spice"

- Added ingredients and description
- Updated pricing section
- Translated to English version

fix(analytics): correct cookie consent mode configuration

- Set default consent to 'denied'
- Added missing ad_user_data parameter
- Fixed consent update timing

style(mobile): improve responsive design for tablets

- Adjusted breakpoints for 768px screens
- Fixed menu card layout on iPad
- Enhanced touch interactions
```

---

## 🔧 Commandes Utiles

### Vérifications Avant Commit
```bash
# Vérifier les modifications
git status
git diff

# Tester le site localement
./serve.sh
# Ouvrir http://localhost:8080

# Vérifier Analytics (F12 → Console)
# Vérifier Cookie Banner
# Tester responsive design
```

### Nettoyage
```bash
# Supprimer les branches mergées
git branch --merged | grep -v "\*\|main\|develop" | xargs -n 1 git branch -d

# Voir l'historique proprement
git log --oneline --graph --all
```

### Synchronisation Remote (si configuré)
```bash
# Push toutes les branches
git push origin main develop staging

# Push avec tags
git push origin main --tags
```

---

## 🎯 Bonnes Pratiques

### ✅ À Faire
- **Toujours tester localement** avant commit
- **Messages descriptifs** avec contexte
- **Une feature = une branche** (courte durée)
- **Merger fréquemment** develop → staging → main
- **Tagger les releases** pour suivi versions
- **Vérifier Analytics** après chaque modification

### ❌ À Éviter
- Commits directs sur `main`
- Messages vagues ("fix", "update")
- Branches qui traînent longtemps
- Modifications simultanées sur plusieurs scopes
- Oublier les tests cross-browser
- Casser la conformité RGPD

---

## 🚀 Checklist Déploiement

### Avant Staging
- [ ] Tests locaux OK (http://localhost:8080)
- [ ] Cookie banner fonctionne
- [ ] Google Analytics tracke correctement
- [ ] Responsive design testé
- [ ] Pas d'erreurs console (F12)
- [ ] SEO validé (balises meta, structured data)

### Avant Production
- [ ] Tests staging complets
- [ ] Performance acceptable (<3s load)
- [ ] Analytics remonte des données
- [ ] Conformité RGPD maintenue
- [ ] Backup de la version précédente
- [ ] DNS/CDN configurés si applicable

---

## 📞 Support

**Questions Git/Workflow :** torhtor@tutanota.com  
**Issues techniques :** Voir README.md  
**Urgence production :** Utiliser `hotfix` workflow

---

*Dernière mise à jour : $(date +"%d/%m/%Y")*