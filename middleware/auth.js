import { getTokenFromCookie, getTokenFromLocalStorage } from '~/utils/auth'

export default function({ isServer, req, redirect }) {
  if (isServer && !req) return
  const token = isServer ? getTokenFromCookie(req) : getTokenFromLocalStorage()
  if (!token) {
    return redirect('/login')
  }
}
