# 🛡️ Alpine Bar - Kit Essentiel Webmaster

## 🎯 Objectif : Zéro Problème pour l'Ouverture

**Philosophie :** Un site stable et fiable, sans risque pour la réputation du bar.

---

## ⚡ Actions Essentielles (2h de setup max)

### 1. 🔐 Backup & Versioning (30 min)
**Problème résolu :** Perte de code, modifications accidentelles

```bash
# Setup GitHub repository (backup automatique)
gh repo create alpine-bar-website --private
git remote add origin https://github.com/torhtor/alpine-bar-website.git
git push -u origin main --all
git push --tags
```

**Résultat :** Code sauvegardé, historique complet, rollback possible

### 2. 📊 Monitoring Basique (15 min)
**Problème résolu :** Site down sans que vous le sachiez

**UptimeRobot.com (gratuit) :**
- Surveillance 24/7
- Alertes email/SMS si problème
- Statistiques uptime

**Setup :**
1. Créer compte sur uptimerobot.com
2. Ajouter monitor : `https://www.alpine-bar.com`
3. Configurer alertes email

### 3. 🌐 CDN Gratuit (15 min)
**Problème résolu :** Site lent, surcharge serveur

**Cloudflare (gratuit) :**
- Accélération mondiale
- Protection DDoS
- Cache automatique

**Setup :**
1. Compte Cloudflare.com
2. Ajouter domaine alpine-bar.com
3. Changer DNS chez registrar

### 4. 🔍 SEO Monitoring (10 min)
**Problème résolu :** Perte de visibilité Google

**Google Search Console :**
1. search.google.com/search-console
2. Ajouter propriété alpine-bar.com
3. Vérifier avec meta tag

---

## 🚨 Workflow Anti-Catastrophe

### Avant Toute Modification
```bash
# 1. Créer branche de travail
git checkout -b fix/nom-du-changement

# 2. Tester localement
./serve.sh
# Vérifier : http://localhost:8080

# 3. Commit et merge sécurisé
git add .
git commit -m "fix: description du changement"
git checkout main
git merge fix/nom-du-changement
```

### Déploiement Sécurisé
```bash
# Script simple de déploiement
#!/bin/bash
echo "🔍 Vérifications pré-déploiement..."

# Check Analytics
if ! grep -q "G-49Z27M7V6G" index.html; then
    echo "❌ Analytics manquant - ARRÊT"
    exit 1
fi

# Check pages critiques
for page in index.html menu.html contact.html; do
    if [ ! -f "$page" ]; then
        echo "❌ $page manquant - ARRÊT"
        exit 1
    fi
done

echo "✅ Vérifications OK - Déploiement autorisé"
# Votre commande de déploiement ici
```

---

## 🎛️ Dashboard Webmaster (URLs Essentielles)

### Monitoring
- **Uptime :** https://uptimerobot.com/dashboard
- **Analytics :** https://analytics.google.com/
- **Search Console :** https://search.google.com/search-console
- **Cloudflare :** https://dash.cloudflare.com/

### Code
- **Repository :** https://github.com/torhtor/alpine-bar-website
- **Local :** http://localhost:8080 (./serve.sh)

---

## 🚑 Kit de Dépannage d'Urgence

### Site inaccessible
```bash
# 1. Vérifier le serveur
curl -I https://www.alpine-bar.com
# Code 200 = OK, autres = problème

# 2. Rollback rapide si nécessaire
git log --oneline -5  # voir derniers commits
git reset --hard HEAD~1  # revenir 1 commit en arrière
# puis redéployer
```

### Analytics ne fonctionne pas
```bash
# Vérifier présence du code
grep -r "G-49Z27M7V6G" *.html
# Doit apparaître dans toutes les pages

# Vérifier Consent Mode
grep -r "consent.*default" *.html
# Doit être présent
```

### Problème de performance
```bash
# Test de vitesse rapide
curl -w "@curl-format.txt" -o /dev/null -s https://www.alpine-bar.com

# Où curl-format.txt contient :
#      time_namelookup:  %{time_namelookup}\n
#         time_connect:  %{time_connect}\n
#      time_appconnect:  %{time_appconnect}\n
#     time_pretransfer:  %{time_pretransfer}\n
#        time_redirect:  %{time_redirect}\n
#   time_starttransfer:  %{time_starttransfer}\n
#                      ----------\n
#           time_total:  %{time_total}\n
```

---

## 📋 Checklist Pré-Ouverture

### 2 Semaines Avant Ouverture
- [ ] Repository GitHub configuré et synchronisé
- [ ] UptimeRobot monitoring actif
- [ ] Google Analytics trackant les visiteurs
- [ ] Search Console configuré
- [ ] Cloudflare CDN actif
- [ ] Tests sur mobile/desktop OK

### 1 Semaine Avant Ouverture  
- [ ] Backup complet du site
- [ ] Test de tous les liens (internes/externes)
- [ ] Vérification formulaires de contact
- [ ] Test cookie banner sur différents navigateurs
- [ ] Vérification horaires/infos contact à jour

### Jour J-1
- [ ] Site accessible et rapide
- [ ] Analytics remonte du trafic
- [ ] Aucune erreur dans Search Console
- [ ] Mobile responsive parfait
- [ ] Backup de sécurité fait

---

## 💰 Coût Total : 0€

Tous ces outils sont **gratuits** et suffisants pour une gestion professionnelle :
- GitHub : gratuit (repo privé)
- UptimeRobot : gratuit (50 monitors)
- Cloudflare : gratuit (CDN illimité)
- Google tools : gratuits

---

## 📞 Contacts d'Urgence

**Si problème technique critique :**
1. Vérifier UptimeRobot dashboard
2. Check Cloudflare status
3. Consulter logs serveur si accessible
4. Rollback Git en dernier recours

**Numéros utiles :**
- Support hébergeur : [à compléter]
- Registrar domaine : [à compléter]

---

*"Un site simple qui fonctionne vaut mieux qu'un site complexe qui plante"*