<template>
<ul class="reactions flex absolute rounded-full p-1">
  <li class="reaction w-6 h-6 ml-3 cursor-pointer" v-for="(path, key) in reactions" :key="key" @click="doAddReaction(key)">
    <img class="w-6 h6" :src="path" />
  </li>
</ul>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['id'],
  data() {
    return {
      reactions: {
        smile: '/images/reactions/smile.svg',
        love: '/images/reactions/love.svg',
        frown: '/images/reactions/frown.svg',
        surprise: '/images/reactions/surprise.svg',
        laugh: '/images/reactions/laugh.svg',
        angry: '/images/reactions/angry.svg'
      }
    }
  },
  methods: {
    ...mapActions(['addReaction']),
    doAddReaction(reaction) {
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
  top: -5px;
  right: 34px;
  &-enter-active,
  &-leave-active {
    transition: opacity 175ms cubic-bezier(0.42, 0, 0.58, 1),
      transform 175ms cubic-bezier(0.42, 0, 0.58, 1);
  }
  &-enter,
  &-leave-to {
    transform: translateX(30px);
    opacity: 0;
  }
  .reaction {
    &:first-child {
      margin-left: 0;
    }
    img {
      transition: transform 250ms ease;
      &:hover {
        transform: scale(1.3);
      }
    }
  }
}
</style>
