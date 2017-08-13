<template>
  <div class="dashboard-activity-feed-post text-post">
    <post-header :post="post"></post-header>
    <div class="dashboard-activity-feed-post-body">
      <span>{{ post.postable.body }}</span>
      <span v-if="post.location"><strong>&nbsp;&mdash;</strong> at <strong>{{ post.location.name }}</strong></span>
    </div>
    <reactions :post="post" v-show="post.reactions.length"></reactions>
    <comments-list :comments="post.comments" v-show="post.comments.length"></comments-list>
    <comment-form :post-id="post.id"></comment-form>
  </div>
</template>
<script>
import PostHeader from '~/components/posts/PostHeader'
import CommentForm from '~/components/posts/CommentForm'
import CommentsList from '~/components/posts/CommentsList'
import Reactions from '~/components/posts/Reactions'
export default {
  components: {
    PostHeader,
    CommentForm,
    CommentsList,
    Reactions
  },
  props: ['post']
}
</script>
<style lang="scss">
  .dashboard-activity-feed-post {
    transition: all 350ms cubic-bezier(0.42, 0, 0.58, 1);
    background: #fff;
    margin-bottom: 30px;
    &-body {
      padding: 20px;
    }
  }
</style>



