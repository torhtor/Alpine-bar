#!/bin/bash

# 🛡️ Alpine Bar - Essentials Setup (Webmaster Safe Mode)
# Script minimal pour setup fiable et sécurisé

set -e

echo "🛡️ Alpine Bar - Setup Essentiels Webmaster"
echo "========================================"
echo ""
echo "Focus : Fiabilité, Backup, Monitoring"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_step() {
    echo -e "${BLUE}📋 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}💡 $1${NC}"
}

# Step 1: GitHub Backup
setup_github_backup() {
    print_step "1. Backup Repository GitHub"
    
    echo "Avez-vous GitHub CLI installé ? (gh --version)"
    echo "Si non, on peut faire ça manuellement après."
    echo ""
    echo "Configurer GitHub repository maintenant ? (y/N)"
    read -r SETUP_GITHUB
    
    if [[ "$SETUP_GITHUB" =~ ^[Yy]$ ]]; then
        if command -v gh &> /dev/null; then
            echo "Nom du repository (défaut: alpine-bar-website):"
            read -r REPO_NAME
            REPO_NAME=${REPO_NAME:-alpine-bar-website}
            
            print_info "Création du repository privé..."
            if gh repo create "$REPO_NAME" --private --description "Alpine Bar Website - Production"; then
                git remote add origin "https://github.com/$(gh api user --jq .login)/$REPO_NAME.git" 2>/dev/null || true
                git push -u origin main --all
                git push --tags
                print_success "Repository GitHub configuré et synchronisé"
            else
                print_info "Repository existe déjà ou erreur. Continuer manuellement."
            fi
        else
            print_info "GitHub CLI non disponible."
            print_info "Étapes manuelles :"
            print_info "1. Aller sur github.com"
            print_info "2. Créer nouveau repository privé : alpine-bar-website"
            print_info "3. Copier l'URL git puis :"
            print_info "   git remote add origin [URL]"
            print_info "   git push -u origin main --all"
        fi
    else
        print_info "GitHub setup ignoré - à faire manuellement si besoin"
    fi
    echo ""
}

# Step 2: Create deployment safety script
create_safe_deploy() {
    print_step "2. Script de Déploiement Sécurisé"
    
    cat > deploy-safe.sh << 'EOF'
#!/bin/bash

# 🛡️ Alpine Bar - Déploiement Sécurisé
# Vérifications avant déploiement

set -e

echo "🛡️ Alpine Bar - Déploiement Sécurisé"
echo "=================================="

# Pre-flight checks
echo "🔍 Vérifications de sécurité..."

# Check essential files
CRITICAL_FILES=("index.html" "menu.html" "contact.html" "cookie-banner.js" "styles.css")
for file in "${CRITICAL_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ ERREUR: $file manquant"
        echo "🚫 DÉPLOIEMENT INTERROMPU"
        exit 1
    fi
done
echo "✅ Fichiers critiques présents"

# Check Analytics
if ! grep -q "G-49Z27M7V6G" index.html; then
    echo "❌ ERREUR: Google Analytics manquant"
    echo "🚫 DÉPLOIEMENT INTERROMPU"
    exit 1
fi
echo "✅ Google Analytics configuré"

# Check Consent Mode
if ! grep -q "consent.*default" index.html; then
    echo "❌ ERREUR: Consent Mode manquant"
    echo "🚫 DÉPLOIEMENT INTERROMPU"
    exit 1
fi
echo "✅ RGPD Consent Mode OK"

# Check no temp files
if find . -name "*.tmp" -o -name "debug.html" -o -name "test-*.html" | grep -q .; then
    echo "⚠️ Fichiers temporaires détectés - les supprimer ? (y/N)"
    read -r CLEAN
    if [[ "$CLEAN" =~ ^[Yy]$ ]]; then
        find . -name "*.tmp" -delete 2>/dev/null || true
        find . -name "debug.html" -delete 2>/dev/null || true
        find . -name "test-*.html" -delete 2>/dev/null || true
        echo "🧹 Fichiers temporaires supprimés"
    fi
fi

echo ""
echo "✅ TOUTES LES VÉRIFICATIONS PASSÉES"
echo ""
echo "🚀 Prêt pour le déploiement !"
echo ""
echo "Commandes suggérées :"
echo "  # Si Git repository configuré :"
echo "  git add . && git commit -m 'deploy: version stable pour production'"
echo "  git push origin main"
echo ""
echo "  # Puis votre commande de déploiement habituelle"
echo "  # (rsync, scp, FTP, etc.)"

EOF
    
    chmod +x deploy-safe.sh
    print_success "Script deploy-safe.sh créé"
    print_info "Usage: ./deploy-safe.sh (avant chaque déploiement)"
    echo ""
}

