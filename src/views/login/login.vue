<template>
  <section class="flex items-center justify-center w-full min-h-screen bg-repeat bg-cover shadow-md bg-custom-bg">
    <div class="flex items-center justify-center w-full min-h-screen bg-slate-700 bg-opacity-70">
      <div class="flex flex-col justify-center flex-1 max-w-sm min-h-full p-5 px-6 py-12 bg-white lg:px-8">
        <div class="max-w-sm rounded-md sm:mx-auto sm:w-full">
          <ul class="text-4xl font-bold leading-3 tracking-tight text-center text-blue-800">
            <li>SIGN IN</li>
          </ul>
          <h2 class="mt-3 italic font-bold leading-9 tracking-tight text-center text-gray-800 text-l">
            Sign in with your email and password
          </h2>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
            <div class="mt-2">
              <input
                id="email"
                v-model="email"
                name="email"
                type="email"
                autocomplete="email"
                required="admin@gmail.com"
                placeholder="Masukkan Email"
                class="block indent-3 w-full rounded-md border-0 py-1.5 text:text-gray-900 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            </div>
            <div class="mt-2">
              <input
                id="password"
                v-model="password"
                name="password"
                type="password"
                autocomplete="current-password"
                placeholder="Masukkan Password"
                required="admin123"
                class="block indent-3 w-full rounded-md border-0 py-1.5 text:text-gray-900 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="error" v-html="error"></div>
          <br />
          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              @click="login"
            >
              Sign in
            </button>
          </div>
          <p>Don't have an account? <a href="#" @click="showRegister">Register here</a></p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AuthenticationService from '../../services/AuthenticationService'
import axios from 'axios'

export default {
  name: 'BackgroundSection',
  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login() {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        const token = response.data.token
        const expiresIn = response.data.expiresIn

        const expirationDate = new Date().getTime() + expiresIn * 1000

        localStorage.setItem('token', token)
        localStorage.setItem('tokenExpiration', expirationDate)
        this.$router.push({ name: 'dashboard' })
      } catch (err) {
        console.log(err)
        if (err.response && err.response.data) {
          this.error = err.response.data.error
        } else {
          this.error = 'Server error.'
        }
      }
    },
    showRegister() {
      // redirect to register page
      this.$router.push({ name: 'register' })
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
