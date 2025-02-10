# Utilise l'image officielle de Node.js
FROM node:16-alpine

# Crée un répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copie le fichier package.json et package-lock.json dans le conteneur
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie tout le code source dans le conteneur
COPY . .

# Expose le port 3000 (ou le port de ton API)
EXPOSE 3000

# Lance l'application
CMD ["npm", "start"]
