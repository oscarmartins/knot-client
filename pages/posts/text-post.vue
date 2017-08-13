<template>
  <div class="dashboard-page new-post new-text-post">
    <navigation-bar>
      <span slot="title">New Thought</span>
      <div class="button is-primary is-inverted is-outlined is-small" slot="left-buttons" @click="$router.go(-1)">Cancel</div>
    </navigation-bar>
    <div class="new-post-inner">
      <transition name="nearby-list">
        <add-location v-show="addingLocation" @locationChosen="attachLocation" @hide="addingLocation = false"></add-location>
      </transition>
      <form @submit.prevent="newTextPost">
        <div class="field">
          <div class="control">
            <textarea  class="textarea" name="" id="" rows="10" v-model="post.body" placeholder="What's on your mind?"></textarea>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <a class="button add-location" href="#" @click.prevent="addingLocation = true">
              <span class="icon">
                <i class="fa fa-location-arrow"></i>
              </span>
              <span>{{ locationButtonLabel }}</span>
            </a>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <button class="button is-primary" :class="{'is-loading': posting}" type="submit">Save Post</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ls from 'local-storage'
import objectToFormData from 'object-to-formdata'
import AddLocation from '~/components/AddLocation'
import NavigationBar from '~/components/NavigationBar'

export default {
  name: 'NewTextPost',
  components: {
    AddLocation,
    NavigationBar
  },
  data () {
    return {
      posting: false,
      addingLocation: false,
      post: {
        body: ''
      }
    }
  },
  computed: {
    locationButtonLabel () {
      return this.post.hasOwnProperty('location') ? this.post.location.name : 'I\'m at...'
    }
  },
  methods: {
    attachLocation (place) {
      this.addingLocation = false
      this.post = Object.assign({}, this.post, { location: place })
    },
    newTextPost () {
      this.posting = true
      const formData = objectToFormData(this.post)
      axios({
        method: 'POST',
        url: 'http://knot.app/api/posts/new/text',
        headers: {
          'Authorization': `Bearer ${ls('access_token')}`
        },
        data: formData
      }).then((res) => {
        this.posting = false
        this.$router.push('/')
      })
    }
  }
}
</script>

<style lang="scss">
.new-post {
  background: #f0f0f0;
}
.new-post-inner {
  flex: 1 1 auto;
  position: relative;/* need this to position inner content */
  overflow-y: auto;
  width: 90%;
  margin: 0 auto;
  padding-top: 20px;
  .add-location {
    width: 100%;
  }
}
</style>
