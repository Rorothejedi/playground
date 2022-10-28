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

        INIT_LOCALSTORAGE(state) {
            if (localStorage.getItem('morpionColorPlayer'))
                state.colorPlayer = localStorage.getItem('morpionColorPlayer')
            if (localStorage.getItem('morpionColorEnemy'))
                state.colorEnemy = localStorage.getItem('morpionColorEnemy')
            if (localStorage.getItem('morpionShapePlayer'))
                state.shapePlayer = localStorage.getItem('morpionShapePlayer')
            if (localStorage.getItem('morpionShapeEnemy'))
                state.shapeEnemy = localStorage.getItem('morpionShapeEnemy')
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
            localStorage.setItem('morpionColorPlayer', value);
            store.commit('SET_COLOR_PLAYER', value)
        },
        changeColorEnemy(store, value) {
            localStorage.setItem('morpionColorEnemy', value);
            store.commit('SET_COLOR_ENEMY', value)
        },
        changeShapePlayer(store, value) {
            localStorage.setItem('morpionShapePlayer', value);
            store.commit('SET_SHAPE_PLAYER', value)
        },
        changeShapeEnemy(store, value) {
            localStorage.setItem('morpionShapeEnemy', value);
            store.commit('SET_SHAPE_ENEMY', value)
        },
    }
}