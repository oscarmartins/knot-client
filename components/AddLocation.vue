<template>
<div class="dashboard-page dashboard-add-location">
  <navigation-bar>
    <span slot="title">Nearby Places</span>
    <div class="button is-primary is-inverted is-outlined is-small" slot="left-buttons" @click="hide">Cancel</div>
  </navigation-bar>
  <div class="nearby-list">
    <ul>
      <li v-for="place in nearby" @click="chooseLocation(place)" :key="place.id">
        <span>{{ place.name }}</span>
        <span class="location-meta">
          <span v-if="place.categories[0]">{{ place.categories[0].name }}</span>
          <span v-if="place.location.address">&nbsp;at {{ place.location.address }}</span>
        </span>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import NavigationBar from '~/components/NavigationBar'
export default {
  name: 'AddLocation',
  components: {
    NavigationBar
  },
  computed: {
    ...mapGetters([
      'currentLocation',
      'nearby'
    ])
  },
  methods: {
    ...mapActions(['fetchNearby']),
    chooseLocation (place) {
      const locationObj = {
        lat: +parseFloat(place.location.lat).toFixed(6),
        long: +parseFloat(place.location.lng).toFixed(6),
        name: place.name
      }
      this.$emit('locationChosen', locationObj)
    },
    hide () {
      this.$emit('hide')
    }
  },
  mounted () {
    if (this.currentLocation.lat) {
      this.fetchNearby({latitude: this.currentLocation.lat, longitude: this.currentLocation.long})
    }
  }
}
</script>

<style lang="scss">
  .dashboard-add-location {
    position: fixed; top: 0; left: 0;
    width: 100%; height: 100%;
    z-index: 99999;
  }
  .nearby-list {
    background: #fff;
    height: calc(100vh - 44px);
    overflow-y: auto;
    position: relative;/* need this to position inner content */
    z-index: 1;

    &-enter-active, &-leave-active {
      transition: transform 350ms cubic-bezier(0.42, 0, 0.58, 1);
    }
    &-enter, &-leave-to {
      transform: translate3d(0, 100%, 0);
    }
    ul {
      margin: 0; padding: 0;
      li {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 5px 20px;
        min-height: 44px;
        border-bottom: 1px solid #eee;
        .location-meta {
          color: #b4b4b4;
          font-size: 13px;
        }
      }
    }
  }
</style>
