<template>
  <ul class="post-comments">
    <li class="post-comment" v-for="comment in comments" :key="comment.id">
      <Avatar :user="comment.user" :size="30"></Avatar>
      <div class="comment-content">
        <div class="comment-body">
          <strong>{{ comment.user.first_name }}: </strong> {{ comment.body }}
        </div>
        <div class="comment-meta">
          <live-date class="comment-created-at" :date="comment.created_at"></live-date>
          <span class="comment-location" v-if="comment.location"> from {{ comment.location.city }}</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import Avatar from '~/components/Avatar'
import LiveDate from '~/components/LiveDate'
export default {
  name: 'CommentsList',
  components: {
    Avatar,
    LiveDate
  },
  props: ['comments']
}
</script>

<style lang="scss">
  .post-comments {
    margin: 0; padding: 0;
    .post-comment {
      border-top: 1px solid rgba(#000, 0.1);
      display: flex;
      padding: 10px 20px;
      .avatar {
        border-radius: 2px;
        margin-right: 10px;
        width: 30px; height: 30px;
      }
      .comment-content {
        position: relative; top: -5px;
        .comment-body {
          font-size: 15px;
        }
        .comment-meta {
          color: #b4b4b4;
          font-size: 13px;
        }
      }
    }
  }
</style>
