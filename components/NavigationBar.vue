<template>
  <div class="navigation-bar">
    <div class="left-buttons">
      <slot name="left-buttons"></slot>
    </div>
    <h3 class="navigation-bar-title"><slot name="title"></slot></h3>
    <div class="right-buttons">
      <slot name="right-buttons"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavigationBar'
}
</script>

<style lang="scss">
@import "~assets/css/variables";
.navigation-bar {
  background: $primary;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  height: 44px;
  text-align: center;
  padding: 0 20px;
  position: relative;
  width: 100%;
  z-index: 99;
  .left-buttons {
    position: absolute; top: 9px; left: 20px;
  }
  .right-buttons {
    position: absolute; top: 9px; right: 20px;
  }
  &-title {
    font-weight: bold;
    line-height: 1;
  }
}
</style>
