<template>
<div class="dashboard">
  <nuxt/>
</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  middleware: 'auth',
  methods: {
    ...mapActions([
      'fetchUser',
      'fetchFriendships',
      'fetchCurrentLocation'
    ])
  },
  mounted () {
    this.fetchUser().then((res) => {
      this.fetchFriendships()
    })
    navigator.geolocation.getCurrentPosition((position) => {
      this.fetchCurrentLocation(position.coords)
    })
  }
}
</script>

<style lang="scss" scoped>
.dashboard { height: 100vh; }
.dashboard-page {
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
