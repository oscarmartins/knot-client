<template>
<div class="notification is-danger">
  <ul>
    <li v-for="message in errorList">
      {{ message }}
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'ErrorList',
  props: [
    'errors'
  ],
  computed: {
    errorList () {
      return Object.keys(this.errors).map((error) => {
        return this.errors[error]
      }).reduce((a, b) => {
        return a.concat(b)
      }, [])
    }
  }
}
</script>
