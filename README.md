# playground
Plateforme permettant à des joueurs de s'affronter sur différents jeux célèbres via la création de salon.

Site online: https://playground.rodolphe-cabotiau.com/

## Jeux présents

- Morpion (2 joueurs) (v1.0)
- Pierre-papier-ciseaux (2/3 joueurs) (v2.1)
- Puissance 4 (2 joueurs) (v2.2)

## backend 

### Project setup
```
npm install && node app.js
```

## frontend

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```


## Technologies used:

- Vue.js (v3)
  - vue router (v4)
  - vuex (v4)
  - axios
- Node.js (v16) (with express.js)
- Socket.io (for real-time events) - https://socket.io/
- Naive UI (v2.33.4) (component library) - https://www.naiveui.com/
- less (CSS preprocessor)

## TODO

### Issues

- A plusieurs joueur, quand eux on rejoint et que un annule, la partie n'est plus visible pour les autres.

## IMPROVEMENT

- Redesign UI (v2.3)
  - OK Barre en haut pour nom du site
  - OK Nom du jeu en cours
  - Options globales
    - OK Changer pseudo
    - Choisir la langue du site (anglais)
  - Options de la partie en cours
    - Lien de la partie (click to copy)
    - Choisir les croix ou les ronds sur le morpion,
    - Changer les couleurs
  - OK Quitter la partie (Close cross)

- Gérer les changement de couleur sur chaque jeu (morpion et puissance 4)
- Gérer les changement de shape (morpion)
- Gérer le fait de rejoindre une partie avec le lien (demande du username si pas renseigné puis redirection)
- Si on arrive sur le lien et qu'il n'y a que le joueur, redirection vers la home pour eviter un loader infini sur la room

## After

- Gérer la traduction du site
- Scores et autres joueurs
- Améliorer le bouton "rejouer", tous les joueurs doivent pouvoir cliquer, (la partie redemare quand tous les joueurs on cliqué)
- Ajouter l'option 4 joueurs pour le pierre-papier-ciseaux
- Mettre les variables d'environnements pour simplifier les deploiements sur le serveur node
- Ajouter le pierre-papier-ciseaux-lézard-Spock
- Afficher toures les options (résumé) du salon sur la liste des salons

- Pouvoir choisir les croix ou les ronds (morpion) (option)
- Améliorer les cas d'égalité (morpion)
- Compter les scores et en gérer l'affichage (morpion)

- Ajouter d'autres jeux (memory, bataille, skyjo, mini-golf)

## IMPROVEMENT (hyper facultatif)

- Ajouter un mode solo (avec une IA)
- Gérer un deploiement automatisé (npm run build sur le serveur)
