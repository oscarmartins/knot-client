<template>
<div class="post-reactions">
  <ul class="post-reaction-list">
    <li class="post-reaction" v-for="reaction in post.reactions" :key="reaction.id">
      <Avatar :size="25" :user="reaction.user"></Avatar>
      <img :src="reactionIconPath(reaction)" width="18" height="18" class="post-reaction-icon" />
    </li>
  </ul>
</div>
</template>

<script>
import Avatar from '~/components/Avatar'
export default {
  name: 'Reactions',
  components: {
    Avatar
  },
  props: ['post'],
  methods: {
    reactionIconPath (reaction) {
      // TODO: Move these to their own module
      const reactions = {
        'smile': '/reactions/smile.svg',
        'love': '/reactions/love.svg',
        'frown': '/reactions/frown.svg',
        'surprise': '/reactions/surprise.svg',
        'laugh': '/reactions/laugh.svg',
        'angry': '/reactions/angry.svg'
      }

      return reactions[reaction.type]
    }
  }
}
</script>

<style lang="scss">
.post-reactions {
  border-top: 1px solid rgba(#000, 0.1);
  padding: 10px 20px 0 20px;
  .post-reaction-list {
    display: flex;
    flex-wrap: wrap;
    margin: 0; padding: 0;
    .post-reaction {
      line-height: 1;
      margin-right: 10px;
      margin-bottom: 10px;
      position: relative;
      img.avatar {
        border-radius: 2px;
      }
      img.post-reaction-icon {
        position: absolute;
        bottom: -4px; right: -5px;
        width: 18px; height: 18px;
      }
    }
  }
}
</style>
