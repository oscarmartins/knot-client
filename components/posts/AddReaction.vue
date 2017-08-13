<template>
<ul class="reactions">
  <li class="reaction" v-for="(path, key) in reactions" :key="key" @click="doAddReaction(key)">
    <img :src="path" width="24" height="24" />
  </li>
</ul>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'AddReaction',
  props: ['id'],
  data () {
    return {
      reactions: {
        'smile': '/reactions/smile.svg',
        'love': '/reactions/love.svg',
        'frown': '/reactions/frown.svg',
        'surprise': '/reactions/surprise.svg',
        'laugh': '/reactions/laugh.svg',
        'angry': '/reactions/angry.svg'
      }
    }
  },
  methods: {
    ...mapActions(['addReaction']),
    doAddReaction (reaction) {
      this.$emit('hide')
      this.addReaction({
        id: this.id,
        reaction: { type: reaction }
      })
    }
  }
}
</script>

<style lang="scss">
.reactions {
  background: rgba(#000, 0.5);
  border-radius: 34px;
  display: flex;
  position: absolute; top: -5px; right: 34px;
  padding: 5px;
  &-enter-active, &-leave-active {
    transition: opacity 175ms cubic-bezier(0.42, 0, 0.58, 1), transform 175ms cubic-bezier(0.42, 0, 0.58, 1);
  }
  &-enter, &-leave-to {
    transform: translateX(30px);
    opacity: 0;
  }
  .reaction {
    cursor: pointer;
    margin-left: 10px;
    width: 24px;
    height: 24px;
    &:first-child { margin-left: 0; }
    img {
      transition: transform 250ms ease;
      &:hover {
       transform: scale(1.3);
      }
    }
  }
}
</style>


