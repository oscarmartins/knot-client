<template>
  <div class="dashboard-activity-feed-post photo-post">
    <post-header :post="post"></post-header>
    <div class="dashboard-activity-feed-post-image-wrap" :style="{ paddingBottom: aspectRatio}">
      <div class="dashboard-activity-feed-post-image">
        <img :data-src="post.postable.image_url" :alt="post.postable.body" class="lazyload">
      </div>
    </div>
    <div class="dashboard-activity-feed-post-body" v-if="post.postable.body">
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
  props: ['post'],
  computed: {
    aspectRatio () {
      return `${(this.post.postable.height / this.post.postable.width) * 100}%`
    }
  }
}
</script>
<style lang="scss">
  .lazyload,
  .lazyloading {
	  opacity: 0;
  }
  .lazyloaded {
	  opacity: 1;
	  transition: opacity 300ms;
  }
  .dashboard-activity-feed-post {
    transition: all 350ms cubic-bezier(0.42, 0, 0.58, 1);
    background: #fff;
    display: block;
    margin-bottom: 30px;
    width: 100%;
    .dashboard-activity-feed-post-image-wrap {
      background: #f5f6f9;
      position: relative;
      height: 0;
      .dashboard-activity-feed-post-image {
        position: absolute; top: 0; left: 0;
        width: 100%; height: 100%;
        img {
          width: 100%;
        }
      }
    }
    &-body {
      padding: 20px;
    }
  }
</style>



