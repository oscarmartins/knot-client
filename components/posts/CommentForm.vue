<template>
  <div class="dashboard-activity-feed-post-comment-form">
    <form @submit.prevent="doAddComment">
      <textarea v-model="comment" placeholder="Add a comment..."></textarea>
      <button class="button is-small is-primary" type="submit" :disabled="commentEmpty || postingComment">Send</button>
    </form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'CommentForm',
  props: ['postId'],
  data () {
    return {
      comment: '',
      postingComment: false
    }
  },
  computed: {
    ...mapGetters(['currentLocation']),
    commentEmpty () {
      return this.comment.trim() === ''
    }
  },
  methods: {
    ...mapActions([
      'addComment'
    ]),
    doAddComment () {
      this.postingComment = true
      let commentData = {
        id: this.postId,
        body: this.comment
      }
      if (this.currentLocation.city !== null) {
        commentData.location = this.currentLocation
      }
      this.addComment(commentData).then((res) => {
        this.postingComment = false
        this.comment = ''
      })
    }
  }
}
</script>
<style lang="scss">
.dashboard-activity-feed-post-comment-form {
  border-top: 1px solid rgba(#000, 0.1);
  padding: 10px;
  form {
    display: flex;
    textarea {
      border: none;
      outline: none;
      flex-grow: 1;
      font-size: 13px;
      margin-right: 10px;
      min-height: 27px;
      padding: 10px;
      resize: none;
    }
    .button {
      align-self: flex-start;
    }
  }
}
</style>


