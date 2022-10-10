import socketioService from "../services/socketio.service"

export default {
    namespaced: true,

    getters: {
        room(state, getters, rootState) {
            return state.rooms.find((r) => r.id === rootState.player.roomId)
        },
        // works fine with only 2 players (need improvment for more)
        enemy(state, getters, rootState) {
            if (getters.room === undefined) return undefined
            return getters.room.players.find(p => p.socketId !== rootState.player.socketId)
        },
    },

    state: {
        rooms: [],
        replay: false,
    },

    mutations: {
        SET_ROOMS(state, payload) {
            state.rooms = payload
        },
        SET_REPLAY(state, payload) {
            state.replay = payload
        },
    },

    actions: {

        // GET_ROOMS EVENT
        emitGetRooms(store) {
            socketioService.socket.emit("toServer_getRooms", store.state);
        },

        listenGetRooms(store) {
            socketioService.socket.on("toClient_getRooms", (rooms) => {
                store.commit('SET_ROOMS', rooms)
            });
        },

        // LEAVE_ROOM EVENT
        emitLeaveRoom() {
            socketioService.socket.emit("toServer_leaveRoom");
        },

        // REPLAY EVENT
        emitReplay(store) {
            socketioService.socket.emit('toServer_replay', store.rootState.player.roomId)
        },

        listenReplay(store) {
            socketioService.socket.on('toClient_replay', () => {
                store.commit('SET_REPLAY', true)
            })
        },

        // edit state methods
        changeReplay(store, value) {
            store.commit('SET_REPLAY', value)
        },
    }
}