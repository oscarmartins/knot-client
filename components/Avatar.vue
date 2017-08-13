<template>
  <img :src="src" :alt="user.name" :width="size" :height="size" class="avatar">
</template>
<script>
export default {
  name: 'Avatar',
  props: {
    user: {
      type: Object,
      required: true
    },
    fallback: {
      type: String,
      default: '/avatar-default.jpg'
    },
    size: {
      type: Number,
      default: 35
    }
  },
  computed: {
    src () {
      return this.user.avatar_url ? this.user.avatar_url : this.fallback
    }
  }
}
</script>

