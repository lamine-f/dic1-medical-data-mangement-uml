# Projet: Système de Surveillance des Fréquences Cardiaques des Patients

Ce projet consiste à mettre en place un système permettant de prélever les fréquences cardiaques des patients à l'aide d'un capteur d'électrocardiogramme et de stocker ces données. Le système utilisera les technologies suivantes : ESP32 pour le contrôle et la communication, capteur d'électrocardiogramme pour la mesure des fréquences cardiaques, MQTT pour la communication entre les appareils, Node.js pour le serveur et MySQL pour la base de données.

## Fonctionnalités prévues
1. **Prélèvement des Fréquences Cardiaques**: Utilisation d'un capteur d'électrocardiogramme pour mesurer les fréquences cardiaques des patients.
2. **Communication MQTT**: Utilisation du protocole MQTT pour la communication entre les différents appareils.
3. **Stockage des Données**: Stockage sécurisé des fréquences cardiaques mesurées dans une base de données MySQL.

## Technologies utilisées

- **ESP32**: Microcontrôleur WiFi et Bluetooth pour le contrôle et la communication.
- **Capteur d'Électrocardiogramme**: Capteur pour mesurer les fréquences cardiaques des patients.
- **MQTT**: Protocole de messagerie pour la communication entre les appareils.
- **Node.js**: Environnement d'exécution JavaScript côté serveur pour le développement de l'application serveur.
- **MySQL**: Système de gestion de base de données relationnelle pour stocker les données des patients.

## Instructions d'installation

1. **Configuration de l'ESP32**:
   - Téléverser le code sur l'ESP32 en utilisant l'IDE Arduino ou un autre environnement de développement compatible.
   - Configurer les paramètres de connexion WiFi et MQTT dans le code.

2. **Mise en Place du Serveur (Node.js)**:
   - Cloner le dépôt Git du serveur Node.js.
   - Installer les dépendances nécessaires (`npm install`).
   - Configurer les paramètres de base de données MySQL dans le fichier de configuration.
   - Lancer le serveur Node.js (`npm start`).

3. **Base de données (MySQL)**:
   - Installer MySQL sur votre machine si ce n'est pas déjà fait.
   - Créer une nouvelle base de données et importer le schéma fourni.

## Auteurs

- [Mouhamed Lamine Faye](lien_vers_votre_profil_github) - Développeur
- [Elhadji Cissé](lien_vers_leur_profil_github) - Electronicien 
- [Amat](lien_vers_leur_profil_github) - Electronicien 
- [Louis Praise](lien_vers_leur_profil_github) - Electronicien 

