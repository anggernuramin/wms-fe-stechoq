<template>
  <section
    class="w-full min-h-screen bg-center bg-repeat bg-cover shadow-md bg-custom-bg bg bg-[url('/assets/images/bg-register.avif')]"
  >
    <div class="flex items-center justify-center w-full min-h-screen bg-slate-700 bg-opacity-70">
      <div
        class="flex flex-col justify-center flex-1 max-w-md min-h-full p-5 px-6 py-12 bg-opacity-75 rounded-md bg-slate-50 lg:px-8"
      >
        <h1 class="mb-2 text-4xl font-medium leading-3 tracking-tight text-center text-slate-700">REGISTRATION</h1>
        <p class="mt-3 text-center text-md text-slate-500">Complete Your Personal Data</p>

        <div class="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <label for="nama" class="block text-sm font-medium leading-6 text-gray-900">Nama</label>
            <div class="mt-1">
              <input
                id="name"
                v-model="name"
                type="text"
                placeholder="Masukkan nama"
                class="block indent-3 w-full rounded-md border-0 py-1.5 text-slate-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div class="mt-2">
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
            <div class="mt-1">
              <input
                id="email"
                v-model="email"
                name="email"
                type="email"
                autocomplete="email"
                placeholder="Masukkan email"
                required="admin@gmail.com"
                class="block indent-3 w-full rounded-md border-0 py-1.5 text-slate-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="mt-2">
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
              <div class="text-sm"></div>
            </div>
            <div class="mt-1">
              <input
                id="password"
                v-model="password"
                name="password"
                type="password"
                autocomplete="current-password"
                placeholder="Masukkan password"
                required="admin123"
                class="block indent-3 w-full rounded-md border-0 py-1.5 text-slate-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div class="mt-2">
            <div class="flex items-center justify-between">
              <label for="confirmPassword" class="block text-sm font-medium leading-6 text-gray-900"
                >Confirm Password</label
              >
              <div class="text-sm"></div>
            </div>
            <div class="mt-1">
              <input
                id="confirmPassword"
                v-model="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Masukkan konfirmasi password"
                required="admin123"
                class="block indent-3 w-full rounded-md border-0 py-1.5 text-slate-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div class="pt-2 error" v-if="error">
            {{ error }}
          </div>
          <br />
          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-btnPrimary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              @click="register"
            >
              Sign up
            </button>
          </div>
          <p class="pt-5 text-sm text-slate-600">
            Already have an account? <router-link to="/login"><span class="text-btnPrimary">Login</span> </router-link>
          </p>
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
      if (this.name == '' || this.email == '' || this.password == '' || this.confirmPassword == '') {
        this.error = 'Semua kolom harus diisi'
        return false
      }
      if (this.password != this.confirmPassword) {
        this.error = 'Password tidak sama'
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
        if (err.response || err.response.data) {
          this.error = err.response.data.error
        } else {
          this.error = 'Server error.'
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
