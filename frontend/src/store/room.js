import socketioService from "../services/socketio.service"

export default {
    namespaced: true,

    getters: {
        state(state) {
            return state;
        },
    },

    state: {
        rooms: []
    },

    mutations: {
        SET_ROOMS(state, payload) {
            state.rooms = payload
        },
    },

    actions: {
        emitRooms(store) {
            socketioService.socket.emit("roomsData", store.state);
        },

        listenRooms(store) {
            socketioService.socket.on("getRoomsList", (rooms) => {
                store.commit('SET_ROOMS', rooms)
            });
        }
    }
}