import {
  createStore
} from 'vuex'
// import createPersistedState from "vuex-persistedstate"
import game from './game'
import morpion from './morpion'
import player from './player'
import room from './room'

export default createStore({
  // plugins: [
  //   createPersistedState({
  //     paths: ['player']
  //   })
  // ],

  modules: {
    game,
    morpion,
    player,
    room,
  }
})