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


## <ins>TODO IMPROVEMENT</ins> <i>before v2.3</i>

- Améliorer la création de partie (loading and redirect...) (promise ?)

### Bugs

- A plusieurs joueur, quand eux on rejoint et que un annule, la partie n'est plus visible pour les autres.
- Parfois, le nom d'utilisateur ne s'affiche pas dans le message '[username] a quitté la partie' (après rejouer ou fin de partie ?)
- Gérer l'affichage sans bug des images du pierre-papier-ciseaux (@load ?)

## <ins>Game improvements</ins>
### Morpion
- Améliorer les cas d'égalité (pour savoir qui commence après)
- Compter les scores et en gérer l'affichage

### Rock-Paper-Scissors
- Ajouter l'option 4 joueurs 

### Other game ideas
- pierre-papier-ciseaux-lézard-Spock
- memory (solo and 2 players) (for card games implementation)
- bataille
- skyjo
- mini-golf (with Kinesis https://www.aminerman.com/kinesis/)

## <ins>UI/UX improvements</ins>
- Gérer la traduction du site (Internationalization)
- Scores et autres joueurs
- Améliorer le bouton "rejouer", tous les joueurs doivent pouvoir cliquer, (la partie redemare quand tous les joueurs ont cliqués)

## <ins>Next step</ins>
- Ajouter un mode solo (avec une IA)
- Gérer un deploiement automatisé (npm run build sur le serveur)
- Faire du projet une PWA et ajouter au play store (mode solo necessaire pour ça)