# Step 3: Create monitoring setup info
create_monitoring_guide() {
    print_step "3. Guide de Monitoring"
    
    cat > monitoring-setup.txt << 'EOF'
🔍 MONITORING SETUP - Alpine Bar
==============================

1. UPTIME MONITORING (gratuit)
   → Aller sur : https://uptimerobot.com
   → Créer compte gratuit
   → Add Monitor :
     - Type: HTTP(s)
     - URL: https://www.alpine-bar.com
     - Interval: 5 minutes
     - Alert Contacts: votre email
   
   ✅ Résultat : Alerte email si site down

2. GOOGLE SEARCH CONSOLE (gratuit)
   → Aller sur : https://search.google.com/search-console
   → Ajouter propriété : alpine-bar.com
   → Vérifier avec balise meta ou DNS
   → Soumettre sitemap.xml
   
   ✅ Résultat : Monitoring SEO et erreurs Google

3. CLOUDFLARE CDN (optionnel, gratuit)
   → Aller sur : https://cloudflare.com
   → Ajouter site : alpine-bar.com
   → Changer DNS chez votre registrar
   
   ✅ Résultat : Site plus rapide + protection DDoS

4. ANALYTICS MONITORING
   → dashboard : https://analytics.google.com
   → Vérifier data arrive bien
   → Configurer alertes si trafic chute
   
   ✅ Résultat : Suivi du trafic en temps réel

TEMPS TOTAL SETUP : ~30 minutes
COÛT : 0€
EOF
    
    print_success "Guide monitoring-setup.txt créé"
    print_info "Suivre les étapes pour monitoring 24/7"
    echo ""
}

# Step 4: Create emergency procedures
create_emergency_kit() {
    print_step "4. Kit d'Urgence"
    
    cat > URGENCE.md << 'EOF'
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
EOF
    
    print_success "Guide URGENCE.md créé"
    echo ""
}

# Main execution
main() {
    echo "Ce script configure les outils ESSENTIELS pour un webmaster."
    echo "Focus : Sécurité, Backup, Zéro risque pour l'ouverture."
    echo ""
    echo "Continuer ? (Y/n)"
    read -r CONTINUE
    CONTINUE=${CONTINUE:-Y}
    
    if [[ ! "$CONTINUE" =~ ^[Yy]$ ]]; then
        echo "Setup annulé."
        exit 0
    fi
    
    echo ""
    
    # Run essential setup
    setup_github_backup
    create_safe_deploy
    create_monitoring_guide
    create_emergency_kit
    
    # Commit changes
    print_step "5. Sauvegarde des changements"
    git add .
    if ! git diff --staged --quiet; then
        git commit -m "feat: add webmaster essential tools and safety procedures

- Safe deployment script with pre-flight checks
- Monitoring setup guide (UptimeRobot, Search Console)  
- Emergency procedures for quick troubleshooting
- Focus on reliability and zero-risk production deployment

🛡️ Webmaster Safety Kit"
        print_success "Outils sauvegardés dans Git"
    fi
    
    echo ""
    print_success "🎉 Setup Essentiels Terminé !"
    echo ""
    echo "📋 RÉSUMÉ :"
    echo "✅ Repository backup configuré/documenté"
    echo "✅ Script déploiement sécurisé : ./deploy-safe.sh"
    echo "✅ Guide monitoring : monitoring-setup.txt"
    echo "✅ Procédures urgence : URGENCE.md"
    echo ""
    echo "🎯 PROCHAINE ÉTAPE :"
    echo "Suivre monitoring-setup.txt pour surveillance 24/7 (30 min)"
    echo ""
    print_info "Votre site est maintenant FIABLE et SÉCURISÉ pour l'ouverture !"
}

# Run
main "$@"