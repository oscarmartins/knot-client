<template>
  <div class="flex flex-col w-full">
    <div class="logo-container bg-red flex items-center justify-center h-64" ref="header">
      <img src="~assets/img/logo.svg" class="logo h-16" ref="logo" />
    </div>
    <div class="bg-white flex flex-col justify-center flex-grow p-8" ref="form">
      <form class="flex flex-col" @submit.prevent="loginUser">
        <input class="mb-3 h-12 border-b-2 border-grey-lighter focus:border-grey-light" type="email" v-model="user.email" placeholder="Email"/>
        <input class="mb-3 h-12 border-b-2 border-grey-lighter focus:border-grey-light" type="password" v-model="user.password" placeholder="Password"/>
        <button class="bg-red text-white h-12 rounded mt-6 hover:bg-red-dark" type="submit" :disabled="loading">Sign In</button>
      </form>
      <p class="font-semibold text-sm mt-6 w-full text-grey-dark text-center">Don't have an account? <nuxt-link to="/register" class="text-red no-underline">Sign Up</nuxt-link></p>
    </div>
  </div>
</template>

<script>
import anime from 'animejs'
import { mapActions } from 'vuex'
export default {
  layout: 'auth',
  middleware: 'guest',
  data() {
    return {
      loading: false,
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(['login']),
    loginUser(e) {
      this.loading = true
      this.login(this.user).then(() => {
        this.animateOut()
      })
    },
    animateOut() {
      const timeline = anime.timeline()
      timeline
        .add({
          targets: [this.$refs.logo, this.$refs.form],
          opacity: 0
        })
        .add({
          targets: this.$refs.header,
          height: 44,
          offset: '-=100'
        })
        .finished.then(() => this.$router.push('/dashboard'))
    }
  }
}
</script>
