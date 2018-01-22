<template>
  <div>
  </div>
</template>

<script>
export default {
  layout: 'auth',
  middleware: 'guest',
  fetch({ store, redirect }) {
    return redirect('/login')
  }
}
</script>
