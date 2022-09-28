export default {
    namespaced: true,

    state: {
        username: '',
    },

    mutations: {
        SET_USERNAME(state, payload) {
            state.username = payload
        },
    },

    actions: {
        changeUsername(store, value) {
            store.commit('SET_USERNAME', value)
        },
    }
}