<template>
<div class="dashboard-page dashboard-feed">
  <navigation-bar>
    <img src="~assets/img/knot.svg" slot="title" class="knot-logo" />
  </navigation-bar>
  <activity-feed :posts="feed"></activity-feed>
  <bottom-bar></bottom-bar>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import NavigationBar from '~/components/NavigationBar'
import ActivityFeed from '~/components/ActivityFeed'
import BottomBar from '~/components/BottomBar'
export default {
  name: 'Feed',
  layout: 'dashboard',
  components: {
    ActivityFeed,
    BottomBar,
    NavigationBar
  },
  computed: {
    ...mapGetters([
      'feed',
      'user'
    ])
  },
  methods: {
    ...mapActions([
      'fetchFeed'
    ])
  },
  mounted () {
    this.fetchFeed()
  }
}
</script>

<style lang="scss">
  .knot-logo { height: 28px; }
</style>
