<template>
  <div class="navbar bg-red text-white flex items-center justify-center text-center">
    <div class="left-buttons absolute">
      <slot name="left-buttons"></slot>
    </div>
    <h3 class="navbar-title font-bold leading-none"><slot name="title"></slot></h3>
    <div class="right-buttons absolute">
      <slot name="right-buttons"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style lang="scss">
.navbar {
  height: 44px;
  text-align: center;
  padding: 0 20px;
  position: relative;
  width: 100%;
  z-index: 99;
  .left-buttons {
    top: 9px;
    left: 20px;
  }
  .right-buttons {
    top: 9px;
    right: 20px;
  }
}
</style>
