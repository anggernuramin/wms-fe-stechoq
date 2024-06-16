<template>
  <section
    class="flex items-center justify-center w-full min-h-screen bg-repeat bg-cover shadow-md bg-custom-bg bg-[url('/assets/images/bg-person-login.jpg')]"
  >
    <div class="flex items-center justify-center w-full min-h-screen bg-slate-700 bg-opacity-70">
      <div
        class="flex flex-col justify-center flex-1 max-w-sm min-h-full p-5 px-6 py-12 bg-opacity-75 rounded-md bg-slate-50 lg:px-8"
      >
        <h1 class="mb-2 text-4xl font-medium leading-3 tracking-tight text-center text-slate-700">SIGN IN</h1>
        <p class="mt-3 text-center text-md text-slate-500">Sign in with your email and password</p>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <div class="relative">
            <label for="email" class="block text-sm font-medium leading-6 text-slate-600">Username</label>
            <div class="mt-1">
              <input
                id="username"
                v-model="state.username"
                name="username"
                type="text"
                autocomplete="username"
                required="admin@gmail.com"
                placeholder="Masukkan username"
                class="block indent-3 w-full rounded-md border-0 py-1.5 text-slate-700 shadow-sm ring-2 ring-inset bg-white ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <span v-for="error in v$.username.$errors" :key="error.$uid" class="w-full text-xs text-red-800">
              {{ error.$message }}
            </span>
          </div>

          <div class="flex items-center justify-between mt-2">
            <label for="password" class="block text-sm font-medium leading-6 text-slate-600">Password</label>
          </div>
          <div class="relative mt-1">
            <input
              id="password"
              v-model="state.password"
              name="password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              placeholder="Masukkan Password"
              required="admin123"
              class="block indent-3 w-full rounded-md border-0 py-1.5 text-slate-700 bg-white shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />

            <div class="absolute cursor-pointer top-1 right-3" @click="showPassword = !showPassword">
              <span v-if="showPassword">
                <i class="fa-regular fa-eye text-slate-600"></i>
              </span>
              <span v-else>
                <i class="fa-regular fa-eye-slash text-slate-600"></i>
              </span>
            </div>
            <span v-for="error in v$.password.$errors" :key="error.$uid" class="w-full text-xs text-red-800">
              {{ error.$message }}
            </span>
          </div>

          <span
            v-if="error == 'password salah' || error == 'username tidak ditemukan'"
            class="w-full pb-1 text-xs text-red-800"
          >
            Email atau Password yang anda masukkan salah.
          </span>

          <br />
          <button
            :disabled="isLoading"
            type="submit"
            class="mt-1 flex w-full justify-center rounded-md bg-btnPrimary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            @click="login"
          >
            <span v-if="isLoading">Loading . . .</span>
            <span v-else>Login</span>
          </button>
          <p class="pt-5 text-sm text-slate-600">
            Don't have an account?
            <router-link to="/register"> <span class="text-btnPrimary">Register</span> </router-link>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import AuthenticationService from '../../services/AuthenticationService'
import { required, helpers } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

const state = reactive({
  username: '',
  password: ''
})
// Custom messages
const rules = {
  username: {
    required: helpers.withMessage('Username Wajib diisi.', required)
  },
  password: {
    required: helpers.withMessage('Password Wajib diisi', required)
  }
}

const v$ = useVuelidate(rules, state)

const error = ref(null)
const showPassword = ref(false)
const isLoading = ref(false)
const isSubmit = ref(false)

// Get router instance
const router = useRouter()

const login = async () => {
  const result = await v$.value.$validate()
  if (result) {
    isLoading.value = true
    try {
      const response = await AuthenticationService.login({
        username: state.username,
        password: state.password
      })
      isSubmit.value = true
      localStorage.setItem('token', response.data.token)
      isLoading.value = true
      router.push('/')
    } catch (err) {
      isLoading.value = false
      isSubmit.value = false
      error.value = err.response.data?.msg
      if (err.response || err.response.data) {
        error.value = err.response.data.msg
        router.push('/login')
      } else {
        error.value = 'Server error.'
      }
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
