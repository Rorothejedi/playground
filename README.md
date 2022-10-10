# playground
Plateforme permettant à des joueurs de s'affronter sur différents jeux célèbres via la création de salon.

Site online: http://playground.rodolphe-cabotiau.com/

## Jeux présents

- Morpion (2 joueurs)
- Pierre-papier-ciseaux (beta) (2 joueurs)

## backend 

### Project setup
```
node app.js
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


## Technos utilisées:

- Vue.js (v3)
  - vue router (v4)
  - vuex (v4)
  - axios
- Node.js (v16) (with express.js)
- Socket.io - https://socket.io/
- Naive UI (v2.33.4) - https://www.naiveui.com/en-US/dark
- less

## TODO

- Ajouter le mode 3 joueurs pour le pierre-papier-ciseaux

## IMPROVEMENT

- Afficher les options du salon sur la liste des salons
- Ajouter le pierre-papier-ciseaux-lesard-spock
- En cas de refresh, redirection vers la home pour eviter un loader infini sur la room
- Pouvoir choisir les croix ou les ronds (morpion) (option)
- Améliorer les cas d'égalité (morpion)
- Compter les scores et en gérer l'affichage (morpion)
- Mettre en https
- Gérer le fait de rejoindre une partie avec le lien (demande du username si pas renseigné puis redirection)
- Ajouter d'autres jeux (puissance 4, bataille, skyjo)

## IMPROVEMENT (hyper facultatif)

- Ajouter un mode solo (avec une IA)