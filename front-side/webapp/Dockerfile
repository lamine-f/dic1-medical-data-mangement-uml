# Utiliser l'image officielle node pour construire l'application React
FROM node:latest AS build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application React
RUN npm run build

# Utiliser l'image officielle Apache HTTP Server
FROM httpd:latest

# Copier les fichiers de l'application construite depuis le conteneur de construction vers le répertoire web d'Apache
COPY --from=build /app/build/ /usr/local/apache2/htdocs/
