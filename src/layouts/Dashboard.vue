<script setup>
import { useStore } from 'vuex'

import Sidebar from '../components/Sidebar.vue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import axios from 'axios'
const store = useStore()

const router = useRouter()

const handleGetToken = async () => {
  const token = localStorage.getItem('token')
  if (token) {
    try {
      const res = await axios.post(`${import.meta.env.VITE_VUE_APP_BASE_URL}/token`, { token }) // Mengirim token dalam body permintaan
      const data = res.data
      if (data.status === '404') {
        localStorage.removeItem('token')
        router.push('/login')
      } else {
        store.commit('setUser', data.data)
      }
    } catch (error) {
      console.error('Error while fetching token:', error) // Logging kesalahan
      router.push('/login')
    }
  } else {
    console.log('Token not found in localStorage')
    router.push('/login')
  }
}

onMounted(() => {
  handleGetToken()
})
</script>
<template>
  <div>
    <!-- <nav class="flex items-center justify-center gap-3">
      <router-link to="/login" class="text-2xl cursor-pointer">Login</router-link>
      <router-link to="/" class="text-2xl cursor-pointer">Home</router-link>
      <router-link to="/barang-masuk" class="text-2xl cursor-pointer">Profile</router-link>
    </nav> -->
    <Sidebar />
    <div
      class="ml-[13.8rem] sidebar-collapse px-5 pt-2 margin-transition"
      :style="{ marginLeft: store.state.isSidebarOpen ? '13.8rem' : '3.4rem' }"
    >
      <router-view />
    </div>
  </div>
</template>
