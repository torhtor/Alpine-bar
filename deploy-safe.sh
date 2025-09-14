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
