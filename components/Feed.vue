<template>
  <div class="feed">
    <transition-group 
      name="feed-posts" 
      tag="div"
    >
      <component :is="getPostType(post)" :post="post" v-for="post in posts" :key="post.id" class="feed-post"></component>
    </transition-group>
    <div class="testo">
        <form @submit.prevent="newPhotoPost">
          <input type="file" ref="photo" accept="image/*" @change="setFile">
          <button type="submit" class="bg-white border border-grey p-4 mt-2">Upload!</button>
        </form>
    </div>
  </div>
</template>
<script>
import objectToFormData from 'object-to-formdata'
import axios from 'axios'
import ls from 'local-storage'
import TextPost from '~/components/posts/TextPost.vue'
export default {
  components: {
    TextPost
  },
  props: ['posts'],
  data() {
    return {
      post: {
        body: '',
        image: {}
      }
    }
  },
  methods: {
    getPostType(post) {
      return post.postable_type.split('\\').pop()
    },
    setFile(e) {
      this.post.image = this.$refs.photo.files[0]
    },
    newPhotoPost() {
      const formData = objectToFormData(this.post)
      axios({
        method: 'POST',
        url: 'https://knot-server.test/api/posts/new/photo',
        headers: {
          Authorization: `Bearer ${ls('access_token')}`
        },
        data: formData
      }).then(res => {
        console.log('All Done: ', res)
      })
    }
  }
}
</script>
<style lang="scss">
.feed-post {
  transition: opacity 250ms ease, transform 250ms ease;
}
.feed-posts-enter,
.feed-posts-leave-to {
  opacity: 0;
  transform: scale(1.05);
}
.feed-posts-leave-active {
  position: absolute;
}
</style>
