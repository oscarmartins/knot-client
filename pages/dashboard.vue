<template>
  <div class="dashboard-wrapper">
    <navbar>
      <img src="~assets/img/logo.svg" slot="title" class="logo h-6" ref="logo" />
    </navbar>
    <div class="dashboard-content bg-grey-lighter overflow-y-scroll scrolling-touch py-8 px-4">
      <feed :posts="feed"></feed>
    </div>
    <div class="bottom-bar bg-grey-lightest"></div>
  </div>
</template>
<script>
import anime from 'animejs'
import { mapActions, mapGetters } from 'vuex'
import Navbar from '~/components/Navbar'
import Feed from '~/components/Feed'
export default {
  middleware: 'auth',
  components: {
    Navbar,
    Feed
  },
  computed: {
    ...mapGetters(['feed', 'user'])
  },
  methods: {
    ...mapActions(['fetchFeed'])
  },
  mounted() {
    this.fetchFeed()
    anime({
      targets: this.$refs.logo,
      opacity: 1
    })
  }
}
</script>
<style lang="scss">
.dashboard-wrapper {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 44px 1fr 44px;
  height: 100%;
}
.logo {
  opacity: 0;
}
</style>
