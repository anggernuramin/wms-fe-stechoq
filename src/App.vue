<script setup>
import { onMounted } from 'vue'
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

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
