 # Comment mettre en place notre API

## Github

**API** : https://github.com/adrienb39/api-rest-hono-js

**Site** : https://github.com/adrienb39/api-rest-test-javascript-php

## Installer les dépendances JS
**- mysql2** : npm install mysql2 => pour se connecter a la base de données

**- dotenv** : npm install dotenv => pour sécuriser la connexion à la base de données

## Installer la base du dossier Hono
Installer Projet Hono : npm create hono@latest api-rest-hono-js

## Importer la base de données : schema.sql

Faire npm run dev dans l'api => Lancer les endpoints

Faire php -S localhost:8000 dans le dossier test PHP ou JS => lancer le site

Lien de la liste des films : localhost:3000/api/films

Lien des détails d'un film : localhost:3000/api/films/id

Lien des séances d'un film : localhost:3000/api/films/id/seances

