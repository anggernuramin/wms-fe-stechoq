<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import axios from 'axios'

export default {
  setup() {
    const router = useRouter()
    const isLoading = ref(false)
    const isSubmit = ref(false)
    const state = reactive({
      username: '',
      password: ''
    })

    const rules = {
      username: { required },
      password: { required }
    }

    const v$ = useVuelidate(rules, state)

    const submitLogin = async () => {
      if (isLoading.value || isSubmit.value) return // menghentikan mengirim form lebih dari 1 kali
      isSubmit.value = true
      const result = await v$.value.$validate()
      // Check apakah ada error
      if (!result) return
      try {
        isLoading.value = true
        const res = await axios.post(
          `${import.meta.env.VITE_VUE_APP_BASE_URL}/login`,
          {
            username: state.username,
            password: state.password
          },
          {
            headers: { 'Content-Type': 'application/json' }
          }
        )
        router.push('/dashboard')
      } catch (error) {
        alert(error.message)
      } finally {
        isLoading.value = false
        isSubmit.value = false
      }
    }

    return {
      state,
      isLoading,
      isSubmit,
      submitLogin,
      v$
    }
  }
}
</script>

<template>
  <section
    class="w-full min-h-screen bg-[url('../public/assets/images/bg.jpg')] bg-repeat bg-cover bg-center shadow-md"
  >
    <div class="flex items-center justify-center w-full min-h-screen bg-slate-700 bg-opacity-70">
      <div class="flex flex-col justify-center flex-1 max-w-sm min-h-full p-5 px-6 py-12 bg-white bg-opacity-4 lg:px-8">
        <div class="max-w-sm rounded-md sm:mx-auto sm:w-full">
          <ul class="text-4xl font-bold leading-3 tracking-tight text-center text-blue-800">
            <li>SIGN IN</li>
          </ul>
          <h2 class="mt-3 italic font-bold leading-9 tracking-tight text-center text-gray-800 text-l">
            Sign in with your email and password
          </h2>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6" @submit.prevent="submitLogin">
            <div>
              <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
              <div class="mt-2">
                <input
                  v-model="state.username"
                  name="email"
                  type="email"
                  autocomplete="email"
                  placeholder="Input Email"
                  class="block indent-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <span v-if="!v$.username.required" class="text-sm text-red-500">Email is required</span>
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between">
                <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                <div class="text-sm">
                  <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                </div>
              </div>
              <div class="mt-2">
                <input
                  v-model="state.password"
                  placeholder="Input Password"
                  name="password"
                  type="password"
                  class="block indent-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <span v-if="!v$.password.required" class="text-sm text-red-500">Password is required</span>
              </div>
            </div>

            <div>
              <button
                :disabled="isLoading || !v$.$dirty"
                type="submit"
                class="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <a href="#" class="mt-10 text-sm text-center text-blue-700">Register Here! {{ ' ' }}</a>
        </div>
      </div>
    </div>
  </section>
</template>
