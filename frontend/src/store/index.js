import {
  createStore
} from 'vuex'
// import createPersistedState from "vuex-persistedstate"
import connect4 from './games/connect4'
import morpion from './games/morpion'

import game from './game'
import player from './player'
import room from './room'

export default createStore({
  // plugins: [
  //   createPersistedState({
  //     paths: ['player']
  //   })
  // ],

  modules: {
    morpion,
    connect4,

    game,
    player,
    room,
  }
})