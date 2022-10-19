# playground
Plateforme permettant à des joueurs de s'affronter sur différents jeux célèbres via la création de salon.

Site online: https://playground.rodolphe-cabotiau.com/

## Jeux présents

- Morpion (2 joueurs) (v1.0)
- Pierre-papier-ciseaux (2/3 joueurs) (v2.1)

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

- Ajouter le puissance 4

## Issues

- A plusieurs joueur, quand eux on rejoint et que un annule, la partie n'est plus visible pour les autres.

## IMPROVEMENT

- Pouvoir choisir les couleurs
- Ajouter l'option 4 joueurs pour le pierre-papier-ciseaux
- Mettre les varibales d'environnements pour simplifier les deploiements sur le serveur node
- Ajouter le pierre-papier-ciseaux-lesard-spock
- Afficher toures les options (résumé) du salon sur la liste des salons
- En cas de refresh, redirection vers la home pour eviter un loader infini sur la room
- Pouvoir choisir les croix ou les ronds (morpion) (option)
- Améliorer les cas d'égalité (morpion)
- Compter les scores et en gérer l'affichage (morpion)
- Gérer le fait de rejoindre une partie avec le lien (demande du username si pas renseigné puis redirection)
- Ajouter d'autres jeux (memory, bataille, skyjo, mini-golf)

## IMPROVEMENT (hyper facultatif)

- Ajouter un mode solo (avec une IA)
- Gérer un deploiement automatisé (npm run build sur le serveur)
