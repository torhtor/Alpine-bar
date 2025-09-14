#!/bin/bash

# Simple serveur HTTP pour développement local
echo "🚀 Démarrage du serveur de développement..."
echo "📍 Site accessible sur http://localhost:8080"
echo "🔄 Les changements sont visibles instantanément"
echo "⏹️  Ctrl+C pour arrêter"
echo ""

# Serveur Python simple
python3 -m http.server 8080