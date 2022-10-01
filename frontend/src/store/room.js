import socketioService from "../services/socketio.service"

export default {
    namespaced: true,

    getters: {
        state(state) {
            return state;
        },
    },

    state: {
        rooms: [],

        // test
        players: [],
    },

    mutations: {
        SET_ROOMS(state, payload) {
            state.rooms = payload
        },

        // test
        SET_PLAYERS(state, payload) {
            state.players = payload
        },
    },

    actions: {
        emitRooms(store) {
            socketioService.socket.emit("roomsData", store.state);
        },

        listenRooms(store) {
            socketioService.socket.on("allRooms", (rooms) => {
                store.commit('SET_ROOMS', rooms)
            });
        },

        leaveRoom(store) {
            socketioService.socket.emit("destroyRoom", store.state);
        },

        // test
        listenStartGame(store) {
            socketioService.socket.on('startGame', (players) => {
                store.commit('SET_PLAYERS', players)
            })
        },
    }
}