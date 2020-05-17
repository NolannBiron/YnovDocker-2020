# Docker for TodoApp

J'ai choisi d'utiliser afin de créer des containers pour ma TodoApp MEAN Stack.

## Server Express

A la racine de mon projet, un fichier Dockerfile récupère mon package.json dans le dossier /usr/src/app/ ensuite il exécute un "npm install" pour récupérer les paquets et termine par copier l'intégralité des fichiers vers /usr/src/app/ avant de lancer une commande "npm start" qui va démarrer le server en éxecutant le fichier server.js.

## Frontend Angular

Dans le dossier angular, on retrouve un Dockerfile, qui me permet de copier mon package.json dans un dossier /usr/src/app/ ensuite je lance un npm install pour installer les paquets dont j'aurais besoin pour lancer mon app angular. Je finis par copier tous les fichiers dans le dossier /usr/src/app/ et lance la commande "npm run build" pour build mon application angular qui sera accessible via mon serveur express.

## Docker-compose
Mon fichier docker-compose me permet définir trois services, mon interface front-end, mon serveur express et ma base de donnée mongodb. Pour ce faire, je commence par définir le service "server", le fichier Dockerfile se trouve à la racine donc je donne le chemin "build: ." au docker-compose et lui attribue par la suite le ports 8080, je termine en connectant le service database à mon serveur. Je définis ensuite le service "angular" en lui indiquant le chemin vers mon application angular, soit "build: angular". Je finis en définissant le service "database" qui me permettra d'accéder à ma base de donnée Mongodb depuis mon fichier "server.js", je lui donne un nom de container pour le retrouver facilement, et ensuite je lui assigne le port "27017".


## Démarrage

```bash
docker-compose build
docker-compose up
```