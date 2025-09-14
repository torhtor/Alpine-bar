# Utilise une image nginx légère pour servir le site statique
FROM nginx:alpine

# Copie tous les fichiers du site dans le répertoire nginx
COPY . /usr/share/nginx/html/

# Copie une configuration nginx personnalisée si nécessaire
COPY nginx.conf /etc/nginx/nginx.conf

# Expose le port 80
EXPOSE 80

# Commande par défaut pour démarrer nginx
CMD ["nginx", "-g", "daemon off;"]