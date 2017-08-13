<template>
  <div class="bottom-bar">
    <nuxt-link to="/" class="button bottom-bar-item">
      <span class="icon is-small">
        <i class="fa fa-clock-o"></i>
      </span>
    </nuxt-link>
    <nuxt-link to="#foo" class="button bottom-bar-item">
      <span class="icon is-small">
        <i class="fa fa-bell-o"></i>
      </span>
    </nuxt-link>
    <nuxt-link to="/posts/photo-post" class="button is-primary add-new-post">
      <span class="icon is-small">
        <i class="fa fa-plus"></i>
      </span>
    </nuxt-link>
    <nuxt-link to="/friends" class="button bottom-bar-item">
      <span class="icon is-small">
        <i class="fa fa-users"></i>
      </span>
    </nuxt-link>
    <nuxt-link to="#foo" class="button bottom-bar-item">
      <span class="icon is-small">
        <i class="fa fa-photo"></i>
      </span>
    </nuxt-link>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.bottom-bar {
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 0 0 auto;
  height: 44px;
  border-top: 1px solid rgba(#000, 0.2);
  padding: 0 20px;
  position: relative;
  width: 100%;
  z-index: 99;
  .add-new-post {
    border-radius: 50%;
  }
}
</style>
