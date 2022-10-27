import socketioService from "../../services/socketio.service"

export default {
    namespaced: true,

    state: {
        victoryCells: [],

        colorPlayer: '#3889c5',
        colorEnemy: '#f08a00',
    },

    mutations: {
        SET_VICTORY_CELLS(state, payload) {
            state.victoryCells = payload
        },

        SET_COLOR_PLAYER(state, payload) {
            state.colorPlayer = payload
        },
        SET_COLOR_ENEMY(state, payload) {
            state.colorEnemy = payload
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
                playedCell: store.rootState.game.playedCell,
                isWinner: store.rootState.player.isWinner,
                victoryCells: store.state.victoryCells,
            }

            socketioService.socket.emit('toServer_playToConnect4', data)
        },

        listenPlayToConnect4(store) {
            socketioService.socket.on('toClient_playToConnect4', (data) => {
                store.commit('game/SET_ENEMY_DATA', data, {
                    root: true
                })
            })
        },


        // ---------

        changeVictoryCells(store, value) {
            store.commit('SET_VICTORY_CELLS', value)
        },

        changeColorPlayer(store, value) {
            store.commit('SET_COLOR_PLAYER', value)
        },
        changeColorEnemy(store, value) {
            store.commit('SET_COLOR_ENEMY', value)
        },
    }
}