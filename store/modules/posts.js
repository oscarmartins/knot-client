import { Promise } from 'es6-promise'
import { ADD_COMMENT, SET_FEED, ADD_REACTION } from '~/store/mutation-types'
import client from '~/store/client'

const state = {
  feed: []
}

const getters = {
  feed: state => state.feed
}

const mutations = {
  [SET_FEED] (state, items) {
    state.feed = items
  },
  [ADD_COMMENT] (state, { id, comment }) {
    state.feed = state.feed.map((post) => {
      if (post.id === id) {
        post.comments.push(comment)
      }

      return post
    })
  },
  [ADD_REACTION] (state, { id, reactions }) {
    state.feed = state.feed.map((post) => {
      if (post.id === id) {
        post.reactions = reactions
      }

      return post
    })
  }
}

const actions = {
  fetchFeed ({ commit }) {
    return new Promise((resolve, reject) => {
      client.withAuth().get(`${client.apiRoot}/feed`).then((res) => {
        commit(SET_FEED, res)
        resolve(res)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  addComment ({ commit }, commentData) {
    return new Promise((resolve, reject) => {
      client.withAuth().post(`${client.apiRoot}/posts/${commentData.id}/comments`, commentData).then((res) => {
        commit(ADD_COMMENT, {
          id: commentData.id,
          comment: res
        })
        resolve(res)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  addReaction ({ commit }, {id, reaction}) {
    return new Promise((resolve, reject) => {
      client.withAuth().post(`${client.apiRoot}/posts/${id}/reactions`, reaction).then((res) => {
        commit(ADD_REACTION, {
          id,
          reactions: res.reactions
        })
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
