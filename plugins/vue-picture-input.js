import Vue from 'vue'
import vPictureInput from '~/components/PictureInput'

let PictureInput = {}

if (process.browser) {
  PictureInput = {
    install (Vue, options) {
      Vue.component('PictureInput', vPictureInput)
    }
  }
  Vue.use(PictureInput)
}

export default PictureInput
