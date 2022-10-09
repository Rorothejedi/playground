import socketioService from "../services/socketio.service"

export default {
    namespaced: true,

    getters: {
        state(state) {
            return state;
        },
    },

    state: {
        enemyData: [],
    },

    mutations: {
        SET_ENEMY_DATA(state, payload) {
            state.enemyData = payload
        }
    },

    actions: {
        emitPlay(store) {
            const data = {
                roomId: store.rootState.player.roomId,
                username: store.rootState.player.username,
                itemChosen: store.rootState.player.itemChosen,
            }
            socketioService.socket.emit('playRockPaperScissors', data)
        },

        listenPlay(store) {
            socketioService.socket.on('playRockPaperScissors', (data) => {
                store.commit('SET_ENEMY_DATA', [...store.state.enemyData, data])
            })
        },

        resetEnemyData(store) {
            store.commit('SET_ENEMY_DATA', [])
        }
    }
}