export default {
    actions: {
        choose: 'Choisir',
        close: 'Fermer',
        create: 'Créer',
        join: 'Rejoindre',
        replay: 'Rejouer',
    },

    error: {
        base: 'Une erreur est survenue',
        room: {
            full: 'La partie est déjà complète !',
            noExist: 'La partie n\'existe pas !',
        },
    },

    navbar: {
        quit: 'Quitter la partie',
    },

    hello: {
        label: 'Ton pseudo',
    },

    home: {
        newGame: {
            title: 'Nouvelle partie',
            placeholder: 'Choisir un jeu',
        },
        gamesList: {
            title: 'Liste des parties disponibles',
            noData: 'Aucune partie disponible',
        }
    },

    settings: {
        global: {
            title: 'Paramètres généraux',
            nickname: 'Pseudo',
            language: 'Langue',
        },
        room: {
            title: 'Paramètres de la partie',
            invitation: {
                title: 'Inviter un ami',
                copy: 'Copier le lien',
                copied: 'Lien copié !',
                subtext: 'Partage ce lien avec tes amis pour jouer ensemble !',
            },
            colors: 'Couleurs',
            me: 'Moi',
            opponent: 'Adversaire',
            shape: 'Forme',
        },
    },

    room: {
        endgame: {
            victory: 'Victoire',
            equality: 'Egalité',
            defeat: 'Défaite',
            victoryText: 'Trop facile ! Vous prendrez bien un thé ?',
            equalityText: 'Bizarre... J\'était pourtant sûr que vous alliez l\'avoir !',
            defeatText: 'Aïe ! Pourquoi ne pas retenter votre chance ?',
        },
        quitConfirm: {
            title: 'Quitter la partie ?',
            content: 'Vous êtes certain de vouloir quitter ? Dans ce cas, votre adversaire sera expulsé de la partie...',
            yes: 'Oui, je suis sûr',
            no: 'Finalement non',
        },
        waitingText: 'En attente d\'un autre joueur...',
        leaveGame: '{user} a quitté la partie',
    },

    game: {
        yourTurn: 'A toi de jouer',
        preparesMove: '{user} prépare son coup',
        choseMove: '{user} a choisi son coup',
        choseMoves: '{user1} et {user2} ont choisis leurs coups',
    },
}