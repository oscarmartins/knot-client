<template>
  <div class="post-header flex p-4">
    <avatar :user="post.user" class="rounded"></avatar>
    <div class="ml-2">
      <h4 class="text-black font-semibold">{{ post.user.first_name }}</h4>
      <live-date :date="post.created_at" class="text-grey text-xs"></live-date>
    </div>
  </div>
</template>
<script>
import Avatar from '~/components/Avatar'
import LiveDate from '~/components/LiveDate'
export default {
  components: {
    Avatar,
    LiveDate
  },
  props: ['post']
}
</script>
