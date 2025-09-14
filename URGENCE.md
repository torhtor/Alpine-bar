# 🚨 ALPINE BAR - PROCÉDURES D'URGENCE

## Site Inaccessible

### Diagnostic Rapide
```bash
# Test simple
curl -I https://www.alpine-bar.com

# 200 = OK
# 500/502/503 = Problème serveur  
# Timeout = Problème réseau/DNS
```

### Actions Immédiates
1. **Vérifier UptimeRobot dashboard** (si configuré)
2. **Contacter hébergeur** si problème serveur
3. **Rollback Git si bug récent :**
   ```bash
   git log --oneline -5  # voir derniers changements
   git reset --hard HEAD~1  # revenir en arrière
   # puis redéployer
   ```

## Analytics Ne Marchent Plus

### Vérification
```bash
# Vérifier code présent
grep -r "G-49Z27M7V6G" *.html

# Doit apparaître dans toutes les pages
```

### Solution
- Comparer avec version Git précédente
- Revertir les changements Analytics
- Redéployer

## Erreur JavaScript

### Diagnostic
- F12 dans navigateur → Console
- Noter l'erreur exacte
- Tester en navigation privée

### Solution Rapide
- Revertir derniers changements JS
- Vider cache navigateur (Ctrl+Shift+R)

## CONTACTS D'URGENCE

- **Hébergeur :** [à compléter]
- **Registrar domaine :** [à compléter] 
- **Webmaster :** torhtor@tutanota.com

## PRINCIPE : En cas de doute, revertir
Mieux vaut un site simple qui marche qu'un site cassé.