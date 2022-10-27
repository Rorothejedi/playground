import socketioService from "../../services/socketio.service"

export default {
    namespaced: true,

    state: {
        victoryWay: '',
        colorPlayer: '#63E2B7',
        colorEnemy: '#E88080',
        shapePlayer: 'X',
        shapeEnemy: 'O',
    },

    mutations: {
        SET_VICTORY_WAY(state, payload) {
            state.victoryWay = payload
        },
        SET_COLOR_PLAYER(state, payload) {
            state.colorPlayer = payload
        },
        SET_COLOR_ENEMY(state, payload) {
            state.colorEnemy = payload
        },
        SET_SHAPE_PLAYER(state, payload) {
            state.shapePlayer = payload
        },
        SET_SHAPE_ENEMY(state, payload) {
            state.shapeEnemy = payload
        },
    },

    actions: {

        // PLAY_TO_MORPION EVENTS
        emitPlayToMorpion(store) {
            const data = {
                socketId: store.rootState.player.socketId,
                roomId: store.rootState.player.roomId,
                username: store.rootState.player.username,
                turn: store.rootState.player.turn,
                playedCell: store.rootState.game.playedCell,
                isWinner: store.rootState.player.isWinner,
                victoryWay: store.state.victoryWay,
            }

            socketioService.socket.emit('toServer_playToMorpion', data)
        },

        listenPlayToMorpion(store) {
            socketioService.socket.on('toClient_playToMorpion', (data) => {
                store.commit('game/SET_ENEMY_DATA', data, {
                    root: true
                })
            })
        },

        // ---------

        changeVictoryWay(store, value) {
            store.commit('SET_VICTORY_WAY', value)
        },

        changeColorPlayer(store, value) {
            store.commit('SET_COLOR_PLAYER', value)
        },
        changeColorEnemy(store, value) {
            store.commit('SET_COLOR_ENEMY', value)
        },

        changeShapePlayer(store, value) {
            store.commit('SET_SHAPE_PLAYER', value)
        },
        changeShapeEnemy(store, value) {
            store.commit('SET_SHAPE_ENEMY', value)
        },
    }
}