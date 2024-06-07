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
    localStorage.removeItem('tokenExpiration')
  }
  // isLoggedIn() {
  //   const token = localStorage.getItem('token')
  //   const expirationDate = localStorage.getItem('tokenExpiration')
  //   const now = new Date().getTime()

  //   return token && expirationDate && now < expirationDate
  // }
}

// AuthenticationService.register({
//   email: 'testing@gmail.com',
//   password: '123456'
// })
