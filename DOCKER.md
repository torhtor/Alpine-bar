# Documentation Docker - Alpine Bar

## 🐳 Configuration Docker

Cette configuration Docker permet de faire tourner le site Alpine Bar dans un environnement containerisé pour le développement et la pré-production.

### Architecture

- **Image de base** : `nginx:alpine` (légère et sécurisée)
- **Port exposé** : 8080 (redirige vers le port 80 du container)
- **Configuration** : Nginx optimisée avec gzip, cache et headers de sécurité

## 🚀 Démarrage rapide

### Prérequis
- Docker installé
- Docker Compose installé

### Lancement du site

```bash
# Construire et démarrer le container
docker-compose up --build -d

# Accéder au site
open http://localhost:8080
```

### Arrêt du site

```bash
# Arrêter les containers
docker-compose down

# Arrêter et supprimer les volumes
docker-compose down -v
```

## 🔧 Commandes utiles

### Développement

```bash
# Voir les logs en temps réel
docker-compose logs -f alpine-bar-web

# Voir les logs nginx spécifiquement
docker-compose --profile logs up nginx-logs

# Reconstruire après des modifications
docker-compose up --build

# Shell dans le container
docker exec -it alpine-bar-site /bin/sh
```

### Debug

```bash
# Vérifier le statut des containers
docker-compose ps

# Inspecter la configuration nginx
docker exec alpine-bar-site cat /etc/nginx/nginx.conf

# Vérifier les fichiers copiés
docker exec alpine-bar-site ls -la /usr/share/nginx/html/
```

## 🌐 Intégration Tailscale

Pour l'accès distant via Tailscale :

### Option 1 : Tailscale sur l'hôte (recommandé)

1. Installer Tailscale sur la machine hôte
2. Le site sera accessible via l'IP Tailscale de la machine : `http://[TAILSCALE-IP]:8080`

### Option 2 : Tailscale dans le container

Modifier le `docker-compose.yml` :

```yaml
services:
  alpine-bar-web:
    build: .
    container_name: alpine-bar-site
    network_mode: "host"  # Utilise le réseau de l'hôte
    volumes:
      - ./logs:/var/log/nginx
    restart: unless-stopped
```

## 📁 Structure des fichiers

```
Alpine/
├── Dockerfile              # Configuration du container
├── docker-compose.yml      # Orchestration des services
├── nginx.conf              # Configuration Nginx optimisée
├── .dockerignore           # Fichiers à exclure du build
├── logs/                   # Logs Nginx (créé automatiquement)
└── DOCKER.md               # Cette documentation
```

## ⚙️ Configuration avancée

### Variables d'environnement

Dans `docker-compose.yml`, vous pouvez modifier :

```yaml
environment:
  - NGINX_HOST=alpine-bar.local  # Nom d'hôte personnalisé
  - NGINX_PORT=80               # Port interne
```

### SSL/HTTPS (production)

Pour activer HTTPS, ajoutez vos certificats et modifiez `nginx.conf` :

```nginx
server {
    listen 443 ssl http2;
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    # ... reste de la configuration
}
```

### Monitoring

Les logs sont automatiquement sauvegardés dans `./logs/` :
- `access.log` : Logs d'accès
- `error.log` : Logs d'erreurs

## 🔍 Troubleshooting

### Le site ne se charge pas
1. Vérifier que le port 8080 n'est pas utilisé : `lsof -i :8080`
2. Vérifier les logs : `docker-compose logs alpine-bar-web`

### Modifications non prises en compte
1. Reconstruire l'image : `docker-compose up --build`
2. Vider le cache navigateur

### Problèmes de permissions
```bash
# Ajuster les permissions des logs
chmod 755 logs/
```

## 🚀 Déploiement production

Pour la production, considérez :
- Utiliser un reverse proxy (Traefik, nginx-proxy)
- Configurer SSL/TLS
- Mettre en place un monitoring (Prometheus/Grafana)
- Utiliser Docker Swarm ou Kubernetes pour la scalabilité