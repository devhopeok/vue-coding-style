import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    assignment: {}
  },
  
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SET_ASSIGNMENT(state, assignment) {
      state.assignment = assignment
    }
  },

  actions: {
    setUser({ commit }, user) {
      commit('SET_USER', user)
    },
    setAssignment({ commit }, assignment) {
      commit('SET_ASSIGNMENT', assignment)
    }
  },

  getters: {
    user: state => state.user,
    assignment: state => state.assignment
  }
})
