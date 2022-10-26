import socketioService from "../services/socketio.service"

export default {
    namespaced: true,

    state: {
        enemyData: [],

        game: '',
        scoreToReach: 3,
        numberOfPlayer: 2,

        // morpion & connect 4
        playedCell: '',

        // connect 4
        victoryCells: [],

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

        // morpion & connect 4
        SET_PLAYED_CELL(state, payload) {
            state.playedCell = payload
        },

        // connect 4
        SET_VICTORY_CELLS(state, payload) {
            state.victoryCells = payload
        },

        // rock-paper-scissors
        SET_CHOSEN_ITEM(state, payload) {
            state.chosenItem = payload
        },
    },

    actions: {
        // PLAY_TO_CONNECT_4 EVENTS
        emitPlayToConnect4(store) {
            const data = {
                socketId: store.rootState.player.socketId,
                roomId: store.rootState.player.roomId,
                username: store.rootState.player.username,
                turn: store.rootState.player.turn,
                playedCell: store.state.playedCell,
                isWinner: store.rootState.player.isWinner,
                victoryCells: store.state.victoryCells,
            }

            socketioService.socket.emit('toServer_playToConnect4', data)
        },

        listenPlayToConnect4(store) {
            socketioService.socket.on('toClient_playToConnect4', (data) => {
                store.commit('SET_ENEMY_DATA', data)
            })
        },

        // PLAY_TO_ROCK_PAPER_SCISSORS EVENTS
        emitPlayToRockPaperScissors(store) {
            const data = {
                socketId: store.rootState.player.socketId,
                roomId: store.rootState.player.roomId,
                username: store.rootState.player.username,
                chosenItem: store.state.chosenItem,
                score: store.rootState.player.score,
            }

            socketioService.socket.emit('toServer_playToRockPaperScissors', data)
        },

        listenPlayToRockPaperScissors(store) {
            socketioService.socket.on('toClient_playToRockPaperScissors', (data) => {
                let enemyData = store.state.enemyData.filter(d => d.socketId !== data.socketId)
                enemyData.push(data)
                store.commit('SET_ENEMY_DATA', enemyData)
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

        // morpion & connect 4
        changePlayedCell(store, value) {
            store.commit('SET_PLAYED_CELL', value)
        },

        // connect 4
        changeVictoryCells(store, value) {
            store.commit('SET_VICTORY_CELLS', value)
        },

        // rock-paper-scissors
        changeChosenItem(store, value) {
            store.commit('SET_CHOSEN_ITEM', value)
        },
    }
}