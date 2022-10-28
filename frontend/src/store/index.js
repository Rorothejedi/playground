import {
  createStore
} from 'vuex'
import connect4 from './games/connect4'
import morpion from './games/morpion'

import game from './game'
import player from './player'
import room from './room'

export default createStore({
  modules: {
    morpion,
    connect4,

    game,
    player,
    room,
  }
})