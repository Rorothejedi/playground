# playground
Plateforme permettant à des joueurs de s'affronter sur différents jeux célèbres via la création de salon.

Online website: https://playground.rodolphe-cabotiau.com/

## Games

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


-----------------------


## TODO IMPROVEMENT before v2.3

- Gérer le fait de rejoindre une partie avec le lien (demande du username si pas renseigné puis redirection)
- Si on arrive sur le lien et qu'il n'y a que le joueur, redirection vers la home pour eviter un loader infini sur la room

### Bugs

- A plusieurs joueur, quand eux on rejoint et que un annule, la partie n'est plus visible pour les autres.
- Parfois, le nom d'utilisateur ne s'affiche pas dans le message '[username] a quitté la partie' (après rejouer ?)

## After

- Améliorer la création de partie (loading and redirect...) (promise ?)

- Gérer la traduction du site (Internationalization)
- Scores et autres joueurs

- Améliorer le bouton "rejouer", tous les joueurs doivent pouvoir cliquer, (la partie redemare quand tous les joueurs on cliqué)
- Mettre les variables d'environnements pour simplifier les deploiements sur le serveur node

- Améliorer les cas d'égalité (morpion)
- Compter les scores et en gérer l'affichage (morpion)

- Ajouter l'option 4 joueurs pour le pierre-papier-ciseaux
- Ajouter le pierre-papier-ciseaux-lézard-Spock
- Ajouter d'autres jeux (memory, bataille, skyjo, mini-golf)

## IMPROVEMENT (hyper facultatif)

- Ajouter un mode solo (avec une IA)
- Gérer un deploiement automatisé (npm run build sur le serveur)
