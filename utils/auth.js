import Cookie from 'js-cookie'
import ls from 'local-storage'

export const setToken = (token) => {
  if (process.server) return
  ls('access_token', token)
  Cookie.set('access_token', token)
}

export const getTokenFromCookie = (req) => {
  if (!req.headers.cookie) return
  const tokenCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('access_token='))
  if (!tokenCookie) return
  return tokenCookie.split('=')[1]
}

export const getTokenFromLocalStorage = () => {
  return ls('access_token')
}
