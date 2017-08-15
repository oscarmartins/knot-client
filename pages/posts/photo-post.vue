<template>
  <transition name="new-post" mode="in-out">
    <div class="dashboard-page new-post new-photo-post">
      <navigation-bar>
        <span slot="title">New Photo</span>
        <div class="button is-primary is-inverted is-outlined is-small" slot="left-buttons" @click="$router.push('/')">Cancel</div>
      </navigation-bar>
      <div class="new-post-inner">
        <transition name="nearby-list">
          <add-location v-show="addingLocation" @locationChosen="attachLocation" @hide="addingLocation = false"></add-location>
        </transition>
        <form @submit.prevent="newPhotoPost">
          <div class="field">
            <div class="control">
              <picture-input
                ref="pictureInput"
                @change="setFile"
                accept="image/*"
                size="10"
                buttonClass="button is-primary"
                >
              </picture-input>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <textarea class="textarea" rows="3" v-model="post.body" placeholder="Caption your photo"></textarea>
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
  </transition>
</template>

<script>
import axios from 'axios'
import ls from 'local-storage'
import objectToFormData from 'object-to-formdata'
import AddLocation from '~/components/AddLocation'
import NavigationBar from '~/components/NavigationBar'

export default {
  name: 'NewPhotoPost',
  components: {
    AddLocation,
    NavigationBar
  },
  data () {
    return {
      posting: false,
      addingLocation: false,
      post: {
        body: '',
        image: null,
        location: {}
      }
    }
  },
  computed: {
    locationButtonLabel () {
      return Object.keys(this.post.location).length ? this.post.location.name : 'I\'m at...'
    }
  },
  methods: {
    setFile () {
      this.post.image = this.$refs.pictureInput.file
    },
    attachLocation (place) {
      this.addingLocation = false
      this.post = Object.assign({}, this.post, { location: place })
    },
    newPhotoPost () {
      this.posting = true
      const formData = objectToFormData(this.post)
      axios({
        method: 'POST',
        url: 'http://knot.app/api/posts/new/photo',
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
  &-enter-active, &-leave-active {
    transition: transform 350ms cubic-bezier(0.42, 0, 0.58, 1);
    position: absolute; top: 0; left: 0; width: 100%; z-index: 2;
  }
  &-enter, &-leave-to {
    transform: translate3d(0, 100%, 0);
  }
}
.new-post-inner {
  flex: 1 1 auto;
  position: relative;/* need this to position inner content */
  overflow-y: auto;
  width: 90%;
  margin: 0 auto;
  max-width: 600px;
  padding-top: 20px;
  .add-location {
    width: 100%;
  }
}
</style>
