import { Promise } from 'es6-promise'
import { SET_CURRENT_LOCATION, SET_NEARBY } from '~/store/mutation-types'
import client from '~/store/client'

const state = {
  currentLocation: {
    lat: null,
    long: null,
    city: null
  },
  nearby: []
}

const getters = {
  currentLocation: state => {
    return {
      lat: +parseFloat(state.currentLocation.lat).toFixed(6),
      long: +parseFloat(state.currentLocation.long).toFixed(6),
      city: state.currentLocation.city
    }
  },
  nearby: state => state.nearby
}

const mutations = {
  [SET_CURRENT_LOCATION](state, location) {
    state.currentLocation = location
  },
  [SET_NEARBY](state, nearby) {
    state.nearby = nearby
  }
}

const actions = {
  fetchCurrentLocation({ commit }, coords) {
    return client
      .post('/api/location/current', {
        lat: coords.latitude,
        long: coords.longitude
      })
      .then(res => {
        commit('SET_CURRENT_LOCATION', {
          lat: coords.latitude,
          long: coords.longitude,
          city: res.results[0].components.city
        })
      })
  },
  fetchNearby({ commit }, coords) {
    return client
      .post('/api/location/nearby', {
        lat: coords.latitude,
        long: coords.longitude
      })
      .then(res => {
        commit('SET_NEARBY', res.response.venues)
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
