<template>
  <section
    class="flex items-center justify-center w-full min-h-screen bg-repeat bg-cover shadow-md bg-custom-bg bg-[url('/assets/images/bg-login.jpg')]"
  >
    <div class="flex items-center justify-center w-full min-h-screen bg-slate-700 bg-opacity-70">
      <div class="flex flex-col justify-center flex-1 max-w-sm min-h-full p-5 px-6 py-12 bg-white rounded-sm lg:px-8">
        <h1 class="mb-2 text-4xl font-medium leading-3 tracking-tight text-center text-slate-700">SIGN IN</h1>
        <h2 class="mt-3 text-center text-md text-slate-500">Sign in with your email and password</h2>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-slate-600">Username</label>
            <div class="mt-1">
              <input
                id="username"
                v-model="username"
                name="username"
                type="username"
                autocomplete="username"
                required="admin@gmail.com"
                placeholder="Masukkan username"
                class="block indent-3 w-full rounded-md border-0 py-1.5 text-slate-700 shadow-sm ring-2 ring-inset bg-white ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="flex items-center justify-between mt-2">
            <label for="password" class="block text-sm font-medium leading-6 text-slate-600">Password</label>
          </div>
          <div class="mt-1">
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              autocomplete="current-password"
              placeholder="Masukkan Password"
              required="admin123"
              class="block indent-3 w-full rounded-md border-0 py-1.5 text-slate-700 bg-white shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div class="error" v-html="error"></div>
          <br />
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-btnPrimary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            @click="login"
          >
            Sign in
          </button>
          <p class="pt-5 text-sm text-slate-600">
            Don't have an account?
            <a href="#" @click="showRegister"> <span class="text-btnPrimary">Register here</span> </a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthenticationService from '../../services/AuthenticationService'

const username = ref('')
const password = ref('')
const error = ref(null)

// Get router instance
const router = useRouter()

const login = async () => {
  try {
    const response = await AuthenticationService.login({
      username: username.value,
      password: password.value
    })
    console.log('🚀 ~ login ~ response:', response)
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('refreshToken', response.data.refreshToken)
    router.push('/')

    // const token = response.data.token
    // const expiresIn = response.data.expiresIn

    // const expirationDate = new Date().getTime() + expiresIn * 1000

    // localStorage.setItem('tokenExpiration', expirationDate)
  } catch (err) {
    console.log(err)
    if (err.response && err.response.data) {
      error.value = err.response.data.error
      router.push('/login')
    } else {
      error.value = 'Server error.'
    }
  }
}

// Define the showRegister method
const showRegister = () => {
  router.push('/register')
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
