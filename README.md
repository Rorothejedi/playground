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


## WIP (v2.3)
- New UI
- Select your color and/or your shape in games
- Invite your friends with game link
- Internationalization (fr, en)

-----------------------

## <ins>TODO IMPROVEMENT</ins> <i>before v2.3</i>

- Gérer la traduction du site (Internationalization)
  - Gérer la traduction du nom des jeux sans rien casser

## <ins>Game improvements</ins>
### Morpion
- Améliorer les cas d'égalité (pour savoir qui commence après, que ce ne soit pas toujours l'hôte qui joue ensuite)
- Compter les scores et en gérer l'affichage

### Rock-Paper-Scissors
- Trouver un moyen pour que ce soit plus clair pour savoir qui gagne et qui perd la manche
- Ajouter l'option 4 joueurs 

### Other game ideas
- pierre-papier-ciseaux-lézard-Spock
- bataille navale
- memory (solo and 2 players) (for card games implementation)
- bataille de carte
- skyjo
- mini-golf (with Kinesis https://www.aminerman.com/kinesis/)

### Issues (to reproduced)

- Parfois, le nom d'utilisateur ne s'affiche pas dans le message '[username] a quitté la partie'

## <ins>UI/UX improvements</ins>

- Améliorer l'attente dans la room avec le nombre de joueur / le lien direct à partager
- Améliorer le bouton "rejouer", tous les joueurs doivent pouvoir cliquer, (la partie redemare quand tous les joueurs ont cliqués)

## <ins>Next step</ins>
- Ajouter un mode solo (avec une IA)
- Gérer un deploiement automatisé (npm run build sur le serveur)
- Faire du projet une PWA et ajouter au play store (mode solo necessaire pour ça)
- Matchmaking