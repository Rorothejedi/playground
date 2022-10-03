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
        roomPlayers: [],

        replay: false,

        // should be here
        // game
        // roomId
        // 
    },

    mutations: {
        SET_ROOMS(state, payload) {
            state.rooms = payload
        },
        SET_ROOM_PLAYERS(state, payload) {
            state.roomPlayers = payload
        },

        SET_REPLAY(state, payload) {
            state.replay = payload
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

        emitLeaveRoom(store) {
            socketioService.socket.emit("leaveGame", store.state);
        },

        listenStartGame(store) {
            socketioService.socket.on('startGame', (players) => {
                store.commit('SET_ROOM_PLAYERS', players)
            })
        },

        listenReplay(store) {
            socketioService.socket.on('replay', () => {
                store.commit('SET_REPLAY', true)
            })
        },

        changeRoomPlayers(store, value) {
            store.commit('SET_ROOM_PLAYERS', value)
        },

        changeReplay(store, value) {
            store.commit('SET_REPLAY', value)
        },
    }
}