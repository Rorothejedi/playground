export default {
    actions: {
        choose: 'Choose',
        close: 'Close',
        create: 'Create',
        join: 'Join',
        replay: 'Replay',
    },

    error: {
        base: 'An error has occurred',
        room: {
            full: 'The game is already complete !',
            noExist: 'The game does not exist!',
        },
    },

    navbar: {
        quit: 'Quit game',
    },

    hello: {
        label: 'Your nickname',
    },

    home: {
        newGame: {
            title: 'New game',
            placeholder: 'Choose a game',
            participants: 'Participants',
            players: '{n} players',
            scoreToReach: 'Score to reach',
        },
        gamesList: {
            title: 'List of available games',
            noData: 'No game available',
            numberOfPlayers: 'Required number of players',
        },
    },

    settings: {
        global: {
            title: 'Global settings',
            nickname: 'Nickname',
            language: 'Language',
        },
        room: {
            title: 'Game settings',
            invitation: {
                title: 'Invite a friend',
                copy: 'Copy link',
                copied: 'Link copied !',
                subtext: 'Share this link with your friends to play together !',
            },
            colors: 'Colors',
            me: 'Me',
            opponent: 'Opponent',
            shape: 'Shape',
        },
    },

    room: {
        endgame: {
            victory: 'Victory',
            equality: 'Equality',
            defeat: 'Defeat',
            victoryText: 'Too easy ! How about a cup of tea ?',
            equalityText: 'Weird... I was sure you were going to get it !',
            defeatText: 'Ouch ! Why not try your luck again ?',
        },
        quitConfirm: {
            title: 'Quit game ?',
            content: 'Are you sure you want to quit ? Then your opponent will be kicked out of the game...',
            yes: 'Yes, I\'m sure',
            no: 'In the end, no',
        },
        waitingText: 'Waiting for another player...',
        leaveGame: '{user} left the game',
    },

    game: {
        yourTurn: 'Your turn to play',
        preparesMove: '{user} prepares his move',
        choseMove: '{user} has chosen his move',
        choseMoves: '{user1} and {user2} have chosen their moves',
    },

    morpion: 'Tic-Tac-Toe',
    connect4: 'Connect 4',
    rockPaperScissors: 'Rock-Paper-Scissors',
}