import { Promise } from 'es6-promise'
import { SET_USER, SET_FRIENDSHIPS } from '~/store/mutation-types'
import client from '~/store/client'
import { setToken } from '~/utils/auth'

const state = {
  user: {},
  friendships: {}
}

const getters = {
  user: state => state.user,
  friendships: state => state.friendships
}

const mutations = {
  [SET_USER](state, user) {
    state.user = user
  },
  [SET_FRIENDSHIPS](state, friendships) {
    state.friendships = friendships
  }
}

const actions = {
  register({ commit }, user) {
    return client.post(`${client.apiRoot}/auth/user`, user).then(res => {
      commit(SET_USER, res)
    })
  },
  login({ commit }, credentials) {
    return client.post('/api/auth', credentials).then(res => {
      setToken(res.access_token)
    })
  },
  fetchUser({ commit }) {
    return client
      .withAuth()
      .get(`${client.apiRoot}/auth/user`)
      .then(res => {
        commit(SET_USER, res)
      })
  },
  fetchFriendships({ commit }) {
    return client
      .withAuth()
      .get(`${client.apiRoot}/friendships`)
      .then(res => {
        commit(SET_FRIENDSHIPS, res)
      })
  },
  acceptFriendship({ commit }, senderId) {
    return client
      .withAuth()
      .post(`${client.apiRoot}/friendships/accept/${senderId}`)
      .then(res => {
        commit(SET_FRIENDSHIPS, res)
      })
  },
  denyFriendship({ commit }, senderId) {
    return client
      .withAuth()
      .post(`${client.apiRoot}/friendships/deny/${senderId}`)
      .then(res => {
        commit(SET_FRIENDSHIPS, res)
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
