import {
  createStore
} from 'vuex'
// import createPersistedState from "vuex-persistedstate"
import player from './player'
import room from './room'

export default createStore({
  // plugins: [
  //   createPersistedState({
  //     paths: ['player']
  //   })
  // ],

  modules: {
    player,
    room,
  }
})