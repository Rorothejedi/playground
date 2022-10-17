import socketioService from "../services/socketio.service"

export default {
    namespaced: true,

    state: {
        enemyData: [],

        game: '',
        scoreToReach: 3,
        numberOfPlayer: 2,

        // morpion
        playedCell: '',
        victoryWay: '',

        // rock-paper-scissors
        chosenItem: '',
    },

    mutations: {
        SET_ENEMY_DATA(state, payload) {
            state.enemyData = payload
        },

        SET_GAME(state, payload) {
            state.game = payload
        },
        SET_SCORE_TO_REACH(state, payload) {
            state.scoreToReach = payload
        },
        SET_NUMBER_OF_PLAYER(state, payload) {
            state.numberOfPlayer = payload
        },

        // morpion
        SET_PLAYED_CELL(state, payload) {
            state.playedCell = payload
        },
        SET_VICTORY_WAY(state, payload) {
            state.victoryWay = payload
        },

        //rock-paper-scissors
        SET_CHOSEN_ITEM(state, payload) {
            state.chosenItem = payload
        },
    },

    actions: {

        // PLAY_TO_ROCK_PAPER_SCISSORS EVENTS
        emitPlayToRockPaperScissors(store) {
            const data = {
                socketId: store.rootState.player.socketId,
                roomId: store.rootState.player.roomId,
                username: store.rootState.player.username,
                chosenItem: store.state.chosenItem,
                score: store.rootState.player.score,
            }

            socketioService.socket.emit('toServer_playRockPaperScissors', data)
        },

        listenPlayToRockPaperScissors(store) {
            socketioService.socket.on('toClient_playRockPaperScissors', (data) => {
                let enemyData = store.state.enemyData.filter(d => d.socketId !== data.socketId)
                enemyData.push(data)
                store.commit('SET_ENEMY_DATA', enemyData)
            })
        },

        // PLAY_TO_MORPION EVENTS
        emitPlayToMorpion(store) {
            const data = {
                socketId: store.rootState.player.socketId,
                roomId: store.rootState.player.roomId,
                username: store.rootState.player.username,
                playedCell: store.state.playedCell,
                turn: store.rootState.player.turn,
                isWinner: store.rootState.player.isWinner,
                victoryWay: store.state.victoryWay,
            }

            socketioService.socket.emit('toServer_playToMorpion', data)
        },

        listenPlayToMorpion(store) {
            socketioService.socket.on('toClient_playToMorpion', (data) => {
                store.commit('SET_ENEMY_DATA', data)
            })
        },

        // ---------

        changeEnemyData(store, value) {
            store.commit('SET_ENEMY_DATA', value)
        },
        resetEnemyData(store) {
            store.commit('SET_ENEMY_DATA', [])
        },

        changeGame(store, value) {
            store.commit('SET_GAME', value)
        },
        changeScoreToReach(store, value) {
            store.commit('SET_SCORE_TO_REACH', value)
        },
        changeNumberOfPlayer(store, value) {
            store.commit('SET_NUMBER_OF_PLAYER', value)
        },

        // morpion

        changePlayedCell(store, value) {
            store.commit('SET_PLAYED_CELL', value)
        },
        changeVictoryWay(store, value) {
            store.commit('SET_VICTORY_WAY', value)
        },

        // rock-paper-scissors

        changeChosenItem(store, value) {
            store.commit('SET_CHOSEN_ITEM', value)
        },
    }
}