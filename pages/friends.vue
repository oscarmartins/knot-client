<template>
  <div class="dashboard-page dashboard-friends">
    <navigation-bar>
      <span slot="title">Friends</span>
    </navigation-bar>
    <div class="friendships">
      <ul class="friendship-list friend-requests" v-if="friendships.requests.length">
        <li class="friendships-list-header">Friend Requests</li>
        <li v-for="req in friendships.requests" :key="req.id">
          <avatar :user="req.sender"></avatar>
          <div class="sender-name">{{ req.sender.full_name }}</div>
          <div class="friend-request-buttons">
            <button class="button is-danger is-small mr-2" @click="denyFriendship(req.sender_id)">
              <span class="icon is-small">
                <i class="fa fa-times"></i>
              </span>
            </button>
            <button class="button is-success is-small" @click="acceptFriendship(req.sender_id)">
              <span class="icon is-small">
                <i class="fa fa-check"></i>
              </span>
            </button>
          </div>
        </li>
      </ul>
      <ul class="friendship-list friends" v-if="friendships.friends.length">
        <li class="friendships-list-header">Friends</li>
        <li v-for="friend in friendships.friends" :key="friend.id">
          <avatar :user="friend"></avatar>
          <div class="sender-name">{{ friend.full_name }}</div>
        </li>
      </ul>
    </div>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import NavigationBar from '~/components/NavigationBar'
import BottomBar from '~/components/BottomBar'
import Avatar from '~/components/Avatar'
export default {
  name: 'Friends',
  layout: 'dashboard',
  components: {
    Avatar,
    BottomBar,
    NavigationBar
  },
  computed: {
    ...mapGetters(['friendships'])
  },
  methods: {
    ...mapActions([
      'fetchFriendships',
      'acceptFriendship',
      'denyFriendship'
    ])
  }
}
</script>

<style lang="scss">
.dashboard-friends {
  .friendships {
    position: relative;
    flex: 1 1 auto;
    overflow-y: auto;
  }
  .friendship-list {
    background: #fff;
    margin: 0;
    padding: 0;
    li.friendships-list-header {
      display: flex;
      align-items: center;
      background: #eee;
      border-bottom: 1px solid #ccc;
      font-weight: bold;
      height: 28px;
      letter-spacing: 2px;
      padding: 0 20px;
      text-transform: uppercase;
      font-size: 12px;
    }
    li:not(.friendships-list-header) {
      display: flex;
      align-items: center;
      padding: 5px 20px;
      min-height: 70px;
      border-bottom: 1px solid #eee;
      .avatar {
        border-radius: 2px;
        margin-right: 10px;
      }
      .friend-request-buttons {
        margin-left: auto;
      }
    }
  }
}
</style>
