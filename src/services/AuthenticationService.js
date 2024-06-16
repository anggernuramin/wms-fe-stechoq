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

  logout() {
    localStorage.removeItem('token')
  }
}
