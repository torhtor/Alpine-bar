#!/bin/bash

# Script pour préparer les fichiers de production Alpine Bar
# Usage: ./prepare-production.sh

set -e

PRODUCTION_DIR="production-ready"
SOURCE_DIR="."

echo "🏔️ Préparation des fichiers de production Alpine Bar"
echo "=================================================="

# Nettoyer le dossier production s'il existe
if [ -d "$PRODUCTION_DIR" ]; then
    echo "🧹 Nettoyage du dossier de production existant..."
    rm -rf "$PRODUCTION_DIR"
fi

# Créer la structure
mkdir -p "$PRODUCTION_DIR"
mkdir -p "$PRODUCTION_DIR/en"
mkdir -p "$PRODUCTION_DIR/logo"

echo "📁 Copie des fichiers essentiels..."

# Pages HTML principales (racine)
cp index.html "$PRODUCTION_DIR/"
cp contact.html "$PRODUCTION_DIR/"
cp menu.html "$PRODUCTION_DIR/"
cp findus.html "$PRODUCTION_DIR/"
cp actualites.html "$PRODUCTION_DIR/"
cp privacy-policy.html "$PRODUCTION_DIR/"

# Pages anglaises
cp en/index.html "$PRODUCTION_DIR/en/"
cp en/contact.html "$PRODUCTION_DIR/en/"
cp en/menu.html "$PRODUCTION_DIR/en/"
cp en/location.html "$PRODUCTION_DIR/en/"
cp en/news.html "$PRODUCTION_DIR/en/"
cp en/privacy-policy.html "$PRODUCTION_DIR/en/"

# Composants partagés
cp header.html "$PRODUCTION_DIR/"
cp footer.html "$PRODUCTION_DIR/"
cp en/header.html "$PRODUCTION_DIR/en/"
cp en/footer.html "$PRODUCTION_DIR/en/"

# Assets CSS/JS
cp styles.css "$PRODUCTION_DIR/"
cp script.js "$PRODUCTION_DIR/"
cp en/script.js "$PRODUCTION_DIR/en/"
cp cookie-banner.js "$PRODUCTION_DIR/"
cp reviews-widget.js "$PRODUCTION_DIR/"

# SEO
cp sitemap.xml "$PRODUCTION_DIR/"

# Logo & favicon
cp logo/*.svg "$PRODUCTION_DIR/logo/"

# Configuration serveur
cp nginx.conf "$PRODUCTION_DIR/"

echo "✅ Fichiers de production prêts dans: $PRODUCTION_DIR/"
echo ""
echo "📊 Résumé:"
echo "- $(find "$PRODUCTION_DIR" -name "*.html" | wc -l) pages HTML"
echo "- $(find "$PRODUCTION_DIR" -name "*.css" | wc -l) feuilles de style"
echo "- $(find "$PRODUCTION_DIR" -name "*.js" | wc -l) scripts JavaScript"
echo "- $(find "$PRODUCTION_DIR" -name "*.svg" | wc -l) fichiers SVG"
echo ""
echo "🚀 Prêt pour le déploiement !"