import {
  createStore
} from 'vuex'
import createPersistedState from "vuex-persistedstate"
import user from './user.js'

export default createStore({
  plugins: [
    createPersistedState({
      paths: ['user']
    })
  ],

  modules: {
    user,
  }
})