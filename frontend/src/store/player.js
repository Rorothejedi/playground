import socketioService from "../services/socketio.service"

export default {
    namespaced: true,

    getters: {
        state(state) {
            return state;
        },
    },

    state: {
        username: '',
        host: false,
        roomId: null,
        socketId: '',
        game: '',
        turn: false,
        win: false,
        outcome: '',

        // morpion
        playedCell: '',
        symbol: 'X',

        enemyPlayer: [],
    },

    mutations: {
        SET_USERNAME(state, payload) {
            state.username = payload
        },
        SET_HOST(state, payload) {
            state.host = payload
        },
        SET_ROOM_ID(state, payload) {
            state.roomId = payload
        },
        SET_SOCKET_ID(state, payload) {
            state.socketId = payload
        },
        SET_GAME(state, payload) {
            state.game = payload
        },
        SET_TURN(state, payload) {
            state.turn = payload
        },
        SET_WIN(state, payload) {
            state.win = payload
        },
        SET_OUTCOME(state, payload) {
            state.outcome = payload
        },

        // morpion
        SET_PLAYED_CELL(state, payload) {
            state.playedCell = payload
        },

        SET_ENEMY_PLAYER(state, payload) {
            state.enemyPlayer = payload
        },
    },

    actions: {
        changeUsername(store, value) {
            store.commit('SET_USERNAME', value)
        },
        changeHost(store, value) {
            store.commit('SET_HOST', value)
        },
        changeRoomId(store, value) {
            store.commit('SET_ROOM_ID', value)
        },
        changeSocketId(store, value) {
            store.commit('SET_SOCKET_ID', value)
        },
        changeGame(store, value) {
            if (value === '') socketioService.socket.emit("leaveGame", store.state);

            store.commit('SET_GAME', value)
        },
        changeTurn(store, value) {
            store.commit('SET_TURN', value)
        },
        changeWin(store, value) {
            store.commit('SET_WIN', value)
        },
        changeOutcome(store, value) {
            store.commit('SET_OUTCOME', value)
        },
        changePlayedCell(store, value) {
            store.commit('SET_PLAYED_CELL', value)
        },

        emitPlayerData(store) {
            store.commit('SET_SOCKET_ID', socketioService.socket.id)

            socketioService.socket.emit("playerData", store.state);
        },

        emitPlay(store) {
            socketioService.socket.emit('play', store.state)
        },

        listenPlay(store) {
            socketioService.socket.on('play', (enemyPlayer) => {
                store.commit('SET_ENEMY_PLAYER', enemyPlayer)
            })
        },

        emitReplay(store) {
            socketioService.socket.emit('replay', store.state.roomId)
        },
    }
}