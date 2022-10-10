export default {
    namespaced: true,

    // getters: {
    //     state(state) {
    //         return state;
    //     },
    // },

    state: {
        socketId: '',
        username: '',
        roomId: null,
        host: false,
        turn: false,
        isWinner: false,
        outcome: '',
        score: 0,
    },

    mutations: {
        SET_SOCKET_ID(state, payload) {
            state.socketId = payload
        },
        SET_USERNAME(state, payload) {
            state.username = payload
        },
        SET_ROOM_ID(state, payload) {
            state.roomId = payload
        },
        SET_HOST(state, payload) {
            state.host = payload
        },
        SET_TURN(state, payload) {
            state.turn = payload
        },
        SET_IS_WINNER(state, payload) {
            state.isWinner = payload
        },
        SET_OUTCOME(state, payload) {
            state.outcome = payload
        },
        SET_SCORE(state, payload) {
            state.score = payload
        },
    },

    actions: {
        changeSocketId(store, value) {
            store.commit('SET_SOCKET_ID', value)
        },
        changeUsername(store, value) {
            store.commit('SET_USERNAME', value)
        },
        changeRoomId(store, value) {
            store.commit('SET_ROOM_ID', value)
        },
        changeHost(store, value) {
            store.commit('SET_HOST', value)
        },
        changeTurn(store, value) {
            store.commit('SET_TURN', value)
        },
        changeIsWinner(store, value) {
            store.commit('SET_IS_WINNER', value)
        },
        changeOutcome(store, value) {
            store.commit('SET_OUTCOME', value)
        },
        changeScore(store, value) {
            store.commit('SET_SCORE', value)
        },
    }
}