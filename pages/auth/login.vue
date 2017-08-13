<template>
<section class="hero is-fullheight is-primary">
  <div class="hero-body">
    <div class="container has-text-centered">
      <h3 class="title is-2">Knot</h3>
      <h4 class="subtitle is-4">Sign in below.</h4>
      <div class="box">
        <error-list v-show="Object.keys(errors).length" :errors="errors"></error-list>
        <form @submit.prevent="loginUser">
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
          <div class="field is-grouped">
            <p class="control">
              <button class="button is-primary" :class="{'is-loading': loading}" type="submit">Sign In</button>
            </p>
             <p class="control ml-auto">
              <nuxt-link to="/auth/register" class="has-text-primary is-size-7">I don't have an account.</nuxt-link>
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
  name: 'Login',
  middleware: 'guest',
  components: {
    ErrorList
  },
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      errors: {},
      loading: false
    }
  },
  methods: {
    ...mapActions(['login']),
    loginUser () {
      this.loading = true
      this.login(this.user).then((res) => {
        this.loading = false
        this.$router.push('/')
      }).catch((error) => {
        console.log(error)
        this.errors = Object.assign({}, this.errors, { error: ['Invalid credentials'] })
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
