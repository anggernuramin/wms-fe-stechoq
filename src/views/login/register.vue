<template>
  <section class="w-full min-h-screen bg-center bg-repeat bg-cover shadow-md bg-custom-bg">
    <div class="flex items-center justify-center w-full min-h-screen bg-slate-700 bg-opacity-70">
      <div class="flex flex-col justify-center flex-1 max-w-sm min-h-full p-5 px-6 py-12 bg-white bg-opacity-4 lg:px-8">
        <div class="max-w-sm rounded-md sm:mx-auto sm:w-full">
          <ul class="text-4xl font-bold leading-3 tracking-tight text-center text-blue-800">
            <li>REGISTRATION</li>
          </ul>
          <h2 class="mt-3 italic font-bold leading-9 tracking-tight text-center text-gray-800 text-l">
            Complete Your Personal Data
          </h2>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <label for="nama" class="block text-sm font-medium leading-6 text-gray-900">Nama</label>
            <div class="mt-2">
              <input
                id="name"
                v-model="name"
                type="text"
                placeholder="Masukkan nama"
                class="block indent-3 w-full rounded-md border-0 py-1.5 text:text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
            <div class="mt-2">
              <input
                id="email"
                v-model="email"
                name="email"
                type="email"
                autocomplete="email"
                placeholder="Masukkan email"
                required="admin@gmail.com"
                class="block indent-3 w-full rounded-md border-0 py-1.5 text:text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
              <div class="text-sm"></div>
            </div>
            <div class="mt-2">
              <input
                id="password"
                v-model="password"
                name="password"
                type="password"
                autocomplete="current-password"
                placeholder="Masukkan password"
                required="admin123"
                class="block indent-3 w-full rounded-md border-0 py-1.5 text:text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div class="flex items-center justify-between">
              <label for="confirmPassword" class="block text-sm font-medium leading-6 text-gray-900"
                >Confirm Password</label
              >
              <div class="text-sm"></div>
            </div>
            <div class="mt-2">
              <input
                id="confirmPassword"
                v-model="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Masukkan konfirmasi password"
                required="admin123"
                class="block indent-3 w-full rounded-md border-0 py-1.5 text:text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div class="error" v-html="error"></div>
          <br />
          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              @click="register"
            >
              Sign up
            </button>
          </div>
          <p>Already have an account? <a href="#" @click="showLoginPage">Login here</a></p>
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
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: null
    }
  },
  methods: {
    validationPassword() {
      if (this.password != this.confirmPassword) {
        alert('Password tidak sama')
        return false
      }
      return true
    },
    async register() {
      if (!this.validationPassword()) {
        return
      }
      try {
        await AuthenticationService.register({
          username: this.name,
          email: this.email,
          password: this.password,
          confPassword: this.confirmPassword,
          role: 'superadmin'
        })
        this.$router.push('/login')
      } catch (err) {
        if (err.response && err.response.data) {
          this.error = err.response.data.error
        } else {
          this.error = 'Muncul kesalahan tak terduga.'
        }
      }
    },
    showLoginPage() {
      // redirect to login page
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
