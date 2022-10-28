import socketioService from "../services/socketio.service"
import router from '@/router'

export default {
    namespaced: true,

    getters: {
        room(state, getters, rootState) {
            return state.rooms.find((r) => r.id === rootState.player.roomId)
        },
        enemies(state, getters, rootState) {
            if (getters.room === undefined) return undefined
            return getters.room.players.filter(p => p.socketId !== rootState.player.socketId)
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

        // CREATE_OR_JOIN_ROOM EVENT
        emitCreateOrJoinRoom(store) {
            store.commit('player/SET_SOCKET_ID', socketioService.socket.id, {
                root: true
            })

            const data = {
                socketId: store.rootState.player.socketId,
                username: store.rootState.player.username,
                roomId: store.rootState.player.roomId,
                host: store.rootState.player.host,
                game: store.rootState.game.game,
                scoreToReach: store.rootState.game.scoreToReach,
                numberOfPlayer: store.rootState.game.numberOfPlayer,
            }

            socketioService.socket.emit("toServer_createOrJoinRoom", data);
        },

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

        // ERROR EVENT

        listenError() {
            socketioService.socket.on("toClient_error", () => {
                router.push({
                    name: "Home"
                });
            });
        },

        // ------

        changeReplay(store, value) {
            store.commit('SET_REPLAY', value)
        },
    }
}