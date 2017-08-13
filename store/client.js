import axios from 'axios'
import { Promise } from 'es6-promise'
import ls from 'local-storage'

const client = {
  auth: false,
  apiRoot: 'http://knot.app/api',
  withAuth () {
    client.auth = true
    return client
  },
  withoutAuth () {
    client.auth = false
    return client
  }
}

const httpMethods = ['get', 'post', 'put', 'delete']

httpMethods.forEach((verb) => {
  client[verb] = (url, data = {}, headers = {}) => {
    headers = client.auth ? Object.assign({}, { 'Authorization': `Bearer ${ls('access_token')}` }, headers) : headers
    return new Promise((resolve, reject) => {
      axios({
        method: verb,
        url,
        data,
        headers
      }).then((res) => {
        client.auth = false
        resolve(res.data)
      }).catch((error) => {
        client.auth = false
        if (error.response) {
          reject(error.response.data)
        } else {
          reject(error)
        }
      })
    })
  }
})

export default client
