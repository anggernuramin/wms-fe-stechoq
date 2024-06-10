<script setup>
import { onMounted } from 'vue'
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
import AuthenticationService from './services/AuthenticationService'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { useStore } from 'vuex'

const route = useRoute()
const router = useRouter()
const store = useStore()

onMounted(async () => {
  const token = localStorage.getItem('token')
  if (token) {
    try {
      const response = await AuthenticationService.getToken({
        token: token
      })
      const data = await response.data
      if (data.status == '404') {
        localStorage.removeItem('token')
        router.push('/login')
        return
      }
      console.log('🚀 ~ onMounted ~ response:', data?.data)
      store.commit('setUser', data?.data)
      return
    } catch (error) {
      router.push('/login')
      return
    }
  }
})

// jika user berada di path /login / register maka footer dan header tidak ditampilkan
const isAuth = computed(() => {
  return route.path === '/login' || route.path === '/register'
})
</script>

<template>
  <main class="relative min-h-screen bg-primary">
    <Header v-if="!isAuth" />
    <router-view />
    <Footer v-if="!isAuth" />
  </main>
</template>
