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
  [SET_USER] (state, user) {
    state.user = user
  },
  [SET_FRIENDSHIPS] (state, friendships) {
    state.friendships = friendships
  }
}

const actions = {
  register ({ commit }, user) {
    return new Promise((resolve, reject) => {
      client.post(`${client.apiRoot}/auth/user`, user).then((res) => {
        resolve(res)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  login ({ commit }, credentials) {
    return new Promise((resolve, reject) => {
      client.post('/api/auth', credentials).then((res) => {
        console.log(res)
        setToken(res.access_token)
        resolve(res)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  fetchUser ({ commit }) {
    return new Promise((resolve, reject) => {
      client.withAuth().get(`${client.apiRoot}/auth/user`).then((res) => {
        commit(SET_USER, res)
        resolve(res)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  fetchFriendships ({ commit }) {
    return new Promise((resolve, reject) => {
      client.withAuth().get(`${client.apiRoot}/friendships`).then((res) => {
        commit(SET_FRIENDSHIPS, res)
        resolve(res)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  acceptFriendship ({ commit }, senderId) {
    return new Promise((resolve, reject) => {
      client.withAuth().post(`${client.apiRoot}/friendships/accept/${senderId}`).then((res) => {
        commit(SET_FRIENDSHIPS, res)
        resolve(res)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  denyFriendship ({ commit }, senderId) {
    return new Promise((resolve, reject) => {
      client.withAuth().post(`${client.apiRoot}/friendships/deny/${senderId}`).then((res) => {
        commit(SET_FRIENDSHIPS, res)
        resolve(res)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
