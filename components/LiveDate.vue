<template>
  <span>{{ liveDate }}</span>
</template>

<script>
import moment from 'moment-timezone'
export default {
  name: 'LiveDate',
  props: ['date'],
  data () {
    return {
      liveDate: moment.tz(this.date, 'UTC').fromNow()
    }
  },
  created () {
    setInterval(() => {
      this.liveDate = moment.tz(this.date, 'UTC').fromNow()
    }, 1000 * 60)
  }
}
</script>

<style lang="css" scoped>
</style>
