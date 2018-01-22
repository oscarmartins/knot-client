import { Promise } from 'es6-promise'
import axios from '~/plugins/axios'
import ls from 'local-storage'

const verbs = ['get', 'post', 'put', 'delete']

const client = {
  auth: false,
  apiRoot: process.env.serverUrl,
  withAuth() {
    client.auth = true
    return client
  },
  withoutAuth() {
    client.auth = false
    return client
  }
}

verbs.forEach(verb => {
  client[verb] = (url, data = {}, headers = {}) => {
    return new Promise((resolve, reject) => {
      return axios({
        method: verb,
        url,
        data,
        headers:
          client.auth && ls('access_token')
            ? Object.assign(
                {},
                { Authorization: `Bearer ${ls('access_token')}` },
                headers
              )
            : headers
      })
        .then(res => {
          client.auth = false
          resolve(res.data)
        })
        .catch(error => {
          client.auth = false
          if (error.response.status === 401) {
            this.app.router.push('logout')
          }
          reject(error.response.data)
        })
    })
  }
})

export default client
