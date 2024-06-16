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
            <label for="nama" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
            <div class="mt-1">
              <input
                id="name"
                v-model="state.username"
                type="text"
                placeholder="Masukkan nama"
                class="block indent-3 w-full rounded-md border-0 py-1.5 text-slate-700 shadow-sm ring-1 ring-inset ring-gray-300 bg-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <span v-for="error in v$.username.$errors" :key="error.$uid" class="w-full text-xs text-red-800">
              {{ error.$message }}
            </span>
          </div>
          <div class="mt-2">
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
            <div class="mt-1">
              <input
                id="email"
                v-model="state.email"
                name="email"
                type="email"
                autocomplete="email"
                placeholder="Masukkan email"
                required="admin@gmail.com"
                class="block indent-3 w-full rounded-md border-0 py-1.5 text-slate-700 shadow-sm ring-1 ring-inset ring-gray-300 bg-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <span v-for="error in v$.email.$errors" :key="error.$uid" class="w-full text-xs text-red-800">
              {{ error.$message }}
            </span>
          </div>

          <div class="mt-2">
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            </div>
            <div class="relative mt-1">
              <input
                id="password"
                v-model="state.password"
                name="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                placeholder="Masukkan password"
                required="admin123"
                class="block indent-3 w-full rounded-md border-0 py-1.5 text-slate-700 shadow-sm ring-1 ring-inset ring-gray-300 bg-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div class="absolute cursor-pointer top-1 right-3" @click="showPassword = !showPassword">
                <span v-if="showPassword">
                  <i class="fa-regular fa-eye text-slate-600"></i>
                </span>
                <span v-else>
                  <i class="fa-regular fa-eye-slash text-slate-600"></i>
                </span>
              </div>
            </div>

            <span v-for="error in v$.password.$errors" :key="error.$uid" class="w-full text-xs text-red-800">
              {{ error.$message }}
            </span>
          </div>
          <div class="mt-2">
            <div class="flex items-center justify-between">
              <label for="confirmPassword" class="block text-sm font-medium leading-6 text-gray-900"
                >Confirm Password</label
              >
            </div>
            <div class="relative mt-1">
              <input
                id="confirmPassword"
                v-model="state.confirmPassword"
                name="confirmPassword"
                :type="confirmShowPassword ? 'text' : 'password'"
                placeholder="Masukkan konfirmasi password"
                required="admin123"
                class="block indent-3 w-full rounded-md border-0 py-1.5 text-slate-700 shadow-sm ring-1 ring-inset ring-gray-300 bg-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div class="absolute cursor-pointer top-1 right-3" @click="confirmShowPassword = !confirmShowPassword">
                <span v-if="confirmShowPassword">
                  <i class="fa-regular fa-eye text-slate-600"></i>
                </span>
                <span v-else>
                  <i class="fa-regular fa-eye-slash text-slate-600"></i>
                </span>
              </div>
            </div>

            <span v-for="error in v$.confirmPassword.$errors" :key="error.$uid" class="w-full text-xs text-red-800">
              {{ error.$message }}
            </span>
          </div>
          <div class="pt-2 error" v-if="error">
            {{ error }}
          </div>
          <br />
          <div>
            <button
              :disabled="isLoading"
              type="submit"
              class="flex w-full justify-center rounded-md bg-btnPrimary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              @click="register"
            >
              <span v-if="isLoading">Loading . . .</span>
              <span v-else>Sign up</span>
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

<script setup>
import { email, helpers, required } from '@vuelidate/validators'
import AuthenticationService from '../../services/AuthenticationService'
import { reactive, ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { useRouter } from 'vue-router'

const state = reactive({
  username: '',
  password: '',
  email: '',
  confirmPassword: ''
})
const isLoading = ref(false)
const isSubmit = ref(false)
const showPassword = ref(false)
const confirmShowPassword = ref(false)

const rules = {
  username: {
    required: helpers.withMessage('Username wajib diisi.', required)
  },
  email: {
    required: helpers.withMessage('Email wajib diisi.', required),
    email: helpers.withMessage('Email tidak valid', email)
  },
  password: {
    required: helpers.withMessage('Password wajib diisi.', required)
  },
  confirmPassword: {
    required: helpers.withMessage('Konfirmasi Password wajib diisi ', required),
    sameAsPassword: helpers.withMessage(
      'Konfirmasi Password harus sama dengan Password',
      (value) => value === state.password
    )
  }
}

const v$ = useVuelidate(rules, state)

const router = useRouter()

const register = async () => {
  const result = await v$.value.$validate()
  if (result) {
    isLoading.value = true
    try {
      await AuthenticationService.register({
        username: state.username,
        email: state.email,
        password: state.password,
        confPassword: state.confirmPassword,
        role: 'superadmin'
      })
      isSubmit.value = true
      router.push('/login')
      isLoading.value = true
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
