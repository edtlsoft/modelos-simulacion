import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    funcion: {
      text: '',
      code: '',
    },

  },
  mutations: {
    setTextFuncion(state, valor){
      state.funcion.text = valor
    },
    setCodeFuncion(state, valor){
      state.funcion.code = valor
    },

  },
  actions: {

  }
})
