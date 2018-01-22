<template>
  <div class="bg-white mb-4">
    <post-header :post="post"></post-header>
    <p class="text-black p-4 border-t border-grey-lighter ">{{ post.postable.body }}</p>
  </div>
</template>
<script>
import PostHeader from '~/components/PostHeader'
export default {
  components: {
    PostHeader
  },
  props: ['post']
}
</script>
