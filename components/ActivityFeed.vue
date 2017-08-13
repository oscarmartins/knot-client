<template>
<transition-group class="dashboard-activity-feed" name="dashboard-activity-feed" tag="div">
  <component :is="getPostType(post)" :post="post" v-for="post in posts" :key="post.id"></component>
</transition-group>
</template>
<script>
import TextPost from '~/components/posts/TextPost.vue'
import PhotoPost from '~/components/posts/PhotoPost.vue'
export default {
  name: 'ActivityFeed',
  components: {
    TextPost,
    PhotoPost
  },
  props: ['posts'],
  methods: {
    getPostType (post) {
      return post.postable_type.split('\\').pop()
    }
  }
}
</script>
<style lang="scss">
.dashboard-activity-feed {
  position: relative;
  flex: 1 1 auto;
  overflow-y: auto;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding-top: 20px;
  &-enter, &-leave-to {
    opacity: 0;
    transform: scale(1.3);
  }
  &-leave-active {
    position: absolute;
    width: 100%;
  }
}
</style>


