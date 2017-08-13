<template>
<section class="hero is-fullheight is-primary">
  <div class="hero-body">
    <div class="container has-text-centered">
      <h3 class="title is-2">Knot</h3>
      <h4 class="subtitle is-4">Fill out your information below.</h4>
      <div class="box">
        <error-list v-show="Object.keys(errors).length" :errors="errors"></error-list>
        <form @submit.prevent="registerUser">
          <div class="field">
            <p class="control">
              <input class="input" type="text" placeholder="First name" v-model="user.first_name">
            </p>
          </div>
          <div class="field">
            <p class="control">
              <input class="input" type="text" placeholder="Last name" v-model="user.last_name">
            </p>
          </div>
          <div class="field">
            <p class="control">
              <input class="input" type="email" placeholder="Your email" v-model="user.email">
            </p>
          </div>
          <div class="field">
            <p class="control">
              <input class="input" type="password" placeholder="Enter a password" v-model="user.password">
            </p>
          </div>
          <div class="field">
            <p class="control">
              <input class="input" type="password" placeholder="Confirm your password" v-model="user.password_confirmation">
            </p>
          </div>
          <div class="field is-grouped">
            <p class="control">
              <button class="button is-primary" :class="{'is-loading': loading}" type="submit">Sign Up</button>
            </p>
             <p class="control ml-auto">
              <nuxt-link to="/auth/login" class="has-text-primary is-size-7">I already have an account.</nuxt-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import { mapActions } from 'vuex'
import ErrorList from '~/components/ErrorList'
export default {
  name: 'Register',
  middleware: 'guest',
  components: {
    ErrorList
  },
  data () {
    return {
      user: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      errors: {},
      loading: false
    }
  },
  methods: {
    ...mapActions(['register', 'login']),
    registerUser () {
      this.loading = true
      this.register(this.user).then((res) => {
        this.loading = false
        this.login({ email: this.user.email, password: this.user.password }).then((res) => {
          this.$router.push('/')
        })
      }).catch((error) => {
        this.errors = error
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .field.is-grouped {
    align-items: center;
  }
</style>
