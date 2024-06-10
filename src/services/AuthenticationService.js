import Api from '../config/Api'

export default {
  register(data) {
    return Api().post('/register', data)
  },
  login(data) {
    return Api().post('/login', data)
  },
  dashboard() {
    return Api().get('/dashboard')
  },

  getToken(token) {
    return Api().post('/token', token)
  },

  logout() {
    localStorage.removeItem('token')
  }
}
