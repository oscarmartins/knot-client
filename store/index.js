import Vuex from 'vuex'
import user from '~/store/modules/user'
import posts from '~/store/modules/posts'
import location from '~/store/modules/location'

const store = () => new Vuex.Store({
  modules: {
    user,
    posts,
    location
  }
})

export default store
